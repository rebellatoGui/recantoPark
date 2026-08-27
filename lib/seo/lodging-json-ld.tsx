import { contact } from "@/lib/data/pousada";

export function LodgingJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Pousada Recanto do Park",
    description:
      "Pousada em Penha/SC, a poucos minutos do Beto Carrero World e das praias da região.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Timóteo Perfeito Flores, 2994",
      addressLocality: "Penha",
      addressRegion: "SC",
      addressCountry: "BR",
    },
    email: contact.email,
    telephone: contact.phoneDisplay,
    sameAs: [contact.instagramUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
