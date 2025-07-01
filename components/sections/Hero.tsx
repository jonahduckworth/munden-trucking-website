"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Calendar, Wrench } from "lucide-react"
import { motion } from "framer-motion"

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <div 
          className="h-full w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        />
      </div>

      {/* Content */}
      <div className="container relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-white"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Your Trusted Partner for Truck Repair & Forestry Equipment
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Professional truck repair services, CVIP inspections, log hauling, and authorized EcoLog dealer 
            serving the BC Interior. Available 24/7 for emergency repairs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" asChild className="group">
              <Link href="/quote">
                Get Free Quote
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/10 text-white border-white hover:bg-white hover:text-black">
              <Link href="/services/repair-shop">
                <Wrench className="mr-2 h-4 w-4" />
                Our Services
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/10 text-white border-white hover:bg-white hover:text-black">
              <a href="tel:1-800-XXX-XXXX">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center space-x-3"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">Open 6 Days</p>
                <p className="text-sm text-gray-300">Mon-Sat Service</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center space-x-3"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Wrench className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">Expert Technicians</p>
                <p className="text-sm text-gray-300">Certified Professionals</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex items-center space-x-3"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">24/7 Emergency</p>
                <p className="text-sm text-gray-300">Always Available</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero