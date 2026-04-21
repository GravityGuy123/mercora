import type { Metadata } from "next";
import PlatformDashboardHomeClient from "@/components/platform/PlatformDashboardHomeClient";

export const metadata: Metadata = {
  title: "Platform Admin",
  description: "Platform oversight dashboard, merchants, payouts, disputes, support, and action logs.",
};

export default function PlatformAdminDashboardPage() {
  return <PlatformDashboardHomeClient />;
}