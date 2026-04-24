"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AUTH_EXPIRED_EVENT } from "@/lib/api/axios";
import { authApi } from "@/lib/api/auth";
import type {
  AuthContextValue,
  AuthStatus,
  AuthUser,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "@/types/auth";

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  const clearUser = useCallback(() => {
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  const refreshUser = useCallback(async (): Promise<AuthUser | null> => {
    try {
      const nextUser = await authApi.me();
      setUser(nextUser);
      setStatus("authenticated");
      return nextUser;
    } catch {
      setUser(null);
      setStatus("unauthenticated");
      return null;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      const user = await refreshUser();
      if (!mounted) return;
    };

    run();

    return () => {
      mounted = false;
    };
  }, [refreshUser]);

  useEffect(() => {
    const handleAuthExpired = () => {
      clearUser();
    };

    window.addEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);

    return () => {
      window.removeEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
    };
  }, [clearUser]);

  const login = useCallback(async (payload: LoginPayload) => {
    setStatus("loading");
    const nextUser = await authApi.login(payload);
    setUser(nextUser);
    setStatus("authenticated");
    return nextUser;
  }, []);

  const signUp = useCallback(async (payload: RegisterPayload) => {
    setStatus("loading");
    const result = await authApi.register(payload);

    if (result.user) {
      setUser(result.user);
      setStatus("authenticated");
    } else {
      setUser(null);
      setStatus("unauthenticated");
    }

    return result;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      clearUser();
    }
  }, [clearUser]);

  const forgotPassword = useCallback(
    async (payload: ForgotPasswordPayload) => authApi.forgotPassword(payload),
    [],
  );

  const resetPassword = useCallback(
    async (payload: ResetPasswordPayload) => authApi.resetPassword(payload),
    [],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      isAuthenticated: status === "authenticated" && !!user,
      isLoading: status === "loading",
      refreshUser,
      login,
      signUp,
      signOut,
      forgotPassword,
      resetPassword,
      clearUser,
    }),
    [
      user,
      status,
      refreshUser,
      login,
      signUp,
      signOut,
      forgotPassword,
      resetPassword,
      clearUser,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}