import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Clock, FileCheck, Shield, AlertCircle, CalendarDays } from "lucide-react"
import StructuredData, { serviceSchema, breadcrumbSchema } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "CVIP Inspections - Commercial Vehicle Inspection Program",
  description: "Government certified CVIP inspection facility in Kamloops. Fast, thorough commercial vehicle inspections to keep your fleet compliant and safe.",
  openGraph: {
    title: "CVIP Inspections | Munden Truck & Equipment Ltd.",
    description: "Certified Commercial Vehicle Inspection Program facility in Kamloops, BC.",
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

  return (
    <>
      <StructuredData data={serviceData} />
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      
      <section className="py-12">
        <div className="container">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge className="mb-4" variant="secondary">Government Certified Facility</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              CVIP Inspections
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Keep your commercial vehicles compliant with our certified CVIP inspection services. 
              Fast, thorough, and professional inspections by qualified technicians.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Book Inspection</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:1-800-XXX-XXXX">
                  <Clock className="mr-2 h-4 w-4" />
                  Call for Availability
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
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">Our CVIP Inspection Process</CardTitle>
              <CardDescription>What to expect during your inspection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    1
                  </div>
                  <h3 className="font-medium mb-1">Schedule</h3>
                  <p className="text-sm text-muted-foreground">Book your appointment online or by phone</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    2
                  </div>
                  <h3 className="font-medium mb-1">Inspect</h3>
                  <p className="text-sm text-muted-foreground">Thorough inspection by certified technician</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    3
                  </div>
                  <h3 className="font-medium mb-1">Report</h3>
                  <p className="text-sm text-muted-foreground">Detailed report of findings provided</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    4
                  </div>
                  <h3 className="font-medium mb-1">Certificate</h3>
                  <p className="text-sm text-muted-foreground">Official CVIP certificate issued if passed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Schedule Your CVIP Inspection Today</h3>
              <p className="mb-6 opacity-90">
                Don&apos;t wait until the last minute. Book your inspection now and ensure your vehicles stay compliant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">Book Online</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <a href="tel:1-800-XXX-XXXX">Call: 1-800-XXX-XXXX</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}