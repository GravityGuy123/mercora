"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";


import { useAuth } from "@/hooks/use-auth";
import { useMerchant } from "@/hooks/use-merchant";
import type {
  Storefront,
  StorefrontContextValue,
  StorefrontCreatePayload,
  StorefrontDomainPayload,
  StorefrontDomainResponse,
  StorefrontUpdatePayload,
} from "@/types/storefront";

import { storefrontsApi } from "@/lib/api/storefronts";

export const StorefrontContext = createContext<
  StorefrontContextValue | undefined
>(undefined);

type StorefrontProviderProps = {
  children: ReactNode;
};

export function StorefrontProvider({ children }: StorefrontProviderProps) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { activeMerchant } = useMerchant();

  const [storefronts, setStorefronts] = useState<Storefront[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const clearStorefronts = useCallback(() => {
    setStorefronts([]);
    setError("");
    setIsLoading(false);
  }, []);

  const refreshStorefronts = useCallback(async (): Promise<Storefront[]> => {
    setError("");

    try {
      const nextStorefronts = await storefrontsApi.list();
      setStorefronts(nextStorefronts);
      return nextStorefronts;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to load storefronts.";
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
        clearStorefronts();
        return;
      }

      if (mounted) {
        setIsLoading(true);
      }

      try {
        await refreshStorefronts();
      } catch {
        // handled in refreshStorefronts
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
  }, [authLoading, clearStorefronts, isAuthenticated, refreshStorefronts]);

  const activeStorefront = useMemo(() => {
    if (!activeMerchant) return null;

    return (
      storefronts.find(
        (storefront) => storefront.merchant_id === activeMerchant.id,
      ) ?? null
    );
  }, [activeMerchant, storefronts]);

  const updateStorefrontInState = useCallback((storefront: Storefront) => {
    setStorefronts((current) => {
      const existing = current.some((item) => item.id === storefront.id);

      if (existing) {
        return current.map((item) =>
          item.id === storefront.id ? storefront : item,
        );
      }

      return [storefront, ...current];
    });
  }, []);

  const createStorefront = useCallback(
    async (payload: StorefrontCreatePayload) => {
      const created = await storefrontsApi.create(payload);

      setStorefronts((current) => {
        const filtered = current.filter(
          (item) =>
            item.id !== created.id && item.merchant_id !== created.merchant_id,
        );
        return [created, ...filtered];
      });

      setError("");
      return created;
    },
    [],
  );

  const updateStorefront = useCallback(
    async (storefrontId: string, payload: StorefrontUpdatePayload) => {
      const updated = await storefrontsApi.update(storefrontId, payload);
      updateStorefrontInState(updated);
      setError("");
      return updated;
    },
    [updateStorefrontInState],
  );

  const updateStorefrontDomain = useCallback(
    async (
      storefrontId: string,
      payload: StorefrontDomainPayload,
    ): Promise<StorefrontDomainResponse> => {
      const updated = await storefrontsApi.updateDomain(storefrontId, payload);

      setStorefronts((current) =>
        current.map((item) =>
          item.id === storefrontId
            ? {
                ...item,
                custom_domain: updated.custom_domain,
                domain_status: updated.domain_status,
                domain_verification_token: updated.domain_verification_token,
                domain_last_checked_at: updated.domain_last_checked_at,
                domain_verified_at: updated.domain_verified_at,
                slug: updated.slug,
                subdomain: updated.subdomain,
              }
            : item,
        ),
      );

      setError("");
      return updated;
    },
    [],
  );

  const publishStorefront = useCallback(async (storefrontId: string) => {
    const updated = await storefrontsApi.publish(storefrontId);
    updateStorefrontInState(updated);
    setError("");
    return updated;
  }, [updateStorefrontInState]);

  const unpublishStorefront = useCallback(async (storefrontId: string) => {
    const updated = await storefrontsApi.unpublish(storefrontId);
    updateStorefrontInState(updated);
    setError("");
    return updated;
  }, [updateStorefrontInState]);

  const value = useMemo<StorefrontContextValue>(
    () => ({
      storefronts,
      activeStorefront,
      isLoading,
      error,
      refreshStorefronts,
      createStorefront,
      updateStorefront,
      updateStorefrontDomain,
      publishStorefront,
      unpublishStorefront,
      updateStorefrontInState,
      clearStorefronts,
    }),
    [
      storefronts,
      activeStorefront,
      isLoading,
      error,
      refreshStorefronts,
      createStorefront,
      updateStorefront,
      updateStorefrontDomain,
      publishStorefront,
      unpublishStorefront,
      updateStorefrontInState,
      clearStorefronts,
    ],
  );

  return (
    <StorefrontContext.Provider value={value}>
      {children}
    </StorefrontContext.Provider>
  );
}