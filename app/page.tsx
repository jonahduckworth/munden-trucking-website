import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel";
import CTABanner from "@/components/sections/CTABanner";
import LocationSection from "@/components/sections/LocationSection";
import PartnersLogos from "@/components/sections/PartnersLogos";
import StructuredData, {
  localBusinessSchema,
} from "@/components/seo/StructuredData";

export default function Home() {
  return (
    <>
      <StructuredData data={localBusinessSchema} />
      <Hero />
      <LocationSection />
      <ServicesGrid />
      <TestimonialsCarousel />
      <CTABanner />
      <PartnersLogos />
    </>
  );
}
