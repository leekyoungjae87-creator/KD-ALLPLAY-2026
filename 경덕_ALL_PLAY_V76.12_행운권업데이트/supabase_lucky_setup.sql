-- 2026 경덕 ALL PLAY 행운권 응모 V76.12
-- Supabase SQL Editor에서 1회 실행하세요.
create table if not exists public.kd_lucky_entries (
  student_id text primary key,
  student_name text not null,
  pin_hash text not null,
  prize_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.kd_lucky_entries enable row level security;
drop policy if exists "lucky anon read" on public.kd_lucky_entries;
drop policy if exists "lucky anon insert" on public.kd_lucky_entries;
drop policy if exists "lucky anon update" on public.kd_lucky_entries;
drop policy if exists "lucky anon delete" on public.kd_lucky_entries;
create policy "lucky anon read" on public.kd_lucky_entries for select to anon using (true);
create policy "lucky anon insert" on public.kd_lucky_entries for insert to anon with check (true);
create policy "lucky anon update" on public.kd_lucky_entries for update to anon using (true) with check (true);
create policy "lucky anon delete" on public.kd_lucky_entries for delete to anon using (true);
