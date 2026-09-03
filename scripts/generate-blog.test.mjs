import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import {
  buildAllowedTopicAngles,
  buildPexelsQueries,
  chooseTopicPlan,
  createBlogImage,
  ensureInternalLink,
  findExistingDuplicate,
  readExistingPosts,
  renderBrandedCoverSvg,
  routeTopicPlan,
  runBackfillDates,
} from "./generate-blog.mjs";

const blogConfig = JSON.parse(
  fs.readFileSync(new URL("../content/blog-config.json", import.meta.url), "utf8"),
);
const departmentPageSource = fs.readFileSync(
  new URL("../lib/department-pages.ts", import.meta.url),
  "utf8",
);

test("topic selection rejects a duplicate anywhere in the full post library", () => {
  const posts = Array.from({ length: 30 }, (_, index) => ({
    date: `2026-06-${String(30 - index).padStart(2, "0")}`,
    title: `Unrelated maintenance note ${index}`,
    slug: `unrelated-maintenance-note-${index}`,
    excerpt: "",
    body: "",
  }));

  posts[29] = {
    ...posts[29],
    title: "Hydraulic Hose Warning Signs Before a Small Leak Becomes Downtime",
    slug: "hydraulic-hose-warning-signs-before-a-small-leak-becomes-downtime",
  };

  const allowedTitles = buildAllowedTopicAngles(posts).map(({ angle }) => angle);

  assert.ok(
    !allowedTitles.includes(
      "Hydraulic hose warning signs before a small leak becomes downtime",
    ),
  );
});

test("the current library has a distinct topic available for the next run", () => {
  const posts = readExistingPosts();
  const allowedAngles = buildAllowedTopicAngles(posts);

  assert.ok(allowedAngles.length > 0, "Expected at least one unused topic angle.");

  for (const candidate of allowedAngles) {
    const duplicate = findExistingDuplicate(
      {
        title: candidate.angle,
        slug: candidate.angle
          .toLowerCase()
          .replace(/&/g, " and ")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, ""),
      },
      posts,
    );

    assert.equal(duplicate, undefined, `${candidate.angle} duplicates ${duplicate?.title}.`);
  }
});

test("a rejected topic is not selected again on the next attempt", () => {
  const posts = readExistingPosts();
  const first = chooseTopicPlan(posts, "2026-07-08");
  const second = chooseTopicPlan(
    posts,
    "2026-07-08",
    [`Rejected "${first.angle}" because it overlapped an existing post.`],
  );

  assert.notEqual(second.angle, first.angle);
});

test("service topics route to the most relevant dedicated landing page", () => {
  const routed = routeTopicPlan(
    {
      angle: "Air brake leak clues drivers should report",
      mustCover: "brake chamber, air pressure, compressor cycling",
      internalLink: "/services/service-department",
    },
    blogConfig,
  );

  assert.equal(
    routed.internalLink,
    "/services/service-department/commercial-brake-abs-repair",
  );
  assert.equal(routed.linkLabel, "commercial brake and ABS repair");
});

test("parts topics route to a dedicated parts category", () => {
  const routed = routeTopicPlan(
    {
      angle: "Work light and auxiliary lighting faults",
      mustCover: "wiring, connectors, switches, mounting",
      internalLink: "/services/parts-department",
    },
    blogConfig,
  );

  assert.equal(
    routed.internalLink,
    "/services/parts-department/electrical-parts-components",
  );
});

test("mobile and EcoLog topic destinations remain unchanged", () => {
  const mobile = routeTopicPlan(
    {
      angle: "Roadside repair planning",
      mustCover: "location and driver notes",
      internalLink: "/services/mobile-service",
    },
    blogConfig,
  );
  const ecolog = routeTopicPlan(
    {
      angle: "Forwarder service planning",
      mustCover: "operator notes",
      internalLink: "/equipment/ecolog",
    },
    blogConfig,
  );

  assert.equal(mobile.internalLink, "/services/mobile-service");
  assert.equal(ecolog.internalLink, "/equipment/ecolog");
});

test("the selected primary destination is added even when another internal link exists", () => {
  const body =
    "See the [Service Department](/services/service-department) for general help.";
  const updated = ensureInternalLink(body, {
    internalLink: "/services/service-department/commercial-brake-abs-repair",
    linkLabel: "commercial brake and ABS repair",
  });

  assert.match(
    updated,
    /\[commercial brake and ABS repair\]\(\/services\/service-department\/commercial-brake-abs-repair\)/,
  );
});

