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

test("homepage and department hubs render and can be captured", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  expect((await page.goto("/"))?.status()).toBe(200);
  await expect(page).toHaveTitle(/Munden Truck & Equipment/);
  await page.screenshot({ path: testInfo.outputPath("homepage.png"), fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

  for (const [path, heading] of [
    ["/services/service-department", "Commercial Truck, Trailer and Equipment Service"],
    ["/services/mobile-service", "Mobile Truck, Trailer and Equipment Repair"],
    ["/services/parts-department", "Commercial Truck, Trailer and Equipment Parts"],
  ]) {
    expect((await page.goto(path))?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await expect(page.getByRole("link", { name: "View details" }).first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.screenshot({ path: testInfo.outputPath("parts-department.png"), fullPage: true });
  expect(errors).toEqual([]);
});

test("navigation separates service, mobile, and parts", async ({ page }, testInfo) => {
  await page.goto("/");

  if (testInfo.project.name.startsWith("desktop")) {
    for (const [trigger, destination] of [
      ["Service Department", "View all shop services"],
      ["Mobile Service", "View all mobile services"],
      ["Parts Department", "View all parts categories"],
    ]) {
      await page.goto("/");
      await page.getByRole("button", { name: trigger, exact: true }).click();
      await expect(page.getByRole("link", { name: destination, exact: true })).toBeVisible();
      await expect(page.locator('[data-slot="navigation-menu-viewport"]')).toHaveCSS("opacity", "1");
    }
  } else {
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    await page.getByRole("button", { name: "Mobile Service", exact: true }).click();
    await expect(page.getByRole("link", { name: "View all mobile services", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Service Department", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Parts Department", exact: true })).toBeVisible();
  }

  await page.screenshot({ path: testInfo.outputPath("department-navigation.png") });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
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

test("contact form validates input and handles a mocked success", async ({ page }) => {
  let submissions = 0;
  await page.route("**/api/contact", async (route) => {
    submissions++;
    expect(route.request().postDataJSON().email).toBe("test@example.invalid");
    await route.fulfill({ json: { message: "Local mock only" } });
  });
  await page.goto("/about/contact");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByText("Name must be at least 2 characters")).toBeVisible();
  expect(submissions).toBe(0);
  await page.getByLabel("Name", { exact: true }).fill("Local Test");
  await page.getByLabel("Phone", { exact: true }).fill("0000000000");
  await page.getByLabel("Email", { exact: true }).fill("test@example.invalid");
  await page.getByRole("combobox").click();
  await page.getByRole("option", { name: "Other", exact: true }).click();
  await page.getByLabel("Message", { exact: true }).fill("Synthetic local workflow test only.");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByText(/Thank you for your message!/)).toBeVisible();
  expect(submissions).toBe(1);
});

test("resources subscription shows disabled delivery and mocked success", async ({ page }) => {
  await page.goto("/about/resources");
  await page.getByPlaceholder("Email address", { exact: true }).fill("test@example.invalid");
  await page.getByRole("button", { name: "Subscribe", exact: true }).click();
  await expect(page.getByText("Email is disabled in this environment.", { exact: true })).toBeVisible();
  await page.route("**/api/blog-subscribe", (route) => route.fulfill({ json: { message: "Local mock only" } }));
  await page.getByRole("button", { name: "Subscribe", exact: true }).click();
  await expect(page.getByText("Thanks. You are on the blog update list.", { exact: true })).toBeVisible();
  await expect(page.getByPlaceholder("Email address", { exact: true })).toHaveValue("");
  await page.getByRole("link", { name: "Read Full Article" }).click();
  await expect(page).toHaveURL(/\/about\/resources\/.+/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("equipment catalogue opens detail and quote workflows", async ({ page }) => {
  await page.goto("/equipment/harvesters");
  await page.getByRole("link", { name: "View Details", exact: true }).first().click();
  await expect(page).toHaveURL(/\/equipment\/harvesters\/.+/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.locator('a[href="/about/contact"]').first().click();
  await expect(page).toHaveURL(/\/about\/contact$/);
  await expect(page.getByRole("heading", { name: "Contact Us", exact: true })).toBeVisible();
});
