import Hero from '@/components/sections/Hero';
import ServicesGrid from '@/components/sections/ServicesGrid';
import EquipmentShowcase from '@/components/sections/EquipmentShowcase';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import CTABanner from '@/components/sections/CTABanner';
import PartnersLogos from '@/components/sections/PartnersLogos';
import StructuredData, {
  localBusinessSchema,
} from '@/components/seo/StructuredData';
// import TemporaryHomePage from '@/components/TemporaryHomePage';

export default function Home() {
  return (
    <>
      <StructuredData data={localBusinessSchema} />
      <Hero />
      <ServicesGrid />
      <EquipmentShowcase />
      <TestimonialsCarousel />
      <CTABanner />
      <PartnersLogos />
    </>
  );
}

// export default function Home() {
//   return <TemporaryHomePage />;
// }
