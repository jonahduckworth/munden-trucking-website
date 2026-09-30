import { test, expect } from "@playwright/test";

test.beforeEach(async ({ context }) => {
  // Capture local pages without sending analytics or loading external services.
  await context.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (url.origin === "http://127.0.0.1:3100" && !url.pathname.startsWith("/_vercel/")) {
      return route.continue();
    }
    return route.abort();
  });
});

test("homepage and maintenance packages render and can be captured", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  expect((await page.goto("/"))?.status()).toBe(200);
  await expect(page).toHaveTitle(/Munden Truck & Equipment/);
  await page.screenshot({ path: testInfo.outputPath("homepage.png"), fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

  expect((await page.goto("/services/service-department"))?.status()).toBe(200);
  await page.getByRole("tab", { name: "Maintenance", exact: true }).click();
  for (const [tab, heading] of [
    ["Light-Duty", "Light-Duty Maintenance"],
    ["Medium-Duty", "Medium-Duty Maintenance"],
    ["Heavy-Duty", "Heavy-Duty Maintenance"],
  ]) {
    await page.getByRole("tab", { name: tab, exact: true }).click();
    await expect(page.getByText(heading, { exact: true })).toBeVisible();
    await expect(page.getByRole("table")).toBeVisible();
    expect(await page.getByRole("row").count()).toBeGreaterThan(1);
  }
  await page.screenshot({ path: testInfo.outputPath("maintenance.png"), fullPage: true });
  expect(errors).toEqual([]);
});

test("local email endpoints refuse delivery", async ({ request }) => {
  for (const endpoint of ["/api/contact", "/api/blog-subscribe"]) {
    const response = await request.post(endpoint, {
      data: { name: "Local test", email: "test@example.invalid", phone: "000", subject: "other", message: "Local test" },
    });
    expect(response.status()).toBe(503);
    expect(await response.json()).toEqual({ error: "Email is disabled in this environment." });
  }
});
