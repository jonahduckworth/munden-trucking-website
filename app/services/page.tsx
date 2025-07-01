import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, CheckCircle, AlertCircle, Settings, Trees, ShoppingCart, ArrowRight } from "lucide-react"
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData"

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
      
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-lg text-muted-foreground">
              From routine maintenance to emergency repairs, we provide comprehensive services 
              for the trucking and forestry industries throughout the BC Interior.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.title} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full group">
                      <Link href={service.href}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h2>
            <p className="mb-6 text-lg opacity-90">
              Our team is ready to help with all your truck and equipment needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="tel:1-800-XXX-XXXX">Call Now: 1-800-XXX-XXXX</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/quote">Request Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}