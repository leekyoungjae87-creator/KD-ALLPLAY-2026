
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
  ["13:00-13:20","집합 및 축하공연","댄스부"],
  ["13:20-14:00","달리는 줄다리기 준결승 · 결승","1 → 2 → 3학년 · 9경기"],
  ["14:00-14:30","미션 이어달리기","학생자치회"],
  ["14:30-15:00","이어달리기 결승","1 → 2 → 3학년 · 3경기"],
  ["15:00-15:30","점수집계 · 시상식 · 폐회식 · 뒷정리",""]
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
    "출발 지점과 골인 지점은 조회대 앞쪽이며 각 주자가 반바퀴씩 달립니다."
  ]},
  {icon:"🏁",accent:"green",cat:"단체",name:"이어달리기",people:"8명",type:"결선 경기",rules:[
    "남학생 4명·여학생 4명으로 구성합니다.",
    "여-남-여-남-여-남-여-남 순서로 진행합니다.",
    "본부석 조회대 앞쪽에서 출발하여 각 주자가 반바퀴씩 달립니다.",
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
  "2인3각":[80,70,60,50,40],
  "달리는줄다리기":[120,100,80,60,40],
  "미션이어달리기":[40,30,20,10,10],
  "이어달리기":[120,100,80,60,40],
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
  "피구(여)_3":"결승: 3학년 1반 VS 6반 · 9.16.(수)"
};
const prelimSchedule = {"축구(남)": "9. 3.(목) 준결승 → 9. 14.(월) 1학년 · 9. 15.(화) 2학년 · 9. 16.(수) 3학년 결승", "피구(여)": "9. 3.(목) 준결승 → 9. 14.(월) 1학년 · 9. 15.(화) 2학년 · 9. 16.(수) 3학년 결승", "바운드 배구": "9. 10.(목) 예선 → 9. 17.(목) 준결승", "달리는 줄다리기": "9. 30.(수) · 전 학년 예선·준결승", "이어달리기": "9. 30.(수) · 전 학년 예선·준결승"};
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
  window.scrollTo({top:0,behavior:'smooth'});
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
    <div class="bracket-card-head"><span class="bracket-event-icon">${eventIcon[e]||'🏟️'}</span><div><small>PRE-GAME</small><h3>${e}</h3></div><em>진행 현황</em></div>
    <div class="bracket-date">📅 ${prelimSchedule[e]||''}</div>
    <div class="bracket-grade-results">${[1,2,3].map(g=>{let r=store[`${e}_${g}`]||'진행 예정';let done=r!=='진행 예정';return `<div class="bracket-row ${done?'is-done':''}"><span><i>${g}</i>${g}학년</span><b>${r}</b><em>${done?'결과':'대기'}</em></div>`}).join('')}</div>
  </article>`).join('');
}
document.querySelectorAll('#bracketFilter button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#bracketFilter button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderBrackets(b.dataset.bracket)});renderBrackets();

function setupClassSelectors(){
  classGrade.innerHTML=[1,2,3].map(g=>`<option value="${g}">${g}학년</option>`).join('');
  fillClasses();
}
function fillClasses(){let g=Number(classGrade.value);classNo.innerHTML=Array.from({length:classCount(g)},(_,i)=>`<option value="${i+1}">${i+1}반</option>`).join('')}
classGrade.onchange=fillClasses;setupClassSelectors();
showClass.onclick=()=>{let g=Number(classGrade.value), key=`${g}-${classNo.value}`, rows=gradeRows(g), idx=rows.findIndex(r=>r.key===key), row=rows[idx];classResult.innerHTML=`<b>${key}</b><br>현재 종합점수 <strong>${row.total}점</strong> · 현재 순위 <strong>${idx+1}위</strong><br><small>참가자 명단 등록 후 종목별 참가 학생도 표시할 수 있습니다.</small>`};

findStudent.onclick=()=>{
  let no=studentNo.value.trim(),name=studentName.value.trim(), list=load(STORE.participants,[]);
  let found=list.find(x=>(!no||x.no===no)&&(!name||x.name===name));
  studentResult.innerHTML=found?`<b>${found.no} ${found.name}</b><br>${found.className||''}<br>참가 종목: ${(found.events||[]).join(', ')}`:'등록된 참가자 명단에서 찾지 못했습니다.';
};

let flagGrade=1;
async function renderFlags(){
  let store=await loadSharedFlags();
  flagGallery.innerHTML=Array.from({length:classCount(flagGrade)},(_,i)=>{let key=`${flagGrade}-${i+1}`,url=store[key];return url?`<div class="flag-card" style="background:url('${url}') center/cover"><b style="background:#ffffffdd;padding:4px 7px;border-radius:8px">${key}</b></div>`:`<div class="flag-card"><b>${key}</b><small>깃발 이미지 준비 중</small></div>`}).join('');
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



const SUPA_ENABLED = false;
const kdSupa = null;

async function getQnaData(){
  return load(STORE.qna,[]).slice().reverse();
}

async function renderQna(){
  let a=await getQnaData();
  qnaList.innerHTML=a.length?a.map((x,i)=>`
    <article class="qna-card faq-card">
      <div class="faq-number">Q${String(i+1).padStart(2,'0')}</div>
      <div class="faq-copy">
        <div class="qna-card-head"><b>${escapeHtml(x.question||'')}</b>${x.category?`<span class="faq-category">${escapeHtml(x.category)}</span>`:''}</div>
        <div class="qna-answer faq-answer"><b>💬 답변</b><p>${escapeHtml(x.answer||'답변 준비 중입니다.')}</p></div>
      </div>
    </article>`).join(''):`<div class="faq-empty"><span>❔</span><b>등록된 Q&A가 아직 없습니다.</b><small>운영자가 확인된 내용을 순서대로 안내합니다.</small></div>`;

  let recent=a.slice(0,3);
  homeQnaList.innerHTML=recent.length?recent.map(x=>`
    <div class="home-qna-item">
      <b>${escapeHtml((x.question||'').length>36?(x.question||'').slice(0,36)+'…':(x.question||''))}</b>
      <small>답변 완료</small>
    </div>`).join(''):`<div class="home-qna-empty">등록된 Q&A가 아직 없습니다.</div>`;
}
renderQna();


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
    <div class="song-request-copy"><div class="song-request-top"><span>REQUEST ${String(a.length-i).padStart(2,'0')}</span><small>${escapeHtml(x.class_name||x.cls||'')}</small></div><h3>${escapeHtml(x.title||'')}</h3><p class="song-requester">🎧 ${escapeHtml(maskName(x.name||''))} · ${escapeHtml(songDisplayTime(x))}</p>${(x.message||x.msg)?`<blockquote>“${escapeHtml(x.message||x.msg)}”</blockquote>`:''}</div>
  </article>`).join(''):`<div class="pretty-empty song-empty"><span>🎶</span><b>승인된 신청곡을 기다리고 있어요!</b><small>신청 후 관리자가 확인하면 플레이리스트에 공개됩니다.</small></div>`;
}
songForm.onsubmit=async e=>{
  e.preventDefault();
  const row={cls:songClass.value.trim(),name:songName.value.trim(),title:songTitle.value.trim(),msg:songMsg.value.trim().slice(0,300)};
  const btn=e.target.querySelector('button[type="submit"],button.song-submit-btn');btn.disabled=true;const before=btn.textContent;btn.textContent='신청 중…';
  try{await addSong(row);e.target.reset();songCount.textContent='0';alert(kdSbReady?'신청곡을 접수했습니다. 관리자 승인 후 공개됩니다.':'이 기기에서 임시 접수했습니다. Supabase 설정 후 여러 기기에서 공유됩니다.');await renderSongs();}
  catch(err){console.error(err);alert('신청곡 접수에 실패했습니다. Supabase 신청곡 설정을 확인해 주세요.');}
  finally{btn.disabled=false;btn.textContent=before;}
};
songMsg.oninput=()=>songCount.textContent=String(songMsg.value.length);
async function renderSongManager(contentEl=adminContent){
  const rows=await getSongs({admin:true});
  const pending=rows.filter(x=>(x.status||'pending')==='pending').length, approved=rows.filter(x=>x.status==='approved').length;
  contentEl.innerHTML=`<div class="song-admin-head"><div><small>SONG REQUEST MANAGER</small><h3>🎵 신청곡 관리</h3><p>학생 신청곡을 확인한 뒤 승인하면 모든 기기의 신청곡 탭에 공개됩니다.</p></div><span>${kdSbReady?'☁️ Supabase 공용':'📱 이 기기 저장'}</span></div>
  <div class="song-admin-summary"><b>대기 ${pending}곡</b><b>승인 ${approved}곡</b><b>전체 ${rows.length}곡</b></div>
  <div class="song-admin-list">${rows.length?rows.map(x=>{const st=x.status||'pending';return `<article class="song-admin-card"><div><small>${escapeHtml(x.class_name||x.cls||'')} · ${escapeHtml(maskName(x.name||''))}</small><h4>${escapeHtml(x.title||'')}</h4>${(x.message||x.msg)?`<p>${escapeHtml(x.message||x.msg)}</p>`:''}<em>${escapeHtml(songDisplayTime(x))}</em></div><div class="song-admin-actions"><span class="song-status ${st}">${st==='approved'?'승인됨':st==='rejected'?'숨김':'승인 대기'}</span>${st!=='approved'?`<button data-song-approve="${x.id}">✓ 승인</button>`:`<button data-song-pending="${x.id}">↩ 승인 취소</button>`}<button class="danger" data-song-delete="${x.id}">삭제</button></div></article>`}).join(''):'<div class="info-note">접수된 신청곡이 없습니다.</div>'}</div>`;
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
  if(kdSbReady){
    const {data,error}=await kdSb.from('kd_votes').select('grade,class_no').eq('vote_type',type).eq('voter_name',name);
    if(!error) return Object.fromEntries((data||[]).map(x=>[x.grade,x.class_no]));
  }
  return Object.fromEntries(localVotes().filter(x=>x.vote_type===type&&x.voter_name===name).map(x=>[x.grade,x.class_no]));
}
async function saveMyVote(type,grade,classNo,name){
  if(kdSbReady){
    const {error}=await kdSb.from('kd_votes').upsert({voter_name:name,vote_type:type,grade:Number(grade),class_no:Number(classNo),updated_at:new Date().toISOString()},{onConflict:'voter_name,vote_type,grade'});
    if(error) throw error;
  }else{
    let list=localVotes();
    const i=list.findIndex(x=>x.voter_name===name&&x.vote_type===type&&Number(x.grade)===Number(grade));
    const row={voter_name:name,vote_type:type,grade:Number(grade),class_no:Number(classNo),updated_at:new Date().toISOString()};
    if(i>=0) list[i]=row; else list.push(row); save(VOTE_LOCAL_KEY,list);
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
  if(!name){contentEl.innerHTML='<div class="vote-empty">교직원 이름 확인 후 다시 로그인해 주세요.</div>';return;}
  contentEl.innerHTML='<div class="vote-loading">투표 화면을 불러오는 중입니다…</div>';
  const [isOpen,myVotes]=await Promise.all([getVoteState(type),getMyVotes(type,name)]);
  if(type==='flag') await loadSharedFlags();
  const title=voteTypeLabel(type), icon=type==='performance'?'🎉':'🚩';
  const instruction=type==='performance'?'각 학년에서 가장 인상적인 응원 퍼포먼스 학급을 1개씩 선택합니다.':'각 학년에서 가장 인상적인 학급 깃발을 1개씩 선택합니다.';
  contentEl.innerHTML=`
    <div class="vote-head">
      <div><small>STAFF ONE-VOTE</small><h3>${icon} ${title} 투표</h3><p>${escapeHtml(name)} 선생님 · ${instruction}</p></div>
      ${voteModeBadge()}
    </div>
    <div class="vote-open-state ${isOpen?'open':'closed'}"><b>${isOpen?'🟢 투표 진행 중':'🔒 현재 투표가 마감되어 있습니다.'}</b><span>${isOpen?'학년별로 1표씩 선택 후 각각 저장해 주세요.':'관리자가 투표를 시작하면 선택할 수 있습니다.'}</span></div>
    <div class="vote-grade-list" id="voteGradeList"></div>
    <div class="vote-footnote">※ 학년별 1표만 저장됩니다. 투표가 열려 있는 동안에는 선택을 수정할 수 있습니다. 중간 득표수는 공개되지 않습니다.</div>`;
  const wrap=contentEl.querySelector('#voteGradeList');
  [1,2,3].forEach(grade=>{
    const candidates=voteCandidates(type,grade), chosen=Number(myVotes[grade]||0);
    const article=document.createElement('article');article.className='vote-grade-card';
    article.innerHTML=`<div class="vote-grade-top"><div><span>${grade}</span><b>${grade}학년</b></div><em class="${chosen?'done':''}">${chosen?`✓ ${grade}-${chosen} 투표 완료`:'미투표'}</em></div>
      <div class="vote-choice-grid ${type==='flag'?'flag-vote-grid':''}">${candidates.map(no=>{const key=`${grade}-${no}`;const music=performanceMusicMap()[key]||'음악 정보 준비 중';const img=sharedFlagCache[key]||'';return `<label class="vote-choice ${type==='flag'?'flag-vote-choice':''} ${chosen===no?'selected':''}"><input type="radio" name="vote_${type}_${grade}" value="${no}" ${chosen===no?'checked':''} ${isOpen?'':'disabled'}><span>${type==='flag'?`<span class="vote-flag-thumb ${img?'has-image':''}">${img?`<img src="${img}" alt="${key} 학급 깃발">`:'<i>이미지 준비 중</i>'}</span>`:''}<b>${key}</b><small>${type==='performance'?`🎵 ${escapeHtml(music)}`:'학급 깃발'}</small></span></label>`}).join('')}</div>
      <button class="vote-submit" data-vote-save="${grade}" ${isOpen?'':'disabled'}>${chosen?'선택 수정 저장':'이 학년 투표 저장'}</button>`;
    wrap.appendChild(article);
  });
  contentEl.querySelectorAll('.vote-choice input').forEach(inp=>inp.onchange=()=>{
    const card=inp.closest('.vote-grade-card');card.querySelectorAll('.vote-choice').forEach(x=>x.classList.toggle('selected',x.querySelector('input').checked));
  });
  contentEl.querySelectorAll('[data-vote-save]').forEach(btn=>btn.onclick=async()=>{
    const grade=Number(btn.dataset.voteSave), checked=contentEl.querySelector(`input[name="vote_${type}_${grade}"]:checked`);
    if(!checked){alert(`${grade}학년에서 한 학급을 선택해 주세요.`);return;}
    btn.disabled=true;btn.textContent='저장 중…';
    try{await saveMyVote(type,grade,Number(checked.value),name);await renderStaffVote(type,contentEl);}
    catch(e){console.error(e);alert('투표 저장 중 오류가 발생했습니다. Supabase 설정을 확인해 주세요.');btn.disabled=false;}
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
    const completed=(rows)=>{const m={};rows.forEach(x=>(m[x.voter_name]||(m[x.voter_name]=new Set())).add(Number(x.grade)));return Object.values(m).filter(set=>set.size===3).length;};
    const participantList=(rows)=>{
      const map={};
      rows.forEach(x=>{const n=(x.voter_name||'').trim();if(!n)return;(map[n]||(map[n]=new Set())).add(Number(x.grade));});
      const names=Object.keys(map).sort((a,b)=>a.localeCompare(b,'ko'));
      if(!names.length) return '<div class="vote-participant-empty">아직 참여한 교직원이 없습니다.</div>';
      return names.map(name=>{
        const grades=map[name];
        const done=grades.size===3;
        return `<div class="vote-participant-row"><div class="vote-participant-name"><b>${escapeHtml(name)}</b><small>${done?'3개 학년 완료':`${grades.size}/3 학년 완료`}</small></div><div class="vote-participant-grades">${[1,2,3].map(g=>`<span class="${grades.has(g)?'done':'pending'}">${grades.has(g)?'✓':'–'} ${g}학년</span>`).join('')}</div></div>`;
      }).join('');
    };
    const typePanel=(type,open,rows)=>`<section class="vote-admin-panel" data-admin-vote="${type}">
      <div class="vote-admin-top"><div><small>${type==='performance'?'PERFORMANCE':'CLASS FLAG'}</small><h4>${type==='performance'?'🎉 응원 퍼포먼스':'🚩 학급 깃발'}</h4><p>3개 학년 완료 <b>${completed(rows)}명</b> · 참여 ${unique(rows)}명 · 저장 ${rows.length}표</p></div><span class="${open?'open':'closed'}">${open?'투표 진행 중':'투표 마감'}</span></div>
      <div class="vote-admin-actions"><button data-vote-toggle="${type}" data-next="${open?'0':'1'}">${open?'🔒 투표 마감':'🟢 투표 시작'}</button><button class="danger" data-vote-clear="${type}">↻ 전체 투표 초기화</button></div>
      <button class="vote-participant-toggle" data-participant-toggle="${type}">👥 참여 교직원 보기 <b>${unique(rows)}명</b></button>
      <div class="vote-participant-list hidden" data-participant-list="${type}">${participantList(rows)}</div>
      <div class="vote-result-grades">${[1,2,3].map(g=>{const t=tallyVotes(rows,g);const total=rows.filter(x=>Number(x.grade)===g).length;return `<div class="vote-result-grade"><div class="vote-result-title"><b>${g}학년</b><span>${total}명 투표</span></div>${t.length?t.map((r,i)=>`<div class="vote-result-row ${r.count===t[0].count?'leader':''}"><span>${g}-${r.no}</span><b>${r.count}표</b></div>`).join(''):'<div class="vote-no-result">아직 투표 없음</div>'}</div>`}).join('')}</div>
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
  const name=(staffName.value||'').trim();
  if(name.length<2){alert('투표자 확인을 위해 교직원 이름을 입력해 주세요.');return;}
  if(staffPw.value==='rudejr26**'){currentStaffName=name;sessionStorage.setItem('kd_staff_name',name);staffLogin.classList.add('hidden');staffArea.classList.remove('hidden');setupVoteRealtime();if(pendingStaffView)staffView(pendingStaffView)}
  else alert('비밀번호를 확인해 주세요.');
};
if(currentStaffName&&typeof staffName!=='undefined') staffName.value=currentStaffName;
document.querySelectorAll('[data-staff-view]').forEach(b=>b.onclick=()=>staffView(b.dataset.staffView));
function staffView(v, contentEl=staffContent){
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
      contentEl.querySelectorAll('[data-quick-score]').forEach(b=>b.onclick=()=>{
        const cls=b.dataset.quickScore, rank=Number(b.dataset.rank), point=pointsForRank(quickEvent,rank);
        const all=getScores(); const prev=Number(all[cls]?.[quickEvent]||0);
        all[cls][quickEvent]=point; save(STORE.scores,all); renderScores();
        lastScoreAction={cls,event:quickEvent,prev,message:`✓ ${cls} · ${quickEvent} · ${rank===5?'5위 이하':rank+'위'} · ${point}점 반영 완료`};
        drawQuickScore();
      });
      const undo=document.getElementById('quickUndo');
      if(undo) undo.onclick=()=>{
        if(!lastScoreAction)return;
        const a=lastScoreAction, all=getScores(); all[a.cls][a.event]=a.prev; save(STORE.scores,all); renderScores();
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
      <div class="faq-admin-head"><div><small>FAQ MANAGER</small><h3>❓ Q&A 관리</h3><p>학생들이 자주 궁금해하는 내용을 질문과 답변 형태로 정리합니다.</p></div><span>간편 등록</span></div>
      <div class="faq-admin-new">
        <label><span>분류</span><input id="faqCategory" placeholder="예: 일정 · 경기 · 준비물" maxlength="20"></label>
        <label class="faq-wide"><span>질문</span><input id="faqQuestion" placeholder="예: 체육한마당은 몇 시에 시작하나요?" maxlength="120"></label>
        <label class="faq-wide"><span>답변</span><textarea id="faqAnswer" placeholder="학생들에게 보여줄 답변을 입력하세요." maxlength="500"></textarea></label>
        <button id="faqAdd">＋ Q&A 등록</button>
      </div>
      <div class="faq-admin-note">※ 등록 내용은 현재 브라우저에 저장됩니다. 모든 학생 기기에 동일하게 공개하려면 확정된 Q&A를 웹앱 파일에 반영해 GitHub에 올려야 합니다.</div>
      <div id="staffQnaItems" class="faq-admin-list"></div>`;
    const drawFaqAdmin=()=>{
      const list=load(STORE.qna,[]).slice().reverse();
      staffQnaItems.innerHTML=list.length?list.map(x=>`<article class="staff-faq-card" data-faq-card="${x.id}">
        <div class="staff-faq-top"><span>${escapeHtml(x.category||'일반')}</span><button class="faq-delete" data-qna-delete="${x.id}" title="삭제">삭제</button></div>
        <label><small>질문</small><input id="fqq_${x.id}" value="${escapeHtml(x.question||'')}" maxlength="120"></label>
        <label><small>답변</small><textarea id="fqa_${x.id}" maxlength="500">${escapeHtml(x.answer||'')}</textarea></label>
        <button class="faq-save" data-qna-save="${x.id}">수정 저장</button>
      </article>`).join(''):'<div class="info-note">아직 등록된 Q&A가 없습니다. 위 입력창에서 첫 Q&A를 등록해 주세요.</div>';
      document.querySelectorAll('[data-qna-save]').forEach(btn=>btn.onclick=async()=>{
        const list=load(STORE.qna,[]), item=list.find(x=>String(x.id)===String(btn.dataset.qnaSave));
        if(item){item.question=document.getElementById(`fqq_${item.id}`).value.trim();item.answer=document.getElementById(`fqa_${item.id}`).value.trim();save(STORE.qna,list);}
        await renderQna();drawFaqAdmin();alert('Q&A를 수정했습니다.');
      });
      document.querySelectorAll('[data-qna-delete]').forEach(btn=>btn.onclick=async()=>{
        if(!confirm('이 Q&A를 삭제할까요?')) return;
        let list=load(STORE.qna,[]).filter(x=>String(x.id)!==String(btn.dataset.qnaDelete));save(STORE.qna,list);await renderQna();drawFaqAdmin();
      });
    };
    faqAdd.onclick=async()=>{
      const q=faqQuestion.value.trim(), a=faqAnswer.value.trim();
      if(!q||!a){alert('질문과 답변을 모두 입력해 주세요.');return;}
      let list=load(STORE.qna,[]);list.push({id:'faq'+Date.now(),category:faqCategory.value.trim()||'일반',question:q,answer:a,time:new Date().toLocaleString()});save(STORE.qna,list);
      faqCategory.value='';faqQuestion.value='';faqAnswer.value='';await renderQna();drawFaqAdmin();alert('Q&A를 등록했습니다.');
    };
    drawFaqAdmin();
  } else if(v==='performance'){
    currentStaffVoteType='performance';
    renderStaffVote('performance',contentEl);
  } else if(v==='flagvote'){
    currentStaffVoteType='flag';
    renderStaffVote('flag',contentEl);
  }
}



// v60 관리자 전용: 운영 입력 기능은 관리자만 사용
adminLoginBtn.onclick=()=>{
  if(adminPw.value==='rkrk1212!@'){
    adminLogin.classList.add('hidden');
    adminArea.classList.remove('hidden');
    setupVoteRealtime();
    renderVoteManager(adminContent);
  } else alert('관리자 비밀번호를 확인해 주세요.');
};
document.querySelectorAll('[data-admin-view]').forEach(b=>b.onclick=()=>staffView(b.dataset.adminView,adminContent));
if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').catch(()=>{})}



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
