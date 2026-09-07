-- V76.9 교직원 투표: 학년별 1개 → 2개 학급 선택으로 변경
-- Supabase > SQL Editor에서 한 번만 실행하세요.

-- 기존 1표 제한 제거
alter table public.kd_votes
  drop constraint if exists kd_votes_one_per_grade;

-- 같은 교직원이 같은 학년에서 같은 학급을 중복 저장하지 못하도록 변경
alter table public.kd_votes
  drop constraint if exists kd_votes_two_per_grade_unique;
alter table public.kd_votes
  add constraint kd_votes_two_per_grade_unique
  unique (voter_name, vote_type, grade, class_no);

-- 참고: 학년별 최대 2개 선택 제한은 웹앱 UI에서 제어합니다.
