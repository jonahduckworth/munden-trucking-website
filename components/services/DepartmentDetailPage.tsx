import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Package,
  Phone,
  Wrench,
} from "lucide-react";

import StructuredData, {
  breadcrumbSchema,
  collectionPageSchema,
  faqSchema,
  serviceSchema,
} from "@/components/seo/StructuredData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DepartmentPage,
  departmentBasePaths,
  getDepartmentPagePath,
  getRelatedDepartmentPages,
} from "@/lib/department-pages";
import { getResourcePost } from "@/lib/resources";
import { siteUrl } from "@/lib/site";

type DepartmentDetailPageProps = {
  page: DepartmentPage;
};

export function DepartmentDetailPage({ page }: DepartmentDetailPageProps) {
  const basePath = departmentBasePaths[page.department];
  const pagePath = getDepartmentPagePath(page);
  const hubLabel =
    page.department === "service" ? "Service Department" : "Parts Department";
  const Icon = page.department === "service" ? Wrench : Package;
  const contactSubject = page.department === "service" ? "service" : "parts";
  const relatedPages = getRelatedDepartmentPages(page);
  const resources = page.relatedResources
    .map((slug) => getResourcePost(slug))
    .filter((resource): resource is NonNullable<typeof resource> =>
      Boolean(resource),
    );
  const breadcrumbs = [
    { name: "Home", url: siteUrl },
    { name: hubLabel, url: `${siteUrl}${basePath}` },
    { name: page.navTitle, url: `${siteUrl}${pagePath}` },
  ];
  const primarySchema =
    page.department === "service"
      ? serviceSchema({
          name: page.title,
          description: page.description,
          serviceType: page.navTitle,
          url: pagePath,
        })
      : collectionPageSchema({
          name: page.title,
          description: page.description,
          url: pagePath,
          items: page.offerings,
        });

  return (
    <>
      <StructuredData
        data={[primarySchema, breadcrumbSchema(breadcrumbs), faqSchema(page.faqs)]}
      />

      <section className="border-b bg-gradient-to-b from-secondary/70 to-background py-10 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <Button variant="ghost" asChild className="mb-7 -ml-4">
              <Link href={basePath}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to {hubLabel}
              </Link>
            </Button>

            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <Badge variant="secondary" className="mb-5">
                  {page.eyebrow}
                </Badge>
                <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
                  {page.title}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
                  {page.intro}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button size="lg" asChild>
                  <a href="tel:+12508282268">
                    <Phone className="mr-2 h-4 w-4" />
                    Call 250-828-2268
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link
                    href={`/about/contact?subject=${contactSubject}&topic=${encodeURIComponent(page.navTitle)}`}
                  >
                    Send an inquiry
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="text-3xl font-bold tracking-tight">
                {page.offeringsTitle}
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.offerings.map((offering) => (
                <Card key={offering} className="h-full">
                  <CardContent className="flex gap-3 p-5">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <p className="font-medium leading-6">{offering}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-14 md:py-20">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
            <div>
              <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ClipboardList className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="text-3xl font-bold tracking-tight">
                {page.preparationTitle}
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {page.preparationIntro}
              </p>
            </div>
            <Card>
              <CardContent className="p-6 md:p-8">
                <ul className="space-y-4">
                  {page.preparationItems.map((item) => (
                    <li key={item} className="flex gap-3 leading-7">
                      <span
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <div className="mb-9 max-w-2xl">
              <Badge variant="outline" className="mb-4">
                A practical process
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                From first call to the next step
              </h2>
            </div>
            <ol className="grid gap-5 md:grid-cols-3">
              {page.process.map((step, index) => (
                <li key={step.title}>
                  <Card className="h-full">
                    <CardHeader>
                      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="leading-7 text-muted-foreground">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 py-14 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight">
              Frequently asked questions
            </h2>
            <div className="mt-8 space-y-3">
              {page.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-lg border bg-background p-5 open:shadow-sm"
                >
                  <summary className="min-h-11 cursor-pointer list-none pr-8 font-semibold leading-7 outline-none marker:hidden focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                    {faq.question}
                  </summary>
                  <p className="pt-3 leading-7 text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {(resources.length > 0 || relatedPages.length > 0) && (
        <section className="py-14 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-5xl space-y-12">
              {relatedPages.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    Related {page.department === "service" ? "services" : "parts categories"}
                  </h2>
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {relatedPages.map((related) => (
                      <Card key={related.slug} className="group h-full">
                        <CardContent className="p-5">
                          <Link
                            href={getDepartmentPagePath(related)}
                            className="flex min-h-11 items-center justify-between gap-3 rounded-sm font-semibold outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {related.navTitle}
                            <ArrowRight
                              className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
                              aria-hidden="true"
                            />
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {resources.length > 0 && (
                <div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
                    <h2 className="text-3xl font-bold tracking-tight">
                      Helpful resources
                    </h2>
                  </div>
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {resources.map((resource) => (
                      <Card key={resource.slug} className="h-full">
                        <CardContent className="p-5">
                          <Badge variant="secondary" className="mb-3">
                            {resource.category}
                          </Badge>
                          <h3 className="font-semibold leading-6">
                            <Link
                              href={`/about/resources/${resource.slug}`}
                              className="rounded-sm outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              {resource.title}
                            </Link>
                          </h3>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="bg-primary py-14 text-primary-foreground md:py-16">
        <div className="container">
          <div className="mx-auto flex max-w-5xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold">Talk with the Munden team</h2>
              <p className="mt-3 text-lg leading-8 text-primary-foreground/85">
                Have your unit details, photos, part numbers, and a clear description ready. We can help determine the right next step.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <a href="tel:+12508282268">
                  <Phone className="mr-2 h-4 w-4" />
                  Call the shop
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link
                  href={`/about/contact?subject=${contactSubject}&topic=${encodeURIComponent(page.navTitle)}`}
                >
                  Send an inquiry
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
