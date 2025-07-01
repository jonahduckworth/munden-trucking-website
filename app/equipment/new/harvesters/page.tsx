import { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import EquipmentComparison from '@/components/equipment/EquipmentComparison'
import { StructuredData } from '@/components/seo/StructuredData'
import { ChevronLeft, Filter, SlidersHorizontal, TreePine, Gauge, Fuel, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'EcoLog Harvesters | New Forestry Equipment | Munden Truck & Equipment',
  description: 'Browse our selection of new EcoLog harvesters. Models 590G and 580F available with financing options. Industry-leading forestry equipment in BC.',
}

// Harvester data - in production this would come from a database
const harvesters = [
  {
    id: '590g',
    model: 'EcoLog 590G',
    type: 'Wheeled Harvester',
    price: 'Contact for pricing',
    image: '/images/equipment/590g-harvester.jpg',
    badge: 'Most Popular',
    features: [
      '206 kW Volvo engine',
      '20m reach crane',
      'Log Max 7000C head',
      'Comfort cab with AutoClimate'
    ],
    specs: {
      enginePower: '206 kW',
      craneReach: '20m',
      weight: '22,500 kg',
      fuelCapacity: '400L'
    }
  },
  {
    id: '580f',
    model: 'EcoLog 580F',
    type: 'Wheeled Harvester',
    price: 'Contact for pricing',
    image: '/images/equipment/580f-harvester.jpg',
    features: [
      '190 kW Volvo engine',
      '18m reach crane',
      'Log Max 6000C head',
      'Ergonomic operator station'
    ],
    specs: {
      enginePower: '190 kW',
      craneReach: '18m',
      weight: '20,500 kg',
      fuelCapacity: '350L'
    }
  }
]

export default function HarvestersPage() {
  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'EcoLog Harvesters',
    description: 'New EcoLog harvester models available at Munden Truck & Equipment',
    numberOfItems: harvesters.length,
    itemListElement: harvesters.map((harvester, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: harvester.model,
        description: `${harvester.type} with ${harvester.features[0]}`,
        brand: {
          '@type': 'Brand',
          name: 'EcoLog'
        },
        offers: {
          '@type': 'Offer',
          price: harvester.price,
          priceCurrency: 'CAD',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'Munden Truck & Equipment Ltd.'
          }
        }
      }
    }))
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
      }
    ]
  }

  return (
    <>
      <StructuredData data={productListSchema} />
      <StructuredData data={breadcrumbSchema} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/equipment" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Equipment
          </Link>
          
          <div className="max-w-4xl">
            <Badge variant="secondary" className="mb-4">
              <TreePine className="mr-1 h-3 w-3" />
              Authorized EcoLog Dealer
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              EcoLog Harvesters
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Industry-leading wheeled harvesters designed for efficiency and operator comfort. 
              Built to handle the demanding conditions of BC's forests.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/quote">
                  Request Quote
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Schedule Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Filter Equipment</h2>
            </div>
            
            <div className="flex flex-wrap gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="sort">Sort by</Label>
                <Select defaultValue="featured">
                  <SelectTrigger id="sort" className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="model-asc">Model (A-Z)</SelectItem>
                    <SelectItem value="model-desc">Model (Z-A)</SelectItem>
                    <SelectItem value="power-high">Power (High-Low)</SelectItem>
                    <SelectItem value="power-low">Power (Low-High)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="crane-reach">Crane Reach</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="crane-reach" className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reaches</SelectItem>
                    <SelectItem value="18m">Up to 18m</SelectItem>
                    <SelectItem value="20m">20m and above</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {harvesters.length} harvesters
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {harvesters.map((harvester) => (
              <Card key={harvester.id} className="overflow-hidden">
                <div className="aspect-video relative bg-muted">
                  {/* In production, use actual images */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TreePine className="h-20 w-20 text-muted-foreground/20" />
                  </div>
                  {harvester.badge && (
                    <Badge className="absolute top-4 right-4">
                      {harvester.badge}
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{harvester.model}</CardTitle>
                      <CardDescription>{harvester.type}</CardDescription>
                    </div>
                    <Badge variant="outline">{harvester.price}</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Key Features</h4>
                    <ul className="space-y-1">
                      {harvester.features.map((feature, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Engine Power</p>
                        <p className="text-sm font-semibold">{harvester.specs.enginePower}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TreePine className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Crane Reach</p>
                        <p className="text-sm font-semibold">{harvester.specs.craneReach}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Weight</p>
                        <p className="text-sm font-semibold">{harvester.specs.weight}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Fuel Capacity</p>
                        <p className="text-sm font-semibold">{harvester.specs.fuelCapacity}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button asChild className="flex-1">
                      <Link href={`/equipment/new/harvesters/${harvester.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/quote">
                        Get Quote
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Tool */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Compare Harvesters</h2>
            <p className="text-lg text-muted-foreground">
              Not sure which model is right for you? Compare specifications side-by-side.
            </p>
          </div>
          <EquipmentComparison />
        </div>
      </section>

      {/* Why EcoLog Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose EcoLog Harvesters?</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Industry-Leading Technology</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    EcoLog harvesters feature the latest in forestry technology, including advanced control systems, 
                    efficient hydraulics, and precision harvesting heads.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2" />
                      Intelligent boom control
                    </li>
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2" />
                      Fuel-efficient engines
                    </li>
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2" />
                      Advanced diagnostics
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Operator Comfort & Safety</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Designed with the operator in mind, EcoLog cabs provide exceptional comfort and visibility 
                    for long working days in challenging conditions.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2" />
                      Ergonomic controls
                    </li>
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2" />
                      Climate-controlled cabs
                    </li>
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2" />
                      ROPS/FOPS certified
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Local Support & Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    As your authorized EcoLog dealer, we provide comprehensive support including parts, 
                    service, and expert technicians who know your equipment.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2" />
                      Factory-trained technicians
                    </li>
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2" />
                      Parts inventory on-site
                    </li>
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2" />
                      Mobile service available
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Proven Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    EcoLog harvesters have proven themselves in BC's forests, delivering reliability 
                    and productivity in our unique terrain and conditions.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2" />
                      High uptime rates
                    </li>
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2" />
                      Excellent fuel economy
                    </li>
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2" />
                      Strong resale value
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Upgrade Your Harvesting Operation?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Contact us today to discuss your needs and explore financing options. 
              Our team is ready to help you find the perfect harvester for your operation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/quote">
                  Request a Quote
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Contact Sales Team
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Links */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-center mb-8">Explore More Equipment</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/equipment/new/forwarders">
                <div className="text-left">
                  <div className="font-semibold">EcoLog Forwarders</div>
                  <div className="text-sm text-muted-foreground">Transport logs efficiently</div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/equipment/used">
                <div className="text-left">
                  <div className="font-semibold">Used Equipment</div>
                  <div className="text-sm text-muted-foreground">Quality pre-owned machines</div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/services/equipment-sales">
                <div className="text-left">
                  <div className="font-semibold">Equipment Sales</div>
                  <div className="text-sm text-muted-foreground">Learn about our services</div>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}