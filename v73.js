(()=>{const photos=[
['campus-4.webp','IIT Delhi · Central Lawn','iitd'],
['campus-10.webp','IIT Delhi · Campus cat','iitd','center 65%'],
['campus-12.webp','IIT Delhi · Peacock lawn','iitd','center 90%'],
['trinity-great-court-approach.webp','Great Court approach · Trinity College, Cambridge','cambridge'],
['newton-statue-trinity.webp','Sir Isaac Newton statue · Trinity College, Cambridge','cambridge','center 24%'],
['campus-9.webp','Newton’s Apple Tree · Trinity College, Cambridge','cambridge','center 47%'],
['campus-7.webp','Great Court · Trinity College, Cambridge','cambridge'],
['campus-2.webp','Nevile’s Court · Trinity College, Cambridge','cambridge'],
['backs-spring-cambridge.webp','The Backs in spring · Cambridge','cambridge'],
['river-cam-willow.webp','Riverside by the River Cam · Cambridge','cambridge'],
['kings-backs-lawn.webp','King’s College Chapel from The Backs · Cambridge','cambridge','28% 100%'],
['punting-bridge-cambridge.webp','Newton’s Bridge over the River Cam · Cambridge','cambridge','center 56%'],
['campus-maxwell.webp','Maxwell Centre · Cavendish Laboratory, Cambridge','cambridge'],
['maxwell-dusk-bikes.webp','Maxwell Centre at dusk · West Cambridge','cambridge','center 45%'],
['campus-3.webp','Ray Dolby Centre · Cavendish Laboratory, Cambridge','cambridge'],
['ray-dolby-dusk.webp','Ray Dolby Centre at dusk · West Cambridge','cambridge','center 42%'],
['west-hub-night.webp','West Hub after dark · West Cambridge','cambridge','center 52%']];const stage=document.getElementById('gallery-stage'), layers=[...stage.querySelectorAll('.gallery-layer')], pause=document.getElementById('gallery-pause'), reduced=matchMedia('(prefers-reduced-motion: reduce)');let list=photos,i=0,slot=1,paused=reduced.matches,timer;
function show(n){i=(n+list.length)%list.length;const p=list[i];const old=layers[slot];slot=1-slot;const next=layers[slot];next.classList.remove('active');next.style.backgroundImage=`url("${p[0]}")`;next.style.backgroundPosition=p[3]||'center';next.dataset.chapel=String(p[0]==='kings-backs-lawn.webp');next.style.backgroundSize='cover';void next.offsetWidth;next.classList.add('active');old.classList.remove('active');document.getElementById('gallery-caption').textContent=p[1];document.getElementById('gallery-count').textContent=`${i+1} / ${list.length}`;sync();}
function fit(){if(document.body.dataset.view==='gallery'){stage.parentElement.style.height=Math.max(200,window.innerHeight-document.querySelector('header').getBoundingClientRect().height)+'px';layers.forEach(l=>{if(l.dataset.chapel==='true'){l.style.backgroundSize=Math.ceil(Math.max(stage.clientWidth,stage.clientHeight*4/3)*1.35)+'px auto';}});}}
window.addEventListener('resize',fit);
function sync(){fit();pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow');layers.forEach(l=>l.style.animationPlayState=paused?'paused':'running');clearInterval(timer);if(!paused&&document.body.dataset.view==='gallery')timer=setInterval(()=>{if(!document.hidden)show(i+1)},8000);}
document.getElementById('gallery-prev').onclick=()=>show(i-1);document.getElementById('gallery-next').onclick=()=>show(i+1);pause.onclick=()=>{paused=!paused;sync()};document.getElementById('gallery-full').onclick=()=>{if(document.fullscreenElement)document.exitFullscreen?.();else if(stage.requestFullscreen)stage.requestFullscreen().catch(()=>{});else stage.webkitRequestFullscreen?.();};new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['data-view']});show(0);})();