const eventDate=new Date('2026-10-01T08:30:00+09:00');
const classCounts={1:7,2:8,3:7};
const schedule=[
['08:15','08:30','집결','학년별 지정 장소','전 학년'],
['08:30','09:00','개회식 · 준비운동 · 안전교육','운동장','전 학년'],
['09:00','09:30','학급별 응원 퍼포먼스','운동장','신청 학급'],
['09:30','10:05','순환경기 ①','운동장 · 농구장 · 강당','1학년 8자 / 2학년 슈팅 / 3학년 바운드 배구 결승'],
['10:05','10:40','순환경기 ②','운동장 · 농구장 · 강당','2학년 8자 / 3학년 슈팅 / 1학년 바운드 배구 결승'],
['10:40','11:15','순환경기 ③','운동장 · 농구장 · 강당','3학년 8자 / 1학년 슈팅 / 2학년 바운드 배구 결승'],
['11:15','12:00','2인 3각','운동장','3학년 → 2학년 → 1학년'],
['12:00','13:00','점심시간 · 사제동행 농구','농구장','농구 12:20~12:50'],
['13:00','13:20','집합 · 축하공연','운동장','댄스부'],
['13:20','14:00','달리는 줄다리기 준결승·결승','운동장','1 → 2 → 3학년 / 총 9경기'],
['14:00','14:30','미션 이어달리기','운동장','전 학년'],
['14:30','15:00','이어달리기 결승','운동장','1 → 2 → 3학년 / 총 3경기'],
['15:00','15:30','점수집계 · 시상식 · 폐회식 · 정리','운동장','전 학년']
];
const events=[
{key:'soccer',name:'축구(남)',pts:[50,40,30,20,10]},
{key:'dodge',name:'피구(여)',pts:[50,40,30,20,10]},
{key:'volley',name:'바운드 배구',pts:[60,50,40,30,20]},
{key:'rope',name:'8자 줄넘기',pts:[60,50,40,30,20]},
{key:'shoot',name:'슈팅 릴레이',pts:[60,50,40,30,20]},
{key:'threeleg',name:'2인 3각',pts:[80,70,60,50,40]},
{key:'tug',name:'달리는 줄다리기',pts:[120,100,80,60,40]},
{key:'mission',name:'미션 이어달리기',pts:[30,20,10,0,0]},
{key:'relay',name:'이어달리기',pts:[120,100,80,60,40]},
{key:'flag',name:'학급 깃발',pts:[30,20,10,0,0]}
];
const eventRules=[
['학급 응원 퍼포먼스','학급 전체 · 별도 시상',['학급 전체 참여 원칙','2분 이내','입장 → 퍼포먼스 → 퇴장','참여도·협동성·창의성·완성도·호응도 평가','종합점수에는 포함하지 않음']],
['8자 줄넘기','14명',['남 6·여 6 + 줄잡이 2명','2분 × 2회 합산','8자 모양으로 1명씩 통과','동일 기록은 공동 순위']],
['슈팅 릴레이','14명',['남 6·여 6 + 후보 2명','지정 라인에서 슛 성공 횟수','99초 × 2회 합산','동일 기록은 공동 순위']],
['바운드 배구','20명',['남 8·여 8 + 후보 각 2명','전반 여학생 12분 / 후반 남학생 12분','바운드 허용','전·후반 합산 점수']],
['2인 3각','16명',['남 8·여 8','2인 1조 × 8팀','여-남-여-남-여-남-여-남','반환점 왕복 후 배턴 전달','0.1초 단위 기록']],
['달리는 줄다리기','학급 전원',['학년별 예선 통과 4팀','3판 2선승','적은 반 기준으로 인원과 남녀비율 맞춤','경기시간 1분']],
['미션 이어달리기','6명',['남 3·여 3','미션 6개 클리어','남-여-남-여-남-여','반바퀴 × 6명']],
['이어달리기','8명',['남 4·여 4','여-남-여-남-여-남-여-남','반바퀴 × 8명','마지막 주자 결승선까지']],
['축구(남)','9명',['교체선수 1명','사전경기','예선 15분','결승 전·후반 각 10분','무승부 시 승부차기 5명']],
['피구(여)','학급별 조정',['적은 반 기준으로 인원 맞춤','외야 1명','5분 3세트, 2선승','패스 3회까지','더블 아웃 없음']]
];
const S={grade:1,scores:JSON.parse(localStorage.getItem('kd_final_scores')||'{}'),songs:JSON.parse(localStorage.getItem('kd_final_songs')||'[]'),media:JSON.parse(localStorage.getItem('kd_final_media')||'[]'),notices:JSON.parse(localStorage.getItem('kd_final_notices')||'[]'),votes:JSON.parse(localStorage.getItem('kd_final_votes')||'{}'),flags:JSON.parse(localStorage.getItem('kd_final_flags')||'{}'),flagVotes:JSON.parse(localStorage.getItem('kd_flag_votes')||'{}'),perfVotes:JSON.parse(localStorage.getItem('kd_perf_votes')||'{}')};
function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function ensure(){for(let g=1;g<=3;g++){S.scores[g]??={};for(let c=1;c<=classCounts[g];c++){S.scores[g][c]??={};events.forEach(e=>S.scores[g][c][e.key]??=0)}}saveScores()}
function saveScores(){localStorage.setItem('kd_final_scores',JSON.stringify(S.scores))}
function total(g,c){return events.reduce((n,e)=>n+(Number(S.scores[g][c][e.key])||0),0)}
function mins(t){const[a,b]=t.split(':').map(Number);return a*60+b}
function currentIdx(){const n=new Date();if(n.toDateString()!==eventDate.toDateString())return -1;const m=n.getHours()*60+n.getMinutes();return schedule.findIndex(s=>m>=mins(s[0])&&m<mins(s[1]))}
function renderClock(){const n=new Date(),d=eventDate-n;document.getElementById('countdown').textContent=d>0?'D-'+Math.ceil(d/86400000):d>-86400000?'D-DAY':'ALL PLAY 완료';const i=currentIdx(),cur=i>=0?schedule[i]:null,next=i>=0&&i<schedule.length-1?schedule[i+1]:schedule[0];const now=cur?cur[2]:'행사 전 준비기간';document.getElementById('nowProgram').textContent=now;document.getElementById('homeNow').textContent=now;document.getElementById('homeNowSub').textContent=cur?`${cur[0]}~${cur[1]} · ${cur[3]}`:'당일에는 현재 진행 종목이 자동 표시됩니다.';document.getElementById('liveNow').textContent=cur?cur[2]:'행사 전';document.getElementById('liveNowPlace').textContent=cur?`${cur[0]}~${cur[1]} · ${cur[3]}`:'10월 1일 08:30 시작';document.getElementById('nextProgram').textContent=next?next[2]:'-';document.getElementById('liveNext').textContent=next?next[2]:'-';document.getElementById('liveNextPlace').textContent=next?`${next[0]}~${next[1]} · ${next[3]}`:'-';document.querySelectorAll('.timeline-item').forEach((e,j)=>e.classList.toggle('current',j===i))}
function renderSchedule(){document.getElementById('scheduleList').innerHTML=schedule.map((s,i)=>`<div class="timeline-item"><b>${s[0]}–${s[1]}</b><div><b>${s[2]}</b><span>${s[4]}</span></div><div class="place">${s[3]}</div></div>`).join('')}
function renderScores(){const g=S.grade;let rows=[];for(let c=1;c<=classCounts[g];c++)rows.push({c,t:total(g,c)});rows.sort((a,b)=>b.t-a.t);let last=null,r=0,rank={};rows.forEach((x,i)=>{if(x.t!==last){r=i+1;last=x.t}rank[x.c]=r});document.getElementById('scoreBoard').innerHTML=`<div class="table-wrap"><table><thead><tr><th>학급</th><th>총점</th><th>순위</th>${events.map(e=>`<th>${e.name}</th>`).join('')}</tr></thead><tbody>${Array.from({length:classCounts[g]},(_,i)=>i+1).map(c=>`<tr class="${rank[c]<=3?'rank'+rank[c]:''}"><td>${g}-${c}</td><td><b>${total(g,c)}</b></td><td>${rank[c]}위</td>${events.map(e=>`<td>${S.scores[g][c][e.key]}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;renderLeaders();renderClassPage()}
function renderLeaders(){document.getElementById('leaders').innerHTML=[1,2,3].map(g=>{let best={c:1,t:-1};for(let c=1;c<=classCounts[g];c++){const t=total(g,c);if(t>best.t)best={c,t}}return `<div class="leader"><small>${g}학년</small><b>${g}-${best.c}</b><span>${best.t}점 · 현재 선두</span></div>`}).join('')}
function renderPoints(){const markup=`<table><thead><tr><th>종목</th><th>1위</th><th>2위</th><th>3위</th><th>4위</th><th>그 외</th></tr></thead><tbody>${events.map(e=>`<tr><td>${e.name}</td>${e.pts.map(p=>`<td>${p||'-'}</td>`).join('')}</tr>`).join('')}</tbody></table>`;document.getElementById('pointTable').innerHTML=markup;document.getElementById('homePointTable').innerHTML=markup}
function renderEvents(){document.getElementById('eventGrid').innerHTML=eventRules.map(r=>`<article class="feature event-card"><span class="tag">${r[1]}</span><h3>${r[0]}</h3><ul>${r[2].map(x=>`<li>${x}</li>`).join('')}</ul></article>`).join('')}
function setupClassSelector(){const g=document.getElementById('classGrade');g.innerHTML=[1,2,3].map(x=>`<option value="${x}">${x}학년</option>`).join('');g.onchange=()=>setClassNos();setClassNos();document.getElementById('showClassBtn').onclick=renderClassPage}
function setClassNos(){const g=Number(document.getElementById('classGrade').value||1);document.getElementById('classNo').innerHTML=Array.from({length:classCounts[g]},(_,i)=>`<option value="${i+1}">${g}-${i+1}</option>`).join('')}
function renderClassPage(){const g=Number(document.getElementById('classGrade')?.value||1),c=Number(document.getElementById('classNo')?.value||1);let arr=[];for(let x=1;x<=classCounts[g];x++)arr.push({c:x,t:total(g,x)});arr.sort((a,b)=>b.t-a.t);const rank=arr.findIndex(x=>x.c===c)+1;document.getElementById('classPage').innerHTML=`<div class="class-hero"><span class="kicker">CLASS ${g}-${c}</span><h2>${g}학년 ${c}반</h2><p>우리 반의 경기와 점수를 한눈에 확인하세요.</p><div class="stat-row"><div class="stat"><small>현재 총점</small><b>${total(g,c)}점</b></div><div class="stat"><small>현재 순위</small><b>${rank}위</b></div><div class="stat"><small>참여 원칙</small><b>2~4종목</b></div></div></div><div class="section-head compact"><div><span class="kicker">SCORE DETAIL</span><h2>종목별 점수</h2></div></div><div class="table-wrap"><table><thead><tr><th>종목</th><th>점수</th></tr></thead><tbody>${events.map(e=>`<tr><td>${e.name}</td><td>${S.scores[g][c][e.key]}</td></tr>`).join('')}</tbody></table></div>`}
function renderSongs(){document.getElementById('songCount').textContent=S.songs.length+'곡';document.getElementById('songList').innerHTML=S.songs.length?S.songs.slice().reverse().map(s=>`<div class="stack-item"><div><b>🎵 ${esc(s.title)} · ${esc(s.artist)}</b><p>${esc(s.msg||'')}</p></div><small>${esc(s.req||'익명')}</small></div>`).join(''):'<div class="result-box">첫 신청곡을 기다리고 있어요.</div>'}
document.getElementById('submitSong').onclick=()=>{const title=document.getElementById('songTitle').value.trim(),artist=document.getElementById('songArtist').value.trim();if(!title||!artist)return alert('노래 제목과 가수를 입력해 주세요.');S.songs.push({title,artist,req:document.getElementById('songRequester').value.trim(),msg:document.getElementById('songMessage').value.trim()});localStorage.setItem('kd_final_songs',JSON.stringify(S.songs));['songTitle','songArtist','songRequester','songMessage'].forEach(id=>document.getElementById(id).value='');renderSongs()}
function renderMedia(){document.getElementById('mediaList').innerHTML=S.media.length?S.media.slice().reverse().map(m=>`<div class="stack-item"><div><b>📷 ${esc(m.who)}</b><p>${esc(m.memo)}</p></div><a href="${esc(m.link)}" target="_blank">열기</a></div>`).join(''):'<div class="result-box">등록된 사진·영상 제보가 없습니다.</div>'}
document.getElementById('submitMedia').onclick=()=>{const who=document.getElementById('mediaClass').value.trim(),link=document.getElementById('mediaLink').value.trim(),memo=document.getElementById('mediaMemo').value.trim();if(!link)return alert('공유 링크를 입력해 주세요.');S.media.push({who:who||'익명',link,memo});localStorage.setItem('kd_final_media',JSON.stringify(S.media));renderMedia()}
function renderNotices(){const data=S.notices.length?S.notices:[{title:'운영본부 안내',body:'경기 10분 전 해당 경기장 주변에서 대기해 주세요.',time:'기본 공지'},{title:'ALL PLAY 안전수칙',body:'준비운동, 운동화 착용, 심판 및 진행요원의 안내를 지켜 주세요.',time:'기본 공지'}];document.getElementById('noticeList').innerHTML=data.slice().reverse().map(n=>`<div class="stack-item"><div><b>📢 ${esc(n.title)}</b><p>${esc(n.body)}</p></div><small>${esc(n.time)}</small></div>`).join('')}

function setupFlags(){
  const fg=document.getElementById('flagGrade');
  fg.innerHTML=[1,2,3].map(x=>`<option value="${x}">${x}학년</option>`).join('');
  fg.onchange=setFlagClasses; setFlagClasses(); renderFlags();
}
function setFlagClasses(){
  const g=Number(document.getElementById('flagGrade').value||1);
  document.getElementById('flagClass').innerHTML=Array.from({length:classCounts[g]},(_,i)=>`<option value="${i+1}">${g}-${i+1}</option>`).join('');
}
function renderFlags(){
  const box=document.getElementById('flagGallery');
  const items=Object.entries(S.flags).sort((a,b)=>a[0].localeCompare(b[0],undefined,{numeric:true}));
  box.innerHTML=items.length?items.map(([k,v])=>`<article class="flag-card"><img src="${v.image}" alt="${k} 학급 깃발"><div class="flag-info"><b>${k}</b><p>${esc(v.caption||'경덕 ALL PLAY 학급 깃발')}</p></div></article>`).join(''):'<div class="flag-empty"><b>🚩 아직 등록된 학급 깃발이 없습니다.</b><br><small>관리자 화면에서 깃발 사진을 등록하면 이곳에 나타납니다.</small></div>';
}
document.getElementById('saveFlag').onclick=()=>{
  const file=document.getElementById('flagImage').files[0];
  if(!file)return alert('깃발 사진을 선택해 주세요.');
  if(file.size>1500000)return alert('사진 용량은 1.5MB 이하로 줄여서 등록해 주세요.');
  const g=document.getElementById('flagGrade').value,c=document.getElementById('flagClass').value,key=`${g}-${c}`;
  const reader=new FileReader();
  reader.onload=()=>{S.flags[key]={image:reader.result,caption:document.getElementById('flagCaption').value.trim()};localStorage.setItem('kd_final_flags',JSON.stringify(S.flags));renderFlags();renderStaffFlags();alert(`${key} 깃발을 등록했습니다.`)};
  reader.readAsDataURL(file);
}


const STAFF_PASS='allplay2026';

function fillClassSelect(gradeEl,classEl){
  const g=Number(gradeEl.value||1);
  classEl.innerHTML=Array.from({length:classCounts[g]},(_,i)=>`<option value="${i+1}">${g}-${i+1}</option>`).join('');
}
function setupStaffVote(){
  const loginBox=document.getElementById('staffLoginBox'), area=document.getElementById('staffVoteArea');
  const pass=document.getElementById('staffPassword'), msg=document.getElementById('staffLoginMsg');
  const unlock=()=>{
    if(pass.value!==STAFF_PASS){msg.textContent='비밀번호가 일치하지 않습니다.';return;}
    sessionStorage.setItem('kd_staff_ok','1'); loginBox.classList.add('hidden'); area.classList.remove('hidden'); msg.textContent=''; renderStaffFlags();
  };
  document.getElementById('staffLoginBtn').onclick=unlock;
  pass.addEventListener('keydown',e=>{if(e.key==='Enter')unlock()});
  document.getElementById('staffLogoutBtn').onclick=()=>{sessionStorage.removeItem('kd_staff_ok');pass.value='';area.classList.add('hidden');loginBox.classList.remove('hidden')};
  if(sessionStorage.getItem('kd_staff_ok')==='1'){loginBox.classList.add('hidden');area.classList.remove('hidden')}

  const fg=document.getElementById('flagVoteGrade'),fc=document.getElementById('flagVoteClass');
  const pg=document.getElementById('perfVoteGrade'),pc=document.getElementById('perfVoteClass');
  fg.innerHTML=pg.innerHTML=[1,2,3].map(g=>`<option value="${g}">${g}학년</option>`).join('');
  fg.onchange=()=>{fillClassSelect(fg,fc);renderStaffFlags()}; pg.onchange=()=>fillClassSelect(pg,pc);
  fillClassSelect(fg,fc);fillClassSelect(pg,pc);

  document.getElementById('perfVoteForm').innerHTML=['참여도','협동성','창의성','완성도','호응도'].map((x,i)=>`<div class="vote-box"><b>${x}</b><select id="pv${i}">${[20,18,16,14,12,10].map(v=>`<option value="${v}">${v}점</option>`).join('')}</select></div>`).join('');

  document.getElementById('submitFlagVote').onclick=()=>{
    const g=fg.value,c=fc.value,key=`${g}-${c}`;
    S.flagVotes[g]=key;localStorage.setItem('kd_flag_votes',JSON.stringify(S.flagVotes));
    document.getElementById('flagVoteMsg').textContent=`${g}학년 학급 깃발 투표: ${key} 저장 완료`;
  };
  document.getElementById('submitPerfVote').onclick=()=>{
    const g=pg.value,c=pc.value,key=`${g}-${c}`;
    const vals=[0,1,2,3,4].map(i=>Number(document.getElementById('pv'+i).value));
    S.perfVotes[key]=vals;localStorage.setItem('kd_perf_votes',JSON.stringify(S.perfVotes));
    document.getElementById('perfVoteMsg').textContent=`${key} 평가 저장 · 총점 ${vals.reduce((a,b)=>a+b,0)}점`;
  };
  renderStaffFlags();
}
function renderStaffFlags(){
  const box=document.getElementById('staffFlagGallery'); if(!box)return;
  const g=Number(document.getElementById('flagVoteGrade')?.value||1);
  const entries=Object.entries(S.flags).filter(([k])=>Number(k.split('-')[0])===g).sort((a,b)=>a[0].localeCompare(b[0],undefined,{numeric:true}));
  box.innerHTML=entries.length?entries.map(([k,v])=>`<button class="staff-flag-thumb" onclick="document.getElementById('flagVoteClass').value='${k.split('-')[1]}'"><img src="${v.image}" alt="${k} 깃발"><b>${k}</b><span>${esc(v.caption||'학급 깃발')}</span></button>`).join(''):`<div class="flag-empty">아직 ${g}학년 깃발 사진이 등록되지 않았습니다.</div>`;
}

function setupAdmin(){const g=document.getElementById('adminGrade');g.innerHTML=[1,2,3].map(x=>`<option value="${x}">${x}학년</option>`).join('');const e=document.getElementById('adminEvent');e.innerHTML=events.map(x=>`<option value="${x.key}">${x.name}</option>`).join('');g.onchange=setAdminClasses;setAdminClasses()}
function setAdminClasses(){const g=Number(document.getElementById('adminGrade').value||1);document.getElementById('adminClass').innerHTML=Array.from({length:classCounts[g]},(_,i)=>`<option value="${i+1}">${g}-${i+1}</option>`).join('')}
document.getElementById('adminLoginBtn').onclick=()=>{if(document.getElementById('adminPw').value==='allplay2026'){document.getElementById('adminLogin').classList.add('hidden');document.getElementById('adminPanel').classList.remove('hidden')}else alert('비밀번호가 다릅니다.')}
document.getElementById('saveScore').onclick=()=>{const g=Number(document.getElementById('adminGrade').value),c=Number(document.getElementById('adminClass').value),e=document.getElementById('adminEvent').value,s=Number(document.getElementById('adminScore').value||0);S.scores[g][c][e]=s;saveScores();renderScores();alert(`${g}-${c} 점수를 반영했습니다.`)}
document.getElementById('saveNotice').onclick=()=>{const title=document.getElementById('noticeTitle').value.trim(),body=document.getElementById('noticeBody').value.trim();if(!title||!body)return alert('제목과 내용을 입력해 주세요.');S.notices.push({title,body,time:new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'})});localStorage.setItem('kd_final_notices',JSON.stringify(S.notices));renderNotices();alert('공지 등록 완료')}
document.querySelectorAll('[data-section]').forEach(b=>b.onclick=()=>nav(b.dataset.section));document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>nav(b.dataset.go));function nav(id){document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.section===id));window.scrollTo({top:document.getElementById('nav').offsetTop,behavior:'smooth'})}
document.querySelectorAll('[data-grade]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-grade]').forEach(x=>x.classList.remove('active'));b.classList.add('active');S.grade=Number(b.dataset.grade);renderScores()})
let deferredPrompt=null;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;document.getElementById('installBar').classList.add('show')});document.getElementById('installBtn').onclick=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;document.getElementById('installBar').classList.remove('show')};if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
ensure();renderSchedule();renderScores();renderPoints();renderEvents();setupClassSelector();renderClassPage();renderSongs();renderMedia();renderNotices();setupAdmin();setupFlags();setupStaffVote();renderClock();setInterval(renderClock,30000);

function renderPosterDashboard(){
  const d=document.getElementById('posterDday');
  if(d){
    const target=new Date('2026-10-01T00:00:00'), now=new Date();
    const days=Math.ceil((target-new Date(now.getFullYear(),now.getMonth(),now.getDate()))/86400000);
    d.textContent=days>0?`D-${days}`:days===0?'D-DAY':'ALL PLAY';
  }
  const box=document.getElementById('posterRanks');
  if(box){
    box.innerHTML=[1,2,3].map(g=>{
      const arr=Array.from({length:classCounts[g]},(_,i)=>({c:i+1,t:total(g,i+1)})).sort((a,b)=>b.t-a.t).slice(0,3);
      return `<div class="dash-grade"><b>${g}학년</b>${arr.map((x,i)=>`<span>${['🥇','🥈','🥉'][i]} ${x.c}반 <strong>${x.t}점</strong></span>`).join('')}</div>`
    }).join('');
  }
}
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{const id=b.dataset.go;document.querySelector(`[data-section="${id}"]`)?.click();window.scrollTo({top:0,behavior:'smooth'})});

renderPosterDashboard();
