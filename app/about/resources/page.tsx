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
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData";
import { formatResourceDate, getAllResourcePosts } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resources | Industry Insights and Company News | Munden Truck",
  description:
    "Stay updated with the latest news from Munden Truck & Equipment Ltd. Read about industry trends, company updates, and trucking insights.",
  openGraph: {
    title: "Resources | Munden Truck & Equipment Ltd.",
    description:
      "Latest news, industry insights, and company updates from your trusted trucking partner.",
  },
};

export default function ResourcesPage() {
  const posts = getAllResourcePosts();
  const [featuredArticle, ...moreArticles] = posts;
  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "About", url: "https://mundentruckequipment.com/about" },
    {
      name: "Resources",
      url: "https://mundentruckequipment.com/about/resources",
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
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-8 text-2xl font-bold">More Articles</h2>
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
            </div>
          )}
        </div>
      </section>
    </>
  );
}
