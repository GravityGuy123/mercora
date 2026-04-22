"use client";

import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

type PlaceholderLink = {
  label: string;
  href: string;
};

type PlatformSurfacePlaceholderProps = {
  badge: string;
  title: string;
  description: string;
  highlights: string[];
  links?: PlaceholderLink[];
  contractTitle?: string;
  contractBody?: string;
};

export default function PlatformSurfacePlaceholder({
  badge,
  title,
  description,
  highlights,
  links = [],
  contractTitle = "Backend contract pending",
  contractBody = "This route is now fully scaffolded in the platform admin frontend, but the dedicated platform API contract for live data and actions has not been exposed yet.",
}: PlatformSurfacePlaceholderProps) {
  return (
    <main className="space-y-6">
      <section className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.82),rgba(8,12,28,0.96))] shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <div className="border-b border-white/10 px-6 py-6 sm:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
            <Lock className="h-4 w-4" />
            {badge}
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
            {title}
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            {description}
          </p>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-4 sm:p-8">
          {highlights.map((item) => (
            <div
              key={item}
              className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4"
            >
              <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
                Planned capability
              </div>
              <div className="mt-2 text-sm font-semibold text-white">{item}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.72),rgba(8,12,28,0.94))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
          <h2 className="text-xl font-semibold text-white">{contractTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">{contractBody}</p>

          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-4 text-sm leading-7 text-amber-100">
            This page is intentionally production-styled and route-complete, but it will remain a control surface until the corresponding platform-admin API endpoints are added.
          </div>
        </section>

        <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.72),rgba(8,12,28,0.94))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
          <h2 className="text-xl font-semibold text-white">Available platform surfaces now</h2>

          <div className="mt-5 space-y-3">
            {links.length === 0 ? (
              <div className="text-sm text-slate-400">No linked surfaces configured.</div>
            ) : (
              links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 transition hover:border-indigo-500/20"
                >
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-white" />
                </Link>
              ))
            )}
          </div>
        </section>
      </section>
    </main>
  );
}