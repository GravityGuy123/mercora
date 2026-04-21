import type { Metadata } from "next";
import PlatformSupportTicketsPageClient from "@/components/platform/PlatformSupportTicketsPageClient";

export const metadata: Metadata = {
  title: "Platform Support Tickets",
  description: "Platform support ticket oversight.",
};

export default function PlatformSupportTicketsPage() {
  return <PlatformSupportTicketsPageClient />;
}