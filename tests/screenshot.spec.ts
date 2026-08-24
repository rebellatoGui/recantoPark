import { test } from "@playwright/test";

test("capture header screenshot", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/");
  await page.waitForTimeout(4000);
  await page.screenshot({ path: "test-results/header-check.png" });
  await page.locator("header").screenshot({ path: "test-results/header-only.png" });
});

test("capture mobile hero screenshot", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForTimeout(4000);
  await page.screenshot({ path: "test-results/mobile-hero.png" });
});

test("capture design pass sections", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.waitForTimeout(1200);

  await page.locator("#localizacao").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "test-results/location-lines.png" });

  await page.locator("section").nth(1).scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "test-results/about-lines.png" });

  await page.locator("#contato").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "test-results/contact-minimal.png" });

  await page.goto("/");
  const langButton = page.getByRole("button", { name: /português/i });
  await langButton.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: "test-results/language-menu.png" });
});

test("capture footer", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.getByRole("contentinfo").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: "test-results/footer-check.png" });
});
