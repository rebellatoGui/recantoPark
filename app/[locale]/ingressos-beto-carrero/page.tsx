import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TicketsHero } from "@/components/tickets/tickets-hero";
import { TicketsGrid } from "@/components/tickets/tickets-grid";
import { TicketsBuildDay } from "@/components/tickets/tickets-build-day";
import { TicketsSteps } from "@/components/tickets/tickets-steps";
import { TicketsFaq } from "@/components/tickets/tickets-faq";
import { TicketsStickyCta } from "@/components/tickets/tickets-sticky-cta";
import { pageMetadata } from "@/lib/seo/site";

export async function generateMetadata(
  props: PageProps<"/[locale]/ingressos-beto-carrero">
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return pageMetadata({
    locale,
    path: "/ingressos-beto-carrero",
    title: t("titleTickets"),
    description: t("descriptionTickets"),
    siteName: t("siteName"),
  });
}

export default async function IngressosPage(
  props: PageProps<"/[locale]/ingressos-beto-carrero">
) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <TicketsHero />
      <TicketsGrid />
      <TicketsBuildDay />
      <TicketsSteps />
      <TicketsFaq />
      <TicketsStickyCta />
    </>
  );
}
