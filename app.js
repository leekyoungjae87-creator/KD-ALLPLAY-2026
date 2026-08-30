
const EVENT_DATE = new Date("2026-10-01T08:30:00+09:00");
const classCounts = {1:7,2:8,3:7};

const schedule = [
  ["08:15","08:30","집결","학년별 지정 장소","전 학년"],
  ["08:30","09:00","개회식 · 준비운동 · 안전교육","운동장","전 학년"],
  ["09:00","09:30","학급별 응원 퍼포먼스","운동장","신청 학급"],
  ["09:30","10:05","순환경기 ①","운동장 · 농구장 · 강당","1학년 8자 / 2학년 슈팅 / 3학년 배구 결승"],
  ["10:05","10:40","순환경기 ②","운동장 · 농구장 · 강당","2학년 8자 / 3학년 슈팅 / 1학년 배구 결승"],
  ["10:40","11:15","순환경기 ③","운동장 · 농구장 · 강당","3학년 8자 / 1학년 슈팅 / 2학년 배구 결승"],
  ["11:15","12:00","2인 3각","운동장","3학년 → 2학년 → 1학년"],
  ["12:00","13:00","점심시간 · 사제동행 농구","농구장","농구 12:20~12:50"],
  ["13:00","13:20","집합 · 축하공연","운동장","댄스부"],
  ["13:20","14:00","달리는 줄다리기 준결승·결승","운동장","1 → 2 → 3학년 / 총 9경기"],
  ["14:00","14:30","미션 이어달리기","운동장","전 학년"],
  ["14:30","15:00","이어달리기 결승","운동장","1 → 2 → 3학년 / 총 3경기"],
  ["15:00","15:30","점수집계 · 시상 · 폐회 · 정리","운동장","전 학년"]
];

const events = [
  {key:"flag",name:"학급 깃발",points:[30,20,10,0,0]},
  {key:"soccer",name:"축구(남)",points:[50,40,30,20,10]},
  {key:"dodge",name:"피구(여)",points:[50,40,30,20,10]},
  {key:"rope",name:"8자 줄넘기",points:[60,50,40,30,20]},
  {key:"shoot",name:"슈팅 릴레이",points:[60,50,40,30,20]},
  {key:"volley",name:"바운드 배구",points:[60,50,40,30,20]},
  {key:"threeleg",name:"2인 3각",points:[80,70,60,50,40]},
  {key:"tug",name:"달리는 줄다리기",points:[120,100,80,60,40]},
  {key:"mission",name:"미션 이어달리기",points:[30,20,10,0,0]},
  {key:"relay",name:"이어달리기",points:[120,100,80,60,40]}
];

const rules = [
  ["학급 응원 퍼포먼스","학급 전체 · 별도 시상",["학급 전체 참여 원칙","2분 이내","입장 → 퍼포먼스 → 퇴장","교직원 투표","종합점수에는 미포함"]],
  ["8자 줄넘기","14명 · 기록경기",["줄잡이 2명 + 점프 12명","2분 × 2회 합산","시작 전 연습 1회","동일 기록은 공동 순위"]],
  ["슈팅 릴레이","14명 · 기록경기",["남 6명·여 6명 + 후보 2명","지정 라인에서 슛 성공 횟수","99초 × 2회 합산","동일 기록은 공동 순위"]],
  ["바운드 배구","20명",["남 8·여 8, 후보 남녀 각 2명","전반 여학생 12분 / 후반 남학생 12분","바운드 허용","전·후반 합산 점수"]],
  ["2인 3각","16명 · 기록경기",["남 8·여 8","2인 1조 × 8팀","여-남 순서 교대","반환점 왕복 후 배턴 전달","0.1초 단위 기록"]],
  ["달리는 줄다리기","학급 전원",["예선 통과 학년별 4팀","3판 2선승제","시합 시 적은 반 기준으로 인원·성비 맞춤","경기시간 1분"]],
  ["미션 이어달리기","6명",["남 3·여 3","미션 6개 클리어","남-여-남-여-남-여","반바퀴 × 6명"]],
  ["이어달리기","8명",["남 4·여 4","여-남-여-남-여-남-여-남","반바퀴 × 8명","마지막 주자 결승선 통과"]],
  ["축구(남)","9명",["교체선수 1명","예선 15분","결승 전·후반 각 10분","무승부 시 승부차기 5명"]],
  ["피구(여)","학급별 인원 조정",["적은 반 기준으로 인원 맞춤","외야 1명","5분 3세트, 2선승","패스 3회까지","더블 아웃 없음"]]
];

