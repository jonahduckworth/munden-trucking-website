import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  ArrowRight,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData";
import BlogSubscribeForm from "@/components/resources/BlogSubscribeForm";
import { formatResourceDate, getAllResourcePosts } from "@/lib/resources";

const articlesPerPage = 6;

type ResourcesPageProps = {
  searchParams?: Promise<{
    page?: string | string[];
  }>;
};

export async function generateMetadata({
  searchParams,
}: ResourcesPageProps): Promise<Metadata> {
  const params = await searchParams;
  const currentPage = getCurrentPage(params?.page);
  const canonicalPath = getPageHref(currentPage);
  const title =
    currentPage === 1
      ? "Resources | Industry Insights and Company News | Munden Truck"
      : `Resources Page ${currentPage} | Munden Truck & Equipment`;

  return {
    title,
    description:
      "Stay updated with the latest news from Munden Truck & Equipment Ltd. Read about industry trends, company updates, and trucking insights.",
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title:
        currentPage === 1
          ? "Resources | Munden Truck & Equipment Ltd."
          : `Resources Page ${currentPage} | Munden Truck & Equipment Ltd.`,
      description:
        "Latest news, industry insights, and company updates from your trusted trucking partner.",
      url: canonicalPath,
    },
  };
}

export default async function ResourcesPage({ searchParams }: ResourcesPageProps) {
  const posts = getAllResourcePosts();
  const params = await searchParams;
  const currentPage = getCurrentPage(params?.page);
  const [featuredArticle, ...articleList] = posts;
  const totalPages = Math.max(1, Math.ceil(articleList.length / articlesPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const moreArticles = articleList.slice(
    (safePage - 1) * articlesPerPage,
    safePage * articlesPerPage,
  );
  const breadcrumbs = [
    { name: "Home", url: "https://mundengroup.ca" },
    { name: "About", url: "https://mundengroup.ca/about" },
    {
      name: "Resources",
      url: "https://mundengroup.ca/about/resources",
    },
  ];

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />

      <section className="py-12">
        <div className="container">
          <div className="mx-auto mb-12 max-w-4xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Resources</h1>
            <p className="text-lg text-muted-foreground">
              Stay informed with the latest industry insights and forestry
              perspectives.
            </p>
          </div>

          {featuredArticle ? (
            <Card className="mx-auto mb-12 max-w-5xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-video bg-muted lg:aspect-auto">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center p-8">
                  <Badge className="mb-4 w-fit">{featuredArticle.category}</Badge>
                  <h2 className="mb-4 text-3xl font-bold">
                    <Link
                      href={`/about/resources/${featuredArticle.slug}`}
                      className="transition-colors hover:text-primary"
                    >
                      {featuredArticle.title}
                    </Link>
                  </h2>
                  <p className="mb-6 text-lg text-muted-foreground">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{featuredArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatResourceDate(featuredArticle.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredArticle.readTime}</span>
                    </div>
                  </div>
                  <Button asChild>
                    <Link href={`/about/resources/${featuredArticle.slug}`}>
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="mx-auto max-w-3xl">
              <CardHeader>
                <CardTitle>No resources published yet</CardTitle>
                <CardDescription>
                  Check back soon for trucking, equipment, and forestry
                  industry insights.
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          {moreArticles.length > 0 && (
            <div className="mx-auto mb-12 max-w-5xl">
              <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">More Articles</h2>
                  {totalPages > 1 && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      Page {safePage} of {totalPages}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {moreArticles.map((article) => (
                  <Card
                    key={article.slug}
                    className="flex flex-col overflow-hidden"
                  >
                    <div className="relative aspect-video bg-muted">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <Badge className="mb-2 w-fit">{article.category}</Badge>
                      <CardTitle className="text-lg">
                        <Link
                          href={`/about/resources/${article.slug}`}
                          className="transition-colors hover:text-primary"
                        >
                          {article.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <CardDescription className="line-clamp-3">
                        {article.excerpt}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatResourceDate(article.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {totalPages > 1 && (
                <nav
                  className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row"
                  aria-label="Resource article pages"
                >
                  {safePage > 1 ? (
                    <Button variant="outline" asChild>
                      <Link href={getPageHref(safePage - 1)}>
                        <ChevronLeft className="h-4 w-4" />
                        Newer Articles
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="outline" disabled>
                      <ChevronLeft className="h-4 w-4" />
                      Newer Articles
                    </Button>
                  )}
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, index) => {
                      const pageNumber = index + 1;

                      return (
                        <Button
                          key={pageNumber}
                          variant={pageNumber === safePage ? "default" : "outline"}
                          size="icon"
                          asChild
                        >
                          <Link href={getPageHref(pageNumber)}>
                            <span className="sr-only">Go to page </span>
                            {pageNumber}
                          </Link>
                        </Button>
                      );
                    })}
                  </div>
                  {safePage < totalPages ? (
                    <Button variant="outline" asChild>
                      <Link href={getPageHref(safePage + 1)}>
                        Older Articles
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button variant="outline" disabled>
                      Older Articles
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                </nav>
              )}
            </div>
          )}

          <section className="mx-auto max-w-5xl rounded-lg border bg-muted/40 p-6 md:p-8">
            <div className="mb-5 max-w-3xl">
              <h2 className="mb-2 text-2xl font-bold">Get New Articles by Email</h2>
              <p className="text-muted-foreground">
                Sign up for practical service, parts, equipment, and maintenance updates from Munden Truck & Equipment.
              </p>
            </div>
            <BlogSubscribeForm />
          </section>
        </div>
      </section>
    </>
  );
}

function getCurrentPage(page: string | string[] | undefined) {
  const value = Array.isArray(page) ? page[0] : page;
  const pageNumber = Number.parseInt(value || "1", 10);

  if (!Number.isFinite(pageNumber) || pageNumber < 1) {
    return 1;
  }

  return pageNumber;
}

function getPageHref(page: number) {
  return page === 1 ? "/about/resources" : `/about/resources?page=${page}`;
}
