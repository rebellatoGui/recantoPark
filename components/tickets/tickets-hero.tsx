import Image from "next/image";
import { useTranslations } from "next-intl";
import { BadgePercent, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappButton } from "@/components/booking/whatsapp-button";
import { isAccreditedAgent, lodgingDiscountPercent } from "@/lib/data/pousada";

export function TicketsHero() {
  const t = useTranslations("tickets");

  const trust = [
    { icon: MapPin, label: t("trust.distance") },
    { icon: ShieldCheck, label: t("trust.official") },
    { icon: BadgePercent, label: t("trust.discount", { percent: lodgingDiscountPercent }) },
  ];

  return (
    <section className="relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden bg-navy text-navy-foreground md:min-h-[86svh]">
      <Image
        src="/photos/atracoes/hot-wheels-epic-show.webp"
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        className="-z-20 object-cover object-[50%_60%] motion-safe:animate-[hero-zoom_18s_ease-out_both]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/70 to-navy/10"
      />

      <div className="mx-auto w-full max-w-7xl px-6 pt-32 pb-10 md:pb-14">
        <div className="max-w-2xl">
          {isAccreditedAgent && (
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-navy/60 px-4 py-1.5 text-xs font-medium text-gold backdrop-blur">
              <ShieldCheck className="size-4" />
              {t("hero.badge")}
            </span>
          )}
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gold">
            {t("hero.eyebrow")}
          </p>
          <h1 className="mt-4 font-display text-[1.9rem] leading-[1.1] font-semibold text-balance sm:text-5xl md:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-5 max-w-xl text-base text-navy-foreground/85 sm:text-lg">
            {t("hero.subtitle", { percent: lodgingDiscountPercent })}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsappButton
              label={t("hero.cta")}
              message={t("whatsappMessage")}
              className="h-12 px-6 text-base"
            />
            <Button
              render={<a href="#tipos" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="h-12 border-white/40 bg-white/10 px-6 text-base text-white backdrop-blur hover:bg-white/20 hover:text-white"
            >
              {t("hero.secondary")}
            </Button>
          </div>
        </div>

        <ul className="mt-10 grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-3 md:mt-14">
          {trust.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 text-sm font-medium sm:text-base">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                <Icon className="size-[1.1rem]" strokeWidth={1.75} />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
