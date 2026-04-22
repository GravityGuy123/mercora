"use client";

import { useEffect, useMemo, useState } from "react";
import { Boxes, Loader2 } from "lucide-react";
import { apiClient, extractApiErrorMessage } from "@/lib/api/axios";
import { useMerchant } from "@/hooks/use-merchant";

type Product = {
  id: string;
  name: string;
  status: string;
  inventory_quantity?: number;
  low_stock_threshold?: number;
  track_inventory?: boolean;
  allow_backorders?: boolean;
};

type ProductListResponse = {
  results?: Product[];
};

export default function MerchantCatalogInventoryPage() {
  const { activeMerchant } = useMerchant();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    if (!activeMerchant) return;

    setError("");
    setIsLoading(true);

    try {
      const { data } = await apiClient.get<ProductListResponse>(
        `/api/catalog/merchants/${activeMerchant.id}/products/`,
      );
      setProducts(data.results || []);
    } catch (err) {
      setError(extractApiErrorMessage(err, "Unable to load inventory."));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!activeMerchant) {
      setIsLoading(false);
      return;
    }
    void load();
  }, [activeMerchant]);

  const lowStock = useMemo(
    () =>
      products.filter(
        (item) =>
          item.track_inventory &&
          (item.inventory_quantity ?? 0) <= (item.low_stock_threshold ?? 0),
      ),
    [products],
  );

  if (!activeMerchant) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-12 text-center text-slate-300">
        Select a merchant before opening inventory.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
        <p className="mt-4 text-sm text-slate-300">Loading inventory...</p>
      </div>
    );
  }

  return (
    <main className="space-y-6">
      <section className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.78),rgba(8,12,28,0.96))] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
          <Boxes className="h-4 w-4" />
          Inventory
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
          Inventory overview
        </h1>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4 text-white">
            Total products: {products.length}
          </div>
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4 text-white">
            Inventory-tracked: {products.filter((item) => item.track_inventory).length}
          </div>
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4 text-white">
            Low stock: {lowStock.length}
          </div>
        </div>
      </section>

      {error ? (
        <div className="rounded-[18px] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </div>
      ) : null}

      <section className="space-y-4">
        {products.length === 0 ? (
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-12 text-center text-slate-300">
            No inventory records yet.
          </div>
        ) : (
          products.map((product) => {
            const isLow =
              product.track_inventory &&
              (product.inventory_quantity ?? 0) <= (product.low_stock_threshold ?? 0);

            return (
              <div
                key={product.id}
                className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.66),rgba(8,12,28,0.94))] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-300">
                    {product.status}
                  </span>
                  {isLow ? (
                    <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-red-100">
                      Low stock
                    </span>
                  ) : null}
                </div>

                <div className="mt-4 text-xl font-semibold text-white">{product.name}</div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white">
                    Quantity: {product.inventory_quantity ?? 0}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white">
                    Threshold: {product.low_stock_threshold ?? 0}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white">
                    Track inventory: {product.track_inventory ? "Yes" : "No"}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white">
                    Backorders: {product.allow_backorders ? "Allowed" : "Blocked"}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
    </main>
  );
}