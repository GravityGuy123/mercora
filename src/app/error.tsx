"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Home,
  LifeBuoy,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(147,51,234,0.12),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(217,70,239,0.12),transparent_22%),radial-gradient(circle_at_15%_85%,rgba(99,102,241,0.12),transparent_24%)]" />
        <div className="absolute left-[-5rem] top-24 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/15" />
        <div className="absolute right-[-4rem] bottom-[-3rem] h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/15" />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/80">
              <Sparkles className="h-4 w-4 text-fuchsia-500 dark:text-fuchsia-300" />
              Something went wrong
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-purple-600 dark:text-purple-300">
              Unexpected error
            </p>

            <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              We hit an issue loading
              <span className="block bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
                this page right now.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70">
              This is usually temporary. Try the page again, return to a stable
              section of the site, or contact us if the issue continues.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                onClick={reset}
                className="group rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 px-6 py-6 text-white shadow-lg shadow-purple-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/60"
              >
                Try Again
                <RefreshCw className="ml-2 h-4 w-4 transition-transform group-hover:rotate-90" />
              </Button>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-2xl border border-purple-200/50 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                Home
                <Home className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-purple-200/50 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                Contact Support
                <LifeBuoy className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-purple-200/50 bg-white/80 p-6 shadow-[0_20px_80px_-30px_rgba(168,85,247,0.35)] backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_20px_80px_-30px_rgba(168,85,247,0.25)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,70,239,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.14),transparent_28%)]" />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500 dark:text-white/50">
                      Status overview
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">
                      Recovery actions
                    </h2>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      title: "Retry the current view",
                      text: "Use the Try Again action first. Many route-level issues are temporary.",
                    },
                    {
                      title: "Return to a stable page",
                      text: "Go back to Home, Services, Portfolio, or Contact to continue browsing.",
                    },
                    {
                      title: "Escalate if needed",
                      text: "If the problem repeats, reach out through the contact page with what you clicked.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-purple-200/50 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-950/40"
                    >
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-white/65">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>

                {error.digest ? (
                  <div className="mt-6 rounded-2xl border border-dashed border-purple-300/70 bg-gradient-to-r from-purple-50 to-fuchsia-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                    <p className="text-xs font-medium text-slate-500 dark:text-gray/50">
                      Error reference
                    </p>
                    <p className="mt-1 break-all text-sm font-semibold text-slate-800 dark:text-black">
                      {error.digest}
                    </p>
                  </div>
                ) : null}

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center justify-between rounded-2xl border border-purple-200/50 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  >
                    <span>Portfolio</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/services"
                    className="inline-flex items-center justify-between rounded-2xl border border-purple-200/50 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  >
                    <span>Services</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}