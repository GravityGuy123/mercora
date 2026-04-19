export type StorefrontStatus =
  | "draft"
  | "published"
  | "suspended"
  | "archived";

export type StorefrontVisibility = "public" | "unlisted" | "private";

export type StorefrontDomainStatus =
  | "unconfigured"
  | "pending_verification"
  | "verified"
  | "failed";

export type Storefront = {
  id: string;
  merchant_id: string;
  merchant_name: string;
  merchant_base_currency: string;
  store_name: string;
  slug: string;
  subdomain: string | null;
  status: StorefrontStatus;
  visibility: StorefrontVisibility;
  headline: string;
  short_description: string;
  about_text: string;
  logo_url: string;
  banner_image_url: string;
  favicon_url: string;
  primary_cta_text: string;
  primary_cta_url: string;
  contact_email: string;
  contact_phone: string;
  whatsapp_number: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state_region: string;
  postal_code: string;
  country_code: string;
  social_links: Record<string, unknown>;
  announcement_text: string;
  is_announcement_active: boolean;
  return_policy: string;
  privacy_policy: string;
  terms_of_service: string;
  fulfillment_policy: string;
  seo_title: string;
  seo_description: string;
  is_accepting_orders: boolean;
  custom_domain: string | null;
  domain_status: StorefrontDomainStatus;
  domain_verification_token: string;
  domain_last_checked_at: string | null;
  domain_verified_at: string | null;
  published_at: string | null;
  suspended_at: string | null;
  metadata: Record<string, unknown>;
  public_identifier: string;
  created_at: string;
  updated_at: string;
};

export type StorefrontCreatePayload = {
  merchant_id: string;
  store_name?: string;
  slug?: string;
  subdomain?: string;
  visibility?: StorefrontVisibility;
  headline?: string;
  short_description?: string;
  about_text?: string;
  logo_url?: string;
  banner_image_url?: string;
  favicon_url?: string;
  primary_cta_text?: string;
  primary_cta_url?: string;
  contact_email?: string;
  contact_phone?: string;
  whatsapp_number?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state_region?: string;
  postal_code?: string;
  country_code?: string;
  social_links?: Record<string, unknown>;
  announcement_text?: string;
  is_announcement_active?: boolean;
  return_policy?: string;
  privacy_policy?: string;
  terms_of_service?: string;
  fulfillment_policy?: string;
  seo_title?: string;
  seo_description?: string;
  is_accepting_orders?: boolean;
  metadata?: Record<string, unknown>;
};

export type StorefrontUpdatePayload = Partial<
  Omit<StorefrontCreatePayload, "merchant_id">
>;

export type StorefrontDomainPayload = {
  custom_domain?: string;
};

export type StorefrontDomainResponse = {
  id: string;
  slug: string;
  subdomain: string | null;
  custom_domain: string | null;
  domain_status: StorefrontDomainStatus;
  domain_verification_token: string;
  domain_last_checked_at: string | null;
  domain_verified_at: string | null;
};

export type PublicStorefront = {
  id: string;
  merchant_name: string;
  merchant_country_code: string;
  merchant_base_currency: string;
  store_name: string;
  slug: string;
  subdomain: string | null;
  headline: string;
  short_description: string;
  about_text: string;
  logo_url: string;
  banner_image_url: string;
  favicon_url: string;
  primary_cta_text: string;
  primary_cta_url: string;
  contact_email: string;
  contact_phone: string;
  whatsapp_number: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state_region: string;
  postal_code: string;
  country_code: string;
  social_links: Record<string, unknown>;
  announcement_text: string;
  is_announcement_active: boolean;
  return_policy: string;
  privacy_policy: string;
  terms_of_service: string;
  fulfillment_policy: string;
  seo_title: string;
  seo_description: string;
  is_accepting_orders: boolean;
  custom_domain: string | null;
  published_at: string | null;
};

export type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  detail?: string;
  data?: T;
  errors?: Record<string, string[] | string>;
};

export type StorefrontContextValue = {
  storefronts: Storefront[];
  activeStorefront: Storefront | null;
  isLoading: boolean;
  error: string;
  refreshStorefronts: () => Promise<Storefront[]>;
  createStorefront: (payload: StorefrontCreatePayload) => Promise<Storefront>;
  updateStorefront: (
    storefrontId: string,
    payload: StorefrontUpdatePayload,
  ) => Promise<Storefront>;
  updateStorefrontDomain: (
    storefrontId: string,
    payload: StorefrontDomainPayload,
  ) => Promise<StorefrontDomainResponse>;
  publishStorefront: (storefrontId: string) => Promise<Storefront>;
  unpublishStorefront: (storefrontId: string) => Promise<Storefront>;
  updateStorefrontInState: (storefront: Storefront) => void;
  clearStorefronts: () => void;
};