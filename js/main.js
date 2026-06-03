const html=document.documentElement;const thBtn=document.getElementById('themeBtn');function setTheme(t){html.setAttribute('data-theme',t);thBtn.querySelector('.sun-ico').style.display=t==='dark'?'block':'none';thBtn.querySelector('.moon-ico').style.display=t==='dark'?'none':'block';localStorage.setItem('bg-theme',t);}
thBtn.addEventListener('click',()=>setTheme(html.getAttribute('data-theme')==='dark'?'light':'dark'));setTheme(localStorage.getItem('bg-theme')||'dark');const hdr=document.getElementById('hdr');window.addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>60),{passive:true});document.getElementById('hambBtn').addEventListener('click',()=>document.getElementById('mobNav').classList.add('open'));document.getElementById('mobClose').addEventListener('click',()=>document.getElementById('mobNav').classList.remove('open'));function closeMob(){document.getElementById('mobNav').classList.remove('open')}
const revEls=document.querySelectorAll('.reveal,.reveal-left,.reveal-right');const revObs=new IntersectionObserver(entries=>{entries.forEach((e,i)=>{if(e.isIntersecting){const delay=e.target.style.transitionDelay||'0s';setTimeout(()=>e.target.classList.add('in'),i*60);revObs.unobserve(e.target);}});},{threshold:.1,rootMargin:'0px 0px -50px 0px'});revEls.forEach(el=>{revObs.observe(el);el.classList.add('in');});document.querySelectorAll('[data-mag]').forEach(btn=>{btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();const cx=r.left+r.width/2,cy=r.top+r.height/2;const dx=(e.clientX-cx)*.28,dy=(e.clientY-cy)*.28;btn.style.transform=`translate(${dx}px,${dy}px)`;});btn.addEventListener('mouseleave',()=>btn.style.transform='');});const modals={demo:'modal-demo',clean:'modal-clean',haul:'modal-haul'};function openModal(key){const el=document.getElementById(modals[key]);if(!el)return;el.classList.add('open');document.body.style.overflow='hidden';el.querySelector('.modal-box').focus?.();}
function closeModal(id){document.getElementById(id).classList.remove('open');document.body.style.overflow='';}
function closeModalOuter(e,id){if(e.target===document.getElementById(id))closeModal(id)}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.modal-overlay.open').forEach(m=>m.classList.remove('open'));closeLb();document.body.style.overflow='';}});document.querySelectorAll('.svc-card').forEach(c=>{c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')c.click()});});const galleryMap=[["bobi-16.jpeg","Преместване • София"],["bobi-04.jpeg","Почистване след ремонт"],["bobi-22.jpeg","Извозване на отпадъци"],["bobi-05.jpeg","Извозване строителни отпадъци"],["bobi-10.jpeg","Къртене на апартамент"],["bobi-12.jpeg","Демонтаж на баня"],["bobi-28.jpeg","Хамалски услуги • София"]];function openLightbox(i){const[src,cap]=galleryMap[i]||['',''];openLbImg(src,cap);}
function openLbImg(src,cap){const lb=document.getElementById('lightbox');const wrap=document.getElementById('lbImgWrap');wrap.innerHTML='';const img=document.createElement('img');img.alt=cap||'';img.style.cssText='max-width:100%;max-height:82vh;width:auto;height:auto;object-fit:contain;border-radius:10px;box-shadow:0 24px 80px rgba(0,0,0,.8);display:block;';img.src=src;wrap.appendChild(img);document.getElementById('lbCaption').textContent=cap||'';lb.classList.add('open');document.body.style.overflow='hidden';}
function closeLb(){const lb=document.getElementById('lightbox');lb.classList.remove('open');document.body.style.overflow='';setTimeout(()=>document.getElementById('lbImgWrap').innerHTML='',300);}
function closeLbOuter(e){if(e.target===document.getElementById('lightbox'))closeLb()}
const baWrap=document.getElementById('baWrap');const baAfter=document.getElementById('baAfter');const baDivider=document.getElementById('baDivider');const baHandle=document.getElementById('baHandle');let baDragging=false;function setBA(pct){pct=Math.max(5,Math.min(95,pct));baAfter.style.clipPath='inset(0 0 0 '+pct+'%)';baDivider.style.left=pct+'%';baHandle.style.left=pct+'%';}
function getBA(e){const r=baWrap.getBoundingClientRect();const x=(e.touches?e.touches[0].clientX:e.clientX)-r.left;return(x/r.width)*100;}
if(baHandle&&baWrap){baHandle.addEventListener('mousedown',e=>{baDragging=true;e.preventDefault()});baHandle.addEventListener('touchstart',e=>{baDragging=true;e.stopPropagation()},{passive:true});window.addEventListener('mousemove',e=>{if(baDragging)setBA(getBA(e))});window.addEventListener('touchmove',e=>{if(baDragging)setBA(getBA(e))},{passive:true});window.addEventListener('mouseup',()=>baDragging=false);window.addEventListener('touchend',()=>baDragging=false);baWrap.addEventListener('click',e=>{if(!baDragging)setBA(getBA(e))});}const rvTrack=document.getElementById('rvTrack');const rvCards=rvTrack?rvTrack.querySelectorAll('.rv-card'):[];let rvIdx=0;function getVisible(){return window.innerWidth<=860?1:3}
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


