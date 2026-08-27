import Image from "next/image";
import { useTranslations } from "next-intl";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BookNowButton } from "@/components/booking/book-now-button";
import { WhatsappButton } from "@/components/booking/whatsapp-button";
import { Link } from "@/i18n/navigation";
import type { RoomId, AmenityId } from "@/lib/data/pousada";

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

        <div className="flex flex-1 flex-col p-6">
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
            {amenityIds.map((amenityId) => (
              <Badge key={amenityId} variant="secondary" className="font-normal">
                {tAmenities(`items.${amenityId}`)}
              </Badge>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 sm:mt-auto">
            <BookNowButton label={t("bookRoom")} />
            <WhatsappButton variant="outline" />
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
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </Link>

      <div className="p-6">
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
          {amenityIds.map((amenityId) => (
            <Badge key={amenityId} variant="secondary" className="font-normal">
              {tAmenities(`items.${amenityId}`)}
            </Badge>
          ))}
        </div>

        <BookNowButton label={t("bookRoom")} className="mt-6 w-full" />
      </div>
    </article>
  );
}
