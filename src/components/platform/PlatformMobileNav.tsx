"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Shield, X } from "lucide-react";
import {
  getPlatformPageTitle,
  isPlatformNavItemActive,
  platformNavGroups,
} from "@/config/platform-navigation";

export default function PlatformMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const pageTitle = useMemo(() => getPlatformPageTitle(pathname), [pathname]);

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
        >
          <Menu className="h-4 w-4" />
          Menu
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <button
            type="button"
            aria-label="Close platform navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <div className="absolute inset-y-0 left-0 flex w-[88%] max-w-[340px] flex-col border-r border-white/10 bg-[linear-gradient(180deg,rgba(8,12,28,0.99),rgba(6,10,22,0.99))] shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Platform Control
                </div>
                <div className="mt-1 truncate text-base font-semibold text-white">
                  Mercora Admin
                </div>
                <div className="mt-1 truncate text-xs text-slate-500">
                  {pageTitle}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-5">
              <Link
                href="/platform-admin"
                onClick={() => setOpen(false)}
                className="mb-5 block rounded-[20px] border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/12 text-indigo-200">
                    <Shield className="h-4 w-4" />
                  </div>

                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Platform overview
                    </div>
                    <div className="mt-1 text-sm font-semibold text-white">
                      Admin dashboard
                    </div>
                  </div>
                </div>
              </Link>

              <nav className="space-y-6">
                {platformNavGroups.map((group) => (
                  <div key={group.label}>
                    <div className="px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {group.label}
                    </div>

                    <div className="mt-3 space-y-1.5">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = isPlatformNavItemActive(pathname, item);

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={`flex items-center rounded-2xl border px-3 py-3 transition ${
                              isActive
                                ? "border-indigo-500/25 bg-indigo-500/12 text-white"
                                : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
                            }`}
                          >
                            <div
                              className={`mr-3 flex h-9 w-9 items-center justify-center rounded-xl ${
                                isActive
                                  ? "bg-indigo-500/18 text-indigo-100"
                                  : "bg-white/[0.04] text-slate-400"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>

                            <span className="text-sm font-semibold">{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}