import Link from "next/link";
import { ArrowLeft, ArrowRight, FileSearch, Home, Mail, Sparkles, } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(147,51,234,0.14),transparent_28%),radial-gradient(circle_at_80%_25%,rgba(217,70,239,0.12),transparent_22%),radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.12),transparent_24%)]" />
        <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/15" />
        <div className="absolute right-[-4rem] top-10 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl dark:bg-fuchsia-500/15" />
        <div className="absolute bottom-[-6rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/15" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(15,23,42,0.02),transparent)] dark:bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.02),transparent)]" />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white/80">
              <Sparkles className="h-4 w-4 text-fuchsia-500 dark:text-fuchsia-300" />
              Page not found
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-purple-600 dark:text-purple-300">
              Error 404
            </p>

            <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
              This page doesn’t exist
              <span className="block bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
                or may have moved.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70">
              The link may be outdated, the page may have been removed, or the URL
              might be incorrect. You can return home, explore our work, or contact
              us if you were trying to reach a specific service or project.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                className="group rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 px-6 py-6 text-white shadow-lg shadow-purple-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300/60"
              >
                <Link href="/">
                  Back to Home
                  <Home className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>

              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-2xl border border-purple-200/50 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                View Portfolio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-purple-200/50 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                Contact Us
                <Mail className="ml-2 h-4 w-4" />
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
                      Recovery options
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">
                      Helpful next steps
                    </h2>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/20">
                    <FileSearch className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      title: "Check the URL",
                      text: "Look for spelling issues or extra characters in the address.",
                    },
                    {
                      title: "Browse key pages",
                      text: "Visit our Home, Services, Portfolio, or Contact page to continue.",
                    },
                    {
                      title: "Need something specific?",
                      text: "Contact us and we’ll point you to the right service or project page quickly.",
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

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-between rounded-2xl border border-purple-200/50 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  >
                    <span>See Services</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/blog"
                    className="inline-flex items-center justify-between rounded-2xl border border-purple-200/50 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                  >
                    <span>Read the Blog</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-6 rounded-2xl border border-dashed border-purple-300/70 bg-gradient-to-r from-purple-50 via-fuchsia-50 to-indigo-50 px-4 py-3 shadow-sm dark:border-purple-400/20 dark:bg-gradient-to-r dark:from-purple-500/10 dark:via-white/5 dark:to-indigo-500/10">
                  <p className="text-xs font-medium text-slate-600 dark:text-white/60">
                    Looking for a project detail page?
                  </p>
                  <Link
                    href="/portfolio"
                    className="mt-1 inline-flex items-center text-sm font-semibold text-purple-700 transition hover:text-purple-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 dark:text-purple-300 dark:hover:text-fuchsia-200"
                  >
                    Return to the portfolio
                    <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
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