import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData";
import {
  formatResourceDate,
  getAllResourcePosts,
  getResourcePost,
  markdownToHtml,
  ResourcePost,
} from "@/lib/resources";

type Props = {
  params: Promise<{ slug: string }>;
};

const baseUrl = "https://mundentruckequipment.com";

export function generateStaticParams() {
  return getAllResourcePosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getResourcePost(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | Munden Truck & Equipment Resources`,
    description: article.excerpt,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: getAbsoluteUrl(article.image),
          alt: article.title,
        },
      ],
    },
  };
}

export default async function ResourceArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getResourcePost(slug);

  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: baseUrl },
    { name: "About", url: `${baseUrl}/about` },
    {
      name: "Resources",
      url: `${baseUrl}/about/resources`,
    },
    {
      name: article.title,
      url: `${baseUrl}/about/resources/${slug}`,
    },
  ];

  return (
    <>
      <StructuredData data={[breadcrumbSchema(breadcrumbs), blogPostingSchema(article)]} />

      <article className="py-12">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/about/resources">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Resources
              </Link>
            </Button>

            <header className="mb-8">
              <Badge className="mb-4">{article.category}</Badge>
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                {article.title}
              </h1>

              <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatResourceDate(article.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <Button variant="outline" size="sm" asChild>
                <a href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`${baseUrl}/about/resources/${article.slug}`)}`}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Article
                </a>
              </Button>
            </header>

            <div className="relative mb-8 aspect-video overflow-hidden rounded-lg bg-muted">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>
            {article.imageCredit && article.imageSource && (
              <p className="-mt-6 mb-8 text-xs text-muted-foreground">
                <a
                  href={article.imageSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  {article.imageCredit}
                </a>
              </p>
            )}

            <div
              className="mb-12"
              dangerouslySetInnerHTML={{
                __html: markdownToHtml(article.body),
              }}
            />

            {article.sources.length > 0 && (
              <aside className="mb-12 rounded-lg border bg-muted/40 p-6">
                <h2 className="mb-4 text-lg font-bold">Sources and References</h2>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {article.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-munden-burgundy underline underline-offset-4"
                      >
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            <div className="rounded-lg bg-muted p-8 text-center">
              <h2 className="mb-4 text-2xl font-bold">Need More Information?</h2>
              <p className="mb-6 text-muted-foreground">
                Contact our team to learn more about our equipment and services.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild>
                  <Link href="/about/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/equipment/ecolog">Browse Equipment</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

function blogPostingSchema(article: ResourcePost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: getAbsoluteUrl(article.image),
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": article.author.includes("Munden") ? "Organization" : "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Munden Truck & Equipment Ltd.",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: `${baseUrl}/about/resources/${article.slug}`,
    keywords: article.keywords,
  };
}

function getAbsoluteUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${baseUrl}${url}`;
}
