"use client";

import { SmartVideo, type VideoSource } from "@/components/ui/smart-video";
import { photos, videos } from "@/lib/data/images";
import { cn } from "@/lib/utils";

export function DroneVideo({
  sources = videos.droneGravata,
  poster = photos.droneGravataPoster,
  label,
  className,
}: {
  sources?: VideoSource[];
  poster?: string;
  label: string;
  className?: string;
}) {
  return (
    <SmartVideo
      sources={sources}
      poster={poster}
      label={label}
      sizes="(min-width: 1024px) 26vw, 80vw"
      className={cn(
        "aspect-9/16 rounded-3xl shadow-2xl shadow-black/40",
        className
      )}
    />
  );
}
