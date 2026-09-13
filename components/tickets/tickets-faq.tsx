import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { isAccreditedAgent, lodgingDiscountPercent } from "@/lib/data/pousada";

const QUESTIONS = [
  "official",
  "delivery",
  "kids",
  "optionals",
  "withoutStay",
  "discount",
] as const;

export function TicketsFaq() {
  const t = useTranslations("tickets.faq");

  const answer = (id: (typeof QUESTIONS)[number]) =>
    id === "official" && !isAccreditedAgent
      ? t("official.answerPending")
      : t(`${id}.answer`, { percent: lodgingDiscountPercent });

  return (
    <section className="bg-muted/40 px-6 py-16 pb-28 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-display text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
          {t("title")}
        </h2>
        <div className="mt-10 divide-y divide-border rounded-3xl border border-border bg-card">
          {QUESTIONS.map((id) => (
            <details key={id} className="group px-5 sm:px-7">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium text-foreground [&::-webkit-details-marker]:hidden">
                {t(`${id}.question`, { percent: lodgingDiscountPercent })}
                <ChevronDown className="size-5 shrink-0 text-terracotta transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-5 text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
                {answer(id)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