const staffRows = [
  ["응원 퍼포먼스","전 교직원 투표","각 학년 체육교사"],
  ["학급 깃발","전 교직원 투표","각 학년 체육교사"],
  ["8자 줄넘기","각 학년 담임교사","체육교사 지원"],
  ["슈팅 릴레이","스포츠강사 ①·②","체육교사 지원"],
  ["바운드 배구","스포츠강사 ③·④","체육교사 지원"],
  ["2인 3각","스포츠강사 ①·②·③·④","각 학년 체육교사"],
  ["달리는 줄다리기","체육교사","스포츠강사 · 선수정렬"],
  ["미션 이어달리기","학생자치회 회장단·체육부장","학생자치회"],
  ["이어달리기 결승","체육교사","배턴터치존·골인지점 담당"]
];

const state = {
  grade: 1,
  flagGrade: 1,
  scores: JSON.parse(localStorage.getItem("kd_scores") || "{}"),
  songs: JSON.parse(localStorage.getItem("kd_songs") || "[]"),
  notices: JSON.parse(localStorage.getItem("kd_notices") || "[]")
};

function ensureScores(){
  for(let g=1;g<=3;g++){
    state.scores[g] ??= {};
    for(let c=1;c<=classCounts[g];c++){
      state.scores[g][c] ??= {};
      events.forEach(e=>state.scores[g][c][e.key] ??= 0);
    }
  }
  saveScores();
}
function saveScores(){ localStorage.setItem("kd_scores",JSON.stringify(state.scores)); }
function total(g,c){ return events.reduce((s,e)=>s+(Number(state.scores[g][c][e.key])||0),0); }

