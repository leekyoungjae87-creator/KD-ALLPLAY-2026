V76.41 실시간 점수 연동

1) Supabase SQL Editor에서 supabase_scores_setup.sql 전체 실행
2) app.js / index.html / sw.js 업로드(덮어쓰기)
3) config.js는 기존 파일 그대로 유지
4) 관리자 > 당일 점수 빠른 입력에서 점수 입력
5) 다른 휴대폰의 실시간 점수 탭에서 자동 반영 확인

- 관리자 입력 즉시 로컬 백업 + Supabase 저장
- 다른 기기는 Supabase Realtime으로 자동 갱신
- 기존 V76.39의 참가자 20학급/응원퍼포먼스 수정 내용 유지
