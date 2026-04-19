import "server-only";

import { env } from "@/lib/config/env";
import type {
  ApiEnvelope,
  PublicProductDetailResponse,
  PublicProductsListResponse,
} from "@/types/catalog";

const MAX_PUBLIC_PRODUCT_PAGES = 20;

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

const buildAbsoluteUrl = (pathOrUrl: string) => {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return `${env.apiUrl}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
};

const parseErrorMessage = (payload: unknown, fallback: string) => {
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

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: 60,
    },
  });

  const payload = (await response.json().catch(() => null)) as T | null;

  if (!response.ok) {
    throw new Error(parseErrorMessage(payload, "Unable to load catalog data."));
  }

  return payload as T;
}

export async function getPublicProductsPageBySlug(
  storeSlug: string,
  pageUrl?: string,
): Promise<PublicProductsListResponse> {
  const url = pageUrl
    ? buildAbsoluteUrl(pageUrl)
    : `${env.apiUrl}/api/catalog/public/storefronts/by-slug/${encodeURIComponent(
        storeSlug,
      )}/products/`;

  return fetchJson<PublicProductsListResponse>(url);
}

export async function getAllPublicProductsBySlug(storeSlug: string): Promise<{
  storefront: PublicProductsListResponse["storefront"] | null;
  products: PublicProductsListResponse["results"];
  count: number;
}> {
  let pageCount = 0;
  let nextUrl: string | null | undefined = undefined;
  let storefront: PublicProductsListResponse["storefront"] | null = null;
  const allProducts: PublicProductsListResponse["results"] = [];
  const seenIds = new Set<string>();

  while (pageCount < MAX_PUBLIC_PRODUCT_PAGES) {
    const page = await getPublicProductsPageBySlug(storeSlug, nextUrl || undefined);

    storefront = storefront ?? page.storefront;

    for (const product of page.results) {
      if (!seenIds.has(product.id)) {
        seenIds.add(product.id);
        allProducts.push(product);
      }
    }

    if (!page.next) {
      return {
        storefront,
        products: allProducts,
        count: page.count,
      };
    }

    nextUrl = page.next;
    pageCount += 1;
  }

  return {
    storefront,
    products: allProducts,
    count: allProducts.length,
  };
}

export async function getPublicProductDetailBySlug(
  storeSlug: string,
  productSlug: string,
): Promise<PublicProductDetailResponse | null> {
  const response = await fetch(
    `${env.apiUrl}/api/catalog/public/storefronts/by-slug/${encodeURIComponent(
      storeSlug,
    )}/products/${encodeURIComponent(productSlug)}/`,
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
    | ApiEnvelope<PublicProductDetailResponse>
    | PublicProductDetailResponse
    | null;

  if (!response.ok) {
    throw new Error(
      parseErrorMessage(payload, "Unable to load public product details."),
    );
  }

  return unwrap(
    payload as ApiEnvelope<PublicProductDetailResponse> | PublicProductDetailResponse,
  );
}