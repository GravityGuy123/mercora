import type { Metadata } from "next";
import PlatformDisputeDetailPageClient from "@/components/platform/PlatformDisputeDetailPageClient";

export const metadata: Metadata = {
  title: "Platform Dispute Detail",
  description: "Platform dispute detail view.",
};

export default function PlatformDisputeDetailPage() {
  return <PlatformDisputeDetailPageClient />;
}