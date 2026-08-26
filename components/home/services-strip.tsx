"use client";

import { useTranslations } from "next-intl";
import { amenities } from "@/lib/data/pousada";

export function ServicesStrip() {
  const t = useTranslations("amenities");
  const items = [...amenities, ...amenities];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-navy py-7">
      <div className="relative z-10 flex overflow-hidden">
        <div className="flex shrink-0 items-center gap-6 sm:gap-10 motion-safe:animate-[services-marquee_32s_linear_infinite]">
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
