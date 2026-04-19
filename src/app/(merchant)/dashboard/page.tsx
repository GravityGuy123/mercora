"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CreditCard,
  Plus,
  Settings2,
  Users,
} from "lucide-react";
import { env } from "@/lib/config/env";
import { useMerchant } from "@/hooks/use-merchant";
import type { MerchantCreatePayload } from "@/types/merchant";

const initialState: MerchantCreatePayload = {
  legal_business_name: "",
  public_display_name: "",
  business_type: "registered_business",
  support_email: "",
  support_phone_number: "",
  country_code: "NG",
  base_currency: "NGN",
  default_settlement_currency: "NGN",
  description: "",
  allows_direct_local_payments: true,
  allows_platform_managed_payments: false,
  metadata: {},
};

export default function MerchantDashboardHomePage() {
  const {
    merchants,
    activeMerchant,
    activeMerchantId,
    isLoading,
    error,
    setActiveMerchantId,
    createMerchant,
  } = useMerchant();

  const [form, setForm] = useState<MerchantCreatePayload>(initialState);
  const [createError, setCreateError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canCreate = useMemo(
    () =>
      form.legal_business_name.trim() &&
      form.public_display_name.trim() &&
      form.country_code.trim() &&
      form.base_currency.trim(),
    [form],
  );

  const updateField = <K extends keyof MerchantCreatePayload>(
    field: K,
    value: MerchantCreatePayload[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleCreateMerchant = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setCreateError("");
    setIsSubmitting(true);

    try {
      await createMerchant({
        ...form,
        legal_business_name: form.legal_business_name.trim(),
        public_display_name: form.public_display_name.trim(),
        support_email: form.support_email?.trim() || "",
        support_phone_number: form.support_phone_number?.trim() || "",
        country_code: form.country_code.trim().toUpperCase(),
        base_currency: form.base_currency.trim().toUpperCase(),
        default_settlement_currency:
          form.default_settlement_currency?.trim().toUpperCase() ||
          form.base_currency.trim().toUpperCase(),
        description: form.description?.trim() || "",
      });

      setForm(initialState);
    } catch (err) {
      setCreateError(
        err instanceof Error ? err.message : "Unable to create merchant.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="space-y-6">
      <section className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.78),rgba(8,12,28,0.96))] shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <div className="flex flex-col gap-6 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
              <Building2 className="h-4 w-4" />
              Merchant app
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
              Merchant workspace overview
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Pick an active merchant and continue into profile, payouts, payment methods, and team management using your existing dashboard structure.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <QuickLink
              href={env.routes.merchantSettingsProfile}
              label="Profile"
              icon={<Settings2 className="h-4 w-4" />}
              disabled={!activeMerchant}
            />
            <QuickLink
              href={env.routes.merchantSettingsPayouts}
              label="Payouts"
              icon={<CreditCard className="h-4 w-4" />}
              disabled={!activeMerchant}
            />
            <QuickLink
              href={env.routes.merchantSettingsPaymentMethods}
              label="Payment Methods"
              icon={<BadgeCheck className="h-4 w-4" />}
              disabled={!activeMerchant}
            />
            <QuickLink
              href={env.routes.merchantTeam}
              label="Team"
              icon={<Users className="h-4 w-4" />}
              disabled={!activeMerchant}
            />
          </div>
        </div>
      </section>

      {error ? (
        <div className="rounded-[20px] border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-100">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
        <section className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.78),rgba(8,12,28,0.96))] shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
          <div className="border-b border-white/10 px-6 py-6 sm:px-8">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
              Accessible merchants
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              The backend returns every merchant the current user can access.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[180px] animate-pulse rounded-[24px] border border-white/10 bg-white/[0.03]"
                  />
                ))}
              </div>
            ) : merchants.length === 0 ? (
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  No merchants yet
                </h3>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-300">
                  Create your first merchant below. Your backend will seed owner membership, KYC, payout settings, and default provider records automatically.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {merchants.map((merchant) => {
                  const isActive = merchant.id === activeMerchantId;

                  return (
                    <article
                      key={merchant.id}
                      className={`rounded-[24px] border p-5 shadow-[0_18px_50px_rgba(0,0,0,0.2)] ${
                        isActive
                          ? "border-indigo-500/30 bg-[linear-gradient(180deg,rgba(28,24,78,0.9),rgba(12,16,36,0.96))]"
                          : "border-white/10 bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                            {merchant.country_code} · {merchant.base_currency}
                          </div>
                          <h3 className="mt-2 text-xl font-semibold text-white">
                            {merchant.public_display_name}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            {merchant.legal_business_name}
                          </p>
                        </div>

                        <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
                          {merchant.status.replaceAll("_", " ")}
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <InfoCard
                          label="Onboarding"
                          value={merchant.onboarding_status}
                        />
                        <InfoCard
                          label="Enabled providers"
                          value={
                            merchant.enabled_providers.length
                              ? merchant.enabled_providers.join(", ")
                              : "None"
                          }
                        />
                      </div>

                      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={() => setActiveMerchantId(merchant.id)}
                          className={`inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition ${
                            isActive
                              ? "bg-white text-[#101938]"
                              : "border border-white/14 bg-white/[0.03] text-white hover:bg-white/[0.06]"
                          }`}
                        >
                          {isActive ? "Active merchant" : "Set as active"}
                        </button>

                        {isActive ? (
                          <Link
                            href={env.routes.merchantSettingsProfile}
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/14 bg-white/[0.03] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
                          >
                            Continue
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.78),rgba(8,12,28,0.96))] shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
          <div className="border-b border-white/10 px-6 py-6 sm:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-300">
              <Plus className="h-3.5 w-3.5" />
              Create merchant
            </div>

            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
              Create a merchant profile
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-300">
              This uses the backend merchant create contract directly.
            </p>
          </div>

          <form className="space-y-5 p-6 sm:p-8" onSubmit={handleCreateMerchant}>
            {createError ? (
              <div className="rounded-[18px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {createError}
              </div>
            ) : null}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Legal business name
                </label>
                <input
                  value={form.legal_business_name}
                  onChange={(event) =>
                    updateField("legal_business_name", event.target.value)
                  }
                  placeholder="Zuri & Co. Limited"
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-400/50 focus:bg-white/[0.06]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Public display name
                </label>
                <input
                  value={form.public_display_name}
                  onChange={(event) =>
                    updateField("public_display_name", event.target.value)
                  }
                  placeholder="Zuri & Co."
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-400/50 focus:bg-white/[0.06]"
                  required
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Business type
                </label>
                <select
                  value={form.business_type}
                  onChange={(event) =>
                    updateField(
                      "business_type",
                      event.target.value as MerchantCreatePayload["business_type"],
                    )
                  }
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none focus:border-indigo-400/50 focus:bg-white/[0.06]"
                >
                  <option value="individual" className="bg-[#0b1224] text-slate-300">
                    Individual
                  </option>
                  <option
                    value="registered_business"
                    className="bg-[#0b1224] text-slate-300"
                  >
                    Registered Business
                  </option>
                  <option value="non_profit" className="bg-[#0b1224] text-slate-300">
                    Non Profit
                  </option>
                  <option value="other" className="bg-[#0b1224] text-slate-300">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Country code
                </label>
                <input
                  value={form.country_code}
                  onChange={(event) =>
                    updateField("country_code", event.target.value)
                  }
                  placeholder="NG"
                  maxLength={2}
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 uppercase text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-400/50 focus:bg-white/[0.06]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Base currency
                </label>
                <input
                  value={form.base_currency}
                  onChange={(event) =>
                    updateField("base_currency", event.target.value)
                  }
                  placeholder="NGN"
                  maxLength={3}
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 uppercase text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-400/50 focus:bg-white/[0.06]"
                  required
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Support email
                </label>
                <input
                  type="email"
                  value={form.support_email}
                  onChange={(event) =>
                    updateField("support_email", event.target.value)
                  }
                  placeholder="support@business.com"
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-400/50 focus:bg-white/[0.06]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Support phone
                </label>
                <input
                  value={form.support_phone_number}
                  onChange={(event) =>
                    updateField("support_phone_number", event.target.value)
                  }
                  placeholder="+234 800 000 0000"
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-400/50 focus:bg-white/[0.06]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Description
              </label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Describe the merchant business."
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-400/50 focus:bg-white/[0.06]"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                <input
                  type="checkbox"
                  checked={Boolean(form.allows_direct_local_payments)}
                  onChange={(event) =>
                    updateField(
                      "allows_direct_local_payments",
                      event.target.checked,
                    )
                  }
                  className="mt-1 h-4 w-4"
                />
                <div>
                  <div className="text-sm font-semibold text-white">
                    Allow direct local payments
                  </div>
                  <p className="mt-1 text-xs leading-6 text-slate-400">
                    Starts enabled by default.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                <input
                  type="checkbox"
                  checked={Boolean(form.allows_platform_managed_payments)}
                  onChange={(event) =>
                    updateField(
                      "allows_platform_managed_payments",
                      event.target.checked,
                    )
                  }
                  className="mt-1 h-4 w-4"
                />
                <div>
                  <div className="text-sm font-semibold text-white">
                    Allow platform managed payments
                  </div>
                  <p className="mt-1 text-xs leading-6 text-slate-400">
                    Starts disabled unless you enable it.
                  </p>
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !canCreate}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#5b3df5_0%,#3b82f6_100%)] px-6 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(79,70,229,0.34)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(79,70,229,0.42)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Creating..." : "Create merchant"}
              {!isSubmitting ? <ArrowRight className="h-4 w-4" /> : null}
            </button>
          </form>
        </section>
      </div>

      {activeMerchant ? (
        <section className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-5">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Active merchant
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            {activeMerchant.public_display_name}
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            {activeMerchant.legal_business_name}
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <InfoCard
              label="Status"
              value={activeMerchant.status.replaceAll("_", " ")}
            />
            <InfoCard
              label="Onboarding"
              value={activeMerchant.onboarding_status.replaceAll("_", " ")}
            />
            <InfoCard
              label="KYC"
              value={(activeMerchant.kyc_status || "unsubmitted").replaceAll(
                "_",
                " ",
              )}
            />
            <InfoCard
              label="Payouts"
              value={(activeMerchant.payout_status || "unconfigured").replaceAll(
                "_",
                " ",
              )}
            />
          </div>
        </section>
      ) : null}
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-4">
      <div className="text-xs uppercase tracking-[0.14em] text-slate-400">
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold capitalize text-white">
        {value}
      </div>
    </div>
  );
}

function QuickLink({
  href,
  label,
  icon,
  disabled,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
}) {
  if (disabled) {
    return (
      <div className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 text-sm font-semibold text-slate-500">
        {icon}
        {label}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/14 bg-white/[0.03] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
    >
      {icon}
      {label}
    </Link>
  );
}