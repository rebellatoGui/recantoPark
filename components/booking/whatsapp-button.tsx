import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { whatsappLink } from "@/lib/data/pousada";
import { cn } from "@/lib/utils";

export function WhatsappButton({
  label,
  variant = "default",
  className,
}: {
  label?: string;
  variant?: "default" | "outline";
  className?: string;
}) {
  const t = useTranslations("hero");

  return (
    <Button
      render={<a href={whatsappLink()} target="_blank" rel="noopener noreferrer" />}
      nativeButton={false}
      variant={variant}
      size="lg"
      className={cn(
        variant === "default" && "bg-[#25D366] text-white hover:bg-[#1fb757]",
        className
      )}
    >
      <WhatsappIcon className="size-4" />
      {label ?? t("ctaWhatsapp")}
    </Button>
  );
}
