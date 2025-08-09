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
  "name": "Munden Truck & Equipment",
  "alternateName": ["Munden", "Munden Truck", "Munden Trucking", "Munden Truck & Equipment Ltd."],
  "image": "https://mundentruckequipment.com/images/logo.png",
  "url": "https://mundentruckequipment.com",
  "telephone": "250-828-2268",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "725 Carrier Street",
    "addressLocality": "Kamloops",
    "addressRegion": "BC",
    "postalCode": "V2H 1G1",
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
    "name": "Kamloops Truck Repair and Equipment Services",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "Truck Repair",
        "description": "Kamloops truck repair - engine repair, suspension repair, mechanical repair, automotive repair for all truck makes and models"
      },
      {
        "@type": "Service",
        "name": "Trailer Repair",
        "description": "Kamloops trailer repair - mechanical repair, maintenance, trailer parts and service"
      },
      {
        "@type": "Service",
        "name": "Equipment Repair",
        "description": "Kamloops equipment repair - forestry repairs, construction repairs, civil repairs, crane repairs"
      },
      {
        "@type": "Service",
        "name": "CVIP Inspections",
        "description": "CVIP, MVI, CVI certified truck inspection and trailer inspection facility in Kamloops"
      },
      {
        "@type": "Service",
        "name": "Mobile Service",
        "description": "Kamloops mobile service truck - emergency service, roadside repair, service call available 24/7"
      },
      {
        "@type": "Service",
        "name": "Emergency Repair",
        "description": "24/7 emergency repair, roadside service for trucks and trailers in Kamloops"
      },
      {
        "@type": "Service",
        "name": "Welding & Fabrication",
        "description": "Professional welding, fabrication, and hydraulics services in Kamloops"
      },
      {
        "@type": "Service",
        "name": "Refrigeration Services",
        "description": "Refrigeration trailer repair, reefer service - Carrier, Thermo King, Coldfront certified"
      },
      {
        "@type": "Service",
        "name": "A/C Repair",
        "description": "Air conditioning repair, A/C service for trucks and equipment - Webasto, Espar, engine heater service"
      },
      {
        "@type": "Service",
        "name": "RV Repair",
        "description": "RV repair and maintenance services in Kamloops"
      },
      {
        "@type": "Product",
        "name": "Truck Parts",
        "description": "Truck parts, trailer parts, equipment parts, lubricants, hydraulic hose supply in Kamloops"
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
  "name": "Munden Truck & Equipment",
  "alternateName": ["Munden", "Munden Truck", "Munden Trucking"],
  "url": "https://mundentruckequipment.com",
  "logo": "https://mundentruckequipment.com/images/logo.png",
  "description": "Munden Truck & Equipment - Kamloops truck repair, trailer repair, equipment repair. Truck shop, trailer shop, automotive shop. CVIP inspections, mobile service truck, emergency roadside service. Welding, fabrication, hydraulics. Refrigeration, A/C repair. Carrier, Thermo King, Webasto service. Truck parts and trailer parts.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Industrial Way",
    "addressLocality": "Kamloops",
    "addressRegion": "BC",
    "postalCode": "V2C 1A1",
    "addressCountry": "CA"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-250-828-2268",
      "contactType": "customer service",
      "areaServed": "CA",
      "contactOption": "TollFree",
      "availableLanguage": ["en"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+1-250-828-2268",
      "contactType": "emergency",
      "contactOption": "24/7",
      "availableLanguage": ["en"],
      "areaServed": "CA"
    }
  ]
}

export { StructuredData as default }