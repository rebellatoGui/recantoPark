"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { parkImages, beachImages } from "@/lib/data/images";
import { useReveal } from "@/lib/animations/use-reveal";

function DestinationPhotos({
  images,
  alt,
  reverse,
}: {
  images: [string, string];
  alt: string;
  reverse?: boolean;
}) {
  return (
    <div
      data-reveal
      className={`grid grid-cols-2 gap-3 sm:gap-4 ${reverse ? "md:order-2" : ""}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl will-change-transform [backface-visibility:hidden]">
        <Image
          src={images[0]}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(min-width: 768px) 26vw, 45vw"
        />
      </div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl will-change-transform [backface-visibility:hidden]">
        <Image
          src={images[1]}
          alt=""
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(min-width: 768px) 26vw, 45vw"
        />
      </div>
    </div>
  );
}

function DestinationText({
  title,
  distance,
  description,
  reverse,
}: {
  title: string;
  distance: string;
  description: string;
  reverse?: boolean;
}) {
  return (
    <div data-reveal className={reverse ? "md:order-1" : undefined}>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold">
        <MapPin className="size-3.5" />
        {distance}
      </span>
      <h3 className="mt-4 font-display text-xl leading-tight sm:text-3xl">
        {title}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-navy-foreground/70 sm:text-base">
        {description}
      </p>
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
      className="relative overflow-hidden bg-navy py-16 text-navy-foreground md:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,theme(colors.gold)/12%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-gold">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl">
            {t("title")}
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-8 md:gap-14">
          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
            <DestinationPhotos
              images={[parkImages[0], parkImages[1]]}
              alt={t("parkTitle")}
            />
            <DestinationText
              title={t("parkTitle")}
              distance={t("parkDistance")}
              description={t("parkDescription")}
            />
          </div>

          <div className="h-px w-full bg-white/10" />

          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
            <DestinationPhotos
              images={[beachImages[0], beachImages[1]]}
              alt={t("beachTitle")}
              reverse
            />
            <DestinationText
              title={t("beachTitle")}
              distance={t("beachDistance")}
              description={t("beachDescription")}
              reverse
            />
          </div>
        </div>
      </div>
    </section>
  );
}
