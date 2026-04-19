const trimTrailingSlashes = (value: string) => value.replace(/\/+$/, "");

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:8000";

export const env = {
  apiUrl: trimTrailingSlashes(apiUrl),
  requestTimeoutMs: 20000,
  csrfCookieName:
    process.env.NEXT_PUBLIC_CSRF_COOKIE_NAME?.trim() || "csrftoken",
  csrfHeaderName: "X-CSRFToken",
  authCookieNames: {
    access: process.env.AUTH_ACCESS_COOKIE_NAME?.trim() || "access_token",
    refresh: process.env.AUTH_REFRESH_COOKIE_NAME?.trim() || "refresh_token",
  },
  api: {
    auth: {
      login: "/api/auth/login/",
      register: "/api/auth/register/",
      me: "/api/auth/me/",
      logout: "/api/auth/logout/",
      refresh: "/api/auth/refresh/",
      changePassword: "/api/auth/change-password/",
      forgotPassword: "/api/auth/password-reset/request/",
      resetPassword: "/api/auth/password-reset/confirm/",
    },
    merchants: {
      list: "/api/merchants/",
      detail: (merchantId: string) => `/api/merchants/${merchantId}/`,
      kyc: (merchantId: string) => `/api/merchants/${merchantId}/kyc/`,
      payoutSettings: (merchantId: string) =>
        `/api/merchants/${merchantId}/payout-settings/`,
      providerSettings: (merchantId: string) =>
        `/api/merchants/${merchantId}/provider-settings/`,
      memberships: (merchantId: string) =>
        `/api/merchants/${merchantId}/memberships/`,
    },
    storefronts: {
      list: "/api/storefronts/",
      detail: (storefrontId: string) => `/api/storefronts/${storefrontId}/`,
      domain: (storefrontId: string) =>
        `/api/storefronts/${storefrontId}/domain/`,
      publish: (storefrontId: string) =>
        `/api/storefronts/${storefrontId}/publish/`,
      unpublish: (storefrontId: string) =>
        `/api/storefronts/${storefrontId}/unpublish/`,
      publicBySlug: (slug: string) => `/api/storefronts/public/by-slug/${slug}/`,
      publicBySubdomain: (subdomain: string) =>
        `/api/storefronts/public/by-subdomain/${subdomain}/`,
      publicByDomain: (domain: string) =>
        `/api/storefronts/public/by-domain/${domain}/`,
    },
    catalog: {
      publicProductsByStorefrontSlug: (slug: string) =>
        `/api/catalog/public/storefronts/by-slug/${slug}/products/`,
      publicProductDetailByStorefrontSlug: (
        storefrontSlug: string,
        productSlug: string,
      ) =>
        `/api/catalog/public/storefronts/by-slug/${storefrontSlug}/products/${productSlug}/`,
    },
    publicCommerce: {
      cart: (slug: string) => `/api/orders/public/storefronts/by-slug/${slug}/cart/`,
      cartItems: (slug: string) =>
        `/api/orders/public/storefronts/by-slug/${slug}/cart/items/`,
      cartItemDetail: (slug: string, itemId: string) =>
        `/api/orders/public/storefronts/by-slug/${slug}/cart/items/${itemId}/`,
      checkoutSessions: (slug: string) =>
        `/api/orders/public/storefronts/by-slug/${slug}/checkout-sessions/`,
      checkoutSessionDetail: (slug: string, sessionToken: string) =>
        `/api/orders/public/storefronts/by-slug/${slug}/checkout-sessions/${sessionToken}/`,
      orders: (slug: string) =>
        `/api/orders/public/storefronts/by-slug/${slug}/orders/`,
      orderByNumber: (slug: string, orderNumber: string) =>
        `/api/orders/public/storefronts/by-slug/${slug}/orders/by-number/${orderNumber}/`,
      orderPayment: (slug: string, orderNumber: string) =>
        `/api/payments/public/storefronts/by-slug/${slug}/orders/by-number/${orderNumber}/payment/`,
      initializePayment: (slug: string, orderNumber: string) =>
        `/api/payments/public/storefronts/by-slug/${slug}/orders/by-number/${orderNumber}/payment/initialize/`,
      manualPaymentProofs: (slug: string, orderNumber: string) =>
        `/api/payments/public/storefronts/by-slug/${slug}/orders/by-number/${orderNumber}/payment/proofs/`,
      receiptByNumber: (slug: string, receiptNumber: string) =>
        `/api/receipts/public/storefronts/by-slug/${slug}/by-number/${receiptNumber}/`,
    },
  },
  routes: {
    home: "/",
    login: "/login",
    signUp: "/sign-up",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    unauthorized: "/unauthorized",
    forbidden: "/forbidden",

    merchantDashboard: "/dashboard",
    merchantSettingsProfile: "/dashboard/settings/profile",
    merchantSettingsStore: "/dashboard/settings/store",
    merchantSettingsKyc: "/dashboard/settings/kyc",
    merchantSettingsPayouts: "/dashboard/settings/payouts",
    merchantSettingsPaymentMethods: "/dashboard/settings/payment-methods",
    merchantSettingsDomain: "/dashboard/settings/domain",
    merchantSettingsBranding: "/dashboard/settings/branding",
    merchantSettingsPolicies: "/dashboard/settings/policies",
    merchantTeam: "/dashboard/team",
  },
} as const;