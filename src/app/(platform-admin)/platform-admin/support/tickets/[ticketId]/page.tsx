import type { Metadata } from "next";
import PlatformSupportTicketDetailPageClient from "@/components/platform/PlatformSupportTicketDetailPageClient";

export const metadata: Metadata = {
  title: "Platform Support Ticket Detail",
  description: "Platform support ticket detail view.",
};

export default function PlatformSupportTicketDetailPage() {
  return <PlatformSupportTicketDetailPageClient />;
}