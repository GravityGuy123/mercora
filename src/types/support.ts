export type SupportUserSummary = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  role?: string;
};

export type SupportCustomerSummary = {
  id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  phone_number?: string;
};

export type SupportMessage = {
  id: string;
  ticket: string;
  author_type: string;
  author_user?: SupportUserSummary | null;
  author_customer?: SupportCustomerSummary | null;
  author_name?: string;
  author_email?: string;
  body: string;
  is_internal?: boolean;
  attachments?: Array<Record<string, unknown>>;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type SupportTicket = {
  id: string;
  merchant: string;
  customer?: SupportCustomerSummary | null;
  created_by_user?: SupportUserSummary | null;
  assigned_to?: SupportUserSummary | null;
  order?: string | null;
  payment?: string | null;
  settlement_record?: string | null;
  receipt?: string | null;
  subscription?: string | null;
  ticket_number: string;
  subject: string;
  description?: string;
  category: string;
  priority: string;
  status: string;
  source: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  first_response_at?: string | null;
  last_activity_at?: string | null;
  resolved_at?: string | null;
  closed_at?: string | null;
  metadata?: Record<string, unknown>;
  messages?: SupportMessage[];
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