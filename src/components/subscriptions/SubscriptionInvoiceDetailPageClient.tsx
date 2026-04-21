"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { subscriptionsApi, formatMoney } from "@/lib/api/subscriptions";
import { useMerchant } from "@/hooks/use-merchant";
import type { SubscriptionInvoice } from "@/types/subscription";

function formatDate(value?: string | null) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function SubscriptionInvoiceDetailPageClient() {
  const { activeMerchant } = useMerchant();
  const params = useParams<{ invoiceId: string }>();
  const invoiceId = params.invoiceId;

  const [invoice, setInvoice] = useState<SubscriptionInvoice | null>(null);
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
        const data = await subscriptionsApi.invoiceDetail(activeMerchant.id, invoiceId);
        setInvoice(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load invoice.");
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [activeMerchant, invoiceId]);

  if (!activeMerchant) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-12 text-center text-slate-300">
        Select a merchant before opening invoice detail.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
        <p className="mt-4 text-sm text-slate-300">Loading invoice...</p>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-12 text-center text-slate-300">
        Invoice not found.
      </div>
    );
  }

  const currency = invoice.currency || activeMerchant.base_currency || "NGN";

  return (
    <main className="space-y-6">
      <section className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.82),rgba(8,12,28,0.96))] shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <div className="border-b border-white/10 px-6 py-6 sm:px-8">
          <Link
            href="/dashboard/subscriptions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to subscriptions
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Tag>{invoice.invoice_number}</Tag>
            <Tag>{invoice.status}</Tag>
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
            Invoice {invoice.invoice_number}
          </h1>
        </div>
      </section>

      {error ? (
        <div className="rounded-[18px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      ) : null}

      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.72),rgba(8,12,28,0.94))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <MetricRow label="Plan" value={invoice.plan_name_snapshot || "—"} />
          <MetricRow label="Status" value={invoice.status} />
          <MetricRow label="Amount due" value={formatMoney(invoice.amount_due, currency)} />
          <MetricRow label="Amount paid" value={formatMoney(invoice.amount_paid, currency)} />
          <MetricRow label="Billing period start" value={formatDate(invoice.billing_period_start_at)} />
          <MetricRow label="Billing period end" value={formatDate(invoice.billing_period_end_at)} />
          <MetricRow label="Due at" value={formatDate(invoice.due_at)} />
          <MetricRow label="Paid at" value={formatDate(invoice.paid_at)} />
          <MetricRow label="Created at" value={formatDate(invoice.created_at)} />
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
          <div className="text-sm font-semibold text-white">Notes</div>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {invoice.notes || "No notes attached to this invoice."}
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
          <div className="text-sm font-semibold text-white">Metadata</div>
          <pre className="mt-3 whitespace-pre-wrap break-words text-xs leading-6 text-slate-300">
            {JSON.stringify(invoice.metadata || {}, null, 2)}
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
      <div className="mt-2 text-sm font-semibold text-white">{value}</div>
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