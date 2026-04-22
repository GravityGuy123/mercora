"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { formatDate, formatMoney, platformAdminApi } from "@/lib/api/platform-admin";
import {
  PlatformEmptyPanel,
  PlatformErrorBanner,
  PlatformJsonCard,
  PlatformLoadingPanel,
  PlatformTag,
} from "@/components/platform/PlatformPrimitives";
import type { PlatformDispute } from "@/types/platform-admin";

function safeText(value?: string | null) {
  return value && value.trim() ? value : "—";
}

export default function PlatformDisputeDetailPageClient() {
  const params = useParams<{ disputeId: string }>();
  const disputeId = params.disputeId;

  const [dispute, setDispute] = useState<PlatformDispute | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
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
    };

    void run();
  }, [disputeId]);

  if (isLoading) {
    return <PlatformLoadingPanel text="Loading dispute detail..." />;
  }

  if (!dispute) {
    return <PlatformEmptyPanel text="Dispute not found." />;
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
          {safeText(dispute.provider_dispute_id || dispute.id)}
        </h1>
      </section>

      {error ? <PlatformErrorBanner text={error} /> : null}

      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.72),rgba(8,12,28,0.94))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <MetricRow label="Provider" value={safeText(dispute.provider)} />
          <MetricRow label="Status" value={safeText(dispute.status)} />
          <MetricRow
            label="Amount"
            value={formatMoney(dispute.amount, dispute.currency || "NGN")}
          />
          <MetricRow label="Currency" value={safeText(dispute.currency)} />
          <MetricRow label="Reason" value={safeText(dispute.reason)} />
          <MetricRow
            label="Provider reason code"
            value={safeText(dispute.provider_reason_code)}
          />
          <MetricRow label="Payment ID" value={safeText(dispute.payment)} />
          <MetricRow label="Order ID" value={safeText(dispute.order)} />
          <MetricRow label="Opened at" value={formatDate(dispute.opened_at)} />
          <MetricRow label="Evidence due" value={formatDate(dispute.evidence_due_at)} />
          <MetricRow label="Closed at" value={formatDate(dispute.closed_at)} />
          <MetricRow label="Created at" value={formatDate(dispute.created_at)} />
        </div>

        <div className="mt-6">
          <PlatformJsonCard title="Metadata" value={dispute.metadata || {}} />
        </div>
      </section>
    </main>
  );
}

function MetricRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4">
      <div className="text-xs uppercase tracking-[0.14em] text-slate-400">{label}</div>
      <div className="mt-2 break-all text-sm font-semibold text-white">{value}</div>
    </div>
  );
}