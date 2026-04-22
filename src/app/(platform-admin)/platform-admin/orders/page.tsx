import type { Metadata } from "next";
import PlatformOrdersPageClient from "@/components/platform/PlatformOrdersPageClient";

export const metadata: Metadata = {
  title: "Platform Orders",
  description: "Cross-merchant order oversight and operational monitoring.",
};

export default function PlatformOrdersPage() {
  return <PlatformOrdersPageClient />;
}