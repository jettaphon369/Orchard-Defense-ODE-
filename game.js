'use strict';

const UNIT_DEFS = [
{id:'peachy',name:'Peachy',icon:'🍑',texture:'peachy',cost:75,role:'ยิงเร็ว',hp:115,damage:22,rate:1050,range:900,cool:3000},
{id:'sunny',name:'Sunny',icon:'🌻',texture:'sunny',cost:50,role:'พลังงาน',hp:95,damage:0,rate:4200,range:0,cool:3500},
{id:'cobs',name:'Cobsworth',icon:'🌽',texture:'cobs',cost:125,role:'ยิงคู่',hp:125,damage:18,rate:900,range:900,cool:5000,shots:2},
{id:'spud',name:'Spud',icon:'🥔',texture:'spud',cost:100,role:'กับระเบิด',hp:170,damage:150,rate:0,range:65,cool:6000,mine:true},
{id:'lily',name:'Water Lily',icon:'🪷',texture:'lily',cost:110,role:'ชะลอ',hp:105,damage:15,rate:1350,range:900,cool:5000,slow:true},
{id:'coconut',name:'Coconut',icon:'🥥',texture:'coconut',cost:175,role:'แทงค์',hp:520,damage:0,rate:0,range:0,cool:8000},
{id:'laser',name:'Laser Shroom',icon:'🍄',texture:'laser',cost:200,role:'เลเซอร์',hp:100,damage:42,rate:1850,range:900,cool:7000,laser:true},
{id:'berry',name:'Berry Mage',icon:'🫐',texture:'laser',cost:155,role:'เมจ',hp:110,damage:38,rate:1300,range:900,cool:5500},
{id:'appleknight',name:'Apple Knight',icon:'🍎',texture:'coconut',cost:180,role:'แทงค์โจมตี',hp:470,damage:20,rate:1500,range:150,cool:7500},
{id:'bloom',name:'Bloom Fairy',icon:'🌺',texture:'lily',cost:165,role:'ยิงเร็ว',hp:100,damage:20,rate:750,range:900,cool:6000},
{id:'thorn',name:'Thorn Guardian',icon:'🌵',texture:'cobs',cost:210,role:'ยิงสาม',hp:240,damage:16,rate:1100,range:900,cool:7500,shots:3},
{id:'frostberry',name:'Frost Berry',icon:'🧊',texture:'lily',cost:175,role:'น้ำแข็ง',hp:120,damage:28,rate:1200,range:900,cool:6500,slow:true},
{id:'thunderpear',name:'Thunder Pear',icon:'🍐',texture:'peachy',cost:190,role:'สายฟ้า',hp:115,damage:30,rate:850,range:900,cool:6500},
{id:'emberapple',name:'Ember Apple',icon:'🔥',texture:'spud',cost:205,role:'ระเบิด',hp:135,damage:90,rate:2000,range:900,cool:7500},
{id:'moonmelon',name:'Moon Melon',icon:'🍈',texture:'laser',cost:240,role:'ลำแสง',hp:130,damage:55,rate:1700,range:900,cool:8000,laser:true},
{id:'grapeoracle',name:'Grape Oracle',icon:'🍇',texture:'cobs',cost:195,role:'ยิงคู่',hp:120,damage:24,rate:1150,range:900,cool:7000,shots:2},
{id:'kiwirogue',name:'Kiwi Rogue',icon:'🥝',texture:'peachy',cost:185,role:'โจมตีเร็ว',hp:105,damage:18,rate:550,range:900,cool:6500},
{id:'dragonfruit',name:'Dragon Fruit',icon:'🐉',texture:'coconut',cost:260,role:'แทงค์ยิงคู่',hp:600,damage:26,rate:1400,range:900,cool:9000,shots:2},
{id:'starfruit',name:'Star Fruit',icon:'⭐',texture:'laser',cost:280,role:'เลเซอร์ดาว',hp:125,damage:70,rate:2000,range:900,cool:9000,laser:true},
{id:'pumpkinking',name:'Pumpkin King',icon:'🎃',texture:'spud',cost:250,role:'ระเบิดใหญ่',hp:220,damage:220,rate:0,range:110,cool:10000,mine:true}
];


