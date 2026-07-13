'use strict';
const canvas=document.getElementById('game'),ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;
const ui={energy:document.getElementById('energy'),hp:document.getElementById('castleHp'),wave:document.getElementById('wave'),banner:document.getElementById('banner'),toast:document.getElementById('toast'),start:document.getElementById('startScreen'),end:document.getElementById('endScreen'),pause:document.getElementById('pauseScreen')};
const COLS=9,ROWS=5,CELL=82,OX=132,OY=67,LANE_H=82;
const unitsDef={
 sunny:{cost:50,hp:80,rate:7000,cool:5000,emoji:'🌻',name:'Sunny'},
 peach:{cost:75,hp:100,rate:1450,damage:22,cool:4000,emoji:'🍑',name:'Peachy'},
 corn:{cost:125,hp:120,rate:1150,damage:16,cool:6500,emoji:'🌽',name:'Cobsworth'},
 spud:{cost:100,hp:520,rate:0,cool:7000,emoji:'🥔',name:'Spud'}
};
let state;
function reset(){state={running:false,paused:false,energy:175,castleHp:10,wave:1,maxWave:8,selected:null,units:[],enemies:[],shots:[],particles:[],last:0,nextSpawn:0,spawned:0,waveQuota:6,between:false,cooldowns:{sunny:0,peach:0,corn:0,spud:0},hover:null};updateUI();}
function updateUI(){ui.energy.textContent=Math.floor(state.energy);ui.hp.textContent=state.castleHp;ui.wave.textContent=state.wave;document.querySelectorAll('.unitCard').forEach(card=>{const d=unitsDef[card.dataset.unit],cd=Math.max(0,state.cooldowns[card.dataset.unit]-performance.now()),locked=state.energy<d.cost||cd>0;card.disabled=locked&&!card.classList.contains('selected');card.querySelector('.cooldown').style.height=(cd/d.cool*100)+'%';});}
function rect(x,y,w,h,c){ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));}
function text(t,x,y,size=16,align='center'){ctx.font=`900 ${size}px ui-monospace,monospace`;ctx.textAlign=align;ctx.textBaseline='middle';ctx.fillStyle='#fff';ctx.strokeStyle='#11182b';ctx.lineWidth=5;ctx.strokeText(t,x,y);ctx.fillText(t,x,y);}
function drawWorld(ts){
 const sky=ctx.createLinearGradient(0,0,0,540);sky.addColorStop(0,'#6fc3d9');sky.addColorStop(1,'#d8f0c0');ctx.fillStyle=sky;ctx.fillRect(0,0,960,540);
 for(let i=0;i<18;i++){const x=(i*131+ts*.008)%1100-70,y=25+(i%4)*28;rect(x,y,28+(i%3)*15,7,'#ffffff88');}
 rect(0,36,110,460,'#516f47');rect(16,55,88,420,'#284532');rect(25,84,70,364,'#ab6b3e');rect(34,94,52,344,'#e4c48b');text('🏰',62,260,55);text('สวน',62,326,15);
 rect(OX-8,OY-8,COLS*CELL+16,ROWS*LANE_H+16,'#274f35');
 for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++){const x=OX+c*CELL,y=OY+r*LANE_H;rect(x,y,CELL-2,LANE_H-2,(r+c)%2?'#69ae55':'#74ba5d');rect(x+5,y+6,5,5,'#94d272');rect(x+CELL-15,y+LANE_H-13,4,4,'#4b883f');}
 rect(OX+COLS*CELL,OY-10,80,ROWS*LANE_H+20,'#4b7080');for(let y=OY;y<OY+ROWS*LANE_H;y+=28){rect(OX+COLS*CELL+10,y,50,5,'#79aabc');}
 if(state.selected&&state.hover){const {r,c}=state.hover,occupied=state.units.some(u=>u.r===r&&u.c===c);ctx.globalAlpha=.55;rect(OX+c*CELL+4,OY+r*LANE_H+4,CELL-10,LANE_H-10,occupied?'#e65a5a':'#fff27a');ctx.globalAlpha=1;text(unitsDef[state.selected].emoji,OX+c*CELL+CELL/2,OY+r*LANE_H+42,34);}
}
function bar(x,y,w,p,c){rect(x,y,w,6,'#18223a');rect(x+1,y+1,(w-2)*Math.max(0,p),4,c);}
function drawEntities(){
 state.units.forEach(u=>{const x=OX+u.c*CELL+CELL/2,y=OY+u.r*LANE_H+46;ctx.globalAlpha=u.hit>0?.55:1;text(u.emoji,x,y,38);ctx.globalAlpha=1;bar(x-28,y-36,56,u.hp/u.maxHp,'#65d46e');});
 state.enemies.forEach(e=>{ctx.save();ctx.translate(e.x,e.y);if(e.hit>0)ctx.globalAlpha=.45;rect(-22,-24,44,48,e.kind==='brute'?'#6a3e6e':'#39445e');rect(-16,-31,32,14,e.kind==='brute'?'#9b5ca2':'#687895');rect(-15,23,10,12,'#1d263b');rect(5,23,10,12,'#1d263b');text(e.kind==='brute'?'👹':'👾',0,-3,e.kind==='brute'?34:30);ctx.restore();bar(e.x-25,e.y-42,50,e.hp/e.maxHp,'#e65a5a');});
 state.shots.forEach(s=>{text(s.double?'🌽':'•',s.x,s.y,s.double?18:20);});
 state.particles.forEach(p=>{ctx.globalAlpha=p.life/600;text(p.t,p.x,p.y,p.size);ctx.globalAlpha=1;});
}
function spawnEnemy(){const r=Math.floor(Math.random()*ROWS),brute=state.wave>=3&&Math.random()<.18+state.wave*.02,hp=(brute?210:95)*(1+state.wave*.19),speed=(brute?18:28)+state.wave*1.4;state.enemies.push({r,x:OX+COLS*CELL+58,y:OY+r*LANE_H+49,hp,maxHp:hp,speed,damage:brute?34:18,kind:brute?'brute':'bug',hit:0,attackCd:0});state.spawned++;}
function startWave(){state.between=false;state.spawned=0;state.waveQuota=5+state.wave*2;state.nextSpawn=performance.now()+800;showBanner(`เวฟ ${state.wave} เริ่มแล้ว!`);}
function showBanner(msg){ui.banner.textContent=msg;ui.banner.classList.remove('hidden');setTimeout(()=>ui.banner.classList.add('hidden'),1500);}
function toast(msg){ui.toast.textContent=msg;ui.toast.classList.remove('hidden');clearTimeout(toast.t);toast.t=setTimeout(()=>ui.toast.classList.add('hidden'),1200);}
function update(dt,ts){if(!state.running||state.paused)return;
 if(!state.between&&state.spawned<state.waveQuota&&ts>=state.nextSpawn){spawnEnemy();state.nextSpawn=ts+Math.max(520,1450-state.wave*80);}
 state.units.forEach(u=>{u.hit=Math.max(0,u.hit-dt);u.timer-=dt;if(u.type==='sunny'&&u.timer<=0){state.energy+=25;u.timer=u.rate;state.particles.push({x:OX+u.c*CELL+42,y:OY+u.r*LANE_H+15,t:'+25☀️',life:600,size:13});}else if((u.type==='peach'||u.type==='corn')&&u.timer<=0){const target=state.enemies.filter(e=>e.r===u.r&&e.x>OX+u.c*CELL).sort((a,b)=>a.x-b.x)[0];if(target){const n=u.type==='corn'?2:1;for(let i=0;i<n;i++)state.shots.push({r:u.r,x:OX+u.c*CELL+61,y:OY+u.r*LANE_H+42+(i?8:-3),damage:u.damage,double:u.type==='corn',speed:330});u.timer=u.rate;}}});
 state.shots.forEach(s=>{s.x+=s.speed*dt/1000;const e=state.enemies.find(e=>e.r===s.r&&Math.abs(e.x-s.x)<22);if(e){e.hp-=s.damage;e.hit=100;s.dead=true;state.particles.push({x:e.x,y:e.y-5,t:'✦',life:420,size:15});}if(s.x>940)s.dead=true;});state.shots=state.shots.filter(s=>!s.dead);
 state.enemies.forEach(e=>{e.hit=Math.max(0,e.hit-dt);e.attackCd-=dt;const blocker=state.units.filter(u=>u.r===e.r&&Math.abs((OX+u.c*CELL+42)-e.x)<48).sort((a,b)=>b.c-a.c)[0];if(blocker){if(e.attackCd<=0){blocker.hp-=e.damage;blocker.hit=120;e.attackCd=850;}}else e.x-=e.speed*dt/1000;if(e.x<105){e.dead=true;state.castleHp--;state.particles.push({x:112,y:e.y,t:'💥',life:600,size:28});}});
 state.units=state.units.filter(u=>{if(u.hp<=0){state.particles.push({x:OX+u.c*CELL+42,y:OY+u.r*LANE_H+42,t:'💨',life:600,size:25});return false;}return true;});
 state.enemies.forEach(e=>{if(e.hp<=0){e.dead=true;state.energy+=12;state.particles.push({x:e.x,y:e.y,t:'+12☀️',life:600,size:12});}});state.enemies=state.enemies.filter(e=>!e.dead);
 state.particles.forEach(p=>{p.life-=dt;p.y-=15*dt/1000;});state.particles=state.particles.filter(p=>p.life>0);
 if(state.castleHp<=0)finish(false);
 if(!state.between&&state.spawned>=state.waveQuota&&state.enemies.length===0){state.between=true;if(state.wave>=state.maxWave)finish(true);else{state.wave++;state.energy+=50;showBanner('เคลียร์เวฟ! +50 พลังงาน');setTimeout(()=>{if(state.running)startWave();},2600);}}
 updateUI();}
function finish(win){state.running=false;document.getElementById('endIcon').textContent=win?'🏆':'💔';document.getElementById('endTitle').textContent=win?'ปกป้องสวนสำเร็จ!':'สวนถูกตีแตก';document.getElementById('endText').textContent=win?`คุณผ่านครบ ${state.maxWave} เวฟแล้ว`:`คุณไปถึงเวฟ ${state.wave}`;ui.end.classList.remove('hidden');}
function loop(ts){const dt=Math.min(40,ts-(state.last||ts));state.last=ts;drawWorld(ts);update(dt,ts);drawEntities();requestAnimationFrame(loop);}
function getCell(ev){const rct=canvas.getBoundingClientRect(),sx=canvas.width/rct.width,sy=canvas.height/rct.height,x=(ev.clientX-rct.left)*sx,y=(ev.clientY-rct.top)*sy,c=Math.floor((x-OX)/CELL),r=Math.floor((y-OY)/LANE_H);return r>=0&&r<ROWS&&c>=0&&c<COLS?{r,c}:null;}
canvas.addEventListener('pointermove',e=>state.hover=getCell(e));canvas.addEventListener('pointerleave',()=>state.hover=null);canvas.addEventListener('pointerdown',e=>{if(!state.running||state.paused)return;const cell=getCell(e);if(!cell)return;const old=state.units.find(u=>u.r===cell.r&&u.c===cell.c);if(old){state.energy+=Math.floor(unitsDef[old.type].cost*.4);state.units=state.units.filter(u=>u!==old);toast(`ขาย ${old.name} แล้ว`);return;}if(!state.selected)return;const d=unitsDef[state.selected],now=performance.now();if(state.energy<d.cost){toast('พลังงานไม่พอ');return;}if(state.cooldowns[state.selected]>now){toast('การ์ดยังไม่พร้อม');return;}state.energy-=d.cost;state.cooldowns[state.selected]=now+d.cool;state.units.push({type:state.selected,name:d.name,emoji:d.emoji,r:cell.r,c:cell.c,hp:d.hp,maxHp:d.hp,rate:d.rate,damage:d.damage||0,timer:300,hit:0});document.querySelectorAll('.unitCard').forEach(x=>x.classList.remove('selected'));state.selected=null;updateUI();});
document.querySelectorAll('.unitCard').forEach(card=>card.addEventListener('click',()=>{if(!state.running)return;const type=card.dataset.unit,d=unitsDef[type];if(state.energy<d.cost||state.cooldowns[type]>performance.now())return;document.querySelectorAll('.unitCard').forEach(x=>x.classList.remove('selected'));if(state.selected===type){state.selected=null;return;}state.selected=type;card.classList.add('selected');}));
function begin(){reset();state.running=true;ui.start.classList.add('hidden');ui.end.classList.add('hidden');startWave();}
document.getElementById('startBtn').onclick=begin;document.getElementById('restartBtn').onclick=begin;document.getElementById('pauseBtn').onclick=()=>{if(!state.running)return;state.paused=true;ui.pause.classList.remove('hidden');};document.getElementById('resumeBtn').onclick=()=>{state.paused=false;state.last=performance.now();ui.pause.classList.add('hidden');};window.addEventListener('keydown',e=>{if(e.key==='Escape'){state.selected=null;document.querySelectorAll('.unitCard').forEach(x=>x.classList.remove('selected'));}});
reset();requestAnimationFrame(loop);