// ── Sofia municipality boundary ──
var SOFIA_BOUNDARY=[{lat:42.822,lng:23.350},{lat:42.820,lng:23.420},{lat:42.808,lng:23.480},{lat:42.795,lng:23.530},{lat:42.778,lng:23.555},{lat:42.760,lng:23.570},{lat:42.730,lng:23.570},{lat:42.700,lng:23.565},{lat:42.670,lng:23.555},{lat:42.648,lng:23.550},{lat:42.625,lng:23.530},{lat:42.600,lng:23.510},{lat:42.570,lng:23.490},{lat:42.548,lng:23.460},{lat:42.530,lng:23.430},{lat:42.518,lng:23.400},{lat:42.510,lng:23.370},{lat:42.505,lng:23.340},{lat:42.505,lng:23.300},{lat:42.508,lng:23.260},{lat:42.515,lng:23.225},{lat:42.525,lng:23.195},{lat:42.540,lng:23.170},{lat:42.558,lng:23.155},{lat:42.578,lng:23.148},{lat:42.608,lng:23.145},{lat:42.640,lng:23.140},{lat:42.670,lng:23.130},{lat:42.700,lng:23.130},{lat:42.725,lng:23.135},{lat:42.748,lng:23.148},{lat:42.762,lng:23.168},{lat:42.778,lng:23.190},{lat:42.790,lng:23.218},{lat:42.800,lng:23.255},{lat:42.808,lng:23.290},{lat:42.815,lng:23.320},{lat:42.822,lng:23.350}];
var WORLD=[{lat:85,lng:-180},{lat:85,lng:180},{lat:-85,lng:180},{lat:-85,lng:-180}];

// District polygons with coords for highlight on click
var DISTRICTS=[
  {name:'Надежда',lat:42.7153,lng:23.3297,coords:[{lat:42.740,lng:23.280},{lat:42.740,lng:23.360},{lat:42.700,lng:23.360},{lat:42.700,lng:23.280}]},
  {name:'Красна поляна',lat:42.7062,lng:23.2743,coords:[{lat:42.722,lng:23.245},{lat:42.722,lng:23.305},{lat:42.688,lng:23.305},{lat:42.688,lng:23.245}]},
  {name:'Красно село',lat:42.6906,lng:23.2904,coords:[{lat:42.706,lng:23.270},{lat:42.706,lng:23.320},{lat:42.672,lng:23.320},{lat:42.672,lng:23.270}]},
  {name:'Овча купел',lat:42.6700,lng:23.2930,coords:[{lat:42.688,lng:23.260},{lat:42.688,lng:23.320},{lat:42.650,lng:23.320},{lat:42.650,lng:23.260}]},
  {name:'Витоша / Бояна',lat:42.6560,lng:23.2790,coords:[{lat:42.670,lng:23.245},{lat:42.670,lng:23.315},{lat:42.635,lng:23.315},{lat:42.635,lng:23.245}]},
  {name:'Триадица / Лозенец',lat:42.6690,lng:23.3190,coords:[{lat:42.690,lng:23.300},{lat:42.690,lng:23.352},{lat:42.650,lng:23.352},{lat:42.650,lng:23.300}]},
  {name:'Оборище / Средец',lat:42.7010,lng:23.3220,coords:[{lat:42.716,lng:23.300},{lat:42.716,lng:23.352},{lat:42.686,lng:23.352},{lat:42.686,lng:23.300}]},
  {name:'Подуяне / Сердика',lat:42.7100,lng:23.3600,coords:[{lat:42.730,lng:23.340},{lat:42.730,lng:23.400},{lat:42.694,lng:23.400},{lat:42.694,lng:23.340}]},
  {name:'Слатина / Дружба',lat:42.6980,lng:23.3900,coords:[{lat:42.716,lng:23.365},{lat:42.716,lng:23.430},{lat:42.680,lng:23.430},{lat:42.680,lng:23.365}]},
  {name:'Младост / Горубляне',lat:42.6630,lng:23.4000,coords:[{lat:42.684,lng:23.370},{lat:42.684,lng:23.445},{lat:42.644,lng:23.445},{lat:42.644,lng:23.370}]},
  {name:'Панчарево / Искър',lat:42.6380,lng:23.4500,coords:[{lat:42.660,lng:23.420},{lat:42.660,lng:23.510},{lat:42.614,lng:23.510},{lat:42.614,lng:23.420}]},
  {name:'Банкя / Иваняне',lat:42.7280,lng:23.1800,coords:[{lat:42.752,lng:23.148},{lat:42.752,lng:23.218},{lat:42.706,lng:23.218},{lat:42.706,lng:23.148}]},
  {name:'Нови Искър / Кремиковци',lat:42.7600,lng:23.3400,coords:[{lat:42.790,lng:23.300},{lat:42.790,lng:23.400},{lat:42.740,lng:23.400},{lat:42.740,lng:23.300}]}
];

