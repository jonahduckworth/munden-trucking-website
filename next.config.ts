import type { NextConfig } from "next";

const canonicalHost = "mundengroup.ca";
const redirectHosts = [
  "www.mundengroup.ca",
  "mundentruckequipment.com",
  "www.mundentruckequipment.com",
];

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      ...redirectHosts.map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: `https://${canonicalHost}/:path*`,
        permanent: true,
      })),
      {
        source: "/services",
        destination: "/services/service-department",
        permanent: true,
      },
      {
        source: "/equipment",
        destination: "/equipment/ecolog",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/about/history",
        permanent: true,
      },
      // Service page redirects
      {
        source: "/services/repair-shop",
        destination: "/services/service-department",
        permanent: true,
      },
      {
        source: "/services/repair-shop/commercial-vehicle-inspections",
        destination: "/services/service-department",
        permanent: true,
      },
      {
        source: "/services/repair-shop/preventive-maintenance",
        destination: "/services/service-department",
        permanent: true,
      },
      {
        source: "/services/repair-shop/fleet-services",
        destination: "/services/service-department",
        permanent: true,
      },
      {
        source: "/services/repair-shop/emergency-repairs",
        destination: "/services/mobile-service",
        permanent: true,
      },
      {
        source: "/services/equipment-sales",
        destination: "/equipment/ecolog",
        permanent: true,
      },
      // Equipment page redirects
      {
        source: "/equipment/new",
        destination: "/equipment/ecolog",
        permanent: true,
      },
      {
        source: "/equipment/new/harvesters",
        destination: "/equipment/harvesters",
        permanent: true,
      },
      {
        source: "/equipment/new/harvesters/:model",
        destination: "/equipment/harvesters/:model",
        permanent: true,
      },
      {
        source: "/equipment/new/forwarders",
        destination: "/equipment/forwarders",
        permanent: true,
      },
      {
        source: "/equipment/new/forwarders/:model",
        destination: "/equipment/forwarders/:model",
        permanent: true,
      },
      // About page redirects
      {
        source: "/contact",
        destination: "/about/contact",
        permanent: true,
      },
      {
        source: "/about/company",
        destination: "/about/history",
        permanent: true,
      },
      {
        source: "/about/team",
        destination: "/about/history",
        permanent: true,
      },
      {
        source: "/about/partners",
        destination: "/about/history",
        permanent: true,
      },
      // News redirects
      {
        source: "/news",
        destination: "/about/resources",
        permanent: true,
      },
      {
        source: "/news/:slug",
        destination: "/about/resources/:slug",
        permanent: true,
      },
      // Careers redirects
      {
        source: "/careers",
        destination: "/about/careers",
        permanent: true,
      },
      {
        source: "/wildlife-park",
        destination: "/about/careers",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
