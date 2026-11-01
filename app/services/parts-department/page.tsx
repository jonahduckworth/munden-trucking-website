import type { Metadata } from "next";

import StructuredData, {
  breadcrumbSchema,
  collectionPageSchema,
} from "@/components/seo/StructuredData";
import { DepartmentHub } from "@/components/services/DepartmentHub";
import { partsDepartmentPages } from "@/lib/department-pages";
import { siteUrl } from "@/lib/site";

const pagePath = "/services/parts-department";

export const metadata: Metadata = {
  title: "Commercial Truck & Equipment Parts in Kamloops",
  description:
    "Explore Munden's OEM and aftermarket engine, drivetrain, brake, electrical, hydraulic, suspension, steering, filter, fluid, and maintenance parts support in Kamloops.",
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: "Parts Department | Munden Truck & Equipment",
    description:
      "OEM and aftermarket parts support for commercial trucks, trailers, and equipment in Kamloops, BC.",
    url: pagePath,
  },
};

export default function PartsDepartmentPage() {
  return (
    <>
      <StructuredData
        data={[
          collectionPageSchema({
            name: "Munden Parts Department",
            description: metadata.description as string,
            url: pagePath,
            items: partsDepartmentPages.map((page) => page.title),
          }),
          breadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "Parts Department", url: `${siteUrl}${pagePath}` },
          ]),
        ]}
      />
      <DepartmentHub kind="parts" />
    </>
  );
}
