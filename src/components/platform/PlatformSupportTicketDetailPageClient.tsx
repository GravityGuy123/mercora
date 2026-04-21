"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, LifeBuoy, Loader2 } from "lucide-react";
import { formatDate, platformAdminApi } from "@/lib/api/platform-admin";
import type { PlatformSupportTicket } from "@/types/platform-admin";

export default function PlatformSupportTicketDetailPageClient() {
  const params = useParams<{ ticketId: string }>();
  const ticketId = params.ticketId;

  const [ticket, setTicket] = useState<PlatformSupportTicket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    void load();
  }, [ticketId]);

  async function load() {
    setError("");
    setIsLoading(true);

    try {
      const data = await platformAdminApi.supportTicketDetail(ticketId);
      setTicket(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load support ticket detail.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingPanel text="Loading support ticket detail..." />;
  }

  if (!ticket) {
    return <EmptyPanel text="Support ticket not found." />;
  }

  return (
    <main className="space-y-6">
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.82),rgba(8,12,28,0.96))] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <Link
          href="/platform-admin/support/tickets"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to support tickets
        </Link>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
          <LifeBuoy className="h-4 w-4" />
          Support ticket detail
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Tag>{ticket.ticket_number}</Tag>
          <Tag>{ticket.category}</Tag>
          <Tag>{ticket.priority}</Tag>
          <Tag>{ticket.status}</Tag>
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
          {ticket.subject}
        </h1>
      </section>

      {error ? (
        <div className="rounded-[18px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.72),rgba(8,12,28,0.94))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
          <h2 className="text-xl font-semibold text-white">Ticket overview</h2>

          <div className="mt-5 space-y-3">
            <MetricRow label="Status" value={ticket.status} />
            <MetricRow label="Priority" value={ticket.priority} />
            <MetricRow label="Category" value={ticket.category} />
            <MetricRow label="Source" value={ticket.source} />
            <MetricRow label="Merchant ID" value={ticket.merchant || "—"} />
            <MetricRow label="Customer ID" value={ticket.customer || "—"} />
            <MetricRow label="Assigned to" value={ticket.assigned_to || "—"} />
            <MetricRow label="Created by" value={ticket.created_by_user || "—"} />
            <MetricRow label="First response" value={formatDate(ticket.first_response_at)} />
            <MetricRow label="Last activity" value={formatDate(ticket.last_activity_at)} />
            <MetricRow label="Resolved at" value={formatDate(ticket.resolved_at)} />
            <MetricRow label="Closed at" value={formatDate(ticket.closed_at)} />
          </div>
        </section>

        <section className="space-y-6">
          <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.72),rgba(8,12,28,0.94))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
            <h2 className="text-xl font-semibold text-white">Description</h2>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              {ticket.description || "No description provided."}
            </p>
          </section>

          <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.72),rgba(8,12,28,0.94))] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
            <h2 className="text-xl font-semibold text-white">Linked records</h2>

            <div className="mt-5 space-y-3">
              <MetricRow label="Order ID" value={ticket.order || "—"} />
              <MetricRow label="Payment ID" value={ticket.payment || "—"} />
              <MetricRow label="Settlement record ID" value={ticket.settlement_record || "—"} />
              <MetricRow label="Receipt ID" value={ticket.receipt || "—"} />
              <MetricRow label="Subscription ID" value={ticket.subscription || "—"} />
            </div>
          </section>

          <section className="rounded-[30px] border border-amber-500/20 bg-amber-500/10 p-6">
            <div className="text-sm text-amber-100">
              This detail page reflects the current platform support serializer. Ticket messages are not currently exposed on the platform admin API contract.
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-right break-all text-sm font-semibold text-white">{value}</span>
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

function LoadingPanel({ text }: { text: string }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
      <p className="mt-4 text-sm text-slate-300">{text}</p>
    </div>
  );
}

function EmptyPanel({ text }: { text: string }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-12 text-center text-slate-300">
      {text}
    </div>
  );
}