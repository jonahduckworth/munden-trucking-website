#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const configPath = path.join(rootDir, "content", "blog-config.json");
const resourcesDir = path.join(rootDir, "content", "resources");
const blogImagesDir = path.join(rootDir, "public", "images", "blog");
const timeZone = "America/Edmonton";

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

loadLocalEnv(path.join(rootDir, ".env.local"));

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

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

    let posts = existingPosts;
    let generatedCount = 0;

    for (const date of dates) {
      let generatedPost = null;

      try {
        generatedPost = await generatePostForDate(config, posts, date);
      } catch (error) {
        if (isLongRateLimitError(error) && generatedCount > 0) {
          console.warn(
            `Stopping backfill after ${generatedCount} generated post(s) because OpenAI returned a long rate-limit reset.`,
          );
          console.warn(error.message);
          return;
        }

        throw error;
      }

      generatedCount += 1;

      if (isDryRun && generatedPost) {
        posts = [generatedPost, ...posts].sort((a, b) => b.date.localeCompare(a.date));
      } else {
        posts = readExistingPosts();
      }
    }

    return;
  }

  await generatePostForDate(config, existingPosts, targetDate);
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
  const topicPlan = chooseTopicPlan(existingPosts, date, rejectedTopics);
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
  const allowedTopicAngles = buildAllowedTopicAngles(existingPosts);

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
      internalLinks: config.requiredInternalLinks
        .slice(0, 4)
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
        "Write 475 to 625 words.",
        "Avoid invented certifications, hours, prices, warranties, or service guarantees.",
        "For image guidance, prefer commercial trucks, trailers, repair shops, parts counters, forestry roads, logging trucks, or EcoLog forestry equipment. Do not request farm tractors, farm fields, crop agriculture, or unrelated agricultural machinery.",
      ],
    },
  );
}

function chooseTopicPlan(existingPosts, date, rejectedTopics = []) {
  const allowedTopicAngles = buildAllowedTopicAngles(existingPosts);
  const rejectedText = rejectedTopics.join(" ").toLowerCase();
  const availableAngles = allowedTopicAngles.filter((candidate) => {
    const keyPhrase = candidate.angle.toLowerCase().slice(0, 44);
    return !rejectedText.includes(keyPhrase);
  });
  const angles = availableAngles.length > 0 ? availableAngles : allowedTopicAngles;

  if (angles.length === 0) {
    throw new Error("No unused blog topic angles are available. Add more candidate angles before generating another post.");
  }

  return angles[(hashString(date) + rejectedTopics.length) % angles.length];
}

function buildAllowedTopicAngles(existingPosts) {
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
  ];
  const unusedAngles = candidateAngles.filter((candidate) => {
    return !existingPosts.slice(0, 25).some((post) => {
      return (
        post.slug === slugify(candidate.angle) ||
        titleSimilarity(post.title, candidate.angle) > 0.58
      );
    });
  });
  const filteredAngles = unusedAngles.filter((candidate) => {
    const candidatePost = {
      title: candidate.angle,
      excerpt: candidate.mustCover,
      body: candidate.angle,
    };

    return !existingPosts.slice(0, 10).some((post) => {
      return (
        titleSimilarity(post.title, candidate.angle) > 0.42 ||
        topicSimilarity(post, candidatePost) > 0.32
      );
    });
  });
  const angles = filteredAngles.length > 0 ? filteredAngles : unusedAngles;

  return angles.slice(0, 16);
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

