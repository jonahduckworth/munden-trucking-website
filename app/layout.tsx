import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mundentruckequipment.com'),
  title: {
    default: "Munden Truck & Equipment Ltd. | Truck Repair & Forestry Equipment in Kamloops, BC",
    template: "%s | Munden Truck & Equipment Ltd."
  },
  description: "Professional truck repair, CVIP inspections, log hauling services, and authorized EcoLog dealer in the BC Interior. 24/7 emergency service available.",
  keywords: ["truck repair kamloops", "CVIP inspection BC", "log hauling BC Interior", "EcoLog dealer BC", "commercial vehicle repair", "forestry equipment kamloops"],
  authors: [{ name: "Munden Truck & Equipment Ltd." }],
  creator: "Munden Truck & Equipment Ltd.",
  publisher: "Munden Truck & Equipment Ltd.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Munden Truck & Equipment Ltd.",
    description: "Professional truck repair, CVIP inspections, log hauling services, and authorized EcoLog dealer in the BC Interior.",
    url: 'https://mundentruckequipment.com',
    siteName: 'Munden Truck & Equipment Ltd.',
    locale: 'en_CA',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: "Munden Truck & Equipment Ltd.",
    description: "Professional truck repair, CVIP inspections, log hauling services, and authorized EcoLog dealer in the BC Interior.",
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
