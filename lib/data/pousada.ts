import {
  Coffee,
  Wifi,
  Car,
  Snowflake,
  Bath,
  Refrigerator,
  Tv,
  Accessibility,
  PawPrint,
  type LucideIcon,
} from "lucide-react";
import { roomImages, photos, amenityStock } from "./images";

const GOOGLE_PLACE_ID = "ChIJZYBvBUHR2JQR-sRR8mTT-gc";
const GOOGLE_PLACE_CID = "575004332958795002";
const PLACE_NAME = "Pousada Recanto do Park";
const LATITUDE = -26.8145072;
const LONGITUDE = -48.6156718;

export const contact = {
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5547997491856",
  phoneDisplay: "+55 47 99749-1856",
  bookingEngineUrl:
    process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL ?? "#reservar-em-breve",
  email: "pousadarecantodopark@gmail.com",
  instagramHandle: "@recantodopark",
  instagramUrl: "https://instagram.com/recantodopark",
  googlePlaceId: GOOGLE_PLACE_ID,
  googlePlaceCid: GOOGLE_PLACE_CID,
  placeName: PLACE_NAME,
  latitude: LATITUDE,
  longitude: LONGITUDE,
  googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    PLACE_NAME,
  )}&query_place_id=${GOOGLE_PLACE_ID}`,
  googleMapsDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    PLACE_NAME,
  )}&destination_place_id=${GOOGLE_PLACE_ID}`,
  googleReviewUrl: `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`,
  googleReviewsListUrl: `https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`,
};

export function googleMapsEmbedUrl(locale: string) {
  return `https://maps.google.com/maps?cid=${GOOGLE_PLACE_CID}&hl=${locale}&z=16&output=embed`;
}

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
  | "accessibility"
  | "petFriendly";

export const amenities: {
  id: AmenityId;
  icon: LucideIcon;
  image?: string;
}[] = [
  { id: "breakfast", icon: Coffee, image: amenityStock.breakfast },
  { id: "parking", icon: Car, image: photos.estacionamento },
  { id: "ac", icon: Snowflake, image: amenityStock.ac },
  { id: "privateBathroom", icon: Bath, image: photos.banheiro1 },
  { id: "minibar", icon: Refrigerator, image: amenityStock.minibar },
  { id: "tv", icon: Tv, image: amenityStock.tv },
  { id: "wifi", icon: Wifi, image: amenityStock.wifi },
  { id: "accessibility", icon: Accessibility, image: amenityStock.accessibility },
  { id: "petFriendly", icon: PawPrint, image: amenityStock.petFriendly },
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
  // Suíte 01 tem fotografia real (as demais seguem banco de imagens por ora).
  const images =
    i === 0
      ? [photos.quarto1, photos.quarto2, photos.banheiro1]
      : [
          roomImages[i % roomImages.length],
          roomImages[(i + 5) % roomImages.length],
          roomImages[(i + 10) % roomImages.length],
        ];
  return {
    id: `suite${number}` as RoomId,
    slug: `suite-${number}`,
    images,
    amenityIds: ROOM_AMENITY_IDS,
  };
});

export function getRoomBySlug(slug: string) {
  return rooms.find((room) => room.slug === slug);
}

export const googleRating = {
  value: 5,
  count: 1,
};

export type GoogleReview = {
  id: string;
  author: string;
  rating: number;
};

export const googleReviews: GoogleReview[] = [
  { id: "ariane-rebellato", author: "Ariane Rebellato", rating: 5 },
];

export const TESTIMONIAL_SLOTS = 3;

