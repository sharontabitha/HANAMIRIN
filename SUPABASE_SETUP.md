# Supabase and deployment setup

The app works without Supabase and saves progress in this browser. Configure Supabase to sync a learner's profile, saved words, and completed chapters:

1. Create a Supabase project and copy `.env.example` to `.env`.
2. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (the legacy anon key is also accepted).
3. Run [`supabase/schema.sql`](./supabase/schema.sql) in the project's SQL Editor.
4. Enable **Anonymous Sign-Ins** in Authentication → Sign-In / Providers.
5. Restart the Vite server after changing `.env`.

The browser creates an anonymous learner session and applies row-level security to the learner's saved state. Anonymous accounts are tied to the browser session; clearing browser storage or changing devices will not recover that account. The app still works locally if Supabase is unavailable.

Profile pictures are uploaded to the public `profile-photos` bucket; each upload is limited to 2 MB. The public bucket only permits writes into that learner's own user-id folder.

## Deploy to Vercel

The repository includes `vercel.json` with the production build command, output directory, and SPA fallback for direct navigation and refreshes.

1. Push the project to a Git provider supported by Vercel, then import that repository in Vercel.
2. Keep the build settings from `vercel.json` (`npm run build`, output directory `dist`).
3. If Supabase sync is desired, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` under **Project Settings → Environment Variables** for the environments you use, then redeploy.

Without those values, the deployed app uses browser-local storage. For a manual static deploy, run `npm run build` and deploy the contents of `dist`.

Do not commit `.env` or use a Supabase service-role key in the browser or deployment's `VITE_*` variables. The publishable/anon key is intended for browser use; row-level security policies protect the data.
