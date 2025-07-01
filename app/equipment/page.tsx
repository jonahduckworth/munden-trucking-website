import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trees, Truck, DollarSign, Shield, Phone, ArrowRight } from "lucide-react"
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "Forestry Equipment - EcoLog Harvesters & Forwarders",
  description: "Browse our selection of new and used forestry equipment. Authorized EcoLog dealer offering harvesters, forwarders, and more with financing available.",
  openGraph: {
    title: "Forestry Equipment | Munden Truck & Equipment Ltd.",
    description: "New and used EcoLog harvesters and forwarders. Authorized dealer in Western Canada.",
  },
}

const newEquipment = [
  {
    category: "Harvesters",
    description: "High-performance harvesters for efficient logging operations",
    models: [
      {
        name: "EcoLog 590G",
        type: "6-Wheel Harvester",
        features: ["Powerful crane reach", "Fuel efficient", "Comfortable cab"],
        href: "/equipment/new/harvesters/590g"
      },
      {
        name: "EcoLog 580F",
        type: "Versatile Harvester",
        features: ["All-terrain capability", "Advanced hydraulics", "Low ground pressure"],
        href: "/equipment/new/harvesters/580f"
      }
    ]
  },
  {
    category: "Forwarders",
    description: "Robust forwarders with exceptional load capacity",
    models: [
      {
        name: "EcoLog 594F",
        type: "20-ton Forwarder",
        features: ["Large load capacity", "8-wheel drive", "Ergonomic controls"],
        href: "/equipment/new/forwarders/594f"
      },
      {
        name: "EcoLog 584F",
        type: "18-ton Forwarder",
        features: ["Balanced performance", "Fuel efficient", "Low maintenance"],
        href: "/equipment/new/forwarders/584f"
      }
    ]
  }
]

const usedEquipment = [
  {
    name: "2020 John Deere 903M",
    type: "Tracked Harvester",
    hours: "3,500",
    price: "Contact for pricing",
    status: "available"
  },
  {
    name: "2019 Tigercat 1075C",
    type: "Forwarder",
    hours: "4,200",
    price: "Contact for pricing",
    status: "available"
  },
  {
    name: "2021 Ponsse Buffalo",
    type: "Forwarder",
    hours: "2,100",
    price: "Contact for pricing",
    status: "sold"
  }
]

export default function EquipmentPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Equipment", url: "https://mundentruckequipment.com/equipment" }
  ]

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      
      <section className="py-12">
        <div className="container">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge className="mb-4" variant="secondary">Authorized EcoLog Dealer</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Forestry Equipment
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover our selection of new EcoLog equipment and quality used machines. 
              As Western Canada&apos;s authorized EcoLog dealer, we offer sales, service, and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/quote">Request Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:1-800-XXX-XXXX">
                  <Phone className="mr-2 h-4 w-4" />
                  Talk to Sales
                </a>
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Trees className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">EcoLog Dealer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Authorized dealer for Western Canada
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <DollarSign className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Financing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Flexible financing options available
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Warranty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Comprehensive warranty coverage
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Truck className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle className="text-lg">Trade-Ins</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We accept equipment trade-ins
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Equipment Tabs */}
          <Tabs defaultValue="new" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="new">New Equipment</TabsTrigger>
              <TabsTrigger value="used">Used Equipment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="new" className="mt-8">
              <div className="space-y-12">
                {newEquipment.map((category) => (
                  <div key={category.category}>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-2xl font-bold">{category.category}</h2>
                        <p className="text-muted-foreground">{category.description}</p>
                      </div>
                      <Button asChild variant="outline">
                        <Link href={`/equipment/new/${category.category.toLowerCase()}`}>
                          View All {category.category}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.models.map((model) => (
                        <Card key={model.name} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>{model.name}</CardTitle>
                                <CardDescription>{model.type}</CardDescription>
                              </div>
                              <Badge>New</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-1 mb-4">
                              {model.features.map((feature) => (
                                <li key={feature} className="text-sm text-muted-foreground">
                                  • {feature}
                                </li>
                              ))}
                            </ul>
                            <Button asChild className="w-full">
                              <Link href={model.href}>View Details</Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="used" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {usedEquipment.map((equipment) => (
                  <Card key={equipment.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{equipment.name}</CardTitle>
                          <CardDescription>{equipment.type}</CardDescription>
                        </div>
                        <Badge variant={equipment.status === "available" ? "default" : "secondary"}>
                          {equipment.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Hours:</span>
                          <span className="font-medium">{equipment.hours}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-medium">{equipment.price}</span>
                        </div>
                      </div>
                      {equipment.status === "available" && (
                        <Button asChild className="w-full">
                          <Link href={`/equipment/used/${equipment.name.toLowerCase().replace(/\s+/g, '-')}`}>
                            View Details
                          </Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button asChild>
                  <Link href="/equipment/used">View All Used Equipment</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <Card className="mt-12 bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Can&apos;t Find What You&apos;re Looking For?</h3>
              <p className="mb-6 opacity-90">
                Our sales team can help you find the perfect equipment for your needs. 
                Contact us for personalized assistance and custom orders.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <a href="tel:1-800-XXX-XXXX">Call Sales: 1-800-XXX-XXXX</a>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link href="/contact">Send Message</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}