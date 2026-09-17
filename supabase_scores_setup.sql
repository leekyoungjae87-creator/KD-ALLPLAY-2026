-- V76.40 실시간 점수 공유 설정
-- Supabase > SQL Editor에서 1회 실행하세요.

create table if not exists public.kd_scores (
  class_key text not null,
  event_name text not null,
  points integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (class_key, event_name)
);

alter table public.kd_scores enable row level security;

drop policy if exists "kd_scores_read" on public.kd_scores;
create policy "kd_scores_read" on public.kd_scores
for select to anon using (true);

drop policy if exists "kd_scores_insert" on public.kd_scores;
create policy "kd_scores_insert" on public.kd_scores
for insert to anon with check (true);

drop policy if exists "kd_scores_update" on public.kd_scores;
create policy "kd_scores_update" on public.kd_scores
for update to anon using (true) with check (true);

-- Realtime publication 등록 (이미 등록돼 있으면 무시)
do $$
begin
  alter publication supabase_realtime add table public.kd_scores;
exception when duplicate_object then null;
end $$;
