"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AlertOctagon,
  Home,
  LifeBuoy,
  RefreshCw,
  Sparkles,
} from "lucide-react";

type GlobalErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalErrorPage({
  error,
  reset,
}: GlobalErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(147,51,234,0.16),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(217,70,239,0.14),transparent_22%),radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.14),transparent_24%)]" />
            <div className="absolute -left-16 top-16 h-72 w-72 rounded-full bg-purple-500/15 blur-3xl" />
            <div className="absolute right-[-4rem] top-10 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
            <div className="absolute bottom-[-5rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl" />
          </div>

          <section className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_25px_100px_-40px_rgba(168,85,247,0.4)] backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,70,239,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.12),transparent_30%)]" />

              <div className="relative p-6 sm:p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80">
                  <Sparkles className="h-4 w-4 text-fuchsia-300" />
                  Critical application error
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-purple-300">
                      Global error
                    </p>

                    <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                      Something went seriously wrong
                      <span className="block bg-gradient-to-r from-purple-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
                        and the app could not recover.
                      </span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
                      This affects the application shell itself, so the safest next
                      steps are to retry, return to the homepage, or contact us if
                      the issue continues.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <button
                        type="button"
                        onClick={reset}
                        className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/60"
                      >
                        Try Again
                        <RefreshCw className="ml-2 h-4 w-4" />
                      </button>

                      <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                      >
                        Back to Home
                        <Home className="ml-2 h-4 w-4" />
                      </Link>

                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                      >
                        Contact Us
                        <LifeBuoy className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-white/50">
                          System status
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-white">
                          Immediate guidance
                        </h2>
                      </div>

                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20">
                        <AlertOctagon className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      {[
                        "Retry first in case the issue was temporary.",
                        "Return to the homepage to restart navigation cleanly.",
                        "Contact support if the same failure happens again.",
                      ].map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-white/10 bg-white/5 p-4"
                        >
                          <p className="text-sm leading-relaxed text-white/75">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>

                    {error.digest ? (
                      <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-white/5 p-4">
                        <p className="text-xs font-medium text-white/50">
                          Error reference
                        </p>
                        <p className="mt-1 break-all text-sm font-semibold text-white/80">
                          {error.digest}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}