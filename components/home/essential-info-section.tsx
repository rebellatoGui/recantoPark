"use client";

import { useTranslations } from "next-intl";
import { Clock } from "lucide-react";
import { useReveal } from "@/lib/animations/use-reveal";

export function EssentialInfoSection() {
  const t = useTranslations("essentialInfo");
  const tAmenities = useTranslations("amenities");
  const scope = useReveal<HTMLElement>();

  const items = [
    {
      id: "reception",
      icon: Clock,
      label: t("receptionLabel"),
      value: tAmenities("items.reception"),
    },
  ];

  return (
    <section ref={scope} className="mx-auto max-w-7xl px-6 py-10">
      <p
        data-reveal
        className="mb-5 text-center text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
      >
        {t("eyebrow")}
      </p>
      <div data-reveal className="flex flex-wrap items-center justify-center gap-4">
        {items.map(({ id, icon: Icon, label, value }) => (
          <div
            key={id}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3.5"
          >
            <Icon className="size-5 shrink-0 text-terracotta" strokeWidth={1.5} />
            <div className="text-left">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {label}
              </p>
              <p className="text-sm font-medium text-foreground">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
