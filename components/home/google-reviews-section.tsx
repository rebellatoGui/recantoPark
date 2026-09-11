"use client";

import Image from "next/image";
import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MapPin, Navigation, Star } from "lucide-react";
import { GoogleIcon } from "@/components/icons/google-icon";
import { contact, googleRating } from "@/lib/data/pousada";
import { InteractiveMap } from "@/components/home/interactive-map";
import { useReveal } from "@/lib/animations/use-reveal";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";

export function GoogleReviewsSection() {
  const t = useTranslations("googleReviews");
  const locale = useLocale();
  const tContact = useTranslations("contact");
  const scope = useReveal<HTMLElement>();
  const targetRef = useRef<HTMLDivElement>(null);

  // A própria logo do header descola e desce até o slot do card conforme o
  // scroll, e volta pro header ao subir.
  useGSAP(
    () => {
      const target = targetRef.current;
      if (!target) return;

      const logo = document.querySelector<HTMLElement>("[data-header-logo]");
      const cardLogo = target.querySelector<HTMLElement>("[data-card-logo]");
      const berco = logo?.parentElement;
      if (!logo || !cardLogo || !berco || prefersReducedMotion()) return;

      let entrada = 0;
      let saida = 0;
      const ease = gsap.parseEase("sine.inOut");

      // f = 0 na posição do header, 1 pousada no card. O produto mantém a
      // curva contínua na virada: alternar entre as duas fontes dava um
      // degrau de escala no instante em que a saída assumia.
      const aplicar = () => {
        const f = entrada * (1 - saida);

        // Crossfade nos últimos 8% em vez de troca seca: as duas logos
        // coincidem em posição e tamanho no fim do voo, então a passagem é
        // imperceptível. A troca binária piscava ao cruzar o limiar.
        const troca = gsap.utils.clamp(0, 1, (f - 0.92) / 0.08);
        gsap.set(cardLogo, { autoAlpha: troca });
        gsap.set(logo, { autoAlpha: 1 - troca });

        if (f <= 0.001) {
          gsap.set(logo, { x: 0, y: 0, scale: 1 });
          return;
        }

        // O berço é o <span> que posiciona a logo no header; ele nunca recebe
        // transform, então dá a origem real sem precisar zerar a do voo (era
        // o que fazia a escala oscilar enquanto o header encolhia no scroll).
        const h = berco.getBoundingClientRect();
        const t = target.getBoundingClientRect();
        const e = ease(f);

        gsap.set(logo, {
          x: (t.left + t.width / 2 - (h.left + h.width / 2)) * e,
          y: (t.top + t.height / 2 - (h.top + h.height / 2)) * e,
          scale: 1 + (t.width / h.width - 1) * e,
        });
      };

      const stEntrada = ScrollTrigger.create({
        trigger: scope.current,
        start: "top 95%",
        end: "top 35%",
        scrub: 1.4,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          entrada = self.progress;
          aplicar();
        },
      });

      const stSaida = ScrollTrigger.create({
        trigger: scope.current,
        start: "bottom 75%",
        end: "bottom 10%",
        scrub: 1.4,
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
    },
    { scope },
  );

  return (
    <section
      id="maps"
      ref={scope}
      className="mx-auto max-w-6xl px-6 pt-16 md:pt-24"
    >
      <div
        data-reveal
        className="overflow-hidden rounded-3xl border border-border bg-card"
      >
        <div className="p-8 sm:p-12">
          <div className="grid gap-8 sm:grid-cols-[1fr_1.15fr] sm:gap-10">
            <div data-card-column className="flex h-full flex-col">
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

              <a
                href={contact.googleReviewsListUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 flex w-fit items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="font-display text-2xl leading-none text-foreground">
                  {googleRating.value.toLocaleString(locale, {
                    minimumFractionDigits: 1,
                  })}
                </span>
                <span className="flex items-center gap-0.5 text-terracotta">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className="size-4"
                      strokeWidth={1.5}
                      fill={
                        i < Math.round(googleRating.value)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </span>
                <span className="underline-offset-4 group-hover:underline">
                  {t("reviewCount", { count: googleRating.count })}
                </span>
              </a>

              <div
                ref={targetRef}
                aria-hidden
                className="mx-auto mt-auto aspect-square w-full max-w-[150px] pt-6 sm:max-w-[200px] lg:max-w-[260px] lg:-translate-y-4"
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
            </div>

            <InteractiveMap className="min-h-[300px] sm:min-h-[440px]" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            <a
              href={contact.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-foreground px-3 text-center text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <GoogleIcon className="size-4 shrink-0" />
              {t("leaveReview")}
            </a>
            <a
              href={contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <MapPin className="size-4 shrink-0" />
              {t("viewOnMaps")}
            </a>
            <a
              href={contact.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Navigation className="size-4 shrink-0" />
              {t("getDirections")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
