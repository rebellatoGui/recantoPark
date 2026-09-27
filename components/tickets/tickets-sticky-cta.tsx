"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { whatsappLink } from "@/lib/data/pousada";
import { cn } from "@/lib/utils";

import { TICKETS_HERO_CTA_ID } from "@/components/tickets/ids";

export function TicketsStickyCta() {
  const t = useTranslations("tickets");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroCta = document.getElementById(TICKETS_HERO_CTA_ID);
    const footer = document.querySelector("footer");
    if (!heroCta) return;

    let heroPassed = false;
    let footerInView = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === heroCta) {
          heroPassed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        } else {
          footerInView = entry.isIntersecting;
        }
      }
      setVisible(heroPassed && !footerInView);
    });
    observer.observe(heroCta);
    if (footer) observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      data-tickets-sticky
      href={whatsappLink(t("whatsappMessage"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={cn(
        "fixed bottom-5 left-1/2 z-40 flex h-12 -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[#16853F] px-6 text-sm font-semibold text-white shadow-lg shadow-black/25 transition-[translate,opacity] duration-500 ease-out lg:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0"
      )}
    >
      <WhatsappIcon className="size-5" />
      {t("sticky")}
    </a>
  );
}
