"use client"

import { motion } from "framer-motion"

const partners = [
  { id: 1, name: "EcoLog", logo: "/images/partners/ecolog.png" },
  { id: 2, name: "Partner 2", logo: "/images/partners/partner2.png" },
  { id: 3, name: "Partner 3", logo: "/images/partners/partner3.png" },
  { id: 4, name: "Partner 4", logo: "/images/partners/partner4.png" },
  { id: 5, name: "Partner 5", logo: "/images/partners/partner5.png" },
  { id: 6, name: "Partner 6", logo: "/images/partners/partner6.png" },
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Placeholder for partner logos */}
              <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">{partner.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnersLogos