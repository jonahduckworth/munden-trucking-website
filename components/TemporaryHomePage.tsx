"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Clock, MapPin, Wrench, Truck, TreePine, Shield, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const TemporaryHomePage = () => {
  const [taglineIndex, setTaglineIndex] = useState(0)
  
  const taglines = [
    "4th Generation Family-Owned",
    "Serving the BC Interior Commercial Transport & HD Industry"
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length)
    }, 3000) // Change every 3 seconds
    
    return () => clearInterval(interval)
  }, [])
  
  const services = [
    {
      icon: Wrench,
      title: "Truck & Trailer Repair",
      description: "Commercial truck & trailer repair, heavy duty diagnostics",
      href: "/services/repair-shop"
    },
    {
      icon: Shield,
      title: "CVIP Inspections",
      description: "Government certified commercial vehicle inspection facility",
      href: "/services/repair-shop/commercial-vehicle-inspections"
    },
    {
      icon: Truck,
      title: "Mobile Service",
      description: "Mobile service trucks for on-site repairs and emergency service",
      href: "/services/repair-shop/emergency-repairs"
    },
    {
      icon: TreePine,
      title: "Specialized Services",
      description: "Welding, fabrication, hydraulics, A/C & refrigeration",
      href: "/services"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-munden-burgundy/10 via-transparent to-munden-black/10" />
        
        <div className="container relative pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Image
                src="/images/logo.png"
                alt="Munden Truck & Equipment Ltd. Logo"
                width={300}
                height={200}
                className="mx-auto"
                priority
              />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-munden-burgundy to-munden-black dark:from-primary dark:to-primary/60 bg-clip-text text-transparent">
              Munden Truck & Equipment Ltd.
            </h1>
            <div className="h-16 md:h-20 mb-8 relative">
              <AnimatePresence mode="wait">
                <motion.p
                  key={taglineIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="text-xl md:text-2xl text-muted-foreground absolute inset-0 flex items-center justify-center text-center px-4"
                >
                  {taglines[taglineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild>
                <a href="tel:250-828-2268">
                  <Phone className="mr-2 h-4 w-4" />
                  Call 250-828-2268
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://www.google.com/maps/search/?api=1&query=725+Carrier+Street,+Kamloops,+BC+V2H+1G1" target="_blank" rel="noopener noreferrer">
                  <MapPin className="mr-2 h-4 w-4" />
                  Get Directions
                </a>
              </Button>
            </div>

            {/* Quick Info */}
            <div className="flex flex-col gap-6 mt-12 w-fit mx-auto md:w-full md:grid md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 text-muted-foreground"
              >
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">Open 7 Days</p>
                  <p className="text-sm">24/7 Service Available</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 text-muted-foreground md:justify-center"
              >
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">24/7 Emergency</p>
                  <p className="text-sm">Always Available</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 text-muted-foreground md:justify-end"
              >
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">Kamloops, BC</p>
                  <p className="text-sm">725 Carrier Street</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive heavy-duty repair services with mobile units available 24/7
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <service.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-munden-burgundy to-munden-black dark:from-primary dark:to-primary/80">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Expert technicians ready to service your commercial vehicles and heavy equipment
            </p>
            <div className="flex justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="tel:250-828-2268">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-secondary/20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="text-4xl font-bold text-primary mb-2">4th</div>
              <p className="text-muted-foreground">Generation Family Business</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <div className="text-4xl font-bold text-primary mb-2">CVIP</div>
              <p className="text-muted-foreground">Certified Inspection Facility</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Emergency Service</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <div className="text-4xl font-bold text-primary mb-2">Full</div>
              <p className="text-muted-foreground">Service Shop & Mobile Units</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TemporaryHomePage
