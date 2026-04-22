import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  LayoutDashboard,
  LifeBuoy,
  ScrollText,
  Settings2,
  ShoppingBag,
  Store,
  Wallet,
  CreditCard,
  ReceiptText,
  Route,
  Layers3,
} from "lucide-react";

export type PlatformNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
};

export type PlatformNavGroup = {
  label: string;
  items: PlatformNavItem[];
};

export const platformNavGroups: PlatformNavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/platform-admin",
        icon: LayoutDashboard,
        exact: true,
      },
      {
        label: "Analytics",
        href: "/platform-admin/analytics",
        icon: BarChart3,
      },
      {
        label: "Notifications",
        href: "/platform-admin/notifications",
        icon: Bell,
      },
      {
        label: "Configuration",
        href: "/platform-admin/configuration",
        icon: Settings2,
      },
      {
        label: "Provider Routing",
        href: "/platform-admin/provider-routing",
        icon: Route,
      },
    ],
  },
  {
    label: "Commerce",
    items: [
      {
        label: "Merchants",
        href: "/platform-admin/merchants",
        icon: Building2,
      },
      {
        label: "Stores",
        href: "/platform-admin/stores",
        icon: Store,
      },
      {
        label: "Orders",
        href: "/platform-admin/orders",
        icon: ShoppingBag,
      },
      {
        label: "Payments",
        href: "/platform-admin/payments",
        icon: CreditCard,
      },
      {
        label: "Receipts",
        href: "/platform-admin/receipts",
        icon: ReceiptText,
      },
      {
        label: "Settlements",
        href: "/platform-admin/settlements",
        icon: Wallet,
      },
      {
        label: "Subscriptions",
        href: "/platform-admin/subscriptions",
        icon: Layers3,
      },
    ],
  },
  {
    label: "Risk & Operations",
    items: [
      {
        label: "Payout Batches",
        href: "/platform-admin/payout-batches",
        icon: Wallet,
      },
      {
        label: "Disputes",
        href: "/platform-admin/disputes",
        icon: AlertTriangle,
      },
      {
        label: "Support Tickets",
        href: "/platform-admin/support/tickets",
        icon: LifeBuoy,
      },
      {
        label: "Action Logs",
        href: "/platform-admin/action-logs",
        icon: ScrollText,
      },
    ],
  },
];

export function isPlatformNavItemActive(pathname: string, item: PlatformNavItem) {
  if (item.exact) {
    return pathname === item.href;
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function getPlatformPageTitle(pathname: string) {
  for (const group of platformNavGroups) {
    for (const item of group.items) {
      if (isPlatformNavItemActive(pathname, item)) {
        return item.label;
      }
    }
  }

  return "Platform Admin";
}