"use client";

import { useTranslations } from "next-intl";
import { LogIn, LogOut, Clock, CalendarCheck } from "lucide-react";
import { useReveal } from "@/lib/animations/use-reveal";

export function EssentialInfoSection() {
  const t = useTranslations("essentialInfo");
  const tAmenities = useTranslations("amenities");
  const scope = useReveal<HTMLElement>();

  const items = [
    {
      id: "checkin",
      icon: LogIn,
      label: t("checkinLabel"),
      value: t("checkinValue"),
    },
    {
      id: "checkout",
      icon: LogOut,
      label: t("checkoutLabel"),
      value: t("checkoutValue"),
    },
    {
      id: "reception",
      icon: Clock,
      label: t("receptionLabel"),
      value: tAmenities("items.reception"),
    },
    {
      id: "cancellation",
      icon: CalendarCheck,
      label: t("cancellationLabel"),
      value: t("cancellationValue"),
    },
  ];

  return (
    <section
      ref={scope}
      className="mx-auto max-w-7xl px-6 py-16 md:py-20"
    >
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 font-display text-2xl leading-tight text-foreground sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          {t("subtitle")}
        </p>
      </div>

      <div
        data-reveal
        className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
      >
        {items.map(({ id, icon: Icon, label, value }) => (
          <div
            key={id}
            className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-4 py-6 text-center sm:items-start sm:text-left"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
              <Icon className="size-5" strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
              </p>
              <p className="mt-1 text-sm font-medium text-foreground sm:text-base">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
