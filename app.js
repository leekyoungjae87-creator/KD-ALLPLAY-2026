
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
  bracketList.innerHTML=arr.map(e=>`<article class="bracket-card"><h3>${e}</h3><small>${prelimSchedule[e]||''}</small>${[1,2,3].map(g=>`<div class="bracket-row"><span>${g}학년</span><b>${store[`${e}_${g}`]||'진행 예정'}</b></div>`).join('')}</article>`).join('');
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



const SUPA_ENABLED = Boolean(window.KD_SUPABASE_URL && window.KD_SUPABASE_ANON_KEY && window.supabase);
const kdSupa = SUPA_ENABLED ? window.supabase.createClient(window.KD_SUPABASE_URL, window.KD_SUPABASE_ANON_KEY) : null;

async function getQnaData(){
  if(SUPA_ENABLED){
    const {data,error}=await kdSupa.from('qna').select('*').order('created_at',{ascending:false});
    if(error){ console.error(error); return []; }
    return (data||[]).map(x=>({
      id:String(x.id),
      no:x.student_no||'',
      name:x.student_name||'',
      question:x.question||'',
      answer:x.answer||'',
      time:x.created_at ? new Date(x.created_at).toLocaleString() : ''
    }));
  }
  return load(STORE.qna,[]).slice().reverse();
}

qnaForm.onsubmit=async e=>{
  e.preventDefault();
  const payload={
    no:qnaNo.value.trim(),
    name:qnaName.value.trim(),
    question:qnaQuestion.value.trim()
  };
  if(SUPA_ENABLED){
    const {error}=await kdSupa.from('qna').insert({
      student_no:payload.no,
      student_name:payload.name,
      question:payload.question
    });
    if(error){ alert('질문 등록 중 오류가 발생했습니다.'); console.error(error); return; }
  }else{
    let a=load(STORE.qna,[]);
    a.push({id:'q'+Date.now(),...payload,answer:'',time:new Date().toLocaleString()});
    save(STORE.qna,a);
  }
  e.target.reset();
  await renderQna();
  alert(SUPA_ENABLED?'질문이 등록되었습니다. 선생님 화면에서도 확인할 수 있습니다.':'질문이 이 기기에 등록되었습니다. Supabase 연결 전에는 다른 기기와 공유되지 않습니다.');
};

async function renderQna(){
  let a=await getQnaData();
  qnaList.innerHTML=a.length?a.map(x=>`
    <article class="qna-card">
      <div class="qna-card-head"><b>${escapeHtml(x.no)} · ${escapeHtml(maskName(x.name))}</b><small>${escapeHtml(x.time||'')}</small></div>
      <p class="qna-question">${escapeHtml(x.question)}</p>
      ${x.answer?`<div class="qna-answer"><b>관리자 답변</b><p>${escapeHtml(x.answer)}</p></div>`:`<span class="qna-wait">답변 대기</span>`}
    </article>`).join(''):`<div class="post">아직 등록된 질문이 없습니다.</div>`;

  let recent=a.slice(0,3);
  homeQnaList.innerHTML=recent.length?recent.map(x=>`
    <div class="home-qna-item">
      <b>${escapeHtml(x.no)} · ${escapeHtml(maskName(x.name))} · ${escapeHtml(x.question.length>36?x.question.slice(0,36)+'…':x.question)}</b>
      <small>${x.answer?'답변 완료':'답변 대기'}</small>
    </div>`).join(''):`<div class="home-qna-empty">아직 등록된 질문이 없습니다.</div>`;
}
renderQna();

songForm.onsubmit=e=>{e.preventDefault();let a=load(STORE.songs,[]);a.push({cls:songClass.value.trim(),name:songName.value.trim(),title:songTitle.value.trim(),msg:songMsg.value.trim().slice(0,300),time:new Date().toLocaleString()});save(STORE.songs,a);e.target.reset();songCount.textContent='0';renderSongs()}
songMsg.oninput=()=>songCount.textContent=String(songMsg.value.length);
function renderSongs(){let a=load(STORE.songs,[]);songList.innerHTML=a.length?a.slice().reverse().map(x=>`<div class="post"><b>${escapeHtml(x.title)}</b><small>${escapeHtml(x.cls)} · ${escapeHtml(maskName(x.name||''))} · ${escapeHtml(x.time)}</small>${x.msg?`<p>${escapeHtml(x.msg)}</p>`:''}</div>`).join(''):`<div class="post">아직 신청곡이 없습니다.</div>`}renderSongs();

