import type { Metadata } from "next";

import StructuredData, {
  breadcrumbSchema,
  collectionPageSchema,
} from "@/components/seo/StructuredData";
import { DepartmentHub } from "@/components/services/DepartmentHub";
import { mobileServicePages } from "@/lib/department-pages";
import { siteUrl } from "@/lib/site";

const pagePath = "/services/mobile-service";

export const metadata: Metadata = {
  title: "24/7 Mobile Truck Service in Kamloops",
  description:
    "Explore Munden's 24/7 mobile truck, trailer, and equipment breakdown support, roadside assessment, and on-site repair services in Kamloops and the BC Interior.",
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: "24/7 Mobile Service | Munden Truck & Equipment",
    description:
      "Mobile commercial truck, trailer, and equipment repair support around Kamloops and the BC Interior.",
    url: pagePath,
  },
};

export default function MobileServicePage() {
  return (
    <>
      <StructuredData
        data={[
          collectionPageSchema({
            name: "Munden Mobile Service",
            description: metadata.description as string,
            url: pagePath,
            items: mobileServicePages.map((page) => page.title),
          }),
          breadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "Mobile Service", url: `${siteUrl}${pagePath}` },
          ]),
        ]}
      />
      <DepartmentHub kind="mobile" />
    </>
  );
}
