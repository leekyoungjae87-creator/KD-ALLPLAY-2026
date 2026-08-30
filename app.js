
const EVENT_START = new Date(2026,9,1,8,30,0);
const STORE = {
  scores:'kd_new_scores', prelim:'kd_new_prelim', songs:'kd_new_songs',
  media:'kd_new_media', notices:'kd_new_notices', participants:'kd_new_participants',
  flags:'kd_new_flags', perfVotes:'kd_new_perf_votes', flagVotes:'kd_new_flag_votes'
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
  {cat:"이벤트",name:"응원 퍼포먼스",people:"학급 전체",type:"별도 시상",rules:["학급별 참여","종합점수 제외","참여도·협동성·창의성·완성도·호응도 평가"]},
  {cat:"순환",name:"8자 줄넘기",people:"14명",type:"기록 경기",rules:["남6·여6 + 줄잡이 2명","2분씩 2회 실시","2회 기록 합산"]},
  {cat:"순환",name:"슈팅 릴레이",people:"14명",type:"기록 경기",rules:["남6·여6 + 후보2","99초씩 2회","동일 슈팅 라인 사용"]},
  {cat:"순환",name:"바운드 배구",people:"20명",type:"결선 경기",rules:["남8·여8 + 후보 각2","여학생 12분 + 남학생 12분","두 경기 점수 합산"]},
  {cat:"단체",name:"2인 3각",people:"16명",type:"릴레이",rules:["남8·여8","2인 1조 × 8팀","여·남 교대로 진행"]},
  {cat:"단체",name:"달리는 줄다리기",people:"학급 전원",type:"준결승·결승",rules:["학급 전체 참여","3전 2선승","인원이 적은 학급 기준으로 맞춤"]},
  {cat:"단체",name:"미션 이어달리기",people:"6명",type:"이벤트형 점수 경기",rules:["남3·여3","반바퀴 × 6명","미션 6개 수행"]},
  {cat:"단체",name:"이어달리기",people:"8명",type:"결선 경기",rules:["남4·여4","여-남-여-남-여-남-여-남","반바퀴 × 8명"]},
  {cat:"사전",name:"축구(남)",people:"9명",type:"사전 경기",rules:["교체선수 1명 포함","예선 15분","결승 전·후반 각 10분","무승부 시 승부차기"]},
  {cat:"사전",name:"피구(여)",people:"학급별",type:"사전 경기",rules:["인원이 적은 반과 동일하게 맞춤","5분 3세트 · 2선승","패스 3회까지 허용"]},
  {cat:"평가",name:"학급 깃발",people:"학급",type:"교직원 평가",rules:["학급 개성과 단합 표현","종합점수 반영","1위 30 / 2위 20 / 3위 10"]}
];

const scoreEvents = ["축구","피구","바운드배구","8자줄넘기","슈팅릴레이","2인3각","달리는줄다리기","미션이어달리기","이어달리기","학급깃발"];
const prelimEvents = ["축구(남)","피구(여)","바운드 배구","달리는 줄다리기","이어달리기"];
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
  {title:"선수 대기 안내",body:"참가 선수는 경기 시작 10분 전 대기 장소로 이동해 주세요.",time:"행사 운영 안내"},
  {title:"참가 원칙",body:"달리는 줄다리기를 제외하고 1인당 최소 2종목 이상, 최대 4종목까지 참여합니다.",time:"참가 요강"},
  {title:"안전 안내",body:"경기 중 심판의 안내와 안전수칙을 반드시 지켜 주세요.",time:"안전교육"}
];

function load(key,fallback){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch{return fallback}}
function save(key,val){localStorage.setItem(key,JSON.stringify(val))}
function classCount(g){return g===2?8:7}

