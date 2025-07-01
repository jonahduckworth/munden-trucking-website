import { cn } from "@/lib/utils"

interface ProcessStep {
  number: string | number
  title: string
  description: string
  icon?: React.ReactNode
}

interface ProcessTimelineProps {
  steps: ProcessStep[]
  orientation?: "horizontal" | "vertical"
  className?: string
}

export function ProcessTimeline({ 
  steps, 
  orientation = "horizontal",
  className 
}: ProcessTimelineProps) {
  if (orientation === "vertical") {
    return (
      <div className={cn("space-y-4", className)}>
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                {step.icon || step.number}
              </div>
            </div>
            <div className={cn(
              "flex-1 pb-8",
              index < steps.length - 1 && "border-l-2 border-muted ml-6 pl-8"
            )}>
              <h3 className="font-semibold mb-1">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("grid gap-6", className, {
      "grid-cols-1 md:grid-cols-2": steps.length === 2,
      "grid-cols-1 md:grid-cols-3": steps.length === 3,
      "grid-cols-1 md:grid-cols-4": steps.length === 4,
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-5": steps.length === 5,
    })}>
      {steps.map((step, index) => (
        <div key={index} className="text-center">
          <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            {step.icon || step.number}
          </div>
          <h3 className="font-semibold mb-2">{step.title}</h3>
          <p className="text-sm text-muted-foreground">{step.description}</p>
        </div>
      ))}
    </div>
  )
}