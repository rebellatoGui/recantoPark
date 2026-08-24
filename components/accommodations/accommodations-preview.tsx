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
  const preview = rooms.slice(0, 3);

  return (
    <section ref={scope} className="bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div
          data-reveal
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <h2 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
            {t("title")}
          </h2>
          <Button
            render={<Link href="/acomodacoes" />}
            nativeButton={false}
            variant="link"
            className="px-0 text-foreground hover:text-terracotta"
          >
            {t("ctaAll")} →
          </Button>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              slug={room.slug}
              capacity={room.capacity}
              image={room.images[0]}
              amenityIds={room.amenityIds}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
