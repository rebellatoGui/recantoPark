"use client";

import { photos } from "@/lib/data/images";
import { cn } from "@/lib/utils";

export function DroneVideo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[9/16] overflow-hidden rounded-3xl shadow-2xl shadow-black/30",
        className
      )}
    >
      <video
        className="h-full w-full object-cover"
        src={photos.droneGravata}
        poster={photos.droneGravataPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Vista aérea da Praia do Gravatá"
      />
    </div>
  );
}
