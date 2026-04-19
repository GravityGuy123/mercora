"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  BookText,
  Boxes,
  Building2,
  CreditCard,
  Headset,
  Home,
  LogOut,
  PackageSearch,
  Percent,
  Receipt,
  Settings,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/hooks/use-auth";
import { useMerchant } from "@/hooks/use-merchant";

type MerchantDashboardLayoutProps = {
  children: ReactNode;
};

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const primaryNav: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: Home },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Catalog", href: "/dashboard/catalog/products", icon: Boxes },
  { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { label: "Settlements", href: "/dashboard/settlements", icon: Wallet },
  { label: "Payouts", href: "/dashboard/payouts", icon: Building2 },
  { label: "Receipts", href: "/dashboard/receipts", icon: Receipt },
];

const secondaryNav: NavItem[] = [
  { label: "Discounts", href: "/dashboard/discounts", icon: Percent },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Support", href: "/dashboard/support", icon: Headset },
  { label: "Team", href: "/dashboard/team", icon: Users },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavSection({
  title,
  items,
  pathname,
}: {
  title: string;
  items: NavItem[];
  pathname: string;
}) {
  return (
    <div>
      <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {title}
      </p>

      <div className="mt-3 space-y-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActivePath(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition ${
                active
                  ? "border border-white/10 bg-white/[0.08] text-white"
                  : "border border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 text-indigo-300" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function MerchantDashboardLayout({
  children,
}: MerchantDashboardLayoutProps) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const {
    merchants,
    activeMerchant,
    activeMerchantId,
    isLoading: merchantLoading,
    setActiveMerchantId,
  } = useMerchant();

  const merchantDisplay = useMemo(() => {
    if (merchantLoading) return "Loading merchant...";
    if (activeMerchant) return activeMerchant.public_display_name;
    if (merchants.length > 0) return "Select merchant";
    return "No merchant yet";
  }, [activeMerchant, merchantLoading, merchants.length]);

  return (
    <ProtectedRoute
      allowedRoles={[
        "merchant_owner",
        "merchant_staff",
        "support_agent",
        "finance_admin",
        "platform_admin",
      ]}
    >
      <div className="min-h-screen bg-[#040A18] text-white">
        <div className="border-b border-white/10 bg-[rgba(4,10,24,0.88)] backdrop-blur-xl">
          <div className="mx-auto flex h-[78px] max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#5b3df5_0%,#3b82f6_100%)] text-sm font-bold text-white shadow-[0_12px_28px_rgba(79,70,229,0.35)]"
              >
                M
              </Link>

              <div>
                <p className="text-base font-bold tracking-[-0.04em] text-white">
                  MERCORA
                </p>
                <p className="text-xs text-slate-400">Merchant dashboard</p>
              </div>
            </div>

            <div className="hidden min-w-[280px] max-w-[360px] flex-1 lg:block">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Active merchant
                </p>

                <div className="mt-1">
                  {merchants.length > 0 ? (
                    <select
                      value={activeMerchantId ?? ""}
                      onChange={(event) => setActiveMerchantId(event.target.value)}
                      className="h-9 w-full rounded-xl border border-white/10 bg-[#0b1224] px-3 text-sm font-semibold text-white outline-none focus:border-indigo-400/50"
                    >
                      {merchants.map((merchant) => (
                        <option key={merchant.id} value={merchant.id}>
                          {merchant.public_display_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-sm font-semibold text-white">
                      {merchantDisplay}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300 sm:flex">
                <BookText className="h-4 w-4 text-indigo-300" />
                {user?.full_name || user?.display_name || user?.email || "User"}
              </div>

              <button
                type="button"
                onClick={() => void signOut()}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 sm:px-6 xl:grid-cols-[280px_1fr] xl:px-8">
          <aside className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,15,34,0.96),rgba(7,10,22,0.98))] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.26)] xl:sticky xl:top-[102px] xl:h-[calc(100vh-126px)] xl:overflow-y-auto">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300">
                  <PackageSearch className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Workspace
                  </p>
                  <p className="mt-1 truncate text-base font-semibold text-white">
                    {merchantDisplay}
                  </p>
                  <p className="mt-1 text-xs leading-6 text-slate-400">
                    Merchant operations, payouts, payment methods, catalog, orders, and team access.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <NavSection title="Core" items={primaryNav} pathname={pathname} />
              <NavSection
                title="Operations"
                items={secondaryNav}
                pathname={pathname}
              />
            </div>
          </aside>

          <section className="min-w-0">{children}</section>
        </div>
      </div>
    </ProtectedRoute>
  );
}