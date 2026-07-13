'use strict';

const UNIT_DEFS = [
  {id:'sunny',name:'Sunny',icon:'🌻',cost:50,role:'พลังงาน',hp:95,damage:0,rate:4200,range:0,cool:3500},
  {id:'peachy',name:'Peachy',icon:'🍑',cost:75,role:'ยิงเร็ว',hp:115,damage:22,rate:1050,range:900,cool:3000},
  {id:'cobs',name:'Cobsworth',icon:'🌽',cost:125,role:'ยิงคู่',hp:125,damage:18,rate:900,range:900,cool:5000,shots:2},
  {id:'spud',name:'Spud',icon:'🥔',cost:100,role:'กับระเบิด',hp:170,damage:150,rate:0,range:65,cool:6000,mine:true},
  {id:'lily',name:'Water Lily',icon:'🪷',cost:110,role:'ชะลอ',hp:105,damage:15,rate:1350,range:900,cool:5000,slow:true},
  {id:'coconut',name:'Coconut',icon:'🥥',cost:175,role:'แทงค์',hp:520,damage:0,rate:0,range:0,cool:8000},
  {id:'laser',name:'Laser Shroom',icon:'🍄',cost:200,role:'เลเซอร์',hp:100,damage:42,rate:1850,range:900,cool:7000,laser:true}
];

const state = {energy:150,wave:1,maxWave:12,kills:0,selected:null,speed:1,paused:false,cooldowns:{},skill:0,sound:true};
const $ = s => document.querySelector(s);

function buildDeck(){
  const deck=$('#deck');
  UNIT_DEFS.forEach(def=>{
    const el=document.createElement('button');
    el.className='card'; el.dataset.id=def.id;
    el.innerHTML=`<span class="role">${def.role}</span><span class="cost">${def.cost}</span><div class="icon">${def.icon}</div><div class="name">${def.name}</div><div class="cooldown"></div>`;
    el.addEventListener('click',()=>window.gameScene?.selectCard(def.id));
    deck.appendChild(el);
  });
}
buildDeck();

