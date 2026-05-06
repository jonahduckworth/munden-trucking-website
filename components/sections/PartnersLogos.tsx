"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  {
    id: 1,
    name: "British Columbia",
    logo: "/images/partners/british_columbia.jpeg",
    href: "https://www2.gov.bc.ca/",
  },
  {
    id: 2,
    name: "Carrier",
    logo: "/images/partners/carrier.png",
    href: "https://www.carrier.com/truck-trailer/en/north-america/",
  },
  {
    id: 3,
    name: "EcoLog",
    logo: "/images/partners/ecolog.png",
    href: "https://ecologforestry.com/en/",
  },
  {
    id: 4,
    name: "Parker",
    logo: "/images/partners/parker.jpeg",
    href: "https://www.parker.com/ca/en/home.html",
  },
  {
    id: 5,
    name: "Webasto",
    logo: "/images/partners/webasto.png",
    href: "https://www.webasto.com/en-us/choose-vehicle-solution/heavy-duty-truck.html",
  },
  {
    id: 6,
    name: "ExTe",
    logo: "/images/partners/exte.jpg",
    href: "https://www.exte.se/en/",
  },
  {
    id: 7,
    name: "Grote",
    logo: "/images/partners/grote.jpg",
    href: "https://www.grote.com/",
  },
];

const PartnersLogos = () => {
  const resumeCarouselAfterClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.currentTarget.blur();
  };

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
          aria-label="Industry partner website links"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-gray-50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-gray-50 to-transparent" />

          <div className="py-5">
            <div className="flex w-max animate-[marquee_24s_linear_infinite] gap-4 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
              {[0, 1].map((groupIndex) => (
                <div
                  key={groupIndex}
                  className="flex shrink-0 gap-4"
                  aria-hidden={groupIndex === 1 ? true : undefined}
                >
                  {partners.map((partner) => (
                    <a
                      key={`${groupIndex}-${partner.id}`}
                      href={partner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={groupIndex === 1 ? -1 : undefined}
                      aria-label={`Visit ${partner.name} website (opens in a new tab)`}
                      onClick={resumeCarouselAfterClick}
                      className="group/logo relative flex h-32 w-56 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-border/60 bg-white p-6 shadow-sm transition-[border-color,box-shadow,transform] duration-300 ease-out hover:z-20 hover:-translate-y-1 hover:scale-105 hover:border-primary/35 hover:shadow-xl focus-visible:z-20 focus-visible:-translate-y-1 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 motion-reduce:transition-none sm:w-64 lg:w-72"
                    >
                      <div className="relative h-20 w-full transition-transform duration-300 ease-out group-hover/logo:scale-110 group-focus-visible/logo:scale-110 motion-reduce:transition-none">
                        <Image
                          src={partner.logo}
                          alt=""
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 14rem, (max-width: 1024px) 16rem, 18rem"
                        />
                      </div>
                    </a>
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
