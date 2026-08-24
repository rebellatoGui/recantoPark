import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/acomodacoes",
  "/acomodacoes/standard-casal",
  "/acomodacoes/standard-familia",
  "/acomodacoes/superior-vista-jardim",
  "/acomodacoes/suite-master",
  "/acomodacoes/quarto-grupo",
  "/en",
  "/en/acomodacoes",
  "/en/acomodacoes/standard-casal",
  "/es",
  "/es/acomodacoes",
];

for (const route of routes) {
  test(`no console errors on ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push("pageerror: " + err.message));

    const failedRequests: string[] = [];
    page.on("response", (res) => {
      if (res.status() >= 400) failedRequests.push(`${res.status()} ${res.url()}`);
    });

    await page.goto(route, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    expect(errors, `console errors on ${route}`).toEqual([]);
    expect(failedRequests, `failed requests on ${route}`).toEqual([]);
  });
}

test("home page has no console warnings across theme/language interactions", async ({
  page,
}) => {
  const messages: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      messages.push(`[${msg.type()}] ${msg.text()}`);
    }
  });
  page.on("pageerror", (err) => messages.push("pageerror: " + err.message));

  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const toggle = page.getByRole("button", { name: /alternar tema/i });
  await toggle.click();
  await page.waitForTimeout(500);
  await toggle.click();
  await page.waitForTimeout(500);

  const langBtn = page.getByRole("button", { name: /português/i });
  await langBtn.click();
  await page.waitForTimeout(300);
  await page.getByRole("menuitem", { name: /english/i }).click();
  await page.waitForTimeout(1000);

  expect(messages).toEqual([]);
});

test("gallery lightbox opens and closes without errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push("pageerror: " + err.message));

  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    const heading = Array.from(document.querySelectorAll("h2")).find((h) =>
      h.textContent?.includes("gostinho")
    );
    heading?.scrollIntoView();
  });
  await page.waitForTimeout(800);
  const firstTile = page.locator("button").filter({ has: page.locator("img") }).first();
  await firstTile.click();
  await page.waitForTimeout(500);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);

  expect(errors).toEqual([]);
});

test("room gallery thumbnail navigation works without errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push("pageerror: " + err.message));

  await page.goto("/acomodacoes/suite-master", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const thumbs = page.locator("button img");
  const count = await thumbs.count();
  if (count > 1) {
    await thumbs.nth(1).click();
    await page.waitForTimeout(400);
  }

  expect(errors).toEqual([]);
});
