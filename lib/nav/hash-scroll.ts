import type { MouseEvent } from "react";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";

// Clicar num link cuja âncora já é o hash atual não dispara scroll nenhum no
// navegador. Como header e rodapé apontam para as mesmas seções, isso deixava
// o link morto na segunda vez. Aqui o scroll é sempre explícito.
export function handleHashNav(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
) {
  if (event.defaultPrevented || event.metaKey || event.ctrlKey) return;

  const i = href.indexOf("#");
  if (i < 0) return;

  const id = href.slice(i + 1);
  const alvo = document.getElementById(id);
  if (!alvo) return; // âncora de outra página: deixa o roteador navegar

  event.preventDefault();
  alvo.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  history.replaceState(null, "", `#${id}`);
}
