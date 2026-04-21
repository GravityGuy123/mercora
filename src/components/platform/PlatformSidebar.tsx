"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield } from "lucide-react";
import {
  getPlatformPageTitle,
  isPlatformNavItemActive,
  platformNavGroups,
} from "@/config/platform-navigation";

export default function PlatformSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:w-[300px] lg:flex-col">
      <div className="sticky top-0 flex h-screen flex-col border-r border-white/10 bg-[linear-gradient(180deg,rgba(8,12,28,0.98),rgba(6,10,22,0.98))]">
        <div className="border-b border-white/10 px-5 py-5">
          <Link
            href="/platform-admin"
            className="block rounded-[22px] border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.05]"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/12 text-indigo-200">
                <Shield className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Platform Control
                </div>
                <div className="mt-1 truncate text-base font-semibold text-white">
                  Mercora Admin
                </div>
                <div className="mt-1 truncate text-xs text-slate-500">
                  {getPlatformPageTitle(pathname)}
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <nav className="space-y-6">
            {platformNavGroups.map((group) => (
              <div key={group.label}>
                <div className="px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
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
                        className={`group flex items-center rounded-2xl border px-3 py-3 transition ${
                          isActive
                            ? "border-indigo-500/25 bg-indigo-500/12 text-white shadow-[0_12px_30px_rgba(79,70,229,0.16)]"
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
    </aside>
  );
}