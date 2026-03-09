"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote, Star, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Jennifer Naples",
    company: "Google Review",
    rating: 5,
    text: "Huge thanks to the team at Munden for their help during a stressful situation. I arrived Sunday evening, they diagnosed the issue right away, allowed me to stay overnight in my truck and camper, and had me back on the road in under 24 hours. Special thanks to Mike and Ryan!",
    service: "Emergency Service",
  },
  {
    id: 2,
    name: "Katie Smallhorn",
    company: "Google Review",
    rating: 5,
    text: "Our 1988 RV engine stopped running on our trip from SK through BC. The guys here treated my husband and I with kindness and made us feel so reassured that everything was going to be okay. The mechanic identified the failing fuel pump and replaced it super quickly. The price was reasonable and the service was professional and fast.",
    service: "RV Repair",
  },
  {
    id: 3,
    name: "Ryan Vik",
    company: "Cardinal Boat Movers, Delta BC",
    rating: 5,
    text: "I had a wheel seal go out on my western star and was in a rush to get to my next location and they got me straight in and all fixed up in under 2 hrs. As an owner operator I really appreciate good service and people who do what they say and these guys were spot on.",
    service: "Quick Repair",
  },
  {
    id: 4,
    name: "Kevin Joslin",
    company: "Google Review",
    rating: 5,
    text: "Prompt and professional. I've used their mobile service and also taken my truck to their shop and have been very pleased every time. Very knowledgeable techs there. Highly recommend.",
    service: "Mobile & Shop Service",
  },
  {
    id: 5,
    name: "Shea Goertz",
    company: "Google Review",
    rating: 5,
    text: "Awesome shop. They always get our trucks in right away and will actually call us when they are slow to see if we need service done.",
    service: "Fleet Service",
  },
  {
    id: 6,
    name: "Sukhpreet Singh",
    company: "Google Review",
    rating: 5,
    text: "Great experience at this truck repair shop. They fixed my reefer quickly and did a solid job. Ryan was super friendly and very professional throughout the whole process. Really appreciate the fast and reliable service.",
    service: "Reefer Repair",
  },
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect prefers-reduced-motion on mount and watch for changes
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Autoplay: disabled when reduced-motion or manually paused
  const isAutoPlaying = !prefersReducedMotion && !isPaused;

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsPaused(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  const goToNext = () => {
    setIsPaused(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsPaused(true);
    setCurrentIndex(index);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  // Framer motion variants — no animation when reduced-motion
  const slideVariants = prefersReducedMotion
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
      };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real reviews from real customers. Trusted by drivers, fleets, and RV owners across BC for over 30 years
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* aria-live: only announce when autoplay is active */}
          <div
            aria-live={isAutoPlaying ? "polite" : "off"}
            aria-atomic="true"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={slideVariants.initial}
                animate={slideVariants.animate}
                exit={slideVariants.exit}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
              >
                <Card className="border-muted-foreground/20">
                  <CardContent className="p-8 md:p-12">
                    <Quote className="h-12 w-12 text-primary/20 mb-6" />

                    <div className="flex mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-primary text-primary"
                          />
                        ),
                      )}
                    </div>

                    <p className="text-lg md:text-xl mb-6 italic">
                      &ldquo;{testimonials[currentIndex].text}&rdquo;
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">
                          {testimonials[currentIndex].name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonials[currentIndex].company}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">
                          {testimonials[currentIndex].service}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 hidden md:flex"
            onClick={goToPrevious}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 hidden md:flex"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots + Pause/Play */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}

            {/* Pause/Play toggle — hidden when reduced-motion is active (autoplay is already off) */}
            {!prefersReducedMotion && (
              <button
                onClick={togglePause}
                className="ml-2 h-6 w-6 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label={isPaused ? "Play carousel" : "Pause carousel"}
              >
                {isPaused ? (
                  <Play className="h-3 w-3" />
                ) : (
                  <Pause className="h-3 w-3" />
                )}
              </button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <Button variant="outline" size="sm" onClick={goToPrevious}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={goToNext}>
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
