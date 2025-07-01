import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import StructuredData, { breadcrumbSchema } from "@/components/seo/StructuredData"

export const metadata: Metadata = {
  title: "Privacy Policy | Munden Truck & Equipment Ltd.",
  description: "Privacy policy for Munden Truck & Equipment Ltd. Learn how we collect, use, and protect your personal information.",
}

export default function PrivacyPage() {
  const breadcrumbs = [
    { name: "Home", url: "https://mundentruckequipment.com" },
    { name: "Privacy Policy", url: "https://mundentruckequipment.com/privacy" }
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
                <CardTitle className="text-3xl">Privacy Policy</CardTitle>
                <p className="text-muted-foreground">Last updated: March 15, 2024</p>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <p>
                  Munden Truck & Equipment Ltd. ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                  you visit our website or use our services.
                </p>

                <h2>Information We Collect</h2>
                <p>We may collect information about you in various ways, including:</p>
                <ul>
                  <li><strong>Personal Data:</strong> Name, email address, phone number, company name, and other contact details you provide</li>
                  <li><strong>Vehicle Information:</strong> Make, model, year, and service history of vehicles you bring for service</li>
                  <li><strong>Usage Data:</strong> Information about how you use our website and services</li>
                  <li><strong>Device Data:</strong> IP address, browser type, operating system, and other technical information</li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send administrative information, such as updates and security alerts</li>
                  <li>Respond to your comments, questions, and provide customer service</li>
                  <li>Send marketing and promotional communications (with your consent)</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2>Information Sharing and Disclosure</h2>
                <p>We may share your information in the following situations:</p>
                <ul>
                  <li><strong>Service Providers:</strong> With third parties that perform services on our behalf</li>
                  <li><strong>Business Partners:</strong> With equipment manufacturers and parts suppliers as necessary</li>
                  <li><strong>Legal Requirements:</strong> If required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition</li>
                  <li><strong>Consent:</strong> With your consent or at your direction</li>
                </ul>

                <h2>Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect your personal 
                  information against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, 
                  or access. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>

                <h2>Your Rights</h2>
                <p>Under applicable privacy laws, you may have the right to:</p>
                <ul>
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to or restrict certain processing of your information</li>
                  <li>Withdraw consent where processing is based on consent</li>
                  <li>Data portability (receive your data in a structured format)</li>
                </ul>

                <h2>Cookies and Tracking Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our website and hold certain 
                  information. You can instruct your browser to refuse all cookies or to indicate when a cookie is 
                  being sent.
                </p>

                <h2>Third-Party Websites</h2>
                <p>
                  Our website may contain links to third-party websites. We are not responsible for the privacy 
                  practices or content of these third-party sites. We encourage you to read their privacy policies.
                </p>

                <h2>Children&apos;s Privacy</h2>
                <p>
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect 
                  personal information from children under 18.
                </p>

                <h2>Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last updated" date.
                </p>

                <h2>Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy or our privacy practices, please contact us at:
                </p>
                <address className="not-italic">
                  Munden Truck & Equipment Ltd.<br />
                  123 Industrial Way<br />
                  Kamloops, BC V2C 1A1<br />
                  Email: privacy@mundentruckequipment.com<br />
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