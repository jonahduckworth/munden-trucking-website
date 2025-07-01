import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, Users, Briefcase, Heart, GraduationCap, TrendingUp } from "lucide-react"
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "Careers | Join Our Team at Munden Truck & Equipment",
  description: "Explore career opportunities at Munden Truck & Equipment Ltd. Join our team of skilled technicians, drivers, and professionals in Kamloops, BC.",
  openGraph: {
    title: "Careers at Munden Truck & Equipment Ltd.",
    description: "Join a leader in truck repair and forestry equipment. We offer competitive wages, benefits, and career growth opportunities.",
  },
}

// In production, this would come from a database
const jobOpenings = [
  {
    id: 1,
    title: "Heavy Duty Mechanic",
    department: "Service",
    location: "Kamloops, BC",
    type: "Full-time",
    experience: "3-5 years",
    salary: "$35-45/hour",
    description: "We're seeking an experienced heavy duty mechanic to join our service team. The ideal candidate will have experience with diesel engines, hydraulic systems, and commercial vehicle repairs.",
    requirements: [
      "Red Seal certification or equivalent",
      "Experience with diesel engine diagnostics",
      "Strong problem-solving skills",
      "Valid driver's license",
      "Ability to work independently and in a team"
    ]
  },
  {
    id: 2,
    title: "CVIP Inspector",
    department: "Inspection",
    location: "Kamloops, BC",
    type: "Full-time",
    experience: "5+ years",
    salary: "$38-48/hour",
    description: "Looking for a certified CVIP inspector to conduct commercial vehicle inspections. Must have thorough knowledge of BC inspection standards and regulations.",
    requirements: [
      "Valid CVIP Inspector certification",
      "Minimum 5 years inspection experience",
      "Excellent attention to detail",
      "Strong communication skills",
      "Computer literacy"
    ]
  },
  {
    id: 3,
    title: "Log Truck Driver",
    department: "Transportation",
    location: "BC Interior",
    type: "Full-time",
    experience: "2+ years",
    salary: "$30-38/hour",
    description: "Experienced log truck driver needed for our hauling division. Must have clean driving record and experience with off-highway logging roads.",
    requirements: [
      "Class 1 license with air brake endorsement",
      "Clean driving abstract",
      "Experience with log hauling",
      "Physical fitness for loading/unloading",
      "Strong safety focus"
    ]
  },
  {
    id: 4,
    title: "Parts Counter Person",
    department: "Parts",
    location: "Kamloops, BC",
    type: "Full-time",
    experience: "2-3 years",
    salary: "$25-30/hour",
    description: "Join our parts team to help customers find the right parts and manage inventory. Experience with heavy duty truck parts preferred.",
    requirements: [
      "Customer service experience",
      "Knowledge of truck parts",
      "Computer skills",
      "Organizational abilities",
      "Team player attitude"
    ]
  }
]

const benefits = [
  {
    icon: Heart,
    title: "Health & Dental",
    description: "Comprehensive health and dental coverage for you and your family"
  },
  {
    icon: DollarSign,
    title: "Competitive Wages",
    description: "Industry-leading wages with regular performance reviews"
  },
  {
    icon: GraduationCap,
    title: "Training & Development",
    description: "Ongoing training and professional development opportunities"
  },
  {
    icon: Clock,
    title: "Work-Life Balance",
    description: "Flexible scheduling and paid time off"
  },
  {
    icon: Users,
    title: "Team Environment",
    description: "Supportive team culture with experienced professionals"
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Clear paths for advancement within the company"
  }
]

export default function CareersPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Careers", url: "https://mundentruckequipment.com/careers" }
  ]

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      
      <section className="py-12">
        <div className="container">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Build Your Career with Munden
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Join a team that values expertise, safety, and professional growth. 
              We&apos;re always looking for talented individuals to strengthen our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="#openings">View Open Positions</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:careers@mundentruckequipment.com">Submit Resume</a>
              </Button>
            </div>
          </div>

          {/* Why Work With Us */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Why Work at Munden?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit) => {
                const Icon = benefit.icon
                return (
                  <Card key={benefit.title}>
                    <CardHeader>
                      <Icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{benefit.description}</CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Current Openings */}
          <div id="openings" className="scroll-mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Current Openings</h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              {jobOpenings.map((job) => (
                <Card key={job.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{job.department}</Badge>
                          <Badge variant="outline">{job.type}</Badge>
                        </div>
                      </div>
                      <Button asChild>
                        <a href={`mailto:careers@mundentruckequipment.com?subject=Application for ${job.title}`}>
                          Apply Now
                        </a>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                    
                    <p className="mb-4">{job.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <Card className="mt-16 max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">How to Apply</CardTitle>
              <CardDescription>
                Join our team in three easy steps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Submit Application</h3>
                  <p className="text-sm text-muted-foreground">
                    Send your resume and cover letter to our careers email
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">Interview Process</h3>
                  <p className="text-sm text-muted-foreground">
                    Meet with our team to discuss your experience and goals
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">Join the Team</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete onboarding and start your career at Munden
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Don&apos;t See Your Perfect Role?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We&apos;re always interested in meeting talented professionals. Send us your resume 
              and let us know how you can contribute to our team.
            </p>
            <Button size="lg" asChild>
              <a href="mailto:careers@mundentruckequipment.com">
                Send Your Resume
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}