import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Award, Shield, Leaf, Users } from "lucide-react"
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "Our Company | History & Values | Munden Truck & Equipment",
  description: "Learn about the history, values, and commitments that have made Munden Truck & Equipment Ltd. a trusted name in truck repair and forestry equipment since 1994.",
  openGraph: {
    title: "Our Company | Munden Truck & Equipment Ltd.",
    description: "Discover our 30-year journey of excellence in commercial vehicle services.",
  },
}

const timeline = [
  {
    year: "1994",
    title: "Company Founded",
    description: "Robert Munden establishes Munden Truck & Equipment in Kamloops, BC, with a vision to provide honest, reliable truck repair services."
  },
  {
    year: "1998",
    title: "CVIP Certification",
    description: "Became certified for Commercial Vehicle Inspection Program, expanding our service capabilities."
  },
  {
    year: "2005",
    title: "Facility Expansion",
    description: "Moved to our current larger facility to accommodate growing demand and add more service bays."
  },
  {
    year: "2010",
    title: "EcoLog Partnership",
    description: "Became authorized EcoLog dealer for Western Canada, entering the forestry equipment market."
  },
  {
    year: "2015",
    title: "Log Hauling Division",
    description: "Launched our log hauling services division to provide comprehensive forestry solutions."
  },
  {
    year: "2020",
    title: "Technology Integration",
    description: "Invested in state-of-the-art diagnostic equipment and digital service management systems."
  },
  {
    year: "2024",
    title: "30 Years of Excellence",
    description: "Celebrating three decades of service with over 15 skilled technicians and thousands of satisfied customers."
  }
]

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We believe in honest assessments, fair pricing, and transparent communication. Your trust is our most valuable asset."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in everything we do, from routine maintenance to complex repairs."
  },
  {
    icon: Users,
    title: "Community",
    description: "We're proud to support the BC Interior's trucking and forestry industries, contributing to local economic growth."
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "We're committed to environmental responsibility through proper waste disposal and promoting fuel-efficient solutions."
  }
]

export default function CompanyPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "About", url: "https://mundentruckequipment.com/about" },
    { name: "Our Company", url: "https://mundentruckequipment.com/about/company" }
  ]

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/about">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to About
              </Link>
            </Button>

            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Company</h1>
              <p className="text-lg text-muted-foreground">
                Building trust through expertise and integrity since 1994
              </p>
            </div>

            {/* Company Story */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl">Our Story</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  Munden Truck & Equipment Ltd. was founded in 1994 by Robert Munden with a simple 
                  yet powerful vision: to provide the BC Interior&apos;s trucking industry with honest, 
                  reliable, and expert repair services. What started as a small shop with just three 
                  employees has grown into one of the region&apos;s most trusted names in commercial 
                  vehicle services.
                </p>
                <p>
                  From the beginning, we recognized that our success would be built on the success 
                  of our customers. Every truck we repair, every inspection we perform, and every 
                  piece of equipment we sell represents a livelihood, a business, and a dream. This 
                  understanding drives our commitment to excellence in everything we do.
                </p>
                <p>
                  Over the years, we&apos;ve expanded our services to meet the evolving needs of our 
                  customers. Today, we offer comprehensive solutions including truck repair, CVIP 
                  inspections, log hauling services, and as an authorized EcoLog dealer, we provide 
                  top-quality forestry equipment. Our growth has always been guided by our core 
                  values of integrity, quality, and customer service.
                </p>
              </CardContent>
            </Card>

            {/* Timeline */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Our Journey</h2>
              <div className="space-y-4">
                {timeline.map((event, index) => (
                  <div key={event.year} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-24 text-right">
                        <Badge variant={index === timeline.length - 1 ? "default" : "secondary"}>
                          {event.year}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex-1 pb-8 border-l-2 border-muted pl-8 relative">
                      <div className="absolute w-4 h-4 bg-background border-2 border-primary rounded-full -left-[9px] top-0" />
                      <h3 className="font-semibold mb-1">{event.title}</h3>
                      <p className="text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Values */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value) => {
                  const Icon = value.icon
                  return (
                    <Card key={value.title}>
                      <CardHeader>
                        <Icon className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-xl">{value.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{value.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Certifications & Affiliations */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl">Certifications & Affiliations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong>CVIP Certified Facility</strong> - Authorized to perform Commercial Vehicle Inspection Program inspections
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong>Authorized EcoLog Dealer</strong> - Official dealer for Western Canada
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong>WorkSafeBC Compliant</strong> - Full compliance with provincial safety standards
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong>BC Forest Safety Council Member</strong> - Committed to forestry industry safety
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong>Kamloops Chamber of Commerce</strong> - Active member of the local business community
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Experience Our Commitment</h3>
                <p className="mb-6 opacity-90">
                  Discover why businesses throughout the BC Interior trust Munden Truck & Equipment 
                  for their commercial vehicle and equipment needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/services">Our Services</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}