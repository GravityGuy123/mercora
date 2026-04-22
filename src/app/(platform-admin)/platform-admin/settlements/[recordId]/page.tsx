import type { Metadata } from "next";
import PlatformSettlementDetailPageClient from "@/components/platform/PlatformSettlementDetailPageClient";

export const metadata: Metadata = {
  title: "Platform Settlement Detail",
  description: "Platform settlement detail including reserve, refund, dispute, and payout timing visibility.",
};

export default function PlatformSettlementDetailPage() {
  return <PlatformSettlementDetailPageClient />;
}