async function createBlogImage(post, config, existingPosts = []) {
  const mode = process.env.BLOG_IMAGE_MODE || "stock-required";
  const requiresStockImage = mode === "stock-required";

  if (mode === "local") {
    console.warn("BLOG_IMAGE_MODE=local; using an existing site photo.");
    return selectExistingImage(post, config);
  }

  if (!process.env.PEXELS_API_KEY) {
    if (requiresStockImage) {
      throw new Error(
        "PEXELS_API_KEY is required for BLOG_IMAGE_MODE=stock-required. Add it as a GitHub Actions repository secret.",
      );
    }

    console.warn("PEXELS_API_KEY is missing; using an existing site photo.");
    return selectExistingImage(post, config);
  }

  if (mode === "stock" || mode === "stock-required") {
    try {
      return await fetchPexelsImage(post, config, existingPosts);
    } catch (error) {
      if (requiresStockImage) {
        throw error;
      }

      console.warn(`Pexels image fetch failed; using existing site photo. ${error.message}`);
    }
  }

  return selectExistingImage(post, config);
}

async function fetchPexelsImage(post, config, existingPosts = []) {
  const query = buildPexelsQuery(post, config);
  console.log(`Searching Pexels for blog image: "${query}"`);
  const searchUrl = new URL("https://api.pexels.com/v1/search");
  searchUrl.searchParams.set("query", query);
  searchUrl.searchParams.set("orientation", "landscape");
  searchUrl.searchParams.set("size", "large");
  searchUrl.searchParams.set("per_page", "20");

  const searchResponse = await fetch(searchUrl, {
    headers: {
      Authorization: process.env.PEXELS_API_KEY,
    },
  });
  const searchText = await searchResponse.text();

  if (!searchResponse.ok) {
    throw new Error(`Pexels search failed (${searchResponse.status}): ${searchText}`);
  }

  const data = JSON.parse(searchText);
  const photos = Array.isArray(data.photos) ? data.photos : [];

  if (photos.length === 0) {
    throw new Error(`No Pexels photos found for query: ${query}`);
  }

  const usedSources = new Set(
    existingPosts
      .map((existingPost) => existingPost.imageSource)
      .filter(Boolean),
  );
  const unusedPhotos = photos.filter((photo) => {
    return (
      photo?.url &&
      !usedSources.has(photo.url) &&
      !isBannedBlogImage(photo)
    );
  });

  if (unusedPhotos.length === 0) {
    throw new Error(`Pexels returned only previously used photos for query: ${query}`);
  }

  const selectedPhoto = unusedPhotos[Math.abs(hashString(post.slug)) % unusedPhotos.length];
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

function buildPexelsQuery(post, config) {
  const text = `${post.title} ${post.excerpt} ${post.keywords.join(" ")}`.toLowerCase();

  if (text.includes("forestry") || text.includes("harvester") || text.includes("forwarder")) {
    return "logging truck forest road";
  }

  if (text.includes("parts") || text.includes("service") || text.includes("repair")) {
    return "commercial truck mechanic repair shop";
  }

  if (text.includes("inspection") || text.includes("safety") || text.includes("cvip")) {
    return "commercial truck inspection garage";
  }

  if (text.includes("mobile") || text.includes("roadside")) {
    return "semi truck roadside service";
  }

  return config.imageSearchQueries?.[0] || "semi truck highway";
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

function ensureInternalLink(body, topicPlan) {
  if (/\]\(\/(?:services|equipment|about)\//.test(body) || !topicPlan?.internalLink) {
    return body;
  }

  const linkLabels = {
    "/services/service-department": "service department",
    "/services/parts-department": "parts department",
    "/services/mobile-service": "mobile service team",
    "/equipment/ecolog": "EcoLog forestry equipment support",
    "/about/contact": "Munden team",
  };
  const label = linkLabels[topicPlan.internalLink] || "Munden team";

  return `${body}\n\nFor related support, connect with Munden's [${label}](${topicPlan.internalLink}).`;
}

function validateGeneratedPost(post, existingPosts, config, date) {
  const errors = validatePostShape(post, config);

  if (post.date !== date) {
    errors.push(`Post date must be ${date}.`);
  }

  const existingDuplicate = existingPosts.find(
    (existingPost) =>
      existingPost.date === date ||
      existingPost.slug === post.slug ||
      titleSimilarity(existingPost.title, post.title) > 0.62,
  );

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

function readExistingPosts() {
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
