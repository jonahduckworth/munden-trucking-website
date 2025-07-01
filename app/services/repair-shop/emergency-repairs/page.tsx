import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  ChevronLeft, 
  Phone, 
  MapPin, 
  Clock, 
  AlertTriangle,
  Truck,
  Wrench,
  Shield,
  Zap,
  Navigation,
  CheckCircle2,
  Users
} from "lucide-react"
import StructuredData, { serviceSchema, breadcrumbSchema, faqSchema } from "@/components/seo/StructuredData"
import { ProcessTimeline } from "@/components/services/ProcessTimeline"
import { CTASection } from "@/components/services/CTASection"

export const metadata: Metadata = {
  title: "24/7 Emergency Repairs | Breakdown Service | Munden Truck",
  description: "24/7 emergency truck repair service in Kamloops and BC Interior. Mobile repair units, fast response times, and expert technicians available anytime.",
  openGraph: {
    title: "Emergency Truck Repairs | Munden Truck & Equipment Ltd.",
    description: "24/7 emergency breakdown service for commercial trucks. Mobile units available throughout the BC Interior.",
  },
}

const emergencyServices = [
  {
    icon: Truck,
    title: "Mobile Repair Units",
    description: "Fully equipped service trucks ready to come to your location",
    available: "24/7"
  },
  {
    icon: Zap,
    title: "Rapid Response",
    description: "Average response time under 60 minutes in service areas",
    available: "Guaranteed"
  },
  {
    icon: MapPin,
    title: "Wide Coverage",
    description: "Service throughout Kamloops and 200km radius",
    available: "All weather"
  },
  {
    icon: Wrench,
    title: "On-Site Repairs",
    description: "Most repairs completed at breakdown location",
    available: "Professional"
  }
]

const commonEmergencies = [
  {
    category: "Engine & Powertrain",
    issues: [
      "Engine won't start",
      "Overheating",
      "Loss of power",
      "Transmission failure",
      "Clutch problems",
      "Turbo failure"
    ]
  },
  {
    category: "Electrical & Starting",
    issues: [
      "Dead battery",
      "Alternator failure",
      "Starter problems",
      "Wiring issues",
      "ECM failures",
      "Lighting problems"
    ]
  },
  {
    category: "Air & Brake Systems",
    issues: [
      "Air leak repairs",
      "Brake chamber replacement",
      "Frozen air lines",
      "Compressor failure",
      "Emergency brake release",
      "Brake adjustment"
    ]
  },
  {
    category: "Tires & Wheels",
    issues: [
      "Tire replacement",
      "Wheel bearing failure",
      "Hub repairs",
      "Tire pressure issues",
      "Rim damage",
      "Dual tire problems"
    ]
  },
  {
    category: "Cooling & Fluids",
    issues: [
      "Coolant leaks",
      "Radiator repairs",
      "Hose replacement",
      "Oil leaks",
      "Hydraulic leaks",
      "DEF system issues"
    ]
  },
  {
    category: "Other Emergency Services",
    issues: [
      "Lockout service",
      "Fuel delivery",
      "Jump starts",
      "Temporary repairs",
      "Towing coordination",
      "Load transfer assistance"
    ]
  }
]

const responseProcess = [
  {
    number: "1",
    title: "Emergency Call",
    description: "Call our 24/7 hotline and describe your situation",
    time: "Immediate"
  },
  {
    number: "2",
    title: "Dispatch",
    description: "Nearest available unit dispatched to your location",
    time: "5 minutes"
  },
  {
    number: "3",
    title: "On Route",
    description: "Technician en route with real-time updates",
    time: "Average 45 min"
  },
  {
    number: "4",
    title: "Diagnosis",
    description: "Quick assessment and repair plan",
    time: "15 minutes"
  },
  {
    number: "5",
    title: "Repair",
    description: "Professional repair to get you moving",
    time: "Varies"
  },
  {
    number: "6",
    title: "Follow-up",
    description: "Ensure safe operation and schedule any needed work",
    time: "Ongoing"
  }
]

