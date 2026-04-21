"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AlertTriangle, ArrowLeft, Loader2 } from "lucide-react";
import { formatDate, formatMoney, platformAdminApi } from "@/lib/api/platform-admin";
import type { PlatformDispute } from "@/types/platform-admin";

export default function PlatformDisputeDetailPageClient() {
  const params = useParams<{ disputeId: string }>();
  const disputeId = params.disputeId;

  const [dispute, setDispute] = useState<PlatformDispute | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    void load();
  }, [disputeId]);

  async function load() {
    setError("");
    setIsLoading(true);

    try {
      const data = await platformAdminApi.disputeDetail(disputeId);
      setDispute(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load dispute detail.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingPanel text="Loading dispute detail..." />;
  }

  if (!dispute) {
    return <EmptyPanel text="Dispute not found." />;
  }

  return (
    <main className="space-y-6">
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.82),rgba(8,12,28,0.96))] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <Link
          href="/platform-admin/disputes"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to disputes
        </Link>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
          <AlertTriangle className="h-4 w-4" />
          Dispute detail
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
          {dispute.provider_dispute_id || dispute.id}
        </h1>
      </section>

      {error ? (
        <div className="rounded-[18px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      ) : null}

      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.72),rgba(8,12,28,0.94))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <MetricRow label="Provider" value={dispute.provider} />
          <MetricRow label="Status" value={dispute.status} />
          <MetricRow label="Amount" value={formatMoney(dispute.amount, dispute.currency || "NGN")} />
          <MetricRow label="Currency" value={dispute.currency || "—"} />
          <MetricRow label="Reason" value={dispute.reason || "—"} />
          <MetricRow label="Provider reason code" value={dispute.provider_reason_code || "—"} />
          <MetricRow label="Payment ID" value={dispute.payment || "—"} />
          <MetricRow label="Order ID" value={dispute.order || "—"} />
          <MetricRow label="Opened at" value={formatDate(dispute.opened_at)} />
          <MetricRow label="Evidence due" value={formatDate(dispute.evidence_due_at)} />
          <MetricRow label="Closed at" value={formatDate(dispute.closed_at)} />
          <MetricRow label="Created at" value={formatDate(dispute.created_at)} />
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
          <div className="text-sm font-semibold text-white">Metadata</div>
          <pre className="mt-3 whitespace-pre-wrap break-words text-xs leading-6 text-slate-300">
            {JSON.stringify(dispute.metadata || {}, null, 2)}
          </pre>
        </div>
      </section>
    </main>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4">
      <div className="text-xs uppercase tracking-[0.14em] text-slate-400">{label}</div>
      <div className="mt-2 break-all text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

function LoadingPanel({ text }: { text: string }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
      <p className="mt-4 text-sm text-slate-300">{text}</p>
    </div>
  );
}

function EmptyPanel({ text }: { text: string }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-12 text-center text-slate-300">
      {text}
    </div>
  );
}