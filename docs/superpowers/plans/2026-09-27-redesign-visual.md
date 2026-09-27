# Redesign visual, motion e assets — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deixar o site da Pousada Recanto do Park com padrão premium (fundos com ritmo, Bricolage Grotesque nos títulos, motion com propósito), assets na qualidade máxima dos originais e Lighthouse ≥ 90.

**Architecture:** Next 16 (App Router, `app/[locale]`), next-intl (pt/en/es em `messages/*.json`, CRLF, indent 2), Tailwind v4 com tokens em `app/globals.css`, GSAP + ScrollTrigger via `lib/animations/gsap.ts`, Lenis. Fundos reutilizáveis ficam em `components/home/section-backdrop.tsx`; cada seção continua sendo um componente próprio.

**Tech Stack:** Next 16, React 19, Tailwind 4, GSAP 3.15 + @gsap/react, next-intl 4, Playwright, ffmpeg 7.1, Pillow.

**Spec:** `docs/superpowers/specs/2026-09-27-redesign-visual-design.md`

## Global Constraints

- Paleta mantida: `--background`, `--foreground`, `--navy`, `--gold`, `--terracotta` não mudam de valor.
- Títulos: Bricolage Grotesque (`--font-display` / `--font-heading`); corpo: Figtree (`--font-sans`).
- Nenhuma imagem gerada ou ampliada por IA.
- Motion só em `transform`/`opacity`/`clip-path`; tudo desligado com `prefers-reduced-motion`; pin e parallax pesados só em `(min-width: 1024px)`.
- Todo texto novo existe em pt, en e es. Arquivos de mensagens em UTF-8, CRLF, indent 2.
- Comentários só quando explicam um porquê (regra do `C:\dev\CLAUDE.md`).
- Commits `tag: descrição` em português; **só com permissão do usuário**, ao final da sessão.
- Meta Lighthouse: Performance ≥ 90 (mobile e desktop), LCP < 2,5 s, CLS < 0,1.

## Review Focus

- Tema escuro: toda superfície nova precisa de variante dark legível → checar cada seção com `.dark`.
- Celular (390 px): pin/parallax desligados, nada de scroll horizontal, barra fixa de ingressos sem colidir com nada.
- `prefers-reduced-motion`: conteúdo visível sem animação (nenhum elemento preso em `opacity: 0`).
- Troca de idioma com textos mais longos (en/es) não quebra títulos grandes.
- Vídeos: sem autoplay de arquivo pesado no celular; poster aparece antes do vídeo.

---

### Task 1: "Café da manhã" e WhatsApp na página de ingressos

**Files:**
- Modify: `messages/pt.json`, `messages/en.json`, `messages/es.json` (`amenities.items.breakfast`)
- Modify: `components/booking/whatsapp-floating-button.tsx`
- Modify: `components/tickets/tickets-sticky-cta.tsx`
- Test: `tests/tickets.spec.ts`

**Interfaces:**
- Produces: `TicketsStickyCta` (client) visível só após o hero sair da tela; floating button oculto em `/ingressos-beto-carrero`.

- [ ] **Step 1: Teste que falha**

```ts
test("tickets page shows a single whatsapp CTA on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ingressos-beto-carrero");
  await expect(page.locator("[data-whatsapp-floating]")).toHaveCount(0);
  await page.mouse.wheel(0, 1600);
  await expect(page.locator("[data-tickets-sticky]")).toBeVisible();
});
```

- [ ] **Step 2:** `npx playwright test tests/tickets.spec.ts` → FAIL.
- [ ] **Step 3: Implementar**
  - Textos: pt "Café da manhã", en "Breakfast", es "Desayuno".
  - `WhatsappFloatingButton` vira client, usa `usePathname` de `@/i18n/navigation` e retorna `null` quando o pathname é `/ingressos-beto-carrero`; adiciona `data-whatsapp-floating`.
  - `TicketsStickyCta` vira client: `IntersectionObserver` observando `#tickets-hero-cta` (id adicionado ao wrapper dos botões do hero em `tickets-hero.tsx`); visível quando o CTA sai da tela. Visual: `fixed inset-x-4 bottom-4 z-40 h-14 rounded-full bg-[#25D366] text-white`, entra com `translate-y` + `opacity`; `data-tickets-sticky`; `lg:hidden`.
