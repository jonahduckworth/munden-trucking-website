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
const force = args.includes("--force");
const targetDate =
  getArgValue("--date") ?? getDateInTimeZone(new Date(), timeZone);
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

  const existingForDate = existingPosts.find((post) => post.date === targetDate);

  if (existingForDate && !force) {
    throw new Error(
      `A resource post already exists for ${targetDate}: ${existingForDate.slug}. Use --force to override this guard.`,
    );
  }

  const normalizedPost = await generateValidatedPost(config, existingPosts, targetDate);

  const fileName = `${targetDate}-${normalizedPost.slug}.md`;
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
    return;
  }

  normalizedPost.image = await createBlogImage(normalizedPost, config);
  validateGeneratedPost(normalizedPost, existingPosts, config, targetDate);

  const serializedPost = serializePost(normalizedPost);

  fs.mkdirSync(resourcesDir, { recursive: true });
  fs.writeFileSync(outputPath, serializedPost);
  console.log(`Created ${path.relative(rootDir, outputPath)}`);
}

async function generateValidatedPost(config, existingPosts, date) {
  const maxAttempts = Number.parseInt(process.env.BLOG_TOPIC_ATTEMPTS || "3", 10);
  const rejectedTopics = [];
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const generatedPost = await generatePost(
        config,
        existingPosts,
        date,
        rejectedTopics,
      );
      const normalizedPost = normalizePost(generatedPost, config, date);
      validateGeneratedPost(normalizedPost, existingPosts, config, date);
      return normalizedPost;
    } catch (error) {
      lastError = error;
      rejectedTopics.push(`Rejected attempt: ${error.message}`.slice(0, 260));

      if (attempt < maxAttempts) {
        console.warn(
          `Generated post failed validation. Retrying with a different angle (${attempt}/${maxAttempts})...`,
        );
      }
    }
  }

  throw lastError;
}

async function generatePost(config, existingPosts, date, rejectedTopics = []) {
  const model = process.env.OPENAI_MODEL || process.env.BLOG_OPENAI_MODEL || "gpt-5.4-mini";
  const maxOutputTokens = Number.parseInt(
    process.env.BLOG_MAX_OUTPUT_TOKENS || "3500",
    10,
  );
  const researchDigest = await collectResearch(config);
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

  return parseModelJson(outputText);
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
) {
  const existingSummaries = existingPosts
    .slice(0, 10)
    .map(
      (post) =>
        `${post.date}: ${post.title} [${post.category}] ${post.excerpt.slice(0, 150)}`,
    )
    .join("\n");

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
      researchDigest,
      outputFields:
        "title, slug, date, excerpt, category, author, readTime, image, keywords, sources, body",
      categories: config.categories.join(" | "),
      requirements: [
        "Choose a topic, seasonal angle, equipment system, and customer problem that are meaningfully different from every existing post listed.",
        "Do not write another pre-season checklist, spring/summer readiness, fleet-owner prep, freeze-up prevention, steering/suspension, employee-retention, or forestry-uncertainty article if one appears in existingPosts.",
        "Use the research digest for competitor and industry topic gaps, but do not name competitors in the article.",
        "Use at least three credible source URLs in the sources array from the research digest or Munden site.",
        "Include 1 or 2 internal markdown links in the body using natural anchor text, not exact SEO keyword phrases.",
        "Write 550 to 750 words.",
        "Avoid invented certifications, hours, prices, warranties, or service guarantees.",
      ],
    },
  );
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
    .slice(0, 5000);
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
          "MundenBlogGenerator/1.0 (+https://mundentruckequipment.com)",
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

    post.image = await createBlogImage(post, config);
    fs.writeFileSync(post.filePath, serializePost(post));
    updatedCount += 1;
  }

  return updatedCount;
}

async function createBlogImage(post, config) {
  const mode = process.env.BLOG_IMAGE_MODE || "stock";

  if (mode !== "local" && process.env.PEXELS_API_KEY) {
    try {
      return await fetchPexelsImage(post, config);
    } catch (error) {
      console.warn(`Pexels image fetch failed; using existing site photo. ${error.message}`);
    }
  }

  return selectExistingImage(post, config);
}

async function fetchPexelsImage(post, config) {
  const query = buildPexelsQuery(post, config);
  const searchUrl = new URL("https://api.pexels.com/v1/search");
  searchUrl.searchParams.set("query", query);
  searchUrl.searchParams.set("orientation", "landscape");
  searchUrl.searchParams.set("size", "large");
  searchUrl.searchParams.set("per_page", "10");

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

  const selectedPhoto = photos[Math.abs(hashString(post.slug)) % photos.length];
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

  post.imageCredit = selectedPhoto.photographer
    ? `Photo by ${selectedPhoto.photographer} on Pexels`
    : "Photo provided by Pexels";
  post.imageSource = selectedPhoto.url || "https://www.pexels.com/";

  return publicPath;
}

function buildPexelsQuery(post, config) {
  const text = `${post.title} ${post.excerpt} ${post.keywords.join(" ")}`.toLowerCase();

  if (text.includes("forestry") || text.includes("harvester") || text.includes("forwarder")) {
    return "logging truck forestry equipment";
  }

  if (text.includes("parts") || text.includes("service") || text.includes("repair")) {
    return "truck mechanic repair shop";
  }

  if (text.includes("inspection") || text.includes("safety") || text.includes("cvip")) {
    return "commercial truck inspection";
  }

  if (text.includes("mobile") || text.includes("roadside")) {
    return "semi truck roadside service";
  }

  return config.imageSearchQueries?.[0] || "semi truck highway";
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
  const body = String(post.body || "").trim();
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

  for (const post of posts) {
    for (const error of validatePostShape(post, config)) {
      errors.push(`${post.slug}: ${error}`);
    }

    if (seenSlugs.has(post.slug)) {
      errors.push(`${post.slug}: Duplicate slug.`);
    }

    seenSlugs.add(post.slug);
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
  const match = text.match(/try again in ([0-9.]+)s/i);
  return match ? Math.ceil(Number.parseFloat(match[1]) + 2) : null;
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
    return titleScore > 0.38 || topicScore > 0.24;
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
