import assert from "node:assert/strict";
import test from "node:test";

import {
  buildAllowedTopicAngles,
  chooseTopicPlan,
  findExistingDuplicate,
  readExistingPosts,
  runBackfillDates,
} from "./generate-blog.mjs";

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

test("the current library has distinct topic runway beyond the missed backfill", () => {
  const posts = readExistingPosts();
  const allowedAngles = buildAllowedTopicAngles(posts);

  assert.ok(allowedAngles.length >= 12, `Expected at least 12 topics, found ${allowedAngles.length}.`);

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
