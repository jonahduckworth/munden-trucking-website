import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Shield, Wrench, Award, Users } from "lucide-react"
import StructuredData, { serviceSchema, breadcrumbSchema } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "Truck & Equipment Repair Shop",
  description: "Professional truck and heavy equipment repair services in Kamloops. Certified technicians, modern facilities, and 24/7 emergency service.",
  openGraph: {
    title: "Truck & Equipment Repair Shop | Munden Truck & Equipment Ltd.",
    description: "Professional truck and heavy equipment repair services in Kamloops, BC.",
  },
}

const repairServices = [
  {
    category: "Engine Services",
    services: [
      "Complete engine rebuilds",
      "Diesel engine diagnostics",
      "Turbocharger repair",
      "Fuel system service",
      "Cooling system repair"
    ]
  },
  {
    category: "Transmission & Drivetrain",
    services: [
      "Manual & automatic transmission repair",
      "Clutch replacement",
      "Differential service",
      "Driveshaft repair",
      "Transfer case service"
    ]
  },
  {
    category: "Brake Systems",
    services: [
      "Air brake service",
      "Brake chamber replacement",
      "Disc & drum brake repair",
      "ABS diagnostics",
      "Brake fluid flush"
    ]
  },
  {
    category: "Electrical Systems",
    services: [
      "Computer diagnostics",
      "Wiring repairs",
      "Battery service",
      "Alternator & starter repair",
      "Lighting systems"
    ]
  },
  {
    category: "Suspension & Steering",
    services: [
      "Front end alignment",
      "Suspension repair",
      "Steering components",
      "Shock & strut replacement",
      "Leaf spring service"
    ]
  },
  {
    category: "Hydraulic Systems",
    services: [
      "Hydraulic pump repair",
      "Cylinder rebuilding",
      "Hose replacement",
      "System diagnostics",
      "Preventive maintenance"
    ]
  }
]

const features = [
  {
    icon: Shield,
    title: "Certified Technicians",
    description: "Our team holds multiple certifications and stays current with the latest repair techniques."
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "We understand downtime costs money. Our efficient service gets you back on the road quickly."
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "All repairs come with our comprehensive warranty for your peace of mind."
  },
  {
    icon: Users,
    title: "Fleet Services",
    description: "Specialized programs for fleet operators with priority scheduling and volume discounts."
  }
]

export default function RepairShopPage() {
  const serviceData = serviceSchema({
    name: "Truck & Equipment Repair",
    description: "Full-service repair shop for all makes and models of trucks and heavy equipment",
    serviceType: "Automotive Repair",
    areaServed: "200km"
  })

  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Services", url: "https://mundentruckequipment.com/services" },
    { name: "Repair Shop", url: "https://mundentruckequipment.com/services/repair-shop" }
  ]

  return (
    <>
      <StructuredData data={serviceData} />
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      
      <section className="py-12">
        <div className="container">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge className="mb-4" variant="secondary">Full-Service Repair Shop</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Truck & Equipment Repair Services
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Professional repair services for all makes and models of trucks and heavy equipment. 
              Our certified technicians use the latest diagnostic tools to keep your fleet running efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/quote">Get Repair Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:1-800-XXX-XXXX">
                  <Clock className="mr-2 h-4 w-4" />
                  Book Appointment
                </a>
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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

          {/* Services Tabs */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Repair Services</h2>
            <Tabs defaultValue="engine" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full">
                {repairServices.map((category) => (
                  <TabsTrigger 
                    key={category.category} 
                    value={category.category.toLowerCase().replace(/\s+/g, '-')}
                  >
                    {category.category.split(' ')[0]}
                  </TabsTrigger>
                ))}
              </TabsList>
              {repairServices.map((category) => (
                <TabsContent 
                  key={category.category} 
                  value={category.category.toLowerCase().replace(/\s+/g, '-')}
                  className="mt-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{category.category}</CardTitle>
                      <CardDescription>
                        Professional {category.category.toLowerCase()} services for all truck makes and models
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {category.services.map((service) => (
                          <li key={service} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Service Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/services/repair-shop/commercial-vehicle-inspections" className="text-center">
                <div>
                  <Wrench className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">CVIP Inspections</div>
                  <div className="text-xs text-muted-foreground">Government certified facility</div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/services/repair-shop/preventive-maintenance" className="text-center">
                <div>
                  <Shield className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Preventive Maintenance</div>
                  <div className="text-xs text-muted-foreground">Keep your fleet running</div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/services/repair-shop/emergency-repairs" className="text-center">
                <div>
                  <Clock className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Emergency Service</div>
                  <div className="text-xs text-muted-foreground">24/7 breakdown assistance</div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/services/repair-shop/fleet-services" className="text-center">
                <div>
                  <Users className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Fleet Programs</div>
                  <div className="text-xs text-muted-foreground">Volume discounts available</div>
                </div>
              </Link>
            </Button>
          </div>

          {/* CTA Section */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Schedule Your Service?</h3>
              <p className="mb-6 opacity-90">
                Our expert technicians are standing by to help keep your equipment running at peak performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <a href="tel:1-800-XXX-XXXX">Call: 1-800-XXX-XXXX</a>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link href="/contact">Contact Form</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}