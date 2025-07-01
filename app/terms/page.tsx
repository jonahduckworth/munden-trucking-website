import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "Terms of Service | Munden Truck & Equipment Ltd.",
  description: "Terms of service for Munden Truck & Equipment Ltd. Read our terms and conditions for using our website and services.",
}

export default function TermsPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Terms of Service", url: "https://mundentruckequipment.com/terms" }
  ]

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      
      <section className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="mb-8">
              <Link href="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Terms of Service</CardTitle>
                <p className="text-muted-foreground">Last updated: March 15, 2024</p>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  Welcome to Munden Truck & Equipment Ltd. These Terms of Service ("Terms") govern your use of our 
                  website and services. By accessing or using our services, you agree to be bound by these Terms.
                </p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing our website or using our services, you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, 
                  please do not use our services.
                </p>

                <h2>2. Services</h2>
                <p>
                  Munden Truck & Equipment Ltd. provides truck repair, maintenance, inspection, equipment sales, 
                  and log hauling services. Our services are subject to availability and may be modified or 
                  discontinued at any time without notice.
                </p>

                <h2>3. User Responsibilities</h2>
                <p>When using our services, you agree to:</p>
                <ul>
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the confidentiality of any account credentials</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Not use our services for any unlawful or prohibited purpose</li>
                  <li>Not interfere with or disrupt our services or servers</li>
                </ul>

                <h2>4. Service Appointments and Bookings</h2>
                <p>
                  Service appointments are subject to availability. We reserve the right to refuse service to anyone 
                  for any reason. Cancellations must be made at least 24 hours in advance to avoid cancellation fees.
                </p>

                <h2>5. Pricing and Payment</h2>
                <ul>
                  <li>All prices are in Canadian dollars and subject to applicable taxes</li>
                  <li>Quotes are estimates only and final pricing may vary based on actual work performed</li>
                  <li>Payment is due upon completion of services unless other arrangements are made</li>
                  <li>We accept cash, credit cards, and approved commercial accounts</li>
                </ul>

                <h2>6. Warranties and Disclaimers</h2>
                <p>
                  <strong>Service Warranty:</strong> We warrant our repair services for 90 days or 5,000 km, 
                  whichever comes first. This warranty covers defects in workmanship but does not cover normal 
                  wear and tear or damage caused by misuse.
                </p>
                <p>
                  <strong>Parts Warranty:</strong> Parts are covered by the manufacturer&apos;s warranty. We will 
                  assist with warranty claims but are not responsible for manufacturer warranty terms.
                </p>
                <p>
                  <strong>Equipment Sales:</strong> New equipment is covered by manufacturer warranty. Used equipment 
                  is sold "as is" unless otherwise specified in writing.
                </p>

                <h2>7. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by law, Munden Truck & Equipment Ltd. shall not be liable for any 
                  indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, 
                  whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                </p>

                <h2>8. Indemnification</h2>
                <p>
                  You agree to indemnify and hold harmless Munden Truck & Equipment Ltd., its affiliates, and their 
                  respective officers, directors, employees, and agents from any claims, damages, losses, liabilities, 
                  and expenses arising out of your use of our services or violation of these Terms.
                </p>

                <h2>9. Intellectual Property</h2>
                <p>
                  All content on our website, including text, graphics, logos, images, and software, is the property 
                  of Munden Truck & Equipment Ltd. or its licensors and is protected by intellectual property laws. 
                  You may not use, reproduce, or distribute any content without our written permission.
                </p>

                <h2>10. Privacy</h2>
                <p>
                  Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy 
                  to understand our practices regarding your personal information.
                </p>

                <h2>11. Modifications to Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. We will notify you of any changes by posting 
                  the new Terms on our website. Your continued use of our services after any modifications indicates 
                  your acceptance of the updated Terms.
                </p>

                <h2>12. Governing Law</h2>
                <p>
                  These Terms are governed by and construed in accordance with the laws of British Columbia, Canada, 
                  without regard to its conflict of law principles. Any disputes arising under these Terms shall be 
                  subject to the exclusive jurisdiction of the courts of British Columbia.
                </p>

                <h2>13. Severability</h2>
                <p>
                  If any provision of these Terms is found to be unenforceable or invalid, that provision shall be 
                  limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain 
                  in full force and effect.
                </p>

                <h2>14. Contact Information</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <address className="not-italic">
                  Munden Truck & Equipment Ltd.<br />
                  123 Industrial Way<br />
                  Kamloops, BC V2C 1A1<br />
                  Email: legal@mundentruckequipment.com<br />
                  Phone: 1-800-XXX-XXXX
                </address>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}