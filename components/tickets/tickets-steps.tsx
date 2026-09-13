"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/lib/animations/use-reveal";

const STEPS = ["choose", "schedule", "enjoy"] as const;

export function TicketsSteps() {
  const t = useTranslations("tickets.steps");
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} className="px-6 py-16 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2
          data-reveal
          className="text-center font-display text-2xl leading-tight text-foreground sm:text-3xl"
        >
          {t("title")}
        </h2>
        <ol data-reveal className="mt-10 grid gap-8 md:grid-cols-3">
          {STEPS.map((id, index) => (
            <li key={id} className="flex flex-col items-center text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-navy font-display text-lg text-gold">
                {index + 1}
              </span>
              <h3 className="mt-4 font-display text-lg text-foreground">
                {t(`${id}.title`)}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t(`${id}.text`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
