import type { Metadata } from "next";
import MerchantDashboardHomeClient from "@/components/dashboard/MerchantDashboardHomeClient";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Merchant command center and operational overview.",
};

export default function MerchantDashboardPage() {
  return <MerchantDashboardHomeClient />;
}