import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ChevronLeft, 
  Shield, 
  DollarSign, 
  Clock, 
  TrendingUp,
  Wrench,
  Calendar,
  CheckCircle2,
  Phone,
  FileText,
  AlertTriangle,
  BarChart3
} from "lucide-react"
import StructuredData, { serviceSchema, breadcrumbSchema, faqSchema } from "@/components/seo/StructuredData"
import { ProcessTimeline } from "@/components/services/ProcessTimeline"
import { CTASection } from "@/components/services/CTASection"

export const metadata: Metadata = {
  title: "Preventive Maintenance | Fleet Maintenance Programs | Munden Truck",
  description: "Comprehensive preventive maintenance programs for commercial trucks in Kamloops. Reduce downtime, extend equipment life, and save on repairs with scheduled maintenance.",
  openGraph: {
    title: "Preventive Maintenance Services | Munden Truck & Equipment Ltd.",
    description: "Keep your fleet running efficiently with our preventive maintenance programs. Certified technicians, flexible scheduling.",
  },
}

const maintenancePackages = [
  {
    name: "Basic Maintenance",
    interval: "Every 5,000 km",
    ideal: "Light-duty trucks",
    services: [
      "Engine oil and filter change",
      "Tire rotation and pressure check",
      "Brake inspection",
      "Fluid levels check",
      "Battery test",
      "Visual safety inspection"
    ],
    savings: "Save up to 15% on repairs"
  },
  {
    name: "Standard Maintenance",
    interval: "Every 10,000 km",
    ideal: "Medium-duty commercial vehicles",
    services: [
      "All Basic services plus:",
      "Transmission service",
      "Coolant system flush",
      "Air filter replacement",
      "Suspension inspection",
      "Exhaust system check",
      "Detailed diagnostic scan"
    ],
    savings: "Save up to 25% on repairs"
  },
  {
    name: "Comprehensive Maintenance",
    interval: "Customized schedule",
    ideal: "Heavy-duty trucks & fleets",
    services: [
      "All Standard services plus:",
      "Differential service",
      "Power steering flush",
      "Fuel system cleaning",
      "Complete electrical check",
      "Hydraulic system service",
      "Predictive maintenance analysis"
    ],
    savings: "Save up to 35% on repairs"
  }
]

const benefits = [
  {
    icon: Shield,
    title: "Prevent Breakdowns",
    description: "Catch problems early before they lead to costly roadside failures",
    stat: "70% fewer breakdowns"
  },
  {
    icon: DollarSign,
    title: "Lower Costs",
    description: "Regular maintenance costs less than major repairs and downtime",
    stat: "30% cost reduction"
  },
  {
    icon: Clock,
    title: "Maximize Uptime",
    description: "Keep your vehicles on the road earning revenue, not in the shop",
    stat: "95% uptime rate"
  },
  {
    icon: TrendingUp,
    title: "Extend Life",
    description: "Proper maintenance can double your equipment's service life",
    stat: "2x longer lifespan"
  }
]

const maintenanceSchedule = [
  { component: "Engine Oil", interval: "5,000-10,000 km", critical: true },
  { component: "Transmission Fluid", interval: "50,000-100,000 km", critical: true },
  { component: "Coolant", interval: "2 years or 80,000 km", critical: true },
  { component: "Brake Fluid", interval: "2 years or 40,000 km", critical: true },
  { component: "Air Filters", interval: "20,000-40,000 km", critical: false },
  { component: "Fuel Filters", interval: "30,000-50,000 km", critical: false },
  { component: "Differential Oil", interval: "50,000-100,000 km", critical: false },
  { component: "Power Steering Fluid", interval: "80,000-100,000 km", critical: false }
]

