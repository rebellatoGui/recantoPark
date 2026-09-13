import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/legal/legal-page";
import { pageMetadata } from "@/lib/seo/site";

export async function generateMetadata(
  props: PageProps<"/[locale]/politica-de-privacidade">
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "legal.privacy" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  return pageMetadata({
    locale,
    path: "/politica-de-privacidade",
    title: t("metaTitle"),
    description: t("metaDescription"),
    siteName: tMeta("siteName"),
  });
}

export default async function PoliticaDePrivacidadePage(
  props: PageProps<"/[locale]/politica-de-privacidade">
) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <LegalPage document="privacy" />;
}
