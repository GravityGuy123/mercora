import { apiClient, extractApiErrorMessage } from "@/lib/api/axios";
import type { ApiEnvelope, MerchantPayoutBatch } from "@/types/merchant-operations";

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

export const payoutBatchesApi = {
  async detail(merchantId: string, payoutBatchId: string) {
    try {
      const { data } = await apiClient.get<
        ApiEnvelope<MerchantPayoutBatch> | MerchantPayoutBatch
      >(`/api/settlements/merchants/${merchantId}/payout-batches/${payoutBatchId}/`);

      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load payout batch detail."),
      );
    }
  },
};