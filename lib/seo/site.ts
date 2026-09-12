import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pousadarecantodopark.com.br"
).replace(/\/$/, "");

export const ogImage = {
  url: "/brand/og-image.jpg",
  width: 1200,
  height: 630,
};

const OG_LOCALES: Record<string, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};

const HREFLANG: Record<string, string> = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

export function localizedPath(locale: string, path = "") {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${prefix}${path}` || "/";
}

export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  siteName,
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
  siteName: string;
}): Metadata {
  const url = localizedPath(locale, path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [HREFLANG[l], localizedPath(l, path)])
        ),
        "x-default": localizedPath(routing.defaultLocale, path),
      },
    },
    openGraph: {
      title,
      description,
      siteName,
      url,
      type: "website",
      locale: OG_LOCALES[locale] ?? "pt_BR",
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALES[l]),
      images: [{ ...ogImage, alt: siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}
