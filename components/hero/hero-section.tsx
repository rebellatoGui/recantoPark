"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { photos } from "@/lib/data/images";
import { WhatsappButton } from "@/components/booking/whatsapp-button";
import { BookNowButton } from "@/components/booking/book-now-button";
import { Magnetic } from "@/components/animations/magnetic";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";

export function HeroSection() {
  const t = useTranslations("hero");
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(
          "[data-hero-glow], [data-hero-seal], [data-hero-eyebrow], [data-hero-title], [data-hero-subtitle], [data-hero-cta]",
          { opacity: 1, scale: 1, y: 0 }
        );
        gsap.set("[data-hero-image]", { autoAlpha: 1, scale: 1 });
        return;
      }

      const tl = gsap.timeline({ delay: 0.2 });
      tl.from("[data-hero-glow]", {
        scale: 0.4,
        opacity: 0,
        duration: 1.4,
        ease: "power2.out",
      })
        .from(
          "[data-hero-seal]",
          {
            scale: 0.85,
            y: 16,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "<0.1"
        )
        .from(
          "[data-hero-eyebrow]",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          "[data-hero-title]",
          { opacity: 0, y: 40, duration: 1, ease: "power3.out" },
          "-=0.5"
        )
        .from(
          "[data-hero-subtitle]",
          { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .from(
          "[data-hero-cta]",
          { opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.5"
        );

      // Abertura suave: o vídeo surge do fundo escuro com um leve recuo de
      // enquadramento, sem competir com o movimento do próprio drone.
      gsap.fromTo(
        "[data-hero-image]",
        { autoAlpha: 0, scale: 1.1 },
        { autoAlpha: 1, scale: 1, duration: 2.8, ease: "power2.out" }
      );
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="relative flex h-[92vh] min-h-[640px] items-end overflow-hidden bg-navy"
    >
      <div data-hero-image className="absolute inset-0 will-change-transform">
        <video
          className="h-full w-full object-cover"
          src={photos.heroVideo}
          poster={photos.heroVideoPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Vista aérea do Beto Carrero World, a poucos minutos da pousada"
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
          className="max-w-3xl font-display text-3xl leading-[1.05] font-semibold sm:text-5xl md:text-6xl"
        >
          {t("title")}
        </h1>
        <p
          data-hero-subtitle
          className="mt-6 max-w-xl text-base text-navy-foreground/80 sm:text-lg"
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
