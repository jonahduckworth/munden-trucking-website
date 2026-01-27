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
import {
  ChevronLeft,
  Phone,
  Trees,
  Truck,
  Award,
  Wrench,
  DollarSign,
  CheckCircle2,
  Shield,
  Leaf,
  Users,
  Package,
} from "lucide-react";
import StructuredData, {
  breadcrumbSchema,
} from "@/components/seo/StructuredData";
import { CTASection } from "@/components/services/CTASection";

export const metadata: Metadata = {
  title: "EcoLog Forestry Equipment | Authorized Dealer | Munden Truck",
  description:
    "Authorized EcoLog dealer in Western Canada. Swedish-engineered harvesters and forwarders with full parts and service support.",
  openGraph: {
    title: "EcoLog Forestry Equipment | Munden Truck & Equipment Ltd.",
    description:
      "Authorized EcoLog dealer offering premium forestry equipment with full local support in BC.",
  },
};

const equipmentCategories = [
  {
    title: "EcoLog Harvesters",
    description:
      "High-performance wheeled harvesters designed for demanding forestry operations",
    icon: Trees,
    models: [
      {
        name: "590G",
        highlight: "Most Popular",
        spec: "206 kW, 20m crane reach",
      },
      { name: "580F", spec: "190 kW, 18m crane reach" },
    ],
    link: "/equipment/harvesters",
    badge: "In Stock",
  },
  {
    title: "EcoLog Forwarders",
    description:
      "Robust forwarders with exceptional load capacity and maneuverability",
    icon: Truck,
    models: [
      { name: "594F", highlight: "High Capacity", spec: "20-ton capacity" },
      { name: "584F", spec: "18-ton capacity" },
    ],
    link: "/equipment/forwarders",
    badge: "Popular",
  },
];

const whyEcoLog = [
  {
    icon: Award,
    title: "Swedish Engineering Excellence",
    description:
      "Built in Sweden with over 30 years of forestry equipment innovation. EcoLog machines are designed to withstand the toughest conditions.",
  },
  {
    icon: Leaf,
    title: "Environmental Leadership",
    description:
      "Industry-leading fuel efficiency and low emissions. EcoLog is committed to sustainable forestry with machines that minimize environmental impact.",
  },
  {
    icon: Users,
    title: "Operator-Focused Design",
    description:
      "Ergonomic cabs with climate control, excellent visibility, and intuitive controls. Designed for long shifts and operator safety.",
  },
  {
    icon: Shield,
    title: "Built for Western Canadian Conditions",
    description:
      "Proven performance in British Columbia's unique terrain and climate. Reliable operation in steep slopes and variable conditions.",
  },
];

const advantages = [
  {
    stat: "30%",
    label: "Better fuel economy",
    description: "Compared to industry average",
  },
  {
    stat: "50%",
    label: "Less downtime",
    description: "With proper maintenance",
  },
  {
    stat: "2x",
    label: "Longer service life",
    description: "Quality that lasts",
  },
  {
    stat: "24/7",
    label: "Support available",
    description: "We're here when you need us",
  },
];

const support = [
  {
    icon: Wrench,
    title: "Factory-Trained Technicians",
    description:
      "Our service team is certified by EcoLog to maintain and repair your equipment to factory specifications.",
  },
  {
    icon: Package,
    title: "Genuine Parts Inventory",
    description:
      "We stock genuine EcoLog parts locally for quick availability and minimal downtime.",
  },
  {
    icon: Truck,
    title: "Mobile Service",
    description:
      "Our mobile service trucks can come to your job site for repairs and maintenance.",
  },
  {
    icon: DollarSign,
    title: "Warranty Support",
    description:
      "Full factory warranty administration and extended warranty options available.",
  },
];

export default function EcoLogPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Equipment", url: "https://mundentruckequipment.com/equipment" },
    {
      name: "EcoLog Forestry",
      url: "https://mundentruckequipment.com/equipment/ecolog",
    },
  ];

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />

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
              <Badge className="mb-4" variant="secondary">
                <Award className="mr-1 h-3 w-3" />
                Authorized Western Canada Dealer
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                EcoLog Forestry Equipment
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Swedish-engineered harvesters and forwarders trusted by forestry
                professionals worldwide. As your authorized EcoLog dealer, we
                provide sales, parts, and service support for all EcoLog
                equipment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/equipment/harvesters">
                    <Trees className="mr-2 h-4 w-4" />
                    View Harvesters
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/equipment/forwarders">
                    <Truck className="mr-2 h-4 w-4" />
                    View Forwarders
                  </Link>
                </Button>
              </div>
            </div>

            {/* Equipment Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {equipmentCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Card key={category.title} className="overflow-hidden">
                    <CardHeader className="bg-muted/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-primary/10 rounded-full">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle>{category.title}</CardTitle>
                            <CardDescription>
                              {category.description}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge>{category.badge}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4 mb-6">
                        {category.models.map((model) => (
                          <div
                            key={model.name}
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-semibold">
                                EcoLog {model.name}
                              </span>
                              {model.highlight && (
                                <Badge variant="secondary" className="text-xs">
                                  {model.highlight}
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {model.spec}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Button asChild className="w-full">
                        <Link href={category.link}>
                          View All {category.title.split(" ")[1]}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Why EcoLog */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">
                Why Choose EcoLog?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {whyEcoLog.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card key={item.title}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-primary/10 rounded-full">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-lg">
                            {item.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* EcoLog Advantages Stats */}
            <Card className="mb-12 border-primary">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  EcoLog Performance Advantages
                </CardTitle>
                <CardDescription className="text-lg">
                  Numbers that make a difference in your operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {advantages.map((advantage) => (
                    <div
                      key={advantage.label}
                      className="text-center p-4 bg-muted/30 rounded-lg"
                    >
                      <div className="text-3xl font-bold text-primary mb-1">
                        {advantage.stat}
                      </div>
                      <p className="font-semibold text-sm">{advantage.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {advantage.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Parts & Service Support */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-4">
                Complete Parts & Service Support
              </h2>
              <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
                As your local authorized dealer, we provide comprehensive
                support to keep your EcoLog equipment running at peak
                performance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {support.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card key={item.title} className="text-center">
                      <CardHeader>
                        <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* CTA Section */}
            <CTASection
              title="Ready to Explore EcoLog Equipment?"
              description="Contact our sales team to discuss your forestry equipment needs. We'll help you find the perfect solution for your operations."
              variant="primary"
              actions={[
                {
                  label: "View Equipment",
                  href: "/equipment/harvesters",
                  variant: "secondary",
                  icon: Trees,
                },
                {
                  label: "Call Sales: 250-828-2268",
                  href: "tel:250-828-2268",
                  variant: "outline",
                  icon: Phone,
                },
              ]}
            />

            {/* Related Links */}
            <div className="mt-12 pt-12 border-t">
              <h3 className="text-xl font-semibold mb-6">
                Browse EcoLog Equipment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Harvesters</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      High-performance wheeled harvesters
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/equipment/harvesters">View Models</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Forwarders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Robust log transport forwarders
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/equipment/forwarders">View Models</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Parts & Service</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Genuine EcoLog parts and expert service
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/services/parts-department">Parts Dept</Link>
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
