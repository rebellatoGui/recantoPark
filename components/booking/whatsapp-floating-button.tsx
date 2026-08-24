import { useTranslations } from "next-intl";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { whatsappLink } from "@/lib/data/pousada";

export function WhatsappFloatingButton() {
  const t = useTranslations("whatsappButton");

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("label")}
      className="group fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] motion-safe:animate-[whatsapp-ping_2.6s_ease-out_infinite] group-hover:hidden" />
      <WhatsappIcon className="relative size-7" />
    </a>
  );
}
