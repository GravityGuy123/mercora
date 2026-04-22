import type { Metadata } from "next";
import PlatformReceiptsPageClient from "@/components/platform/PlatformReceiptsPageClient";

export const metadata: Metadata = {
  title: "Platform Receipts",
  description: "Platform-wide receipt oversight and audit visibility.",
};

export default function PlatformReceiptsPage() {
  return <PlatformReceiptsPageClient />;
}