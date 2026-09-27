"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Ghost, Plus, Ruler, Ticket as TicketIcon } from "lucide-react";
import { WhatsappButton } from "@/components/booking/whatsapp-button";
import { useReveal } from "@/lib/animations/use-reveal";
import {
  formatCheckedAt,
  formatPrice,
  tickets,
  type Ticket,
} from "@/lib/data/ticket-prices";
import { cn } from "@/lib/utils";
import { Tilt } from "@/components/animations/tilt";
import { SectionBackdrop } from "@/components/home/section-backdrop";

function TicketCard({ ticket, wide = false }: { ticket: Ticket; wide?: boolean }) {
  const t = useTranslations("tickets");
  const locale = useLocale();
  const name = t(`items.${ticket.id}.name`);

  return (
    <li
      data-ticket={ticket.id}
      className={cn(
        "group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-[transform,box-shadow] duration-300 motion-safe:hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10",
        wide
          ? "border-terracotta/50 ring-1 ring-terracotta/20 md:grid md:grid-cols-[1.15fr_1fr]"
          : "border-border"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-navy",
          wide ? "aspect-[16/10] md:aspect-auto md:min-h-[22rem]" : "aspect-[4/3]"
        )}
      >
        {ticket.image ? (
          <Image
            src={ticket.image}
            alt=""
            fill
            sizes={
              wide
                ? "(min-width: 768px) 55vw, 90vw"
                : "(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
            }
            className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_40%,oklch(0.35_0.09_20),oklch(0.14_0.03_280))]">
            <Ghost className="size-20 text-white/80" strokeWidth={1.25} />
          </div>
        )}
        <div className="absolute inset-x-0 top-0 flex flex-wrap gap-2 p-4">
          {ticket.featured && (
            <span className="shine relative overflow-hidden rounded-full bg-terracotta px-3 py-1 text-xs font-semibold text-white shadow">
              {t("grid.mostPopular")}
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

      <div className={cn("flex flex-1 flex-col", wide ? "p-6 sm:p-10" : "p-5")}>
        <h3
          className={cn(
            "flex items-center gap-2 font-display font-semibold text-foreground",
            wide ? "text-2xl sm:text-3xl" : "text-lg"
          )}
        >
          <TicketIcon
            className={cn("shrink-0 text-terracotta", wide ? "size-6" : "size-5")}
            strokeWidth={1.75}
          />
          {name}
        </h3>
        <p
          className={cn(
            "mt-2 flex-1 leading-relaxed text-muted-foreground",
            wide ? "text-base sm:text-lg" : "text-[0.9rem]"
          )}
        >
          {t(`items.${ticket.id}.description`)}
        </p>

        <div className="mt-5 min-h-14 border-t border-border pt-4">
          {ticket.price !== null ? (
            <p className="leading-tight">
              <span className="block text-xs text-muted-foreground">
                {t("grid.priceFrom")}
              </span>
              <span
                className={cn(
                  "font-display font-semibold text-terracotta",
                  wide ? "text-3xl" : "text-2xl"
                )}
              >
                {formatPrice(locale, ticket.price)}
              </span>
              <span className="ml-1 text-xs text-muted-foreground">
                {t("grid.perPerson")}
              </span>
            </p>
          ) : (
            <p className="pt-3 font-medium text-muted-foreground">
              {t("grid.priceOnRequest")}
            </p>
          )}
        </div>

        <WhatsappButton
          label={t("grid.cta")}
          message={t("whatsappTicketMessage", { ticket: name })}
          size="lg"
          className={cn("mt-5 w-full", wide && "sm:w-auto sm:self-start sm:px-8")}
        />
      </div>
    </li>
  );
}

export function TicketsGrid() {
  const t = useTranslations("tickets");
  const locale = useLocale();
  const scope = useReveal<HTMLElement>();

  const passport = tickets.find((ticket) => !ticket.requiresPassport);
  const optionals = tickets.filter((ticket) => ticket.requiresPassport);

  return (
    <section
      ref={scope}
      id="tipos"
      className="relative isolate scroll-mt-24 overflow-hidden bg-surface-cream px-6 pt-20 pb-12 md:pt-32 md:pb-16"
    >
      <SectionBackdrop variant="grain" />
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta">
            {t("grid.eyebrow")}
          </p>
          <h2 className="heading-section mt-3 text-foreground">
            {t("grid.title")}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">{t("grid.subtitle")}</p>
        </div>

        {passport && (
          <Tilt className="mt-12" max={3}>
            <ul data-reveal>
              <TicketCard ticket={passport} wide />
            </ul>
          </Tilt>
        )}

        <div data-reveal className="mt-14 flex items-center gap-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
            <Plus className="size-5" strokeWidth={2} />
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
              {t("grid.optionalsTitle")}
            </h3>
            <p className="text-sm text-muted-foreground">{t("grid.optionalsNote")}</p>
          </div>
        </div>

        <ul
          data-reveal
          className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {optionals.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted-foreground sm:text-sm">
          {t("grid.updatedAt", { date: formatCheckedAt(locale) })}
        </p>
      </div>
    </section>
  );
}
