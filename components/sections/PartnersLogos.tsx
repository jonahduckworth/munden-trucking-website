"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  {
    id: 1,
    name: "British Columbia",
    logo: "/images/partners/british_columbia.jpeg",
  },
  { id: 2, name: "Carrier", logo: "/images/partners/carrier.png" },
  { id: 3, name: "EcoLog", logo: "/images/partners/ecolog.png" },
  { id: 4, name: "Parker", logo: "/images/partners/parker.jpeg" },
  { id: 5, name: "Webasto", logo: "/images/partners/webasto.png" },
  { id: 6, name: "ExTe", logo: "/images/partners/exte.jpg" },
  { id: 7, name: "Grote", logo: "/images/partners/grote.jpg" },
];

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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Our Industry Partners
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We work with leading manufacturers and suppliers to provide the best
            equipment and services
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden"
          aria-label="Industry partners"
        >
          <ul className="sr-only">
            {partners.map((partner, index) => (
              <li key={partner.id}>
                {index + 1} of {partners.length}: {partner.name}
              </li>
            ))}
          </ul>

          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-gray-50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-gray-50 to-transparent" />

          <div className="py-2" aria-hidden="true">
            <div className="flex w-max animate-[marquee_34s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
              {[0, 1].map((groupIndex) => (
                <div
                  key={groupIndex}
                  className="flex shrink-0 gap-4 pr-4"
                >
                  {partners.map((partner) => (
                    <div
                      key={`${groupIndex}-${partner.id}`}
                      className="flex h-32 w-56 items-center justify-center rounded-lg bg-white p-6 shadow-sm sm:w-64 lg:w-72"
                    >
                      <div className="relative h-20 w-full">
                        <Image
                          src={partner.logo}
                          alt=""
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 14rem, (max-width: 1024px) 16rem, 18rem"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersLogos;
