const $=id=>document.getElementById(id);
const CATS=[
 {id:'fixed',name:'קבועים ומנויים',c:'--s2',auto:1},
 {id:'fuel',name:'דלק',c:'--s3'},
 {id:'super',name:'סופר, פיצוציה וסיגריות',c:'--s5'},
 {id:'eat',name:'מסעדות ומשלוחים',c:'--s6'},
 {id:'shop',name:'קניות וטיפוח',c:'--s7'},
 {id:'cash',name:'מזומן',c:'--s8'},
 {id:'once',name:'חד-פעמי',c:'--s1'},
 {id:'adj',name:'התאמה לבנק',c:'--s4',auto:1}
];

const IP={
 fuel:'<path d="M3 22h12M4 9h10M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0V9.8a2 2 0 0 0-.6-1.4L18 5"/>',
 cart:'<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2 2h2l2.7 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L22 7H5.1"/>',
 food:'<path d="M3 2v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6a2 2 0 0 0 2 2h3Zm0 0v7"/>',
 bag:'<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>',
 cash:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
 spark:'<path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2Z"/>',
 repeat:'<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
 cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
 wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
 card:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
 aside:'<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
 trend:'<path d="M22 7 13.5 15.5l-5-5L2 17"/><path d="M16 7h6v6"/>',
 shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
 home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z"/>',
 check:'<path d="M20 6 9 17l-5-5"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 sliders:'<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
 layers:'<path d="m12 2 10 5-10 5L2 7Z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
 pie:'<path d="M21.2 15.9A10 10 0 1 1 8 2.8"/><path d="M22 12A10 10 0 0 0 12 2v10Z"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
 moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
 scale:'<path d="M12 3v18M7 21h10M3 7h18M6 7l-3 7a3 3 0 0 0 6 0Zm12 0-3 7a3 3 0 0 0 6 0Z"/>',
 day:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
 bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a2 2 0 0 0 3.4 0"/>'
};
const ic=(n,c)=>`<svg class="svg" viewBox="0 0 24 24" aria-hidden="true">${IP[n]}</svg>`;
const ico=(n,c,sm)=>`<span class="ico${sm?' sm':''}" style="--c:var(${c})">${ic(n)}</span>`;
const CI={adj:'scale',fixed:'repeat',fuel:'fuel',super:'cart',eat:'food',shop:'bag',cash:'cash',once:'spark'};
const CAT=Object.fromEntries(CATS.map(c=>[c.id,c]));
document.querySelectorAll('[data-ic]').forEach(e=>e.outerHTML=ic(e.dataset.ic));
document.querySelectorAll('[data-ico]').forEach(e=>e.outerHTML=ico(e.dataset.ico,e.dataset.c,1));
document.querySelectorAll('.wrap>*').forEach((e,i)=>e.style.setProperty('--i',Math.min(i,10)));
document.body.classList.add('intro','loading');

const nc=c=>c==='smoke'?'super':CAT[c]?c:'once'; // cigarettes are bought at the same super/kiosk, so they share one category
const pad=n=>String(n).padStart(2,'0');
const now=new Date(), TODAY=now.getFullYear()+'-'+pad(now.getMonth()+1)+'-'+pad(now.getDate());
let ST={}; // cycle start dates you set by hand, e.g. {'2026-10':'2026-10-07'}
let PD=10; // salary day: a budget cycle runs from this day to the day before it next month
const addM=(k,n)=>{const d=new Date(+k.slice(0,4),+k.slice(5)-1+n,1);return d.getFullYear()+'-'+pad(d.getMonth()+1)};
const cStart=k=>ST[k]||k+'-'+pad(PD);
const cyc=d=>{const k=d.slice(0,7),n=addM(k,1);return d>=cStart(n)?n:d>=cStart(k)?k:addM(k,-1)};
const cEnd=k=>{const s=cStart(addM(k,1)),e=new Date(+s.slice(0,4),+s.slice(5,7)-1,+s.slice(8)-1);return e.getFullYear()+'-'+pad(e.getMonth()+1)+'-'+pad(e.getDate())};
const defStart=k=>k+'-'+pad(PD);
let THIS=cyc(TODAY);
const MN=['ינואר','פברואר','מרץ','אפריל','מאי','יוני','יולי','אוגוסט','ספטמבר','אוקטובר','נובמבר','דצמבר'];
const mName=k=>{const s=cStart(k),e=cEnd(k);return `${+s.slice(8)}.${+s.slice(5,7)} עד ${+e.slice(8)}.${+e.slice(5,7)}`};
const fmt=n=>(n<0?'-':'')+'₪'+Math.abs(n).toLocaleString('en-US',{maximumFractionDigits:Math.abs(n)%1?2:0,minimumFractionDigits:Math.abs(n)%1?2:0});
const fmt0=n=>fmt(Math.round(n*100)/100);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const inside=el=>el.contains(document.activeElement);

const blank=()=>({income:0,cut:50,inv:90,incomes:{},budgets:{},fixed:[],plans:[],rules:{},asideDone:{},starts:{},asides:{},start:cyc(TODAY),payday:10});
let cfg=blank(), tx=[], loaded=false, cur=null, tab='C', fil=null, hl=null;

/* ---------- storage: this site's own API (see /api) ---------- */
const K=new URLSearchParams(location.search).get('k')||'';
let timer=null, lastJson='', busy=0;
function fail(e){const m=$('msg');m.hidden=false;m.textContent=e&&e.status===401?'המפתח בכתובת חסר או שגוי. פתח את הקישור המלא שקיבלת.':'השמירה נכשלה. בדוק חיבור ונסה שוב.'}
const DEMO=!K; // no key in the link: run on made-up data in this browser (demo.js)
async function api(path,method,body){
  if(DEMO) return window.taktzivDemo.api(path,method,body);
  const r=await fetch(path,{method:method||'GET',headers:{'x-key':K,'content-type':'application/json'},body:body?JSON.stringify(body):undefined,cache:'no-store'});
  if(!r.ok) throw {status:r.status};
  return r.json();
}
function take(s){const j=JSON.stringify([s.cfg,s.tx]);loaded=true;if(j===lastJson)return;lastJson=j;if(s.cfg)cfg=Object.assign(blank(),s.cfg);tx=s.tx||[];$('msg').hidden=true;render()}
async function call(path,method,body){busy++;let ok=true;try{take(await api(path,method,body))}catch(e){ok=false;fail(e)}busy--;return ok}
function pull(){if(busy||timer)return;call('/api/state')}
function saveCfg(){render();clearTimeout(timer);timer=setTimeout(()=>{timer=null;call('/api/state','PUT',{cfg})},400)}
const addTx=t=>call('/api/tx','POST',t);
const delTx=id=>call('/api/tx?id='+encodeURIComponent(id),'DELETE');
const recat=(id,cat)=>call('/api/tx','PATCH',{id,cat});
setTimeout(()=>document.body.classList.remove('intro'),2200);
setTimeout(()=>$('splash').classList.add('off'),2500);
pull(); setInterval(()=>{if(!document.hidden)pull()},20000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)pull()});

