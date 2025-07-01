import { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import EquipmentComparison from '@/components/equipment/EquipmentComparison'
import { StructuredData } from '@/components/seo/StructuredData'
import { ChevronLeft, Filter, SlidersHorizontal, Truck, Weight, Gauge, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'EcoLog Forwarders | New Forestry Equipment | Munden Truck & Equipment',
  description: 'Browse our selection of new EcoLog forwarders. Models 594F and 584F available with financing options. High-capacity log transport equipment in BC.',
}

// Forwarder data - in production this would come from a database
const forwarders = [
  {
    id: '594f',
    model: 'EcoLog 594F',
    type: '8-Wheel Forwarder',
    price: 'Contact for pricing',
    image: '/images/equipment/594f-forwarder.jpg',
    badge: 'Best Seller',
    features: [
      '195 kW Volvo engine',
      '20-ton load capacity',
      'F144 crane with 10m reach',
      'Comfort Ride cabin suspension'
    ],
    specs: {
      enginePower: '195 kW',
      loadCapacity: '20,000 kg',
      craneReach: '10m',
      weight: '18,900 kg'
    }
  },
  {
    id: '584f',
    model: 'EcoLog 584F',
    type: '8-Wheel Forwarder',
    price: 'Contact for pricing',
    image: '/images/equipment/584f-forwarder.jpg',
    features: [
      '175 kW Volvo engine',
      '18-ton load capacity',
      'F134 crane with 9.5m reach',
      'Low ground pressure design'
    ],
    specs: {
      enginePower: '175 kW',
      loadCapacity: '18,000 kg',
      craneReach: '9.5m',
      weight: '17,200 kg'
    }
  }
]

export default function ForwardersPage() {
  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'EcoLog Forwarders',
    description: 'New EcoLog forwarder models available at Munden Truck & Equipment',
    numberOfItems: forwarders.length,
    itemListElement: forwarders.map((forwarder, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: forwarder.model,
        description: `${forwarder.type} with ${forwarder.features[0]}`,
        brand: {
          '@type': 'Brand',
          name: 'EcoLog'
        },
        offers: {
          '@type': 'Offer',
          price: forwarder.price,
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
        name: 'Forwarders',
        item: 'https://mundentruckandequipment.com/equipment/new/forwarders'
      }
    ]
  }

  return (
    <>
      <StructuredData data={productListSchema} />
      <StructuredData data={breadcrumbSchema} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-background py-12">
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
              <Truck className="mr-1 h-3 w-3" />
              Authorized EcoLog Dealer
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              EcoLog Forwarders
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              High-capacity forwarders engineered for efficient log transport. 
              Superior load capacity, excellent maneuverability, and operator comfort for maximum productivity.
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
                    <SelectItem value="capacity-high">Capacity (High-Low)</SelectItem>
                    <SelectItem value="capacity-low">Capacity (Low-High)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="capacity">Load Capacity</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="capacity" className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Capacities</SelectItem>
                    <SelectItem value="15t">Up to 15 tons</SelectItem>
                    <SelectItem value="18t">16-18 tons</SelectItem>
                    <SelectItem value="20t">19+ tons</SelectItem>
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
              Showing {forwarders.length} forwarders
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {forwarders.map((forwarder) => (
              <Card key={forwarder.id} className="overflow-hidden">
                <div className="aspect-video relative bg-muted">
                  <img 
                    src={forwarder.image} 
                    alt={forwarder.model}
                    className="w-full h-full object-cover"
                  />
                  {forwarder.badge && (
                    <Badge className="absolute top-4 right-4">
                      {forwarder.badge}
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{forwarder.model}</CardTitle>
                      <CardDescription>{forwarder.type}</CardDescription>
                    </div>
                    <Badge variant="outline">{forwarder.price}</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Key Features</h4>
                    <ul className="space-y-1">
                      {forwarder.features.map((feature, index) => (
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
                        <p className="text-sm font-semibold">{forwarder.specs.enginePower}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Weight className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Load Capacity</p>
                        <p className="text-sm font-semibold">{forwarder.specs.loadCapacity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Operating Weight</p>
                        <p className="text-sm font-semibold">{forwarder.specs.weight}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Crane Reach</p>
                        <p className="text-sm font-semibold">{forwarder.specs.craneReach}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button asChild className="flex-1">
                      <Link href={`/equipment/new/forwarders/${forwarder.id}`}>
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
            <h2 className="text-3xl font-bold mb-4">Compare Forwarders</h2>
            <p className="text-lg text-muted-foreground">
              Compare specifications and features to find the perfect forwarder for your operation.
            </p>
          </div>
          <EquipmentComparison />
        </div>
      </section>

      {/* Why EcoLog Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose EcoLog Forwarders?</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Superior Load Capacity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    EcoLog forwarders are designed to carry maximum payloads while maintaining stability 
                    and maneuverability in challenging terrain.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      Optimized weight distribution
                    </li>
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      Strong, lightweight frames
                    </li>
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      Efficient loading systems
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Crane Technology</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Powerful, precise cranes with exceptional reach and control make loading and 
                    unloading faster and safer.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      Smooth, responsive controls
                    </li>
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      Extended reach capability
                    </li>
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      Robust grapple design
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Low Ground Pressure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Engineered to minimize environmental impact with wide tires and balanced 
                    weight distribution for superior flotation.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      8-wheel drive system
                    </li>
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      Portal axles standard
                    </li>
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      Track option available
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Operator Comfort</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Spacious, ergonomic cabs with excellent visibility and comfort features 
                    reduce operator fatigue and increase productivity.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      Suspended, rotating seat
                    </li>
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      Climate control system
                    </li>
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      Low noise levels
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
              Ready to Increase Your Transport Efficiency?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Our EcoLog forwarders deliver the performance and reliability you need. 
              Contact us to find the right model for your logging operation.
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
              <Link href="/equipment/new/harvesters">
                <div className="text-left">
                  <div className="font-semibold">EcoLog Harvesters</div>
                  <div className="text-sm text-muted-foreground">High-performance harvesting</div>
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