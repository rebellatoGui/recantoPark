"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/animations/gsap";

export function Tilt({
  children,
  max = 6,
  className,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node) return;

      const mm = gsap.matchMedia();
      mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const rotateX = gsap.quickTo(node, "rotateX", { duration: 0.5, ease: "power3.out" });
        const rotateY = gsap.quickTo(node, "rotateY", { duration: 0.5, ease: "power3.out" });

        const onMove = (event: PointerEvent) => {
          const rect = node.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          rotateY(x * max * 2);
          rotateX(-y * max * 2);
        };
        const onLeave = () => {
          rotateX(0);
          rotateY(0);
        };

        gsap.set(node, { transformPerspective: 1200 });
        node.addEventListener("pointermove", onMove);
        node.addEventListener("pointerleave", onLeave);
        return () => {
          node.removeEventListener("pointermove", onMove);
          node.removeEventListener("pointerleave", onLeave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
