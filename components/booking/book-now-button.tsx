import { useTranslations } from "next-intl";
import { Calendar } from "lucide-react";
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
        "bg-gold text-white hover:bg-gold/90 dark:text-black",
        className
      )}
    >
      <Calendar className="size-4 text-white dark:text-black" strokeWidth={2} />
      {label ?? t("ctaPrimary")}
    </Button>
  );
}
