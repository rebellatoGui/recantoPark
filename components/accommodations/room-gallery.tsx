"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { cn } from "@/lib/utils";

export function RoomGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const t = useTranslations("accommodations.detail");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const showPrev = () =>
    setActive((current) => (current - 1 + images.length) % images.length);
  const showNext = () => setActive((current) => (current + 1) % images.length);

  const openAt = (index: number) => {
    setActive(index);
    setOpen(true);
  };

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-4 sm:grid-rows-2 lg:h-[34rem]">
        {images.slice(0, 3).map((src, index) => (
          <button
            key={src + index}
            type="button"
            onClick={() => openAt(index)}
            className={cn(
              "group relative overflow-hidden rounded-2xl",
              index === 0
                ? "aspect-[4/3] sm:col-span-3 sm:row-span-2 sm:aspect-auto sm:min-h-80"
                : "hidden sm:block",
            )}
          >
            <Image
              src={src}
              alt={index === 0 ? alt : ""}
              fill
              priority={index === 0}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes={index === 0 ? "(min-width: 640px) 75vw, 100vw" : "25vw"}
            />
            {index === 0 && (
              <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white">
                <Expand className="size-3.5" />
                {t("galleryHint")}
              </span>
            )}
          </button>
        ))}
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:hidden">
          {images.slice(1).map((src, index) => (
            <button
              key={src + index}
              type="button"
              onClick={() => openAt(index + 1)}
              className="relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="50vw"
              />
            </button>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[92vh] w-[95vw] max-w-none flex-col items-center justify-center border-none bg-black/95 p-0 shadow-none sm:max-w-none">
          <VisuallyHidden>
            <DialogTitle>{alt}</DialogTitle>
          </VisuallyHidden>
          <div className="relative h-full w-full">
            <Image
              src={images[active]}
              alt={alt}
              fill
              className="object-contain"
              sizes="95vw"
              priority
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Anterior"
                  className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Próxima"
                  className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
