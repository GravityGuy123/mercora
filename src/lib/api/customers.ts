import { apiClient, extractApiErrorMessage } from "@/lib/api/axios";
import { env } from "@/lib/config/env";
import type {
  ApiEnvelope,
  Customer,
  CustomerAddress,
  CustomerListResponse,
  CustomerQuery,
} from "@/types/customer";

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

function normalizeCustomerList(
  payload: ApiEnvelope<CustomerListResponse | Customer[]> | CustomerListResponse | Customer[],
): { count: number; results: Customer[] } {
  const resolved = unwrap(payload);

  if (Array.isArray(resolved)) {
    return {
      count: resolved.length,
      results: resolved,
    };
  }

  if (resolved && typeof resolved === "object") {
    if (Array.isArray(resolved.results)) {
      return {
        count: typeof resolved.count === "number" ? resolved.count : resolved.results.length,
        results: resolved.results,
      };
    }

    if (Array.isArray(resolved.data)) {
      return {
        count: resolved.data.length,
        results: resolved.data,
      };
    }
  }

  return {
    count: 0,
    results: [],
  };
}

export const customersApi = {
  async list(merchantId: string, query: CustomerQuery = {}) {
    try {
      const params: Record<string, string | boolean> = {};

      if (query.q?.trim()) params.q = query.q.trim();
      if (query.status?.trim()) params.status = query.status.trim();
      if (query.source?.trim()) params.source = query.source.trim();
      if (typeof query.is_guest === "boolean") params.is_guest = query.is_guest;

      const { data } = await apiClient.get<
        ApiEnvelope<CustomerListResponse | Customer[]> | CustomerListResponse | Customer[]
      >(env.api.customers.list(merchantId), { params });

      return normalizeCustomerList(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load customers."),
      );
    }
  },

  async detail(merchantId: string, customerId: string) {
    try {
      const { data } = await apiClient.get<ApiEnvelope<Customer> | Customer>(
        env.api.customers.detail(merchantId, customerId),
      );

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load customer details."),
      );
    }
  },

  async addresses(merchantId: string, customerId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<CustomerAddress[]> | CustomerAddress[]
      >(env.api.customers.addresses(merchantId, customerId));

      const resolved = unwrap(data);
      return Array.isArray(resolved) ? resolved : [];
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load customer addresses."),
      );
    }
  },
};