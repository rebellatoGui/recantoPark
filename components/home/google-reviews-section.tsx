"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Star } from "lucide-react";
import { GoogleIcon } from "@/components/icons/google-icon";
import { contact } from "@/lib/data/pousada";
import { useReveal } from "@/lib/animations/use-reveal";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";

export function GoogleReviewsSection() {
  const t = useTranslations("googleReviews");
  const tContact = useTranslations("contact");
  const scope = useReveal<HTMLElement>();
  const targetRef = useRef<HTMLDivElement>(null);

  // A própria logo do header descola e desce até o card conforme o scroll,
  // e volta pro header ao subir. Só no desktop.
  useGSAP(
    () => {
      const target = targetRef.current;
      if (!target) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const logo = document.querySelector<HTMLElement>("[data-header-logo]");
        const cardLogo =
          target.querySelector<HTMLElement>("[data-card-logo]");
        if (!logo || !cardLogo || prefersReducedMotion()) return;

        let home: { cx: number; cy: number; w: number } | null = null;
        let entrada = 0;
        let saida = 0;
        const ease = gsap.parseEase("power2.inOut");

        // f = 0 na posição do header, 1 pousada no card. A saída tem
        // precedência: assim que ela começa, comanda o caminho de volta.
        const aplicar = () => {
          const f = saida > 0 ? 1 - saida : entrada;

          if (f >= 0.999) {
            gsap.set(cardLogo, { autoAlpha: 1 });
            gsap.set(logo, { autoAlpha: 0 });
            return;
          }

          gsap.set(cardLogo, { autoAlpha: 0 });
          gsap.set(logo, { autoAlpha: 1 });

          if (f <= 0.001) {
            gsap.set(logo, { x: 0, y: 0, scale: 1 });
            home = null;
            return;
          }

          if (!home) {
            gsap.set(logo, { x: 0, y: 0, scale: 1 });
            const r = logo.getBoundingClientRect();
            home = {
              cx: r.left + r.width / 2,
              cy: r.top + r.height / 2,
              w: r.width,
            };
          }

          const t = target.getBoundingClientRect();
          const e = ease(f);

          gsap.set(logo, {
            x: (t.left + t.width / 2 - home.cx) * e,
            y: (t.top + t.height / 2 - home.cy) * e,
            scale: 1 + (t.width / home.w - 1) * e,
          });
        };

        const stEntrada = ScrollTrigger.create({
          trigger: scope.current,
          start: "top 88%",
          end: "top 38%",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            entrada = self.progress;
            aplicar();
          },
        });

        const stSaida = ScrollTrigger.create({
          trigger: scope.current,
          start: "bottom 80%",
          end: "bottom 30%",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            saida = self.progress;
            aplicar();
          },
        });

        return () => {
          stEntrada.kill();
          stSaida.kill();
          gsap.set(logo, { clearProps: "transform,opacity,visibility" });
          gsap.set(cardLogo, { clearProps: "opacity,visibility" });
        };
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="mx-auto max-w-6xl px-6 pt-16 md:pt-24">
      <div
        data-reveal
        className="overflow-hidden rounded-3xl border border-border bg-card"
      >
        <div className="grid gap-8 p-8 sm:grid-cols-[1fr_1.15fr] sm:gap-10 sm:p-12">
          <div className="flex h-full flex-col">
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

            <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
              <span className="flex items-center gap-0.5 text-terracotta">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4" strokeWidth={1.5} />
                ))}
              </span>
              {t("noReviewsYet")}
            </div>

            <div className="mt-auto pt-8">
              <div className="w-fit">
                <div
                  ref={targetRef}
                  aria-hidden
                  className="mx-auto mb-8 hidden size-40 lg:block"
                >
                  <Image
                    data-card-logo
                    src="/brand/logo-oficial.png"
                    alt=""
                    width={1254}
                    height={1254}
                    className="h-full w-full rounded-2xl object-contain opacity-0 drop-shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
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
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-border sm:min-h-[440px]">
            <iframe
              src={contact.googleMapsEmbedUrl}
              title={t("mapTitle")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
