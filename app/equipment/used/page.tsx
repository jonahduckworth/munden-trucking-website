import { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { StructuredData } from '@/components/seo/StructuredData'
import { CTASection } from '@/components/services/CTASection'
import { 
  ChevronLeft, 
  Filter, 
  Search, 
  Calendar, 
  Clock, 
  DollarSign, 
  Shield,
  CheckCircle,
  AlertCircle,
  Truck,
  TreePine
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Used Forestry Equipment | Pre-Owned Harvesters & Forwarders | Munden Truck',
  description: 'Quality used forestry equipment including harvesters, forwarders, and logging trucks. All equipment inspected and serviced. Warranty available.',
}

// Sample used equipment data - in production this would come from a database
const usedEquipment = [
  {
    id: 'used-1',
    make: 'EcoLog',
    model: '580E',
    type: 'Harvester',
    year: 2019,
    hours: 4500,
    price: '$285,000',
    status: 'certified',
    features: [
      'Recent engine service',
      'New harvesting head',
      'Warranty available',
      'Ready to work'
    ],
    condition: 'Excellent'
  },
  {
    id: 'used-2',
    make: 'John Deere',
    model: '1910G',
    type: 'Forwarder',
    year: 2018,
    hours: 5200,
    price: '$225,000',
    status: 'as-is',
    features: [
      '20-ton capacity',
      'IBC control system',
      'Good tires',
      'Strong crane'
    ],
    condition: 'Very Good'
  },
  {
    id: 'used-3',
    make: 'Ponsse',
    model: 'Bear',
    type: 'Harvester',
    year: 2017,
    hours: 6800,
    price: '$195,000',
    status: 'certified',
    features: [
      'H7 harvesting head',
      'Recent hydraulic work',
      'New tracks',
      'Operator ready'
    ],
    condition: 'Good'
  },
  {
    id: 'used-4',
    make: 'Komatsu',
    model: '845',
    type: 'Forwarder',
    year: 2020,
    hours: 3200,
    price: '$315,000',
    status: 'certified',
    features: [
      'Low hours',
      'Like new condition',
      'Full service history',
      'Extended warranty'
    ],
    condition: 'Excellent'
  }
]

export default function UsedEquipmentPage() {
  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Used Forestry Equipment',
    description: 'Pre-owned forestry equipment available at Munden Truck & Equipment',
    numberOfItems: usedEquipment.length,
    itemListElement: usedEquipment.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: `${item.year} ${item.make} ${item.model}`,
        description: `Used ${item.type} with ${item.hours} hours`,
        brand: {
          '@type': 'Brand',
          name: item.make
        },
        offers: {
          '@type': 'Offer',
          price: item.price.replace('$', '').replace(',', ''),
          priceCurrency: 'CAD',
          availability: 'https://schema.org/InStock',
          itemCondition: `https://schema.org/${item.condition === 'Excellent' ? 'NewCondition' : 'UsedCondition'}`,
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
        name: 'Used Equipment',
        item: 'https://mundentruckandequipment.com/equipment/used'
      }
    ]
  }

  return (
    <>
      <StructuredData data={productListSchema} />
      <StructuredData data={breadcrumbSchema} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-50 to-background py-12">
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
              <Shield className="mr-1 h-3 w-3" />
              Inspected & Certified
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Used Forestry Equipment
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Quality pre-owned harvesters, forwarders, and logging equipment. 
              All machines thoroughly inspected with warranty options available.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="#inventory">
                  View Inventory
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Sell Your Equipment
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Certified Pre-Owned</h3>
              <p className="text-sm text-muted-foreground">
                Multi-point inspection on all equipment
              </p>
            </div>
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Best Value</h3>
              <p className="text-sm text-muted-foreground">
                Competitive pricing and financing available
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Warranty Options</h3>
              <p className="text-sm text-muted-foreground">
                Extended warranties on select equipment
              </p>
            </div>
            <div className="text-center">
              <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Trade-Ins Welcome</h3>
              <p className="text-sm text-muted-foreground">
                Get top dollar for your current equipment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Filter Equipment</h2>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="search" placeholder="Model or keyword..." className="pl-8" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Equipment Type</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="harvester">Harvesters</SelectItem>
                    <SelectItem value="forwarder">Forwarders</SelectItem>
                    <SelectItem value="skidder">Skidders</SelectItem>
                    <SelectItem value="processor">Processors</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="make">Make</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="make">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Makes</SelectItem>
                    <SelectItem value="ecolog">EcoLog</SelectItem>
                    <SelectItem value="johndeere">John Deere</SelectItem>
                    <SelectItem value="ponsse">Ponsse</SelectItem>
                    <SelectItem value="komatsu">Komatsu</SelectItem>
                    <SelectItem value="tigercat">Tigercat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="year">Year Range</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="year">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="2020+">2020 and newer</SelectItem>
                    <SelectItem value="2015-2019">2015-2019</SelectItem>
                    <SelectItem value="2010-2014">2010-2014</SelectItem>
                    <SelectItem value="older">Before 2010</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Max Price</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="price">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Price</SelectItem>
                    <SelectItem value="100k">Under $100,000</SelectItem>
                    <SelectItem value="200k">Under $200,000</SelectItem>
                    <SelectItem value="300k">Under $300,000</SelectItem>
                    <SelectItem value="400k">Under $400,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {usedEquipment.length} of {usedEquipment.length} equipment
              </p>
              <Button variant="link" size="sm">
                Clear all filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Grid */}
      <section id="inventory" className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {usedEquipment.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-video relative bg-muted">
                  {/* In production, use actual images */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {item.type === 'Harvester' ? (
                      <TreePine className="h-20 w-20 text-muted-foreground/20" />
                    ) : (
                      <Truck className="h-20 w-20 text-muted-foreground/20" />
                    )}
                  </div>
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <Badge variant={item.status === 'certified' ? 'default' : 'secondary'}>
                      {item.status === 'certified' ? 'Certified' : 'As-Is'}
                    </Badge>
                    <Badge variant="outline" className="bg-background">
                      {item.condition}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">
                        {item.year} {item.make} {item.model}
                      </CardTitle>
                      <CardDescription>{item.type}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{item.price}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{item.hours.toLocaleString()} hrs</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{item.year}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Highlights</h4>
                    <ul className="space-y-1">
                      {item.features.map((feature, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center">
                          <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button asChild className="flex-1">
                      <Link href={`/equipment/used/${item.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/contact">
                        Inquire
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">
              Load More Equipment
            </Button>
          </div>
        </div>
      </section>

      {/* Certification Process */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Our Certification Process</h2>
              <p className="text-lg text-muted-foreground">
                Every certified pre-owned machine undergoes our comprehensive inspection
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <CardTitle>150-Point Inspection</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive mechanical, hydraulic, and electrical system checks by certified technicians.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <CardTitle>Service & Repairs</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    All necessary repairs completed using genuine parts. Full service history documented.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <CardTitle>Field Testing</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Equipment tested under working conditions to ensure performance meets our standards.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <CardTitle>Warranty Coverage</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Certified equipment includes warranty options for major components and systems.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trade-In Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-bold mb-4">Trade-In Your Equipment</h2>
                <p className="text-muted-foreground mb-6">
                  Get top dollar for your current equipment. We accept trade-ins on all purchases 
                  and offer competitive valuations based on current market conditions.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Free equipment appraisal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Competitive trade-in values</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Apply value to any purchase</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>We handle all paperwork</span>
                  </li>
                </ul>
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Get Trade-In Value
                  </Link>
                </Button>
              </div>
              <div className="bg-muted/50 p-8 lg:p-12 flex items-center justify-center">
                <div className="text-center">
                  <DollarSign className="h-24 w-24 text-primary mx-auto mb-4" />
                  <p className="text-2xl font-bold mb-2">Fair Market Values</p>
                  <p className="text-muted-foreground">
                    Based on equipment condition, hours, and current demand
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Can't Find What You're Looking For?"
        description="Let us know what equipment you need. With our industry connections, we can often source specific machines to meet your requirements."
        variant="primary"
        actions={[
          {
            label: 'Contact Us',
            href: '/contact',
            variant: 'secondary' as const
          },
          {
            label: 'View New Equipment',
            href: '/equipment/new',
            variant: 'outline' as const
          }
        ]}
      />
      
      {/* Info Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-3 p-6 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-semibold">Important Information</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• All equipment subject to prior sale</li>
                  <li>• Prices do not include applicable taxes or delivery</li>
                  <li>• Financing subject to credit approval</li>
                  <li>• Equipment specifications subject to verification</li>
                  <li>• Photos may not represent actual equipment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}