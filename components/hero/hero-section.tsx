"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { heroImages } from "@/lib/data/images";
import { WhatsappButton } from "@/components/booking/whatsapp-button";
import { BookNowButton } from "@/components/booking/book-now-button";
import { Magnetic } from "@/components/animations/magnetic";
import { HeroLines } from "@/components/hero/hero-lines";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";

export function HeroSection() {
  const t = useTranslations("hero");
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(
          "[data-hero-glow], [data-hero-seal], [data-hero-eyebrow], [data-hero-title], [data-hero-subtitle], [data-hero-cta]",
          { opacity: 1, scale: 1, rotate: 0, y: 0 }
        );
        gsap.set("[data-hero-line]", { strokeDashoffset: 0 });
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
            scale: 2.4,
            rotate: -30,
            opacity: 0,
            duration: 1.1,
            ease: "back.out(1.5)",
          },
          "<0.1"
        )
        .to(
          "[data-hero-line]",
          {
            strokeDashoffset: 0,
            duration: 1.2,
            stagger: 0.04,
            ease: "power2.out",
          },
          "<0.2"
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

      gsap.to("[data-hero-orbit]", {
        rotate: 360,
        duration: 60,
        ease: "none",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.to(scope.current, {
          scale: 0.92,
          borderRadius: "2.5rem",
          boxShadow: "0 60px 120px -30px rgba(0,0,0,0.6)",
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: () => "+=" + window.innerHeight * 1.5,
            scrub: 0.6,
            pin: true,
            pinSpacing: true,
          },
        });
      });

      gsap.to("[data-hero-image]", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 1.5,
          scrub: 0.6,
        },
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="relative flex h-[92vh] min-h-[640px] items-end overflow-hidden bg-navy"
    >
      <div data-hero-image className="absolute inset-0 scale-110">
        <Image
          src={heroImages.main}
          alt="Pousada Recanto do Park"
          fill
          priority
          className="object-cover"
          sizes="100vw"
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
          data-hero-orbit
          className="absolute left-1/2 top-0 aspect-square w-[58%] -translate-x-1/2 text-gold/70"
        >
          <HeroLines className="size-full" />
        </div>
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

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 text-navy-foreground">
        <p
          data-hero-eyebrow
          className="mb-4 text-sm uppercase tracking-[0.35em] text-gold"
        >
          {t("eyebrow")}
        </p>
        <h1
          data-hero-title
          className="max-w-3xl font-display text-4xl leading-[1.05] font-semibold sm:text-6xl md:text-7xl"
        >
          {t("title")}
        </h1>
        <p
          data-hero-subtitle
          className="mt-6 max-w-xl text-lg text-navy-foreground/80"
        >
          {t("subtitle")}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
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
