
const EVENT_START = new Date(2026,9,1,8,30,0);
const STORE = {
  scores:'kd_new_scores', prelim:'kd_new_prelim', songs:'kd_new_songs',
  media:'kd_new_media', notices:'kd_new_notices', participants:'kd_new_participants',
  flags:'kd_new_flags', perfVotes:'kd_new_perf_votes', flagVotes:'kd_new_flag_votes', qna:'kd_new_qna'
};

const schedule = [
  ["08:15-08:30","집결","학년별 기준"],
  ["08:30-09:00","개회식 · 준비운동(청소년체조) · 안전교육",""],
  ["09:00-10:00","학급별 응원 퍼포먼스","1 → 2 → 3학년"],
  ["10:00-10:30","학년별 순환 경기","운동장: 1학년 8자 줄넘기 · 농구장: 2학년 슈팅 릴레이 · 강당: 3학년 바운드 배구 결승"],
  ["10:30-11:00","학년별 순환 경기","운동장: 2학년 8자 줄넘기 · 농구장: 3학년 슈팅 릴레이 · 강당: 1학년 바운드 배구 결승"],
  ["11:00-11:30","학년별 순환 경기","운동장: 3학년 8자 줄넘기 · 농구장: 1학년 슈팅 릴레이 · 강당: 2학년 바운드 배구 결승"],
  ["11:30-12:00","2인 3각","3 → 2 → 1학년"],
  ["12:00-13:00","점심 시간","사제 동행 스포츠 한판 12:20-12:50"],
  ["13:00-13:20","림보왕 선발대회","이벤트 경기"],
  ["13:20-14:00","달리는 줄다리기 준결승 · 결승","1 → 2 → 3학년 · 9경기"],
  ["14:00-14:30","미션 이어달리기","학생자치회"],
  ["14:30-15:00","이어달리기 결승","1 → 2 → 3학년 · 3경기"],
  ["15:00-15:20","축하공연","댄스부"],
  ["15:20-16:00","점수집계 · 시상식 · 폐회식 · 뒷정리",""]
];

const eventRules = [
  {icon:"📣",accent:"blue",cat:"이벤트",name:"학급 응원 퍼포먼스",people:"학급 전체",type:"응원전 · 별도 시상",rules:[
    "신청 학급의 학급 전체가 참여하는 것을 원칙으로 하며 학급별 2분 이내로 실시합니다.",
    "입장 → 퍼포먼스 → 퇴장 순으로 진행합니다.",
    "타인 비방, 불쾌감을 주거나 선정적인 내용이 포함되지 않도록 합니다.",
    "참여 인원과 협동·창의·단합·완성도 등을 바탕으로 순위를 결정합니다.",
    "교직원 투표로 학년별 최우수·우수·장려 1학급씩 시상하며 종합점수에는 포함하지 않습니다."
  ]},
  {icon:"🪢",accent:"green",cat:"순환",name:"8자 줄넘기",people:"14명",type:"결선 · 기록 경기",rules:[
    "남학생 6명·여학생 6명과 줄잡이 2명으로 구성합니다.",
    "학생 2명이 줄을 돌리고 12명은 8자 모양으로 1명씩 줄을 넘습니다.",
    "줄 길이는 학급별 자유이며 시작 신호와 함께 줄을 돌리기 시작합니다.",
    "2분 동안 실시하고 총 2회의 기록을 합산합니다.",
    "시작 전 연습 1회를 실시하며 1·2·3·4반 1조 / 5·6·7·8반 2조로 진행합니다.",
    "기록이 같으면 공동 순위로 처리합니다."
  ]},
  {icon:"🏀",accent:"orange",cat:"순환",name:"슈팅 릴레이",people:"14명",type:"결선 · 기록 경기",rules:[
    "남학생 6명·여학생 6명, 후보 2명으로 구성합니다.",
    "야외 농구장에서 2학급씩 동시에 진행합니다.",
    "지정 라인에서 농구 슛 성공 횟수로 순위를 결정하며 라인을 밟거나 넘으면 무효입니다.",
    "남녀 슛 위치는 동일하고 선수 순서는 자유입니다.",
    "1회 99초씩 총 2회 실시하여 성공 횟수를 합산합니다.",
    "시작 전 연습 1분을 실시하며 기록이 같으면 공동 순위로 처리합니다."
  ]},
  {icon:"🏐",accent:"purple",cat:"순환",name:"바운드 배구",people:"20명",type:"결선 경기",rules:[
    "남학생 8명·여학생 8명, 후보 남녀 각 2명으로 구성합니다.",
    "전반 12분은 여학생, 후반 12분은 남학생이 경기합니다.",
    "일반 배구 규칙을 기본으로 하되 바운드를 허용합니다.",
    "서브는 코트 가운데에서 두 손으로 던져 주며 회전·지나치게 길거나 짧은 공격성 서브는 금지합니다.",
    "전·후반 점수를 합산하여 승부를 결정합니다."
  ]},
  {icon:"👫",accent:"blue",cat:"단체",name:"2인 3각",people:"16명",type:"학년별 기록 경기",rules:[
    "남학생 8명·여학생 8명, 2인 1조 × 8팀으로 구성합니다.",
    "학년별 4개 학급이 동시에 진행하며 1·2·3·4반 / 5·6·7·8반으로 나누어 실시합니다.",
    "여-남-여-남-여-남-여-남 순서로 진행합니다.",
    "2인 1조가 다리를 묶고 출발해 반환점(꼬깔)을 돌아온 뒤 다음 조에게 배턴을 전달합니다.",
    "마지막 주자는 조끼를 착용합니다.",
    "반환점을 정상적으로 돌지 않거나 배턴 전달 전에 다음 조가 출발하면 반칙 처리합니다.",
    "마지막 조가 결승선을 통과한 기록을 0.1초 단위까지 측정하여 순위를 결정합니다."
  ]},
  {icon:"🧑‍🤝‍🧑",accent:"green",cat:"단체",name:"달리는 줄다리기",people:"학급 전원",type:"토너먼트 · 3판 2선승",rules:[
    "예선을 통과한 학년별 4팀이 토너먼트로 진행합니다.",
    "학급 전원이 참여하되 경기 시 인원이 적은 반과 동일하게 맞추며 남녀 비율도 맞춥니다.",
    "한 경기 시간은 1분이며 3판 2선승제로 진행합니다.",
    "시작 전 여학생은 줄을 잡고, 남학생은 상대 팀 줄 끝에 맞추어 라인에 섭니다.",
    "휘슬이 울리면 여학생은 줄을 당기고 남학생은 자신의 줄 표시까지 달려와 줄을 당깁니다.",
    "남학생이 달려오는 방향은 오른쪽으로 통일합니다."
  ]},
  {icon:"🏃",accent:"orange",cat:"이벤트",name:"미션 이어달리기",people:"6명",type:"이벤트 경기",rules:[
    "남학생 3명·여학생 3명으로 구성합니다.",
    "미션 6개를 차례로 클리어합니다.",
    "남-여-남-여-남-여 순서로 진행합니다.",
    "출발 지점과 골인 지점은 조회대 앞쪽이며 각 주자가 한바퀴씩 달립니다."
  ]},
  {icon:"🏁",accent:"green",cat:"단체",name:"이어달리기",people:"8명",type:"결선 경기",rules:[
    "남학생 4명·여학생 4명으로 구성합니다.",
    "여-남-여-남-여-남-여-남 순서로 진행합니다.",
    "본부석 조회대 앞쪽에서 출발하여 각 주자가 한바퀴씩 달립니다.",
    "마지막 주자는 결승선까지 달리며 골인 지점은 공원 쪽 수돗가(2학년 응원석)입니다."
  ]},
  {icon:"⚽",accent:"purple",cat:"사전",name:"축구(남)",people:"9명",type:"사전 경기",rules:[
    "9명으로 참가하며 교체선수 1명을 포함합니다.",
    "사전경기로 진행하지만 경기 결과는 종합점수에 포함합니다.",
    "예선은 전·후반 구분 없이 15분 경기로 진행합니다.",
    "결승은 전반 10분, 후반 10분으로 진행합니다.",
    "무승부일 경우 키커 5명의 승부차기로 승부를 결정합니다."
  ]},
  {icon:"🔴",accent:"red",cat:"사전",name:"피구(여)",people:"학급별",type:"사전 경기",rules:[
    "인원이 적은 학급을 기준으로 참가 인원을 동일하게 맞추며 외야는 1명입니다.",
    "사전경기로 진행하지만 경기 결과는 종합점수에 포함합니다.",
    "5분씩 3세트로 진행하며 한 팀이 2세트를 먼저 이기면 종료합니다.",
    "패스는 3회까지 허용하며 외야↔외야, 내야↔내야 패스는 금지합니다.",
    "두 발이 경기장 밖으로 나가면 아웃 처리하며 더블 아웃은 적용하지 않습니다."
  ]}
];

const scoreEvents = ["축구","피구","바운드배구","8자줄넘기","슈팅릴레이","2인3각","달리는줄다리기","미션이어달리기","이어달리기","학급깃발"];

// v38 관리자 직접 결과 입력용 배점표
const rankPoints = {
  "축구":[50,40,30,20,10],
  "피구":[50,40,30,20,10],
  "바운드배구":[60,50,40,30,20],
  "8자줄넘기":[60,50,40,30,20],
  "슈팅릴레이":[60,50,40,30,20],
  "2인3각":[80,60,40,30,30],
  "달리는줄다리기":[100,80,60,50,40],
  "미션이어달리기":[40,30,20,10,10],
  "이어달리기":[100,80,60,50,40],
  "학급깃발":[30,30,20,20,10]
};
function pointsForRank(eventName, rankKey){
  const row=rankPoints[eventName]||[0,0,0,0,0];
  const idx=Math.max(0,Math.min(4,Number(rankKey)-1));
  return row[idx]||0;
}

const prelimEvents = ["축구(남)","피구(여)","바운드 배구","달리는 줄다리기","이어달리기"];
const defaultPrelim = {
  "축구(남)_1":"결승: 1학년 3반 VS 7반 · 9.14.(월)",
  "축구(남)_2":"결승: 2학년 3반 VS 8반 · 9.15.(화)",
  "축구(남)_3":"결승: 3학년 3반 VS 7반 · 9.16.(수)",
  "피구(여)_1":"결승: 1학년 2반 VS 5반 · 9.14.(월)",
  "피구(여)_2":"결승: 2학년 1반 VS 7반 · 9.15.(화)",
  "피구(여)_3":"결승: 3학년 1반 VS 6반 · 9.16.(수)",
  "바운드 배구_1":"9.10.(목) 예선 결과: 3반 22 : 23 4반 · 1반 16 : 36 2반 · 5반 22 : 32 6반 · 5반 20 : 32 7반 / 9.17.(목) 준결승: 2반 VS 4반 · 6반 VS 7반 (리그전 진행 중)",
  "바운드 배구_2":"9.10.(목) 예선 결과: 1반 29 : 18 4반 · 2반 28 : 23 3반 · 5반 24 : 22 6반 · 7반 22 : 17 8반 / 9.17.(목) 준결승: 1반 VS 2반 · 5반 VS 7반 (리그전 진행 중)",
  "바운드 배구_3":"9.10.(목) 예선 결과: 2반 22 : 23 4반 · 1반 23 : 24 3반 · 5반 30 : 18 6반 · 6반 29 : 22 7반 / 9.17.(목) 준결승: 3반 VS 4반 · 5반 VS 7반 (리그전 진행 중)",
  "달리는 줄다리기_1":"예선: 3반 VS 5반 · 4반 VS 6반 · 1반 VS 7반 · 2반 부전승 / 준결승·결승: 체육한마당 당일 진행",
  "달리는 줄다리기_2":"예선: 4반 VS 7반 · 2반 VS 3반 · 5반 VS 8반 · 1반 VS 6반 / 준결승·결승: 체육한마당 당일 진행",
  "달리는 줄다리기_3":"예선: 5반 VS 6반 · 3반 VS 4반 · 2반 VS 7반 · 1반 부전승 / 준결승·결승: 체육한마당 당일 진행",
  "이어달리기_1":"예선 1조: 1·3·6·7반 중 2개 반 결승 진출 / 예선 2조: 2·4·5반 중 2개 반 결승 진출 / 결승: 체육한마당 당일 진행",
  "이어달리기_2":"예선 1조: 4·5·6·7반 중 2개 반 결승 진출 / 예선 2조: 1·2·3·8반 중 2개 반 결승 진출 / 결승: 체육한마당 당일 진행",
  "이어달리기_3":"예선 1조: 1·3·4·5반 중 2개 반 결승 진출 / 예선 2조: 2·6·7반 중 2개 반 결승 진출 / 결승: 체육한마당 당일 진행"
};
const prelimSchedule = {"축구(남)": "9. 3.(목) 준결승 → 9. 14.(월) 1학년 · 9. 15.(화) 2학년 · 9. 16.(수) 3학년 결승", "피구(여)": "9. 3.(목) 준결승 → 9. 14.(월) 1학년 · 9. 15.(화) 2학년 · 9. 16.(수) 3학년 결승", "바운드 배구": "9. 10.(목) 예선 → 9. 17.(목) 준결승", "달리는 줄다리기": "9. 30.(수) 예선 → 체육한마당 당일 준결승·결승", "이어달리기": "9. 30.(수) 예선 → 체육한마당 당일 결승"};
const ops = [
  ["응원 퍼포먼스","전 교직원 투표","각 학년 체육교사 지원"],
  ["학급 깃발","전 교직원 투표","각 학년 체육교사 지원"],
  ["8자 줄넘기","각 학년 담임교사","부심: 체육교사"],
  ["슈팅 릴레이","스포츠강사 ①·②","부심: 체육교사"],
  ["바운드 배구","스포츠강사 ③·④","부심: 체육교사"],
  ["2인 3각","스포츠강사 ①~④","부심: 각 학년 체육교사"],
  ["달리는 줄다리기","체육교사","선수 정렬·인원 확인 지원"],
  ["미션 이어달리기","학생자치회","선수 정렬·인원 확인"],
  ["이어달리기 결승","체육교사","배턴터치존·골인지점 운영"]
];
const defaultNotices = [
  {title:"🍧 경덕아버지회 팥빙수 부스 운영 안내",body:"경덕아버지회에서 학생들을 위해 팥빙수 부스를 운영합니다. 장소: 야외 농구장 쪽 주차장 · 운영시간: 12:00~15:00 · 이용순서: 3학년 → 2학년 → 1학년. 점심식사 후 학급별 안내에 따라 순서대로 이동해 주세요. 팥 알레르기가 있는 학생은 섭취에 유의해 주세요. 학생들을 위해 준비해 주신 경덕아버지회에 감사드립니다.",time:"체육한마당 당일 안내"},
  {title:"선수 대기 안내",body:"참가 선수는 경기 시작 5분 전 대기 장소로 이동해 주세요.",time:"행사 운영 안내"},
  {title:"참가 원칙",body:"달리는 줄다리기를 제외하고 1인당 최소 2종목 이상, 최대 4종목까지 참여합니다.",time:"참가 요강"},
  {title:"안전 안내",body:"경기 중 심판의 안내와 안전수칙을 반드시 지켜 주세요.",time:"안전교육"}
];

function load(key,fallback){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{return fallback}}
function save(key,val){localStorage.setItem(key,JSON.stringify(val))}
function classCount(g){return g===2?8:7}

function maskName(name){
  const n=(name||'').trim();
  if(n.length<=1) return n;
  if(n.length===2) return n[0]+'0';
  return n[0]+'0'+n.slice(2);
}
function escapeHtml(v){
  return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>showPage(b.dataset.page));
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>showPage(b.dataset.go));
let pendingStaffView='';
document.querySelectorAll('[data-staff-target]').forEach(b=>b.onclick=()=>{
  pendingStaffView=b.dataset.staffTarget;
  showPage('staff');
  if(!staffArea.classList.contains('hidden')) staffView(pendingStaffView);
});
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));
  document.querySelectorAll('[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===id));
  if(id==='staff') window.scrollTo(0,0);
  else window.scrollTo({top:0,behavior:'smooth'});
}

function updateCountdown(){
  let diff=EVENT_START-new Date();
  let d=0,h=0,m=0,s=0;
  if(diff>0){
    d=Math.floor(diff/86400000); diff%=86400000;
    h=Math.floor(diff/3600000); diff%=3600000;
    m=Math.floor(diff/60000); s=Math.floor((diff%60000)/1000);
  }
  const txt=diff<=0?'D-DAY':`D-${d}`;
  document.getElementById('homeDday').textContent=txt;
  document.getElementById('ddayText').textContent=txt;
  document.getElementById('days').textContent=String(d).padStart(2,'0');
  document.getElementById('hours').textContent=String(h).padStart(2,'0');
  document.getElementById('minutes').textContent=String(m).padStart(2,'0');
  document.getElementById('seconds').textContent=String(s).padStart(2,'0');
  document.getElementById('homeH').textContent=String(h).padStart(2,'0');
  document.getElementById('homeM').textContent=String(m).padStart(2,'0');
  document.getElementById('homeS').textContent=String(s).padStart(2,'0');
  document.getElementById('homeCountSub').textContent=d>0?`${d}일 ${h}시간 ${m}분 남았습니다.`:'오늘은 ALL PLAY!';
}
updateCountdown();setInterval(updateCountdown,1000);

function toMin(t){let [h,m]=t.split(':').map(Number);return h*60+m}
function updateNow(){
  const now=new Date(); let cur="행사 준비 중",next="10월 1일 08:30 개회식";
  if(now.getFullYear()===2026&&now.getMonth()===9&&now.getDate()===1){
    let min=now.getHours()*60+now.getMinutes(), idx=-1;
    schedule.forEach((x,i)=>{let [a,b]=x[0].split('-').map(toMin);if(min>=a&&min<b)idx=i});
    if(idx>=0){cur=schedule[idx][1];next=idx<schedule.length-1?`${schedule[idx+1][0].split('-')[0]} ${schedule[idx+1][1]}`:"행사 종료"}
    else if(min<495){cur="행사 시작 전";next="08:15 학급 집결"} else {cur="행사 종료";next="수고했어요!"}
  }
  nowProgram.textContent=cur;nextProgram.textContent=next;
  renderSchedule();
}
updateNow();setInterval(updateNow,60000);

function renderSchedule(){
  let now=new Date(), mins=now.getHours()*60+now.getMinutes();
  scheduleList.innerHTML=schedule.map(x=>{
    let [a,b]=x[0].split('-').map(toMin), isNow=now.getFullYear()===2026&&now.getMonth()===9&&now.getDate()===1&&mins>=a&&mins<b;
    let cat=(x[1].includes('점심')?'lunch':x[1].includes('줄다리기')||x[1].includes('이어달리기')?'finale':x[1].includes('시상')||x[1].includes('폐회')?'close':x[1].includes('응원')||x[1].includes('축하')?'festival':'game');
    return `<div class="timeline-row ${cat} ${isNow?'current':''}"><time>${x[0]}</time><div><b>${x[1]}</b><small>${x[2]}</small></div><span class="location">${isNow?'진행 중':'예정'}</span></div>`;
  }).join('');
}renderSchedule();

let currentGrade=1;
function getScores(){
  let s=load(STORE.scores,{});
  [1,2,3].forEach(g=>{for(let c=1;c<=classCount(g);c++){let key=`${g}-${c}`;if(!s[key])s[key]={};scoreEvents.forEach(e=>{if(s[key][e]==null)s[key][e]=0})}});
  return s;
}
// V76.23 확정 경기결과 1회 반영: 1학년 축구 1위 7반, 2위 3반, 3위 6반
function applyV7623ConfirmedScores(){
  const migrationKey='kd_v7623_confirmed_scores';
  if(localStorage.getItem(migrationKey)==='1') return;
  const s=getScores();
  s['1-7']['축구']=pointsForRank('축구',1); // 50점
  s['1-3']['축구']=pointsForRank('축구',2); // 40점
  s['1-6']['축구']=pointsForRank('축구',3); // 30점
  save(STORE.scores,s);
  localStorage.setItem(migrationKey,'1');
}
applyV7623ConfirmedScores();

// V76.24 확정 경기결과 1회 반영: 2학년 축구 1위 3반, 2위 8반, 3위 1반, 4위 7반
function applyV7624ConfirmedScores(){
  const migrationKey='kd_v7624_confirmed_scores';
  if(localStorage.getItem(migrationKey)==='1') return;
  const s=getScores();
  s['2-3']['축구']=pointsForRank('축구',1); // 50점
  s['2-8']['축구']=pointsForRank('축구',2); // 40점
  s['2-1']['축구']=pointsForRank('축구',3); // 30점
  s['2-7']['축구']=pointsForRank('축구',4); // 20점
  save(STORE.scores,s);
  localStorage.setItem(migrationKey,'1');
}
applyV7624ConfirmedScores();

function gradeRows(g){
  let s=getScores();
  return Array.from({length:classCount(g)},(_,i)=>{let key=`${g}-${i+1}`, total=scoreEvents.reduce((a,e)=>a+(Number(s[key][e])||0),0);return {key,total,data:s[key]}}).sort((a,b)=>b.total-a.total);
}
function renderScores(){
  let rows=gradeRows(currentGrade);
  const medals=['🥇','🥈','🥉'];
  rankCards.innerHTML=rows.slice(0,3).map((r,i)=>`<div class="rank-card podium-${i+1}"><div class="rank-medal">${medals[i]}</div><span>${i+1}위</span><strong>${r.key}</strong><b>${r.total}<small>점</small></b><em>${currentGrade}학년 TOP ${i+1}</em></div>`).join('');
  scoreTable.innerHTML=`<div class="score-board-head"><div><small>CLASS RANKING</small><b>${currentGrade}학년 전체 순위</b></div><span>🏁 경기 결과 반영</span></div><table class="score-table"><thead><tr><th>순위</th><th>학급</th>${scoreEvents.map(e=>`<th>${e}</th>`).join('')}<th>총점</th></tr></thead><tbody>${rows.map((r,i)=>`<tr class="${i<3?'top-row top-'+(i+1):''}"><td><span class="table-rank">${i<3?medals[i]:i+1}</span></td><td class="class-cell"><b>${r.key}</b></td>${scoreEvents.map(e=>`<td>${r.data[e]}</td>`).join('')}<td class="total-cell"><b>${r.total}</b><small>점</small></td></tr>`).join('')}</tbody></table>`;
  renderLeaders();
}
document.querySelectorAll('#gradeTabs button').forEach(b=>b.onclick=()=>{currentGrade=Number(b.dataset.grade);document.querySelectorAll('#gradeTabs button').forEach(x=>x.classList.toggle('active',x===b));renderScores()});
function renderLeaders(){const el=document.getElementById('leaderBoard');if(!el)return;el.innerHTML=[1,2,3].map(g=>{let r=gradeRows(g)[0];return `<div class="leader"><span>${g}학년 선두</span><b>${r.key}</b><small>${r.total}점</small></div>`}).join('')}
renderScores();

