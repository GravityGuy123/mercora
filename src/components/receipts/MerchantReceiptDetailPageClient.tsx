"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2, RefreshCcw } from "lucide-react";
import { formatDate, formatMoney, merchantOperationsApi } from "@/lib/api/merchant-operations";
import { useMerchant } from "@/hooks/use-merchant";
import type { MerchantReceipt } from "@/types/merchant-operations";
import {
  EmptyState,
  ErrorBanner,
  JsonCard,
  LoadingState,
  MetricRow,
  SectionCard,
  Tag,
  safeText,
} from "@/components/merchant/MerchantOpsPrimitives";

export default function MerchantReceiptDetailPageClient() {
  const params = useParams<{ receiptNumber: string }>();
  const { activeMerchant } = useMerchant();

  const [receipt, setReceipt] = useState<MerchantReceipt | null>(null);
  const [renderPayload, setRenderPayload] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isLoadingRender, setIsLoadingRender] = useState(false);
  const [error, setError] = useState("");

  const currency = activeMerchant?.base_currency || "NGN";

  async function load() {
    if (!activeMerchant) return;

    setError("");
    setIsLoading(true);

    try {
      const data = await merchantOperationsApi.receiptDetail(
        activeMerchant.id,
        params.receiptNumber,
      );
      setReceipt(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load receipt detail.");
    } finally {
      setIsLoading(false);
    }
  }

  async function loadRenderPayload() {
    if (!activeMerchant || !receipt) return;

    setError("");
    setIsLoadingRender(true);

    try {
      const data = await merchantOperationsApi.renderReceipt(activeMerchant.id, receipt.id);
      setRenderPayload(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load receipt render payload.");
    } finally {
      setIsLoadingRender(false);
    }
  }

  async function syncFromPayment() {
    if (!activeMerchant || !receipt?.payment) return;

    setError("");
    setIsSyncing(true);

    try {
      const updated = await merchantOperationsApi.syncReceiptFromPayment(
        activeMerchant.id,
        receipt.payment,
      );
      setReceipt(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sync receipt from payment.");
    } finally {
      setIsSyncing(false);
    }
  }

  useEffect(() => {
    if (!activeMerchant) {
      setIsLoading(false);
      return;
    }
    void load();
  }, [activeMerchant, params.receiptNumber]);

  if (!activeMerchant) {
    return <EmptyState text="Select a merchant before opening receipt detail." />;
  }

  if (isLoading) {
    return <LoadingState text="Loading receipt detail..." />;
  }

  if (!receipt) {
    return <EmptyState text="Receipt not found." />;
  }

  const moneyCurrency = receipt.charge_currency || receipt.base_currency || currency;

  return (
    <main className="space-y-6">
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.82),rgba(8,12,28,0.96))] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <Link
          href="/dashboard/receipts"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to receipts
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Tag>{receipt.receipt_number}</Tag>
          <Tag>{safeText(receipt.status)}</Tag>
          {receipt.provider ? <Tag>{receipt.provider}</Tag> : null}
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
          {receipt.receipt_number}
        </h1>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => void loadRenderPayload()}
            disabled={isLoadingRender}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white"
          >
            {isLoadingRender ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Load render payload
          </button>

          <button
            type="button"
            onClick={() => void syncFromPayment()}
            disabled={isSyncing || !receipt.payment}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white"
          >
            <RefreshCcw className="h-4 w-4" />
            {isSyncing ? "Syncing..." : "Sync from payment"}
          </button>
        </div>
      </section>

      {error ? <ErrorBanner text={error} /> : null}

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard title="Receipt overview">
          <div className="space-y-3">
            <MetricRow label="Order number" value={safeText(receipt.order_number)} />
            <MetricRow label="Payment reference" value={safeText(receipt.payment_reference)} />
            <MetricRow
              label="Gross amount"
              value={formatMoney(receipt.gross_amount, moneyCurrency)}
            />
            <MetricRow
              label="Subtotal"
              value={formatMoney(receipt.subtotal_amount, moneyCurrency)}
            />
            <MetricRow
              label="Discount"
              value={formatMoney(receipt.discount_amount, moneyCurrency)}
            />
            <MetricRow
              label="Shipping"
              value={formatMoney(receipt.shipping_amount, moneyCurrency)}
            />
            <MetricRow label="Tax" value={formatMoney(receipt.tax_amount, moneyCurrency)} />
            <MetricRow
              label="Refund amount"
              value={formatMoney(receipt.refund_amount, moneyCurrency)}
            />
            <MetricRow
              label="Dispute amount"
              value={formatMoney(receipt.dispute_amount, moneyCurrency)}
            />
            <MetricRow label="Payment method" value={safeText(receipt.payment_method)} />
            <MetricRow label="Payment channel" value={safeText(receipt.payment_channel)} />
            <MetricRow label="Paid at" value={formatDate(receipt.paid_at)} />
            <MetricRow label="Issued at" value={formatDate(receipt.issued_at)} />
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Annotations">
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
                      <Tag>{safeText(annotation.annotation_type)}</Tag>
                    </div>

                    <div className="mt-3 text-sm font-semibold text-white">
                      {safeText(annotation.title)}
                    </div>

                    <p className="mt-2 text-sm text-slate-300">
                      {safeText(annotation.message)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </SectionCard>

          <JsonCard title="Merchant snapshot" value={receipt.merchant_snapshot || {}} />
          <JsonCard title="Buyer snapshot" value={receipt.buyer_snapshot || {}} />
          <JsonCard
            title="Shipping address snapshot"
            value={receipt.shipping_address_snapshot || {}}
          />
          <JsonCard
            title="Billing address snapshot"
            value={receipt.billing_address_snapshot || {}}
          />
          <JsonCard title="Items snapshot" value={receipt.items_snapshot || []} />
          <JsonCard title="Render metadata" value={receipt.render_metadata || {}} />
          {renderPayload ? <JsonCard title="Render payload" value={renderPayload} /> : null}
        </div>
      </section>
    </main>
  );
}