
const EVENT_START = new Date(2026,9,1,8,30,0);
const SCHEDULE = [
["08:15-08:30","학급 집결","학년별 집결"],
["08:30-09:00","개회식 · 준비운동 · 안전교육","운동장"],
["09:00-09:30","학급별 응원 퍼포먼스","1→2→3학년"],
["09:30-10:05","순환경기 1","1학년 8자 줄넘기 · 2학년 슈팅 릴레이 · 3학년 바운드 배구 결승"],
["10:05-10:40","순환경기 2","2학년 8자 줄넘기 · 3학년 슈팅 릴레이 · 1학년 바운드 배구 결승"],
["10:40-11:15","순환경기 3","3학년 8자 줄넘기 · 1학년 슈팅 릴레이 · 2학년 바운드 배구 결승"],
["11:15-12:00","2인 3각","3→2→1학년"],
["12:00-13:00","점심시간","12:20~12:50 사제동행 농구 한판"],
["13:00-13:20","집합 및 축하공연","댄스부"],
["13:20-14:00","달리는 줄다리기 준결승·결승","1→2→3학년, 총 9경기"],
["14:00-14:30","미션 이어달리기","학생자치회"],
["14:30-15:00","이어달리기 결승","1→2→3학년, 총 3경기"],
["15:00-15:30","점수집계 · 시상 · 폐회 · 정리","본부"]
];
const RULES = [
["8자 줄넘기","14명","남6·여6 + 줄잡이 2명","2분×2회 기록 합산"],
["슈팅 릴레이","14명","남6·여6 + 후보2","99초×2회 기록"],
["바운드 배구","20명","남8·여8 + 후보 각2","여 12분 + 남 12분, 합산"],
["2인 3각","16명","남8·여8","2인1조 8팀 릴레이"],
["달리는 줄다리기","전원","학급 전체","준결승·결승 / 3전 2선승"],
["미션 이어달리기","6명","남3·여3","반바퀴×6명, 미션 6개"],
["이어달리기","8명","남4·여4","여-남 교대, 반바퀴×8명"],
["축구(남)","9명","교체 1명 포함","사전경기 / 예선 15분"],
["피구(여)","학급별","적은 반 인원에 맞춤","사전경기 / 5분 3세트"],
["응원 퍼포먼스","학급","학급 구성원","종합점수 제외, 별도 시상"],
["학급 깃발","학급","학급 활동","종합점수 30·20·10점"]
];
const PRELIMS = ["축구(남)","피구(여)","바운드 배구","달리는 줄다리기","이어달리기"];
const OPS = [
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
const POINTS = {flag:[30,20,10], soccer:[50,40,30,20,10], dodge:[50,40,30,20,10], rope:[60,50,40,30,20], shooting:[60,50,40,30,20], volley:[60,50,40,30,20], threeleg:[80,70,60,50,40], tug:[120,100,80,60,40], mission:[30,20,10], relay:[120,100,80,60,40]};

document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>showPage(b.dataset.page));
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>showPage(b.dataset.go));
function showPage(id){
  document.querySelectorAll('.page').forEach(x=>x.classList.toggle('active',x.id===id));
  document.querySelectorAll('[data-page]').forEach(x=>x.classList.toggle('active',x.dataset.page===id));
  scrollTo({top:0,behavior:'smooth'});
}

function countdown(){
 let diff=EVENT_START-new Date(), home=document.getElementById('homeDday'), big=document.getElementById('ddayBig');
 if(diff<=0){[home,big].forEach(x=>x&&(x.textContent='D-DAY')); ['days','hours','minutes','seconds'].forEach(id=>document.getElementById(id)&&(document.getElementById(id).textContent='00')); return}
 let d=Math.floor(diff/86400000); diff%=86400000; let h=Math.floor(diff/3600000); diff%=3600000; let m=Math.floor(diff/60000); let s=Math.floor((diff%60000)/1000);
 if(home)home.textContent=`D-${d}`; if(big)big.textContent=`D-${d}`;
 [['days',d],['hours',h],['minutes',m],['seconds',s]].forEach(([id,v])=>{let e=document.getElementById(id);if(e)e.textContent=String(v).padStart(2,'0')});
 let t=document.getElementById('homeCountdownText'); if(t)t.textContent=`${d}일 ${h}시간 ${m}분 남음`;
}
countdown(); setInterval(countdown,1000);

function getMinutes(t){let [h,m]=t.split(':').map(Number); return h*60+m}
function updateNow(){
 const now=new Date(), ne=document.getElementById('nowEvent'), nx=document.getElementById('nextEvent');
 if(!(now.getFullYear()==2026&&now.getMonth()==9&&now.getDate()==1)){ne.textContent='행사 준비 중';nx.textContent='10월 1일 08:30 개회식';return}
 let min=now.getHours()*60+now.getMinutes(), found=-1;
 SCHEDULE.forEach((r,i)=>{let [a,b]=r[0].split('-').map(getMinutes);if(min>=a&&min<b)found=i});
 if(found>=0){ne.textContent=SCHEDULE[found][1];nx.textContent=found<SCHEDULE.length-1?`${SCHEDULE[found+1][0].split('-')[0]} ${SCHEDULE[found+1][1]}`:'행사 종료'}
 else if(min<495){ne.textContent='행사 시작 전';nx.textContent='08:15 학급 집결'} else {ne.textContent='행사 종료';nx.textContent='수고했어요!'}
}
updateNow();setInterval(updateNow,60000);

document.getElementById('scheduleList').innerHTML=SCHEDULE.map(r=>`<div class="time-row"><time>${r[0]}</time><div><b>${r[1]}</b><small>${r[2]}</small></div></div>`).join('');

