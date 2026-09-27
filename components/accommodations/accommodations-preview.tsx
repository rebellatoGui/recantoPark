"use client";

import { useTranslations } from "next-intl";
import { rooms } from "@/lib/data/pousada";
import { RoomCard } from "./room-card";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/lib/animations/use-reveal";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";
import { SectionBackdrop } from "@/components/home/section-backdrop";

export function AccommodationsPreview() {
  const t = useTranslations("accommodationsPreview");
  const scope = useReveal<HTMLElement>();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-room-media]").forEach((media) => {
        gsap.fromTo(
          media.querySelector("img"),
          { yPercent: -6, scale: 1.14 },
          {
            yPercent: 6,
            scale: 1.14,
            ease: "none",
            scrollTrigger: { trigger: media, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="relative isolate overflow-hidden bg-surface-cream py-12 md:py-20"
    >
      <SectionBackdrop variant="grain" />
      <div className="mx-auto max-w-5xl px-6">
        <h2
          data-reveal
          className="heading-section text-center text-foreground"
        >
          {t("title")}
        </h2>

        <div className="mt-10 flex flex-col gap-6 md:mt-14">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              slug={room.slug}
              capacity={room.capacity}
              image={room.images[0]}
              amenityIds={room.amenityIds}
              layout="list"
            />
          ))}
        </div>

        <div data-reveal className="mt-10 flex justify-center">
          <Button
            render={<Link href="/acomodacoes" />}
            nativeButton={false}
            size="lg"
            className="h-12 rounded-full bg-terracotta px-8 text-white hover:bg-terracotta/90"
          >
            {t("ctaAll")}
          </Button>
        </div>
      </div>
    </section>
  );
}
