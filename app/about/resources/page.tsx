import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "Resources | Industry Insights and Company News | Munden Truck",
  description: "Stay updated with the latest news from Munden Truck & Equipment Ltd. Read about industry trends, company updates, and trucking insights.",
  openGraph: {
    title: "Resources | Munden Truck & Equipment Ltd.",
    description: "Latest news, industry insights, and company updates from your trusted trucking partner.",
  },
}

// In production, this would come from a CMS or database
const articles = [
  {
    id: 1,
    title: "Turning Uncertainty into Opportunity: The Evolution of Forestry in Western Canada",
    excerpt: "The forestry sector in British Columbia is navigating a period of deep uncertainty. From ongoing softwood lumber tariffs to complex First Nations consultation processes, our industry is under pressure. But history has shown that moments like this often spark the most significant progress.",
    category: "Industry Insights",
    author: "Nolan Munden",
    date: "2025-11-14",
    readTime: "6 min read",
    image: "/images/news/forestry-evolution.jpg",
    slug: "turning-uncertainty-into-opportunity-forestry-evolution"
  },
  {
    id: 2,
    title: "Turning Jobs Into Careers: Keys to Employee Retention in Trucking",
    excerpt: "As a fourth-generation company, we understand the importance of long-term satisfied employees. Here are some insights into what we've found to be keys for success in employee retention.",
    category: "Company Culture",
    author: "Nolan Munden",
    date: "2025-12-10",
    readTime: "8 min read",
    image: "/images/news/careers.jpg",
    slug: "turning-jobs-into-careers-employee-retention"
  },
  {
    id: 3,
    title: "When Should You Have Your Truck's Steering & Suspension Systems Checked?",
    excerpt: "Properly working steering and suspension systems are critical to the safe usage of a commercial vehicle. Here's how to spot problems before they become safety issues.",
    category: "Maintenance Tips",
    author: "Munden Truck & Equipment",
    date: "2026-01-15",
    readTime: "4 min read",
    image: "/images/news/steering-suspension.jpg",
    slug: "steering-suspension-systems-checked"
  },
  {
    id: 4,
    title: "What Can Be Done to Prevent Freeze Ups in Your Commercial Truck and Trailer Air System?",
    excerpt: "Winter temperatures can take their toll on your air systems. Being prepared will help prevent freeze-ups and save money and time. Here are tips to keep in mind.",
    category: "Maintenance Tips",
    author: "Munden Truck & Equipment",
    date: "2026-02-01",
    readTime: "5 min read",
    image: "/images/news/freeze-prevention.jpg",
    slug: "prevent-freeze-ups-commercial-truck-air-system"
  }
]

const categories = ["All", "Industry Insights", "Company Culture", "Maintenance Tips"]

export default function ResourcesPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "About", url: "https://mundentruckequipment.com/about" },
    { name: "Resources", url: "https://mundentruckequipment.com/about/resources" }
  ]

  const featuredArticle = articles[0]

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />

      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
            <p className="text-lg text-muted-foreground">
              Stay informed with the latest industry insights and forestry perspectives
            </p>
          </div>

          {/* Featured Article */}
          <Card className="mb-12 overflow-hidden max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto relative bg-muted">
                <Image
                  src="/images/equipment/blog1.jpeg"
                  alt={featuredArticle.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge className="mb-4 w-fit">{featuredArticle.category}</Badge>
                <h2 className="text-3xl font-bold mb-4">
                  <Link href={`/about/resources/${featuredArticle.slug}`} className="hover:text-primary transition-colors">
                    {featuredArticle.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{featuredArticle.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(featuredArticle.date).toLocaleDateString()}</span>
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

          {/* All Articles Grid */}
          {articles.length > 1 && (
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">More Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.slice(1).map((article) => (
                  <Card key={article.id} className="overflow-hidden flex flex-col">
                    <div className="aspect-video relative bg-muted">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <Badge className="w-fit mb-2">{article.category}</Badge>
                      <CardTitle className="text-lg">
                        <Link href={`/about/resources/${article.slug}`} className="hover:text-primary transition-colors">
                          {article.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(article.date).toLocaleDateString()}</span>
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
  )
}
