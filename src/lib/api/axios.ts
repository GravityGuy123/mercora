import axios, {
  AxiosError,
  AxiosHeaders,
  type InternalAxiosRequestConfig,
} from "axios";
import { env } from "@/lib/config/env";
import type { ApiErrorShape } from "@/types/auth";

export const AUTH_EXPIRED_EVENT = "mercora:auth-expired";

type RetryableConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const unsafeMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);

const authPathsToSkipRefresh = [
  env.api.auth.login,
  env.api.auth.register,
  env.api.auth.logout,
  env.api.auth.refresh,
  env.api.auth.forgotPassword,
  env.api.auth.resetPassword,
];

const readBrowserCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const escaped = name.replace(/[$()*+.?[\\\]^{|}]/g, "\\$&");
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${escaped}=([^;]*)`),
  );

  return match ? decodeURIComponent(match[1]) : null;
};

const ensureAxiosHeaders = (
  config: InternalAxiosRequestConfig,
): AxiosHeaders => {
  if (!(config.headers instanceof AxiosHeaders)) {
    config.headers = new AxiosHeaders(config.headers ?? {});
  }

  return config.headers;
};

const setHeader = (
  config: InternalAxiosRequestConfig,
  name: string,
  value: string,
) => {
  const headers = ensureAxiosHeaders(config);
  headers.set(name, value);
};

const isUnsafeMethod = (config: InternalAxiosRequestConfig) => {
  const method = config.method?.toUpperCase() ?? "GET";
  return unsafeMethods.has(method);
};

const isRefreshableRequest = (url?: string) => {
  if (!url) return true;
  return !authPathsToSkipRefresh.some((path) => url.includes(path));
};

let refreshPromise: Promise<void> | null = null;

const refreshSession = async () => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const csrfToken = readBrowserCookie(env.csrfCookieName);

      await axios.post(
        `${env.apiUrl}${env.api.auth.refresh}`,
        {},
        {
          withCredentials: true,
          timeout: env.requestTimeoutMs,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(csrfToken ? { [env.csrfHeaderName]: csrfToken } : {}),
          },
        },
      );
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: env.requestTimeoutMs,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  if (isUnsafeMethod(config)) {
    const csrfToken = readBrowserCookie(env.csrfCookieName);

    if (csrfToken) {
      setHeader(config, env.csrfHeaderName, csrfToken);
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorShape>) => {
    const originalRequest = error.config as RetryableConfig | undefined;
    const status = error.response?.status;

    if (
      !originalRequest ||
      status !== 401 ||
      originalRequest._retry ||
      !isRefreshableRequest(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    try {
      originalRequest._retry = true;
      await refreshSession();
      return apiClient(originalRequest);
    } catch (refreshError) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
      }

      return Promise.reject(refreshError);
    }
  },
);

export const extractApiErrorMessage = (
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string => {
  if (axios.isAxiosError<ApiErrorShape>(error)) {
    const data = error.response?.data;

    if (typeof data?.detail === "string" && data.detail.trim()) {
      return data.detail;
    }

    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }

    if (data?.errors && typeof data.errors === "object") {
      const firstValue = Object.values(data.errors)[0];

      if (Array.isArray(firstValue) && firstValue.length > 0) {
        return String(firstValue[0]);
      }

      if (typeof firstValue === "string" && firstValue.trim()) {
        return firstValue;
      }
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
};