import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, Users, Handshake, Trophy, Calendar, Target } from "lucide-react"
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "About Us | Munden Truck & Equipment Ltd.",
  description: "Learn about Munden Truck & Equipment Ltd., your trusted partner for truck repair, CVIP inspections, and forestry equipment in Kamloops, BC since 1994.",
  openGraph: {
    title: "About Munden Truck & Equipment Ltd.",
    description: "30 years of excellence in truck repair and forestry equipment services in the BC Interior.",
  },
}

const stats = [
  { value: "30+", label: "Years in Business" },
  { value: "15+", label: "Expert Technicians" },
  { value: "1000+", label: "Satisfied Customers" },
  { value: "24/7", label: "Emergency Service" },
]

const sections = [
  {
    title: "Our Company",
    description: "Discover our history, values, and commitment to excellence in truck repair and forestry equipment.",
    href: "/about/company",
    icon: Building2,
  },
  {
    title: "Our Team",
    description: "Meet the skilled professionals who make Munden Truck & Equipment a leader in the industry.",
    href: "/about/team",
    icon: Users,
  },
  {
    title: "Industry Partners",
    description: "Learn about our strategic partnerships, including our role as an authorized EcoLog dealer.",
    href: "/about/partners",
    icon: Handshake,
  },
]

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "About", url: "https://mundentruckequipment.com/about" }
  ]

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      
      <section className="py-12">
        <div className="container">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About Munden Truck & Equipment
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              For over 30 years, we&apos;ve been the BC Interior&apos;s trusted partner for 
              professional truck repair, CVIP inspections, log hauling, and forestry equipment.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <Target className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To provide exceptional truck repair and maintenance services while building lasting 
                  relationships with our customers through reliability, expertise, and honest service. 
                  We strive to keep the BC Interior&apos;s commercial vehicles and forestry equipment 
                  operating at peak performance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Trophy className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be the premier destination for commercial vehicle services and forestry equipment 
                  in Western Canada, recognized for our technical excellence, customer-first approach, 
                  and contribution to the success of the trucking and forestry industries.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Why Choose Munden */}
          <div className="bg-muted/30 rounded-lg p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Munden?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Experience</h3>
                <p className="text-sm text-muted-foreground">
                  Three decades of expertise in truck repair and forestry equipment
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Expert Team</h3>
                <p className="text-sm text-muted-foreground">
                  Certified technicians with specialized training and years of experience
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Full Service</h3>
                <p className="text-sm text-muted-foreground">
                  Complete solutions from repairs to equipment sales and log hauling
                </p>
              </div>
            </div>
          </div>

          {/* Section Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <Card key={section.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild>
                      <Link href={section.href}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTA Section */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Experience the Munden Difference?</h3>
              <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                Whether you need expert truck repair, CVIP inspection, or are looking for quality 
                forestry equipment, our team is ready to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link href="/services">View Services</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}