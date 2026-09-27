"use client";

import { useTranslations } from "next-intl";
import { WhatsappButton } from "@/components/booking/whatsapp-button";
import { BookNowButton } from "@/components/booking/book-now-button";
import { Magnetic } from "@/components/animations/magnetic";
import { SectionBackdrop } from "@/components/home/section-backdrop";
import { useReveal } from "@/lib/animations/use-reveal";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";
import { SplitWords } from "@/components/animations/split-words";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { contact } from "@/lib/data/pousada";

export function CtaSection() {
  const t = useTranslations("ctaFinal");
  const tInstagram = useTranslations("instagram");
  const scope = useReveal<HTMLElement>();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-word]", {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.06,
        ease: "power4.out",
        scrollTrigger: { trigger: scope.current, start: "top 75%", once: true },
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="relative isolate overflow-hidden px-6 py-16 text-center md:py-32"
    >
      <SectionBackdrop variant="sunset" />
      <div className="mx-auto max-w-5xl">
        <h2 className="heading-section text-foreground">
          <SplitWords text={t("title")} />
        </h2>
        <p
          data-reveal
          className="mx-auto mt-4 max-w-md text-base text-muted-foreground sm:text-lg"
        >
          {t("subtitle")}
        </p>
        <div
          data-reveal
          className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          <Magnetic>
            <BookNowButton label={t("ctaPrimary")} />
          </Magnetic>
          <Magnetic>
            <WhatsappButton label={t("ctaWhatsapp")} />
          </Magnetic>
        </div>
        <a
          data-reveal
          data-instagram-invite
          href={contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mx-auto mt-10 flex w-fit flex-col items-center gap-3 text-base text-foreground sm:mt-12 sm:flex-row sm:text-left sm:text-foreground/80"
        >
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white shadow-md shadow-[#dd2a7b]/25 transition-transform duration-500 motion-safe:group-hover:rotate-12 motion-safe:group-hover:scale-110 sm:size-10">
            <InstagramIcon className="size-7 sm:size-5" />
          </span>
          <span className="flex flex-col sm:block">
            {tInstagram("invite")}{" "}
            <span className="link-underline text-lg font-semibold text-foreground sm:text-base">
              {contact.instagramHandle}
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
