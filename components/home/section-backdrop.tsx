"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";
import { cn } from "@/lib/utils";

export function SectionBackdrop({
  variant,
  className,
}: {
  variant: "sunset" | "topo" | "map" | "park";
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
      } else if (variant === "map" || variant === "park") {
        gsap.fromTo(
          "[data-backdrop-layer]",
          { backgroundPositionY: "42%" },
          { backgroundPositionY: "58%", ease: "none", scrollTrigger },
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
      ) : variant === "park" ? (
        <>
          <div
            data-backdrop-layer
            className="absolute inset-x-0 top-0 h-[120%] scale-105 bg-[url('/photos/beto-carrero-world-parque.webp')] bg-cover bg-center"
          />
          <div className="absolute inset-0 bg-navy/82" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-transparent to-navy/60" />
        </>
      ) : variant === "map" ? (
        <>
          <div
            data-backdrop-layer
            className="absolute inset-x-0 top-0 h-[120%] scale-105 bg-[url('/photos/google-maps.webp')] bg-cover bg-center blur-[3px]"
          />
          <div className="absolute inset-0 bg-navy/88" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,theme(colors.gold)/10%,transparent_70%)]" />
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
