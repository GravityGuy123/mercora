import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Building2,
  LayoutDashboard,
  LifeBuoy,
  ScrollText,
  Wallet,
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
    ],
  },
  {
    label: "Oversight",
    items: [
      {
        label: "Merchants",
        href: "/platform-admin/merchants",
        icon: Building2,
      },
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