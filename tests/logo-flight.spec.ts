import { test, expect } from "@playwright/test";

const estado = (page: import("@playwright/test").Page) =>
  page.evaluate(() => {
    const h = document.querySelector("[data-header-logo]") as HTMLElement;
    const c = document.querySelector("[data-card-logo]") as HTMLElement;
    return {
      header: Number(getComputedStyle(h).opacity),
      card: Number(getComputedStyle(c).opacity),
    };
  });

test("logo desce do header pro card do maps e volta (desktop)", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 860 });
  await page.goto("/");
  await page.waitForTimeout(2500);

  const topo = await estado(page);
  expect(topo.header).toBeGreaterThan(0.9);
  expect(topo.card).toBeLessThan(0.1);

  const google = page
    .locator("section", { hasText: "Encontre a gente no Google" })
    .first();
  await google.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);

  const naSecao = await estado(page);
  expect(naSecao.header).toBeLessThan(0.1);
  expect(naSecao.card).toBeGreaterThan(0.9);

  // pousa acima dos botões e centrada neles
  const geo = await page.evaluate(() => {
    const c = (
      document.querySelector("[data-card-logo]") as HTMLElement
    ).getBoundingClientRect();
    const acoes = (
      document.querySelector('a[href*="writereview"]') as HTMLElement
    ).parentElement!.getBoundingClientRect();
    return {
      dxCentro: Math.abs(c.left + c.width / 2 - (acoes.left + acoes.width / 2)),
      acimaDosBotoes: c.bottom <= acoes.top,
    };
  });
  expect(geo.dxCentro).toBeLessThan(4);
  expect(geo.acimaDosBotoes).toBe(true);

  // saindo da seção ela volta voando: no meio do caminho está visível no
  // header, entre o card e a posição de origem
  const base = await page.evaluate(() => {
    const c = document.querySelector("[data-card-logo]") as HTMLElement;
    return (c.closest("section") as HTMLElement).offsetTop;
  });
  await page.evaluate((y) => window.scrollTo({ top: y }), base + 120);
  await page.waitForTimeout(1500);

  const meio = await page.evaluate(() => {
    const h = document.querySelector("[data-header-logo]") as HTMLElement;
    const r = h.getBoundingClientRect();
    return {
      opacidade: Number(getComputedStyle(h).opacity),
      cy: r.top + r.height / 2,
      w: r.width,
    };
  });
  expect(meio.opacidade).toBeGreaterThan(0.9);
  expect(meio.cy).toBeGreaterThan(120); // ainda não chegou no header
  expect(meio.w).toBeGreaterThan(115); // ainda maior que o tamanho de origem

  // passando longe da seção, a logo volta pro header
  await page.evaluate(() =>
    window.scrollTo({ top: document.body.scrollHeight })
  );
  await page.waitForTimeout(1500);
  expect((await estado(page)).header).toBeGreaterThan(0.9);

  // e continua no header ao voltar pro topo
  await page.evaluate(() => window.scrollTo({ top: 0 }));
  await page.waitForTimeout(2000);
  expect((await estado(page)).header).toBeGreaterThan(0.9);
});
