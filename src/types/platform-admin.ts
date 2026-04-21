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

export type PlatformPayoutBatch = {
  id: string;
  merchant: string | null;
  batch_reference: string;
  status: string;
  settlement_currency: string;
  total_records_count: number;
  total_gross_amount: string;
  total_net_amount: string;
  total_reserve_amount: string;
  total_refund_amount: string;
  total_dispute_amount: string;
  scheduled_for: string | null;
  processed_at: string | null;
  failed_at: string | null;
  cancelled_at: string | null;
  notes: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type PlatformDispute = {
  id: string;
  payment: string | null;
  order: string | null;
  provider: string;
  provider_dispute_id: string;
  status: string;
  amount: string;
  currency: string;
  reason: string;
  provider_reason_code: string;
  evidence_due_at: string | null;
  opened_at: string | null;
  closed_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type PlatformSupportTicket = {
  id: string;
  merchant: string | null;
  customer: string | null;
  created_by_user: string | null;
  assigned_to: string | null;
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