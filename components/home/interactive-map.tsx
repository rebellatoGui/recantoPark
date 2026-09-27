"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { googleMapsEmbedUrl } from "@/lib/data/pousada";
import { photos } from "@/lib/data/images";

export function InteractiveMap({ className = "" }: { className?: string }) {
  const t = useTranslations("googleReviews");
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative isolate overflow-hidden rounded-2xl border border-border bg-secondary ${className}`}
    >
      <Image
        src={photos.googleMaps}
        alt=""
        fill
        sizes="(min-width: 1024px) 560px, 90vw"
        className="-z-10 object-cover"
      />
      {visible ? (
        <iframe
          src={googleMapsEmbedUrl(locale)}
          title={t("mapTitle")}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}

      <div
        aria-hidden={loaded}
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
          loaded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-terracotta text-white shadow-lg shadow-black/20">
          <MapPin className="size-6 motion-safe:animate-bounce" />
        </span>
      </div>
    </div>
  );
}
