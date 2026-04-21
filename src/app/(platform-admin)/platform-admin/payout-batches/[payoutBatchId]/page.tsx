import type { Metadata } from "next";
import PlatformPayoutBatchDetailPageClient from "@/components/platform/PlatformPayoutBatchDetailPageClient";

export const metadata: Metadata = {
  title: "Platform Payout Batch Detail",
  description: "Platform payout batch detail and status updates.",
};

export default function PlatformPayoutBatchDetailPage() {
  return <PlatformPayoutBatchDetailPageClient />;
}