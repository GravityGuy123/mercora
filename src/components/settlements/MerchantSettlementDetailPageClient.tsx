"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate, formatMoney, merchantOperationsApi } from "@/lib/api/merchant-operations";
import { useMerchant } from "@/hooks/use-merchant";
import type { MerchantSettlementRecord } from "@/types/merchant-operations";
import {
  EmptyState,
  ErrorBanner,
  JsonCard,
  LoadingState,
  MetricRow,
  SectionCard,
  Tag,
} from "@/components/merchant/MerchantOpsPrimitives";

export default function MerchantSettlementDetailPageClient() {
  const params = useParams<{ recordId: string }>();
  const { activeMerchant } = useMerchant();

  const [record, setRecord] = useState<MerchantSettlementRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const currency = activeMerchant?.base_currency || "NGN";

  async function load() {
    if (!activeMerchant) return;

    setError("");
    setIsLoading(true);

    try {
      const data = await merchantOperationsApi.settlementDetail(activeMerchant.id, params.recordId);
      setRecord(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load settlement detail.");
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
  }, [activeMerchant, params.recordId]);

  if (!activeMerchant) {
    return <EmptyState text="Select a merchant before opening settlement detail." />;
  }

  if (isLoading) {
    return <LoadingState text="Loading settlement detail..." />;
  }

  if (!record) {
    return <EmptyState text="Settlement record not found." />;
  }

  const moneyCurrency = record.settlement_currency || record.base_currency || currency;

  return (
    <main className="space-y-6">
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.82),rgba(8,12,28,0.96))] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <Link
          href="/dashboard/settlements"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to settlements
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Tag>{record.payment_reference || "payment"}</Tag>
          <Tag>{record.status || "status"}</Tag>
          {record.provider ? <Tag>{record.provider}</Tag> : null}
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
          {record.order_number || "Settlement detail"}
        </h1>
      </section>

      {error ? <ErrorBanner text={error} /> : null}

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard title="Settlement overview">
          <div className="space-y-3">
            <MetricRow
              label="Gross amount"
              value={formatMoney(record.gross_amount, moneyCurrency)}
            />
            <MetricRow
              label="Net amount"
              value={formatMoney(record.net_amount, moneyCurrency)}
            />
            <MetricRow
              label="Processor fee"
              value={formatMoney(record.processor_fee_amount, moneyCurrency)}
            />
            <MetricRow
              label="Platform fee"
              value={formatMoney(record.platform_fee_amount, moneyCurrency)}
            />
            <MetricRow
              label="Payout fee"
              value={formatMoney(record.payout_fee_amount, moneyCurrency)}
            />
            <MetricRow
              label="Reserve amount"
              value={formatMoney(record.reserve_amount, moneyCurrency)}
            />
            <MetricRow
              label="Refund amount"
              value={formatMoney(record.refund_amount, moneyCurrency)}
            />
            <MetricRow
              label="Dispute amount"
              value={formatMoney(record.dispute_amount, moneyCurrency)}
            />
            <MetricRow label="Eligible at" value={formatDate(record.eligible_at)} />
            <MetricRow label="Scheduled at" value={formatDate(record.scheduled_at)} />
            <MetricRow label="Paid out at" value={formatDate(record.paid_out_at)} />
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard title="Policy and timing">
            <div className="space-y-3">
              <MetricRow
                label="Reserve percent snapshot"
                value={record.reserve_percent_snapshot || "—"}
              />
              <MetricRow
                label="Settlement delay days"
                value={String(record.settlement_delay_days_snapshot || 0)}
              />
              <MetricRow label="Hold until" value={formatDate(record.hold_until)} />
              <MetricRow label="Last synced" value={formatDate(record.last_synced_at)} />
              <MetricRow label="Created at" value={formatDate(record.created_at)} />
              <MetricRow label="Updated at" value={formatDate(record.updated_at)} />
            </div>
          </SectionCard>

          <JsonCard title="Metadata" value={record.metadata || {}} />
        </div>
      </section>
    </main>
  );
}