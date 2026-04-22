import type { Metadata } from "next";
import PlatformStoresPageClient from "@/components/platform/PlatformStoresPageClient";

export const metadata: Metadata = {
  title: "Platform Stores",
  description: "Platform-wide storefront oversight and operational visibility.",
};

export default function PlatformStoresPage() {
  return <PlatformStoresPageClient />;
}