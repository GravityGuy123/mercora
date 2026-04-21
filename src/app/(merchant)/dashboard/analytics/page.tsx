import type { Metadata } from "next";
import MerchantAnalyticsPageClient from "@/components/analytics/MerchantAnalyticsPageClient";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Merchant analytics, timeseries, top products, and operations summary.",
};

export default function MerchantAnalyticsPage() {
  return <MerchantAnalyticsPageClient />;
}