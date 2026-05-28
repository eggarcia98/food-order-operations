"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { AUTH_SESSION_KEY, useAuthSession } from "@/lib/useAuthSession";

export default function OperationsHeader() {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { isAuthenticated, userEmail } = useAuthSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      await mutate(AUTH_SESSION_KEY, { isAuthenticated: false, userEmail: null }, false);
      router.replace("/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-soft-pink/30 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/orders" className="flex items-center gap-3">
          <Image src="/media/logo.png" alt="Los Guayacos" width={120} height={120} className="h-10 w-auto object-contain" />
          <span className="hidden text-sm font-semibold uppercase tracking-[0.2em] text-foreground sm:inline">
            Operations
          </span>
        </Link>

        {isAuthenticated === true && (
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/orders" className="text-foreground hover:text-brand-red">
              Orders
            </Link>
            <Link href="/manage/dishes" className="text-foreground hover:text-brand-red">
              Manage Dishes
            </Link>
            <span className="hidden max-w-48 truncate text-text-light md:inline">{userEmail}</span>
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex items-center gap-2 rounded-lg border border-brand-blue px-3 py-2 text-brand-blue disabled:opacity-60"
            >
              <span>{isLoggingOut ? "Signing out" : "Logout"}</span>
              <LogOut size={16} />
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
