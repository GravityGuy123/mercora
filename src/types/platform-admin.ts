import type {
  MerchantOrder,
  MerchantPayment,
  MerchantPaymentDispute,
  MerchantPayoutBatch,
  MerchantReceipt,
  MerchantSettlementRecord,
} from "@/types/merchant-operations";

export type PlatformOrder = MerchantOrder;
export type PlatformPayment = MerchantPayment;
export type PlatformDispute = MerchantPaymentDispute;
export type PlatformPayoutBatch = MerchantPayoutBatch;
export type PlatformReceipt = MerchantReceipt;
export type PlatformSettlementRecord = MerchantSettlementRecord;

export type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  detail?: string;
  data?: T;
};

export type PaginatedResponse<T> = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: T[];
};

export type PlatformDashboardSummary = {
  period: {
    days: number;
    start_at: string;
    end_at: string;
  };
  merchants: {
    total_merchants: number;
    new_merchants_in_window: number;
    suspended_merchants: number;
  };
  storefronts: {
    total_storefronts: number;
    new_storefronts_in_window: number;
  };
  orders: {
    total_orders: number;
    gross_order_amount: string;
  };
  payments: {
    successful_payments: number;
    failed_payments: number;
    disputed_payments: number;
    successful_payment_amount: string;
  };
  settlements: {
    eligible_settlements: number;
    on_hold_settlements: number;
    paid_out_settlements: number;
    payout_batches_scheduled: number;
    payout_batches_processing: number;
    payout_batches_failed: number;
  };
  receipts: {
    issued_receipts: number;
  };
  subscriptions: {
    subscriptions_created: number;
    active_current_subscriptions: number;
  };
  support: {
    tickets_created: number;
    open_tickets: number;
  };
  disputes: {
    open_disputes: number;
    closed_disputes: number;
  };
};

export type PlatformAnalyticsSnapshot = {
  id: string;
  snapshot_date: string;
  granularity: string;
  currency: string;
  merchants_count: number;
  active_storefronts_count: number;
  orders_count: number;
  successful_payments_count: number;
  gross_order_amount: string;
  successful_payment_amount: string;
  refunded_amount: string;
  net_settlement_amount: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type PlatformAnalyticsPayload = {
  summary: PlatformDashboardSummary;
  snapshots: PlatformAnalyticsSnapshot[];
};

export type PlatformMerchantLatestModerationCase = {
  id: string;
  status: string;
  decision: string;
  title: string;
  reviewed_at: string | null;
} | null;

export type PlatformMerchant = {
  id: string;
  public_display_name: string;
  legal_business_name: string;
  country_code: string;
  base_currency: string;
  default_settlement_currency: string;
  support_email: string;
  support_phone_number: string;
  activation_state: string;
  onboarding_state: string;
  is_suspended: boolean;
  created_at: string;
  storefront_count: number;
  orders_count: number;
  successful_payments_count: number;
  gross_order_amount: string;
  eligible_net_settlement_amount: string;
  current_subscription_status: string;
  current_plan_name: string;
  latest_moderation_case: PlatformMerchantLatestModerationCase;
};

export type PlatformMerchantModerationCase = {
  id: string;
  merchant: string;
  opened_by: string | null;
  reviewed_by: string | null;
  title: string;
  reason: string;
  internal_notes: string;
  action_summary: string;
  status: string;
  decision: string;
  reviewed_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type PlatformSupportMessageAuthorUser = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  role?: string;
};

export type PlatformSupportMessageAuthorCustomer = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  phone_number?: string;
};

