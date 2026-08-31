
const EVENT_START = new Date(2026,9,1,8,30,0);
const STORE = {
  scores:'kd_new_scores', prelim:'kd_new_prelim', songs:'kd_new_songs',
  media:'kd_new_media', notices:'kd_new_notices', participants:'kd_new_participants',
  flags:'kd_new_flags', perfVotes:'kd_new_perf_votes', flagVotes:'kd_new_flag_votes', qna:'kd_new_qna'
};

const schedule = [
  ["08:15-08:30","집결","학년별"],
  ["08:30-09:00","개회식 · 준비운동 · 안전교육","운동장"],
  ["09:00-09:30","학급별 응원 퍼포먼스","운동장"],
  ["09:30-10:05","순환경기 1","운동장·농구장·경덕관"],
  ["10:05-10:40","순환경기 2","운동장·농구장·경덕관"],
  ["10:40-11:15","순환경기 3","운동장·농구장·경덕관"],
  ["11:15-12:00","2인 3각","운동장"],
  ["12:00-13:00","점심시간 · 사제동행 농구 한판","경덕관"],
  ["13:00-13:20","집합 및 축하공연","운동장"],
  ["13:20-14:00","달리는 줄다리기 준결승·결승","운동장"],
  ["14:00-14:30","미션 이어달리기","운동장"],
  ["14:30-15:00","이어달리기 결승","운동장"],
  ["15:00-15:30","점수집계 · 시상 · 폐회 · 정리","운동장"]
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
  "미션이어달리기":[30,20,10,10,10],
  "이어달리기":[120,100,80,60,40],
  "학급깃발":[30,30,20,20,10]
};
function pointsForRank(eventName, rankKey){
  const row=rankPoints[eventName]||[0,0,0,0,0];
  const idx=Math.max(0,Math.min(4,Number(rankKey)-1));
  return row[idx]||0;
}

const prelimEvents = ["축구(남)","피구(여)","바운드 배구","달리는 줄다리기","이어달리기"];
const prelimSchedule = {"축구(남)": "9. 3.(목) · 전 학년 준결승", "피구(여)": "9. 3.(목) · 전 학년 준결승", "바운드 배구": "9. 10.(목) 예선 → 9. 17.(목) 준결승", "달리는 줄다리기": "9. 30.(수) · 전 학년 예선·준결승", "이어달리기": "9. 30.(수) · 전 학년 예선·준결승"};
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
  let store=load(STORE.prelim,{}), arr=f==='전체'?prelimEvents:[f];
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
function renderFlags(){
  let store=load(STORE.flags,{});
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

songForm.onsubmit=e=>{
  e.preventDefault();
  let a=load(STORE.songs,[]);
  a.push({cls:songClass.value.trim(),name:songName.value.trim(),title:songTitle.value.trim(),msg:songMsg.value.trim().slice(0,300),time:new Date().toLocaleString()});
  save(STORE.songs,a);e.target.reset();songCount.textContent='0';renderSongs();
}
songMsg.oninput=()=>songCount.textContent=String(songMsg.value.length);
function renderSongs(){
  let a=load(STORE.songs,[]);
  if(document.getElementById('songTotal')) songTotal.textContent=String(a.length);
  songList.innerHTML=a.length?a.slice().reverse().map((x,i)=>`<article class="song-request-card">
    <div class="song-art"><span>♪</span></div>
    <div class="song-request-copy"><div class="song-request-top"><span>REQUEST ${String(a.length-i).padStart(2,'0')}</span><small>${escapeHtml(x.cls)}</small></div><h3>${escapeHtml(x.title)}</h3><p class="song-requester">🎧 ${escapeHtml(maskName(x.name||''))} · ${escapeHtml(x.time)}</p>${x.msg?`<blockquote>“${escapeHtml(x.msg)}”</blockquote>`:''}</div>
  </article>`).join(''):`<div class="pretty-empty song-empty"><span>🎶</span><b>첫 번째 신청곡을 기다리고 있어요!</b><small>체육한마당 분위기를 띄울 한 곡을 남겨주세요.</small></div>`;
}renderSongs();

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
  boardList.innerHTML=all.map(x=>`<div class="board-item"><b>${x.title}</b><small>${x.time||''}</small><p>${x.body}</p></div>`).join('');
  homeBoard.innerHTML=all.slice(0,3).map(x=>`<div><b>${x.title}</b><small>${x.body}</small></div>`).join('');
}renderBoard();

