import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact Munden Truck & Equipment | Kamloops Truck Repair",
  description:
    "Contact Munden Truck & Equipment in Kamloops, BC for truck repair, parts, CVIP inspections, mobile service, and EcoLog forestry equipment support.",
  alternates: {
    canonical: "/about/contact",
  },
  openGraph: {
    title: "Contact Munden Truck & Equipment Ltd.",
    description:
      "Get in touch with Munden Truck & Equipment for service, parts, mobile repairs, and forestry equipment support.",
    url: "/about/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
