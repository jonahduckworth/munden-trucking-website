import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Award, Wrench, DollarSign, Truck, FileText, ChevronLeft, Phone, Trees, CheckCircle2, Calculator, Shield } from "lucide-react"
import StructuredData, { serviceSchema, breadcrumbSchema, faqSchema } from "@/components/seo/StructuredData"
import { ServiceCard } from "@/components/services/ServiceCard"
import { CTASection } from "@/components/services/CTASection"
import { ProcessTimeline } from "@/components/services/ProcessTimeline"

export const metadata: Metadata = {
  title: "Equipment Sales | Authorized EcoLog Dealer | Munden Truck",
  description: "Authorized EcoLog dealer in Western Canada. New and used forestry equipment including harvesters and forwarders. Financing available, trade-ins welcome.",
  openGraph: {
    title: "Equipment Sales - EcoLog Dealer | Munden Truck & Equipment Ltd.",
    description: "Authorized EcoLog dealer offering new and used forestry equipment in BC. Financing available.",
  },
}

const benefits = [
  {
    icon: Award,
    title: "Authorized Dealer",
    description: "Official EcoLog dealer for Western Canada"
  },
  {
    icon: Wrench,
    title: "Full Service Support",
    description: "Parts, service, and warranty support on-site"
  },
  {
    icon: DollarSign,
    title: "Financing Available",
    description: "Flexible financing options to fit your budget"
  },
  {
    icon: Truck,
    title: "Trade-Ins Welcome",
    description: "Competitive trade-in values for your equipment"
  }
]

const equipmentCategories = [
  {
    title: "EcoLog Harvesters",
    description: "High-performance harvesters designed for demanding forestry operations",
    icon: Trees,
    features: [
      "590G - 6-wheel harvester with powerful crane",
      "580F - Versatile harvester for various conditions",
      "570E - Compact harvester for thinning operations",
      "Factory warranty included"
    ],
    link: "/equipment/new/harvesters",
    badge: "In Stock"
  },
  {
    title: "EcoLog Forwarders",
    description: "Robust forwarders with exceptional load capacity and maneuverability",
    icon: Truck,
    features: [
      "594F - 20-ton capacity forwarder",
      "584F - High-performance 18-ton forwarder",
      "574F - Agile 15-ton forwarder",
      "Best-in-class fuel efficiency"
    ],
    link: "/equipment/new/forwarders",
    badge: "Popular"
  },
  {
    title: "Used Equipment",
    description: "Quality pre-owned forestry equipment with warranty options",
    icon: DollarSign,
    features: [
      "Various makes and models",
      "Thoroughly inspected",
      "Warranty options available",
      "Competitive pricing"
    ],
    link: "/equipment/used",
    badge: "Great Value"
  }
]

const purchaseProcess = [
  {
    number: "1",
    title: "Consultation",
    description: "Discuss your needs with our equipment specialists"
  },
  {
    number: "2",
    title: "Equipment Selection",
    description: "Find the perfect machine for your operations"
  },
  {
    number: "3",
    title: "Financing",
    description: "Explore financing options and trade-in values"
  },
  {
    number: "4",
    title: "Delivery",
    description: "Equipment delivered and operator training provided"
  },
  {
    number: "5",
    title: "Support",
    description: "Ongoing parts and service support"
  }
]

const services = [
  {
    icon: FileText,
    title: "Equipment Consultation",
    description: "Expert advice on selecting the right equipment for your operations"
  },
  {
    icon: DollarSign,
    title: "Financing Solutions",
    description: "Work with multiple lenders to find the best financing terms"
  },
  {
    icon: Wrench,
    title: "After-Sales Support",
    description: "Comprehensive parts and service support for all equipment"
  },
  {
    icon: Truck,
    title: "Delivery Service",
    description: "Equipment delivery to your job site anywhere in BC"
  }
]

