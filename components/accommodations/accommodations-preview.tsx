"use client";

import { useTranslations } from "next-intl";
import { rooms } from "@/lib/data/pousada";
import { RoomCard } from "./room-card";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/lib/animations/use-reveal";

export function AccommodationsPreview() {
  const t = useTranslations("accommodationsPreview");
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} className="bg-secondary/40 py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <h2
          data-reveal
          className="text-center font-display text-3xl leading-tight text-foreground sm:text-4xl"
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
