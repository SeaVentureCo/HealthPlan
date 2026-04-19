# Blair — Bermuda Cut

Personal training & nutrition tracker for the 10-week cut to Bermuda (9 July 2026).

Single-user Next.js 14 app with Supabase auth + Postgres for cross-device sync between phone and laptop.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Supabase** (auth + Postgres) — project `mlgjiqtpakwaqbbmpspc`
- **Tailwind CSS** with custom dark palette
- **Recharts** for the weight chart
- **Vercel** for deployment

## Project layout

```
src/
├── app/
│   ├── (app)/              # auth-gated routes — sidebar/bottom-nav layout
│   │   ├── dashboard/
│   │   ├── training/
│   │   ├── workouts/
│   │   ├── meals/
│   │   ├── canteen/
│   │   ├── prep/
│   │   ├── weight/
│   │   ├── rules/
│   │   ├── checkpoints/
│   │   └── more/           # mobile-only — links to less-used pages
│   ├── login/
│   ├── layout.tsx          # fonts + globals
│   └── page.tsx            # redirects to /dashboard
├── components/             # Sidebar, BottomNav, WeekCard, Checkbox, etc.
├── data/
│   └── plan.ts             # ⚡ single source of truth for all plan content
├── lib/
│   ├── supabase/           # browser, server, middleware clients
│   ├── database.types.ts
│   └── data.ts             # server-side fetchers
└── middleware.ts           # auth gate
supabase/
└── schema.sql              # apply this in Supabase SQL editor
```

## Quick start

See **SETUP.md** for the full step-by-step (Supabase project setup, single-user creation, env vars, Vercel deploy).

```bash
cp .env.local.example .env.local        # then paste in your Supabase anon key
npm install
npm run dev                              # → http://localhost:3000
```

## Weekly update workflow

Every Sunday, hand the new canteen menu to Claude in Cursor with a prompt like:

> Update the canteen menu in `src/data/plan.ts` for the week of [DATE]. Here's the menu: …

Claude edits `canteenMenu` (and only `canteenMenu`) in `src/data/plan.ts`. The header comment in that file flags it as the weekly update target.

```ts
// src/data/plan.ts shape (excerpt) — what to hand Claude:

export const canteenMenu: CanteenDay[] = [
  {
    day: "Monday 27 Apr",            // human-readable date
    training: "Upper push",          // session that day, for the badge
    verdict: "Two-line summary…",    // shown above the picks
    picks: [
      { label: "Chicken curry", type: "yes" },   // green pill — choose
      { label: "Petjel salad",  type: "ok"  },   // amber pill — moderation
      { label: "Cheesecake",    type: "no"  },   // coral pill — skip
      // 5–8 picks per day works best
    ],
  },
  // 4 entries total: Mon–Thu (canteen is closed Fri at Uber AMS)
];
```

Same shape works if you ever need to extend to Friday — just add a 5th entry.

## Scripts

```bash
npm run dev        # dev server
npm run build      # production build (also runs type checks)
npm run start      # serve production build
npm run lint       # next lint
```
