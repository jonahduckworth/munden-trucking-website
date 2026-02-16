import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import StructuredData, {
  breadcrumbSchema,
} from "@/components/seo/StructuredData";

// In production, this would fetch from a database
const getArticle = (slug: string) => {
  const articles = {
    "turning-uncertainty-into-opportunity-forestry-evolution": {
      title:
        "Turning Uncertainty into Opportunity: The Evolution of Forestry in Western Canada",
      content: `
        <p>The forestry sector in British Columbia—and across much of Canada—is navigating a period of deep uncertainty. From ongoing softwood lumber tariffs to complex First Nations consultation processes and an increasingly demanding regulatory environment, it's no secret that our industry is under pressure. Harvesting levels continue to decline, and many contractors and manufacturers are asking the same question: Where do we go from here?</p>

        <p>History has shown that moments like this—where long-standing systems are challenged—often spark the most significant progress. When old models no longer fit the realities of new markets, technologies, and social expectations, innovation is not just an option—it becomes a necessity.</p>

        <p>At Munden Truck & Equipment Ltd., we've always believed that the forestry industry's strength lies in its ability to adapt. Our forests and our communities have weathered change before, and we'll do so again. But this time, the evolution may look different.</p>

        <h2>A Shift Toward Value, Not Just Volume</h2>
        <p>As the allowable annual cut in many timber supply areas continues to tighten, the economics of "conventional" full-tree or clear-cut logging are becoming increasingly difficult to sustain. Simply put, there's less fibre to harvest, and more scrutiny over how it's done. Yet demand for sustainably sourced, high-quality wood products continues to grow—both at home and abroad.</p>

        <p>This reality is forcing a shift in thinking: from maximizing volume to maximizing value. The future of forestry in Western Canada may depend not on how much we cut, but how intelligently and selectively we harvest.</p>

        <h2>Learning from Global Leaders</h2>
        <p>In Scandinavia, much of Europe, and increasingly in Eastern Canada, the industry has already embraced commercial thinning and selective harvesting as core components of sustainable forest management. Specialized equipment—like the EcoLog harvesters and forwarders we're proud to represent—has become the foundation of this evolution.</p>

        <p>These machines are designed for precision. They enable operators to remove select trees efficiently and with minimal impact to the surrounding stand—encouraging forest health, improving long-term yield, and providing an ongoing source of income rather than a once-per-rotation payout.</p>

        <p>While this approach is not yet widespread in Western Canada, the pressures we're experiencing are setting the stage for change. The economics, environmental expectations, and market dynamics are aligning in a way that makes this shift inevitable.</p>

        <h2>Turbulence Breeds Innovation</h2>
        <p>It often takes turbulence to drive transformation. When challenges mount, the innovators step forward. Those willing to test new models, adopt emerging technology, and rethink traditional practices become the leaders of the next era.</p>

        <p>We see tremendous opportunity ahead for forward-thinking contractors and licensees who are ready to adapt—those who see the potential in smaller, more agile operations that prioritize stand improvement, reduced environmental footprint, and long-term sustainability.</p>

        <h2>A Future Worth Building</h2>
        <p>There's no question that the road ahead for forestry in British Columbia is uncertain. But uncertainty doesn't have to mean decline. It can mean renewal. The very forces challenging our industry today may be the ones that ultimately shape a stronger, more resilient, and more value-driven future.</p>

        <p>At Munden Truck & Equipment, we're proud to support the people and the ideas that are helping build that future—because the evolution of forestry isn't coming someday; it's already begun.</p>
      `,
      excerpt:
        "The forestry sector in British Columbia is navigating a period of deep uncertainty. From ongoing softwood lumber tariffs to complex First Nations consultation processes, our industry is under pressure. But history has shown that moments like this often spark the most significant progress.",
      category: "Industry Insights",
      author: "Nolan Munden",
      date: "2025-11-14",
      readTime: "6 min read",
    },
  };

  return articles[slug as keyof typeof articles] || null;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${article.title} | Munden Truck & Equipment Resources`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ResourceArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "About", url: "https://mundentruckequipment.com/about" },
    {
      name: "Resources",
      url: "https://mundentruckequipment.com/about/resources",
    },
    {
      name: article.title,
      url: `https://mundentruckequipment.com/about/resources/${slug}`,
    },
  ];

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />

      <article className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/about/resources">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Resources
              </Link>
            </Button>

            {/* Article Header */}
            <header className="mb-8">
              <Badge className="mb-4">{article.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Share Button */}
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share Article
              </Button>
            </header>

            {/* Featured Image */}
            <div className="aspect-video relative bg-muted mb-8 rounded-lg overflow-hidden">
              <img
                src="/images/equipment/blog1.jpeg"
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div
              className="mb-12"
              style={{
                fontSize: '1.125rem',
                lineHeight: '1.8',
              }}
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(/<h2>/g, '<h2 style="color: #7D3038; font-size: 1.875rem; font-weight: 700; margin-top: 4rem; margin-bottom: 2rem;">')
                  .replace(/<p>/g, '<p style="font-size: 1.125rem; line-height: 1.8; margin-bottom: 2rem;">')
              }}
            />

            {/* CTA Section */}
            <div className="bg-muted rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Need More Information?
              </h3>
              <p className="text-muted-foreground mb-6">
                Contact our team to learn more about our equipment and services
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
