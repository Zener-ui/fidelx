-- Fidelx Supabase setup. Run once in Supabase -> SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.contact_submissions (
 id uuid primary key default gen_random_uuid(), name text not null, email text not null,
 phone text, role text, message text, created_at timestamptz not null default now()
);
create table if not exists public.partner_inquiries (
 id uuid primary key default gen_random_uuid(), name text not null, organization text,
 email text not null, phone text, interest text, message text, created_at timestamptz not null default now()
);
create table if not exists public.newsletter_subscribers (
 id uuid primary key default gen_random_uuid(), email text not null,
 created_at timestamptz not null default now(), constraint newsletter_subscribers_email_key unique(email)
);

alter table public.contact_submissions enable row level security;
alter table public.partner_inquiries enable row level security;
alter table public.newsletter_subscribers enable row level security;

drop policy if exists "public can submit contact forms" on public.contact_submissions;
create policy "public can submit contact forms" on public.contact_submissions for insert to anon, authenticated with check(true);
drop policy if exists "public can submit partner enquiries" on public.partner_inquiries;
create policy "public can submit partner enquiries" on public.partner_inquiries for insert to anon, authenticated with check(true);
drop policy if exists "public can subscribe to newsletter" on public.newsletter_subscribers;
create policy "public can subscribe to newsletter" on public.newsletter_subscribers for insert to anon, authenticated with check(true);

-- Deliberately no public SELECT/UPDATE/DELETE policies: visitors cannot read submissions.
