import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mercora",
    short_name: "Mercora",
    description:
      "Mercora helps merchants launch storefronts, accept payments, issue receipts, and manage settlement visibility with confidence.",
    start_url: "/",
    display: "standalone",
    background_color: "#040A18",
    theme_color: "#040A18",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}