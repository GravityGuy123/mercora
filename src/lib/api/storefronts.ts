import { apiClient, extractApiErrorMessage } from "@/lib/api/axios";
import { env } from "@/lib/config/env";
import type {
  ApiEnvelope,
  PublicStorefront,
  Storefront,
  StorefrontCreatePayload,
  StorefrontDomainPayload,
  StorefrontDomainResponse,
  StorefrontUpdatePayload,
} from "@/types/storefront";

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

export const storefrontsApi = {
  async list(): Promise<Storefront[]> {
    try {
      const { data } = await apiClient.get<ApiEnvelope<Storefront[]>>(
        env.api.storefronts.list,
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load storefronts."),
      );
    }
  },

  async create(payload: StorefrontCreatePayload): Promise<Storefront> {
    try {
      const { data } = await apiClient.post<ApiEnvelope<Storefront>>(
        env.api.storefronts.list,
        payload,
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to create storefront."),
      );
    }
  },

  async detail(storefrontId: string): Promise<Storefront> {
    try {
      const { data } = await apiClient.get<ApiEnvelope<Storefront>>(
        env.api.storefronts.detail(storefrontId),
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load storefront details."),
      );
    }
  },

  async update(
    storefrontId: string,
    payload: StorefrontUpdatePayload,
  ): Promise<Storefront> {
    try {
      const { data } = await apiClient.patch<ApiEnvelope<Storefront>>(
        env.api.storefronts.detail(storefrontId),
        payload,
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to update storefront."),
      );
    }
  },

  async getDomain(storefrontId: string): Promise<StorefrontDomainResponse> {
    try {
      const { data } = await apiClient.get<ApiEnvelope<StorefrontDomainResponse>>(
        env.api.storefronts.domain(storefrontId),
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load storefront domain settings."),
      );
    }
  },

  async updateDomain(
    storefrontId: string,
    payload: StorefrontDomainPayload,
  ): Promise<StorefrontDomainResponse> {
    try {
      const { data } = await apiClient.patch<ApiEnvelope<StorefrontDomainResponse>>(
        env.api.storefronts.domain(storefrontId),
        payload,
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to update storefront domain settings."),
      );
    }
  },

  async publish(storefrontId: string): Promise<Storefront> {
    try {
      const { data } = await apiClient.post<ApiEnvelope<Storefront>>(
        env.api.storefronts.publish(storefrontId),
        {},
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to publish storefront."),
      );
    }
  },

  async unpublish(storefrontId: string): Promise<Storefront> {
    try {
      const { data } = await apiClient.post<ApiEnvelope<Storefront>>(
        env.api.storefronts.unpublish(storefrontId),
        {},
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to unpublish storefront."),
      );
    }
  },

  async publicBySlug(slug: string): Promise<PublicStorefront> {
    try {
      const { data } = await apiClient.get<ApiEnvelope<PublicStorefront>>(
        env.api.storefronts.publicBySlug(slug),
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load public storefront."),
      );
    }
  },

  async publicBySubdomain(subdomain: string): Promise<PublicStorefront> {
    try {
      const { data } = await apiClient.get<ApiEnvelope<PublicStorefront>>(
        env.api.storefronts.publicBySubdomain(subdomain),
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load public storefront."),
      );
    }
  },

  async publicByDomain(domain: string): Promise<PublicStorefront> {
    try {
      const { data } = await apiClient.get<ApiEnvelope<PublicStorefront>>(
        env.api.storefronts.publicByDomain(domain),
      );
      return unwrap(data);
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to load public storefront."),
      );
    }
  },
};