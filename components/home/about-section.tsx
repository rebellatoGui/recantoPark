"use client";

import { useTranslations } from "next-intl";
import { BedDouble, MapPin } from "lucide-react";
import { DroneVideo } from "@/components/home/drone-video";
import { useReveal } from "@/lib/animations/use-reveal";
import { useDrawLine } from "@/lib/animations/use-draw-line";

const stats = [
  { key: "suites", icon: BedDouble },
  { key: "distance", icon: MapPin },
] as const;

export function AboutSection() {
  const t = useTranslations("about");
  const scope = useReveal<HTMLElement>();
  const lines = useDrawLine<HTMLDivElement>();

  return (
    <section ref={scope} className="mx-auto max-w-7xl px-6 py-16 md:py-32">
      <div ref={lines} className="grid items-center gap-8 sm:gap-12 md:grid-cols-2">
        <div data-reveal className="flex justify-center md:justify-start">
          <DroneVideo className="w-full max-w-[400px]" />
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
          <h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("body")}
          </p>

          <dl className="mt-8 flex max-w-lg flex-wrap gap-x-8 gap-y-5 border-t border-border pt-8">
            {stats.map(({ key, icon: Icon }) => (
              <div key={key}>
                <dt className="flex items-center gap-2 font-display text-2xl text-terracotta sm:text-3xl">
                  <Icon
                    className="size-5 shrink-0 sm:size-6"
                    strokeWidth={1.5}
                  />
                  {t(`stats.${key}Value`)}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  {t(`stats.${key}Label`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
