import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Calendar, Clock, User, Share2 } from "lucide-react"
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData"

// In production, this would fetch from a database
const getArticle = (slug: string) => {
  const articles = {
    "new-ecolog-590g-harvester-available": {
      title: "New EcoLog 590G Harvester Now Available",
      content: `
        <p>We're thrilled to announce that the highly anticipated EcoLog 590G harvester is now available at Munden Truck & Equipment Ltd. This latest addition to the EcoLog family represents a significant leap forward in forestry equipment technology.</p>
        
        <h2>Enhanced Performance Features</h2>
        <p>The 590G model comes equipped with a Stage V compliant engine that delivers 281 horsepower while maintaining exceptional fuel efficiency. The improved hydraulic system provides faster cycle times and smoother operation, allowing operators to maximize productivity throughout their shift.</p>
        
        <h2>Operator Comfort and Safety</h2>
        <p>EcoLog has completely redesigned the cab with operator comfort in mind. The new ergonomic seat, improved visibility, and intuitive control layout reduce operator fatigue during long working days. Advanced safety features include:</p>
        <ul>
          <li>360-degree camera system</li>
          <li>Automatic fire suppression system</li>
          <li>Enhanced ROPS/FOPS certified cab structure</li>
          <li>LED work lights for superior visibility</li>
        </ul>
        
        <h2>Environmental Considerations</h2>
        <p>The 590G meets the strictest environmental standards with its Stage V engine and advanced emission control systems. The improved fuel efficiency not only reduces operating costs but also minimizes the environmental footprint of your forestry operations.</p>
        
        <h2>Available for Demo</h2>
        <p>We invite you to experience the EcoLog 590G firsthand. Contact our sales team to schedule a demonstration and see how this remarkable machine can enhance your forestry operations. Our expert staff can help you explore financing options and discuss how the 590G fits into your fleet.</p>
      `,
      excerpt: "We're excited to announce the arrival of the latest EcoLog 590G harvester model, featuring enhanced performance and improved fuel efficiency.",
      category: "Equipment",
      author: "Mike Thompson",
      date: "2024-03-15",
      readTime: "3 min read",
    }
  }
  
  return articles[slug as keyof typeof articles] || null
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  
  if (!article) {
    return {
      title: "Article Not Found",
    }
  }
  
  return {
    title: `${article.title} | Munden Truck & Equipment News`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  
  if (!article) {
    notFound()
  }
  
  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "News", url: "https://mundentruckequipment.com/news" },
    { name: article.title, url: `https://mundentruckequipment.com/news/${slug}` }
  ]
  
  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      
      <article className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/news">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to News
              </Link>
            </Button>
            
            {/* Article Header */}
            <header className="mb-8">
              <Badge className="mb-4">{article.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(article.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
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
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-muted-foreground">Article Featured Image</span>
              </div>
            </div>
            
            {/* Article Content */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            {/* CTA Section */}
            <div className="bg-muted rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Need More Information?</h3>
              <p className="text-muted-foreground mb-6">
                Contact our team to learn more about our equipment and services
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/equipment">Browse Equipment</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}