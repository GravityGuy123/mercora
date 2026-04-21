import type { Metadata } from "next";
import PlatformActionLogsPageClient from "@/components/platform/PlatformActionLogsPageClient";

export const metadata: Metadata = {
  title: "Platform Action Logs",
  description: "Platform action logs and operator traceability.",
};

export default function PlatformActionLogsPage() {
  return <PlatformActionLogsPageClient />;
}