"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  ChevronDown,
  Menu,
  Receipt,
  ShieldCheck,
  Store,
  Wallet,
  X,
} from "lucide-react";

type NavChild = {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

const navItems: NavItem[] = [
  {
    label: "Features",
    children: [
      {
        label: "Storefronts",
        description: "Launch premium storefronts built for trust and conversion.",
        href: "/features/storefronts",
        icon: Store,
      },
      {
        label: "Payments",
        description: "Support merchant-direct and platform-managed payment flows.",
        href: "/features/payments",
        icon: Wallet,
      },
      {
        label: "Receipts",
        description: "Send structured receipts customers can trust.",
        href: "/features/receipts",
        icon: Receipt,
      },
      {
        label: "Analytics",
        description: "Track growth, sales, and settlement performance clearly.",
        href: "/features/analytics",
        icon: BarChart3,
      },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Solutions", href: "/solutions" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];


function BrandMark() {
  return (
    <Link
      href="/"
      aria-label="Mercora home"
      className="inline-flex items-center gap-3 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040A18]"
    >
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl">
        <Image
          src="/logo.png"
          alt="Mercora logo"
          fill
          priority
          sizes="44px"
          className="object-contain"
        />
      </div>

      <div className="leading-none">
        <div className="text-[1.06rem] font-extrabold tracking-[-0.04em] text-white">
          MERCORA
        </div>
        <div className="hidden text-xs font-medium text-slate-300 md:block">
          Commerce infrastructure for modern merchants
        </div>
      </div>
    </Link>
  );
}

function DesktopDropdown({
  item,
  isOpen,
  onOpen,
  onClose,
}: {
  item: NavItem;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  if (!item.children?.length) {
    return null;
  }

  return (
    <div
      className="relative pb-4 -mb-4"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        onClick={isOpen ? onClose : onOpen}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={`inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
          isOpen
            ? "bg-white/10 text-white"
            : "text-slate-200 hover:bg-white/8 hover:text-white"
        }`}
      >
        {item.label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute left-0 top-full z-50 w-[460px] pt-3 transition-all duration-200 ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <div className="rounded-[1.75rem] border border-white/10 bg-[rgba(5,11,28,0.96)] p-3 shadow-[0_30px_90px_rgba(2,6,23,0.45)] backdrop-blur-xl">
          <div className="grid gap-2">
            {item.children.map((child) => {
              const Icon = child.icon;

              return (
                <Link
                  key={child.label}
                  href={child.href}
                  className="group rounded-2xl border border-transparent p-3 transition hover:border-white/10 hover:bg-white/5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-300 transition group-hover:bg-blue-600/20 group-hover:text-blue-200">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-white">{child.label}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">
                        {child.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-3 rounded-2xl border border-blue-500/20 bg-blue-600/10 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-bold text-white">
                  Built for trust, speed, and operational clarity
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Premium storefronts, payment flow visibility, professional
                  receipts, and merchant-grade reporting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();

    const onClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[rgba(4,10,24,0.92)] shadow-[0_18px_60px_rgba(2,6,23,0.38)] backdrop-blur-xl"
            : "border-b border-white/8 bg-[rgba(4,10,24,0.76)] shadow-[0_10px_36px_rgba(2,6,23,0.18)] backdrop-blur-lg"
        }`}
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(59,130,246,0.16),transparent)]" />

        <div
          ref={wrapperRef}
          className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[78px] lg:px-8"
        >
          <BrandMark />

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {navItems.map((item) =>
              item.children?.length ? (
                <DesktopDropdown
                  key={item.label}
                  item={item}
                  isOpen={openMenu === item.label}
                  onOpen={() => setOpenMenu(item.label)}
                  onClose={() => setOpenMenu(null)}
                />
              ) : (
                <Link
                  key={item.label}
                  href={item.href ?? "#"}
                  className="rounded-full px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/8 hover:text-white"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className="inline-flex min-h-11 items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/8 hover:text-white"
            >
              Log In
            </Link>

            <Link
              href="/get-started"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2563eb_0%,#3b82f6_100%)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(37,99,235,0.34)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_46px_rgba(37,99,235,0.42)]"
            >
              Get Started
            </Link>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] lg:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 flex h-dvh w-full max-w-sm flex-col border-l border-white/10 bg-[rgba(5,11,28,0.97)] shadow-[0_20px_80px_rgba(2,6,23,0.46)] transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <BrandMark />

            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6">
            <nav className="space-y-3" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-2"
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div className="px-4 pb-2 pt-3 text-sm font-bold uppercase tracking-[0.14em] text-slate-400">
                      {item.label}
                    </div>
                  )}

                  {item.children?.length ? (
                    <div className="space-y-1 px-2 pb-2">
                      {item.children.map((child) => {
                        const Icon = child.icon;

                        return (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-start gap-3 rounded-2xl px-3 py-3 transition hover:bg-white/5"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-300">
                              <Icon className="h-5 w-5" />
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-white">
                                {child.label}
                              </p>
                              <p className="mt-1 text-xs leading-5 text-slate-300">
                                {child.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>
          </div>

          <div className="border-t border-white/10 px-5 py-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Log In
              </Link>

              <Link
                href="/get-started"
                onClick={() => setMobileOpen(false)}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2563eb_0%,#3b82f6_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(37,99,235,0.34)] transition hover:bg-blue-500"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}