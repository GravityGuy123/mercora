import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gravity-concepts.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/contact",
    "/blog",
    "/testimonials",
    "/support",
    "/privacy-policy",
    "/terms-of-service",
  ];

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    // optional — you can remove lastModified for static pages
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}