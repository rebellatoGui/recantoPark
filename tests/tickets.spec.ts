import { test, expect } from "@playwright/test";
import { tickets } from "../lib/data/ticket-prices";

const locales = [
  { prefix: "", heading: /ingressos do beto carrero/i },
  { prefix: "/en", heading: /beto carrero tickets/i },
  { prefix: "/es", heading: /entradas de beto carrero/i },
];

for (const { prefix, heading } of locales) {
  test(`tickets page renders on ${prefix || "/"}`, async ({ page }) => {
    const response = await page.goto(`${prefix}/ingressos-beto-carrero`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    await expect(page.locator("[data-ticket]")).toHaveCount(tickets.length);
  });
}

test("each ticket button opens whatsapp with the ticket name", async ({
  page,
}) => {
  await page.goto("/ingressos-beto-carrero");

  for (const { id } of tickets) {
    const card = page.locator(`[data-ticket="${id}"]`);
    const name = (await card.getByRole("heading").textContent())?.trim() ?? "";
    const href = await card.getByRole("button").getAttribute("href");

    expect(href).toContain("https://wa.me/");
    expect(decodeURIComponent(href ?? "")).toContain(name);
  }
});

test("tickets with a known price show the official starting price", async ({
  page,
}) => {
  await page.goto("/ingressos-beto-carrero");

  for (const { id, price } of tickets) {
    if (price === null) continue;
    const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
    await expect(page.locator(`[data-ticket="${id}"]`)).toContainText(formatted);
  }
});

test("accredited badge stays hidden until accreditation", async ({ page }) => {
  await page.goto("/ingressos-beto-carrero");
  await expect(page.getByText("Agente credenciado")).toHaveCount(0);
});

test("header links to the tickets page", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await page.getByRole("banner").getByRole("link", { name: "Ingressos" }).click();
  await expect(page).toHaveURL(/\/ingressos-beto-carrero/);
});
