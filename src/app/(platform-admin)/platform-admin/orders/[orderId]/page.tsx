import type { Metadata } from "next";
import PlatformOrderDetailPageClient from "@/components/platform/PlatformOrderDetailPageClient";

export const metadata: Metadata = {
  title: "Platform Order Detail",
  description: "Platform order detail with items, timeline, and financial overview.",
};

export default function PlatformOrderDetailPage() {
  return <PlatformOrderDetailPageClient />;
}