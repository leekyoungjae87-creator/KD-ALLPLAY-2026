-- V76.29 쌤PICK 교직원 승부예측
create table if not exists public.kd_staff_picks (
  extension text primary key,
  grade1 integer not null check (grade1 between 1 and 7),
  grade2 integer not null check (grade2 between 1 and 8),
  grade3 integer not null check (grade3 between 1 and 7),
  updated_at timestamptz not null default now()
);
alter table public.kd_staff_picks enable row level security;
drop policy if exists "kd_staff_picks_select" on public.kd_staff_picks;
drop policy if exists "kd_staff_picks_insert" on public.kd_staff_picks;
drop policy if exists "kd_staff_picks_update" on public.kd_staff_picks;
create policy "kd_staff_picks_select" on public.kd_staff_picks for select to anon using (true);
create policy "kd_staff_picks_insert" on public.kd_staff_picks for insert to anon with check (true);
create policy "kd_staff_picks_update" on public.kd_staff_picks for update to anon using (true) with check (true);
