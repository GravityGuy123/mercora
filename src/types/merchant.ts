export type MerchantBusinessType =
  | "individual"
  | "registered_business"
  | "non_profit"
  | "other";

export type MerchantStatus =
  | "draft"
  | "pending_review"
  | "active"
  | "suspended"
  | "rejected"
  | "inactive";

export type MerchantOnboardingStatus =
  | "not_started"
  | "in_progress"
  | "submitted"
  | "approved"
  | "blocked";

export type MerchantMembershipRole =
  | "owner"
  | "admin"
  | "operations"
  | "finance"
  | "support"
  | "viewer";

export type MerchantMembershipStatus =
  | "invited"
  | "active"
  | "suspended"
  | "revoked";

export type MerchantKycStatus =
  | "unsubmitted"
  | "pending_review"
  | "needs_action"
  | "verified"
  | "rejected";

export type MerchantPayoutStatus =
  | "unconfigured"
  | "pending_review"
  | "active"
  | "paused"
  | "rejected";

export type MerchantPayoutMethod =
  | "bank_transfer"
  | "mobile_money"
  | "manual";

export type MerchantProvider = "flutterwave" | "paystack" | "opay";

export type MerchantOwnerSummary = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  role: string;
};

export type Merchant = {
  id: string;
  owner: MerchantOwnerSummary;
  legal_business_name: string;
  public_display_name: string;
  business_type: MerchantBusinessType;
  support_email: string;
  support_phone_number: string;
  country_code: string;
  base_currency: string;
  default_settlement_currency: string;
  description: string;
  allows_direct_local_payments: boolean;
  allows_platform_managed_payments: boolean;
  status: MerchantStatus;
  onboarding_status: MerchantOnboardingStatus;
  onboarding_completed_steps: string[];
  onboarding_submitted_at: string | null;
  activated_at: string | null;
  suspended_at: string | null;
  rejection_reason: string;
  metadata: Record<string, unknown>;
  kyc_status: MerchantKycStatus | null;
  payout_status: MerchantPayoutStatus | null;
  enabled_providers: MerchantProvider[];
  created_at: string;
  updated_at: string;
};

export type MerchantCreatePayload = {
  legal_business_name: string;
  public_display_name: string;
  business_type: MerchantBusinessType;
  support_email?: string;
  support_phone_number?: string;
  country_code: string;
  base_currency: string;
  default_settlement_currency?: string;
  description?: string;
  allows_direct_local_payments?: boolean;
  allows_platform_managed_payments?: boolean;
  metadata?: Record<string, unknown>;
};

export type MerchantUpdatePayload = Partial<MerchantCreatePayload>;

export type MerchantKycProfile = {
  id: string;
  status: MerchantKycStatus;
  business_registration_number: string;
  tax_identification_number: string;
  contact_person_name: string;
  contact_person_role: string;
  submitted_at: string | null;
  reviewed_at: string | null;
  rejection_reason: string;
  document_metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type MerchantKycPayload = {
  business_registration_number?: string;
  tax_identification_number?: string;
  contact_person_name?: string;
  contact_person_role?: string;
  document_metadata?: Record<string, unknown>;
  rejection_reason?: string;
  submit_for_review?: boolean;
};

export type MerchantPayoutSettings = {
  id: string;
  status: MerchantPayoutStatus;
  payout_method: MerchantPayoutMethod;
  account_name: string;
  bank_name: string;
  bank_code: string;
  account_number: string;
  mobile_money_provider: string;
  mobile_money_number: string;
  payout_country_code: string;
  payout_currency: string;
  direct_payment_instructions: string;
  settlement_delay_days: number;
  reserve_percent: string;
  minimum_payout_amount: string;
  reviewed_at: string | null;
  rejection_reason: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type MerchantPayoutPayload = {
  payout_method?: MerchantPayoutMethod;
  account_name?: string;
  bank_name?: string;
  bank_code?: string;
  account_number?: string;
  mobile_money_provider?: string;
  mobile_money_number?: string;
  payout_country_code?: string;
  payout_currency?: string;
  direct_payment_instructions?: string;
  settlement_delay_days?: number;
  reserve_percent?: string;
  minimum_payout_amount?: string;
  metadata?: Record<string, unknown>;
  submit_for_review?: boolean;
};

export type MerchantProviderSetting = {
  id: string;
  provider: MerchantProvider;
  is_enabled: boolean;
  is_visible_at_checkout: boolean;
  is_eligible: boolean;
  supported_charge_currencies: string[];
  admin_override_reason: string;
  notes: string;
  created_at: string;
  updated_at: string;
};

export type MerchantProviderSettingsBulkPayload = {
  settings: Array<{
    provider: MerchantProvider;
    is_enabled?: boolean;
    is_visible_at_checkout?: boolean;
    supported_charge_currencies?: string[];
    notes?: string;
  }>;
};

export type MerchantMembership = {
  id: string;
  user: MerchantOwnerSummary;
  role: MerchantMembershipRole;
  status: MerchantMembershipStatus;
  joined_at: string | null;
  created_at: string;
  updated_at: string;
};

export type MerchantMembershipCreatePayload = {
  email: string;
  role: Exclude<MerchantMembershipRole, "owner">;
};

export type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  detail?: string;
  data?: T;
  errors?: Record<string, string[] | string>;
};

export type MerchantContextValue = {
  merchants: Merchant[];
  activeMerchant: Merchant | null;
  activeMerchantId: string | null;
  isLoading: boolean;
  error: string;
  refreshMerchants: () => Promise<Merchant[]>;
  setActiveMerchantId: (merchantId: string) => void;
  createMerchant: (payload: MerchantCreatePayload) => Promise<Merchant>;
  updateMerchantInState: (merchant: Merchant) => void;
  clearMerchants: () => void;
};