"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate, platformAdminApi } from "@/lib/api/platform-admin";
import {
  PlatformEmptyPanel,
  PlatformErrorBanner,
  PlatformJsonCard,
  PlatformLoadingPanel,
  PlatformMetricRow,
  PlatformSectionCard,
  PlatformTag,
} from "@/components/platform/PlatformPrimitives";
import type { PlatformStorefront } from "@/types/platform-admin";

export default function PlatformStoreDetailPageClient() {
  const params = useParams<{ storeId: string }>();
  const storeId = params.storeId;

  const [store, setStore] = useState<PlatformStorefront | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      setError("");
      setIsLoading(true);

      try {
        const data = await platformAdminApi.storefrontDetail(storeId);
        setStore(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load store detail.");
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [storeId]);

  if (isLoading) {
    return <PlatformLoadingPanel text="Loading store detail..." />;
  }

  if (!store) {
    return <PlatformEmptyPanel text="Store not found." />;
  }

  return (
    <main className="space-y-6">
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.82),rgba(8,12,28,0.96))] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <Link
          href="/platform-admin/stores"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to stores
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <PlatformTag>{store.status}</PlatformTag>
          <PlatformTag>{store.visibility}</PlatformTag>
          <PlatformTag>{store.domain_status}</PlatformTag>
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
          {store.store_name}
        </h1>

        <p className="mt-3 text-sm text-slate-300">
          {store.short_description || store.headline || "No storefront summary."}
        </p>
      </section>

      {error ? <PlatformErrorBanner text={error} /> : null}

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <PlatformSectionCard title="Store overview">
          <div className="space-y-3">
            <PlatformMetricRow label="Merchant" value={store.merchant_name || "—"} />
            <PlatformMetricRow label="Slug" value={store.slug || "—"} />
            <PlatformMetricRow label="Subdomain" value={store.subdomain || "—"} />
            <PlatformMetricRow label="Custom domain" value={store.custom_domain || "—"} />
            <PlatformMetricRow label="Public identifier" value={store.public_identifier || "—"} />
            <PlatformMetricRow label="Accepting orders" value={store.is_accepting_orders ? "Yes" : "No"} />
            <PlatformMetricRow label="Published at" value={formatDate(store.published_at)} />
            <PlatformMetricRow label="Created at" value={formatDate(store.created_at)} />
          </div>
        </PlatformSectionCard>

        <div className="space-y-6">
          <PlatformSectionCard title="Contact and address">
            <div className="space-y-3">
              <PlatformMetricRow label="Email" value={store.contact_email || "—"} />
              <PlatformMetricRow label="Phone" value={store.contact_phone || "—"} />
              <PlatformMetricRow label="WhatsApp" value={store.whatsapp_number || "—"} />
              <PlatformMetricRow label="Address line 1" value={store.address_line_1 || "—"} />
              <PlatformMetricRow label="City" value={store.city || "—"} />
              <PlatformMetricRow label="Country" value={store.country_code || "—"} />
            </div>
          </PlatformSectionCard>

          <PlatformJsonCard title="Social links" value={store.social_links || {}} />
          <PlatformJsonCard title="Metadata" value={store.metadata || {}} />
        </div>
      </section>
    </main>
  );
}