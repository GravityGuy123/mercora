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
import type { PlatformSubscription } from "@/types/platform-admin";

export default function PlatformSubscriptionDetailPageClient() {
  const params = useParams<{ subscriptionId: string }>();
  const subscriptionId = params.subscriptionId;

  const [subscription, setSubscription] = useState<PlatformSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      setError("");
      setIsLoading(true);

      try {
        const data = await platformAdminApi.subscriptionDetail(subscriptionId);
        setSubscription(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load subscription detail.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [subscriptionId]);

  if (isLoading) {
    return <PlatformLoadingPanel text="Loading subscription detail..." />;
  }

  if (!subscription) {
    return <PlatformEmptyPanel text="Subscription not found." />;
  }

  return (
    <main className="space-y-6">
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.82),rgba(8,12,28,0.96))] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <Link
          href="/platform-admin/subscriptions"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to subscriptions
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <PlatformTag>{subscription.status}</PlatformTag>
          <PlatformTag>{subscription.source}</PlatformTag>
          {subscription.is_current ? <PlatformTag>Current</PlatformTag> : null}
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
          {subscription.plan_name_snapshot || "Subscription"}
        </h1>
      </section>

      {error ? <PlatformErrorBanner text={error} /> : null}

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <PlatformSectionCard title="Subscription overview">
          <div className="space-y-3">
            <PlatformMetricRow label="Plan code" value={subscription.plan_code_snapshot || "—"} />
            <PlatformMetricRow label="Billing interval" value={subscription.billing_interval_snapshot || "—"} />
            <PlatformMetricRow label="Price" value={formatMoney(subscription.price_amount_snapshot, subscription.currency_snapshot || "NGN")} />
            <PlatformMetricRow label="Auto renew" value={subscription.auto_renew ? "Yes" : "No"} />
            <PlatformMetricRow label="Cancel at period end" value={subscription.cancel_at_period_end ? "Yes" : "No"} />
            <PlatformMetricRow label="Started at" value={formatDate(subscription.started_at)} />
            <PlatformMetricRow label="Current period end" value={formatDate(subscription.current_period_end_at)} />
            <PlatformMetricRow label="Trial end" value={formatDate(subscription.trial_end_at)} />
            <PlatformMetricRow label="Cancelled at" value={formatDate(subscription.cancelled_at)} />
            <PlatformMetricRow label="Ended at" value={formatDate(subscription.ended_at)} />
          </div>
        </PlatformSectionCard>

        <div className="space-y-6">
          <PlatformSectionCard title="Plan entitlements">
            <div className="space-y-3">
              {(subscription.plan?.entitlements || []).length === 0 ? (
                <div className="text-sm text-slate-400">No plan entitlements.</div>
              ) : (
                subscription.plan?.entitlements?.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                  >
                    <div className="text-sm font-semibold text-white">
                      {item.feature_name}
                    </div>
                    <p className="mt-2 text-sm text-slate-300">
                      {item.description || "No description."}
                    </p>
                  </div>
                ))
              )}
            </div>
          </PlatformSectionCard>

          <PlatformSectionCard title="Invoices">
            <div className="space-y-3">
              {(subscription.invoices || []).length === 0 ? (
                <div className="text-sm text-slate-400">No invoices.</div>
              ) : (
                subscription.invoices?.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <PlatformTag>{invoice.invoice_number}</PlatformTag>
                      <PlatformTag>{invoice.status}</PlatformTag>
                    </div>
                    <div className="mt-3 text-sm text-white">
                      {formatMoney(invoice.amount_due, invoice.currency || "NGN")}
                    </div>
                  </div>
                ))
              )}
            </div>
          </PlatformSectionCard>

          <PlatformJsonCard
            title="Entitlement snapshot"
            value={subscription.entitlement_snapshot || {}}
          />
        </div>
      </section>
    </main>
  );
}