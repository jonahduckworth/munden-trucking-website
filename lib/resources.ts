import fs from "node:fs";
import path from "node:path";

export type ResourceSource = {
  title: string;
  url: string;
};

export type ResourcePost = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  image: string;
  imageCredit?: string;
  imageSource?: string;
  keywords: string[];
  sources: ResourceSource[];
  body: string;
};

const resourcesDirectory = path.join(process.cwd(), "content", "resources");
const defaultImage = "/images/equipment/blog1.jpeg";

type FrontmatterValue = string | string[] | ResourceSource[];

type ParsedFrontmatter = {
  [key: string]: FrontmatterValue | undefined;
};

export function getAllResourcePosts(): ResourcePost[] {
  if (!fs.existsSync(resourcesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(resourcesDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const filePath = path.join(resourcesDirectory, fileName);
      const raw = fs.readFileSync(filePath, "utf8");
      return parseResourcePost(raw, filePath);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getResourcePost(slug: string): ResourcePost | null {
  return getAllResourcePosts().find((post) => post.slug === slug) ?? null;
}

export function getResourceCategories(posts = getAllResourcePosts()): string[] {
  return Array.from(new Set(posts.map((post) => post.category))).sort();
}

export function formatResourceDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);

  if (!year || !month || !day) {
    return date;
  }

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let paragraph: string[] = [];
  let listType: "ul" | "ol" | null = null;

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }

    html.push(
      `<p class="mb-8 text-lg leading-8">${renderInlineMarkdown(
        paragraph.join(" "),
      )}</p>`,
    );
    paragraph = [];
  };

  const closeList = () => {
    if (!listType) {
      return;
    }

    html.push(`</${listType}>`);
    listType = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      closeList();
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      closeList();
      html.push(
        `<h3 class="mb-4 mt-10 text-2xl font-bold">${renderInlineMarkdown(
          trimmed.slice(4),
        )}</h3>`,
      );
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      closeList();
      html.push(
        `<h2 class="mb-6 mt-16 text-3xl font-bold text-munden-burgundy">${renderInlineMarkdown(
          trimmed.slice(3),
        )}</h2>`,
      );
      continue;
    }

    if (trimmed.startsWith("- ")) {
      flushParagraph();

      if (listType !== "ul") {
        closeList();
        html.push('<ul class="mb-8 list-disc space-y-3 pl-8 text-lg leading-8">');
        listType = "ul";
      }

      html.push(`<li>${renderInlineMarkdown(trimmed.slice(2))}</li>`);
      continue;
    }

    const orderedListMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (orderedListMatch) {
      flushParagraph();

      if (listType !== "ol") {
        closeList();
        html.push(
          '<ol class="mb-8 list-decimal space-y-3 pl-8 text-lg leading-8">',
        );
        listType = "ol";
      }

      html.push(`<li>${renderInlineMarkdown(orderedListMatch[1])}</li>`);
      continue;
    }

    closeList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  closeList();

  return html.join("\n");
}

function parseResourcePost(raw: string, filePath: string): ResourcePost {
  const { frontmatter, body } = parseFrontmatter(raw, filePath);
  const slug =
    readString(frontmatter.slug) ||
    path.basename(filePath, path.extname(filePath)).replace(/^\d{4}-\d{2}-\d{2}-/, "");

  return {
    title: requireString(frontmatter.title, "title", filePath),
    slug,
    date: requireString(frontmatter.date, "date", filePath),
    excerpt: requireString(frontmatter.excerpt, "excerpt", filePath),
    category: requireString(frontmatter.category, "category", filePath),
    author: requireString(frontmatter.author, "author", filePath),
    readTime: requireString(frontmatter.readTime, "readTime", filePath),
    image: readString(frontmatter.image) || defaultImage,
    imageCredit: readString(frontmatter.imageCredit),
    imageSource: readString(frontmatter.imageSource),
    keywords: readStringArray(frontmatter.keywords),
    sources: readSources(frontmatter.sources),
    body,
  };
}

function parseFrontmatter(raw: string, filePath: string) {
  if (!raw.startsWith("---\n")) {
    throw new Error(`Missing frontmatter in ${filePath}`);
  }

  const endIndex = raw.indexOf("\n---", 4);

  if (endIndex === -1) {
    throw new Error(`Unclosed frontmatter in ${filePath}`);
  }

  const frontmatterText = raw.slice(4, endIndex).trim();
  const body = raw.slice(endIndex + 4).trim();
  const frontmatter: ParsedFrontmatter = {};

  for (const line of frontmatterText.split("\n")) {
    if (!line.trim()) {
      continue;
    }

    const separator = line.indexOf(":");

    if (separator === -1) {
      throw new Error(`Invalid frontmatter line in ${filePath}: ${line}`);
    }

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    frontmatter[key] = parseFrontmatterValue(value, filePath, key);
  }

  return { frontmatter, body };
}

function parseFrontmatterValue(
  value: string,
  filePath: string,
  key: string,
): FrontmatterValue {
  if (value.startsWith("[") || value.startsWith("{")) {
    try {
      return JSON.parse(value);
    } catch {
      throw new Error(`Invalid JSON frontmatter value for ${key} in ${filePath}`);
    }
  }

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function requireString(
  value: FrontmatterValue | undefined,
  key: string,
  filePath: string,
): string {
  const stringValue = readString(value);

  if (!stringValue) {
    throw new Error(`Missing required frontmatter field ${key} in ${filePath}`);
  }

  return stringValue;
}

function readString(value: FrontmatterValue | undefined): string {
  return typeof value === "string" ? value : "";
}

function readStringArray(value: FrontmatterValue | undefined): string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
    ? value
    : [];
}

function readSources(value: FrontmatterValue | undefined): ResourceSource[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is ResourceSource =>
      typeof item === "object" &&
      item !== null &&
      "title" in item &&
      "url" in item &&
      typeof item.title === "string" &&
      typeof item.url === "string",
  );
}

function renderInlineMarkdown(text: string): string {
  const linkPattern = /\[([^\]]+)]\(([^)]+)\)/g;
  let result = "";
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    result += escapeHtml(text.slice(lastIndex, match.index));
    result += `<a class="font-medium text-munden-burgundy underline underline-offset-4" href="${sanitizeHref(
      match[2],
    )}">${escapeHtml(match[1])}</a>`;
    lastIndex = match.index + match[0].length;
  }

  result += escapeHtml(text.slice(lastIndex));

  return result
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function sanitizeHref(href: string): string {
  const trimmed = href.trim();

  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return escapeAttribute(trimmed);
  }

  if (trimmed.startsWith("mailto:")) {
    return escapeAttribute(trimmed);
  }

  try {
    const url = new URL(trimmed);

    if (url.protocol === "http:" || url.protocol === "https:") {
      return escapeAttribute(url.toString());
    }
  } catch {
    return "#";
  }

  return "#";
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(text: string): string {
  return escapeHtml(text).replace(/`/g, "&#096;");
}
