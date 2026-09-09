"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { photos, gravataCarousel } from "@/lib/data/images";
import { useReveal } from "@/lib/animations/use-reveal";
import { SectionBackdrop } from "@/components/home/section-backdrop";
import { PhotoCarousel } from "@/components/ui/photo-carousel";

function DestinationCard({
  image,
  alt,
  distance,
  title,
  description,
}: {
  image: string;
  alt: string;
  distance: string;
  title: string;
  description: string;
}) {
  return (
    <div
      data-reveal
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 768px) 45vw, 90vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-navy/70 px-3 py-1 text-xs font-medium text-gold backdrop-blur">
          <MapPin className="size-3.5" />
          {distance}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl leading-tight sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-foreground/70">
          {description}
        </p>
      </div>
    </div>
  );
}

export function LocationSection() {
  const t = useTranslations("location");
  const scope = useReveal<HTMLElement>();

  return (
    <section
      ref={scope}
      id="localizacao"
      className="relative isolate overflow-hidden bg-navy py-16 text-navy-foreground md:py-24"
    >
      <SectionBackdrop variant="map" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-gold">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">
            {t("title")}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          <DestinationCard
            image={photos.betoCarrero}
            alt={t("parkTitle")}
            distance={t("parkDistance")}
            title={t("parkTitle")}
            description={t("parkDescription")}
          />
          <DestinationCard
            image={photos.gravataPedras}
            alt={t("beachTitle")}
            distance={t("beachDistance")}
            title={t("beachTitle")}
            description={t("beachDescription")}
          />
        </div>

        <div data-reveal className="mt-16">
          <h3 className="font-display text-2xl sm:text-3xl">
            {t("carouselTitle")}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-navy-foreground/70 sm:text-base">
            {t("carouselSubtitle")}
          </p>
          <div className="mt-6">
            <PhotoCarousel photos={gravataCarousel} />
          </div>
        </div>
      </div>
    </section>
  );
}
