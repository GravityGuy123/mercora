export type CustomerStatus =
  | "lead"
  | "active"
  | "inactive"
  | "blocked"
  | "archived"
  | string;

export type CustomerSource =
  | "storefront"
  | "manual"
  | "import"
  | "admin"
  | string;

export type CustomerAddress = {
  id: string;
  label?: string;
  address_type?: string;
  recipient_name?: string;
  phone_number?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state_region?: string;
  postal_code?: string;
  country_code?: string;
  is_default_shipping?: boolean;
  is_default_billing?: boolean;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
};

export type Customer = {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  full_name?: string;
  phone_number?: string;
  status?: CustomerStatus;
  source?: CustomerSource;
  is_guest?: boolean;
  marketing_opt_in?: boolean;
  notes?: string;
  metadata?: Record<string, unknown>;
  total_orders_count?: number;
  total_spent_amount?: string;
  average_order_value_amount?: string;
  last_order_at?: string | null;
  created_at?: string;
  updated_at?: string;
  default_shipping_address_id?: string | null;
  default_billing_address_id?: string | null;
  [key: string]: unknown;
};

export type CustomerListResponse = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: Customer[];
  data?: Customer[];
};

export type CustomerQuery = {
  q?: string;
  status?: string;
  source?: string;
  is_guest?: boolean;
};

export type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  detail?: string;
  data?: T;
  errors?: Record<string, string[] | string>;
};

export function getCustomerDisplayName(customer: Customer) {
  return (
    customer.display_name ||
    customer.full_name ||
    [customer.first_name, customer.last_name].filter(Boolean).join(" ").trim() ||
    customer.email ||
    "Customer"
  );
}