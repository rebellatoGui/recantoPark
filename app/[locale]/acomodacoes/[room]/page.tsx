import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Users, Ruler, BedDouble, ChevronLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { RoomGallery } from "@/components/accommodations/room-gallery";
import { BookNowButton } from "@/components/booking/book-now-button";
import { WhatsappButton } from "@/components/booking/whatsapp-button";
import { rooms, getRoomBySlug } from "@/lib/data/pousada";
import { routing } from "@/i18n/routing";

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

  return {
    title: `${t(`rooms.${room.id}.name`)} | Pousada Recanto do Park`,
    description: t(`rooms.${room.id}.description`),
  };
}

function RoomDetail({ room }: { room: (typeof rooms)[number] }) {
  const roomId = room.id;
  const t = useTranslations("accommodations");
  const tAmenities = useTranslations("amenities");

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
      <Link
        href="/acomodacoes"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        {t("detail.backToRooms")}
      </Link>

      <div className="mt-6">
        <RoomGallery
          images={room.images}
          alt={t(`rooms.${roomId}.name`)}
        />
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-[1.6fr_1fr]">
        <div>
          <h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
            {t(`rooms.${roomId}.name`)}
          </h1>

          <div className="mt-5 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Users className="size-4" />
              {t("capacityLabel")}: {room.capacity}
            </span>
            <span className="flex items-center gap-1.5">
              <Ruler className="size-4" />
              {t("detail.sizeLabel")}: {room.sizeSqm} m²
            </span>
            <span className="flex items-center gap-1.5">
              <BedDouble className="size-4" />
              {t("detail.bedsLabel")}: {t(`rooms.${roomId}.beds`)}
            </span>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-foreground">
            {t(`rooms.${roomId}.longDescription`)}
          </p>

          <div className="mt-8">
            <h2 className="font-display text-lg text-foreground">
              {t("detail.amenitiesLabel")}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {room.amenityIds.map((amenityId) => (
                <Badge
                  key={amenityId}
                  variant="secondary"
                  className="font-normal"
                >
                  {tAmenities(`items.${amenityId}`)}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-3xl border border-border bg-card p-6">
          <p className="font-display text-lg text-foreground">
            {t(`rooms.${roomId}.name`)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("capacityLabel")}: {room.capacity} · {room.sizeSqm} m²
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <BookNowButton label={t("bookRoom")} className="w-full" />
            <WhatsappButton className="w-full" />
          </div>
        </aside>
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
