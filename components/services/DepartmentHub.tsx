import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  Cog,
  Package,
  Phone,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DepartmentKind,
  departmentBasePaths,
  getDepartmentGroups,
  getDepartmentPagePath,
} from "@/lib/department-pages";

type DepartmentHubProps = {
  kind: DepartmentKind;
};

const hubContent = {
  service: {
    badge: "Service Department",
    title: "Commercial Truck, Trailer and Equipment Service",
    description:
      "Choose the service that best matches your unit, symptoms, or upcoming work. Munden's Kamloops shop supports routine maintenance, diagnostics, inspections, repair, and specialty truck projects.",
    sectionTitle: "Explore shop services",
    sectionDescription:
      "Each page explains what Munden can help with and what information will make your service request more productive.",
    ctaTitle: "Not sure which service you need?",
    ctaDescription:
      "Call the shop with your unit details and a clear description of the concern. The team can help identify the right starting point.",
    contactSubject: "service",
  },
  parts: {
    badge: "Parts Department",
    title: "Commercial Truck, Trailer and Equipment Parts",
    description:
      "Start with the system or component you need. Munden's Parts Department helps identify OEM and aftermarket parts using VIN, serial, part-number, measurement, and application details.",
    sectionTitle: "Explore parts categories",
    sectionDescription:
      "Use the category pages to gather the right information before calling or sending a parts inquiry.",
    ctaTitle: "Need help identifying a part?",
    ctaDescription:
      "Have your VIN, unit information, existing part numbers, and clear photos ready. Those details make the lookup faster and more accurate.",
    contactSubject: "parts",
  },
} as const;

const groupIcons = {
  "Inspections & Maintenance": ClipboardCheck,
  "Repair & Diagnostics": Wrench,
  "Specialty Shop Services": Cog,
  "Mechanical Parts": Package,
  "Electrical & Hydraulic": Cog,
  "Maintenance Supplies": ShieldCheck,
};

export function DepartmentHub({ kind }: DepartmentHubProps) {
  const content = hubContent[kind];
  const groups = getDepartmentGroups(kind);
  const counterpart = kind === "service" ? "parts" : "service";
  const counterpartLabel =
    counterpart === "service" ? "Service Department" : "Parts Department";

  return (
    <>
      <section className="border-b bg-gradient-to-b from-secondary/70 to-background py-14 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-5">
              {content.badge}
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
              {content.title}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
              {content.description}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <a href="tel:+12508282268">
                  <Phone className="mr-2 h-4 w-4" />
                  Call 250-828-2268
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={`/about/contact?subject=${content.contactSubject}`}>
                  Send an inquiry
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {content.sectionTitle}
              </h2>
              <p className="mt-3 text-lg leading-8 text-muted-foreground">
                {content.sectionDescription}
              </p>
            </div>

            <div className="space-y-12">
              {groups.map((group) => {
                const Icon =
                  groupIcons[group.name as keyof typeof groupIcons] ?? Wrench;
                const sectionId = `${kind}-${group.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "")}`;

                return (
                  <section key={group.name} aria-labelledby={sectionId}>
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h2
                        id={sectionId}
                        className="text-2xl font-semibold"
                      >
                        {group.name}
                      </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {group.pages.map((page) => (
                        <Card
                          key={page.slug}
                          className="group h-full transition-shadow duration-200 hover:shadow-md"
                        >
                          <CardHeader>
                            <CardTitle className="text-xl">
                              <Link
                                href={getDepartmentPagePath(page)}
                                className="rounded-sm outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                {page.navTitle}
                              </Link>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="mb-5 leading-7 text-muted-foreground">
                              {page.description}
                            </p>
                            <Link
                              href={getDepartmentPagePath(page)}
                              className="inline-flex min-h-11 items-center gap-2 rounded-md font-medium text-primary outline-none transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              View details
                              <ArrowRight
                                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                aria-hidden="true"
                              />
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-14 md:py-16">
        <div className="container">
          <Card className="mx-auto max-w-5xl border-primary/20">
            <CardContent className="flex flex-col gap-6 p-7 md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold">{content.ctaTitle}</h2>
                <p className="mt-2 leading-7 text-muted-foreground">
                  {content.ctaDescription}
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <a href="tel:+12508282268">
                    <Phone className="mr-2 h-4 w-4" />
                    Call the shop
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={departmentBasePaths[counterpart]}>
                    {counterpartLabel}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
