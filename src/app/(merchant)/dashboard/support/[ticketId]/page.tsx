import type { Metadata } from "next";
import SupportTicketDetailPageClient from "@/components/support/SupportTicketDetailPageClient";

export const metadata: Metadata = {
  title: "Support Ticket",
  description: "Support ticket detail, workflow state, and support conversation.",
};

export default function MerchantSupportTicketDetailPage() {
  return <SupportTicketDetailPageClient />;
}