#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const rootDir = process.cwd();
const configPath = path.join(rootDir, "content", "blog-config.json");
const resourcesDir = path.join(rootDir, "content", "resources");
const blogImagesDir = path.join(rootDir, "public", "images", "blog");
const timeZone = "America/Edmonton";
const topicRunwayWarningThreshold = 12;

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const validateOnly = args.includes("--validate-only");
const ensureImagesOnly = args.includes("--ensure-images");
const backfill = args.includes("--backfill");
const force = args.includes("--force");
const targetDate =
  getArgValue("--date") ?? getDateInTimeZone(new Date(), timeZone);
const backfillFrom = getArgValue("--from");
const backfillTo = getArgValue("--to") ?? targetDate;
const backfillLimitValue = getArgValue("--limit");
const ensureImagesSince = getArgValue("--since");

const isDirectExecution =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectExecution) {
  loadLocalEnv(path.join(rootDir, ".env.local"));

  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

async function main() {
  const config = readJson(configPath);
  const existingPosts = readExistingPosts();

  if (validateOnly) {
    validateStoredPosts(existingPosts, config);
    console.log(`Validated ${existingPosts.length} resource posts.`);
    return;
  }

  if (ensureImagesOnly) {
    const updatedCount = await ensurePostImages(existingPosts, config, ensureImagesSince);
    console.log(`Ensured unique blog images for ${updatedCount} resource posts.`);
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY is required. Add it as a GitHub Actions secret and to .env.local for local runs.",
    );
  }

  if (backfill) {
    const backfillLimit = parsePositiveIntegerArg("--limit", backfillLimitValue);
    const dates = getBackfillDates(existingPosts, backfillFrom, backfillTo)
      .slice(0, backfillLimit ?? undefined);

    if (dates.length === 0) {
      console.log(`No missing resource post dates through ${backfillTo}.`);
      return;
    }

    console.log(`Backfilling ${dates.length} missing resource post date(s): ${dates.join(", ")}`);

    await runBackfillDates(config, existingPosts, dates);
    return;
  }

  await generatePostForDate(config, existingPosts, targetDate);
}

export async function runBackfillDates(
  config,
  initialPosts,
  dates,
  {
    generateForDate = generatePostForDate,
    readPosts = readExistingPosts,
    dryRun = isDryRun,
    logger = console,
  } = {},
) {
  let posts = initialPosts;
  let generatedCount = 0;

  for (const date of dates) {
    let generatedPost = null;

    try {
      generatedPost = await generateForDate(config, posts, date);
    } catch (error) {
      if (generatedCount === 0) {
        throw error;
      }

      logger.warn(
        `Stopping backfill after ${generatedCount} generated post(s) because ${date} failed. Valid generated posts will still be validated and committed.`,
      );
      logger.warn(error.message);
      return generatedCount;
    }

    generatedCount += 1;

    if (dryRun && generatedPost) {
      posts = [generatedPost, ...posts].sort((a, b) => b.date.localeCompare(a.date));
    } else {
      posts = readPosts();
    }
  }

  return generatedCount;
}

async function generatePostForDate(config, existingPosts, date) {
  const existingForDate = existingPosts.find((post) => post.date === date);

  if (existingForDate && !force) {
    throw new Error(
      `A resource post already exists for ${date}: ${existingForDate.slug}. Use --force to override this guard.`,
    );
  }

  const normalizedPost = await generateValidatedPost(config, existingPosts, date);

  const fileName = `${date}-${normalizedPost.slug}.md`;
  const outputPath = path.join(resourcesDir, fileName);

  if (fs.existsSync(outputPath) && !force) {
    throw new Error(`Refusing to overwrite existing post: ${outputPath}`);
  }

  if (isDryRun) {
    console.log(JSON.stringify({
      outputPath,
      title: normalizedPost.title,
      slug: normalizedPost.slug,
      category: normalizedPost.category,
      readTime: normalizedPost.readTime,
      sources: normalizedPost.sources,
      excerpt: normalizedPost.excerpt,
    }, null, 2));
    return normalizedPost;
  }

  normalizedPost.image = await createBlogImage(normalizedPost, config, existingPosts);
  validateGeneratedPost(normalizedPost, existingPosts, config, date);

  const serializedPost = serializePost(normalizedPost);

  fs.mkdirSync(resourcesDir, { recursive: true });
  fs.writeFileSync(outputPath, serializedPost);
  console.log(`Created ${path.relative(rootDir, outputPath)}`);
  return normalizedPost;
}

async function generateValidatedPost(config, existingPosts, date) {
  const maxAttempts = Number.parseInt(process.env.BLOG_TOPIC_ATTEMPTS || "4", 10);
  const researchDigest = await collectResearch(config);
  const rejectedTopics = [];
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    let normalizedPost = null;

    try {
      const generatedPost = await generatePost(
        config,
        existingPosts,
        date,
        researchDigest,
        rejectedTopics,
      );
      normalizedPost = normalizePost(generatedPost, config, date);
      validateGeneratedPost(normalizedPost, existingPosts, config, date);
      return normalizedPost;
    } catch (error) {
      lastError = error;

      if (isLongRateLimitError(error)) {
        throw error;
      }

      rejectedTopics.push(
        normalizedPost
          ? `Rejected "${normalizedPost.title}" because ${error.message}`.slice(0, 360)
          : `Rejected attempt because ${error.message}`.slice(0, 360),
      );

      if (attempt < maxAttempts) {
        console.warn(
          `Generated post failed validation. Retrying with a different angle (${attempt}/${maxAttempts})...`,
        );
        console.warn(`Rejection reason: ${error.message}`);
      }
    }
  }

  throw lastError;
}

async function generatePost(config, existingPosts, date, researchDigest, rejectedTopics = []) {
  const model = process.env.OPENAI_MODEL || process.env.BLOG_OPENAI_MODEL || "gpt-5.4-mini";
  const maxOutputTokens = Number.parseInt(
    process.env.BLOG_MAX_OUTPUT_TOKENS || "2800",
    10,
  );
  const topicPlan = routeTopicPlan(
    chooseTopicPlan(existingPosts, date, rejectedTopics),
    config,
  );
  console.log(`Selected blog topic: ${topicPlan.angle}`);
  const response = await createOpenAIResponse({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      instructions: buildSystemPrompt(config),
      input: buildUserPrompt(
        config,
        existingPosts,
        date,
        researchDigest,
        rejectedTopics,
        topicPlan,
      ),
      max_output_tokens: maxOutputTokens,
      text: {
        format: {
          type: "json_object",
        },
      },
    }),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`OpenAI request failed (${response.status}): ${text}`);
  }

  const data = JSON.parse(text);
  const outputText = extractOutputText(data);

  if (!outputText) {
    throw new Error("OpenAI response did not include output text.");
  }

  return {
    ...parseModelJson(outputText),
    __topicPlan: topicPlan,
  };
}

function buildSystemPrompt(config) {
  return [
    "You are the automated editorial assistant for Munden Truck & Equipment Ltd. in Kamloops, BC.",
    "Create original, useful, local-search-friendly blog posts for fleet owners, drivers, mechanics, forestry contractors, and equipment buyers.",
    "Use the provided research digest for industry context. Competitor URLs are research signals only: never copy their language, never mention named competitors, and never write direct comparison claims.",
    "Be conservative with facts. Do not provide legal advice, regulatory guarantees, pricing guarantees, warranty claims, or claims that Munden is the only/best provider.",
    "Write in a practical, experienced, plainspoken voice. Keep it helpful, specific, and grounded in Munden's real service areas.",
    "Return one valid JSON object only. The body field must be markdown with no H1, no raw HTML, and 3 to 5 H2 sections.",
    `Allowed categories: ${config.categories.join(", ")}.`,
  ].join("\n");
}

