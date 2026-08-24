"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { poolImages } from "@/lib/data/images";
import { useReveal } from "@/lib/animations/use-reveal";
import { useParallax } from "@/lib/animations/use-parallax";
import { useDrawLine } from "@/lib/animations/use-draw-line";

export function AboutSection() {
  const t = useTranslations("about");
  const scope = useReveal<HTMLElement>();
  const parallax = useParallax<HTMLDivElement>();
  const lines = useDrawLine<HTMLDivElement>();

  return (
    <section ref={scope} className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div ref={lines} className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative">
          <div
            data-reveal
            className="relative aspect-4/5 overflow-hidden rounded-3xl will-change-transform [backface-visibility:hidden]"
          >
            <div ref={parallax} className="absolute inset-0">
              <Image
                data-parallax
                src={poolImages[0]}
                alt=""
                fill
                className="scale-125 object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>

        <div data-reveal>
          <svg
            viewBox="0 0 80 8"
            className="mb-5 h-2 w-20 text-gold"
            fill="none"
            aria-hidden
          >
            <line
              data-draw-line
              x1="2"
              y1="4"
              x2="78"
              y2="4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <h2 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            {t("body")}
          </p>
        </div>
      </div>
    </section>
  );
}
