import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

const productLinks = [
  { label: "Overview", href: "/overview" },
  { label: "Storefronts", href: "/features/storefronts" },
  { label: "Payments", href: "/features/payments" },
  { label: "Receipts", href: "/features/receipts" },
  { label: "Settlements", href: "/features/settlements" },
  { label: "Analytics", href: "/features/analytics" },
];

const solutionLinks = [
  { label: "Retail & Fashion", href: "/solutions/retail-fashion" },
  { label: "Food & Beverages", href: "/solutions/food-beverages" },
  { label: "Service Businesses", href: "/solutions/services" },
  { label: "Growing Merchants", href: "/solutions/growing-merchants" },
];

const resourceLinks = [
  { label: "Help Center", href: "/help" },
  { label: "Guides", href: "/guides" },
  { label: "API Documentation", href: "/docs" },
  { label: "Blog", href: "/blog" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Security", href: "/security" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Twitter", href: "https://x.com", icon: Twitter },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
];

function BrandLockup() {
  return (
    <Link
      href="/"
      aria-label="Mercora home"
      className="inline-flex items-center gap-3 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
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
        <div className="text-[1.06rem] font-extrabold tracking-[-0.04em] text-slate-950">
          MERCORA
        </div>
        <div className="text-xs font-medium text-slate-500">
          Commerce infrastructure for modern merchants
        </div>
      </div>
    </Link>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
        {title}
      </h3>

      <ul className="mt-5 space-y-3.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-slate-700 transition hover:text-blue-600"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-0 overflow-hidden border-t border-slate-200 bg-white text-slate-900">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-blue-500/6 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-indigo-500/6 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 border-b border-slate-200 pb-12 lg:grid-cols-[1.05fr,1fr]">
          <div className="max-w-md">
            <BrandLockup />

            <p className="mt-6 text-sm leading-7 text-slate-600">
              Mercora helps merchants launch premium storefronts, accept payments,
              issue professional receipts, and track settlement visibility with
              confidence.
            </p>

            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-blue-600" />
                <span>Lagos, Nigeria</span>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-blue-600" />
                <a
                  href="mailto:support@mercora.com"
                  className="transition hover:text-blue-600"
                >
                  support@mercora.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-blue-600" />
                <a
                  href="tel:+2349012345678"
                  className="transition hover:text-blue-600"
                >
                  +234 901 234 5678
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-500/40 hover:bg-blue-600 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 xl:grid-cols-5">
            <FooterColumn title="Product" links={productLinks} />
            <FooterColumn title="Solutions" links={solutionLinks} />
            <FooterColumn title="Resources" links={resourceLinks} />
            <FooterColumn title="Company" links={companyLinks} />
            <FooterColumn title="Legal" links={legalLinks} />
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Mercora. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition hover:text-blue-600">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-blue-600">
              Terms
            </Link>
            <Link href="/security" className="transition hover:text-blue-600">
              Security
            </Link>
            <Link href="/contact" className="transition hover:text-blue-600">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}