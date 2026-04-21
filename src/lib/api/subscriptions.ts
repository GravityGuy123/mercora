import { apiClient, extractApiErrorMessage } from "@/lib/api/axios";
import type {
  ApiEnvelope,
  MerchantSubscription,
  PaginatedResponse,
  Plan,
  SubscriptionInvoice,
} from "@/types/subscription";

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

export const subscriptionsApi = {
  async publicPlans(params?: { tier?: string; billing_interval?: string }) {
    try {
      const { data } = await apiClient.get<PaginatedResponse<Plan>>(
        "/api/subscriptions/plans/",
        {
          params: {
            tier: params?.tier || undefined,
            billing_interval: params?.billing_interval || undefined,
          },
        },
      );

      return normalizePaginated(data);
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "Unable to load plans."));
    }
  },

  async current(merchantId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<MerchantSubscription | null> | MerchantSubscription | null
      >(`/api/subscriptions/merchants/${merchantId}/subscriptions/current/`);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load current subscription."),
      );
    }
  },

  async list(
    merchantId: string,
    params?: { status?: string; is_current?: boolean; search?: string },
  ) {
    try {
      const { data } = await apiClient.get<PaginatedResponse<MerchantSubscription>>(
        `/api/subscriptions/merchants/${merchantId}/subscriptions/`,
        {
          params: {
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
        extractApiErrorMessage(error, "Unable to load subscriptions."),
      );
    }
  },

  async create(
    merchantId: string,
    payload: {
      plan_id: string;
      source?: string;
      start_trial_if_eligible?: boolean;
      auto_renew?: boolean;
      notes?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    try {
      const { data } = await apiClient.post<
        ApiEnvelope<MerchantSubscription> | MerchantSubscription
      >(`/api/subscriptions/merchants/${merchantId}/subscriptions/`, payload);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to create subscription."),
      );
    }
  },

  async detail(merchantId: string, subscriptionId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<MerchantSubscription> | MerchantSubscription
      >(
        `/api/subscriptions/merchants/${merchantId}/subscriptions/${subscriptionId}/`,
      );

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load subscription detail."),
      );
    }
  },

  async update(
    merchantId: string,
    subscriptionId: string,
    payload: {
      auto_renew?: boolean;
      cancel_at_period_end?: boolean;
      notes?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    try {
      const { data } = await apiClient.patch<
        ApiEnvelope<MerchantSubscription> | MerchantSubscription
      >(
        `/api/subscriptions/merchants/${merchantId}/subscriptions/${subscriptionId}/`,
        payload,
      );

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to update subscription."),
      );
    }
  },

  async cancel(merchantId: string, subscriptionId: string, immediate = false) {
    try {
      const { data } = await apiClient.post<
        ApiEnvelope<MerchantSubscription> | MerchantSubscription
      >(
        `/api/subscriptions/merchants/${merchantId}/subscriptions/${subscriptionId}/cancel/`,
        { immediate },
      );

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to cancel subscription."),
      );
    }
  },

  async reactivate(merchantId: string, subscriptionId: string) {
    try {
      const { data } = await apiClient.post<
        ApiEnvelope<MerchantSubscription> | MerchantSubscription
      >(
        `/api/subscriptions/merchants/${merchantId}/subscriptions/${subscriptionId}/reactivate/`,
      );

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to reactivate subscription."),
      );
    }
  },

  async invoices(
    merchantId: string,
    params?: { status?: string; search?: string },
  ) {
    try {
      const { data } = await apiClient.get<PaginatedResponse<SubscriptionInvoice>>(
        `/api/subscriptions/merchants/${merchantId}/invoices/`,
        {
          params: {
            status: params?.status || undefined,
            search: params?.search || undefined,
          },
        },
      );

      return normalizePaginated(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load invoices."),
      );
    }
  },

  async invoiceDetail(merchantId: string, invoiceId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<SubscriptionInvoice> | SubscriptionInvoice
      >(`/api/subscriptions/merchants/${merchantId}/invoices/${invoiceId}/`);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load invoice detail."),
      );
    }
  },
};

export function formatMoney(amount?: string, currency = "NGN") {
  if (!amount) return "—";
  const numeric = Number(amount);

  if (!Number.isFinite(numeric)) {
    return `${currency} ${amount}`;
  }

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