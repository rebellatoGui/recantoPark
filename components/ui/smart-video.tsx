"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { whenIdle } from "@/lib/animations/when-idle";
import { cn } from "@/lib/utils";

export type VideoSource = { src: string; type: string; media?: string };

export function SmartVideo({
  sources,
  poster,
  label,
  priority = false,
  deferStart = false,
  sizes,
  className,
}: {
  sources: VideoSource[];
  poster?: string;
  label: string;
  priority?: boolean;
  deferStart?: boolean;
  sizes?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useRef(false);
  const [active, setActive] = useState(priority);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const play = () => {
      if (!reducedMotion.matches) video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (reducedMotion.matches) return;
        if (entry.isIntersecting) {
          setActive(true);
          if (video.readyState >= 2) play();
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" }
    );

    const onCanPlay = () => {
      if (inView.current && video.paused) play();
    };
    video.addEventListener("canplay", onCanPlay);

    // Começar a decodificar durante a hidratação disputa a thread principal no carregamento.
    const cancelStart = deferStart ? whenIdle(() => observer.observe(video)) : null;
    if (!deferStart) observer.observe(video);

    return () => {
      cancelStart?.();
      observer.disconnect();
      video.removeEventListener("canplay", onCanPlay);
    };
  }, [deferStart]);

  useEffect(() => {
    if (active && !priority) ref.current?.load();
  }, [active, priority]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {poster && (
        <Image
          src={poster}
          alt=""
          fill
          priority={priority}
          quality={90}
          sizes={sizes}
          className="object-cover"
        />
      )}
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload={priority ? "auto" : "none"}
        autoPlay={priority}
        aria-label={label}
      >
        {active &&
          sources.map(({ src, type, media }) => (
            <source key={src} src={src} type={type} media={media} />
          ))}
      </video>
    </div>
  );
}
