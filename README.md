# Mercora Frontend

Mercora is a production-grade multi-role commerce SaaS platform built for African merchants and buyers.

This frontend powers:

- Marketing website
- Authentication flows
- Merchant dashboard
- Public storefront
- Platform admin interfaces

It is designed to be:

- production-grade
- scalable
- highly responsive across all screen sizes and devices
- visually polished
- accessible
- performant
- tightly integrated with the Django backend

---

# Table of Contents

- [Project Overview](#project-overview)
- [Core Product Areas](#core-product-areas)
- [Key Product Goals](#key-product-goals)
- [Tech Stack](#tech-stack)
- [Frontend Responsibilities](#frontend-responsibilities)
- [Design System Rules](#design-system-rules)
- [Responsiveness Standards](#responsiveness-standards)
- [Authentication Architecture](#authentication-architecture)
- [Payment UX Strategy](#payment-ux-strategy)
- [Multi-Provider Payment UX](#multi-provider-payment-ux)
- [Currency Handling](#currency-handling)
- [Frontend Information Architecture](#frontend-information-architecture)
- [Suggested Folder Structure](#suggested-folder-structure)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Development Commands](#development-commands)
- [Routing Strategy](#routing-strategy)
- [API Integration Rules](#api-integration-rules)
- [State Management Guidance](#state-management-guidance)
- [UI/UX Standards](#uiux-standards)
- [Error / Loading / Empty States](#error--loading--empty-states)
- [Accessibility Standards](#accessibility-standards)
- [Performance Standards](#performance-standards)
- [Security Considerations](#security-considerations)
- [Deployment](#deployment)
- [Testing Guidance](#testing-guidance)
- [Engineering Rules](#engineering-rules)
- [Long-Term Product Direction](#long-term-product-direction)

---

# Project Overview

Mercora is not just a storefront builder.

Mercora is a commerce operating system for African merchants.

Its core value proposition is:

- storefront creation
- order management
- payment orchestration
- trusted receipts
- merchant settlement visibility
- platform-managed checkout when necessary

The frontend must support this reality clearly and professionally.

The product should feel:

- premium
- modern
- operationally trustworthy
- easy for small and medium merchants to understand
- powerful enough for serious businesses to adopt

---

# Core Product Areas

## 1. Marketing Website
Used for acquisition, trust-building, and conversion.

Pages may include:
- Landing
- Features
- Pricing
- About
- Contact
- Legal pages
- FAQ
- Merchant onboarding CTA flows

## 2. Authentication
Used for:
- login
- register
- forgot password
- reset password
- role-aware redirects
- session restoration

## 3. Merchant Dashboard
Used by merchants to:
- manage storefront
- manage products
- manage customers
- manage orders
- view transactions
- confirm manual payments
- track settlements
- retrieve receipts
- manage subscriptions
- access analytics

## 4. Public Storefront
Used by buyers to:
- browse store
- view products
- add to cart
- checkout
- pay via available methods
- upload payment proof for merchant-direct payment
- track order
- download/view receipt when allowed

## 5. Platform Admin
Used internally by the Mercora team to:
- oversee merchants
- review stores
- monitor transactions
- track settlement states
- view support issues
- manage platform health and reporting

---

# Key Product Goals

The frontend must help Mercora achieve the following:

- make merchants feel confident listing on the platform
- make buyers trust the checkout flow
- make payments understandable
- make order state transparent
- make receipts feel credible and structured
- make subscriptions and upgrades easy to understand
- make settlement visibility clear for merchants
- make the platform feel premium and stable

---

# Tech Stack

Recommended/expected stack:

- Next.js
- TypeScript
- Tailwind CSS
- React
- App Router
- Axios or fetch wrapper for API layer
- next-themes if theme switching is needed
- shadcn/ui only where appropriate
- explicit Tailwind classes for stable styling
- optional Zustand or equivalent for light client state
- optional React Query / TanStack Query for server-state management

Frontend should remain compatible with a Django + DRF backend.

---

# Frontend Responsibilities

The frontend is responsible for:

- rendering the UI
- collecting user input
- guiding flows
- showing explicit states
- presenting normalized payment options
- handling responsive behavior
- consuming backend APIs cleanly
- maintaining current design language

The frontend is NOT responsible for:

- financial truth
- fee calculations as source of truth
- settlement authority
- payment verification authority
- receipt issuance authority
- webhook logic
- payout calculation authority

Those belong to the backend.

---

# Design System Rules

The visual system must remain:

- premium
- consistent
- calm but powerful
- modern SaaS-grade
- polished in both spacing and hierarchy
- highly legible
- responsive-first

Rules:
- preserve the existing Mercora color direction
- do not introduce random color systems
- avoid generic template-looking UI
- use clear section hierarchy
- maintain consistent spacing rhythm
- use clean surfaces and depth
- keep cards, forms, tables, and action zones visually coherent
- ensure dark mode depth is layered if dark mode is used
- do not let mobile layouts feel secondary

---

# Responsiveness Standards

This project must be highly responsive across:

- small phones
- standard phones
- tablets
- small laptops
- laptops
- desktops
- ultrawide screens
- awkward viewport widths

Rules:
- mobile-first design
- no broken tables on small devices
- responsive nav patterns
- responsive dashboard layouts
- usable modals on mobile
- proper spacing scaling
- avoid horizontal overflow
- avoid tiny tap targets
- avoid desktop-only assumptions

Every major page must be tested against:
- 320px
- 375px
- 390px
- 414px
- 768px
- 1024px
- 1280px
- 1440px
- 1536px
- ultrawide layouts where relevant

---

# Authentication Architecture

Authentication uses backend-driven secure flows.

Expected architecture:
- Django backend issues JWT or auth cookies
- frontend communicates with backend using credentials-enabled requests
- CSRF must be handled correctly for unsafe methods when needed
- frontend must restore session safely
- frontend must not assume auth state without backend confirmation

Expected auth flows:
- register
- login
- logout
- forgot password
- reset password
- current-user fetch
- role-based redirection
- protected route handling

Frontend rules:
- always handle logged-out state gracefully
- show useful session-expired behavior
- keep auth UX clear and calm
- never expose sensitive internal auth assumptions in UI

---

# Payment UX Strategy

Mercora supports a hybrid payment model.

## Payment Mode 1: Merchant-Direct Local Payment
Used when the merchant already receives local payments directly.

Frontend behavior:
- buyer selects merchant-direct payment
- show merchant payment instructions clearly
- allow payment proof upload or payment-sent marking if the backend supports it
- show pending confirmation state
- communicate that receipt is issued only after confirmation
- show order tracking after submission

## Payment Mode 2: Mercora-Managed Payment
Used when Mercora routes payment through supported providers.

Frontend behavior:
- buyer selects secure checkout
- show eligible platform-managed providers
- redirect or embed hosted payment flow based on provider strategy
- show clear post-payment states
- poll or fetch payment status only through backend endpoints
- never assume success from redirect alone
- show receipt only after backend-confirmed success

---

# Multi-Provider Payment UX

Mercora backend supports:

## Phase 1
- Flutterwave
- Paystack

## Future-ready
- OPay

Frontend must be designed so that:
- provider selection is possible if business rules allow it
- provider options are shown clearly and cleanly
- users understand which method they are using
- payment errors are recoverable
- retries do not create duplicate confusion
- provider-specific wording does not leak into core product architecture everywhere

Important:
- do not silently switch the buyer between providers without clear UX
- do not treat redirect callback as final success
- always rely on backend-confirmed status

---

# Currency Handling

Mercora supports multi-currency-aware commerce, but not as a loose UI toggle.

Frontend must respect these concepts:

- store base currency
- display currency / presentment currency
- charge currency
- settlement currency

Rules:
- merchant chooses one base currency during onboarding
- storefront may display alternate currency later if supported
- final checkout must clearly show the actual charge currency
- do not create misleading currency conversions
- do not calculate authoritative money figures in frontend

---

# Frontend Information Architecture

Recommended route groups:

## Public / Marketing
- `/`
- `/features`
- `/pricing`
- `/about`
- `/contact`
- `/terms`
- `/privacy`

## Auth
- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`

## Merchant Dashboard
- `/dashboard`
- `/dashboard/orders`
- `/dashboard/orders/[id]`
- `/dashboard/products`
- `/dashboard/products/new`
- `/dashboard/products/[id]/edit`
- `/dashboard/customers`
- `/dashboard/customers/[id]`
- `/dashboard/transactions`
- `/dashboard/settlements`
- `/dashboard/receipts`
- `/dashboard/analytics`
- `/dashboard/store-settings`
- `/dashboard/billing`
- `/dashboard/team`
- `/dashboard/support`
- `/dashboard/profile`

## Storefront
- `/store/[subdomain-or-slug]`
- `/store/[slug]/product/[productSlug]`
- `/store/[slug]/cart`
- `/store/[slug]/checkout`
- `/store/[slug]/order-success`
- `/store/[slug]/track-order`

## Platform Admin
- `/admin`
- `/admin/merchants`
- `/admin/merchants/[id]`
- `/admin/stores`
- `/admin/payments`
- `/admin/settlements`
- `/admin/analytics`
- `/admin/support`
- `/admin/settings`

---

# Suggested Folder Structure

```txt
src/
  app/
    (marketing)/
    (auth)/
    (merchant)/
    (storefront)/
    (platform-admin)/
    api/
    globals.css
    layout.tsx
    page.tsx

  components/
    common/
    layout/
    marketing/
    auth/
    merchant/
    storefront/
    admin/
    forms/
    tables/
    modals/
    feedback/

  features/
    auth/
    merchants/
    storefronts/
    catalog/
    orders/
    payments/
    receipts/
    subscriptions/
    analytics/
    support/

  lib/
    api/
    auth/
    utils/
    constants/
    formatters/
    guards/

  hooks/
  types/
  styles/