import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Trees, Truck, Settings, Shield, Globe, Award } from "lucide-react"
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "Industry Partners | Strategic Partnerships | Munden Truck & Equipment",
  description: "Learn about our strategic partnerships including our role as authorized EcoLog dealer and relationships with leading industry suppliers.",
  openGraph: {
    title: "Industry Partners | Munden Truck & Equipment Ltd.",
    description: "Discover the partnerships that help us deliver exceptional service and quality equipment.",
  },
}

const ecologPartnership = {
  established: "2010",
  territory: "Western Canada",
  benefits: [
    "Direct factory support and training",
    "Priority access to new equipment models",
    "Comprehensive warranty programs",
    "Technical support hotline",
    "Parts availability guarantee"
  ],
  products: [
    { name: "590G Harvester", type: "6-Wheel Harvester" },
    { name: "580F Harvester", type: "Track Harvester" },
    { name: "594F Forwarder", type: "20-ton Capacity" },
    { name: "584F Forwarder", type: "18-ton Capacity" }
  ]
}

const keyPartners = [
  {
    name: "Major Parts Suppliers",
    icon: Truck,
    description: "Strategic relationships with leading OEM and aftermarket parts suppliers ensure quick access to quality components.",
    partners: ["Cummins", "Detroit Diesel", "Caterpillar", "Meritor", "Bendix", "Dana"]
  },
  {
    name: "Technology Partners",
    icon: Settings,
    description: "Partnerships with diagnostic and service technology providers keep us at the forefront of repair capabilities.",
    partners: ["Snap-on", "Hunter Engineering", "Mitchell 1", "JPRO Diagnostics"]
  },
  {
    name: "Industry Associations",
    icon: Shield,
    description: "Active membership in industry organizations ensures we stay current with regulations and best practices.",
    partners: ["BC Trucking Association", "BC Forest Safety Council", "CVSE", "WorkSafeBC"]
  },
  {
    name: "Financial Partners",
    icon: Award,
    description: "Relationships with leading financial institutions help our customers access competitive financing options.",
    partners: ["RBC", "TD Equipment Finance", "CWB National Leasing", "Element Fleet"]
  }
]

const communityPartners = [
  {
    name: "Kamloops Chamber of Commerce",
    description: "Active member supporting local business growth and economic development"
  },
  {
    name: "Thompson Rivers University",
    description: "Partnership for apprenticeship programs and technical training"
  },
  {
    name: "Local First Nations",
    description: "Collaborative relationships with Indigenous communities for employment and services"
  },
  {
    name: "BC Forest Safety Council",
    description: "Committed partner in promoting safety throughout the forestry industry"
  }
]

export default function PartnersPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "About", url: "https://mundentruckequipment.com/about" },
    { name: "Industry Partners", url: "https://mundentruckequipment.com/about/partners" }
  ]

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      
      <section className="py-12">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/about">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to About
              </Link>
            </Button>

            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Industry Partners</h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Strong partnerships are the foundation of exceptional service. Our strategic 
                relationships with industry leaders ensure we deliver the best solutions for our customers.
              </p>
            </div>

            {/* EcoLog Partnership Feature */}
            <Card className="mb-12 overflow-hidden border-primary">
              <div className="bg-primary/10 p-2 text-center">
                <Badge variant="secondary" className="text-sm">Featured Partnership</Badge>
              </div>
              <CardHeader className="text-center pb-4">
                <Trees className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-3xl">Authorized EcoLog Dealer</CardTitle>
                <CardDescription className="text-lg">
                  Exclusive dealership for Western Canada since {ecologPartnership.established}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-semibold mb-4">Partnership Benefits</h3>
                    <ul className="space-y-2">
                      {ecologPartnership.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Equipment Portfolio</h3>
                    <div className="space-y-3">
                      {ecologPartnership.products.map((product) => (
                        <div key={product.name} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                          <span className="font-medium text-sm">{product.name}</span>
                          <Badge variant="outline" className="text-xs">{product.type}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-center pt-4 border-t">
                  <p className="text-muted-foreground mb-4">
                    As the authorized dealer for {ecologPartnership.territory}, we provide sales, 
                    service, parts, and support for the complete EcoLog product line.
                  </p>
                  <Button asChild>
                    <Link href="/equipment">View EcoLog Equipment</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Key Industry Partners */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Key Industry Partners</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {keyPartners.map((category) => {
                  const Icon = category.icon
                  return (
                    <Card key={category.name}>
                      <CardHeader>
                        <Icon className="h-8 w-8 text-primary mb-2" />
                        <CardTitle>{category.name}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {category.partners.map((partner) => (
                            <Badge key={partner} variant="secondary">
                              {partner}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Community Partners */}
            <Card className="mb-12">
              <CardHeader>
                <Globe className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-2xl">Community Partnerships</CardTitle>
                <CardDescription>
                  We believe in giving back and supporting the communities where we live and work
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {communityPartners.map((partner) => (
                    <div key={partner.name} className="space-y-2">
                      <h3 className="font-semibold">{partner.name}</h3>
                      <p className="text-sm text-muted-foreground">{partner.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Partnership Benefits */}
            <div className="bg-muted/30 rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-center mb-6">
                Why Our Partnerships Matter to You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Quality Assurance</h3>
                  <p className="text-sm text-muted-foreground">
                    Partnerships with trusted brands ensure genuine parts and reliable equipment
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Extended Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Access to manufacturer networks provides comprehensive support and resources
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Best Value</h3>
                  <p className="text-sm text-muted-foreground">
                    Strong relationships mean competitive pricing and exclusive offers for our customers
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Partner With Confidence</h3>
                <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                  When you choose Munden Truck & Equipment, you&apos;re not just getting our expertise – 
                  you&apos;re gaining access to an entire network of industry-leading partnerships.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/contact">Contact Us Today</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Link href="/equipment">Browse Equipment</Link>
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