-- Blair — Bermuda Cut · Supabase schema
-- Run this in the Supabase SQL editor of project mlgjiqtpakwaqbbmpspc.
-- Idempotent — safe to re-run.

create extension if not exists "pgcrypto";

-- ── TABLES ────────────────────────────────────────────────────────────
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  week_number int not null,
  day_index int not null,
  completed boolean not null default false,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (week_number, day_index)
);

create table if not exists public.weight_log (
  id uuid primary key default gen_random_uuid(),
  week_number int not null unique,
  weight_kg numeric(4,1),
  logged_at timestamptz not null default now()
);

create table if not exists public.daily_checklist (
  id uuid primary key default gen_random_uuid(),
  item_index int not null,
  date date not null default current_date,
  completed boolean not null default false,
  unique (item_index, date)
);

create table if not exists public.setup_checklist (
  id uuid primary key default gen_random_uuid(),
  item_index int not null unique,
  completed boolean not null default false,
  completed_at timestamptz
);

-- ── INDEXES ───────────────────────────────────────────────────────────
create index if not exists sessions_week_idx on public.sessions (week_number);
create index if not exists daily_checklist_date_idx on public.daily_checklist (date);

-- ── ROW-LEVEL SECURITY ────────────────────────────────────────────────
-- Single-user app: any authenticated user (i.e. you) can read/write everything.
-- No public access. Anon key alone cannot reach the data.
alter table public.sessions enable row level security;
alter table public.weight_log enable row level security;
alter table public.daily_checklist enable row level security;
alter table public.setup_checklist enable row level security;

drop policy if exists "auth_all_sessions" on public.sessions;
create policy "auth_all_sessions" on public.sessions
  for all to authenticated using (true) with check (true);

drop policy if exists "auth_all_weight" on public.weight_log;
create policy "auth_all_weight" on public.weight_log
  for all to authenticated using (true) with check (true);

drop policy if exists "auth_all_checklist" on public.daily_checklist;
create policy "auth_all_checklist" on public.daily_checklist
  for all to authenticated using (true) with check (true);

drop policy if exists "auth_all_setup" on public.setup_checklist;
create policy "auth_all_setup" on public.setup_checklist
  for all to authenticated using (true) with check (true);
