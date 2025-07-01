import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Award, Wrench, Truck, Users, GraduationCap, Star } from "lucide-react"
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "Our Team | Meet the Experts | Munden Truck & Equipment",
  description: "Meet the skilled professionals at Munden Truck & Equipment Ltd. Our certified technicians and experienced staff are dedicated to providing exceptional service.",
  openGraph: {
    title: "Our Team | Munden Truck & Equipment Ltd.",
    description: "Meet the experts who make Munden Truck & Equipment a leader in the industry.",
  },
}

const leadership = [
  {
    name: "Robert Munden",
    title: "Founder & President",
    experience: "30+ years",
    description: "Robert founded Munden Truck & Equipment in 1994 with a vision to provide honest, reliable service to the BC Interior's trucking industry.",
    specialties: ["Business Development", "Industry Relations", "Strategic Planning"]
  },
  {
    name: "Sarah Mitchell",
    title: "General Manager",
    experience: "15 years",
    description: "Sarah oversees daily operations and ensures our commitment to quality service is maintained across all departments.",
    specialties: ["Operations Management", "Customer Relations", "Quality Control"]
  },
  {
    name: "Mike Thompson",
    title: "Service Manager",
    experience: "20 years",
    description: "Mike leads our service department, bringing extensive experience in heavy-duty mechanics and team leadership.",
    specialties: ["Heavy Duty Mechanics", "CVIP Inspections", "Team Leadership"]
  }
]

const departments = [
  {
    name: "Service Department",
    icon: Wrench,
    staff: "8 Certified Technicians",
    description: "Our service team includes Red Seal certified mechanics specializing in diesel engines, hydraulics, electrical systems, and preventive maintenance.",
    highlights: [
      "Average 12+ years experience per technician",
      "Ongoing factory training programs",
      "Specialized diagnostic equipment expertise"
    ]
  },
  {
    name: "Parts Department",
    icon: Truck,
    staff: "3 Parts Specialists",
    description: "Our parts team ensures you get the right components quickly, with extensive knowledge of truck and equipment parts.",
    highlights: [
      "Access to major parts networks",
      "Emergency parts sourcing",
      "Technical parts consultation"
    ]
  },
  {
    name: "Equipment Sales",
    icon: Award,
    staff: "2 Sales Representatives",
    description: "Our equipment specialists help you find the perfect forestry equipment for your needs, backed by extensive product knowledge.",
    highlights: [
      "EcoLog certified sales team",
      "Equipment financing expertise",
      "Custom configuration assistance"
    ]
  },
  {
    name: "Administration",
    icon: Users,
    staff: "4 Support Staff",
    description: "Our administrative team ensures smooth operations, from scheduling to customer service and accounting.",
    highlights: [
      "Dedicated customer service",
      "Efficient scheduling systems",
      "Professional billing support"
    ]
  }
]

const culture = [
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    description: "We invest in ongoing training to keep our team at the forefront of industry developments."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Our success comes from working together, sharing knowledge, and supporting each other."
  },
  {
    icon: Star,
    title: "Excellence Focus",
    description: "Every team member is committed to delivering the highest quality service possible."
  },
  {
    icon: Award,
    title: "Recognition & Growth",
    description: "We recognize achievements and provide clear paths for career advancement."
  }
]

export default function TeamPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "About", url: "https://mundentruckequipment.com/about" },
    { name: "Our Team", url: "https://mundentruckequipment.com/about/team" }
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Behind every successful repair, inspection, and equipment sale is a dedicated 
                professional committed to your success. Meet the people who make it happen.
              </p>
            </div>

            {/* Team Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-1">20+</div>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-1">200+</div>
                  <p className="text-sm text-muted-foreground">Years Combined Experience</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-1">15+</div>
                  <p className="text-sm text-muted-foreground">Certifications</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-primary mb-1">95%</div>
                  <p className="text-sm text-muted-foreground">Staff Retention Rate</p>
                </CardContent>
              </Card>
            </div>

            {/* Leadership Team */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Leadership Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {leadership.map((leader) => (
                  <Card key={leader.name}>
                    <CardHeader>
                      <div className="w-20 h-20 bg-muted rounded-full mb-4 mx-auto" />
                      <CardTitle className="text-center">{leader.name}</CardTitle>
                      <CardDescription className="text-center">
                        {leader.title}
                      </CardDescription>
                      <Badge className="mx-auto mt-2">{leader.experience}</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {leader.description}
                      </p>
                      <div className="space-y-1">
                        {leader.specialties.map((specialty) => (
                          <div key={specialty} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span>{specialty}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Department Overview */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Our Departments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {departments.map((dept) => {
                  const Icon = dept.icon
                  return (
                    <Card key={dept.name}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <Icon className="h-8 w-8 text-primary mb-2" />
                            <CardTitle>{dept.name}</CardTitle>
                            <CardDescription>{dept.staff}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          {dept.description}
                        </p>
                        <ul className="space-y-2">
                          {dept.highlights.map((highlight) => (
                            <li key={highlight} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Company Culture */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Our Culture</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {culture.map((item) => {
                  const Icon = item.icon
                  return (
                    <Card key={item.title} className="text-center">
                      <CardContent className="p-6">
                        <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Join Our Team CTA */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
                <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                  We&apos;re always looking for talented individuals who share our commitment to 
                  excellence. If you&apos;re passionate about the trucking and forestry industries, 
                  we&apos;d love to hear from you.
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/careers">View Career Opportunities</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}