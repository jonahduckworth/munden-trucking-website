import { FC } from 'react'

interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export const StructuredData: FC<StructuredDataProps> = ({ data }) => {
  const jsonLd = Array.isArray(data) ? data : [data]
  
  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item),
          }}
        />
      ))}
    </>
  )
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Munden Truck & Equipment Ltd.",
  "image": "https://mundentruckequipment.com/images/logo.png",
  "url": "https://mundentruckequipment.com",
  "telephone": "1-800-XXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Industrial Way",
    "addressLocality": "Kamloops",
    "addressRegion": "BC",
    "postalCode": "V2C 1A1",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.674522,
    "longitude": -120.327850
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "14:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/mundentruckequipment",
    "https://www.linkedin.com/company/munden-truck-equipment"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Truck Repair and Equipment Services",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "Commercial Vehicle Inspections",
        "description": "CVIP certified inspections for commercial vehicles"
      },
      {
        "@type": "Service",
        "name": "Truck Repair",
        "description": "Professional repair services for all truck makes and models"
      },
      {
        "@type": "Service",
        "name": "Log Hauling",
        "description": "Professional log transportation services throughout BC Interior"
      },
      {
        "@type": "Product",
        "name": "EcoLog Equipment",
        "description": "Authorized dealer for EcoLog harvesters and forwarders"
      }
    ]
  }
}

export const serviceSchema = (service: {
  name: string
  description: string
  provider?: string
  areaServed?: string
  serviceType?: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": service.serviceType || service.name,
  "name": service.name,
  "description": service.description,
  "provider": {
    "@type": "LocalBusiness",
    "name": service.provider || "Munden Truck & Equipment Ltd."
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 50.674522,
      "longitude": -120.327850
    },
    "geoRadius": service.areaServed || "200km"
  }
})

export const productSchema = (product: {
  name: string
  description: string
  brand: string
  category: string
  image?: string
  price?: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "brand": {
    "@type": "Brand",
    "name": product.brand
  },
  "category": product.category,
  "image": product.image,
  "offers": product.price ? {
    "@type": "Offer",
    "price": product.price,
    "priceCurrency": "CAD",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "LocalBusiness",
      "name": "Munden Truck & Equipment Ltd."
    }
  } : undefined
})

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
})

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Munden Truck & Equipment Ltd.",
  "url": "https://mundentruckequipment.com",
  "logo": "https://mundentruckequipment.com/images/logo.png",
  "description": "Professional truck repair, CVIP inspections, log hauling services, and authorized EcoLog dealer serving the BC Interior.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Industrial Way",
    "addressLocality": "Kamloops",
    "addressRegion": "BC",
    "postalCode": "V2C 1A1",
    "addressCountry": "CA"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-XXX-XXXX",
    "contactType": "customer service",
    "availableLanguage": "en",
    "areaServed": "CA"
  }
}

export { StructuredData as default }