import type { ReactNode } from "react";
import PlatformShell from "@/components/platform/PlatformShell";

type PlatformAdminLayoutProps = {
  children: ReactNode;
};

export default function PlatformAdminLayout({
  children,
}: PlatformAdminLayoutProps) {
  return <PlatformShell>{children}</PlatformShell>;
}