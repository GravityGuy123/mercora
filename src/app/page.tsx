import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CreditCard,
  Receipt,
  ShieldCheck,
  ShoppingBag,
  Store,
  Wallet,
} from "lucide-react";

const featureCards: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Create Storefronts",
    description: "Launch a beautiful online store in minutes. No coding needed.",
    icon: Store,
  },
  {
    title: "Manage Products & Orders",
    description: "Track inventory, manage orders, and fulfill with ease.",
    icon: ShoppingBag,
  },
  {
    title: "Accept Payments",
    description: "Collect payments securely with flexible options customers trust.",
    icon: CreditCard,
  },
  {
    title: "Send Receipts Automatically",
    description: "Build trust with instant, branded receipts for every payment.",
    icon: Receipt,
  },
  {
    title: "Track Settlements",
    description: "See what’s settled, what’s pending, and when you’ll get paid.",
    icon: Wallet,
  },
  {
    title: "Business Insights",
    description: "Understand what’s working with clear, actionable analytics.",
    icon: BarChart3,
  },
];

const partnerLogos = ["Flutterwave", "paystack", "Verve", "VISA", "Mastercard"];

const stats = [
  { label: "Active Merchants", value: "25,000+" },
  { label: "Orders Processed", value: "1.2M+" },
  { label: "Payments Tracked", value: "₦48B+" },
  { label: "African Markets", value: "15" },
];

const testimonials = [
  {
    quote:
      "Mercora brought everything together. I can sell, get paid, send receipts, and see my payouts clearly. It just works.",
    name: "Amina Yusuf",
    role: "Founder, Zuri & Co.",
    image: "/images/testimonials/amina-yusuf.webp",
    alt: "Portrait of Amina Yusuf",
  },
  {
    quote:
      "The receipts look professional and my customers trust me more. Settlements are clear and on time.",
    name: "Tunde Okafor",
    role: "CEO, TechMart NG",
    image: "/images/testimonials/tunde-okafor.webp",
    alt: "Portrait of Tunde Okafor",
  },
  {
    quote:
      "I used to juggle different tools. Now Mercora runs my business from storefront to settlement.",
    name: "Lilian Mwangi",
    role: "Owner, Lil’s Essentials",
    image: "/images/testimonials/lilian-mwangi.webp",
    alt: "Portrait of Lilian Mwangi",
  },
];

