import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import { prefersReducedMotion } from "./reduced-motion";

export function useParallax<T extends HTMLElement>(amount = 8) {
  const container = useRef<T>(null);

  useGSAP(
    () => {
      const target = container.current?.querySelector("[data-parallax]");
      if (!target || prefersReducedMotion()) return;

      gsap.fromTo(
        target,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: container }
  );

  return container;
}
