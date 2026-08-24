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
    () => {
      const targets = scope.current?.querySelectorAll(selector);
      if (!targets?.length) return;

      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

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
    },
    { scope }
  );

  return scope;
}
