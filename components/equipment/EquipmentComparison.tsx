"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Check, X, Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Equipment data matching the actual models available
const equipmentData = {
  harvesters: [
    {
      id: "ecolog-590g",
      name: "EcoLog 590G",
      category: "Harvester",
      specs: {
        engine: "190 kW Volvo engine",
        power: "255 hp (190 kW)",
        weight: "21,000 kg",
        reach: "10.3 m",
        wheelbase: "3.4 m",
        fuelCapacity: "400 L",
        hydraulicCapacity: "300 L",
        maxCuttingDiameter: "65 cm",
        feedSpeed: "Up to 5.0 m/s",
        groundClearance: "695 mm",
        transportWidth: "2.99 m",
        features: ["6-wheel drive", "Powerful crane", "Efficient fuel consumption", "Advanced forestry head", "All-terrain capability"]
      }
    },
    {
      id: "ecolog-580g",
      name: "EcoLog 580G",
      category: "Harvester",
      specs: {
        engine: "190 kW Volvo engine",
        power: "255 hp (190 kW)",
        weight: "18,500 kg",
        reach: "9.5 m",
        wheelbase: "3.2 m",
        fuelCapacity: "350 L",
        hydraulicCapacity: "250 L",
        maxCuttingDiameter: "60 cm",
        feedSpeed: "Up to 4.5 m/s",
        groundClearance: "670 mm",
        transportWidth: "2.85 m",
        features: ["6-wheel drive", "Compact design", "Excellent maneuverability", "Efficient operation", "Durable construction"]
      }
    },
    {
      id: "ecolog-688g",
      name: "EcoLog 688G",
      category: "Harvester",
      specs: {
        engine: "210 kW Volvo Penta D8",
        power: "286 hp (210 kW)",
        weight: "23,500 kg",
        reach: "10/11 m",
        wheelbase: "4.5 m",
        fuelCapacity: "460 L",
        hydraulicCapacity: "200 L",
        maxCuttingDiameter: "66 cm",
        feedSpeed: "Up to 5.0 m/s",
        groundClearance: "620 mm",
        transportWidth: "2.94/3.00 m",
        features: ["8-wheel drive", "300 kNm crane", "230 kN tractive force", "Steep terrain capability", "Driving modes + Boost"]
      }
    }
  ],
  forwarders: [
    {
      id: "ecolog-594f",
      name: "EcoLog 594F",
      category: "Forwarder",
      specs: {
        engine: "210 kW Volvo engine",
        power: "281 hp (210 kW)",
        weight: "19,800 kg",
        loadCapacity: "20,000 kg",
        reach: "10.0 m",
        wheelbase: "4.6 m",
        fuelCapacity: "400 L",
        hydraulicCapacity: "220 L",
        craneType: "High-capacity crane",
        groundClearance: "715 mm",
        transportWidth: "2.95 m",
        features: ["20-ton capacity", "Low ground pressure", "Comfortable cab", "Advanced hydraulics", "All-terrain capability"]
      }
    },
    {
      id: "ecolog-584f",
      name: "EcoLog 584F",
      category: "Forwarder",
      specs: {
        engine: "175 kW Volvo engine",
        power: "235 hp (175 kW)",
        weight: "17,500 kg",
        loadCapacity: "16,000 kg",
        reach: "9.0 m",
        wheelbase: "4.4 m",
        fuelCapacity: "350 L",
        hydraulicCapacity: "200 L",
        craneType: "Mid-range crane",
        groundClearance: "685 mm",
        transportWidth: "2.85 m",
        features: ["16-ton capacity", "Excellent stability", "Fuel efficient", "Reliable performance", "Easy maintenance"]
      }
    }
  ]
}

const allEquipment = [...equipmentData.harvesters, ...equipmentData.forwarders]

interface EquipmentComparisonProps {
  preselectedIds?: string[]
}

