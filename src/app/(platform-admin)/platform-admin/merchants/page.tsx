import type { Metadata } from "next";
import PlatformMerchantsPageClient from "@/components/platform/PlatformMerchantsPageClient";

export const metadata: Metadata = {
  title: "Platform Merchants",
  description: "Platform merchant oversight and moderation.",
};

export default function PlatformMerchantsPage() {
  return <PlatformMerchantsPageClient />;
}