var gmap, gInfoWindow, activeDistrictPoly=null, districtPolygons=[];

function initMap(){
  // Standard Google Maps style (normal map, not dark)
  var lightStyle=[
    {featureType:'poi',stylers:[{visibility:'off'}]},
    {featureType:'transit',stylers:[{visibility:'off'}]},
    {featureType:'administrative.neighborhood',elementType:'labels',stylers:[{visibility:'off'}]},
    {featureType:'road',elementType:'labels.icon',stylers:[{visibility:'off'}]}
  ];

  gmap=new google.maps.Map(document.getElementById('gmap'),{
    center:{lat:42.6977,lng:23.3219},zoom:11,
    styles:lightStyle,
    disableDefaultUI:false,zoomControl:true,mapTypeControl:false,
    streetViewControl:false,fullscreenControl:true,
    gestureHandling:'cooperative'
  });

  gInfoWindow=new google.maps.InfoWindow({pixelOffset:new google.maps.Size(0,-4)});

  // RED overlay outside Sofia — outer box CW, Sofia reversed CCW for proper hole
  var OUTER_BOX = [
    {lat:50, lng:18},
    {lat:50, lng:30},
    {lat:38, lng:30},
    {lat:38, lng:18}
  ];
  new google.maps.Polygon({
    paths:[OUTER_BOX, SOFIA_BOUNDARY.slice().reverse()],
    strokeOpacity:0,
    fillColor:'#cc1111',
    fillOpacity:0.38,
    map:gmap,
    clickable:false
  });

  // Sofia border line only — NO fill inside
  new google.maps.Polyline({
    path:SOFIA_BOUNDARY,
    strokeColor:'#cc1111',
    strokeOpacity:1,
    strokeWeight:3,
    map:gmap
  });

  // District polygons — transparent, turn blue on click
  DISTRICTS.forEach(function(d,i){
    var poly=new google.maps.Polygon({
      paths:d.coords,
      strokeColor:'#0066ff',
      strokeOpacity:0,
      strokeWeight:2,
      fillColor:'#0066ff',
      fillOpacity:0,
      map:gmap,
      clickable:true
    });
    poly.districtData=d;
    poly.addListener('click',function(e){
      selectDistrict(poly,d,e.latLng);
    });
    districtPolygons.push(poly);
  });

  // Click on map to deselect
  gmap.addListener('click',function(){
    deselectAll();
  });
}

function selectDistrict(poly,d,latLng){
  deselectAll();
  poly.setOptions({fillOpacity:0.28,strokeOpacity:0.9});
  activeDistrictPoly=poly;
  // Highlight sidebar
  document.querySelectorAll('.zone-item').forEach(function(el,i){
    if(el.querySelector('.zone-name').textContent===d.name) el.classList.add('active');
  });
  // Info popup
  gInfoWindow.setContent(
    '<div style="font-family:sans-serif;padding:4px 2px;min-width:160px">'+
    '<div style="font-weight:800;font-size:.92rem;color:#111;margin-bottom:3px">'+d.name+'</div>'+
    '<div style="font-size:.78rem;color:#666;margin-bottom:8px">Bobi Group обслужва района</div>'+
    '<div style="padding:4px 10px;background:#0066ff;border-radius:100px;display:inline-block;font-size:.7rem;font-weight:700;color:#fff">✓ Активна зона</div>'+
    '</div>'
  );
  gInfoWindow.setPosition(latLng||{lat:d.lat,lng:d.lng});
  gInfoWindow.open(gmap);
}

