(()=>{const photos=[
['trinity-great-court-approach.webp','Great Court approach · Trinity College','cambridge', 'center 50%', 'cover'],
['oxfordshire-fireworks.webp','Fireworks over Oxfordshire','oxford', 'center 75%', 'cover'],
['bari-path-blooms.webp','Blooming pathway','bari', 'center 55%', 'cover'],
['london-tower-bridge-night.webp', 'Tower Bridge illuminated at night', 'london', 'center 85%', 'cover'],
['rome-colosseum-front.webp','The Colosseum','rome', 'center 45%', 'cover'],
["milan-evening-street.webp", "Evening streetscape", "milan", 'center 66%', 'cover'],
['venice-waterfront-bridge.webp','Waterfront and bridge view','venice', 'center 65%', 'cover'],
['radcliffe-camera-oxford.webp','Radcliffe Camera · University of Oxford','oxford', 'center 27%', 'cover'],
['iitd-hauz-khas-sunset.webp', 'Hauz Khas lake at sunset', 'delhi', 'center 65%', 'cover'],
['campus-4.webp','Central Lawn · IIT Delhi','delhi', 'center 55%', 'cover'],
['river-cam-willow.webp','Riverside by the River Cam','cambridge', 'center 50%', 'cover'],
['oxfordshire-bonfire.webp','Bonfire night · Oxfordshire','oxford', 'center 50%', 'cover'],
['venice-canal-dome.webp','Canal and green dome','venice', 'center 50%', 'cover'],
['newton-statue-trinity.webp','Sir Isaac Newton statue · Trinity College','cambridge', 'center top', 'cover'],
['bari-beach-light.webp','Morning shoreline','bari', 'center 55%', 'cover'],
['cambridge-river-narrowboats.webp', 'Narrowboats along the River Cam', 'cambridge', 'center 65%', 'cover'],
["milan-tram.webp", "Historic yellow tram", "milan", 'center 65%', 'cover'],
['oxford-city-facade.webp','Oxford city centre','oxford', 'center 48%', 'cover'],
['rome-forum-overview.webp','Roman Forum ruins','rome', 'center 55%', 'cover'],
['west-hub-night.webp','West Hub after dark','cambridge', 'center 80%', 'cover'],
['bari-pine-shadows.webp','Pine grove at golden hour','bari', 'center 50%', 'cover'],
['london-sky-garden-thames.webp', 'Tower Bridge and the Thames from Sky Garden', 'london', 'center 60%', 'cover'],
['venice-glass-bridge.webp','Glass bridge over the canal','venice', 'center 65%', 'cover'],
['campus-7.webp','Great Court · Trinity College','cambridge', 'center 50%', 'cover'],
['iitd-festive-bonfire.webp','Festive evening bonfire · IIT Delhi','delhi', 'center 55%', 'cover'],
['rome-forum-vittoriano.webp','Roman Forum with Vittoriano view','rome', 'center 52%', 'cover'],
['backs-spring-cambridge.webp','The Backs in spring','cambridge', 'center 57%', 'cover'],
['london-sky-garden-city.webp', 'St Paul’s Cathedral and the skyline from Sky Garden', 'london', 'center 68%', 'cover'],
['iitd-drone-show-field.webp','Drone show over the field · IIT Delhi','delhi', 'center 50%', 'cover'],
["milan-centrale.webp", "Milano Centrale railway station", "milan", 'center 35%', 'cover'],
['campus-maxwell.webp','Maxwell Centre · Cavendish Laboratory','cambridge', 'center 50%', 'cover'],
['rome-colosseum-columns.webp','Colosseum and ancient columns','rome', 'center 68%', 'cover'],
['oxford-ivy-facade.webp', 'Ivy-clad architecture', 'oxford', 'center 50%', 'cover'],
['oxfordshire-light-show.webp','Festival lights at night · Oxfordshire','oxford', 'center 65%', 'cover'],
['punting-bridge-cambridge.webp','Newton’s Bridge over the River Cam','cambridge', 'center 60%', 'cover'],
['campus-3.webp','Ray Dolby Centre · Cavendish Laboratory','cambridge', 'center 50%', 'cover'],
['london-westminster-day.webp', 'Big Ben and the Houses of Parliament', 'london', 'center 45%', 'cover'],
['venice-grand-canal.webp','Grand Canal view','venice', 'center 65%', 'cover'],
['campus-9.webp','Newton’s Apple Tree · Trinity College','cambridge', 'center 45%', 'cover'],
['bari-garden-turn.webp','Garden trail','bari', 'center 55%', 'cover'],
['campus-2.webp','Nevile’s Court · Trinity College','cambridge', 'center 50%', 'cover'],
['london-eye.webp', 'London Eye and the River Thames', 'london', 'center 65%', 'cover']];const stage=document.getElementById('gallery-stage'), layers=[...stage.querySelectorAll('.gallery-layer')], pause=document.getElementById('gallery-pause'), reduced=matchMedia('(prefers-reduced-motion: reduce)');let list=photos.filter(p=>p[2]==='delhi'),i=0,slot=1,paused=reduced.matches,timer;
function show(n){i=(n+list.length)%list.length;const p=list[i];const old=layers[slot];slot=1-slot;const next=layers[slot];next.classList.remove('active');next.style.backgroundImage=`url("${p[0]}?v=118")`;next.style.backgroundPosition=p[3]||'center';next.dataset.chapel='false';next.dataset.subject=p[0];next.style.backgroundSize=p[4]||'cover';next.dataset.fit=p[4]||'cover';next.style.setProperty('--photo',`url("${p[0]}?v=118")`);next.style.backgroundRepeat='no-repeat';void next.offsetWidth;next.classList.add('active');old.classList.remove('active');document.getElementById('gallery-caption').textContent=p[1];document.getElementById('gallery-count').textContent=`${i+1} / ${list.length}`;sync();}
function fit(){if(document.body.dataset.view==='gallery'){stage.parentElement.style.height=Math.max(200,window.innerHeight-document.querySelector('header').getBoundingClientRect().height)+'px';const w=stage.clientWidth,h=stage.clientHeight;if(w&&h){layers.forEach(l=>{if(l.dataset.subject!=='newton-statue-trinity.webp')return;const cover=Math.max(w/1350,h/1800),scale=Math.max(cover,Math.min(cover*1.35,h/(2*0.19*1800)));const iw=1350*scale,ih=1800*scale;const x=Math.min(0,Math.max(w-iw,w/2-iw*.46)),y=Math.min(0,Math.max(h-ih,h/2-ih*.19));l.style.backgroundSize=`${iw}px ${ih}px`;l.style.backgroundPosition=`${x}px ${y}px`;});}}}
window.addEventListener('resize',fit);
const locations=document.getElementById('gallery-locations');
// Keep the photo list strictly scoped to the currently selected location.
// Clear both slideshow layers when changing locations so the previous city's
// image cannot appear during a crossfade.
let selectedLocation='delhi';
function selectLocation(key){
  const chosen=photos.filter(p=>p[2]===key);
  if(!chosen.length)return;
  clearInterval(timer);
  selectedLocation=key;
  list=chosen;
  i=0;
  layers.forEach(layer=>{
    layer.classList.remove('active');
    layer.style.backgroundImage='none';
    layer.style.removeProperty('--photo');
    layer.dataset.subject='';
    layer.dataset.fit='cover';
  });
  locations.querySelectorAll('button').forEach(b=>
    b.setAttribute('aria-pressed',String(b.dataset.location===key)));
  show(0);
}
locations.querySelectorAll('button').forEach(button=>
  button.addEventListener('click',()=>selectLocation(button.dataset.location)));


function sync(){fit();pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow');layers.forEach(l=>l.style.animationPlayState=paused?'paused':'running');clearInterval(timer);if(!paused&&document.body.dataset.view==='gallery')timer=setInterval(()=>{if(!document.hidden)show(i+1)},4000);}
document.getElementById('gallery-prev').onclick=()=>show(i-1);document.getElementById('gallery-next').onclick=()=>show(i+1);pause.onclick=()=>{paused=!paused;sync()};document.getElementById('gallery-full').onclick=()=>{if(document.fullscreenElement)document.exitFullscreen?.();else if(stage.requestFullscreen)stage.requestFullscreen().catch(()=>{});else stage.webkitRequestFullscreen?.();};let previousView=document.body.dataset.view;new MutationObserver(()=>{const view=document.body.dataset.view;if(view==='gallery'&&previousView!=='gallery'){selectLocation('delhi');}previousView=view;sync();}).observe(document.body,{attributes:true,attributeFilter:['data-view']});show(0);})();
