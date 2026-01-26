import { Metadata } from "next";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ChevronLeft,
  Phone,
  MapPin,
  Clock,
  AlertTriangle,
  Truck,
  Wrench,
  Zap,
  Navigation,
  CheckCircle2,
  Users,
  Shield,
} from "lucide-react";
import StructuredData, {
  serviceSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/components/seo/StructuredData";
import { CTASection } from "@/components/services/CTASection";

export const metadata: Metadata = {
  title: "24/7 Mobile Service | Roadside Truck Repair | Munden Truck",
  description:
    "24/7 mobile truck repair service in Kamloops and BC Interior. Fully equipped service trucks, fast response times, and expert technicians available anytime.",
  openGraph: {
    title: "24/7 Mobile Service | Munden Truck & Equipment Ltd.",
    description:
      "24/7 mobile breakdown service for commercial trucks. Service trucks available throughout the BC Interior.",
  },
};

const mobileServices = [
  {
    icon: Truck,
    title: "Fully Equipped Service Trucks",
    description:
      "Our mobile units carry diagnostic tools, common parts, and everything needed for roadside repairs",
    available: "24/7",
  },
  {
    icon: Zap,
    title: "Rapid Response",
    description: "Average response time under 60 minutes in Kamloops area",
    available: "Guaranteed",
  },
  {
    icon: MapPin,
    title: "Wide Coverage Area",
    description:
      "Service throughout Kamloops and 200km radius including all major highways",
    available: "All weather",
  },
  {
    icon: Wrench,
    title: "On-Site Repairs",
    description:
      "Most repairs completed at your breakdown location to minimize downtime",
    available: "Professional",
  },
];

const commonRepairs = [
  {
    category: "Engine & Powertrain",
    issues: [
      "Engine won't start",
      "Overheating",
      "Loss of power",
      "Transmission failure",
      "Clutch problems",
      "Turbo failure",
    ],
  },
  {
    category: "Electrical & Starting",
    issues: [
      "Dead battery",
      "Alternator failure",
      "Starter problems",
      "Wiring issues",
      "ECM failures",
      "Lighting problems",
    ],
  },
  {
    category: "Air & Brake Systems",
    issues: [
      "Air leak repairs",
      "Brake chamber replacement",
      "Frozen air lines",
      "Compressor failure",
      "Emergency brake release",
      "Brake adjustment",
    ],
  },
  {
    category: "Tires & Wheels",
    issues: ["Wheel bearing failure", "Hub repairs", "Tire pressure issues"],
  },
  {
    category: "Cooling & Fluids",
    issues: [
      "Coolant leaks",
      "Radiator repairs",
      "Hose replacement",
      "Oil leaks",
      "Hydraulic leaks",
      "DEF system issues",
    ],
  },
];

const responseProcess = [
  {
    number: "1",
    title: "Emergency Call",
    description: "Call our 24/7 hotline and describe your situation",
    time: "Immediate",
  },
  {
    number: "2",
    title: "Dispatch",
    description: "Nearest available service truck dispatched to your location",
    time: "5 minutes",
  },
  {
    number: "3",
    title: "En Route",
    description: "Technician on the way with real-time updates",
    time: "Average 45 min",
  },
  {
    number: "4",
    title: "Diagnosis",
    description: "Quick assessment and repair plan",
    time: "15 minutes",
  },
  {
    number: "5",
    title: "Repair",
    description: "Professional repair to get you moving",
    time: "Varies",
  },
  {
    number: "6",
    title: "Follow-up",
    description: "Ensure safe operation and schedule any needed work",
    time: "Ongoing",
  },
];

export default function MobileServicePage() {
  const serviceData = serviceSchema({
    name: "24/7 Mobile Service",
    description:
      "Emergency mobile truck repair service throughout the BC Interior. Fully equipped service trucks available 24/7.",
    serviceType: "Mobile Repair Service",
    areaServed: "200km",
  });

  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Services", url: "https://mundentruckequipment.com/services" },
    {
      name: "Mobile Service",
      url: "https://mundentruckequipment.com/services/mobile-service",
    },
  ];

  const faqs = [
    {
      question: "What areas do you service?",
      answer:
        "We provide 24/7 mobile service throughout Kamloops and within a 200km radius. This includes all major highways and logging roads in the BC Interior.",
    },
    {
      question: "What's your average response time?",
      answer:
        "Our average response time is under 60 minutes within the Kamloops area. Response times may vary based on location, weather conditions, and technician availability.",
    },
    {
      question: "Can you repair any truck make or model?",
      answer:
        "Yes, our technicians are trained and equipped to handle all makes and models of commercial trucks and heavy equipment. We carry common parts for most major brands.",
    },
    {
      question: "What if my truck needs to be towed?",
      answer:
        "If your vehicle cannot be repaired on-site, we'll coordinate towing to our facility and provide priority service to minimize your downtime.",
    },
    {
      question: "Do you offer service contracts?",
      answer:
        "Yes, we offer priority service contracts for fleets with guaranteed response times and discounted rates. Contact us for details.",
    },
  ];

  return (
    <>
      <StructuredData
        data={[serviceData, breadcrumbSchema(breadcrumbs), faqSchema(faqs)]}
      />

      <section className="pt-6 pb-12">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            {/* Hero Section */}
            <div className="text-center mb-12">
              <Badge className="mb-4" variant="destructive">
                24/7 Emergency Service
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Mobile Service
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                When you're broken down on the road, every minute counts. Our
                24/7 mobile service trucks come to you with expert technicians
                and the parts needed to get you back on the road.
              </p>

              {/* Emergency CTA */}
              <Alert className="max-w-2xl mx-auto mb-8 border-red-200 bg-red-50 dark:bg-red-950/20">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-left">
                  <strong className="block mb-2">
                    Need Emergency Assistance Now?
                  </strong>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      size="lg"
                      variant="destructive"
                      asChild
                      className="flex-1 h-auto py-4"
                    >
                      <a href="tel:250-828-2268">
                        <Phone className="mr-2 h-4 w-4" />
                        Call: 250-828-2268
                      </a>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                      className="flex-1 h-auto py-4"
                    >
                      <Link href="/about/contact">
                        <MapPin className="mr-2 h-4 w-4" />
                        Send Location
                      </Link>
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {mobileServices.map((service) => {
                const Icon = service.icon;
                return (
                  <Card key={service.title}>
                    <CardHeader>
                      <Icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <Badge variant="secondary" className="w-fit">
                        {service.available}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Service Truck Capabilities */}
            <Card className="mb-12 border-primary">
              <CardHeader className="text-center">
                <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">
                  Our Mobile Service Trucks
                </CardTitle>
                <CardDescription className="text-lg">
                  Fully equipped rolling workshops ready to handle most roadside
                  repairs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">Diagnostic Equipment</h3>
                    <p className="text-sm text-muted-foreground">
                      Advanced computer diagnostics for all major truck makes
                      and models
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">
                      Common Parts Inventory
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Stocked with frequently needed parts like belts, hoses,
                      batteries, and brake components
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold mb-2">Professional Tools</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete tool sets for engine, electrical, brake, and
                      hydraulic repairs
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coverage Map */}
            <Card className="mb-12">
              <CardHeader>
                <Navigation className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-2xl">
                  Service Coverage Area
                </CardTitle>
                <CardDescription>
                  24/7 mobile service throughout the BC Interior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-8 text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-lg font-semibold mb-2">
                    200km Service Radius from Kamloops
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Including all major highways: Trans-Canada, Coquihalla,
                    Yellowhead, and logging roads
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                    <div className="text-center">
                      <p className="font-semibold">Kamloops</p>
                      <p className="text-sm text-muted-foreground">
                        &lt; 30 min
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">Merritt</p>
                      <p className="text-sm text-muted-foreground">45-60 min</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">Chase</p>
                      <p className="text-sm text-muted-foreground">45 min</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">Barriere</p>
                      <p className="text-sm text-muted-foreground">60 min</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Common Emergency Repairs */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">
                What We Can Repair On-Site
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {commonRepairs.map((category) => (
                  <Card key={category.category}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {category.issues.map((issue) => (
                          <li
                            key={issue}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Response Process */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">
                Our Response Process
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {responseProcess.map((step) => (
                  <div key={step.number} className="text-center">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {step.number}
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {step.description}
                    </p>
                    <Badge variant="outline">{step.time}</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* What to Do Section */}
            <Card className="mb-12 border-orange-500/50 bg-orange-50/50 dark:bg-orange-950/20">
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-orange-600 dark:text-orange-400 mb-2" />
                <CardTitle className="text-2xl">
                  What to Do in a Breakdown
                </CardTitle>
                <CardDescription>
                  Stay safe while waiting for help
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Safety First</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <span className="font-semibold text-primary">1.</span>
                        <span>
                          Move to a safe location off the road if possible
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="font-semibold text-primary">2.</span>
                        <span>
                          Turn on hazard lights and set up warning triangles
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="font-semibold text-primary">3.</span>
                        <span>
                          Stay with your vehicle unless unsafe to do so
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="font-semibold text-primary">4.</span>
                        <span>Call our emergency hotline immediately</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Information We Need</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          Your exact location (highway, kilometer marker)
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Vehicle make, model, and year</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Description of the problem</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Your contact information</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4 max-w-4xl mx-auto">
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
              title="Save Our Emergency Number"
              description="When you're broken down, you need help fast. Save our 24/7 emergency hotline in your phone now."
              variant="primary"
              actions={[
                {
                  label: "Call: 250-828-2268",
                  href: "tel:250-828-2268",
                  variant: "secondary",
                  icon: Phone,
                },
                {
                  label: "Service Department",
                  href: "/services/service-department",
                  variant: "outline",
                  icon: Wrench,
                },
              ]}
            />

            {/* Related Services */}
            <div className="mt-12 pt-12 border-t">
              <h3 className="text-xl font-semibold mb-6">
                Prevent Future Breakdowns
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Service Department
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Full-service repairs with preventive maintenance programs
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/services/service-department">
                        Learn More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Parts Department</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Quality parts to keep your equipment running reliably
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/services/parts-department">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">EcoLog Equipment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      New reliable forestry equipment with full support
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/equipment/ecolog">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
