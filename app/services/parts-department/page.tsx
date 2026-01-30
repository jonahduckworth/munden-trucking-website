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
  Package,
  Truck,
  Clock,
  Shield,
  CheckCircle,
  Mail,
  Wrench,
  Search,
  Zap,
  Settings,
  Box,
} from "lucide-react";
import StructuredData, {
  serviceSchema,
  breadcrumbSchema,
} from "@/components/seo/StructuredData";
import { CTASection } from "@/components/services/CTASection";

export const metadata: Metadata = {
  title: "Parts Department | OEM & Aftermarket Parts | Munden Truck",
  description:
    "Quality OEM and aftermarket parts for trucks and heavy equipment in Kamloops. EcoLog forestry equipment parts, hydraulic components, and emergency parts service.",
  openGraph: {
    title: "Parts Department | Munden Truck & Equipment Ltd.",
    description:
      "Quality parts for trucks and heavy equipment. OEM and aftermarket options with expert advice and fast delivery.",
  },
};

const partsCategories = [
  {
    icon: Settings,
    title: "Engine & Drivetrain",
    description:
      "Complete engine components, transmission parts, and drivetrain systems",
    items: [
      "Turbochargers",
      "Fuel injectors",
      "Transmission components",
      "Clutch assemblies",
      "Differential parts",
    ],
  },
  {
    icon: Shield,
    title: "Brake & Safety Systems",
    description: "Air brake components, chambers, and safety equipment",
    items: [
      "Brake chambers",
      "Slack adjusters",
      "Brake drums & rotors",
      "Air compressors",
      "Valves & fittings",
      "ABS components",
    ],
  },
  {
    icon: Zap,
    title: "Electrical Components",
    description: "Batteries, starters, alternators, and wiring systems",
    items: [
      "Heavy-duty batteries",
      "Starters & alternators",
      "ECM modules",
      "Sensors & switches",
      "Wiring harnesses",
      "Lighting systems",
    ],
  },
  {
    icon: Box,
    title: "Hydraulic Systems",
    description: "Pumps, cylinders, hoses, and hydraulic components",
    items: [
      "Hydraulic pumps",
      "Cylinders",
      "Hoses & fittings",
      "Control valves",
      "Filters",
      "Seals & kits",
    ],
  },
  {
    icon: Truck,
    title: "Suspension & Steering",
    description: "Springs, shocks, steering components, and alignment parts",
    items: [
      "Leaf springs",
      "Air springs",
      "Shock absorbers",
      "Tie rod ends",
      "King pins",
      "U-bolts & hardware",
    ],
  },
  {
    icon: Wrench,
    title: "Maintenance Items",
    description:
      "Filters, fluids, lubricants, and routine maintenance supplies",
    items: [
      "Oil & fuel filters",
      "Air filters",
      "Lubricants & fluids",
      "Belts & hoses",
      "Gaskets & seals",
      "Exhaust components",
    ],
  },
];

const features = [
  {
    icon: Package,
    title: "OEM & Aftermarket",
    description:
      "Wide selection of genuine OEM parts and quality aftermarket alternatives to fit your budget",
  },
  {
    icon: Search,
    title: "Expert Parts Lookup",
    description:
      "Our experienced parts team can find the right part for any truck or equipment make and model",
  },
  {
    icon: Clock,
    title: "Fast Availability",
    description:
      "Large local inventory plus overnight delivery options for parts we don't have in stock",
  },
  {
    icon: Truck,
    title: "Delivery Service",
    description:
      "Local delivery available to get you the parts you need without leaving your job site",
  },
];

const brands = [
  "Caterpillar",
  "Cummins",
  "Detroit Diesel",
  "Eaton",
  "Meritor",
  "Bendix",
  "Allison",
  "Dana",
  "EcoLog",
  "Volvo",
  "Mack",
  "Kenworth",
  "Peterbilt",
  "Freightliner",
  "International",
];

