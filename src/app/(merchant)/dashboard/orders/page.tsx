import type { Metadata } from "next";
import MerchantOrdersPageClient from "@/components/orders/MerchantOrdersPageClient";

export const metadata: Metadata = {
  title: "Orders",
  description: "Merchant orders, filters, and operational monitoring.",
};

export default function MerchantOrdersPage() {
  return <MerchantOrdersPageClient />;
}