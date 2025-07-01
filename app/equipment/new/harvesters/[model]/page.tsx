import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Phone, Download, FileText, Calendar, Shield, Fuel } from "lucide-react"
import StructuredData, { productSchema, breadcrumbSchema } from "@/components/seo/StructuredData"

// In a real app, this would come from a database
const harvesters = {
  "590g": {
    name: "EcoLog 590G",
    fullName: "EcoLog 590G Harvester",
    tagline: "Ultimate 6-Wheel Harvester for Maximum Productivity",
    description: "The EcoLog 590G represents the pinnacle of harvester technology. With its powerful 6-wheel drive system and extended crane reach, it's designed for maximum productivity in demanding forestry operations.",
    image: "/images/equipment/590g-harvester.jpg",
    price: "Contact for pricing",
    status: "Available to order",
    features: [
      "6-wheel drive for superior traction",
      "Extended crane reach up to 11m",
      "Stage V compliant engine",
      "Comfortable and ergonomic cab",
      "Advanced control system",
      "Low ground pressure"
    ],
    specifications: {
      "Engine": {
        "Model": "Stage V compliant diesel",
        "Power": "210 kW (281 hp)",
        "Torque": "1,180 Nm",
        "Fuel capacity": "500 liters"
      },
      "Dimensions": {
        "Length": "8.5 m",
        "Width": "3.0 m",
        "Transport height": "3.9 m",
        "Weight": "21,500 kg"
      },
      "Crane": {
        "Model": "EcoLog 250F",
        "Reach": "11 m",
        "Lifting torque": "250 kNm",
        "Slewing torque": "55 kNm"
      },
      "Hydraulics": {
        "System pressure": "285 bar",
        "Flow": "450 l/min",
        "Tank capacity": "280 liters"
      }
    }
  },
  "580f": {
    name: "EcoLog 580F",
    fullName: "EcoLog 580F Harvester",
    tagline: "Versatile Harvester for All Conditions",
    description: "The EcoLog 580F is a versatile 6-wheel harvester that excels in various forest conditions. Its balanced design and advanced features make it perfect for both thinning and final felling operations.",
    image: "/images/equipment/580f-harvester.jpg",
    price: "Contact for pricing",
    status: "Available to order",
    features: [
      "Versatile 6-wheel configuration",
      "Efficient fuel consumption",
      "Low emission engine",
      "Spacious operator cabin",
      "Easy maintenance access",
      "All-terrain capability"
    ],
    specifications: {
      "Engine": {
        "Model": "Stage V compliant diesel",
        "Power": "190 kW (255 hp)",
        "Torque": "1,050 Nm",
        "Fuel capacity": "450 liters"
      },
      "Dimensions": {
        "Length": "8.2 m",
        "Width": "2.9 m",
        "Transport height": "3.8 m",
        "Weight": "20,000 kg"
      },
      "Crane": {
        "Model": "EcoLog 230F",
        "Reach": "10 m",
        "Lifting torque": "230 kNm",
        "Slewing torque": "50 kNm"
      },
      "Hydraulics": {
        "System pressure": "280 bar",
        "Flow": "420 l/min",
        "Tank capacity": "260 liters"
      }
    }
  }
}

export async function generateMetadata({ params }: { params: Promise<{ model: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  const harvester = harvesters[resolvedParams.model as keyof typeof harvesters]
  
  if (!harvester) {
    return {
      title: "Harvester Not Found",
    }
  }

  return {
    title: `${harvester.fullName} - Specifications & Features`,
    description: `${harvester.description} View specifications, features, and request a quote for the ${harvester.name}.`,
    openGraph: {
      title: `${harvester.fullName} | Munden Truck & Equipment Ltd.`,
      description: harvester.description,
      images: [harvester.image],
    },
  }
}

export default async function HarvesterDetailPage({ params }: { params: Promise<{ model: string }> }) {
  const resolvedParams = await params
  const harvester = harvesters[resolvedParams.model as keyof typeof harvesters]
  
  if (!harvester) {
    notFound()
  }

  const productData = productSchema({
    name: harvester.fullName,
    description: harvester.description,
    brand: "EcoLog",
    category: "Forestry Harvester",
    image: `https://mundentruckequipment.com${harvester.image}`,
    price: harvester.price
  })

  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Equipment", url: "https://mundentruckequipment.com/equipment" },
    { name: "Harvesters", url: "https://mundentruckequipment.com/equipment/new/harvesters" },
    { name: harvester.name, url: `https://mundentruckequipment.com/equipment/new/harvesters/${resolvedParams.model}` }
  ]

  return (
    <>
      <StructuredData data={productData} />
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      
      <section className="py-12">
        <div className="container">
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="relative h-[400px] lg:h-[500px] bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={harvester.image}
                alt={harvester.fullName}
                fill
                className="object-cover"
                priority
              />
              <Badge className="absolute top-4 right-4">{harvester.status}</Badge>
            </div>
            <div>
              <Badge className="mb-4" variant="secondary">New Equipment</Badge>
              <h1 className="text-4xl font-bold mb-2">{harvester.fullName}</h1>
              <p className="text-xl text-muted-foreground mb-6">{harvester.tagline}</p>
              <p className="mb-6">{harvester.description}</p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span>Comprehensive warranty included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Fuel className="h-5 w-5 text-muted-foreground" />
                  <span>Stage V compliant - low emissions</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/quote">Request Quote</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:1-800-XXX-XXXX">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Sales
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#" download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Brochure
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Features & Specifications Tabs */}
          <Tabs defaultValue="features" className="mb-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="financing">Financing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                  <CardDescription>What makes the {harvester.name} exceptional</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {harvester.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <p>{feature}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <div className="space-y-6">
                {Object.entries(harvester.specifications).map(([category, specs]) => (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="text-lg">{category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableBody>
                          {Object.entries(specs).map(([key, value]) => (
                            <TableRow key={key}>
                              <TableCell className="font-medium">{key}</TableCell>
                              <TableCell className="text-right">{value}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="financing" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Financing Options</CardTitle>
                  <CardDescription>Flexible financing to fit your budget</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Available Financing Plans</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>12-60 month term options</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>Competitive interest rates</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span>No prepayment penalties</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Leasing Options</h3>
                      <p className="text-muted-foreground mb-4">
                        We offer flexible leasing programs including operating leases and 
                        lease-to-own options. Contact our finance team for details.
                      </p>
                      <Button asChild>
                        <Link href="/contact">Contact Finance Team</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Upgrade Your Fleet?</h3>
              <p className="mb-6 opacity-90">
                Contact our sales team to discuss how the {harvester.name} can improve your operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/quote">Get Custom Quote</Link>
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