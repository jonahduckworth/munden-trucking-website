"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { motion } from "framer-motion"

const LocationSection = () => {
  return (
    <section className="py-20 bg-secondary/30 dark:bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit Our Shop</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Located in Kamloops, BC, we serve the entire BC Interior with expert truck repair, parts, and equipment services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.1839889687844!2d-120.32891602337467!3d50.67009607167635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537e2c8b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2s725%20Carrier%20St%2C%20Kamloops%2C%20BC%20V2H%201G1!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Munden Truck & Equipment Location"
                />
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4">
              <Button asChild size="lg" className="w-full">
                <a href="tel:250-828-2268">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us Now
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="/about/contact">
                  Send a Message
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      725 Carrier Street<br />
                      Kamloops, BC V2H 1G1
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a href="tel:250-828-2268" className="text-muted-foreground hover:text-primary">
                      250-828-2268
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:kamloops.shop@mundengroup.ca" className="text-muted-foreground hover:text-primary break-all">
                      kamloops.shop@mundengroup.ca
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Hours</h3>
                    <p className="text-muted-foreground">
                      Open 24 hours — 7 days a week
                    </p>
                    <p className="text-sm text-destructive font-medium mt-1">
                      24/7 Emergency Service Available
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LocationSection
