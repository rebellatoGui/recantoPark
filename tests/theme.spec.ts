import { test, expect } from "@playwright/test";

test("abre no claro mesmo com dark salvo de antes", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("theme", "dark"));
  await page.goto("/");
  await page.waitForTimeout(1200);
  const isDark = await page.evaluate(() =>
    document.documentElement.classList.contains("dark")
  );
  expect(isDark).toBe(false);
});

test("botao alterna na visita, mas reload volta ao claro", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(1000);

  await page.getByRole("button", { name: /alternar tema/i }).click();
  await page.waitForTimeout(300);
  expect(
    await page.evaluate(() => document.documentElement.classList.contains("dark"))
  ).toBe(true);

  await page.reload();
  await page.waitForTimeout(1000);
  expect(
    await page.evaluate(() => document.documentElement.classList.contains("dark"))
  ).toBe(false);
});
