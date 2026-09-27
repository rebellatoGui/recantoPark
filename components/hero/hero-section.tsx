"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { videos } from "@/lib/data/images";
import { SmartVideo } from "@/components/ui/smart-video";
import { WhatsappButton } from "@/components/booking/whatsapp-button";
import { BookNowButton } from "@/components/booking/book-now-button";
import { Magnetic } from "@/components/animations/magnetic";
import { SplitWords } from "@/components/animations/split-words";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";
import { whenIdle } from "@/lib/animations/when-idle";

export function HeroSection() {
  const t = useTranslations("hero");
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      if (prefersReducedMotion()) return;

      // Os estados iniciais espelham os do globals.css (.hero-intro): o HTML do servidor
      // já nasce neles. A entrada espera a hidratação liberar a thread principal; começar
      // durante ela faz o primeiro quadro saltar.
      const play = contextSafe!(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out", force3D: true } });
        tl.fromTo(
          "[data-hero-glow]",
          { opacity: 0, scale: 0.4 },
          { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }
        )
          .fromTo(
            "[data-hero-seal]",
            { opacity: 0, scale: 0.85, y: 16 },
            { opacity: 1, scale: 1, y: 0, duration: 1.1 },
            "<0.1"
          )
          .fromTo("[data-hero-eyebrow]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.7")
          .fromTo(
            "[data-hero-word]",
            { y: 0, yPercent: 110 },
            { y: 0, yPercent: 0, duration: 1.1, stagger: 0.07, ease: "power4.out" },
            "-=0.55"
          )
          .fromTo("[data-hero-subtitle]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.7")
          .fromTo(
            "[data-hero-cta]",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
            "-=0.55"
          );
      });

      return whenIdle(play);
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="hero-intro relative flex h-[92vh] min-h-[640px] items-end overflow-hidden bg-navy"
    >
      <noscript>
        <style>{`.hero-intro [data-hero-glow], .hero-intro [data-hero-seal], .hero-intro [data-hero-eyebrow], .hero-intro [data-hero-subtitle], .hero-intro [data-hero-cta], .hero-intro [data-hero-word] { opacity: 1 !important; transform: none !important; animation: none !important; }`}</style>
      </noscript>
      <div data-hero-image className="absolute inset-0">
        <SmartVideo
          priority
          sources={videos.hero}
          label={t("videoLabel")}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/10" />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-navy/85 via-navy/35 to-transparent sm:h-80" />
      </div>

      <div className="absolute left-1/2 top-[104px] z-10 w-40 -translate-x-1/2 sm:top-[112px] sm:w-72 md:w-80">
        <div
          data-hero-glow
          className="absolute left-1/2 top-0 aspect-square w-[58%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,theme(colors.gold)/40%,transparent_70%)] blur-2xl"
        />
        <div
          data-hero-seal
          className="relative w-full drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)]"
        >
          <Image
            src="/brand/logo.png"
            alt="Pousada Recanto do Park"
            width={1391}
            height={876}
            priority
            className="h-auto w-full object-contain"
            sizes="320px"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 text-navy-foreground sm:pb-20">
        <p
          data-hero-eyebrow
          className="mb-4 text-sm uppercase tracking-[0.35em] text-gold"
        >
          {t("eyebrow")}
        </p>
        <h1
          data-hero-title
          className="max-w-[18ch] font-display text-[2.6rem] leading-[1] font-semibold tracking-[-0.018em] sm:text-6xl md:text-7xl"
        >
          <SplitWords text={t("title")} attr="data-hero-word" />
        </h1>
        <p
          data-hero-subtitle
          className="mt-6 max-w-[36ch] text-base text-navy-foreground/80 text-balance sm:text-lg"
        >
          {t("subtitle")}
        </p>
        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <span data-hero-cta>
            <Magnetic>
              <BookNowButton label={t("ctaPrimary")} />
            </Magnetic>
          </span>
          <span data-hero-cta>
            <Magnetic>
              <WhatsappButton />
            </Magnetic>
          </span>
        </div>
      </div>
    </section>
  );
}
