export type PlanEntitlement = {
  id: string;
  feature_code: string;
  feature_name: string;
  description?: string;
  value_type?: string;
  is_enabled?: boolean;
  limit_value_integer?: number | null;
  limit_value_decimal?: string | null;
  limit_value_text?: string;
  value?: unknown;
  metadata?: Record<string, unknown>;
};

export type Plan = {
  id: string;
  code: string;
  name: string;
  tier?: string;
  description?: string;
  billing_interval?: string;
  billing_cycle_days?: number;
  trial_days?: number;
  price_amount?: string;
  currency?: string;
  is_active?: boolean;
  is_public?: boolean;
  sort_order?: number;
  metadata?: Record<string, unknown>;
  entitlements?: PlanEntitlement[];
  created_at?: string;
  updated_at?: string;
};

export type SubscriptionEvent = {
  id: string;
  event_type: string;
  title: string;
  description?: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type SubscriptionInvoice = {
  id: string;
  merchant: string;
  subscription: string;
  invoice_number: string;
  status: string;
  plan_code_snapshot?: string;
  plan_name_snapshot?: string;
  amount_due?: string;
  amount_paid?: string;
  currency?: string;
  billing_period_start_at?: string | null;
  billing_period_end_at?: string | null;
  due_at?: string | null;
  paid_at?: string | null;
  notes?: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type MerchantSubscription = {
  id: string;
  merchant: string;
  plan?: Plan;
  status: string;
  source?: string;
  is_current?: boolean;
  auto_renew?: boolean;
  cancel_at_period_end?: boolean;
  plan_code_snapshot?: string;
  plan_name_snapshot?: string;
  billing_interval_snapshot?: string;
  billing_cycle_days_snapshot?: number;
  price_amount_snapshot?: string;
  currency_snapshot?: string;
  entitlement_snapshot?: Array<Record<string, unknown>>;
  started_at?: string;
  current_period_start_at?: string | null;
  current_period_end_at?: string | null;
  trial_start_at?: string | null;
  trial_end_at?: string | null;
  cancelled_at?: string | null;
  ended_at?: string | null;
  notes?: string;
  metadata?: Record<string, unknown>;
  events?: SubscriptionEvent[];
  invoices?: SubscriptionInvoice[];
  created_at?: string;
  updated_at?: string;
};

export type PaginatedResponse<T> = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: T[];
};

export type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  detail?: string;
  data?: T;
};