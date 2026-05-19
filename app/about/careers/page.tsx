import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  Wrench,
  Truck,
  Users,
  Shield,
  GraduationCap,
  Clock3,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Careers | Join Our Team | Munden Truck & Equipment",
  description:
    "Explore career opportunities at Munden Truck & Equipment in Kamloops, BC. Join a team focused on safety, craftsmanship, growth, and long-term careers in trucking and heavy equipment.",
  alternates: {
    canonical: "/about/careers",
  },
  openGraph: {
    title: "Careers | Munden Truck & Equipment Ltd.",
    description:
      "Build a long-term career with Munden Truck & Equipment in Kamloops, BC.",
    url: "/about/careers",
  },
};

const highlights = [
  {
    icon: Wrench,
    title: "Meaningful, hands-on work",
    description:
      "Work on the trucks, trailers, and equipment that keep BC businesses moving every day.",
  },
  {
    icon: GraduationCap,
    title: "Training and growth",
    description:
      "We believe in building careers, not just filling positions. Great people get room to grow.",
  },
  {
    icon: Shield,
    title: "Safety-first culture",
    description:
      "We back strong safety practices, proper equipment, and doing the job right the first time.",
  },
  {
    icon: Users,
    title: "Team environment",
    description:
      "Join a hardworking crew that values reliability, respect, and helping each other succeed.",
  },
];

const opportunities = [
  "Commercial transport mechanics",
  "Heavy-duty mechanics and apprentices",
  "Parts and support roles",
  "Shop and operations support",
  "Future opportunities as the company grows",
];

const values = [
  "Take pride in quality workmanship",
  "Show up dependable and ready to help the team",
  "Put safety first for yourself and your coworkers",
  "Care about customers and keeping their equipment moving",
  "Want a long-term career path, not just another job",
];

const processSteps = [
  {
    title: "Reach out",
    description:
      "Email your resume or a short introduction and tell us what kind of role you are interested in.",
  },
  {
    title: "Initial review",
    description:
      "Our team reviews experience, fit, and where your strengths could add value.",
  },
  {
    title: "Conversation",
    description:
      "If there is a fit, we will connect to talk through experience, goals, and next steps.",
  },
  {
    title: "Opportunity match",
    description:
      "We will discuss the best current opportunity, or keep your information on hand for upcoming roles.",
  },
];

export default function CareersPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://mundengroup.ca" },
    { name: "About", url: "https://mundengroup.ca/about" },
    { name: "Careers", url: "https://mundengroup.ca/about/careers" },
  ];

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />

      <section className="pt-6 pb-12">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            <div className="text-center mb-12">
              <Badge className="mb-4">Join Our Team</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Careers at Munden Truck & Equipment</h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We are building long-term careers for hardworking people who care about safety,
                craftsmanship, and keeping customers moving. If that sounds like you, we would love to hear from you.
              </p>
            </div>

            <Card className="mb-12 border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl">Interested? Get in touch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  If you are interested in joining the Munden team, fill out our contact form with a short introduction and let us know what kind of role you are looking for.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild>
                    <Link href="/about/contact">
                      <Mail className="mr-2 h-4 w-4" />
                      Fill Out Contact Form
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="tel:250-828-2268">
                      <Phone className="mr-2 h-4 w-4" />
                      Call 250-828-2268
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-12 overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_.9fr] gap-8 items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Why work with Munden?</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        As a fourth-generation company, Munden understands the value of great people who want more than just a paycheck.
                        We believe in creating careers where team members can build skills, take ownership in their work, and see a future for themselves.
                      </p>
                      <p>
                        Whether your background is in heavy-duty repair, mobile service, parts, or shop support, we are always interested in meeting reliable people who want to grow with a strong Kamloops-based team.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border bg-secondary/40 p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">725 Carrier Street, Kamloops, BC</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock3 className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Schedule</p>
                        <p className="text-sm text-muted-foreground">Full-time opportunities with room to grow</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Truck className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Work</p>
                        <p className="text-sm text-muted-foreground">Commercial trucks, trailers, equipment, and mobile service</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title}>
                    <CardHeader>
                      <Icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Roles we would love to hear about</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {opportunities.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">What we value</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {values.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">What the process looks like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {processSteps.map((step, index) => (
                  <Card key={step.title}>
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2">Step {index + 1}</Badge>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>


          </div>
        </div>
      </section>
    </>
  );
}