function renderSchedule(){
  const box=document.getElementById("scheduleList");
  box.innerHTML=schedule.map((s,i)=>`
    <div class="timeline-item" data-time="${s[0]}-${s[1]}">
      <div class="timeline-time">${s[0]}–${s[1]}</div>
      <div class="timeline-main"><b>${s[2]}</b><span>${s[4]}</span></div>
      <div class="timeline-place">${s[3]}</div>
    </div>`).join("");
}
function minutes(t){const [h,m]=t.split(":").map(Number);return h*60+m}
function currentSchedule(){
  const now=new Date();
  if(now.toDateString()!==EVENT_DATE.toDateString()) return null;
  const n=now.getHours()*60+now.getMinutes();
  return schedule.find(s=>n>=minutes(s[0])&&n<minutes(s[1])) || null;
}
function updateTimeUI(){
  const now=new Date(), diff=EVENT_DATE-now;
  let text;
  if(diff>0) text="D-"+Math.ceil(diff/86400000);
  else if(diff>-86400000) text="D-DAY";
  else text="ALL PLAY 완료";
  document.getElementById("countdown").textContent=text;
  const cur=currentSchedule();
  document.querySelectorAll(".timeline-item").forEach(el=>el.classList.remove("current"));
  if(cur){
    document.getElementById("currentProgram").textContent=`${cur[0]}~${cur[1]} · ${cur[2]}`;
    document.getElementById("homeCurrent").textContent=cur[2];
    document.getElementById("homeCurrentSub").textContent=`${cur[0]}~${cur[1]} · ${cur[3]}`;
    const el=[...document.querySelectorAll(".timeline-item")].find(x=>x.dataset.time===`${cur[0]}-${cur[1]}`);
    if(el) el.classList.add("current");
  } else {
    document.getElementById("currentProgram").textContent="행사 전 · 준비사항을 확인하세요";
    document.getElementById("homeCurrent").textContent="2026. 10. 1. 경덕 ALL PLAY";
    document.getElementById("homeCurrentSub").textContent="08:30 개회 · 운동장 및 경덕관";
  }
}
function renderScores(){
  const g=state.grade, rows=[];
  for(let c=1;c<=classCounts[g];c++) rows.push({c,t:total(g,c)});
  rows.sort((a,b)=>b.t-a.t);
  const rankMap={}; let last=null,rank=0;
  rows.forEach((r,i)=>{if(r.t!==last){rank=i+1;last=r.t} rankMap[r.c]=rank});
  const head=events.map(e=>`<th>${e.name}</th>`).join("");
  const body=Array.from({length:classCounts[g]},(_,i)=>i+1).map(c=>{
    const rank=rankMap[c], cls=rank<=3?`rank${rank}`:"";
    return `<tr class="${cls}"><td>${g}-${c}</td><td class="total">${total(g,c)}</td><td>${rank}위</td>${events.map(e=>`<td>${state.scores[g][c][e.key]}</td>`).join("")}</tr>`;
  }).join("");
  document.getElementById("scoreBoard").innerHTML=`<div class="table-wrap"><table><thead><tr><th>학급</th><th>총점</th><th>순위</th>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
  renderLeaders();
}
function renderLeaders(){
  let html="";
  for(let g=1;g<=3;g++){
    let best={c:1,t:-1};
    for(let c=1;c<=classCounts[g];c++){let t=total(g,c);if(t>best.t)best={c,t}}
    html+=`<span><b>${g}학년</b><em>${g}-${best.c} · ${best.t}점</em></span>`;
  }
  document.getElementById("leaderMini").innerHTML=html;
}
function renderLegend(){
  document.getElementById("scoreLegend").innerHTML=`<table><thead><tr><th>종목</th><th>1위</th><th>2위</th><th>3위</th><th>4위</th><th>그 외</th></tr></thead><tbody>${events.map(e=>`<tr><td>${e.name}</td>${e.points.map(p=>`<td>${p||"-"}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}
function renderRules(){
  document.getElementById("ruleGrid").innerHTML=rules.map(r=>`<article class="card rule-card"><h3>${r[0]} <span class="badge">${r[1]}</span></h3><ul>${r[2].map(x=>`<li>${x}</li>`).join("")}</ul></article>`).join("");
}
function renderFlags(){
  const g=state.flagGrade;
  document.getElementById("flagGallery").innerHTML=Array.from({length:classCounts[g]},(_,i)=>i+1).map(c=>`<div class="flag-card"><div><b>${g}-${c}</b><span>깃발 이미지 등록 예정</span></div></div>`).join("");
}
function renderStaff(){
  document.getElementById("staffTable").innerHTML=`<table><thead><tr><th>종목</th><th>주심</th><th>지원</th></tr></thead><tbody>${staffRows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}
function renderSongs(){
  document.getElementById("songCount").textContent=`${state.songs.length}곡`;
  document.getElementById("songList").innerHTML=state.songs.length?state.songs.slice().reverse().map(s=>`<div class="song-item"><div><b>🎵 ${escapeHtml(s.title)} · ${escapeHtml(s.artist)}</b><p>${escapeHtml(s.message||"")}</p></div><small>${escapeHtml(s.requester||"익명")}</small></div>`).join(""):`<div class="empty-state"><span>🎧</span><h3>첫 신청곡을 기다리고 있어요</h3><p>체육한마당에서 함께 듣고 싶은 노래를 신청해 주세요.</p></div>`;
}
function renderNotices(){
  const defaults = state.notices.length?state.notices:[
    {title:"운영본부 안내",body:"경기 10분 전 해당 경기장 주변에서 대기해 주세요.",time:"기본 공지"},
    {title:"ALL PLAY 안전수칙",body:"경기 전 준비운동, 운동화 착용, 심판 및 진행요원의 안내를 지켜 주세요.",time:"기본 공지"}
  ];
  document.getElementById("noticeList").innerHTML=defaults.slice().reverse().map(n=>`<div class="notice-item"><div><strong>📢 ${escapeHtml(n.title)}</strong><p>${escapeHtml(n.body)}</p></div><small>${escapeHtml(n.time)}</small></div>`).join("");
}
function escapeHtml(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}

function navigate(id){
  document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===id));
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.section===id));
  document.getElementById("mainNav").classList.remove("open");
  window.scrollTo({top:document.querySelector(".nav").offsetTop,behavior:"smooth"});
}
document.querySelectorAll("[data-section]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.section)));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.go)));
document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));

document.querySelectorAll("[data-grade]").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll("[data-grade]").forEach(x=>x.classList.remove("active"));b.classList.add("active");state.grade=Number(b.dataset.grade);renderScores();
}));
document.querySelectorAll("[data-flag-grade]").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll("[data-flag-grade]").forEach(x=>x.classList.remove("active"));b.classList.add("active");state.flagGrade=Number(b.dataset.flagGrade);renderFlags();
}));

document.getElementById("songSubmit").addEventListener("click",()=>{
  const title=document.getElementById("songTitle").value.trim(),artist=document.getElementById("songArtist").value.trim();
  if(!title||!artist)return alert("노래 제목과 가수를 입력해 주세요.");
  state.songs.push({title,artist,requester:document.getElementById("songRequester").value.trim(),message:document.getElementById("songMessage").value.trim()});
  localStorage.setItem("kd_songs",JSON.stringify(state.songs));["songTitle","songArtist","songRequester","songMessage"].forEach(id=>document.getElementById(id).value="");renderSongs();
});
document.getElementById("playerSearchBtn").addEventListener("click",()=>{
  const no=document.getElementById("studentNo").value.trim(),name=document.getElementById("studentName").value.trim();
  document.getElementById("playerResult").innerHTML=no&&name?`<b>${escapeHtml(no)} ${escapeHtml(name)}</b><br>실제 선수명단 연결 전입니다. 향후 참가신청서 데이터를 등록하면 여기에서 본인 종목이 자동 표시됩니다.`:"학번과 이름을 모두 입력해 주세요.";
});

function initAdmin(){
  const gSel=document.getElementById("adminGrade");
  gSel.innerHTML=[1,2,3].map(g=>`<option value="${g}">${g}학년</option>`).join("");
  const eSel=document.getElementById("adminEvent");
  eSel.innerHTML=events.map(e=>`<option value="${e.key}">${e.name}</option>`).join("");
  function setClasses(){const g=Number(gSel.value);document.getElementById("adminClass").innerHTML=Array.from({length:classCounts[g]},(_,i)=>`<option value="${i+1}">${g}-${i+1}</option>`).join("")}
  gSel.addEventListener("change",setClasses);setClasses();
}
document.getElementById("adminLoginBtn").addEventListener("click",()=>{
  if(document.getElementById("adminPassword").value==="allplay2026"){document.getElementById("adminLock").classList.add("hidden");document.getElementById("adminPanel").classList.remove("hidden")} else alert("비밀번호가 다릅니다.");
});
document.getElementById("saveScore").addEventListener("click",()=>{
  const g=Number(document.getElementById("adminGrade").value),c=Number(document.getElementById("adminClass").value),e=document.getElementById("adminEvent").value,s=Number(document.getElementById("adminScore").value||0);
  state.scores[g][c][e]=s;saveScores();renderScores();alert(`${g}-${c} 점수를 반영했습니다.`);
});
document.getElementById("saveNotice").addEventListener("click",()=>{
  const title=document.getElementById("adminNoticeTitle").value.trim(),body=document.getElementById("adminNoticeBody").value.trim();
  if(!title||!body)return alert("제목과 내용을 입력해 주세요.");
  state.notices.push({title,body,time:new Date().toLocaleString("ko-KR",{hour:"2-digit",minute:"2-digit"})});
  localStorage.setItem("kd_notices",JSON.stringify(state.notices));document.getElementById("adminNoticeTitle").value="";document.getElementById("adminNoticeBody").value="";renderNotices();alert("공지를 등록했습니다.");
});
document.getElementById("resetData").addEventListener("click",()=>{
  if(confirm("점수·신청곡·공지 데이터를 초기화할까요?")){["kd_scores","kd_songs","kd_notices"].forEach(k=>localStorage.removeItem(k));location.reload();}
});

ensureScores();renderSchedule();renderScores();renderLegend();renderRules();renderFlags();renderStaff();renderSongs();renderNotices();initAdmin();updateTimeUI();setInterval(updateTimeUI,30000);


let deferredInstallPrompt = null;
window.addEventListener("beforeinstallprompt",(e)=>{
  e.preventDefault();
  deferredInstallPrompt=e;
  document.getElementById("installBanner")?.classList.add("show");
});
document.getElementById("installBtn")?.addEventListener("click",async()=>{
  if(!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt=null;
  document.getElementById("installBanner")?.classList.remove("show");
});
window.addEventListener("appinstalled",()=>{
  document.getElementById("installBanner")?.classList.remove("show");
});
if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
}
