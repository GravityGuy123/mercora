import type { Metadata } from "next";
import PlatformProviderRoutingPageClient from "@/components/platform/PlatformProviderRoutingPageClient";

export const metadata: Metadata = {
  title: "Platform Provider Routing",
  description: "Platform provider routing and merchant-level provider eligibility visibility.",
};

export default function PlatformProviderRoutingPage() {
  return <PlatformProviderRoutingPageClient />;
}