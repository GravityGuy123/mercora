import type { ReactNode } from "react";
import MerchantDashboardShell from "@/components/merchant/MerchantDashboardShell";
import { MerchantProvider } from "@/contexts/MerchantContext";
import { AuthProvider } from "@/contexts/AuthContext";

type MerchantDashboardLayoutProps = {
  children: ReactNode;
};

export default function MerchantDashboardLayout({
  children,
}: MerchantDashboardLayoutProps) {
  return (
    <AuthProvider>
      <MerchantProvider>
        <MerchantDashboardShell>
          {children}
        </MerchantDashboardShell>
      </MerchantProvider>
    </AuthProvider>
  );
}