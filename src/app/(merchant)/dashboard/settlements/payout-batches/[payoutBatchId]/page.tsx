import type { Metadata } from "next";
import PayoutBatchDetailPageClient from "@/components/settlements/PayoutBatchDetailPageClient";

export const metadata: Metadata = {
  title: "Payout Batch",
  description: "Merchant payout batch detail, entries, and attempts.",
};

export default function PayoutBatchDetailPage() {
  return <PayoutBatchDetailPageClient />;
}