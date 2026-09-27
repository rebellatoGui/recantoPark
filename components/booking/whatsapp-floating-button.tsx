"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { whatsappLink } from "@/lib/data/pousada";
import { cn } from "@/lib/utils";

// A página de ingressos tem a própria barra fixa de WhatsApp abaixo de lg; os dois juntos colidem.
const PAGES_WITH_OWN_CTA = ["/ingressos-beto-carrero"];

export function WhatsappFloatingButton() {
  const t = useTranslations("whatsappButton");
  const pathname = usePathname();

  return (
    <a
      data-whatsapp-floating
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("label")}
      className={cn(
        "group fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105",
        PAGES_WITH_OWN_CTA.includes(pathname) && "max-lg:hidden"
      )}
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] motion-safe:animate-[whatsapp-ping_2.6s_ease-out_infinite] group-hover:hidden" />
      <WhatsappIcon className="relative size-7" />
    </a>
  );
}
