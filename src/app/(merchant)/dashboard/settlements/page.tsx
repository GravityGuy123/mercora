import type { Metadata } from "next";
import MerchantSettlementsPageClient from "@/components/settlements/MerchantSettlementsPageClient";

export const metadata: Metadata = {
  title: "Settlements",
  description: "Merchant settlements, payout readiness, and batch management.",
};

export default function MerchantSettlementsPage() {
  return <MerchantSettlementsPageClient />;
}