export default function EquipmentSalesPage() {
  const serviceData = serviceSchema({
    name: "Equipment Sales",
    description: "Authorized EcoLog dealer for new and used forestry equipment in Western Canada.",
    serviceType: "Equipment Sales",
    areaServed: "300km"
  })

  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Services", url: "https://mundentruckequipment.com/services" },
    { name: "Equipment Sales", url: "https://mundentruckequipment.com/services/equipment-sales" }
  ]

  const faqs = [
    {
      question: "What financing options are available?",
      answer: "We work with multiple lenders to offer competitive financing rates. Options include lease-to-own, equipment loans, and flexible payment plans tailored to your cash flow."
    },
    {
      question: "Do you accept trade-ins?",
      answer: "Yes! We offer competitive trade-in values for your existing equipment. Our team will assess your equipment and provide a fair market value that can be applied to your purchase."
    },
    {
      question: "What warranty comes with new EcoLog equipment?",
      answer: "New EcoLog equipment comes with comprehensive factory warranty coverage. Extended warranty options are also available for additional peace of mind."
    },
    {
      question: "Can I test equipment before purchasing?",
      answer: "Absolutely. We can arrange equipment demonstrations at your job site so you can see how the equipment performs in your specific conditions."
    },
    {
      question: "What about parts and service support?",
      answer: "As a full-service dealer, we maintain a comprehensive parts inventory and have certified technicians for all service needs. We also offer service contracts for ongoing support."
    }
  ]

  return (
    <>
      <StructuredData data={[serviceData, breadcrumbSchema(breadcrumbs), faqSchema(faqs)]} />
      
      <section className="py-12">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/services">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Link>
            </Button>

            {/* Hero Section */}
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="secondary">Authorized EcoLog Dealer</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Forestry Equipment Sales
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Your Western Canadian dealer for EcoLog forestry equipment. We offer new and used 
                harvesters, forwarders, and more, backed by expert service and support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/equipment">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Browse Equipment
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:1-800-XXX-XXXX">
                    <Phone className="mr-2 h-4 w-4" />
                    Talk to Sales Team
                  </a>
                </Button>
              </div>
            </div>

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

          {/* Equipment Categories */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Our Equipment Inventory</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {equipmentCategories.map((category) => (
                <ServiceCard
                  key={category.title}
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                  href={category.link}
                  features={category.features}
                  badge={category.badge}
                  ctaText="View Inventory"
                />
              ))}
            </div>
          </div>

          {/* Purchase Process */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Simple Purchase Process</h2>
            <ProcessTimeline steps={purchaseProcess} />
          </div>

          {/* EcoLog Partnership */}
          <Card className="mb-12 overflow-hidden border-primary">
            <div className="bg-primary/10 p-2 text-center">
              <Badge variant="secondary" className="text-sm">Official Western Canada Dealer</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="p-8">
                <Trees className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-bold mb-4">Why Choose EcoLog?</h2>
                <p className="text-muted-foreground mb-6">
                  EcoLog is a world-leading manufacturer of forestry equipment, known for innovative 
                  design, superior quality, and exceptional performance in demanding conditions.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Swedish Engineering Excellence</p>
                      <p className="text-sm text-muted-foreground">Built to withstand the toughest conditions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Environmental Leadership</p>
                      <p className="text-sm text-muted-foreground">Low emissions and fuel-efficient designs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Operator-Focused Design</p>
                      <p className="text-sm text-muted-foreground">Comfort and safety in every detail</p>
                    </div>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/equipment/new">Explore EcoLog Models</Link>
                </Button>
              </div>
              <div className="bg-muted/30 p-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">EcoLog Advantages</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-background rounded-lg">
                      <div className="text-2xl font-bold text-primary">30%</div>
                      <p className="text-sm text-muted-foreground">Better fuel economy</p>
                    </div>
                    <div className="text-center p-4 bg-background rounded-lg">
                      <div className="text-2xl font-bold text-primary">50%</div>
                      <p className="text-sm text-muted-foreground">Less downtime</p>
                    </div>
                    <div className="text-center p-4 bg-background rounded-lg">
                      <div className="text-2xl font-bold text-primary">2x</div>
                      <p className="text-sm text-muted-foreground">Longer service life</p>
                    </div>
                    <div className="text-center p-4 bg-background rounded-lg">
                      <div className="text-2xl font-bold text-primary">24/7</div>
                      <p className="text-sm text-muted-foreground">Support available</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground text-center">
                      Trusted by forestry professionals across Western Canada
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Services Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Complete Sales Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <Card key={service.title}>
                    <CardHeader>
                      <Icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Financial Benefits */}
          <Card className="mb-12 bg-primary/5 border-primary/20">
            <CardHeader>
              <Calculator className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-2xl">Flexible Financing Solutions</CardTitle>
              <CardDescription>
                Make your equipment purchase work for your budget
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Competitive Rates</h3>
                  <p className="text-sm text-muted-foreground">
                    We work with multiple lenders to secure the best rates for your situation
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Flexible Terms</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose from various term lengths and payment schedules to match your cash flow
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Quick Approvals</h3>
                  <p className="text-sm text-muted-foreground">
                    Get financing decisions quickly so you can put equipment to work sooner
                  </p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Button asChild>
                  <Link href="/equipment">Calculate Your Payment</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {faqs.map((faq) => (
                <Card key={faq.question}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <CTASection
            title="Ready to Upgrade Your Equipment?"
            description="Contact our sales team to discuss your equipment needs. We'll help you find the perfect solution for your forestry operations."
            variant="primary"
            actions={[
              {
                label: "View Inventory",
                href: "/equipment",
                variant: "secondary",
                icon: ShoppingCart
              },
              {
                label: "Call Sales Team",
                href: "tel:1-800-XXX-XXXX",
                variant: "outline",
                icon: Phone
              }
            ]}
          />

          {/* Related Services */}
          <div className="mt-12 pt-12 border-t">
            <h3 className="text-xl font-semibold mb-6">Complete Equipment Support</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Equipment Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Factory-trained technicians for all your EcoLog service needs
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/services/repair-shop">Service Department</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Parts Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Genuine EcoLog parts in stock for minimal downtime
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/contact">Contact Parts</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Operator Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Professional training to maximize productivity and safety
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/contact">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  )
}