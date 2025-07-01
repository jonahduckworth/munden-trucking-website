import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, DollarSign, Info } from "lucide-react"

interface EquipmentCardProps {
  title: string
  model?: string
  description: string
  price?: string
  hours?: string
  year?: string
  status?: "Available" | "Pending" | "Sold"
  image?: string
  href: string
  features?: string[]
  category?: string
}

export function EquipmentCard({ 
  title,
  model,
  description,
  price,
  hours,
  year,
  status = "Available",
  image,
  href,
  features,
  category
}: EquipmentCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      {image && (
        <div className="relative h-48 bg-muted">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          {status && (
            <Badge 
              className="absolute top-2 right-2"
              variant={status === "Available" ? "default" : status === "Pending" ? "secondary" : "outline"}
            >
              {status}
            </Badge>
          )}
          {category && (
            <Badge className="absolute top-2 left-2" variant="secondary">
              {category}
            </Badge>
          )}
        </div>
      )}
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-xl">{title}</CardTitle>
          {model && <p className="text-sm text-muted-foreground">{model}</p>}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-3 mb-6">
          {price && (
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold">{price}</span>
            </div>
          )}
          {year && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{year}</span>
            </div>
          )}
          {hours && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{hours} hours</span>
            </div>
          )}
        </div>
        
        {features && features.length > 0 && (
          <ul className="space-y-1 mb-6">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
            {features.length > 3 && (
              <li className="text-sm text-muted-foreground pl-3.5">
                +{features.length - 3} more features
              </li>
            )}
          </ul>
        )}

        <div className="mt-auto flex gap-2">
          <Button variant="outline" asChild className="flex-1">
            <Link href={href}>
              <Info className="mr-2 h-4 w-4" />
              View Details
            </Link>
          </Button>
          <Button asChild className="flex-1">
            <Link href="/quote">Get Quote</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}