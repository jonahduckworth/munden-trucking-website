import Hero from "@/components/sections/Hero"
import ServicesGrid from "@/components/sections/ServicesGrid"
import EquipmentShowcase from "@/components/sections/EquipmentShowcase"
import CTABanner from "@/components/sections/CTABanner"
import PartnersLogos from "@/components/sections/PartnersLogos"
import StructuredData, { localBusinessSchema } from "@/components/seo/StructuredData"

export default function Home() {
  return (
    <>
      <StructuredData data={localBusinessSchema} />
      <Hero />
      <ServicesGrid />
      <EquipmentShowcase />
      <CTABanner />
      <PartnersLogos />
    </>
  )
}