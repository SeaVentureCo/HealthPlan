"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={signOut}
      className="hidden md:flex fixed top-5 right-6 items-center gap-1.5 text-text-muted hover:text-text transition text-[11px] font-mono z-30"
    >
      <LogOut size={13} strokeWidth={1.7} /> Sign out
    </button>
  );
}
