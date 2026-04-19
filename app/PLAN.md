# Bermuda Cut — Build Plan

## Goal

Build a single-user Next.js 14 + Supabase web app at `projects/HealthPlan/app/` that mirrors the standalone HTML spec in `HealthPlan_v1. html`. Cross-device sync between phone and laptop, weekly canteen menu updatable by editing one file.

## Approach

- **Tech**: Next.js 14 App Router, Supabase (`@supabase/ssr`), Tailwind CSS, Recharts, Vercel.
- **Auth**: single user created manually in Supabase dashboard, gated by middleware.
- **Content**: one canonical TypeScript file `src/data/plan.ts` exporting strongly-typed objects for every section. Components import from there — no hardcoded strings.
- **DB**: 4 tables (`sessions`, `weight_log`, `daily_checklist`, `setup_checklist`) with RLS that grants the `authenticated` role full access.
- **Layout**: desktop sidebar + mobile bottom-tab nav, sign-out button, days-to-Bermuda chip.
- **Updates**: optimistic UI, background upsert to Supabase, revert on error.

## Status

✅ Scaffold (Next.js, configs, Tailwind palette, fonts)
✅ Dependencies installed (79 packages)
✅ `src/data/plan.ts` (full spec content + TypeScript interfaces)
✅ Supabase client (browser, server, middleware) + auth gate
✅ Login page (email/password, no signup)
✅ App shell (Sidebar + BottomNav + MobileHeader + SignOutButton + auth gate)
✅ All 9 pages: dashboard, training, workouts, meals, canteen, prep, weight, rules, checkpoints (+ /more for mobile)
✅ Schema SQL + README + SETUP guide + this PLAN
☐ `npm run build` to catch type errors → pending
☐ User: apply schema, create user, paste env vars, deploy to Vercel

## Key files

- `src/data/plan.ts` — weekly update target (canteenMenu)
- `src/middleware.ts` — auth gate
- `src/app/(app)/layout.tsx` — app shell
- `src/app/(app)/dashboard/page.tsx` — landing page
- `src/app/(app)/weight/WeightClient.tsx` — Recharts weight chart
- `supabase/schema.sql` — DB schema
- `SETUP.md` — end-to-end deploy guide

## Next steps for user

1. Run `supabase/schema.sql` in the Supabase SQL editor
2. Create single user via Supabase Auth dashboard (Auto-confirm ✅)
3. Copy `.env.local.example` → `.env.local`, paste anon key
4. `npm run dev` → sign in, sanity-check
5. `vercel` (or push to GitHub + import in Vercel dashboard) to deploy
6. Add Vercel URL to Supabase → Authentication → URL Configuration

## Weekly maintenance

Every Sunday: hand Claude (in Cursor) the new canteen menu. Claude edits only `canteenMenu` in `src/data/plan.ts`. Push to git → Vercel redeploys.
