import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './providers';
import Script from 'next/script';
import { siteUrl } from '@/lib/site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    url: siteUrl,
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
