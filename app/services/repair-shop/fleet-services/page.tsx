import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ChevronLeft, 
  Truck, 
  Calendar, 
  BarChart3, 
  Shield, 
  Users, 
  Clock,
  CheckCircle2,
  Phone,
  FileText,
  Wrench,
  DollarSign
} from "lucide-react"
import StructuredData, { serviceSchema, breadcrumbSchema } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "Fleet Services | Commercial Fleet Management | Munden Truck & Equipment",
  description: "Professional fleet management services in Kamloops, BC. Custom maintenance programs, priority service, volume discounts, and dedicated support for your commercial fleet.",
  openGraph: {
    title: "Fleet Services | Munden Truck & Equipment Ltd.",
    description: "Keep your entire fleet running efficiently with our comprehensive fleet management programs.",
  },
}

const fleetPrograms = [
  {
    name: "Essential Fleet Care",
    minVehicles: "5-10 vehicles",
    features: [
      "Priority scheduling",
      "5% parts discount",
      "Quarterly fleet health reports",
      "Dedicated service advisor",
      "Extended warranty options"
    ],
    ideal: "Small to medium fleets"
  },
  {
    name: "Professional Fleet Management",
    minVehicles: "11-25 vehicles",
    features: [
      "Expedited service lanes",
      "10% parts discount",
      "Monthly fleet analytics",
      "24/7 emergency support",
      "Custom maintenance schedules",
      "Fleet fuel card program"
    ],
    ideal: "Growing commercial operations"
  },
  {
    name: "Enterprise Fleet Solutions",
    minVehicles: "26+ vehicles",
    features: [
      "Dedicated service bays",
      "15% parts discount",
      "Real-time fleet tracking",
      "On-site service options",
      "Custom billing solutions",
      "Fleet replacement planning",
      "Driver training programs"
    ],
    ideal: "Large fleet operations"
  }
]

const benefits = [
  {
    icon: Clock,
    title: "Minimize Downtime",
    description: "Priority service and dedicated bays keep your trucks on the road earning revenue"
  },
  {
    icon: DollarSign,
    title: "Reduce Costs",
    description: "Volume discounts, preventive maintenance, and optimized service schedules save money"
  },
  {
    icon: BarChart3,
    title: "Fleet Analytics",
    description: "Comprehensive reporting helps you make data-driven decisions about your fleet"
  },
  {
    icon: Shield,
    title: "Compliance Assurance",
    description: "Stay ahead of CVIP inspections and regulatory requirements with proactive management"
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Your personal fleet advisor knows your vehicles and your business needs"
  },
  {
    icon: Wrench,
    title: "Expert Technicians",
    description: "Certified mechanics who understand the demands of commercial fleet operations"
  }
]

const services = [
  "Scheduled preventive maintenance",
  "CVIP inspection management",
  "Emergency breakdown support",
  "Tire management programs",
  "Fluid analysis programs",
  "Warranty administration",
  "Parts inventory management",
  "Mobile service units",
  "Driver vehicle inspection training",
  "Fleet safety programs"
]

