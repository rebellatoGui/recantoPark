"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";
import { cn } from "@/lib/utils";

export function SectionBackdrop({
  variant,
  className,
}: {
  variant: "sunset" | "topo";
  className?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const scrollTrigger = {
        trigger: scope.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      };

      if (variant === "sunset") {
        gsap.fromTo(
          "[data-backdrop-layer]",
          { backgroundPositionY: "100%" },
          { backgroundPositionY: "70%", ease: "none", scrollTrigger },
        );
      } else {
        gsap.to("[data-backdrop-layer]", {
          yPercent: -8,
          ease: "none",
          scrollTrigger,
        });
      }
    },
    { scope, dependencies: [variant] },
  );

  return (
    <div
      ref={scope}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {variant === "sunset" ? (
        <>
          <div
            data-backdrop-layer
            className="absolute inset-x-0 bottom-0 h-[125%] bg-[url('/brand/bg-sunset.webp')] bg-cover bg-bottom bg-no-repeat opacity-55 dark:opacity-30 dark:brightness-[0.45] dark:saturate-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-transparent" />
        </>
      ) : (
        <div
          data-backdrop-layer
          className="absolute inset-x-0 top-0 h-[125%] bg-terracotta opacity-20 [mask-image:url('/brand/bg-topo.webp')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:cover] dark:bg-gold dark:opacity-15"
        />
      )}
    </div>
  );
}
