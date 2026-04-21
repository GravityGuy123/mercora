"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BarChart3,
  Bell,
  CreditCard,
  Loader2,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Ticket,
  Users,
  Wallet,
} from "lucide-react";
import { analyticsApi, formatMoney, formatDate } from "@/lib/api/analytics";
import { notificationsApi } from "@/lib/api/notifications";
import { subscriptionsApi } from "@/lib/api/subscriptions";
import { supportApi } from "@/lib/api/support";
import { merchantOperationsApi } from "@/lib/api/merchant-operations";
import { useMerchant } from "@/hooks/use-merchant";
import type { MerchantDashboardSummary } from "@/types/analytics";
import type { NotificationSummary } from "@/types/notification";
import type { MerchantSubscription } from "@/types/subscription";
import type { SupportTicket } from "@/types/support";
import type { MerchantOrder } from "@/types/merchant-operations";

export default function MerchantDashboardHomeClient() {
  const { activeMerchant } = useMerchant();

  const [summary, setSummary] = useState<MerchantDashboardSummary | null>(null);
  const [notificationSummary, setNotificationSummary] =
    useState<NotificationSummary | null>(null);
  const [currentSubscription, setCurrentSubscription] =
    useState<MerchantSubscription | null>(null);
  const [recentTickets, setRecentTickets] = useState<SupportTicket[]>([]);
  const [recentOrders, setRecentOrders] = useState<MerchantOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const currency = summary?.currency || activeMerchant?.base_currency || "NGN";

  useEffect(() => {
    const run = async () => {
      if (!activeMerchant) {
        setIsLoading(false);
        return;
      }

      setError("");
      setIsLoading(true);

      try {
        const [summaryData, notificationsData, subscriptionData, ticketsData, ordersData] =
          await Promise.all([
            analyticsApi.dashboardSummary(activeMerchant.id, 30),
            notificationsApi.summary(activeMerchant.id),
            subscriptionsApi.current(activeMerchant.id),
            supportApi.list(activeMerchant.id),
            merchantOperationsApi.listOrders(activeMerchant.id),
          ]);

        setSummary(summaryData);
        setNotificationSummary(notificationsData);
        setCurrentSubscription(subscriptionData || null);
        setRecentTickets(ticketsData.results.slice(0, 4));
        setRecentOrders(ordersData.results.slice(0, 5));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load dashboard overview.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [activeMerchant]);

  if (!activeMerchant) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-12 text-center text-slate-300">
        Select a merchant before opening the dashboard.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
        <p className="mt-4 text-sm text-slate-300">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <main className="space-y-6">
      <section className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.82),rgba(8,12,28,0.96))] shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <div className="border-b border-white/10 px-6 py-6 sm:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
            <ShieldCheck className="h-4 w-4" />
            Merchant command center
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
            {activeMerchant.public_display_name}
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            Operational visibility across orders, payments, receipts, settlements,
            subscriptions, support, and notifications.
          </p>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-4 sm:p-8">
          <StatCard
            icon={<ShoppingBag className="h-4 w-4 text-indigo-300" />}
            label="Gross order amount"
            value={formatMoney(summary?.orders?.gross_order_amount, currency)}
          />
          <StatCard
            icon={<Wallet className="h-4 w-4 text-indigo-300" />}
            label="Successful payments"
            value={formatMoney(
              summary?.payments?.successful_payment_amount,
              currency,
            )}
          />
          <StatCard
            icon={<Bell className="h-4 w-4 text-indigo-300" />}
            label="Unread notifications"
            value={String(notificationSummary?.unread_count || 0)}
          />
          <StatCard
            icon={<CreditCard className="h-4 w-4 text-indigo-300" />}
            label="Current plan"
            value={
              currentSubscription?.plan_name_snapshot ||
              summary?.subscription?.current_plan_name ||
              "No active plan"
            }
          />
        </div>
      </section>

      {error ? (
        <div className="rounded-[18px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.72),rgba(8,12,28,0.94))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
          <h2 className="text-xl font-semibold text-white">Quick access</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <QuickLink
              href="/dashboard/analytics"
              icon={<BarChart3 className="h-4 w-4 text-indigo-300" />}
              title="Analytics"
              subtitle="Sales, top products, operations"
            />
            <QuickLink
              href="/dashboard/orders"
              icon={<ShoppingBag className="h-4 w-4 text-indigo-300" />}
              title="Orders"
              subtitle="Orders, carts, checkout sessions"
            />
            <QuickLink
              href="/dashboard/payments"
              icon={<CreditCard className="h-4 w-4 text-indigo-300" />}
              title="Payments"
              subtitle="Verification, proofs, refunds"
            />
            <QuickLink
              href="/dashboard/receipts"
              icon={<ReceiptText className="h-4 w-4 text-indigo-300" />}
              title="Receipts"
              subtitle="Issued receipts and render payloads"
            />
            <QuickLink
              href="/dashboard/settlements"
              icon={<Wallet className="h-4 w-4 text-indigo-300" />}
              title="Settlements"
              subtitle="Records and payout batches"
            />
            <QuickLink
              href="/dashboard/support"
              icon={<Ticket className="h-4 w-4 text-indigo-300" />}
              title="Support"
              subtitle="Ticket workflow and conversations"
            />
            <QuickLink
              href="/dashboard/notifications"
              icon={<Bell className="h-4 w-4 text-indigo-300" />}
              title="Notifications"
              subtitle="Summary and preferences"
            />
            <QuickLink
              href="/dashboard/team"
              icon={<Users className="h-4 w-4 text-indigo-300" />}
              title="Team"
              subtitle="Memberships and access roles"
            />
          </div>
        </section>

        <section className="space-y-6">
          <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.72),rgba(8,12,28,0.94))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
            <h2 className="text-xl font-semibold text-white">Recent orders</h2>

            <div className="mt-5 space-y-3">
              {recentOrders.length === 0 ? (
                <div className="text-sm text-slate-400">No recent orders.</div>
              ) : (
                recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/dashboard/orders/${order.id}`}
                    className="block rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 transition hover:border-indigo-500/20"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag>{order.order_number}</Tag>
                      <Tag>{order.status || "status"}</Tag>
                      <Tag>{order.payment_state || "payment"}</Tag>
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white">
                      {order.email || order.order_number}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {formatDate(order.created_at)}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>

          <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.72),rgba(8,12,28,0.94))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
            <h2 className="text-xl font-semibold text-white">Recent support</h2>

            <div className="mt-5 space-y-3">
              {recentTickets.length === 0 ? (
                <div className="text-sm text-slate-400">No support tickets.</div>
              ) : (
                recentTickets.map((ticket) => (
                  <Link
                    key={ticket.id}
                    href={`/dashboard/support/${ticket.id}`}
                    className="block rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 transition hover:border-indigo-500/20"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag>{ticket.ticket_number}</Tag>
                      <Tag>{ticket.priority}</Tag>
                      <Tag>{ticket.status}</Tag>
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white">
                      {ticket.subject}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {formatDate(ticket.last_activity_at || ticket.created_at)}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}

function QuickLink({
  href,
  icon,
  title,
  subtitle,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4 transition hover:border-indigo-500/20 hover:bg-white/[0.04]"
    >
      <div className="flex items-center gap-2 text-white">
        {icon}
        <span className="font-semibold">{title}</span>
      </div>
      <p className="mt-2 text-sm leading-7 text-slate-300">{subtitle}</p>
    </Link>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-400">
        {icon}
        {label}
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
        {value}
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-300">
      {children}
    </span>
  );
}