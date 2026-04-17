import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gravity-concepts.com";

// Vercel sets VERCEL_ENV = "production" | "preview" | "development"
const isProd =
  process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  // Block indexing for preview/development builds
  if (!isProd) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      sitemap: `${SITE_URL}/sitemap.xml`,
      host: SITE_URL,
    };
  }

  // Production rules
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/dashboard/", "/private/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}