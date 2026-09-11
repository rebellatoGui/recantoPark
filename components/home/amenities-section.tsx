"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { amenities } from "@/lib/data/pousada";
import { useReveal } from "@/lib/animations/use-reveal";

export function AmenitiesSection() {
  const t = useTranslations("amenities");
  const scope = useReveal<HTMLElement>();

  return (
    <section
      id="servicos"
      ref={scope}
      className="mx-auto max-w-6xl px-6 py-16 md:py-28"
    >
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.06em] text-terracotta">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
          {t("title")}
        </h2>
      </div>

      <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:gap-x-12">
        {amenities.map(({ id, icon: Icon, image }) => (
          <li
            key={id}
            data-reveal
            className="group flex flex-col items-center text-center"
          >
            <div className="relative aspect-square w-full max-w-[160px] overflow-hidden rounded-full border border-border bg-secondary shadow-sm">
              {image ? (
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 160px, (min-width: 640px) 22vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center">
                  <Icon
                    className="size-10 text-terracotta transition-transform duration-500 group-hover:scale-110"
                    strokeWidth={1.25}
                  />
                </span>
              )}
            </div>

            <span className="mt-4 text-sm font-medium text-foreground sm:text-base">
              {t(`items.${id}`)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
