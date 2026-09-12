import Image from "next/image";
import { useTranslations } from "next-intl";
import { BedDouble, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BookNowButton } from "@/components/booking/book-now-button";
import { Link } from "@/i18n/navigation";
import { amenities, type RoomId, type AmenityId } from "@/lib/data/pousada";

const amenityIcon = Object.fromEntries(
  amenities.map((a) => [a.id, a.icon])
) as Partial<Record<AmenityId, (typeof amenities)[number]["icon"]>>;

export function RoomCard({
  id,
  slug,
  capacity,
  image,
  amenityIds,
  layout = "grid",
}: {
  id: RoomId;
  slug: string;
  capacity?: number;
  image: string;
  amenityIds: AmenityId[];
  layout?: "grid" | "list";
}) {
  const t = useTranslations("accommodations");
  const tAmenities = useTranslations("amenities");
  const href = `/acomodacoes/${slug}`;

  if (layout === "list") {
    return (
      <article
        className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card sm:flex-row"
        data-reveal
      >
        <Link
          href={href}
          className="relative block aspect-[4/3] shrink-0 overflow-hidden will-change-transform [backface-visibility:hidden] sm:aspect-auto sm:w-72"
        >
          <Image
            src={image}
            alt={t(`rooms.${id}.name`)}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(min-width: 640px) 288px, 100vw"
          />
        </Link>

        <div className="flex flex-1 flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="flex-1">
            <Link href={href}>
              <h3 className="font-display text-2xl text-foreground transition-colors group-hover:text-terracotta">
                {t(`rooms.${id}.name`)}
              </h3>
            </Link>
            {capacity !== undefined && (
              <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users className="size-4" />
                {t("capacityLabel")}: {capacity}
              </p>
            )}
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {t(`rooms.${id}.longDescription`)}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <AmenityBadge label={t("roomLabel")} Icon={BedDouble} />
              {amenityIds.map((amenityId) => (
                <AmenityBadge
                  key={amenityId}
                  label={tAmenities(`items.${amenityId}`)}
                  Icon={amenityIcon[amenityId]}
                />
              ))}
            </div>
          </div>

          <div className="sm:shrink-0">
            <BookNowButton label={t("bookRoom")} className="w-full sm:w-auto" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-card" data-reveal>
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden will-change-transform [backface-visibility:hidden]">
        <Image
          src={image}
          alt={t(`rooms.${id}.name`)}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
      </Link>

      <div className="p-5">
        <Link href={href}>
          <h3 className="font-display text-xl text-foreground transition-colors group-hover:text-terracotta">
            {t(`rooms.${id}.name`)}
          </h3>
        </Link>
        {capacity !== undefined && (
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users className="size-4" />
            {t("capacityLabel")}: {capacity}
          </p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {t(`rooms.${id}.description`)}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <AmenityBadge label={t("roomLabel")} Icon={BedDouble} />
          {amenityIds.map((amenityId) => (
            <AmenityBadge
              key={amenityId}
              label={tAmenities(`items.${amenityId}`)}
              Icon={amenityIcon[amenityId]}
            />
          ))}
        </div>

        <BookNowButton label={t("bookRoom")} className="mt-6 w-full" />
      </div>
    </article>
  );
}

function AmenityBadge({
  label,
  Icon,
}: {
  label: string;
  Icon?: (typeof amenities)[number]["icon"];
}) {
  return (
    <Badge variant="secondary" className="gap-1.5 font-normal">
      {Icon && <Icon className="size-3.5 text-terracotta" aria-hidden />}
      {label}
    </Badge>
  );
}
