import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/data/pousada";
import { cn } from "@/lib/utils";

export function BookNowButton({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  const t = useTranslations("hero");

  return (
    <Button
      render={<a href={contact.bookingEngineUrl} />}
      nativeButton={false}
      size="lg"
      className={cn(
        "bg-gold text-gold-foreground hover:bg-gold/90",
        className
      )}
    >
      {label ?? t("ctaPrimary")}
    </Button>
  );
}
