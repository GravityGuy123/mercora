export type PublicStorefrontLite = {
  id?: string;
  slug?: string;
  store_name?: string;
  subdomain?: string | null;
  custom_domain?: string | null;
};

export type PublicCartItem = {
  id: string;
  quantity: number;
  unit_price_amount?: string;
  total_price_amount?: string;
  product_name?: string;
  product_title?: string;
  image_url?: string;
  product_snapshot?: Record<string, unknown>;
  variant_snapshot?: Record<string, unknown>;
  product?: Record<string, unknown>;
  variant?: Record<string, unknown>;
  [key: string]: unknown;
};

export type PublicCart = {
  id: string;
  guest_email?: string;
  currency?: string;
  base_currency?: string;
  presentment_currency?: string;
  charge_currency?: string;
  subtotal_amount?: string;
  discount_amount?: string;
  shipping_amount?: string;
  tax_amount?: string;
  gross_amount?: string;
  is_active?: boolean;
  expires_at?: string | null;
  items?: PublicCartItem[];
  storefront?: PublicStorefrontLite;
  [key: string]: unknown;
};

export type PublicCheckoutSession = {
  id: string;
  session_token?: string;
  status?: string;
  payment_mode?: string;
  selected_provider?: string;
  email?: string;
  phone_number?: string;
  subtotal_amount?: string;
  discount_amount?: string;
  shipping_amount?: string;
  tax_amount?: string;
  gross_amount?: string;
  base_currency?: string;
  presentment_currency?: string;
  charge_currency?: string;
  expires_at?: string | null;
  [key: string]: unknown;
};

export type PublicOrderTimelineEvent = {
  id?: string;
  title?: string;
  event_type?: string;
  message?: string;
  created_at?: string;
  [key: string]: unknown;
};

export type PublicOrder = {
  id: string;
  order_number: string;
  status?: string;
  payment_mode?: string;
  payment_state?: string;
  fulfillment_status?: string;
  email?: string;
  phone_number?: string;
  subtotal_amount?: string;
  discount_amount?: string;
  shipping_amount?: string;
  tax_amount?: string;
  gross_amount?: string;
  base_currency?: string;
  presentment_currency?: string;
  charge_currency?: string;
  buyer_note?: string;
  shipping_tracking_reference?: string;
  items?: Record<string, unknown>[];
  timeline_events?: PublicOrderTimelineEvent[];
  [key: string]: unknown;
};

export type PublicPayment = {
  id?: string;
  payment_mode?: string;
  provider?: string;
  status?: string;
  verification_status?: string;
  checkout_url?: string;
  provider_checkout_url?: string;
  hosted_checkout_url?: string;
  access_code?: string;
  provider_reference?: string;
  provider_payment_reference?: string;
  gross_amount?: string;
  base_currency?: string;
  presentment_currency?: string;
  charge_currency?: string;
  receipt_number?: string;
  merchant_direct_instructions_snapshot?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  [key: string]: unknown;
};

export type ManualPaymentProof = {
  id?: string;
  proof_file_url?: string;
  note?: string;
  submitted_by_name?: string;
  submitted_by_email?: string;
  created_at?: string;
  status?: string;
  [key: string]: unknown;
};

export type PublicReceiptPayload = {
  receipt_number?: string;
  issued_at?: string;
  merchant_snapshot?: Record<string, unknown>;
  storefront_snapshot?: Record<string, unknown>;
  customer_snapshot?: Record<string, unknown>;
  payment_snapshot?: Record<string, unknown>;
  billing_address_snapshot?: Record<string, unknown>;
  shipping_address_snapshot?: Record<string, unknown>;
  items_snapshot?: Record<string, unknown>[];
  totals_snapshot?: Record<string, unknown>;
  [key: string]: unknown;
};

export type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  detail?: string;
  data?: T;
  errors?: Record<string, string[] | string>;
};