"use client";

import { photos } from "@/lib/data/images";
import { cn } from "@/lib/utils";

export function DroneVideo({
  src = photos.droneGravata,
  poster = photos.droneGravataPoster,
  label = "Vista aérea da Praia do Gravatá",
  className,
}: {
  src?: string;
  poster?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[9/16] overflow-hidden rounded-3xl shadow-2xl shadow-black/40",
        className
      )}
    >
      <video
        className="h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
      />
    </div>
  );
}
