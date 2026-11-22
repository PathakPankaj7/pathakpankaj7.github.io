(()=>{const photos=[
['trinity-great-court-approach.webp','Great Court approach · Trinity College, Cambridge','cambridge', 'center 50%', 'cover'],
['oxfordshire-fireworks.webp','Fireworks over Oxfordshire','oxford', 'center 75%', 'cover'],
['bari-path-blooms.webp','Blooming pathway · Bari, Italy','bari', 'center 55%', 'cover'],
['london-tower-bridge-night.webp', 'Tower Bridge illuminated at night · London', 'london', 'center 85%', 'cover'],
['rome-colosseum-front.webp','The Colosseum · Rome, Italy','rome', 'center 45%', 'cover'],
["milan-evening-street.webp", "Evening streetscape · Milan, Italy", "milan", 'center 66%', 'cover'],
['venice-waterfront-bridge.webp','Waterfront and bridge view · Venice, Italy','venice', 'center 65%', 'cover'],
['radcliffe-camera-oxford.webp','Radcliffe Camera · Oxford','oxford', 'center 27%', 'cover'],
['iitd-hauz-khas-sunset.webp', 'Hauz Khas lake at sunset · Delhi', 'delhi', 'center 65%', 'cover'],
['campus-4.webp','Central Lawn · IIT Delhi','delhi', 'center 55%', 'cover'],
['river-cam-willow.webp','Riverside by the River Cam · Cambridge','cambridge', 'center 50%', 'cover'],
['oxfordshire-bonfire.webp','Bonfire night · Oxfordshire','oxford', 'center 50%', 'cover'],
['venice-canal-dome.webp','Canal and green dome · Venice, Italy','venice', 'center 50%', 'cover'],
['newton-statue-trinity.webp','Sir Isaac Newton statue · Trinity College, Cambridge','cambridge', 'center 28%', 'cover'],
['bari-beach-light.webp','Morning shoreline · Bari, Italy','bari', 'center 55%', 'cover'],
['cambridge-river-narrowboats.webp', 'Narrowboats along the River Cam · Cambridge', 'cambridge', 'center 65%', 'cover'],
["milan-tram.webp", "Historic yellow tram · Milan, Italy", "milan", 'center 65%', 'cover'],
['oxford-city-facade.webp','Oxford city centre · University trip','oxford', 'center 48%', 'cover'],
['rome-forum-overview.webp','Roman Forum ruins · Rome, Italy','rome', 'center 55%', 'cover'],
['west-hub-night.webp','West Hub after dark · West Cambridge','cambridge', 'center 80%', 'cover'],
['bari-pine-shadows.webp','Pine grove at golden hour · Bari, Italy','bari', 'center 50%', 'cover'],
['london-sky-garden-thames.webp', 'Tower Bridge and the Thames from Sky Garden · London', 'london', 'center 60%', 'cover'],
['venice-glass-bridge.webp','Glass bridge over the canal · Venice, Italy','venice', 'center 65%', 'cover'],
['campus-7.webp','Great Court · Trinity College, Cambridge','cambridge', 'center 50%', 'cover'],
['iitd-festive-bonfire.webp','Festive evening bonfire · IIT Delhi','delhi', 'center 55%', 'cover'],
['rome-forum-vittoriano.webp','Roman Forum with Vittoriano view · Rome, Italy','rome', 'center 52%', 'cover'],
['backs-spring-cambridge.webp','The Backs in spring · Cambridge','cambridge', 'center 57%', 'cover'],
['london-sky-garden-city.webp', 'St Paul’s Cathedral and the skyline from Sky Garden · London', 'london', 'center 68%', 'cover'],
['iitd-drone-show-field.webp','Drone show over the field · IIT Delhi','delhi', 'center 50%', 'cover'],
["milan-centrale.webp", "Milano Centrale railway station · Milan, Italy", "milan", 'center 35%', 'cover'],
['campus-maxwell.webp','Maxwell Centre · Cavendish Laboratory, Cambridge','cambridge', 'center 50%', 'cover'],
['rome-colosseum-columns.webp','Colosseum and ancient columns · Rome, Italy','rome', 'center 68%', 'cover'],
['oxford-ivy-facade.webp', 'Ivy-clad architecture · Oxford', 'oxford', 'center 50%', 'cover'],
['oxfordshire-light-show.webp','Festival lights at night · Oxfordshire','oxford', 'center 65%', 'cover'],
['punting-bridge-cambridge.webp','Newton’s Bridge over the River Cam · Cambridge','cambridge', 'center 60%', 'cover'],
['iitd-main-building-day.webp','Main Building promenade · IIT Delhi','delhi', 'center 50%', 'cover'],
['campus-3.webp','Ray Dolby Centre · Cavendish Laboratory, Cambridge','cambridge', 'center 50%', 'cover'],
['london-westminster-day.webp', 'Big Ben and the Houses of Parliament · London', 'london', 'center 45%', 'cover'],
['venice-grand-canal.webp','Grand Canal view · Venice, Italy','venice', 'center 65%', 'cover'],
['campus-9.webp','Newton’s Apple Tree · Trinity College, Cambridge','cambridge', 'center 55%', 'contain'],
['bari-garden-turn.webp','Garden trail · Bari, Italy','bari', 'center 55%', 'cover'],
['campus-2.webp','Nevile’s Court · Trinity College, Cambridge','cambridge', 'center 50%', 'cover'],
['london-eye.webp', 'London Eye and the River Thames · London', 'london', 'center 65%', 'cover']];const stage=document.getElementById('gallery-stage'), layers=[...stage.querySelectorAll('.gallery-layer')], pause=document.getElementById('gallery-pause'), reduced=matchMedia('(prefers-reduced-motion: reduce)');let list=photos.slice(),i=0,slot=1,paused=reduced.matches,timer;
function show(n){i=(n+list.length)%list.length;const p=list[i];const old=layers[slot];slot=1-slot;const next=layers[slot];next.classList.remove('active');next.style.backgroundImage=`url("${p[0]}?v=117")`;next.style.backgroundPosition=p[3]||'center';next.dataset.chapel='false';next.style.backgroundSize=p[4]||'cover';next.dataset.fit=p[4]||'cover';next.style.setProperty('--photo',`url("${p[0]}?v=117")`);next.style.backgroundRepeat='no-repeat';void next.offsetWidth;next.classList.add('active');old.classList.remove('active');document.getElementById('gallery-caption').textContent=p[1];document.getElementById('gallery-count').textContent=`${i+1} / ${list.length}`;sync();}
function fit(){if(document.body.dataset.view==='gallery'){stage.parentElement.style.height=Math.max(200,window.innerHeight-document.querySelector('header').getBoundingClientRect().height)+'px';}}
window.addEventListener('resize',fit);
const locations=document.getElementById('gallery-locations');
locations.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
const key=button.dataset.location;
list=key==='all'?photos.slice():photos.filter(p=>p[2]===key);
locations.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
show(0);
}));

function sync(){fit();pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow');layers.forEach(l=>l.style.animationPlayState=paused?'paused':'running');clearInterval(timer);if(!paused&&document.body.dataset.view==='gallery')timer=setInterval(()=>{if(!document.hidden)show(i+1)},4000);}
document.getElementById('gallery-prev').onclick=()=>show(i-1);document.getElementById('gallery-next').onclick=()=>show(i+1);pause.onclick=()=>{paused=!paused;sync()};document.getElementById('gallery-full').onclick=()=>{if(document.fullscreenElement)document.exitFullscreen?.();else if(stage.requestFullscreen)stage.requestFullscreen().catch(()=>{});else stage.webkitRequestFullscreen?.();};let previousView=document.body.dataset.view;new MutationObserver(()=>{const view=document.body.dataset.view;if(view==='gallery'&&previousView!=='gallery'){show(0);}previousView=view;sync();}).observe(document.body,{attributes:true,attributeFilter:['data-view']});show(0);})();
