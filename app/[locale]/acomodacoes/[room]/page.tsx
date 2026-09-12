import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Users, Ruler, BedDouble, ChevronLeft, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { RoomGallery } from "@/components/accommodations/room-gallery";
import { SectionBackdrop } from "@/components/home/section-backdrop";
import { BookNowButton } from "@/components/booking/book-now-button";
import { WhatsappButton } from "@/components/booking/whatsapp-button";
import {
  rooms,
  getRoomBySlug,
  amenities,
  type AmenityId,
} from "@/lib/data/pousada";
import { photos } from "@/lib/data/images";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo/site";

const amenityIcon = Object.fromEntries(
  amenities.map((a) => [a.id, a.icon])
) as Record<AmenityId, (typeof amenities)[number]["icon"]>;

const nearby = [
  { key: "park", image: photos.betoCarrero },
  { key: "beach", image: photos.gravataPedras },
] as const;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    rooms.map((room) => ({ locale, room: room.slug }))
  );
}

export async function generateMetadata(
  props: PageProps<"/[locale]/acomodacoes/[room]">
): Promise<Metadata> {
  const { locale, room: slug } = await props.params;
  const room = getRoomBySlug(slug);
  if (!room) return {};

  const t = await getTranslations({ locale, namespace: "accommodations" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const siteName = tMeta("siteName");

  return pageMetadata({
    locale,
    path: `/acomodacoes/${room.slug}`,
    title: `${t(`rooms.${room.id}.name`)} | ${siteName}`,
    description: t(`rooms.${room.id}.description`),
    siteName,
  });
}

function RoomDetail({ room }: { room: (typeof rooms)[number] }) {
  const roomId = room.id;
  const t = useTranslations("accommodations");
  const tAmenities = useTranslations("amenities");
  const tLocation = useTranslations("location");
  const bedsText = t(`rooms.${roomId}.beds`);

  const highlights = [
    room.capacity !== undefined && {
      icon: Users,
      label: t("capacityLabel"),
      value: String(room.capacity),
    },
    bedsText && { icon: BedDouble, label: t("detail.bedsLabel"), value: bedsText },
    room.sizeSqm !== undefined && {
      icon: Ruler,
      label: t("detail.sizeLabel"),
      value: `${room.sizeSqm} m²`,
    },
  ].filter(Boolean) as { icon: typeof Users; label: string; value: string }[];

  return (
    <div className="relative isolate overflow-hidden">
      <SectionBackdrop variant="topo" />

      <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <Link
          href="/acomodacoes"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          {t("detail.backToRooms")}
        </Link>

        <div className="mt-6">
          <RoomGallery images={room.images} alt={t(`rooms.${roomId}.name`)} />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <div>
            <h1 className="font-display text-2xl leading-tight text-foreground sm:text-3xl">
              {t(`rooms.${roomId}.name`)}
            </h1>

            {highlights.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {highlights.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3"
                  >
                    <span className="flex size-9 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <div className="leading-tight">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {label}
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground">
              {t(`rooms.${roomId}.longDescription`)}
            </p>

            <div className="mt-10">
              <h2 className="font-display text-xl text-foreground">
                {t("detail.amenitiesLabel")}
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {room.amenityIds.map((amenityId) => {
                  const Icon = amenityIcon[amenityId];
                  return (
                    <div
                      key={amenityId}
                      className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3"
                    >
                      <span className="flex size-9 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {tAmenities(`items.${amenityId}`)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="font-display text-xl text-foreground">
                {t(`rooms.${roomId}.name`)}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`rooms.${roomId}.description`)}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <BookNowButton label={t("bookRoom")} className="w-full" />
                <WhatsappButton className="w-full" />
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-16 border-t border-border pt-12">
          <h2 className="font-display text-2xl text-foreground sm:text-3xl">
            {t("detail.nearbyTitle")}
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {nearby.map(({ key, image }) => (
              <div
                key={key}
                className="group relative overflow-hidden rounded-3xl border border-border"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={image}
                    alt={tLocation(`${key}Title`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 640px) 45vw, 90vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-navy-foreground">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gold">
                    <MapPin className="size-3.5" />
                    {tLocation(`${key}Distance`)}
                  </span>
                  <h3 className="mt-1 font-display text-xl leading-tight">
                    {tLocation(`${key}Title`)}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function RoomPage(
  props: PageProps<"/[locale]/acomodacoes/[room]">
) {
  const { locale, room: slug } = await props.params;
  setRequestLocale(locale);

  const room = getRoomBySlug(slug);
  if (!room) notFound();

  return <RoomDetail room={room} />;
}
