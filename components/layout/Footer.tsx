import Link from "next/link"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const Footer = () => {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Munden Truck & Equipment Ltd.</h3>
            <p className="text-sm text-munden-silver dark:text-muted-foreground">
              Your trusted partner for truck repair, parts, and forestry equipment in the BC Interior since 1994.
            </p>
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span className="text-sm">
                725 Carrier Street<br />
                Kamloops, BC V2H 1G1
              </span>
            </div>
          </div>

          {/* Shop Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shop Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/service-department" className="text-sm hover:underline">
                  Service Department
                </Link>
              </li>
              <li>
                <Link href="/services/parts-department" className="text-sm hover:underline">
                  Parts Department
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-service" className="text-sm hover:underline">
                  Mobile Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Equipment Sales */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Equipment Sales</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/equipment/ecolog" className="text-sm hover:underline">
                  EcoLog Forestry
                </Link>
              </li>
              <li>
                <Link href="/equipment/harvesters" className="text-sm hover:underline">
                  Harvesters
                </Link>
              </li>
              <li>
                <Link href="/equipment/forwarders" className="text-sm hover:underline">
                  Forwarders
                </Link>
              </li>
              <li>
                <Link href="/equipment/used" className="text-sm hover:underline">
                  Used Equipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact & Hours</h3>
            <div className="space-y-2">
              <a href="tel:250-828-2268" className="flex items-center space-x-2 text-sm hover:underline">
                <Phone className="h-4 w-4" />
                <span>250-828-2268</span>
              </a>
              <a href="mailto:info@mundentruckequipment.com" className="flex items-center space-x-2 text-sm hover:underline">
                <Mail className="h-4 w-4" />
                <span>info@mundentruckequipment.com</span>
              </a>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Shop Hours:</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Monday - Friday: 7:00 AM - 5:00 PM<br />
                Saturday: 8:00 AM - 12:00 PM<br />
                Sunday: Closed
              </p>
              <p className="text-sm text-destructive font-medium">
                24/7 Emergency Service Available
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Munden Truck & Equipment Ltd. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/about/contact" className="text-sm hover:underline">
              Contact Us
            </Link>
            <Link href="/about/history" className="text-sm hover:underline">
              Our History
            </Link>
            <Link href="/about/resources" className="text-sm hover:underline">
              Resources
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
