import type { Metadata } from "next";
import PlatformAnalyticsPageClient from "@/components/platform/PlatformAnalyticsPageClient";

export const metadata: Metadata = {
  title: "Platform Analytics",
  description: "Platform analytics overview and aggregate performance visibility.",
};

export default function PlatformAnalyticsPage() {
  return <PlatformAnalyticsPageClient />;
}