class BattleScene extends Phaser.Scene{
  constructor(){super('Battle');}
  create(){
    window.gameScene=this;
    this.W=960; this.H=540; this.rows=5; this.cols=9;
    this.grid={x:122,y:96,w:720,h:360}; this.cw=this.grid.w/this.cols; this.ch=this.grid.h/this.rows;
    this.units=[]; this.enemies=[]; this.projectiles=[]; this.effects=[]; this.waveSpawned=0; this.waveTarget=5; this.spawnTimer=0; this.waveDelay=0;
    this.makeTextures(); this.drawWorld(); this.makeGroups(); this.createGhost();
    this.input.on('pointerdown',p=>this.handleTap(p));
    this.time.addEvent({delay:1000,loop:true,callback:()=>this.tickSecond()});
    this.events.on('update',(_,dt)=>this.step(dt));
    $('#pauseBtn').onclick=()=>this.togglePause();
    $('#speedBtn').onclick=()=>this.toggleSpeed();
    $('#skillBtn').onclick=()=>this.heroSkill();
    $('#soundBtn').onclick=()=>{state.sound=!state.sound;$('#soundBtn').textContent=state.sound?'🔊':'🔇'};
    $('#loading').style.display='none';
    this.updateHud();
    this.toast('ปกป้องสวนลอยฟ้า!',0x14365e);
  }
  makeTextures(){
    const g=this.make.graphics({add:false});
    const mk=(key,draw)=>{g.clear();draw(g);g.generateTexture(key,96,96)};
    mk('sunny',g=>{g.fillStyle(0x5d9b35).fillRoundedRect(43,47,10,41,4);g.fillStyle(0x4d8b32).fillEllipse(32,70,25,12).fillEllipse(64,70,25,12);for(let i=0;i<12;i++){const a=i*Math.PI/6;g.fillStyle(0xffd84c).fillCircle(48+Math.cos(a)*22,40+Math.sin(a)*22,12)}g.fillStyle(0x8d551e).fillCircle(48,40,18);g.fillStyle(0xffffff).fillCircle(42,36,3).fillCircle(54,36,3);});
    mk('peachy',g=>{g.fillStyle(0x4b913d).fillRoundedRect(44,52,9,34,4);g.fillStyle(0xff8b5d).fillCircle(43,40,24).fillCircle(56,40,22);g.fillStyle(0xffb07e).fillCircle(35,31,8);g.fillStyle(0x3c873a).fillEllipse(61,18,25,12);g.fillStyle(0x2e2831).fillCircle(41,39,3).fillCircle(55,39,3)});
    mk('cobs',g=>{g.fillStyle(0x4c923d).fillRoundedRect(44,61,9,27,4).fillTriangle(48,70,22,55,42,77).fillTriangle(48,70,74,54,54,77);g.fillStyle(0xffd53c).fillRoundedRect(32,17,32,52,16);for(let y=25;y<62;y+=10)for(let x=39;x<60;x+=9)g.fillStyle(0xf1a925).fillCircle(x,y,4);g.fillStyle(0x242633).fillCircle(41,38,3).fillCircle(55,38,3)});
    mk('spud',g=>{g.fillStyle(0xb98754).fillEllipse(48,50,55,46);g.fillStyle(0x805c39).fillCircle(34,42,4).fillCircle(62,58,5).fillCircle(54,31,3);g.fillStyle(0x27242a).fillCircle(39,48,3).fillCircle(55,48,3)});
    mk('lily',g=>{g.fillStyle(0x2aa1b5).fillEllipse(48,72,64,20);for(let i=0;i<8;i++){const a=i*Math.PI/4;g.fillStyle(i%2?0xa5d5f4:0xe7b6e9).fillEllipse(48+Math.cos(a)*16,45+Math.sin(a)*10,24,15)}g.fillStyle(0xffe37d).fillCircle(48,45,10)});
    mk('coconut',g=>{g.fillStyle(0x4b913d).fillRoundedRect(44,65,9,24,4);g.fillStyle(0x9f7449).fillCircle(48,45,31);g.lineStyle(5,0x5e402c).strokeCircle(48,45,28);g.fillStyle(0x25232c).fillCircle(39,42,4).fillCircle(57,42,4)});
    mk('laser',g=>{g.fillStyle(0xe5e9f1).fillRoundedRect(43,53,11,34,5);g.fillStyle(0xd94857).fillEllipse(48,35,58,38);g.fillStyle(0xf7e7d1).fillCircle(30,31,6).fillCircle(48,20,5).fillCircle(66,34,6);g.fillStyle(0x232633).fillCircle(40,42,3).fillCircle(56,42,3)});
    mk('goblin',g=>{g.fillStyle(0x5f52a8).fillRoundedRect(24,30,48,50,12);g.fillStyle(0x806ed2).fillTriangle(27,35,7,22,25,54).fillTriangle(69,35,89,22,71,54);g.fillStyle(0xfff3a0).fillCircle(38,48,5).fillCircle(58,48,5);g.fillStyle(0x20243a).fillCircle(38,48,2).fillCircle(58,48,2);g.fillStyle(0x34334f).fillRoundedRect(23,77,21,13,4).fillRoundedRect(52,77,21,13,4)});
    mk('orc',g=>{g.fillStyle(0x3a7a62).fillRoundedRect(15,18,66,70,16);g.fillStyle(0x254e45).fillTriangle(20,27,2,13,18,47).fillTriangle(76,27,94,13,78,47);g.fillStyle(0xffdd7d).fillCircle(35,44,6).fillCircle(61,44,6);g.fillStyle(0xffffff).fillTriangle(31,66,39,66,35,54).fillTriangle(57,66,65,66,61,54)});
    mk('mage',g=>{g.fillStyle(0x4a257e).fillTriangle(48,3,10,55,86,55);g.fillStyle(0x22183b).fillRoundedRect(20,47,56,43,12);g.fillStyle(0x64e5ff).fillCircle(38,59,5).fillCircle(58,59,5);g.lineStyle(5,0x8a5aba).lineBetween(75,75,90,20);g.fillStyle(0x9ef6ff).fillCircle(90,18,8)});
    mk('dragon',g=>{g.fillStyle(0xb64252).fillEllipse(48,52,65,55);g.fillStyle(0x7f2439).fillTriangle(30,24,39,2,47,28).fillTriangle(54,25,63,2,71,30);g.fillStyle(0xf9d15e).fillCircle(36,45,6).fillCircle(60,45,6);g.fillStyle(0x5a2335).fillTriangle(20,50,1,31,17,71).fillTriangle(76,50,95,31,79,71)});
    g.destroy();
  }
  drawWorld(){
    const bg=this.add.graphics();
    bg.fillGradientStyle(0x7ee8f4,0x7ee8f4,0xf1f8c2,0xf1f8c2,1).fillRect(0,0,this.W,this.H);
    for(let i=0;i<8;i++){const x=60+i*140,y=35+(i%3)*18;bg.fillStyle(0xffffff,.62).fillEllipse(x,y,95,23)}
    bg.fillStyle(0x303f2a).fillRoundedRect(50,75,850,410,22);bg.fillStyle(0xf3e7ac).fillRoundedRect(58,82,834,396,17);
    bg.fillStyle(0x22492e).fillRect(70,90,43,375);bg.fillStyle(0x735128).fillRoundedRect(79,108,24,330,4);
    bg.fillStyle(0x6bb85b).fillRect(this.grid.x,this.grid.y,this.grid.w,this.grid.h);
    for(let r=0;r<this.rows;r++)for(let c=0;c<this.cols;c++){bg.fillStyle((r+c)%2?0x6bb85b:0x72bf5f,.75).fillRect(this.grid.x+c*this.cw,this.grid.y+r*this.ch,this.cw,this.ch);bg.lineStyle(1,0x386c42,.65).strokeRect(this.grid.x+c*this.cw,this.grid.y+r*this.ch,this.cw,this.ch)}
    bg.fillStyle(0x577f91).fillRect(842,90,35,375);for(let y=103;y<455;y+=26)bg.fillStyle(0x9ed1db).fillRect(848,y,23,4);
    bg.fillStyle(0x243b2b).fillRect(120,456,725,10);
    for(let x=130;x<840;x+=45)bg.fillStyle(0x4f9a3d).fillTriangle(x,466,x+9,445,x+15,466);
    this.add.text(91,275,'🏰',{fontSize:'28px'}).setOrigin(.5);
    this.baseHP=100;this.baseBar=this.add.graphics().setDepth(20);this.drawBaseBar();
  }
  drawBaseBar(){this.baseBar.clear().fillStyle(0x0c1b38,.88).fillRoundedRect(22,17,330,40,10).lineStyle(2,0x5d80b3).strokeRoundedRect(22,17,330,40,10).fillStyle(0xffffff).fillRect(91,31,245,12).fillStyle(this.baseHP>35?0x47d65b:0xef4f55).fillRect(93,33,241*this.baseHP/100,8);this.baseLabel?.destroy();this.baseLabel=this.add.text(35,28,`🏰 สวนลอยฟ้า   ${Math.max(0,Math.ceil(this.baseHP))}%`,{font:'bold 17px Arial',color:'#ffffff'}).setDepth(21)}
  makeGroups(){this.unitLayer=this.add.layer();this.enemyLayer=this.add.layer();this.fxLayer=this.add.layer()}
  createGhost(){this.ghost=this.add.container(0,0).setDepth(30).setVisible(false);this.ghostCircle=this.add.circle(0,0,30,0x67f2ff,.32).setStrokeStyle(3,0xffffff,.8);this.ghostSprite=this.add.image(0,0,'sunny').setDisplaySize(64,64).setAlpha(.75);this.ghost.add([this.ghostCircle,this.ghostSprite])}
  selectCard(id){const def=UNIT_DEFS.find(x=>x.id===id);if(!def||state.energy<def.cost)return;state.selected=id;document.querySelectorAll('.card').forEach(x=>x.classList.toggle('selected',x.dataset.id===id));this.ghostSprite.setTexture(id).setDisplaySize(64,64);this.ghost.setVisible(false)}
  handleTap(p){if(state.paused)return;const x=p.worldX,y=p.worldY;if(x<this.grid.x||x>this.grid.x+this.grid.w||y<this.grid.y||y>this.grid.y+this.grid.h)return;const c=Math.floor((x-this.grid.x)/this.cw),r=Math.floor((y-this.grid.y)/this.ch);const cx=this.grid.x+c*this.cw+this.cw/2,cy=this.grid.y+r*this.ch+this.ch/2;const existing=this.units.find(u=>u.r===r&&u.c===c);
    if(state.selected){this.ghost.setPosition(cx,cy).setVisible(true);if(existing){this.toast('ช่องนี้มีตัวละครแล้ว',0x7c2f45);return}this.placeUnit(state.selected,r,c,cx,cy);return}
    if(existing)this.upgradeUnit(existing);
  }
  placeUnit(id,r,c,x,y){const def=UNIT_DEFS.find(d=>d.id===id);if(state.energy<def.cost)return;state.energy-=def.cost;const s=this.add.image(x,y,id).setDisplaySize(64,64).setDepth(10);s.setScale(0);this.tweens.add({targets:s,scale:.67,duration:220,ease:'Back.Out'});const hp=this.add.graphics().setDepth(12);const u={def,r,c,x,y,s,hp,maxHp:def.hp,hpVal:def.hp,next:400,age:0,level:1};this.units.push(u);state.cooldowns[id]=def.cool;state.selected=null;this.ghost.setVisible(false);document.querySelectorAll('.card').forEach(x=>x.classList.remove('selected'));this.burst(x,y,0x83f4ff,12);this.beep(520,.07);this.updateHud()}

