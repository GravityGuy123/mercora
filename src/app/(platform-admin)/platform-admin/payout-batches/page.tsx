import type { Metadata } from "next";
import PlatformPayoutBatchesPageClient from "@/components/platform/PlatformPayoutBatchesPageClient";

export const metadata: Metadata = {
  title: "Platform Payout Batches",
  description: "Platform payout batch oversight and status management.",
};

export default function PlatformPayoutBatchesPage() {
  return <PlatformPayoutBatchesPageClient />;
}