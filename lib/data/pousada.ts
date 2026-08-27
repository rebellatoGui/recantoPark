import {
  Coffee,
  Wifi,
  Car,
  Snowflake,
  Bath,
  Refrigerator,
  Tv,
  Accessibility,
  BedDouble,
  type LucideIcon,
} from "lucide-react";
import { roomImages } from "./images";

export const contact = {
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5547997491856",
  phoneDisplay: "+55 47 99749-1856",
  bookingEngineUrl:
    process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL ?? "#reservar-em-breve",
  email: "pousadarecantodopark@gmail.com",
  instagramHandle: "@recantodopark",
  instagramUrl: "https://instagram.com/recantodopark",
  googlePlaceId: "ChIJZYBvBUHR2JQR-sRR8mTT-gc",
  googleMapsUrl:
    "https://www.google.com/maps/place/?q=place_id:ChIJZYBvBUHR2JQR-sRR8mTT-gc",
  googleReviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJZYBvBUHR2JQR-sRR8mTT-gc",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export type AmenityId =
  | "suites"
  | "breakfast"
  | "parking"
  | "reception"
  | "ac"
  | "privateBathroom"
  | "minibar"
  | "tv"
  | "wifi"
  | "accessibility";

export const amenities: { id: AmenityId; icon: LucideIcon }[] = [
  { id: "suites", icon: BedDouble },
  { id: "breakfast", icon: Coffee },
  { id: "parking", icon: Car },
  { id: "ac", icon: Snowflake },
  { id: "privateBathroom", icon: Bath },
  { id: "minibar", icon: Refrigerator },
  { id: "tv", icon: Tv },
  { id: "wifi", icon: Wifi },
  { id: "accessibility", icon: Accessibility },
];

const ROOM_AMENITY_IDS: AmenityId[] = [
  "privateBathroom",
  "ac",
  "tv",
  "wifi",
  "minibar",
];

const SUITE_COUNT = 16;

export type RoomId = `suite${string}`;

export const rooms: {
  id: RoomId;
  slug: string;
  capacity?: number;
  sizeSqm?: number;
  images: string[];
  amenityIds: AmenityId[];
}[] = Array.from({ length: SUITE_COUNT }, (_, i) => {
  const number = String(i + 1).padStart(2, "0");
  return {
    id: `suite${number}` as RoomId,
    slug: `suite-${number}`,
    images: [
      roomImages[i % roomImages.length],
      roomImages[(i + 5) % roomImages.length],
      roomImages[(i + 10) % roomImages.length],
    ],
    amenityIds: ROOM_AMENITY_IDS,
  };
});

export function getRoomBySlug(slug: string) {
  return rooms.find((room) => room.slug === slug);
}

export const testimonialIds = ["t1", "t2", "t3"] as const;

export const gallerySpotlight = roomImages[0];