function buildUserPrompt(
  config,
  existingPosts,
  date,
  researchDigest,
  rejectedTopics,
  topicPlan,
) {
  const existingSummaries = existingPosts
    .slice(0, 8)
    .map(
      (post) =>
        `${post.date}: ${post.title} [${post.category}] ${post.excerpt.slice(0, 150)}`,
    )
    .join("\n");
  const allowedTopicAngles = buildAllowedTopicAngles(existingPosts).map((angle) =>
    routeTopicPlan(angle, config),
  );
  const primaryInternalLink = {
    label: topicPlan.linkLabel || "Munden service and parts support",
    url: topicPlan.internalLink,
  };
  const supportingInternalLinks = [
    primaryInternalLink,
    ...config.requiredInternalLinks.filter(
      (link) =>
        link.url !== primaryInternalLink.url &&
        (link.url === "/about/contact" ||
          link.url === "/services/service-department" ||
          link.url === "/services/parts-department"),
    ),
  ].slice(0, 3);

  return JSON.stringify(
    {
      task: "Generate one auto-publishable resource blog post for today as valid JSON.",
      date,
      company: "Munden Truck & Equipment Ltd.",
      serviceAreas: config.serviceAreas.join(", "),
      focusAreas: config.focusAreas.slice(0, 8).join(", "),
      targetKeywords: config.targetKeywords.slice(0, 6).join(", "),
      brandVoice: config.brandVoice.join(", "),
      competitors: (config.competitors || [])
        .slice(0, 4)
        .map((competitor) => `${competitor.name}: ${competitor.url}`)
        .join("; "),
      industrySources: config.industrySources
        .slice(0, 3)
        .map((source) => `${source.name}: ${source.url}`)
        .join("; "),
      internalLinks: supportingInternalLinks
        .map((link) => `${link.label}: ${link.url}`)
        .join("; "),
      bannedClaims: config.bannedClaims,
      imageOptions: config.imageOptions.slice(0, 4),
      existingPosts: existingSummaries,
      rejectedTopics,
      allowedTopicAngles,
      selectedTopicAngle: topicPlan,
      researchDigest,
      outputFields:
        "title, slug, date, excerpt, category, author, readTime, image, keywords, sources, body",
      categories: config.categories.join(" | "),
      requirements: [
        "Write about selectedTopicAngle exactly. Do not pivot to another allowedTopicAngles item unless this exact attempt is rejected and retried.",
        "Use selectedTopicAngle.category for the category and cover selectedTopicAngle.mustCover in a natural way.",
        "Choose a topic, seasonal angle, equipment system, and customer problem that are meaningfully different from every existing post listed.",
        "Do not write another pre-season checklist, spring/summer readiness, fleet-owner prep, freeze-up prevention, steering/suspension, employee-retention, or forestry-uncertainty article if one appears in existingPosts.",
        "Do not reuse rejectedTopics. If a topic was rejected, move to a different equipment system or customer problem.",
        "Use the research digest for competitor and industry topic gaps, but do not name competitors in the article.",
        "Use at least three credible source URLs in the sources array from the research digest or Munden site.",
        "Include 1 or 2 internal markdown links in the body using natural anchor text, not exact SEO keyword phrases.",
        `The body must link to the selected topic's primary destination: ${topicPlan.internalLink}`,
        "Write 475 to 625 words.",
        "Avoid invented certifications, hours, prices, warranties, or service guarantees.",
        "For image guidance, prefer commercial trucks, trailers, repair shops, parts counters, forestry roads, logging trucks, or EcoLog forestry equipment. Do not request farm tractors, farm fields, crop agriculture, or unrelated agricultural machinery.",
      ],
    },
  );
}

export function chooseTopicPlan(existingPosts, date, rejectedTopics = []) {
  const allowedTopicAngles = buildAllowedTopicAngles(existingPosts);
  if (allowedTopicAngles.length <= topicRunwayWarningThreshold) {
    console.warn(
      `Blog topic runway is low (${allowedTopicAngles.length} remaining). Add new candidate angles soon; generation will continue while valid topics remain.`,
    );
  }
  const rejectedText = rejectedTopics.join(" ").toLowerCase();
  const availableAngles = allowedTopicAngles.filter((candidate) => {
    const keyPhrase = candidate.angle.toLowerCase().slice(0, 44);
    return !rejectedText.includes(keyPhrase);
  });
  if (availableAngles.length === 0) {
    throw new Error("No unused blog topic angles are available. Add more candidate angles before generating another post.");
  }

  return availableAngles[(hashString(date) + rejectedTopics.length) % availableAngles.length];
}

