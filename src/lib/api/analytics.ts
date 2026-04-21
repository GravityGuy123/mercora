import { apiClient, extractApiErrorMessage } from "@/lib/api/axios";
import { env } from "@/lib/config/env";
import type {
  ApiEnvelope,
  MerchantDashboardSummary,
  MerchantOperationsSummary,
  MerchantSalesTimeseries,
  MerchantTopProducts,
} from "@/types/analytics";

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

export const analyticsApi = {
  async dashboardSummary(merchantId: string, days = 30) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<MerchantDashboardSummary> | MerchantDashboardSummary
      >(`/api/analytics/merchants/${merchantId}/dashboard/`, {
        params: { days },
      });

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load dashboard summary."),
      );
    }
  },

  async salesTimeseries(merchantId: string, days = 30) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<MerchantSalesTimeseries> | MerchantSalesTimeseries
      >(`/api/analytics/merchants/${merchantId}/sales-timeseries/`, {
        params: { days },
      });

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load sales timeseries."),
      );
    }
  },

  async topProducts(merchantId: string, days = 30, limit = 10) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<MerchantTopProducts> | MerchantTopProducts
      >(`/api/analytics/merchants/${merchantId}/top-products/`, {
        params: { days, limit },
      });

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load top products."),
      );
    }
  },

  async operationsSummary(merchantId: string, days = 30) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<MerchantOperationsSummary> | MerchantOperationsSummary
      >(`/api/analytics/merchants/${merchantId}/operations/`, {
        params: { days },
      });

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load operations summary."),
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

export function formatDate(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}