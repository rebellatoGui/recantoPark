"use client";

import { useTranslations } from "next-intl";
import { amenities } from "@/lib/data/pousada";
import { useReveal } from "@/lib/animations/use-reveal";

export function AmenitiesSection() {
  const t = useTranslations("amenities");
  const scope = useReveal<HTMLElement>();

  return (
    <section id="comodidades" ref={scope} className="mx-auto max-w-7xl px-6 py-16 md:py-32">
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl leading-tight text-foreground sm:text-5xl">
          {t("title")}
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3">
        {amenities.map(({ id, icon: Icon }) => (
          <div
            key={id}
            data-reveal
            className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-4 py-8 text-center"
          >
            <Icon className="size-7 text-terracotta" strokeWidth={1.5} />
            <span className="text-sm text-foreground">
              {t(`items.${id}`)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
