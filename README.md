# HealthPlan — Bermuda Cut

Personal training & nutrition tracker for the 10-week cut to Bermuda (target: **9 July 2026**).

Single-user Next.js 14 + Supabase web app with cross-device sync between phone and laptop.

## Repo layout

```
HealthPlan/
├── HealthPlan_v1. html      # Original standalone design spec (HTML + JS)
└── app/                     # Next.js 14 + Supabase + Vercel app
    ├── src/
    │   ├── app/             # routes (App Router) — login, dashboard, training, weight, etc.
    │   ├── components/      # Sidebar, BottomNav, WeekCard, Checkbox, ...
    │   ├── data/plan.ts     # ⚡ single source of truth for all plan content
    │   └── lib/             # supabase clients, data fetchers, progress helpers
    ├── supabase/schema.sql  # apply once in Supabase SQL editor
    ├── README.md            # app-level details
    └── SETUP.md             # end-to-end deploy guide
```

## Get it running

See **`app/SETUP.md`** for the full ~10-minute setup (Supabase schema, single-user creation, env vars, Vercel deploy).

## Weekly update workflow

Every Sunday, hand the new canteen menu to Claude in Cursor. Claude edits only `canteenMenu` in `app/src/data/plan.ts`. Push to git → Vercel redeploys automatically.
