import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SmoothScroll } from "@/lib/animations/smooth-scroll";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { WhatsappFloatingButton } from "@/components/booking/whatsapp-floating-button";
import { SyncHtmlLang } from "@/components/layout/sync-html-lang";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: LayoutProps<"/[locale]">
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("titleHome"),
    description: t("descriptionHome"),
  };
}

export default async function LocaleLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <SyncHtmlLang locale={locale} />
      <SmoothScroll>
        <ScrollProgress />
        <SiteHeader />
        <main className="flex-1">{props.children}</main>
        <SiteFooter />
        <WhatsappFloatingButton />
      </SmoothScroll>
    </NextIntlClientProvider>
  );
}
