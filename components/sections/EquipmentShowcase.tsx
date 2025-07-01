"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const equipment = [
  {
    id: 1,
    name: "EcoLog 590G Harvester",
    category: "Harvester",
    description: "High-performance harvester designed for demanding conditions",
    image: "/images/equipment/590g-harvester.jpg",
    features: ["6-wheel drive", "Powerful crane", "Efficient fuel consumption"],
    href: "/equipment/new/harvesters/590g",
    isNew: true
  },
  {
    id: 2,
    name: "EcoLog 594F Forwarder",
    category: "Forwarder",
    description: "Robust forwarder with exceptional load capacity",
    image: "/images/equipment/594f-forwarder.jpg",
    features: ["20-ton capacity", "Low ground pressure", "Comfortable cab"],
    href: "/equipment/new/forwarders/594f",
    isNew: true
  },
  {
    id: 3,
    name: "Used Equipment Inventory",
    category: "Various",
    description: "Quality pre-owned forestry equipment",
    image: "/images/equipment/used-inventory.jpg",
    features: ["Inspected & certified", "Warranty available", "Competitive pricing"],
    href: "/equipment/used",
    isNew: false
  }
]

const EquipmentShowcase = () => {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Equipment Showcase</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            As the authorized EcoLog dealer for Western Canada, we offer premium forestry equipment built for performance and reliability.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link href="/equipment/new">
                View New Equipment
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/equipment/used">
                Browse Used Inventory
              </Link>
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {equipment.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={item.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden">
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.isNew && (
                      <Badge className="absolute top-4 right-4">NEW</Badge>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-2">
                      <span className="text-sm text-muted-foreground">{item.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <ul className="space-y-1 mb-4">
                      {item.features.map((feature) => (
                        <li key={feature} className="text-sm flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                      <span>View Details</span>
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EquipmentShowcase