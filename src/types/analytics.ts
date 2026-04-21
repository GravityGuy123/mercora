export type MerchantDashboardSummary = {
  period?: {
    days?: number;
    start_at?: string;
    end_at?: string;
  };
  orders?: {
    total_orders?: number;
    paid_orders?: number;
    fulfilled_orders?: number;
    cancelled_orders?: number;
    gross_order_amount?: string;
    average_order_value?: string;
  };
  payments?: {
    successful_payments?: number;
    successful_payment_amount?: string;
    refunded_amount?: string;
    disputed_amount?: string;
  };
  settlements?: {
    eligible_count?: number;
    eligible_net_amount?: string;
    on_hold_count?: number;
    on_hold_net_amount?: string;
    paid_out_count?: number;
    paid_out_net_amount?: string;
  };
  receipts?: {
    issued_receipts?: number;
  };
  marketing?: {
    active_coupons?: number;
    active_promotions?: number;
    discount_previews?: number;
    discount_applied?: number;
  };
  support?: {
    total_tickets?: number;
    open_tickets?: number;
    urgent_tickets?: number;
  };
  notifications?: {
    unread_notifications?: number;
  };
  subscription?: {
    has_current_subscription?: boolean;
    current_plan_code?: string;
    current_plan_name?: string;
    status?: string;
    current_period_end_at?: string | null;
  };
  currency?: string;
};

export type MerchantSalesTimeseriesPoint = {
  date: string;
  order_count: number;
  gross_amount: string;
  successful_order_count: number;
  successful_order_amount: string;
};

export type MerchantSalesTimeseries = {
  period?: {
    days?: number;
    start_at?: string;
    end_at?: string;
  };
  currency?: string;
  points?: MerchantSalesTimeseriesPoint[];
};

export type MerchantTopProduct = {
  product_id?: string | null;
  product_name?: string;
  product_slug?: string;
  quantity_sold?: number;
  order_count?: number;
  revenue_amount?: string;
};

export type MerchantTopProducts = {
  period?: {
    days?: number;
    start_at?: string;
    end_at?: string;
  };
  currency?: string;
  products?: MerchantTopProduct[];
};

export type MerchantOperationsSummary = {
  period?: {
    days?: number;
    start_at?: string;
    end_at?: string;
  };
  support?: {
    open_tickets?: number;
    resolved_tickets?: number;
    closed_tickets?: number;
    urgent_open_tickets?: number;
    recent_tickets?: Array<{
      id: string;
      ticket_number: string;
      subject: string;
      priority: string;
      status: string;
      last_activity_at?: string | null;
    }>;
  };
  payouts?: {
    scheduled_batches?: number;
    processing_batches?: number;
    paid_out_batches?: number;
    failed_batches?: number;
  };
  notifications?: {
    unread_notifications?: number;
    archived_notifications?: number;
  };
  currency?: string;
};

export type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  detail?: string;
  data?: T;
};