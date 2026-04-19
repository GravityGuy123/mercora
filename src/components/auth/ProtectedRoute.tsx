"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { env } from "@/lib/config/env";
import { useAuth } from "@/hooks/use-auth";
import type { UserRole } from "@/types/auth";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: UserRole[];
  fallback?: ReactNode;
};

function DefaultFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-slate-300">
        <ShieldCheck className="h-4 w-4 text-indigo-300" />
        Checking access…
      </div>
    </div>
  );
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  fallback,
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, status, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (status === "unauthenticated") {
      const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
      router.replace(`${env.routes.login}${next}`);
      return;
    }

    if (!user) return;

    if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
      router.replace(env.routes.forbidden);
    }
  }, [allowedRoles, isLoading, pathname, router, status, user]);

  if (isLoading) {
    return <>{fallback ?? <DefaultFallback />}</>;
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (!user) {
    return null;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}