  upgradeUnit(u){
    if(u.level>=3){this.toast('ยูนิตระดับสูงสุดแล้ว',0x6d3e91);return}
    const cost=Math.floor(u.def.cost*(u.level===1?.7:1.05));
    if(state.energy<cost){this.toast(`ต้องใช้พลังงาน ${cost}`,0x7c2f45);return}
    state.energy-=cost;u.level++;u.maxHp=Math.floor(u.maxHp*1.45);u.hpVal=u.maxHp;
    if(u.def.damage)u.def={...u.def,damage:Math.floor(u.def.damage*1.45),rate:Math.max(420,Math.floor(u.def.rate*.88))};
    u.s.setDisplaySize(64+u.level*6,64+u.level*6);this.burst(u.x,u.y,0xffe16b,18);
    this.floatText(u.x,u.y-48,`Lv.${u.level}`,'#ffe276');this.beep(760,.12);this.updateHud();
  }

  sellUnit(u){state.energy+=Math.floor(u.def.cost*.4);this.burst(u.x,u.y,0xffd45e,10);u.s.destroy();u.hp.destroy();this.units=this.units.filter(x=>x!==u);this.updateHud()}
  tickSecond(){if(state.paused)return;state.energy=Math.min(999,state.energy+8);state.skill=Math.max(0,state.skill-1000);for(const id in state.cooldowns)state.cooldowns[id]=Math.max(0,state.cooldowns[id]-1000);this.updateHud()}
  step(dt){if(state.paused)return;dt*=state.speed;this.spawnLogic(dt);this.updateUnits(dt);this.updateEnemies(dt);this.updateProjectiles(dt);this.updateCards(dt)}
  spawnLogic(dt){if(this.waveSpawned<this.waveTarget){this.spawnTimer-=dt;if(this.spawnTimer<=0){this.spawnEnemy();this.waveSpawned++;this.spawnTimer=Math.max(700,1900-state.wave*80)}}else if(this.enemies.length===0){this.waveDelay+=dt;if(this.waveDelay>2200){if(state.wave>=state.maxWave){this.endGame(true);return}state.wave++;this.waveSpawned=0;this.waveTarget=4+state.wave*2;this.waveDelay=0;this.toast(`เวฟ ${state.wave} เริ่มแล้ว!`,0x1b5d87);this.updateHud()}}}
  spawnEnemy(){const row=Phaser.Math.Between(0,4);let kind='goblin';if(state.wave>=3&&Math.random()<.22)kind='orc';if(state.wave>=5&&Math.random()<.18)kind='mage';if((state.wave===4||state.wave===8||state.wave===12)&&this.waveSpawned===this.waveTarget-1)kind='dragon';const bossScale=1+(state.wave-4)*.12;const stats={goblin:[95+state.wave*6,25+state.wave*.35,25],orc:[240+state.wave*13,37,40],mage:[150+state.wave*9,30,34],dragon:[Math.floor(1200*bossScale),14,70]}[kind];const y=this.grid.y+row*this.ch+this.ch/2;const s=this.add.image(890,y,kind).setDisplaySize(kind==='dragon'?92:62,kind==='dragon'?92:62).setDepth(11);const bar=this.add.graphics().setDepth(13);this.enemies.push({kind,row,x:890,y,s,bar,hp:stats[0],maxHp:stats[0],speed:stats[1],damage:stats[2],atk:0,slow:0});if(kind==='dragon'){this.boss=this.enemies[this.enemies.length-1];document.querySelector('#bossHud').style.display='block';this.cameras.main.shake(500,.016);this.toast('⚠️ บอสมังกรบุก!',0x8d2638);this.beep(90,.45)}}
  updateUnits(dt){for(const u of [...this.units]){u.age+=dt;u.next-=dt;u.hp.clear().fillStyle(0x14223c,.9).fillRect(u.x-26,u.y-36,52,6).fillStyle(0xffe276).fillCircle(u.x-29,u.y-33,7).fillStyle(0x55df63).fillRect(u.x-25,u.y-35,50*Math.max(0,u.hpVal/u.maxHp),4);if(u.hpVal<=0){this.burst(u.x,u.y,0xffffff,8);u.s.destroy();u.hp.destroy();this.units=this.units.filter(x=>x!==u);continue}if(u.def.id==='sunny'&&u.next<=0){state.energy=Math.min(999,state.energy+25);u.next=u.def.rate;this.floatText(u.x,u.y-40,'+25 ☀️','#ffe268');this.burst(u.x,u.y,0xffe55b,8);this.updateHud();continue}if(!u.def.damage)continue;const target=this.enemies.filter(e=>e.row===u.r&&e.x>u.x-10&&e.x-u.x<u.def.range).sort((a,b)=>a.x-b.x)[0];if(target&&u.next<=0){u.next=u.def.rate;this.tweens.add({targets:u.s,scaleX:.76,scaleY:.58,yoyo:true,duration:90});if(u.def.mine){this.explode(u,target);u.hpVal=0}else if(u.def.laser)this.fireLaser(u,target);else{for(let i=0;i<(u.def.shots||1);i++)this.fireProjectile(u,target,i*120)}}}}
  fireProjectile(u,target,delay=0){this.time.delayedCall(delay,()=>{if(!u.s.active||!target.s.active)return;const color=u.def.slow?0x6de8ff:0xffd55b;const orb=this.add.circle(u.x+22,u.y-5,6,color).setDepth(15);this.projectiles.push({orb,x:u.x+22,y:u.y-5,target,damage:u.def.damage,speed:430,slow:u.def.slow})})}
  fireLaser(u,target){const line=this.add.graphics().setDepth(16);line.lineStyle(7,0xff6de5,.85).lineBetween(u.x+18,u.y,target.x,target.y);line.lineStyle(2,0xffffff,1).lineBetween(u.x+18,u.y,target.x,target.y);this.time.delayedCall(100,()=>line.destroy());this.enemies.filter(e=>e.row===u.r&&e.x>u.x).forEach(e=>this.hitEnemy(e,u.def.damage));this.cameras.main.shake(80,.002)}
  explode(u,target){const boom=this.add.circle(target.x,target.y,12,0xff9b42,.8).setDepth(18);this.tweens.add({targets:boom,scale:5,alpha:0,duration:260,onComplete:()=>boom.destroy()});this.enemies.filter(e=>e.row===u.r&&Math.abs(e.x-target.x)<110).forEach(e=>this.hitEnemy(e,u.def.damage));this.cameras.main.shake(180,.008)}
  updateEnemies(dt){for(const e of [...this.enemies]){e.atk-=dt;e.s.setAngle(Math.sin(this.time.now/140+e.y)*3);e.s.setY(e.y+Math.sin(this.time.now/180+e.x)*2);if(e.kind==='dragon'){$('#bossFill').style.width=`${Math.max(0,e.hp/e.maxHp*100)}%`}e.bar.clear().fillStyle(0x321725,.9).fillRect(e.x-29,e.y-39,58,7).fillStyle(e.kind==='dragon'?0xffb32d:0xef4b61).fillRect(e.x-28,e.y-38,56*Math.max(0,e.hp/e.maxHp),5);if(e.hp<=0){this.killEnemy(e);continue}e.s.setTint(e.slow>0?0x9befff:0xffffff);e.slow=Math.max(0,e.slow-dt);const blocker=this.units.filter(u=>u.r===e.row&&u.x<e.x&&e.x-u.x<50).sort((a,b)=>b.x-a.x)[0];if(blocker){if(e.atk<=0){blocker.hpVal-=e.damage;e.atk=850;this.tweens.add({targets:blocker.s,x:blocker.x-4,yoyo:true,duration:80});this.floatText(blocker.x,blocker.y-25,`-${e.damage}`,'#ff8a8a')}}else{e.x-=e.speed*(e.slow>0?.45:1)*dt/1000;e.s.setX(e.x)}if(e.x<105){this.baseHP-=e.kind==='dragon'?20:8;this.drawBaseBar();this.removeEnemy(e);this.cameras.main.shake(160,.008);if(this.baseHP<=0)this.endGame(false)}}}
  updateProjectiles(dt){for(const p of [...this.projectiles]){if(!p.target||!p.target.s.active){p.orb.destroy();this.projectiles=this.projectiles.filter(x=>x!==p);continue}const dx=p.target.x-p.x,dy=p.target.y-p.y,d=Math.hypot(dx,dy);const step=p.speed*dt/1000;if(d<=step+9){this.hitEnemy(p.target,p.damage,p.slow);this.burst(p.target.x,p.target.y,p.slow?0x72e8ff:0xffdb6d,5);this.beep(p.slow?330:650,.025);p.orb.destroy();this.projectiles=this.projectiles.filter(x=>x!==p)}else{p.x+=dx/d*step;p.y+=dy/d*step;p.orb.setPosition(p.x,p.y)}}}
  hitEnemy(e,dmg,slow=false){e.hp-=dmg;if(slow)e.slow=1900;e.s.setTintFill(0xffffff);this.time.delayedCall(55,()=>e.s.active&&e.s.clearTint());this.floatText(e.x,e.y-30,`-${dmg}`,'#ffffff')}
  killEnemy(e){state.kills++;state.energy=Math.min(999,state.energy+(e.kind==='dragon'?100:e.kind==='orc'?18:10));this.burst(e.x,e.y,e.kind==='dragon'?0xff516f:0xa78bff,e.kind==='dragon'?30:12);this.tweens.add({targets:e.s,alpha:0,scale:1.4,angle:25,duration:220,onComplete:()=>e.s.destroy()});e.bar.destroy();this.enemies=this.enemies.filter(x=>x!==e);if(e.kind==='dragon'){$('#bossHud').style.display='none';this.boss=null}this.updateHud()}
  removeEnemy(e){e.s.destroy();e.bar.destroy();this.enemies=this.enemies.filter(x=>x!==e);if(e.kind==='dragon'){$('#bossHud').style.display='none';this.boss=null}}
  burst(x,y,color,count){for(let i=0;i<count;i++){const p=this.add.circle(x,y,Phaser.Math.Between(2,5),color).setDepth(25);const a=Math.random()*Math.PI*2,d=Phaser.Math.Between(18,55);this.tweens.add({targets:p,x:x+Math.cos(a)*d,y:y+Math.sin(a)*d,alpha:0,scale:.2,duration:Phaser.Math.Between(220,480),onComplete:()=>p.destroy()})}}
  floatText(x,y,text,color){const t=this.add.text(x,y,text,{font:'bold 15px Arial',color,stroke:'#091328',strokeThickness:3}).setOrigin(.5).setDepth(30);this.tweens.add({targets:t,y:y-28,alpha:0,duration:650,onComplete:()=>t.destroy()})}
  toast(msg,color){const box=this.add.container(480,78).setDepth(40);const bg=this.add.rectangle(0,0,330,48,color,.92).setStrokeStyle(2,0xffffff,.5);const tx=this.add.text(0,0,msg,{font:'bold 20px Arial',color:'#fff'}).setOrigin(.5);box.add([bg,tx]);box.setScale(.7).setAlpha(0);this.tweens.add({targets:box,scale:1,alpha:1,duration:180,hold:900,yoyo:true,onComplete:()=>box.destroy()})}

