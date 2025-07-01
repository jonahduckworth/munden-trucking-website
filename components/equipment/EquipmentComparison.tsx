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

// Example equipment data - in production, this would come from a database
const equipmentData = {
  harvesters: [
    {
      id: "ecolog-590f",
      name: "EcoLog 590F",
      category: "Harvester",
      specs: {
        engine: "Cummins QSL9, Tier 4F",
        power: "300 hp (224 kW)",
        weight: "20,900 kg",
        reach: "10.3 m",
        wheelbase: "3.4 m",
        fuelCapacity: "400 L",
        hydraulicCapacity: "300 L",
        maxCuttingDiameter: "65 cm",
        feedSpeed: "5.0 m/s",
        tractionForce: "240 kN",
        groundClearance: "695 mm",
        transportWidth: "2.99 m",
        features: ["GPS tracking", "Remote diagnostics", "Eco mode", "Automatic lubrication", "LED work lights"]
      }
    },
    {
      id: "ecolog-560f",
      name: "EcoLog 560F",
      category: "Harvester",
      specs: {
        engine: "Cummins QSB6.7, Tier 4F",
        power: "230 hp (172 kW)",
        weight: "17,500 kg",
        reach: "8.6 m",
        wheelbase: "3.2 m",
        fuelCapacity: "330 L",
        hydraulicCapacity: "250 L",
        maxCuttingDiameter: "55 cm",
        feedSpeed: "4.5 m/s",
        tractionForce: "200 kN",
        groundClearance: "650 mm",
        transportWidth: "2.80 m",
        features: ["GPS tracking", "Remote diagnostics", "Eco mode", "LED work lights"]
      }
    }
  ],
  forwarders: [
    {
      id: "ecolog-574f",
      name: "EcoLog 574F",
      category: "Forwarder",
      specs: {
        engine: "Cummins QSB6.7, Tier 4F",
        power: "210 hp (156 kW)",
        weight: "17,100 kg",
        loadCapacity: "14,000 kg",
        reach: "8.5 m",
        wheelbase: "4.4 m",
        fuelCapacity: "200 L",
        hydraulicCapacity: "180 L",
        craneType: "EcoLog 80F",
        liftingTorque: "102 kNm",
        groundClearance: "680 mm",
        transportWidth: "2.82 m",
        features: ["Load scale", "GPS tracking", "Eco mode", "LED work lights", "Central lubrication"]
      }
    },
    {
      id: "ecolog-594f",
      name: "EcoLog 594F",
      category: "Forwarder",
      specs: {
        engine: "Cummins QSL9, Tier 4F",
        power: "280 hp (209 kW)",
        weight: "19,800 kg",
        loadCapacity: "18,000 kg",
        reach: "10.0 m",
        wheelbase: "4.6 m",
        fuelCapacity: "260 L",
        hydraulicCapacity: "220 L",
        craneType: "EcoLog 110F",
        liftingTorque: "136 kNm",
        groundClearance: "715 mm",
        transportWidth: "2.95 m",
        features: ["Load scale", "GPS tracking", "Remote diagnostics", "Eco mode", "LED work lights", "Central lubrication", "Automatic greasing"]
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
    preselectedIds.slice(0, 3)
  )

  const handleEquipmentSelect = (index: number, equipmentId: string) => {
    const newSelection = [...selectedEquipment]
    newSelection[index] = equipmentId
    setSelectedEquipment(newSelection)
  }

  const selectedEquipmentData = selectedEquipment
    .map(id => allEquipment.find(eq => eq.id === id))
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[0, 1, 2].map((index) => (
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
                    <SelectItem value="">None</SelectItem>
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
                        const value = eq!.specs[specKey as keyof typeof eq.specs]
                        return (
                          <td key={eq!.id} className="p-3 border-b">
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
                <a href="/quote">Request Quote for Selected Equipment</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/contact">Contact Sales Team</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}

export default EquipmentComparison