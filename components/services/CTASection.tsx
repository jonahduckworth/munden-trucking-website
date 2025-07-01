import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CTAAction {
  label: string
  href: string
  variant?: "default" | "secondary" | "outline" | "ghost"
  icon?: LucideIcon
}

interface CTASectionProps {
  title: string
  description?: string
  actions: CTAAction[]
  variant?: "default" | "primary" | "muted"
  className?: string
}

export function CTASection({ 
  title, 
  description, 
  actions,
  variant = "default",
  className 
}: CTASectionProps) {
  const cardClassName = cn(
    className,
    {
      "bg-primary text-primary-foreground": variant === "primary",
      "bg-muted/30": variant === "muted",
    }
  )

  const content = (
    <div className="p-8 text-center">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      {description && (
        <p className={cn(
          "mb-6 max-w-2xl mx-auto",
          variant === "primary" && "opacity-90"
        )}>
          {description}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {actions.map((action, index) => {
          const Icon = action.icon
          const buttonVariant = action.variant || (index === 0 ? "default" : "outline")
          const buttonClassName = variant === "primary" && buttonVariant === "outline" 
            ? "bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary" 
            : ""
          
          return (
            <Button 
              key={action.label}
              size="lg" 
              variant={buttonVariant}
              asChild 
              className={buttonClassName}
            >
              <Link href={action.href}>
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {action.label}
              </Link>
            </Button>
          )
        })}
      </div>
    </div>
  )

  if (variant === "muted") {
    return (
      <div className={cardClassName}>
        {content}
      </div>
    )
  }

  return (
    <Card className={cardClassName}>
      <CardContent className="p-0">
        {content}
      </CardContent>
    </Card>
  )
}