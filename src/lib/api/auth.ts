import { apiClient, extractApiErrorMessage } from "@/lib/api/axios";
import { env } from "@/lib/config/env";
import type {
  ApiEnvelope,
  AuthUser,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "@/types/auth";

type LoginResponseData = {
  user: AuthUser;
  auth?: {
    access_token?: string;
    token_type?: string;
  };
};

const unwrapData = <T>(payload: ApiEnvelope<T> | T): T => {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in (payload as Record<string, unknown>)
  ) {
    return (payload as ApiEnvelope<T>).data as T;
  }

  return payload as T;
};

const getMessage = (
  payload: ApiEnvelope<unknown> | undefined,
  fallback: string,
) => payload?.message || payload?.detail || fallback;

export const authApi = {
  async me(): Promise<AuthUser> {
    try {
      const { data } = await apiClient.get<ApiEnvelope<AuthUser>>(env.api.auth.me);
      return unwrapData<AuthUser>(data);
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "Unable to load your session."));
    }
  },

  async login(payload: LoginPayload): Promise<AuthUser> {
    try {
      await apiClient.post<ApiEnvelope<LoginResponseData>>(env.api.auth.login, payload);
      return await this.me();
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "Unable to log in."));
    }
  },

  async register(
    payload: RegisterPayload,
  ): Promise<{ user: AuthUser | null; message: string }> {
    try {
      const { data } = await apiClient.post<ApiEnvelope<LoginResponseData>>(
        env.api.auth.register,
        payload,
      );

      const message = getMessage(
        data,
        "Account created successfully.",
      );

      try {
        const user = await this.me();
        return { user, message };
      } catch {
        return { user: null, message };
      }
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "Unable to create your account."));
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post<ApiEnvelope<null>>(env.api.auth.logout, {});
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "Unable to log out."));
    }
  },

  async forgotPassword(payload: ForgotPasswordPayload): Promise<string> {
    try {
      const { data } = await apiClient.post<ApiEnvelope<null>>(
        env.api.auth.forgotPassword,
        payload,
      );

      return getMessage(
        data,
        "If an account with that email exists, a password reset email has been sent.",
      );
    } catch (error) {
      throw new Error(
        extractApiErrorMessage(error, "Unable to start password reset."),
      );
    }
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<string> {
    try {
      const { data } = await apiClient.post<ApiEnvelope<null>>(
        env.api.auth.resetPassword,
        payload,
      );

      return getMessage(
        data,
        "Password reset successful. You can now log in.",
      );
    } catch (error) {
      throw new Error(extractApiErrorMessage(error, "Unable to reset password."));
    }
  },
};