# Redesign visual, motion e assets — Pousada Recanto do Park

Data: 2026-09-27

## Objetivo

Elevar o site a um padrão premium sem trocar a paleta: fundos com ritmo, tipografia com hierarquia, motion com propósito, assets na qualidade máxima dos originais e site leve (validado no Lighthouse).

## Decisões

| Tema | Decisão |
|---|---|
| Direção visual | Base **hospitalidade acolhedora** (referência Airbnb / hotel boutique) com toque **lúdico** do parque no hero, na página de ingressos e em microinterações |
| Tipografia | **Bricolage Grotesque** nos títulos (`--font-display`/`--font-heading`), **Figtree** no corpo |
| Paleta | Mantida. Só novas superfícies claras derivadas dela |
| Fotos fracas na origem | Sem IA. Exportar na qualidade máxima do original; substituir por fotos novas no futuro |
| Instagram | Sai o mosaico. Convite no CTA final + footer |
| Playwright | Mantido enxuto (40 testes); conferência visual via chrome-devtools MCP |

## 1. Fundação visual

- Escala tipográfica maior e contrastada: títulos de seção 48–64 px no desktop, explorando o eixo de largura da Bricolage.
- Três superfícies claras: areia (`--background` atual), creme claro e terracota suave. Tokens em `app/globals.css`, com versões dark.
- Ritmo: nenhuma seção repete o fundo da vizinha (claro → escuro → claro texturizado → escuro com foto).
- Recursos de fundo só em CSS/SVG: granulação sutil nas seções claras, linhas topográficas (`bg-topo`) e contorno da montanha-russa como grafismo, gradientes de luz quente nas transições, foto + overlay navy nas escuras.
- Transições curvas/onduladas entre algumas seções.
- Menos "card bege com borda": avaliações, informações essenciais e serviços com layouts mais editoriais.
- Corrigir a caixa vazia do mapa no bloco do Google.

## 2. Motion e componentes

Princípio: um momento de destaque por seção; o resto entra discreto. Só `transform`/`opacity`.

| Seção | Momento |
|---|---|
| Hero | Título palavra por palavra; vídeo com zoom lento; traço SVG da montanha-russa se desenhando |
| Faixa de serviços | Marquee com velocidade reagindo à rolagem |
| Suíte | Foto revelada por máscara (clip-path) + parallax interno |
| Descanso e aventura | Fotos em parallax oposto; "5 min" contando |
| Localização | Pin: parque cede lugar à praia ao rolar (só desktop) |
| Serviços | Cascata; ícone reage ao hover |
| Ingressos | Cascata nos opcionais; brilho periódico no "Mais procurado"; tilt no passaporte (só desktop, ponteiro fino) |
| CTA final | Pôr do sol em parallax + título revelado |

- Microinterações globais: botões com resposta tátil, links com sublinhado animado.
- shadcn: accordion no FAQ de ingressos; carrossel com arrasto nas avaliações.
- `prefers-reduced-motion` desliga tudo. Pin e parallax pesados desativados no mobile.

## 3. Correções e conteúdo

- "Café da manhã incluso" → "Café da manhã" (pt/en/es).
- Ingressos: esconder o botão flutuante do WhatsApp nessa página; barra fixa redesenhada (verde WhatsApp, largura total com margem), visível só depois que o CTA do hero sai da tela.
- Instagram: remover `InstagramSection` e o mosaico; convite com ícone em gradiente no CTA final.

## 4. Assets e performance

- Reexportar de `new_assets/` na resolução máxima do original, qualidade alta.
- `next/image` com `formats: ["image/avif", "image/webp"]` e `sizes` corretos em todas as imagens.
- Vídeos: hero reexportado do original (1080p + 720p mobile), drones em resolução total, posters em alta, lazy-load fora do hero.
- Lighthouse (chrome-devtools) antes e depois, mobile e desktop. Meta: Performance ≥ 90, LCP < 2,5 s, CLS < 0,1.

## 5. Texto

Passada final com a skill `humanizer` em todos os textos dos 3 idiomas, mantendo o tom acolhedor.

## Ordem e commits

1. Itens de conteúdo (café da manhã, WhatsApp nos ingressos)
2. Assets + Lighthouse antes/depois
3. Fundação (fonte, superfícies)
4. Fundos e layouts por seção
5. Motion
6. Instagram no CTA
7. Humanizer

Cada etapa: typecheck, lint, Playwright e conferência visual no navegador (desktop e mobile).

## Fora do escopo

- Upscale ou geração de imagens por IA.
- Feed do Instagram via API.
- Mudanças de paleta.
