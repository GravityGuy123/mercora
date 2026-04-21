import { apiClient, extractApiErrorMessage } from "@/lib/api/axios";
import type {
  ApiEnvelope,
  PaginatedResponse,
  PlatformActionLog,
  PlatformDashboardSummary,
  PlatformDispute,
  PlatformMerchant,
  PlatformMerchantModerationCase,
  PlatformPayoutBatch,
  PlatformSupportTicket,
} from "@/types/platform-admin";

function unwrap<T>(payload: ApiEnvelope<T> | T): T {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in (payload as Record<string, unknown>)
  ) {
    return (payload as ApiEnvelope<T>).data as T;
  }

  return payload as T;
}

function normalizePaginated<T>(payload: PaginatedResponse<T> | T[]) {
  if (Array.isArray(payload)) {
    return {
      count: payload.length,
      results: payload,
    };
  }

  return {
    count: payload.count || 0,
    results: payload.results || [],
  };
}

export const platformAdminApi = {
  async dashboard(days = 30) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<PlatformDashboardSummary> | PlatformDashboardSummary
      >("/api/platform-admin/dashboard/", {
        params: { days },
      });

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform dashboard."),
      );
    }
  },

  async listMerchants(params?: { search?: string; country_code?: string }) {
    try {
      const { data } = await apiClient.get<PaginatedResponse<PlatformMerchant>>(
        "/api/platform-admin/merchants/",
        {
          params: {
            search: params?.search || undefined,
            country_code: params?.country_code || undefined,
          },
        },
      );

      return normalizePaginated(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform merchants."),
      );
    }
  },

  async merchantDetail(merchantId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<PlatformMerchant> | PlatformMerchant
      >(`/api/platform-admin/merchants/${merchantId}/`);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform merchant detail."),
      );
    }
  },

  async moderateMerchant(
    merchantId: string,
    payload: {
      title: string;
      reason?: string;
      internal_notes?: string;
      decision: string;
      status?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    try {
      const { data } = await apiClient.post<
        ApiEnvelope<PlatformMerchantModerationCase> | PlatformMerchantModerationCase
      >(`/api/platform-admin/merchants/${merchantId}/moderation/`, payload);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to apply merchant moderation."),
      );
    }
  },

  async listPayoutBatches(params?: {
    days?: number;
    status?: string;
    merchant_id?: string;
    search?: string;
  }) {
    try {
      const { data } = await apiClient.get<PaginatedResponse<PlatformPayoutBatch>>(
        "/api/platform-admin/payout-batches/",
        {
          params: {
            days: params?.days ?? 30,
            status: params?.status || undefined,
            merchant_id: params?.merchant_id || undefined,
            search: params?.search || undefined,
          },
        },
      );

      return normalizePaginated(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform payout batches."),
      );
    }
  },

  async payoutBatchDetail(payoutBatchId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<PlatformPayoutBatch> | PlatformPayoutBatch
      >(`/api/platform-admin/payout-batches/${payoutBatchId}/`);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load payout batch detail."),
      );
    }
  },

  async updatePayoutBatch(
    payoutBatchId: string,
    payload: {
      status: string;
      notes?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    try {
      const { data } = await apiClient.patch<
        ApiEnvelope<PlatformPayoutBatch> | PlatformPayoutBatch
      >(`/api/platform-admin/payout-batches/${payoutBatchId}/`, payload);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to update payout batch."),
      );
    }
  },

  async listDisputes(params?: {
    days?: number;
    status?: string;
    provider?: string;
    search?: string;
  }) {
    try {
      const { data } = await apiClient.get<PaginatedResponse<PlatformDispute>>(
        "/api/platform-admin/disputes/",
        {
          params: {
            days: params?.days ?? 30,
            status: params?.status || undefined,
            provider: params?.provider || undefined,
            search: params?.search || undefined,
          },
        },
      );

      return normalizePaginated(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform disputes."),
      );
    }
  },

  async disputeDetail(disputeId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<PlatformDispute> | PlatformDispute
      >(`/api/platform-admin/disputes/${disputeId}/`);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load dispute detail."),
      );
    }
  },

  async listSupportTickets(params?: {
    days?: number;
    status?: string;
    priority?: string;
    category?: string;
    search?: string;
  }) {
    try {
      const { data } = await apiClient.get<PaginatedResponse<PlatformSupportTicket>>(
        "/api/platform-admin/support/tickets/",
        {
          params: {
            days: params?.days ?? 30,
            status: params?.status || undefined,
            priority: params?.priority || undefined,
            category: params?.category || undefined,
            search: params?.search || undefined,
          },
        },
      );

      return normalizePaginated(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform support tickets."),
      );
    }
  },

  async supportTicketDetail(ticketId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<PlatformSupportTicket> | PlatformSupportTicket
      >(`/api/platform-admin/support/tickets/${ticketId}/`);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load support ticket detail."),
      );
    }
  },

  async listActionLogs(params?: {
    days?: number;
    action_type?: string;
    search?: string;
  }) {
    try {
      const { data } = await apiClient.get<PaginatedResponse<PlatformActionLog>>(
        "/api/platform-admin/action-logs/",
        {
          params: {
            days: params?.days ?? 30,
            action_type: params?.action_type || undefined,
            search: params?.search || undefined,
          },
        },
      );

      return normalizePaginated(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load action logs."),
      );
    }
  },
};

export function formatMoney(amount?: string | null, currency = "NGN") {
  if (!amount) return "—";

  const numeric = Number(amount);
  if (!Number.isFinite(numeric)) return `${currency} ${amount}`;

  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(numeric);
  } catch {
    return `${currency} ${numeric.toFixed(2)}`;
  }
}

export function formatDate(value?: string | null) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}