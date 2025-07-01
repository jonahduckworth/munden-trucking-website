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
            <p className="text-sm text-muted-foreground">
              Your trusted partner for truck repair, log hauling, and forestry equipment in the BC Interior.
            </p>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Kamloops, BC</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/repair-shop" className="text-sm hover:underline">
                  Truck & Equipment Repair
                </Link>
              </li>
              <li>
                <Link href="/services/repair-shop/commercial-vehicle-inspections" className="text-sm hover:underline">
                  CVIP Inspections
                </Link>
              </li>
              <li>
                <Link href="/services/log-hauling" className="text-sm hover:underline">
                  Log Hauling Services
                </Link>
              </li>
              <li>
                <Link href="/services/equipment-sales" className="text-sm hover:underline">
                  Equipment Sales
                </Link>
              </li>
            </ul>
          </div>

          {/* Equipment */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Equipment</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/equipment/new/harvesters" className="text-sm hover:underline">
                  EcoLog Harvesters
                </Link>
              </li>
              <li>
                <Link href="/equipment/new/forwarders" className="text-sm hover:underline">
                  EcoLog Forwarders
                </Link>
              </li>
              <li>
                <Link href="/equipment/used" className="text-sm hover:underline">
                  Used Equipment
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-sm hover:underline">
                  Request Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact & Hours</h3>
            <div className="space-y-2">
              <a href="tel:1-800-XXX-XXXX" className="flex items-center space-x-2 text-sm hover:underline">
                <Phone className="h-4 w-4" />
                <span>1-800-XXX-XXXX</span>
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
                Saturday: 8:00 AM - 2:00 PM<br />
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
            <Link href="/privacy" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer