export type UserRole =
  | "customer"
  | "merchant_owner"
  | "merchant_staff"
  | "support_agent"
  | "finance_admin"
  | "platform_admin";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export type AuthUser = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  full_name?: string;
  short_name?: string;
  phone_number?: string;
  role: UserRole;
  is_active?: boolean;
  is_email_verified?: boolean;
  is_phone_verified?: boolean;
  preferred_timezone?: string;
  preferred_locale?: string;
  last_seen_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  detail?: string;
  data?: T;
  errors?: Record<string, string[] | string>;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
  display_name?: string;
  phone_number?: string;
  role: "customer" | "merchant_owner";
  preferred_timezone?: string;
  preferred_locale?: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  uid: string;
  token: string;
  new_password: string;
  new_password_confirm: string;
};

export type ChangePasswordPayload = {
  current_password: string;
  new_password: string;
  new_password_confirm: string;
};

export type AuthContextValue = {
  user: AuthUser | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshUser: () => Promise<AuthUser | null>;
  login: (payload: LoginPayload) => Promise<AuthUser>;
  signUp: (
    payload: RegisterPayload,
  ) => Promise<{ user: AuthUser | null; message: string }>;
  signOut: () => Promise<void>;
  forgotPassword: (payload: ForgotPasswordPayload) => Promise<string>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<string>;
  clearUser: () => void;
};

export type ApiErrorShape = {
  detail?: string;
  message?: string;
  errors?: Record<string, string[] | string>;
  [key: string]: unknown;
};