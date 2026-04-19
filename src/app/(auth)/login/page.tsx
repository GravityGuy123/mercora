"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { env } from "@/lib/config/env";

type LoginFormState = {
  email: string;
  password: string;
};

const initialState: LoginFormState = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();

  const [form, setForm] = useState<LoginFormState>(initialState);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextUrl = useMemo(
    () => searchParams.get("next") || env.routes.home,
    [searchParams],
  );

  const updateField = (field: keyof LoginFormState, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await signIn({
        email: form.email.trim(),
        password: form.password,
      });

      router.replace(nextUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to log in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#040A18] text-white">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-[360px] w-[360px] rounded-full bg-indigo-600/10 blur-3xl" />
          <div className="absolute right-0 top-[120px] h-[320px] w-[320px] rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_32%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-120px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
                <LockKeyhole className="h-4 w-4" />
                Welcome back
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-[1.03] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                Log in to continue managing your commerce operations.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                Access your storefront, payments, receipts, settlements, and merchant tools from one cleaner dashboard.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Manage orders and customers",
                  "Track receipts and settlements",
                  "Access merchant reporting and settings",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
                  >
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-300">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm leading-7 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto w-full max-w-[560px] overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.74),rgba(8,12,28,0.96))] shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
              <div className="border-b border-white/10 px-6 py-5">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                  Log in
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Enter your account details to continue.
                </p>
              </div>

              <form className="space-y-5 p-6 sm:p-7" onSubmit={handleSubmit}>
                {error ? (
                  <div className="rounded-[18px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                    {error}
                  </div>
                ) : null}

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="you@company.com"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/50 focus:bg-white/[0.06]"
                    required
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                      Password
                    </label>
                    <Link
                      href={env.routes.forgotPassword}
                      className="text-sm font-medium text-indigo-300 transition hover:text-indigo-200"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={form.password}
                    onChange={(event) => updateField("password", event.target.value)}
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-400/50 focus:bg-white/[0.06]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#5b3df5_0%,#3b82f6_100%)] px-6 text-sm font-semibold text-white shadow-[0_16px_38px_rgba(79,70,229,0.34)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(79,70,229,0.42)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Logging in..." : "Log In"}
                  {!isSubmitting ? <ArrowRight className="h-4 w-4" /> : null}
                </button>

                <div className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4 text-center">
                  <p className="text-sm text-slate-300">
                    Don&apos;t have an account?{" "}
                    <Link
                      href={env.routes.signUp}
                      className="font-semibold text-white transition hover:text-indigo-200"
                    >
                      Create one
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}