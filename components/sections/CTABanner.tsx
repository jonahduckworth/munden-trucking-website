"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

const CTABanner = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Emergency Repair Service?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Our experienced technicians are available 24/7 for emergency breakdowns. 
            Don&apos;t let equipment failure slow down your operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:1-800-XXX-XXXX">
                <Phone className="mr-2 h-5 w-5" />
                Call Emergency Line
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/contact">
                <MessageSquare className="mr-2 h-5 w-5" />
                Request Service
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold mb-2">24/7</div>
              <p className="opacity-90">Emergency Service</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold mb-2">30+</div>
              <p className="opacity-90">Years Experience</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold mb-2">100%</div>
              <p className="opacity-90">Satisfaction Guaranteed</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTABanner