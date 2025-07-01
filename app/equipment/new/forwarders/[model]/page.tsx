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
  Truck,
  Weight,
  Gauge,
  TreePine,
  Shield,
  Fuel,
  CheckCircle
} from 'lucide-react'

// Forwarder data - in production this would come from a database
const forwarders = {
  '594f': {
    model: 'EcoLog 594F',
    type: '8-Wheel Forwarder',
    tagline: 'Maximum capacity meets superior maneuverability',
    description: 'The EcoLog 594F is our flagship forwarder, designed for maximum productivity in demanding forestry operations. With a 20-ton load capacity and advanced features, it delivers exceptional performance while maintaining low ground pressure.',
    price: 425000,
    image: '/images/equipment/594f-forwarder.jpg',
    brochure: '/brochures/ecolog-594f.pdf',
    features: [
      'Volvo TAD873VE engine with 195 kW power output',
      '20-ton load capacity for maximum productivity',
      'F144 crane with 10m reach and superior lifting power',
      'Comfort Ride cabin suspension for operator comfort',
      'Low ground pressure with 8-wheel boggie design',
      'Advanced control system with automated functions'
    ],
    specifications: {
      'Engine': {
        'Make & Model': 'Volvo TAD873VE',
        'Power Output': '195 kW (261 hp)',
        'Torque': '1230 Nm @ 1400 rpm',
        'Emission Standard': 'Stage V / Tier 4 Final',
        'Fuel Tank Capacity': '280 L'
      },
      'Transmission': {
        'Type': 'Hydrostatic-mechanical',
        'Drive': '8WD with portal axles',
        'Tractive Force': '190 kN',
        'Travel Speed': '0-20 km/h'
      },
      'Load Area': {
        'Load Capacity': '20,000 kg',
        'Load Area': '5.1 m²',
        'Load Space Length': '4,850 mm',
        'Headboard Height': '2,400 mm'
      },
      'Crane': {
        'Model': 'F144',
        'Reach': '10 m',
        'Lifting Torque': '144 kNm',
        'Slewing Torque': '42 kNm',
        'Grapple Area': '0.36 m²'
      },
      'Dimensions': {
        'Length': '10,580 mm',
        'Width': '2,990 mm',
        'Transport Height': '3,890 mm',
        'Ground Clearance': '675 mm',
        'Weight': '18,900 kg'
      },
      'Hydraulics': {
        'Working Pressure': '235 bar',
        'Pump Capacity': '190 l/min',
        'Tank Volume': '150 L'
      }
    }
  },
  '584f': {
    model: 'EcoLog 584F',
    type: '8-Wheel Forwarder',
    tagline: 'Versatile performance for diverse operations',
    description: 'The EcoLog 584F combines high capacity with excellent maneuverability. Perfect for operations requiring flexibility, it offers 18-ton load capacity while maintaining low ground pressure for sensitive terrain.',
    price: 385000,
    image: '/images/equipment/584f-forwarder.jpg',
    brochure: '/brochures/ecolog-584f.pdf',
    features: [
      'Volvo TAD872VE engine with 175 kW power output',
      '18-ton load capacity for versatile operations',
      'F134 crane with 9.5m reach',
      'Ergonomic cabin with excellent visibility',
      'Low ground pressure design',
      'Fuel-efficient operation'
    ],
    specifications: {
      'Engine': {
        'Make & Model': 'Volvo TAD872VE',
        'Power Output': '175 kW (235 hp)',
        'Torque': '1100 Nm @ 1400 rpm',
        'Emission Standard': 'Stage V / Tier 4 Final',
        'Fuel Tank Capacity': '260 L'
      },
      'Transmission': {
        'Type': 'Hydrostatic-mechanical',
        'Drive': '8WD with portal axles',
        'Tractive Force': '175 kN',
        'Travel Speed': '0-20 km/h'
      },
      'Load Area': {
        'Load Capacity': '18,000 kg',
        'Load Area': '4.8 m²',
        'Load Space Length': '4,650 mm',
        'Headboard Height': '2,300 mm'
      },
      'Crane': {
        'Model': 'F134',
        'Reach': '9.5 m',
        'Lifting Torque': '134 kNm',
        'Slewing Torque': '38 kNm',
        'Grapple Area': '0.32 m²'
      },
      'Dimensions': {
        'Length': '10,380 mm',
        'Width': '2,890 mm',
        'Transport Height': '3,790 mm',
        'Ground Clearance': '650 mm',
        'Weight': '17,200 kg'
      },
      'Hydraulics': {
        'Working Pressure': '235 bar',
        'Pump Capacity': '175 l/min',
        'Tank Volume': '140 L'
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
  const forwarder = forwarders[model as keyof typeof forwarders]
  
  if (!forwarder) {
    return {
      title: 'Forwarder Not Found',
    }
  }

  return {
    title: `${forwarder.model} Forwarder | EcoLog Equipment | Munden Truck`,
    description: `${forwarder.model} - ${forwarder.tagline}. ${forwarder.description.substring(0, 155)}...`,
  }
}

export default async function ForwarderDetailPage({ params }: Props) {
  const { model } = await params
  const forwarder = forwarders[model as keyof typeof forwarders]
  
  if (!forwarder) {
    notFound()
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: forwarder.model,
    description: forwarder.description,
    brand: {
      '@type': 'Brand',
      name: 'EcoLog'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'EcoLog'
    },
    model: forwarder.model,
    category: 'Forestry Equipment > Forwarders',
    offers: {
      '@type': 'Offer',
      price: forwarder.price,
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
        name: 'Forwarders',
        item: 'https://mundentruckandequipment.com/equipment/new/forwarders'
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: forwarder.model,
        item: `https://mundentruckandequipment.com/equipment/new/forwarders/${model}`
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
            href="/equipment/new/forwarders" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Forwarders
          </Link>
          
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
                {/* In production, use actual images */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Truck className="h-32 w-32 text-muted-foreground/20" />
                </div>
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
                <h1 className="text-4xl font-bold mb-2">{forwarder.model}</h1>
                <p className="text-xl text-muted-foreground mb-4">{forwarder.tagline}</p>
                <p className="text-muted-foreground">{forwarder.description}</p>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Starting at</p>
                  <p className="text-3xl font-bold">
                    ${forwarder.price.toLocaleString()} CAD
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
                  <a href={forwarder.brochure} download>
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
                    <p className="font-semibold">{forwarder.specifications.Engine['Power Output']}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Weight className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Load Capacity</p>
                    <p className="font-semibold">{forwarder.specifications['Load Area']['Load Capacity']}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TreePine className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Crane Reach</p>
                    <p className="font-semibold">{forwarder.specifications.Crane.Reach}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Operating Weight</p>
                    <p className="font-semibold">{forwarder.specifications.Dimensions.Weight}</p>
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
                    Advanced features that set the {forwarder.model} apart
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {forwarder.features.map((feature, index) => (
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
                specifications={Object.entries(forwarder.specifications).map(([title, specs]) => ({
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
                  equipmentPrice={forwarder.price}
                  equipmentName={forwarder.model}
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
              <Link href="/equipment/new/harvesters">
                <div className="text-left">
                  <div className="font-semibold">EcoLog Harvesters</div>
                  <div className="text-sm text-muted-foreground">Complete your operation</div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/equipment/used">
                <div className="text-left">
                  <div className="font-semibold">Used Forwarders</div>
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