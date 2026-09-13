# Página de ingressos Beto Carrero World

Data: 2026-09-13

## Contexto

A Pousada Recanto do Park vai se credenciar como revendedora oficial de ingressos do Beto Carrero World pelo portal Mundo Agente (agente.betocarrero.com.br), com o CNPJ da pousada. O parque não publica comissão, preço de repasse nem forma de emissão; isso só é liberado após a aprovação. O modelo validado no mercado (Pousadas By Bia, agente credenciada em Penha) é página vitrine com venda concluída pelo WhatsApp, sem preço fixo na página.

## Objetivo

Página que apresenta a revenda oficial, os tipos de ingresso e o benefício de 5% de desconto na hospedagem para quem compra o ingresso com a pousada, convertendo pelo WhatsApp.

## Fora de escopo

- Checkout, preços ou integração com sistema de emissão do parque.
- Link de afiliado Civitatis.

## Rota e navegação

- Rota `app/[locale]/ingressos-beto-carrero/page.tsx`, mesmo slug nos três idiomas (padrão de `/acomodacoes`).
- Item "Ingressos" no `site-header.tsx` (desktop e sheet mobile) e no `site-footer.tsx`.
- Link para a página no card do Beto Carrero em `location-section.tsx`.
- Entrada no `app/sitemap.ts` com prioridade 0.8.
- `generateMetadata` com title, description, canonical e alternates por idioma, seguindo `acomodacoes/page.tsx`.

## Seções

1. **Hero** (`tickets-hero.tsx`): foto `beto-carrero-world-parque.webp`, título, subtítulo, selo "Agente credenciado" condicionado à flag, botão WhatsApp com mensagem genérica de ingressos.
2. **Vantagens** (`tickets-benefits.tsx`): três cards: compra oficial e segura; 5% de desconto na hospedagem; orientação sobre melhor dia e promoções.
3. **Tipos de ingresso** (`tickets-grid.tsx`): um card por ingresso com nome, descrição curta e botão "Quero este" que abre o WhatsApp com mensagem contendo o nome do ingresso. Sem preço.
4. **Como funciona** (`tickets-steps.tsx`): três passos: escolher o ingresso, combinar data e pagamento pelo WhatsApp, receber o ingresso.
5. **Hospedagem + ingresso** (`tickets-stay-cta.tsx`): reforça os 5% e leva a `/acomodacoes`.
6. **FAQ** (`tickets-faq.tsx`): "É oficial?", "Como recebo o ingresso?", "Posso comprar sem me hospedar?", "Como funciona o desconto de 5%?". Usar `<details>` nativo.

## Dados

Em `lib/data/pousada.ts`:

```ts
export const isAccreditedAgent = false;
export const lodgingDiscountPercent = 5;
export const tickets = [
  { id: "passport" },
  { id: "fastpass" },
  { id: "adrenaline" },
  { id: "adventure" },
  { id: "family" },
  { id: "excalibur" },
] as const;
```

Textos em `messages/{pt,en,es}.json` sob a chave `tickets` (`meta`, `hero`, `benefits`, `items.<id>.name|description`, `steps`, `stayCta`, `faq`, `whatsappMessage`, `whatsappTicketMessage` com placeholder `{ticket}`). O percentual entra nas mensagens por placeholder `{percent}`.

## Regra do credenciamento

Com `isAccreditedAgent = false` o selo não aparece e os textos usam "parceria" em vez de "agente credenciado" (duas variantes de chave: `hero.badge` só renderiza com a flag; `benefits.official` tem `officialPending` para o estado sem aprovação). Após a aprovação do parque, mudar a flag para `true`.

## Reuso

`SectionBackdrop`, `useReveal`, `WhatsAppButton`/`whatsappLink`, `Button`, tipografia e paleta existentes (creme, marrom, âmbar, terracota, ferrugem). Padrões mobile: corpo 15-16px, H1 24-32px, toque ≥ 44px.

## Testes (Playwright)

- `tests/tickets.spec.ts`: rota responde 200 em pt, en e es; renderiza um card por ingresso; o botão de cada ingresso aponta para `wa.me` com o nome do ingresso na mensagem; selo ausente com a flag desligada.
- Adicionar a rota em `console-errors.spec.ts`.
- Verificar `tsc`, `eslint` e `next build`.

## Pendências com a pousada

- Confirmar a lista de ingressos que vão revender.
- Avisar quando o credenciamento for aprovado para ligar a flag.
