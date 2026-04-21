import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bell,
  CreditCard,
  Globe,
  LayoutDashboard,
  Palette,
  ReceiptText,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Ticket,
  Users,
  Wallet,
} from "lucide-react";

export type MerchantNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
  aliases?: string[];
  badge?: string;
};

export type MerchantNavGroup = {
  label: string;
  items: MerchantNavItem[];
};

export const merchantNavGroups: MerchantNavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        exact: true,
      },
      {
        label: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
      },
      {
        label: "Notifications",
        href: "/dashboard/notifications",
        icon: Bell,
      },
      {
        label: "Subscriptions",
        href: "/dashboard/subscriptions",
        icon: CreditCard,
        aliases: ["/dashboard/subscriptions/invoices"],
      },
    ],
  },
  {
    label: "Commerce",
    items: [
      {
        label: "Orders",
        href: "/dashboard/orders",
        icon: ShoppingBag,
      },
      {
        label: "Payments",
        href: "/dashboard/payments",
        icon: CreditCard,
      },
      {
        label: "Receipts",
        href: "/dashboard/receipts",
        icon: ReceiptText,
      },
      {
        label: "Settlements",
        href: "/dashboard/settlements",
        icon: Wallet,
        aliases: ["/dashboard/settlements/payout-batches"],
      },
      {
        label: "Customers",
        href: "/dashboard/customers",
        icon: Users,
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        label: "Support",
        href: "/dashboard/support",
        icon: Ticket,
      },
      {
        label: "Team",
        href: "/dashboard/team",
        icon: ShieldCheck,
      },
    ],
  },
  {
    label: "Settings",
    items: [
      {
        label: "Profile",
        href: "/dashboard/settings/profile",
        icon: Settings,
      },
      {
        label: "Store",
        href: "/dashboard/settings/store",
        icon: ShoppingBag,
      },
      {
        label: "KYC",
        href: "/dashboard/settings/kyc",
        icon: ShieldCheck,
      },
      {
        label: "Payouts",
        href: "/dashboard/settings/payouts",
        icon: Wallet,
      },
      {
        label: "Payment Methods",
        href: "/dashboard/settings/payment-methods",
        icon: CreditCard,
      },
      {
        label: "Domain",
        href: "/dashboard/settings/domain",
        icon: Globe,
      },
      {
        label: "Branding",
        href: "/dashboard/settings/branding",
        icon: Palette,
      },
      {
        label: "Policies",
        href: "/dashboard/settings/policies",
        icon: ReceiptText,
      },
    ],
  },
];

function matchesPrefix(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isMerchantNavItemActive(
  pathname: string,
  item: MerchantNavItem,
) {
  if (item.exact) {
    return pathname === item.href;
  }

  if (matchesPrefix(pathname, item.href)) {
    return true;
  }

  return (item.aliases || []).some((alias) => matchesPrefix(pathname, alias));
}

export function getMerchantPageTitle(pathname: string) {
  for (const group of merchantNavGroups) {
    for (const item of group.items) {
      if (isMerchantNavItemActive(pathname, item)) {
        return item.label;
      }
    }
  }

  return "Merchant Dashboard";
}