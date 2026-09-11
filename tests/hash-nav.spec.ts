import { test, expect } from "@playwright/test";

const noMaps = (page: import("@playwright/test").Page) =>
  page.evaluate(() => {
    const r = (document.querySelector("#maps") as HTMLElement).getBoundingClientRect();
    return r.top < window.innerHeight && r.bottom > 0;
  });

test("header e rodapé levam à seção do maps, mesmo com o hash repetido", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForTimeout(1000);

  await page.locator("header").getByRole("link", { name: "Localização" }).click();
  await page.waitForTimeout(2000);
  expect(await noMaps(page)).toBe(true);

  // rodapé com o hash já em #maps: sem scroll explícito o link fica morto
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1200);
  await page.locator("footer").getByRole("link", { name: "Localização" }).click();
  await page.waitForTimeout(2000);
  expect(await noMaps(page)).toBe(true);
});

test("menu lateral fecha e rola até a seção", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForTimeout(1000);

  await page.locator("header button").last().click();
  await page.waitForTimeout(600);
  await page.getByRole("link", { name: "Localização" }).click();
  await page.waitForTimeout(2000);
  expect(await noMaps(page)).toBe(true);
});
