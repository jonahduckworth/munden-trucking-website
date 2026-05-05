"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";

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

const ROTATION_DELAY = 3500;

const PartnersLogos = () => {
  const shouldReduceMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const updateSelectedIndex = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollToPartner = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const scrollPrevious = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateSelectedIndex();
    emblaApi.on("select", updateSelectedIndex);
    emblaApi.on("reInit", updateSelectedIndex);

    return () => {
      emblaApi.off("select", updateSelectedIndex);
      emblaApi.off("reInit", updateSelectedIndex);
    };
  }, [emblaApi, updateSelectedIndex]);

  useEffect(() => {
    if (!emblaApi || isPaused || shouldReduceMotion) return;

    const rotation = window.setInterval(() => {
      emblaApi.scrollNext();
    }, ROTATION_DELAY);

    return () => window.clearInterval(rotation);
  }, [emblaApi, isPaused, shouldReduceMotion]);

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
          className="relative"
          aria-roledescription="carousel"
          aria-label="Industry partners carousel"
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden px-1 py-2" ref={emblaRef}>
            <div className="-ml-4 flex">
              {partners.map((partner, index) => (
                <div
                  key={partner.id}
                  className="min-w-0 flex-[0_0_76%] pl-4 sm:flex-[0_0_48%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] xl:flex-[0_0_20%]"
                  aria-label={`${index + 1} of ${partners.length}: ${
                    partner.name
                  }`}
                >
                  <div className="flex h-32 items-center justify-center rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="relative h-20 w-full">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 76vw, (max-width: 768px) 48vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 hidden -translate-x-4 -translate-y-1/2 bg-white shadow-sm md:inline-flex"
            onClick={scrollPrevious}
            aria-label="Previous partner"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-4 bg-white shadow-sm md:inline-flex"
            onClick={scrollNext}
            aria-label="Next partner"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div className="mt-8 flex justify-center gap-2">
            {partners.map((partner, index) => (
              <button
                key={partner.id}
                type="button"
                onClick={() => scrollToPartner(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Show ${partner.name}`}
                aria-current={index === selectedIndex ? "true" : undefined}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersLogos;