- [ ] **Step 4:** Playwright inteiro → PASS. Conferir no navegador em 390 px.

### Task 2: Assets na qualidade máxima + Lighthouse

**Files:**
- Create: `scripts/export-assets.py` (fora do bundle; lê `new_assets/`, escreve `public/photos/`)
- Modify: `public/photos/**`, `components/hero/hero-section.tsx`, `components/home/drone-video.tsx`, `next.config.ts`

- [ ] **Step 1: Linha de base.** Lighthouse (chrome-devtools `lighthouse_audit`) em `/` e `/ingressos-beto-carrero`, mobile e desktop, contra `npm run build && npm start` (não o dev). Anotar Performance, LCP, CLS, peso total.
- [ ] **Step 2: Script de imagens.** Mapeamento origem → destino (mesmos nomes usados em `lib/data/images.ts` e `ticket-prices.ts`). Salvar WebP `quality=92, method=6` na resolução original, limitado a 2400 px no maior lado. O `next/image` gera AVIF/WebP responsivos a partir disso.

```python
from pathlib import Path
from PIL import Image
SRC, DST = Path("new_assets"), Path("public/photos")
MAP = {
  "estacionamento.png": "estacionamento.webp",
  "quarto1.jpeg": "quarto1.webp", "quarto2.jpeg": "quarto2.webp",
  "banheiro1.jpeg": "banheiro1.webp",
  "acesso-a-praia.jpg": "acesso-a-praia.webp",
  "cachorro-praia.webp": "cachorro-praia.webp",
  "mar-gravata.webp": "praia-gravata-mar.webp",
  "pedras-na-beira-da-praia.jpg": "praia-gravata-pedras.webp",
  "o-mar-tomando-conta.jpg": "o-mar.webp",
  "google-maps.png": "google-maps.webp",
  "beto-carrero-world.png": "beto-carrero-world.webp",
  "beto-carrero-world-parque.png": "beto-carrero-world-parque.webp",
  "Star-Mountain-Beto-Carrero-World-2.jpg": "atracoes/star-mountain.webp",
  "brinquedo-big-drop-beto-carrero.jpg": "atracoes/big-drop.webp",
  "fire-whip-montanha-russa-beto-carrero-1-740x897.jpg": "atracoes/fire-whip.webp",
  "hot-wheels-epic-show.jpg": "atracoes/hot-wheels-epic-show.webp",
  "madagascar.jpg": "atracoes/madagascar-crazy-river.webp",
  "portal-escuridao.jpg": "atracoes/portal-escuridao.webp",
  "tchibum.jpg": "atracoes/tchibum.webp",
}
for src, dst in MAP.items():
    im = Image.open(SRC / src).convert("RGB")
    im.thumbnail((2400, 2400), Image.LANCZOS)
    im.save(DST / dst, "WEBP", quality=92, method=6)
```

- [ ] **Step 3: Vídeos (ffmpeg).**
  - Hero: `beto-carrero-drone.mp4` → `hero-beto-carrero.mp4` (1920 px, `-c:v libx264 -crf 22 -preset slow -an -movflags +faststart`) e `hero-beto-carrero-720.mp4` (1280 px, crf 24). Poster: frame em 1920 px, WebP q90.
  - Drones: `drone-praia.mp4` → `drone-gravata.mp4`, `drone-praia2.mp4` → `drone-gravata-2.mp4` na resolução original, crf 22, sem áudio, faststart. Posters na resolução total.
  - Hero usa `<source media="(max-width: 767px)" src="…-720.mp4">` antes do 1080p; drones com `preload="none"` e play via IntersectionObserver (manter o comportamento atual se já existir).
- [ ] **Step 4:** `next.config.ts` → `qualities: [75, 85, 90]`; fotos de destaque (hero poster, suíte, cards grandes) com `quality={85}`; revisar `sizes` de todo `<Image>` (`grep -rn "<Image" components app`).
- [ ] **Step 5: Depois.** Build de produção + Lighthouse com as mesmas URLs. Meta cumprida → seguir; não cumprida → investigar o maior item do relatório (LCP element, bytes) antes de continuar.
- [ ] **Step 6:** Playwright → PASS.

### Task 3: Fundação — fonte e superfícies

**Files:**
- Modify: `app/layout.tsx`, `app/globals.css`, `components/home/section-backdrop.tsx`

**Interfaces:**
- Produces: variável `--font-display` = Bricolage Grotesque; utilitários `bg-surface-cream`, `bg-surface-clay` (tokens `--surface-cream`, `--surface-clay` com versões dark); `SectionBackdrop` com novas variantes `"grain"` e `"coaster"`.

- [ ] **Step 1:** `app/layout.tsx`:

```ts
import { Bricolage_Grotesque, Figtree } from "next/font/google";
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
});
// html className: `${figtree.variable} ${bricolage.variable} antialiased`
```

- [ ] **Step 2:** `globals.css`: `--font-display: var(--font-bricolage); --font-heading: var(--font-bricolage);`; tokens:

```css
:root {
  --surface-cream: oklch(0.955 0.022 84.6);
  --surface-clay: oklch(0.905 0.045 55);
}
.dark {
  --surface-cream: oklch(0.2 0.02 60);
  --surface-clay: oklch(0.23 0.035 45);
}
@theme inline {
  --color-surface-cream: var(--surface-cream);
  --color-surface-clay: var(--surface-clay);
}
```

  Escala de títulos: classe utilitária `.heading-section` (`font-display`, `text-4xl sm:text-5xl lg:text-6xl`, `leading-[1.02]`, `tracking-[-0.02em]`, `font-variation-settings: "wdth" 90`).
- [ ] **Step 3:** `SectionBackdrop`: variante `"grain"` (SVG `feTurbulence` inline como `background-image` data URI, `opacity-[0.07]`, `mix-blend-multiply`, dark `mix-blend-screen opacity-[0.05]`) e `"coaster"` (traço SVG do contorno da montanha-russa, `stroke-terracotta/15`, posicionado no canto).
- [ ] **Step 4:** Trocar os títulos de seção para `.heading-section` (grep `font-display text-3xl`). Conferir en/es em 390 px (títulos longos não estouram).
- [ ] **Step 5:** tsc, lint, Playwright → PASS; screenshots claro/escuro.

### Task 4: Fundos e layouts por seção

**Files:** `components/accommodations/accommodations-preview.tsx`, `components/home/essential-info-section.tsx`, `components/home/about-section.tsx`, `components/home/google-reviews-section.tsx`, `components/testimonials/testimonials-section.tsx`, `components/home/location-section.tsx`, `components/home/amenities-section.tsx`, `components/home/cta-section.tsx`, `components/tickets/*`

Mapa de fundos (nenhum vizinho repete):

| Seção | Fundo |
|---|---|
| Hero | vídeo (atual) |
| Faixa de serviços | navy (atual) |
| Suíte | `bg-surface-cream` + `grain` |
| Informações essenciais | `bg-background` + `topo`; vira lista editorial em 2 colunas sem cards |
| Descanso e aventura | navy + foto (atual) |
| Google + depoimentos | `bg-surface-clay` + `grain`; mapa com embed real (`googleMapsEmbedUrl`) ou foto `google-maps.webp` no lugar da caixa vazia |
| Localização | navy + mapa (atual), entrada com borda curva (SVG wave no topo) |
| Serviços | `bg-surface-cream` + `coaster` |
| CTA final | sunset (atual) |

Ingressos: hero atual; grid em `bg-surface-cream` + `grain`; build-day mantém navy; steps em `bg-background` + `topo`; FAQ em `bg-surface-clay`.

- [ ] Um passo por seção: aplicar fundo, trocar card-com-borda por layout editorial quando indicado, conferir claro/escuro/390 px no navegador.
- [ ] Ao final: Playwright → PASS.