document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>showPage(b.dataset.page));
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>showPage(b.dataset.go));
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
    return `<div class="timeline-row ${isNow?'current':''}"><time>${x[0]}</time><div><b>${x[1]}</b><small>${x[2]}</small></div><span class="location">${isNow?'진행 중':'예정'}</span></div>`;
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
  rankCards.innerHTML=rows.slice(0,3).map((r,i)=>`<div class="rank-card"><span>${i+1}위</span><strong>${r.key}</strong><b>${r.total}점</b></div>`).join('');
  scoreTable.innerHTML=`<table class="score-table"><thead><tr><th>순위</th><th>학급</th>${scoreEvents.map(e=>`<th>${e}</th>`).join('')}<th>총점</th></tr></thead><tbody>${rows.map((r,i)=>`<tr><td>${i+1}</td><td class="class-cell">${r.key}</td>${scoreEvents.map(e=>`<td>${r.data[e]}</td>`).join('')}<td><b>${r.total}</b></td></tr>`).join('')}</tbody></table>`;
  renderLeaders();
}
document.querySelectorAll('#gradeTabs button').forEach(b=>b.onclick=()=>{currentGrade=Number(b.dataset.grade);document.querySelectorAll('#gradeTabs button').forEach(x=>x.classList.toggle('active',x===b));renderScores()});
function renderLeaders(){leaderBoard.innerHTML=[1,2,3].map(g=>{let r=gradeRows(g)[0];return `<div class="leader"><span>${g}학년 선두</span><b>${r.key}</b><small>${r.total}점</small></div>`}).join('')}
renderScores();