export default function FleetServicesPage() {
  const serviceData = serviceSchema({
    name: "Fleet Management Services",
    description: "Comprehensive fleet management and maintenance services for commercial vehicles in Kamloops and the BC Interior.",
    provider: {
      name: "Munden Truck & Equipment Ltd.",
      telephone: "+1-800-XXX-XXXX",
      address: {
        streetAddress: "123 Main Street",
        addressLocality: "Kamloops",
        addressRegion: "BC",
        postalCode: "V2C 1A1",
        addressCountry: "CA"
      }
    },
    areaServed: "Kamloops and BC Interior",
    serviceType: ["Fleet Management", "Preventive Maintenance", "Commercial Vehicle Services"]
  })

  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Services", url: "https://mundentruckequipment.com/services" },
    { name: "Repair Shop", url: "https://mundentruckequipment.com/services/repair-shop" },
    { name: "Fleet Services", url: "https://mundentruckequipment.com/services/repair-shop/fleet-services" }
  ]

  return (
    <>
      <StructuredData data={[serviceData, breadcrumbSchema(breadcrumbs)]} />
      
      <section className="py-12">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/services/repair-shop">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Repair Shop
              </Link>
            </Button>

            {/* Hero Section */}
            <div className="text-center mb-12">
              <Badge className="mb-4">Fleet Management Solutions</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Professional Fleet Services
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Keep your entire fleet running at peak performance with customized maintenance programs, 
                priority service, and dedicated support designed for commercial operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    <Phone className="mr-2 h-4 w-4" />
                    Discuss Your Fleet Needs
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/quote">
                    <FileText className="mr-2 h-4 w-4" />
                    Get Fleet Quote
                  </Link>
                </Button>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {benefits.map((benefit) => {
                const Icon = benefit.icon
                return (
                  <Card key={benefit.title}>
                    <CardHeader>
                      <Icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Fleet Programs */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl">Fleet Management Programs</CardTitle>
                <CardDescription>
                  Choose the program that best fits your fleet size and operational needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="essential" className="w-full">
                  <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
                    <TabsTrigger value="essential">Essential</TabsTrigger>
                    <TabsTrigger value="professional">Professional</TabsTrigger>
                    <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
                  </TabsList>
                  {fleetPrograms.map((program) => (
                    <TabsContent key={program.name} value={program.name.split(' ')[0].toLowerCase()}>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold">{program.name}</h3>
                          <Badge variant="secondary">{program.minVehicles}</Badge>
                        </div>
                        <p className="text-muted-foreground">Ideal for: {program.ideal}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          {program.features.map((feature) => (
                            <div key={feature} className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Comprehensive Services */}
            <Card className="mb-12">
              <CardHeader>
                <Truck className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-2xl">Comprehensive Fleet Services</CardTitle>
                <CardDescription>
                  Everything you need to keep your fleet operating efficiently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {services.map((service) => (
                    <div key={service} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">How Our Fleet Program Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    step: "1",
                    title: "Fleet Assessment",
                    description: "We analyze your fleet's needs and operational requirements"
                  },
                  {
                    step: "2",
                    title: "Custom Program",
                    description: "Design a maintenance program tailored to your vehicles and schedule"
                  },
                  {
                    step: "3",
                    title: "Implementation",
                    description: "Set up priority scheduling, billing, and reporting systems"
                  },
                  {
                    step: "4",
                    title: "Ongoing Support",
                    description: "Regular reviews and adjustments to optimize fleet performance"
                  }
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fleet Analytics */}
            <Card className="mb-12 border-primary">
              <CardHeader className="text-center">
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">Fleet Intelligence & Analytics</CardTitle>
                <CardDescription className="text-lg">
                  Make data-driven decisions with comprehensive fleet reporting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">Maintenance Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete service history and upcoming maintenance schedules for every vehicle
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">Cost Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Detailed breakdown of maintenance costs, repairs, and total cost of ownership
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">Performance Metrics</h3>
                    <p className="text-sm text-muted-foreground">
                      Vehicle uptime, fuel efficiency, and reliability metrics to optimize your fleet
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Munden */}
            <div className="bg-muted/30 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-center mb-6">
                Why Choose Munden for Fleet Services?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">30+ Years Experience</h3>
                    <p className="text-sm text-muted-foreground">
                      Proven track record managing fleets for BC's leading transportation companies
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Flexible Scheduling</h3>
                    <p className="text-sm text-muted-foreground">
                      After-hours and weekend service options to minimize operational disruption
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Dedicated Team</h3>
                    <p className="text-sm text-muted-foreground">
                      Assigned fleet advisors who understand your specific vehicles and needs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Mobile Service Units</h3>
                    <p className="text-sm text-muted-foreground">
                      On-site service capabilities for minor repairs and maintenance
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Optimize Your Fleet Operations?
                </h3>
                <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                  Join the growing number of BC Interior companies that trust Munden for their 
                  fleet management needs. Let's discuss how we can keep your trucks running and your business moving.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/contact">
                      Schedule Fleet Consultation
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Link href="tel:1-800-XXX-XXXX">
                      <Phone className="mr-2 h-4 w-4" />
                      Call 1-800-XXX-XXXX
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Services */}
            <div className="mt-12 pt-12 border-t">
              <h3 className="text-xl font-semibold mb-6">Related Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Preventive Maintenance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Keep your fleet in top condition with scheduled maintenance programs
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/services/repair-shop/preventive-maintenance">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">CVIP Inspections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Stay compliant with regular commercial vehicle inspections
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/services/repair-shop/commercial-vehicle-inspections">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Emergency Repairs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      24/7 emergency support to keep your fleet moving
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/services/repair-shop/emergency-repairs">Learn More</Link>
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