import { env } from "@/lib/config/env";
import type {
  ApiEnvelope,
  ManualPaymentProof,
  PublicCart,
  PublicCheckoutSession,
  PublicOrder,
  PublicPayment,
  PublicReceiptPayload,
} from "@/types/public-commerce";

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH";
  body?: unknown;
  query?: Record<string, string | undefined>;
};

function buildUrl(
  path: string,
  query?: Record<string, string | undefined>,
): string {
  const url = new URL(`${env.apiUrl}${path}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value && value.trim()) {
        url.searchParams.set(key, value);
      }
    });
  }

  return url.toString();
}

function extractApiData<T>(payload: ApiEnvelope<T> | T): T {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in (payload as Record<string, unknown>)
  ) {
    return (payload as ApiEnvelope<T>).data as T;
  }

  return payload as T;
}

function extractApiMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;

    if (typeof record.detail === "string" && record.detail.trim()) {
      return record.detail;
    }

    if (typeof record.message === "string" && record.message.trim()) {
      return record.message;
    }

    if (record.errors && typeof record.errors === "object") {
      const first = Object.values(record.errors as Record<string, unknown>)[0];

      if (Array.isArray(first) && typeof first[0] === "string") {
        return first[0];
      }

      if (typeof first === "string") {
        return first;
      }
    }
  }

  return fallback;
}

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const response = await fetch(buildUrl(path, options.query), {
    method: options.method || "GET",
    headers: {
      Accept: "application/json",
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
    },
    body:
      options.body === undefined
        ? undefined
        : options.body instanceof FormData
        ? options.body
        : JSON.stringify(options.body),
    credentials: "include",
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiEnvelope<T>
    | T
    | null;

  if (!response.ok) {
    throw new Error(extractApiMessage(payload, "Request failed."));
  }

  return extractApiData(payload as ApiEnvelope<T> | T);
}

export const publicCommerceApi = {
  getCart(storeSlug: string) {
    return request<PublicCart>(env.api.publicCommerce.cart(storeSlug));
  },

  resolveCart(
    storeSlug: string,
    payload: { guest_email?: string; metadata?: Record<string, unknown> },
  ) {
    return request<PublicCart>(env.api.publicCommerce.cart(storeSlug), {
      method: "POST",
      body: payload,
    });
  },

  addCartItem(
    storeSlug: string,
    payload: {
      product_id: string;
      variant_id?: string | null;
      quantity: number;
    },
  ) {
    return request(env.api.publicCommerce.cartItems(storeSlug), {
      method: "POST",
      body: payload,
    });
  },

  updateCartItem(
    storeSlug: string,
    itemId: string,
    payload: { quantity: number },
  ) {
    return request(env.api.publicCommerce.cartItemDetail(storeSlug, itemId), {
      method: "PATCH",
      body: payload,
    });
  },

  createCheckoutSession(
    storeSlug: string,
    payload: {
      cart_id: string;
      payment_mode: string;
      selected_provider?: string;
      email?: string;
      phone_number?: string;
      shipping_address?: Record<string, unknown>;
      billing_address?: Record<string, unknown>;
    },
  ) {
    return request<PublicCheckoutSession>(
      env.api.publicCommerce.checkoutSessions(storeSlug),
      {
        method: "POST",
        body: payload,
      },
    );
  },

  getCheckoutSession(storeSlug: string, sessionToken: string, email?: string) {
    return request<PublicCheckoutSession>(
      env.api.publicCommerce.checkoutSessionDetail(storeSlug, sessionToken),
      {
        query: { email },
      },
    );
  },

  createOrder(
    storeSlug: string,
    payload: {
      checkout_session_id: string;
      buyer_note?: string;
    },
  ) {
    return request<PublicOrder>(env.api.publicCommerce.orders(storeSlug), {
      method: "POST",
      body: payload,
    });
  },

  getOrder(storeSlug: string, orderNumber: string, email?: string) {
    return request<PublicOrder>(
      env.api.publicCommerce.orderByNumber(storeSlug, orderNumber),
      {
        query: { email },
      },
    );
  },

  getOrderPayment(storeSlug: string, orderNumber: string, email?: string) {
    return request<PublicPayment | null>(
      env.api.publicCommerce.orderPayment(storeSlug, orderNumber),
      {
        query: { email },
      },
    );
  },

  initializePayment(
    storeSlug: string,
    orderNumber: string,
    payload?: { provider?: string },
    email?: string,
  ) {
    return request<PublicPayment>(
      env.api.publicCommerce.initializePayment(storeSlug, orderNumber),
      {
        method: "POST",
        body: payload || {},
        query: { email },
      },
    );
  },

  getManualPaymentProofs(
    storeSlug: string,
    orderNumber: string,
    email?: string,
  ) {
    return request<ManualPaymentProof[]>(
      env.api.publicCommerce.manualPaymentProofs(storeSlug, orderNumber),
      {
        query: { email },
      },
    );
  },

  submitManualPaymentProof(
    storeSlug: string,
    orderNumber: string,
    payload: {
      proof_file_url: string;
      submitted_by_name?: string;
      submitted_by_email?: string;
      note?: string;
      metadata?: Record<string, unknown>;
    },
    email?: string,
  ) {
    return request<ManualPaymentProof>(
      env.api.publicCommerce.manualPaymentProofs(storeSlug, orderNumber),
      {
        method: "POST",
        body: payload,
        query: { email },
      },
    );
  },

  getReceiptByNumber(storeSlug: string, receiptNumber: string, email?: string) {
    return request<PublicReceiptPayload>(
      env.api.publicCommerce.receiptByNumber(storeSlug, receiptNumber),
      {
        query: { email },
      },
    );
  },
};

export function formatMoney(amount?: string | number | null, currency = "NGN") {
  if (amount === undefined || amount === null || amount === "") {
    return "—";
  }

  const numeric = Number(amount);

  if (!Number.isFinite(numeric)) {
    return `${currency} ${String(amount)}`;
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

export function getPaymentCheckoutUrl(payment: PublicPayment | null | undefined) {
  return (
    payment?.checkout_url ||
    payment?.provider_checkout_url ||
    payment?.hosted_checkout_url ||
    null
  );
}