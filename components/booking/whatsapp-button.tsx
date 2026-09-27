import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { whatsappLink } from "@/lib/data/pousada";
import { cn } from "@/lib/utils";

export function WhatsappButton({
  label,
  message,
  variant = "default",
  size = "default",
  className,
}: {
  label?: string;
  message?: string;
  variant?: "default" | "outline";
  size?: "default" | "lg";
  className?: string;
}) {
  const t = useTranslations("hero");

  return (
    <Button
      render={
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
        />
      }
      nativeButton={false}
      variant={variant}
      size="lg"
      className={cn(
        size === "lg" ? "h-12 px-6 text-base" : "h-11 px-5 lg:h-9 lg:px-4",
        variant === "default" &&
          "bg-[#16853F] text-white hover:bg-[#137A3B]",
        className
      )}
    >
      <WhatsappIcon className={size === "lg" ? "size-5" : "size-4"} />
      {label ?? t("ctaWhatsapp")}
    </Button>
  );
}
