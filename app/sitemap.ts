import { MetadataRoute } from "next";
import { getAllResourcePosts } from "@/lib/resources";
import { siteUrl } from "@/lib/site";
import {
  allDepartmentPages,
  getDepartmentPagePath,
} from "@/lib/department-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl;
  const resourcePosts = getAllResourcePosts();

  return [
    // Homepage
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },

    // Shop Services
    {
      url: `${baseUrl}/services/service-department`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/parts-department`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/mobile-service`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...allDepartmentPages.map((page) => ({
      url: `${baseUrl}${getDepartmentPagePath(page)}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency: "monthly" as const,
      priority: page.department === "service" ? 0.8 : 0.7,
    })),

    // Equipment Sales
    {
      url: `${baseUrl}/equipment/ecolog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/equipment/harvesters`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/equipment/harvesters/590g`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/equipment/harvesters/580g`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/equipment/forwarders`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/equipment/forwarders/594f`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/equipment/forwarders/584f`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // About Us
    {
      url: `${baseUrl}/about/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/history`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...resourcePosts.map((post) => ({
      url: `${baseUrl}/about/resources/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),

    // Other pages
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
