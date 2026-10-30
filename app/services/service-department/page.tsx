import type { Metadata } from "next";

import StructuredData, {
  breadcrumbSchema,
  collectionPageSchema,
} from "@/components/seo/StructuredData";
import { DepartmentHub } from "@/components/services/DepartmentHub";
import { serviceDepartmentPages } from "@/lib/department-pages";
import { siteUrl } from "@/lib/site";

const pagePath = "/services/service-department";

export const metadata: Metadata = {
  title: "Truck, Trailer & Equipment Service in Kamloops",
  description:
    "Explore Munden's commercial truck, trailer, and equipment repair, diagnostics, CVIP inspection, maintenance, hydraulic, welding, reefer, and rigout services in Kamloops.",
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: "Service Department | Munden Truck & Equipment",
    description:
      "Commercial truck, trailer, and equipment service, repair, inspection, maintenance, and specialty shop support in Kamloops, BC.",
    url: pagePath,
  },
};

export default function ServiceDepartmentPage() {
  return (
    <>
      <StructuredData
        data={[
          collectionPageSchema({
            name: "Munden Service Department",
            description: metadata.description as string,
            url: pagePath,
            items: serviceDepartmentPages.map((page) => page.title),
          }),
          breadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "Service Department", url: `${siteUrl}${pagePath}` },
          ]),
        ]}
      />
      <DepartmentHub kind="service" />
    </>
  );
}
