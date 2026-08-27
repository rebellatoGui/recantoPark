"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { MapPin, Star } from "lucide-react";
import { GoogleIcon } from "@/components/icons/google-icon";
import { contact } from "@/lib/data/pousada";
import { roomImages, beachImages } from "@/lib/data/images";
import { useReveal } from "@/lib/animations/use-reveal";

const photos = [roomImages[2], beachImages[1], roomImages[7]];

export function GoogleReviewsSection() {
  const t = useTranslations("googleReviews");
  const tContact = useTranslations("contact");
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} className="mx-auto max-w-5xl px-6 py-16 md:py-20">
      <div
        data-reveal
        className="overflow-hidden rounded-3xl border border-border bg-card"
      >
        <div className="grid gap-8 p-8 sm:grid-cols-[1.1fr_1fr] sm:p-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
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

            <div className="mt-6 flex flex-wrap gap-3">
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

          <div className="grid grid-cols-3 gap-2 sm:grid-rows-2 sm:gap-3">
            <div className="relative col-span-2 row-span-2 aspect-4/5 overflow-hidden rounded-2xl sm:aspect-auto">
              <Image
                src={photos[0]}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 640px) 20vw, 40vw"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={photos[1]}
                alt=""
                fill
                className="object-cover"
                sizes="15vw"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src={photos[2]}
                alt=""
                fill
                className="object-cover"
                sizes="15vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
