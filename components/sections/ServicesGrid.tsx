"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, CheckCircle, AlertCircle, Settings, Trees, ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    title: "Truck & Equipment Repair",
    description: "Full-service repair shop for all makes and models of trucks and heavy equipment with certified technicians.",
    icon: Truck,
    href: "/services/repair-shop",
  },
  {
    title: "CVIP Inspections",
    description: "Certified Commercial Vehicle Inspection Program facility. Keep your fleet compliant and road-ready.",
    icon: CheckCircle,
    href: "/services/repair-shop/commercial-vehicle-inspections",
  },
  {
    title: "Emergency Repairs",
    description: "24/7 emergency breakdown service. We'll get you back on the road quickly and safely.",
    icon: AlertCircle,
    href: "/services/repair-shop/emergency-repairs",
  },
  {
    title: "Preventive Maintenance",
    description: "Scheduled maintenance programs to minimize downtime and extend equipment life.",
    icon: Settings,
    href: "/services/repair-shop/preventive-maintenance",
  },
  {
    title: "Log Hauling Services",
    description: "Professional log transportation throughout the BC Interior with modern equipment.",
    icon: Trees,
    href: "/services/log-hauling",
  },
  {
    title: "Equipment Sales",
    description: "Authorized EcoLog dealer - new and used forestry equipment, harvesters, and forwarders.",
    icon: ShoppingCart,
    href: "/services/equipment-sales",
  }
]

const ServicesGrid = () => {
  return (
    <section className="py-20 bg-secondary/30 dark:bg-muted/30">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From routine maintenance to emergency repairs, we provide comprehensive services for the trucking and forestry industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={service.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden border-muted-foreground/20">
                    <div className="h-2 bg-primary" />
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {service.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                      <p className="mt-4 text-sm font-medium text-primary group-hover:underline">
                        Learn more →
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesGrid