"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, LifeBuoy } from "lucide-react";
import { formatDate, platformAdminApi } from "@/lib/api/platform-admin";
import {
  PlatformEmptyPanel,
  PlatformErrorBanner,
  PlatformLoadingPanel,
  PlatformMetricRow,
  PlatformSectionCard,
  PlatformTag,
} from "@/components/platform/PlatformPrimitives";
import type {
  PlatformSupportMessage,
  PlatformSupportMessageAuthorCustomer,
  PlatformSupportMessageAuthorUser,
  PlatformSupportTicket,
} from "@/types/platform-admin";

function safeText(value?: string | null) {
  return value && value.trim() ? value : "—";
}

function formatUser(user?: PlatformSupportMessageAuthorUser | null) {
  if (!user) return "—";

  const fullName =
    [user.first_name, user.last_name].filter(Boolean).join(" ").trim() ||
    user.display_name ||
    user.email;

  return fullName || "—";
}

function formatCustomer(customer?: PlatformSupportMessageAuthorCustomer | null) {
  if (!customer) return "—";

  const fullName =
    [customer.first_name, customer.last_name].filter(Boolean).join(" ").trim() ||
    customer.full_name ||
    customer.email;

  return fullName || "—";
}

function formatMessageAuthor(message: PlatformSupportMessage) {
  if (message.author_user) return formatUser(message.author_user);
  if (message.author_customer) return formatCustomer(message.author_customer);
  if (message.author_name) return message.author_name;
  if (message.author_email) return message.author_email;
  return "—";
}

export default function PlatformSupportTicketDetailPageClient() {
  const params = useParams<{ ticketId: string }>();
  const ticketId = params.ticketId;

  const [ticket, setTicket] = useState<PlatformSupportTicket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      setError("");
      setIsLoading(true);

      try {
        const data = await platformAdminApi.supportTicketDetail(ticketId);
        setTicket(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load support ticket detail.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [ticketId]);

  if (isLoading) {
    return <PlatformLoadingPanel text="Loading support ticket detail..." />;
  }

  if (!ticket) {
    return <PlatformEmptyPanel text="Support ticket not found." />;
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
          <PlatformTag>{safeText(ticket.ticket_number)}</PlatformTag>
          <PlatformTag>{safeText(ticket.category)}</PlatformTag>
          <PlatformTag>{safeText(ticket.priority)}</PlatformTag>
          <PlatformTag>{safeText(ticket.status)}</PlatformTag>
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
          {safeText(ticket.subject)}
        </h1>
      </section>

      {error ? <PlatformErrorBanner text={error} /> : null}

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <PlatformSectionCard title="Ticket overview">
          <div className="space-y-3">
            <PlatformMetricRow label="Status" value={safeText(ticket.status)} />
            <PlatformMetricRow label="Priority" value={safeText(ticket.priority)} />
            <PlatformMetricRow label="Category" value={safeText(ticket.category)} />
            <PlatformMetricRow label="Source" value={safeText(ticket.source)} />
            <PlatformMetricRow label="Merchant ID" value={safeText(ticket.merchant)} />
            <PlatformMetricRow label="Customer" value={formatCustomer(ticket.customer)} />
            <PlatformMetricRow label="Assigned to" value={formatUser(ticket.assigned_to)} />
            <PlatformMetricRow label="Created by" value={formatUser(ticket.created_by_user)} />
            <PlatformMetricRow label="Contact name" value={safeText(ticket.contact_name)} />
            <PlatformMetricRow label="Contact email" value={safeText(ticket.contact_email)} />
            <PlatformMetricRow label="Contact phone" value={safeText(ticket.contact_phone)} />
            <PlatformMetricRow
              label="First response"
              value={formatDate(ticket.first_response_at)}
            />
            <PlatformMetricRow
              label="Last activity"
              value={formatDate(ticket.last_activity_at)}
            />
            <PlatformMetricRow
              label="Resolved at"
              value={formatDate(ticket.resolved_at)}
            />
            <PlatformMetricRow label="Closed at" value={formatDate(ticket.closed_at)} />
          </div>
        </PlatformSectionCard>

        <div className="space-y-6">
          <PlatformSectionCard title="Description">
            <p className="text-sm leading-7 text-slate-300">
              {safeText(ticket.description)}
            </p>
          </PlatformSectionCard>

          <PlatformSectionCard title="Linked records">
            <div className="space-y-3">
              <PlatformMetricRow label="Order ID" value={safeText(ticket.order)} />
              <PlatformMetricRow label="Payment ID" value={safeText(ticket.payment)} />
              <PlatformMetricRow
                label="Settlement record ID"
                value={safeText(ticket.settlement_record)}
              />
              <PlatformMetricRow label="Receipt ID" value={safeText(ticket.receipt)} />
              <PlatformMetricRow
                label="Subscription ID"
                value={safeText(ticket.subscription)}
              />
              <PlatformMetricRow label="Created at" value={formatDate(ticket.created_at)} />
              <PlatformMetricRow label="Updated at" value={formatDate(ticket.updated_at)} />
            </div>
          </PlatformSectionCard>

          <PlatformSectionCard title="Messages">
            <div className="space-y-3">
              {(ticket.messages || []).length === 0 ? (
                <div className="text-sm text-slate-400">No messages.</div>
              ) : (
                ticket.messages?.map((message) => (
                  <div
                    key={message.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <PlatformTag>{safeText(message.author_type)}</PlatformTag>
                      {message.is_internal ? <PlatformTag>Internal</PlatformTag> : null}
                    </div>

                    <div className="mt-3 text-sm font-semibold text-white">
                      {formatMessageAuthor(message)}
                    </div>

                    <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                      {safeText(message.body)}
                    </p>

                    <div className="mt-3 text-xs text-slate-500">
                      {formatDate(message.created_at)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </PlatformSectionCard>
        </div>
      </section>
    </main>
  );
}