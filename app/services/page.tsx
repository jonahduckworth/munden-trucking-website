import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, CheckCircle, AlertCircle, Settings, Trees, ShoppingCart, ArrowRight, Phone, Users } from "lucide-react"
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData"
import { ServiceCard } from "@/components/services/ServiceCard"
import { CTASection } from "@/components/services/CTASection"
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel"

export const metadata: Metadata = {
  title: "Our Services | Truck Repair, CVIP Inspections & Equipment",
  description: "Professional truck repair, CVIP inspections, log hauling, and forestry equipment sales. Serving the BC Interior with 24/7 emergency service.",
  openGraph: {
    title: "Our Services | Munden Truck & Equipment Ltd.",
    description: "Professional truck repair, CVIP inspections, log hauling, and forestry equipment sales in the BC Interior.",
  },
}

const services = [
  {
    title: "Truck & Equipment Repair",
    description: "Full-service repair shop for all makes and models of trucks and heavy equipment with certified technicians.",
    icon: Truck,
    href: "/services/repair-shop",
    badge: "Most Popular",
    features: [
      "All makes and models",
      "Certified technicians",
      "Modern diagnostic tools",
      "Quality parts"
    ]
  },
  {
    title: "CVIP Inspections",
    description: "Certified Commercial Vehicle Inspection Program facility. Keep your fleet compliant and road-ready.",
    icon: CheckCircle,
    href: "/services/repair-shop/commercial-vehicle-inspections",
    features: [
      "Government certified",
      "Fast turnaround",
      "Detailed reports",
      "Fleet discounts"
    ]
  },
  {
    title: "Emergency Repairs",
    description: "24/7 emergency breakdown service. We'll get you back on the road quickly and safely.",
    icon: AlertCircle,
    href: "/services/repair-shop/emergency-repairs",
    features: [
      "24/7 availability",
      "Mobile service",
      "Quick response",
      "All weather service"
    ]
  },
  {
    title: "Preventive Maintenance",
    description: "Scheduled maintenance programs to minimize downtime and extend equipment life.",
    icon: Settings,
    href: "/services/repair-shop/preventive-maintenance",
    features: [
      "Custom schedules",
      "Fleet management",
      "Cost savings",
      "Extended warranties"
    ]
  },
  {
    title: "Fleet Services",
    description: "Comprehensive fleet management programs with priority service and volume discounts.",
    icon: Users,
    href: "/services/repair-shop/fleet-services",
    badge: "New",
    features: [
      "Priority scheduling",
      "Volume discounts",
      "Fleet analytics",
      "Dedicated support"
    ]
  },
  {
    title: "Log Hauling Services",
    description: "Professional log transportation throughout the BC Interior with modern equipment.",
    icon: Trees,
    href: "/services/log-hauling",
    features: [
      "Modern fleet",
      "Experienced drivers",
      "Safety focused",
      "Competitive rates"
    ]
  },
  {
    title: "Equipment Sales",
    description: "Authorized EcoLog dealer - new and used forestry equipment, harvesters, and forwarders.",
    icon: ShoppingCart,
    href: "/services/equipment-sales",
    features: [
      "EcoLog dealer",
      "New & used equipment",
      "Financing available",
      "Trade-ins welcome"
    ]
  }
]

export default function ServicesPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Services", url: "https://mundentruckequipment.com/services" }
  ]

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      
      <section className="py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-lg text-muted-foreground">
              From routine maintenance to emergency repairs, we provide comprehensive services 
              for the trucking and forestry industries throughout the BC Interior.
            </p>
          </div>

          {/* Service Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <p className="text-sm text-muted-foreground">Emergency Service</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-1">15+</div>
                <p className="text-sm text-muted-foreground">Certified Technicians</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <p className="text-sm text-muted-foreground">CVIP Certified</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-1">30+</div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                href={service.href}
                features={service.features}
                badge={service.badge}
              />
            ))}
          </div>

          {/* Testimonials */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
            <TestimonialsCarousel />
          </div>

          {/* CTA Section */}
          <CTASection
            title="Need Immediate Assistance?"
            description="Our team is ready to help with all your truck and equipment needs."
            variant="primary"
            actions={[
              {
                label: "Call Now: 1-800-XXX-XXXX",
                href: "tel:1-800-XXX-XXXX",
                variant: "secondary",
                icon: Phone
              },
              {
                label: "Request Quote",
                href: "/quote",
                variant: "outline"
              }
            ]}
          />
        </div>
      </section>
    </>
  )
}