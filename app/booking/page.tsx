import { Metadata } from "next"
import ServiceBooking from "@/components/contact/ServiceBooking"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Clock, MapPin, AlertCircle } from "lucide-react"
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "Book Service Appointment | Schedule Truck Repair Online",
  description: "Book your truck repair or CVIP inspection online. Schedule service appointments 24/7 with Munden Truck & Equipment Ltd. in Kamloops, BC.",
  openGraph: {
    title: "Book Service Appointment | Munden Truck & Equipment Ltd.",
    description: "Schedule your truck service online. Quick and easy appointment booking.",
  },
}

export default function BookingPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Book Service", url: "https://mundentruckequipment.com/booking" }
  ]

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Book Your Service Online
            </h1>
            <p className="text-lg text-muted-foreground">
              Schedule your truck or equipment service appointment in just a few clicks. 
              We&apos;ll confirm your booking within 1 business hour.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Quick Booking</h3>
                <p className="text-sm text-muted-foreground">
                  Book your appointment in under 2 minutes
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Fast Confirmation</h3>
                <p className="text-sm text-muted-foreground">
                  Receive confirmation within 1 business hour
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Convenient Location</h3>
                <p className="text-sm text-muted-foreground">
                  Easy access location in Kamloops, BC
                </p>
              </CardContent>
            </Card>
          </div>

          <ServiceBooking />

          <div className="mt-12 max-w-4xl mx-auto">
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2">Important Information</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Please arrive 10 minutes before your scheduled appointment</li>
                      <li>• Bring your vehicle registration and any relevant service history</li>
                      <li>• For CVIP inspections, ensure your vehicle is clean and accessible</li>
                      <li>• We offer courtesy shuttle service within Kamloops city limits</li>
                      <li>• Payment is due upon completion of service</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}