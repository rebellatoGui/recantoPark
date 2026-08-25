import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://recantopark.guilherme-rebellato-dev.workers.dev";
const paths = ["", "/acomodacoes"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${baseUrl}${locale === routing.defaultLocale ? "" : `/${locale}`}${path}`,
      lastModified: new Date(),
    }))
  );
}
