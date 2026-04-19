"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { MerchantProvider } from "@/contexts/MerchantContext";
import { StorefrontProvider } from "@/contexts/StorefrontContext";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <MerchantProvider>
        <StorefrontProvider>{children}</StorefrontProvider>
      </MerchantProvider>
    </AuthProvider>
  );
}