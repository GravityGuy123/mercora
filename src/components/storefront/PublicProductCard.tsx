import Link from "next/link";
import type { PublicProduct, PublicProductVariant } from "@/types/catalog";

type PublicProductCardProps = {
  storeSlug: string;
  product: PublicProduct;
};

function pickDefaultVariant(product: PublicProduct): PublicProductVariant | null {
  if (!product.variants.length) {
    return null;
  }

  return (
    product.variants.find((variant) => variant.is_default) ??
    product.variants[0] ??
    null
  );
}

function resolveDisplayPrice(product: PublicProduct) {
  const variant = pickDefaultVariant(product);

  return {
    amount: variant?.effective_price_amount || product.base_price_amount,
    compareAt:
      variant?.effective_compare_at_price_amount || product.compare_at_price_amount,
  };
}

function formatMoney(amount: string, currency: string) {
  const numeric = Number(amount);

  if (!Number.isFinite(numeric)) {
    return `${currency} ${amount}`;
  }

  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(numeric);
  } catch {
    return `${currency} ${numeric.toFixed(2)}`;
  }
}

function resolveStockLabel(product: PublicProduct) {
  const variant = pickDefaultVariant(product);

  if (variant) {
    if (!variant.track_inventory) return "Available";
    if (variant.allow_backorders && variant.inventory_quantity <= 0) {
      return "Backorder available";
    }
    if (variant.inventory_quantity <= 0) return "Out of stock";
    if (variant.inventory_quantity <= product.low_stock_threshold) {
      return "Low stock";
    }
    return "In stock";
  }

  if (!product.track_inventory) return "Available";
  if (product.allow_backorders && product.inventory_quantity <= 0) {
    return "Backorder available";
  }
  if (product.inventory_quantity <= 0) return "Out of stock";
  if (product.inventory_quantity <= product.low_stock_threshold) {
    return "Low stock";
  }

  return "In stock";
}

export default function PublicProductCard({
  storeSlug,
  product,
}: PublicProductCardProps) {
  const primaryMedia =
    product.media_items.find((item) => item.is_primary) ??
    [...product.media_items].sort((a, b) => a.sort_order - b.sort_order)[0] ??
    null;

  const { amount, compareAt } = resolveDisplayPrice(product);
  const stockLabel = resolveStockLabel(product);

  return (
    <article className="group overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.72),rgba(8,12,28,0.94))] shadow-[0_18px_50px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:border-indigo-500/20 hover:shadow-[0_24px_60px_rgba(0,0,0,0.26)]">
      <Link href={`/_stores/${storeSlug}/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-white/[0.03]">
          {primaryMedia ? (
            <img
              src={primaryMedia.file_url}
              alt={primaryMedia.alt_text || product.name}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              No image
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,24,0.02),rgba(4,10,24,0.26))]" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {product.is_featured ? (
              <span className="rounded-full border border-indigo-500/20 bg-indigo-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-indigo-100">
                Featured
              </span>
            ) : null}

            {product.category ? (
              <span className="rounded-full border border-white/10 bg-[rgba(4,10,24,0.6)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-200">
                {product.category.name}
              </span>
            ) : null}
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-xl font-semibold tracking-[-0.03em] text-white">
                {product.name}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-300">
                {product.short_description?.trim() ||
                  product.description?.trim() ||
                  "Product details available on the product page."}
              </p>
            </div>

            <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-300">
              {product.product_type}
            </div>
          </div>

          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <div className="text-lg font-bold text-white">
                {formatMoney(amount, product.base_currency)}
              </div>

              {compareAt ? (
                <div className="mt-1 text-sm text-slate-500 line-through">
                  {formatMoney(compareAt, product.base_currency)}
                </div>
              ) : null}
            </div>

            <div className="text-right">
              <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
                Status
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-200">
                {stockLabel}
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/8 pt-4">
            <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
              {product.variants.length > 0
                ? `${product.variants.length} variant${product.variants.length === 1 ? "" : "s"}`
                : product.sku
                ? `SKU ${product.sku}`
                : "Product"}
            </div>

            <span className="text-sm font-semibold text-white transition group-hover:text-indigo-200">
              View product
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}