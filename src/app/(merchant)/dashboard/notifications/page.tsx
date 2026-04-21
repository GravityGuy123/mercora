import type { Metadata } from "next";
import NotificationsPageClient from "@/components/notifications/NotificationsPageClient";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Merchant notifications, summary, and preference management.",
};

export default function MerchantNotificationsPage() {
  return <NotificationsPageClient />;
}