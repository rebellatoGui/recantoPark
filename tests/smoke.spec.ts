import { test, expect } from "@playwright/test";

test("home renders in Portuguese by default", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Recanto do Park/);
  await expect(
    page.getByRole("heading", { name: /refúgio a poucos passos da magia/i })
  ).toBeVisible();
});

test("navigates from home to acomodações", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Acomodações" }).first().click();
  await expect(page).toHaveURL(/\/acomodacoes/);
  await expect(
    page.getByRole("heading", { name: /conforto pensado para sua estadia/i })
  ).toBeVisible();
});

test("switches language to English", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Português" }).click();
  await page.getByRole("menuitem", { name: "English" }).click();
  await expect(page).toHaveURL(/\/en/);
  await expect(page).toHaveTitle(/Penha, Santa Catarina/);
});

test("whatsapp and booking CTAs point to configured placeholders", async ({
  page,
}) => {
  await page.goto("/");
  const whatsapp = page
    .getByRole("button", { name: "Falar no WhatsApp" })
    .first();
  await expect(whatsapp).toHaveAttribute("href", /wa\.me\/5547999990000/);

  const floating = page.getByRole("link", {
    name: "Fale conosco no WhatsApp",
  });
  await expect(floating).toHaveAttribute("href", /wa\.me\/5547999990000/);
});
