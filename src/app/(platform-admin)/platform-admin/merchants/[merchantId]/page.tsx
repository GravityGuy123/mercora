import type { Metadata } from "next";
import PlatformMerchantDetailPageClient from "@/components/platform/PlatformMerchantDetailPageClient";

export const metadata: Metadata = {
  title: "Platform Merchant Detail",
  description: "Platform merchant detail and moderation workflow.",
};

export default function PlatformMerchantDetailPage() {
  return <PlatformMerchantDetailPageClient />;
}