export function routeTopicPlan(topicPlan, config) {
  if (!topicPlan?.internalLink) {
    return topicPlan;
  }

  const existingTarget = (config.topicLinkTargets || []).find(
    (target) => target.url === topicPlan.internalLink,
  );

  if (existingTarget) {
    return { ...topicPlan, linkLabel: existingTarget.label };
  }

  const department =
    topicPlan.internalLink === "/services/service-department"
      ? "service"
      : topicPlan.internalLink === "/services/parts-department"
        ? "parts"
        : null;

  if (!department) {
    const fallbackTarget = (config.requiredInternalLinks || []).find(
      (target) => target.url === topicPlan.internalLink,
    );
    return {
      ...topicPlan,
      linkLabel: fallbackTarget?.label || "Munden team",
    };
  }

  const topicText = `${topicPlan.angle || ""} ${topicPlan.mustCover || ""}`.toLowerCase();
  const rankedTargets = (config.topicLinkTargets || [])
    .filter((target) => target.department === department)
    .map((target, index) => ({
      target,
      index,
      score: (target.matchTerms || []).reduce(
        (score, term) =>
          score + (topicText.includes(String(term).toLowerCase()) ? 1 : 0),
        0,
      ),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index);
  const selectedTarget = rankedTargets[0]?.target;

  if (!selectedTarget) {
    const fallbackTarget = (config.requiredInternalLinks || []).find(
      (target) => target.url === topicPlan.internalLink,
    );
    return {
      ...topicPlan,
      linkLabel: fallbackTarget?.label || "Munden team",
    };
  }

  return {
    ...topicPlan,
    internalLink: selectedTarget.url,
    linkLabel: selectedTarget.label,
  };
}

export function buildAllowedTopicAngles(existingPosts) {
  const candidateAngles = [
    {
      angle: "Hydraulic hose warning signs before a small leak becomes downtime",
      category: "Maintenance Tips",
      mustCover: "hose abrasion, seepage, fittings, contamination, when to stop using equipment",
      internalLink: "/services/service-department",
    },
    {
      angle: "How to identify truck and trailer parts before calling the parts counter",
      category: "Parts and Service",
      mustCover: "unit number, VIN, photos, measurements, old part numbers, symptoms",
      internalLink: "/services/parts-department",
    },
    {
      angle: "Reefer and refrigeration trailer checks before warm weather freight",
      category: "Maintenance Tips",
      mustCover: "belts, filters, airflow, doors, seals, electrical checks, service timing",
      internalLink: "/services/service-department",
    },
    {
      angle: "Trailer lighting and wiring faults that cause avoidable downtime",
      category: "Maintenance Tips",
      mustCover: "connectors, corrosion, grounds, marker lights, vibration, inspection readiness",
      internalLink: "/services/service-department",
    },
    {
      angle: "When a roadside issue belongs to mobile service and when it belongs in the shop",
      category: "Parts and Service",
      mustCover: "triage, safety, diagnostic limits, towing decisions, what information to provide",
      internalLink: "/services/mobile-service",
    },
    {
      angle: "Why maintenance records make CVIP inspections and fleet planning easier",
      category: "Equipment Guides",
      mustCover: "service history, repeat defects, inspection dates, downtime planning, documentation",
      internalLink: "/services/service-department",
    },
    {
      angle: "Air conditioning and cab comfort checks for operators working long summer days",
      category: "Maintenance Tips",
      mustCover: "filters, leaks, belts, airflow, operator fatigue, seasonal service",
      internalLink: "/services/service-department",
    },
    {
      angle: "Welding and fabrication repair planning for trucks, trailers, and equipment",
      category: "Parts and Service",
      mustCover: "cracks, mounts, brackets, safety, inspection, repair timing",
      internalLink: "/services/service-department",
    },
    {
      angle: "Forwarder and harvester uptime habits for forestry contractors",
      category: "Forestry Equipment",
      mustCover: "daily checks, hoses, tracks or tires, heads, parts planning, operator notes",
      internalLink: "/equipment/ecolog",
    },
    {
      angle: "What fleet managers should keep in a practical roadside information kit",
      category: "Equipment Guides",
      mustCover: "unit details, contacts, service history, photos, location details, driver notes",
      internalLink: "/services/mobile-service",
    },
    {
      angle: "Wheel-end warning signs that deserve attention before a long haul",
      category: "Maintenance Tips",
      mustCover: "heat, noise, seals, hub oil, tire wear, bearing concerns, inspection timing",
      internalLink: "/services/service-department",
    },
    {
      angle: "Battery, alternator, and starter checks before a truck becomes a no-start",
      category: "Maintenance Tips",
      mustCover: "battery age, terminals, charging output, parasitic draw clues, driver notes",
      internalLink: "/services/service-department",
    },
    {
      angle: "Trailer door, latch, and landing gear problems that slow down freight",
      category: "Parts and Service",
      mustCover: "hinges, rollers, seals, handles, landing gear, corrosion, parts planning",
      internalLink: "/services/parts-department",
    },
    {
      angle: "Driveline vibration clues that should not be ignored",
      category: "Maintenance Tips",
      mustCover: "u-joints, carrier bearings, imbalance, load changes, road test notes",
      internalLink: "/services/service-department",
    },
    {
      angle: "Cooling system checks before heavy summer pulls in the Interior",
      category: "Maintenance Tips",
      mustCover: "radiators, coolant condition, fan operation, hoses, belts, debris, grades",
      internalLink: "/services/service-department",
    },
    {
      angle: "How tire wear patterns help diagnose larger truck and trailer issues",
      category: "Equipment Guides",
      mustCover: "alignment, suspension, pressure, cupping, edge wear, documentation",
      internalLink: "/services/service-department",
    },
    {
      angle: "Forestry equipment parts planning before remote work creates downtime",
      category: "Forestry Equipment",
      mustCover: "critical spares, filters, hoses, wear parts, serial numbers, operator notes",
      internalLink: "/equipment/ecolog",
    },
    {
      angle: "Dust, heat, and rough-road maintenance habits for Interior fleets",
      category: "Maintenance Tips",
      mustCover: "filters, cooling packages, wiring, brakes, daily inspections, cleaning routines",
      internalLink: "/services/service-department",
    },
    {
      angle: "How to prepare a truck or trailer for a productive shop visit",
      category: "Parts and Service",
      mustCover: "symptom notes, photos, service history, parts availability, scheduling expectations",
      internalLink: "/services/service-department",
    },
    {
      angle: "Air brake leak clues drivers should report before the next dispatch",
      category: "Maintenance Tips",
      mustCover: "pressure loss, compressor cycling, audible leaks, fittings, safety decisions",
      internalLink: "/services/service-department",
    },
    {
      angle: "Fifth wheel inspection points that help prevent coupling problems",
      category: "Maintenance Tips",
      mustCover: "jaw wear, plate grease, mounting bolts, release handle movement, driver reports",
      internalLink: "/services/service-department",
    },
    {
      angle: "ABS warning light basics for truck and trailer operators",
      category: "Maintenance Tips",
      mustCover: "wheel sensors, wiring, tone rings, fault notes, inspection timing",
      internalLink: "/services/service-department",
    },
    {
      angle: "Frame and crossmember cracks that should be checked before hauling heavy",
      category: "Equipment Guides",
      mustCover: "visual checks, rust, weld history, mounting points, when to stop and book service",
      internalLink: "/services/service-department",
    },
    {
      angle: "PTO and wet kit maintenance questions to ask before a busy job",
      category: "Maintenance Tips",
      mustCover: "fluid leaks, engagement issues, hoses, fittings, driver notes, service timing",
      internalLink: "/services/service-department",
    },
    {
      angle: "Kingpin and suspension wear clues that show up during everyday driving",
      category: "Maintenance Tips",
      mustCover: "wander, uneven tire wear, clunks, steering feel, inspection planning",
      internalLink: "/services/service-department",
    },
    {
      angle: "Brake shoe and drum wear signs fleets should document between services",
      category: "Maintenance Tips",
      mustCover: "pulling, vibration, heat, lining condition, driver writeups, CVIP readiness",
      internalLink: "/services/service-department",
    },
    {
      angle: "Trailer floor and decking damage that can become a bigger repair",
      category: "Parts and Service",
      mustCover: "soft spots, fasteners, moisture, loading damage, photos, repair planning",
      internalLink: "/services/service-department",
    },
    {
      angle: "Liftgate warning signs that deserve service before freight gets stuck",
      category: "Parts and Service",
      mustCover: "slow movement, hydraulic leaks, switches, wiring, platform wear, parts planning",
      internalLink: "/services/service-department",
    },
    {
      angle: "Diagnostic notes that help the shop solve intermittent electrical faults",
      category: "Parts and Service",
      mustCover: "when the fault appears, weather, load, dash messages, photos, fault codes",
      internalLink: "/services/service-department",
    },
    {
      angle: "DEF and aftertreatment warning lights drivers should not ignore",
      category: "Maintenance Tips",
      mustCover: "dash messages, derate risk, fluid handling, sensor clues, early service calls",
      internalLink: "/services/service-department",
    },
    {
      angle: "Exhaust leaks and mounting problems that can sideline a working truck",
      category: "Maintenance Tips",
      mustCover: "noise, smell, clamps, brackets, flex pipe, heat shields, safety decisions",
      internalLink: "/services/service-department",
    },
    {
      angle: "Fuel system symptoms to note before a truck comes into the shop",
      category: "Maintenance Tips",
      mustCover: "hard starts, power loss, filters, contamination, cold starts, service history",
      internalLink: "/services/service-department",
    },
    {
      angle: "Parts ordering details that reduce repeat calls and wrong-fit delays",
      category: "Parts and Service",
      mustCover: "VIN, serial numbers, photos, measurements, old part markings, application details",
      internalLink: "/services/parts-department",
    },
    {
      angle: "How operators can describe noises so technicians can find problems faster",
      category: "Equipment Guides",
      mustCover: "location, speed, load, temperature, vibration, recordings, road test notes",
      internalLink: "/services/service-department",
    },
    {
      angle: "Logging truck maintenance notes that matter after rough bush roads",
      category: "Forestry Equipment",
      mustCover: "suspension, wiring, lights, tires, brakes, hoses, daily operator notes",
      internalLink: "/equipment/ecolog",
    },
    {
      angle: "Harvester head wear items forestry crews should track between services",
      category: "Forestry Equipment",
      mustCover: "feed rollers, knives, measuring systems, hoses, operator notes, parts planning",
      internalLink: "/equipment/ecolog",
    },
    {
      angle: "Forwarder crane and grapple checks that support uptime in remote work",
      category: "Forestry Equipment",
      mustCover: "pins, bushings, hoses, leaks, controls, operator walkaround notes",
      internalLink: "/equipment/ecolog",
    },
    {
      angle: "What to gather before booking a CVIP inspection",
      category: "Equipment Guides",
      mustCover: "unit records, known defects, previous repairs, timing, driver notes, scheduling",
      internalLink: "/services/service-department",
    },
    {
      angle: "Small coolant leaks that deserve attention before grades and heat expose them",
      category: "Maintenance Tips",
      mustCover: "hose ends, clamps, radiator seams, coolant smell, pressure testing, driver notes",
      internalLink: "/services/service-department",
    },
    {
      angle: "Air line and gladhand problems that cause avoidable trailer delays",
      category: "Maintenance Tips",
      mustCover: "rubber seals, cracked lines, corrosion, connection habits, leak checks",
      internalLink: "/services/service-department",
    },
    {
      angle: "Shop visit photos that help service advisors understand the problem",
      category: "Parts and Service",
      mustCover: "wide shots, closeups, labels, leaks, dash messages, unit numbers",
      internalLink: "/services/service-department",
    },
    {
      angle: "Preventing small oil leaks from turning into larger downtime events",
      category: "Maintenance Tips",
      mustCover: "drips, residue, seals, level checks, contamination, service timing",
      internalLink: "/services/service-department",
    },
    {
      angle: "Trailer suspension air bag issues fleets should catch early",
      category: "Maintenance Tips",
      mustCover: "ride height, leaks, cracked bags, valves, tire wear, inspection notes",
      internalLink: "/services/service-department",
    },
    {
      angle: "When a truck vibration points to tires and when it may be driveline related",
      category: "Equipment Guides",
      mustCover: "speed range, load changes, recent tire work, driveline clues, road test notes",
      internalLink: "/services/service-department",
    },
    {
      angle: "Equipment serial numbers and why they matter for forestry parts support",
      category: "Forestry Equipment",
      mustCover: "model details, attachments, photos, parts books, remote planning, wrong-fit prevention",
      internalLink: "/equipment/ecolog",
    },
    {
      angle: "Mobile service call details that help technicians arrive prepared",
      category: "Parts and Service",
      mustCover: "location, unit type, symptoms, safety, access, photos, contact information",
      internalLink: "/services/mobile-service",
    },
    {
      angle: "Daily walkaround notes that make preventive maintenance easier to schedule",
      category: "Equipment Guides",
      mustCover: "driver observations, leaks, lights, tire condition, brakes, repeat patterns",
      internalLink: "/services/service-department",
    },
    {
      angle: "What rough idle and power complaints can tell a service team",
      category: "Maintenance Tips",
      mustCover: "fuel, air, sensors, filters, load, temperature, driver notes",
      internalLink: "/services/service-department",
    },
    {
      angle: "Cab entry steps, mirrors, and safety hardware that deserve routine checks",
      category: "Maintenance Tips",
      mustCover: "loose steps, grab handles, mirrors, visibility, corrosion, driver reports",
      internalLink: "/services/service-department",
    },
    {
      angle: "How fleet owners can prioritize repairs when several units need attention",
      category: "Equipment Guides",
      mustCover: "safety, inspections, revenue work, parts lead time, downtime windows, records",
      internalLink: "/services/service-department",
    },
    {
      angle: "Air dryer purge symptoms that can reveal an air system problem",
      category: "Maintenance Tips",
      mustCover: "purge frequency, moisture, compressor cycling, unusual sounds, driver observations",
      internalLink: "/services/service-department",
    },
    {
      angle: "Engine fan and fan clutch warning signs before an overheating event",
      category: "Maintenance Tips",
      mustCover: "temperature changes, fan engagement, noise, airflow, inspection timing",
      internalLink: "/services/service-department",
    },
    {
      angle: "Radiator and charge air cooler cleaning for trucks working in dust and debris",
      category: "Maintenance Tips",
      mustCover: "restricted airflow, safe cleaning, bent fins, temperature trends, service intervals",
      internalLink: "/services/service-department",
    },
    {
      angle: "Trailer roof and body water intrusion clues worth repairing early",
      category: "Maintenance Tips",
      mustCover: "stains, damaged seams, roof panels, door seals, cargo protection, repair planning",
      internalLink: "/services/service-department",
    },
    {
      angle: "Wheel fastener checks after wheel service and why retorque timing matters",
      category: "Equipment Guides",
      mustCover: "service records, manufacturer procedures, inspection clues, driver reporting, safety",
      internalLink: "/services/service-department",
    },
    {
      angle: "Grease point problems that can hide behind a completed maintenance checklist",
      category: "Maintenance Tips",
      mustCover: "blocked fittings, damaged lines, contamination, movement, documenting missed points",
      internalLink: "/services/service-department",
    },
    {
      angle: "Transmission and differential leak clues to document before a shop visit",
      category: "Maintenance Tips",
      mustCover: "fluid location, colour, odour, operating conditions, photos, safe shutdown decisions",
      internalLink: "/services/service-department",
    },
    {
      angle: "Forestry equipment belly pan cleaning and debris checks between service visits",
      category: "Forestry Equipment",
      mustCover: "debris buildup, heat, access panels, leaks, safe cleaning, inspection records",
      internalLink: "/equipment/ecolog",
    },
    {
      angle: "Forestry machine transport checks before moving between job sites",
      category: "Forestry Equipment",
      mustCover: "attachments, loose items, dimensions, securement planning, walkaround, route conditions",
      internalLink: "/equipment/ecolog",
    },
    {
      angle: "Fuel water separator observations that help diagnose contamination concerns",
      category: "Maintenance Tips",
      mustCover: "water, debris, warning lights, fuel source notes, filter history, sample documentation",
      internalLink: "/services/service-department",
    },
    {
      angle: "Parking brake complaints that should be described before adjustment or repair",
      category: "Maintenance Tips",
      mustCover: "holding ability, slope, release behaviour, warning indicators, linkage, driver notes",
      internalLink: "/services/service-department",
    },
    {
      angle: "Truck and trailer corrosion spots that deserve attention before they spread",
      category: "Maintenance Tips",
      mustCover: "mounting points, seams, wiring supports, air tanks, cleaning, repair documentation",
      internalLink: "/services/service-department",
    },
    {
      angle: "What repeated blown fuses can tell technicians about an electrical fault",
      category: "Maintenance Tips",
      mustCover: "circuit identification, operating conditions, added accessories, fuse rating, safe diagnosis",
      internalLink: "/services/service-department",
    },
    {
      angle: "Seat condition and cab controls that affect a driver's working day",
      category: "Equipment Guides",
      mustCover: "seat mounting, adjustment, belts, switches, visibility, reporting defects",
      internalLink: "/services/service-department",
    },
    {
      angle: "How seasonal fleet parking changes battery and fluid maintenance needs",
      category: "Equipment Guides",
      mustCover: "storage duration, battery care, leaks, fluid condition, tire support, return-to-service checks",
      internalLink: "/services/service-department",
    },
    {
      angle: "Torque rod and suspension bushing wear clues fleets can catch early",
      category: "Maintenance Tips",
      mustCover: "axle movement, clunks, uneven tire wear, cracked rubber, alignment clues, inspection notes",
      internalLink: "/services/service-department",
    },
    {
      angle: "Steering gear, drag link, and tie rod symptoms worth documenting",
      category: "Maintenance Tips",
      mustCover: "free play, wander, binding, leaks, uneven steering effort, driver observations",
      internalLink: "/services/service-department",
    },
    {
      angle: "Engine mount wear signs that can feel like a driveline problem",
      category: "Maintenance Tips",
      mustCover: "cab vibration, movement under load, damaged rubber, fan clearance, exhaust stress",
      internalLink: "/services/service-department",
    },
    {
      angle: "Belt, tensioner, and pulley warning signs before an accessory drive failure",
      category: "Maintenance Tips",
      mustCover: "squeal, belt dust, cracks, wobble, bearing noise, inspection timing",
      internalLink: "/services/service-department",
    },
    {
      angle: "Charge air hose and clamp clues that can explain a loss of boost",
      category: "Maintenance Tips",
      mustCover: "oil mist, split boots, loose clamps, whistle sounds, power loss, driver notes",
      internalLink: "/services/service-department",
    },
    {
      angle: "Wiper, washer, and defroster problems that reduce working visibility",
      category: "Maintenance Tips",
      mustCover: "blade condition, washer flow, linkage, blower operation, glass condition, repair planning",
      internalLink: "/services/service-department",
    },
    {
      angle: "Mudflap, fender, and splash guard damage that should not wait",
      category: "Parts and Service",
      mustCover: "loose mounts, tire contact, sharp edges, road spray, corrosion, replacement details",
      internalLink: "/services/parts-department",
    },
    {
      angle: "Air tank moisture observations that help spot air system trouble",
      category: "Maintenance Tips",
      mustCover: "drain observations, oil or water, dryer performance, compressor cycling, service records",
      internalLink: "/services/service-department",
    },
    {
      angle: "Ride height valve symptoms that affect air suspension and tire wear",
      category: "Maintenance Tips",
      mustCover: "uneven stance, delayed response, air leaks, linkage damage, tire clearance",
      internalLink: "/services/service-department",
    },
    {
      angle: "Shock absorber wear clues on trucks and trailers working rough roads",
      category: "Maintenance Tips",
      mustCover: "leaks, bounce, cupping, loose mounts, heat, driver feedback",
      internalLink: "/services/service-department",
    },
    {
      angle: "Spring hanger and shackle wear signs that deserve a closer look",
      category: "Maintenance Tips",
      mustCover: "bushing wear, shifted components, rust trails, noise, ride height, inspection planning",
      internalLink: "/services/service-department",
    },
    {
      angle: "Hub oil and wheel seal observations to record between services",
      category: "Maintenance Tips",
      mustCover: "level, colour, leakage, contamination, heat, wheel-end service history",
      internalLink: "/services/service-department",
    },
    {
      angle: "Tire valve stem and inflation problems that create misleading wear patterns",
      category: "Equipment Guides",
      mustCover: "slow leaks, damaged caps, pressure records, dual tires, temperature, inspection routines",
      internalLink: "/services/service-department",
    },
    {
      angle: "What to document after a pothole or curb strike before alignment service",
      category: "Equipment Guides",
      mustCover: "impact location, steering change, tire damage, wheel condition, photos, driver notes",
      internalLink: "/services/service-department",
    },
    {
      angle: "Brake chamber and slack adjuster clues drivers can report accurately",
      category: "Maintenance Tips",
      mustCover: "air leaks, pull, stroke concerns, release behaviour, heat, safe inspection boundaries",
      internalLink: "/services/service-department",
    },
    {
      angle: "Slow air pressure build symptoms that deserve diagnosis before dispatch",
      category: "Maintenance Tips",
      mustCover: "build time, compressor cycling, warning indicators, leaks, dryer symptoms, driver reports",
      internalLink: "/services/service-department",
    },
    {
      angle: "Power steering leak and steering effort changes worth reporting early",
      category: "Maintenance Tips",
      mustCover: "fluid location, pump noise, effort by speed, hose condition, safe shutdown decisions",
      internalLink: "/services/service-department",
    },
    {
      angle: "Clutch engagement complaints that need more detail than it shifts badly",
      category: "Equipment Guides",
      mustCover: "engagement point, slip, chatter, temperature, load, linkage, driver description",
      internalLink: "/services/service-department",
    },
    {
      angle: "Automatic transmission shift notes that help separate a pattern from a one-time event",
      category: "Equipment Guides",
      mustCover: "gear, load, temperature, warning messages, fluid observations, repeat conditions",
      internalLink: "/services/service-department",
    },
    {
      angle: "Engine oil pressure warnings and observations to record before service",
      category: "Maintenance Tips",
      mustCover: "warning timing, gauge behaviour, oil level, leaks, temperature, safe shutdown",
      internalLink: "/services/service-department",
    },
    {
      angle: "Fuel tank strap, cap, and mounting problems that can grow quietly",
      category: "Maintenance Tips",
      mustCover: "loose straps, damaged isolators, seepage, cap seals, corrosion, inspection records",
      internalLink: "/services/service-department",
    },
    {
      angle: "Door hinge, latch, and weather seal wear that affects daily truck use",
      category: "Parts and Service",
      mustCover: "sag, closing effort, water entry, wind noise, hardware wear, replacement details",
      internalLink: "/services/parts-department",
    },
    {
      angle: "Work light and auxiliary lighting faults on trucks and forestry equipment",
      category: "Parts and Service",
      mustCover: "connectors, grounds, switches, vibration, mounting, safe troubleshooting",
      internalLink: "/services/parts-department",
    },
    {
      angle: "Lift axle control and air leak symptoms fleets should write down",
      category: "Maintenance Tips",
      mustCover: "response time, control behaviour, air leaks, load conditions, tire contact, service notes",
      internalLink: "/services/service-department",
    },
    {
      angle: "Dump body hoist and pivot checks before repeated cycling exposes wear",
      category: "Equipment Guides",
      mustCover: "pins, bushings, hydraulic leaks, cylinder mounts, controls, safe inspection",
      internalLink: "/services/service-department",
    },
    {
      angle: "Trailer slider pin and rail problems that complicate axle adjustment",
      category: "Parts and Service",
      mustCover: "pin engagement, air controls, debris, rail damage, lubrication, driver reporting",
      internalLink: "/services/service-department",
    },
    {
      angle: "Cargo anchor and rub rail damage to flag before the next loading cycle",
      category: "Equipment Guides",
      mustCover: "cracks, distortion, corrosion, loose fasteners, photos, repair planning",
      internalLink: "/services/service-department",
    },
    {
      angle: "Logging trailer bunk and stake wear checks for rough-road operations",
      category: "Forestry Equipment",
      mustCover: "mounts, cracks, pins, wear surfaces, load handling, operator notes",
      internalLink: "/services/service-department",
    },
    {
      angle: "Harvester measuring wheel and sensor clues that can affect production records",
      category: "Forestry Equipment",
      mustCover: "wear, debris, wiring, calibration symptoms, operator observations, service planning",
      internalLink: "/equipment/ecolog",
    },
    {
      angle: "Harvester saw unit wear signs crews should record between shifts",
      category: "Forestry Equipment",
      mustCover: "bar condition, chain behaviour, lubrication, mounts, cutting changes, parts planning",
      internalLink: "/equipment/ecolog",
    },
    {
      angle: "Forwarder bogie and articulation checks that support stable travel",
      category: "Forestry Equipment",
      mustCover: "pins, bushings, leaks, tire wear, movement, operator walkaround notes",
      internalLink: "/equipment/ecolog",
    },
    {
      angle: "Fluid sampling notes that make forestry equipment trend reports more useful",
      category: "Forestry Equipment",
      mustCover: "hours, sample point, top-ups, operating conditions, contamination, record consistency",
      internalLink: "/equipment/ecolog",
    },
    {
      angle: "Forestry cab glass, guarding, and access panel checks between jobs",
      category: "Forestry Equipment",
      mustCover: "damage, loose hardware, visibility, sealing, latches, operator reports",
      internalLink: "/equipment/ecolog",
    },
    {
      angle: "How to label and store critical spare parts for a working fleet",
      category: "Parts and Service",
      mustCover: "unit fitment, part numbers, shelf condition, reorder points, photos, inventory notes",
      internalLink: "/services/parts-department",
    },
    {
      angle: "Core return details that help a parts order close out cleanly",
      category: "Parts and Service",
      mustCover: "packaging, identification, condition, paperwork, timing, parts counter communication",
      internalLink: "/services/parts-department",
    },
    {
      angle: "How planned downtime windows help fleets combine related repairs",
      category: "Equipment Guides",
      mustCover: "inspection findings, parts lead time, shared labour, unit priority, records, scheduling",
      internalLink: "/services/service-department",
    },
    {
      angle: "How fleets can build a practical calendar around upcoming CVIP dates",
      category: "Equipment Guides",
      mustCover: "unit list, due dates, inspection records, repair lead time, driver reports, scheduling",
      internalLink: "/services/service-department/cvip-inspections",
    },
    {
      angle: "When a change in duty cycle should trigger a preventive maintenance review",
      category: "Maintenance Tips",
      mustCover: "loads, routes, idle time, dust, service intervals, maintenance records",
      internalLink: "/services/service-department/preventive-maintenance-fleet-programs",
    },
    {
      angle: "Diesel engine blow-by observations operators should describe before service",
      category: "Maintenance Tips",
      mustCover: "visible vapour, oil use, pressure signs, load, temperature, safe inspection boundaries",
      internalLink: "/services/service-department/diesel-engine-repair",
    },
    {
      angle: "U-joint and carrier bearing clues that can narrow down a driveline complaint",
      category: "Maintenance Tips",
      mustCover: "speed, load, vibration, grease, movement, recent driveline work",
      internalLink: "/services/service-department/transmission-drivetrain-repair",
    },
    {
      angle: "Air compressor cycling notes that help diagnose commercial brake system concerns",
      category: "Maintenance Tips",
      mustCover: "cycle frequency, build time, audible leaks, warning indicators, air use, driver notes",
      internalLink: "/services/service-department/commercial-brake-abs-repair",
    },
    {
      angle: "Connector pin corrosion clues behind intermittent truck electrical faults",
      category: "Parts and Service",
      mustCover: "moisture, pin condition, terminal fit, voltage drop, vibration, repair history",
      internalLink: "/services/service-department/electrical-diagnostics-repair",
    },
    {
      angle: "What a changing steering wheel position can tell a service team",
      category: "Maintenance Tips",
      mustCover: "alignment, tire wear, steering linkage, suspension movement, road impacts, driver notes",
      internalLink: "/services/service-department/steering-suspension-alignment",
    },
    {
      angle: "Hydraulic cylinder drift observations that make diagnosis more productive",
      category: "Equipment Guides",
      mustCover: "load, temperature, movement rate, external leaks, controls, safe blocking",
      internalLink: "/services/service-department/hydraulic-repair-hose-service",
    },
    {
      angle: "Truck-mounted crane control symptoms operators should document before repair",
      category: "Equipment Guides",
      mustCover: "affected function, boom position, load, hydraulic temperature, controls, safety devices",
      internalLink: "/services/service-department/crane-inspections-repair",
    },
    {
      angle: "Why reefer alarm history matters when a temperature fault disappears",
      category: "Maintenance Tips",
      mustCover: "set point, displayed temperature, alarm codes, ambient conditions, load, operating hours",
      internalLink: "/services/service-department/reefer-refrigeration-service",
    },
    {
      angle: "Why cracked truck brackets need the surrounding mounts inspected too",
      category: "Parts and Service",
      mustCover: "load path, fasteners, movement, corrosion, previous welds, repair planning",
      internalLink: "/services/service-department/welding-fabrication-frame-repair",
    },
    {
      angle: "Starting a Webasto heater before cold season exposes problems early",
      category: "Maintenance Tips",
      mustCover: "start cycle, controller faults, battery condition, coolant circulation, fuel, exhaust",
      internalLink: "/services/service-department/webasto-engine-cab-heaters",
    },
    {
      angle: "Information a shop needs before planning a PTO and wet kit installation",
      category: "Equipment Guides",
      mustCover: "truck specifications, driven equipment, flow, pressure, tank, controls, component fit",
      internalLink: "/services/service-department/truck-rigouts-pto-wet-kits",
    },
    {
      angle: "Engine and transmission tag photos that prevent wrong-fit parts orders",
      category: "Parts and Service",
      mustCover: "VIN limits, serial tags, model numbers, build codes, clear photos, modifications",
      internalLink: "/services/parts-department/engine-drivetrain-parts",
    },
    {
      angle: "Brake chamber markings and measurements to collect before calling for parts",
      category: "Parts and Service",
      mustCover: "type, size, stroke, mounting, ports, markings, safe measurement",
      internalLink: "/services/parts-department/brake-safety-parts",
    },
    {
      angle: "Electrical ratings and connector details that matter when ordering truck parts",
      category: "Parts and Service",
      mustCover: "voltage, amperage, connector face, terminals, mounting, part numbers",
      internalLink: "/services/parts-department/electrical-parts-components",
    },
    {
      angle: "How to document hydraulic hose length and fitting orientation for a parts request",
      category: "Parts and Service",
      mustCover: "hose markings, overall length, fitting type, orientation, routing, pressure safety",
      internalLink: "/services/parts-department/hydraulic-parts-hoses",
    },
    {
      angle: "Air spring markings and mounting details that help parts teams find a match",
      category: "Parts and Service",
      mustCover: "bellows markings, top and bottom mounts, air port, dimensions, axle, photos",
      internalLink: "/services/parts-department/suspension-steering-parts",
    },
    {
      angle: "How a unit-based filter list simplifies recurring fleet maintenance orders",
      category: "Parts and Service",
      mustCover: "VIN, engine model, filter numbers, service interval, substitutions, inventory records",
      internalLink: "/services/parts-department/filters-fluids-maintenance-parts",
    },
  ];
  return candidateAngles.filter((candidate) => {
    const candidatePost = {
      title: candidate.angle,
      slug: slugify(candidate.angle),
      excerpt: candidate.mustCover,
      body: candidate.angle,
    };

    return (
      !findExistingDuplicate(candidatePost, existingPosts) &&
      !findOverlappingRecentPost(candidatePost, existingPosts)
    );
  });
}

async function collectResearch(config) {
  const sources = [
    ...(config.industrySources || []),
    ...(config.competitors || []),
  ].slice(0, 8);

  const summaries = await Promise.all(
    sources.map((source) => fetchSourceSummary(source)),
  );

  return summaries
    .map((summary) => `${summary.name}: ${summary.url}\n${summary.summary}`)
    .join("\n\n")
    .slice(0, 2600);
}

async function fetchSourceSummary(source) {
  const name = cleanOneLine(source.name || source.title || "Source");
  const url = cleanOneLine(source.url);

  if (!isHttpUrl(url)) {
    return {
      name,
      url,
      summary: "Skipped because the URL is not valid.",
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "MundenBlogGenerator/1.0 (+https://mundengroup.ca)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return {
        name,
        url,
        summary: `Fetch returned HTTP ${response.status}. Use this source only as a broad topic signal.`,
      };
    }

    const html = await response.text();
    return {
      name,
      url,
      summary: extractPageSummary(html),
    };
  } catch (error) {
    return {
      name,
      url,
      summary: `Fetch failed: ${error.message}. Use this source only as a broad topic signal.`,
    };
  }
}

function extractPageSummary(html) {
  const title = extractFirstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description =
    extractFirstMatch(
      html,
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i,
    ) ||
    extractFirstMatch(
      html,
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["'][^>]*>/i,
    );
  const headings = [...html.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)]
    .slice(0, 8)
    .map((match) => cleanHtmlText(match[1]))
    .filter(Boolean);
  const bodyText = cleanHtmlText(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
      .replace(/<footer[\s\S]*?<\/footer>/gi, " "),
  )
    .split(/\s+/)
    .slice(0, 120)
    .join(" ");

  return [
    title ? `Title: ${cleanHtmlText(title)}` : "",
    description ? `Description: ${cleanHtmlText(description)}` : "",
    headings.length ? `Headings: ${headings.join(" | ")}` : "",
    bodyText ? `Snippet: ${bodyText}` : "",
  ]
    .filter(Boolean)
    .join("\n")
    .slice(0, 1200);
}

function extractFirstMatch(text, pattern) {
  const match = text.match(pattern);
  return match ? match[1] : "";
}

function cleanHtmlText(text) {
  return String(text || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function ensurePostImages(posts, config, since) {
  let updatedCount = 0;

  for (const post of posts) {
    if (since && post.date < since) {
      continue;
    }

    if (
      post.image.startsWith("/images/blog/") &&
      fs.existsSync(path.join(rootDir, "public", post.image.replace(/^\//, "")))
    ) {
      continue;
    }

    post.image = await createBlogImage(
      post,
      config,
      posts.filter((existingPost) => existingPost.slug !== post.slug),
    );
    fs.writeFileSync(post.filePath, serializePost(post));
    updatedCount += 1;
  }

  return updatedCount;
}

export async function createBlogImage(
  post,
  config,
  existingPosts = [],
  {
    env = process.env,
    fetchStockImage = fetchPexelsImage,
    createFallbackImage = createBrandedBlogImage,
    logger = console,
  } = {},
) {
  const mode = env.BLOG_IMAGE_MODE || "stock-preferred";
  const requiresStockImage = mode === "stock-required";

  if (mode === "local") {
    logger.warn("BLOG_IMAGE_MODE=local; using an existing site photo.");
    return selectExistingImage(post, config);
  }

  if (!env.PEXELS_API_KEY) {
    if (requiresStockImage) {
      throw new Error(
        "PEXELS_API_KEY is required for BLOG_IMAGE_MODE=stock-required. Add it as a GitHub Actions repository secret.",
      );
    }

    logger.warn("PEXELS_API_KEY is missing; generating a branded blog cover.");
    return createFallbackImage(post, config, existingPosts);
  }

  if (mode === "stock" || mode === "stock-preferred" || mode === "stock-required") {
    try {
      return await fetchStockImage(post, config, existingPosts, env.PEXELS_API_KEY);
    } catch (error) {
      if (requiresStockImage) {
        throw error;
      }

      logger.warn(`Pexels image fetch failed; generating a branded blog cover. ${error.message}`);
    }
  }

  return createFallbackImage(post, config, existingPosts);
}

async function fetchPexelsImage(post, config, existingPosts = [], apiKey = process.env.PEXELS_API_KEY) {
  const usedSources = new Set(
    existingPosts
      .map((existingPost) => existingPost.imageSource)
      .filter(Boolean),
  );
  const queries = buildPexelsQueries(post, config);
  let selectedPhoto = null;
  let selectedQuery = "";

  for (const query of queries) {
    console.log(`Searching Pexels for blog image: "${query}"`);
    const searchUrl = new URL("https://api.pexels.com/v1/search");
    searchUrl.searchParams.set("query", query);
    searchUrl.searchParams.set("orientation", "landscape");
    searchUrl.searchParams.set("size", "large");
    searchUrl.searchParams.set("per_page", "80");

    const searchResponse = await fetch(searchUrl, {
      headers: {
        Authorization: apiKey,
      },
    });
    const searchText = await searchResponse.text();

    if (!searchResponse.ok) {
      throw new Error(`Pexels search failed (${searchResponse.status}): ${searchText}`);
    }

    const data = JSON.parse(searchText);
    const photos = Array.isArray(data.photos) ? data.photos : [];
    const unusedPhotos = photos.filter((photo) => {
      return (
        photo?.url &&
        !usedSources.has(photo.url) &&
        !isBannedBlogImage(photo)
      );
    });

    if (unusedPhotos.length > 0) {
      selectedPhoto = unusedPhotos[Math.abs(hashString(post.slug)) % unusedPhotos.length];
      selectedQuery = query;
      break;
    }

    console.warn(`No unused Pexels photos found for query: "${query}"`);
  }

  if (!selectedPhoto) {
    throw new Error(
      `Pexels returned no unused photos across ${queries.length} search queries.`,
    );
  }

  console.log(`Selected an unused Pexels photo from query: "${selectedQuery}"`);
  const imageUrl =
    selectedPhoto?.src?.large2x ||
    selectedPhoto?.src?.large ||
    selectedPhoto?.src?.original;

  if (!imageUrl) {
    throw new Error("Selected Pexels photo did not include a usable image URL.");
  }

  const imageResponse = await fetch(imageUrl);

  if (!imageResponse.ok) {
    throw new Error(`Pexels image download failed (${imageResponse.status}).`);
  }

  const contentType = imageResponse.headers.get("content-type") || "";

  if (!contentType.startsWith("image/")) {
    throw new Error(`Pexels download was not an image: ${contentType}`);
  }

  fs.mkdirSync(blogImagesDir, { recursive: true });
  const extension = contentType.includes("png") ? "png" : "jpg";
  const imageFileName = `${post.date}-${post.slug}.${extension}`;
  const publicPath = `/images/blog/${imageFileName}`;
  const outputPath = path.join(blogImagesDir, imageFileName);
  const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
  fs.writeFileSync(outputPath, imageBuffer);
  console.log(`Downloaded Pexels blog image: ${path.relative(rootDir, outputPath)}`);

  post.imageCredit = selectedPhoto.photographer
    ? `Photo by ${selectedPhoto.photographer} on Pexels`
    : "Photo provided by Pexels";
  post.imageSource = selectedPhoto.url || "https://www.pexels.com/";

  return publicPath;
}

export function buildPexelsQueries(post, config) {
  const text = `${post.title} ${post.excerpt} ${post.keywords.join(" ")}`.toLowerCase();
  const queries = [];

  if (text.includes("forestry") || text.includes("harvester") || text.includes("forwarder")) {
    queries.push("forestry equipment logging road", "logging truck forest road");
  }

  if (text.includes("brake")) {
    queries.push("semi truck brake mechanic");
  }

  if (text.includes("electrical") || text.includes("battery") || text.includes("wiring")) {
    queries.push("truck electrical repair mechanic");
  }

  if (text.includes("mobile") || text.includes("roadside")) {
    queries.push("semi truck roadside service");
  }

  if (text.includes("trailer")) {
    queries.push("commercial semi trailer repair");
  }

  if (text.includes("inspection") || text.includes("safety") || text.includes("cvip")) {
    queries.push("commercial truck inspection garage");
  }

  if (text.includes("parts")) {
    queries.push("heavy truck parts workshop");
  }

  if (text.includes("service") || text.includes("repair") || text.includes("maintenance")) {
    queries.push("commercial truck mechanic workshop");
  }

  queries.push(...(config.imageSearchQueries || []), "semi truck highway");
  return [...new Set(queries)].slice(0, 5);
}

async function createBrandedBlogImage(post) {
  const { default: sharp } = await import("sharp");
  const imageFileName = `${post.date}-${post.slug}.jpg`;
  const publicPath = `/images/blog/${imageFileName}`;
  const outputPath = path.join(blogImagesDir, imageFileName);
  const svg = renderBrandedCoverSvg(post);

  fs.mkdirSync(blogImagesDir, { recursive: true });
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
    .toFile(outputPath);

  post.imageCredit = "Munden Truck & Equipment";
  post.imageSource = "";
  console.log(`Generated branded blog image: ${path.relative(rootDir, outputPath)}`);
  return publicPath;
}

export function renderBrandedCoverSvg(post) {
  const titleLines = wrapCoverTitle(post.title, 34, 3);
  const titleMarkup = titleLines
    .map(
      (line, index) =>
        `<tspan x="112" dy="${index === 0 ? 0 : 82}">${escapeXml(line)}</tspan>`,
    )
    .join("");
  const category = escapeXml(
    String(post.category || "Munden Resources").toUpperCase(),
  );
  const date = escapeXml(post.date || "");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#111827"/>
      <stop offset="65%" stop-color="#172554"/>
      <stop offset="100%" stop-color="#0f766e"/>
    </linearGradient>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#ffffff" stroke-opacity="0.055" stroke-width="2"/>
    </pattern>
  </defs>
  <rect width="1600" height="900" fill="url(#background)"/>
  <rect width="1600" height="900" fill="url(#grid)"/>
  <circle cx="1440" cy="110" r="330" fill="#f59e0b" fill-opacity="0.13"/>
  <circle cx="1500" cy="820" r="430" fill="#14b8a6" fill-opacity="0.12"/>
  <rect x="112" y="106" width="176" height="14" rx="7" fill="#f59e0b"/>
  <text x="112" y="184" fill="#fbbf24" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="700" letter-spacing="3">${category}</text>
  <text x="112" y="328" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="70" font-weight="700">${titleMarkup}</text>
  <line x1="112" y1="728" x2="1488" y2="728" stroke="#ffffff" stroke-opacity="0.28" stroke-width="2"/>
  <text x="112" y="800" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="700">MUNDEN TRUCK &amp; EQUIPMENT</text>
  <text x="1488" y="800" text-anchor="end" fill="#d1d5db" font-family="Arial, Helvetica, sans-serif" font-size="28">Kamloops, BC  •  ${date}</text>
</svg>`;
}

function wrapCoverTitle(value, maxCharacters, maxLines) {
  const words = cleanOneLine(value).split(" ").filter(Boolean);
  const lines = [];

  for (const word of words) {
    const current = lines.at(-1) || "";
    const candidate = current ? `${current} ${word}` : word;

    if (!current || candidate.length <= maxCharacters) {
      if (lines.length === 0) {
        lines.push(candidate);
      } else {
        lines[lines.length - 1] = candidate;
      }
      continue;
    }

    if (lines.length === maxLines) {
      lines[maxLines - 1] = `${lines[maxLines - 1].replace(/…$/, "")}…`;
      break;
    }

    lines.push(word);
  }

  if (lines.length > maxLines) {
    lines.length = maxLines;
  }

  if (words.join(" ").length > lines.join(" ").replace(/…$/, "").length) {
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/[.,;:!?…]+$/, "")}…`;
  }

  return lines;
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function isBannedBlogImage(photo) {
  const text = `${photo?.alt || ""} ${photo?.url || ""}`.toLowerCase();
  const bannedTerms = [
    "agriculture",
    "combine harvester",
    "crop",
    "farm",
    "farmer",
    "farming",
    "field",
    "tractor",
  ];

  return bannedTerms.some((term) => text.includes(term));
}

function selectExistingImage(post, config) {
  const images = config.imageOptions?.length
    ? config.imageOptions
    : [config.defaultImage];
  const text = `${post.title} ${post.excerpt} ${post.keywords.join(" ")}`.toLowerCase();

  if (text.includes("forestry") || text.includes("ecolog") || text.includes("harvester")) {
    return findImage(images, "harvester") || findImage(images, "forwarder") || config.defaultImage;
  }

  if (text.includes("forwarder")) {
    return findImage(images, "forwarder") || config.defaultImage;
  }

  if (text.includes("freeze") || text.includes("winter") || text.includes("air system")) {
    return findImage(images, "freeze") || config.defaultImage;
  }

  if (text.includes("steering") || text.includes("suspension") || text.includes("inspection") || text.includes("repair")) {
    return findImage(images, "steering") || config.defaultImage;
  }

  return images[Math.abs(hashString(post.slug)) % images.length] || config.defaultImage;
}

function findImage(images, match) {
  return images.find((image) => image.toLowerCase().includes(match));
}

function hashString(value) {
  let hash = 2166136261;

  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

async function createOpenAIResponse(options) {
  const maxAttempts = Number.parseInt(process.env.BLOG_OPENAI_RETRIES || "2", 10);

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const response = await fetch("https://api.openai.com/v1/responses", options);
    const text = await response.text();

    if (response.ok) {
      return {
        ok: true,
        status: response.status,
        text: async () => text,
      };
    }

    if (
      response.status === 429 &&
      attempt < maxAttempts &&
      !text.includes("Request too large")
    ) {
      const waitSeconds = extractRetrySeconds(text) ?? 35;
      if (waitSeconds > 90) {
        return {
          ok: false,
          status: response.status,
          text: async () => text,
        };
      }
      console.warn(`OpenAI rate limit hit. Retrying in ${waitSeconds}s...`);
      await sleep(waitSeconds * 1000);
      continue;
    }

    return {
      ok: false,
      status: response.status,
      text: async () => text,
    };
  }

  throw new Error("OpenAI request failed after retries.");
}

function normalizePost(post, config, date) {
  const slug = slugify(post.slug || post.title);
  let body = String(post.body || "").trim();
  body = ensureInternalLink(body, post.__topicPlan);
  const wordCount = body.split(/\s+/).filter(Boolean).length;
  const readMinutes = Math.max(3, Math.ceil(wordCount / 220));
  const image = config.imageOptions.includes(post.image)
    ? post.image
    : config.defaultImage;
  const sources = mergeSources(
    normalizeSources(post.sources),
    normalizeConfiguredSources(config.industrySources),
  ).slice(0, 8);

  return {
    title: cleanOneLine(post.title),
    slug,
    date,
    excerpt: cleanOneLine(post.excerpt),
    category: config.categories.includes(post.category)
      ? post.category
      : config.categories[0],
    author: cleanOneLine(post.author) || config.author,
    readTime: `${readMinutes} min read`,
    image,
    imageCredit: cleanOneLine(post.imageCredit),
    imageSource: cleanOneLine(post.imageSource),
    keywords: normalizeStringArray(post.keywords).slice(0, 10),
    sources,
    body,
  };
}

export function ensureInternalLink(body, topicPlan) {
  if (!topicPlan?.internalLink) {
    return body;
  }

  const escapedTarget = topicPlan.internalLink.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const targetPattern = new RegExp(`\\]\\(${escapedTarget}(?:[?#][^)]*)?\\)`);

  if (targetPattern.test(body)) {
    return body;
  }

  const label = topicPlan.linkLabel || "Munden team";

  return `${body}\n\nFor related support, connect with Munden's [${label}](${topicPlan.internalLink}).`;
}

function validateGeneratedPost(post, existingPosts, config, date) {
  const errors = validatePostShape(post, config);

  if (post.date !== date) {
    errors.push(`Post date must be ${date}.`);
  }

  const existingDuplicate = findExistingDuplicate(post, existingPosts, date);

  if (existingDuplicate) {
    errors.push(`Generated topic is too close to an existing post: ${existingDuplicate.title}`);
  }

  const overlappingPost = findOverlappingRecentPost(post, existingPosts, date);

  if (overlappingPost) {
    errors.push(
      `Generated topic overlaps a recent post: ${overlappingPost.title}`,
    );
  }

  if (errors.length > 0) {
    throw new Error(`Generated post failed validation:\n- ${errors.join("\n- ")}`);
  }
}

function validateStoredPosts(posts, config) {
  const errors = [];
  const seenSlugs = new Set();
  const seenStockImageSources = new Map();

  for (const post of posts) {
    for (const error of validatePostShape(post, config)) {
      errors.push(`${post.slug}: ${error}`);
    }

    if (seenSlugs.has(post.slug)) {
      errors.push(`${post.slug}: Duplicate slug.`);
    }

    seenSlugs.add(post.slug);

    if (post.imageSource && isHttpUrl(post.imageSource)) {
      const previousSlug = seenStockImageSources.get(post.imageSource);

      if (previousSlug) {
        errors.push(`${post.slug}: Reuses stock image source already used by ${previousSlug}.`);
      }

      seenStockImageSources.set(post.imageSource, post.slug);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Blog validation failed:\n- ${errors.join("\n- ")}`);
  }
}

function validatePostShape(post, config) {
  const errors = [];
  const combinedText = `${post.title}\n${post.excerpt}\n${post.body}`.toLowerCase();

  for (const field of ["title", "slug", "date", "excerpt", "category", "author", "readTime", "image", "body"]) {
    if (!post[field] || typeof post[field] !== "string") {
      errors.push(`Missing ${field}.`);
    }
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) {
    errors.push("Slug must use lowercase letters, numbers, and hyphens only.");
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date)) {
    errors.push("Date must use YYYY-MM-DD.");
  }

  if (!config.categories.includes(post.category)) {
    errors.push(`Category must be one of: ${config.categories.join(", ")}.`);
  }

  if (!Array.isArray(post.keywords) || post.keywords.length < 2) {
    errors.push("At least two keywords are required.");
  }

  if (!Array.isArray(post.sources) || post.sources.length < 2) {
    errors.push("At least two source URLs are required.");
  }

  for (const source of post.sources || []) {
    if (!source.title || !isHttpUrl(source.url)) {
      errors.push(`Invalid source: ${JSON.stringify(source)}.`);
    }
  }

  const bodyWords = post.body.split(/\s+/).filter(Boolean).length;

  if (bodyWords < 450) {
    errors.push("Body is too short for a useful resource article.");
  }

  if ((post.body.match(/^##\s+/gm) || []).length < 2) {
    errors.push("Body must include at least two H2 sections.");
  }

  if (/<\/?[a-z][\s\S]*>/i.test(post.body)) {
    errors.push("Body must be markdown only, with no raw HTML.");
  }

  if (!/\]\(\/(?:services|equipment|about)\//.test(post.body)) {
    errors.push("Body must include at least one internal site link.");
  }

  for (const bannedClaim of config.bannedClaims) {
    if (combinedText.includes(bannedClaim.toLowerCase())) {
      errors.push(`Banned claim found: ${bannedClaim}.`);
    }
  }

  for (const competitor of config.competitors || []) {
    const name = String(competitor.name || "").trim().toLowerCase();

    if (name.length > 3 && combinedText.includes(name)) {
      errors.push(`Competitor name appears in published content: ${competitor.name}.`);
    }
  }

  return errors;
}

function serializePost(post) {
  const frontmatterEntries = [
    ["title", post.title],
    ["slug", post.slug],
    ["date", post.date],
    ["excerpt", post.excerpt],
    ["category", post.category],
    ["author", post.author],
    ["readTime", post.readTime],
    ["image", post.image],
    ...(post.imageCredit ? [["imageCredit", post.imageCredit]] : []),
    ...(post.imageSource ? [["imageSource", post.imageSource]] : []),
    ["keywords", post.keywords],
    ["sources", post.sources],
  ];
  const frontmatter = frontmatterEntries
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join("\n");

  return `---\n${frontmatter}\n---\n\n${post.body.trim()}\n`;
}

export function readExistingPosts() {
  if (!fs.existsSync(resourcesDir)) {
    return [];
  }

  return fs
    .readdirSync(resourcesDir)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const filePath = path.join(resourcesDir, fileName);
      const raw = fs.readFileSync(filePath, "utf8");
      const { frontmatter, body } = parseFrontmatter(raw, filePath);

      return {
        filePath,
        title: String(frontmatter.title || ""),
        slug: String(frontmatter.slug || fileName.replace(/\.md$/, "")),
        date: String(frontmatter.date || ""),
        excerpt: String(frontmatter.excerpt || ""),
        category: String(frontmatter.category || ""),
        author: String(frontmatter.author || ""),
        readTime: String(frontmatter.readTime || ""),
        image: String(frontmatter.image || ""),
        imageCredit: String(frontmatter.imageCredit || ""),
        imageSource: String(frontmatter.imageSource || ""),
        keywords: Array.isArray(frontmatter.keywords) ? frontmatter.keywords : [],
        sources: Array.isArray(frontmatter.sources) ? frontmatter.sources : [],
        body,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

function parseFrontmatter(raw, filePath) {
  if (!raw.startsWith("---\n")) {
    throw new Error(`Missing frontmatter in ${filePath}`);
  }

  const endIndex = raw.indexOf("\n---", 4);

  if (endIndex === -1) {
    throw new Error(`Unclosed frontmatter in ${filePath}`);
  }

  const frontmatterText = raw.slice(4, endIndex).trim();
  const body = raw.slice(endIndex + 4).trim();
  const frontmatter = {};

  for (const line of frontmatterText.split("\n")) {
    if (!line.trim()) {
      continue;
    }

    const separator = line.indexOf(":");
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    frontmatter[key] = parseFrontmatterValue(value);
  }

  return { frontmatter, body };
}

function parseFrontmatterValue(value) {
  if (value.startsWith("[") || value.startsWith("{")) {
    return JSON.parse(value);
  }

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function extractOutputText(data) {
  if (typeof data.output_text === "string") {
    return data.output_text;
  }

  const parts = [];

  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === "string") {
        parts.push(content.text);
      }
    }
  }

  return parts.join("\n").trim();
}

function parseModelJson(text) {
  const trimmed = text.trim();
  const withoutFence = trimmed
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  return JSON.parse(withoutFence);
}

function extractRetrySeconds(text) {
  const secondMatch = text.match(/try again in ([0-9.]+)s/i);

  if (secondMatch) {
    return Math.ceil(Number.parseFloat(secondMatch[1]) + 2);
  }

  const minuteMatch = text.match(/try again in ([0-9.]+)m/i);

  if (minuteMatch) {
    return Math.ceil(Number.parseFloat(minuteMatch[1]) * 60);
  }

  const hourMatch = text.match(/try again in ([0-9.]+)h/i);

  if (hourMatch) {
    return Math.ceil(Number.parseFloat(hourMatch[1]) * 60 * 60);
  }

  return null;
}

function isLongRateLimitError(error) {
  const message = String(error?.message || "");

  if (!message.includes("rate_limit_exceeded")) {
    return false;
  }

  const waitSeconds = extractRetrySeconds(message);
  return waitSeconds === null || waitSeconds > 90;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function loadLocalEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separator = trimmed.indexOf("=");

    if (separator === -1) {
      continue;
    }

    const key = trimmed.slice(0, separator).trim();
    const rawValue = trimmed.slice(separator + 1).trim();
    const value = rawValue
      .replace(/^"(.*)"$/, "$1")
      .replace(/^'(.*)'$/, "$1");

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function getArgValue(name) {
  const arg = args.find((item) => item.startsWith(`${name}=`));
  return arg ? arg.slice(name.length + 1) : null;
}

function parsePositiveIntegerArg(name, value) {
  if (value === null) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);

  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`${name} must be a positive integer.`);
  }

  return parsed;
}

function getDateInTimeZone(date, zone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function getBackfillDates(existingPosts, from, to) {
  const latestPostDate = existingPosts[0]?.date;
  const startDate = from ?? addDays(latestPostDate ?? to, latestPostDate ? 1 : 0);
  const endDate = to;

  assertDateString(startDate, "--from");
  assertDateString(endDate, "--to");

  const existingDates = new Set(existingPosts.map((post) => post.date));
  const dates = [];
  let cursor = parseDateString(startDate);
  const end = parseDateString(endDate);

  while (cursor <= end) {
    const date = formatDateString(cursor);

    if (!existingDates.has(date)) {
      dates.push(date);
    }

    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return dates;
}

function assertDateString(value, name) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ""))) {
    throw new Error(`${name} must use YYYY-MM-DD format.`);
  }
}

function parseDateString(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function formatDateString(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(value, days) {
  const date = value instanceof Date ? new Date(value) : parseDateString(value);
  date.setUTCDate(date.getUTCDate() + days);
  return formatDateString(date);
}

function cleanOneLine(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function normalizeStringArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(cleanOneLine).filter(Boolean);
}

function normalizeSources(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((source) => ({
      title: cleanOneLine(source.title),
      url: cleanOneLine(source.url),
    }))
    .filter((source) => source.title && isHttpUrl(source.url));
}

function normalizeConfiguredSources(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((source) => ({
      title: cleanOneLine(source.title || source.name),
      url: cleanOneLine(source.url),
    }))
    .filter((source) => source.title && isHttpUrl(source.url));
}

function mergeSources(primarySources, fallbackSources) {
  const merged = [];
  const seen = new Set();

  for (const source of [...primarySources, ...fallbackSources]) {
    if (seen.has(source.url)) {
      continue;
    }

    seen.add(source.url);
    merged.push(source);
  }

  return merged;
}

function slugify(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 80);
}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function findOverlappingRecentPost(post, existingPosts, date) {
  const recentPosts = existingPosts
    .filter((existingPost) => existingPost.date !== date)
    .slice(0, 10);

  return recentPosts.find((existingPost) => {
    const titleScore = titleSimilarity(existingPost.title, post.title);
    const topicScore = topicSimilarity(existingPost, post);
    return titleScore > 0.46 || topicScore > 0.4;
  });
}

export function findExistingDuplicate(post, existingPosts, date) {
  return existingPosts.find(
    (existingPost) =>
      (date && existingPost.date === date) ||
      existingPost.slug === post.slug ||
      titleSimilarity(existingPost.title, post.title) > 0.62,
  );
}

function topicSimilarity(a, b) {
  const aTokens = contentTokens(
    `${a.title} ${a.excerpt} ${extractMarkdownHeadings(a.body)}`,
  );
  const bTokens = contentTokens(
    `${b.title} ${b.excerpt} ${extractMarkdownHeadings(b.body)}`,
  );

  if (aTokens.size === 0 || bTokens.size === 0) {
    return 0;
  }

  const intersection = [...aTokens].filter((token) => bTokens.has(token)).length;
  const smallerSetSize = Math.min(aTokens.size, bTokens.size);

  return intersection / smallerSetSize;
}

function extractMarkdownHeadings(markdown) {
  return String(markdown || "")
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .join(" ");
}

function titleSimilarity(a, b) {
  const aTokens = titleTokens(a);
  const bTokens = titleTokens(b);

  if (aTokens.size === 0 || bTokens.size === 0) {
    return 0;
  }

  const intersection = [...aTokens].filter((token) => bTokens.has(token)).length;
  const union = new Set([...aTokens, ...bTokens]).size;

  return intersection / union;
}

function titleTokens(value) {
  return contentTokens(value);
}

function contentTokens(value) {
  const stopWords = new Set([
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "before",
    "busy",
    "can",
    "for",
    "for",
    "from",
    "get",
    "how",
    "in",
    "into",
    "is",
    "it",
    "its",
    "know",
    "more",
    "should",
    "of",
    "on",
    "or",
    "our",
    "this",
    "the",
    "their",
    "they",
    "to",
    "what",
    "what",
    "when",
    "where",
    "who",
    "why",
    "with",
    "your",
  ]);

  return new Set(
    String(value)
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((token) => token.length > 2 && !stopWords.has(token)),
  );
}
