import { apiClient, extractApiErrorMessage } from "@/lib/api/axios";
import type {
  ApiEnvelope,
  PaginatedResponse,
  PlatformActionLog,
  PlatformAnalyticsPayload,
  PlatformConfigurationSummary,
  PlatformDashboardSummary,
  PlatformDispute,
  PlatformMerchant,
  PlatformMerchantModerationCase,
  PlatformNotification,
  PlatformNotificationsListPayload,
  PlatformOrder,
  PlatformPayment,
  PlatformPayoutBatch,
  PlatformProviderRoutingListPayload,
  PlatformProviderRoutingSetting,
  PlatformReceipt,
  PlatformSettlementRecord,
  PlatformStorefront,
  PlatformSubscription,
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

  async analytics(days = 30, limit = 30) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<PlatformAnalyticsPayload> | PlatformAnalyticsPayload
      >("/api/platform-admin/analytics/", {
        params: { days, limit },
      });

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform analytics."),
      );
    }
  },

  async configuration() {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<PlatformConfigurationSummary> | PlatformConfigurationSummary
      >("/api/platform-admin/configuration/");

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform configuration."),
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

  async listStorefronts(params?: {
    days?: number;
    merchant_id?: string;
    status?: string;
    visibility?: string;
    domain_status?: string;
    search?: string;
  }) {
    try {
      const { data } = await apiClient.get<PaginatedResponse<PlatformStorefront>>(
        "/api/platform-admin/stores/",
        {
          params: {
            days: params?.days || undefined,
            merchant_id: params?.merchant_id || undefined,
            status: params?.status || undefined,
            visibility: params?.visibility || undefined,
            domain_status: params?.domain_status || undefined,
            search: params?.search || undefined,
          },
        },
      );

      return normalizePaginated(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform stores."),
      );
    }
  },

  async storefrontDetail(storeId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<PlatformStorefront> | PlatformStorefront
      >(`/api/platform-admin/stores/${storeId}/`);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform store detail."),
      );
    }
  },

  async listOrders(params?: {
    days?: number;
    merchant_id?: string;
    status?: string;
    payment_state?: string;
    fulfillment_status?: string;
    search?: string;
  }) {
    try {
      const { data } = await apiClient.get<PaginatedResponse<PlatformOrder>>(
        "/api/platform-admin/orders/",
        {
          params: {
            days: params?.days || undefined,
            merchant_id: params?.merchant_id || undefined,
            status: params?.status || undefined,
            payment_state: params?.payment_state || undefined,
            fulfillment_status: params?.fulfillment_status || undefined,
            search: params?.search || undefined,
          },
        },
      );

      return normalizePaginated(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform orders."),
      );
    }
  },

  async orderDetail(orderId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<PlatformOrder> | PlatformOrder
      >(`/api/platform-admin/orders/${orderId}/`);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform order detail."),
      );
    }
  },

  async listPayments(params?: {
    days?: number;
    merchant_id?: string;
    status?: string;
    provider?: string;
    verification_status?: string;
    search?: string;
  }) {
    try {
      const { data } = await apiClient.get<PaginatedResponse<PlatformPayment>>(
        "/api/platform-admin/payments/",
        {
          params: {
            days: params?.days || undefined,
            merchant_id: params?.merchant_id || undefined,
            status: params?.status || undefined,
            provider: params?.provider || undefined,
            verification_status: params?.verification_status || undefined,
            search: params?.search || undefined,
          },
        },
      );

      return normalizePaginated(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform payments."),
      );
    }
  },

  async paymentDetail(paymentId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<PlatformPayment> | PlatformPayment
      >(`/api/platform-admin/payments/${paymentId}/`);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform payment detail."),
      );
    }
  },

  async listReceipts(params?: {
    days?: number;
    merchant_id?: string;
    status?: string;
    provider?: string;
    search?: string;
  }) {
    try {
      const { data } = await apiClient.get<PaginatedResponse<PlatformReceipt>>(
        "/api/platform-admin/receipts/",
        {
          params: {
            days: params?.days || undefined,
            merchant_id: params?.merchant_id || undefined,
            status: params?.status || undefined,
            provider: params?.provider || undefined,
            search: params?.search || undefined,
          },
        },
      );

      return normalizePaginated(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform receipts."),
      );
    }
  },

  async receiptDetail(receiptNumber: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<PlatformReceipt> | PlatformReceipt
      >(`/api/platform-admin/receipts/${receiptNumber}/`);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform receipt detail."),
      );
    }
  },

  async listSettlements(params?: {
    days?: number;
    merchant_id?: string;
    status?: string;
    provider?: string;
    search?: string;
  }) {
    try {
      const { data } = await apiClient.get<
        PaginatedResponse<PlatformSettlementRecord>
      >("/api/platform-admin/settlements/", {
        params: {
          days: params?.days || undefined,
          merchant_id: params?.merchant_id || undefined,
          status: params?.status || undefined,
          provider: params?.provider || undefined,
          search: params?.search || undefined,
        },
      });

      return normalizePaginated(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform settlements."),
      );
    }
  },

  async settlementDetail(settlementId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<PlatformSettlementRecord> | PlatformSettlementRecord
      >(`/api/platform-admin/settlements/${settlementId}/`);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform settlement detail."),
      );
    }
  },

  async listSubscriptions(params?: {
    days?: number;
    merchant_id?: string;
    status?: string;
    is_current?: boolean;
    search?: string;
  }) {
    try {
      const { data } = await apiClient.get<PaginatedResponse<PlatformSubscription>>(
        "/api/platform-admin/subscriptions/",
        {
          params: {
            days: params?.days || undefined,
            merchant_id: params?.merchant_id || undefined,
            status: params?.status || undefined,
            is_current:
              typeof params?.is_current === "boolean"
                ? String(params.is_current)
                : undefined,
            search: params?.search || undefined,
          },
        },
      );

      return normalizePaginated(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform subscriptions."),
      );
    }
  },

  async subscriptionDetail(subscriptionId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<PlatformSubscription> | PlatformSubscription
      >(`/api/platform-admin/subscriptions/${subscriptionId}/`);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform subscription detail."),
      );
    }
  },

  async listNotifications(params?: {
    days?: number;
    merchant_id?: string;
    category?: string;
    severity?: string;
    unread?: boolean;
    archived?: boolean;
    search?: string;
  }): Promise<PlatformNotificationsListPayload> {
    try {
      const { data } = await apiClient.get<
        PaginatedResponse<PlatformNotification> & {
          summary?: PlatformNotificationsListPayload["summary"];
        }
      >("/api/platform-admin/notifications/", {
        params: {
          days: params?.days || undefined,
          merchant_id: params?.merchant_id || undefined,
          category: params?.category || undefined,
          severity: params?.severity || undefined,
          unread:
            typeof params?.unread === "boolean" ? String(params.unread) : undefined,
          archived:
            typeof params?.archived === "boolean"
              ? String(params.archived)
              : undefined,
          search: params?.search || undefined,
        },
      });

      const normalized = normalizePaginated(data);
      return {
        count: normalized.count,
        results: normalized.results,
        summary: data.summary || null,
      };
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load platform notifications."),
      );
    }
  },

  async listProviderRouting(params?: {
    days?: number;
    merchant_id?: string;
    provider?: string;
    is_enabled?: boolean;
    is_visible_at_checkout?: boolean;
    is_eligible?: boolean;
    search?: string;
  }): Promise<PlatformProviderRoutingListPayload> {
    try {
      const { data } = await apiClient.get<
        PaginatedResponse<PlatformProviderRoutingSetting> & {
          summary?: PlatformProviderRoutingListPayload["summary"];
        }
      >("/api/platform-admin/provider-routing/", {
        params: {
          days: params?.days || undefined,
          merchant_id: params?.merchant_id || undefined,
          provider: params?.provider || undefined,
          is_enabled:
            typeof params?.is_enabled === "boolean"
              ? String(params.is_enabled)
              : undefined,
          is_visible_at_checkout:
            typeof params?.is_visible_at_checkout === "boolean"
              ? String(params.is_visible_at_checkout)
              : undefined,
          is_eligible:
            typeof params?.is_eligible === "boolean"
              ? String(params.is_eligible)
              : undefined,
          search: params?.search || undefined,
        },
      });

      const normalized = normalizePaginated(data);
      return {
        count: normalized.count,
        results: normalized.results,
        summary: data.summary || [],
      };
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load provider routing settings."),
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