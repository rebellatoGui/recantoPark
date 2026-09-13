import { test, expect } from "@playwright/test";

const pages = [
  {
    path: "/politica-de-privacidade",
    headings: { "": /política de privacidade/i, "/en": /privacy policy/i, "/es": /política de privacidad/i },
  },
  {
    path: "/termos-de-uso",
    headings: { "": /termos de uso/i, "/en": /terms of use/i, "/es": /términos de uso/i },
  },
];

for (const { path, headings } of pages) {
  for (const [prefix, heading] of Object.entries(headings)) {
    test(`${prefix || "/pt"}${path} renders`, async ({ page }) => {
      const response = await page.goto(`${prefix}${path}`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
      await expect(page.locator("article h2").first()).toBeVisible();
    });
  }
}

test("privacy policy shows the real contact email and the language cookie", async ({
  page,
}) => {
  await page.goto("/politica-de-privacidade");
  const article = page.locator("article");
  await expect(article).toContainText("pousadarecantodopark@gmail.com");
  await expect(article).toContainText("NEXT_LOCALE");
  await expect(article).not.toContainText("{email}");
});

test("footer links to both legal pages", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  await footer.getByRole("link", { name: "Política de Privacidade" }).click();
  await expect(page).toHaveURL(/\/politica-de-privacidade/);
  await page.getByRole("contentinfo").getByRole("link", { name: "Termos de Uso" }).click();
  await expect(page).toHaveURL(/\/termos-de-uso/);
});
