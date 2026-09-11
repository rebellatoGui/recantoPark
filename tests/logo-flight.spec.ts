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

  // pousa centrada na coluna de texto e acima da linha de botões, que ocupa
  // a largura inteira do card
  const geo = await page.evaluate(() => {
    const c = (
      document.querySelector("[data-card-logo]") as HTMLElement
    ).getBoundingClientRect();
    const coluna = (
      document.querySelector("[data-card-column]") as HTMLElement
    ).getBoundingClientRect();
    const acoes = (
      document.querySelector('a[href*="writereview"]') as HTMLElement
    ).parentElement!.getBoundingClientRect();
    return {
      dxCentro: Math.abs(
        c.left + c.width / 2 - (coluna.left + coluna.width / 2),
      ),
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

test("logo tambem voa no mobile e pousa sem oscilar", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.waitForTimeout(2000);

  const topo = await estado(page);
  expect(topo.header).toBeGreaterThan(0.9);
  expect(topo.card).toBeLessThan(0.1);

  await page.locator("#maps").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);

  const naSecao = await estado(page);
  expect(naSecao.card).toBeGreaterThan(0.9);

  // parada, a logo não pode oscilar de escala/opacidade (o crossfade binário
  // antigo piscava ao cruzar o limiar)
  const amostras: number[] = [];
  for (let i = 0; i < 10; i++) {
    amostras.push(
      await page.evaluate(() => {
        const h = document.querySelector("[data-header-logo]") as HTMLElement;
        const c = document.querySelector("[data-card-logo]") as HTMLElement;
        return (
          new DOMMatrixReadOnly(getComputedStyle(h).transform).a +
          Number(getComputedStyle(c).opacity)
        );
      }),
    );
    await page.waitForTimeout(60);
  }
  expect(Math.max(...amostras) - Math.min(...amostras)).toBeLessThan(0.01);
});
