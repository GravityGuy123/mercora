"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Wallet } from "lucide-react";
import { formatDate, formatMoney, merchantOperationsApi } from "@/lib/api/merchant-operations";
import { useMerchant } from "@/hooks/use-merchant";
import type { MerchantPayment } from "@/types/merchant-operations";
import {
  EmptyState,
  ErrorBanner,
  LoadingState,
  MetricTile,
  Tag,
  safeText,
} from "@/components/merchant/MerchantOpsPrimitives";

export default function MerchantManualPaymentsPageClient() {
  const { activeMerchant } = useMerchant();

  const [payments, setPayments] = useState<MerchantPayment[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const currency = activeMerchant?.base_currency || "NGN";

  async function load() {
    if (!activeMerchant) return;

    setError("");
    setIsLoading(true);

    try {
      const data = await merchantOperationsApi.listPayments(activeMerchant.id, {
        search: search || undefined,
      });
      setPayments(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load manual payments.");
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

  const manualPayments = useMemo(
    () =>
      payments.filter(
        (payment) =>
          payment.mode === "manual" ||
          (payment.proof_submissions && payment.proof_submissions.length > 0),
      ),
    [payments],
  );

  if (!activeMerchant) {
    return <EmptyState text="Select a merchant before opening manual payments." />;
  }

  if (isLoading) {
    return <LoadingState text="Loading manual payments..." />;
  }

  return (
    <main className="space-y-6">
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.78),rgba(8,12,28,0.96))] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
          <Wallet className="h-4 w-4" />
          Manual payments
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
          Manual payment proofs
        </h1>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search payment reference..."
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
        {manualPayments.length === 0 ? (
          <EmptyState text="No manual payments found." />
        ) : (
          manualPayments.map((payment) => {
            const latestProof = payment.proof_submissions?.[0];

            return (
              <Link
                key={payment.id}
                href={`/dashboard/payments/${payment.id}`}
                className="group block rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.66),rgba(8,12,28,0.94))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-indigo-500/20"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag>{payment.payment_reference}</Tag>
                      <Tag>{safeText(payment.status)}</Tag>
                      <Tag>{safeText(latestProof?.status)}</Tag>
                      <Tag>manual</Tag>
                    </div>

                    <div className="mt-4 text-xl font-semibold text-white">
                      {formatMoney(
                        payment.gross_amount,
                        payment.charge_currency || payment.base_currency || currency,
                      )}
                    </div>

                    <div className="mt-3 grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
                      <div>Submitted by: {safeText(latestProof?.submitted_by_name)}</div>
                      <div>Submitted at: {formatDate(latestProof?.created_at)}</div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 xl:min-w-[320px] xl:grid-cols-2">
                    <MetricTile label="Order" value={safeText(payment.order)} />
                    <MetricTile label="Proof file" value={safeText(latestProof?.proof_file_url)} />
                    <MetricTile label="Note" value={safeText(latestProof?.note)} />
                    <MetricTile label="Reviewed at" value={formatDate(latestProof?.reviewed_at)} />
                  </div>
                </div>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Open manual payment
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })
        )}
      </section>
    </main>
  );
}