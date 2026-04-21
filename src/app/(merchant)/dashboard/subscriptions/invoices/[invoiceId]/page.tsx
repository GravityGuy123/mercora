import type { Metadata } from "next";
import SubscriptionInvoiceDetailPageClient from "@/components/subscriptions/SubscriptionInvoiceDetailPageClient";

export const metadata: Metadata = {
  title: "Subscription Invoice",
  description: "Merchant subscription invoice detail.",
};

export default function SubscriptionInvoiceDetailPage() {
  return <SubscriptionInvoiceDetailPageClient />;
}