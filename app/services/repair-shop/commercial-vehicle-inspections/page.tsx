import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Clock, FileCheck, Shield, AlertCircle, CalendarDays, ChevronLeft, Phone, FileText } from "lucide-react"
import StructuredData, { serviceSchema, breadcrumbSchema, faqSchema } from "@/components/seo/StructuredData"
import { ProcessTimeline } from "@/components/services/ProcessTimeline"
import { CTASection } from "@/components/services/CTASection"

export const metadata: Metadata = {
  title: "CVIP Inspections | Commercial Vehicle Inspection | Munden Truck",
  description: "Government certified CVIP inspection facility in Kamloops. Fast, thorough commercial vehicle inspections to keep your fleet compliant and safe. Same-day service.",
  openGraph: {
    title: "CVIP Inspections | Munden Truck & Equipment Ltd.",
    description: "Certified Commercial Vehicle Inspection Program facility in Kamloops, BC. Same-day service available.",
  },
}

const inspectionTypes = [
  {
    title: "Annual CVIP Inspection",
    description: "Required yearly inspection for all commercial vehicles",
    duration: "2-3 hours",
    includes: [
      "Complete vehicle safety inspection",
      "Brake system testing",
      "Steering and suspension check",
      "Lighting and electrical systems",
      "Body and frame inspection",
      "Official CVIP certificate"
    ]
  },
  {
    title: "Semi-Annual Inspection",
    description: "Required for buses and certain commercial vehicles",
    duration: "2-3 hours",
    includes: [
      "All annual inspection items",
      "Enhanced passenger safety checks",
      "Emergency exit verification",
      "Additional brake testing",
      "Detailed undercarriage inspection"
    ]
  },
  {
    title: "Re-Inspection",
    description: "Follow-up inspection after repairs",
    duration: "1-2 hours",
    includes: [
      "Verification of completed repairs",
      "Re-test of failed components",
      "Updated inspection report",
      "New CVIP certificate if passed"
    ]
  }
]

const benefits = [
  {
    icon: Shield,
    title: "Government Certified",
    description: "Fully licensed and authorized CVIP inspection facility"
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Same-day service available with appointment"
  },
  {
    icon: FileCheck,
    title: "Detailed Reports",
    description: "Comprehensive inspection reports for your records"
  },
  {
    icon: CalendarDays,
    title: "Flexible Scheduling",
    description: "Evening and weekend appointments available"
  }
]

export default function CVIPInspectionsPage() {
  const serviceData = serviceSchema({
    name: "CVIP Inspections",
    description: "Government certified Commercial Vehicle Inspection Program facility",
    serviceType: "Vehicle Inspection",
    areaServed: "200km"
  })

  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Services", url: "https://mundentruckequipment.com/services" },
    { name: "Repair Shop", url: "https://mundentruckequipment.com/services/repair-shop" },
    { name: "CVIP Inspections", url: "https://mundentruckequipment.com/services/repair-shop/commercial-vehicle-inspections" }
  ]

  const faqs = [
    {
      question: "How often do I need a CVIP inspection?",
      answer: "Most commercial vehicles require annual inspections. Buses and some other vehicles require semi-annual inspections. Check your vehicle class requirements."
    },
    {
      question: "What if my vehicle fails?",
      answer: "We'll provide a detailed report of required repairs. Once completed, we offer re-inspection services to certify your vehicle."
    },
    {
      question: "Can you perform repairs?",
      answer: "Yes! As a full-service repair shop, we can complete any necessary repairs to help your vehicle pass inspection."
    },
    {
      question: "Do you offer fleet discounts?",
      answer: "Yes, we offer volume discounts for fleets. Contact us for custom pricing based on your fleet size."
    }
  ]

  return (
    <>
      <StructuredData data={[serviceData, breadcrumbSchema(breadcrumbs), faqSchema(faqs)]} />
      
      <section className="py-12">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/services/repair-shop">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Repair Shop
              </Link>
            </Button>

            {/* Hero Section */}
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">Government Certified Facility</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                CVIP Inspections
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Keep your commercial vehicles compliant with our certified CVIP inspection services. 
                Fast, thorough, and professional inspections by qualified technicians.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/quote">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Get Inspection Quote
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:1-800-XXX-XXXX">
                    <Phone className="mr-2 h-4 w-4" />
                    Call for Same-Day Service
                  </a>
                </Button>
              </div>
            </div>

          {/* Alert */}
          <Alert className="max-w-4xl mx-auto mb-12">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> CVIP inspections are mandatory for all commercial vehicles in BC. 
              Don&apos;t risk fines or being taken out of service - book your inspection today.
            </AlertDescription>
          </Alert>

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

          {/* Inspection Types */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Inspection Services</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {inspectionTypes.map((type) => (
                <Card key={type.title} className="h-full">
                  <CardHeader>
                    <CardTitle>{type.title}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                    <Badge variant="outline" className="w-fit">
                      Duration: {type.duration}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium mb-2">Includes:</p>
                    <ul className="space-y-2">
                      {type.includes.map((item) => (
                        <li key={item} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Our CVIP Inspection Process</h2>
            <ProcessTimeline
              steps={[
                {
                  number: "1",
                  title: "Schedule",
                  description: "Book your appointment online or by phone"
                },
                {
                  number: "2",
                  title: "Inspect",
                  description: "Thorough inspection by certified technician"
                },
                {
                  number: "3",
                  title: "Report",
                  description: "Detailed report of findings provided"
                },
                {
                  number: "4",
                  title: "Certificate",
                  description: "Official CVIP certificate issued if passed"
                }
              ]}
            />
          </div>

          {/* Required Documents */}
          <Card className="mb-12">
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-2xl">Required Documents</CardTitle>
              <CardDescription>
                Please bring the following items to your inspection appointment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Vehicle Documents</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Vehicle registration</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Insurance documents</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Previous inspection reports</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Company Information</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>National Safety Code certificate</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Carrier profile information</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Fleet identification</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How often do I need a CVIP inspection?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Most commercial vehicles require annual inspections. Buses and some other vehicles 
                    require semi-annual inspections. Check your vehicle class requirements.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What if my vehicle fails?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We'll provide a detailed report of required repairs. Once completed, we offer 
                    re-inspection services to certify your vehicle.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can you perform repairs?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes! As a full-service repair shop, we can complete any necessary repairs 
                    to help your vehicle pass inspection.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you offer fleet discounts?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, we offer volume discounts for fleets. Contact us for custom pricing 
                    based on your fleet size.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <CTASection
            title="Schedule Your CVIP Inspection Today"
            description="Don't wait until the last minute. Book your inspection now and ensure your vehicles stay compliant."
            variant="primary"
            actions={[
              {
                label: "Get Quote Online",
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
                    Comprehensive fleet management programs with inspection scheduling
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/services/repair-shop/fleet-services">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Preventive Maintenance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Regular maintenance to help ensure inspection success
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/services/repair-shop/preventive-maintenance">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Repair Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete repair services for any issues found during inspection
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