/* ---------- maths ---------- */
function fixedDate(f,m){const on=k=>k+'-'+pad(Math.min(f.day,new Date(+k.slice(0,4),+k.slice(5),0).getDate())),d=on(m);return d>=cStart(m)?d:on(addM(m,1))}
function fixedDue(m){
  if(m<(cfg.start||THIS)||m>THIS) return [];
  return cfg.fixed.filter(f=>fixedDate(f,m)<=TODAY);
}
const mDiff=(a,b)=>(+b.slice(0,4)-+a.slice(0,4))*12+(+b.slice(5)-+a.slice(5));
function plansDue(m){
  if(m>THIS) return [];
  return (cfg.plans||[]).map(p=>{const i=mDiff(p.s,m);if(i<0||i>=p.n)return null;const d=fixedDate(p,m);
    return d<=TODAY?{d,a:+p.a,cat:nc(p.cat),note:`${p.t} · תשלום ${i+1} מתוך ${p.n}`}:null}).filter(Boolean);
}
const planPaid=p=>{let k=0;for(let i=0;i<p.n;i++)if(fixedDate(p,addM(p.s,i))<=TODAY)k++;return k};
// a purchase from a business tied to a fixed charge (e.g. the barber) is already covered by that charge, so it is listed but never counted twice
// what you told the app the bank really shows: the gap is kept as one line per cycle and counted like spending (minus = money came back)
const onVisa=t=>t.src==='applepay'&&((cfg.vtx||{})[t.id]!=null?!!cfg.vtx[t.id]:!!(cfg.visaCard&&t.card&&t.card.toLowerCase().includes(cfg.visaCard.toLowerCase())));
const coverOf=t=>(cfg.fixed||[]).find(f=>f.m&&new RegExp(f.m,'i').test(t.note||''));
function monthData(m){
  const list=tx.filter(t=>t.d&&cyc(t.d)===m), by={}; let tot=0;
  for(const t of list){if(coverOf(t)||onVisa(t))continue;const c=nc(t.cat);by[c]=(by[c]||0)+ +t.a;tot+= +t.a}
  return {list,by,tot};
}
// fixed charges and instalments are known in advance: taken off the living money up front, never shown as spending
// most fixed charges ride on the Visa bill; once you type the real Visa amount it replaces them (it already includes them plus any extras)
const visa=m=>+((cfg.visa||{})[m]||0);
const r2=x=>Math.round(x*100)/100;
function resv(m){const on=m>=(cfg.start||THIS),fv=on?cfg.fixed.filter(x=>!x.nv&&!x.m).reduce((a,x)=>a+ +x.a,0):0,fb=on?cfg.fixed.filter(x=>x.nv&&!x.m).reduce((a,x)=>a+ +x.a,0):0,fr=on?cfg.fixed.filter(x=>x.m).reduce((a,x)=>a+ +x.a,0):0,
  p=(cfg.plans||[]).reduce((a,x)=>{const i=mDiff(x.s,m);return a+(i>=0&&i<x.n?+x.a:0)},0),v=visa(m);
  return {fv:r2(fv),fb:r2(fb),fr:r2(fr),p:r2(p),v,card:v>0?v:r2(fv),tot:r2((v>0?v:fv)+fb+fr+p)}}
const fixT=m=>resv(m).tot;
const resLine=m=>{const r=resv(m);return (r.v?`ויזה <span class="n">${fmt(r.v)}</span>`:`קבועים בויזה <span class="n">${fmt(r.fv)}</span> (עד שתזין את הויזה)`)+(r.fb?` · הוראות קבע <span class="n">${fmt(r.fb)}</span>`:'')+(r.p?` · תשלומים <span class="n">${fmt(r.p)}</span>`:'')};
const inc=m=>cfg.incomes&&cfg.incomes[m]!=null?+cfg.incomes[m]:+(cfg.income||0);
const split=m=>{const i=inc(m),o=cfg.asides&&cfg.asides[m],c=o!=null?Math.min(Math.max(+o,0),i||+o):Math.round(i*(cfg.cut||0)/100),v=Math.round(c*(cfg.inv||0)/100);return {inc:i,cutAmt:c,invest:v,reserve:c-v,living:i-c}};
const baseBudget=id=>id==='fixed'&&cfg.budgets.fixed==null?Math.round(cfg.fixed.reduce((a,f)=>a+ +f.a,0)):+(cfg.budgets[id]||0);
const budget=(id,m=cur)=>id==='once'?split(m).living-fixT(m)-CATS.filter(c=>c.id!=='once'&&c.id!=='fixed').reduce((a,c)=>a+baseBudget(c.id),0):baseBudget(id);


let shown=null;
function countTo(el,to){if(shown===to){el.textContent=fmt0(to);return}
  const from=shown==null?0:shown,first=shown==null;shown=to;
  if(RM0.matches){el.textContent=fmt0(to);return}
  if(!first){el.classList.remove('bump');void el.offsetWidth;el.classList.add('bump')}
  const t0=performance.now(),D=first?900:500;
  const f=t=>{const p=Math.min((t-t0)/D,1),e=1-Math.pow(1-p,3);el.textContent=fmt0(from+(to-from)*e);if(p<1&&shown===to)requestAnimationFrame(f)};requestAnimationFrame(f)}
const RM0=matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- the bank balance: what is really left = what the bank shows minus what is still on its way out ---------- */
const txTime=t=>+t.ts||parseInt(String(t.id).slice(0,8),36)||0;
const isDebit=t=>!onVisa(t); // direct card, cash and manual entries leave the bank now; the regular credit card leaves it inside next month's Visa bill
const anchor=()=>{const b=cfg.bank;return b&&b.d&&b.d>=cStart(THIS)&&b.d<=TODAY?b:null};
const bankDue=(m,from)=>cfg.fixed.filter(f=>f.nv&&!f.m).map(f=>({f,d:fixedDate(f,m)})).filter(x=>x.d>from&&x.d<=cEnd(m));
function reserves(m){return cfg.fixed.filter(f=>f.m).map(f=>{const re=new RegExp(f.m,'i'),used=tx.filter(t=>t.d&&cyc(t.d)===m&&re.test(t.note||'')).reduce((a,t)=>a+ +t.a,0);return {f,used:r2(used),left:r2(Math.max(0,+f.a-used))}})}
function flowOf(b,m=THIS){
  const r=resv(m),SP=split(m),pend=new Set(b.pend||[]);
  const after=tx.filter(t=>isDebit(t)&&txTime(t)>b.ts),before=tx.filter(t=>isDebit(t)&&txTime(t)<=b.ts&&pend.has(t.id));
  const A=r2(after.reduce((a,t)=>a+ +t.a,0)),P=r2(before.reduce((a,t)=>a+ +t.a,0));
  const V=b.visaIn?0:r2(r.v>0?r.v:r.fv+r.p), due=bankDue(m,b.d), F=r2(due.reduce((a,x)=>a+ +x.f.a,0));
  const R=reserves(m), Rs=r2(R.reduce((a,x)=>a+x.left,0)), S=b.asideIn?0:SP.cutAmt;
  return {b,A,P,V,F,due,R,Rs,S,est:!(r.v>0),left:r2(+b.amt-A-P-V-F-Rs-S)};
}

// the big number rolls digit by digit, like a counter
function roll(el,txt){if(el.dataset.t===txt)return;const first=!el.dataset.t;el.dataset.t=txt;el.setAttribute('aria-label',txt);
  const ch=[...txt],same=el.dataset.mode==='roll'&&el.children.length===ch.length&&ch.every((c,i)=>/[0-9]/.test(c)===el.children[i].classList.contains('dg'));
  if(!same){el.innerHTML=ch.map(c=>/[0-9]/.test(c)?`<span class="dg"><span class="st">${[...'0123456789'].map(x=>`<i>${x}</i>`).join('')}</span></span>`:`<span class="ch">${c}</span>`).join('');el.dataset.mode='roll';void el.offsetWidth}
  [...el.children].forEach((s,i)=>{const c=ch[i];if(s.classList.contains('dg')){s.firstChild.style.transitionDelay=(first?i*60:0)+'ms';s.firstChild.style.transform=`translateY(${-(+c)}em)`}else s.textContent=c});
  if(!first){el.classList.remove('bump');void el.offsetWidth;el.classList.add('bump')}}
function confetti(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const cols=['#4338ca','#6d28d9','#a5b4fc','#34d399','#fbbf24'];
  for(let i=0;i<46;i++){const d=document.createElement('i');d.className='conf';d.style.left=Math.random()*100+'vw';d.style.background=cols[i%cols.length];
    d.style.setProperty('--x',(Math.random()*120-60)+'px');d.style.setProperty('--r',(Math.random()*720-360)+'deg');d.style.setProperty('--t',(1.1+Math.random()*1.1)+'s');d.style.animationDelay=Math.random()*.25+'s';document.body.appendChild(d);setTimeout(()=>d.remove(),2800)}}