const STAGES={
  1:{id:1,name:'สวนลอยฟ้า',maxWave:8,energy:175,sky:0x7ee8f4,groundA:0x6bb85b,groundB:0x72bf5f,border:0xf3e7ac,boss:'ลูกมังกร',bossIcon:'🐉',enemyHp:1,enemySpeed:1,reward:100,gems:2,heroUnlock:'sunny'},
  2:{id:2,name:'ป่าเวทมนตร์',maxWave:10,energy:165,sky:0x7798b8,groundA:0x315d48,groundB:0x3e7257,border:0x8fb28b,boss:'ต้นไม้โบราณ',bossIcon:'🌳',enemyHp:1.18,enemySpeed:1.04,reward:150,gems:3,heroUnlock:'cobs'},
  3:{id:3,name:'ภูเขาไฟลอยฟ้า',maxWave:12,energy:155,sky:0xb65d55,groundA:0x684235,groundB:0x7b4a36,border:0xd29a62,boss:'มังกรเพลิง',bossIcon:'🔥',enemyHp:1.35,enemySpeed:1.08,reward:220,gems:4,heroUnlock:'spud'},
  4:{id:4,name:'ทะเลสาบคริสตัล',maxWave:12,energy:155,sky:0x80d9ef,groundA:0x4e9db2,groundB:0x63b3c3,border:0xc8f6ff,boss:'ราชินีสายน้ำ',bossIcon:'💧',enemyHp:1.5,enemySpeed:1.1,reward:260,gems:5,heroUnlock:'lily'},
  5:{id:5,name:'ไร่ฟักทอง',maxWave:13,energy:150,sky:0xf0b56c,groundA:0x7a8d42,groundB:0x8ca04e,border:0xffd28a,boss:'ราชาฟักทอง',bossIcon:'🎃',enemyHp:1.65,enemySpeed:1.12,reward:300,gems:6,heroUnlock:'coconut'},
  6:{id:6,name:'สวนโบราณ',maxWave:14,energy:150,sky:0xc6b9e8,groundA:0x57705a,groundB:0x69826d,border:0xd9c9a1,boss:'โกเลมหิน',bossIcon:'🗿',enemyHp:1.8,enemySpeed:1.14,reward:350,gems:7,heroUnlock:'laser'},
  7:{id:7,name:'ป่าหมอก',maxWave:15,energy:145,sky:0x8395a8,groundA:0x334f48,groundB:0x405e55,border:0x9aaca0,boss:'วิญญาณหมอก',bossIcon:'👻',enemyHp:1.95,enemySpeed:1.16,reward:400,gems:8,heroUnlock:'berry'},
  8:{id:8,name:'ทุ่งทองคำ',maxWave:16,energy:145,sky:0xf4cf72,groundA:0x9a9c4e,groundB:0xacad58,border:0xf6e5a4,boss:'อัศวินทอง',bossIcon:'🛡️',enemyHp:2.1,enemySpeed:1.18,reward:450,gems:10,heroUnlock:'appleknight'},
  9:{id:9,name:'ต้นไม้ศักดิ์สิทธิ์',maxWave:17,energy:140,sky:0xa8e9c3,groundA:0x3d8257,groundB:0x4d9468,border:0xd5f7c2,boss:'ผู้พิทักษ์ยิกฟลอรา',bossIcon:'🌳',enemyHp:2.25,enemySpeed:1.2,reward:520,gems:12,heroUnlock:'bloom'},
  10:{id:10,name:'ราชาแห่งความมืด',maxWave:18,energy:140,sky:0x554b78,groundA:0x333047,groundB:0x423b5c,border:0xb29bd4,boss:'ราชาความมืด',bossIcon:'👑',enemyHp:2.45,enemySpeed:1.22,reward:700,gems:20,heroUnlock:'thorn'}
};
const CURRENT_STAGE=Math.max(1,Math.min(10,Number(localStorage.getItem('orchardCurrentStage')||1)));
const STAGE=STAGES[CURRENT_STAGE];
function getHubBonus(){try{return JSON.parse(localStorage.getItem('orchardHubV1'))||{}}catch{return{}}}
const HUB_BONUS=getHubBonus();
const FORGE_BONUS=HUB_BONUS.forgeUpgrades||{blade:Number(HUB_BONUS.forge||0),shield:0,gear:0};
const FORGE_DAMAGE_MULT=1+(Number(FORGE_BONUS.blade)||0)*0.04;
const FORGE_CORE_BONUS=(Number(FORGE_BONUS.shield)||0)*8;
const FORGE_COOLDOWN_MULT=1-(Number(FORGE_BONUS.gear)||0)*0.03;
function updateProgress(mutator){let s;try{s=JSON.parse(localStorage.getItem('orchardCampaignV1'))||{}}catch{s={}};s.stats=s.stats||{kills:0,unitsPlaced:0,upgrades:0,stagesCleared:0,bosses:0};const d=new Date().toISOString().slice(0,10);if(s.daily?.date!==d)s.daily={date:d,kills:0,unitsPlaced:0,upgrades:0,stagesCleared:0};mutator(s);localStorage.setItem('orchardCampaignV1',JSON.stringify(s));}


const state = {energy:Math.min(999,STAGE.energy+(Number(HUB_BONUS.energyBonus)||0)),wave:1,maxWave:STAGE.maxWave,kills:0,selected:null,speed:1,paused:false,cooldowns:{},skill:0,sound:true};
const $ = s => document.querySelector(s);

