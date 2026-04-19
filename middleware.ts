import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { env } from "@/lib/config/env";

const protectedPrefixes = ["/onboarding", "/dashboard", "/platform"];
const guestOnlyPrefixes = ["/login", "/sign-up", "/forgot-password"];

const hasAuthCookies = (request: NextRequest) => {
  const accessCookie = request.cookies.get(env.authCookieNames.access)?.value;
  const refreshCookie = request.cookies.get(env.authCookieNames.refresh)?.value;

  return Boolean(accessCookie || refreshCookie);
};

const matchesPrefix = (pathname: string, prefix: string) =>
  pathname === prefix || pathname.startsWith(`${prefix}/`);

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isAuthenticated = hasAuthCookies(request);

  const requiresAuth = protectedPrefixes.some((prefix) =>
    matchesPrefix(pathname, prefix),
  );

  const guestOnly = guestOnlyPrefixes.some((prefix) =>
    matchesPrefix(pathname, prefix),
  );

  if (!isAuthenticated && requiresAuth) {
    const loginUrl = new URL(env.routes.login, request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthenticated && guestOnly) {
    return NextResponse.redirect(new URL(env.routes.home, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|opengraph-image|twitter-image).*)",
  ],
};