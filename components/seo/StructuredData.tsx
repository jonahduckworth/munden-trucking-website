import { FC } from "react";
import {
  absoluteUrl,
  businessLocation,
  googleMapsPlaceUrl,
  siteUrl,
} from "@/lib/site";

interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export const StructuredData: FC<StructuredDataProps> = ({ data }) => {
  const jsonLd = Array.isArray(data) ? data : [data];

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
  );
};

const logoImageUrl = absoluteUrl("/images/logo-square.png");

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#localbusiness`,
  name: "Munden Truck & Equipment",
  alternateName: [
    "Munden",
    "Munden Truck",
    "Munden Trucking",
    "Munden Truck & Equipment Ltd.",
  ],
  image: logoImageUrl,
  logo: logoImageUrl,
  url: siteUrl,
  telephone: "+1-250-828-2268",
  address: {
    "@type": "PostalAddress",
    streetAddress: businessLocation.streetAddress,
    addressLocality: businessLocation.addressLocality,
    addressRegion: businessLocation.addressRegion,
    postalCode: businessLocation.postalCode,
    addressCountry: businessLocation.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: businessLocation.latitude,
    longitude: businessLocation.longitude,
  },
  hasMap: googleMapsPlaceUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  sameAs: [
    googleMapsPlaceUrl,
    "https://www.facebook.com/MundenGroup/",
    "https://ca.linkedin.com/company/mundengroup",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Kamloops Truck Repair and Equipment Services",
    itemListElement: [
      {
        "@type": "Service",
        name: "Truck Repair",
        description:
          "Kamloops truck repair - engine repair, suspension repair, mechanical repair, automotive repair for all truck makes and models",
      },
      {
        "@type": "Service",
        name: "Trailer Repair",
        description:
          "Kamloops trailer repair - mechanical repair, maintenance, trailer parts and service",
      },
      {
        "@type": "Service",
        name: "Equipment Repair",
        description:
          "Kamloops equipment repair - forestry repairs, construction repairs, civil repairs, crane repairs",
      },
      {
        "@type": "Service",
        name: "CVIP Inspections",
        description:
          "CVIP, MVI, CVI certified truck inspection and trailer inspection facility in Kamloops",
      },
      {
        "@type": "Service",
        name: "Mobile Service",
        description:
          "Kamloops mobile service truck - emergency service, roadside repair, service call available 24/7",
      },
      {
        "@type": "Service",
        name: "Emergency Repair",
        description:
          "24/7 emergency repair, roadside service for trucks and trailers in Kamloops",
      },
      {
        "@type": "Service",
        name: "Welding & Fabrication",
        description:
          "Professional welding, fabrication, and hydraulics services in Kamloops",
      },
      {
        "@type": "Service",
        name: "Refrigeration Services",
        description:
          "Refrigeration trailer repair, reefer service - Carrier, Thermo King, Coldfront certified",
      },
      {
        "@type": "Service",
        name: "A/C Repair",
        description:
          "Air conditioning repair, A/C service for trucks and equipment - Webasto, Espar, engine heater service",
      },
      {
        "@type": "Service",
        name: "RV Repair",
        description: "RV repair and maintenance services in Kamloops",
      },
      {
        "@type": "Service",
        name: "Truck Parts",
        description:
          "Truck parts, trailer parts, equipment parts, lubricants, hydraulic hose supply in Kamloops",
      },
    ],
  },
};

export const serviceSchema = (service: {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string;
  serviceType?: string;
  url?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  ...(service.url ? { "@id": `${absoluteUrl(service.url)}#service` } : {}),
  serviceType: service.serviceType || service.name,
  name: service.name,
  description: service.description,
  ...(service.url ? { url: absoluteUrl(service.url) } : {}),
  provider: {
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    name: service.provider || "Munden Truck & Equipment Ltd.",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: businessLocation.latitude,
      longitude: businessLocation.longitude,
    },
    geoRadius: service.areaServed || "250km",
  },
});

export const collectionPageSchema = (collection: {
  name: string;
  description: string;
  url: string;
  items: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${absoluteUrl(collection.url)}#collection`,
  name: collection.name,
  description: collection.description,
  url: absoluteUrl(collection.url),
  mainEntity: {
    "@type": "OfferCatalog",
    name: collection.name,
    itemListElement: collection.items.map((item, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Product",
        name: item,
      },
    })),
  },
  isPartOf: {
    "@id": `${siteUrl}/#localbusiness`,
  },
});

export const productSchema = (product: {
  name: string;
  description: string;
  brand: string;
  category: string;
  image?: string;
  price?: string;
}) => {
  const price = product.price ? Number(product.price) : undefined;
  const hasNumericPrice = Number.isFinite(price);

  return {
    "@context": "https://schema.org",
    "@type": hasNumericPrice ? "Product" : "Thing",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.category,
    image: product.image,
    offers: hasNumericPrice
      ? {
          "@type": "Offer",
          price,
          priceCurrency: "CAD",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "LocalBusiness",
            name: "Munden Truck & Equipment Ltd.",
          },
        }
      : undefined,
  };
};

export const breadcrumbSchema = (
  items: Array<{ name: string; url: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const faqSchema = (
  faqs: Array<{ question: string; answer: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Munden Truck & Equipment",
  alternateName: ["Munden", "Munden Truck", "Munden Trucking"],
  url: siteUrl,
  logo: logoImageUrl,
  description:
    "Munden Truck & Equipment - Kamloops truck repair, trailer repair, equipment repair. Truck shop, trailer shop, automotive shop. CVIP inspections, mobile service truck, emergency roadside service. Welding, fabrication, hydraulics. Refrigeration, A/C repair. Carrier, Thermo King, Webasto service. Truck parts and trailer parts.",
  address: {
    "@type": "PostalAddress",
    streetAddress: businessLocation.streetAddress,
    addressLocality: businessLocation.addressLocality,
    addressRegion: businessLocation.addressRegion,
    postalCode: businessLocation.postalCode,
    addressCountry: businessLocation.addressCountry,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-250-828-2268",
      contactType: "customer service",
      areaServed: "CA",
      availableLanguage: ["en"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+1-250-828-2268",
      contactType: "emergency",
      availableLanguage: ["en"],
      areaServed: "CA",
    },
  ],
};

export { StructuredData as default };
