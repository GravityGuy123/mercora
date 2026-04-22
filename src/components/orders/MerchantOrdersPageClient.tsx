"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { formatDate, formatMoney, merchantOperationsApi } from "@/lib/api/merchant-operations";
import { useMerchant } from "@/hooks/use-merchant";
import type { MerchantOrder } from "@/types/merchant-operations";
import {
  EmptyState,
  ErrorBanner,
  LoadingState,
  MetricTile,
  Tag,
  safeText,
} from "@/components/merchant/MerchantOpsPrimitives";

export default function MerchantOrdersPageClient() {
  const { activeMerchant } = useMerchant();

  const [orders, setOrders] = useState<MerchantOrder[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [paymentState, setPaymentState] = useState("");
  const [fulfillmentStatus, setFulfillmentStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const currency = activeMerchant?.base_currency || "NGN";

  async function load() {
    if (!activeMerchant) return;

    setError("");
    setIsLoading(true);

    try {
      const data = await merchantOperationsApi.listOrders(activeMerchant.id, {
        search: search || undefined,
        status: status || undefined,
        payment_state: paymentState || undefined,
        fulfillment_status: fulfillmentStatus || undefined,
      });
      setOrders(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load orders.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!activeMerchant) {
      setIsLoading(false);
      return;
    }
    void load();
  }, [activeMerchant]);

  if (!activeMerchant) {
    return <EmptyState text="Select a merchant before opening orders." />;
  }

  if (isLoading) {
    return <LoadingState text="Loading orders..." />;
  }

  return (
    <main className="space-y-6">
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.78),rgba(8,12,28,0.96))] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
          <ShoppingBag className="h-4 w-4" />
          Orders
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
          Merchant orders
        </h1>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_180px_180px_180px_auto]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search order, email, phone..."
            className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none"
          />
          <input
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            placeholder="Status"
            className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none"
          />
          <input
            value={paymentState}
            onChange={(event) => setPaymentState(event.target.value)}
            placeholder="Payment state"
            className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none"
          />
          <input
            value={fulfillmentStatus}
            onChange={(event) => setFulfillmentStatus(event.target.value)}
            placeholder="Fulfillment"
            className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none"
          />
          <button
            type="button"
            onClick={() => void load()}
            className="h-11 rounded-xl border border-white/14 bg-white/[0.03] px-5 text-sm font-semibold text-white"
          >
            Apply
          </button>
        </div>
      </section>

      {error ? <ErrorBanner text={error} /> : null}

      <section className="space-y-4">
        {orders.length === 0 ? (
          <EmptyState text="No orders found." />
        ) : (
          orders.map((order) => (
            <Link
              key={order.id}
              href={`/dashboard/orders/${order.id}`}
              className="group block rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.66),rgba(8,12,28,0.94))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-indigo-500/20"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag>{order.order_number}</Tag>
                    <Tag>{safeText(order.status)}</Tag>
                    <Tag>{safeText(order.payment_state)}</Tag>
                    <Tag>{safeText(order.fulfillment_status)}</Tag>
                  </div>

                  <h2 className="mt-4 text-xl font-semibold text-white">
                    {safeText(order.email) !== "—" ? safeText(order.email) : order.order_number}
                  </h2>

                  <div className="mt-3 grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
                    <div>Phone: {safeText(order.phone_number)}</div>
                    <div>Created: {formatDate(order.created_at)}</div>
                    <div>Provider: {safeText(order.selected_provider)}</div>
                    <div>Mode: {safeText(order.payment_mode)}</div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:min-w-[320px] xl:grid-cols-2">
                  <MetricTile
                    label="Gross amount"
                    value={formatMoney(order.gross_amount, order.base_currency || currency)}
                  />
                  <MetricTile
                    label="Subtotal"
                    value={formatMoney(order.subtotal_amount, order.base_currency || currency)}
                  />
                  <MetricTile
                    label="Shipping"
                    value={formatMoney(order.shipping_amount, order.base_currency || currency)}
                  />
                  <MetricTile
                    label="Tax"
                    value={formatMoney(order.tax_amount, order.base_currency || currency)}
                  />
                </div>
              </div>

              <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                Open order
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))
        )}
      </section>
    </main>
  );
}