"use client";

import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";
import { testimonialIds } from "@/lib/data/pousada";
import { useReveal } from "@/lib/animations/use-reveal";

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} className="bg-navy py-16 text-navy-foreground md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-gold">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl">
            {t("title")}
          </h2>
        </div>

        <div className="mt-16 grid gap-5 sm:gap-8 md:grid-cols-3">
          {testimonialIds.map((id) => (
            <blockquote
              key={id}
              data-reveal
              className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
            >
              <Quote className="size-6 text-gold" />
              <p className="mt-4 text-navy-foreground/90">
                “{t(`items.${id}.quote`)}”
              </p>
              <footer className="mt-6 text-sm text-navy-foreground/60">
                <p className="font-medium text-navy-foreground">
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