test("topic link catalog includes unique routes for all new pages", () => {
  const targets = blogConfig.topicLinkTargets;
  const urls = targets.map((target) => target.url);

  assert.equal(targets.length, 19);
  assert.equal(new Set(urls).size, targets.length);
  assert.ok(
    urls.every((url) =>
      /^\/services\/(?:service-department|parts-department)\/[a-z0-9-]+$/.test(url),
    ),
  );
});

test("topic link targets stay synchronized with the department page catalog", () => {
  const [serviceSource, partsAndFollowing] = departmentPageSource
    .split("export const serviceDepartmentPages")[1]
    .split("export const partsDepartmentPages");
  const partsSource = partsAndFollowing.split("export const allDepartmentPages")[0];
  const pageSlugs = (source) =>
    [...source.matchAll(/^    slug: "([^"]+)",$/gm)].map((match) => match[1]);
  const pageUrls = [
    ...pageSlugs(serviceSource).map(
      (slug) => `/services/service-department/${slug}`,
    ),
    ...pageSlugs(partsSource).map(
      (slug) => `/services/parts-department/${slug}`,
    ),
  ].sort();
  const targetUrls = blogConfig.topicLinkTargets
    .map((target) => target.url)
    .sort();

  assert.deepEqual(targetUrls, pageUrls);
});

test("backfill preserves completed posts when a later date fails", async () => {
  const warnings = [];
  const generatedCount = await runBackfillDates(
    {},
    [],
    ["2026-07-08", "2026-07-09"],
    {
      dryRun: true,
      generateForDate: async (_config, _posts, date) => {
        if (date === "2026-07-09") {
          throw new Error("later validation failure");
        }

        return { date, title: "Valid first post" };
      },
      logger: { warn: (message) => warnings.push(message) },
    },
  );

  assert.equal(generatedCount, 1);
  assert.match(warnings[0], /Valid generated posts will still be validated and committed/);
  assert.equal(warnings[1], "later validation failure");
});

test("backfill still fails when no post was completed", async () => {
  await assert.rejects(
    runBackfillDates({}, [], ["2026-07-08"], {
      dryRun: true,
      generateForDate: async () => {
        throw new Error("first date failed");
      },
      logger: { warn: () => {} },
    }),
    /first date failed/,
  );
});

test("stock-preferred image mode cannot block a valid post", async () => {
  const warnings = [];
  const image = await createBlogImage(
    { title: "Brake service notes", slug: "brake-service-notes", keywords: [] },
    { imageOptions: ["/images/equipment/blog1.jpeg"], defaultImage: "/images/equipment/blog1.jpeg" },
    [],
    {
      env: { BLOG_IMAGE_MODE: "stock-preferred", PEXELS_API_KEY: "test-key" },
      fetchStockImage: async () => {
        throw new Error("Pexels returned no unused photos");
      },
      createFallbackImage: async () => "/images/blog/generated-fallback.jpg",
      logger: { warn: (message) => warnings.push(message) },
    },
  );

  assert.equal(image, "/images/blog/generated-fallback.jpg");
  assert.match(warnings[0], /generating a branded blog cover/);
});

test("stock-required image mode remains available as an explicit strict option", async () => {
  await assert.rejects(
    createBlogImage(
      { title: "Brake service notes", slug: "brake-service-notes", keywords: [] },
      { imageOptions: [], defaultImage: "/images/equipment/blog1.jpeg" },
      [],
      {
        env: { BLOG_IMAGE_MODE: "stock-required", PEXELS_API_KEY: "test-key" },
        fetchStockImage: async () => {
          throw new Error("stock provider unavailable");
        },
      },
    ),
    /stock provider unavailable/,
  );
});

test("Pexels search expands beyond one exhausted generic query", () => {
  const queries = buildPexelsQueries(
    {
      title: "Parking brake complaints before repair",
      excerpt: "Help a service team diagnose a truck parking brake concern.",
      keywords: ["truck repair"],
    },
    {
      imageSearchQueries: [
        "commercial truck mechanic repair shop",
        "semi truck roadside service",
      ],
    },
  );

  assert.equal(queries[0], "semi truck brake mechanic");
  assert.ok(queries.length >= 3);
  assert.equal(new Set(queries).size, queries.length);
});

test("branded fallback cover escapes generated copy", () => {
  const svg = renderBrandedCoverSvg({
    title: "Brakes & wiring <checks>",
    category: "Parts & Service",
    date: "2026-07-17",
  });

  assert.match(svg, /Brakes &amp; wiring &lt;checks&gt;/);
  assert.match(svg, /PARTS &amp; SERVICE/);
  assert.match(svg, /2026-07-17/);
});
