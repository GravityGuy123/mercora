import type { Metadata } from "next";
import PlatformReceiptDetailPageClient from "@/components/platform/PlatformReceiptDetailPageClient";

export const metadata: Metadata = {
  title: "Platform Receipt Detail",
  description: "Platform receipt detail including annotations and render metadata.",
};

export default function PlatformReceiptDetailPage() {
  return <PlatformReceiptDetailPageClient />;
}