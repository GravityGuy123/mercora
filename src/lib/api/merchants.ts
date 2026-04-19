import { apiClient, extractApiErrorMessage } from "@/lib/api/axios";
import { env } from "@/lib/config/env";
import type {
  ApiEnvelope,
  Merchant,
  MerchantCreatePayload,
  MerchantKycPayload,
  MerchantKycProfile,
  MerchantMembership,
  MerchantMembershipCreatePayload,
  MerchantPayoutPayload,
  MerchantPayoutSettings,
  MerchantProviderSetting,
  MerchantProviderSettingsBulkPayload,
  MerchantUpdatePayload,
} from "@/types/merchant";

const unwrap = <T>(payload: ApiEnvelope<T> | T): T => {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in (payload as Record<string, unknown>)
  ) {
    return (payload as ApiEnvelope<T>).data as T;
  }

  return payload as T;
};

export const merchantsApi = {
  async list(): Promise<Merchant[]> {
    try {
      const { data } = await apiClient.get<ApiEnvelope<Merchant[]>>(
        env.api.merchants.list,
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load merchants."),
      );
    }
  },

  async create(payload: MerchantCreatePayload): Promise<Merchant> {
    try {
      const { data } = await apiClient.post<ApiEnvelope<Merchant>>(
        env.api.merchants.list,
        payload,
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to create merchant."),
      );
    }
  },

  async detail(merchantId: string): Promise<Merchant> {
    try {
      const { data } = await apiClient.get<ApiEnvelope<Merchant>>(
        env.api.merchants.detail(merchantId),
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load merchant details."),
      );
    }
  },

  async update(
    merchantId: string,
    payload: MerchantUpdatePayload,
  ): Promise<Merchant> {
    try {
      const { data } = await apiClient.patch<ApiEnvelope<Merchant>>(
        env.api.merchants.detail(merchantId),
        payload,
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to update merchant."),
      );
    }
  },

  async getKyc(merchantId: string): Promise<MerchantKycProfile> {
    try {
      const { data } = await apiClient.get<ApiEnvelope<MerchantKycProfile>>(
        env.api.merchants.kyc(merchantId),
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "Unable to load KYC."));
    }
  },

  async updateKyc(
    merchantId: string,
    payload: MerchantKycPayload,
  ): Promise<MerchantKycProfile> {
    try {
      const { data } = await apiClient.patch<ApiEnvelope<MerchantKycProfile>>(
        env.api.merchants.kyc(merchantId),
        payload,
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "Unable to update KYC."));
    }
  },

  async getPayoutSettings(merchantId: string): Promise<MerchantPayoutSettings> {
    try {
      const { data } = await apiClient.get<ApiEnvelope<MerchantPayoutSettings>>(
        env.api.merchants.payoutSettings(merchantId),
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load payout settings."),
      );
    }
  },

  async updatePayoutSettings(
    merchantId: string,
    payload: MerchantPayoutPayload,
  ): Promise<MerchantPayoutSettings> {
    try {
      const { data } = await apiClient.patch<ApiEnvelope<MerchantPayoutSettings>>(
        env.api.merchants.payoutSettings(merchantId),
        payload,
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to update payout settings."),
      );
    }
  },

  async getProviderSettings(
    merchantId: string,
  ): Promise<MerchantProviderSetting[]> {
    try {
      const { data } = await apiClient.get<ApiEnvelope<MerchantProviderSetting[]>>(
        env.api.merchants.providerSettings(merchantId),
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load provider settings."),
      );
    }
  },

  async updateProviderSettings(
    merchantId: string,
    payload: MerchantProviderSettingsBulkPayload,
  ): Promise<MerchantProviderSetting[]> {
    try {
      const { data } = await apiClient.patch<ApiEnvelope<MerchantProviderSetting[]>>(
        env.api.merchants.providerSettings(merchantId),
        payload,
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to update provider settings."),
      );
    }
  },

  async getMemberships(merchantId: string): Promise<MerchantMembership[]> {
    try {
      const { data } = await apiClient.get<ApiEnvelope<MerchantMembership[]>>(
        env.api.merchants.memberships(merchantId),
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load memberships."),
      );
    }
  },

  async addMembership(
    merchantId: string,
    payload: MerchantMembershipCreatePayload,
  ): Promise<MerchantMembership> {
    try {
      const { data } = await apiClient.post<ApiEnvelope<MerchantMembership>>(
        env.api.merchants.memberships(merchantId),
        payload,
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to add membership."),
      );
    }
  },
};