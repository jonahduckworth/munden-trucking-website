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
  title: "News & Updates | Industry Insights and Company News",
  description: "Stay updated with the latest news from Munden Truck & Equipment Ltd. Read about industry trends, company updates, and trucking insights.",
  openGraph: {
    title: "News & Updates | Munden Truck & Equipment Ltd.",
    description: "Latest news, industry insights, and company updates from your trusted trucking partner.",
  },
}

// In production, this would come from a CMS or database
const newsArticles = [
  {
    id: 1,
    title: "New EcoLog 590G Harvester Now Available",
    excerpt: "We're excited to announce the arrival of the latest EcoLog 590G harvester model, featuring enhanced performance and improved fuel efficiency.",
    category: "Equipment",
    author: "Mike Thompson",
    date: "2024-03-15",
    readTime: "3 min read",
    image: "/images/news/ecolog-590g.jpg",
    slug: "new-ecolog-590g-harvester-available"
  },
  {
    id: 2,
    title: "CVIP Inspection Requirements Update for 2024",
    excerpt: "Important changes to commercial vehicle inspection requirements coming into effect this year. Here's what fleet owners need to know.",
    category: "Regulations",
    author: "Sarah Mitchell",
    date: "2024-03-10",
    readTime: "5 min read",
    image: "/images/news/cvip-update.jpg",
    slug: "cvip-inspection-requirements-2024"
  },
  {
    id: 3,
    title: "Spring Maintenance Tips for Your Fleet",
    excerpt: "As winter ends, it's crucial to prepare your trucks for spring conditions. Our expert mechanics share essential maintenance tips.",
    category: "Maintenance",
    author: "John Davis",
    date: "2024-03-05",
    readTime: "4 min read",
    image: "/images/news/spring-maintenance.jpg",
    slug: "spring-maintenance-tips-fleet"
  },
  {
    id: 4,
    title: "Munden Truck Celebrates 30 Years of Service",
    excerpt: "Three decades of serving the BC Interior trucking and forestry industries. A look back at our journey and vision for the future.",
    category: "Company News",
    author: "Robert Munden",
    date: "2024-02-28",
    readTime: "6 min read",
    image: "/images/news/30-years.jpg",
    slug: "munden-truck-30-years-anniversary"
  },
  {
    id: 5,
    title: "Understanding Diesel Engine Diagnostics",
    excerpt: "Modern diesel engines are complex systems. Learn about the latest diagnostic tools and techniques we use in our shop.",
    category: "Technical",
    author: "Dave Wilson",
    date: "2024-02-20",
    readTime: "7 min read",
    image: "/images/news/engine-diagnostics.jpg",
    slug: "diesel-engine-diagnostics-guide"
  },
  {
    id: 6,
    title: "Log Hauling Safety Best Practices",
    excerpt: "Safety is paramount in log transportation. We share industry best practices and recent safety innovations in log hauling.",
    category: "Safety",
    author: "Lisa Chen",
    date: "2024-02-15",
    readTime: "5 min read",
    image: "/images/news/log-hauling-safety.jpg",
    slug: "log-hauling-safety-best-practices"
  }
]

const categories = ["All", "Equipment", "Regulations", "Maintenance", "Company News", "Technical", "Safety"]

export default function NewsPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "News", url: "https://mundentruckequipment.com/news" }
  ]

  const featuredArticle = newsArticles[0]
  const recentArticles = newsArticles.slice(1)

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Updates</h1>
            <p className="text-lg text-muted-foreground">
              Stay informed with the latest industry news, company updates, and trucking insights
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Article */}
          <Card className="mb-12 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto relative bg-muted">
                {/* In production, this would be an actual image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted-foreground">Featured Image</span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge className="mb-4 w-fit">{featuredArticle.category}</Badge>
                <h2 className="text-3xl font-bold mb-4">
                  <Link href={`/news/${featuredArticle.slug}`} className="hover:text-primary transition-colors">
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
                  <Link href={`/news/${featuredArticle.slug}`}>
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>

          {/* Recent Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
              <Card key={article.id} className="h-full flex flex-col">
                <div className="aspect-video relative bg-muted">
                  {/* In production, this would be an actual image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Article Image</span>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">
                    <Link href={`/news/${article.slug}`} className="hover:text-primary transition-colors">
                      {article.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="line-clamp-3">
                    {article.excerpt}
                  </CardDescription>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                    <span>{article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Newsletter CTA */}
          <Card className="mt-12 bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="mb-6 opacity-90 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest industry news, maintenance tips, 
                and exclusive offers delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button variant="secondary">Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}