import type { Metadata } from "next";
import MerchantReceiptsPageClient from "@/components/receipts/MerchantReceiptsPageClient";

export const metadata: Metadata = {
  title: "Receipts",
  description: "Merchant receipts, issue state, and retrieval visibility.",
};

export default function MerchantReceiptsPage() {
  return <MerchantReceiptsPageClient />;
}