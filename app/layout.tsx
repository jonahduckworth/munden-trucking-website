import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './providers';
import Script from 'next/script';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mundentruckequipment.com'),
  title: {
    default:
      'Munden Truck & Equipment | Kamloops Truck Repair, Trailer Repair & CVIP Inspections',
    template: '%s | Munden Truck & Equipment',
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  description:
    'Munden Truck & Equipment - Kamloops truck repair, trailer repair, CVIP inspections, mobile service, emergency repairs. Welding, fabrication, hydraulics, A/C repair. Carrier, Thermo King, Webasto service. 24/7 emergency roadside service.',
  keywords: [
    'Munden',
    'Munden truck & equipment',
    'Munden truck',
    'Munden trucking',
    'Kamloops truck repair',
    'kamloops trailer repair',
    'kamloops equipment repair',
    'kamloops service truck',
    'kamloops mobile service',
    'kamloops emergency service',
    'Truck repair',
    'Trailer repair',
    'Equipment repair',
    'Roadside repair',
    'Emergency repair',
    'Automotive repair',
    'Vehicle repair',
    'Engine repair',
    'Suspension repair',
    'Repair service',
    'Mechanic',
    'Mechanical',
    'Mechanic repair',
    'Mechanical repair',
    'Vehicle repair',
    'Car repair',
    'Truck shop',
    'Trailer shop',
    'Automotive shop',
    'Equipment shop',
    'Mobile service',
    'Service truck',
    'Emergency service',
    'Roadside service',
    'Service call',
    'welding',
    'fabrication',
    'hydraulics',
    'Inspections',
    'Truck inspection',
    'Trailer inspection',
    'MVI',
    'CVI',
    'CVIP',
    'Forestry repairs',
    'Construction repairs',
    'Civil repairs',
    'RV repair',
    'Cranes',
    'Maintenance',
    'Refrigeration',
    'Refrigeration trailer',
    'Reefer',
    'Air Conditioning',
    'A/C repair',
    'Carrier',
    'Coldfront',
    'Thermo king',
    'Webasto',
    'Espar',
    'Engine heater',
    'Truck parts',
    'Trailer parts',
    'Lubricants',
    'Hydraulic hose',
    'Equipment parts',
  ],
  authors: [{ name: 'Munden Truck & Equipment Ltd.' }],
  creator: 'Munden Truck & Equipment Ltd.',
  publisher: 'Munden Truck & Equipment Ltd.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Munden Truck & Equipment - Kamloops Truck Repair & Mobile Service',
    description:
      'Munden trucking offers Kamloops truck repair, trailer repair, CVIP inspections, mobile service, emergency repairs, welding, fabrication, hydraulics. Carrier, Thermo King refrigeration. 24/7 roadside service.',
    url: 'https://mundentruckequipment.com',
    siteName: 'Munden Truck & Equipment',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Munden Truck & Equipment - Truck Repair & Service in Kamloops',
      },
    ],
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
    title: 'Munden Truck & Equipment - Kamloops Truck Repair & Mobile Service',
    description:
      'Munden trucking - Kamloops truck repair, trailer repair, equipment repair. CVIP, MVI inspections. Mobile service truck, emergency roadside repair. Welding, hydraulics, A/C repair.',
    card: 'summary_large_image',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
          process.env.NEXT_PUBLIC_GOOGLE_ADS_ID) && (
          <>
            <Script
              strategy='afterInteractive'
              src={`https://www.googletagmanager.com/gtag/js?id=${
                process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
                process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
              }`}
            />
            <Script
              id='google-analytics'
              strategy='afterInteractive'
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  ${
                    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
                      ? `gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');`
                      : ''
                  }
                  ${
                    process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
                      ? `gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}');`
                      : ''
                  }
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          <main className='flex-1'>{children}</main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