### Task 5: Motion

**Files:**
- Create: `lib/animations/use-split-words.ts`, `components/animations/count-up.tsx`, `components/animations/tilt.tsx`
- Modify: hero, services-strip, accommodations-preview, about-section, location-section, amenities-section, tickets-grid, cta-section, `app/globals.css`

**Interfaces:**
- `useSplitWords(ref: RefObject<HTMLElement>)`: envolve cada palavra em `<span data-word>` e anima `yPercent: 110 → 0`, stagger 0.06.
- `<CountUp to={5} suffix=" min" />`: conta com ScrollTrigger `once: true`.
- `<Tilt max={6}>`: rotação 3D por ponteiro, só `(pointer: fine)` e sem reduced-motion.

- [ ] Hero: `useSplitWords` no h1; SVG da montanha-russa com `stroke-dasharray` animado (1,6 s, `power2.inOut`).
- [ ] Faixa: `ScrollTrigger.create({ onUpdate: self => marquee.timeScale(1 + Math.min(Math.abs(self.getVelocity()) / 400, 3)) })`, voltando a 1 com `gsap.to(..., { timeScale: 1, duration: 0.6 })`. Converter o marquee CSS para um tween GSAP `xPercent: -50, repeat: -1, ease: "none"`.
- [ ] Suíte: `clip-path: inset(12% 12% 12% 12% round 2rem)` → `inset(0 round 2rem)` com scrub; imagem interna `scale 1.15 → 1`.
- [ ] Descanso e aventura: fotos `yPercent ±10` com scrub; `<CountUp to={5} />`.
- [ ] Localização: `gsap.matchMedia().add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", …)` com pin e crossfade parque → praia.
- [ ] Serviços e opcionais: `ScrollTrigger.batch("[data-card]", { onEnter: b => gsap.from(b, { y: 40, opacity: 0, stagger: 0.08 }) })`.
- [ ] Ingressos: `<Tilt>` no card do passaporte; keyframe `shine` no badge "Mais procurado" (gradiente passando a cada 4 s).
- [ ] Microinterações em `globals.css`: `.link-underline` (pseudo-elemento `scale-x`), botões `active:scale-[0.97]`.
- [ ] Verificar: reduced-motion (DevTools emulate) mostra tudo; 390 px sem pin; console limpo; Playwright → PASS.

### Task 6: Instagram no CTA final

**Files:**
- Delete: `components/home/instagram-section.tsx`
- Modify: `app/[locale]/page.tsx`, `components/home/cta-section.tsx`, `messages/*.json` (`instagram` → `{ "invite": "Acompanhe a pousada no Instagram" }` / en "Follow the guesthouse on Instagram" / es "Sigue la posada en Instagram")

- [ ] Remover a seção e o import; no CTA, abaixo dos botões: link com `InstagramIcon` em círculo com gradiente, texto `t("instagram.invite")` + `contact.instagramHandle`, classe `.link-underline`.
- [ ] Teste em `tests/smoke.spec.ts`:

```ts
test("home links to the official instagram", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.locator('a[href="https://www.instagram.com/pousadarecantodopark/"]').first()
  ).toBeAttached();
});
```

- [ ] Playwright → PASS.

### Task 7: Humanizer

- [ ] Invocar a skill `humanizer:humanizer` sobre os textos de `messages/pt.json`; aplicar o mesmo ajuste de tom em en/es.
- [ ] Não alterar chaves, placeholders (`{date}`, `{ticket}`, `{height}`) nem textos legais de forma que mude o sentido jurídico.
- [ ] Playwright → PASS (testes procuram alguns textos; atualizar só se o texto mudou de propósito).

### Verificação final

- [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build`, `npx playwright test`.
- [ ] Lighthouse final (produção) mobile e desktop em `/` e `/ingressos-beto-carrero`, comparando com a linha de base da Task 2.
- [ ] Screenshots claro/escuro, 1440 e 390 px, das duas páginas.
- [ ] Remover `docs`/scripts temporários que não forem ficar; `scripts/export-assets.py` fica (reprodutibilidade).
