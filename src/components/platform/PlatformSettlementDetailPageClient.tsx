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
import type { PlatformSettlementRecord } from "@/types/platform-admin";

export default function PlatformSettlementDetailPageClient() {
  const params = useParams<{ recordId: string }>();
  const recordId = params.recordId;

  const [record, setRecord] = useState<PlatformSettlementRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      setError("");
      setIsLoading(true);

      try {
        const data = await platformAdminApi.settlementDetail(recordId);
        setRecord(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load settlement detail.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [recordId]);

  if (isLoading) {
    return <PlatformLoadingPanel text="Loading settlement detail..." />;
  }

  if (!record) {
    return <PlatformEmptyPanel text="Settlement record not found." />;
  }

  const currency = record.settlement_currency || record.base_currency || "NGN";

  return (
    <main className="space-y-6">
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.82),rgba(8,12,28,0.96))] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <Link
          href="/platform-admin/settlements"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to settlements
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <PlatformTag>{record.status || "status"}</PlatformTag>
          {record.provider ? <PlatformTag>{record.provider}</PlatformTag> : null}
          {record.payment_reference ? <PlatformTag>{record.payment_reference}</PlatformTag> : null}
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
          {record.order_number || record.payment_reference || "Settlement detail"}
        </h1>
      </section>

      {error ? <PlatformErrorBanner text={error} /> : null}

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <PlatformSectionCard title="Settlement overview">
          <div className="space-y-3">
            <PlatformMetricRow label="Gross amount" value={formatMoney(record.gross_amount, currency)} />
            <PlatformMetricRow label="Net amount" value={formatMoney(record.net_amount, currency)} />
            <PlatformMetricRow label="Processor fee" value={formatMoney(record.processor_fee_amount, currency)} />
            <PlatformMetricRow label="Platform fee" value={formatMoney(record.platform_fee_amount, currency)} />
            <PlatformMetricRow label="Payout fee" value={formatMoney(record.payout_fee_amount, currency)} />
            <PlatformMetricRow label="Reserve amount" value={formatMoney(record.reserve_amount, currency)} />
            <PlatformMetricRow label="Refund amount" value={formatMoney(record.refund_amount, currency)} />
            <PlatformMetricRow label="Dispute amount" value={formatMoney(record.dispute_amount, currency)} />
            <PlatformMetricRow label="Eligible at" value={formatDate(record.eligible_at)} />
            <PlatformMetricRow label="Paid out at" value={formatDate(record.paid_out_at)} />
          </div>
        </PlatformSectionCard>

        <div className="space-y-6">
          <PlatformSectionCard title="Timing and policy">
            <div className="space-y-3">
              <PlatformMetricRow label="Hold until" value={formatDate(record.hold_until)} />
              <PlatformMetricRow label="Scheduled at" value={formatDate(record.scheduled_at)} />
              <PlatformMetricRow label="Last synced" value={formatDate(record.last_synced_at)} />
              <PlatformMetricRow label="Reserve percent snapshot" value={record.reserve_percent_snapshot || "—"} />
              <PlatformMetricRow label="Settlement delay days" value={String(record.settlement_delay_days_snapshot || 0)} />
              <PlatformMetricRow label="Created at" value={formatDate(record.created_at)} />
            </div>
          </PlatformSectionCard>

          <PlatformJsonCard title="Metadata" value={record.metadata || {}} />
        </div>
      </section>
    </main>
  );
}