export type PublicCatalogStorefrontSummary = {
  id: string;
  slug: string;
  subdomain: string | null;
  store_name: string;
  custom_domain: string | null;
};

export type PublicCategorySummary = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export type PublicProductVariant = {
  id: string;
  name: string;
  sku: string;
  attributes: Record<string, unknown>;
  effective_price_amount: string;
  effective_compare_at_price_amount: string | null;
  track_inventory: boolean;
  inventory_quantity: number;
  allow_backorders: boolean;
  is_default: boolean;
};

export type PublicProductMedia = {
  id: string;
  media_type: "image" | "video" | "file";
  file_url: string;
  alt_text: string;
  sort_order: number;
  is_primary: boolean;
};

export type PublicProduct = {
  id: string;
  category: PublicCategorySummary | null;
  name: string;
  slug: string;
  sku: string;
  product_type: "physical" | "digital" | "service";
  short_description: string;
  description: string;
  base_currency: string;
  base_price_amount: string;
  compare_at_price_amount: string | null;
  is_taxable: boolean;
  requires_shipping: boolean;
  track_inventory: boolean;
  inventory_quantity: number;
  allow_backorders: boolean;
  low_stock_threshold: number;
  is_featured: boolean;
  weight_kg: string | null;
  published_at: string | null;
  variants: PublicProductVariant[];
  media_items: PublicProductMedia[];
};

export type PublicProductsListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PublicProduct[];
  storefront: PublicCatalogStorefrontSummary;
};

export type PublicProductDetailResponse = {
  storefront: PublicCatalogStorefrontSummary;
  product: PublicProduct;
};

export type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  detail?: string;
  data?: T;
  errors?: Record<string, string[] | string>;
};