import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, Trees, Shield, Clock, MapPin, Award } from "lucide-react"
import StructuredData, { serviceSchema, breadcrumbSchema } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "Log Hauling Services - Professional Log Transportation",
  description: "Professional log hauling services throughout the BC Interior. Modern fleet, experienced drivers, and competitive rates for all your forestry transportation needs.",
  openGraph: {
    title: "Log Hauling Services | Munden Truck & Equipment Ltd.",
    description: "Professional log transportation services throughout the BC Interior.",
  },
}

const features = [
  {
    icon: Truck,
    title: "Modern Fleet",
    description: "Well-maintained trucks equipped with the latest safety features"
  },
  {
    icon: Trees,
    title: "Forestry Expertise",
    description: "Decades of experience in BC's forestry industry"
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "Comprehensive safety program and certified drivers"
  },
  {
    icon: Clock,
    title: "Reliable Service",
    description: "On-time delivery and flexible scheduling"
  },
  {
    icon: MapPin,
    title: "BC Interior Coverage",
    description: "Serving Kamloops and surrounding regions"
  },
  {
    icon: Award,
    title: "Industry Certified",
    description: "All required permits and certifications"
  }
]

const services = [
  {
    title: "Short Log Hauling",
    description: "Efficient transportation of short logs from harvest sites to mills",
    features: [
      "Specialized short log trailers",
      "Quick loading and unloading",
      "Multiple loads per day capability",
      "Experienced operators"
    ]
  },
  {
    title: "Long Log Hauling",
    description: "Safe transport of long logs with specialized equipment",
    features: [
      "Extended reach trailers",
      "Secure load binding systems",
      "Route planning expertise",
      "Oversize load permits"
    ]
  },
  {
    title: "Emergency Hauling",
    description: "Rapid response for urgent transportation needs",
    features: [
      "24/7 availability",
      "Quick mobilization",
      "Flexible scheduling",
      "Priority service"
    ]
  }
]

export default function LogHaulingPage() {
  const serviceData = serviceSchema({
    name: "Log Hauling Services",
    description: "Professional log transportation services throughout the BC Interior",
    serviceType: "Transportation Service",
    areaServed: "300km"
  })

  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Services", url: "https://mundentruckequipment.com/services" },
    { name: "Log Hauling", url: "https://mundentruckequipment.com/services/log-hauling" }
  ]

  return (
    <>
      <StructuredData data={serviceData} />
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      
      <section className="py-12">
        <div className="container">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge className="mb-4" variant="secondary">Professional Log Transportation</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Log Hauling Services
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Reliable log transportation throughout the BC Interior. Our modern fleet and experienced 
              drivers ensure your logs are delivered safely and on schedule.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/quote">Request Hauling Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:1-800-XXX-XXXX">
                  <Truck className="mr-2 h-4 w-4" />
                  Dispatch: 1-800-XXX-XXXX
                </a>
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Services Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Our Hauling Services</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.title} className="h-full">
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <Trees className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Why Choose Munden for Log Hauling?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-3">Experience & Reliability</h3>
                  <p className="text-muted-foreground mb-4">
                    With over 30 years in the forestry industry, we understand the unique challenges 
                    of log transportation in BC&apos;s diverse terrain. Our drivers are experienced professionals 
                    who prioritize safety and efficiency.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <Badge variant="secondary" className="mr-2">30+</Badge>
                      Years of experience
                    </li>
                    <li className="flex items-center text-sm">
                      <Badge variant="secondary" className="mr-2">100%</Badge>
                      Safety compliance
                    </li>
                    <li className="flex items-center text-sm">
                      <Badge variant="secondary" className="mr-2">24/7</Badge>
                      Dispatch availability
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Modern Equipment</h3>
                  <p className="text-muted-foreground mb-4">
                    Our fleet features the latest trucks and trailers designed specifically for log hauling. 
                    Regular maintenance and inspections ensure maximum uptime and reliability.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <Badge variant="secondary" className="mr-2">GPS</Badge>
                      Real-time tracking
                    </li>
                    <li className="flex items-center text-sm">
                      <Badge variant="secondary" className="mr-2">CVIP</Badge>
                      Certified vehicles
                    </li>
                    <li className="flex items-center text-sm">
                      <Badge variant="secondary" className="mr-2">ECO</Badge>
                      Fuel-efficient fleet
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Area */}
          <Card className="mb-12 bg-gray-50">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Service Area</CardTitle>
              <CardDescription className="text-center">
                Proudly serving the BC Interior forestry industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="mb-4">
                  Based in Kamloops, we provide log hauling services throughout the BC Interior including:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Kamloops", "Merritt", "Clearwater", "Barriere", "Chase", "Logan Lake", "Ashcroft", "Cache Creek"].map((city) => (
                    <Badge key={city} variant="outline">{city}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Move Your Logs?</h3>
              <p className="mb-6 opacity-90">
                Contact us today for competitive rates and reliable service. 
                We&apos;re ready to handle your log transportation needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/quote">Get Quote</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <a href="tel:1-800-XXX-XXXX">Call Dispatch</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}