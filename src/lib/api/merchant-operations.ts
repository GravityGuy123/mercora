import { apiClient, extractApiErrorMessage } from "@/lib/api/axios";
import type {
  ApiEnvelope,
  MerchantCart,
  MerchantCheckoutSession,
  MerchantMembership,
  MerchantOrder,
  MerchantPayment,
  MerchantPaymentRefund,
  MerchantPayoutBatch,
  MerchantReceipt,
  MerchantSettlementRecord,
  MerchantSettlementSummary,
  PaginatedResponse,
} from "@/types/merchant-operations";

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

export const merchantOperationsApi = {
  async listCarts(merchantId: string) {
    try {
      const { data } = await apiClient.get<PaginatedResponse<MerchantCart>>(
        `/api/orders/merchants/${merchantId}/carts/`,
      );
      return normalizePaginated(data);
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "Unable to load carts."));
    }
  },

  async listCheckoutSessions(merchantId: string) {
    try {
      const { data } = await apiClient.get<
        PaginatedResponse<MerchantCheckoutSession>
      >(`/api/orders/merchants/${merchantId}/checkout-sessions/`);
      return normalizePaginated(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load checkout sessions."),
      );
    }
  },

  async listOrders(
    merchantId: string,
    params?: {
      search?: string;
      status?: string;
      payment_state?: string;
      fulfillment_status?: string;
    },
  ) {
    try {
      const { data } = await apiClient.get<PaginatedResponse<MerchantOrder>>(
        `/api/orders/merchants/${merchantId}/orders/`,
        {
          params: {
            search: params?.search || undefined,
            status: params?.status || undefined,
            payment_state: params?.payment_state || undefined,
            fulfillment_status: params?.fulfillment_status || undefined,
          },
        },
      );

      return normalizePaginated(data);
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "Unable to load orders."));
    }
  },

  async orderDetail(merchantId: string, orderId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<MerchantOrder> | MerchantOrder
      >(`/api/orders/merchants/${merchantId}/orders/${orderId}/`);
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load order details."),
      );
    }
  },

  async updateOrder(
    merchantId: string,
    orderId: string,
    payload: {
      status?: string;
      payment_state?: string;
      fulfillment_status?: string;
      merchant_note?: string;
      shipping_method_name?: string;
      shipping_tracking_reference?: string;
    },
  ) {
    try {
      const { data } = await apiClient.patch<
        ApiEnvelope<MerchantOrder> | MerchantOrder
      >(`/api/orders/merchants/${merchantId}/orders/${orderId}/`, payload);
      return unwrap(data);
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "Unable to update order."));
    }
  },

  async listPayments(
    merchantId: string,
    params?: {
      search?: string;
      status?: string;
      provider?: string;
      verification_status?: string;
    },
  ) {
    try {
      const { data } = await apiClient.get<PaginatedResponse<MerchantPayment>>(
        `/api/payments/merchants/${merchantId}/payments/`,
        {
          params: {
            search: params?.search || undefined,
            status: params?.status || undefined,
            provider: params?.provider || undefined,
            verification_status: params?.verification_status || undefined,
          },
        },
      );
      return normalizePaginated(data);
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "Unable to load payments."));
    }
  },

  async paymentDetail(merchantId: string, paymentId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<MerchantPayment> | MerchantPayment
      >(`/api/payments/merchants/${merchantId}/payments/${paymentId}/`);
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load payment details."),
      );
    }
  },

  async verifyPayment(
    merchantId: string,
    paymentId: string,
    payload?: {
      provider_reference?: string;
      provider_transaction_id?: string;
    },
  ) {
    try {
      const { data } = await apiClient.post<
        ApiEnvelope<MerchantPayment> | MerchantPayment
      >(
        `/api/payments/merchants/${merchantId}/payments/${paymentId}/verify/`,
        payload || {},
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to verify payment."),
      );
    }
  },

  async reviewManualProof(
    merchantId: string,
    paymentId: string,
    proofId: string,
    payload: { approve: boolean; rejection_reason?: string },
  ) {
    try {
      const { data } = await apiClient.post<
        ApiEnvelope<MerchantPayment> | MerchantPayment
      >(
        `/api/payments/merchants/${merchantId}/payments/${paymentId}/proofs/${proofId}/review/`,
        payload,
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to review payment proof."),
      );
    }
  },

  async listRefunds(merchantId: string, paymentId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<MerchantPaymentRefund[]> | MerchantPaymentRefund[]
      >(`/api/payments/merchants/${merchantId}/payments/${paymentId}/refunds/`);
      const resolved = unwrap(data);
      return Array.isArray(resolved) ? resolved : [];
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "Unable to load refunds."));
    }
  },

  async createRefund(
    merchantId: string,
    paymentId: string,
    payload: {
      amount: string;
      reason?: string;
      customer_note?: string;
      merchant_note?: string;
    },
  ) {
    try {
      const { data } = await apiClient.post<
        ApiEnvelope<MerchantPaymentRefund> | MerchantPaymentRefund
      >(
        `/api/payments/merchants/${merchantId}/payments/${paymentId}/refunds/`,
        payload,
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "Unable to create refund."));
    }
  },

  async listReceipts(
    merchantId: string,
    params?: { search?: string; status?: string; provider?: string },
  ) {
    try {
      const { data } = await apiClient.get<PaginatedResponse<MerchantReceipt>>(
        `/api/receipts/merchants/${merchantId}/`,
        {
          params: {
            search: params?.search || undefined,
            status: params?.status || undefined,
            provider: params?.provider || undefined,
          },
        },
      );
      return normalizePaginated(data);
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "Unable to load receipts."));
    }
  },

  async receiptDetail(merchantId: string, receiptId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<MerchantReceipt> | MerchantReceipt
      >(`/api/receipts/merchants/${merchantId}/${receiptId}/`);
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load receipt details."),
      );
    }
  },

  async archiveReceipt(
    merchantId: string,
    receiptId: string,
    payload?: { status?: string },
  ) {
    try {
      const { data } = await apiClient.patch<
        ApiEnvelope<MerchantReceipt> | MerchantReceipt
      >(`/api/receipts/merchants/${merchantId}/${receiptId}/`, payload || {});
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to archive receipt."),
      );
    }
  },

  async renderReceipt(merchantId: string, receiptId: string) {
    try {
      const { data } = await apiClient.get(
        `/api/receipts/merchants/${merchantId}/${receiptId}/render/`,
      );
      return data;
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load receipt render payload."),
      );
    }
  },

  async syncReceiptFromPayment(merchantId: string, paymentId: string) {
    try {
      const { data } = await apiClient.post<
        ApiEnvelope<MerchantReceipt> | MerchantReceipt
      >(`/api/receipts/merchants/${merchantId}/payments/${paymentId}/sync/`);
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to sync receipt from payment."),
      );
    }
  },

  async settlementSummary(merchantId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<MerchantSettlementSummary> | MerchantSettlementSummary
      >(`/api/settlements/merchants/${merchantId}/summary/`);
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load settlement summary."),
      );
    }
  },

  async listSettlementRecords(
    merchantId: string,
    params?: { search?: string; status?: string; provider?: string },
  ) {
    try {
      const { data } = await apiClient.get<
        PaginatedResponse<MerchantSettlementRecord>
      >(`/api/settlements/merchants/${merchantId}/records/`, {
        params: {
          search: params?.search || undefined,
          status: params?.status || undefined,
          provider: params?.provider || undefined,
        },
      });
      return normalizePaginated(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load settlement records."),
      );
    }
  },

  async settlementDetail(merchantId: string, settlementId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<MerchantSettlementRecord> | MerchantSettlementRecord
      >(`/api/settlements/merchants/${merchantId}/records/${settlementId}/`);
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load settlement detail."),
      );
    }
  },

  async listPayoutBatches(merchantId: string) {
    try {
      const { data } = await apiClient.get<
        PaginatedResponse<MerchantPayoutBatch>
      >(`/api/settlements/merchants/${merchantId}/payout-batches/`);
      return normalizePaginated(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load payout batches."),
      );
    }
  },

  async createPayoutBatch(
    merchantId: string,
    payload: {
      settlement_ids?: string[];
      scheduled_for?: string | null;
      notes?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    try {
      const { data } = await apiClient.post<
        ApiEnvelope<MerchantPayoutBatch> | MerchantPayoutBatch
      >(`/api/settlements/merchants/${merchantId}/payout-batches/`, payload);
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to create payout batch."),
      );
    }
  },

  async payoutBatchDetail(merchantId: string, payoutBatchId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<MerchantPayoutBatch> | MerchantPayoutBatch
      >(
        `/api/settlements/merchants/${merchantId}/payout-batches/${payoutBatchId}/`,
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load payout batch detail."),
      );
    }
  },

  async updatePayoutBatch(
    merchantId: string,
    payoutBatchId: string,
    payload: {
      status: string;
      notes?: string;
      metadata?: Record<string, unknown>;
    },
  ) {
    try {
      const { data } = await apiClient.patch<
        ApiEnvelope<MerchantPayoutBatch> | MerchantPayoutBatch
      >(
        `/api/settlements/merchants/${merchantId}/payout-batches/${payoutBatchId}/`,
        payload,
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to update payout batch."),
      );
    }
  },

  async listMemberships(merchantId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<MerchantMembership[]> | MerchantMembership[]
      >(`/api/merchants/${merchantId}/memberships/`);
      const resolved = unwrap(data);
      return Array.isArray(resolved) ? resolved : [];
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load merchant memberships."),
      );
    }
  },

  async addMembership(
    merchantId: string,
    payload: { email: string; role: string },
  ) {
    try {
      const { data } = await apiClient.post<
        ApiEnvelope<MerchantMembership> | MerchantMembership
      >(`/api/merchants/${merchantId}/memberships/`, payload);
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to add merchant membership."),
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