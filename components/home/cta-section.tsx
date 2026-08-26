"use client";

import { useTranslations } from "next-intl";
import { WhatsappButton } from "@/components/booking/whatsapp-button";
import { BookNowButton } from "@/components/booking/book-now-button";
import { Magnetic } from "@/components/animations/magnetic";
import { useReveal } from "@/lib/animations/use-reveal";

export function CtaSection() {
  const t = useTranslations("ctaFinal");
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} className="mx-auto max-w-5xl px-6 py-16 text-center md:py-32">
      <h2 data-reveal className="font-display text-3xl leading-tight text-foreground sm:text-5xl">
        {t("title")}
      </h2>
      <p data-reveal className="mx-auto mt-4 max-w-md text-base text-muted-foreground sm:text-lg">
        {t("subtitle")}
      </p>
      <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
        <Magnetic>
          <BookNowButton label={t("ctaPrimary")} />
        </Magnetic>
        <Magnetic>
          <WhatsappButton label={t("ctaWhatsapp")} />
        </Magnetic>
      </div>
    </section>
  );
}
