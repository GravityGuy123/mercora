"use client";

import { useContext } from "react";
import { MerchantContext } from "@/contexts/MerchantContext";

export function useMerchant() {
  const context = useContext(MerchantContext);

  if (!context) {
    throw new Error("useMerchant must be used within a MerchantProvider.");
  }

  return context;
}