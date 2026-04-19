export default function MerchantDashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="h-[180px] animate-pulse rounded-[30px] border border-white/10 bg-white/[0.03]" />

      <div className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[180px] animate-pulse rounded-[24px] border border-white/10 bg-white/[0.03]"
              />
            ))}
          </div>

          <div className="h-[280px] animate-pulse rounded-[30px] border border-white/10 bg-white/[0.03]" />
        </div>

        <div className="space-y-6">
          <div className="h-[220px] animate-pulse rounded-[30px] border border-white/10 bg-white/[0.03]" />
          <div className="h-[220px] animate-pulse rounded-[30px] border border-white/10 bg-white/[0.03]" />
        </div>
      </div>
    </div>
  );
}