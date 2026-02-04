"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, Wrench, Package } from "lucide-react";
import { motion } from "framer-motion";

const SLIDER_ITEMS = [
  "Truck & Trailer Repair",
  "Parts",
  "Forestry Equipment",
  "Equipment Repair",
  "Mobile Service",
  "CVIP Inspections",
];

const InfiniteSlider = () => {
  // We render two identical sets side by side, then CSS-animate the first set's
  // width to the left. When the first set is fully off-screen the second set
  // is in exactly the same position, so the loop is seamless.
  const renderSet = (keyPrefix: string) =>
    SLIDER_ITEMS.map((item, index) => (
      <span
        key={`${keyPrefix}-${index}`}
        className="inline-flex items-center text-2xl sm:text-3xl lg:text-4xl font-bold text-white shrink-0"
      >
        <span className="mx-5 text-primary/40 text-lg">•</span>
        {item}
      </span>
    ));

  return (
    <div className="relative overflow-hidden w-full py-4">
      <div className="inline-flex animate-marquee">
        {renderSet("a")}
        {renderSet("b")}
        {renderSet("c")}
        {renderSet("d")}
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-munden-black/80 to-munden-burgundy/40 dark:from-black/80 dark:to-primary/30 z-10" />
        <div className="h-full w-full bg-gradient-to-br from-munden-burgundy via-munden-black to-munden-burgundy dark:from-background dark:via-primary/20 dark:to-background" />
      </div>

      {/* Content */}
      <div className="container relative z-20 py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Mobile: Logo + "Your Trusted Partner For" + Slider */}
            <div className="lg:hidden flex flex-col items-center text-center mb-8 pt-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Munden Truck & Equipment Ltd."
                  width={250}
                  height={250}
                  className="w-[200px] sm:w-[250px] h-auto mb-6"
                  priority
                />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-gray-300 tracking-wide uppercase font-medium"
              >
                Your Trusted Partner For
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-full mt-2"
              >
                <InfiniteSlider />
              </motion.div>
            </div>

            {/* Desktop: "Your Trusted Partner For" + Slider */}
            <div className="hidden lg:block mb-6">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xl text-gray-300 tracking-wide uppercase font-medium mb-2"
              >
                Your Trusted Partner For
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full"
              >
                <InfiniteSlider />
              </motion.div>
            </div>

            <p className="text-lg md:text-xl mb-8 text-gray-200 text-center lg:text-left">
              Professional truck repair services, CVIP inspections, and
              authorized EcoLog dealer serving the BC Interior. Available 24/7
              for emergency repairs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
              <Button size="lg" asChild className="group">
                <a href="tel:250-828-2268">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-white/10 text-white border-white hover:bg-white hover:text-munden-burgundy"
              >
                <Link href="/services/service-department">
                  <Wrench className="mr-2 h-4 w-4" />
                  Our Services
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-white/10 text-white border-white hover:bg-white hover:text-munden-burgundy"
              >
                <Link href="/services/parts-department">
                  <Package className="mr-2 h-4 w-4" />
                  Our Parts
                </Link>
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
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">Open 7 Days</p>
                  <p className="text-sm text-gray-300">24 Hours a Day</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex items-center space-x-3"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Wrench className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">Expert Technicians</p>
                  <p className="text-sm text-gray-300">
                    Certified Professionals
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex items-center space-x-3"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">24/7 Service Trucks</p>
                  <p className="text-sm text-gray-300">Always Available</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Desktop logo (unchanged) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-center items-center"
          >
            <Image
              src="/images/logo.png"
              alt="Munden Truck & Equipment Ltd."
              width={500}
              height={500}
              className="w-full max-w-lg h-auto"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
