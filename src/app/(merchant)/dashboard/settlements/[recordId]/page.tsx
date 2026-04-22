import type { Metadata } from "next";
import MerchantSettlementDetailPageClient from "@/components/settlements/MerchantSettlementDetailPageClient";

export const metadata: Metadata = {
  title: "Settlement Detail",
  description: "Merchant settlement detail and financial breakdown visibility.",
};

export default function MerchantSettlementDetailPage() {
  return <MerchantSettlementDetailPageClient />;
}