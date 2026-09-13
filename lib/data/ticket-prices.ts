import data from "./ticket-prices.json";

export type TicketId = "passport" | "fastpass" | "adrenaline" | "ultrapass" | "portal";

export type Ticket = {
  id: TicketId;
  price: number | null;
  image?: string;
  minHeight?: string;
  requiresPassport: boolean;
  featured?: boolean;
};

const details: Record<TicketId, Omit<Ticket, "id" | "price">> = {
  passport: {
    image: "/photos/atracoes/tchibum.webp",
    requiresPassport: false,
    featured: true,
  },
  fastpass: {
    image: "/photos/atracoes/madagascar-crazy-river.webp",
    requiresPassport: true,
  },
  adrenaline: {
    image: "/photos/atracoes/fire-whip.webp",
    minHeight: "1,20 m",
    requiresPassport: true,
  },
  ultrapass: {
    image: "/photos/atracoes/big-drop.webp",
    minHeight: "1,10 m",
    requiresPassport: true,
  },
  portal: {
    image: "/photos/atracoes/portal-escuridao.webp",
    requiresPassport: true,
  },
};

export const ticketPricesCheckedAt = data.checkedAt;

export const tickets: Ticket[] = data.products.map((product) => ({
  id: product.id as TicketId,
  price: product.price,
  ...details[product.id as TicketId],
}));

const localeTags: Record<string, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
};

export function formatPrice(locale: string, price: number) {
  return new Intl.NumberFormat(localeTags[locale] ?? "pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export function formatCheckedAt(locale: string) {
  return new Intl.DateTimeFormat(localeTags[locale] ?? "pt-BR", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(`${ticketPricesCheckedAt}T12:00:00Z`));
}
