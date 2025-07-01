import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Award, Wrench, DollarSign, Truck, FileText } from "lucide-react"
import StructuredData, { serviceSchema, breadcrumbSchema } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "Equipment Sales - EcoLog Dealer | New & Used Forestry Equipment",
  description: "Authorized EcoLog dealer in Western Canada. New and used forestry equipment including harvesters and forwarders. Financing available.",
  openGraph: {
    title: "Equipment Sales - EcoLog Dealer | Munden Truck & Equipment Ltd.",
    description: "Authorized EcoLog dealer offering new and used forestry equipment in BC.",
  },
}

const benefits = [
  {
    icon: Award,
    title: "Authorized Dealer",
    description: "Official EcoLog dealer for Western Canada"
  },
  {
    icon: Wrench,
    title: "Full Service Support",
    description: "Parts, service, and warranty support on-site"
  },
  {
    icon: DollarSign,
    title: "Financing Available",
    description: "Flexible financing options to fit your budget"
  },
  {
    icon: Truck,
    title: "Trade-Ins Welcome",
    description: "Competitive trade-in values for your equipment"
  }
]

const equipmentCategories = [
  {
    title: "EcoLog Harvesters",
    description: "High-performance harvesters designed for demanding forestry operations",
    models: [
      "EcoLog 590G - 6-wheel harvester with powerful crane",
      "EcoLog 580F - Versatile harvester for various conditions",
      "EcoLog 570E - Compact harvester for thinning operations"
    ],
    link: "/equipment/new/harvesters"
  },
  {
    title: "EcoLog Forwarders",
    description: "Robust forwarders with exceptional load capacity and maneuverability",
    models: [
      "EcoLog 594F - 20-ton capacity forwarder",
      "EcoLog 584F - High-performance 18-ton forwarder",
      "EcoLog 574F - Agile 15-ton forwarder"
    ],
    link: "/equipment/new/forwarders"
  },
  {
    title: "Used Equipment",
    description: "Quality pre-owned forestry equipment with warranty options",
    models: [
      "Various makes and models available",
      "Thoroughly inspected and serviced",
      "Warranty options available"
    ],
    link: "/equipment/used"
  }
]

const services = [
  {
    icon: FileText,
    title: "Equipment Consultation",
    description: "Expert advice on selecting the right equipment for your operations"
  },
  {
    icon: DollarSign,
    title: "Financing Solutions",
    description: "Work with multiple lenders to find the best financing terms"
  },
  {
    icon: Wrench,
    title: "After-Sales Support",
    description: "Comprehensive parts and service support for all equipment"
  },
  {
    icon: Truck,
    title: "Delivery Service",
    description: "Equipment delivery to your job site anywhere in BC"
  }
]

export default function EquipmentSalesPage() {
  const serviceData = serviceSchema({
    name: "Equipment Sales",
    description: "Authorized EcoLog dealer for new and used forestry equipment",
    serviceType: "Equipment Sales",
    areaServed: "1000km"
  })

  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Services", url: "https://mundentruckequipment.com/services" },
    { name: "Equipment Sales", url: "https://mundentruckequipment.com/services/equipment-sales" }
  ]

  return (
    <>
      <StructuredData data={serviceData} />
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      
      <section className="py-12">
        <div className="container">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge className="mb-4" variant="secondary">Authorized EcoLog Dealer</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Forestry Equipment Sales
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Your Western Canadian dealer for EcoLog forestry equipment. We offer new and used 
              harvesters, forwarders, and more, backed by expert service and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/equipment">Browse Equipment</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:1-800-XXX-XXXX">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Talk to Sales
                </a>
              </Button>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <Card key={benefit.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Equipment Categories */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Equipment Categories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {equipmentCategories.map((category) => (
                <Card key={category.title} className="h-full">
                  <CardHeader>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {category.models.map((model) => (
                        <li key={model} className="text-sm text-muted-foreground">
                          • {model}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full">
                      <Link href={category.link}>View {category.title}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* EcoLog Partnership */}
          <Card className="mb-12 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="p-8">
                <Badge className="mb-4">Official Partnership</Badge>
                <h2 className="text-2xl font-bold mb-4">Why EcoLog?</h2>
                <p className="text-muted-foreground mb-4">
                  EcoLog is a world-leading manufacturer of forestry equipment, known for innovative 
                  design, superior quality, and exceptional performance in demanding conditions.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <Award className="h-5 w-5 text-primary mr-2" />
                    Swedish engineering excellence
                  </li>
                  <li className="flex items-center">
                    <Award className="h-5 w-5 text-primary mr-2" />
                    Environmentally conscious design
                  </li>
                  <li className="flex items-center">
                    <Award className="h-5 w-5 text-primary mr-2" />
                    Industry-leading fuel efficiency
                  </li>
                  <li className="flex items-center">
                    <Award className="h-5 w-5 text-primary mr-2" />
                    Operator comfort and safety
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/equipment/new">Explore EcoLog Equipment</Link>
                </Button>
              </div>
              <div className="bg-gray-100 flex items-center justify-center p-8">
                <div className="text-center">
                  <p className="text-gray-500">EcoLog Equipment Showcase</p>
                  {/* Placeholder for EcoLog image */}
                </div>
              </div>
            </div>
          </Card>

          {/* Services Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Our Equipment Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <Card key={service.title}>
                    <CardHeader>
                      <Icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Upgrade Your Equipment?</h3>
              <p className="mb-6 opacity-90">
                Contact our sales team to discuss your equipment needs. We&apos;ll help you find 
                the perfect solution for your forestry operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/equipment">View Inventory</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <a href="tel:1-800-XXX-XXXX">Call Sales Team</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}