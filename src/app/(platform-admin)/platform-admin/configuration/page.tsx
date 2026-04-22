import type { Metadata } from "next";
import PlatformConfigurationPageClient from "@/components/platform/PlatformConfigurationPageClient";

export const metadata: Metadata = {
  title: "Platform Configuration",
  description: "Platform-level configuration, defaults, and operational controls.",
};

export default function PlatformConfigurationPage() {
  return <PlatformConfigurationPageClient />;
}