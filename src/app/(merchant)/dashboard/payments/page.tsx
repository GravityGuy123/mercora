import type { Metadata } from "next";
import MerchantPaymentsPageClient from "@/components/payments/MerchantPaymentsPageClient";

export const metadata: Metadata = {
  title: "Payments",
  description: "Merchant payments, verification, and refund monitoring.",
};

export default function MerchantPaymentsPage() {
  return <MerchantPaymentsPageClient />;
}