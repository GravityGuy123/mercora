import type { Metadata } from "next";
import PlatformPaymentsPageClient from "@/components/platform/PlatformPaymentsPageClient";

export const metadata: Metadata = {
  title: "Platform Payments",
  description: "Platform-wide payment monitoring, provider visibility, and verification review.",
};

export default function PlatformPaymentsPage() {
  return <PlatformPaymentsPageClient />;
}