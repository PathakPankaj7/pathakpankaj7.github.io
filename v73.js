(()=>{const photos=[
['trinity-great-court-approach.webp','Great Court approach · Trinity College, Cambridge','cambridge'],
['oxfordshire-fireworks.webp','Fireworks over Oxfordshire','oxford'],
['bari-path-blooms.webp','Blooming pathway · Bari, Italy','bari'],
['london-tower-bridge-night.webp', 'Tower Bridge illuminated at night · London', 'london', 'center 90%', 'cover'],
['rome-colosseum-front.webp','The Colosseum · Rome, Italy','rome'],
["milan-evening-street.webp", "Evening streetscape · Milan, Italy", "milan", "center", "contain"],
['maxwell-from-rdc-top.webp','Maxwell Centre from the top of the Ray Dolby Centre · Cambridge','cambridge'],
['venice-waterfront-bridge.webp','Waterfront and bridge view · Venice, Italy','venice'],
['radcliffe-camera-oxford.webp','Radcliffe Camera · Oxford','oxford'],
["delhi-metro-rush.webp", "Rush hour on the Delhi Metro · Delhi", "delhi", "center 70%", "cover"],
['campus-4.webp','Central Lawn · IIT Delhi','delhi'],
['london-big-ben-night.webp', 'Big Ben at night · Westminster, London', 'london', 'center', 'contain'],
['river-cam-willow.webp','Riverside by the River Cam · Cambridge','cambridge'],
['oxfordshire-bonfire.webp','Bonfire night · Oxfordshire','oxford'],
['venice-canal-dome.webp','Canal and green dome · Venice, Italy','venice'],
['newton-statue-trinity.webp','Sir Isaac Newton statue · Trinity College, Cambridge','cambridge'],
['bari-beach-light.webp','Morning shoreline · Bari, Italy','bari'],
['cambridge-river-narrowboats.webp', 'Narrowboats along the River Cam · Cambridge', 'cambridge', 'center 65%', 'cover'],
["milan-tram.webp", "Historic yellow tram · Milan, Italy", "milan", "center 65%", "cover"],
['oxford-city-facade.webp','Oxford city centre · University trip','oxford'],
['iitd-drone-show-night.webp','Drone show over campus · IIT Delhi','delhi'],
["rome-vittoriano.webp", "Altare della Patria (Vittoriano) · Rome, Italy", "rome", "center", "contain"],
['rome-forum-overview.webp','Roman Forum ruins · Rome, Italy','rome'],
['west-hub-night.webp','West Hub after dark · West Cambridge','cambridge'],
['bari-pine-shadows.webp','Pine grove at golden hour · Bari, Italy','bari'],
['london-sky-garden-thames.webp', 'Tower Bridge and the Thames from Sky Garden · London', 'london', 'center 57%', 'cover'],
['venice-glass-bridge.webp','Glass bridge over the canal · Venice, Italy','venice'],
['campus-7.webp','Great Court · Trinity College, Cambridge','cambridge'],
['iitd-festive-bonfire.webp','Festive evening bonfire · IIT Delhi','delhi'],
['rome-forum-vittoriano.webp','Roman Forum with Vittoriano view · Rome, Italy','rome'],
['backs-spring-cambridge.webp','The Backs in spring · Cambridge','cambridge'],
['london-sky-garden-city.webp', 'St Paul’s Cathedral and the skyline from Sky Garden · London', 'london', 'center 65%', 'cover'],
['iitd-drone-show-field.webp','Drone show over the field · IIT Delhi','delhi'],
["milan-centrale.webp", "Milano Centrale railway station · Milan, Italy", "milan", "center", "cover"],
['oxford-classical-columns.webp','Historic Oxford streetscape · University trip','oxford'],
['campus-maxwell.webp','Maxwell Centre · Cavendish Laboratory, Cambridge','cambridge'],
['bari-riva-marina.webp','Riva Marina Resort · Bari, Italy','bari'],
['rome-colosseum-columns.webp','Colosseum and ancient columns · Rome, Italy','rome'],
['oxford-ivy-facade.webp', 'Ivy-clad architecture · Oxford', 'oxford', 'center', 'contain'],
['maxwell-dusk-bikes.webp','Maxwell Centre at dusk · West Cambridge','cambridge'],
['oxfordshire-light-show.webp','Festival lights at night · Oxfordshire','oxford'],
['punting-bridge-cambridge.webp','Newton’s Bridge over the River Cam · Cambridge','cambridge'],
['iitd-main-building-day.webp','Main Building promenade · IIT Delhi','delhi'],
['campus-3.webp','Ray Dolby Centre · Cavendish Laboratory, Cambridge','cambridge'],
['london-westminster-day.webp', 'Big Ben and the Houses of Parliament · London', 'london', 'right center', 'cover'],
["milan-duomo.webp", "Duomo di Milano · Milan, Italy", "milan", "center", "contain"],
['venice-grand-canal.webp','Grand Canal view · Venice, Italy','venice'],
['campus-9.webp','Newton’s Apple Tree · Trinity College, Cambridge','cambridge'],
['rome-colosseum-columns-close.webp','Ancient columns beside the Colosseum · Rome, Italy','rome'],
['bari-garden-turn.webp','Garden trail · Bari, Italy','bari'],
['campus-2.webp','Nevile’s Court · Trinity College, Cambridge','cambridge'],
['london-eye.webp', 'London Eye and the River Thames · London', 'london', 'center 65%', 'cover'],
['ray-dolby-dusk.webp','Ray Dolby Centre at dusk · West Cambridge','cambridge']];const stage=document.getElementById('gallery-stage'), layers=[...stage.querySelectorAll('.gallery-layer')], pause=document.getElementById('gallery-pause'), reduced=matchMedia('(prefers-reduced-motion: reduce)');let list=photos.slice(),i=0,slot=1,paused=reduced.matches,timer;
function show(n){i=(n+list.length)%list.length;const p=list[i];const old=layers[slot];slot=1-slot;const next=layers[slot];next.classList.remove('active');next.style.backgroundImage=`url("${p[0]}?v=113")`;next.style.backgroundPosition=p[0]==='newton-statue-trinity.webp'?'center 12%':p[3]||'center';next.dataset.chapel='false';next.style.backgroundSize=p[4]||(p[0]==='newton-statue-trinity.webp'?'contain':'cover');next.style.backgroundRepeat='no-repeat';void next.offsetWidth;next.classList.add('active');old.classList.remove('active');document.getElementById('gallery-caption').textContent=p[1];document.getElementById('gallery-count').textContent=`${i+1} / ${list.length}`;sync();}
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
