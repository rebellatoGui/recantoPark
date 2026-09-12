"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { MapPin, Navigation, Star } from "lucide-react";
import { GoogleIcon } from "@/components/icons/google-icon";
import { contact, googleRating } from "@/lib/data/pousada";
import { InteractiveMap } from "@/components/home/interactive-map";
import { useReveal } from "@/lib/animations/use-reveal";

export function GoogleReviewsSection() {
  const t = useTranslations("googleReviews");
  const locale = useLocale();
  const tContact = useTranslations("contact");
  const scope = useReveal<HTMLElement>();

  return (
    <section
      id="maps"
      ref={scope}
      className="mx-auto max-w-6xl px-6 pt-16 md:pt-24"
    >
      <div
        data-reveal
        className="overflow-hidden rounded-3xl border border-border bg-card"
      >
        <div className="p-8 sm:p-12">
          <div className="grid gap-8 sm:grid-cols-[1fr_1.15fr] sm:gap-10">
            <div data-card-column className="flex h-full flex-col">
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

              <a
                href={contact.googleReviewsListUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 flex w-fit items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="font-display text-2xl leading-none text-foreground">
                  {googleRating.value.toLocaleString(locale, {
                    minimumFractionDigits: 1,
                  })}
                </span>
                <span className="flex items-center gap-0.5 text-terracotta">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className="size-4"
                      strokeWidth={1.5}
                      fill={
                        i < Math.round(googleRating.value)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </span>
                <span className="underline-offset-4 group-hover:underline">
                  {t("reviewCount", { count: googleRating.count })}
                </span>
              </a>

              <div
                aria-hidden
                className="mx-auto mt-auto aspect-square w-full max-w-[150px] pt-6 sm:max-w-[200px] lg:max-w-[260px] lg:-translate-y-4"
              >
                <Image
                  src="/brand/logo-oficial.png"
                  alt=""
                  width={1254}
                  height={1254}
                  className="h-full w-full rounded-2xl object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                />
              </div>
            </div>

            <InteractiveMap className="min-h-[300px] sm:min-h-[440px]" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            <a
              href={contact.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-foreground px-3 text-center text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <GoogleIcon className="size-4 shrink-0" />
              {t("leaveReview")}
            </a>
            <a
              href={contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <MapPin className="size-4 shrink-0" />
              {t("viewOnMaps")}
            </a>
            <a
              href={contact.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Navigation className="size-4 shrink-0" />
              {t("getDirections")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
