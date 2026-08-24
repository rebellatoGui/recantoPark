import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/hero/hero-section";
import { ServicesStrip } from "@/components/home/services-strip";
import { AboutSection } from "@/components/home/about-section";
import { LocationSection } from "@/components/home/location-section";
import { AmenitiesSection } from "@/components/home/amenities-section";
import { AmbientPhotos } from "@/components/home/ambient-photos";
import { AccommodationsPreview } from "@/components/accommodations/accommodations-preview";
import { GallerySection } from "@/components/gallery/gallery-section";
import { TestimonialsSection } from "@/components/testimonials/testimonials-section";
import { CtaSection } from "@/components/home/cta-section";
import { LodgingJsonLd } from "@/lib/seo/lodging-json-ld";

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <LodgingJsonLd />
      <HeroSection />
      <ServicesStrip />
      <AboutSection />
      <LocationSection />
      <div className="relative isolate">
        <AmbientPhotos />
        <AmenitiesSection />
        <AccommodationsPreview />
        <GallerySection />
      </div>
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
