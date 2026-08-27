"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { LayoutGrid, List } from "lucide-react";
import { rooms } from "@/lib/data/pousada";
import { RoomCard } from "./room-card";
import { useReveal } from "@/lib/animations/use-reveal";
import { cn } from "@/lib/utils";

export function AccommodationsGrid() {
  const scope = useReveal<HTMLDivElement>();
  const t = useTranslations("accommodations");
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-8 flex justify-end">
        <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1">
          <button
            type="button"
            onClick={() => setView("grid")}
            aria-pressed={view === "grid"}
            aria-label={t("viewGrid")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors",
              view === "grid"
                ? "bg-terracotta text-white"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="size-4" />
            {t("viewGrid")}
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
            aria-label={t("viewList")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors",
              view === "list"
                ? "bg-terracotta text-white"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="size-4" />
            {t("viewList")}
          </button>
        </div>
      </div>

      <div
        ref={scope}
        className={cn(
          view === "grid"
            ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-6"
        )}
      >
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            id={room.id}
            slug={room.slug}
            capacity={room.capacity}
            image={room.images[0]}
            amenityIds={room.amenityIds}
            layout={view}
          />
        ))}
      </div>
    </div>
  );
}
