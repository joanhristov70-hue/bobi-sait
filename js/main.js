const html=document.documentElement;const thBtn=document.getElementById('themeBtn');function setTheme(t){html.setAttribute('data-theme',t);thBtn.querySelector('.sun-ico').style.display=t==='dark'?'block':'none';thBtn.querySelector('.moon-ico').style.display=t==='dark'?'none':'block';localStorage.setItem('bg-theme',t);}
thBtn.addEventListener('click',()=>setTheme(html.getAttribute('data-theme')==='dark'?'light':'dark'));setTheme(localStorage.getItem('bg-theme')||'dark');const hdr=document.getElementById('hdr');window.addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>60),{passive:true});document.getElementById('hambBtn').addEventListener('click',()=>document.getElementById('mobNav').classList.add('open'));document.getElementById('mobClose').addEventListener('click',()=>document.getElementById('mobNav').classList.remove('open'));function closeMob(){document.getElementById('mobNav').classList.remove('open')}
const revEls=document.querySelectorAll('.reveal,.reveal-left,.reveal-right');const revObs=new IntersectionObserver(entries=>{entries.forEach((e,i)=>{if(e.isIntersecting){const delay=e.target.style.transitionDelay||'0s';setTimeout(()=>e.target.classList.add('in'),i*60);revObs.unobserve(e.target);}});},{threshold:.1,rootMargin:'0px 0px -50px 0px'});revEls.forEach(el=>{revObs.observe(el);el.classList.add('in');});document.querySelectorAll('[data-mag]').forEach(btn=>{btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();const cx=r.left+r.width/2,cy=r.top+r.height/2;const dx=(e.clientX-cx)*.28,dy=(e.clientY-cy)*.28;btn.style.transform=`translate(${dx}px,${dy}px)`;});btn.addEventListener('mouseleave',()=>btn.style.transform='');});const modals={demo:'modal-demo',clean:'modal-clean',haul:'modal-haul'};function openModal(key){const el=document.getElementById(modals[key]);if(!el)return;el.classList.add('open');document.body.style.overflow='hidden';el.querySelector('.modal-box').focus?.();}
function closeModal(id){document.getElementById(id).classList.remove('open');document.body.style.overflow='';}
function closeModalOuter(e,id){if(e.target===document.getElementById(id))closeModal(id)}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.modal-overlay.open').forEach(m=>m.classList.remove('open'));closeLb();document.body.style.overflow='';}});document.querySelectorAll('.svc-card').forEach(c=>{c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')c.click()});});const galleryMap=[["bobi-16.jpeg","Преместване • София"],["bobi-04.jpeg","Почистване след ремонт"],["bobi-22.jpeg","Извозване на отпадъци"],["bobi-05.jpeg","Извозване строителни отпадъци"],["bobi-10.jpeg","Къртене на апартамент"],["bobi-12.jpeg","Демонтаж на баня"],["bobi-28.jpeg","Хамалски услуги • София"]];function openLightbox(i){const[src,cap]=galleryMap[i]||['',''];openLbImg(src,cap);}
function openLbImg(src,cap){const lb=document.getElementById('lightbox');const wrap=document.getElementById('lbImgWrap');wrap.innerHTML='';const img=document.createElement('img');img.alt=cap||'';img.style.cssText='max-width:100%;max-height:82vh;width:auto;height:auto;object-fit:contain;border-radius:10px;box-shadow:0 24px 80px rgba(0,0,0,.8);display:block;';img.src=src;wrap.appendChild(img);document.getElementById('lbCaption').textContent=cap||'';lb.classList.add('open');document.body.style.overflow='hidden';}
function closeLb(){const lb=document.getElementById('lightbox');if(!lb)return;lb.classList.remove('open');document.body.style.overflow='';setTimeout(()=>{const w=document.getElementById('lbImgWrap');if(w)w.innerHTML='';},300);}
function closeLbOuter(e){if(e.target===document.getElementById('lightbox'))closeLb()}
const baWrap=document.getElementById('baWrap');const baAfter=document.getElementById('baAfter');const baDivider=document.getElementById('baDivider');const baHandle=document.getElementById('baHandle');let baDragging=false;function setBA(pct){pct=Math.max(5,Math.min(95,pct));baAfter.style.clipPath='inset(0 0 0 '+pct+'%)';baDivider.style.left=pct+'%';baHandle.style.left=pct+'%';}
function getBA(e){const r=baWrap.getBoundingClientRect();const x=(e.touches?e.touches[0].clientX:e.clientX)-r.left;return(x/r.width)*100;}
if(baHandle&&baWrap){baHandle.addEventListener('mousedown',e=>{baDragging=true;e.preventDefault()});baHandle.addEventListener('touchstart',e=>{baDragging=true;e.stopPropagation()},{passive:true});window.addEventListener('mousemove',e=>{if(baDragging)setBA(getBA(e))});window.addEventListener('touchmove',e=>{if(baDragging)setBA(getBA(e))},{passive:true});window.addEventListener('mouseup',()=>baDragging=false);window.addEventListener('touchend',()=>baDragging=false);baWrap.addEventListener('click',e=>{if(baDragging||e.target.closest('.ba-label'))return;setBA(getBA(e))});const bB=document.getElementById('baBtnBefore'),bA=document.getElementById('baBtnAfter');function baAnim(to){baAfter.style.transition='clip-path .5s ease';baDivider.style.transition=baHandle.style.transition='left .5s ease';setBA(to);setTimeout(()=>{baAfter.style.transition=baDivider.style.transition=baHandle.style.transition=''},550);}if(bB)bB.addEventListener('click',e=>{e.stopPropagation();baAnim(95)});if(bA)bA.addEventListener('click',e=>{e.stopPropagation();baAnim(5)});}const rvTrack=document.getElementById('rvTrack');const rvCards=rvTrack?rvTrack.querySelectorAll('.rv-card'):[];let rvIdx=0;function getVisible(){return window.innerWidth<=860?1:3}
function slideRv(){if(!rvTrack||!rvCards.length)return;const v=getVisible(),max=Math.max(0,rvCards.length-v);rvIdx=Math.max(0,Math.min(rvIdx,max));const w=rvCards[0].offsetWidth+24;rvTrack.style.transform=`translateX(-${rvIdx*w}px)`;}
document.getElementById('rvPrev')?.addEventListener('click',()=>{rvIdx--;slideRv()});document.getElementById('rvNext')?.addEventListener('click',()=>{rvIdx++;slideRv()});window.addEventListener('resize',slideRv);document.querySelectorAll('.faq-q').forEach(btn=>{btn.addEventListener('click',()=>{const item=btn.closest('.faq-item');const was=item.classList.contains('open');document.querySelectorAll('.faq-item').forEach(i=>{i.classList.remove('open');i.querySelector('.faq-q').setAttribute('aria-expanded','false')});if(!was){item.classList.add('open');btn.setAttribute('aria-expanded','true')}});});const _SB_URL='https://redcsbztdpsfysjcpral.supabase.co';
const _SB_KEY='sb_publishable_VeJpNd4-0NmCTzHfdyM_-Q_fndUG-vX';
async function submitForm(){
  const n=document.getElementById('f-name').value.trim();
  const p=document.getElementById('f-phone').value.trim();
  const s=document.getElementById('f-svc').value;
  const m=document.getElementById('f-msg').value.trim();
  if(!n||!p||!s){alert('Моля, попълнете задължителните полета.');return;}
  const btn=document.querySelector('.f-submit');
  btn.disabled=true;btn.textContent='Изпращане...';btn.style.opacity='.7';btn.style.animation='none';
  try{
    const res=await fetch(_SB_URL+'/rest/v1/contact_submissions',{
      method:'POST',
      headers:{'Content-Type':'application/json','apikey':_SB_KEY,'Authorization':'Bearer '+_SB_KEY,'Prefer':'return=minimal'},
      body:JSON.stringify({name:n,phone:p,service:s,message:m})
    });
    if(!res.ok) throw new Error('HTTP '+res.status);
    btn.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg> Изпратено успешно!';
    btn.style.background='#00C48C';btn.style.opacity='1';btn.style.boxShadow='0 0 24px rgba(0,196,140,.5)';
  }catch(e){
    btn.disabled=false;btn.textContent='Изпрати Запитване';btn.style.opacity='1';btn.style.animation='';
    alert('Грешка при изпращане. Моля, опитайте отново или ни се обадете.');
  }
}

