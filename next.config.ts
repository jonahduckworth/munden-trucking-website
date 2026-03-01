import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
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
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about/partners",
        destination: "/about",
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
      // Careers redirect
      {
        source: "/careers",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
