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
  }
]

const categories = ["All", "Industry Insights"]

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
                <img
                  src="/images/equipment/blog1.jpeg"
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
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
        </div>
      </section>
    </>
  )
}