export default function PartsDepartmentPage() {
  const serviceData = serviceSchema({
    name: "Parts Department",
    description:
      "Quality OEM and aftermarket parts for trucks and heavy equipment. Expert parts lookup and fast availability.",
    serviceType: "Parts Sales",
    areaServed: "250km",
  });

  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Services", url: "https://mundentruckequipment.com/services" },
    {
      name: "Parts Department",
      url: "https://mundentruckequipment.com/services/parts-department",
    },
  ];

  return (
    <>
      <StructuredData data={[serviceData, breadcrumbSchema(breadcrumbs)]} />

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
                Quality Parts & Expert Service
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Parts Department
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Quality OEM and aftermarket parts for all makes and models of
                trucks and heavy equipment. Our experienced parts team is ready
                to help you find exactly what you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="tel:250-828-2268">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Parts: 250-828-2268
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="mailto:kamloops.parts@mundengroup.ca">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </a>
                </Button>
              </div>
            </div>

            {/* Emergency Parts Alert */}
            <Card className="mb-12 border-primary/50 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Zap className="h-8 w-8 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      Emergency Parts Service
                    </h3>
                    <p className="text-muted-foreground">
                      Breakdown emergency? We can source critical parts quickly
                      to get you back on the road. Call our parts hotline for
                      priority service.
                    </p>
                  </div>
                  <Button variant="default" asChild className="hidden sm:flex">
                    <a href="tel:250-828-2268">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="text-center">
                    <CardHeader>
                      <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-2">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Parts Categories */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">
                Parts Categories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partsCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Card key={category.title} className="h-full">
                      <CardHeader>
                        <Icon className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-lg">
                          {category.title}
                        </CardTitle>
                        <CardDescription>
                          {category.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {category.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* EcoLog Parts */}
            {/* <Card className="mb-12 border-primary">
              <CardHeader className="text-center">
                <Badge className="w-fit mx-auto mb-4">Authorized Dealer</Badge>
                <CardTitle className="text-2xl">
                  EcoLog Forestry Equipment Parts
                </CardTitle>
                <CardDescription className="text-lg">
                  As an authorized EcoLog dealer, we stock genuine parts for
                  harvesters and forwarders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h3 className="font-semibold mb-2">Genuine OEM Parts</h3>
                    <p className="text-sm text-muted-foreground">
                      Factory-original parts that meet exact specifications for
                      optimal performance
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Wear Parts & Consumables
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Cutting teeth, feed rollers, filters, and other high-wear
                      items in stock
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Technical Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Expert guidance on parts selection and installation from
                      trained technicians
                    </p>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <Button asChild>
                    <Link href="/equipment/ecolog">
                      Learn About EcoLog Equipment
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card> */}

            {/* Brands We Support */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">
                Brands We Support
              </h2>
              <Card>
                <CardContent className="p-8">
                  <div className="flex flex-wrap justify-center gap-4">
                    {brands.map((brand) => (
                      <Badge
                        key={brand}
                        variant="outline"
                        className="text-sm py-2 px-4"
                      >
                        {brand}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-center text-muted-foreground mt-6">
                    Don&apos;t see your brand? We can source parts for virtually
                    any make and model.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* How to Order */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">
                How to Order Parts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    step: "1",
                    title: "Contact Us",
                    description:
                      "Call or email with your vehicle info and part requirements",
                  },
                  {
                    step: "2",
                    title: "Part Lookup",
                    description: "Our experts identify the exact part you need",
                  },
                  {
                    step: "3",
                    title: "Quote & Order",
                    description: "Get pricing and place your order",
                  },
                  {
                    step: "4",
                    title: "Pickup or Delivery",
                    description:
                      "Get your parts at our counter or delivered to your location",
                  },
                ].map((item) => (
                  <div key={item.step} className="text-center">
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <Card className="mb-12 bg-muted/30">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Parts Counter Hours
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-medium">12:00 AM - 11:59 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monday</span>
                        <span className="font-medium">12:00 AM - 11:59 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tuesday</span>
                        <span className="font-medium">12:00 AM - 11:59 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wednesday</span>
                        <span className="font-medium">12:00 AM - 11:59 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Thursday</span>
                        <span className="font-medium">12:00 AM - 11:59 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Friday</span>
                        <span className="font-medium">12:00 AM - 11:59 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span className="font-medium">12:00 AM - 11:59 PM</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Emergency parts available after hours - call for
                      assistance
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Contact Parts Department
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <a
                          href="tel:250-828-2268"
                          className="hover:text-primary"
                        >
                          250-828-2268
                        </a>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Have your vehicle year, make, model, and VIN ready for
                        faster service
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <CTASection
              title="Need Parts? We Can Help"
              description="Our knowledgeable parts team is ready to find exactly what you need. Call us today or stop by our parts counter."
              variant="primary"
              actions={[
                {
                  label: "Call Parts: 250-828-2268",
                  href: "tel:250-828-2268",
                  variant: "secondary",
                  icon: Phone,
                },
                {
                  label: "Parts Inquiry",
                  href: "/about/contact",
                  variant: "outline",
                  icon: Package,
                },
              ]}
            />

            {/* Related Services */}
            <div className="mt-12 pt-12 border-t">
              <h3 className="text-xl font-semibold mb-6">Related Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Service Department
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Full-service repairs with factory-trained technicians
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
                    <CardTitle className="text-lg">Mobile Service</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      24/7 roadside assistance with parts on board
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/services/mobile-service">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">EcoLog Equipment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      New forestry equipment with full parts support
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
