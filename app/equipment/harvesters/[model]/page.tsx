import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { SpecificationTable } from "@/components/equipment/SpecificationTable";
import { StructuredData } from "@/components/seo/StructuredData";
import { absoluteUrl, siteUrl } from "@/lib/site";
import {
  ChevronLeft,
  Download,
  Phone,
  Calendar,
  TreePine,
  Weight,
  Gauge,
  Shield,
  Fuel,
  CheckCircle,
} from "lucide-react";

// Harvester data - in production this would come from a database
const harvesters = {
  "590g": {
    model: "EcoLog 590G",
    type: "6-Wheel Harvester",
    tagline: "Ultimate productivity meets advanced technology",
    description:
      "The EcoLog 590G represents the pinnacle of harvester technology. With its powerful 6-wheel drive system and extended crane reach, it's designed for maximum productivity in demanding forestry operations.",
    image: "/images/equipment/590g-harvester.jpg",
    brochure: "/brochures/ecolog-500-series-harvesters.pdf",
    features: [
      "Stage V compliant engine with 210 kW power output",
      "6-wheel drive for superior traction and stability",
      "Extended crane reach up to 11m for maximum coverage",
      "Comfortable and ergonomic cab with AutoClimate",
      "Advanced control system with automated functions",
      "Low ground pressure design for sensitive terrain",
    ],
    specifications: {
      Engine: {
        "Make & Model": "Stage V compliant diesel",
        "Power Output": "210 kW (281 hp)",
        Torque: "1,180 Nm",
        "Emission Standard": "Stage V / Tier 4 Final",
        "Fuel Tank Capacity": "500 L",
      },
      Crane: {
        Model: "EcoLog 250F",
        Reach: "11 m",
        "Lifting Torque": "250 kNm",
        "Slewing Torque": "55 kNm",
        Rotation: "360° continuous",
      },
      "Harvester Head": {
        "Compatible Models": "EcoLog 661LF, Waratah H480C",
        "Max Cutting Diameter": "750 mm",
        "Feed Speed": "5.0 m/s",
        "Feed Force": "25 kN",
      },
      Dimensions: {
        Length: "8,500 mm",
        Width: "3,000 mm",
        "Transport Height": "3,900 mm",
        "Ground Clearance": "700 mm",
        Weight: "21,500 kg",
      },
      Hydraulics: {
        "System Pressure": "285 bar",
        "Pump Capacity": "450 l/min",
        "Tank Volume": "280 L",
      },
    },
  },
  "580g": {
    model: "EcoLog 580G",
    type: "6-Wheel Harvester",
    tagline: "Versatile performance for diverse operations",
    description:
      "The EcoLog 580G is a versatile 6-wheel harvester that excels in various forest conditions. Its balanced design and advanced features make it perfect for both thinning and final felling operations.",
    image: "/images/equipment/580g-harvester.jpg",
    brochure: "/brochures/ecolog-500-series-harvesters.pdf",
    features: [
      "Stage V compliant engine with 190 kW power output",
      "Versatile 6-wheel configuration for all terrains",
      "Efficient fuel consumption with ECO mode",
      "Spacious operator cabin with excellent visibility",
      "Easy maintenance access points",
      "Proven reliability in demanding conditions",
    ],
    specifications: {
      Engine: {
        "Make & Model": "Stage V compliant diesel",
        "Power Output": "190 kW (255 hp)",
        Torque: "1,050 Nm",
        "Emission Standard": "Stage V / Tier 4 Final",
        "Fuel Tank Capacity": "450 L",
      },
      Crane: {
        Model: "EcoLog 230F",
        Reach: "11 m",
        "Lifting Torque": "230 kNm",
        "Slewing Torque": "50 kNm",
        Rotation: "360° continuous",
      },
      "Harvester Head": {
        "Compatible Models": "EcoLog 661LF, Waratah H470C",
        "Max Cutting Diameter": "650 mm",
        "Feed Speed": "4.5 m/s",
        "Feed Force": "22 kN",
      },
      Dimensions: {
        Length: "8,200 mm",
        Width: "2,900 mm",
        "Transport Height": "3,800 mm",
        "Ground Clearance": "680 mm",
        Weight: "20,000 kg",
      },
      Hydraulics: {
        "System Pressure": "280 bar",
        "Pump Capacity": "420 l/min",
        "Tank Volume": "260 L",
      },
    },
  },
  "688g": {
    model: "EcoLog 688G",
    type: "8-Wheel Harvester",
    tagline: "Strong, stable and gentle",
    description:
      "The EcoLog 688G is our powerful eight-wheeled harvester, specifically designed to deliver maximum performance and traction with minimum ground impact. Perfect for working on challenging and steep terrain as well as on sensitive soils. With its modern cab, versatility, and reliable Volvo Penta D8 engine, the 688G is ready to take on the very toughest jobs – day after day.",
    image: "/images/equipment/688g-harvester.jpg",
    brochure: "/brochures/ecolog-688g.pdf",
    features: [
      "Volvo Penta D8 engine with 210 kW (286 hp) power output",
      "8-wheel drive for superior traction on steep and sensitive terrain",
      "300 kNm gross lifting torque crane with 10/11m reach",
      "Selectable driving modes: Comfort, Balanced, Dynamic + Boost",
      "350° rotating cab with ±19° sideways tilt",
      "Low ground pressure design for minimum soil impact",
      "Forester bucking system with 15.6\" wide touch screen",
      "230 kN tractive force for extreme conditions",
    ],
    specifications: {
      Engine: {
        "Make & Model": "Volvo Penta D8, 7.7L",
        "Power Output": "210 kW (286 hp) @ 2200 RPM",
        Torque: "1,237 Nm",
        "Emission Standard": "Stage V",
        "Fuel Tank Capacity": "460 L",
      },
      Crane: {
        "Gross Lifting Torque": "300 kNm",
        Reach: "10/11 m",
        "Gross Slewing Torque": "50/70 kNm",
        Rotation: "Continuous",
      },
      "Harvester Head": {
        "Standard Head": "EcoLog EC 661 LF",
        "Optional Head": "EcoLog EC 561 LF",
        "Compatible Log Max": "5000V, 6000V",
      },
      Dimensions: {
        Length: "11,065 mm (total)",
        Width: "2,940/3,000 mm (710/800 tires)",
        "Transport Height": "3,910 mm",
        "Ground Clearance": "620 mm",
        Weight: "23,500 kg",
      },
      Transmission: {
        Type: "Hydrostatic mechanical",
        "Tractive Force": "230 kN",
        "Maximum Speed": "20 km/h",
      },
      Hydraulics: {
        "Crane Pump": "145 cm³",
        "Crane Flow @ 1600 RPM": "275 l/min",
        "Head Pump": "145 cm³",
        "Head Flow @ 1600 RPM": "285 l/min",
        Pressure: "260 bar",
        "Tank Volume": "200 L",
      },
      Cabin: {
        Rotation: "350°",
        "Sideways Tilt": "±19°",
        "Pitch Front/Rear": "15°/16°",
      },
      Wheels: {
        Standard: "8 wheels 710/45 – 26.5\"",
        Option: "8 wheels 800/40 – 26.5\"",
      },
      Electrical: {
        Voltage: "24V",
        Alternator: "130A",
        "Battery Capacity": "2 × 145 Ah",
      },
    },
  },
};

type Props = {
  params: Promise<{
    model: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { model } = await params;
  const harvester = harvesters[model as keyof typeof harvesters];

  if (!harvester) {
    return {
      title: "Harvester Not Found",
    };
  }

  return {
    title: `${harvester.model} Harvester | EcoLog Equipment | Munden Truck`,
    description: `${harvester.model} - ${
      harvester.tagline
    }. ${harvester.description.substring(0, 155)}...`,
    alternates: {
      canonical: `/equipment/harvesters/${model}`,
    },
    openGraph: {
      title: `${harvester.model} Harvester | Munden Truck & Equipment Ltd.`,
      description: harvester.description,
      url: `/equipment/harvesters/${model}`,
      images: [
        {
          url: harvester.image,
          alt: harvester.model,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${harvester.model} Harvester | Munden Truck & Equipment Ltd.`,
      description: harvester.description,
      images: [harvester.image],
    },
  };
}

export default async function HarvesterDetailPage({ params }: Props) {
  const { model } = await params;
  const harvester = harvesters[model as keyof typeof harvesters];

  if (!harvester) {
    notFound();
  }

  const equipmentPageSchema = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    name: `${harvester.model} Harvester`,
    description: harvester.description,
    url: `${siteUrl}/equipment/harvesters/${model}`,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(harvester.image),
    },
    mainEntity: {
      "@type": "Thing",
      name: harvester.model,
      description: harvester.description,
      image: absoluteUrl(harvester.image),
      manufacturer: {
        "@type": "Organization",
        name: "EcoLog",
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mundengroup.ca",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Equipment",
        item: "https://mundengroup.ca/equipment",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Harvesters",
        item: "https://mundengroup.ca/equipment/harvesters",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: harvester.model,
        item: `https://mundengroup.ca/equipment/harvesters/${model}`,
      },
    ],
  };

  return (
    <>
      <StructuredData data={equipmentPageSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Hero Section */}
      <section className="pt-6 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/equipment/harvesters"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Harvesters
          </Link>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
                <Image
                  src={harvester.image}
                  alt={harvester.model}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Info Section */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3">
                  New Equipment
                </Badge>
                <h1 className="text-4xl font-bold mb-2">{harvester.model}</h1>
                <p className="text-xl text-muted-foreground mb-4">
                  {harvester.tagline}
                </p>
                <p className="text-muted-foreground">{harvester.description}</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <Badge variant="secondary" className="text-base px-4 py-2">
                    Contact for Pricing
                  </Badge>
                </div>

                <div className="flex flex-col gap-3">
                  <Button size="lg" asChild className="w-full">
                    <Link href="/about/contact">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Demo
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="w-full"
                  >
                    <a href="tel:250-828-2268">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Sales
                    </a>
                  </Button>
                </div>

                <Button
                  variant="link"
                  className="w-full justify-center"
                  asChild
                >
                  <a href={harvester.brochure} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Brochure (PDF)
                  </a>
                </Button>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Engine Power</p>
                    <p className="font-semibold">
                      {harvester.specifications.Engine["Power Output"]}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TreePine className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Crane Reach</p>
                    <p className="font-semibold">
                      {harvester.specifications.Crane.Reach}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Weight className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Max Cut Diameter</p>
                    <p className="font-semibold">
                      {
                        ("Max Cutting Diameter" in harvester.specifications["Harvester Head"])
                          ? (harvester.specifications["Harvester Head"] as Record<string, string>)["Max Cutting Diameter"]
                          : "N/A"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Operating Weight</p>
                    <p className="font-semibold">
                      {harvester.specifications.Dimensions.Weight}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Information Tabs */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="features" className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                  <CardDescription>
                    Advanced features that set the {harvester.model} apart
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {harvester.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{feature}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <Fuel className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Fuel Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Advanced engine technology and hydraulic systems deliver
                      exceptional fuel economy, reducing operating costs.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Shield className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Safety First</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      ROPS/FOPS certified cabin, excellent visibility, and
                      advanced stability systems ensure operator safety.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <TreePine className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Environmental Care</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Low ground pressure design and Stage V emissions
                      compliance minimize environmental impact.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="specifications">
              <SpecificationTable
                specifications={Object.entries(harvester.specifications).map(
                  ([title, specs]) => ({
                    title,
                    specs: Object.entries(specs).map(([label, value]) => ({
                      label,
                      value: value as string,
                    })),
                  }),
                )}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Equipment */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            Related Equipment
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/equipment/forwarders">
                <div className="text-left">
                  <div className="font-semibold">EcoLog Forwarders</div>
                  <div className="text-sm text-muted-foreground">
                    Complete your operation
                  </div>
                </div>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4">
              <Link href="/equipment/ecolog">
                <div className="text-left">
                  <div className="font-semibold">EcoLog Equipment</div>
                  <div className="text-sm text-muted-foreground">
                    View all forestry equipment
                  </div>
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