staffLoginBtn.onclick=()=>{
  if(staffPw.value==='rudejr26**'){staffLogin.classList.add('hidden');staffArea.classList.remove('hidden');if(pendingStaffView)staffView(pendingStaffView)}
  else alert('비밀번호를 확인해 주세요.');
};
document.querySelectorAll('[data-staff-view]').forEach(b=>b.onclick=()=>staffView(b.dataset.staffView));
function staffView(v){
  if(v==='preliminput'){
    staffContent.innerHTML=`<h3>예선 결과 입력</h3><div class="staff-form"><select id="piEvent">${prelimEvents.map(x=>`<option>${x}</option>`).join('')}</select><select id="piGrade"><option>1</option><option>2</option><option>3</option></select><input id="piResult" placeholder="예: 1반 결승 진출"><button id="piSave">저장</button></div>`;
    piSave.onclick=()=>{let s=load(STORE.prelim,{});s[`${piEvent.value}_${piGrade.value}`]=piResult.value;save(STORE.prelim,s);renderBrackets();alert('저장했습니다.')};
  } else if(v==='scoreinput'){
    staffContent.innerHTML=`
      <div class="score-admin-head">
        <div><small>ADMIN SCORE INPUT</small><h3>🏆 경기 결과 입력</h3><p>학급·종목·순위만 선택하면 배점표에 맞는 점수가 자동으로 입력됩니다.</p></div>
        <span>관리자 직접 입력</span>
      </div>
      <div class="score-admin-panel">
        <label><span>① 학급</span><select id="siClass">${[1,2,3].flatMap(g=>Array.from({length:classCount(g)},(_,i)=>`<option>${g}-${i+1}</option>`)).join('')}</select></label>
        <label><span>② 종목</span><select id="siEvent">${scoreEvents.map(x=>`<option>${x}</option>`).join('')}</select></label>
        <label><span>③ 순위</span><select id="siRank"><option value="1">1위</option><option value="2">2위</option><option value="3">3위</option><option value="4">4위</option><option value="5">5위 이하</option></select></label>
        <div class="score-preview"><small>자동 입력 점수</small><strong id="siPointPreview">50점</strong></div>
        <button id="siSave" class="score-save-btn">결과 저장 → 순위 반영</button>
      </div>
      <div class="score-admin-foot">
        <b>✓ 승인 과정 없이 즉시 반영</b>
        <span>잘못 입력한 경우 같은 학급·종목을 다시 선택해 저장하면 수정됩니다.</span>
      </div>`;
    const updatePreview=()=>{siPointPreview.textContent=pointsForRank(siEvent.value,siRank.value)+'점';};
    siEvent.onchange=updatePreview; siRank.onchange=updatePreview; updatePreview();
    siSave.onclick=()=>{
      const pts=pointsForRank(siEvent.value,siRank.value);
      let scores=getScores();
      scores[siClass.value][siEvent.value]=pts;
      save(STORE.scores,scores);
      renderScores();
      alert(`${siClass.value} · ${siEvent.value} · ${siRank.options[siRank.selectedIndex].text} → ${pts}점 반영 완료`);
    };
  } else if(v==='noticeinput'){
    staffContent.innerHTML=`<h3>공지 등록</h3><div class="staff-form"><input id="niTitle" placeholder="제목"><input id="niBody" placeholder="내용" style="grid-column:span 2"><button id="niSave">등록</button></div>`;
    niSave.onclick=()=>{let a=load(STORE.notices,[]);a.push({title:niTitle.value,body:niBody.value,time:new Date().toLocaleString()});save(STORE.notices,a);renderBoard();alert('등록했습니다.')};
  } else if(v==='qnaanswer'){
    staffContent.innerHTML=`
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
    staffContent.innerHTML=`<h3>응원 퍼포먼스 투표</h3><p>참여도 · 협동성 · 창의성 · 완성도 · 호응도 기준으로 평가하는 화면입니다.</p><div class="info-note">실제 교직원별 중복 방지와 합산은 Supabase 연동 단계에서 완성하는 것을 권장합니다.</div>`;
  } else if(v==='flagvote'){
    staffContent.innerHTML=`<h3>학급 깃발 투표</h3><p>학년별 학급 깃발을 확인하고 평가하는 화면입니다.</p><div class="info-note">깃발 사진은 촬영 후 웹앱 파일에 일괄 반영하는 방식으로 운영합니다. 투표 결과는 관리자가 최종 점수로 입력합니다.</div>`;
  }
}

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
