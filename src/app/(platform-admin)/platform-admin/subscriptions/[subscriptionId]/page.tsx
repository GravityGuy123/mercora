import type { Metadata } from "next";
import PlatformSubscriptionDetailPageClient from "@/components/platform/PlatformSubscriptionDetailPageClient";

export const metadata: Metadata = {
  title: "Platform Subscription Detail",
  description: "Platform subscription detail including invoices, entitlements, and billing lifecycle.",
};

export default function PlatformSubscriptionDetailPage() {
  return <PlatformSubscriptionDetailPageClient />;
}