function deselectAll(){
  districtPolygons.forEach(function(p){p.setOptions({fillOpacity:0,strokeOpacity:0});});
  document.querySelectorAll('.zone-item').forEach(function(el){el.classList.remove('active');});
  if(gInfoWindow) gInfoWindow.close();
  activeDistrictPoly=null;
}

function flyTo(lat,lng,name,e){
  if(e){
    document.querySelectorAll('.zone-item').forEach(function(el){el.classList.remove('active');});
    e.currentTarget.classList.add('active');
  }
  if(!gmap){return;}
  gmap.panTo({lat:lat,lng:lng});
  gmap.setZoom(13);
  // Find and select matching district polygon
  districtPolygons.forEach(function(poly){
    if(poly.districtData && poly.districtData.name===name){
      selectDistrict(poly,poly.districtData,{lat:lat,lng:lng});
    }
  });
}

// Load Google Maps API
(function(){
  var API_KEY='AIzaSyB_vElYozorZKyAUDyXDmSLkcEyMr7M5ow';
  if(API_KEY==='YOUR_API_KEY'){
    document.getElementById('apiNotice').classList.add('show');
    renderFallbackMap();
    return;
  }
  var s=document.createElement('script');
  s.src='https://maps.googleapis.com/maps/api/js?key='+API_KEY+'&callback=initMap&language=bg&region=BG';
  s.async=true;s.defer=true;
  document.head.appendChild(s);
})();

