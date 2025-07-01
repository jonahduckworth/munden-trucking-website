import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Truck, Trees, Shield, Clock, MapPin, Award, ChevronLeft, Phone, CheckCircle2, Navigation, Weight, Gauge } from "lucide-react"
import StructuredData, { serviceSchema, breadcrumbSchema, faqSchema } from "@/components/seo/StructuredData"
import { ProcessTimeline } from "@/components/services/ProcessTimeline"
import { CTASection } from "@/components/services/CTASection"

export const metadata: Metadata = {
  title: "Log Hauling Services | Professional Log Transportation | Munden Truck",
  description: "Professional log hauling services throughout the BC Interior. Modern fleet, experienced drivers, GPS tracking, and competitive rates for forestry transportation.",
  openGraph: {
    title: "Log Hauling Services | Munden Truck & Equipment Ltd.",
    description: "Professional log transportation services throughout the BC Interior. 30+ years experience, modern fleet.",
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
    icon: Truck,
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
    icon: Trees,
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
    icon: Clock,
    features: [
      "24/7 availability",
      "Quick mobilization",
      "Flexible scheduling",
      "Priority service"
    ]
  }
]

const fleetSpecs = [
  {
    title: "Truck Fleet",
    specs: [
      { label: "Fleet Size", value: "15+ trucks" },
      { label: "Truck Types", value: "Kenworth, Peterbilt, Western Star" },
      { label: "Engine Power", value: "500-600 HP" },
      { label: "Transmissions", value: "18-speed manual & automatic" }
    ]
  },
  {
    title: "Trailer Capabilities",
    specs: [
      { label: "Short Log Trailers", value: "8 units" },
      { label: "Long Log Trailers", value: "6 units" },
      { label: "Max Load Weight", value: "Up to 63,500 kg" },
      { label: "Log Length Range", value: "3m - 20m" }
    ]
  },
  {
    title: "Safety Features",
    specs: [
      { label: "GPS Tracking", value: "All vehicles" },
      { label: "Load Monitoring", value: "Real-time systems" },
      { label: "Safety Equipment", value: "Full compliance" },
      { label: "Driver Training", value: "Ongoing programs" }
    ]
  }
]

export default function LogHaulingPage() {
  const serviceData = serviceSchema({
    name: "Log Hauling Services",
    description: "Professional log transportation services throughout the BC Interior with modern fleet and experienced drivers.",
    serviceType: "Log Transportation",
    areaServed: "300km"
  })

  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Services", url: "https://mundentruckequipment.com/services" },
    { name: "Log Hauling", url: "https://mundentruckequipment.com/services/log-hauling" }
  ]

  const faqs = [
    {
      question: "What areas do you service for log hauling?",
      answer: "We provide log hauling services throughout the BC Interior, covering a 300km radius from Kamloops including Merritt, Clearwater, Barriere, Chase, Logan Lake, Ashcroft, and Cache Creek."
    },
    {
      question: "What types of logs can you transport?",
      answer: "Our fleet can handle both short logs and long logs up to 20 meters. We have specialized trailers for different log types and lengths, ensuring safe and efficient transport."
    },
    {
      question: "Do you provide emergency hauling services?",
      answer: "Yes, we offer 24/7 emergency hauling services with quick mobilization for urgent transportation needs. Our dispatch team is always ready to respond."
    },
    {
      question: "How do you ensure load safety?",
      answer: "All our trucks are equipped with GPS tracking, load monitoring systems, and proper binding equipment. Our drivers are trained in safe loading practices and we maintain full compliance with all transportation regulations."
    }
  ]

  return (
    <>
      <StructuredData data={[serviceData, breadcrumbSchema(breadcrumbs), faqSchema(faqs)]} />
      
      <section className="py-12">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/services">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
            </Button>

            {/* Hero Section */}
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">Professional Log Transportation</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Log Hauling Services
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Reliable log transportation throughout the BC Interior. Our modern fleet and experienced 
                drivers ensure your logs are delivered safely and on schedule.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/quote">
                    <Truck className="mr-2 h-4 w-4" />
                    Request Hauling Quote
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:1-800-XXX-XXXX">
                    <Phone className="mr-2 h-4 w-4" />
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
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <Card key={service.title} className="h-full">
                    <CardHeader>
                      <Icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Fleet Specifications */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Our Fleet Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fleetSpecs.map((category) => (
                <Card key={category.title}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.specs.map((spec) => (
                        <div key={spec.label} className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">{spec.label}</span>
                          <span className="text-sm font-semibold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
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

          {/* Process Timeline */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">How Our Service Works</h2>
            <ProcessTimeline
              steps={[
                {
                  number: "1",
                  title: "Request Quote",
                  description: "Contact us with your hauling needs and volume"
                },
                {
                  number: "2",
                  title: "Route Planning",
                  description: "We plan the optimal route and schedule"
                },
                {
                  number: "3",
                  title: "Dispatch",
                  description: "Trucks dispatched with GPS tracking"
                },
                {
                  number: "4",
                  title: "Safe Transport",
                  description: "Logs delivered safely to destination"
                },
                {
                  number: "5",
                  title: "Documentation",
                  description: "Complete paperwork and invoicing"
                }
              ]}
            />
          </div>

          {/* Service Area */}
          <Card className="mb-12">
            <CardHeader>
              <Navigation className="h-8 w-8 text-primary mb-2 mx-auto" />
              <CardTitle className="text-2xl text-center">Service Coverage Area</CardTitle>
              <CardDescription className="text-center">
                Proudly serving the BC Interior forestry industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-lg font-semibold mb-2">300km Service Radius</p>
                <p className="mb-6 text-muted-foreground">
                  Based in Kamloops, we provide reliable log hauling services throughout the BC Interior
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  {[
                    { city: "Kamloops", distance: "Base" },
                    { city: "Merritt", distance: "90 km" },
                    { city: "Clearwater", distance: "125 km" },
                    { city: "Barriere", distance: "65 km" },
                    { city: "Chase", distance: "55 km" },
                    { city: "Logan Lake", distance: "65 km" },
                    { city: "Ashcroft", distance: "95 km" },
                    { city: "Cache Creek", distance: "85 km" }
                  ].map((location) => (
                    <div key={location.city} className="text-center">
                      <p className="font-semibold">{location.city}</p>
                      <p className="text-sm text-muted-foreground">{location.distance}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {faqs.map((faq) => (
                <Card key={faq.question}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <CTASection
            title="Ready to Move Your Logs?"
            description="Contact us today for competitive rates and reliable service. We're ready to handle your log transportation needs."
            variant="primary"
            actions={[
              {
                label: "Get Quote",
                href: "/quote",
                variant: "secondary",
                icon: Truck
              },
              {
                label: "Call Dispatch",
                href: "tel:1-800-XXX-XXXX",
                variant: "outline",
                icon: Phone
              }
            ]}
          />

          {/* Related Services */}
          <div className="mt-12 pt-12 border-t">
            <h3 className="text-xl font-semibold mb-6">Related Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Equipment Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Looking for your own logging equipment? Check out our EcoLog inventory
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/services/equipment-sales">Browse Equipment</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Truck Repairs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Keep your logging trucks in top condition with our repair services
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/services/repair-shop">Repair Services</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Fleet Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive maintenance programs for logging fleets
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/services/repair-shop/fleet-services">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  )
}