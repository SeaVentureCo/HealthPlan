"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <div className="font-syne text-2xl font-bold tracking-tight text-text">Blair — Bermuda Cut</div>
          <div className="font-mono text-xs text-text-subtle mt-1">9 July 2026 · 10 weeks</div>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-text-subtle mb-2">
              Email
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text outline-none focus:border-green/50 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] uppercase tracking-wider text-text-subtle mb-2">
              Password
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text outline-none focus:border-green/50 transition"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-xs text-coral bg-coral-bg border border-coral-edge rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green text-bg font-medium rounded-lg py-3 text-sm hover:bg-green/90 transition disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-[11px] text-text-subtle leading-relaxed">
          Single-user app. Account created via Supabase dashboard — no signup here.
        </div>
      </div>
    </div>
  );
}
