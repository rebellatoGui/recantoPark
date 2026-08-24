import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { AccommodationsGrid } from "@/components/accommodations/accommodations-grid";

export async function generateMetadata(
  props: PageProps<"/[locale]/acomodacoes">
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("titleAccommodations"),
    description: t("descriptionAccommodations"),
  };
}

function AccommodationsHero() {
  const t = useTranslations("accommodations.hero");

  return (
    <div className="bg-navy py-20 text-navy-foreground md:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-gold">
          {t("eyebrow")}
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-navy-foreground/80">{t("subtitle")}</p>
      </div>
    </div>
  );
}

export default async function AcomodacoesPage(
  props: PageProps<"/[locale]/acomodacoes">
) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <AccommodationsHero />
      <AccommodationsGrid />
    </>
  );
}
