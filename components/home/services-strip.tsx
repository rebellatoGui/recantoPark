"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { showcaseAmenities } from "@/lib/data/pousada";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";

export function ServicesStrip() {
  const t = useTranslations("amenities");
  const scope = useRef<HTMLDivElement>(null);
  const items = [...showcaseAmenities, ...showcaseAmenities];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const marquee = gsap.to("[data-marquee]", {
        xPercent: -50,
        duration: 32,
        ease: "none",
        repeat: -1,
        paused: true,
      });

      const trigger = ScrollTrigger.create({
        trigger: scope.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? marquee.play() : marquee.pause()),
        onUpdate: (self) => {
          const boost = Math.min(Math.abs(self.getVelocity()) / 350, 4);
          gsap.to(marquee, { timeScale: 1 + boost, duration: 0.2, overwrite: true });
          gsap.to(marquee, { timeScale: 1, duration: 0.9, delay: 0.2, ease: "power2.out" });
        },
      });

      return () => trigger.kill();
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className="relative overflow-hidden border-y border-white/10 bg-navy py-7"
    >
      <div className="relative z-10 flex overflow-hidden">
        <div data-marquee className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10">
          {items.map(({ id, icon: Icon }, index) => (
            <span
              key={`${id}-${index}`}
              className="flex shrink-0 items-center gap-2.5 text-sm tracking-wide text-navy-foreground/70"
            >
              <Icon className="size-4 text-gold" strokeWidth={1.5} />
              {t(`items.${id}`)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
