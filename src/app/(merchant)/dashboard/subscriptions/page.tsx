import type { Metadata } from "next";
import SubscriptionsPageClient from "@/components/subscriptions/SubscriptionsPageClient";

export const metadata: Metadata = {
  title: "Subscriptions",
  description: "Merchant plans, current subscription, invoices, and subscription history.",
};

export default function MerchantSubscriptionsPage() {
  return <SubscriptionsPageClient />;
}