import type { Metadata } from "next";
import PlatformSettlementsPageClient from "@/components/platform/PlatformSettlementsPageClient";

export const metadata: Metadata = {
  title: "Platform Settlements",
  description: "Platform-wide settlement monitoring, payout readiness, and net amount visibility.",
};

export default function PlatformSettlementsPage() {
  return <PlatformSettlementsPageClient />;
}