ruleFilter.innerHTML=['전체','사전','순환','단체','이벤트','평가'].map((x,i)=>`<button class="${i===0?'active':''}" data-rule="${x}">${x}</button>`).join('');
function renderRules(f='전체'){
  let arr=f==='전체'?eventRules:eventRules.filter(x=>x.cat===f);
  ruleList.innerHTML=arr.map(x=>`<article class="rule-card"><h3>${x.name}</h3><div class="rule-meta"><span>${x.cat}</span><span>참가 ${x.people}</span><span>${x.type}</span></div><ul>${x.rules.map(r=>`<li>${r}</li>`).join('')}</ul></article>`).join('');
}
document.querySelectorAll('#ruleFilter button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#ruleFilter button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderRules(b.dataset.rule)});renderRules();

bracketFilter.innerHTML=['전체',...prelimEvents].map((x,i)=>`<button class="${i===0?'active':''}" data-bracket="${x}">${x}</button>`).join('');
function renderBrackets(f='전체'){
  let store=load(STORE.prelim,{}), arr=f==='전체'?prelimEvents:[f];
  bracketList.innerHTML=arr.map(e=>`<article class="bracket-card"><h3>${e}</h3>${[1,2,3].map(g=>`<div class="bracket-row"><span>${g}학년</span><b>${store[`${e}_${g}`]||'진행 전'}</b></div>`).join('')}</article>`).join('');
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
  let q=query.trim().toLowerCase(), arr=ops.filter(x=>!q||x.join(' ').toLowerCase().includes(q));
  opsList.innerHTML=arr.map(x=>`<article class="ops-card"><h3>${x[0]}</h3><b>${x[1]}</b><small>${x[2]}</small></article>`).join('');
}
opsSearch.oninput=e=>renderOps(e.target.value);renderOps();

songForm.onsubmit=e=>{e.preventDefault();let a=load(STORE.songs,[]);a.push({cls:songClass.value,title:songTitle.value,msg:songMsg.value,time:new Date().toLocaleString()});save(STORE.songs,a);e.target.reset();renderSongs()}
function renderSongs(){let a=load(STORE.songs,[]);songList.innerHTML=a.length?a.slice().reverse().map(x=>`<div class="post"><b>${x.title}</b><small>${x.cls} · ${x.time}</small>${x.msg?`<p>${x.msg}</p>`:''}</div>`).join(''):`<div class="post">아직 신청곡이 없습니다.</div>`}renderSongs();

mediaForm.onsubmit=e=>{e.preventDefault();let a=load(STORE.media,[]);a.push({cls:mediaClass.value,link:mediaLink.value,desc:mediaDesc.value,time:new Date().toLocaleString()});save(STORE.media,a);e.target.reset();renderMedia()}
function renderMedia(){let a=load(STORE.media,[]);mediaList.innerHTML=a.length?a.slice().reverse().map(x=>`<div class="post"><b>${x.cls} · ${x.desc||'사진/영상'}</b><small>${x.time}</small><p>${x.link}</p></div>`).join(''):`<div class="post">아직 제출된 사진·영상이 없습니다.</div>`}renderMedia();

function renderBoard(){
  let custom=load(STORE.notices,[]), all=[...custom.slice().reverse(),...defaultNotices];
  boardList.innerHTML=all.map(x=>`<div class="board-item"><b>${x.title}</b><small>${x.time||''}</small><p>${x.body}</p></div>`).join('');
  homeBoard.innerHTML=all.slice(0,3).map(x=>`<div><b>${x.title}</b><small>${x.body}</small></div>`).join('');
}renderBoard();

staffLoginBtn.onclick=()=>{
  if(staffPw.value==='경덕26**'){staffLogin.classList.add('hidden');staffArea.classList.remove('hidden')}
  else alert('비밀번호를 확인해 주세요.');
};
document.querySelectorAll('[data-staff-view]').forEach(b=>b.onclick=()=>staffView(b.dataset.staffView));
function staffView(v){
  if(v==='preliminput'){
    staffContent.innerHTML=`<h3>예선 결과 입력</h3><div class="staff-form"><select id="piEvent">${prelimEvents.map(x=>`<option>${x}</option>`).join('')}</select><select id="piGrade"><option>1</option><option>2</option><option>3</option></select><input id="piResult" placeholder="예: 1반 결승 진출"><button id="piSave">저장</button></div>`;
    piSave.onclick=()=>{let s=load(STORE.prelim,{});s[`${piEvent.value}_${piGrade.value}`]=piResult.value;save(STORE.prelim,s);renderBrackets();alert('저장했습니다.')};
  } else if(v==='scoreinput'){
    staffContent.innerHTML=`<h3>점수 입력</h3><div class="staff-form"><select id="siClass">${[1,2,3].flatMap(g=>Array.from({length:classCount(g)},(_,i)=>`<option>${g}-${i+1}</option>`)).join('')}</select><select id="siEvent">${scoreEvents.map(x=>`<option>${x}</option>`).join('')}</select><input id="siScore" type="number" placeholder="점수"><button id="siSave">저장</button></div>`;
    siSave.onclick=()=>{let s=getScores();s[siClass.value][siEvent.value]=Number(siScore.value||0);save(STORE.scores,s);renderScores();alert('저장했습니다.')};
  } else if(v==='noticeinput'){
    staffContent.innerHTML=`<h3>공지 등록</h3><div class="staff-form"><input id="niTitle" placeholder="제목"><input id="niBody" placeholder="내용" style="grid-column:span 2"><button id="niSave">등록</button></div>`;
    niSave.onclick=()=>{let a=load(STORE.notices,[]);a.push({title:niTitle.value,body:niBody.value,time:new Date().toLocaleString()});save(STORE.notices,a);renderBoard();alert('등록했습니다.')};
  } else if(v==='performance'){
    staffContent.innerHTML=`<h3>응원 퍼포먼스 투표</h3><p>참여도 · 협동성 · 창의성 · 완성도 · 호응도 기준으로 평가하는 화면입니다.</p><div class="info-note">실제 교직원별 중복 방지와 합산은 Supabase 연동 단계에서 완성하는 것을 권장합니다.</div>`;
  } else if(v==='flagvote'){
    staffContent.innerHTML=`<h3>학급 깃발 투표</h3><p>학년별 학급 깃발을 확인하고 평가하는 화면입니다.</p><div class="info-note">현재는 공개 갤러리 구조까지 구현되어 있으며, 다중 교직원 투표 합산은 DB 연동이 필요합니다.</div>`;
  }
}

if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').catch(()=>{})}
