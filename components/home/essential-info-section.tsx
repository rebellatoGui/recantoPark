"use client";

import { useTranslations } from "next-intl";
import { Clock, PawPrint } from "lucide-react";
import { SectionBackdrop } from "@/components/home/section-backdrop";
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
    {
      id: "pet",
      icon: PawPrint,
      label: t("petLabel"),
      value: t("petValue"),
    },
  ];

  return (
    <section
      ref={scope}
      className="relative isolate overflow-hidden px-6 py-20 md:py-32"
    >
      <SectionBackdrop variant="topo" />
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-20">
        <div data-reveal>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta">
            {t("eyebrow")}
          </p>
          <h2 className="heading-section mt-4 text-foreground">{t("title")}</h2>
          <p className="mt-4 max-w-md text-base text-muted-foreground sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <ul data-reveal className="divide-y divide-foreground/15 border-y border-foreground/15">
          {items.map(({ id, icon: Icon, label, value }) => (
            <li key={id} className="group flex items-center gap-5 py-6 sm:gap-7 sm:py-8">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-terracotta text-white transition-transform duration-500 motion-safe:group-hover:-rotate-12 sm:size-14">
                <Icon className="size-5 sm:size-6" strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </p>
                <p className="mt-1.5 font-display text-xl text-foreground sm:text-2xl">
                  {value}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
