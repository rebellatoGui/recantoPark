"use client";

import { useTranslations } from "next-intl";
import { PenLine, Star } from "lucide-react";
import { contact, googleReviews, TESTIMONIAL_SLOTS } from "@/lib/data/pousada";
import { GoogleIcon } from "@/components/icons/google-icon";
import { useReveal } from "@/lib/animations/use-reveal";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5 text-terracotta">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className="size-4"
          strokeWidth={1.5}
          fill={i < rating ? "currentColor" : "none"}
        />
      ))}
    </span>
  );
}

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const scope = useReveal<HTMLElement>();
  const emptySlots = Math.max(0, TESTIMONIAL_SLOTS - googleReviews.length);

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
          {googleReviews.map((review) => (
            <figure
              key={review.id}
              data-reveal
              className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card p-6 text-center sm:p-8"
            >
              <Stars rating={review.rating} />
              <figcaption className="mt-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{review.author}</p>
                <a
                  href={contact.googleReviewsListUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
                >
                  <GoogleIcon className="size-3.5" />
                  {t("source")}
                </a>
              </figcaption>
            </figure>
          ))}

          {Array.from({ length: emptySlots }, (_, i) => (
            <a
              key={`slot-${i}`}
              data-reveal
              href={contact.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/40 p-6 text-center transition-colors hover:border-terracotta/60 hover:bg-card sm:p-8"
            >
              <PenLine className="size-6 text-terracotta" />
              <p className="mt-4 font-medium text-foreground">
                {t("placeholderTitle")}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("placeholderBody")}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-terracotta underline-offset-4 group-hover:underline">
                <GoogleIcon className="size-3.5" />
                {t("placeholderCta")}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