function buildDeck(){
  const deck=$('#deck');
  let save={};try{save=JSON.parse(localStorage.getItem('orchardCampaignV1'))||{}}catch{}
  const owned=save.ownedHeroes?.length?save.ownedHeroes:['peachy'];
  UNIT_DEFS.filter(def=>owned.includes(def.id)).forEach(def=>{
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
    this.units=[]; this.enemies=[]; this.projectiles=[]; this.effects=[]; this.waveSpawned=0; this.waveTarget=4+CURRENT_STAGE; this.spawnTimer=0; this.waveDelay=0;
    this.makeTextures(); this.drawWorld(); this.createBossBar(); this.makeGroups(); this.createGhost(); this.createUnitMenu();
    const legacyBossHud=document.querySelector('#bossHud'); if(legacyBossHud) legacyBossHud.style.display='none';
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
    bg.fillGradientStyle(STAGE.sky,STAGE.sky,CURRENT_STAGE===3?0xf0a26e:0xf1f8c2,CURRENT_STAGE===3?0xf0a26e:0xf1f8c2,1).fillRect(0,0,this.W,this.H);
    for(let i=0;i<8;i++){const x=60+i*140,y=35+(i%3)*18;bg.fillStyle(0xffffff,.62).fillEllipse(x,y,95,23)}
    if(CURRENT_STAGE===2){for(let i=0;i<7;i++){bg.fillStyle(0x183f35,.65).fillCircle(110+i*130,82+(i%2)*20,34);bg.fillStyle(0x7be3cf,.18).fillCircle(160+i*115,70,18)}}
    if(CURRENT_STAGE===3){for(let i=0;i<8;i++){bg.fillStyle(0x3a2630,.45).fillEllipse(70+i*125,55+(i%3)*12,100,26)}bg.fillStyle(0xff7b38,.55).fillTriangle(730,88,790,15,850,88)}
    bg.fillStyle(0x303f2a).fillRoundedRect(50,75,850,410,22);bg.fillStyle(STAGE.border).fillRoundedRect(58,82,834,396,17);
    bg.fillStyle(0x22492e).fillRect(70,90,43,375);bg.fillStyle(0x735128).fillRoundedRect(79,108,24,330,4);
    bg.fillStyle(STAGE.groundA).fillRect(this.grid.x,this.grid.y,this.grid.w,this.grid.h);
    for(let r=0;r<this.rows;r++)for(let c=0;c<this.cols;c++){bg.fillStyle((r+c)%2?STAGE.groundA:STAGE.groundB,.82).fillRect(this.grid.x+c*this.cw,this.grid.y+r*this.ch,this.cw,this.ch);bg.lineStyle(1,0x386c42,.65).strokeRect(this.grid.x+c*this.cw,this.grid.y+r*this.ch,this.cw,this.ch)}
    bg.fillStyle(0x577f91).fillRect(842,90,35,375);for(let y=103;y<455;y+=26)bg.fillStyle(0x9ed1db).fillRect(848,y,23,4);
    bg.fillStyle(0x243b2b).fillRect(120,456,725,10);
    for(let x=130;x<840;x+=45)bg.fillStyle(0x4f9a3d).fillTriangle(x,466,x+9,445,x+15,466);
    this.add.text(91,275,'🏰',{fontSize:'28px'}).setOrigin(.5);
    this.baseHP=100+FORGE_CORE_BONUS;this.baseBar=this.add.graphics().setDepth(20);this.drawBaseBar();
  }
  drawBaseBar(){
    const hp=Math.max(0,Math.ceil(this.baseHP));
    this.baseBar.clear()
      .fillStyle(0x0c1b38,.9).fillRoundedRect(22,17,320,40,10)
      .lineStyle(2,0x5d80b3).strokeRoundedRect(22,17,320,40,10)
      .fillStyle(0xffffff,.95).fillRoundedRect(160,30,138,12,5)
      .fillStyle(this.baseHP>35?0x47d65b:0xef4f55).fillRoundedRect(162,32,134*Math.min(100,this.baseHP/(100+FORGE_CORE_BONUS)*100)/100,8,4);
    this.baseLabel?.destroy(); this.basePercent?.destroy();
    this.baseLabel=this.add.text(35,28,'🏰 สวนลอยฟ้า',{font:'bold 15px Arial',color:'#ffffff',stroke:'#071329',strokeThickness:2}).setDepth(21);
    this.basePercent=this.add.text(322,28,`${hp}%`,{font:'bold 13px Arial',color:'#ffffff',stroke:'#071329',strokeThickness:2}).setOrigin(.5,0).setDepth(21);
  }
  createBossBar(){
    this.bossBar=this.add.graphics().setDepth(20).setVisible(false);
    this.bossLabel=this.add.text(0,0,'',{font:'bold 15px Arial',color:'#ffffff',stroke:'#071329',strokeThickness:2}).setDepth(21).setVisible(false);
    this.bossPercent=this.add.text(0,0,'',{font:'bold 13px Arial',color:'#ffffff',stroke:'#071329',strokeThickness:2}).setOrigin(.5,0).setDepth(21).setVisible(false);
  }
  drawBossBar(enemy){
    if(!enemy){this.hideBossBar();return;}
    const pct=Math.max(0,Math.min(100,Math.ceil(enemy.hp/enemy.maxHp*100)));
    const x=618,y=17,w=320,h=40;
    this.bossBar.setVisible(true).clear()
      .fillStyle(0x0c1b38,.9).fillRoundedRect(x,y,w,h,10)
      .lineStyle(2,0xff728b).strokeRoundedRect(x,y,w,h,10)
      .fillStyle(0xffffff,.95).fillRoundedRect(x+138,y+13,138,12,5)
      .fillStyle(pct>60?0x47d65b:pct>30?0xffb23e:0xef4f55).fillRoundedRect(x+140,y+15,134*pct/100,8,4);
    this.bossLabel.setText(`${STAGE.bossIcon} ${STAGE.boss}`).setPosition(x+13,y+11).setVisible(true);
    this.bossPercent.setText(`${pct}%`).setPosition(x+w-20,y+11).setVisible(true);
  }
  hideBossBar(){
    this.bossBar?.setVisible(false).clear();
    this.bossLabel?.setVisible(false);
    this.bossPercent?.setVisible(false);
  }
  makeGroups(){this.unitLayer=this.add.layer();this.enemyLayer=this.add.layer();this.fxLayer=this.add.layer()}
  createGhost(){this.ghost=this.add.container(0,0).setDepth(30).setVisible(false);this.ghostCircle=this.add.circle(0,0,30,0x67f2ff,.32).setStrokeStyle(3,0xffffff,.8);this.ghostSprite=this.add.image(0,0,'sunny').setDisplaySize(64,64).setAlpha(.75);this.ghost.add([this.ghostCircle,this.ghostSprite])}
  selectCard(id){
    const def=UNIT_DEFS.find(x=>x.id===id);
    if(!def)return;
    const cd=state.cooldowns[id]||0;
    if(cd>0){this.toast(`รอคูลดาวน์ ${Math.ceil(cd/1000)} วินาที`,0x6d3e91);return;}
    if(state.energy<def.cost){this.toast(`ต้องใช้พลังงาน ${def.cost}`,0x7c2f45);return;}
    this.closeUnitMenu();
    state.selected=id;
    document.querySelectorAll('.card').forEach(x=>x.classList.toggle('selected',x.dataset.id===id));
    this.ghostSprite.setTexture(id).setDisplaySize(64,64);
    this.ghost.setVisible(false);
  }
  cancelSelection(showToast=true){
    if(!state.selected)return false;
    state.selected=null;
    this.ghost.setVisible(false);
    document.querySelectorAll('.card').forEach(x=>x.classList.remove('selected'));
    if(showToast)this.toast('ยกเลิกการเลือกการ์ดแล้ว',0x315b7a);
    return true;
  }
  createUnitMenu(){
    this.unitMenuTarget=null; this.sellConfirm=false;
    this.unitMenu=this.add.container(0,0).setDepth(55).setVisible(false);
    const bg=this.add.rectangle(0,0,250,92,0x0c2448,.97).setStrokeStyle(3,0x7eb9ff,1);
    this.unitMenuTitle=this.add.text(0,-27,'',{font:'bold 16px Arial',color:'#ffffff'}).setOrigin(.5);
    this.unitMenuInfo=this.add.text(0,-7,'',{font:'13px Arial',color:'#dceaff'}).setOrigin(.5);
    this.upgradeMenuBtn=this.add.rectangle(-61,24,112,34,0x2d8f57).setStrokeStyle(2,0xffffff,.8).setInteractive({useHandCursor:true});
    this.upgradeMenuText=this.add.text(-61,24,'⬆ อัปเกรด',{font:'bold 13px Arial',color:'#fff'}).setOrigin(.5);
    this.sellMenuBtn=this.add.rectangle(61,24,112,34,0xa94747).setStrokeStyle(2,0xffffff,.8).setInteractive({useHandCursor:true});
    this.sellMenuText=this.add.text(61,24,'🗑 ขาย',{font:'bold 13px Arial',color:'#fff'}).setOrigin(.5);
    this.unitMenu.add([bg,this.unitMenuTitle,this.unitMenuInfo,this.upgradeMenuBtn,this.upgradeMenuText,this.sellMenuBtn,this.sellMenuText]);
    this.upgradeMenuBtn.on('pointerdown',(pointer,localX,localY,event)=>{event?.stopPropagation();const u=this.unitMenuTarget;if(!u)return;this.sellConfirm=false;this.upgradeUnit(u);if(this.units.includes(u))this.showUnitMenu(u)});
    this.sellMenuBtn.on('pointerdown',(pointer,localX,localY,event)=>{event?.stopPropagation();const u=this.unitMenuTarget;if(!u)return;if(!this.sellConfirm){this.sellConfirm=true;this.sellMenuText.setText('ยืนยันขาย');this.sellMenuBtn.setFillStyle(0xd16a31);return}this.sellUnit(u);this.closeUnitMenu();});
  }
  showUnitMenu(u){
    if(!u||!this.units.includes(u))return;
    this.unitMenuTarget=u; this.sellConfirm=false;
    const upgradeCost=u.level>=3?null:Math.floor(u.def.cost*(u.level===1?.7:1.05));
    const refund=Math.floor(u.def.cost*.4);
    this.unitMenuTitle.setText(`${u.def.icon} ${u.def.name} • Lv.${u.level}`);
    this.unitMenuInfo.setText(u.level>=3?`ระดับสูงสุด • ขายคืน ${refund} ☀️`:`อัปเกรด ${upgradeCost} ☀️ • ขายคืน ${refund} ☀️`);
    this.upgradeMenuText.setText(u.level>=3?'MAX':'⬆ อัปเกรด');
    this.upgradeMenuBtn.setFillStyle(u.level>=3?0x556070:0x2d8f57);
    this.sellMenuText.setText(`🗑 ขาย ${refund}`);
    const menuY=Math.max(62,u.y-78);
    const menuX=Phaser.Math.Clamp(u.x,140,820);
    this.unitMenu.setPosition(menuX,menuY).setVisible(true);
  }
  closeUnitMenu(){this.unitMenuTarget=null;this.sellConfirm=false;this.unitMenu?.setVisible(false)}
  handleTap(p){
    if(state.paused)return;
    const x=p.worldX,y=p.worldY;
    const outside=x<this.grid.x||x>this.grid.x+this.grid.w||y<this.grid.y||y>this.grid.y+this.grid.h;
    if(outside){
      this.closeUnitMenu();
      if(state.selected)this.cancelSelection();
      return;
    }
    const c=Math.floor((x-this.grid.x)/this.cw),r=Math.floor((y-this.grid.y)/this.ch);
    const cx=this.grid.x+c*this.cw+this.cw/2,cy=this.grid.y+r*this.ch+this.ch/2;
    const existing=this.units.find(u=>u.r===r&&u.c===c);
    if(state.selected){
      if(existing){
        this.cancelSelection(false);
        this.showUnitMenu(existing);
        return;
      }
      this.closeUnitMenu();
      this.ghost.setPosition(cx,cy).setVisible(true);
      this.placeUnit(state.selected,r,c,cx,cy);
      return;
    }
    if(existing)this.showUnitMenu(existing);
    else this.closeUnitMenu();
  }
  placeUnit(id,r,c,x,y){
    const def=UNIT_DEFS.find(d=>d.id===id);
    if(!def)return false;
    const cd=state.cooldowns[id]||0;
    if(cd>0){
      this.cancelSelection(false);
      this.toast(`การ์ดยังคูลดาวน์ ${Math.ceil(cd/1000)} วินาที`,0x6d3e91);
      this.updateHud();
      return false;
    }
    if(state.energy<def.cost){
      this.cancelSelection(false);
      this.toast(`ต้องใช้พลังงาน ${def.cost}`,0x7c2f45);
      this.updateHud();
      return false;
    }
    state.energy-=def.cost;
    /* Start cooldown before creating the unit so rapid/double taps cannot bypass it. */
    state.cooldowns[id]=Math.max(800,Math.floor(def.cool*FORGE_COOLDOWN_MULT));
    state.selected=null;
    this.ghost.setVisible(false);
    document.querySelectorAll('.card').forEach(x=>x.classList.remove('selected'));
    const s=this.add.image(x,y,def.texture||id).setDisplaySize(64,64).setDepth(10);
    s.setScale(0);
    this.tweens.add({targets:s,scale:.67,duration:220,ease:'Back.Out'});
    const hp=this.add.graphics().setDepth(12);
    const levelText=this.add.text(x+24,y+23,'Lv.1',{font:'bold 11px Arial',color:'#ffffff',backgroundColor:'#17375f',padding:{x:4,y:2},stroke:'#07152a',strokeThickness:2}).setOrigin(.5).setDepth(14);
    const battleDef={...def,damage:def.damage?Math.max(1,Math.floor(def.damage*FORGE_DAMAGE_MULT)):def.damage};
    const u={def:battleDef,r,c,x,y,s,hp,levelText,maxHp:battleDef.hp,hpVal:battleDef.hp,next:400,age:0,level:1};
    this.units.push(u);updateProgress(s=>{s.stats.unitsPlaced++;s.daily.unitsPlaced++;});
    this.closeUnitMenu();
    this.burst(x,y,0x83f4ff,12);
    this.beep(520,.07);
    this.updateHud();
    return true;
  }

  upgradeUnit(u){
    if(u.level>=3){this.toast('ยูนิตระดับสูงสุดแล้ว',0x6d3e91);return}
    const cost=Math.floor(u.def.cost*(u.level===1?.7:1.05));
    if(state.energy<cost){this.toast(`ต้องใช้พลังงาน ${cost}`,0x7c2f45);return}
    state.energy-=cost;u.level++;updateProgress(s=>{s.stats.upgrades++;s.daily.upgrades++;});u.maxHp=Math.floor(u.maxHp*1.45);u.hpVal=u.maxHp;
    if(u.def.damage)u.def={...u.def,damage:Math.floor(u.def.damage*1.45),rate:Math.max(420,Math.floor(u.def.rate*.88))};
    u.s.setDisplaySize(64+u.level*6,64+u.level*6);u.levelText.setText(`Lv.${u.level}`).setBackgroundColor(u.level===3?'#8c4aa8':'#17375f');this.burst(u.x,u.y,0xffe16b,18);
    this.floatText(u.x,u.y-48,`Lv.${u.level}`,'#ffe276');this.beep(760,.12);this.updateHud();
  }

  sellUnit(u){if(this.unitMenuTarget===u)this.closeUnitMenu();state.energy+=Math.floor(u.def.cost*.4);this.burst(u.x,u.y,0xffd45e,10);u.s.destroy();u.hp.destroy();u.levelText?.destroy();this.units=this.units.filter(x=>x!==u);this.updateHud()}
  tickSecond(){if(state.paused)return;state.energy=Math.min(999,state.energy+8);state.skill=Math.max(0,state.skill-1000);for(const id in state.cooldowns)state.cooldowns[id]=Math.max(0,state.cooldowns[id]-1000);this.updateHud()}
  step(dt){if(state.paused)return;dt*=state.speed;this.spawnLogic(dt);this.updateUnits(dt);this.updateEnemies(dt);this.updateProjectiles(dt);this.updateCards(dt)}
  spawnLogic(dt){if(this.waveSpawned<this.waveTarget){this.spawnTimer-=dt;if(this.spawnTimer<=0){this.spawnEnemy();this.waveSpawned++;this.spawnTimer=Math.max(700,1900-state.wave*80)}}else if(this.enemies.length===0){this.waveDelay+=dt;if(this.waveDelay>2200){if(state.wave>=state.maxWave){this.endGame(true);return}state.wave++;this.waveSpawned=0;this.waveTarget=4+state.wave*2;this.waveDelay=0;this.toast(`เวฟ ${state.wave} เริ่มแล้ว!`,0x1b5d87);this.updateHud()}}}
  spawnEnemy(){const row=Phaser.Math.Between(0,4);let kind='goblin';if(state.wave>=2&&Math.random()<(CURRENT_STAGE===3?.34:.22))kind='orc';if(state.wave>=3&&Math.random()<(CURRENT_STAGE===2?.30:.18))kind='mage';if((state.wave===4||state.wave===8||state.wave===12)&&this.waveSpawned===this.waveTarget-1)kind='dragon';const bossScale=1+(state.wave-4)*.12;const raw={goblin:[95+state.wave*6,25+state.wave*.35,25],orc:[240+state.wave*13,37,40],mage:[150+state.wave*9,30,34],dragon:[Math.floor(1200*bossScale),14,70]}[kind];const stats=[Math.floor(raw[0]*STAGE.enemyHp),raw[1]*STAGE.enemySpeed,raw[2]];const y=this.grid.y+row*this.ch+this.ch/2;const s=this.add.image(890,y,kind).setDisplaySize(kind==='dragon'?92:62,kind==='dragon'?92:62).setDepth(11);const bar=this.add.graphics().setDepth(13);this.enemies.push({kind,row,x:890,y,s,bar,hp:stats[0],maxHp:stats[0],speed:stats[1],damage:stats[2],atk:0,slow:0});if(kind==='dragon'){this.boss=this.enemies[this.enemies.length-1];this.drawBossBar(this.boss);this.cameras.main.shake(500,.016);this.toast(`⚠️ ${STAGE.boss} บุก!`,0x8d2638);this.beep(90,.45)}}
  updateUnits(dt){for(const u of [...this.units]){u.age+=dt;u.next-=dt;u.levelText?.setPosition(u.x+24,u.y+23);u.hp.clear().fillStyle(0x14223c,.9).fillRect(u.x-26,u.y-36,52,6).fillStyle(0xffe276).fillCircle(u.x-29,u.y-33,7).fillStyle(0x55df63).fillRect(u.x-25,u.y-35,50*Math.max(0,u.hpVal/u.maxHp),4);if(u.hpVal<=0){if(this.unitMenuTarget===u)this.closeUnitMenu();this.burst(u.x,u.y,0xffffff,8);u.s.destroy();u.hp.destroy();u.levelText?.destroy();this.units=this.units.filter(x=>x!==u);continue}if(u.def.id==='sunny'&&u.next<=0){state.energy=Math.min(999,state.energy+25);u.next=u.def.rate;this.floatText(u.x,u.y-40,'+25 ☀️','#ffe268');this.burst(u.x,u.y,0xffe55b,8);this.updateHud();continue}if(!u.def.damage)continue;const target=this.enemies.filter(e=>e.row===u.r&&e.x>u.x-10&&e.x-u.x<u.def.range).sort((a,b)=>a.x-b.x)[0];if(target&&u.next<=0){u.next=u.def.rate;this.tweens.add({targets:u.s,scaleX:.76,scaleY:.58,yoyo:true,duration:90});if(u.def.mine){this.explode(u,target);u.hpVal=0}else if(u.def.laser)this.fireLaser(u,target);else{for(let i=0;i<(u.def.shots||1);i++)this.fireProjectile(u,target,i*120)}}}}
  fireProjectile(u,target,delay=0){this.time.delayedCall(delay,()=>{if(!u.s.active||!target.s.active)return;const color=u.def.slow?0x6de8ff:0xffd55b;const orb=this.add.circle(u.x+22,u.y-5,6,color).setDepth(15);this.projectiles.push({orb,x:u.x+22,y:u.y-5,target,damage:u.def.damage,speed:430,slow:u.def.slow})})}
  fireLaser(u,target){const line=this.add.graphics().setDepth(16);line.lineStyle(7,0xff6de5,.85).lineBetween(u.x+18,u.y,target.x,target.y);line.lineStyle(2,0xffffff,1).lineBetween(u.x+18,u.y,target.x,target.y);this.time.delayedCall(100,()=>line.destroy());this.enemies.filter(e=>e.row===u.r&&e.x>u.x).forEach(e=>this.hitEnemy(e,u.def.damage));this.cameras.main.shake(80,.002)}
  explode(u,target){const boom=this.add.circle(target.x,target.y,12,0xff9b42,.8).setDepth(18);this.tweens.add({targets:boom,scale:5,alpha:0,duration:260,onComplete:()=>boom.destroy()});this.enemies.filter(e=>e.row===u.r&&Math.abs(e.x-target.x)<110).forEach(e=>this.hitEnemy(e,u.def.damage));this.cameras.main.shake(180,.008)}
  updateEnemies(dt){for(const e of [...this.enemies]){e.atk-=dt;e.s.setAngle(Math.sin(this.time.now/140+e.y)*3);e.s.setY(e.y+Math.sin(this.time.now/180+e.x)*2);if(e.kind==='dragon')this.drawBossBar(e);e.bar.clear().fillStyle(0x321725,.9).fillRect(e.x-29,e.y-39,58,7).fillStyle(e.kind==='dragon'?0xffb32d:0xef4b61).fillRect(e.x-28,e.y-38,56*Math.max(0,e.hp/e.maxHp),5);if(e.hp<=0){this.killEnemy(e);continue}e.s.setTint(e.slow>0?0x9befff:0xffffff);e.slow=Math.max(0,e.slow-dt);const blocker=this.units.filter(u=>u.r===e.row&&u.x<e.x&&e.x-u.x<50).sort((a,b)=>b.x-a.x)[0];if(blocker){if(e.atk<=0){blocker.hpVal-=e.damage;e.atk=850;this.tweens.add({targets:blocker.s,x:blocker.x-4,yoyo:true,duration:80});this.floatText(blocker.x,blocker.y-25,`-${e.damage}`,'#ff8a8a')}}else{e.x-=e.speed*(e.slow>0?.45:1)*dt/1000;e.s.setX(e.x)}if(e.x<105){this.baseHP-=e.kind==='dragon'?20:8;this.drawBaseBar();this.removeEnemy(e);this.cameras.main.shake(160,.008);if(this.baseHP<=0)this.endGame(false)}}}
  updateProjectiles(dt){for(const p of [...this.projectiles]){if(!p.target||!p.target.s.active){p.orb.destroy();this.projectiles=this.projectiles.filter(x=>x!==p);continue}const dx=p.target.x-p.x,dy=p.target.y-p.y,d=Math.hypot(dx,dy);const step=p.speed*dt/1000;if(d<=step+9){this.hitEnemy(p.target,p.damage,p.slow);this.burst(p.target.x,p.target.y,p.slow?0x72e8ff:0xffdb6d,5);this.beep(p.slow?330:650,.025);p.orb.destroy();this.projectiles=this.projectiles.filter(x=>x!==p)}else{p.x+=dx/d*step;p.y+=dy/d*step;p.orb.setPosition(p.x,p.y)}}}
  hitEnemy(e,dmg,slow=false){e.hp-=dmg;if(slow)e.slow=1900;e.s.setTintFill(0xffffff);this.time.delayedCall(55,()=>e.s.active&&e.s.clearTint());this.floatText(e.x,e.y-30,`-${dmg}`,'#ffffff')}
  killEnemy(e){state.kills++;updateProgress(s=>{s.stats.kills++;s.daily.kills++;if(e.kind==='dragon')s.stats.bosses++;});state.energy=Math.min(999,state.energy+(e.kind==='dragon'?100:e.kind==='orc'?18:10));this.burst(e.x,e.y,e.kind==='dragon'?0xff516f:0xa78bff,e.kind==='dragon'?30:12);this.tweens.add({targets:e.s,alpha:0,scale:1.4,angle:25,duration:220,onComplete:()=>e.s.destroy()});e.bar.destroy();this.enemies=this.enemies.filter(x=>x!==e);if(e.kind==='dragon'){this.hideBossBar();this.boss=null}this.updateHud()}
  removeEnemy(e){e.s.destroy();e.bar.destroy();this.enemies=this.enemies.filter(x=>x!==e);if(e.kind==='dragon'){this.hideBossBar();this.boss=null}}
  burst(x,y,color,count){for(let i=0;i<count;i++){const p=this.add.circle(x,y,Phaser.Math.Between(2,5),color).setDepth(25);const a=Math.random()*Math.PI*2,d=Phaser.Math.Between(18,55);this.tweens.add({targets:p,x:x+Math.cos(a)*d,y:y+Math.sin(a)*d,alpha:0,scale:.2,duration:Phaser.Math.Between(220,480),onComplete:()=>p.destroy()})}}
  floatText(x,y,text,color){const t=this.add.text(x,y,text,{font:'bold 15px Arial',color,stroke:'#091328',strokeThickness:3}).setOrigin(.5).setDepth(30);this.tweens.add({targets:t,y:y-28,alpha:0,duration:650,onComplete:()=>t.destroy()})}
  toast(msg,color){const box=this.add.container(480,78).setDepth(40);const bg=this.add.rectangle(0,0,330,48,color,.92).setStrokeStyle(2,0xffffff,.5);const tx=this.add.text(0,0,msg,{font:'bold 20px Arial',color:'#fff'}).setOrigin(.5);box.add([bg,tx]);box.setScale(.7).setAlpha(0);this.tweens.add({targets:box,scale:1,alpha:1,duration:180,hold:900,yoyo:true,onComplete:()=>box.destroy()})}

  heroSkill(){if(state.paused||state.skill>0)return;state.skill=26000;this.toast('⚡ พายุสายฟ้า!',0x6b48b8);this.cameras.main.shake(450,.018);for(const e of [...this.enemies]){this.time.delayedCall(Phaser.Math.Between(0,550),()=>{if(!e.s.active)return;const bolt=this.add.rectangle(e.x,e.y-100,8,200,0xbef6ff,.95).setDepth(35);this.tweens.add({targets:bolt,alpha:0,scaleX:2,duration:180,onComplete:()=>bolt.destroy()});this.hitEnemy(e,e.kind==='dragon'?180:260);this.burst(e.x,e.y,0x9cefff,18)});}this.beep(180,.8);this.updateHud()}
  beep(freq=440,d=.08){if(!state.sound)return;try{this.audioCtx=this.audioCtx||new (window.AudioContext||window.webkitAudioContext)();const o=this.audioCtx.createOscillator(),g=this.audioCtx.createGain();o.frequency.value=freq;o.type='square';g.gain.setValueAtTime(.035,this.audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.001,this.audioCtx.currentTime+d);o.connect(g).connect(this.audioCtx.destination);o.start();o.stop(this.audioCtx.currentTime+d)}catch(_){}}
  updateCards(){
    document.querySelectorAll('.card').forEach(el=>{
      const d=UNIT_DEFS.find(x=>x.id===el.dataset.id);
      if(!d)return;
      const cd=state.cooldowns[d.id]||0;
      const cooling=cd>0;
      const unavailable=state.energy<d.cost||cooling;
      el.classList.toggle('locked',unavailable);
      el.classList.toggle('cooling',cooling);
      el.setAttribute('aria-disabled',unavailable?'true':'false');
      const total=d.cool||1;
      const overlay=el.querySelector('.cooldown');
      overlay.style.height=`${Math.min(100,cd/total*100)}%`;
      overlay.setAttribute('aria-label',cooling?`คูลดาวน์ ${Math.ceil(cd/1000)} วินาที`:'พร้อมใช้งาน');
    });
  }
  updateHud(){state.energy=Math.floor(state.energy);$('#energyText').textContent=`☀️ ${state.energy}`;$('#waveText').textContent=`🌊 ${state.wave}/${state.maxWave}`;$('#killText').textContent=`💀 ${state.kills}`;const b=$('#skillBtn');b.classList.toggle('ready',state.skill<=0);b.classList.toggle('cooling',state.skill>0);b.textContent=state.skill>0?`⚡${Math.ceil(state.skill/1000)}`:'⚡';this.updateCards()}
  togglePause(){state.paused=!state.paused;$('#pauseBtn').textContent=state.paused?'▶':'Ⅱ';this.toast(state.paused?'หยุดเกม':'เล่นต่อ',0x263f68)}
  toggleSpeed(){state.speed=state.speed===1?2:1;$('#speedBtn').textContent=`×${state.speed}`}
  showVictoryDom({stars, unlockedHeroNew, unlockedHeroDef}){
    const overlay=document.querySelector('#victoryOverlay');
    if(!overlay)return;
    const set=(sel,value)=>{const el=document.querySelector(sel);if(el)el.textContent=value;};
    set('#victoryTitle','ชนะด่านแล้ว!');
    set('#victoryStage',`ด่าน ${CURRENT_STAGE} • ${STAGE.name}`);
    set('#victoryStars','★'.repeat(stars)+'☆'.repeat(3-stars));
    set('#victoryKills',`💀 ${state.kills} ตัว`);
    set('#victoryCore',`❤️ ${Math.max(0,Math.ceil(this.baseHP))}%`);
    set('#victoryWaves',`🌊 ${state.maxWave}/${state.maxWave}`);

    const rewards=document.querySelector('#victoryRewards');
    rewards.innerHTML='';
    const confetti=document.querySelector('#victoryConfetti');
    if(confetti){
      confetti.innerHTML='';
      const palette=['#ffd84b','#62caff','#ff79d8','#7dff8b','#ff8a4b','#a98cff'];
      for(let i=0;i<34;i++){
        const bit=document.createElement('i');
        bit.style.left=`${Math.random()*100}%`;
        bit.style.background=palette[i%palette.length];
        bit.style.setProperty('--dur',`${3.2+Math.random()*2.8}s`);
        bit.style.setProperty('--delay',`${-Math.random()*5}s`);
        bit.style.setProperty('--drift',`${-80+Math.random()*160}px`);
        bit.style.setProperty('--rot',`${Math.random()*180}deg`);
        confetti.appendChild(bit);
      }
    }
    const addCard=(type,badge,icon,amount,label,sub,delay=0)=>{
      const card=document.createElement('article');
      card.className=`victory-reward-card ${type}`;
      card.style.animationDelay=`${delay}ms`;
      card.innerHTML=`<span class="reward-badge">${badge}</span><span class="reward-icon">${icon}</span><strong class="reward-amount">${amount}</strong><span class="reward-label">${label}</span><small class="reward-sub">${sub}</small>`;
      rewards.appendChild(card);
    };
    addCard('gold','GOLD','🪙',`+${STAGE.reward}`,'เหรียญทอง','ใช้ซื้อฮีโร่และไอเทม',80);
    addCard('gem','GEM','💎',`+${STAGE.gems||0}`,'เพชรฟ้า','สกุลเงินพิเศษ',180);
    if(unlockedHeroDef){
      addCard('hero',unlockedHeroNew?'NEW HERO!':'HERO',unlockedHeroDef.icon,unlockedHeroDef.name,unlockedHeroNew?'ปลดล็อกฮีโร่ใหม่':'ฮีโร่ประจำด่าน',unlockedHeroNew?'เพิ่มเข้าเด็คเรียบร้อยแล้ว':'ได้รับรางวัลด่านนี้แล้ว',280);
    }

    const note=document.querySelector('#victoryUnlockNote');
    if(unlockedHeroDef&&unlockedHeroNew){
      note.hidden=false;
      note.textContent=`👑 ปลดล็อก ${unlockedHeroDef.name} แล้ว — ตรวจสอบได้ที่ศาลาฮีโร่`;
    }else note.hidden=true;

    const replay=document.querySelector('#victoryReplay');
    const next=document.querySelector('#victoryNext');
    const map=document.querySelector('#victoryMap');
    replay.onclick=()=>location.reload();
    next.hidden=CURRENT_STAGE>=10;
    next.onclick=()=>{localStorage.setItem('orchardCurrentStage',String(Math.min(10,CURRENT_STAGE+1)));location.reload();};
    map.onclick=()=>{overlay.classList.remove('show');overlay.setAttribute('aria-hidden','true');window.openCampaignMap();};
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden','false');
  }

  endGame(win){
    if(state.paused)return;
    this.closeUnitMenu();
    state.paused=true;
    let stars=0;
    let unlockedHeroNew=false;
    const unlockedHeroDef=STAGE.heroUnlock?UNIT_DEFS.find(x=>x.id===STAGE.heroUnlock):null;

    if(win){
      stars=1+(this.baseHP>=60?1:0)+(this.baseHP>=90?1:0);
      let save;try{save=JSON.parse(localStorage.getItem('orchardCampaignV1'))||{}}catch{save={}};
      save.unlocked=Math.max(save.unlocked||1,Math.min(10,CURRENT_STAGE+1));
      save.stars=save.stars||{};
      save.stars[CURRENT_STAGE]=Math.max(save.stars[CURRENT_STAGE]||0,stars);
      save.gold=(save.gold||0)+STAGE.reward;
      save.ownedHeroes=Array.from(new Set(save.ownedHeroes?.length?save.ownedHeroes:['peachy']));
      unlockedHeroNew=!!(STAGE.heroUnlock&&!save.ownedHeroes.includes(STAGE.heroUnlock));
      if(unlockedHeroNew)save.ownedHeroes.push(STAGE.heroUnlock);
      save.stats=save.stats||{kills:0,unitsPlaced:0,upgrades:0,stagesCleared:0,bosses:0};
      save.stats.stagesCleared++;
      const d=new Date().toISOString().slice(0,10);
      if(save.daily?.date!==d)save.daily={date:d,kills:0,unitsPlaced:0,upgrades:0,stagesCleared:0};
      save.daily.stagesCleared++;
      localStorage.setItem('orchardCampaignV1',JSON.stringify(save));
      let hub;try{hub=JSON.parse(localStorage.getItem('orchardHubV1'))||{}}catch{hub={}};
      hub.gems=Number(hub.gems||0)+Number(STAGE.gems||0);
      localStorage.setItem('orchardHubV1',JSON.stringify(hub));
      this.showVictoryDom({stars,unlockedHeroNew,unlockedHeroDef});
      return;
    }

    this.add.rectangle(480,270,960,540,0x020817,.93).setDepth(60);
    this.add.text(480,150,'💔 สวนถูกทำลาย',{font:'bold 44px Arial',color:'#ff7785',stroke:'#051026',strokeThickness:8}).setOrigin(.5).setDepth(61);
    this.add.text(480,210,`ด่าน ${CURRENT_STAGE} • ${STAGE.name}`,{font:'bold 28px Arial',color:'#fff'}).setOrigin(.5).setDepth(61);
    this.add.text(480,258,`กำจัด ${state.kills} ตัว • Core ${Math.max(0,Math.ceil(this.baseHP))}%`,{font:'bold 21px Arial',color:'#dceaff'}).setOrigin(.5).setDepth(61);
    const makeButton=(x,label,color,onClick,width=210)=>{
      const btn=this.add.rectangle(x,355,width,58,color).setStrokeStyle(3,0xffffff,.9).setInteractive({useHandCursor:true}).setDepth(64);
      this.add.text(x,355,label,{font:'bold 21px Arial',color:'#fff'}).setOrigin(.5).setDepth(65);
      btn.on('pointerdown',onClick);
    };
    makeButton(365,'↻ เล่นอีกครั้ง',0x2b88c5,()=>location.reload());
    makeButton(595,'🗺 เลือกด่าน',0x388d55,()=>window.openCampaignMap());
  }

}

const config={type:Phaser.AUTO,parent:'game',width:960,height:540,backgroundColor:'#78dce8',scene:[BattleScene],scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},render:{antialias:true,pixelArt:false},input:{activePointers:3}};
if(typeof Phaser==='undefined'){$('#loading').textContent='ไม่สามารถโหลดเอนจินเกมได้ กรุณาเชื่อมต่ออินเทอร์เน็ตแล้วรีเฟรชหน้าเว็บ'}else new Phaser.Game(config);
