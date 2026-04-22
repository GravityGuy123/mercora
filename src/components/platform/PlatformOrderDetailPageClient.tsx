"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate, formatMoney, platformAdminApi } from "@/lib/api/platform-admin";
import {
  PlatformEmptyPanel,
  PlatformErrorBanner,
  PlatformJsonCard,
  PlatformLoadingPanel,
  PlatformMetricRow,
  PlatformSectionCard,
  PlatformTag,
} from "@/components/platform/PlatformPrimitives";
import type { PlatformOrder } from "@/types/platform-admin";

export default function PlatformOrderDetailPageClient() {
  const params = useParams<{ orderId: string }>();
  const orderId = params.orderId;

  const [order, setOrder] = useState<PlatformOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      setError("");
      setIsLoading(true);

      try {
        const data = await platformAdminApi.orderDetail(orderId);
        setOrder(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load order detail.");
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [orderId]);

  if (isLoading) {
    return <PlatformLoadingPanel text="Loading order detail..." />;
  }

  if (!order) {
    return <PlatformEmptyPanel text="Order not found." />;
  }

  return (
    <main className="space-y-6">
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.82),rgba(8,12,28,0.96))] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <Link
          href="/platform-admin/orders"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to orders
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <PlatformTag>{order.order_number}</PlatformTag>
          <PlatformTag>{order.status || "status"}</PlatformTag>
          <PlatformTag>{order.payment_state || "payment"}</PlatformTag>
          <PlatformTag>{order.fulfillment_status || "fulfillment"}</PlatformTag>
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
          {order.order_number}
        </h1>
      </section>

      {error ? <PlatformErrorBanner text={error} /> : null}

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <PlatformSectionCard title="Order overview">
          <div className="space-y-3">
            <PlatformMetricRow label="Email" value={order.email || "—"} />
            <PlatformMetricRow label="Phone" value={order.phone_number || "—"} />
            <PlatformMetricRow label="Gross amount" value={formatMoney(order.gross_amount, order.base_currency || "NGN")} />
            <PlatformMetricRow label="Subtotal" value={formatMoney(order.subtotal_amount, order.base_currency || "NGN")} />
            <PlatformMetricRow label="Discount" value={formatMoney(order.discount_amount, order.base_currency || "NGN")} />
            <PlatformMetricRow label="Shipping" value={formatMoney(order.shipping_amount, order.base_currency || "NGN")} />
            <PlatformMetricRow label="Tax" value={formatMoney(order.tax_amount, order.base_currency || "NGN")} />
            <PlatformMetricRow label="Selected provider" value={order.selected_provider || "—"} />
            <PlatformMetricRow label="Payment mode" value={order.payment_mode || "—"} />
            <PlatformMetricRow label="Created" value={formatDate(order.created_at)} />
          </div>
        </PlatformSectionCard>

        <div className="space-y-6">
          <PlatformSectionCard title="Items">
            <div className="space-y-3">
              {(order.items || []).length === 0 ? (
                <div className="text-sm text-slate-400">No items.</div>
              ) : (
                order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                  >
                    <div className="text-sm font-semibold text-white">
                      {item.product_name_snapshot || "Order item"}
                    </div>
                    <div className="mt-2 grid gap-3 sm:grid-cols-3">
                      <PlatformMetricRow label="Variant" value={item.variant_name_snapshot || "—"} />
                      <PlatformMetricRow label="Quantity" value={String(item.quantity || 0)} />
                      <PlatformMetricRow label="Line total" value={formatMoney(item.line_total_amount, item.currency || order.base_currency || "NGN")} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </PlatformSectionCard>

          <PlatformSectionCard title="Timeline">
            <div className="space-y-3">
              {(order.timeline_events || []).length === 0 ? (
                <div className="text-sm text-slate-400">No timeline events.</div>
              ) : (
                order.timeline_events?.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <PlatformTag>{event.event_type || "event"}</PlatformTag>
                    </div>
                    <div className="mt-3 text-sm font-semibold text-white">
                      {event.title || "Timeline event"}
                    </div>
                    <p className="mt-2 text-sm text-slate-300">
                      {event.description || "No description."}
                    </p>
                    <div className="mt-2 text-xs text-slate-500">
                      {formatDate(event.created_at)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </PlatformSectionCard>

          <PlatformJsonCard title="Metadata" value={order.metadata || {}} />
        </div>
      </section>
    </main>
  );
}