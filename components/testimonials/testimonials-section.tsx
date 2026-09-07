"use client";

import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";
import { testimonialIds } from "@/lib/data/pousada";
import { useReveal } from "@/lib/animations/use-reveal";

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} className="pb-16 pt-10 md:pb-20 md:pt-12">
      <div className="mx-auto max-w-5xl px-6">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.06em] text-terracotta">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-2xl leading-tight text-foreground sm:text-3xl">
            {t("title")}
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:gap-6 md:grid-cols-3">
          {testimonialIds.map((id) => (
            <blockquote
              key={id}
              data-reveal
              className="rounded-3xl border border-border bg-card p-6 sm:p-8"
            >
              <Quote className="size-6 text-terracotta" />
              <p className="mt-4 text-foreground/90">
                “{t(`items.${id}.quote`)}”
              </p>
              <footer className="mt-6 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">
                  {t(`items.${id}.name`)}
                </p>
                <p>{t(`items.${id}.location`)}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
