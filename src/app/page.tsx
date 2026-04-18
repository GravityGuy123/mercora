import type { Metadata } from "next";
import HomeCTA from "@/components/home/HomeCTA";
import HomeFeatures from "@/components/home/HomeFeatures";
import HomeHero from "@/components/home/HomeHero";
import HomeHowItWorks from "@/components/home/HomeHowItWorks";
import HomeTestimonials from "@/components/home/HomeTestimonials";

const SITE_NAME = "Mercora";
const SITE_DESC =
  "Mercora is the commerce operating system that helps merchants launch storefronts, manage orders, get paid, issue receipts, and track settlements with confidence.";

export const metadata: Metadata = {
  title: "Storefronts, Payments & Receipts. All in One System.",
  description: SITE_DESC,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Storefronts, Payments & Receipts. All in One System.",
    description: SITE_DESC,
    url: "/",
    type: "website",
    siteName: SITE_NAME,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Storefronts, Payments & Receipts. All in One System.",
    description: SITE_DESC,
    images: ["/og.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeFeatures />
      <HomeHowItWorks />
      <HomeTestimonials />
      <HomeCTA />
    </>
  );
}