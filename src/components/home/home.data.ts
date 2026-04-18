import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  CreditCard,
  Receipt,
  ShoppingBag,
  Store,
  Wallet,
} from "lucide-react";

export type FeatureCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type StatItem = {
  label: string;
  value: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image: string;
  alt: string;
};

export type FeaturedProduct = {
  name: string;
  price: string;
  image: string;
  alt: string;
};

export const featureCards: FeatureCard[] = [
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

export const partnerLogos = [
  "Flutterwave",
  "paystack",
  "Verve",
  "VISA",
  "Mastercard",
];

export const stats: StatItem[] = [
  { label: "Active Merchants", value: "25,000+" },
  { label: "Orders Processed", value: "1.2M+" },
  { label: "Payments Tracked", value: "₦48B+" },
  { label: "African Markets", value: "15" },
];

export const testimonials: Testimonial[] = [
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

export const featuredProducts: FeaturedProduct[] = [
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