export default function PreventiveMaintenancePage() {
  const serviceData = serviceSchema({
    name: "Preventive Maintenance Services",
    description: "Scheduled maintenance programs for commercial trucks and heavy equipment to maximize uptime and minimize repair costs.",
    provider: "Munden Truck & Equipment Ltd.",
    areaServed: "200km",
    serviceType: "Preventive Maintenance"
  })

  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Services", url: "https://mundentruckequipment.com/services" },
    { name: "Repair Shop", url: "https://mundentruckequipment.com/services/repair-shop" },
    { name: "Preventive Maintenance", url: "https://mundentruckequipment.com/services/repair-shop/preventive-maintenance" }
  ]

  const faqs = [
    {
      question: "How often should I service my commercial truck?",
      answer: "Service intervals depend on your vehicle type and usage. Light-duty trucks typically need service every 5,000-10,000 km, while heavy-duty vehicles may have custom schedules based on hours of operation and working conditions."
    },
    {
      question: "What's included in preventive maintenance?",
      answer: "Our maintenance programs include oil changes, filter replacements, fluid checks and changes, brake inspections, tire rotations, and comprehensive safety inspections. The exact services depend on your chosen package."
    },
    {
      question: "Can preventive maintenance really save money?",
      answer: "Yes! Studies show preventive maintenance can reduce overall maintenance costs by 25-35% by preventing major failures, reducing downtime, and extending equipment life."
    },
    {
      question: "Do you offer maintenance contracts for fleets?",
      answer: "Absolutely. We offer customized fleet maintenance contracts with priority scheduling, volume discounts, and detailed reporting. Contact us for a custom quote based on your fleet size."
    }
  ]

  return (
    <>
      <StructuredData data={[serviceData, breadcrumbSchema(breadcrumbs), faqSchema(faqs)]} />
      
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
              <Badge className="mb-4">Maximize Uptime</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Preventive Maintenance Programs
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                Don't wait for breakdowns. Our preventive maintenance programs keep your trucks running 
                efficiently, reduce repair costs, and maximize your vehicle's lifespan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/booking">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Maintenance
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/quote">
                    <FileText className="mr-2 h-4 w-4" />
                    Get Custom Quote
                  </Link>
                </Button>
              </div>
            </div>

            {/* Benefits Grid with Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {benefits.map((benefit) => {
                const Icon = benefit.icon
                return (
                  <Card key={benefit.title} className="text-center">
                    <CardHeader>
                      <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{benefit.description}</p>
                      <div className="text-2xl font-bold text-primary">{benefit.stat}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Alert */}
            <Card className="mb-12 border-primary/50 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <BarChart3 className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Did You Know?</h3>
                    <p className="text-muted-foreground">
                      Vehicles with regular preventive maintenance have 70% fewer breakdowns and last 
                      twice as long as those with reactive maintenance only.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Maintenance Packages */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Maintenance Packages</h2>
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
                  <TabsTrigger value="basic">Basic</TabsTrigger>
                  <TabsTrigger value="standard">Standard</TabsTrigger>
                  <TabsTrigger value="comprehensive">Comprehensive</TabsTrigger>
                </TabsList>
                {maintenancePackages.map((pkg) => (
                  <TabsContent key={pkg.name} value={pkg.name.split(' ')[0].toLowerCase()}>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                            <CardDescription className="text-lg">{pkg.interval}</CardDescription>
                          </div>
                          <Badge variant="secondary" className="text-sm">{pkg.savings}</Badge>
                        </div>
                        <p className="text-muted-foreground">Ideal for: {pkg.ideal}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold mb-3">Included Services:</h3>
                            <ul className="space-y-2">
                              {pkg.services.map((service) => (
                                <li key={service} className="flex items-start gap-2">
                                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{service}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="text-center p-6 bg-muted/50 rounded-lg">
                              <Wrench className="h-12 w-12 text-primary mx-auto mb-3" />
                              <p className="font-semibold mb-2">Professional Service</p>
                              <p className="text-sm text-muted-foreground mb-4">
                                All work performed by certified technicians
                              </p>
                              <Button asChild>
                                <Link href="/booking">Book This Package</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Maintenance Schedule Guide */}
            <Card className="mb-12">
              <CardHeader>
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-2xl">Typical Maintenance Schedule</CardTitle>
                <CardDescription>
                  Recommended service intervals for commercial vehicles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Component</th>
                        <th className="text-left p-2">Service Interval</th>
                        <th className="text-center p-2">Priority</th>
                      </tr>
                    </thead>
                    <tbody>
                      {maintenanceSchedule.map((item) => (
                        <tr key={item.component} className="border-b">
                          <td className="p-2 font-medium">{item.component}</td>
                          <td className="p-2 text-muted-foreground">{item.interval}</td>
                          <td className="p-2 text-center">
                            {item.critical ? (
                              <Badge variant="destructive" className="text-xs">Critical</Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">Recommended</Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  <AlertTriangle className="h-4 w-4 inline mr-1" />
                  Note: Actual intervals may vary based on vehicle usage and operating conditions
                </p>
              </CardContent>
            </Card>

            {/* Process Timeline */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Getting Started is Easy</h2>
              <ProcessTimeline
                steps={[
                  {
                    number: "1",
                    title: "Vehicle Assessment",
                    description: "We evaluate your vehicle's current condition and service history"
                  },
                  {
                    number: "2",
                    title: "Custom Plan",
                    description: "Create a maintenance schedule tailored to your needs"
                  },
                  {
                    number: "3",
                    title: "Schedule Service",
                    description: "Book convenient appointment times that work for you"
                  },
                  {
                    number: "4",
                    title: "Track & Report",
                    description: "Receive detailed reports and reminders for upcoming services"
                  }
                ]}
              />
            </div>

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
              title="Start Saving with Preventive Maintenance"
              description="Join hundreds of fleet operators who trust us to keep their vehicles running efficiently. Get a custom maintenance plan today."
              variant="primary"
              actions={[
                {
                  label: "Schedule Assessment",
                  href: "/booking",
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

            {/* Related Services */}
            <div className="mt-12 pt-12 border-t">
              <h3 className="text-xl font-semibold mb-6">Related Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Fleet Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Comprehensive fleet management with custom maintenance programs
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/services/repair-shop/fleet-services">Learn More</Link>
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
                    <CardTitle className="text-lg">Repair Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Full-service repairs when maintenance uncovers issues
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/services/repair-shop">Learn More</Link>
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