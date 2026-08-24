"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "@/lib/data/images";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/animations/use-reveal";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

export function GallerySection() {
  const t = useTranslations("gallery");
  const scope = useReveal<HTMLElement>();
  const [selected, setSelected] = useState<number | null>(null);

  const showPrev = () =>
    setSelected((current) =>
      current === null
        ? current
        : (current - 1 + galleryImages.length) % galleryImages.length
    );
  const showNext = () =>
    setSelected((current) =>
      current === null ? current : (current + 1) % galleryImages.length
    );

  return (
    <section ref={scope} className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
          {t("title")}
        </h2>
      </div>

      <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-4 md:auto-rows-[220px]">
        {galleryImages.map((src, index) => (
          <button
            key={src + index}
            type="button"
            data-reveal
            onClick={() => setSelected(index)}
            className={cn(
              "group relative overflow-hidden rounded-2xl transition-transform duration-300 ease-out will-change-transform hover:z-10 hover:shadow-xl hover:shadow-black/20 [backface-visibility:hidden]",
              index % 5 === 0 && "col-span-2 row-span-2",
              index % 2 === 0 ? "hover:-rotate-1" : "hover:rotate-1"
            )}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 768px) 25vw, 50vw"
            />
          </button>
        ))}
      </div>

      <Dialog open={selected !== null} onOpenChange={() => setSelected(null)}>
        <DialogContent
          showCloseButton
          className="flex h-[92vh] w-[95vw] max-w-none flex-col items-center justify-center border-none bg-black/95 p-0 shadow-none sm:max-w-none"
        >
          <VisuallyHidden>
            <DialogTitle>{t("title")}</DialogTitle>
          </VisuallyHidden>
          {selected !== null && (
            <div className="relative h-full w-full">
              <Image
                src={galleryImages[selected]}
                alt=""
                fill
                className="object-contain"
                sizes="95vw"
                priority
              />
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
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
