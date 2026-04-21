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

export type MerchantCartItem = {
  id: string;
  cart?: string;
  product?: string | null;
  variant?: string | null;
  product_name_snapshot?: string;
  product_slug_snapshot?: string;
  variant_name_snapshot?: string;
  sku_snapshot?: string;
  quantity?: number;
  unit_price_amount?: string;
  compare_at_price_amount?: string | null;
  currency?: string;
  line_total_amount?: string;
  product_snapshot?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type MerchantCart = {
  id: string;
  merchant?: string;
  storefront?: string | null;
  customer?: string | null;
  linked_user?: string | null;
  session_key?: string;
  guest_email?: string;
  currency?: string;
  is_active?: boolean;
  expires_at?: string | null;
  metadata?: Record<string, unknown>;
  items?: MerchantCartItem[];
  created_at?: string;
  updated_at?: string;
};

export type MerchantCheckoutSession = {
  id: string;
  merchant?: string;
  storefront?: string | null;
  cart?: string | null;
  customer?: string | null;
  linked_user?: string | null;
  session_token?: string;
  status?: string;
  payment_mode?: string;
  selected_provider?: string;
  email?: string;
  phone_number?: string;
  shipping_address_snapshot?: Record<string, unknown>;
  billing_address_snapshot?: Record<string, unknown>;
  subtotal_amount?: string;
  discount_amount?: string;
  shipping_amount?: string;
  tax_amount?: string;
  gross_amount?: string;
  base_currency?: string;
  presentment_currency?: string;
  charge_currency?: string;
  customer_snapshot?: Record<string, unknown>;
  items_snapshot?: Array<Record<string, unknown>>;
  metadata?: Record<string, unknown>;
  expires_at?: string | null;
  completed_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type MerchantOrderItem = {
  id: string;
  product?: string | null;
  variant?: string | null;
  product_name_snapshot?: string;
  product_slug_snapshot?: string;
  variant_name_snapshot?: string;
  sku_snapshot?: string;
  quantity?: number;
  unit_price_amount?: string;
  compare_at_price_amount?: string | null;
  line_total_amount?: string;
  currency?: string;
  product_snapshot?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type MerchantOrderTimelineEvent = {
  id: string;
  event_type?: string;
  title?: string;
  description?: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type MerchantOrder = {
  id: string;
  merchant?: string;
  storefront?: string | null;
  customer?: string | null;
  linked_user?: string | null;
  checkout_session?: string | null;
  cart?: string | null;
  order_number: string;
  external_reference?: string;
  payment_mode?: string;
  selected_provider?: string;
  status?: string;
  payment_state?: string;
  fulfillment_status?: string;
  email?: string;
  phone_number?: string;
  customer_snapshot?: Record<string, unknown>;
  shipping_address_snapshot?: Record<string, unknown>;
  billing_address_snapshot?: Record<string, unknown>;
  subtotal_amount?: string;
  discount_amount?: string;
  shipping_amount?: string;
  tax_amount?: string;
  gross_amount?: string;
  base_currency?: string;
  presentment_currency?: string;
  charge_currency?: string;
  buyer_note?: string;
  merchant_note?: string;
  shipping_method_name?: string;
  shipping_tracking_reference?: string;
  shipped_at?: string | null;
  delivered_at?: string | null;
  cancelled_at?: string | null;
  metadata?: Record<string, unknown>;
  items?: MerchantOrderItem[];
  timeline_events?: MerchantOrderTimelineEvent[];
  created_at?: string;
  updated_at?: string;
};

export type MerchantManualPaymentProof = {
  id: string;
  payment?: string;
  proof_file_url?: string;
  note?: string;
  submitted_by_user?: string | null;
  submitted_by_email?: string;
  submitted_by_name?: string;
  status?: string;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  rejection_reason?: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type MerchantPaymentRefund = {
  id: string;
  payment?: string;
  order?: string;
  provider?: string;
  provider_refund_id?: string;
  provider_reference?: string;
  status?: string;
  amount?: string;
  currency?: string;
  reason?: string;
  customer_note?: string;
  merchant_note?: string;
  provider_response?: Record<string, unknown>;
  processed_at?: string | null;
  failed_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type MerchantPaymentDispute = {
  id: string;
  payment?: string;
  order?: string;
  provider?: string;
  provider_dispute_id?: string;
  status?: string;
  amount?: string;
  currency?: string;
  reason?: string;
  provider_reason_code?: string;
  evidence_due_at?: string | null;
  opened_at?: string | null;
  closed_at?: string | null;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type MerchantPaymentAttempt = {
  id: string;
  payment?: string;
  attempt_sequence?: number;
  provider?: string;
  status?: string;
  provider_reference?: string;
  provider_transaction_id?: string;
  request_payload?: Record<string, unknown>;
  response_payload?: Record<string, unknown>;
  response_status_code?: number | null;
  failure_code?: string;
  failure_message?: string;
  initiated_at?: string | null;
  completed_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type MerchantPaymentWebhookEvent = {
  id: string;
  provider?: string;
  event_type?: string;
  provider_event_id?: string;
  provider_reference?: string;
  provider_transaction_id?: string;
  payment?: string | null;
  payload_hash?: string;
  signature_valid?: boolean;
  processing_status?: string;
  headers?: Record<string, unknown>;
  payload?: Record<string, unknown>;
  failure_reason?: string;
  received_at?: string | null;
  processed_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type MerchantPayment = {
  id: string;
  merchant?: string;
  storefront?: string | null;
  customer?: string | null;
  linked_user?: string | null;
  checkout_session?: string | null;
  order?: string | null;
  payment_reference: string;
  mode?: string;
  provider?: string;
  status?: string;
  verification_status?: string;
  provider_reference?: string;
  provider_transaction_id?: string;
  provider_checkout_url?: string;
  provider_access_code?: string;
  provider_payment_method?: string;
  provider_channel?: string;
  provider_response_code?: string;
  provider_response_message?: string;
  subtotal_amount?: string;
  discount_amount?: string;
  shipping_amount?: string;
  tax_amount?: string;
  gross_amount?: string;
  processor_fee_amount?: string;
  platform_fee_amount?: string;
  payout_fee_amount?: string;
  reserve_amount?: string;
  refund_amount?: string;
  dispute_amount?: string;
  net_amount?: string;
  exchange_rate?: string | null;
  base_currency?: string;
  presentment_currency?: string;
  charge_currency?: string;
  settlement_currency?: string;
  customer_snapshot?: Record<string, unknown>;
  items_snapshot?: Array<Record<string, unknown>>;
  provider_metadata_snapshot?: Record<string, unknown>;
  last_verification_payload?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  initialized_at?: string | null;
  last_verified_at?: string | null;
  successful_at?: string | null;
  failed_at?: string | null;
  cancelled_at?: string | null;
  refunded_at?: string | null;
  disputed_at?: string | null;
  attempts?: MerchantPaymentAttempt[];
  webhook_events?: MerchantPaymentWebhookEvent[];
  proof_submissions?: MerchantManualPaymentProof[];
  refunds?: MerchantPaymentRefund[];
  disputes?: MerchantPaymentDispute[];
  created_at?: string;
  updated_at?: string;
};

export type MerchantReceiptAnnotation = {
  annotation_type?: string;
  title?: string;
  message?: string;
  amount?: string | null;
  currency?: string | null;
  effective_at?: string | null;
  metadata?: Record<string, unknown>;
};

export type MerchantReceipt = {
  id: string;
  merchant?: string;
  order?: string | null;
  payment?: string | null;
  receipt_number: string;
  order_number?: string;
  payment_reference?: string;
  provider?: string;
  payment_mode?: string;
  status?: string;
  merchant_snapshot?: Record<string, unknown>;
  buyer_snapshot?: Record<string, unknown>;
  shipping_address_snapshot?: Record<string, unknown>;
  billing_address_snapshot?: Record<string, unknown>;
  items_snapshot?: Array<Record<string, unknown>>;
  subtotal_amount?: string;
  discount_amount?: string;
  shipping_amount?: string;
  tax_amount?: string;
  gross_amount?: string;
  refund_amount?: string;
  dispute_amount?: string;
  base_currency?: string;
  presentment_currency?: string;
  charge_currency?: string;
  payment_method?: string;
  payment_channel?: string;
  paid_at?: string | null;
  issued_at?: string | null;
  render_metadata?: Record<string, unknown>;
  annotations?: MerchantReceiptAnnotation[];
  created_at?: string;
  updated_at?: string;
};

export type MerchantSettlementRecord = {
  id: string;
  merchant?: string;
  payment?: string | null;
  order?: string | null;
  payment_reference?: string;
  order_number?: string;
  provider?: string;
  status?: string;
  gross_amount?: string;
  processor_fee_amount?: string;
  platform_fee_amount?: string;
  payout_fee_amount?: string;
  reserve_amount?: string;
  refund_amount?: string;
  dispute_amount?: string;
  net_amount?: string;
  reserve_percent_snapshot?: string;
  settlement_delay_days_snapshot?: number;
  base_currency?: string;
  charge_currency?: string;
  settlement_currency?: string;
  hold_until?: string | null;
  eligible_at?: string | null;
  scheduled_at?: string | null;
  paid_out_at?: string | null;
  last_synced_at?: string | null;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type MerchantPayoutEntry = {
  id: string;
  payout_batch?: string;
  settlement_record?: MerchantSettlementRecord;
  amount?: string;
  currency?: string;
  status?: string;
  external_reference?: string;
  failure_reason?: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type MerchantPayoutAttempt = {
  id: string;
  payout_batch?: string;
  status?: string;
  request_payload?: Record<string, unknown>;
  response_payload?: Record<string, unknown>;
  response_status_code?: number | null;
  failure_message?: string;
  processed_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type MerchantPayoutBatch = {
  id: string;
  merchant?: string;
  batch_reference: string;
  status?: string;
  settlement_currency?: string;
  total_records_count?: number;
  total_gross_amount?: string;
  total_net_amount?: string;
  total_reserve_amount?: string;
  total_refund_amount?: string;
  total_dispute_amount?: string;
  scheduled_for?: string | null;
  processed_at?: string | null;
  failed_at?: string | null;
  cancelled_at?: string | null;
  notes?: string;
  metadata?: Record<string, unknown>;
  entries?: MerchantPayoutEntry[];
  attempts?: MerchantPayoutAttempt[];
  created_at?: string;
  updated_at?: string;
};

export type MerchantSettlementSummary = {
  overall?: {
    count?: number;
    gross_amount?: string;
    net_amount?: string;
    reserve_amount?: string;
    refund_amount?: string;
    dispute_amount?: string;
  };
  eligible_for_payout?: {
    count?: number;
    net_amount?: string;
  };
  by_status?: Record<
    string,
    {
      count?: number;
      gross_amount?: string;
      net_amount?: string;
      reserve_amount?: string;
      refund_amount?: string;
      dispute_amount?: string;
    }
  >;
};

export type MerchantMembershipUser = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  role?: string;
};

export type MerchantMembership = {
  id: string;
  user?: MerchantMembershipUser;
  role?: string;
  status?: string;
  joined_at?: string | null;
  created_at?: string;
  updated_at?: string;
};