const EquipmentComparison = ({ preselectedIds = [] }: EquipmentComparisonProps) => {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(
    preselectedIds.length > 0 ? preselectedIds.slice(0, 4) : ['ecolog-590g', 'ecolog-580g', 'ecolog-594f', 'ecolog-584f']
  )

  const handleEquipmentSelect = (index: number, equipmentId: string) => {
    const newSelection = [...selectedEquipment]
    newSelection[index] = equipmentId === 'none' ? '' : equipmentId
    setSelectedEquipment(newSelection)
  }

  const selectedEquipmentData = selectedEquipment
    .map(id => id ? allEquipment.find(eq => eq.id === id) : null)
    .filter(Boolean)

  // Get all unique spec keys
  const allSpecKeys = new Set<string>()
  selectedEquipmentData.forEach(eq => {
    if (eq) {
      Object.keys(eq.specs).forEach(key => {
        if (key !== 'features') {
          allSpecKeys.add(key)
        }
      })
    }
  })

  const specLabels: Record<string, string> = {
    engine: "Engine",
    power: "Power",
    weight: "Operating Weight",
    reach: "Max Reach",
    wheelbase: "Wheelbase",
    fuelCapacity: "Fuel Capacity",
    hydraulicCapacity: "Hydraulic Capacity",
    maxCuttingDiameter: "Max Cutting Diameter",
    feedSpeed: "Feed Speed",
    tractionForce: "Traction Force",
    groundClearance: "Ground Clearance",
    transportWidth: "Transport Width",
    loadCapacity: "Load Capacity",
    craneType: "Crane Type",
    liftingTorque: "Lifting Torque"
  }

  return (
    <TooltipProvider>
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-2xl">Equipment Comparison Tool</CardTitle>
          <p className="text-muted-foreground">Compare specifications side-by-side to find the perfect equipment for your needs</p>
        </CardHeader>
        <CardContent className="p-6">
          {/* Equipment Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[0, 1, 2, 3].map((index) => (
              <div key={index}>
                <label className="text-sm font-medium mb-2 block">
                  Equipment {index + 1}
                </label>
                <Select
                  value={selectedEquipment[index] || ""}
                  onValueChange={(value) => handleEquipmentSelect(index, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {allEquipment.map((eq) => (
                      <SelectItem 
                        key={eq.id} 
                        value={eq.id}
                        disabled={selectedEquipment.includes(eq.id) && selectedEquipment[index] !== eq.id}
                      >
                        {eq.name} ({eq.category})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          {selectedEquipmentData.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-3 border-b font-medium">Specification</th>
                    {selectedEquipmentData.map((eq) => (
                      <th key={eq!.id} className="text-left p-3 border-b font-medium">
                        <div>
                          <div className="font-semibold">{eq!.name}</div>
                          <Badge variant="secondary" className="mt-1">{eq!.category}</Badge>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from(allSpecKeys).map((specKey) => (
                    <tr key={specKey} className="hover:bg-muted/50 transition-colors">
                      <td className="p-3 border-b font-medium">
                        <div className="flex items-center gap-2">
                          {specLabels[specKey] || specKey}
                          {specKey === 'power' && (
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-3 w-3 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Engine power output</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </td>
                      {selectedEquipmentData.map((eq) => {
                        if (!eq) return null
                        const value = eq.specs[specKey as keyof typeof eq.specs]
                        return (
                          <td key={eq.id} className="p-3 border-b">
                            {value || '-'}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-3 font-medium">Features</td>
                    {selectedEquipmentData.map((eq) => (
                      <td key={eq!.id} className="p-3">
                        <div className="space-y-1">
                          {eq!.specs.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-1 text-sm">
                              <Check className="h-3 w-3 text-green-600" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {selectedEquipmentData.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Select equipment above to start comparing specifications
            </div>
          )}

          {selectedEquipmentData.length > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <a href="/about/contact">Request Quote for Selected Equipment</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="tel:250-828-2268">Call: 250-828-2268</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}

export default EquipmentComparison