mediaForm.onsubmit=e=>{e.preventDefault();let a=load(STORE.media,[]);a.push({cls:mediaClass.value,link:mediaLink.value,desc:mediaDesc.value,time:new Date().toLocaleString()});save(STORE.media,a);e.target.reset();renderMedia()}
function renderMedia(){let a=load(STORE.media,[]);mediaList.innerHTML=a.length?a.slice().reverse().map(x=>`<div class="post"><b>${x.cls} · ${x.desc||'사진/영상'}</b><small>${x.time}</small><p>${x.link}</p></div>`).join(''):`<div class="post">아직 제출된 사진·영상이 없습니다.</div>`}renderMedia();

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
    staffContent.innerHTML=`<h3>점수 입력</h3><div class="staff-form"><select id="siClass">${[1,2,3].flatMap(g=>Array.from({length:classCount(g)},(_,i)=>`<option>${g}-${i+1}</option>`)).join('')}</select><select id="siEvent">${scoreEvents.map(x=>`<option>${x}</option>`).join('')}</select><input id="siScore" type="number" placeholder="점수"><button id="siSave">저장</button></div>`;
    siSave.onclick=()=>{let s=getScores();s[siClass.value][siEvent.value]=Number(siScore.value||0);save(STORE.scores,s);renderScores();alert('저장했습니다.')};
  } else if(v==='noticeinput'){
    staffContent.innerHTML=`<h3>공지 등록</h3><div class="staff-form"><input id="niTitle" placeholder="제목"><input id="niBody" placeholder="내용" style="grid-column:span 2"><button id="niSave">등록</button></div>`;
    niSave.onclick=()=>{let a=load(STORE.notices,[]);a.push({title:niTitle.value,body:niBody.value,time:new Date().toLocaleString()});save(STORE.notices,a);renderBoard();alert('등록했습니다.')};
  } else if(v==='qnaanswer'){
    staffContent.innerHTML=`<h3>Q&A 답변 관리</h3><p>${SUPA_ENABLED?'학생 질문이 모든 기기에서 실시간으로 공유됩니다.':'현재는 기기 내 저장 모드입니다. config.js에 Supabase 정보를 입력하면 다기기 공유가 활성화됩니다.'}</p><div id="staffQnaItems">불러오는 중...</div>`;
    getQnaData().then(a=>{
      staffQnaItems.innerHTML=a.length?a.map(x=>`<div class="staff-qna-card">
        <small>${escapeHtml(x.no)} · ${escapeHtml(maskName(x.name))} · ${escapeHtml(x.time||'')}</small>
        <b>${escapeHtml(x.question)}</b>
        <textarea id="qa_${x.id}" placeholder="관리자 답변을 입력하세요.">${escapeHtml(x.answer||'')}</textarea>
        <button data-qna-save="${x.id}">답변 저장</button>
      </div>`).join(''):'<div class="info-note">아직 등록된 질문이 없습니다.</div>';
      document.querySelectorAll('[data-qna-save]').forEach(btn=>btn.onclick=async()=>{
        const answer=document.getElementById(`qa_${btn.dataset.qnaSave}`).value.trim();
        if(SUPA_ENABLED){
          const {error}=await kdSupa.from('qna').update({answer}).eq('id',btn.dataset.qnaSave);
          if(error){ alert('답변 저장 중 오류가 발생했습니다.'); console.error(error); return; }
        }else{
          let list=load(STORE.qna,[]), item=list.find(x=>String(x.id)===String(btn.dataset.qnaSave));
          if(item){item.answer=answer;save(STORE.qna,list);}
        }
        await renderQna();
        alert('답변을 저장했습니다.');
        staffView('qnaanswer');
      });
    });
  } else if(v==='performance'){
    staffContent.innerHTML=`<h3>응원 퍼포먼스 투표</h3><p>참여도 · 협동성 · 창의성 · 완성도 · 호응도 기준으로 평가하는 화면입니다.</p><div class="info-note">실제 교직원별 중복 방지와 합산은 Supabase 연동 단계에서 완성하는 것을 권장합니다.</div>`;
  } else if(v==='flagvote'){
    staffContent.innerHTML=`<h3>학급 깃발 투표</h3><p>학년별 학급 깃발을 확인하고 평가하는 화면입니다.</p><div class="info-note">현재는 공개 갤러리 구조까지 구현되어 있으며, 다중 교직원 투표 합산은 DB 연동이 필요합니다.</div>`;
  }
}

if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').catch(()=>{})}

if(SUPA_ENABLED){
  kdSupa.channel('qna-live')
    .on('postgres_changes',{event:'*',schema:'public',table:'qna'},()=>renderQna())
    .subscribe();
}


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
