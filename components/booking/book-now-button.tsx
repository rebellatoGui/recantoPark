import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@/components/icons/calendar-icon";
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
        "bg-gold text-black hover:bg-gold/90",
        "dark:bg-brown dark:text-white dark:hover:bg-brown/90",
        className
      )}
    >
      <CalendarIcon className="size-4 -translate-y-px" />
      {label ?? t("ctaPrimary")}
    </Button>
  );
}
