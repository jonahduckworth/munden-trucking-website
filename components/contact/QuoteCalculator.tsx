"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Calculator, Info, DollarSign, Clock } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Service pricing data - in production, this would come from a database
const servicePricing = {
  // Repair services
  "oil-change": { 
    name: "Oil Change", 
    basePrice: 150, 
    hourlyRate: 0, 
    estimatedHours: 0.5,
    category: "maintenance" 
  },
  "brake-service": { 
    name: "Brake Service", 
    basePrice: 350, 
    hourlyRate: 120, 
    estimatedHours: 2,
    category: "repair" 
  },
  "transmission-service": { 
    name: "Transmission Service", 
    basePrice: 450, 
    hourlyRate: 120, 
    estimatedHours: 3,
    category: "repair" 
  },
  "engine-diagnostic": { 
    name: "Engine Diagnostic", 
    basePrice: 150, 
    hourlyRate: 120, 
    estimatedHours: 1,
    category: "diagnostic" 
  },
  "cvip-inspection": { 
    name: "CVIP Inspection", 
    basePrice: 350, 
    hourlyRate: 0, 
    estimatedHours: 2,
    category: "inspection" 
  },
  "suspension-repair": { 
    name: "Suspension Repair", 
    basePrice: 500, 
    hourlyRate: 120, 
    estimatedHours: 4,
    category: "repair" 
  },
  "electrical-diagnostic": { 
    name: "Electrical Diagnostic", 
    basePrice: 200, 
    hourlyRate: 120, 
    estimatedHours: 2,
    category: "diagnostic" 
  },
  "custom": { 
    name: "Custom Service", 
    basePrice: 0, 
    hourlyRate: 120, 
    estimatedHours: 1,
    category: "custom" 
  }
}

const additionalOptions = [
  { id: "parts-included", label: "Parts Included", multiplier: 1.3 },
  { id: "emergency-service", label: "Emergency Service", multiplier: 1.5 },
  { id: "after-hours", label: "After Hours Service", multiplier: 1.25 },
  { id: "fleet-discount", label: "Fleet Discount", multiplier: 0.9 },
]

const QuoteCalculator = () => {
  const [selectedService, setSelectedService] = useState("")
  const [laborHours, setLaborHours] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [customDescription, setCustomDescription] = useState("")

  const calculateQuote = () => {
    if (!selectedService || selectedService === 'placeholder') return { subtotal: 0, tax: 0, total: 0 }

    const service = servicePricing[selectedService as keyof typeof servicePricing]
    if (!service) return { subtotal: 0, tax: 0, total: 0 }

    // Base calculation
    let subtotal = service.basePrice
    
    // Add labor cost
    if (service.hourlyRate > 0) {
      subtotal += service.hourlyRate * laborHours
    }

    // Apply multipliers from additional options
    selectedOptions.forEach(optionId => {
      const option = additionalOptions.find(opt => opt.id === optionId)
      if (option) {
        subtotal *= option.multiplier
      }
    })

    // Calculate tax (12% for BC)
    const tax = subtotal * 0.12
    const total = subtotal + tax

    return { subtotal, tax, total }
  }

  const quote = calculateQuote()
  const service = (selectedService && selectedService !== 'placeholder') ? servicePricing[selectedService as keyof typeof servicePricing] : null

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    )
  }

  return (
    <TooltipProvider>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Service Quote Calculator
          </CardTitle>
          <CardDescription>
            Get an instant estimate for common truck repair services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Service Selection */}
          <div className="space-y-2">
            <Label htmlFor="service">Select Service</Label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger id="service">
                <SelectValue placeholder="Choose a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="placeholder" disabled>Select a service</SelectItem>
                {Object.entries(servicePricing).map(([key, service]) => (
                  <SelectItem key={key} value={key}>
                    {service.name}
                    {service.category && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {service.category}
                      </Badge>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Service Description */}
          {selectedService === "custom" && (
            <div className="space-y-2">
              <Label htmlFor="description">Service Description</Label>
              <Input
                id="description"
                placeholder="Describe the service needed"
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
              />
            </div>
          )}

          {/* Labor Hours */}
          {service && service.hourlyRate > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="hours">Labor Hours</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Estimated based on typical service time</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-sm font-medium">{laborHours} hours</span>
              </div>
              <Slider
                id="hours"
                value={[laborHours]}
                onValueChange={(value) => setLaborHours(value[0])}
                min={0.5}
                max={8}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.5 hr</span>
                <span>8 hrs</span>
              </div>
            </div>
          )}

          {/* Additional Options */}
          <div className="space-y-2">
            <Label>Additional Options</Label>
            <div className="space-y-3">
              {additionalOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={selectedOptions.includes(option.id)}
                    onCheckedChange={() => handleOptionToggle(option.id)}
                  />
                  <label
                    htmlFor={option.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {option.label}
                    {option.multiplier !== 1 && (
                      <span className="text-xs text-muted-foreground ml-1">
                        ({option.multiplier > 1 ? '+' : ''}{Math.round((option.multiplier - 1) * 100)}%)
                      </span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Quote Summary */}
          {selectedService && selectedService !== 'placeholder' && (
            <div className="border-t pt-6 space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Estimated Quote
              </h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Service Base Price</span>
                  <span>{formatCurrency(service?.basePrice || 0)}</span>
                </div>
                {service && service.hourlyRate > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Labor ({laborHours} hrs @ {formatCurrency(service.hourlyRate)}/hr)</span>
                    <span>{formatCurrency(service.hourlyRate * laborHours)}</span>
                  </div>
                )}
                {selectedOptions.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    <span className="italic">Additional options applied</span>
                  </div>
                )}
                <div className="flex justify-between text-sm border-t pt-2">
                  <span>Subtotal</span>
                  <span>{formatCurrency(quote.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>GST/PST (12%)</span>
                  <span>{formatCurrency(quote.tax)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total Estimate</span>
                  <span className="text-primary">{formatCurrency(quote.total)}</span>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Estimated completion: {service?.estimatedHours || laborHours} hours</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  * This is an estimate only. Actual costs may vary based on vehicle condition and parts required.
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          {selectedService && selectedService !== 'placeholder' && (
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button className="flex-1" asChild>
                <a href="/quote">Request Official Quote</a>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <a href="/quote">Request Service Quote</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}

export default QuoteCalculator