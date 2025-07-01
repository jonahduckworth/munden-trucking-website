import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, Shield, Wrench, Award, Users, ChevronLeft, Phone, AlertTriangle } from "lucide-react"
import StructuredData, { serviceSchema, breadcrumbSchema } from "@/components/seo/StructuredData"
import { ServiceCard } from "@/components/services/ServiceCard"
import { CTASection } from "@/components/services/CTASection"

export const metadata: Metadata = {
  title: "Truck & Equipment Repair Shop | Full-Service Facility | Munden Truck",
  description: "Professional truck and heavy equipment repair services in Kamloops. Certified technicians, modern facilities, and 24/7 emergency service. All makes & models.",
  openGraph: {
    title: "Truck & Equipment Repair Shop | Munden Truck & Equipment Ltd.",
    description: "Professional truck and heavy equipment repair services in Kamloops, BC. CVIP certified, 24/7 emergency service.",
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
          <div className="max-w-6xl mx-auto">
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/services">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
            </Button>

            {/* Hero Section */}
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">Full-Service Repair Shop</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Truck & Equipment Repair Services
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Professional repair services for all makes and models of trucks and heavy equipment. 
                Our certified technicians use the latest diagnostic tools to keep your fleet running efficiently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/quote">
                    <Clock className="mr-2 h-4 w-4" />
                    Get Quote
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:1-800-XXX-XXXX">
                    <Phone className="mr-2 h-4 w-4" />
                    Call: 1-800-XXX-XXXX
                  </a>
                </Button>
              </div>
            </div>

            {/* Emergency Service Alert */}
            <Card className="mb-12 border-orange-500/50 bg-orange-50/50 dark:bg-orange-950/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <AlertTriangle className="h-8 w-8 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">24/7 Emergency Service Available</h3>
                    <p className="text-muted-foreground">Breakdown on the road? Our emergency response team is ready to help anytime, anywhere.</p>
                  </div>
                  <Button variant="outline" asChild className="hidden sm:flex">
                    <Link href="/services/repair-shop/emergency-repairs">
                      Emergency Service
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

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

          {/* Service Cards */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Our Specialized Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ServiceCard
                title="CVIP Inspections"
                description="Government certified facility for commercial vehicle inspections"
                icon={CheckCircle}
                href="/services/repair-shop/commercial-vehicle-inspections"
                features={[
                  "Same-day service available",
                  "Certified inspectors",
                  "Detailed reports"
                ]}
                badge="Certified"
              />
              <ServiceCard
                title="Preventive Maintenance"
                description="Scheduled maintenance programs to maximize uptime"
                icon={Shield}
                href="/services/repair-shop/preventive-maintenance"
                features={[
                  "Custom schedules",
                  "Cost savings",
                  "Extended warranties"
                ]}
              />
              <ServiceCard
                title="Emergency Repairs"
                description="24/7 breakdown service when you need it most"
                icon={AlertTriangle}
                href="/services/repair-shop/emergency-repairs"
                features={[
                  "24/7 availability",
                  "Mobile units",
                  "Fast response"
                ]}
                badge="24/7"
              />
              <ServiceCard
                title="Fleet Services"
                description="Comprehensive programs for fleet operators"
                icon={Users}
                href="/services/repair-shop/fleet-services"
                features={[
                  "Priority service",
                  "Volume discounts",
                  "Fleet analytics"
                ]}
                badge="New"
              />
            </div>
          </div>

          {/* CTA Section */}
          <CTASection
            title="Ready to Schedule Your Service?"
            description="Our expert technicians are standing by to help keep your equipment running at peak performance."
            variant="primary"
            actions={[
              {
                label: "Get Service Quote",
                href: "/quote",
                variant: "secondary"
              },
              {
                label: "Call: 1-800-XXX-XXXX",
                href: "tel:1-800-XXX-XXXX",
                variant: "outline",
                icon: Phone
              }
            ]}
          />
          </div>
        </div>
      </section>
    </>
  )
}