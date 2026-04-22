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
import type { PlatformReceipt } from "@/types/platform-admin";

export default function PlatformReceiptDetailPageClient() {
  const params = useParams<{ receiptNumber: string }>();
  const receiptNumber = params.receiptNumber;

  const [receipt, setReceipt] = useState<PlatformReceipt | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      setError("");
      setIsLoading(true);

      try {
        const data = await platformAdminApi.receiptDetail(receiptNumber);
        setReceipt(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load receipt detail.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [receiptNumber]);

  if (isLoading) {
    return <PlatformLoadingPanel text="Loading receipt detail..." />;
  }

  if (!receipt) {
    return <PlatformEmptyPanel text="Receipt not found." />;
  }

  const currency = receipt.charge_currency || receipt.base_currency || "NGN";

  return (
    <main className="space-y-6">
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.82),rgba(8,12,28,0.96))] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <Link
          href="/platform-admin/receipts"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to receipts
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <PlatformTag>{receipt.receipt_number}</PlatformTag>
          <PlatformTag>{receipt.status || "status"}</PlatformTag>
          {receipt.provider ? <PlatformTag>{receipt.provider}</PlatformTag> : null}
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
          {receipt.receipt_number}
        </h1>
      </section>

      {error ? <PlatformErrorBanner text={error} /> : null}

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <PlatformSectionCard title="Receipt overview">
          <div className="space-y-3">
            <PlatformMetricRow label="Order number" value={receipt.order_number || "—"} />
            <PlatformMetricRow
              label="Payment reference"
              value={receipt.payment_reference || "—"}
            />
            <PlatformMetricRow
              label="Gross amount"
              value={formatMoney(receipt.gross_amount, currency)}
            />
            <PlatformMetricRow
              label="Subtotal"
              value={formatMoney(receipt.subtotal_amount, currency)}
            />
            <PlatformMetricRow
              label="Discount"
              value={formatMoney(receipt.discount_amount, currency)}
            />
            <PlatformMetricRow
              label="Shipping"
              value={formatMoney(receipt.shipping_amount, currency)}
            />
            <PlatformMetricRow
              label="Tax"
              value={formatMoney(receipt.tax_amount, currency)}
            />
            <PlatformMetricRow
              label="Refund amount"
              value={formatMoney(receipt.refund_amount, currency)}
            />
            <PlatformMetricRow
              label="Dispute amount"
              value={formatMoney(receipt.dispute_amount, currency)}
            />
            <PlatformMetricRow
              label="Payment method"
              value={receipt.payment_method || "—"}
            />
            <PlatformMetricRow
              label="Payment channel"
              value={receipt.payment_channel || "—"}
            />
            <PlatformMetricRow label="Paid at" value={formatDate(receipt.paid_at)} />
            <PlatformMetricRow label="Issued at" value={formatDate(receipt.issued_at)} />
            <PlatformMetricRow
              label="Created at"
              value={formatDate(receipt.created_at)}
            />
            <PlatformMetricRow
              label="Updated at"
              value={formatDate(receipt.updated_at)}
            />
          </div>
        </PlatformSectionCard>

        <div className="space-y-6">
          <PlatformSectionCard title="Annotations">
            <div className="space-y-3">
              {(receipt.annotations || []).length === 0 ? (
                <div className="text-sm text-slate-400">No annotations.</div>
              ) : (
                receipt.annotations?.map((annotation, index) => (
                  <div
                    key={`${annotation.annotation_type || "annotation"}-${annotation.title || "item"}-${index}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <PlatformTag>
                        {annotation.annotation_type || "annotation"}
                      </PlatformTag>
                    </div>

                    <div className="mt-3 text-sm font-semibold text-white">
                      {annotation.title || "Receipt annotation"}
                    </div>

                    <p className="mt-2 text-sm text-slate-300">
                      {annotation.message || "No message."}
                    </p>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <PlatformMetricRow
                        label="Amount"
                        value={formatMoney(annotation.amount, annotation.currency || currency)}
                      />
                      <PlatformMetricRow
                        label="Effective at"
                        value={formatDate(annotation.effective_at)}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </PlatformSectionCard>

          <PlatformJsonCard
            title="Merchant snapshot"
            value={receipt.merchant_snapshot || {}}
          />

          <PlatformJsonCard
            title="Buyer snapshot"
            value={receipt.buyer_snapshot || {}}
          />

          <PlatformJsonCard
            title="Shipping address snapshot"
            value={receipt.shipping_address_snapshot || {}}
          />

          <PlatformJsonCard
            title="Billing address snapshot"
            value={receipt.billing_address_snapshot || {}}
          />

          <PlatformJsonCard
            title="Items snapshot"
            value={receipt.items_snapshot || []}
          />

          <PlatformJsonCard
            title="Render metadata"
            value={receipt.render_metadata || {}}
          />
        </div>
      </section>
    </main>
  );
}