// Coverage map (Leaflet + OpenStreetMap tiles, lazy-loaded, no API key)
var bgMap=null,bgMarkers={};
var BG_ZONES=[[42.7330,23.3000,'Надежда'],[42.6990,23.2830,'Красна поляна'],[42.6820,23.2850,'Красно село'],[42.6770,23.2550,'Овча купел'],[42.6430,23.2650,'Витоша / Бояна'],[42.6720,23.3230,'Триадица / Лозенец'],[42.6960,23.3350,'Оборище / Средец'],[42.7100,23.3500,'Подуяне / Сердика'],[42.6800,23.3900,'Слатина / Дружба'],[42.6500,23.3800,'Младост / Горубляне'],[42.6000,23.4100,'Панчарево / Искър'],[42.7070,23.1450,'Банкя / Иваняне'],[42.7850,23.3800,'Нови Искър / Кремиковци']];
function initBgMap(){
  var el=document.getElementById('gmap');if(!el||bgMap||!window.L)return;
  bgMap=L.map(el,{scrollWheelZoom:false,zoomControl:false,attributionControl:true,dragging:!L.Browser.mobile,tap:false}).setView([42.6977,23.3219],11);
  L.control.zoom({position:'bottomright'}).addTo(bgMap);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,className:'bg-tiles',attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(bgMap);
  L.circle([42.6977,23.3219],{radius:14500,color:'#0066ff',weight:1.5,fillColor:'#0066ff',fillOpacity:.07,dashArray:'6 6'}).addTo(bgMap);
  BG_ZONES.forEach(function(z){
    var m=L.circleMarker([z[0],z[1]],{radius:9,color:'#fff',weight:2,fillColor:'#0066ff',fillOpacity:1}).addTo(bgMap).bindPopup('<b>'+z[2]+'</b><br>Обслужваме района ✓<br><a href="tel:+359898562528">Обадете се</a>');
    bgMarkers[z[2]]=m;
  });
}
function loadBgMap(){
  if(window.L){initBgMap();return;}
  if(document.getElementById('leaflet-css'))return;
  var c=document.createElement('link');c.id='leaflet-css';c.rel='stylesheet';c.href='/vendor/leaflet/leaflet.css';document.head.appendChild(c);
  var s=document.createElement('script');s.src='/vendor/leaflet/leaflet.js';s.onload=initBgMap;document.head.appendChild(s);
}
(function(){var el=document.getElementById('gmap');if(!el)return;
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(en){if(en[0].isIntersecting){io.disconnect();loadBgMap();}},{rootMargin:'400px'});io.observe(el);}else loadBgMap();})();
function flyTo(lat,lng,name,e){
  if(e){
    document.querySelectorAll('.zone-item').forEach(function(el){el.classList.remove('active');});
    e.currentTarget.classList.add('active');
  }
  var g=document.getElementById('gmap');if(g&&window.innerWidth<=900){var r=g.getBoundingClientRect();if(r.bottom<80||r.top>window.innerHeight)g.scrollIntoView({behavior:'smooth',block:'center'});}
  if(bgMap){bgMap.flyTo([lat,lng],13,{duration:1.2});var m=bgMarkers[name];if(m)setTimeout(function(){m.openPopup();},1250);}
  else loadBgMap();
}

(function(){
  function formatNum(n, fmt){
    if(fmt) return fmt;
    if(n>=1000000) return (n/1000000).toFixed(1)+'M';
    if(n>=1000) return n.toLocaleString('bg-BG');
    return n.toString();
  }
  function animateCounter(el){
    const target=+el.dataset.target;
    const suffix=el.dataset.suffix||'';
    const fmt=el.dataset.format||'';
    const duration=2000;
    const start=performance.now();
    const easeOut=t=>1-Math.pow(1-t,3);
    function tick(now){
      const t=Math.min((now-start)/duration,1);
      const val=Math.floor(easeOut(t)*target);
      el.textContent=formatNum(val,t<1?'':fmt)+suffix;
      if(t<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const counters=document.querySelectorAll('.count');
  if(!counters.length) return;
  const obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        animateCounter(e.target);
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.3});
  counters.forEach(function(c){obs.observe(c);});
})();
