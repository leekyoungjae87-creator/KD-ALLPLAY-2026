-- V76.12: 교직원 투표를 학년별 1개 -> 2개 학급 선택으로 변경
-- Supabase > SQL Editor에서 1회 실행하세요.

alter table public.kd_votes
  drop constraint if exists kd_votes_one_per_grade;

do $$ begin
  alter table public.kd_votes
    add constraint kd_votes_no_duplicate_class
    unique (voter_name, vote_type, grade, class_no);
exception when duplicate_object then null; end $$;
