"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { payoutBatchesApi } from "@/lib/api/payout-batches";
import { formatDate, formatMoney } from "@/lib/api/merchant-operations";
import { useMerchant } from "@/hooks/use-merchant";
import type { MerchantPayoutBatch } from "@/types/merchant-operations";

export default function PayoutBatchDetailPageClient() {
  const { activeMerchant } = useMerchant();
  const params = useParams<{ payoutBatchId: string }>();
  const payoutBatchId = params.payoutBatchId;

  const [batch, setBatch] = useState<MerchantPayoutBatch | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      if (!activeMerchant) {
        setIsLoading(false);
        return;
      }

      setError("");
      setIsLoading(true);

      try {
        const data = await payoutBatchesApi.detail(activeMerchant.id, payoutBatchId);
        setBatch(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load payout batch.");
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [activeMerchant, payoutBatchId]);

  if (!activeMerchant) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-12 text-center text-slate-300">
        Select a merchant before opening payout batches.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
        <p className="mt-4 text-sm text-slate-300">Loading payout batch...</p>
      </div>
    );
  }

  if (!batch) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-12 text-center text-slate-300">
        Payout batch not found.
      </div>
    );
  }

  const currency = batch.settlement_currency || activeMerchant.base_currency || "NGN";

  return (
    <main className="space-y-6">
      <section className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.82),rgba(8,12,28,0.96))] shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <div className="border-b border-white/10 px-6 py-6 sm:px-8">
          <Link
            href="/dashboard/settlements"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to settlements
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Tag>{batch.batch_reference}</Tag>
            <Tag>{batch.status || "status"}</Tag>
            {batch.settlement_currency ? <Tag>{batch.settlement_currency}</Tag> : null}
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
            Payout batch {batch.batch_reference}
          </h1>
        </div>
      </section>

      {error ? (
        <div className="rounded-[18px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.72),rgba(8,12,28,0.94))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
          <h2 className="text-xl font-semibold text-white">Batch overview</h2>

          <div className="mt-5 space-y-3">
            <MetricRow label="Status" value={batch.status || "—"} />
            <MetricRow label="Records" value={String(batch.total_records_count || 0)} />
            <MetricRow label="Total gross" value={formatMoney(batch.total_gross_amount, currency)} />
            <MetricRow label="Total net" value={formatMoney(batch.total_net_amount, currency)} />
            <MetricRow label="Total reserve" value={formatMoney(batch.total_reserve_amount, currency)} />
            <MetricRow label="Total refund" value={formatMoney(batch.total_refund_amount, currency)} />
            <MetricRow label="Total dispute" value={formatMoney(batch.total_dispute_amount, currency)} />
            <MetricRow label="Scheduled for" value={formatDate(batch.scheduled_for)} />
            <MetricRow label="Processed at" value={formatDate(batch.processed_at)} />
            <MetricRow label="Failed at" value={formatDate(batch.failed_at)} />
            <MetricRow label="Cancelled at" value={formatDate(batch.cancelled_at)} />
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
            <div className="text-sm font-semibold text-white">Notes</div>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {batch.notes || "No notes attached to this payout batch."}
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
            <div className="text-sm font-semibold text-white">Metadata</div>
            <pre className="mt-3 whitespace-pre-wrap break-words text-xs leading-6 text-slate-300">
              {JSON.stringify(batch.metadata || {}, null, 2)}
            </pre>
          </div>
        </section>

        <section className="space-y-6">
          <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.72),rgba(8,12,28,0.94))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
            <h2 className="text-xl font-semibold text-white">Entries</h2>

            <div className="mt-5 space-y-3">
              {(batch.entries || []).length === 0 ? (
                <div className="text-sm text-slate-400">No payout entries.</div>
              ) : (
                batch.entries?.map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag>{entry.status || "status"}</Tag>
                      {entry.external_reference ? <Tag>{entry.external_reference}</Tag> : null}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white">
                      {formatMoney(entry.amount, entry.currency || currency)}
                    </div>
                    {entry.settlement_record ? (
                      <div className="mt-2 text-sm text-slate-300">
                        Settlement: {entry.settlement_record.payment_reference || entry.settlement_record.order_number || "—"}
                      </div>
                    ) : null}
                    {entry.failure_reason ? (
                      <div className="mt-2 text-sm text-red-200">
                        {entry.failure_reason}
                      </div>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.72),rgba(8,12,28,0.94))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
            <h2 className="text-xl font-semibold text-white">Attempts</h2>

            <div className="mt-5 space-y-3">
              {(batch.attempts || []).length === 0 ? (
                <div className="text-sm text-slate-400">No payout attempts.</div>
              ) : (
                batch.attempts?.map((attempt) => (
                  <div
                    key={attempt.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag>{attempt.status || "status"}</Tag>
                    </div>
                    <div className="mt-2 text-sm text-slate-300">
                      Processed: {formatDate(attempt.processed_at)}
                    </div>
                    {attempt.failure_message ? (
                      <div className="mt-2 text-sm text-red-200">
                        {attempt.failure_message}
                      </div>
                    ) : null}
                    <pre className="mt-3 whitespace-pre-wrap break-words text-xs leading-6 text-slate-300">
                      {JSON.stringify(
                        {
                          request_payload: attempt.request_payload || {},
                          response_payload: attempt.response_payload || {},
                        },
                        null,
                        2,
                      )}
                    </pre>
                  </div>
                ))
              )}
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-sm font-semibold text-white">{value}</span>
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