-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- 1. Waitlist table
create table if not exists waitlist (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  source text,           -- hostname where they signed up
  referrer text,         -- where they came from
  invited boolean default false,
  invite_code text unique,
  created_at timestamptz default now()
);

-- 2. Row Level Security — anon can only insert, not read
alter table waitlist enable row level security;

create policy "Anyone can join waitlist"
  on waitlist for insert
  to anon
  with check (true);

-- Only authenticated (you) can read/update
create policy "Authenticated can read waitlist"
  on waitlist for select
  to authenticated
  using (true);

create policy "Authenticated can update waitlist"
  on waitlist for update
  to authenticated
  using (true);

-- 3. Index for fast lookups when sending invites
create index if not exists idx_waitlist_email on waitlist (email);
create index if not exists idx_waitlist_invited on waitlist (invited) where invited = false;

-- 4. Function to generate invite codes (call from dashboard or script)
create or replace function generate_invite_code(waitlist_email text)
returns text
language plpgsql
as $$
declare
  code text;
begin
  code := encode(gen_random_bytes(16), 'hex');
  update waitlist
    set invite_code = code, invited = true
    where email = lower(trim(waitlist_email));
  return code;
end;
$$;

-- Example: Generate an invite for someone
-- select generate_invite_code('someone@email.com');
-- Returns something like: 'a1b2c3d4e5f6...'
-- Their invite link: getcoopr.com/#/get-started?code=a1b2c3d4e5f6...
