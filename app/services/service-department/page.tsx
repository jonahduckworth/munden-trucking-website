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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Clock,
  Shield,
  Wrench,
  Award,
  Users,
  ChevronLeft,
  Phone,
  Mail,
  AlertTriangle,
  FileCheck,
  CalendarDays,
  AlertCircle,
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle2,
  FileText,
  BarChart3,
  Truck,
} from "lucide-react";
import StructuredData, {
  serviceSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/components/seo/StructuredData";
import { ProcessTimeline } from "@/components/services/ProcessTimeline";
import { CTASection } from "@/components/services/CTASection";

export const metadata: Metadata = {
  title: "Service Department | Truck & Equipment Repair | Munden Truck",
  description:
    "Full-service truck and heavy equipment repair in Kamloops. CVIP inspections, preventive maintenance. Certified technicians, 24/7 emergency support.",
  openGraph: {
    title: "Service Department | Munden Truck & Equipment Ltd.",
    description:
      "Professional truck and heavy equipment repair services in Kamloops, BC. CVIP certified, preventive maintenance, fleet programs.",
  },
};

// Overview Tab Data
const repairServices = [
  {
    category: "Engine Services",
    services: [
      "Diesel engine diagnostics",
      "Turbocharger repair",
      "Fuel system service",
      "Cooling system repair",
    ],
  },
  {
    category: "Drivetrain",
    services: [
      "Manual & automatic transmission repair",
      "Clutch replacement",
      "Differential service",
      "Driveshaft repair",
      "Transfer case service",
    ],
  },
  {
    category: "Brake Systems",
    services: [
      "Air brake service",
      "Brake chamber replacement",
      "Disc & drum brake repair",
      "ABS diagnostics",
      "Brake fluid flush",
    ],
  },
  {
    category: "Electrical Systems",
    services: [
      "Computer diagnostics",
      "Wiring repairs",
      "Battery service",
      "Alternator & starter repair",
      "Lighting systems",
    ],
  },
  {
    category: "Suspension & Steering",
    services: [
      "Front end alignment",
      "Suspension repair",
      "Steering components",
      "Shock & strut replacement",
      "Leaf spring service",
    ],
  },
  {
    category: "Hydraulic Systems",
    services: [
      "Hydraulic pump repair",
      "Cylinder rebuilding",
      "Hose replacement",
      "System diagnostics",
      "Preventive maintenance",
    ],
  },
  {
    category: "Crane",
    services: [
      "Crane inspections & certifications",
      "Boom repair & maintenance",
      "Hydraulic system service",
      "Wire rope replacement",
      "Load testing",
      "Safety device calibration",
    ],
  },
  {
    category: "Reefers",
    services: [
      "Carrier Transicold service & warranty",
      "Refrigeration unit repair",
      "Temperature control diagnostics",
      "Compressor service",
      "Condenser & evaporator maintenance",
      "Refrigerant charging",
      "Electrical system repair",
      "Insulation & door seal replacement",
    ],
  },
  {
    category: "Welding & Fabricating",
    services: [
      "Frame repairs",
      "Custom fabrication",
      "Aluminum welding",
      "Stainless steel welding",
      "Structural welding",
      "Exhaust system fabrication",
      "Bracket & mount fabrication",
    ],
  },
  {
    category: "Engine & Cab Heaters",
    services: [
      "Cab & engine heater installations (Webasto certified)",
      "Webasto service & warranty repairs",
      "Preventative & seasonal maintenance",
      "Troubleshooting & diagnostics",
      "Coolant heater repair & replacement",
      "Thermostat & control system service",
    ],
  },
  {
    category: "Truck Rigouts",
    services: [
      "Logging truck rigouts",
      "Chassis rigouts & modifications",
      "Lowbed ramps",
      "Fifth wheel installations",
      "Wet kit installations",
      "PTO installs",
      "Hydraulic system installs",
      "Custom truck modifications",
    ],
  },
];

const features = [
  {
    icon: Shield,
    title: "Certified Technicians",
    description:
      "Our team holds multiple certifications and stays current with the latest repair techniques.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    description:
      "We understand downtime costs money. Our efficient service gets you back on the road quickly.",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description:
      "All repairs come with our comprehensive warranty for your peace of mind.",
  },
];

// CVIP Tab Data
const inspectionTypes = [
  {
    title: "Annual CVIP Inspection",
    description: "Required yearly inspection for all commercial vehicles",
    duration: "2-3 hours",
    includes: [
      "Complete vehicle safety inspection",
      "Brake system testing",
      "Steering and suspension check",
      "Lighting and electrical systems",
      "Body and frame inspection",
      "Official CVIP certificate",
    ],
  },
  {
    title: "Semi-Annual Inspection",
    description: "Required for buses and certain commercial vehicles",
    duration: "2-3 hours",
    includes: [
      "All annual inspection items",
      "Enhanced passenger safety checks",
      "Emergency exit verification",
      "Additional brake testing",
      "Detailed undercarriage inspection",
    ],
  },
  {
    title: "Re-Inspection",
    description: "Follow-up inspection after repairs",
    duration: "1-2 hours",
    includes: [
      "Verification of completed repairs",
      "Re-test of failed components",
      "Updated inspection report",
      "New CVIP certificate if passed",
    ],
  },
];

const cvipBenefits = [
  {
    icon: Shield,
    title: "Government Certified",
    description: "Fully licensed and authorized CVIP inspection facility",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Same-day service available with appointment",
  },
  {
    icon: FileCheck,
    title: "Detailed Reports",
    description: "Comprehensive inspection reports for your records",
  },
  {
    icon: CalendarDays,
    title: "Flexible Scheduling",
    description: "Evening and weekend appointments available",
  },
];

// Preventive Maintenance Tab Data
const maintenancePackages = [
  {
    value: "light-duty",
    name: "Light-Duty Maintenance",
    interval: "Every 5,000 km",
    ideal: "Light-duty trucks",
    services: [
      "Engine oil and filter change",
      "Tire rotation and pressure check",
      "Brake inspection",
      "Fluid levels check",
      "Battery test",
      "Visual safety inspection",
    ],
  },
  {
    value: "medium-duty",
    name: "Medium-Duty Maintenance",
    interval: "Every 10,000 km",
    ideal: "Medium-duty commercial vehicles",
    services: [
      "All Medium-Duty services plus:",
      "Transmission service",
      "Coolant system flush",
      "Air filter replacement",
      "Suspension inspection",
      "Exhaust system check",
      "Detailed diagnostic scan",
    ],
  },
  {
    value: "heavy-duty",
    name: "Heavy-Duty Maintenance",
    interval: "Customized schedule",
    ideal: "Heavy-duty trucks & fleets",
    services: [
      "All Medium-Duty services plus:",
      "Differential service",
      "Power steering flush",
      "Fuel system cleaning",
      "Complete electrical check",
      "Hydraulic system service",
      "Predictive maintenance analysis",
    ],
  },
];

const maintenanceBenefits = [
  {
    icon: Shield,
    title: "Prevent Breakdowns",
    description:
      "Catch problems early before they lead to costly roadside failures",
    stat: "70% fewer breakdowns",
  },
  {
    icon: DollarSign,
    title: "Lower Costs",
    description:
      "Regular maintenance costs less than major repairs and downtime",
    stat: "30% cost reduction",
  },
  {
    icon: Clock,
    title: "Maximize Uptime",
    description:
      "Keep your vehicles on the road earning revenue, not in the shop",
    stat: "95% uptime rate",
  },
  {
    icon: TrendingUp,
    title: "Extend Life",
    description: "Proper maintenance can double your equipment's service life",
    stat: "2x longer lifespan",
  },
];

const maintenanceSchedules = {
  "light-duty": [
    { component: "Engine Oil", interval: "5,000 km", critical: true },
    { component: "Tire Rotation", interval: "8,000-10,000 km", critical: false },
    { component: "Brake Inspection", interval: "Every service visit", critical: true },
    { component: "Air Filter", interval: "20,000-25,000 km", critical: false },
    { component: "Coolant", interval: "2 years or 80,000 km", critical: true },
    { component: "Battery Test", interval: "Every 6 months", critical: false },
  ],
  "medium-duty": [
    { component: "Engine Oil", interval: "10,000 km", critical: true },
    { component: "Transmission Service", interval: "40,000-60,000 km", critical: true },
    { component: "Coolant System Flush", interval: "2 years or 120,000 km", critical: true },
    { component: "Air Filter", interval: "15,000-20,000 km", critical: false },
    { component: "Suspension Inspection", interval: "Every 20,000 km", critical: false },
    { component: "Diagnostic Scan", interval: "Every service visit", critical: false },
  ],
  "heavy-duty": [
    { component: "Engine Oil", interval: "Customized by fleet usage", critical: true },
    { component: "Differential Service", interval: "50,000-80,000 km", critical: true },
    { component: "Fuel System Cleaning", interval: "25,000-40,000 km", critical: false },
    { component: "Power Steering Flush", interval: "80,000-100,000 km", critical: false },
    { component: "Electrical System Check", interval: "Quarterly", critical: true },
    { component: "Hydraulic System Service", interval: "Customized by equipment", critical: true },
  ],
} as const;

const fleetBenefits = [
  {
    icon: Clock,
    title: "Minimize Downtime",
    description:
      "Priority service and dedicated bays keep your trucks on the road earning revenue",
  },
  {
    icon: DollarSign,
    title: "Reduce Costs",
    description:
      "Volume discounts, preventive maintenance, and optimized service schedules save money",
  },
  {
    icon: BarChart3,
    title: "Fleet Analytics",
    description:
      "Comprehensive reporting helps you make data-driven decisions about your fleet",
  },
  {
    icon: Shield,
    title: "Compliance Assurance",
    description:
      "Stay ahead of CVIP inspections and regulatory requirements with proactive management",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description:
      "Your personal fleet advisor knows your vehicles and your business needs",
  },
  {
    icon: Wrench,
    title: "Expert Technicians",
    description:
      "Certified mechanics who understand the demands of commercial fleet operations",
  },
];

const fleetServices = [
  "Scheduled preventive maintenance",
  "CVIP inspection management",
  "Emergency breakdown support",
  "Tire management programs",
  "Fluid analysis programs",
  "Warranty administration",
  "Parts inventory management",
  "Mobile service units",
  "Driver vehicle inspection training",
  "Fleet safety programs",
];

export default function ServiceDepartmentPage() {
  const serviceData = serviceSchema({
    name: "Service Department",
    description:
      "Full-service repair shop for all makes and models of trucks and heavy equipment. CVIP certified, preventive maintenance, fleet programs.",
    serviceType: "Automotive Repair",
    areaServed: "250km",
  });

  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Services", url: "https://mundentruckequipment.com/services" },
    {
      name: "Service Department",
      url: "https://mundentruckequipment.com/services/service-department",
    },
  ];

  const faqs = [
    {
      question: "How often do I need a CVIP inspection?",
      answer:
        "Most commercial vehicles require annual inspections. Buses and some other vehicles require semi-annual inspections. Check your vehicle class requirements.",
    },
    {
      question: "What's included in preventive maintenance?",
      answer:
        "Our maintenance programs include oil changes, filter replacements, fluid checks and changes, brake inspections, tire rotations, and comprehensive safety inspections.",
    },
    {
      question: "Do you offer fleet discounts?",
      answer:
        "Yes, we offer volume discounts for fleets starting at 5 vehicles. Contact us for custom pricing based on your fleet size.",
    },
    {
      question: "Can you repair any truck make or model?",
      answer:
        "Yes, our technicians are trained and equipped to handle all makes and models of commercial trucks and heavy equipment.",
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
              <Badge className="mb-4" variant="secondary">
                Full-Service Repair Shop
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Service Department
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Professional repair services for all makes and models of trucks
                and heavy equipment. CVIP certified facility with preventive
                maintenance programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="tel:250-828-2268">
                    <Phone className="mr-2 h-4 w-4" />
                    Call: 250-828-2268
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="mailto:kamloops.shop@mundengroup.ca">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </a>
                </Button>
              </div>
            </div>

            {/* Emergency Service Alert */}
            <Card className="mb-12 border-orange-500/50 bg-orange-50/50 dark:bg-orange-950/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <AlertTriangle className="h-8 w-8 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      24/7 Mobile Service Available
                    </h3>
                    <p className="text-muted-foreground">
                      Breakdown on the road? Our mobile service trucks are ready
                      to help anytime, anywhere.
                    </p>
                  </div>
                  <Button variant="outline" asChild className="hidden sm:flex">
                    <Link href="/services/mobile-service">Mobile Service</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Main Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="cvip">CVIP Inspections</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6">
                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
                  {features.map((feature) => {
                    const Icon = feature.icon;
                    return (
                      <Card key={feature.title} className="text-center">
                        <CardHeader>
                          <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-2">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-lg">
                            {feature.title}
                          </CardTitle>
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

                {/* Services Tabs */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-center mb-8">
                    Our Repair Services
                  </h2>
                  <Tabs defaultValue="engine-services" className="w-full">
                    <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full h-auto">
                      {repairServices.map((category) => (
                        <TabsTrigger
                          key={category.category}
                          value={category.category
                            .toLowerCase()
                            .replace(/\s+/g, "-")}
                        >
                          {category.category.split(" ")[0]}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {repairServices.map((category) => (
                      <TabsContent
                        key={category.category}
                        value={category.category
                          .toLowerCase()
                          .replace(/\s+/g, "-")}
                        className="mt-6"
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle>{category.category}</CardTitle>
                            <CardDescription>
                              Professional {category.category.toLowerCase()}{" "}
                              services for all truck makes and models
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {category.services.map((service) => (
                                <li key={service} className="flex items-center">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                  {service}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </TabsContent>

              {/* CVIP Inspections Tab */}
              <TabsContent value="cvip" className="mt-6">
                {/* Alert */}
                <Alert className="mb-8">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Important:</strong> CVIP inspections are mandatory
                    for all commercial vehicles in BC. Don&apos;t risk fines or
                    being taken out of service - book your inspection today.
                  </AlertDescription>
                </Alert>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {cvipBenefits.map((benefit) => {
                    const Icon = benefit.icon;
                    return (
                      <Card key={benefit.title} className="text-center">
                        <CardHeader>
                          <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-2">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-lg">
                            {benefit.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {benefit.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Inspection Types */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-center mb-8">
                    Inspection Services
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {inspectionTypes.map((type) => (
                      <Card key={type.title} className="h-full">
                        <CardHeader>
                          <CardTitle>{type.title}</CardTitle>
                          <CardDescription>{type.description}</CardDescription>
                          {/* <Badge variant="outline" className="w-fit">
                            Duration: {type.duration}
                          </Badge> */}
                        </CardHeader>
                        <CardContent>
                          <p className="font-medium mb-2">Includes:</p>
                          <ul className="space-y-2">
                            {type.includes.map((item) => (
                              <li
                                key={item}
                                className="flex items-start text-sm"
                              >
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Process Section */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-center mb-8">
                    Our CVIP Inspection Process
                  </h2>
                  <ProcessTimeline
                    steps={[
                      {
                        number: "1",
                        title: "Schedule",
                        description: "Book your appointment online or by phone",
                      },
                      {
                        number: "2",
                        title: "Inspect",
                        description:
                          "Thorough inspection by certified technician",
                      },
                      {
                        number: "3",
                        title: "Report",
                        description: "Detailed report of findings provided",
                      },
                      {
                        number: "4",
                        title: "Certificate",
                        description:
                          "Official CVIP certificate issued if passed",
                      },
                    ]}
                  />
                </div>

                {/* Required Documents */}
                <Card className="mb-12">
                  <CardHeader>
                    <FileText className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-2xl">
                      Required Documents
                    </CardTitle>
                    <CardDescription>
                      Please bring the following items to your inspection
                      appointment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold mb-2">
                          Vehicle Documents
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Vehicle registration</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Insurance documents</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Previous inspection reports</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">
                          Company Information
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>National Safety Code certificate</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Carrier profile information</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Fleet identification</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preventive Maintenance Tab */}
              <TabsContent value="maintenance" className="mt-6">
                {/* Benefits Grid with Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {maintenanceBenefits.map((benefit) => {
                    const Icon = benefit.icon;
                    return (
                      <Card key={benefit.title} className="text-center">
                        <CardHeader>
                          <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                          <CardTitle className="text-lg">
                            {benefit.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-3">
                            {benefit.description}
                          </p>
                          <div className="text-2xl font-bold text-primary">
                            {benefit.stat}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Did You Know Alert */}
                <Card className="mb-12 border-primary/50 bg-primary/5">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <BarChart3 className="h-8 w-8 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg mb-1">
                          Did You Know?
                        </h3>
                        <p className="text-muted-foreground">
                          Vehicles with regular preventive maintenance have 70%
                          fewer breakdowns and last twice as long as those with
                          reactive maintenance only.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Maintenance Packages */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-center mb-8">
                    Maintenance Packages
                  </h2>
                  <Tabs defaultValue="light-duty" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 h-auto">
                      <TabsTrigger value="light-duty">Light-Duty</TabsTrigger>
                      <TabsTrigger value="medium-duty">Medium-Duty</TabsTrigger>
                      <TabsTrigger value="heavy-duty">Heavy-Duty</TabsTrigger>
                    </TabsList>
                    {maintenancePackages.map((pkg) => {
                      const schedule = maintenanceSchedules[pkg.value];

                      return (
                        <TabsContent key={pkg.value} value={pkg.value}>
                          <Card className="mb-12">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <div>
                                  <CardTitle className="text-2xl">
                                    {pkg.name}
                                  </CardTitle>
                                  <CardDescription className="text-lg">
                                    {pkg.interval}
                                  </CardDescription>
                                </div>
                              </div>
                              <p className="text-muted-foreground">
                                Ideal for: {pkg.ideal}
                              </p>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h3 className="font-semibold mb-3">
                                    Included Services:
                                  </h3>
                                  <ul className="space-y-2">
                                    {pkg.services.map((service) => (
                                      <li
                                        key={service}
                                        className="flex items-start gap-2"
                                      >
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm">{service}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="flex items-center justify-center">
                                  <Button asChild>
                                    <Link href="/about/contact">Get Package Quote</Link>
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="mb-12">
                            <CardHeader>
                              <Calendar className="h-8 w-8 text-primary mb-2" />
                              <CardTitle className="text-2xl">
                                Typical Maintenance Schedule
                              </CardTitle>
                              <CardDescription>
                                Recommended service intervals for {pkg.ideal.toLowerCase()}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="overflow-x-auto">
                                <table className="w-full">
                                  <thead>
                                    <tr className="border-b">
                                      <th className="text-left p-2">Component</th>
                                      <th className="text-left p-2">Service Interval</th>
                                      <th className="text-center p-2">Priority</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {schedule.map((item) => (
                                      <tr key={item.component} className="border-b">
                                        <td className="p-2 font-medium">
                                          {item.component}
                                        </td>
                                        <td className="p-2 text-muted-foreground">
                                          {item.interval}
                                        </td>
                                        <td className="p-2 text-center">
                                          {item.critical ? (
                                            <Badge
                                              variant="destructive"
                                              className="text-xs"
                                            >
                                              Critical
                                            </Badge>
                                          ) : (
                                            <Badge
                                              variant="secondary"
                                              className="text-xs"
                                            >
                                              Recommended
                                            </Badge>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              <p className="text-sm text-muted-foreground mt-4">
                                <AlertTriangle className="h-4 w-4 inline mr-1" />
                                Note: Actual intervals may vary based on vehicle usage and
                                operating conditions
                              </p>
                            </CardContent>
                          </Card>
                        </TabsContent>
                      );
                    })}
                  </Tabs>
                </div>

                {/* Process Timeline */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-center mb-8">
                    Getting Started is Easy
                  </h2>
                  <ProcessTimeline
                    steps={[
                      {
                        number: "1",
                        title: "Vehicle Assessment",
                        description:
                          "We evaluate your vehicle's current condition and service history",
                      },
                      {
                        number: "2",
                        title: "Custom Plan",
                        description:
                          "Create a maintenance schedule tailored to your needs",
                      },
                      {
                        number: "3",
                        title: "Schedule Service",
                        description:
                          "Book convenient appointment times that work for you",
                      },
                      {
                        number: "4",
                        title: "Track & Report",
                        description:
                          "Receive detailed reports and reminders for upcoming services",
                      },
                    ]}
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* CTA Section */}
            <CTASection
              title="Ready to Schedule Your Service?"
              description="Our expert technicians are standing by to help keep your equipment running at peak performance."
              variant="primary"
              actions={[
                {
                  label: "Call: 250-828-2268",
                  href: "tel:250-828-2268",
                  variant: "secondary",
                  icon: Phone,
                },
                {
                  label: "Email",
                  href: "mailto:kamloops.shop@mundengroup.ca",
                  variant: "outline",
                  icon: Mail,
                },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
