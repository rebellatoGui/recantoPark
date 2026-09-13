import { useTranslations } from "next-intl";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { whatsappLink } from "@/lib/data/pousada";

export function TicketsStickyCta() {
  const t = useTranslations("tickets");

  return (
    <a
      href={whatsappLink(t("whatsappMessage"))}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-24 bottom-6 left-4 z-40 flex h-14 items-center justify-center gap-2 rounded-full bg-terracotta px-5 text-base font-semibold text-white shadow-lg shadow-black/25 lg:hidden"
    >
      <WhatsappIcon className="size-5" />
      {t("sticky")}
    </a>
  );
}
