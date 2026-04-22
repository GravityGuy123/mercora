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
import type { PlatformPayment } from "@/types/platform-admin";

export default function PlatformPaymentDetailPageClient() {
  const params = useParams<{ paymentId: string }>();
  const paymentId = params.paymentId;

  const [payment, setPayment] = useState<PlatformPayment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      setError("");
      setIsLoading(true);

      try {
        const data = await platformAdminApi.paymentDetail(paymentId);
        setPayment(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load payment detail.");
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [paymentId]);

  if (isLoading) {
    return <PlatformLoadingPanel text="Loading payment detail..." />;
  }

  if (!payment) {
    return <PlatformEmptyPanel text="Payment not found." />;
  }

  const moneyCurrency =
    payment.settlement_currency || payment.charge_currency || payment.base_currency || "NGN";

  return (
    <main className="space-y-6">
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.82),rgba(8,12,28,0.96))] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <Link
          href="/platform-admin/payments"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to payments
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <PlatformTag>{payment.payment_reference}</PlatformTag>
          <PlatformTag>{payment.status || "status"}</PlatformTag>
          <PlatformTag>{payment.verification_status || "verification"}</PlatformTag>
          {payment.provider ? <PlatformTag>{payment.provider}</PlatformTag> : null}
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
          {payment.payment_reference}
        </h1>
      </section>

      {error ? <PlatformErrorBanner text={error} /> : null}

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <PlatformSectionCard title="Payment overview">
          <div className="space-y-3">
            <PlatformMetricRow label="Provider reference" value={payment.provider_reference || "—"} />
            <PlatformMetricRow label="Provider transaction" value={payment.provider_transaction_id || "—"} />
            <PlatformMetricRow label="Gross amount" value={formatMoney(payment.gross_amount, payment.charge_currency || moneyCurrency)} />
            <PlatformMetricRow label="Net amount" value={formatMoney(payment.net_amount, moneyCurrency)} />
            <PlatformMetricRow label="Processor fee" value={formatMoney(payment.processor_fee_amount, moneyCurrency)} />
            <PlatformMetricRow label="Platform fee" value={formatMoney(payment.platform_fee_amount, moneyCurrency)} />
            <PlatformMetricRow label="Reserve amount" value={formatMoney(payment.reserve_amount, moneyCurrency)} />
            <PlatformMetricRow label="Refund amount" value={formatMoney(payment.refund_amount, moneyCurrency)} />
            <PlatformMetricRow label="Dispute amount" value={formatMoney(payment.dispute_amount, moneyCurrency)} />
            <PlatformMetricRow label="Created" value={formatDate(payment.created_at)} />
          </div>
        </PlatformSectionCard>

        <div className="space-y-6">
          <PlatformSectionCard title="Attempts">
            <div className="space-y-3">
              {(payment.attempts || []).length === 0 ? (
                <div className="text-sm text-slate-400">No attempts.</div>
              ) : (
                payment.attempts?.map((attempt) => (
                  <div
                    key={attempt.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <PlatformTag>{attempt.status || "status"}</PlatformTag>
                      {attempt.provider ? <PlatformTag>{attempt.provider}</PlatformTag> : null}
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <PlatformMetricRow label="Provider reference" value={attempt.provider_reference || "—"} />
                      <PlatformMetricRow label="Failure message" value={attempt.failure_message || "—"} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </PlatformSectionCard>

          <PlatformSectionCard title="Refunds and disputes">
            <div className="space-y-3">
              {(payment.refunds || []).map((refund) => (
                <div
                  key={refund.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <PlatformTag>Refund</PlatformTag>
                    <PlatformTag>{refund.status || "status"}</PlatformTag>
                  </div>
                  <div className="mt-3 text-sm text-white">
                    {formatMoney(refund.amount, refund.currency || moneyCurrency)}
                  </div>
                </div>
              ))}

              {(payment.disputes || []).map((dispute) => (
                <div
                  key={dispute.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <PlatformTag>Dispute</PlatformTag>
                    <PlatformTag>{dispute.status || "status"}</PlatformTag>
                  </div>
                  <div className="mt-3 text-sm text-white">
                    {formatMoney(dispute.amount, dispute.currency || moneyCurrency)}
                  </div>
                </div>
              ))}

              {(payment.refunds || []).length === 0 && (payment.disputes || []).length === 0 ? (
                <div className="text-sm text-slate-400">No refunds or disputes.</div>
              ) : null}
            </div>
          </PlatformSectionCard>

          <PlatformJsonCard title="Provider metadata" value={payment.provider_metadata_snapshot || {}} />
          <PlatformJsonCard title="Metadata" value={payment.metadata || {}} />
        </div>
      </section>
    </main>
  );
}