  heroSkill(){if(state.paused||state.skill>0)return;state.skill=26000;this.toast('⚡ พายุสายฟ้า!',0x6b48b8);this.cameras.main.shake(450,.018);for(const e of [...this.enemies]){this.time.delayedCall(Phaser.Math.Between(0,550),()=>{if(!e.s.active)return;const bolt=this.add.rectangle(e.x,e.y-100,8,200,0xbef6ff,.95).setDepth(35);this.tweens.add({targets:bolt,alpha:0,scaleX:2,duration:180,onComplete:()=>bolt.destroy()});this.hitEnemy(e,e.kind==='dragon'?180:260);this.burst(e.x,e.y,0x9cefff,18)});}this.beep(180,.8);this.updateHud()}
  beep(freq=440,d=.08){if(!state.sound)return;try{this.audioCtx=this.audioCtx||new (window.AudioContext||window.webkitAudioContext)();const o=this.audioCtx.createOscillator(),g=this.audioCtx.createGain();o.frequency.value=freq;o.type='square';g.gain.setValueAtTime(.035,this.audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.001,this.audioCtx.currentTime+d);o.connect(g).connect(this.audioCtx.destination);o.start();o.stop(this.audioCtx.currentTime+d)}catch(_){}}
  updateCards(){document.querySelectorAll('.card').forEach(el=>{const d=UNIT_DEFS.find(x=>x.id===el.dataset.id);const cd=state.cooldowns[d.id]||0;el.classList.toggle('locked',state.energy<d.cost||cd>0);const total=d.cool||1;el.querySelector('.cooldown').style.height=`${Math.min(100,cd/total*100)}%`})}
  updateHud(){state.energy=Math.floor(state.energy);$('#energyText').textContent=`☀️ ${state.energy}`;$('#waveText').textContent=`🌊 ${state.wave}/${state.maxWave}`;$('#killText').textContent=`💀 ${state.kills}`;const b=$('#skillBtn');b.classList.toggle('ready',state.skill<=0);b.classList.toggle('cooling',state.skill>0);b.textContent=state.skill>0?`⚡${Math.ceil(state.skill/1000)}`:'⚡';this.updateCards()}
  togglePause(){state.paused=!state.paused;$('#pauseBtn').textContent=state.paused?'▶':'Ⅱ';this.toast(state.paused?'หยุดเกม':'เล่นต่อ',0x263f68)}
  toggleSpeed(){state.speed=state.speed===1?2:1;$('#speedBtn').textContent=`×${state.speed}`}
  endGame(win){if(state.paused)return;state.paused=true;const shade=this.add.rectangle(480,270,960,540,0x041027,.86).setDepth(60);const title=this.add.text(480,220,win?'🏆 ปกป้องสวนสำเร็จ!':'💔 สวนลอยฟ้าถูกทำลาย',{font:'bold 42px Arial',color:win?'#ffe276':'#ff7280',stroke:'#051026',strokeThickness:8}).setOrigin(.5).setDepth(61);localStorage.setItem('orchardBest',Math.max(Number(localStorage.getItem('orchardBest')||0),state.kills));const sub=this.add.text(480,285,`กำจัดศัตรู ${state.kills} ตัว • สถิติ ${localStorage.getItem('orchardBest')}`,{font:'bold 24px Arial',color:'#fff'}).setOrigin(.5).setDepth(61);const btn=this.add.rectangle(480,350,210,58,0x2f90c9).setStrokeStyle(3,0xffffff).setInteractive().setDepth(61);const bt=this.add.text(480,350,'เล่นใหม่',{font:'bold 24px Arial',color:'#fff'}).setOrigin(.5).setDepth(62);btn.on('pointerdown',()=>location.reload())}
}

const config={type:Phaser.AUTO,parent:'game',width:960,height:540,backgroundColor:'#78dce8',scene:[BattleScene],scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},render:{antialias:true,pixelArt:false},input:{activePointers:3}};
if(typeof Phaser==='undefined'){$('#loading').textContent='ไม่สามารถโหลดเอนจินเกมได้ กรุณาเชื่อมต่ออินเทอร์เน็ตแล้วรีเฟรชหน้าเว็บ'}else new Phaser.Game(config);
