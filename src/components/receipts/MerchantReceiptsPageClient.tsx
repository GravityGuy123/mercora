"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Archive, ReceiptText } from "lucide-react";
import { formatDate, formatMoney, merchantOperationsApi } from "@/lib/api/merchant-operations";
import { useMerchant } from "@/hooks/use-merchant";
import type { MerchantReceipt } from "@/types/merchant-operations";
import {
  EmptyState,
  ErrorBanner,
  LoadingState,
  MetricTile,
  Tag,
  safeText,
} from "@/components/merchant/MerchantOpsPrimitives";

export default function MerchantReceiptsPageClient() {
  const { activeMerchant } = useMerchant();

  const [receipts, setReceipts] = useState<MerchantReceipt[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [provider, setProvider] = useState("");
  const [archivingReceiptId, setArchivingReceiptId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const currency = activeMerchant?.base_currency || "NGN";

  async function load() {
    if (!activeMerchant) return;

    setError("");
    setIsLoading(true);

    try {
      const data = await merchantOperationsApi.listReceipts(activeMerchant.id, {
        search: search || undefined,
        status: status || undefined,
        provider: provider || undefined,
      });
      setReceipts(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load receipts.");
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

  async function archiveReceipt(receiptId: string) {
    if (!activeMerchant) return;

    setError("");
    setArchivingReceiptId(receiptId);

    try {
      await merchantOperationsApi.archiveReceipt(activeMerchant.id, receiptId, {
        status: "archived",
      });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to archive receipt.");
    } finally {
      setArchivingReceiptId("");
    }
  }

  if (!activeMerchant) {
    return <EmptyState text="Select a merchant before opening receipts." />;
  }

  if (isLoading) {
    return <LoadingState text="Loading receipts..." />;
  }

  return (
    <main className="space-y-6">
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.78),rgba(8,12,28,0.96))] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
          <ReceiptText className="h-4 w-4" />
          Receipts
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
          Merchant receipts
        </h1>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_180px_180px_auto]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search receipt, order, payment..."
            className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none"
          />
          <input
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            placeholder="Status"
            className="h-11 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none"
          />
          <input
            value={provider}
            onChange={(event) => setProvider(event.target.value)}
            placeholder="Provider"
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
        {receipts.length === 0 ? (
          <EmptyState text="No receipts found." />
        ) : (
          receipts.map((receipt) => (
            <div
              key={receipt.id}
              className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.66),rgba(8,12,28,0.94))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Tag>{receipt.receipt_number}</Tag>
                    <Tag>{safeText(receipt.status)}</Tag>
                    {receipt.provider ? <Tag>{receipt.provider}</Tag> : null}
                  </div>

                  <div className="mt-4 text-xl font-semibold text-white">
                    {formatMoney(
                      receipt.gross_amount,
                      receipt.charge_currency || receipt.base_currency || currency,
                    )}
                  </div>

                  <div className="mt-3 grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
                    <div>Order: {safeText(receipt.order_number)}</div>
                    <div>Payment ref: {safeText(receipt.payment_reference)}</div>
                    <div>Issued at: {formatDate(receipt.issued_at)}</div>
                    <div>Paid at: {formatDate(receipt.paid_at)}</div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:min-w-[320px] xl:grid-cols-2">
                  <MetricTile
                    label="Refund amount"
                    value={formatMoney(
                      receipt.refund_amount,
                      receipt.charge_currency || receipt.base_currency || currency,
                    )}
                  />
                  <MetricTile
                    label="Dispute amount"
                    value={formatMoney(
                      receipt.dispute_amount,
                      receipt.charge_currency || receipt.base_currency || currency,
                    )}
                  />
                  <MetricTile label="Method" value={safeText(receipt.payment_method)} />
                  <MetricTile label="Channel" value={safeText(receipt.payment_channel)} />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/dashboard/receipts/${receipt.receipt_number}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white"
                >
                  Open receipt
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => void archiveReceipt(receipt.id)}
                  disabled={archivingReceiptId === receipt.id}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white"
                >
                  <Archive className="h-4 w-4" />
                  {archivingReceiptId === receipt.id ? "Archiving..." : "Archive"}
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}