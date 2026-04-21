import type { Metadata } from "next";
import SupportTicketsPageClient from "@/components/support/SupportTicketsPageClient";

export const metadata: Metadata = {
  title: "Support",
  description: "Merchant support tickets and support workflow.",
};

export default function MerchantSupportPage() {
  return <SupportTicketsPageClient />;
}