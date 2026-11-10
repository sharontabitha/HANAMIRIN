-- Run this once in the Supabase SQL Editor.
-- Also enable Anonymous Sign-Ins under Authentication > Sign-In / Providers.

create table if not exists public.hanami_user_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  profile jsonb not null default '{}'::jsonb,
  stars jsonb not null default '[]'::jsonb,
  done jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.hanami_user_state enable row level security;

drop policy if exists "Learners can read their own state" on public.hanami_user_state;
create policy "Learners can read their own state"
  on public.hanami_user_state for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Learners can insert their own state" on public.hanami_user_state;
create policy "Learners can insert their own state"
  on public.hanami_user_state for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "Learners can update their own state" on public.hanami_user_state;
create policy "Learners can update their own state"
  on public.hanami_user_state for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('profile-photos', 'profile-photos', true, 2097152, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set public = true, file_size_limit = 2097152;

drop policy if exists "Learners can upload their own profile photo" on storage.objects;
create policy "Learners can upload their own profile photo"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'profile-photos' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "Profile photos are public" on storage.objects;
create policy "Profile photos are public"
  on storage.objects for select to public using (bucket_id = 'profile-photos');
drop policy if exists "Learners can replace their own profile photo" on storage.objects;
create policy "Learners can replace their own profile photo"
  on storage.objects for update to authenticated
  using (bucket_id = 'profile-photos' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'profile-photos' and (storage.foldername(name))[1] = auth.uid()::text);
