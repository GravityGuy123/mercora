import type { Metadata } from "next";
import MerchantReceiptDetailPageClient from "@/components/receipts/MerchantReceiptDetailPageClient";

export const metadata: Metadata = {
  title: "Receipt Detail",
  description: "Merchant receipt detail, annotations, and render payload visibility.",
};

export default function MerchantReceiptDetailPage() {
  return <MerchantReceiptDetailPageClient />;
}