/* ---------- render ---------- */
function render(){
  PD=Math.min(Math.max(+cfg.payday||10,1),28); ST=cfg.starts||{}; THIS=cyc(TODAY);
  cur=THIS;
  const SP=split(cur), D=monthData(cur), FX=fixT(cur), TB=SP.living-FX, BK=anchor(), FL=BK?flowOf(BK):null, left=FL?FL.left:TB-D.tot, isCur=cur===THIS;
  const dS=new Date(cStart(cur)), dim=Math.round((new Date(cEnd(cur))-dS)/864e5)+1, dayN=Math.min(Math.max(Math.round((new Date(TODAY)-dS)/864e5)+1,1),dim), pace=isCur?dayN/dim:1;

  $('leftLbl').textContent=isCur?'נשאר עד המשכורת הבאה':'נשאר במחזור '+mName(cur);
  {const hr=new Date().getHours();$('hello').innerHTML=ic(hr>=6&&hr<18?'sun':'moon')+(hr<12&&hr>=5?'בוקר טוב':hr<18&&hr>=12?'צהריים טובים':'ערב טוב')+(cfg.name?', '+esc(cfg.name):'');
   $('dayOf').textContent=isCur?`יום ${dayN} מתוך ${dim}`:'';}
  $('hero').classList.toggle('bad',loaded&&left<0);
  {const pd=$('perDay');pd.hidden=!(loaded&&isCur&&left>0);pd.innerHTML=ic('day')+`כ-<span class="n">${fmt0(left/Math.max(dim-dayN+1,1))}</span> ליום`}
  const L=$('left'); L.className='big n'+(left<0?' neg':''); if(loaded)roll(L,fmt0(left)); else L.textContent='…';
  if(loaded){document.body.classList.remove('loading');$('splash').classList.add('off')}
  {const spent=D.tot,base=spent+Math.max(left,0),use=base?Math.min(spent/base,1):0,day=isCur?pace:1;
   $('ringUse').style.strokeDashoffset=String(169.6*(1-use));$('ringDay').style.strokeDashoffset=String(125.7*(1-day));$('ringTxt').textContent=Math.round(use*100)+'%';
   const st=$('status');st.hidden=!loaded||!isCur;st.className='status'+(left<0?' bad':use>day+.08?' fast':'');st.innerHTML='<i></i>'+(left<0?'חריגה מהתקציב':use>day+.08?'מוציא מהר מהקצב':'בקצב טוב');
   const cnt=t=>!coverOf(t)&&!onVisa(t),wk=new Date(new Date(TODAY)-6*864e5),w=wk.getFullYear()+'-'+pad(wk.getMonth()+1)+'-'+pad(wk.getDate());
   const q=$('quick');q.hidden=!loaded||!isCur;
   $('qToday').textContent=fmt0(tx.filter(t=>t.d===TODAY&&cnt(t)).reduce((a,t)=>a+ +t.a,0));
   $('qWeek').textContent=fmt0(tx.filter(t=>t.d>=w&&t.d<=TODAY&&t.d>=cStart(cur)&&cnt(t)).reduce((a,t)=>a+ +t.a,0));
   $('qAvg').textContent=fmt0(spent/Math.max(dayN,1));}
  renderPace(cur,D,left,dim,dayN,isCur);
  renderDash(SP,D,left,dayN,isCur,pace);
  $('leftSub').innerHTML=!loaded?'טוען נתונים…':!TB?'הזן את המשכורת כדי לקבל תקציב.':'';$('leftSub').hidden=loaded&&!!TB;

  {const r=resv(cur),row=(icn,col,t,v,cls)=>`<div class="rowi${cls?' '+cls:''}"><span>${ico(icn,col,1)}${t}</span><span class="n${v<0?' m':''}">${typeof v==='string'?v:fmt(v)}</span></div>`,dd=d=>`${+d.slice(8)}.${+d.slice(5,7)}`;
   const tail=row('aside','--s7','לצד מהמשכורת',(SP.inc?Math.round(SP.cutAmt/SP.inc*100):0)+'%')+row('trend','--s6','מתוך זה להשקעות',cfg.inv+'%');
   $('detTot').textContent=loaded?fmt(left):'';
   $('det').innerHTML=!loaded?'<p class="empty">טוען…</p>':FL?
     row('wallet','--s3',`בבנק ב-${dd(FL.b.d)}`,+FL.b.amt)+
     (FL.A?row('cart','--s5','קניות מאז',-FL.A):'')+
     (FL.P?row('cart','--s5','קניות שעוד לא ירדו מהבנק',-FL.P):'')+
     (FL.V?row('card','--s2',FL.est?'ויזה שעוד תרד (הערכה, עד שתזין)':'ויזה שעוד תרד',-FL.V):'')+
     FL.due.map(x=>row('repeat','--s2',`${esc(x.f.n)} (ב-${dd(x.d)})`,-x.f.a)).join('')+
     FL.R.filter(x=>x.left).map(x=>row('repeat','--s2',`שמור ל${esc(x.f.n)} (נשאר מתוך ${fmt0(x.f.a)})`,-x.left)).join('')+
     (FL.S?row('aside','--s7','להעביר לצד',-FL.S):'')+
     row('check','--good','נשאר עד המשכורת',FL.left,'det-tot')+
     row('cart','--s5','הוצאת החודש (לפי סעיפים)',D.tot)+tail
   :
     row('home','--s5','מחיה',SP.living)+
     row('card','--s2',r.v?'ויזה (כולל הקבועים שבה)':'קבועים בויזה (עד שתזין את הויזה)',-r.card)+
     (r.fb?row('repeat','--s2','הוראות קבע מהבנק',-r.fb):'')+
     (r.fr?row('repeat','--s2','שמור לחיובים בדביט (ספר)',-r.fr):'')+
     (r.p?row('layers','--s1','תשלומים',-r.p):'')+
     row('wallet','--s3','תקציב להוצאות החודש',TB,'det-tot')+
     row('cart','--s5','הוצאות שנרשמו',-D.tot)+
     row('check','--good','נשאר (הערכה, בלי יתרה מהבנק)',left,'det-tot')+tail}
  {const base=D.tot+Math.max(left,0);$('totBar').style.width=(base?Math.min(D.tot/base,1)*100:0)+'%'}
  renderTodo(SP,D,BK);
  {const L2=$('bankLbl');L2.textContent=BK?`יתרה בבנק · ${BK.d===TODAY?'עודכן היום':'עודכן '+(+BK.d.slice(8))+'.'+(+BK.d.slice(5,7))}`:'עדכן יתרה בבנק'}
  $('totBar').style.background=left<0?'var(--over)':'var(--accent)';
  $('totPace').hidden=!isCur; $('totPace').style.insetInlineStart=(pace*100)+'%';

  const entered=cfg.incomes&&cfg.incomes[cur]!=null;
  {const s=cStart(cur);$('mincLbl').textContent=`סכום שנכנס ב-${+s.slice(8)}.${+s.slice(5,7)}`;if(document.activeElement!==$('mstart'))$('mstart').value=s}
  if(document.activeElement!==$('minc')) $('minc').value=entered?SP.inc:'';
  $('minc').placeholder=cfg.income?fmt0(cfg.income):'הזן סכום';
  {const own=cfg.asides&&cfg.asides[cur]!=null;if(document.activeElement!==$('mcut'))$('mcut').value=own?SP.cutAmt:'';$('mcut').placeholder=fmt0(Math.round(SP.inc*(cfg.cut||0)/100))+` (${cfg.cut}%)`}
  if(document.activeElement!==$('mvisa'))$('mvisa').value=visa(cur)||'';
  $('salTot').textContent=`${fmt0(SP.inc)} · לצד ${fmt0(SP.cutAmt)}`; $('chartTot').textContent=fmt0(D.tot);
  $('asideAmt').textContent=fmt0(SP.invest); $('resAmt').textContent=fmt0(SP.reserve); $('liveAmt').textContent=fmt0(SP.living);
  $('asideSw').checked=!!cfg.asideDone[cur];
  $('splitLine').hidden=entered; $('splitLine').textContent='המשכורת למחזור הזה עוד לא הוזנה, החישוב לפי ברירת המחדל.';

  // donut + list
  const items=CATS.map(c=>({c,v:D.by[c.id]||0})).filter(x=>x.v>0).sort((a,b)=>b.v-a.v);
  const top=items.slice(0,5), rest=items.slice(5), restV=rest.reduce((a,x)=>a+x.v,0);
  const segs=top.map(x=>({id:x.c.id,name:x.c.name,v:x.v,col:`var(${x.c.c})`})); if(restV) segs.push({id:'_rest',name:'קטגוריות נוספות',v:restV,col:'var(--s0)'});
  const R=78,C=2*Math.PI*R; let acc=0;
  const arcs=segs.map(s=>{const f=s.v/D.tot,len=Math.max(f*C-2.5,1),off=-acc*C;acc+=f;
    return `<circle class="seg-a${hl===s.id?' on':''}" data-s="${s.id}" cx="110" cy="110" r="${R}" fill="none" stroke="${s.col}" stroke-width="24" stroke-dasharray="${len} ${C}" stroke-dashoffset="${off}" transform="rotate(-90 110 110)"><title>${s.name}: ${fmt(s.v)}</title></circle>`}).join('');
  const sel=segs.find(s=>s.id===hl);
  $('paneC').className='viz'+(sel?' hl':'');
  $('paneC').innerHTML=`<svg viewBox="0 0 220 220" role="img" aria-label="חלוקת ההוצאות לפי קטגוריה">
      <circle cx="110" cy="110" r="${R}" fill="none" stroke="var(--track)" stroke-width="24"/>${arcs}
      <text class="ct2" x="110" y="100" text-anchor="middle" font-size="13">${sel?esc(sel.name):'הוצאות במחזור'}</text>
      <text class="ct" x="110" y="130" text-anchor="middle" font-size="26" font-weight="700" letter-spacing="-.5" direction="ltr">${fmt0(sel?sel.v:D.tot)}</text>
    </svg>
    <div class="leg">${segs.map(s=>`<button type="button" class="press" data-s="${s.id}"><span class="dot" style="background:${s.col}"></span><span class="n">${fmt(s.v)}</span><span class="nm">${s.name}</span></button>`).join('')||`<span class="sec">${loaded?'עדיין אין הוצאות במחזור הזה.':'טוען…'}</span>`}</div>`;

  // months
  const ms=[];for(let k=5;k>=0;k--)ms.push(addM(THIS,-k));
  const vals=ms.map(m=>monthData(m).tot), mx=Math.max(TB,...vals,1)*1.12, W=320,H=180,bw=30,gap=(W-40-bw*6)/5, y=v=>H-24-(v/mx)*(H-44);
  $('paneM').innerHTML=`<svg viewBox="0 0 ${W} ${H}" style="width:100%" role="img" aria-label="הוצאות לפי מחזור מול התקציב">
    ${TB?`<line x1="8" x2="${W-8}" y1="${y(TB)}" y2="${y(TB)}" stroke="var(--sec)" stroke-dasharray="4 4"/><text class="ct2" x="${W-8}" y="${y(TB)-5}" font-size="11" text-anchor="start" direction="rtl">תקציב ${fmt0(TB)}</text>`:''}
    ${ms.map((m,i)=>{const x=W-20-bw-i*(bw+gap),v=vals[i],h=Math.max(H-24-y(v),v?2:0);
      return `<g class="mb" data-m="${m}"><rect x="${x}" y="${y(v)}" width="${bw}" height="${h}" rx="4" fill="${v>TB&&TB?'var(--over)':'var(--s1)'}" opacity="${m===cur?1:.5}"><title>${mName(m)}: ${fmt0(v)}</title></rect>
        ${v&&(m===cur||v===Math.max(...vals))?`<text class="ct" x="${x+bw/2}" y="${y(v)-5}" font-size="11" font-weight="700" text-anchor="middle" direction="ltr">${fmt0(v)}</text>`:''}
        <text class="ct2" x="${x+bw/2}" y="${H-6}" font-size="11" text-anchor="middle">${MN[+m.slice(5)-1].slice(0,3)}</text></g>`}).join('')}
    <line x1="8" x2="${W-8}" y1="${H-24}" y2="${H-24}" stroke="var(--line)"/></svg>
    <div class="note">לחיצה על עמודה מציגה את המחזור שלה. מחזור שחרג מהתקציב מסומן באדום.</div>`;
  $('paneC').hidden=tab!=='C'; $('paneM').hidden=tab!=='M';
  $('seg').className='seg'+(tab==='M'?' m':'');
  $('tabC').setAttribute('aria-selected',tab==='C'); $('tabM').setAttribute('aria-selected',tab==='M');

  // budgets
  $('cats').innerHTML=CATS.filter(c=>!c.auto).map(c=>{const s=D.by[c.id]||0,b=budget(c.id),ov=s>b,w=b>0?Math.min(s/b,1)*100:(s?100:0);
    return `<button type="button" class="crow${fil===c.id?' on':''}" data-f="${c.id}"><span class="cn">${ico(CI[c.id],c.c)}${short(c)}</span>
      <span class="cv"><span class="n${ov?' over':''}">${fmt0(s)}</span><span class="sec"> / <span class="n">${fmt0(b)}</span></span>${b>0?`<span class="left${ov?' over':s/b>=.8?' warn':''}">${ov?'חריגה '+fmt0(s-b):'נשארו '+fmt0(b-s)}</span>`:''}</span>
      <span class="bar"><i style="width:${w}%;background:${ov?'var(--over)':b>0&&s/b>=.8?'var(--warn)':`var(${c.c})`}"></i>${isCur&&!c.auto?`<b style="inset-inline-start:${pace*100}%"></b>`:''}</span></button>`}).join('');
  if(!inside($('buds'))) $('buds').innerHTML=CATS.filter(c=>c.id!=='adj').map(c=>`<label class="rowi" for="b-${c.id}"><span>${c.name}</span><input type="number" id="b-${c.id}" data-b="${c.id}" value="${budget(c.id)}" min="0" step="10" inputmode="numeric"${c.id==='once'?' disabled':''}></label>`).join('');

  // fixed charges
  $('fixTot').textContent=fmt(cfg.fixed.reduce((a,f)=>a+ +f.a,0));
  {const r=resv(cur);$('fixNote').textContent=`בויזה ${fmt(r.fv)} · בהוראת קבע מהבנק ${fmt(r.fb)}${r.fr?` · שמור לדביט ${fmt(r.fr)}`:''}. כשתזין "ירד בויזה החודש", הסכום מחליף את הקבועים שבויזה. הקשה על "ויזה"/"בנק" מחליפה.`}
  if(!inside($('fixed'))) $('fixed').innerHTML=cfg.fixed.map((f,i)=>`<div class="rowi"><span>${esc(f.n)} <span class="sec">· ב-${f.day} · </span><button type="button" class="tlink press" style="font-size:.8125rem;padding:0" data-fv="${i}">${f.m?'שמור, דביט':f.nv?'בנק':'ויזה'}</button></span><span style="display:flex;align-items:center;gap:.6rem"><input type="number" id="f-${i}" data-fi="${i}" value="${f.a}" min="0" step="0.01" inputmode="decimal" aria-label="סכום ${esc(f.n)}" style="width:5.5rem"><button type="button" class="del press" data-fx="${i}" aria-label="הסר ${esc(f.n)}">✕</button></span></div>`).join('')||`<p class="empty">${loaded?'אין חיובים קבועים.':'טוען…'}</p>`;

  // instalments
  const act=(cfg.plans||[]).map((p,i)=>({p,i,left:p.n-planPaid(p)}));
  const mo=act.filter(x=>x.left>0).reduce((a,x)=>a+ +x.p.a,0);
  $('planTot').textContent=mo?fmt(mo)+' לחודש':'';
  $('plans').innerHTML=act.map(x=>`<div class="rowi"><span>${esc(x.p.t)}<br><span class="sec" style="font-size:.8125rem">${fmt(+x.p.a)} לחודש · ${x.left>0?'נשארו '+x.left+' מתוך '+x.p.n:'הסתיים'}</span></span><span style="display:flex;align-items:center;gap:.6rem"><span class="n">${fmt(Math.round(x.left*x.p.a*100)/100)}</span><button type="button" class="del press" data-px="${x.i}" aria-label="הסר ${esc(x.p.t)}">✕</button></span></div>`).join('')||`<p class="empty">${loaded?'אין תשלומים פעילים.':'טוען…'}</p>`;

  if(!$('mview').hidden) renderMonths();

  if(document.activeElement!==$('vcard'))$('vcard').value=cfg.visaCard||'';
  for(const id of ['income','cut','inv','payday']) if(document.activeElement!==$(id)) $(id).value=id==='payday'?PD:(cfg[id]||(id==='income'?'':0));
}