// ── FALLBACK canvas map (no API key) ──
function renderFallbackMap(){
  var container=document.getElementById('gmap');
  var canvas=document.createElement('canvas');
  var DPR=window.devicePixelRatio||1;
  var W=container.clientWidth||800, H=500;
  canvas.width=W*DPR; canvas.height=H*DPR;
  canvas.style.width=W+'px'; canvas.style.height=H+'px';
  container.appendChild(canvas);
  var ctx=canvas.getContext('2d');
  ctx.scale(DPR,DPR);

  // Map-like background (roads, terrain feel)
  function drawBase(){
    // Light map background (like Google Maps)
    ctx.fillStyle='#e8e0d8';
    ctx.fillRect(0,0,W,H);

    // Subtle grid (roads feel)
    ctx.strokeStyle='rgba(255,255,255,0.55)';
    ctx.lineWidth=1;
    for(var x=0;x<W;x+=32){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(var y=0;y<H;y+=32){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}

    // Main roads (horizontal + vertical)
    ctx.strokeStyle='#fff';
    ctx.lineWidth=3;
    [[W*.5,0,W*.5,H],[0,H*.5,W,H*.5],[W*.35,0,W*.35,H],[0,H*.35,W,H*.35],
     [W*.65,0,W*.65,H],[0,H*.65,W,H*.65]].forEach(function(l){
      ctx.beginPath();ctx.moveTo(l[0],l[1]);ctx.lineTo(l[2],l[3]);ctx.stroke();
    });
  }

  var cx=W*.5, cy=H*.49, rx=W*.36, ry=H*.38;

  // District data for canvas
  var dists=[
    {x:.38,y:.27,n:'Надежда',id:0},{x:.32,y:.42,n:'Красна пол.',id:1},
    {x:.37,y:.56,n:'Красно с.',id:2},{x:.40,y:.68,n:'Овча купел',id:3},
    {x:.44,y:.76,n:'Витоша',id:4},{x:.52,y:.71,n:'Лозенец',id:5},
    {x:.51,y:.49,n:'Център',id:6},{x:.57,y:.32,n:'Кремиковци',id:7},
    {x:.60,y:.44,n:'Слатина',id:8},{x:.61,y:.60,n:'Младост',id:9},
    {x:.64,y:.72,n:'Панчарево',id:10},{x:.24,y:.48,n:'Банкя',id:11},
    {x:.42,y:.42,n:'Средец',id:12}
  ];

  var activeId=-1;

  function getDotPos(d){
    return {
      x: cx+(d.x-.5)*rx*2,
      y: cy+(d.y-.5)*ry*2
    };
  }

  function isInsideEllipse(mx,my){
    return Math.pow((mx-cx)/rx,2)+Math.pow((my-cy)/ry,2)<=1;
  }

  function getHoveredDist(mx,my){
    for(var i=dists.length-1;i>=0;i--){
      var p=getDotPos(dists[i]);
      if(Math.abs(mx-p.x)<36&&Math.abs(my-p.y)<14) return i;
    }
    return -1;
  }

  var pulse=0, hoverId=-1;

  function draw(){
    ctx.clearRect(0,0,W,H);
    drawBase();

    // RED outside Sofia
    ctx.save();
    ctx.fillStyle='rgba(200,30,30,0.38)';
    ctx.beginPath();
    ctx.rect(0,0,W,H);
    ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2);
    ctx.fill('evenodd');
    ctx.restore();

    // Sofia interior — light/clear
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2);
    ctx.clip();
    ctx.fillStyle='rgba(255,255,255,0.15)';
    ctx.fillRect(0,0,W,H);
    ctx.restore();

    // Active district highlight (blue)
    if(activeId>=0){
      var ad=getDotPos(dists[activeId]);
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(ad.x,ad.y,52,30,0,0,Math.PI*2);
      ctx.fillStyle='rgba(0,102,255,0.22)';
      ctx.fill();
      ctx.strokeStyle='#0066ff';
      ctx.lineWidth=2;
      ctx.stroke();
      ctx.restore();
    }

    // Sofia border
    pulse=(pulse+0.5)%360;
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2);
    ctx.strokeStyle='#cc1111';
    ctx.lineWidth=3;
    ctx.stroke();

    // Subtle glow on border
    ctx.beginPath();
    ctx.ellipse(cx,cy,rx+4,ry+4,0,0,Math.PI*2);
    ctx.strokeStyle='rgba(200,30,30,'+(0.12+0.06*Math.sin(pulse*Math.PI/180))+')';
    ctx.lineWidth=6;
    ctx.stroke();
    ctx.restore();

    // District dots + labels
    dists.forEach(function(d){
      var p=getDotPos(d);
      var isActive=d.id===activeId;
      var isHover=d.id===hoverId;

      // Dot
      ctx.beginPath();
      ctx.arc(p.x,p.y,isActive?7:5,0,Math.PI*2);
      ctx.fillStyle=isActive?'#0066ff':'rgba(0,102,255,0.75)';
      ctx.fill();
      if(isActive||isHover){
        ctx.strokeStyle='rgba(0,102,255,0.35)';
        ctx.lineWidth=6;
        ctx.stroke();
      }

      // Label pill
      ctx.font=(isActive?'bold ':'')+'11px sans-serif';
      var tw=ctx.measureText(d.n).width;
      var pw=tw+14, ph=18, px=p.x-pw/2, py=p.y-28;

      ctx.fillStyle=isActive?'#0066ff':'rgba(255,255,255,0.9)';
      ctx.beginPath();
      ctx.roundRect(px,py,pw,ph,5);
      ctx.fill();

      ctx.strokeStyle=isActive?'rgba(0,102,255,0.6)':'rgba(0,0,0,0.12)';
      ctx.lineWidth=1;
      ctx.stroke();

      ctx.fillStyle=isActive?'#fff':'#222';
      ctx.textAlign='center';
      ctx.fillText(d.n,p.x,py+12);
    });

    // Center Sofia label
    ctx.fillStyle='rgba(80,80,80,0.7)';
    ctx.font='bold 15px sans-serif';
    ctx.textAlign='center';
    ctx.fillText('СТОЛИЧНА ОБЩИНА',cx,cy+4);

    requestAnimationFrame(draw);
  }

  // Mouse events
  canvas.style.cursor='default';
  canvas.addEventListener('mousemove',function(e){
    var rect=canvas.getBoundingClientRect();
    var mx=(e.clientX-rect.left), my=(e.clientY-rect.top);
    var h=getHoveredDist(mx,my);
    hoverId=h;
    canvas.style.cursor=(h>=0||isInsideEllipse(mx,my))?'pointer':'default';
  });

  canvas.addEventListener('click',function(e){
    var rect=canvas.getBoundingClientRect();
    var mx=(e.clientX-rect.left), my=(e.clientY-rect.top);
    var h=getHoveredDist(mx,my);
    if(h>=0){
      activeId=(activeId===h)?-1:h;
      // Sync sidebar
      document.querySelectorAll('.zone-item').forEach(function(el,i){
        el.classList.remove('active');
      });
      if(activeId>=0){
        var items=document.querySelectorAll('.zone-item');
        if(items[activeId]) items[activeId].classList.add('active');
      }
    } else if(!isInsideEllipse(mx,my)){
      activeId=-1;
      document.querySelectorAll('.zone-item').forEach(function(el){el.classList.remove('active');});
    }
  });

  // Sidebar click sync
  window.flyTo=function(lat,lng,name,e){
    if(e){
      document.querySelectorAll('.zone-item').forEach(function(el){el.classList.remove('active');});
      e.currentTarget.classList.add('active');
    }
    for(var i=0;i<dists.length;i++){
      if(dists[i].n===name||name.indexOf(dists[i].n)===0){
        activeId=i; break;
      }
    }
  };

  draw();
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
