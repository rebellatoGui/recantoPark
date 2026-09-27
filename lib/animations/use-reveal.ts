import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import { prefersReducedMotion } from "./reduced-motion";

type RevealOptions = {
  y?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
};

export function useReveal<T extends HTMLElement>(
  selector = "[data-reveal]",
  { y = 60, duration = 1, stagger = 0.12, delay = 0 }: RevealOptions = {}
) {
  const scope = useRef<T>(null);

  useGSAP(
    (_context, contextSafe) => {
      const targets = scope.current?.querySelectorAll(selector);
      if (!targets?.length || prefersReducedMotion()) return;

      const setup = contextSafe!(() => {
        gsap.from(targets, {
          y,
          opacity: 0,
          duration,
          stagger,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 80%",
            once: true,
          },
        });
      });

      // Seções abaixo da dobra não precisam de animação pronta no primeiro quadro;
      // adiar tira esse trabalho do carregamento (TBT).
      const top = scope.current?.getBoundingClientRect().top ?? 0;
      if (top < window.innerHeight || !("requestIdleCallback" in window)) {
        setup();
        return;
      }
      const id = window.requestIdleCallback(setup, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    },
    { scope }
  );

  return scope;
}