ruleFilter.innerHTML=['전체','사전','순환','단체','이벤트','평가'].map((x,i)=>`<button class="${i===0?'active':''}" data-rule="${x}">${x}</button>`).join('');
function renderRules(f='전체'){
  let arr=f==='전체'?eventRules:eventRules.filter(x=>x.cat===f);
  ruleList.innerHTML=arr.map((x,i)=>`
    <article class="rule-card rule-${x.accent||'blue'}">
      <div class="rule-card-top">
        <div class="rule-num">${String(i+1).padStart(2,'0')}</div>
        <div class="rule-title-wrap">
          <div class="rule-kicker">${x.cat}</div>
          <h3>${x.name}</h3>
        </div>
        <div class="rule-illustration" aria-hidden="true">${x.icon||'🏅'}</div>
      </div>
      <div class="rule-meta">
        <span>👥 참가 ${x.people}</span>
        <span>🎯 ${x.type}</span>
      </div>
      <div class="rule-body">
        <div class="rule-body-title">경기 방법 및 규칙</div>
        <ul>${x.rules.map(r=>`<li>${r}</li>`).join('')}</ul>
      </div>
    </article>
  `).join('');
}
document.querySelectorAll('#ruleFilter button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#ruleFilter button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderRules(b.dataset.rule)});renderRules();

bracketFilter.innerHTML=['전체',...prelimEvents].map((x,i)=>`<button class="${i===0?'active':''}" data-bracket="${x}">${x}</button>`).join('');
function renderBrackets(f='전체'){
  let store={...defaultPrelim,...load(STORE.prelim,{})}, arr=f==='전체'?prelimEvents:[f];
  const eventIcon={'축구(남)':'⚽','피구(여)':'🔴','바운드 배구':'🏐','달리는 줄다리기':'🪢','이어달리기':'🏃'};
  bracketList.innerHTML=arr.map(e=>`<article class="bracket-card bracket-card-v40">
    <div class="bracket-card-head"><span class="bracket-event-icon">${eventIcon[e]||'🏟️'}</span><div><small>PRE-GAME</small><h3>${e}</h3></div><em>예선 진행 · 결과</em></div>
    <div class="bracket-date"><span>📅 경기 일정</span><b>${prelimSchedule[e]||''}</b></div>
    <div class="bracket-grade-results">${[1,2,3].map(g=>{let r=store[`${e}_${g}`]||'진행 예정';let done=r!=='진행 예정';return `<div class="bracket-row ${done?'is-done':''}"><div class="bracket-grade-badge"><i>${g}</i><span>${g}학년</span></div><b class="bracket-result-text">${r}</b><em>${done?'확인':'예정'}</em></div>`}).join('')}</div>
  </article>`).join('');
}
document.querySelectorAll('#bracketFilter button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#bracketFilter button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderBrackets(b.dataset.bracket)});renderBrackets();

const PHOTO_PARTICIPANTS_V7622=[{"no":"1101","name":"김단아","className":"1학년 1반","classKey":"1-1","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"1102","name":"김민채","className":"1학년 1반","classKey":"1-1","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"1103","name":"김채율","className":"1학년 1반","classKey":"1-1","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"1104","name":"김하은","className":"1학년 1반","classKey":"1-1","events":["달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"1105","name":"김현성","className":"1학년 1반","classKey":"1-1","events":["8자 줄넘기","미션 이어달리기","달리는 줄다리기","슈팅 릴레이"]},{"no":"1106","name":"김혜민","className":"1학년 1반","classKey":"1-1","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"1107","name":"류연우","className":"1학년 1반","classKey":"1-1","events":["8자 줄넘기","바운드 배구","달리는 줄다리기"]},{"no":"1108","name":"박정연","className":"1학년 1반","classKey":"1-1","events":["8자 줄넘기","바운드 배구","달리는 줄다리기"]},{"no":"1109","name":"신예담","className":"1학년 1반","classKey":"1-1","events":["바운드 배구","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"1110","name":"안호단","className":"1학년 1반","classKey":"1-1","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"1111","name":"유준","className":"1학년 1반","classKey":"1-1","events":["바운드 배구","달리는 줄다리기","이어달리기"]},{"no":"1112","name":"이서준","className":"1학년 1반","classKey":"1-1","events":["8자 줄넘기","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"1113","name":"이연주","className":"1학년 1반","classKey":"1-1","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","슈팅 릴레이","이어달리기"]},{"no":"1114","name":"이예진","className":"1학년 1반","classKey":"1-1","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"1115","name":"이재현","className":"1학년 1반","classKey":"1-1","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"1116","name":"이채원","className":"1학년 1반","classKey":"1-1","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"1117","name":"임서호","className":"1학년 1반","classKey":"1-1","events":["미션 이어달리기","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"1118","name":"정도연","className":"1학년 1반","classKey":"1-1","events":["달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"1119","name":"정예슬","className":"1학년 1반","classKey":"1-1","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각","이어달리기"]},{"no":"1120","name":"정하율","className":"1학년 1반","classKey":"1-1","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기","슈팅 릴레이"]},{"no":"1121","name":"조은규","className":"1학년 1반","classKey":"1-1","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"1122","name":"조인아","className":"1학년 1반","classKey":"1-1","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기","이어달리기"]},{"no":"1123","name":"주현승","className":"1학년 1반","classKey":"1-1","events":["바운드 배구","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"1124","name":"현주환","className":"1학년 1반","classKey":"1-1","events":["바운드 배구","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"1201","name":"고정민","className":"1학년 2반","classKey":"1-2","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"1202","name":"곽동건","className":"1학년 2반","classKey":"1-2","events":["8자 줄넘기","미션 이어달리기","달리는 줄다리기","2인 3각"]},{"no":"1203","name":"김가연","className":"1학년 2반","classKey":"1-2","events":["8자 줄넘기","달리는 줄다리기","2인 3각"]},{"no":"1204","name":"김고은","className":"1학년 2반","classKey":"1-2","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"1205","name":"김라윤","className":"1학년 2반","classKey":"1-2","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"1206","name":"김수호","className":"1학년 2반","classKey":"1-2","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각","이어달리기"]},{"no":"1207","name":"김진서","className":"1학년 2반","classKey":"1-2","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","2인 3각"]},{"no":"1208","name":"김하람","className":"1학년 2반","classKey":"1-2","events":["바운드 배구","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"1209","name":"문지후","className":"1학년 2반","classKey":"1-2","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"1210","name":"박정윤","className":"1학년 2반","classKey":"1-2","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","슈팅 릴레이","이어달리기"]},{"no":"1211","name":"박채은","className":"1학년 2반","classKey":"1-2","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이","이어달리기"]},{"no":"1212","name":"배민하","className":"1학년 2반","classKey":"1-2","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이","이어달리기"]},{"no":"1213","name":"심재인","className":"1학년 2반","classKey":"1-2","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"1214","name":"오준영","className":"1학년 2반","classKey":"1-2","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"1215","name":"우민수","className":"1학년 2반","classKey":"1-2","events":["바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"1216","name":"이서준","className":"1학년 2반","classKey":"1-2","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"1217","name":"이연서","className":"1학년 2반","classKey":"1-2","events":["8자 줄넘기","미션 이어달리기","달리는 줄다리기","슈팅 릴레이","이어달리기"]},{"no":"1218","name":"임유준","className":"1학년 2반","classKey":"1-2","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","슈팅 릴레이"]},{"no":"1219","name":"정서은","className":"1학년 2반","classKey":"1-2","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"1220","name":"정지윤","className":"1학년 2반","classKey":"1-2","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"1221","name":"지서윤","className":"1학년 2반","classKey":"1-2","events":["8자 줄넘기","달리는 줄다리기","2인 3각"]},{"no":"1222","name":"지완","className":"1학년 2반","classKey":"1-2","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이","2인 3각","이어달리기"]},{"no":"1223","name":"최아진","className":"1학년 2반","classKey":"1-2","events":["미션 이어달리기","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"1224","name":"허서정","className":"1학년 2반","classKey":"1-2","events":["바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"1301","name":"김나은","className":"1학년 3반","classKey":"1-3","events":["8자 줄넘기","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"1302","name":"김도영","className":"1학년 3반","classKey":"1-3","events":["바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"1303","name":"김민재","className":"1학년 3반","classKey":"1-3","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"1304","name":"김아윤","className":"1학년 3반","classKey":"1-3","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"1306","name":"김주찬","className":"1학년 3반","classKey":"1-3","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"1307","name":"김태윤","className":"1학년 3반","classKey":"1-3","events":["슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"1308","name":"남태인","className":"1학년 3반","classKey":"1-3","events":["8자 줄넘기","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"1309","name":"박시아","className":"1학년 3반","classKey":"1-3","events":["슈팅 릴레이","바운드 배구","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"1310","name":"박시우","className":"1학년 3반","classKey":"1-3","events":["바운드 배구","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"1311","name":"박예린","className":"1학년 3반","classKey":"1-3","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"1312","name":"서효경","className":"1학년 3반","classKey":"1-3","events":["8자 줄넘기","바운드 배구","달리는 줄다리기"]},{"no":"1313","name":"오유준","className":"1학년 3반","classKey":"1-3","events":["8자 줄넘기","슈팅 릴레이","2인 3각","달리는 줄다리기"]},{"no":"1314","name":"유시연","className":"1학년 3반","classKey":"1-3","events":["슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"1315","name":"유영채","className":"1학년 3반","classKey":"1-3","events":["8자 줄넘기","2인 3각","달리는 줄다리기"]},{"no":"1316","name":"이윤찬","className":"1학년 3반","classKey":"1-3","events":["8자 줄넘기","달리는 줄다리기"]},{"no":"1317","name":"임지환","className":"1학년 3반","classKey":"1-3","events":["8자 줄넘기","슈팅 릴레이","달리는 줄다리기"]},{"no":"1318","name":"정서윤","className":"1학년 3반","classKey":"1-3","events":["슈팅 릴레이","바운드 배구","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"1319","name":"최한희","className":"1학년 3반","classKey":"1-3","events":["슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"1320","name":"최혜승","className":"1학년 3반","classKey":"1-3","events":["바운드 배구","2인 3각","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"1321","name":"한서준","className":"1학년 3반","classKey":"1-3","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"1322","name":"함윤지","className":"1학년 3반","classKey":"1-3","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"1323","name":"LIU ANG","className":"1학년 3반","classKey":"1-3","events":["8자 줄넘기","바운드 배구","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"1325","name":"김려원","className":"1학년 3반","classKey":"1-3","events":["슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"1326","name":"HOU JUNZHU","className":"1학년 3반","classKey":"1-3","events":["바운드 배구","달리는 줄다리기"]},{"no":"1401","name":"강하늘","className":"1학년 4반","classKey":"1-4","events":["바운드 배구","달리는 줄다리기"]},{"no":"1402","name":"국대유","className":"1학년 4반","classKey":"1-4","events":["8자 줄넘기","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"1403","name":"권우성","className":"1학년 4반","classKey":"1-4","events":["8자 줄넘기","슈팅 릴레이","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"1404","name":"김건휘","className":"1학년 4반","classKey":"1-4","events":["8자 줄넘기","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"1405","name":"김민서","className":"1학년 4반","classKey":"1-4","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"1406","name":"김서율","className":"1학년 4반","classKey":"1-4","events":["슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"1407","name":"김시율","className":"1학년 4반","classKey":"1-4","events":["8자 줄넘기","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"1408","name":"김예지","className":"1학년 4반","classKey":"1-4","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"1409","name":"박수연","className":"1학년 4반","classKey":"1-4","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"1410","name":"박현규","className":"1학년 4반","classKey":"1-4","events":["바운드 배구","달리는 줄다리기"]},{"no":"1411","name":"서규운","className":"1학년 4반","classKey":"1-4","events":["8자 줄넘기","바운드 배구","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"1412","name":"송지효","className":"1학년 4반","classKey":"1-4","events":["슈팅 릴레이","바운드 배구","2인 3각","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"1413","name":"신재민","className":"1학년 4반","classKey":"1-4","events":["바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"1414","name":"양지우","className":"1학년 4반","classKey":"1-4","events":["슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"1415","name":"임다현","className":"1학년 4반","classKey":"1-4","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"1416","name":"임태경","className":"1학년 4반","classKey":"1-4","events":["슈팅 릴레이","바운드 배구","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"1417","name":"전유건","className":"1학년 4반","classKey":"1-4","events":["슈팅 릴레이","달리는 줄다리기"]},{"no":"1418","name":"정시아","className":"1학년 4반","classKey":"1-4","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"1419","name":"정채율","className":"1학년 4반","classKey":"1-4","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"1420","name":"지현석","className":"1학년 4반","classKey":"1-4","events":["8자 줄넘기","슈팅 릴레이","2인 3각","달리는 줄다리기"]},{"no":"1421","name":"최은호","className":"1학년 4반","classKey":"1-4","events":["바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"1422","name":"표찬솔","className":"1학년 4반","classKey":"1-4","events":["8자 줄넘기","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"1423","name":"한민결","className":"1학년 4반","classKey":"1-4","events":["슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"1424","name":"박준아","className":"1학년 4반","classKey":"1-4","events":["8자 줄넘기","달리는 줄다리기"]},{"no":"1601","name":"강태후","className":"1학년 6반","classKey":"1-6","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"1602","name":"김규량","className":"1학년 6반","classKey":"1-6","events":["슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"1603","name":"김규형","className":"1학년 6반","classKey":"1-6","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"1604","name":"김수지","className":"1학년 6반","classKey":"1-6","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"1605","name":"김승언","className":"1학년 6반","classKey":"1-6","events":["슈팅 릴레이","2인 3각","달리는 줄다리기"]},{"no":"1606","name":"김채율","className":"1학년 6반","classKey":"1-6","events":["슈팅 릴레이","바운드 배구","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"1607","name":"노서진","className":"1학년 6반","classKey":"1-6","events":["8자 줄넘기","바운드 배구","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"1608","name":"박시혁","className":"1학년 6반","classKey":"1-6","events":["8자 줄넘기","슈팅 릴레이","2인 3각","달리는 줄다리기"]},{"no":"1609","name":"배준민","className":"1학년 6반","classKey":"1-6","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"1610","name":"송은","className":"1학년 6반","classKey":"1-6","events":["슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"1612","name":"오대율","className":"1학년 6반","classKey":"1-6","events":["8자 줄넘기","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"1613","name":"유영민","className":"1학년 6반","classKey":"1-6","events":["바운드 배구","2인 3각","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"1614","name":"윤유람","className":"1학년 6반","classKey":"1-6","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"1615","name":"이도율","className":"1학년 6반","classKey":"1-6","events":["슈팅 릴레이","바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"1616","name":"이서현","className":"1학년 6반","classKey":"1-6","events":["슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"1617","name":"이영승","className":"1학년 6반","classKey":"1-6","events":["8자 줄넘기","2인 3각","달리는 줄다리기"]},{"no":"1618","name":"이채은","className":"1학년 6반","classKey":"1-6","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"1619","name":"이충현","className":"1학년 6반","classKey":"1-6","events":["슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"1620","name":"임현서","className":"1학년 6반","classKey":"1-6","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"1621","name":"정혜원","className":"1학년 6반","classKey":"1-6","events":["8자 줄넘기","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"1622","name":"하정윤","className":"1학년 6반","classKey":"1-6","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"1623","name":"한예나","className":"1학년 6반","classKey":"1-6","events":["달리는 줄다리기"]},{"no":"1624","name":"이한결","className":"1학년 6반","classKey":"1-6","events":["2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"2101","name":"권서현","className":"2학년 1반","classKey":"2-1","events":["슈팅 릴레이","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"2102","name":"권현서","className":"2학년 1반","classKey":"2-1","events":["8자 줄넘기","2인 3각","달리는 줄다리기"]},{"no":"2103","name":"김서랑","className":"2학년 1반","classKey":"2-1","events":["8자 줄넘기","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2104","name":"김준섭","className":"2학년 1반","classKey":"2-1","events":["바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2105","name":"김하율","className":"2학년 1반","classKey":"2-1","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2106","name":"김형동","className":"2학년 1반","classKey":"2-1","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"2107","name":"나호영","className":"2학년 1반","classKey":"2-1","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"2108","name":"남예주","className":"2학년 1반","classKey":"2-1","events":["슈팅 릴레이","2인 3각","달리는 줄다리기"]},{"no":"2109","name":"노석현","className":"2학년 1반","classKey":"2-1","events":["슈팅 릴레이","2인 3각","달리는 줄다리기"]},{"no":"2111","name":"박진명","className":"2학년 1반","classKey":"2-1","events":["바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"2112","name":"변준서","className":"2학년 1반","classKey":"2-1","events":["8자 줄넘기","바운드 배구","달리는 줄다리기"]},{"no":"2113","name":"서유찬","className":"2학년 1반","classKey":"2-1","events":["슈팅 릴레이","바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"2114","name":"서정원","className":"2학년 1반","classKey":"2-1","events":["8자 줄넘기","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"2115","name":"송유진","className":"2학년 1반","classKey":"2-1","events":["슈팅 릴레이","바운드 배구","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"2116","name":"송희진","className":"2학년 1반","classKey":"2-1","events":["바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2117","name":"안상현","className":"2학년 1반","classKey":"2-1","events":["8자 줄넘기","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2118","name":"유태규","className":"2학년 1반","classKey":"2-1","events":["슈팅 릴레이","바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"2119","name":"이고은","className":"2학년 1반","classKey":"2-1","events":["슈팅 릴레이","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2120","name":"이민준","className":"2학년 1반","classKey":"2-1","events":["슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"2121","name":"이윤희","className":"2학년 1반","classKey":"2-1","events":["달리는 줄다리기"]},{"no":"2122","name":"이정민","className":"2학년 1반","classKey":"2-1","events":["8자 줄넘기","슈팅 릴레이","2인 3각","달리는 줄다리기"]},{"no":"2123","name":"이종현","className":"2학년 1반","classKey":"2-1","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2124","name":"전지원","className":"2학년 1반","classKey":"2-1","events":["슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2125","name":"전지은","className":"2학년 1반","classKey":"2-1","events":["슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2126","name":"정창화","className":"2학년 1반","classKey":"2-1","events":["8자 줄넘기","바운드 배구","달리는 줄다리기"]},{"no":"2127","name":"최은아","className":"2학년 1반","classKey":"2-1","events":["8자 줄넘기","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2128","name":"현지민","className":"2학년 1반","classKey":"2-1","events":["8자 줄넘기","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2129","name":"김은비","className":"2학년 1반","classKey":"2-1","events":["8자 줄넘기","슈팅 릴레이","이어달리기","달리는 줄다리기"]},{"no":"2201","name":"고은찬","className":"2학년 2반","classKey":"2-2","events":["8자 줄넘기","미션 이어달리기","달리는 줄다리기"]},{"no":"2202","name":"김도훈","className":"2학년 2반","classKey":"2-2","events":["8자 줄넘기","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"2203","name":"김민준","className":"2학년 2반","classKey":"2-2","events":["슈팅 릴레이","미션 이어달리기","달리는 줄다리기"]},{"no":"2204","name":"김세아","className":"2학년 2반","classKey":"2-2","events":["8자 줄넘기","2인 3각","달리는 줄다리기","미션 이어달리기"]},{"no":"2205","name":"민주현","className":"2학년 2반","classKey":"2-2","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"2206","name":"방서율","className":"2학년 2반","classKey":"2-2","events":["슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2207","name":"백우진","className":"2학년 2반","classKey":"2-2","events":["슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기","2인 3각"]},{"no":"2208","name":"석연우","className":"2학년 2반","classKey":"2-2","events":["바운드 배구","달리는 줄다리기"]},{"no":"2209","name":"석윤서","className":"2학년 2반","classKey":"2-2","events":["바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"2210","name":"석지민","className":"2학년 2반","classKey":"2-2","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"2211","name":"손연우","className":"2학년 2반","classKey":"2-2","events":["8자 줄넘기","미션 이어달리기","달리는 줄다리기","2인 3각"]},{"no":"2212","name":"송지훈","className":"2학년 2반","classKey":"2-2","events":["슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2213","name":"양건우","className":"2학년 2반","classKey":"2-2","events":["바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2214","name":"여지민","className":"2학년 2반","classKey":"2-2","events":["8자 줄넘기","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"2215","name":"원영섭","className":"2학년 2반","classKey":"2-2","events":["바운드 배구","2인 3각","이어달리기","달리는 줄다리기","8자 줄넘기"]},{"no":"2216","name":"유수린","className":"2학년 2반","classKey":"2-2","events":["슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2217","name":"이서준","className":"2학년 2반","classKey":"2-2","events":["8자 줄넘기","2인 3각","달리는 줄다리기"]},{"no":"2218","name":"이예진","className":"2학년 2반","classKey":"2-2","events":["슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2219","name":"이은채","className":"2학년 2반","classKey":"2-2","events":["슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2220","name":"이재경","className":"2학년 2반","classKey":"2-2","events":["8자 줄넘기","바운드 배구","달리는 줄다리기"]},{"no":"2221","name":"이준현","className":"2학년 2반","classKey":"2-2","events":["8자 줄넘기","이어달리기","달리는 줄다리기"]},{"no":"2222","name":"이태경","className":"2학년 2반","classKey":"2-2","events":["바운드 배구","달리는 줄다리기"]},{"no":"2223","name":"이하율","className":"2학년 2반","classKey":"2-2","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"2224","name":"진솔","className":"2학년 2반","classKey":"2-2","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2225","name":"최유정","className":"2학년 2반","classKey":"2-2","events":["달리는 줄다리기"]},{"no":"2226","name":"한준서","className":"2학년 2반","classKey":"2-2","events":["슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2227","name":"홍수민","className":"2학년 2반","classKey":"2-2","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"2228","name":"SAMOKHIN KONSTANTIN","className":"2학년 2반","classKey":"2-2","events":["슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"2301","name":"김경준","className":"2학년 3반","classKey":"2-3","events":["슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"2302","name":"김대욱","className":"2학년 3반","classKey":"2-3","events":["슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2303","name":"김민재","className":"2학년 3반","classKey":"2-3","events":["8자 줄넘기","슈팅 릴레이","달리는 줄다리기"]},{"no":"2304","name":"김지용","className":"2학년 3반","classKey":"2-3","events":["슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"2305","name":"김진온","className":"2학년 3반","classKey":"2-3","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"2306","name":"노윤하","className":"2학년 3반","classKey":"2-3","events":["8자 줄넘기","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2307","name":"박주혁","className":"2학년 3반","classKey":"2-3","events":["8자 줄넘기","바운드 배구","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"2308","name":"박준성","className":"2학년 3반","classKey":"2-3","events":["바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2309","name":"박태이","className":"2학년 3반","classKey":"2-3","events":["바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2310","name":"배은호","className":"2학년 3반","classKey":"2-3","events":["슈팅 릴레이","2인 3각","달리는 줄다리기"]},{"no":"2311","name":"배하민","className":"2학년 3반","classKey":"2-3","events":["달리는 줄다리기"]},{"no":"2312","name":"서재승","className":"2학년 3반","classKey":"2-3","events":["8자 줄넘기","바운드 배구","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"2313","name":"신서윤","className":"2학년 3반","classKey":"2-3","events":["슈팅 릴레이","2인 3각","달리는 줄다리기"]},{"no":"2314","name":"오준서","className":"2학년 3반","classKey":"2-3","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"2315","name":"유진모","className":"2학년 3반","classKey":"2-3","events":["8자 줄넘기","달리는 줄다리기"]},{"no":"2316","name":"이승준","className":"2학년 3반","classKey":"2-3","events":["8자 줄넘기","미션 이어달리기","달리는 줄다리기"]},{"no":"2317","name":"이윤아","className":"2학년 3반","classKey":"2-3","events":["바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2318","name":"이채원","className":"2학년 3반","classKey":"2-3","events":["슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"2319","name":"임준석","className":"2학년 3반","classKey":"2-3","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2320","name":"장승원","className":"2학년 3반","classKey":"2-3","events":["8자 줄넘기","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"2321","name":"전시연","className":"2학년 3반","classKey":"2-3","events":["8자 줄넘기","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2322","name":"조소영","className":"2학년 3반","classKey":"2-3","events":["슈팅 릴레이","바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"2323","name":"최연서","className":"2학년 3반","classKey":"2-3","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2324","name":"최윤지","className":"2학년 3반","classKey":"2-3","events":["슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2325","name":"최윤혜","className":"2학년 3반","classKey":"2-3","events":["8자 줄넘기","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2326","name":"하태성","className":"2학년 3반","classKey":"2-3","events":["2인 3각","달리는 줄다리기"]},{"no":"2327","name":"한서호","className":"2학년 3반","classKey":"2-3","events":["8자 줄넘기","미션 이어달리기","달리는 줄다리기"]},{"no":"2328","name":"한정인","className":"2학년 3반","classKey":"2-3","events":["슈팅 릴레이","바운드 배구","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"2401","name":"강선주","className":"2학년 4반","classKey":"2-4","events":["8자 줄넘기","슈팅 릴레이","2인 3각","달리는 줄다리기"]},{"no":"2402","name":"김보민","className":"2학년 4반","classKey":"2-4","events":["슈팅 릴레이","바운드 배구","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"2403","name":"김성재","className":"2학년 4반","classKey":"2-4","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2404","name":"김시우","className":"2학년 4반","classKey":"2-4","events":["슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"2405","name":"김우인","className":"2학년 4반","classKey":"2-4","events":["8자 줄넘기","바운드 배구","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"2406","name":"김준혁","className":"2학년 4반","classKey":"2-4","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"2407","name":"김태율","className":"2학년 4반","classKey":"2-4","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"2408","name":"김현아","className":"2학년 4반","classKey":"2-4","events":["슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2409","name":"남연주","className":"2학년 4반","classKey":"2-4","events":["바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2410","name":"도연아","className":"2학년 4반","classKey":"2-4","events":["바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2411","name":"문주빈","className":"2학년 4반","classKey":"2-4","events":["8자 줄넘기","슈팅 릴레이","2인 3각","달리는 줄다리기"]},{"no":"2412","name":"문채원","className":"2학년 4반","classKey":"2-4","events":["슈팅 릴레이","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"2413","name":"박선호","className":"2학년 4반","classKey":"2-4","events":["8자 줄넘기","슈팅 릴레이","2인 3각","달리는 줄다리기"]},{"no":"2414","name":"박우찬","className":"2학년 4반","classKey":"2-4","events":["바운드 배구","2인 3각","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"2415","name":"박종혁","className":"2학년 4반","classKey":"2-4","events":["8자 줄넘기","2인 3각","달리는 줄다리기"]},{"no":"2416","name":"오윤서","className":"2학년 4반","classKey":"2-4","events":["8자 줄넘기","2인 3각","달리는 줄다리기"]},{"no":"2417","name":"윤단휘","className":"2학년 4반","classKey":"2-4","events":["슈팅 릴레이","2인 3각","달리는 줄다리기"]},{"no":"2418","name":"윤소은","className":"2학년 4반","classKey":"2-4","events":["슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"2419","name":"이동규","className":"2학년 4반","classKey":"2-4","events":["슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"2420","name":"이수지","className":"2학년 4반","classKey":"2-4","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"2421","name":"이예승","className":"2학년 4반","classKey":"2-4","events":["달리는 줄다리기"]},{"no":"2422","name":"전아린","className":"2학년 4반","classKey":"2-4","events":["8자 줄넘기","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"2423","name":"정이현","className":"2학년 4반","classKey":"2-4","events":["바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2424","name":"지수안","className":"2학년 4반","classKey":"2-4","events":["8자 줄넘기","바운드 배구","달리는 줄다리기"]},{"no":"2425","name":"지우진","className":"2학년 4반","classKey":"2-4","events":["바운드 배구","2인 3각","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"2426","name":"홍라온","className":"2학년 4반","classKey":"2-4","events":["바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2427","name":"HAN PAVEL IGOREVICH","className":"2학년 4반","classKey":"2-4","events":["달리는 줄다리기"]},{"no":"2428","name":"박찬유","className":"2학년 4반","classKey":"2-4","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"2429","name":"문미소","className":"2학년 4반","classKey":"2-4","events":["8자 줄넘기","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"2501","name":"강희원","className":"2학년 5반","classKey":"2-5","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"2502","name":"고가은","className":"2학년 5반","classKey":"2-5","events":["바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2503","name":"권도빈","className":"2학년 5반","classKey":"2-5","events":["슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2504","name":"김민건","className":"2학년 5반","classKey":"2-5","events":["슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"2505","name":"김찬율","className":"2학년 5반","classKey":"2-5","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"2506","name":"김채현","className":"2학년 5반","classKey":"2-5","events":["슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"2507","name":"박경남","className":"2학년 5반","classKey":"2-5","events":["슈팅 릴레이","2인 3각","달리는 줄다리기"]},{"no":"2508","name":"박서진","className":"2학년 5반","classKey":"2-5","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"2509","name":"박서현","className":"2학년 5반","classKey":"2-5","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"2510","name":"박소율","className":"2학년 5반","classKey":"2-5","events":["슈팅 릴레이","달리는 줄다리기"]},{"no":"2511","name":"박승우","className":"2학년 5반","classKey":"2-5","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"2512","name":"박지유","className":"2학년 5반","classKey":"2-5","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"2513","name":"배하엘","className":"2학년 5반","classKey":"2-5","events":["8자 줄넘기","2인 3각","달리는 줄다리기"]},{"no":"2514","name":"송예겸","className":"2학년 5반","classKey":"2-5","events":["8자 줄넘기","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2515","name":"신성원","className":"2학년 5반","classKey":"2-5","events":["슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2516","name":"신하현","className":"2학년 5반","classKey":"2-5","events":["8자 줄넘기","2인 3각","달리는 줄다리기"]},{"no":"2517","name":"신혜성","className":"2학년 5반","classKey":"2-5","events":["슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2518","name":"안소현","className":"2학년 5반","classKey":"2-5","events":["8자 줄넘기","2인 3각","달리는 줄다리기"]},{"no":"2519","name":"우성윤","className":"2학년 5반","classKey":"2-5","events":["8자 줄넘기","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2520","name":"윤도연","className":"2학년 5반","classKey":"2-5","events":["달리는 줄다리기"]},{"no":"2521","name":"이윤후","className":"2학년 5반","classKey":"2-5","events":["달리는 줄다리기"]},{"no":"2522","name":"이지예","className":"2학년 5반","classKey":"2-5","events":["8자 줄넘기","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"2523","name":"이채윤","className":"2학년 5반","classKey":"2-5","events":["바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2524","name":"전용재","className":"2학년 5반","classKey":"2-5","events":["8자 줄넘기","바운드 배구","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"2525","name":"정서우","className":"2학년 5반","classKey":"2-5","events":["슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"2526","name":"지민주","className":"2학년 5반","classKey":"2-5","events":["슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"2527","name":"한윤서","className":"2학년 5반","classKey":"2-5","events":["8자 줄넘기","2인 3각","달리는 줄다리기"]},{"no":"2528","name":"한찬희","className":"2학년 5반","classKey":"2-5","events":["슈팅 릴레이","바운드 배구","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"2601","name":"곽채현","className":"2학년 6반","classKey":"2-6","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기","2인 3각"]},{"no":"2602","name":"구민혁","className":"2학년 6반","classKey":"2-6","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"2603","name":"김민주","className":"2학년 6반","classKey":"2-6","events":["8자 줄넘기","미션 이어달리기","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"2604","name":"김선우","className":"2학년 6반","classKey":"2-6","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"2605","name":"김선율","className":"2학년 6반","classKey":"2-6","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"2606","name":"김아란","className":"2학년 6반","classKey":"2-6","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"2607","name":"김은유","className":"2학년 6반","classKey":"2-6","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"2608","name":"김태한","className":"2학년 6반","classKey":"2-6","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"2609","name":"노태호","className":"2학년 6반","classKey":"2-6","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"2610","name":"박연아","className":"2학년 6반","classKey":"2-6","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","2인 3각"]},{"no":"2611","name":"박지민","className":"2학년 6반","classKey":"2-6","events":["바운드 배구","달리는 줄다리기","이어달리기"]},{"no":"2612","name":"송서혁","className":"2학년 6반","classKey":"2-6","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"2613","name":"오서인","className":"2학년 6반","classKey":"2-6","events":["달리는 줄다리기"]},{"no":"2614","name":"오지안","className":"2학년 6반","classKey":"2-6","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"2615","name":"이가은","className":"2학년 6반","classKey":"2-6","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"2616","name":"이도경","className":"2학년 6반","classKey":"2-6","events":["바운드 배구","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"2617","name":"이영린","className":"2학년 6반","classKey":"2-6","events":["달리는 줄다리기"]},{"no":"2618","name":"이인하","className":"2학년 6반","classKey":"2-6","events":["8자 줄넘기","달리는 줄다리기","2인 3각"]},{"no":"2619","name":"이재혁","className":"2학년 6반","classKey":"2-6","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","2인 3각"]},{"no":"2620","name":"이준수","className":"2학년 6반","classKey":"2-6","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각","이어달리기"]},{"no":"2621","name":"이현준","className":"2학년 6반","classKey":"2-6","events":["달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"2622","name":"이현진","className":"2학년 6반","classKey":"2-6","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"2623","name":"정수지","className":"2학년 6반","classKey":"2-6","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"2625","name":"최성빈","className":"2학년 6반","classKey":"2-6","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"2626","name":"황유은","className":"2학년 6반","classKey":"2-6","events":["달리는 줄다리기","슈팅 릴레이","2인 3각","이어달리기"]},{"no":"2627","name":"황이수","className":"2학년 6반","classKey":"2-6","events":["미션 이어달리기","달리는 줄다리기"]},{"no":"2628","name":"SHABAYEVA POLINA","className":"2학년 6반","classKey":"2-6","events":["8자 줄넘기","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"2701","name":"강민후","className":"2학년 7반","classKey":"2-7","events":["8자 줄넘기","바운드 배구","달리는 줄다리기"]},{"no":"2702","name":"강새롬","className":"2학년 7반","classKey":"2-7","events":["미션 이어달리기","달리는 줄다리기","2인 3각"]},{"no":"2703","name":"강연우","className":"2학년 7반","classKey":"2-7","events":["달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"2704","name":"김가은","className":"2학년 7반","classKey":"2-7","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"2705","name":"김나라","className":"2학년 7반","classKey":"2-7","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"2706","name":"김도연","className":"2학년 7반","classKey":"2-7","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이","이어달리기"]},{"no":"2707","name":"김도현","className":"2학년 7반","classKey":"2-7","events":["바운드 배구","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"2708","name":"김동우","className":"2학년 7반","classKey":"2-7","events":["달리는 줄다리기","슈팅 릴레이","2인 3각","이어달리기"]},{"no":"2709","name":"김민석","className":"2학년 7반","classKey":"2-7","events":["미션 이어달리기","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"2710","name":"김민찬","className":"2학년 7반","classKey":"2-7","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이"]},{"no":"2711","name":"김세은","className":"2학년 7반","classKey":"2-7","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"2712","name":"김우리","className":"2학년 7반","classKey":"2-7","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"2713","name":"박윤서","className":"2학년 7반","classKey":"2-7","events":["미션 이어달리기","달리는 줄다리기","2인 3각"]},{"no":"2714","name":"서보현","className":"2학년 7반","classKey":"2-7","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이"]},{"no":"2715","name":"송서진","className":"2학년 7반","classKey":"2-7","events":["8자 줄넘기","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"2716","name":"송은수","className":"2학년 7반","classKey":"2-7","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"2717","name":"안현준","className":"2학년 7반","classKey":"2-7","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","이어달리기"]},{"no":"2718","name":"오기윤","className":"2학년 7반","classKey":"2-7","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"2719","name":"우현진","className":"2학년 7반","classKey":"2-7","events":["8자 줄넘기","달리는 줄다리기","2인 3각"]},{"no":"2720","name":"이동건","className":"2학년 7반","classKey":"2-7","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","이어달리기"]},{"no":"2721","name":"이수지","className":"2학년 7반","classKey":"2-7","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","2인 3각"]},{"no":"2722","name":"이승준","className":"2학년 7반","classKey":"2-7","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"2724","name":"장호윤","className":"2학년 7반","classKey":"2-7","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이"]},{"no":"2725","name":"정보민","className":"2학년 7반","classKey":"2-7","events":["8자 줄넘기","달리는 줄다리기","2인 3각"]},{"no":"2726","name":"최성혁","className":"2학년 7반","classKey":"2-7","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"2727","name":"허나연","className":"2학년 7반","classKey":"2-7","events":["바운드 배구","달리는 줄다리기","이어달리기"]},{"no":"2728","name":"허은서","className":"2학년 7반","classKey":"2-7","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이","이어달리기"]},{"no":"2729","name":"허재우","className":"2학년 7반","classKey":"2-7","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","슈팅 릴레이"]},{"no":"2801","name":"강보빈","className":"2학년 8반","classKey":"2-8","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"2802","name":"고다현","className":"2학년 8반","classKey":"2-8","events":["달리는 줄다리기","슈팅 릴레이"]},{"no":"2803","name":"권하람","className":"2학년 8반","classKey":"2-8","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"2804","name":"김설민","className":"2학년 8반","classKey":"2-8","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","이어달리기"]},{"no":"2805","name":"김세진","className":"2학년 8반","classKey":"2-8","events":["달리는 줄다리기","슈팅 릴레이","이어달리기"]},{"no":"2806","name":"김소은","className":"2학년 8반","classKey":"2-8","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"2807","name":"김아림","className":"2학년 8반","classKey":"2-8","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","슈팅 릴레이"]},{"no":"2808","name":"김예진","className":"2학년 8반","classKey":"2-8","events":["바운드 배구","달리는 줄다리기"]},{"no":"2809","name":"김유현","className":"2학년 8반","classKey":"2-8","events":["바운드 배구","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"2810","name":"김은유","className":"2학년 8반","classKey":"2-8","events":["달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"2811","name":"김지민","className":"2학년 8반","classKey":"2-8","events":["8자 줄넘기","달리는 줄다리기","2인 3각"]},{"no":"2812","name":"김진욱","className":"2학년 8반","classKey":"2-8","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"2813","name":"김태영","className":"2학년 8반","classKey":"2-8","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"2814","name":"박태형","className":"2학년 8반","classKey":"2-8","events":["바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"2815","name":"박하람","className":"2학년 8반","classKey":"2-8","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"2816","name":"배현준","className":"2학년 8반","classKey":"2-8","events":["바운드 배구","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"2817","name":"서보민","className":"2학년 8반","classKey":"2-8","events":["8자 줄넘기","달리는 줄다리기","2인 3각"]},{"no":"2818","name":"유강현","className":"2학년 8반","classKey":"2-8","events":["미션 이어달리기","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"2819","name":"윤동주","className":"2학년 8반","classKey":"2-8","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"2820","name":"윤서희","className":"2학년 8반","classKey":"2-8","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","2인 3각"]},{"no":"2821","name":"이도경","className":"2학년 8반","classKey":"2-8","events":["달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"2822","name":"이동건","className":"2학년 8반","classKey":"2-8","events":["8자 줄넘기","달리는 줄다리기","2인 3각"]},{"no":"2823","name":"이현진","className":"2학년 8반","classKey":"2-8","events":["미션 이어달리기","달리는 줄다리기","2인 3각"]},{"no":"2824","name":"천우석","className":"2학년 8반","classKey":"2-8","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"2825","name":"한성훈","className":"2학년 8반","classKey":"2-8","events":["8자 줄넘기","달리는 줄다리기"]},{"no":"2826","name":"현꽃마리","className":"2학년 8반","classKey":"2-8","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"2827","name":"황준기","className":"2학년 8반","classKey":"2-8","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이"]},{"no":"2828","name":"카롤리나","className":"2학년 8반","classKey":"2-8","events":["8자 줄넘기","바운드 배구","슈팅 릴레이"]},{"no":"2828","name":"GALKINA KAROLINA SERGEEVNA","className":"2학년 8반","classKey":"2-8","events":["달리는 줄다리기"]},{"no":"2829","name":"크세니아","className":"2학년 8반","classKey":"2-8","events":["바운드 배구","슈팅 릴레이"]},{"no":"2829","name":"LI KSENIYA ALEKSANDROVNA","className":"2학년 8반","classKey":"2-8","events":["달리는 줄다리기","이어달리기"]},{"no":"3101","name":"강동연","className":"3학년 1반","classKey":"3-1","events":["8자 줄넘기","바운드 배구","2인 3각","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"3102","name":"강민주","className":"3학년 1반","classKey":"3-1","events":["8자 줄넘기","2인 3각","달리는 줄다리기"]},{"no":"3103","name":"권도혁","className":"3학년 1반","classKey":"3-1","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3104","name":"김나현","className":"3학년 1반","classKey":"3-1","events":["2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"3105","name":"김동우","className":"3학년 1반","classKey":"3-1","events":["8자 줄넘기","이어달리기","달리는 줄다리기"]},{"no":"3106","name":"김동하","className":"3학년 1반","classKey":"3-1","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3107","name":"김범준","className":"3학년 1반","classKey":"3-1","events":["달리는 줄다리기"]},{"no":"3108","name":"김은영","className":"3학년 1반","classKey":"3-1","events":["바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"3109","name":"김주하","className":"3학년 1반","classKey":"3-1","events":["미션 이어달리기","달리는 줄다리기"]},{"no":"3110","name":"박서정","className":"3학년 1반","classKey":"3-1","events":["슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"3111","name":"박서현","className":"3학년 1반","classKey":"3-1","events":["바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"3112","name":"박준석","className":"3학년 1반","classKey":"3-1","events":["8자 줄넘기","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3113","name":"백경빈","className":"3학년 1반","classKey":"3-1","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"3114","name":"서하린","className":"3학년 1반","classKey":"3-1","events":["미션 이어달리기","달리는 줄다리기"]},{"no":"3116","name":"연도흠","className":"3학년 1반","classKey":"3-1","events":["슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3117","name":"유은율","className":"3학년 1반","classKey":"3-1","events":["바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3118","name":"이예림","className":"3학년 1반","classKey":"3-1","events":["바운드 배구","달리는 줄다리기"]},{"no":"3119","name":"이지우","className":"3학년 1반","classKey":"3-1","events":["8자 줄넘기","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3120","name":"이진","className":"3학년 1반","classKey":"3-1","events":["슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3121","name":"이현진","className":"3학년 1반","classKey":"3-1","events":["미션 이어달리기","달리는 줄다리기"]},{"no":"3122","name":"임서연","className":"3학년 1반","classKey":"3-1","events":["슈팅 릴레이","2인 3각","달리는 줄다리기"]},{"no":"3123","name":"임진하","className":"3학년 1반","classKey":"3-1","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"3124","name":"장수혁","className":"3학년 1반","classKey":"3-1","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"3125","name":"조문영","className":"3학년 1반","classKey":"3-1","events":["8자 줄넘기","슈팅 릴레이","달리는 줄다리기"]},{"no":"3126","name":"주선균","className":"3학년 1반","classKey":"3-1","events":["바운드 배구","달리는 줄다리기"]},{"no":"3127","name":"최라온","className":"3학년 1반","classKey":"3-1","events":["8자 줄넘기","달리는 줄다리기"]},{"no":"3128","name":"KIM KIRILL","className":"3학년 1반","classKey":"3-1","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3129","name":"PAK MAXIM","className":"3학년 1반","classKey":"3-1","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"3201","name":"권용석","className":"3학년 2반","classKey":"3-2","events":["8자 줄넘기","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3202","name":"권태윤","className":"3학년 2반","classKey":"3-2","events":["바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3203","name":"김민성","className":"3학년 2반","classKey":"3-2","events":["8자 줄넘기","슈팅 릴레이","2인 3각","달리는 줄다리기"]},{"no":"3204","name":"김서휘","className":"3학년 2반","classKey":"3-2","events":["8자 줄넘기","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3205","name":"김수빈","className":"3학년 2반","classKey":"3-2","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"3206","name":"김아림","className":"3학년 2반","classKey":"3-2","events":["달리는 줄다리기"]},{"no":"3207","name":"김유나","className":"3학년 2반","classKey":"3-2","events":["달리는 줄다리기"]},{"no":"3208","name":"김은지","className":"3학년 2반","classKey":"3-2","events":["달리는 줄다리기"]},{"no":"3209","name":"문유찬","className":"3학년 2반","classKey":"3-2","events":["슈팅 릴레이","바운드 배구","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"3210","name":"민지우","className":"3학년 2반","classKey":"3-2","events":["8자 줄넘기","슈팅 릴레이","달리는 줄다리기"]},{"no":"3211","name":"박리우","className":"3학년 2반","classKey":"3-2","events":["바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3212","name":"박준호","className":"3학년 2반","classKey":"3-2","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"3213","name":"송현호","className":"3학년 2반","classKey":"3-2","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"3214","name":"신우진","className":"3학년 2반","classKey":"3-2","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"3215","name":"신하은","className":"3학년 2반","classKey":"3-2","events":["슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"3216","name":"엄나경","className":"3학년 2반","classKey":"3-2","events":["바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"3217","name":"연승재","className":"3학년 2반","classKey":"3-2","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"3218","name":"염서진","className":"3학년 2반","classKey":"3-2","events":["바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3219","name":"이다원","className":"3학년 2반","classKey":"3-2","events":["8자 줄넘기","바운드 배구","2인 3각","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"3220","name":"이지안","className":"3학년 2반","classKey":"3-2","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"3221","name":"인서연","className":"3학년 2반","classKey":"3-2","events":["8자 줄넘기","슈팅 릴레이","달리는 줄다리기"]},{"no":"3222","name":"임성민","className":"3학년 2반","classKey":"3-2","events":["바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"3223","name":"전상연","className":"3학년 2반","classKey":"3-2","events":["달리는 줄다리기"]},{"no":"3224","name":"정지유","className":"3학년 2반","classKey":"3-2","events":["슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3225","name":"최예준","className":"3학년 2반","classKey":"3-2","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3226","name":"탁유민","className":"3학년 2반","classKey":"3-2","events":["이어달리기","달리는 줄다리기"]},{"no":"3227","name":"한라희","className":"3학년 2반","classKey":"3-2","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"3228","name":"KIM SOFIYA SERGEEVNA","className":"3학년 2반","classKey":"3-2","events":["슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"3301","name":"강동건","className":"3학년 3반","classKey":"3-3","events":["슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3302","name":"강샛별","className":"3학년 3반","classKey":"3-3","events":["2인 3각","달리는 줄다리기"]},{"no":"3303","name":"김규림","className":"3학년 3반","classKey":"3-3","events":["8자 줄넘기","바운드 배구","달리는 줄다리기"]},{"no":"3304","name":"김민지","className":"3학년 3반","classKey":"3-3","events":["슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3305","name":"김재현","className":"3학년 3반","classKey":"3-3","events":["바운드 배구","달리는 줄다리기"]},{"no":"3306","name":"김지율","className":"3학년 3반","classKey":"3-3","events":["슈팅 릴레이","바운드 배구","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"3307","name":"남유이","className":"3학년 3반","classKey":"3-3","events":["바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3308","name":"민지호","className":"3학년 3반","classKey":"3-3","events":["달리는 줄다리기"]},{"no":"3309","name":"백담우","className":"3학년 3반","classKey":"3-3","events":["슈팅 릴레이","바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"3310","name":"송예화","className":"3학년 3반","classKey":"3-3","events":["8자 줄넘기","슈팅 릴레이","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"3311","name":"송윤","className":"3학년 3반","classKey":"3-3","events":["바운드 배구","달리는 줄다리기"]},{"no":"3312","name":"신유준","className":"3학년 3반","classKey":"3-3","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"3313","name":"심민준","className":"3학년 3반","classKey":"3-3","events":["8자 줄넘기","슈팅 릴레이","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"3314","name":"염다인","className":"3학년 3반","classKey":"3-3","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"3315","name":"오대겸","className":"3학년 3반","classKey":"3-3","events":["8자 줄넘기","슈팅 릴레이","2인 3각","달리는 줄다리기"]},{"no":"3316","name":"이하은","className":"3학년 3반","classKey":"3-3","events":["8자 줄넘기","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"3317","name":"이혜민","className":"3학년 3반","classKey":"3-3","events":["슈팅 릴레이","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"3318","name":"이효정","className":"3학년 3반","classKey":"3-3","events":["8자 줄넘기","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"3319","name":"정종혁","className":"3학년 3반","classKey":"3-3","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"3320","name":"정택훈","className":"3학년 3반","classKey":"3-3","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3321","name":"정현우","className":"3학년 3반","classKey":"3-3","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"3322","name":"주예은","className":"3학년 3반","classKey":"3-3","events":["8자 줄넘기","바운드 배구","이어달리기","달리는 줄다리기"]},{"no":"3323","name":"천준이","className":"3학년 3반","classKey":"3-3","events":["바운드 배구","달리는 줄다리기"]},{"no":"3324","name":"최민아","className":"3학년 3반","classKey":"3-3","events":["슈팅 릴레이","달리는 줄다리기"]},{"no":"3325","name":"한진솔","className":"3학년 3반","classKey":"3-3","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"3326","name":"허재이","className":"3학년 3반","classKey":"3-3","events":["8자 줄넘기","2인 3각","달리는 줄다리기"]},{"no":"3327","name":"황인준","className":"3학년 3반","classKey":"3-3","events":["달리는 줄다리기"]},{"no":"3328","name":"BUTAYEVA POLINA","className":"3학년 3반","classKey":"3-3","events":["달리는 줄다리기"]},{"no":"3401","name":"김다연","className":"3학년 4반","classKey":"3-4","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"3402","name":"김도윤","className":"3학년 4반","classKey":"3-4","events":["달리는 줄다리기"]},{"no":"3403","name":"김소율","className":"3학년 4반","classKey":"3-4","events":["달리는 줄다리기"]},{"no":"3404","name":"김용준","className":"3학년 4반","classKey":"3-4","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3405","name":"김주은","className":"3학년 4반","classKey":"3-4","events":["슈팅 릴레이","바운드 배구","2인 3각","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"3406","name":"김태율","className":"3학년 4반","classKey":"3-4","events":["슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"3407","name":"박시후","className":"3학년 4반","classKey":"3-4","events":["바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3408","name":"박지현","className":"3학년 4반","classKey":"3-4","events":["슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"3409","name":"박한나","className":"3학년 4반","classKey":"3-4","events":["8자 줄넘기","슈팅 릴레이","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"3410","name":"신예원","className":"3학년 4반","classKey":"3-4","events":["8자 줄넘기","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3411","name":"신희상","className":"3학년 4반","classKey":"3-4","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3412","name":"유지민","className":"3학년 4반","classKey":"3-4","events":["슈팅 릴레이","바운드 배구","2인 3각","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"3413","name":"윤재영","className":"3학년 4반","classKey":"3-4","events":["달리는 줄다리기"]},{"no":"3414","name":"이강주","className":"3학년 4반","classKey":"3-4","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"3415","name":"이성민","className":"3학년 4반","classKey":"3-4","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","달리는 줄다리기"]},{"no":"3416","name":"이세린","className":"3학년 4반","classKey":"3-4","events":["8자 줄넘기","달리는 줄다리기"]},{"no":"3417","name":"이예지","className":"3학년 4반","classKey":"3-4","events":["슈팅 릴레이","2인 3각","달리는 줄다리기"]},{"no":"3419","name":"이준서","className":"3학년 4반","classKey":"3-4","events":["8자 줄넘기","바운드 배구","2인 3각","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"3420","name":"임승환","className":"3학년 4반","classKey":"3-4","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","이어달리기","달리는 줄다리기"]},{"no":"3421","name":"장은서","className":"3학년 4반","classKey":"3-4","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3422","name":"정소율","className":"3학년 4반","classKey":"3-4","events":["미션 이어달리기","달리는 줄다리기"]},{"no":"3423","name":"정하은","className":"3학년 4반","classKey":"3-4","events":["바운드 배구","2인 3각","미션 이어달리기","이어달리기","달리는 줄다리기"]},{"no":"3424","name":"지서준","className":"3학년 4반","classKey":"3-4","events":["바운드 배구","2인 3각","달리는 줄다리기"]},{"no":"3425","name":"진시우","className":"3학년 4반","classKey":"3-4","events":["8자 줄넘기","달리는 줄다리기"]},{"no":"3426","name":"최혜인","className":"3학년 4반","classKey":"3-4","events":["8자 줄넘기","슈팅 릴레이","바운드 배구","2인 3각","미션 이어달리기","달리는 줄다리기"]},{"no":"3427","name":"홍채원","className":"3학년 4반","classKey":"3-4","events":["8자 줄넘기","달리는 줄다리기"]},{"no":"3428","name":"황수지","className":"3학년 4반","classKey":"3-4","events":["달리는 줄다리기"]},{"no":"3429","name":"이정혜(LI TINGHUI)","className":"3학년 4반","classKey":"3-4","events":["바운드 배구","달리는 줄다리기"]},{"no":"3501","name":"김민수","className":"3학년 5반","classKey":"3-5","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3502","name":"김서윤","className":"3학년 5반","classKey":"3-5","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이","이어달리기"]},{"no":"3503","name":"김소연","className":"3학년 5반","classKey":"3-5","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"3504","name":"김호림","className":"3학년 5반","classKey":"3-5","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3505","name":"남소담","className":"3학년 5반","classKey":"3-5","events":["달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3506","name":"배지한","className":"3학년 5반","classKey":"3-5","events":["바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"3507","name":"송근혁","className":"3학년 5반","classKey":"3-5","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각","이어달리기"]},{"no":"3508","name":"신재호","className":"3학년 5반","classKey":"3-5","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","슈팅 릴레이"]},{"no":"3509","name":"오유림","className":"3학년 5반","classKey":"3-5","events":["8자 줄넘기","달리는 줄다리기","2인 3각"]},{"no":"3510","name":"오하늘","className":"3학년 5반","classKey":"3-5","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"3511","name":"원서윤","className":"3학년 5반","classKey":"3-5","events":["바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"3512","name":"윤예람","className":"3학년 5반","classKey":"3-5","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","이어달리기"]},{"no":"3513","name":"이겸호","className":"3학년 5반","classKey":"3-5","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","2인 3각"]},{"no":"3514","name":"이소윤","className":"3학년 5반","classKey":"3-5","events":["달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3515","name":"이수민","className":"3학년 5반","classKey":"3-5","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3516","name":"이예영","className":"3학년 5반","classKey":"3-5","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이"]},{"no":"3517","name":"이유민","className":"3학년 5반","classKey":"3-5","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이"]},{"no":"3518","name":"이주현","className":"3학년 5반","classKey":"3-5","events":["8자 줄넘기","바운드 배구","달리는 줄다리기"]},{"no":"3519","name":"이하린","className":"3학년 5반","classKey":"3-5","events":["8자 줄넘기","달리는 줄다리기","이어달리기"]},{"no":"3520","name":"이향주","className":"3학년 5반","classKey":"3-5","events":["미션 이어달리기","달리는 줄다리기"]},{"no":"3521","name":"임수연","className":"3학년 5반","classKey":"3-5","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기","이어달리기"]},{"no":"3522","name":"정윤하","className":"3학년 5반","classKey":"3-5","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3523","name":"지유은","className":"3학년 5반","classKey":"3-5","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"3524","name":"최서연","className":"3학년 5반","classKey":"3-5","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3525","name":"최서우","className":"3학년 5반","classKey":"3-5","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이","2인 3각","이어달리기"]},{"no":"3526","name":"홍성민","className":"3학년 5반","classKey":"3-5","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이","2인 3각","이어달리기"]},{"no":"3527","name":"홍지율","className":"3학년 5반","classKey":"3-5","events":["달리는 줄다리기"]},{"no":"3528","name":"황지성","className":"3학년 5반","classKey":"3-5","events":["달리는 줄다리기","슈팅 릴레이","2인 3각","이어달리기"]},{"no":"3601","name":"강현준","className":"3학년 6반","classKey":"3-6","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각","이어달리기"]},{"no":"3602","name":"김결","className":"3학년 6반","classKey":"3-6","events":["바운드 배구","달리는 줄다리기","이어달리기"]},{"no":"3603","name":"김나율","className":"3학년 6반","classKey":"3-6","events":["달리는 줄다리기","슈팅 릴레이"]},{"no":"3604","name":"김다윤","className":"3학년 6반","classKey":"3-6","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기","2인 3각"]},{"no":"3605","name":"김보아","className":"3학년 6반","classKey":"3-6","events":["8자 줄넘기","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"3606","name":"김서하","className":"3학년 6반","classKey":"3-6","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"3607","name":"김채민","className":"3학년 6반","classKey":"3-6","events":["8자 줄넘기","달리는 줄다리기","2인 3각"]},{"no":"3608","name":"김혜원","className":"3학년 6반","classKey":"3-6","events":["달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3609","name":"박준후","className":"3학년 6반","classKey":"3-6","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3610","name":"안태환","className":"3학년 6반","classKey":"3-6","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3611","name":"오정현","className":"3학년 6반","classKey":"3-6","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3612","name":"오주현","className":"3학년 6반","classKey":"3-6","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"3613","name":"원서준","className":"3학년 6반","classKey":"3-6","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각","이어달리기"]},{"no":"3614","name":"유태웅","className":"3학년 6반","classKey":"3-6","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3615","name":"윤나현","className":"3학년 6반","classKey":"3-6","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"3616","name":"윤채린","className":"3학년 6반","classKey":"3-6","events":["바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"3617","name":"이서환","className":"3학년 6반","classKey":"3-6","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","슈팅 릴레이","이어달리기"]},{"no":"3618","name":"이수경","className":"3학년 6반","classKey":"3-6","events":["달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3619","name":"이정윤","className":"3학년 6반","classKey":"3-6","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"3620","name":"임소희","className":"3학년 6반","classKey":"3-6","events":["8자 줄넘기","달리는 줄다리기","2인 3각"]},{"no":"3621","name":"전소율","className":"3학년 6반","classKey":"3-6","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"3622","name":"정서우","className":"3학년 6반","classKey":"3-6","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"3623","name":"정은서","className":"3학년 6반","classKey":"3-6","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","이어달리기"]},{"no":"3624","name":"정채윤","className":"3학년 6반","classKey":"3-6","events":["8자 줄넘기","달리는 줄다리기"]},{"no":"3625","name":"최세인","className":"3학년 6반","classKey":"3-6","events":["달리는 줄다리기"]},{"no":"3626","name":"최승아","className":"3학년 6반","classKey":"3-6","events":["달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3627","name":"한재빈","className":"3학년 6반","classKey":"3-6","events":["달리는 줄다리기"]},{"no":"3701","name":"강윤호","className":"3학년 7반","classKey":"3-7","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","2인 3각"]},{"no":"3702","name":"강지우","className":"3학년 7반","classKey":"3-7","events":["달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3703","name":"곽현준","className":"3학년 7반","classKey":"3-7","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이","이어달리기"]},{"no":"3704","name":"구현의","className":"3학년 7반","classKey":"3-7","events":["바운드 배구","달리는 줄다리기","2인 3각"]},{"no":"3705","name":"김도훈","className":"3학년 7반","classKey":"3-7","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3706","name":"김민정","className":"3학년 7반","classKey":"3-7","events":["달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3707","name":"김슬아","className":"3학년 7반","classKey":"3-7","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"3708","name":"김지민","className":"3학년 7반","classKey":"3-7","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","이어달리기"]},{"no":"3709","name":"김태율","className":"3학년 7반","classKey":"3-7","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3710","name":"김태호","className":"3학년 7반","classKey":"3-7","events":["바운드 배구","미션 이어달리기","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"3711","name":"나호찬","className":"3학년 7반","classKey":"3-7","events":["바운드 배구","달리는 줄다리기","슈팅 릴레이"]},{"no":"3712","name":"남하린","className":"3학년 7반","classKey":"3-7","events":["달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3713","name":"노윤하","className":"3학년 7반","classKey":"3-7","events":["8자 줄넘기","바운드 배구","미션 이어달리기","달리는 줄다리기"]},{"no":"3714","name":"박민지","className":"3학년 7반","classKey":"3-7","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이"]},{"no":"3715","name":"박서준","className":"3학년 7반","classKey":"3-7","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이","이어달리기"]},{"no":"3716","name":"박서진","className":"3학년 7반","classKey":"3-7","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이"]},{"no":"3717","name":"박지환","className":"3학년 7반","classKey":"3-7","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3718","name":"신민찬","className":"3학년 7반","classKey":"3-7","events":["달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3719","name":"신요환","className":"3학년 7반","classKey":"3-7","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3720","name":"우시혁","className":"3학년 7반","classKey":"3-7","events":["8자 줄넘기","바운드 배구","달리는 줄다리기","슈팅 릴레이","2인 3각","이어달리기"]},{"no":"3721","name":"유희원","className":"3학년 7반","classKey":"3-7","events":["바운드 배구","달리는 줄다리기","2인 3각","이어달리기"]},{"no":"3722","name":"이소호","className":"3학년 7반","classKey":"3-7","events":["8자 줄넘기","달리는 줄다리기","슈팅 릴레이","2인 3각"]},{"no":"3723","name":"임윤진","className":"3학년 7반","classKey":"3-7","events":["8자 줄넘기","바운드 배구","달리는 줄다리기"]},{"no":"3724","name":"장하영","className":"3학년 7반","classKey":"3-7","events":["8자 줄넘기","바운드 배구","달리는 줄다리기"]},{"no":"3725","name":"정민재","className":"3학년 7반","classKey":"3-7","events":["미션 이어달리기","달리는 줄다리기","2인 3각"]},{"no":"3727","name":"최지원","className":"3학년 7반","classKey":"3-7","events":["달리는 줄다리기","슈팅 릴레이"]},{"no":"3728","name":"허가온","className":"3학년 7반","classKey":"3-7","events":["미션 이어달리기","달리는 줄다리기","이어달리기"]}];
function ensurePhotoParticipants(){
  const current=load(STORE.participants,[]), map=new Map(current.map(x=>[x.no,x]));
  PHOTO_PARTICIPANTS_V7622.forEach(x=>map.set(x.no,x));
  save(STORE.participants,[...map.values()]);
}
ensurePhotoParticipants();
function participantEventHtml(list){
  const order=['8자 줄넘기','슈팅 릴레이','바운드 배구','2인 3각','미션 이어달리기','이어달리기','달리는 줄다리기'];
  return order.map(ev=>{const a=list.filter(x=>(x.events||[]).includes(ev));if(!a.length)return'';return `<div class="participant-event-row"><b>${ev}</b><div>${ev==='달리는 줄다리기'?'<span class="participant-all">전원</span>':a.map(x=>`<span>${x.no} ${escapeHtml(x.name)}</span>`).join('')}</div></div>`}).join('');
}
function setupClassSelectors(){
  classGrade.innerHTML=[1,2,3].map(g=>`<option value="${g}">${g}학년</option>`).join('');
  fillClasses();
}
function fillClasses(){let g=Number(classGrade.value);classNo.innerHTML=Array.from({length:classCount(g)},(_,i)=>`<option value="${i+1}">${i+1}반</option>`).join('')}
classGrade.onchange=fillClasses;setupClassSelectors();
showClass.onclick=()=>{let g=Number(classGrade.value), key=`${g}-${classNo.value}`, rows=gradeRows(g), idx=rows.findIndex(r=>r.key===key), row=rows[idx], list=load(STORE.participants,[]).filter(x=>x.classKey===key);classResult.innerHTML=list.length?`<div class="participant-class-result"><div class="participant-class-summary"><b>${key} 참가자 명단</b><span>사진 신청서 기준 1차 반영</span></div>${participantEventHtml(list)}</div>`:`<b>${key}</b><br>현재 종합점수 <strong>${row.total}점</strong> · 현재 순위 <strong>${idx+1}위</strong><br><small>참가자 명단은 확정 후 순차 반영됩니다.</small>`};

findStudent.onclick=()=>{
  let no=studentNo.value.trim(),name=studentName.value.trim(), list=load(STORE.participants,[]);
  if(no && !/^\d{4}$/.test(no)){studentResult.innerHTML='<b>학번은 4자리로 입력해 주세요.</b><br><small>예: 1학년 2반 3번 → 1203</small>';return}
  let found=list.find(x=>(!no||x.no===no)&&(!name||x.name===name));
  studentResult.innerHTML=found?`<div class="participant-found"><b>${found.no} ${escapeHtml(found.name)}</b><span>${found.className||''}</span><p>참가 종목</p><div>${(found.events||[]).map(e=>`<em>${e}</em>`).join('')}</div></div>`:'등록된 참가자 명단에서 찾지 못했습니다.';
};

// V76.37: 제출된 깃발 사진을 정적 기본 이미지로 제공하고, 관리자/Supabase 이미지가 있으면 그것을 우선 사용합니다.
const BUILTIN_FLAG_IMAGES={
  '1-1':'1-1.jpg','1-2':'1-2.jpg','1-3':'1-3.jpg','1-4':'1-4.jpg',
  '1-5':'1-5.jpg','1-6':'1-6.jpg','1-7':'1-7.jpg',
  '2-2':'2-2.jpg','2-4':'2-4.jpg','2-7':'2-7.jpg','2-8':'2-8.jpg',
  '3-1':'3-1.jpg','3-2':'3-2.jpg','3-4':'3-4.jpg'
};
function flagImageFor(key,store){return (store&&store[key])||BUILTIN_FLAG_IMAGES[key]||'';}
let flagGrade=1;
async function renderFlags(){
  let store=await loadSharedFlags();
  flagGallery.innerHTML=Array.from({length:classCount(flagGrade)},(_,i)=>{let key=`${flagGrade}-${i+1}`,url=flagImageFor(key,store),[g,c]=key.split('-');return url?`<div class="flag-gallery-item"><div class="flag-card flag-image-only" style="background-image:url('${url}')"></div><div class="flag-class-label">${g}학년 ${c}반</div></div>`:`<div class="flag-gallery-item"><div class="flag-card flag-empty"><small>깃발 이미지 준비 중</small></div><div class="flag-class-label">${g}학년 ${c}반</div></div>`}).join('');
}
document.querySelectorAll('#flagTabs button').forEach(b=>b.onclick=()=>{flagGrade=Number(b.dataset.fgrade);document.querySelectorAll('#flagTabs button').forEach(x=>x.classList.toggle('active',x===b));renderFlags()});renderFlags();

function renderOps(query=''){
  const iconMap={
    '응원 퍼포먼스':'🎉','학급 깃발':'🚩','8자 줄넘기':'➰','슈팅 릴레이':'🏀',
    '바운드 배구':'🏐','2인 3각':'👟','달리는 줄다리기':'🪢','미션 이어달리기':'🎯','이어달리기 결승':'🏃'
  };
  const toneMap=['sky','mint','peach','lavender','teal','yellow','coral','blue','gold'];
  let q=query.trim().toLowerCase(), arr=ops.filter(x=>!q||x.join(' ').toLowerCase().includes(q));
  opsList.innerHTML=arr.length?arr.map((x,i)=>`
    <article class="ops-card ops-${toneMap[ops.indexOf(x)%toneMap.length]}">
      <div class="ops-card-top">
        <div class="ops-icon">${iconMap[x[0]]||'🏅'}</div>
        <div class="ops-title"><small>GAME ${String(ops.indexOf(x)+1).padStart(2,'0')}</small><h3>${x[0]}</h3></div>
        <span class="ops-status">운영</span>
      </div>
      <div class="ops-role"><span>👤 주심·담당</span><b>${x[1]}</b></div>
      <div class="ops-support"><span>🤝 지원·운영</span><small>${x[2]}</small></div>
    </article>`).join(''):`<div class="ops-empty">검색 결과가 없습니다.</div>`;
}
opsSearch.oninput=e=>renderOps(e.target.value);renderOps();



// Q&A shared implementation is initialized after Supabase client setup.


function safeLink(raw){
  try{const u=new URL(String(raw||'').trim()); return ['http:','https:'].includes(u.protocol)?u.href:'';}catch(e){return '';}
}
mediaForm.onsubmit=e=>{
  e.preventDefault();
  const link=safeLink(mediaLink.value);
  if(!link){alert('http:// 또는 https://로 시작하는 올바른 공유 링크를 입력해 주세요.');return;}
  let a=load(STORE.media,[]);a.push({cls:mediaClass.value.trim(),link,desc:mediaDesc.value.trim().slice(0,160),time:new Date().toLocaleString()});save(STORE.media,a);e.target.reset();renderMedia();
}
function renderMedia(){
  let a=load(STORE.media,[]);
  mediaList.innerHTML=a.length?a.slice().reverse().map((x,i)=>{const link=safeLink(x.link);return `<article class="media-moment-card">
    <div class="media-thumb"><span>${i%2?'🎥':'📸'}</span><small>MOMENT ${String(a.length-i).padStart(2,'0')}</small></div>
    <div class="media-moment-copy"><div class="media-card-top"><b>${escapeHtml(x.cls)}</b><small>${escapeHtml(x.time)}</small></div><h3>${escapeHtml(x.desc||'체육한마당의 멋진 순간')}</h3>${link?`<a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">공유 링크 열기 ↗</a>`:'<span class="link-unavailable">링크 확인 필요</span>'}</div>
  </article>`}).join(''):`<div class="pretty-empty media-empty"><span>📷</span><b>아직 공유된 순간이 없습니다.</b><small>체육한마당의 첫 번째 멋진 장면을 남겨주세요.</small></div>`;
}renderMedia();

function renderBoard(){
  let custom=load(STORE.notices,[]), all=[...custom.slice().reverse(),...defaultNotices];
  boardList.innerHTML=all.map((x,i)=>`<article class="board-item hq-board-item">
    <div class="hq-board-number">${String(i+1).padStart(2,'0')}</div>
    <div class="hq-board-copy">
      <div class="hq-board-top"><b>${escapeHtml(x.title)}</b>${x.time?`<small>${escapeHtml(x.time)}</small>`:''}</div>
      <p>${escapeHtml(x.body)}</p>
    </div>
  </article>`).join('');
  homeBoard.innerHTML=all.slice(0,3).map(x=>`<div><b>${escapeHtml(x.title)}</b><small>${escapeHtml(x.body)}</small></div>`).join('');
}renderBoard();


// ===== V61 교직원 실시간 투표 =====
const VOTE_LOCAL_KEY='kd_v61_votes';
const VOTE_STATE_LOCAL_KEY='kd_v61_vote_state';
const kdSbConfig=window.KD_SUPABASE||{};
const kdSbReady=!!(kdSbConfig.url&&kdSbConfig.anonKey&&window.supabase&&window.supabase.createClient);
const kdSb=kdSbReady?window.supabase.createClient(kdSbConfig.url,kdSbConfig.anonKey):null;

// ===== V76.41 실시간 점수 공유 (Supabase + 로컬 백업) =====
let scoreRealtimeChannel=null;
async function pullSharedScores(){
  if(!kdSbReady) return false;
  try{
    const {data,error}=await kdSb.from('kd_scores').select('class_key,event_name,points');
    if(error) throw error;
    const local=getScores();
    if(!data || !data.length){
      // 최초 1회: 기존 기기에 들어 있던 확정 점수를 공용 점수표로 올립니다.
      const seed=[];
      Object.entries(local).forEach(([classKey,events])=>scoreEvents.forEach(eventName=>{
        const points=Number(events[eventName]||0);
        if(points>0) seed.push({class_key:classKey,event_name:eventName,points});
      }));
      if(seed.length){
        const {error:seedError}=await kdSb.from('kd_scores').upsert(seed,{onConflict:'class_key,event_name'});
        if(seedError) throw seedError;
      }
      return true;
    }
    data.forEach(row=>{
      if(!local[row.class_key]) local[row.class_key]={};
      local[row.class_key][row.event_name]=Number(row.points)||0;
    });
    save(STORE.scores,local);
    renderScores();
    return true;
  }catch(e){console.warn('shared scores pull',e);return false;}
}
async function saveSharedScore(classKey,eventName,points){
  const local=getScores();
  if(!local[classKey]) local[classKey]={};
  local[classKey][eventName]=Number(points)||0;
  save(STORE.scores,local); // 네트워크 장애 시에도 관리자 기기에 백업
  renderScores();
  if(!kdSbReady) return false;
  try{
    const {error}=await kdSb.from('kd_scores').upsert({class_key:classKey,event_name:eventName,points:Number(points)||0,updated_at:new Date().toISOString()},{onConflict:'class_key,event_name'});
    if(error) throw error;
    return true;
  }catch(e){console.warn('shared score save',e);return false;}
}
function subscribeSharedScores(){
  if(!kdSbReady || scoreRealtimeChannel) return;
  scoreRealtimeChannel=kdSb.channel('kd-scores-live-v7640')
    .on('postgres_changes',{event:'*',schema:'public',table:'kd_scores'},async()=>{await pullSharedScores();})
    .subscribe();
}
setTimeout(async()=>{await pullSharedScores();subscribeSharedScores();},0);

// ===== V76.3 공용 Q&A — 학생 질문 → 관리자 답변 → 실시간 반영 =====
async function getQnaData(){
  if(kdSbReady){
    try{
      const {data,error}=await kdSb.from('kd_qna').select('*').order('created_at',{ascending:false});
      if(error) throw error;
      return (data||[]).map(x=>({id:x.id,cls:x.class_name,name:x.name,category:x.category,question:x.question,answer:x.answer||'',status:x.status||'pending',time:x.created_at,answeredAt:x.answered_at}));
    }catch(e){console.warn('shared qna',e);}
  }
  return load(STORE.qna,[]).slice().reverse();
}
async function addQnaQuestion(row){
  if(kdSbReady){
    const {error}=await kdSb.from('kd_qna').insert({class_name:row.cls,name:row.name,category:row.category,question:row.question,status:'pending'});
    if(!error)return true;
    console.warn('qna insert',error);
  }
  let a=load(STORE.qna,[]);a.push({...row,id:'q'+Date.now(),answer:'',status:'pending',time:new Date().toISOString()});save(STORE.qna,a);return false;
}
async function answerQna(id,answer){
  if(kdSbReady){
    const {error}=await kdSb.from('kd_qna').update({answer,status:answer?'answered':'pending',answered_at:answer?new Date().toISOString():null}).eq('id',id);
    if(!error)return true;
    console.warn('qna update',error);
  }
  let a=load(STORE.qna,[]),x=a.find(v=>String(v.id)===String(id));if(x){x.answer=answer;x.status=answer?'answered':'pending';x.answeredAt=answer?new Date().toISOString():null;save(STORE.qna,a);}return false;
}
async function deleteQna(id){
  if(kdSbReady){
    const {error}=await kdSb.from('kd_qna').delete().eq('id',id);
    if(!error)return true;
    console.warn('qna delete',error);
  }
  save(STORE.qna,load(STORE.qna,[]).filter(x=>String(x.id)!==String(id)));return false;
}
function maskQnaName(name){const s=String(name||'').trim();if(s.length<=1)return s||'익명';if(s.includes('○'))return s;return s[0]+'○'+(s.length>2?s.slice(2):'');}
async function renderQna(){
  const qnaListEl=document.getElementById('qnaList'), homeQnaListEl=document.getElementById('homeQnaList');
  if(!qnaListEl)return;
  let a=await getQnaData();
  qnaListEl.innerHTML=a.length?a.map((x,i)=>{
    const answered=!!(x.answer&&String(x.answer).trim());
    return `<article class="qna-card faq-card ${answered?'is-answered':'is-pending'}">
      <div class="faq-number">Q${String(i+1).padStart(2,'0')}</div>
      <div class="faq-copy">
        <div class="qna-meta"><span>🔒 익명 질문</span><span class="faq-category">${escapeHtml(x.category||'일반')}</span><em class="qna-status ${answered?'done':'wait'}">${answered?'✓ 답변완료':'● 답변대기'}</em></div>
        <div class="qna-card-head"><b>${escapeHtml(x.question||'')}</b></div>
        ${answered?`<div class="qna-answer faq-answer"><b>🏫 본부 답변</b><p>${escapeHtml(x.answer)}</p></div>`:`<div class="qna-answer faq-answer qna-wait-answer"><b>💬 답변 준비 중</b><p>관리자가 확인 후 답변하겠습니다.</p></div>`}
      </div>
    </article>`}).join(''):`<div class="faq-empty"><span>❔</span><b>등록된 질문이 아직 없습니다.</b><small>궁금한 내용을 첫 번째로 남겨보세요.</small></div>`;
  let recent=a.slice(0,3);
  if(homeQnaListEl) homeQnaListEl.innerHTML=recent.length?recent.map(x=>`<div class="home-qna-item"><b>${escapeHtml((x.question||'').length>36?(x.question||'').slice(0,36)+'…':(x.question||''))}</b><small>${x.answer?'✓ 답변완료':'● 답변대기'}</small></div>`).join(''):`<div class="home-qna-empty">등록된 Q&A가 아직 없습니다.</div>`;
}
const qnaAskFormEl=document.getElementById('qnaAskForm');
if(qnaAskFormEl){
  qnaAskFormEl.onsubmit=async e=>{
    e.preventDefault();
    const cls=document.getElementById('qnaAskClass').value.trim(),name=document.getElementById('qnaAskName').value.trim(),category=document.getElementById('qnaAskCategory').value,question=document.getElementById('qnaAskQuestion').value.trim();
    if(!/^\d{4}$/.test(cls)){alert('학번은 4자리 숫자로 입력해 주세요. 예: 3211');document.getElementById('qnaAskClass').focus();return;}
    if(!name||!question){alert('학번, 이름, 질문을 모두 입력해 주세요.');return;}
    const btn=qnaAskFormEl.querySelector('button[type="submit"]'), before=btn.textContent;btn.disabled=true;btn.textContent='등록 중…';
    try{const shared=await addQnaQuestion({cls,name,category,question});document.getElementById('qnaAskQuestion').value='';await renderQna();alert(shared?'질문을 등록했습니다. 관리자가 확인 후 답변합니다.':'이 기기에 임시 등록했습니다. Supabase Q&A 설정을 확인해 주세요.');}
    catch(err){console.error(err);alert('질문 등록 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');}
    finally{btn.disabled=false;btn.textContent=before;}
  };
}
let qnaRealtimeChannel=null;
function startQnaRealtime(){
  if(!kdSbReady||qnaRealtimeChannel)return;
  qnaRealtimeChannel=kdSb.channel('kd-qna-live-v763').on('postgres_changes',{event:'*',schema:'public',table:'kd_qna'},async()=>{
    await renderQna();
    const adminAreaEl=document.getElementById('adminArea'),adminContentEl=document.getElementById('adminContent');
    if(adminAreaEl&&!adminAreaEl.classList.contains('hidden')&&adminContentEl&&adminContentEl.querySelector('.qna-manager-v763')) staffView('qnaanswer',adminContentEl);
  }).subscribe();
}
renderQna();
startQnaRealtime();
// ===== V74 신청곡 Supabase 공용 저장 · 관리자 승인 =====
const SONG_LOCAL_KEY=STORE.songs;
let songRealtimeChannel=null;
function songDisplayTime(x){
  const raw=x.created_at||x.time||'';
  if(!raw) return '';
  const d=new Date(raw); return isNaN(d)?String(raw):d.toLocaleString('ko-KR');
}
async function getSongs({admin=false}={}){
  if(kdSbReady){
    try{
      let q=kdSb.from('kd_song_requests').select('*').order('created_at',{ascending:false});
      if(!admin) q=q.eq('status','approved');
      const {data,error}=await q;if(error)throw error;return data||[];
    }catch(e){console.warn('shared songs',e);}
  }
  let a=load(SONG_LOCAL_KEY,[]).slice().reverse();
  return admin?a:a.filter(x=>(x.status||'approved')==='approved');
}
async function addSong(row){
  if(kdSbReady){const {error}=await kdSb.from('kd_song_requests').insert({class_name:row.cls,name:row.name,title:row.title,message:row.msg,status:'pending'});if(error)throw error;return;}
  let a=load(SONG_LOCAL_KEY,[]);a.push({...row,id:'local_'+Date.now(),status:'pending',created_at:new Date().toISOString()});save(SONG_LOCAL_KEY,a);
}
async function setSongStatus(id,status){
  if(kdSbReady){const {error}=await kdSb.from('kd_song_requests').update({status,reviewed_at:new Date().toISOString()}).eq('id',id);if(error)throw error;return;}
  let a=load(SONG_LOCAL_KEY,[]),x=a.find(v=>String(v.id)===String(id));if(x)x.status=status;save(SONG_LOCAL_KEY,a);
}
async function deleteSong(id){
  if(kdSbReady){const {error}=await kdSb.from('kd_song_requests').delete().eq('id',id);if(error)throw error;return;}
  save(SONG_LOCAL_KEY,load(SONG_LOCAL_KEY,[]).filter(v=>String(v.id)!==String(id)));
}
async function renderSongs(){
  const a=await getSongs();
  if(document.getElementById('songTotal')) songTotal.textContent=String(a.length);
  songList.innerHTML=a.length?a.map((x,i)=>`<article class="song-request-card">
    <div class="song-art"><span>♪</span></div>
    <div class="song-request-copy"><div class="song-request-top"><span>REQUEST ${String(a.length-i).padStart(2,'0')}</span><small>익명 신청</small></div><h3>${escapeHtml(x.title||'')}</h3><p class="song-requester">🎧 익명 · ${escapeHtml(songDisplayTime(x))}</p>${(x.message||x.msg)?`<blockquote>“${escapeHtml(x.message||x.msg)}”</blockquote>`:''}</div>
  </article>`).join(''):`<div class="pretty-empty song-empty"><span>🎶</span><b>승인된 신청곡을 기다리고 있어요!</b><small>신청 후 관리자가 확인하면 플레이리스트에 공개됩니다.</small></div>`;
}
songForm.onsubmit=async e=>{
  e.preventDefault();
  const row={cls:songClass.value.trim(),name:songName.value.trim(),title:songTitle.value.trim(),msg:songMsg.value.trim().slice(0,300)};
  const btn=e.target.querySelector('button[type="submit"],button.song-submit-btn');btn.disabled=true;const before=btn.textContent;btn.textContent='신청 중…';
  try{await addSong(row);e.target.reset();songCount.textContent='0';alert(kdSbReady?'익명 신청곡을 접수했습니다. 신청자 정보는 관리자만 확인하며, 승인 후 곡 정보만 공개됩니다.':'이 기기에서 임시 접수했습니다. Supabase 설정 후 여러 기기에서 공유됩니다.');await renderSongs();}
  catch(err){console.error(err);alert('신청곡 접수에 실패했습니다. Supabase 신청곡 설정을 확인해 주세요.');}
  finally{btn.disabled=false;btn.textContent=before;}
};
songMsg.oninput=()=>songCount.textContent=String(songMsg.value.length);
async function renderSongManager(contentEl=adminContent){
  const rows=await getSongs({admin:true});
  const pending=rows.filter(x=>(x.status||'pending')==='pending').length, approved=rows.filter(x=>x.status==='approved').length;
  contentEl.innerHTML=`<div class="song-admin-head"><div><small>SONG REQUEST MANAGER</small><h3>🎵 신청곡 관리</h3><p>학생 신청곡을 확인한 뒤 승인하면 모든 기기의 신청곡 탭에 공개됩니다.</p></div><span>${kdSbReady?'☁️ Supabase 공용':'📱 이 기기 저장'}</span></div>
  <div class="song-admin-summary"><b>대기 ${pending}곡</b><b>승인 ${approved}곡</b><b>전체 ${rows.length}곡</b></div>
  <div class="song-admin-list">${rows.length?rows.map(x=>{const st=x.status||'pending';return `<article class="song-admin-card"><div><small>${escapeHtml(x.class_name||x.cls||'')} · ${escapeHtml(x.name||'')}</small><h4>${escapeHtml(x.title||'')}</h4>${(x.message||x.msg)?`<p>${escapeHtml(x.message||x.msg)}</p>`:''}<em>${escapeHtml(songDisplayTime(x))}</em></div><div class="song-admin-actions"><span class="song-status ${st}">${st==='approved'?'승인됨':st==='rejected'?'숨김':'승인 대기'}</span>${st!=='approved'?`<button data-song-approve="${x.id}">✓ 승인</button>`:`<button data-song-pending="${x.id}">↩ 승인 취소</button>`}<button class="danger" data-song-delete="${x.id}">삭제</button></div></article>`}).join(''):'<div class="info-note">접수된 신청곡이 없습니다.</div>'}</div>`;
  contentEl.querySelectorAll('[data-song-approve]').forEach(b=>b.onclick=async()=>{await setSongStatus(b.dataset.songApprove,'approved');await renderSongManager(contentEl);await renderSongs();});
  contentEl.querySelectorAll('[data-song-pending]').forEach(b=>b.onclick=async()=>{await setSongStatus(b.dataset.songPending,'pending');await renderSongManager(contentEl);await renderSongs();});
  contentEl.querySelectorAll('[data-song-delete]').forEach(b=>b.onclick=async()=>{if(confirm('이 신청곡을 삭제할까요?')){await deleteSong(b.dataset.songDelete);await renderSongManager(contentEl);await renderSongs();}});
}
function setupSongRealtime(){
  if(!kdSbReady||songRealtimeChannel)return;
  songRealtimeChannel=kdSb.channel('kd-song-live').on('postgres_changes',{event:'*',schema:'public',table:'kd_song_requests'},async()=>{await renderSongs();if(!adminArea.classList.contains('hidden')&&adminContent.querySelector('.song-admin-list'))await renderSongManager(adminContent);}).subscribe();
}
renderSongs();setupSongRealtime();

let currentStaffName=sessionStorage.getItem('kd_staff_name')||'';
let voteRealtimeChannel=null;
let currentStaffVoteType='';

function voteTypeLabel(type){return type==='performance'?'응원 퍼포먼스':'학급 깃발'}
function performanceCandidates(){
  const out={1:[],2:[],3:[]};
  document.querySelectorAll('#performance .performance-card .performance-class').forEach(el=>{
    const m=(el.textContent||'').trim().match(/^([123])-(\d+)$/);
    if(m) out[Number(m[1])].push(Number(m[2]));
  });
  Object.keys(out).forEach(g=>out[g]=[...new Set(out[g])].sort((a,b)=>a-b));
  return out;
}
function performanceMusicMap(){
  const out={};
  document.querySelectorAll('#performance .performance-card').forEach(card=>{
    const cls=(card.querySelector('.performance-class')?.textContent||'').trim();
    let music='';
    card.querySelectorAll('dl>div').forEach(row=>{if((row.querySelector('dt')?.textContent||'').includes('음악')) music=(row.querySelector('dd')?.textContent||'').trim();});
    if(cls) out[cls]=music;
  });
  return out;
}
let sharedFlagCache={};
async function loadSharedFlags(){
  if(kdSbReady){
    try{const {data,error}=await kdSb.from('kd_flags').select('class_key,image_data');if(error)throw error;sharedFlagCache=Object.fromEntries((data||[]).map(x=>[x.class_key,x.image_data]));return sharedFlagCache;}catch(e){console.warn('shared flags',e);}
  }
  sharedFlagCache=load(STORE.flags,{});return sharedFlagCache;
}
async function saveSharedFlag(classKey,imageData){
  if(kdSbReady){const {error}=await kdSb.from('kd_flags').upsert({class_key:classKey,image_data:imageData,updated_at:new Date().toISOString()},{onConflict:'class_key'});if(error)throw error;}
  else{const x=load(STORE.flags,{});x[classKey]=imageData;save(STORE.flags,x);}
  sharedFlagCache[classKey]=imageData;
}
function compressFlagImage(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onerror=reject;r.onload=()=>{const img=new Image();img.onerror=reject;img.onload=()=>{let w=img.width,h=img.height,max=1200;if(Math.max(w,h)>max){const q=max/Math.max(w,h);w=Math.round(w*q);h=Math.round(h*q)}const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);resolve(c.toDataURL('image/jpeg',.82));};img.src=r.result;};r.readAsDataURL(file);});}
function voteCandidates(type,grade){
  if(type==='performance') return performanceCandidates()[grade]||[];
  return Array.from({length:classCount(grade)},(_,i)=>i+1);
}
function localVoteState(){return load(VOTE_STATE_LOCAL_KEY,{performance:false,flag:false})}
function localVotes(){return load(VOTE_LOCAL_KEY,[])}
async function getVoteState(type){
  if(kdSbReady){
    const {data,error}=await kdSb.from('kd_vote_state').select('is_open').eq('vote_type',type).maybeSingle();
    if(!error&&data) return !!data.is_open;
  }
  return !!localVoteState()[type];
}
async function setVoteState(type,isOpen){
  if(kdSbReady){
    const {error}=await kdSb.from('kd_vote_state').update({is_open:isOpen,updated_at:new Date().toISOString()}).eq('vote_type',type);
    if(error) throw error;
  }else{
    const st=localVoteState();st[type]=isOpen;save(VOTE_STATE_LOCAL_KEY,st);
  }
}
async function getMyVotes(type,name){
  const grouped={1:[],2:[],3:[]};
  if(kdSbReady){
    const {data,error}=await kdSb.from('kd_votes').select('grade,class_no').eq('vote_type',type).eq('voter_name',name);
    if(!error){
      (data||[]).forEach(x=>{const g=Number(x.grade),c=Number(x.class_no);if(grouped[g]&&!grouped[g].includes(c))grouped[g].push(c);});
      Object.values(grouped).forEach(a=>a.sort((a,b)=>a-b));
      return grouped;
    }
  }
  localVotes().filter(x=>x.vote_type===type&&x.voter_name===name).forEach(x=>{const g=Number(x.grade),c=Number(x.class_no);if(grouped[g]&&!grouped[g].includes(c))grouped[g].push(c);});
  Object.values(grouped).forEach(a=>a.sort((a,b)=>a-b));
  return grouped;
}
async function saveMyVotes(type,grade,classNos,name){
  const g=Number(grade);
  const choices=[...new Set((classNos||[]).map(Number))].slice(0,2);
  if(choices.length!==2) throw new Error('exactly_two_votes_required');
  const now=new Date().toISOString();
  if(kdSbReady){
    const {error:delError}=await kdSb.from('kd_votes').delete().eq('voter_name',name).eq('vote_type',type).eq('grade',g);
    if(delError) throw delError;
    const rows=choices.map(classNo=>({voter_name:name,vote_type:type,grade:g,class_no:classNo,updated_at:now}));
    const {error:insError}=await kdSb.from('kd_votes').insert(rows);
    if(insError) throw insError;
  }else{
    let list=localVotes().filter(x=>!(x.voter_name===name&&x.vote_type===type&&Number(x.grade)===g));
    choices.forEach(classNo=>list.push({voter_name:name,vote_type:type,grade:g,class_no:classNo,updated_at:now}));
    save(VOTE_LOCAL_KEY,list);
  }
}
async function getAllVotes(type){
  if(kdSbReady){
    const {data,error}=await kdSb.from('kd_votes').select('voter_name,grade,class_no,updated_at').eq('vote_type',type);
    if(error) throw error; return data||[];
  }
  return localVotes().filter(x=>x.vote_type===type);
}
async function clearVotes(type){
  if(kdSbReady){
    const {error}=await kdSb.from('kd_votes').delete().eq('vote_type',type);
    if(error) throw error;
  } else save(VOTE_LOCAL_KEY,localVotes().filter(x=>x.vote_type!==type));
}
function voteModeBadge(){
  return kdSbReady?'<span class="vote-mode live">● 실시간 공동 투표</span>':'<span class="vote-mode local">⚠ 설정 전 · 이 기기에서만 저장</span>';
}
async function renderStaffVote(type,contentEl=staffContent){
  const name=currentStaffName||sessionStorage.getItem('kd_staff_name')||'';
  if(!name){contentEl.innerHTML='<div class="vote-empty">교직원 내선번호 확인 후 다시 로그인해 주세요.</div>';return;}
  contentEl.innerHTML='<div class="vote-loading">투표 화면을 불러오는 중입니다…</div>';
  const [isOpen,myVotes]=await Promise.all([getVoteState(type),getMyVotes(type,name)]);
  if(type==='flag') await loadSharedFlags();
  const title=voteTypeLabel(type), icon=type==='performance'?'🎉':'🚩';
  const instruction='각 학년에서 가장 인상적인 2개 학급을 선택해 주세요.';
  contentEl.innerHTML=`
    <div class="vote-head">
      <div><small>STAFF TWO-VOTE</small><h3>${icon} ${title} 투표</h3><p>내선 ${escapeHtml(name)} · ${instruction}</p></div>
      ${voteModeBadge()}
    </div>
    <div class="vote-open-state ${isOpen?'open':'closed'}"><b>${isOpen?'🟢 투표 진행 중':'🔒 현재 투표가 마감되어 있습니다.'}</b><span>${isOpen?'교직원 1인당 학년별 2개 학급을 선택한 뒤 저장해 주세요.':'관리자가 투표를 시작하면 선택할 수 있습니다.'}</span></div>
    <div class="vote-grade-list" id="voteGradeList"></div>
    <div class="vote-footnote">※ 응원 퍼포먼스와 학급 깃발 모두 학년별 2표입니다. 투표가 열려 있는 동안에는 선택을 수정할 수 있으며, 중간 득표수는 공개되지 않습니다.</div>`;
  const wrap=contentEl.querySelector('#voteGradeList');
  [1,2,3].forEach(grade=>{
    const candidates=voteCandidates(type,grade), chosen=Array.isArray(myVotes[grade])?myVotes[grade]:[];
    const chosenText=chosen.length===2?`✓ ${chosen.map(no=>`${grade}-${no}`).join(' · ')} 투표 완료`:chosen.length?`${chosen.length}/2 선택됨`:'미투표';
    const article=document.createElement('article');article.className='vote-grade-card';
    article.innerHTML=`<div class="vote-grade-top"><div><span>${grade}</span><b>${grade}학년</b></div><em class="${chosen.length===2?'done':''}">${chosenText}</em></div>
      <div class="vote-choice-grid ${type==='flag'?'flag-vote-grid':''}">${candidates.map(no=>{const key=`${grade}-${no}`;const music=performanceMusicMap()[key]||'음악 정보 준비 중';const img=flagImageFor(key,sharedFlagCache);const checked=chosen.includes(no);return `<label class="vote-choice ${type==='flag'?'flag-vote-choice':''} ${checked?'selected':''}"><input type="checkbox" name="vote_${type}_${grade}" value="${no}" ${checked?'checked':''} ${isOpen?'':'disabled'}><span>${type==='flag'?`<span class="vote-flag-thumb ${img?'has-image':''}">${img?`<img src="${img}" alt="${key} 학급 깃발">`:'<i>이미지 준비 중</i>'}</span>`:''}<b>${key}</b><small>${type==='performance'?`🎵 ${escapeHtml(music)}`:'학급 깃발'}</small></span></label>`}).join('')}</div>
      <button class="vote-submit" data-vote-save="${grade}" ${isOpen?'':'disabled'}>${chosen.length===2?'선택 수정 저장':'2개 학급 선택 저장'}</button>`;
    wrap.appendChild(article);
  });
  contentEl.querySelectorAll('.vote-choice input').forEach(inp=>inp.onchange=()=>{
    const card=inp.closest('.vote-grade-card');
    const checked=[...card.querySelectorAll('.vote-choice input:checked')];
    if(checked.length>2){inp.checked=false;alert('학년별로 최대 2개 학급까지 선택할 수 있습니다.');}
    card.querySelectorAll('.vote-choice').forEach(x=>x.classList.toggle('selected',x.querySelector('input').checked));
    const count=card.querySelectorAll('.vote-choice input:checked').length;
    const status=card.querySelector('.vote-grade-top em');
    if(count<2){status.textContent=count?`${count}/2 선택됨`:'미투표';status.classList.remove('done');}
  });
  contentEl.querySelectorAll('[data-vote-save]').forEach(btn=>btn.onclick=async()=>{
    const grade=Number(btn.dataset.voteSave);
    const checked=[...contentEl.querySelectorAll(`input[name="vote_${type}_${grade}"]:checked`)];
    if(checked.length!==2){alert(`${grade}학년에서 2개 학급을 선택해 주세요.`);return;}
    btn.disabled=true;btn.textContent='저장 중…';
    try{await saveMyVotes(type,grade,checked.map(x=>Number(x.value)),name);await renderStaffVote(type,contentEl);}
    catch(e){console.error(e);alert('투표 저장 중 오류가 발생했습니다. Supabase 2표 설정 SQL이 적용되었는지 확인해 주세요.');btn.disabled=false;}
  });
}

function tallyVotes(rows,grade){
  const counts={};rows.filter(x=>Number(x.grade)===grade).forEach(x=>counts[x.class_no]=(counts[x.class_no]||0)+1);
  return Object.entries(counts).map(([no,count])=>({no:Number(no),count})).sort((a,b)=>b.count-a.count||a.no-b.no);
}
async function renderVoteManager(contentEl=adminContent){
  contentEl.innerHTML='<div class="vote-loading">실시간 투표 현황을 불러오는 중입니다…</div>';
  try{
    const [pOpen,fOpen,pRows,fRows]=await Promise.all([getVoteState('performance'),getVoteState('flag'),getAllVotes('performance'),getAllVotes('flag')]);
    const unique=(rows)=>new Set(rows.map(x=>x.voter_name)).size;
    const completed=(rows)=>{const m={};rows.forEach(x=>{const n=(x.voter_name||'').trim();if(!n)return;const g=Number(x.grade);m[n]||(m[n]={1:new Set(),2:new Set(),3:new Set()});m[n][g]?.add(Number(x.class_no));});return Object.values(m).filter(v=>[1,2,3].every(g=>v[g].size>=2)).length;};
    const participantList=(rows)=>{
      const map={};
      rows.forEach(x=>{const n=(x.voter_name||'').trim();if(!n)return;const g=Number(x.grade);map[n]||(map[n]={1:new Set(),2:new Set(),3:new Set()});map[n][g]?.add(Number(x.class_no));});
      const names=Object.keys(map).sort((a,b)=>a.localeCompare(b,'ko'));
      if(!names.length) return '<div class="vote-participant-empty">아직 참여한 교직원이 없습니다.</div>';
      return names.map(name=>{
        const grades=map[name];
        const done=[1,2,3].every(g=>grades[g].size>=2);
        const doneGrades=[1,2,3].filter(g=>grades[g].size>=2).length;
        return `<div class="vote-participant-row"><div class="vote-participant-name"><b>${escapeHtml(name)}</b><small>${done?'3개 학년 완료':`${doneGrades}/3 학년 완료`}</small></div><div class="vote-participant-grades">${[1,2,3].map(g=>`<span class="${grades[g].size>=2?'done':'pending'}">${grades[g].size>=2?'✓':'–'} ${g}학년 ${grades[g].size}/2</span>`).join('')}</div></div>`;
      }).join('');
    };
    const typePanel=(type,open,rows)=>`<section class="vote-admin-panel" data-admin-vote="${type}">
      <div class="vote-admin-top"><div><small>${type==='performance'?'PERFORMANCE':'CLASS FLAG'}</small><h4>${type==='performance'?'🎉 응원 퍼포먼스':'🚩 학급 깃발'}</h4><p>3개 학년 완료 <b>${completed(rows)}명</b> · 참여 ${unique(rows)}명 · 저장 ${rows.length}표</p></div><span class="${open?'open':'closed'}">${open?'투표 진행 중':'투표 마감'}</span></div>
      <div class="vote-admin-actions"><button data-vote-toggle="${type}" data-next="${open?'0':'1'}">${open?'🔒 투표 마감':'🟢 투표 시작'}</button><button class="danger" data-vote-clear="${type}">↻ 전체 투표 초기화</button></div>
      <button class="vote-participant-toggle" data-participant-toggle="${type}">👥 참여 교직원 보기 <b>${unique(rows)}명</b></button>
      <div class="vote-participant-list hidden" data-participant-list="${type}">${participantList(rows)}</div>
      <div class="vote-result-grades">${[1,2,3].map(g=>{const t=tallyVotes(rows,g);const total=rows.filter(x=>Number(x.grade)===g).length;return `<div class="vote-result-grade"><div class="vote-result-title"><b>${g}학년</b><span>${total}표</span></div>${t.length?t.map((r,i)=>`<div class="vote-result-row ${r.count===t[0].count?'leader':''}"><span>${g}-${r.no}</span><b>${r.count}표</b></div>`).join(''):'<div class="vote-no-result">아직 투표 없음</div>'}</div>`}).join('')}</div>
    </section>`;
    contentEl.innerHTML=`<div class="vote-admin-head"><div><small>LIVE VOTE CONTROL</small><h3>🗳️ 교직원 투표 관리</h3><p>투표 시작·마감과 학년별 실시간 득표 현황을 관리자만 확인합니다.</p></div>${voteModeBadge()}</div><div class="vote-admin-grid">${typePanel('performance',pOpen,pRows)}${typePanel('flag',fOpen,fRows)}</div><div class="vote-admin-note">※ 동률은 임의로 순위를 정하지 않고 같은 득표수로 표시됩니다. 일반 교직원 화면에는 중간 득표수가 표시되지 않습니다.</div>`;
    contentEl.querySelectorAll('[data-vote-toggle]').forEach(btn=>btn.onclick=async()=>{try{await setVoteState(btn.dataset.voteToggle,btn.dataset.next==='1');await renderVoteManager(contentEl);}catch(e){console.error(e);alert('상태 변경에 실패했습니다.');}});
    contentEl.querySelectorAll('[data-participant-toggle]').forEach(btn=>btn.onclick=()=>{const type=btn.dataset.participantToggle;const list=contentEl.querySelector(`[data-participant-list="${type}"]`);if(!list)return;const opening=list.classList.contains('hidden');list.classList.toggle('hidden');btn.innerHTML=opening?`👥 참여 교직원 닫기 <b>${list.querySelectorAll('.vote-participant-row').length}명</b>`:`👥 참여 교직원 보기 <b>${list.querySelectorAll('.vote-participant-row').length}명</b>`;});
    contentEl.querySelectorAll('[data-vote-clear]').forEach(btn=>btn.onclick=async()=>{if(!confirm(`${voteTypeLabel(btn.dataset.voteClear)} 투표를 전부 초기화할까요? 이 작업은 되돌릴 수 없습니다.`))return;try{await clearVotes(btn.dataset.voteClear);await renderVoteManager(contentEl);}catch(e){console.error(e);alert('초기화에 실패했습니다.');}});
  }catch(e){console.error(e);contentEl.innerHTML='<div class="vote-empty">투표 데이터를 불러오지 못했습니다. config.js와 Supabase SQL 설정을 확인해 주세요.</div>';}
}
function setupVoteRealtime(){
  if(!kdSbReady||voteRealtimeChannel) return;
  voteRealtimeChannel=kdSb.channel('kd-v61-votes')
    .on('postgres_changes',{event:'*',schema:'public',table:'kd_vote_state'},()=>{if(!staffArea.classList.contains('hidden')&&currentStaffVoteType)renderStaffVote(currentStaffVoteType,staffContent);})
    .on('postgres_changes',{event:'*',schema:'public',table:'kd_votes'},()=>{if(!adminArea.classList.contains('hidden')&&adminContent.querySelector('[data-admin-vote]'))renderVoteManager(adminContent);})
    .subscribe();
}

staffLoginBtn.onclick=()=>{
  const extension=(staffName.value||'').trim();
  if(!/^\d+$/.test(extension)){alert('교직원 내선번호를 숫자로 입력해 주세요.');staffName.focus();return;}
  if(staffPw.value==='rudejr26**'){currentStaffName=extension;sessionStorage.setItem('kd_staff_name',extension);staffLogin.classList.add('hidden');staffArea.classList.remove('hidden');setupVoteRealtime();if(pendingStaffView)staffView(pendingStaffView)}
  else alert('비밀번호를 확인해 주세요.');
};
if(currentStaffName&&typeof staffName!=='undefined') staffName.value=currentStaffName;
// V76.10: 교직원 식별값을 한글 이름 대신 숫자 내선번호로 입력
if(typeof staffName!=='undefined' && typeof staffPw!=='undefined'){
  staffName.setAttribute('inputmode','numeric');
  staffName.setAttribute('pattern','[0-9]*');
  staffName.setAttribute('autocomplete','off');
  staffName.addEventListener('input',()=>{staffName.value=staffName.value.replace(/\D/g,'');});
  staffName.addEventListener('keydown',e=>{
    if(e.key==='Enter'){e.preventDefault();staffPw.focus();}
  });
  staffPw.addEventListener('keydown',e=>{
    if(e.key==='Enter'){e.preventDefault();staffLoginBtn.click();}
  });
}


// ===== V76.29 쌤PICK · 교직원 승부예측 =====
const SSAMPICK_LOCAL_KEY='kd_v7629_ssampick';
const SSAMPICK_DEADLINE=new Date(2026,8,30,23,59,59);
function ssamPickOpen(){return new Date()<=SSAMPICK_DEADLINE;}
async function getMySsamPick(extension){
  if(kdSbReady){
    try{const {data,error}=await kdSb.from('kd_staff_picks').select('*').eq('extension',extension).maybeSingle();if(error)throw error;if(data)return {1:Number(data.grade1),2:Number(data.grade2),3:Number(data.grade3)};}catch(e){console.warn('ssampick select',e);}
  }
  const all=load(SSAMPICK_LOCAL_KEY,{});return all[extension]||null;
}
async function saveMySsamPick(extension,pick){
  if(!ssamPickOpen())throw new Error('closed');
  if(kdSbReady){
    try{const {error}=await kdSb.from('kd_staff_picks').upsert({extension,grade1:pick[1],grade2:pick[2],grade3:pick[3],updated_at:new Date().toISOString()},{onConflict:'extension'});if(error)throw error;return true;}catch(e){console.warn('ssampick upsert',e);}
  }
  const all=load(SSAMPICK_LOCAL_KEY,{});all[extension]=pick;save(SSAMPICK_LOCAL_KEY,all);return false;
}
const SSAMPICK_RESULT_LOCAL_KEY='kd_v7631_ssampick_result';
let ssamPickRealtimeChannel=null;
async function getAllSsamPicks(){
  if(kdSbReady){
    try{const {data,error}=await kdSb.from('kd_staff_picks').select('*').order('updated_at',{ascending:true});if(error)throw error;return (data||[]).map(x=>({extension:String(x.extension||''),grade1:Number(x.grade1),grade2:Number(x.grade2),grade3:Number(x.grade3),updated_at:x.updated_at||''}));}catch(e){console.warn('ssampick all select',e);}
  }
  const all=load(SSAMPICK_LOCAL_KEY,{});return Object.entries(all).map(([extension,p])=>({extension,grade1:Number(p[1]),grade2:Number(p[2]),grade3:Number(p[3]),updated_at:''}));
}
async function getSsamPickResult(){
  if(kdSbReady){
    try{const {data,error}=await kdSb.from('kd_ssampick_result').select('*').eq('id',1).maybeSingle();if(error)throw error;if(data)return {1:Number(data.grade1)||null,2:Number(data.grade2)||null,3:Number(data.grade3)||null};}catch(e){console.warn('ssampick result select',e);}
  }
  return load(SSAMPICK_RESULT_LOCAL_KEY,{1:null,2:null,3:null});
}
async function saveSsamPickResult(result){
  if(kdSbReady){
    try{const {error}=await kdSb.from('kd_ssampick_result').upsert({id:1,grade1:result[1],grade2:result[2],grade3:result[3],updated_at:new Date().toISOString()},{onConflict:'id'});if(error)throw error;return true;}catch(e){console.warn('ssampick result upsert',e);}
  }
  save(SSAMPICK_RESULT_LOCAL_KEY,result);return false;
}
function ssamPickTier(row,result){
  if(!result||![1,2,3].every(g=>Number(result[g])>0))return {hits:null,label:'결과 대기',cls:'none'};
  const hits=[1,2,3].filter(g=>Number(row['grade'+g])===Number(result[g])).length;
  if(hits===3)return {hits,label:'👑 PERFECT PICK',cls:'perfect'};
  if(hits===2)return {hits,label:'🎯🎯 GREAT PICK',cls:'great'};
  if(hits===1)return {hits,label:'🎯 NICE PICK',cls:'nice'};
  return {hits,label:'0개 적중',cls:'none'};
}
function setupSsamPickRealtime(){
  if(!kdSbReady||ssamPickRealtimeChannel)return;
  ssamPickRealtimeChannel=kdSb.channel('kd-ssampick-live').on('postgres_changes',{event:'*',schema:'public',table:'kd_staff_picks'},()=>{
    const a=document.getElementById('adminArea'),c=document.getElementById('adminContent');
    if(a&&!a.classList.contains('hidden')&&c&&c.querySelector('.ssampick-admin'))renderSsamPickManager(c);
  }).on('postgres_changes',{event:'*',schema:'public',table:'kd_ssampick_result'},()=>{
    const a=document.getElementById('adminArea'),c=document.getElementById('adminContent');
    if(a&&!a.classList.contains('hidden')&&c&&c.querySelector('.ssampick-admin'))renderSsamPickManager(c);
  }).subscribe();
}
async function renderSsamPickManager(contentEl=adminContent){
  setupSsamPickRealtime();
  const [rows,result]=await Promise.all([getAllSsamPicks(),getSsamPickResult()]);
  const complete=[1,2,3].every(g=>Number(result[g])>0);
  const tiers=rows.map(r=>ssamPickTier(r,result));
  const tierCount=cls=>tiers.filter(t=>t.cls===cls).length;
  const counts={};
  [1,2,3].forEach(g=>{counts[g]={};for(let c=1;c<=classCount(g);c++)counts[g][c]=rows.filter(r=>Number(r['grade'+g])===c).length;});
  const gradePanel=g=>{const max=Math.max(1,...Object.values(counts[g]));return `<section class="ssampick-admin-grade g${g}"><h4>${g}학년 PICK 현황</h4>${Object.entries(counts[g]).map(([c,n])=>`<div class="ssampick-count-row"><b>${c}반</b><div class="ssampick-count-bar"><i style="width:${Math.round(n/max*100)}%"></i></div><strong>${n}명</strong></div>`).join('')}</section>`};
  contentEl.innerHTML=`<div class="ssampick-admin">
    <div class="ssampick-admin-head"><div><small>STAFF PREDICTION MANAGER</small><h3>🎯 쌤PICK 현황 · 결과</h3><p>교직원 예측 현황을 확인하고 최종 종합우승 학급을 확정하면 적중 결과를 자동 계산합니다.</p></div><button type="button" id="ssamPickRefresh">↻ 새로고침</button></div>
    <div class="ssampick-admin-stats"><div class="ssampick-admin-stat"><small>참여 교직원</small><strong>${rows.length}명</strong></div><div class="ssampick-admin-stat nice"><small>NICE PICK</small><strong>${complete?tierCount('nice'):'—'}${complete?'명':''}</strong></div><div class="ssampick-admin-stat great"><small>GREAT PICK</small><strong>${complete?tierCount('great'):'—'}${complete?'명':''}</strong></div><div class="ssampick-admin-stat perfect"><small>PERFECT PICK</small><strong>${complete?tierCount('perfect'):'—'}${complete?'명':''}</strong></div></div>
    <div class="ssampick-admin-panels">${[1,2,3].map(gradePanel).join('')}</div>
    <section class="ssampick-result-box"><h4>🏆 최종 종합우승 학급 확정</h4><p>${complete?`현재 확정: <b>1-${result[1]} · 2-${result[2]} · 3-${result[3]}</b>`:'체육한마당 최종 점수 확인 후 각 학년 우승 학급을 선택해 주세요.'}</p><div class="ssampick-result-controls">${[1,2,3].map(g=>`<label>${g}학년 종합우승<select id="ssamResult${g}"><option value="">선택</option>${Array.from({length:classCount(g)},(_,i)=>i+1).map(c=>`<option value="${c}" ${Number(result[g])===c?'selected':''}>${g}-${c}반</option>`).join('')}</select></label>`).join('')}</div><div class="ssampick-result-actions"><button class="save" type="button" id="ssamResultSave">🏆 우승반 확정 · 결과 계산</button><button class="screen" type="button" id="ssamResultScreen" ${complete?'':'disabled'}>📺 결과 화면 보기</button><button class="clear" type="button" id="ssamResultClear">↻ 확정 해제</button></div></section>
    <div class="ssampick-admin-table-wrap"><table class="ssampick-admin-table"><thead><tr><th>교직원</th><th>1학년 PICK</th><th>2학년 PICK</th><th>3학년 PICK</th><th>적중 결과</th></tr></thead><tbody>${rows.length?rows.map((r,i)=>{const t=tiers[i];return `<tr><td>내선 ${escapeHtml(r.extension)}</td><td>1-${r.grade1}</td><td>2-${r.grade2}</td><td>3-${r.grade3}</td><td><span class="ssampick-tier ${t.cls}">${t.label}</span></td></tr>`}).join(''):'<tr><td colspan="5" class="ssampick-empty">아직 쌤PICK 참여자가 없습니다.</td></tr>'}</tbody></table></div>
    <div id="ssamPickResultScreenArea"></div><div class="ssampick-admin-note">※ 현재 교직원 인증은 내선번호 기준이므로 관리자 화면에도 내선번호로 표시됩니다. 일반 교직원에게는 다른 사람의 PICK 현황이 공개되지 않습니다.</div></div>`;
  const refresh=document.getElementById('ssamPickRefresh');if(refresh)refresh.onclick=()=>renderSsamPickManager(contentEl);
  const saveBtn=document.getElementById('ssamResultSave');if(saveBtn)saveBtn.onclick=async()=>{const next={1:Number(document.getElementById('ssamResult1').value)||null,2:Number(document.getElementById('ssamResult2').value)||null,3:Number(document.getElementById('ssamResult3').value)||null};if(![1,2,3].every(g=>next[g])){alert('1·2·3학년 종합우승 학급을 모두 선택해 주세요.');return;}if(!confirm(`최종 종합우승을 1-${next[1]}, 2-${next[2]}, 3-${next[3]}반으로 확정할까요?`))return;saveBtn.disabled=true;await saveSsamPickResult(next);alert('쌤PICK 결과를 계산했습니다.');await renderSsamPickManager(contentEl);};
  const clearBtn=document.getElementById('ssamResultClear');if(clearBtn)clearBtn.onclick=async()=>{if(!confirm('확정된 우승반과 쌤PICK 결과 판정을 해제할까요?'))return;await saveSsamPickResult({1:null,2:null,3:null});await renderSsamPickManager(contentEl);};
  const screenBtn=document.getElementById('ssamResultScreen');if(screenBtn&&!screenBtn.disabled)screenBtn.onclick=()=>{const area=document.getElementById('ssamPickResultScreenArea');const perfect=rows.filter((r,i)=>tiers[i].cls==='perfect');const great=rows.filter((r,i)=>tiers[i].cls==='great');const nice=rows.filter((r,i)=>tiers[i].cls==='nice');area.innerHTML=`<div class="ssampick-result-screen"><small>2026 KYONGDUG ALL PLAY</small><h3>🎯 쌤PICK RESULT</h3><div class="champions"><span>🏆 1학년 ${result[1]}반</span><span>🏆 2학년 ${result[2]}반</span><span>🏆 3학년 ${result[3]}반</span></div><div class="winners"><b>👑 PERFECT PICK · ${perfect.length}명</b>${perfect.length?perfect.map(r=>`<span>내선 ${escapeHtml(r.extension)}</span>`).join(''):'<span>PERFECT PICK 없음</span>'}</div><div class="winners"><b>🎯🎯 GREAT PICK · ${great.length}명</b>${great.length?great.map(r=>`<span>내선 ${escapeHtml(r.extension)}</span>`).join(''):'<span>GREAT PICK 없음</span>'}</div><div class="winners"><b>🎯 NICE PICK · ${nice.length}명</b>${nice.length?nice.map(r=>`<span>내선 ${escapeHtml(r.extension)}</span>`).join(''):'<span>NICE PICK 없음</span>'}</div></div>`;area.scrollIntoView({behavior:'smooth',block:'start'});};
}

async function renderSsamPick(contentEl){
  const extension=currentStaffName;
  if(!extension){contentEl.innerHTML='<div class="vote-empty">교직원 인증 후 이용해 주세요.</div>';return;}
  const saved=await getMySsamPick(extension);const pick=saved?{...saved}:{1:null,2:null,3:null};const open=ssamPickOpen();
  const draw=()=>{
    contentEl.innerHTML=`<div class="ssampick-wrap"><section class="ssampick-hero"><div class="ssampick-kicker">STAFF PREDICTION EVENT</div><h3>🎯 쌤PICK <small>교직원 승부예측</small></h3><p><b>1·2·3학년 종합우승 학급을 예상해보세요!</b><br>선생님의 촉으로 학년별 우승 학급을 하나씩 PICK 해주세요.</p><div class="ssampick-deadline">⏰ 9월 30일(수) 23:59 마감</div></section><div class="ssampick-grades">${[1,2,3].map(g=>`<section class="ssampick-grade grade-${g}"><div class="ssampick-grade-head"><span class="ssampick-grade-badge">${g}</span><div><small>CHAMPION PICK</small><h4>${g}학년 우승 예상</h4></div></div><div class="ssampick-classes">${Array.from({length:classCount(g)},(_,i)=>i+1).map(no=>`<button type="button" class="ssampick-class ${pick[g]===no?'selected':''}" data-pick-grade="${g}" data-pick-class="${no}" ${open?'':'disabled'}><span>${no}</span><small>반</small></button>`).join('')}</div></section>`).join('')}</div><div class="ssampick-my ${[1,2,3].every(g=>pick[g])?'complete':'waiting'}">${[1,2,3].every(g=>pick[g])?`<div class="ssampick-my-title">MY PICK 🎯</div><div class="ssampick-my-picks"><span>1학년 <b>${pick[1]}반</b></span><span>2학년 <b>${pick[2]}반</b></span><span>3학년 <b>${pick[3]}반</b></span></div>${open?'<small>마감 전까지 언제든 변경할 수 있습니다.</small>':''}`:'<div class="ssampick-wait-icon">✓</div><div><b>세 학년의 우승 예상 학급을 모두 선택해주세요.</b><small>1·2·3학년에서 각각 한 학급씩 선택하면 저장할 수 있습니다.</small></div>'}</div>${open?`<button type="button" class="ssampick-save" id="ssamPickSave" ${[1,2,3].every(g=>pick[g])?'':'disabled'}>🎯 나의 PICK 저장</button>`:`<div class="ssampick-closed">🔒 쌤PICK 예측이 마감되었습니다.</div>`}<div class="ssampick-levels"><div class="ssampick-level nice"><strong>🎯 NICE PICK</strong><span>1개 학년 적중</span></div><div class="ssampick-level great"><strong>🎯🎯 GREAT PICK</strong><span>2개 학년 적중</span></div><div class="ssampick-level perfect"><strong>👑 PERFECT PICK</strong><span>3개 학년 모두 적중</span></div></div><div class="ssampick-prize-note"><span>🎁</span><b>적중 결과에 따라 소소한 상품(?)이 준비되어 있습니다.</b></div></div>`;
    contentEl.querySelectorAll('[data-pick-grade]').forEach(btn=>btn.onclick=()=>{pick[Number(btn.dataset.pickGrade)]=Number(btn.dataset.pickClass);draw();});
    const saveBtn=document.getElementById('ssamPickSave');if(saveBtn)saveBtn.onclick=async()=>{saveBtn.disabled=true;saveBtn.textContent='저장 중…';try{await saveMySsamPick(extension,pick);alert('나의 PICK을 저장했습니다. 🎯');await renderSsamPick(contentEl);}catch(e){alert(e.message==='closed'?'쌤PICK 참여가 마감되었습니다.':'저장에 실패했습니다. 잠시 후 다시 시도해 주세요.');}};
  };draw();
}

document.querySelectorAll('[data-staff-view]').forEach(b=>b.onclick=()=>staffView(b.dataset.staffView));
async function staffView(v, contentEl=staffContent){
  if(v==='votemanager'){
    renderVoteManager(contentEl);
  } else if(v==='songmanager'){
    renderSongManager(contentEl);
  } else if(v==='flagimages'){
    contentEl.innerHTML=`<div class="flag-admin-head"><small>CLASS FLAG IMAGE</small><h3>🚩 학급 깃발 이미지 관리</h3><p>사진을 한 번 등록하면 학급 깃발 탭과 교직원 깃발 투표 화면에 함께 표시됩니다.</p></div><div class="flag-admin-controls"><select id="fiGrade">${[1,2,3].map(g=>`<option value="${g}">${g}학년</option>`).join('')}</select><select id="fiClass"></select><input type="file" id="fiFile" accept="image/*" capture="environment"><button id="fiSave">사진 등록</button></div><div id="fiPreview" class="flag-admin-preview">등록할 학급과 사진을 선택해 주세요.</div>`;
    const fill=()=>{const g=Number(fiGrade.value);fiClass.innerHTML=Array.from({length:classCount(g)},(_,i)=>`<option value="${i+1}">${g}-${i+1}</option>`).join('')};fill();fiGrade.onchange=fill;
    fiFile.onchange=()=>{const f=fiFile.files[0];if(f){const u=URL.createObjectURL(f);fiPreview.innerHTML=`<img src="${u}"><b>${fiGrade.value}-${fiClass.value} 등록 예정</b>`;}};
    fiSave.onclick=async()=>{const f=fiFile.files[0];if(!f){alert('깃발 사진을 선택해 주세요.');return;}fiSave.disabled=true;fiSave.textContent='등록 중…';try{const data=await compressFlagImage(f);const key=`${fiGrade.value}-${fiClass.value}`;await saveSharedFlag(key,data);await renderFlags();alert(`${key} 깃발 사진을 등록했습니다. 투표 화면에도 자동 반영됩니다.`);fiPreview.innerHTML=`<img src="${data}"><b>${key} 등록 완료</b>`;}catch(e){console.error(e);alert('사진 등록에 실패했습니다. Supabase 깃발 설정을 확인해 주세요.');}finally{fiSave.disabled=false;fiSave.textContent='사진 등록';}};
  } else if(v==='preliminput'){
    contentEl.innerHTML=`<h3>예선 결과 입력</h3><div class="staff-form"><select id="piEvent">${prelimEvents.map(x=>`<option>${x}</option>`).join('')}</select><select id="piGrade"><option>1</option><option>2</option><option>3</option></select><input id="piResult" placeholder="예: 1반 결승 진출"><button id="piSave">저장</button></div>`;
    piSave.onclick=()=>{let s=load(STORE.prelim,{});s[`${piEvent.value}_${piGrade.value}`]=piResult.value;save(STORE.prelim,s);renderBrackets();alert('저장했습니다.')};
  } else if(v==='scoreinput'){
    const scoreInputEvents = scoreEvents;
    let quickEvent = sessionStorage.getItem('kd_score_event') || scoreInputEvents[0];
    let quickGrade = Number(sessionStorage.getItem('kd_score_grade') || 1);
    let lastScoreAction = null;

    const drawQuickScore = ()=>{
      const scores=getScores();
      const pts=rankPoints[quickEvent]||[0,0,0,0,0];
      const n=classCount(quickGrade);
      const rows=Array.from({length:n},(_,i)=>{
        const cls=`${quickGrade}-${i+1}`;
        const current=Number(scores[cls]?.[quickEvent]||0);
        const currentRank=current?pts.findIndex(x=>x===current)+1:0;
        const rankText=currentRank ? (currentRank===5?'5위 이하':`${currentRank}위`) : '미입력';
        return `<article class="quick-score-class ${current?'done':''}">
          <div class="quick-score-class-head"><strong>${cls}</strong><span>${current?`✓ ${rankText} · ${current}점`:'미입력'}</span></div>
          <div class="quick-rank-buttons">
            ${pts.map((point,idx)=>`<button type="button" data-quick-score="${cls}" data-rank="${idx+1}" class="${current===point?'selected':''}"><b>${idx===4?'5위↓':`${idx+1}위`}</b><small>${point}점</small></button>`).join('')}
          </div>
        </article>`;
      }).join('');
      const done=Array.from({length:n},(_,i)=>`${quickGrade}-${i+1}`).filter(c=>Number(scores[c]?.[quickEvent]||0)>0).length;
      contentEl.innerHTML=`
        <div class="score-admin-head quick-score-head">
          <div><small>GAME DAY QUICK SCORE</small><h3>🏆 당일 점수 빠른 입력</h3><p>종목과 학년을 고른 뒤 학급별 순위 버튼만 누르세요. 점수는 즉시 자동 반영됩니다.</p></div>
          <span>${done}/${n} 입력</span>
        </div>
        <div class="quick-score-toolbar">
          <label><span>① 종목 선택</span><select id="quickEvent">${scoreInputEvents.map(x=>`<option ${x===quickEvent?'selected':''}>${x}</option>`).join('')}</select></label>
          <div class="quick-grade-tabs"><span>② 학년 선택</span><div>${[1,2,3].map(g=>`<button type="button" data-score-grade="${g}" class="${g===quickGrade?'active':''}">${g}학년</button>`).join('')}</div></div>
          <div class="quick-progress"><small>입력 진행률</small><strong>${done}/${n}</strong><span>${done===n?'✓ 입력 완료':'학급'}</span></div>
        </div>
        <div class="quick-score-notice">💡 <b>순위 버튼을 누르는 즉시 저장됩니다.</b> 잘못 눌렀다면 다른 순위를 다시 누르거나 아래 <b>실행취소</b>를 사용하세요.</div>
        <div class="quick-score-grid">${rows}</div>
        <div class="quick-score-bottom"><button type="button" id="quickUndo" ${lastScoreAction?'':'disabled'}>↩ 마지막 입력 실행취소</button><span id="quickScoreStatus">${lastScoreAction?escapeHtml(lastScoreAction.message):'입력 대기 중'}</span></div>`;

      quickEventEl=document.getElementById('quickEvent');
      quickEventEl.onchange=()=>{quickEvent=quickEventEl.value;sessionStorage.setItem('kd_score_event',quickEvent);lastScoreAction=null;drawQuickScore();};
      contentEl.querySelectorAll('[data-score-grade]').forEach(b=>b.onclick=()=>{quickGrade=Number(b.dataset.scoreGrade);sessionStorage.setItem('kd_score_grade',quickGrade);lastScoreAction=null;drawQuickScore();});
      contentEl.querySelectorAll('[data-quick-score]').forEach(b=>b.onclick=async()=>{
        const cls=b.dataset.quickScore, rank=Number(b.dataset.rank), point=pointsForRank(quickEvent,rank);
        const all=getScores(); const prev=Number(all[cls]?.[quickEvent]||0);
        const ok=await saveSharedScore(cls,quickEvent,point);
        lastScoreAction={cls,event:quickEvent,prev,message:`✓ ${cls} · ${quickEvent} · ${rank===5?'5위 이하':rank+'위'} · ${point}점 ${ok?'실시간 공유 완료':'기기 저장 완료 · 공유 연결 확인 필요'}`};
        drawQuickScore();
      });
      const undo=document.getElementById('quickUndo');
      if(undo) undo.onclick=async()=>{
        if(!lastScoreAction)return;
        const a=lastScoreAction; await saveSharedScore(a.cls,a.event,a.prev);
        const msg=`↩ ${a.cls} · ${a.event} 입력을 이전 상태로 되돌렸습니다.`; lastScoreAction=null; drawQuickScore();
        const st=document.getElementById('quickScoreStatus'); if(st) st.textContent=msg;
      };
    };
    drawQuickScore();
  } else if(v==='noticeinput'){
    contentEl.innerHTML=`<h3>공지 등록</h3><div class="staff-form"><input id="niTitle" placeholder="제목"><input id="niBody" placeholder="내용" style="grid-column:span 2"><button id="niSave">등록</button></div>`;
    niSave.onclick=()=>{let a=load(STORE.notices,[]);a.push({title:niTitle.value,body:niBody.value,time:new Date().toLocaleString()});save(STORE.notices,a);renderBoard();alert('등록했습니다.')};
  } else if(v==='qnaanswer'){
    contentEl.innerHTML=`
      <div class="faq-admin-head qna-manager-v763"><div><small>Q&A MANAGER</small><h3>❓ 학생 Q&A 답변 관리</h3><p>학생이 등록한 질문을 확인하고 바로 답변할 수 있습니다.</p></div><span>${kdSbReady?'☁️ 실시간 공유':'📱 이 기기 저장'}</span></div>
      <div class="faq-admin-note">학생 질문 → 관리자 답변 → 학생 화면에 자동 반영됩니다. 답변은 수정하거나 삭제할 수 있습니다.</div>
      <div id="staffQnaItems" class="faq-admin-list"><div class="info-note">질문을 불러오는 중입니다.</div></div>`;
    const drawFaqAdmin=async()=>{
      const list=await getQnaData(), itemsEl=document.getElementById('staffQnaItems');
      if(!itemsEl)return;
      itemsEl.innerHTML=list.length?list.map(x=>{const done=!!(x.answer&&String(x.answer).trim());return `<article class="staff-faq-card ${done?'answered':''}" data-faq-card="${x.id}">
        <div class="staff-faq-top"><span>${escapeHtml(x.category||'일반')} · ${escapeHtml(x.cls||'')} ${escapeHtml(maskQnaName(x.name))}</span><span class="qna-status ${done?'done':'wait'}">${done?'✓ 답변완료':'● 답변대기'}</span></div>
        <div class="admin-qna-question"><small>학생 질문</small><b>${escapeHtml(x.question||'')}</b></div>
        <label><small>본부 답변</small><textarea id="fqa_${x.id}" maxlength="500" placeholder="답변을 입력하세요.">${escapeHtml(x.answer||'')}</textarea></label>
        <div class="admin-qna-actions"><button class="faq-save" data-qna-save="${x.id}">${done?'답변 수정':'답변 등록'}</button>${done?`<button class="faq-answer-delete" data-qna-answer-delete="${x.id}">답변만 삭제</button>`:''}<button class="faq-delete" data-qna-delete="${x.id}">질문 삭제</button></div>
      </article>`}).join(''):'<div class="info-note">아직 학생이 등록한 질문이 없습니다.</div>';
      itemsEl.querySelectorAll('[data-qna-save]').forEach(btn=>btn.onclick=async()=>{const ta=document.getElementById(`fqa_${btn.dataset.qnaSave}`),a=ta?ta.value.trim():'';if(!a){alert('답변을 입력해 주세요.');return;}await answerQna(btn.dataset.qnaSave,a);await renderQna();await drawFaqAdmin();alert('답변을 등록했습니다.');});
      itemsEl.querySelectorAll('[data-qna-answer-delete]').forEach(btn=>btn.onclick=async()=>{if(!confirm('답변만 삭제하고 답변대기 상태로 돌릴까요?'))return;await answerQna(btn.dataset.qnaAnswerDelete,'');await renderQna();await drawFaqAdmin();});
      itemsEl.querySelectorAll('[data-qna-delete]').forEach(btn=>btn.onclick=async()=>{if(!confirm('이 질문을 완전히 삭제할까요?'))return;await deleteQna(btn.dataset.qnaDelete);await renderQna();await drawFaqAdmin();});
    };
    await drawFaqAdmin();
  } else if(v==='luckymanager'){
    await luckyAdminRender(contentEl);
  } else if(v==='ssampickmanager'){
    await renderSsamPickManager(contentEl);
  } else if(v==='ssampick'){
    currentStaffVoteType=null;
    await renderSsamPick(contentEl);
  } else if(v==='performance'){
    currentStaffVoteType='performance';
    renderStaffVote('performance',contentEl);
  } else if(v==='flagvote'){
    currentStaffVoteType='flag';
    renderStaffVote('flag',contentEl);
  }
}



// V76.3 관리자 전용: ID + 비밀번호
const ADMIN_ID='leekj1212';
const ADMIN_PW='rkrk1212!@';
const adminLoginEl=document.getElementById('adminLogin');
const adminIdEl=document.getElementById('adminId');
const adminPwEl=document.getElementById('adminPw');
const adminLoginBtnEl=document.getElementById('adminLoginBtn');
const adminAreaEl=document.getElementById('adminArea');
const adminContentEl=document.getElementById('adminContent');
if(adminLoginBtnEl){
  adminLoginBtnEl.onclick=()=>{
    const id=(adminIdEl?.value||'').trim(), pw=adminPwEl?.value||'';
    if(id===ADMIN_ID&&pw===ADMIN_PW){
      adminLoginEl?.classList.add('hidden');adminAreaEl?.classList.remove('hidden');setupVoteRealtime();startQnaRealtime();
      if(adminContentEl)adminContentEl.innerHTML='<h3>관리자 메뉴</h3><p>위 메뉴에서 필요한 관리 기능을 선택하세요.</p>';
    }else alert('관리자 ID 또는 비밀번호를 확인해 주세요.');
  };
  [adminIdEl,adminPwEl].filter(Boolean).forEach(el=>el.addEventListener('keydown',e=>{if(e.key==='Enter')adminLoginBtnEl.click();}));
}

document.querySelectorAll('[data-admin-view]').forEach(b=>b.onclick=async()=>{if(!adminContentEl)return;adminContentEl.innerHTML='<div class="info-note">불러오는 중입니다…</div>';try{await staffView(b.dataset.adminView,adminContentEl);}catch(e){console.error(e);adminContentEl.innerHTML='<div class="vote-empty">관리 화면을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</div>';}});
if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js?v=76.37',{updateViaCache:'none'}).catch(()=>{})}



const WEATHER_EVENT_DATE='2026-10-01';
const WEATHER_LAT=36.6424;
const WEATHER_LON=127.4890;

function weatherIcon(code){
  if(code===0) return '☀️';
  if([1,2].includes(code)) return '🌤️';
  if(code===3) return '☁️';
  if([45,48].includes(code)) return '🌫️';
  if([51,53,55,56,57].includes(code)) return '🌦️';
  if([61,63,65,66,67,80,81,82].includes(code)) return '🌧️';
  if([71,73,75,77,85,86].includes(code)) return '🌨️';
  if([95,96,99].includes(code)) return '⛈️';
  return '🌤️';
}
function weatherText(code){
  if(code===0) return '맑음';
  if([1,2].includes(code)) return '대체로 맑음';
  if(code===3) return '흐림';
  if([45,48].includes(code)) return '안개';
  if([51,53,55,56,57].includes(code)) return '이슬비 가능';
  if([61,63,65,66,67,80,81,82].includes(code)) return '비 가능';
  if([71,73,75,77,85,86].includes(code)) return '눈 가능';
  if([95,96,99].includes(code)) return '뇌우 가능';
  return '예보 확인';
}
async function loadEventWeather(){
  const headline=document.getElementById('weatherHeadline');
  if(!headline) return;
  try{
    const url=`https://api.open-meteo.com/v1/forecast?latitude=${WEATHER_LAT}&longitude=${WEATHER_LON}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code&timezone=Asia%2FSeoul&forecast_days=16`;
    const res=await fetch(url,{cache:'no-store'});
    if(!res.ok) throw new Error('weather fetch failed');
    const data=await res.json();
    const di=(data.daily?.time||[]).indexOf(WEATHER_EVENT_DATE);

    if(di<0){
      weatherHeadline.textContent='예보 제공 전';
      weatherSummary.textContent='행사일이 예보 범위에 들어오면 자동으로 최신 예보를 표시합니다.';
      weatherSymbol.textContent='🗓️';
      weatherStatus.className='weather-status';
      weatherStatus.innerHTML='<div class="weather-status-icon">🗓️</div><div><b>아직 행사일 예보 제공 전입니다.</b><p>행사일이 가까워지면 기온·강수확률·풍속·시간대별 예보가 자동으로 나타납니다.</p></div>';
      return;
    }

    const code=data.daily.weather_code[di];
    const tmax=Math.round(data.daily.temperature_2m_max[di]);
    const tmin=Math.round(data.daily.temperature_2m_min[di]);
    const rain=Math.round(data.daily.precipitation_probability_max[di]??0);
    const wind=Math.round((data.daily.wind_speed_10m_max[di]??0)*10)/10;

    weatherHeadline.textContent=weatherText(code);
    weatherSummary.textContent=`최고 ${tmax}℃ · 최저 ${tmin}℃ · 강수확률 ${rain}%`;
    weatherSymbol.textContent=weatherIcon(code);
    weatherTemp.textContent=`${tmax}℃ / ${tmin}℃`;
    weatherRain.textContent=`${rain}%`;
    weatherWind.textContent=`${wind} km/h`;

    const hours=['09:00','12:00','15:00'];
    const hourlyHtml=[];
    let humidities=[];
    hours.forEach(h=>{
      const target=`${WEATHER_EVENT_DATE}T${h}`;
      const hi=(data.hourly?.time||[]).indexOf(target);
      if(hi>=0){
        const ht=Math.round(data.hourly.temperature_2m[hi]);
        const hr=Math.round(data.hourly.precipitation_probability[hi]??0);
        const hh=Math.round(data.hourly.relative_humidity_2m[hi]??0);
        const hc=data.hourly.weather_code[hi];
        humidities.push(hh);
        hourlyHtml.push(`<div class="weather-hour"><time>${h}</time><span>${weatherIcon(hc)}</span><b>${ht}℃</b><small>강수 ${hr}% · 습도 ${hh}%</small></div>`);
      }
    });
    if(hourlyHtml.length) weatherHourly.innerHTML=hourlyHtml.join('');
    if(humidities.length) weatherHumidity.textContent=`${Math.round(humidities.reduce((a,b)=>a+b,0)/humidities.length)}%`;

    let cls='good', icon='🟢', title='현재 예보 기준 정상 진행 가능';
    let detail='기상 상황을 계속 확인하며 정상 운영을 준비하세요.';
    if(rain>=60){cls='rain';icon='🌧️';title='우천 대비 필요';detail='강수확률이 높습니다. 우천 대체 운영과 장비 보호를 함께 준비하세요.'}
    else if(rain>=30){cls='warn';icon='🟡';title='강수 가능성 확인';detail='경기 전 최신 강수 예보와 운동장 상태를 다시 확인하세요.'}
    weatherStatus.className=`weather-status ${cls}`;
    weatherStatus.innerHTML=`<div class="weather-status-icon">${icon}</div><div><b>${title}</b><p>${detail}</p></div>`;

    weatherTips.innerHTML=`
      <div><span>${rain>=60?'🌧️':'🟢'}</span><b>${rain>=60?'우천 대비':'정상 진행 체크'}</b><small>${rain>=60?'대체 장소·우천 운영안 확인':'현재 예보 기준 운영 가능'}</small></div>
      <div><span>💧</span><b>수분 섭취</b><small>${tmax>=26?'기온이 높아 음수 시간을 자주 안내':'종목 사이 충분한 음수 안내'}</small></div>
      <div><span>${tmax>=24?'☀️':'🧢'}</span><b>햇빛 대비</b><small>${tmax>=24?'모자·자외선 차단 준비 권장':'장시간 야외활동 대비 권장'}</small></div>
      <div><span>💨</span><b>바람 확인</b><small>${wind>=25?'깃발·천막·방송 장비 고정 강화':'깃발·천막 고정 상태 확인'}</small></div>`;
  }catch(err){
    console.error(err);
    weatherHeadline.textContent='예보를 불러오지 못했습니다';
    weatherSummary.textContent='잠시 후 다시 새로고침해 주세요.';
    weatherSymbol.textContent='🔄';
  }
}
document.getElementById('weatherRefresh')?.addEventListener('click',loadEventWeather);
loadEventWeather();

document.querySelectorAll('[data-cal-detail]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const detail=document.getElementById('calendarDetail');
    if(!detail) return;
    const [date,title,desc]=(btn.dataset.calDetail||'').split('|');
    detail.classList.add('active');
    detail.innerHTML=`<div class="calendar-detail-icon">📅</div><div><b>${escapeHtml(date)} · ${escapeHtml(title)}</b><p>${escapeHtml(desc)}</p></div>`;
  });
});

// ===== V76.22 ALL PLAY 행운권 응모 · 현장 추첨 =====
const LUCKY_OPEN=new Date(2026,8,14,0,0,0), LUCKY_CLOSE=new Date(2026,9,1,0,0,0);
const LUCKY_LOCAL='kd_lucky_entries_v7615';
const LUCKY_PRIZES=[
  {id:'basketball',emoji:'🏀',name:'농구공',tag:'SPORTS PICK',winners:1},
  {id:'soccer',emoji:'⚽',name:'축구공',tag:'SPORTS PICK',winners:1},
  {id:'volleyball',emoji:'🏐',name:'배구공',tag:'SPORTS PICK',winners:1},
  {id:'shuttlecock',emoji:'🏸',name:'셔틀콕 1타 (12개입)',tag:'BADMINTON PICK',winners:1},
  {id:'socks',emoji:'🧦',name:'고급 스포츠양말',tag:'DAILY SPORTS',winners:3},
  {id:'snackbox',emoji:'🍪',name:'과자박스',tag:'SNACK PICK',winners:3},
  {id:'oliveyoung',emoji:'🛍️',name:'올리브영 1만원권',tag:'LIFESTYLE PICK',winners:1},
  {id:'jjajang',emoji:'🍜',name:'짜장면 2인권',tag:'WITH A FRIEND',winners:1},
  {id:'waffle',emoji:'🧇',name:'와플대학 1만원권',tag:'SWEET PICK',winners:1},
  {id:'gym',emoji:'🏟️',name:'우리 반 강당 1시간 대관권',tag:'CLASS SPECIAL',winners:3}
];
const LUCKY_TOTAL_STUDENTS=600;
let luckyMe=null;
const LUCKY_STATE_LOCAL='kd_lucky_state_v7615', LUCKY_WINNERS_LOCAL='kd_lucky_winners_v7615';

async function luckyState(){
  if(kdSbReady){try{const {data,error}=await kdSb.from('kd_lucky_state').select('*').eq('id',1).maybeSingle();if(error)throw error;if(data)return data}catch(e){console.warn('lucky state',e)}}
  return load(LUCKY_STATE_LOCAL,{id:1,is_finalized:false,finalized_at:null});
}
async function luckyFinalize(){
  const now=new Date().toISOString();
  if(kdSbReady){const {error}=await kdSb.from('kd_lucky_state').upsert({id:1,is_finalized:true,finalized_at:now});if(error)throw error;return}
  save(LUCKY_STATE_LOCAL,{id:1,is_finalized:true,finalized_at:now});
}
async function luckyWinners(){
  if(kdSbReady){try{const {data,error}=await kdSb.from('kd_lucky_winners').select('*').order('draw_order');if(error)throw error;return data||[]}catch(e){console.warn('lucky winners',e)}}
  return load(LUCKY_WINNERS_LOCAL,[]);
}
async function luckySaveWinners(prizeId,winners){
  if(kdSbReady){
    const payload=winners.map((w,i)=>({prize_id:prizeId,draw_order:i+1,student_id:w.student_id,student_name:w.student_name}));
    const {error}=await kdSb.from('kd_lucky_winners').insert(payload);if(error)throw error;return;
  }
  const a=load(LUCKY_WINNERS_LOCAL,[]); winners.forEach((w,i)=>a.push({prize_id:prizeId,draw_order:i+1,student_id:w.student_id,student_name:w.student_name,drawn_at:new Date().toISOString()})); save(LUCKY_WINNERS_LOCAL,a);
}
function luckyShuffle(a){
  const x=[...a];
  for(let i=x.length-1;i>0;i--){const r=new Uint32Array(1);crypto.getRandomValues(r);const j=r[0]%(i+1);[x[i],x[j]]=[x[j],x[i]]}
  return x;
}
function luckyPeriod(){const n=new Date(),y=n.getFullYear(),m=n.getMonth()+1,d=n.getDate();if(y<2026||(y===2026&&(m<9||(m===9&&d<14))))return'before';if(y===2026&&m===9&&d<=30)return'open';return'closed'}
async function luckyHash(v){const b=new TextEncoder().encode(String(v));const h=await crypto.subtle.digest('SHA-256',b);return [...new Uint8Array(h)].map(x=>x.toString(16).padStart(2,'0')).join('')}
function luckyLocalRows(){return load(LUCKY_LOCAL,[])} function luckyLocalSave(a){save(LUCKY_LOCAL,a)}
async function luckyRows(){if(kdSbReady){try{const {data,error}=await kdSb.from('kd_lucky_entries').select('student_id,student_name,prize_id,created_at,updated_at');if(error)throw error;return data||[]}catch(e){console.warn('lucky rows',e)}}return luckyLocalRows()}
async function luckyFind(studentId){if(kdSbReady){try{const {data,error}=await kdSb.from('kd_lucky_entries').select('*').eq('student_id',studentId).maybeSingle();if(error)throw error;return data}catch(e){console.warn('lucky find',e)}}return luckyLocalRows().find(x=>x.student_id===studentId)||null}
async function luckyCreate(studentId,name,pinHash){if(kdSbReady){const {error}=await kdSb.from('kd_lucky_entries').insert({student_id:studentId,student_name:name,pin_hash:pinHash,prize_id:null});if(!error)return true;throw error}let a=luckyLocalRows();if(a.some(x=>x.student_id===studentId))throw new Error('exists');a.push({student_id:studentId,student_name:name,pin_hash:pinHash,prize_id:null,created_at:new Date().toISOString()});luckyLocalSave(a);return true}
async function luckySetPrize(studentId,prizeId){if(kdSbReady){const {error}=await kdSb.from('kd_lucky_entries').update({prize_id:prizeId,updated_at:new Date().toISOString()}).eq('student_id',studentId);if(!error)return;throw error}let a=luckyLocalRows(),x=a.find(v=>v.student_id===studentId);if(x){x.prize_id=prizeId;x.updated_at=new Date().toISOString();luckyLocalSave(a)}}
async function luckyReset(studentId){if(kdSbReady){const {error}=await kdSb.from('kd_lucky_entries').delete().eq('student_id',studentId);if(!error)return;throw error}luckyLocalSave(luckyLocalRows().filter(x=>x.student_id!==studentId))}
function luckyPrize(id){return LUCKY_PRIZES.find(x=>x.id===id)}
function luckyStatusRender(){const el=document.getElementById('luckyStatus');if(!el)return;const st=luckyPeriod();el.innerHTML=st==='open'?'<div class="open">9월 30일 23:59까지 응모 및 응모상품 변경 가능</div>':st==='before'?'<div class="before">⏳ 행운권 응모는 9월 14일부터 시작됩니다.</div>':'<div class="closed">🔒 응모가 마감되었습니다 · 10월 1일 체육한마당에서 당첨자를 공개합니다.</div>'}
function luckyAuthRender(){const el=document.getElementById('luckyAuth'),app=document.getElementById('luckyApp');if(!el||!app)return;if(luckyMe){el.classList.add('hidden');app.classList.remove('hidden');luckyAppRender();return}app.classList.add('hidden');el.classList.remove('hidden');el.innerHTML=`<div class="lucky-login-card"><span class="step">STEP 01 · MY TICKET</span><h3>행운권 응모하기</h3><p>학번·이름과 나만의 4자리 PIN (숫자)을 입력해 주세요.</p><div class="lucky-fields"><input id="luckySid" inputmode="numeric" maxlength="4" placeholder="학번(예:1234)"><input id="luckyName" maxlength="10" placeholder="이름"><input class="full" id="luckyPin" type="password" inputmode="numeric" maxlength="4" placeholder="4자리 PIN (숫자)"></div><button class="lucky-primary" id="luckyEnter">행운권 응모하기</button><div class="lucky-subnote">🔐 이미 참여한 학생은 <b>학번 + PIN</b>으로 다시 들어옵니다.<br>PIN을 잊었거나 내가 설정하지 않은 PIN이 등록되어 있다면 본부에서 초기화할 수 있습니다.</div></div>`;document.getElementById('luckyEnter').onclick=luckyEnter}
async function luckyEnter(){const sid=document.getElementById('luckySid').value.trim(),name=document.getElementById('luckyName').value.trim(),pin=document.getElementById('luckyPin').value.trim();if(!/^\d{4}$/.test(sid)){alert('학번을 4자리 숫자로 입력해 주세요. (예:1234)');return}if(name.length<2){alert('이름을 입력해 주세요.');return}if(!/^\d{4}$/.test(pin)){alert('PIN은 숫자 4자리로 입력해 주세요.');return}try{let row=await luckyFind(sid),hash=await luckyHash(pin);if(row){if(row.pin_hash!==hash){alert('PIN이 맞지 않습니다. 본인이 설정하지 않은 PIN이라면 본부에 초기화를 요청해 주세요.');return}if(String(row.student_name||'').trim()!==name){alert('처음 등록한 이름과 일치하지 않습니다.');return}luckyMe=row}else{if(luckyPeriod()==='closed'){alert('행운권 응모가 마감되었습니다.');return}await luckyCreate(sid,name,hash);luckyMe=await luckyFind(sid)||{student_id:sid,student_name:name,prize_id:null,pin_hash:hash}}luckyAuthRender()}catch(e){console.error(e);alert('등록 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.')}}
async function luckyAppRender(){
  if(!luckyMe)return;
  document.getElementById('luckyStudentLabel').textContent=`${luckyMe.student_id} · ${maskName(luckyMe.student_name)}`;
  const rows=await luckyRows(),counts=Object.fromEntries(LUCKY_PRIZES.map(p=>[p.id,0]));
  rows.forEach(x=>{if(counts[x.prize_id]!=null)counts[x.prize_id]++});
  const entered=rows.filter(x=>x.prize_id);
  document.getElementById('luckyTotal').textContent=entered.length;
  const mine=luckyPrize(luckyMe.prize_id);
  const myPrizeEl=document.getElementById('luckyMyPrize');
  const myMetaEl=document.getElementById('luckyMyMeta');
  if(mine){
    myPrizeEl.innerHTML=`<div class="lucky-my-selected"><span class="emoji">${mine.emoji}</span><div><small>현재 응모 상품</small><b>${escapeHtml(mine.name)}</b><span>${escapeHtml(mine.name)} 현재 응모 인원 <strong>${counts[mine.id]||0}명</strong></span></div></div>`;
    if(myMetaEl)myMetaEl.innerHTML=`✓ 응모가 완료되었습니다. <b>9월 30일 23:59까지 응모 상품 변경 가능</b>`;
  }else{
    myPrizeEl.innerHTML=`<div class="lucky-my-empty"><b>아직 응모 상품을 선택하지 않았습니다.</b><span>아래 상품 중 가장 갖고 싶은 상품 하나를 선택해 주세요.</span></div>`;
    if(myMetaEl)myMetaEl.textContent='9월 30일 23:59까지 응모 상품 변경 가능';
  }
  const state=await luckyState(),closed=luckyPeriod()!=='open'||state.is_finalized;
  document.getElementById('luckyPrizeGrid').innerHTML=LUCKY_PRIZES.map(p=>`
    <article class="lucky-prize ${luckyMe.prize_id===p.id?'selected':''}">
      <div class="lucky-prize-top"><div class="lucky-emoji">${p.emoji}</div><div class="lucky-prize-copy"><small>${p.tag}</small><b>${escapeHtml(p.name)}</b></div></div>
      <div class="lucky-count"><span>${escapeHtml(p.name)} 현재 응모 인원</span><strong>${counts[p.id]||0}명</strong></div>
      <div class="lucky-winner-count">🎁 ${p.winners}명 추첨</div>
      <button type="button" data-lucky-pick="${p.id}" ${closed?'disabled':''}>${luckyMe.prize_id===p.id?'✓ 현재 응모 상품':'이 상품에 응모하기'}</button>
    </article>`).join('');
  document.querySelectorAll('[data-lucky-pick]').forEach(b=>b.onclick=async()=>{
    const id=b.dataset.luckyPick,p=luckyPrize(id);
    if(luckyMe.prize_id===id){alert('현재 응모 중인 상품입니다.');return}
    if(!confirm(`${p.emoji} ${p.name}\n이 상품에 응모할까요?\n\n9월 30일 23:59까지 변경할 수 있습니다.`))return;
    await luckySetPrize(luckyMe.student_id,id);
    luckyMe.prize_id=id;
    await luckyAppRender();
  });
}
document.getElementById('luckyLogout')?.addEventListener('click',()=>{luckyMe=null;luckyAuthRender()});luckyStatusRender();luckyAuthRender();
async function luckyAdminRender(contentEl){
  const rows=await luckyRows(), state=await luckyState(), saved=await luckyWinners();
  const entered=rows.filter(x=>x.prize_id);
  const counts=Object.fromEntries(LUCKY_PRIZES.map(p=>[p.id,entered.filter(x=>x.prize_id===p.id).length]));
  const finalized=!!state.is_finalized;
  const finalizedText=finalized?(state.finalized_at?new Date(state.finalized_at).toLocaleString('ko-KR'):'확정 완료'):'아직 확정 전';
  const notEntered=Math.max(0,LUCKY_TOTAL_STUDENTS-entered.length);
  const rate=LUCKY_TOTAL_STUDENTS?((entered.length/LUCKY_TOTAL_STUDENTS)*100).toFixed(1):'0.0';

  contentEl.innerHTML=`
  <div class="lucky-admin-head">
    <div><small>LUCKY DRAW MANAGER · FINAL CHECK</small><h3>🎁 행운권 관리 · 명단 확정 · 추첨</h3>
    <p>당일 아침 응모 현황을 확인하고 명단을 최종 확정한 뒤 추첨합니다.</p></div>
    <b>${entered.length}명 응모</b>
  </div>

  <div class="lucky-admin-summary">
    <div class="lucky-admin-stat"><small>전체 응모</small><strong>${entered.length}명</strong><span>실제 상품 선택 완료</span></div>
    <div class="lucky-admin-stat"><small>미응모 추정</small><strong>${notEntered}명</strong><span>전교생 ${LUCKY_TOTAL_STUDENTS}명 기준</span></div>
    <div class="lucky-admin-stat"><small>응모율</small><strong>${rate}%</strong><span>전교생 기준</span></div>
    <div class="lucky-admin-stat"><small>등록 후 미선택</small><strong>${rows.length-entered.length}명</strong><span>PIN 등록 후 상품 미선택</span></div>
    <div class="lucky-admin-stat ${finalized?'ok':'wait'}"><small>명단 상태</small><strong>${finalized?'🔒 최종 확정':'🟡 확인 중'}</strong><span>${finalizedText}</span></div>
  </div>

  <div class="lucky-admin-actions">
    <input id="luckyAdminSearch" placeholder="학번 또는 이름 검색">
    <button id="luckyAdminRefresh">↻ 새로고침</button>
  </div>

  <div class="lucky-admin-table-wrap">
    <table class="lucky-admin-table">
      <thead><tr><th>상품</th><th>현재 응모 인원</th><th>당첨 인원</th><th>추첨 상태</th></tr></thead>
      <tbody>
      ${LUCKY_PRIZES.map(p=>`<tr>
        <td>${p.emoji} <b>${escapeHtml(p.name)}</b></td>
        <td>${counts[p.id]||0}명</td>
        <td>${p.winners}명</td>
        <td>${saved.some(w=>w.prize_id===p.id)?'✅ 추첨 완료':'대기'}</td>
      </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <div class="lucky-admin-guide">
    <b>🔎 학생 응모 확인 · PIN 초기화</b>
    <span>학번 또는 이름을 검색해 응모 상품을 확인할 수 있습니다. 명단 확정 전까지만 PIN 초기화가 가능합니다.</span>
  </div>
  <div id="luckyAdminStudents" class="lucky-admin-list"></div>

  <div class="lucky-finalize-box ${finalized?'done':''}">
    <h3>${finalized?'🔒 응모 명단 최종 확정 완료':'🔎 당일 아침 최종 확인'}</h3>
    <p>${finalized?'학생의 신규 응모와 상품 변경을 막고 추첨 명단을 고정했습니다.':'상품별 응모 인원과 이상 응모를 확인한 뒤 명단을 확정하세요. 확정 후 학생의 신규 응모·상품 변경은 불가능합니다.'}</p>
    <button id="luckyFinalize" ${finalized?'disabled':''}>${finalized?'✓ 명단 확정됨':'🔒 2026 행운권 응모 명단 최종 확정'}</button>
  </div>

  <h3 class="lucky-draw-title">🎉 상품별 현장 추첨</h3>
  ${!finalized?'<div class="info-note">🔒 <b>명단을 최종 확정해야 추첨 버튼이 활성화됩니다.</b></div>':''}
  <div class="lucky-draw-grid">
    ${LUCKY_PRIZES.map(p=>{
      const ws=saved.filter(w=>w.prize_id===p.id);
      return `<div class="lucky-draw-card">
        <b>${p.emoji} ${escapeHtml(p.name)}</b>
        <small>${counts[p.id]||0}명 응모 · ${p.winners}명 당첨</small>
        <button data-lucky-draw="${p.id}" ${(!finalized||!counts[p.id]||ws.length)?'disabled':''}>${ws.length?'✅ 추첨 완료':`${p.winners}명 당첨자 추첨`}</button>
        <div id="winner_${p.id}">${ws.map((w,i)=>`<div class="lucky-winner">🎉 ${i+1}. ${escapeHtml(w.student_id)} ${escapeHtml(maskName(w.student_name))}</div>`).join('')}</div>
      </div>`;
    }).join('')}
  </div>`;

  const drawStudents=(q='')=>{
    const box=document.getElementById('luckyAdminStudents');
    const f=rows.filter(x=>!q||x.student_id.includes(q)||x.student_name.includes(q));
    box.innerHTML=f.length?f.map(x=>`
      <div class="lucky-admin-row">
        <b>${escapeHtml(x.student_id)}</b>
        <span>${escapeHtml(x.student_name)}</span>
        <small>${escapeHtml(luckyPrize(x.prize_id)?.name||'상품 미선택')}</small>
        <button data-lucky-reset="${x.student_id}" ${finalized?'disabled':''}>PIN 초기화</button>
      </div>`).join(''):'<div class="info-note">검색 결과가 없습니다.</div>';
    box.querySelectorAll('[data-lucky-reset]').forEach(b=>b.onclick=async()=>{
      const x=rows.find(v=>v.student_id===b.dataset.luckyReset);
      if(!confirm(`${x.student_id} ${x.student_name} 학생의 PIN 등록을 초기화할까요?\n\n현재 방식에서는 기존 응모 정보도 함께 초기화됩니다.`))return;
      await luckyReset(x.student_id);
      alert('초기화했습니다.');
      await luckyAdminRender(contentEl);
    });
  };

  drawStudents();
  document.getElementById('luckyAdminSearch').oninput=e=>drawStudents(e.target.value.trim());
  document.getElementById('luckyAdminRefresh').onclick=()=>luckyAdminRender(contentEl);

  document.getElementById('luckyFinalize').onclick=async()=>{
    if(finalized)return;
    if(!confirm(`현재 ${entered.length}명의 응모 명단을 최종 확정합니다.\n\n확정 후 학생의 신규 응모·상품 변경이 잠기고 추첨이 활성화됩니다.\n진행할까요?`))return;
    if(!confirm('한 번 더 확인합니다.\n정말 최종 확정할까요?'))return;
    await luckyFinalize();
    alert('응모 명단을 최종 확정했습니다. 이제 추첨할 수 있습니다.');
    await luckyAdminRender(contentEl);
  };

  contentEl.querySelectorAll('[data-lucky-draw]').forEach(b=>b.onclick=async()=>{
    const p=luckyPrize(b.dataset.luckyDraw), existing=(await luckyWinners()).filter(w=>w.prize_id===p.id);
    if(existing.length){alert('이미 추첨이 완료된 상품입니다.');return}
    const pool=rows.filter(x=>x.prize_id===p.id);
    if(!pool.length)return;
    const n=Math.min(p.winners||1,pool.length);
    if(!confirm(`${p.name}\n응모자 ${pool.length}명 중 ${n}명을 추첨합니다.\n\n추첨 결과는 즉시 저장되며 일반 재추첨은 할 수 없습니다.`))return;
    const shuffled=luckyShuffle(pool);
    let winners=[];
    if(p.id==='gym'){
      const classes=new Set();
      for(const x of shuffled){
        const sid=String(x.student_id||'');
        const cls=sid.length>=2?sid.slice(0,2):sid;
        if(classes.has(cls))continue;
        classes.add(cls);winners.push(x);
        if(winners.length>=n)break;
      }
      if(winners.length<n){
        for(const x of shuffled){
          if(!winners.includes(x)){winners.push(x);if(winners.length>=n)break}
        }
      }
    } else winners=shuffled.slice(0,n);

    try{await luckySaveWinners(p.id,winners)}
    catch(e){console.error(e);alert('당첨 결과 저장에 실패했습니다. 다시 추첨하지 말고 관리자에게 확인해 주세요.');return}

    const ov=document.createElement('div');
    ov.className='lucky-draw-overlay';
    ov.innerHTML=`<div class="box"><small>ALL PLAY · LUCKY WINNER</small><div class="emoji">${p.emoji}</div><h2>${escapeHtml(p.name)}</h2><p>${winners.map((w,i)=>`🎉 ${i+1}. ${escapeHtml(w.student_id)} ${escapeHtml(maskName(w.student_name))}`).join('<br>')}</p>${p.id==='gym'?'<small>※ 강당 대관권은 서로 다른 학급을 우선 추첨합니다.</small>':''}<button>확인</button></div>`;
    ov.querySelector('button').onclick=async()=>{ov.remove();await luckyAdminRender(contentEl)};
    document.body.appendChild(ov);
  });
}

