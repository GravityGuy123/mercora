export type NotificationSummary = {
  total_count?: number;
  unread_count?: number;
  archived_count?: number;
  by_category?: Record<
    string,
    {
      total?: number;
      unread?: number;
    }
  >;
};

export type NotificationPreference = {
  id: string;
  merchant: string;
  user: string;
  category: string;
  is_enabled: boolean;
  channel_in_app: boolean;
  channel_email: boolean;
  frequency: string;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type NotificationDelivery = {
  id: string;
  channel: string;
  status: string;
  recipient_address?: string;
  subject_snapshot?: string;
  body_snapshot?: string;
  provider?: string;
  provider_message_id?: string;
  error_message?: string;
  attempted_at?: string | null;
  delivered_at?: string | null;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

export type NotificationRecord = {
  id: string;
  merchant: string;
  recipient_user?: string | null;
  recipient_customer?: string | null;
  category: string;
  event_type: string;
  severity: string;
  title: string;
  body?: string;
  send_in_app?: boolean;
  send_email?: boolean;
  email_to?: string;
  event_key?: string | null;
  order?: string | null;
  payment?: string | null;
  settlement_record?: string | null;
  receipt?: string | null;
  subscription?: string | null;
  support_ticket?: string | null;
  read_at?: string | null;
  archived_at?: string | null;
  metadata?: Record<string, unknown>;
  deliveries?: NotificationDelivery[];
  created_at?: string;
  updated_at?: string;
};

export type NotificationListResponse = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: NotificationRecord[];
};

export type NotificationPreferenceUpdateItem = {
  category: string;
  is_enabled?: boolean;
  channel_in_app?: boolean;
  channel_email?: boolean;
  frequency?: string;
  metadata?: Record<string, unknown>;
};

export type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  detail?: string;
  data?: T;
};