import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";
import { prefersReducedMotion } from "./reduced-motion";

export function useDrawLine<T extends HTMLElement>(selector = "[data-draw-line]") {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      const paths =
        scope.current?.querySelectorAll<SVGPathElement>(selector);
      if (!paths?.length) return;

      paths.forEach((path) => {
        const length = path.getTotalLength();

        if (prefersReducedMotion()) {
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0 });
          return;
        }

        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 75%",
            once: true,
          },
        });
      });
    },
    { scope }
  );

  return scope;
}