const featuredProducts = [
  {
    name: "Leather Shoes",
    price: "KSh 2,450",
    image: "/images/leather-shoes.webp",
    alt: "Premium leather shoes",
  },
  {
    name: "Craft Basket",
    price: "KSh 3,200",
    image: "/images/craft-basket.webp",
    alt: "Handwoven craft basket",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: "url('/images/hero.webp')",
              backgroundPosition: "86% 26%",
              filter: "brightness(1.12) contrast(1.08) saturate(1.1)",
              transform: "scale(1.02)",
            }}
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,10,24,0.96)_0%,rgba(4,10,24,0.84)_22%,rgba(4,10,24,0.34)_54%,rgba(4,10,24,0.40)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,24,0.05)_0%,rgba(4,10,24,0.32)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(91,61,245,0.10),transparent_28%),radial-gradient(circle_at_84%_22%,rgba(59,130,246,0.08),transparent_20%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-0 lg:pt-32">
          <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-2xl">
              <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
                Built for African Merchants
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.06] tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.65rem]">
                Storefronts, Payments & Receipts.
                <span className="block">All in One System.</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                Mercora is the commerce operating system that helps you sell online,
                manage orders, get paid, issue receipts, and track settlements with confidence.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex h-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#5b3df5_0%,#3b82f6_100%)] px-7 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(79,70,229,0.38)] transition hover:translate-y-[-1px]"
                >
                  Create Your Store
                </Link>

                <Link
                  href="#how-it-works"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/14 bg-white/[0.03] px-6 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/20">
                    <span className="ml-0.5 h-0 w-0 border-b-[5px] border-l-[8px] border-t-[5px] border-b-transparent border-l-white border-t-transparent" />
                  </span>
                  See How It Works
                </Link>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-slate-300">
                <ShieldCheck className="h-4 w-4 text-slate-300" />
                <span>No setup fees. Start free. Scale when you&apos;re ready.</span>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto flex max-w-[610px] items-end justify-end lg:min-h-[540px]">
                <div className="absolute right-[27%] top-0 z-10 hidden h-[520px] w-[320px] rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md lg:block" />

                <div className="relative z-20 grid w-full gap-4 md:grid-cols-[1.02fr_0.78fr] lg:max-w-[600px]">
                  <div className="space-y-4">
                    <div className="overflow-hidden rounded-[28px] border border-indigo-500/30 bg-[linear-gradient(180deg,rgba(20,12,40,0.92),rgba(14,13,28,0.96))] shadow-[0_20px_60px_rgba(91,61,245,0.22)]">
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold text-white">Zuri &amp; Co.</div>
                          <ShoppingBag className="h-4 w-4 text-slate-300" />
                        </div>

                        <div className="relative mt-5 overflow-hidden rounded-[24px]">
                          <div className="absolute inset-0">
                            <Image
                              src="/images/new-collection.webp"
                              alt="Zuri & Co. new collection hero image"
                              fill
                              priority
                              sizes="(max-width: 768px) 100vw, 320px"
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_38%),linear-gradient(180deg,rgba(18,11,34,0.24)_0%,rgba(18,11,34,0.62)_100%)]" />
                          </div>

                          <div className="relative z-10 p-5">
                            <div className="text-xs uppercase tracking-[0.14em] text-slate-300">
                              New Collection
                            </div>
                            <div className="mt-2 max-w-[180px] text-3xl font-semibold leading-tight text-white">
                              Handcrafted for You
                            </div>
                            <button
                              type="button"
                              className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-slate-950"
                            >
                              Shop Now
                            </button>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="text-sm font-medium text-white">Featured</div>
                          <div className="mt-3 grid grid-cols-2 gap-3">
                            {featuredProducts.map((product) => (
                              <MiniProduct
                                key={product.name}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                alt={product.alt}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <MetricCard label="Today’s Sales" value="₦482,600" change="↑ 12.5%" />

                    <MetricCard
                      label="Pending Settlement"
                      value="₦126,780"
                      change="Arrives May 28"
                    />

                    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] shadow-[0_20px_50px_rgba(0,0,0,0.34)] backdrop-blur-md">
                      <div className="flex items-center justify-between border-b border-slate-700/60 px-5 py-4">
                        <div>
                          <div className="text-sm font-medium text-white">Receipt Sent</div>
                          <div className="mt-1 text-xs text-slate-300">Order #MC-45872</div>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="space-y-3 px-5 py-4 text-sm text-slate-300">
                        <div className="flex items-center justify-between">
                          <span>Subtotal</span>
                          <span>₦45,000</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Delivery</span>
                          <span>₦2,500</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-700/60 pt-3 text-base font-semibold text-white">
                          <span>Total</span>
                          <span>₦47,500</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 overflow-hidden rounded-t-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,28,0.96),rgba(6,9,22,0.98))] lg:mt-16">
            <div className="grid gap-0 border-b border-white/10 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="flex flex-wrap items-center gap-6 px-6 py-5 lg:px-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Trusted &amp; Powered By
                </div>

                <div className="flex flex-wrap items-center gap-6 text-base font-semibold text-slate-300">
                  {partnerLogos.map((logo) => (
                    <span key={logo}>{logo}</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 border-t border-white/10 sm:grid-cols-4 xl:border-l xl:border-t-0">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={[
                      "px-5 py-5",
                      index !== stats.length - 1 ? "border-r border-white/10" : "",
                    ].join(" ")}
                  >
                    <div className="text-2xl font-bold tracking-[-0.03em] text-white">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-white/5 bg-[#040A18] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Everything You Need to Sell and Grow
              </div>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                Powerful Tools.
                <br />
                Built for Real Business.
              </h2>
            </div>

            <Link
              href="/overview"
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
            >
              Explore All Features
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featureCards.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.62),rgba(8,12,28,0.94))] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition hover:border-indigo-500/25 hover:bg-[linear-gradient(180deg,rgba(18,25,54,0.78),rgba(8,12,28,0.98))]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-500/25 bg-indigo-500/10 text-indigo-300">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-slate-300">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="border-t border-white/5 bg-[#040A18] py-20 sm:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              How Mercora Works
            </div>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
              From Setup to Settlement
              <br />
              in Three Simple Steps
            </h2>

            <div className="mt-10 space-y-8">
              <StepItem
                number="1"
                title="Create & Customize"
                description="Set up your store, add products, and connect your payment methods."
              />
              <StepItem
                number="2"
                title="Start Selling"
                description="Share your store and start receiving orders and payments."
              />
              <StepItem
                number="3"
                title="Get Paid & Grow"
                description="Issue receipts automatically and track your settlements in real time."
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,28,0.98),rgba(5,8,20,1))] shadow-[0_24px_70px_rgba(0,0,0,0.34)]">
            <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>

            <div className="grid lg:grid-cols-[230px_1fr]">
              <aside className="border-b border-white/10 bg-[#050913] p-5 lg:border-b-0 lg:border-r">
                <div className="mb-8 flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#5b3df5_0%,#3b82f6_100%)]">
                    <svg
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                      className="h-5 w-5 text-white"
                      fill="none"
                    >
                      <path
                        d="M7 34V14h6.4l6.8 10.8L27 14h6.2v20h-5.6V23.8l-5.7 8.9h-3.2L13 23.8V34H7Z"
                        fill="currentColor"
                      />
                      <path d="M34 14h7v20h-7z" fill="currentColor" opacity="0.96" />
                    </svg>
                  </div>
                  <span className="text-base font-semibold text-white">mercora</span>
                </div>

                <div className="space-y-2">
                  {[
                    "Home",
                    "Orders",
                    "Products",
                    "Payments",
                    "Settlements",
                    "Receipts",
                    "Analytics",
                    "Settings",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={[
                        "rounded-xl px-4 py-3 text-sm font-medium",
                        index === 0
                          ? "bg-[linear-gradient(135deg,#3f2cd8_0%,#253b8f_100%)] text-white"
                          : "text-slate-300",
                      ].join(" ")}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </aside>

              <div className="p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm text-slate-400">Overview</div>
                    <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-white">
                      Merchant performance
                    </h3>
                  </div>

                  <div className="inline-flex h-10 items-center rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-slate-300">
                    May 20 - May 26
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <DashboardStat
                    className="sm:col-span-2"
                    title="Total Sales"
                    value="₦1,560,250"
                    meta="+ 8.4% vs. last week"
                  />
                  <DashboardStat
                    title="Orders"
                    value="2,847"
                    meta="+ 6.1% vs. last week"
                  />
                  <DashboardStat
                    title="Successful Payments"
                    value="98.7%"
                    meta="+ 0.3% vs. last week"
                  />
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-[1.08fr_0.62fr]">
                  <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,25,54,0.58),rgba(10,15,34,0.95))] p-5">
                    <div className="mb-4 text-sm font-medium text-slate-300">
                      Sales Trend
                    </div>

                    <div className="relative h-[250px] overflow-hidden rounded-2xl bg-[#0a1022]">
                      <div className="absolute inset-x-6 top-12 border-t border-dashed border-white/10" />
                      <div className="absolute inset-x-6 top-1/2 border-t border-dashed border-white/10" />
                      <div className="absolute inset-x-6 bottom-12 border-t border-dashed border-white/10" />

                      <svg
                        viewBox="0 0 720 280"
                        className="absolute inset-0 h-full w-full"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M35 218 C 95 218, 120 188, 165 190 C 218 193, 240 160, 282 152 C 332 142, 350 178, 396 165 C 444 150, 470 125, 515 136 C 560 148, 585 130, 625 95 C 652 72, 675 58, 690 64"
                          stroke="url(#mercoraGradient)"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient
                            id="mercoraGradient"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="0"
                          >
                            <stop offset="0%" stopColor="#5b3df5" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                      </svg>

                      <div className="absolute left-[54%] top-[34%] rounded-2xl border border-white/10 bg-[#050913]/95 px-4 py-3 shadow-xl">
                        <div className="text-xs text-slate-400">Fri, May 24</div>
                        <div className="mt-1 text-sm font-semibold text-white">
                          ₦395,400
                        </div>
                      </div>

                      <div className="absolute inset-x-5 bottom-4 grid grid-cols-7 text-center text-xs text-slate-500">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                          <span key={day}>{day}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,25,54,0.58),rgba(10,15,34,0.95))] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="text-sm font-medium text-slate-300">Recent Orders</div>
                      <Link
                        href="/signin"
                        className="text-xs font-medium text-indigo-400 transition hover:text-indigo-300"
                      >
                        View All
                      </Link>
                    </div>

                    <div className="space-y-3">
                      <OrderRow id="#MC-45872" amount="₦47,500" status="Paid" />
                      <OrderRow id="#MC-45871" amount="₦12,000" status="Paid" />
                      <OrderRow id="#MC-45870" amount="₦89,900" status="Pending" />
                      <OrderRow id="#MC-45869" amount="₦25,600" status="Paid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-[#040A18] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Merchants Love Mercora
              </div>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                Built for People
                <br />
                Who Build.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map((item) => (
                <article
                  key={item.name}
                  className="rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,22,48,0.58),rgba(8,12,28,0.95))] p-5"
                >
                  <p className="text-sm leading-7 text-slate-300">&ldquo;{item.quote}&rdquo;</p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-white">{item.name}</div>
                      <div className="mt-1 text-xs text-slate-400">{item.role}</div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[24px] border border-indigo-500/20 bg-[linear-gradient(135deg,#2e1c8c_0%,#1f2d7a_58%,#1f3f8f_100%)] px-6 py-8 shadow-[0_20px_60px_rgba(44,34,130,0.35)] sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr_auto] lg:items-center">
              <div>
                <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
                  Ready to Sell Smarter?
                </div>

                <h3 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                  Your Business Deserves a Commerce Operating System.
                </h3>
              </div>

              <p className="max-w-md text-sm leading-7 text-indigo-100/80">
                Join thousands of African merchants who trust Mercora to power their growth.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-[#1a2452] transition hover:bg-slate-100"
                >
                  Start Free
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Book Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function MiniProduct({
  name,
  price,
  image,
  alt,
}: {
  name: string;
  price: string;
  image: string;
  alt: string;
}) {
  return (
    <div className="overflow-hidden rounded-[18px] bg-[#111827]">
      <div className="relative h-24 overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, 160px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,24,39,0.06)_0%,rgba(17,24,39,0.34)_100%)]" />
      </div>

      <div className="space-y-1 px-3 py-3">
        <div className="text-xs font-medium text-white">{name}</div>
        <div className="text-xs text-slate-300">{price}</div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,17,39,0.92),rgba(10,12,31,0.95))] shadow-[0_16px_40px_rgba(0,0,0,0.28)] backdrop-blur-md">
      <div className="px-5 py-4">
        <div className="text-sm text-slate-300">{label}</div>
        <div className="mt-2 text-3xl font-bold tracking-[-0.04em] text-white">{value}</div>
        <div className="mt-2 text-sm text-emerald-400">{change}</div>
      </div>
    </div>
  );
}

function StepItem({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-indigo-500/40 bg-[linear-gradient(135deg,#3d2fcf_0%,#2a4ccf_100%)] text-base font-bold text-white shadow-[0_16px_36px_rgba(79,70,229,0.28)]">
        {number}
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-7 text-slate-300">{description}</p>
      </div>
    </div>
  );
}

function DashboardStat({
  title,
  value,
  meta,
  className = "",
}: {
  title: string;
  value: string;
  meta: string;
  className?: string;
}) {
  return (
    <div
      className={`min-w-0 rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,20,42,0.76),rgba(9,13,29,0.96))] px-4 py-4 ${className}`}
    >
      <div className="text-sm text-slate-400">{title}</div>
      <div className="mt-2 text-[clamp(2rem,4vw,3rem)] font-bold leading-none tracking-[-0.04em] text-white">
        {value}
      </div>
      <div className="mt-2 text-xs text-emerald-400">{meta}</div>
    </div>
  );
}

function OrderRow({
  id,
  amount,
  status,
}: {
  id: string;
  amount: string;
  status: "Paid" | "Pending";
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
      <div>
        <div className="text-sm font-medium text-white">{id}</div>
        <div className="mt-1 text-xs text-slate-400">{amount}</div>
      </div>

      <span
        className={[
          "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
          status === "Paid"
            ? "bg-emerald-500/15 text-emerald-400"
            : "bg-amber-500/15 text-amber-400",
        ].join(" ")}
      >
        {status}
      </span>
    </div>
  );
}