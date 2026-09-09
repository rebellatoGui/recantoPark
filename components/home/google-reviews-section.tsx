"use client";

import { useTranslations } from "next-intl";
import { MapPin, Star } from "lucide-react";
import { GoogleIcon } from "@/components/icons/google-icon";
import { contact } from "@/lib/data/pousada";
import { useReveal } from "@/lib/animations/use-reveal";

export function GoogleReviewsSection() {
  const t = useTranslations("googleReviews");
  const tContact = useTranslations("contact");
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} className="mx-auto max-w-6xl px-6 pt-16 md:pt-24">
      <div
        data-reveal
        className="overflow-hidden rounded-3xl border border-border bg-card"
      >
        <div className="grid gap-8 p-8 sm:grid-cols-[1fr_1.15fr] sm:gap-10 sm:p-12">
          <div className="flex h-full flex-col">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-[0.06em] text-muted-foreground">
              <GoogleIcon className="size-3.5" />
              {t("eyebrow")}
            </span>

            <h2 className="mt-4 font-display text-2xl leading-tight text-foreground sm:text-3xl">
              {t("title")}
            </h2>

            <p className="mt-3 flex items-start gap-1.5 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              {tContact("address")}
            </p>

            <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
              <span className="flex items-center gap-0.5 text-terracotta">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4" strokeWidth={1.5} />
                ))}
              </span>
              {t("noReviewsYet")}
            </div>

            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              <a
                href={contact.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                <GoogleIcon className="size-4" />
                {t("leaveReview")}
              </a>
              <a
                href={contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <MapPin className="size-4" />
                {t("viewOnMaps")}
              </a>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-border sm:min-h-[440px]">
            <iframe
              src={contact.googleMapsEmbedUrl}
              title={t("mapTitle")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