/* ---------- what is still missing this cycle ---------- */
/* ---------- pace: spending so far vs. an even spread to payday ---------- */
// Time runs right to left, like the rest of the RTL interface. Spending counts the same purchases as monthData().
function renderPace(cur,D,left,dim,dayN,isCur){
  const box=$('pace'),base=D.tot+Math.max(left,0);
  box.hidden=!loaded||!isCur||!(base>0);
  if(box.hidden)return;
  const s=cStart(cur),daily=new Array(dim+1).fill(0);
  for(const t of D.list){if(coverOf(t)||onVisa(t))continue;const i=Math.round((new Date(t.d)-new Date(s))/864e5)+1;if(i>=1&&i<=dim)daily[i]+= +t.a}
  const cum=[0];for(let i=1;i<=dayN;i++)cum.push(cum[i-1]+daily[i]);
  const spent=cum[dayN],rate=spent/Math.max(dayN,1),projEnd=rate*dim;
  const W=320,H=104,top=12,pad=8,ymax=Math.max(base,projEnd,spent)*1.08||1;
  const X=d=>W-pad-(d/dim)*(W-2*pad),Y=v=>top+H-(v/ymax)*H;
  const line=cum.map((v,i)=>`${i?'L':'M'}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(' ');
  const over=projEnd>base;
  const dd=k=>{const d=new Date(new Date(s).getTime()+(k-1)*864e5);return `${d.getDate()}.${d.getMonth()+1}`};
  $('paceSvg').innerHTML=
    `<line class="grid" x1="${pad}" x2="${W-pad}" y1="${Y(0)}" y2="${Y(0)}"/>`+
    `<line class="cap" x1="${pad}" x2="${W-pad}" y1="${Y(base)}" y2="${Y(base)}"/>`+
    `<text x="${pad}" y="${Y(base)-4}" direction="rtl" text-anchor="end">תקציב ${fmt(Math.round(base))}</text>`+
    `<path class="even" d="M${X(0)} ${Y(0)} L${X(dim)} ${Y(base)}"/>`+
    `<path class="area" d="${line} L${X(dayN)} ${Y(0)} L${X(0)} ${Y(0)} Z"/>`+
    `<path class="act" d="${line}"/>`+
    (dayN<dim?`<path class="proj${over?' over':''}" d="M${X(dayN)} ${Y(spent)} L${X(dim)} ${Y(projEnd)}"/>`:'')+
    `<circle class="now" cx="${X(dayN)}" cy="${Y(spent)}" r="4.5"/>`+
    `<text x="${W-pad}" y="${top+H+14}" text-anchor="end">${dd(1)}</text>`+
    `<text x="${pad}" y="${top+H+14}" text-anchor="start">${dd(dim)}</text>`;
  const t=$('paceTxt');
  if(spent>base){t.className='warn';t.textContent=`חרגת ב-${fmt(Math.round(spent-base))}`}
  else if(over){const k=Math.ceil(base/rate);t.className='warn';t.textContent=`בקצב הזה הכסף ייגמר ב-${dd(k)}`}
  else{t.className='';t.textContent=`בקצב הזה יישארו כ-${fmt(Math.round(base-projEnd))} בסוף המחזור`}
}

/* ---------- the board: gauge, salary, the stack of charges, latest expenses, money set aside ---------- */
let pileOn=null;
function renderDash(SP,D,left,dayN,isCur,pace){
  const show=loaded&&isCur;
  for(const id of ['gauge','sal','stackc','recent','asidec']) $(id).hidden=!show;
  if(!show) return;
  // gauge: how much of the money for this cycle is already gone, with a tick for how far the cycle has gone
  {const base=D.tot+Math.max(left,0),use=base?Math.min(D.tot/base,1):0,LEN=204.2,over=left<0;
   $('gauge').classList.toggle('over',over);
   $('gAmt').textContent=fmt0(D.tot);
   $('gNote').textContent=over?`חריגה של ${fmt0(-left)}`:use>pace+.08?`${Math.round((use-pace)*100)}% מעל הקצב`:`בתוך התקציב, יום ${dayN}`;
   $('gArc').style.strokeDashoffset=String(LEN*(1-use));
   const a=Math.PI*(1-pace),x=80+Math.cos(a),cx=80+65*Math.cos(a),cy=78-65*Math.sin(a),ox=80+78*Math.cos(a),oy=78-78*Math.sin(a);
   $('gTick').setAttribute('x1',cx.toFixed(1));$('gTick').setAttribute('y1',cy.toFixed(1));$('gTick').setAttribute('x2',ox.toFixed(1));$('gTick').setAttribute('y2',oy.toFixed(1));
   $('gPct').textContent=Math.round(use*100)+'%';}
  // salary
  $('sAmt').textContent=fmt0(SP.inc);
  $('sAside').textContent=fmt0(SP.cutAmt);$('sInv').textContent=fmt0(SP.invest);$('sLive').textContent=fmt0(SP.living);
  // the charges that leave the bank on their own
  {const r=resv(THIS);$('pV').textContent=fmt0(r.card);$('pF').textContent=fmt0(r.fb+r.fr);$('pP').textContent=fmt0(r.p);
   document.querySelectorAll('.payc').forEach(c=>c.classList.toggle('on',c.dataset.p===pileOn));}
  // latest expenses
  {const list=D.list.slice().sort((a,b)=>(b.d.localeCompare(a.d))||(txTime(b)-txTime(a))).slice(0,4);
   $('recList').innerHTML=list.map(t=>{const c=CAT[nc(t.cat)];return `<div class="rec"><i style="--c:var(${c.c})"></i><div><b>${esc(t.note||c.name)}</b><small>${+t.d.slice(8)}.${+t.d.slice(5,7)}</small></div><span class="n">${fmt(+t.a)}</span></div>`}).join('')||'<p class="empty">עדיין אין הוצאות במחזור הזה.</p>';}
  // money set aside
  {const done=!!cfg.asideDone[THIS];$('asidec').classList.toggle('done',done);
   $('aTitle').textContent=done?'הכסף בצד':'שמים בצד';
   $('aText').innerHTML=done?`העברת <span class="n">${fmt0(SP.cutAmt)}</span> החודש`:`להעביר <span class="n">${fmt0(SP.cutAmt)}</span> מהמשכורת`;
   $('aBtn').textContent=done?'ביטול הסימון':'העברתי';}
  // mini bars in the stat cards
  {const dayTotal=k=>{const d=new Date(new Date(TODAY)-k*864e5),s=d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());return tx.filter(t=>t.d===s&&!coverOf(t)&&!onVisa(t)).reduce((a,t)=>a+ +t.a,0)};
   const week=[6,5,4,3,2,1,0].map(dayTotal),mx=Math.max(...week,1),bars=(arr,m)=>arr.map(v=>`<i class="${v?'':'off'}" style="height:${Math.max(v/m*100,14)}%"></i>`).join('');
   $('spToday').innerHTML=bars(week.slice(-3),mx);$('spWeek').innerHTML=bars(week,mx);$('spAvg').innerHTML=bars(week.map(()=>D.tot/Math.max(dayN,1)),mx);}
}
$('pile').addEventListener('click',e=>{const c=e.target.closest('.payc');if(!c)return;pileOn=pileOn===c.dataset.p?null:c.dataset.p;document.querySelectorAll('.payc').forEach(x=>x.classList.toggle('on',x.dataset.p===pileOn))});
$('pileBtn').addEventListener('click',()=>{$('salBox').open=true;$('salBox').scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>$('mvisa').focus({preventScroll:true}),350)});
$('aBtn').addEventListener('click',()=>{const s=$('asideSw');s.checked=!s.checked;s.dispatchEvent(new Event('change',{bubbles:true}))});
$('allTx').addEventListener('click',()=>openMonths(THIS));

/* ---------- search: any expense, from any cycle, opens its month ---------- */
function runSearch(){
  const q=$('q').value.trim().toLowerCase(),box=$('qRes');
  if(!q){box.hidden=true;return}
  const hit=tx.filter(t=>t.d&&((t.note||'').toLowerCase().includes(q)||CAT[nc(t.cat)].name.includes(q))).sort((a,b)=>b.d.localeCompare(a.d)).slice(0,8);
  box.innerHTML=hit.map(t=>{const c=CAT[nc(t.cat)];return `<button type="button" data-m="${cyc(t.d)}"><i style="--c:var(${c.c})"></i><span><b>${esc(t.note||c.name)}</b><small>${+t.d.slice(8)}.${+t.d.slice(5,7)} · ${c.name}</small></span><span class="n">${fmt(+t.a)}</span></button>`}).join('')||'<p>לא נמצאו הוצאות</p>';
  box.hidden=false;
}
$('q').addEventListener('input',runSearch);
$('q').addEventListener('focus',runSearch);
$('q').addEventListener('keydown',e=>{if(e.key==='Escape'){$('q').value='';$('qRes').hidden=true}});
$('qRes').addEventListener('click',e=>{const b=e.target.closest('[data-m]');if(!b)return;$('qRes').hidden=true;$('q').value='';openMonths(b.dataset.m)});
document.addEventListener('click',e=>{if(!e.target.closest('.search'))$('qRes').hidden=true});
$('bell').addEventListener('click',()=>{const t=$('todo');if(t.hidden){toast('הכל מסודר החודש');return}t.scrollIntoView({behavior:'smooth',block:'center'})});

function renderTodo(SP,D,BK){
  if(!loaded){$('todo').hidden=true;return}
  const age=BK?Math.round((new Date(TODAY)-new Date(BK.d))/864e5):99, uns=monthData(THIS).list.filter(t=>t.unsure&&!coverOf(t)).length, it=[];
  if(!(cfg.incomes&&cfg.incomes[THIS]!=null)) it.push(['wallet','--s3','להזין כמה משכורת נכנסה','minc']);
  if(!cfg.asideDone[THIS]) it.push(['aside','--s7',`להעביר ${fmt0(SP.cutAmt)} לצד ולסמן`,'asideSw']);
  if(!visa(THIS)) it.push(['card','--s2','להזין את חיוב הויזה כשהוא מגיע','mvisa']);
  if(!BK||age>7) it.push(['scale','--s4',BK?`לעדכן יתרה בבנק (עודכנה לפני ${age} ימים)`:'לעדכן יתרה בבנק','bank']);
  if(uns) it.push(['spark','--s1',`לבדוק קטגוריה ב-${uns} קניות`,'months']);
  $('todo').hidden=!it.length;
  $('bellDot').hidden=!it.length;
  $('todo').innerHTML=`<h3>${ic('check')}מה חסר החודש</h3>`+it.map(x=>`<div class="rowi press" data-todo="${x[3]}"><span>${ico(x[0],x[1],1)}${x[2]}</span><span class="go">‹</span></div>`).join('');
}
/* ---------- months menu: every cycle from the start, with its charges ---------- */
let openM=null, mfil=null;
function txRows(m){
  return monthData(m).list.map(t=>{const f=coverOf(t);return {id:t.id,d:t.d,a:+t.a,cat:f?'fixed':nc(t.cat),note:t.note||'',src:t.src,unsure:f?0:t.unsure,cov:f&&f.n,ov:onVisa(t),card:t.card||''}})
    .sort((a,b)=>b.d.localeCompare(a.d));
}
const rowHtml=r=>`<div class="trow">${ico(CI[r.cat],CAT[r.cat].c,1)}
      <span class="tt"><span class="tn">${esc(r.note||CAT[r.cat].name)}</span><span class="ts">${+r.d.slice(8)}.${+r.d.slice(5,7)}${r.note?' · '+CAT[r.cat].name:''}${r.cov?` · ${esc(r.cov)}, כבר בקבועים, לא נספר`:r.auto?' · לפי מה שהזנת מהבנק':r.src==='applepay'?' · Apple Pay':''}${r.src==='applepay'?` · <button type="button" class="tlink press" style="font-size:.8125rem;padding:0" data-vt="${r.id}">${r.ov?'ויזה רגילה':'דיירקט'}</button>${r.ov?', כבר בתוך חיוב הויזה, לא נספר':''}`:''}</span></span>
      <span class="n">${fmt(r.a)}</span>${r.auto?'<span></span>':`<button type="button" class="del press" data-del="${r.id}" aria-label="מחק">✕</button>`}${r.src==='applepay'&&!r.cov?`<select id="rc-${r.id}" data-rc="${r.id}" aria-label="קטגוריה"${r.unsure?' class="un"':''}>${CATS.filter(c=>!c.auto).map(c=>`<option value="${c.id}"${c.id===r.cat?' selected':''}>${c.name}${r.unsure&&c.id===r.cat?' (ניחוש, בדוק)':''}</option>`).join('')}</select>`:''}</div>`;
function renderMonths(){
  const first=(cfg.start||THIS)<THIS?(cfg.start||THIS):THIS, ks=[]; for(let k=THIS;k>=first&&ks.length<60;k=addM(k,-1)) ks.push(k);
  if(inside($('mlist'))&&document.activeElement.tagName==='SELECT') return;
  $('mlist').innerHTML=`<p class="foot" style="margin-top:.75rem">מתחילים מ-${mName(first)}. הקשה על חודש פותחת את כל החיובים שלו.</p>`+ks.map(k=>{
    const SP=split(k), D=monthData(k), FX=fixT(k), TB=SP.living-FX, left=TB-D.tot, now=k===THIS, open=openM===k;
    const st=now?'<span class="badge now">החודש</span>':left>=0?'<span class="badge ok">עמדת בתקציב</span>':'<span class="badge bad">חריגה</span>';
    const w=TB?Math.min(D.tot/TB,1)*100:0;
    let body='';
    if(open){
      const cats=CATS.map(c=>({c,v:D.by[c.id]||0})).filter(x=>x.v>0).sort((a,b)=>b.v-a.v);
      const rows=txRows(k).filter(r=>!mfil||r.cat===mfil);
      body=`<div class="mbody">
        <div class="rowi"><span>משכורת</span><span class="n">${fmt0(SP.inc)}</span></div>
        <div class="rowi"><span>לצד (השקעות ${fmt0(SP.invest)} · לא צפוי ${fmt0(SP.reserve)})</span><span class="n">${fmt0(SP.cutAmt)}</span></div>
        <div class="rowi"><span>מחיה</span><span class="n">${fmt0(SP.living)}</span></div>
        ${(r=>`<div class="rowi"><span>${r.v?'ויזה (כולל הקבועים שבה)':'קבועים בויזה (לא הוזן סכום ויזה)'}</span><span class="n">${fmt(-r.card)}</span></div>`+(r.fb?`<div class="rowi"><span>הוראות קבע מהבנק</span><span class="n">${fmt(-r.fb)}</span></div>`:'')+(r.fr?`<div class="rowi"><span>שמור לחיובים בדביט</span><span class="n">${fmt(-r.fr)}</span></div>`:'')+(r.p?`<div class="rowi"><span>תשלומים</span><span class="n">${fmt(-r.p)}</span></div>`:''))(resv(k))}
        <div class="rowi"><span>נשאר להוציא</span><span class="n">${fmt0(TB)}</span></div>
        <h2 class="gh">לפי סעיף</h2>
        ${cats.map(x=>{const b=budget(x.c.id,k),ov=b>0&&x.v>b;return `<button type="button" class="crow${mfil===x.c.id?' on':''}" data-mf="${x.c.id}"><span class="cn">${ico(CI[x.c.id],x.c.c,1)}${x.c.name}</span><span class="cv"><span class="n${ov?' over':''}">${fmt(x.v)}</span><span class="sec"> / <span class="n">${fmt0(b)}</span></span></span></button>`}).join('')||'<p class="empty">אין הוצאות בחודש הזה.</p>'}
        <div class="ghrow"><h2 class="gh">${mfil?CAT[mfil].name:'כל החיובים'} · ${rows.length}</h2>${mfil?'<button type="button" class="tlink sm press" data-clr="1">הצג הכול</button>':''}</div>
        ${rows.map(rowHtml).join('')||'<p class="empty">אין חיובים.</p>'}
      </div>`;
    }
    return `<section class="mcard"><button type="button" class="mhead press" data-mk="${k}" aria-expanded="${open}">
      <span class="mt">${ico(now?'cal':left>=0?'check':'trend',now?'--accent':left>=0?'--good':'--over',1)}${mName(k)}</span>${st}
      <span class="bar"><i style="width:${w}%;background:${left<0?'var(--over)':'var(--accent)'}"></i></span>
      <span class="ms">הוצאת <span class="n">${fmt0(D.tot)}</span> מתוך <span class="n">${fmt0(TB)}</span> · ${left<0?`<span class="over">חריגה של <span class="n">${fmt0(-left)}</span></span>`:`נשאר <span class="n">${fmt0(left)}</span>`}</span>
    </button>${body}</section>`}).join('');
}
function openMonths(k,f){openM=k||THIS;mfil=f||null;$('mview').hidden=false;document.querySelector('main').hidden=true;document.querySelector('body>header').hidden=true;renderMonths();scrollTo(0,0)}
function closeMonths(){$('mview').hidden=true;document.querySelector('main').hidden=false;document.querySelector('body>header').hidden=false;render();scrollTo(0,0)}
$('mBtn').addEventListener('click',()=>openMonths(THIS));
$('mBack').addEventListener('click',closeMonths);
$('mlist').addEventListener('click',async e=>{
  const h=e.target.closest('[data-mk]'); if(h){const k=h.dataset.mk;openM=openM===k?null:k;mfil=null;renderMonths();return}
  const f=e.target.closest('[data-mf]'); if(f){mfil=mfil===f.dataset.mf?null:f.dataset.mf;renderMonths();return}
  if(e.target.closest('[data-clr]')){mfil=null;renderMonths();return}
  const vt=e.target.closest('[data-vt]'); if(vt){const t=tx.find(x=>x.id===vt.dataset.vt);if(!t)return;cfg.vtx=cfg.vtx||{};cfg.vtx[t.id]=onVisa(t)?0:1;saveCfg();return}
  const b=e.target.closest('[data-del]'); if(b){const t=tx.find(x=>x.id===b.dataset.del);if(!t)return;b.blur();
    if(await delTx(t.id)) toast(`נמחק: ${fmt(+t.a)}`,()=>addTx({d:t.d,a:+t.a,cat:t.cat,note:t.note||'',src:'manual'}))}
});
$('mlist').addEventListener('change',e=>{const id=e.target.dataset.rc;if(id){e.target.blur();recat(id,e.target.value)}});


/* ---------- bank balance dialog ---------- */
let dPend=new Set();
function dlgDraft(){const v=parseFloat($('adIn').value);return isNaN(v)?null:{amt:r2(v),ts:Date.now(),d:TODAY,visaIn:$('adVo').checked,asideIn:$('adAs').checked,pend:[...dPend]}}
function adjShow(){const r=resv(THIS),va=r.v>0?r.v:r.fv+r.p;
  $('adVoL').textContent=r.v>0?`חיוב הויזה (${fmt(r.v)}) כבר ירד מהבנק`:`חיוב הויזה כבר ירד מהבנק (עוד לא הזנת סכום, הערכה ${fmt0(va)})`;
  $('adAsL').textContent=`הכסף לצד (${fmt0(split(THIS).cutAmt)}) כבר הועבר`;
  const b=dlgDraft(),F=b&&flowOf(b),row=(t,x,cls)=>`<div class="rowi${cls?' '+cls:''}"><span>${t}</span><span class="n${x<0?' m':''}">${fmt(x)}</span></div>`;
  $('adCalc').innerHTML=!F?'<p class="empty">הזן את הסכום שמופיע בבנק.</p>':row('בבנק',F.b.amt)+(F.P?row('קניות שעוד לא ירדו',-F.P):'')+(F.V?row('ויזה שעוד תרד',-F.V):'')+F.due.map(x=>row(esc(x.f.n),-x.f.a)).join('')+F.R.filter(x=>x.left).map(x=>row(`שמור ל${esc(x.f.n)}`,-x.left)).join('')+(F.S?row('להעביר לצד',-F.S):'')+row('נשאר עד המשכורת',F.left,'det-tot')}
function adjOpen(){
  const B=anchor();$('adIn').value='';$('adVo').checked=!!(cfg.visaOff||{})[THIS];$('adAs').checked=!!cfg.asideDone[THIS];
  const since=Date.now()-5*864e5, rec=tx.filter(t=>isDebit(t)&&txTime(t)>since).sort((a,b)=>txTime(b)-txTime(a));
  dPend=new Set(rec.filter(t=>t.d===TODAY).map(t=>t.id)); // from today: often not in the bank yet; you can flip each one
  $('adPh').hidden=$('adPend').hidden=!rec.length;
  $('adPend').innerHTML=rec.map(t=>`<label class="rowi" for="pp-${t.id}"><span>${esc(t.note||CAT[nc(t.cat)].name)}<small>${+t.d.slice(8)}.${+t.d.slice(5,7)} · <span class="n">${fmt(+t.a)}</span></small></span><input type="checkbox" role="switch" class="sw" id="pp-${t.id}" data-pp="${t.id}"${dPend.has(t.id)?'':' checked'}></label>`).join('');
  adjShow();$('ascrim').hidden=$('adlg').hidden=false;requestAnimationFrame(()=>{$('ascrim').style.opacity=1;$('adlg').classList.add('on')});$('adIn').focus({preventScroll:true})}
function adjClose(){$('adIn').blur();$('adlg').classList.remove('on');$('ascrim').style.opacity=0;setTimeout(()=>{if(!$('adlg').classList.contains('on'))$('ascrim').hidden=$('adlg').hidden=true},350)}
$('adjBtn').addEventListener('click',adjOpen);
$('adNo').addEventListener('click',adjClose); $('ascrim').addEventListener('click',adjClose);
$('adIn').addEventListener('input',adjShow); $('adVo').addEventListener('change',adjShow); $('adAs').addEventListener('change',adjShow);
$('adPend').addEventListener('change',e=>{const id=e.target.dataset.pp;if(!id)return;if(e.target.checked)dPend.delete(id);else dPend.add(id);adjShow()});
$('adOk').addEventListener('click',()=>{const b=dlgDraft();if(!b){$('adIn').focus();return}
  cfg.bank=b;cfg.visaOff=cfg.visaOff||{};if(b.visaIn)cfg.visaOff[THIS]=1;else delete cfg.visaOff[THIS];if(b.asideIn)cfg.asideDone[THIS]=true;
  adjClose();saveCfg();toast(`עודכן: נשאר ${fmt(flowOf(b).left)}`)});
$('todo').addEventListener('click',e=>{const r=e.target.closest('[data-todo]');if(!r)return;const k=r.dataset.todo;
  if(k==='bank')return adjOpen(); if(k==='months')return openMonths(THIS);
  const el=$(k),box=el.closest('details');if(box)box.open=true;el.scrollIntoView({block:'center'});if(el.type!=='checkbox')el.focus()});
/* ---------- toast: status and undo ---------- */
let toastT=0, undo=null;
function toast(text,undoFn){
  $('toastT').textContent=text; undo=undoFn||null; $('toastB').hidden=!undo; $('toastOk').hidden=!!undo; $('toast').classList.remove('on'); void $('toast').offsetWidth;
  $('toast').classList.add('on'); clearTimeout(toastT); toastT=setTimeout(()=>$('toast').classList.remove('on'),undo?5000:2200);
}
$('toastB').addEventListener('click',()=>{const f=undo;undo=null;$('toast').classList.remove('on');if(f)f()});

/* ---------- bottom sheet: tracks the finger 1:1, keeps its velocity on release, and can be caught mid-flight ---------- */
const sheet=$('sheet'), scrim=$('scrim'), RM=matchMedia('(prefers-reduced-motion: reduce)');
let sy=0, sv=0, sH=1, raf=0, isOpen=false;
const rubber=(o,d)=>(o*d*.55)/(d+.55*Math.abs(o));
function place(y){sy=y;sheet.style.transform=`translate3d(0,${y<0?rubber(y,sH):y}px,0)`;scrim.style.opacity=String(Math.max(0,Math.min(1,1-y/sH)))}
function settle(target,v0,bouncy,after){
  cancelAnimationFrame(raf); raf=0;
  if(RM.matches){place(target);sv=0;if(after)after();return}
  const k=(2*Math.PI/.34)**2, c=2*(bouncy?.8:1)*Math.sqrt(k); let v=v0||0, last=performance.now();
  const step=t=>{const dt=Math.min((t-last)/1000,.034);last=t;let x=sy;
    for(let i=0;i<4;i++){const h=dt/4;v+=(-k*(x-target)-c*v)*h;x+=v*h}
    if(Math.abs(x-target)<.5&&Math.abs(v)<15){place(target);sv=0;raf=0;if(after)after();return}
    place(x);sv=v;raf=requestAnimationFrame(step)};
  raf=requestAnimationFrame(step);
}
function openSheet(){
  if(sheet.hidden){sheet.hidden=scrim.hidden=false;sH=sheet.offsetHeight;place(sH);sv=0}
  isOpen=true; settle(0,sv,false); $('amt').focus({preventScroll:true});
}
function closeSheet(v){
  isOpen=false; document.activeElement&&document.activeElement.blur&&sheet.contains(document.activeElement)&&document.activeElement.blur();
  settle(sH,v==null?sv:v,false,()=>{if(!isOpen){sheet.hidden=scrim.hidden=true;$('fab').focus({preventScroll:true})}});
}
$('fab').addEventListener('click',openSheet);
$('cancel').addEventListener('click',()=>closeSheet());
scrim.addEventListener('click',()=>closeSheet());
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&isOpen)closeSheet()});
let drag=null;
sheet.addEventListener('pointerdown',e=>{
  if(!e.target.closest('[data-drag]')||e.target.closest('button')) return;
  cancelAnimationFrame(raf); raf=0; // catch it wherever it is right now
  drag={id:e.pointerId,off:e.clientY-sy,h:[{t:e.timeStamp,y:sy}]}; sheet.setPointerCapture(e.pointerId);
});
sheet.addEventListener('pointermove',e=>{
  if(!drag||e.pointerId!==drag.id) return;
  const y=e.clientY-drag.off; place(y); drag.h.push({t:e.timeStamp,y}); if(drag.h.length>6) drag.h.shift();
});
function endDrag(e){
  if(!drag||e.pointerId!==drag.id) return;
  const h=drag.h, a=h[0], b=h[h.length-1], dt=(b.t-a.t)/1000; drag=null;
  const v=dt>0.001?(b.y-a.y)/dt:0; // px/s at release
  const projected=sy+(v/1000)*.998/(1-.998); // where the flick is heading
  if(projected>sH*.5){isOpen=false;settle(sH,v,false,()=>{if(!isOpen){sheet.hidden=scrim.hidden=true}})}
  else{isOpen=true;settle(0,v,Math.abs(v)>300)}
}
sheet.addEventListener('pointerup',endDrag); sheet.addEventListener('pointercancel',endDrag);
if(window.visualViewport){const vv=visualViewport,f=()=>document.documentElement.style.setProperty('--kb',Math.max(0,innerHeight-vv.height-vv.offsetTop)+'px');vv.addEventListener('resize',f);vv.addEventListener('scroll',f)}
document.addEventListener('touchstart',()=>{},{passive:true}); // lets :active fire on the press in iOS

/* ---------- events ---------- */
const short=c=>c.name.replace(', פיצוציה וסיגריות','').replace(' ומשלוחים','').replace(' וטיפוח','');
$('chips').innerHTML=CATS.filter(c=>!c.auto).map((c,i)=>`<label><input type="radio" name="cat" id="ch-${c.id}" value="${c.id}"${c.id==='super'?' checked':''}><span style="--c:var(${c.c})">${ic(CI[c.id])}${short(c)}</span></label>`).join('');
$('dt').value=TODAY; $('pd').value=TODAY;
$('pcat').innerHTML=CATS.filter(c=>!c.auto).map(c=>`<option value="${c.id}"${c.id==='shop'?' selected':''}>${c.name}</option>`).join('');
$('addForm').addEventListener('submit',async e=>{e.preventDefault();
  const a=Math.round(parseFloat($('amt').value)*100)/100; if(!(a>0)){$('amt').focus();return}
  const d=$('dt').value||TODAY, cat=document.querySelector('input[name=cat]:checked').value;
  const t={d,a,cat,note:$('note').value.trim(),src:'manual'};
  $('amt').value='';$('note').value='';closeSheet(0);
  if(await addTx(t)) toast(`נרשם ${fmt(a)} · ${CAT[cat].name}`);
});
$('tabC').addEventListener('click',()=>{tab='C';render()}); $('tabM').addEventListener('click',()=>{tab='M';render()});
$('paneC').addEventListener('click',e=>{const s=e.target.closest('[data-s]');hl=s&&hl!==s.dataset.s?s.dataset.s:null;render()});
$('paneM').addEventListener('click',e=>{const g=e.target.closest('[data-m]');if(g&&g.dataset.m>=(cfg.start||THIS))openMonths(g.dataset.m)});
$('cats').addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(b)openMonths(THIS,b.dataset.f)});
$('asideSw').addEventListener('change',e=>{if(e.target.checked){cfg.asideDone[cur]=true;confetti()}else delete cfg.asideDone[cur];saveCfg()});
$('buds').addEventListener('change',e=>{const id=e.target.dataset.b;if(!id)return;cfg.budgets[id]=+e.target.value||0;saveCfg()});
$('fixed').addEventListener('change',e=>{const i=e.target.dataset.fi;if(i==null)return;cfg.fixed[i].a=+e.target.value||0;delete cfg.budgets.fixed;saveCfg()});
$('fixed').addEventListener('click',e=>{const t=e.target.closest('[data-fv]');if(t){const f=cfg.fixed[+t.dataset.fv];if(f.m)return;if(f.nv)delete f.nv;else f.nv=1;saveCfg();return}const b=e.target.closest('[data-fx]');if(!b)return;const i=+b.dataset.fx,f=cfg.fixed[i];cfg.fixed.splice(i,1);delete cfg.budgets.fixed;b.blur();saveCfg();
  toast(`הוסר: ${f.n}`,()=>{cfg.fixed.splice(i,0,f);saveCfg()})});
$('fixForm').addEventListener('submit',e=>{e.preventDefault();cfg.fixed.push({n:$('fn').value.trim(),a:+$('fa').value,day:+$('fd').value});delete cfg.budgets.fixed;$('fixForm').reset();document.activeElement.blur();saveCfg()});
$('planForm').addEventListener('submit',e=>{e.preventDefault();
  const T=+$('pt').value,N=Math.round(+$('pc').value),d=$('pd').value||TODAY; if(!(T>0)||!(N>=2)) return;
  cfg.plans=cfg.plans||[];cfg.plans.push({t:$('pn').value.trim(),a:Math.round(T/N*100)/100,n:N,day:+d.slice(8,10),s:cyc(d),cat:$('pcat').value});
  $('pn').value='';$('pt').value='';$('pc').value='';saveCfg()});
$('plans').addEventListener('click',e=>{const b=e.target.closest('[data-px]');if(!b)return;const i=+b.dataset.px,p=cfg.plans[i];cfg.plans.splice(i,1);saveCfg();
  toast(`הוסר: ${p.t}`,()=>{cfg.plans.splice(i,0,p);saveCfg()})});
$('vcard').addEventListener('change',e=>{const v=e.target.value.trim();if(v)cfg.visaCard=v;else delete cfg.visaCard;saveCfg()});
$('income').addEventListener('change',e=>{cfg.income=+e.target.value||0;saveCfg()});
$('cut').addEventListener('change',e=>{cfg.cut=Math.min(Math.max(+e.target.value||0,0),100);saveCfg()});
$('inv').addEventListener('change',e=>{cfg.inv=Math.min(Math.max(+e.target.value||0,0),100);saveCfg()});
$('payday').addEventListener('change',e=>{cfg.payday=Math.min(Math.max(+e.target.value||10,1),28);cur=null;saveCfg()});
// iOS fires change while the picker is still open, so apply the date only once you leave the field
let stT=0;
function applyStart(){clearTimeout(stT);const v=$('mstart').value;cfg.starts=cfg.starts||{};
  if(!v){if(cfg.starts[cur]){delete cfg.starts[cur];saveCfg()}return}
  if(v===cStart(cur))return;
  const a=v.slice(0,7),b=addM(a,1),gap=k=>Math.abs(new Date(v)-new Date(defStart(k))),key=gap(a)<=gap(b)?a:b;
  cfg.starts[key]=v;saveCfg();toast(`החודש מתחיל ב-${+v.slice(8)}.${+v.slice(5,7)}`)}
$('mstart').addEventListener('blur',applyStart);
$('mstart').addEventListener('change',()=>{clearTimeout(stT);stT=setTimeout(()=>{if(document.activeElement!==$('mstart'))applyStart()},600)});
$('mvisa').addEventListener('change',e=>{cfg.visa=cfg.visa||{};const v=Math.round((+e.target.value||0)*100)/100;if(v>0)cfg.visa[cur]=v;else delete cfg.visa[cur];saveCfg()});
$('mcut').addEventListener('change',e=>{cfg.asides=cfg.asides||{};if(e.target.value==='')delete cfg.asides[cur];else cfg.asides[cur]=Math.max(+e.target.value||0,0);saveCfg()});
$('minc').addEventListener('change',e=>{cfg.incomes=cfg.incomes||{};if(e.target.value==='')delete cfg.incomes[cur];else cfg.incomes[cur]=+e.target.value;saveCfg()});
render();
