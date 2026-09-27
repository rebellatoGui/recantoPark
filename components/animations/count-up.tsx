"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/\d+/);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node || !match || prefersReducedMotion()) return;

      const target = Number(match[0]);
      const counter = { n: 0 };
      gsap.to(counter, {
        n: target,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: node, start: "top 85%", once: true },
        onUpdate: () => {
          node.textContent = value.replace(match[0], String(Math.round(counter.n)));
        },
      });
    },
    { dependencies: [value] }
  );

  return <span ref={ref}>{value}</span>;
}
