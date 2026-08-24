import { test, expect } from "@playwright/test";

test("header reacts to scroll and progress bar fills", async ({ page }) => {
  await page.goto("/");
  await page.mouse.wheel(0, 800);
  await page.waitForTimeout(500);

  const header = page.locator("header");
  await expect(header).toHaveClass(/is-scrolled/);

  const bar = page.locator(".fixed.inset-x-0.top-0 > div");
  const transform = await bar.evaluate((el) => (el as HTMLElement).style.transform);
  expect(transform).not.toBe("scaleX(0)");
});

test("about section image parallax moves with scroll", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(3500);
  const image = page.locator("[data-parallax]").first();

  await image.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const transformAtStart = await image.evaluate(
    (el) => getComputedStyle(el).transform
  );

  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(400);
  const transformAfterScroll = await image.evaluate(
    (el) => getComputedStyle(el).transform
  );

  expect(transformAfterScroll).not.toBe(transformAtStart);
});
