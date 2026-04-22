"use client";

import { useEffect, useState } from "react";
import { Settings2 } from "lucide-react";
import { platformAdminApi } from "@/lib/api/platform-admin";
import {
  PlatformEmptyPanel,
  PlatformErrorBanner,
  PlatformJsonCard,
  PlatformLoadingPanel,
} from "@/components/platform/PlatformPrimitives";
import type { PlatformConfigurationSummary } from "@/types/platform-admin";

export default function PlatformConfigurationPageClient() {
  const [configuration, setConfiguration] =
    useState<PlatformConfigurationSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      setError("");
      setIsLoading(true);

      try {
        const data = await platformAdminApi.configuration();
        setConfiguration(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load configuration.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, []);

  if (isLoading) {
    return <PlatformLoadingPanel text="Loading platform configuration..." />;
  }

  if (!configuration) {
    return <PlatformEmptyPanel text="Platform configuration is unavailable." />;
  }

  const entries = Object.entries(configuration);

  return (
    <main className="space-y-6">
      <section className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.82),rgba(8,12,28,0.96))] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.24)] sm:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
          <Settings2 className="h-4 w-4" />
          Platform configuration
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
          Configuration
        </h1>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
          Global option surfaces, choice maps, and platform-level operational configuration.
        </p>
      </section>

      {error ? <PlatformErrorBanner text={error} /> : null}

      <section className="grid gap-6 xl:grid-cols-2">
        {entries.map(([key, value]) => (
          <PlatformJsonCard key={key} title={key} value={value} />
        ))}
      </section>
    </main>
  );
}