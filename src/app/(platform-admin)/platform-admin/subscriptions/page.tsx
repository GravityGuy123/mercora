import type { Metadata } from "next";
import PlatformSubscriptionsPageClient from "@/components/platform/PlatformSubscriptionsPageClient";

export const metadata: Metadata = {
  title: "Platform Subscriptions",
  description: "Platform-wide subscription oversight, plan visibility, and lifecycle monitoring.",
};

export default function PlatformSubscriptionsPage() {
  return <PlatformSubscriptionsPageClient />;
}