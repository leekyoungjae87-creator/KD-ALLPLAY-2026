-- V68 학급 깃발 이미지 공유 설정
create table if not exists public.kd_flags (
  class_key text primary key,
  image_data text not null,
  updated_at timestamptz not null default now()
);
alter table public.kd_flags enable row level security;
drop policy if exists "kd_flags_select" on public.kd_flags;
drop policy if exists "kd_flags_insert" on public.kd_flags;
drop policy if exists "kd_flags_update" on public.kd_flags;
create policy "kd_flags_select" on public.kd_flags for select to anon using (true);
create policy "kd_flags_insert" on public.kd_flags for insert to anon with check (true);
create policy "kd_flags_update" on public.kd_flags for update to anon using (true) with check (true);
grant select, insert, update on public.kd_flags to anon;
