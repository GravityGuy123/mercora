import type { Metadata } from "next";
import MerchantManualPaymentsPageClient from "@/components/payments/MerchantManualPaymentsPageClient";

export const metadata: Metadata = {
  title: "Manual Payments",
  description: "Merchant-direct payment proofs awaiting review.",
};

export default function MerchantManualPaymentsPage() {
  return <MerchantManualPaymentsPageClient />;
}