let grade=1;
function scoreData(g){
 const n=g===2?8:7, saved=JSON.parse(localStorage.getItem('kd_scores_v1')||'{}');
 return Array.from({length:n},(_,i)=>({cls:`${g}-${i+1}`,score:Number(saved[`${g}-${i+1}`]||0)})).sort((a,b)=>b.score-a.score);
}
function renderScores(){
 let data=scoreData(grade), rank=0,last=null;
 document.getElementById('scoreTable').innerHTML=`<table class="score-table"><thead><tr><th>순위</th><th>학급</th><th>종합점수</th></tr></thead><tbody>${data.map((x,i)=>{if(x.score!==last){rank=i+1;last=x.score}return `<tr><td class="${rank===1?'rank1':''}">${x.score?rank:'-'}</td><td>${x.cls}</td><td>${x.score}</td></tr>`}).join('')}</tbody></table>`;
}
document.querySelectorAll('#scoreTabs button').forEach(b=>b.onclick=()=>{grade=Number(b.dataset.grade);document.querySelectorAll('#scoreTabs button').forEach(x=>x.classList.toggle('active',x===b));renderScores()});renderScores();

document.getElementById('prelimFilter').innerHTML=['전체',...PRELIMS].map((x,i)=>`<button class="${i===0?'active':''}" data-f="${x}">${x}</button>`).join('');
function renderPrelim(f='전체'){
 const store=JSON.parse(localStorage.getItem('kd_prelim_v1')||'{}'), arr=f==='전체'?PRELIMS:[f];
 document.getElementById('prelimCards').innerHTML=arr.map(ev=>`<article class="result-card"><h3>${ev}</h3>${[1,2,3].map(g=>`<div class="result-line"><span>${g}학년</span><b>${store[`${ev}_${g}`]||'진행 전'}</b></div>`).join('')}</article>`).join('');
}
document.querySelectorAll('#prelimFilter button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#prelimFilter button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderPrelim(b.dataset.f)});renderPrelim();

document.getElementById('ruleCards').innerHTML=RULES.map(r=>`<article class="rule-card"><h3>${r[0]}</h3><small>참가 ${r[1]} · ${r[2]}</small><ul><li>${r[3]}</li></ul></article>`).join('');
document.getElementById('opsCards').innerHTML=OPS.map(r=>`<article class="ops-card"><h3>${r[0]}</h3><b>${r[1]}</b><br><small>${r[2]}</small></article>`).join('');

const gs=document.getElementById('gradeSelect'), cs=document.getElementById('classSelect');
gs.innerHTML=[1,2,3].map(g=>`<option value="${g}">${g}학년</option>`).join('');
function fillClasses(){let g=+gs.value,n=g===2?8:7;cs.innerHTML=Array.from({length:n},(_,i)=>`<option value="${i+1}">${i+1}반</option>`).join('')}gs.onchange=fillClasses;fillClasses();
document.getElementById('showClass').onclick=()=>{let key=`${gs.value}-${cs.value}`, scores=scoreData(+gs.value), item=scores.find(x=>x.cls===key), rank=scores.findIndex(x=>x.cls===key)+1;document.getElementById('classDashboard').innerHTML=`<h2>${key} 우리 반</h2><p>학급별 참가자 명단은 추후 등록할 수 있습니다.</p><div class="class-summary"><div><b>${item.score}</b><span>현재 점수</span></div><div><b>${item.score?rank:'-'}</b><span>현재 순위</span></div><div><b>2~4</b><span>권장 개인 참가 종목 수</span></div></div>`};

function listStore(key,target,render){let a=JSON.parse(localStorage.getItem(key)||'[]');document.getElementById(target).innerHTML=a.length?a.slice().reverse().map(render).join(''):'<div class="list-item">아직 등록된 내용이 없습니다.</div>'}
document.getElementById('songForm').onsubmit=e=>{e.preventDefault();let a=JSON.parse(localStorage.getItem('kd_songs_v1')||'[]');a.push({c:songClass.value,t:songTitle.value,time:new Date().toLocaleString()});localStorage.setItem('kd_songs_v1',JSON.stringify(a));e.target.reset();renderSongs()}
function renderSongs(){listStore('kd_songs_v1','songList',x=>`<div class="list-item"><b>${x.t}</b><small> · ${x.c}</small></div>`)}renderSongs();
document.getElementById('mediaForm').onsubmit=e=>{e.preventDefault();let a=JSON.parse(localStorage.getItem('kd_media_v1')||'[]');a.push({c:mediaClass.value,l:mediaLink.value,d:mediaDesc.value});localStorage.setItem('kd_media_v1',JSON.stringify(a));e.target.reset();renderMedia()}
function renderMedia(){listStore('kd_media_v1','mediaList',x=>`<div class="list-item"><b>${x.c}</b> · ${x.d||'사진/영상'}<br><small>${x.l}</small></div>`)}renderMedia();

const defaultNotices=[{t:'참가 안내',d:'달리는 줄다리기를 제외하고 1인당 최소 2종목 이상, 최대 4종목까지 참여합니다.'},{t:'경기 대기',d:'참가 선수는 경기 시작 전 미리 대기 장소로 이동해 주세요.'},{t:'안전 안내',d:'경기 중 심판의 안내와 안전수칙을 지켜 주세요.'}];
document.getElementById('noticeList').innerHTML=defaultNotices.map(x=>`<div class="notice-item"><b>${x.t}</b><small>${x.d}</small></div>`).join('');

document.getElementById('staffLoginBtn').onclick=()=>{if(document.getElementById('staffPw').value==='경덕26**'){document.getElementById('staffLogin').classList.add('hidden');document.getElementById('staffArea').classList.remove('hidden')}else alert('비밀번호를 확인해 주세요.')};
if('serviceWorker' in navigator)navigator.serviceWorker.register('./sw.js');
