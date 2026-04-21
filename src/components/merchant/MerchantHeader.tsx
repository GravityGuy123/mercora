"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, Sparkles } from "lucide-react";
import {
  getMerchantPageTitle,
  isMerchantNavItemActive,
  merchantNavGroups,
} from "@/config/merchant-navigation";
import MerchantMobileNav from "@/components/merchant/MerchantMobileNav";
import { useMerchant } from "@/hooks/use-merchant";

function getMerchantGroupLabel(pathname: string) {
  for (const group of merchantNavGroups) {
    for (const item of group.items) {
      if (isMerchantNavItemActive(pathname, item)) {
        return group.label;
      }
    }
  }

  return "Workspace";
}

export default function MerchantHeader() {
  const pathname = usePathname();
  const { activeMerchant } = useMerchant();

  const pageTitle = useMemo(() => getMerchantPageTitle(pathname), [pathname]);
  const groupLabel = useMemo(() => getMerchantGroupLabel(pathname), [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[rgba(4,10,24,0.88)] backdrop-blur-xl">
      <div className="flex min-h-[84px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            <span>{groupLabel}</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span>{pageTitle}</span>
          </div>

          <h1 className="mt-2 truncate text-2xl font-semibold tracking-[-0.03em] text-white">
            {pageTitle}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <Sparkles className="h-4 w-4 text-indigo-300" />
            <span className="truncate">
              {activeMerchant?.public_display_name || "No active merchant selected"}
            </span>
          </div>
        </div>

        <MerchantMobileNav />
      </div>
    </header>
  );
}