export default function EmergencyRepairsPage() {
  const serviceData = serviceSchema({
    name: "24/7 Emergency Truck Repairs",
    description: "Emergency breakdown service for commercial trucks and heavy equipment throughout the BC Interior. Mobile repair units available 24/7.",
    serviceType: "Emergency Repair",
    areaServed: "200km"
  })

  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Services", url: "https://mundentruckequipment.com/services" },
    { name: "Repair Shop", url: "https://mundentruckequipment.com/services/repair-shop" },
    { name: "Emergency Repairs", url: "https://mundentruckequipment.com/services/repair-shop/emergency-repairs" }
  ]

  const faqs = [
    {
      question: "What areas do you service for emergencies?",
      answer: "We provide 24/7 emergency service throughout Kamloops and within a 200km radius. This includes all major highways and logging roads in the BC Interior."
    },
    {
      question: "What's your average response time?",
      answer: "Our average response time is under 60 minutes within the Kamloops area. Response times may vary based on location, weather conditions, and technician availability."
    },
    {
      question: "Can you repair any truck make or model?",
      answer: "Yes, our technicians are trained and equipped to handle all makes and models of commercial trucks and heavy equipment. We carry common parts for most major brands."
    },
    {
      question: "What if my truck needs to be towed?",
      answer: "If your vehicle cannot be repaired on-site, we'll coordinate towing to our facility and provide priority service to minimize your downtime."
    },
    {
      question: "Do you offer emergency service contracts?",
      answer: "Yes, we offer priority emergency service contracts for fleets with guaranteed response times and discounted rates. Contact us for details."
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
              <Badge className="mb-4" variant="destructive">24/7 Emergency Service</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Emergency Breakdown Service
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                When you're broken down on the road, every minute counts. Our 24/7 emergency repair 
                service gets you back on the road quickly with mobile units and expert technicians.
              </p>
              
              {/* Emergency CTA */}
              <Alert className="max-w-2xl mx-auto mb-8 border-red-200 bg-red-50 dark:bg-red-950/20">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-left">
                  <strong className="block mb-2">Need Emergency Assistance Now?</strong>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="lg" variant="destructive" asChild className="flex-1">
                      <a href="tel:1-800-XXX-XXXX">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Emergency Hotline
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="flex-1">
                      <Link href="/contact">
                        <MapPin className="mr-2 h-4 w-4" />
                        Send Location
                      </Link>
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {emergencyServices.map((service) => {
                const Icon = service.icon
                return (
                  <Card key={service.title}>
                    <CardHeader>
                      <Icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <Badge variant="secondary" className="w-fit">{service.available}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Coverage Map Placeholder */}
            <Card className="mb-12">
              <CardHeader>
                <Navigation className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-2xl">Service Coverage Area</CardTitle>
                <CardDescription>
                  24/7 emergency service throughout the BC Interior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-8 text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-lg font-semibold mb-2">200km Service Radius</p>
                  <p className="text-muted-foreground mb-4">
                    Including all major highways: Trans-Canada, Coquihalla, Yellowhead, and logging roads
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                    <div className="text-center">
                      <p className="font-semibold">Kamloops</p>
                      <p className="text-sm text-muted-foreground">&lt; 30 min</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">Merritt</p>
                      <p className="text-sm text-muted-foreground">45-60 min</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">Chase</p>
                      <p className="text-sm text-muted-foreground">45 min</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">Barriere</p>
                      <p className="text-sm text-muted-foreground">60 min</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Common Emergency Repairs */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Common Emergency Repairs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {commonEmergencies.map((category) => (
                  <Card key={category.category}>
                    <CardHeader>
                      <CardTitle className="text-lg">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.issues.map((issue) => (
                          <li key={issue} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Response Process */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Our Emergency Response Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {responseProcess.map((step) => (
                  <div key={step.number} className="text-center">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {step.number}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                    <Badge variant="outline">{step.time}</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* What to Do Section */}
            <Card className="mb-12 border-orange-500/50 bg-orange-50/50 dark:bg-orange-950/20">
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-orange-600 dark:text-orange-400 mb-2" />
                <CardTitle className="text-2xl">What to Do in a Breakdown</CardTitle>
                <CardDescription>Stay safe while waiting for help</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Safety First</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <span className="font-semibold text-primary">1.</span>
                        <span>Move to a safe location off the road if possible</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="font-semibold text-primary">2.</span>
                        <span>Turn on hazard lights and set up warning triangles</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="font-semibold text-primary">3.</span>
                        <span>Stay with your vehicle unless unsafe to do so</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="font-semibold text-primary">4.</span>
                        <span>Call our emergency hotline immediately</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Information We Need</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Your exact location (highway, kilometer marker)</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Vehicle make, model, and year</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Description of the problem</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Your contact information</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Emergency Service FAQs</h2>
              <div className="space-y-4 max-w-4xl mx-auto">
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
              title="Save Our Emergency Number"
              description="When you're broken down, you need help fast. Save our 24/7 emergency hotline in your phone now."
              variant="primary"
              actions={[
                {
                  label: "1-800-XXX-XXXX",
                  href: "tel:1-800-XXX-XXXX",
                  variant: "secondary",
                  icon: Phone
                },
                {
                  label: "Fleet Emergency Contracts",
                  href: "/services/repair-shop/fleet-services",
                  variant: "outline",
                  icon: Users
                }
              ]}
            />

            {/* Related Services */}
            <div className="mt-12 pt-12 border-t">
              <h3 className="text-xl font-semibold mb-6">Prevent Future Breakdowns</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Preventive Maintenance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Regular maintenance prevents most emergency breakdowns
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
                      Regular inspections catch problems before they cause breakdowns
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/services/repair-shop/commercial-vehicle-inspections">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Fleet Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Priority emergency response for fleet operators
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