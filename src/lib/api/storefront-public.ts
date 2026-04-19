import "server-only";

import { env } from "@/lib/config/env";
import type { ApiEnvelope, PublicStorefront } from "@/types/storefront";

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

const extractMessage = (payload: unknown, fallback: string) => {
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;

    if (typeof record.detail === "string" && record.detail.trim()) {
      return record.detail;
    }

    if (typeof record.message === "string" && record.message.trim()) {
      return record.message;
    }
  }

  return fallback;
};

export async function getPublicStorefrontBySlug(
  storeSlug: string,
): Promise<PublicStorefront | null> {
  const response = await fetch(
    `${env.apiUrl}${env.api.storefronts.publicBySlug(encodeURIComponent(storeSlug))}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 60,
      },
    },
  );

  if (response.status === 404) {
    return null;
  }

  const payload = (await response.json().catch(() => null)) as
    | ApiEnvelope<PublicStorefront>
    | PublicStorefront
    | null;

  if (!response.ok) {
    throw new Error(
      extractMessage(payload, "Unable to load the public storefront."),
    );
  }

  return unwrap(payload as ApiEnvelope<PublicStorefront> | PublicStorefront);
}