export type PlatformSupportMessage = {
  id: string;
  ticket: string;
  author_type: string;
  author_user?: PlatformSupportMessageAuthorUser | null;
  author_customer?: PlatformSupportMessageAuthorCustomer | null;
  author_name?: string;
  author_email?: string;
  body: string;
  is_internal: boolean;
  attachments?: Array<Record<string, unknown>>;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type PlatformSupportTicket = {
  id: string;
  merchant: string | null;
  customer: PlatformSupportMessageAuthorCustomer | null;
  created_by_user: PlatformSupportMessageAuthorUser | null;
  assigned_to: PlatformSupportMessageAuthorUser | null;
  order: string | null;
  payment: string | null;
  settlement_record: string | null;
  receipt: string | null;
  subscription: string | null;
  ticket_number: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  source: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  first_response_at: string | null;
  last_activity_at: string | null;
  resolved_at: string | null;
  closed_at: string | null;
  metadata: Record<string, unknown>;
  messages?: PlatformSupportMessage[];
  created_at: string;
  updated_at: string;
};

export type PlatformActionLog = {
  id: string;
  admin_user: string | null;
  action_type: string;
  title: string;
  description: string;
  merchant: string | null;
  moderation_case: string | null;
  payout_batch: string | null;
  dispute: string | null;
  support_ticket: string | null;
  subscription: string | null;
  target_type: string;
  target_id: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type PlatformStorefront = {
  id: string;
  merchant_id: string;
  merchant_name: string;
  merchant_base_currency: string;
  store_name: string;
  slug: string;
  subdomain: string;
  status: string;
  visibility: string;
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
  custom_domain: string;
  domain_status: string;
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

export type PlatformPlanEntitlement = {
  id: string;
  plan: string;
  feature_code: string;
  feature_name: string;
  description: string;
  value_type: string;
  is_enabled: boolean;
  limit_value_integer?: number | null;
  limit_value_decimal?: string | null;
  limit_value_text?: string | null;
  value?: unknown;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type PlatformPlan = {
  id: string;
  code: string;
  name: string;
  tier: string;
  description: string;
  billing_interval: string;
  billing_cycle_days: number;
  trial_days: number;
  price_amount: string;
  currency: string;
  is_active: boolean;
  is_public: boolean;
  sort_order: number;
  metadata?: Record<string, unknown>;
  entitlements?: PlatformPlanEntitlement[];
  created_at: string;
  updated_at: string;
};

export type PlatformSubscriptionEvent = {
  id: string;
  subscription: string;
  event_type: string;
  title: string;
  description: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type PlatformSubscriptionInvoice = {
  id: string;
  merchant: string;
  subscription: string;
  invoice_number: string;
  status: string;
  plan_code_snapshot: string;
  plan_name_snapshot: string;
  amount_due: string;
  amount_paid: string;
  currency: string;
  billing_period_start_at: string | null;
  billing_period_end_at: string | null;
  due_at: string | null;
  paid_at: string | null;
  notes: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type PlatformSubscription = {
  id: string;
  merchant: string;
  plan?: PlatformPlan | null;
  status: string;
  source: string;
  is_current: boolean;
  auto_renew: boolean;
  cancel_at_period_end: boolean;
  plan_code_snapshot: string;
  plan_name_snapshot: string;
  billing_interval_snapshot: string;
  billing_cycle_days_snapshot: number;
  price_amount_snapshot: string;
  currency_snapshot: string;
  entitlement_snapshot?: Record<string, unknown>;
  started_at: string | null;
  current_period_start_at: string | null;
  current_period_end_at: string | null;
  trial_start_at: string | null;
  trial_end_at: string | null;
  cancelled_at: string | null;
  ended_at: string | null;
  notes: string;
  metadata?: Record<string, unknown>;
  events?: PlatformSubscriptionEvent[];
  invoices?: PlatformSubscriptionInvoice[];
  created_at: string;
  updated_at: string;
};

export type PlatformNotificationDelivery = {
  id: string;
  notification: string;
  channel: string;
  status: string;
  recipient_address: string;
  subject_snapshot: string;
  body_snapshot: string;
  provider: string;
  provider_message_id: string;
  error_message: string;
  attempted_at: string | null;
  delivered_at: string | null;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type PlatformNotification = {
  id: string;
  merchant: string | null;
  recipient_user: string | null;
  recipient_customer: string | null;
  category: string;
  event_type: string;
  severity: string;
  title: string;
  body: string;
  send_in_app: boolean;
  send_email: boolean;
  email_to: string;
  event_key: string;
  order: string | null;
  payment: string | null;
  settlement_record: string | null;
  receipt: string | null;
  subscription: string | null;
  support_ticket: string | null;
  read_at: string | null;
  archived_at: string | null;
  metadata?: Record<string, unknown>;
  deliveries?: PlatformNotificationDelivery[];
  created_at: string;
  updated_at: string;
};

export type PlatformNotificationSummary = {
  total_notifications: number;
  unread_notifications: number;
  archived_notifications: number;
};

export type PlatformProviderRoutingSetting = {
  id: string;
  merchant_id: string;
  merchant_name: string;
  merchant_country_code: string;
  merchant_base_currency: string;
  provider: string;
  is_enabled: boolean;
  is_visible_at_checkout: boolean;
  is_eligible: boolean;
  supported_charge_currencies: string[];
  admin_override_reason: string;
  notes: string;
  created_at: string;
  updated_at: string;
};

export type PlatformProviderRoutingSummaryItem = {
  provider: string;
  label: string;
  total_settings: number;
  enabled_settings: number;
  visible_at_checkout_settings: number;
  eligible_settings: number;
};

export type PlatformConfigurationSummary = Record<string, unknown>;

export type PlatformNotificationsListPayload = {
  count: number;
  results: PlatformNotification[];
  summary: PlatformNotificationSummary | null;
};

export type PlatformProviderRoutingListPayload = {
  count: number;
  results: PlatformProviderRoutingSetting[];
  summary: PlatformProviderRoutingSummaryItem[];
};