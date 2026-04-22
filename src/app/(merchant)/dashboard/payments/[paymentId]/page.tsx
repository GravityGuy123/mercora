import type { Metadata } from "next";
import MerchantPaymentDetailPageClient from "@/components/payments/MerchantPaymentDetailPageClient";

export const metadata: Metadata = {
  title: "Payment Detail",
  description: "Merchant payment detail, attempts, proofs, refunds, and disputes.",
};

export default function MerchantPaymentDetailPage() {
  return <MerchantPaymentDetailPageClient />;
}