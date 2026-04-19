import type { MetadataRoute } from "next";

const baseUrl = "https://www.mercora.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/features",
          "/pricing",
          "/how-it-works",
          "/about",
          "/contact",
          "/faq",
          "/book-demo",
          "/legal/privacy",
          "/legal/terms",
          "/legal/cookies",
          "/legal/refunds",
          "/sign-in",
          "/sign-up",
          "/verify-email",
          "/forgot-password",
        ],
        disallow: [
          "/onboarding/",
          "/platform/",
          "/dashboard/",
          "/_stores/",
          "/api/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}