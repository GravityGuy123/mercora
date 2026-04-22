import type { Metadata } from "next";
import PlatformStoreDetailPageClient from "@/components/platform/PlatformStoreDetailPageClient";

export const metadata: Metadata = {
  title: "Platform Store Detail",
  description: "Platform storefront detail and domain-level operational review.",
};

export default function PlatformStoreDetailPage() {
  return <PlatformStoreDetailPageClient />;
}