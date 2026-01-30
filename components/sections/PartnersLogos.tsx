"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const partners = [
  { id: 1, name: "British Columbia", logo: "/images/partners/british_columbia.jpeg" },
  { id: 2, name: "Carrier", logo: "/images/partners/carrier.png" },
  { id: 3, name: "Google", logo: "/images/partners/google.png" },
  { id: 4, name: "Parker", logo: "/images/partners/parker.jpeg" },
  { id: 5, name: "Webasto", logo: "/images/partners/webasto.png" },
]

const PartnersLogos = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Industry Partners</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We work with leading manufacturers and suppliers to provide the best equipment and services
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-16">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnersLogos