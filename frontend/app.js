
const audio=document.getElementById('audio');const srcEl=document.getElementById('src');const openLink=document.getElementById('openLink');
const vu=document.getElementById('vu');const userSel=document.getElementById('user');const label=document.getElementById('label');
const startBtn=document.getElementById('start');const stopBtn=document.getElementById('stop');const toast=document.getElementById('toast');
async function loadCrate(){const res=await fetch('tracks.json',{cache:'no-store'});const list=await res.json();const ul=document.getElementById('crate');ul.innerHTML='';
list.forEach(t=>{const li=document.createElement('li');li.textContent=`${t.title} — ${t.source}`;const b=document.createElement('button');b.className='btn';b.style.marginLeft='8px';b.textContent='Load';b.onclick=()=>setTrack(t);li.appendChild(b);ul.appendChild(li);});}
function setTrack(t){srcEl.src=t.url;openLink.href=t.url;label.style.backgroundImage=t.art?`url('${t.art}')`:'';audio.load();showToast();}
startBtn.onclick=()=>audio.play();stopBtn.onclick=()=>audio.pause();
function showToast(){toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1500);}
(function(){const p=new URLSearchParams(location.search);const t=p.get('t');const u=p.get('user');const art=p.get('art');
if(u){const val=u.toLowerCase();if(![...userSel.options].some(o=>o.value===val)){const opt=document.createElement('option');opt.value=val;opt.text=val;userSel.appendChild(opt);}userSel.value=val;}
if(art){label.style.backgroundImage=`url('${art}')`;}
if(t){fetch('tracks.json').then(r=>r.json()).then(list=>{const f=list.find(x=>x.slug===t);if(f){setTrack(f);}});} })();
try{const C=new (window.AudioContext||window.webkitAudioContext)();const s=C.createMediaElementSource(audio);const a=C.createAnalyser();s.connect(a);a.connect(C.destination);
const buf=new Uint8Array(a.frequencyBinCount);(function tick(){a.getByteFrequencyData(buf);const level=buf.reduce((x,y)=>x+y,0)/buf.length;vu.value=Math.min(100,Math.max(0,(level/255)*100));requestAnimationFrame(tick);})();}catch(e){}
loadCrate();
// PWA install
let promptEvt=null;window.addEventListener('beforeinstallprompt',(e)=>{e.preventDefault();promptEvt=e;const b=document.getElementById('installBtn');b.hidden=false;b.onclick=()=>promptEvt&&promptEvt.prompt();});
