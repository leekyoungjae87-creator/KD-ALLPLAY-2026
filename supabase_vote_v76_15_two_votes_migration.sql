-- V76.15: 기존 교직원 투표 DB를 학년별 2표 구조로 변경
-- Supabase > SQL Editor에서 한 번 실행하세요. 기존 투표 데이터는 유지됩니다.

alter table public.kd_votes
  drop constraint if exists kd_votes_one_per_grade;

alter table public.kd_votes
  drop constraint if exists kd_votes_two_per_grade_unique;

alter table public.kd_votes
  add constraint kd_votes_two_per_grade_unique
  unique (voter_name, vote_type, grade, class_no);
