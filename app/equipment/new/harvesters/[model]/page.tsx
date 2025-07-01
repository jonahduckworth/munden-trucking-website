import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { SpecificationTable } from '@/components/equipment/SpecificationTable'
import FinanceCalculator from '@/components/equipment/FinanceCalculator'
import { StructuredData } from '@/components/seo/StructuredData'
import { 
  ChevronLeft, 
  Download, 
  Phone, 
  Calendar,
  TreePine,
  Weight,
  Gauge,
  Shield,
  Fuel,
  CheckCircle
} from 'lucide-react'

// Harvester data - in production this would come from a database
const harvesters = {
  '590g': {
    model: 'EcoLog 590G',
    type: '6-Wheel Harvester',
    tagline: 'Ultimate productivity meets advanced technology',
    description: 'The EcoLog 590G represents the pinnacle of harvester technology. With its powerful 6-wheel drive system and extended crane reach, it\'s designed for maximum productivity in demanding forestry operations.',
    price: 485000,
    image: '/images/equipment/590g-harvester.jpg',
    brochure: '/brochures/ecolog-590g.pdf',
    features: [
      'Stage V compliant engine with 210 kW power output',
      '6-wheel drive for superior traction and stability',
      'Extended crane reach up to 11m for maximum coverage',
      'Comfortable and ergonomic cab with AutoClimate',
      'Advanced control system with automated functions',
      'Low ground pressure design for sensitive terrain'
    ],
    specifications: {
      'Engine': {
        'Make & Model': 'Stage V compliant diesel',
        'Power Output': '210 kW (281 hp)',
        'Torque': '1,180 Nm',
        'Emission Standard': 'Stage V / Tier 4 Final',
        'Fuel Tank Capacity': '500 L'
      },
      'Crane': {
        'Model': 'EcoLog 250F',
        'Reach': '11 m',
        'Lifting Torque': '250 kNm',
        'Slewing Torque': '55 kNm',
        'Rotation': '360° continuous'
      },
      'Harvester Head': {
        'Compatible Models': 'Log Max 7000C, Waratah H480C',
        'Max Cutting Diameter': '750 mm',
        'Feed Speed': '5.0 m/s',
        'Feed Force': '25 kN'
      },
      'Dimensions': {
        'Length': '8,500 mm',
        'Width': '3,000 mm',
        'Transport Height': '3,900 mm',
        'Ground Clearance': '700 mm',
        'Weight': '21,500 kg'
      },
      'Hydraulics': {
        'System Pressure': '285 bar',
        'Pump Capacity': '450 l/min',
        'Tank Volume': '280 L'
      }
    }
  },
  '580f': {
    model: 'EcoLog 580F',
    type: '6-Wheel Harvester',
    tagline: 'Versatile performance for diverse operations',
    description: 'The EcoLog 580F is a versatile 6-wheel harvester that excels in various forest conditions. Its balanced design and advanced features make it perfect for both thinning and final felling operations.',
    price: 445000,
    image: '/images/equipment/580f-harvester.jpg',
    brochure: '/brochures/ecolog-580f.pdf',
    features: [
      'Stage V compliant engine with 190 kW power output',
      'Versatile 6-wheel configuration for all terrains',
      'Efficient fuel consumption with ECO mode',
      'Spacious operator cabin with excellent visibility',
      'Easy maintenance access points',
      'Proven reliability in demanding conditions'
    ],
    specifications: {
      'Engine': {
        'Make & Model': 'Stage V compliant diesel',
        'Power Output': '190 kW (255 hp)',
        'Torque': '1,050 Nm',
        'Emission Standard': 'Stage V / Tier 4 Final',
        'Fuel Tank Capacity': '450 L'
      },
      'Crane': {
        'Model': 'EcoLog 230F',
        'Reach': '10 m',
        'Lifting Torque': '230 kNm',
        'Slewing Torque': '50 kNm',
        'Rotation': '360° continuous'
      },
      'Harvester Head': {
        'Compatible Models': 'Log Max 6000C, Waratah H470C',
        'Max Cutting Diameter': '650 mm',
        'Feed Speed': '4.5 m/s',
        'Feed Force': '22 kN'
      },
      'Dimensions': {
        'Length': '8,200 mm',
        'Width': '2,900 mm',
        'Transport Height': '3,800 mm',
        'Ground Clearance': '680 mm',
        'Weight': '20,000 kg'
      },
      'Hydraulics': {
        'System Pressure': '280 bar',
        'Pump Capacity': '420 l/min',
        'Tank Volume': '260 L'
      }
    }
  }
}

type Props = {
  params: Promise<{
    model: string
  }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { model } = await params
  const harvester = harvesters[model as keyof typeof harvesters]
  
  if (!harvester) {
    return {
      title: 'Harvester Not Found',
    }
  }

  return {
    title: `${harvester.model} Harvester | EcoLog Equipment | Munden Truck`,
    description: `${harvester.model} - ${harvester.tagline}. ${harvester.description.substring(0, 155)}...`,
  }
}

export default async function HarvesterDetailPage({ params }: Props) {
  const { model } = await params
  const harvester = harvesters[model as keyof typeof harvesters]
  
  if (!harvester) {
    notFound()
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: harvester.model,
    description: harvester.description,
    brand: {
      '@type': 'Brand',
      name: 'EcoLog'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'EcoLog'
    },
    model: harvester.model,
    category: 'Forestry Equipment > Harvesters',
    offers: {
      '@type': 'Offer',
      price: harvester.price,
      priceCurrency: 'CAD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Munden Truck & Equipment Ltd.',
        telephone: '+1-250-555-0123'
      }
    }
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://mundentruckandequipment.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Equipment',
        item: 'https://mundentruckandequipment.com/equipment'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'New Equipment',
        item: 'https://mundentruckandequipment.com/equipment/new'
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Harvesters',
        item: 'https://mundentruckandequipment.com/equipment/new/harvesters'
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: harvester.model,
        item: `https://mundentruckandequipment.com/equipment/new/harvesters/${model}`
      }
    ]
  }

  return (
    <>
      <StructuredData data={productSchema} />
      <StructuredData data={breadcrumbSchema} />
      
      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/equipment/new/harvesters" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Harvesters
          </Link>
          
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
                <img 
                  src={harvester.image} 
                  alt={harvester.model}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {/* Thumbnail images would go here */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-video bg-muted rounded" />
                ))}
              </div>
            </div>
            
            {/* Info Section */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3">New Equipment</Badge>
                <h1 className="text-4xl font-bold mb-2">{harvester.model}</h1>
                <p className="text-xl text-muted-foreground mb-4">{harvester.tagline}</p>
                <p className="text-muted-foreground">{harvester.description}</p>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Starting at</p>
                  <p className="text-3xl font-bold">
                    ${harvester.price.toLocaleString()} CAD
                  </p>
                  <p className="text-sm text-muted-foreground">Plus taxes and delivery</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" asChild className="flex-1">
                    <Link href="/quote">
                      Request Quote
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href={`tel:1-250-555-0123`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call Sales
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/quote">
                      <Calendar className="mr-2 h-4 w-4" />
                      Request Demo Quote
                    </Link>
                  </Button>
                </div>
                
                <Button variant="link" className="w-full justify-center" asChild>
                  <a href={harvester.brochure} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Brochure (PDF)
                  </a>
                </Button>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Engine Power</p>
                    <p className="font-semibold">{harvester.specifications.Engine['Power Output']}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TreePine className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Crane Reach</p>
                    <p className="font-semibold">{harvester.specifications.Crane.Reach}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Weight className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Max Cut Diameter</p>
                    <p className="font-semibold">{harvester.specifications['Harvester Head']['Max Cutting Diameter']}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Operating Weight</p>
                    <p className="font-semibold">{harvester.specifications.Dimensions.Weight}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Detailed Information Tabs */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="features" className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="financing">Financing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                  <CardDescription>
                    Advanced features that set the {harvester.model} apart
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {harvester.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{feature}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <Fuel className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Fuel Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Advanced engine technology and hydraulic systems deliver exceptional fuel economy, 
                      reducing operating costs.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <Shield className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Safety First</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      ROPS/FOPS certified cabin, excellent visibility, and advanced stability systems 
                      ensure operator safety.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <TreePine className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Environmental Care</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Low ground pressure design and Stage V emissions compliance minimize 
                      environmental impact.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications">
              <SpecificationTable 
                specifications={Object.entries(harvester.specifications).map(([title, specs]) => ({
                  title,
                  specs: Object.entries(specs).map(([label, value]) => ({
                    label,
                    value: value as string
                  }))
                }))}
              />
            </TabsContent>
            
            <TabsContent value="financing">
              <div className="max-w-4xl mx-auto">
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Flexible Financing Options</CardTitle>
                    <CardDescription>
                      Work with our finance team to find the perfect payment solution for your business
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <h4 className="font-semibold mb-2">Lease Options</h4>
                        <p className="text-sm text-muted-foreground">
                          Operating and capital lease programs with flexible terms
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Loan Programs</h4>
                        <p className="text-sm text-muted-foreground">
                          Competitive rates through our network of lenders
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Trade-In Credit</h4>
                        <p className="text-sm text-muted-foreground">
                          Apply your current equipment value to reduce costs
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <FinanceCalculator 
                  equipmentPrice={harvester.price}
                  equipmentName={harvester.model}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Related Equipment */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Related Equipment</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/equipment/new/forwarders">
                <div className="text-left">
                  <div className="font-semibold">EcoLog Forwarders</div>
                  <div className="text-sm text-muted-foreground">Complete your operation</div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/equipment/used">
                <div className="text-left">
                  <div className="font-semibold">Used Harvesters</div>
                  <div className="text-sm text-muted-foreground">Budget-friendly options</div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/services/equipment-sales">
                <div className="text-left">
                  <div className="font-semibold">Parts & Service</div>
                  <div className="text-sm text-muted-foreground">Keep your equipment running</div>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}