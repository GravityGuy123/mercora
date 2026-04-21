import type { Metadata } from "next";
import PlatformDisputesPageClient from "@/components/platform/PlatformDisputesPageClient";

export const metadata: Metadata = {
  title: "Platform Disputes",
  description: "Platform dispute monitoring and detail visibility.",
};

export default function PlatformDisputesPage() {
  return <PlatformDisputesPageClient />;
}