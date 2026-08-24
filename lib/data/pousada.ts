import {
  Waves,
  Coffee,
  Wifi,
  Car,
  Snowflake,
  Flame,
  Baby,
  PawPrint,
  type LucideIcon,
} from "lucide-react";
import { poolImages, roomImages } from "./images";

export const contact = {
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5547999990000",
  bookingEngineUrl:
    process.env.NEXT_PUBLIC_BOOKING_ENGINE_URL ?? "#reservar-em-breve",
  email: "contato@recantodopark.com.br",
  instagramHandle: "@recantodopark",
  instagramUrl: "https://instagram.com/recantodopark",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export type AmenityId =
  | "pool"
  | "breakfast"
  | "wifi"
  | "parking"
  | "ac"
  | "bbq"
  | "kidsArea"
  | "petFriendly";

export const amenities: { id: AmenityId; icon: LucideIcon }[] = [
  { id: "pool", icon: Waves },
  { id: "breakfast", icon: Coffee },
  { id: "wifi", icon: Wifi },
  { id: "parking", icon: Car },
  { id: "ac", icon: Snowflake },
  { id: "bbq", icon: Flame },
  { id: "kidsArea", icon: Baby },
  { id: "petFriendly", icon: PawPrint },
];

export type RoomId =
  | "standardCasal"
  | "standardFamilia"
  | "superiorVistaJardim"
  | "suiteMaster"
  | "quartoGrupo";

export const rooms: {
  id: RoomId;
  slug: string;
  capacity: number;
  sizeSqm: number;
  images: string[];
  amenityIds: AmenityId[];
}[] = [
  {
    id: "standardCasal",
    slug: "standard-casal",
    capacity: 2,
    sizeSqm: 18,
    images: [roomImages[0], roomImages[5], roomImages[10], roomImages[15]],
    amenityIds: ["wifi", "ac"],
  },
  {
    id: "standardFamilia",
    slug: "standard-familia",
    capacity: 4,
    sizeSqm: 24,
    images: [roomImages[1], roomImages[6], roomImages[11], roomImages[16]],
    amenityIds: ["wifi", "ac", "kidsArea"],
  },
  {
    id: "superiorVistaJardim",
    slug: "superior-vista-jardim",
    capacity: 3,
    sizeSqm: 22,
    images: [roomImages[2], roomImages[7], roomImages[12], roomImages[17]],
    amenityIds: ["wifi", "ac", "breakfast"],
  },
  {
    id: "suiteMaster",
    slug: "suite-master",
    capacity: 2,
    sizeSqm: 30,
    images: [roomImages[3], roomImages[8], roomImages[13], roomImages[18]],
    amenityIds: ["wifi", "ac", "breakfast", "pool"],
  },
  {
    id: "quartoGrupo",
    slug: "quarto-grupo",
    capacity: 6,
    sizeSqm: 28,
    images: [roomImages[4], roomImages[9], roomImages[14], roomImages[19]],
    amenityIds: ["wifi", "ac", "kidsArea"],
  },
];

export function getRoomBySlug(slug: string) {
  return rooms.find((room) => room.slug === slug);
}

export const testimonialIds = ["t1", "t2", "t3"] as const;

export const gallerySpotlight = poolImages[3];
