# Setup

End-to-end setup from zero to deployed Vercel URL, in order. Should take ~15 minutes.

## 1 · Supabase: apply schema

You've already created the project (`mlgjiqtpakwaqbbmpspc`). Now load the schema.

1. Open the Supabase dashboard → **SQL Editor** → **New query**
2. Paste the entire contents of `supabase/schema.sql`
3. Click **Run**

You should see four tables under **Database → Tables**:
`sessions`, `weight_log`, `daily_checklist`, `setup_checklist`.

> **Note on RLS**: The schema enables row-level security and grants the `authenticated` role full access. The anon key alone cannot read or write data — login is required.

## 2 · Supabase: create your single user

1. **Authentication → Users → Add user → Create new user**
2. Email: your address. Password: pick one and store it in 1Password.
3. **Auto-confirm user**: ✅ (so you don't need an email verification flow)
4. Click **Create user**

That's it — single-user app, no signup page needed.

## 3 · Get your anon key

1. **Project settings → API → Project API keys**
2. Copy the **`anon` `public`** key (the long JWT)

## 4 · Local env

```bash
cd projects/HealthPlan/app
cp .env.local.example .env.local
```

Edit `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://mlgjiqtpakwaqbbmpspc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<paste the anon key from step 3>
```

## 5 · Run locally

Already installed during scaffold. If `node_modules/` is missing:

```bash
npm install
```

Then:

```bash
npm run dev
```

Open http://localhost:3000 → you'll be redirected to `/login`. Sign in with the credentials from step 2 → you should land on the dashboard.

Sanity check:
- Tick a session on the **Dashboard** or **Training** page
- Refresh — it should still be ticked (it's now in Supabase)
- Open the dashboard on your phone (same wifi, or after deploy) and confirm it appears

## 6 · Authenticate the Supabase MCP (optional but recommended)

The MCP server is registered in `.mcp.json`. To enable Claude to query/mutate the DB directly during weekly updates:

In a regular terminal (not the IDE extension):

```bash
claude /mcp
```

Select `supabase`, choose **Authenticate**, and follow the OAuth flow.

## 7 · Deploy to Vercel

### Option A — Vercel CLI (fastest)

```bash
npm install -g vercel    # one-time
cd projects/HealthPlan/app
vercel                   # follow prompts: link to a new project named "bermuda-cut"
```

After it finishes, set the env vars on the deployed project:

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel --prod            # promote to production with the new vars
```

### Option B — Git + Vercel dashboard

1. Push this folder to a GitHub repo (private is fine — single user)
2. Go to vercel.com → **Add new** → **Project** → import the repo
3. Set **Root directory** to `projects/HealthPlan/app` if importing the parent repo
4. Add environment variables on the **Configure project** screen:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://mlgjiqtpakwaqbbmpspc.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = the anon key
5. Click **Deploy**

You'll get a URL like `bermuda-cut.vercel.app` — open it on phone and laptop, sign in once on each, and the data syncs.

## 8 · Add the Vercel URL to Supabase auth allowed origins

1. Supabase → **Authentication → URL Configuration**
2. **Site URL**: `https://your-vercel-url.vercel.app`
3. **Redirect URLs**: add `https://your-vercel-url.vercel.app/**`

Without this, login may redirect to localhost on the deployed app.

## 9 · Add to phone home screen

On iOS Safari / Android Chrome: open the URL → share → **Add to Home Screen**. The app is already viewport-locked and uses safe-area insets; it'll behave like a PWA-lite.

## Weekly update — what to hand Claude

After the first week, every Sunday say something like:

> Update the canteen menu in `src/data/plan.ts` for the week of 27 April. Here's the menu I got from the office screen: …

Claude will edit only `canteenMenu` in `src/data/plan.ts`. Push to git → Vercel redeploys automatically.

## Troubleshooting

- **"Invalid login credentials"**: user wasn't auto-confirmed in step 2 — go back and toggle **Auto-confirm user** when creating, or re-confirm via the user's row.
- **Login succeeds but immediately redirects back to /login**: middleware can't read cookies — check `NEXT_PUBLIC_SUPABASE_URL` is correct (no trailing slash) and the anon key is the public one, not the service-role key.
- **Weight chart blank**: nothing logged yet. Enter a value in the Start (90.0) cell — chart updates on blur.
- **`npm run build` errors on TypeScript**: if you've edited `plan.ts`, your shape probably no longer matches the interfaces at the top of that file. Match them or update the interface.
