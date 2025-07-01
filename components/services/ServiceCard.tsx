import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LucideIcon, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ServiceCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  features?: string[]
  badge?: string
  ctaText?: string
}

export function ServiceCard({ 
  title, 
  description, 
  href, 
  icon: Icon, 
  features,
  badge,
  ctaText = "Learn More"
}: ServiceCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Icon className="h-8 w-8 text-primary" />
          {badge && <Badge variant="secondary">{badge}</Badge>}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {features && features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto">
          <Button variant="outline" asChild className="w-full group">
            <Link href={href}>
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}