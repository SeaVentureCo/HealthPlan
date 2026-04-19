"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export default function MobileHeader({ daysToBermuda }: { daysToBermuda: number }) {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="md:hidden flex items-center justify-between px-5 py-4 border-b border-border bg-surface sticky top-0 z-40">
      <Link href="/dashboard">
        <div className="font-syne text-[14px] font-bold tracking-tight">Blair — Bermuda Cut</div>
        <div className="font-mono text-[10px] text-text-subtle mt-0.5">{daysToBermuda} days to Bermuda</div>
      </Link>
      <button
        onClick={signOut}
        className="text-text-muted hover:text-text transition p-2 -mr-2"
        aria-label="Sign out"
      >
        <LogOut size={18} strokeWidth={1.6} />
      </button>
    </header>
  );
}
