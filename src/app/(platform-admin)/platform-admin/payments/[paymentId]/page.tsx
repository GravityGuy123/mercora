import type { Metadata } from "next";
import PlatformPaymentDetailPageClient from "@/components/platform/PlatformPaymentDetailPageClient";

export const metadata: Metadata = {
  title: "Platform Payment Detail",
  description: "Platform payment detail, attempts, refunds, disputes, and provider metadata.",
};

export default function PlatformPaymentDetailPage() {
  return <PlatformPaymentDetailPageClient />;
}