import type { Metadata } from "next";
import MerchantOrderDetailPageClient from "@/components/orders/MerchantOrderDetailPageClient";

export const metadata: Metadata = {
  title: "Order Detail",
  description: "Merchant order detail, items, timeline, and payment context.",
};

export default function MerchantOrderDetailPage() {
  return <MerchantOrderDetailPageClient />;
}