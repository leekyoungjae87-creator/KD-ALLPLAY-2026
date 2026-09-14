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

-- V76.31 쌤PICK 최종 결과 저장
create table if not exists public.kd_ssampick_result (
  id integer primary key check (id = 1),
  grade1 integer check (grade1 between 1 and 7),
  grade2 integer check (grade2 between 1 and 8),
  grade3 integer check (grade3 between 1 and 7),
  updated_at timestamptz not null default now()
);
alter table public.kd_ssampick_result enable row level security;
drop policy if exists "kd_ssampick_result_select" on public.kd_ssampick_result;
drop policy if exists "kd_ssampick_result_insert" on public.kd_ssampick_result;
drop policy if exists "kd_ssampick_result_update" on public.kd_ssampick_result;
create policy "kd_ssampick_result_select" on public.kd_ssampick_result for select to anon using (true);
create policy "kd_ssampick_result_insert" on public.kd_ssampick_result for insert to anon with check (true);
create policy "kd_ssampick_result_update" on public.kd_ssampick_result for update to anon using (true) with check (true);
