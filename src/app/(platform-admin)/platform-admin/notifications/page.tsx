import type { Metadata } from "next";
import PlatformNotificationsPageClient from "@/components/platform/PlatformNotificationsPageClient";

export const metadata: Metadata = {
  title: "Platform Notifications",
  description: "Platform-wide notifications, alerts, and delivery visibility.",
};

export default function PlatformNotificationsPage() {
  return <PlatformNotificationsPageClient />;
}