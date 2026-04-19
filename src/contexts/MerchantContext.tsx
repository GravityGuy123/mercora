"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { merchantsApi } from "@/lib/api/merchants";
import { useAuth } from "@/hooks/use-auth";
import type {
  Merchant,
  MerchantContextValue,
  MerchantCreatePayload,
} from "@/types/merchant";

export const MerchantContext = createContext<MerchantContextValue | undefined>(
  undefined,
);

type MerchantProviderProps = {
  children: ReactNode;
};

export function MerchantProvider({ children }: MerchantProviderProps) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [activeMerchantId, setActiveMerchantIdState] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const clearMerchants = useCallback(() => {
    setMerchants([]);
    setActiveMerchantIdState(null);
    setError("");
    setIsLoading(false);
  }, []);

  const refreshMerchants = useCallback(async (): Promise<Merchant[]> => {
    setError("");

    try {
      const nextMerchants = await merchantsApi.list();
      setMerchants(nextMerchants);

      setActiveMerchantIdState((current) => {
        if (!nextMerchants.length) return null;
        if (current && nextMerchants.some((merchant) => merchant.id === current)) {
          return current;
        }
        return nextMerchants[0].id;
      });

      return nextMerchants;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to load merchants.";
      setError(message);
      throw err;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      if (authLoading) return;

      if (!isAuthenticated) {
        if (!mounted) return;
        clearMerchants();
        return;
      }

      if (mounted) {
        setIsLoading(true);
      }

      try {
        await refreshMerchants();
      } catch {
        // error is already handled in refreshMerchants
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void run();

    return () => {
      mounted = false;
    };
  }, [authLoading, clearMerchants, isAuthenticated, refreshMerchants]);

  const setActiveMerchantId = useCallback(
    (merchantId: string) => {
      setActiveMerchantIdState((current) => {
        if (!merchants.some((merchant) => merchant.id === merchantId)) {
          return current;
        }
        return merchantId;
      });
    },
    [merchants],
  );

  const createMerchant = useCallback(
    async (payload: MerchantCreatePayload) => {
      const createdMerchant = await merchantsApi.create(payload);

      setMerchants((current) => [createdMerchant, ...current]);
      setActiveMerchantIdState(createdMerchant.id);
      setError("");

      return createdMerchant;
    },
    [],
  );

  const updateMerchantInState = useCallback((merchant: Merchant) => {
    setMerchants((current) =>
      current.map((item) => (item.id === merchant.id ? merchant : item)),
    );
  }, []);

  const activeMerchant = useMemo(
    () =>
      merchants.find((merchant) => merchant.id === activeMerchantId) ?? null,
    [activeMerchantId, merchants],
  );

  const value = useMemo<MerchantContextValue>(
    () => ({
      merchants,
      activeMerchant,
      activeMerchantId,
      isLoading,
      error,
      refreshMerchants,
      setActiveMerchantId,
      createMerchant,
      updateMerchantInState,
      clearMerchants,
    }),
    [
      merchants,
      activeMerchant,
      activeMerchantId,
      isLoading,
      error,
      refreshMerchants,
      setActiveMerchantId,
      createMerchant,
      updateMerchantInState,
      clearMerchants,
    ],
  );

  return (
    <MerchantContext.Provider value={value}>
      {children}
    </MerchantContext.Provider>
  );
}