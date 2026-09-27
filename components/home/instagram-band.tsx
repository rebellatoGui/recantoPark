import { useTranslations } from "next-intl";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { contact } from "@/lib/data/pousada";
import { SectionBackdrop } from "@/components/home/section-backdrop";

export function InstagramBand() {
  const t = useTranslations("instagram");

  return (
    <div className="relative isolate overflow-hidden bg-surface-cream px-6 pt-10 md:pt-14">
      <SectionBackdrop variant="grain" />
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-5">
        <p className="text-sm text-muted-foreground sm:text-base">{t("invite")}</p>
        <a
          href={contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-11 items-center gap-2.5 rounded-full bg-linear-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-5 text-sm font-semibold text-white shadow-lg shadow-[#dd2a7b]/25 transition-[transform,box-shadow] duration-300 motion-safe:hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#dd2a7b]/30"
        >
          <InstagramIcon className="size-4 shrink-0 transition-transform duration-500 motion-safe:group-hover:rotate-12" />
          {contact.instagramHandle}
        </a>
      </div>
    </div>
  );
}
