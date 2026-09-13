"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Ghost, Ruler, Ticket as TicketIcon } from "lucide-react";
import { WhatsappButton } from "@/components/booking/whatsapp-button";
import { useReveal } from "@/lib/animations/use-reveal";
import { formatCheckedAt, formatPrice, tickets } from "@/lib/data/ticket-prices";
import { cn } from "@/lib/utils";

export function TicketsGrid() {
  const t = useTranslations("tickets");
  const locale = useLocale();
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} id="tipos" className="scroll-mt-24 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta">
            {t("grid.eyebrow")}
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight font-semibold text-foreground sm:text-4xl">
            {t("grid.title")}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">{t("grid.subtitle")}</p>
        </div>

        <ul
          data-reveal
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {tickets.map((ticket) => {
            const name = t(`items.${ticket.id}.name`);
            return (
              <li
                key={ticket.id}
                data-ticket={ticket.id}
                className={cn(
                  "group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-[transform,box-shadow] duration-300 motion-safe:hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10",
                  ticket.featured
                    ? "border-terracotta/60 ring-2 ring-terracotta/30"
                    : "border-border"
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-navy">
                  {ticket.image ? (
                    <Image
                      src={ticket.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_40%,oklch(0.35_0.09_20),oklch(0.14_0.03_280))]">
                      <Ghost className="size-20 text-white/80" strokeWidth={1.25} />
                    </div>
                  )}
                  <div className="absolute inset-x-0 top-0 flex flex-wrap gap-2 p-4">
                    {ticket.featured && (
                      <span className="rounded-full bg-terracotta px-3 py-1 text-xs font-semibold text-white shadow">
                        {t("grid.mostPopular")}
                      </span>
                    )}
                    {ticket.requiresPassport && (
                      <span className="rounded-full bg-navy/80 px-3 py-1 text-xs font-medium text-navy-foreground backdrop-blur">
                        {t("grid.requiresPassport")}
                      </span>
                    )}
                    {ticket.minHeight && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-navy/80 px-3 py-1 text-xs font-medium text-navy-foreground backdrop-blur">
                        <Ruler className="size-3.5" />
                        {t("grid.minHeight", { height: ticket.minHeight })}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-foreground">
                    <TicketIcon className="size-5 text-terracotta" strokeWidth={1.75} />
                    {name}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                    {t(`items.${ticket.id}.description`)}
                  </p>

                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-border pt-5">
                    {ticket.price !== null ? (
                      <p className="leading-tight">
                        <span className="block text-xs text-muted-foreground">
                          {t("grid.priceFrom")}
                        </span>
                        <span className="font-display text-2xl font-semibold text-terracotta">
                          {formatPrice(locale, ticket.price)}
                        </span>
                        <span className="ml-1 text-xs text-muted-foreground">
                          {t("grid.perPerson")}
                        </span>
                      </p>
                    ) : (
                      <p className="font-medium text-foreground">{t("grid.priceOnRequest")}</p>
                    )}
                  </div>

                  <WhatsappButton
                    label={t("grid.cta")}
                    message={t("whatsappTicketMessage", { ticket: name })}
                    className="mt-5 h-12 w-full text-base"
                  />
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground sm:text-sm">
          {t("grid.updatedAt", { date: formatCheckedAt(locale) })}
        </p>
      </div>
    </section>
  );
}
