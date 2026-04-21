import type { ReactNode } from "react";
import MerchantDashboardShell from "@/components/merchant/MerchantDashboardShell";

type MerchantDashboardLayoutProps = {
  children: ReactNode;
};

export default function MerchantDashboardLayout({
  children,
}: MerchantDashboardLayoutProps) {
  return <MerchantDashboardShell>{children}</MerchantDashboardShell>;
}