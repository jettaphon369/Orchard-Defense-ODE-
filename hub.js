'use strict';
const SAVE_KEY='orchardCampaignV1', HUB_KEY='orchardHubV1';
const $h=s=>document.querySelector(s); const today=()=>new Date().toISOString().slice(0,10);
const HERO_DATA={
 peachy:{icon:'🍑',name:'Peachy',rarity:'Common ⭐',role:'เรนเจอร์ • ยิงเร็ว',skill:'Peach Shot',skillDesc:'ยิงผลพีชใส่ศัตรูตัวแรกในแถว',stats:{hp:'115',damage:'22',speed:'1.05 วินาที',range:'ทั้งแถว'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 sunny:{icon:'🌻',name:'Sunny',rarity:'Common ⭐',role:'ซัพพอร์ต • ผลิตพลังงาน',skill:'Sun Blessing',skillDesc:'สร้างพลังงานเป็นช่วง ๆ',stats:{hp:'95',damage:'—',speed:'4.2 วินาที',range:'—'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 cobs:{icon:'🌽',name:'Cobsworth',rarity:'Rare ⭐⭐',role:'เรนเจอร์ • ยิงคู่',skill:'Twin Corn',skillDesc:'ยิงพร้อมกัน 2 นัด',stats:{hp:'125',damage:'18×2',speed:'0.9 วินาที',range:'ทั้งแถว'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 spud:{icon:'🥔',name:'Spud',rarity:'Rare ⭐⭐',role:'กับระเบิด • วงกว้าง',skill:'Big Boom',skillDesc:'ระเบิดเมื่อศัตรูเข้าใกล้',stats:{hp:'170',damage:'150',speed:'ใช้ครั้งเดียว',range:'ใกล้'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 lily:{icon:'🪷',name:'Water Lily',rarity:'Epic ⭐⭐⭐',role:'ควบคุม • ชะลอ',skill:'Water Aura',skillDesc:'ลดความเร็วศัตรู',stats:{hp:'105',damage:'15',speed:'1.35 วินาที',range:'ทั้งแถว'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 coconut:{icon:'🥥',name:'Coconut',rarity:'Epic ⭐⭐⭐',role:'แทงก์ • ป้องกัน',skill:'Coconut Shield',skillDesc:'หยุดศัตรูและรับความเสียหาย',stats:{hp:'520',damage:'—',speed:'—',range:'ประชิด'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 laser:{icon:'🍄',name:'Laser Shroom',rarity:'Legendary ⭐⭐⭐⭐',role:'เมจ • เลเซอร์',skill:'Laser Beam',skillDesc:'ยิงทะลุศัตรูทั้งแถว',stats:{hp:'100',damage:'42',speed:'1.85 วินาที',range:'ทั้งแถว'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 berry:{icon:'🫐',name:'Berry Mage',rarity:'Epic ⭐⭐⭐',role:'เมจ • ดาเมจเวท',skill:'Berry Burst',skillDesc:'ยิงเวทผลเบอร์รี่รุนแรง',stats:{hp:'110',damage:'38',speed:'1.3 วินาที',range:'ทั้งแถว'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 appleknight:{icon:'🍎',name:'Apple Knight',rarity:'Epic ⭐⭐⭐',role:'แทงก์ • โต้กลับ',skill:'Apple Guard',skillDesc:'ยืนแนวหน้าและโจมตีสวน',stats:{hp:'470',damage:'20',speed:'1.5 วินาที',range:'ใกล้'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 bloom:{icon:'🌺',name:'Bloom Fairy',rarity:'Legendary ⭐⭐⭐⭐',role:'ซัพพอร์ต • เร่งโจมตี',skill:'Bloom Wind',skillDesc:'ยิงเร็วและสนับสนุนแนวหลัง',stats:{hp:'100',damage:'20',speed:'0.75 วินาที',range:'ทั้งแถว'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 thorn:{icon:'🌵',name:'Thorn Guardian',rarity:'Legendary ⭐⭐⭐⭐',role:'ป้องกัน • ยิงหลายหนาม',skill:'Thorn Volley',skillDesc:'ยิงหนาม 3 นัดพร้อมกัน',stats:{hp:'240',damage:'16×3',speed:'1.1 วินาที',range:'ทั้งแถว'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 frostberry:{icon:'🧊',name:'Frost Berry',rarity:'Epic ⭐⭐⭐',role:'น้ำแข็ง • ชะลอ',skill:'Frozen Berry',skillDesc:'ทำดาเมจพร้อมแช่เย็น',stats:{hp:'120',damage:'28',speed:'1.2 วินาที',range:'ทั้งแถว'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 thunderpear:{icon:'🍐',name:'Thunder Pear',rarity:'Legendary ⭐⭐⭐⭐',role:'สายฟ้า • ยิงเร็ว',skill:'Thunder Shot',skillDesc:'ปล่อยพลังสายฟ้าต่อเนื่อง',stats:{hp:'115',damage:'30',speed:'0.85 วินาที',range:'ทั้งแถว'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 emberapple:{icon:'🔥',name:'Ember Apple',rarity:'Legendary ⭐⭐⭐⭐',role:'ไฟ • ระเบิด',skill:'Ember Blast',skillDesc:'สร้างดาเมจรุนแรงในพื้นที่',stats:{hp:'135',damage:'90',speed:'2.0 วินาที',range:'กลาง'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 moonmelon:{icon:'🍈',name:'Moon Melon',rarity:'Mythic ⭐⭐⭐⭐⭐',role:'เวท • ลำแสง',skill:'Moon Ray',skillDesc:'ยิงลำแสงจันทร์ทะลุแถว',stats:{hp:'130',damage:'55',speed:'1.7 วินาที',range:'ทั้งแถว'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 grapeoracle:{icon:'🍇',name:'Grape Oracle',rarity:'Epic ⭐⭐⭐',role:'พยากรณ์ • ยิงคู่',skill:'Oracle Seeds',skillDesc:'ยิงพลังเวท 2 ลูก',stats:{hp:'120',damage:'24×2',speed:'1.15 วินาที',range:'ทั้งแถว'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 kiwirogue:{icon:'🥝',name:'Kiwi Rogue',rarity:'Legendary ⭐⭐⭐⭐',role:'ลอบโจมตี • เร็ว',skill:'Kiwi Knives',skillDesc:'โจมตีเร็วมาก',stats:{hp:'105',damage:'18',speed:'0.55 วินาที',range:'ทั้งแถว'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 dragonfruit:{icon:'🐉',name:'Dragon Fruit',rarity:'Mythic ⭐⭐⭐⭐⭐',role:'แทงก์ • ยิงคู่',skill:'Dragon Breath',skillDesc:'แข็งแกร่งและยิง 2 นัด',stats:{hp:'600',damage:'26×2',speed:'1.4 วินาที',range:'ทั้งแถว'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 starfruit:{icon:'⭐',name:'Star Fruit',rarity:'Mythic ⭐⭐⭐⭐⭐',role:'แสง • เลเซอร์',skill:'Star Beam',skillDesc:'ลำแสงดาวพลังสูง',stats:{hp:'125',damage:'70',speed:'2.0 วินาที',range:'ทั้งแถว'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'},
 pumpkinking:{icon:'🎃',name:'Pumpkin King',rarity:'Mythic ⭐⭐⭐⭐⭐',role:'ระเบิด • บอสยูนิต',skill:'Royal Bomb',skillDesc:'ระเบิดวงกว้างมหาศาล',stats:{hp:'220',damage:'220',speed:'ใช้ครั้งเดียว',range:'กว้าง'},upgrades:['Lv.2: ค่าสถานะเพิ่ม 25%','Lv.3: สกิลได้รับความสามารถพิเศษ'],lore:'หนึ่งในผู้พิทักษ์แห่งอาณาจักรสวนลอยฟ้า'}
};
const STAGE_META={"1": {"name": "สวนลอยฟ้า", "icon": "🌿", "waves": 8}, "2": {"name": "ป่าเวทมนตร์", "icon": "🌲", "waves": 10}, "3": {"name": "ภูเขาไฟลอยฟ้า", "icon": "🌋", "waves": 12}, "4": {"name": "ทะเลสาบคริสตัล", "icon": "💧", "waves": 12}, "5": {"name": "ไร่ฟักทอง", "icon": "🎃", "waves": 13}, "6": {"name": "สวนโบราณ", "icon": "🏛️", "waves": 14}, "7": {"name": "ป่าหมอก", "icon": "🌫️", "waves": 15}, "8": {"name": "ทุ่งทองคำ", "icon": "🌾", "waves": 16}, "9": {"name": "ต้นไม้ศักดิ์สิทธิ์", "icon": "🌳", "waves": 17}, "10": {"name": "ราชาแห่งความมืด", "icon": "👑", "waves": 18}};
const STAGE_UNLOCKS={1:'sunny',2:'cobs',3:'spud',4:'lily',5:'coconut',6:'laser',7:'berry',8:'appleknight',9:'bloom',10:'thorn'};
const SHOP_HEROES={"frostberry": 45, "thunderpear": 52, "emberapple": 59, "moonmelon": 66, "grapeoracle": 73, "kiwirogue": 80, "dragonfruit": 87, "starfruit": 94, "pumpkinking": 101};
function campaignSave(){let s;try{s=JSON.parse(localStorage.getItem(SAVE_KEY))||{}}catch{s={}};s.unlocked=Math.max(1,s.unlocked||1);s.stars=s.stars||{};s.gold=s.gold||0;s.ownedHeroes=Array.from(new Set(s.ownedHeroes?.length?s.ownedHeroes:['peachy']));s.stats=s.stats||{kills:0,unitsPlaced:0,upgrades:0,stagesCleared:0,bosses:0};if(s.daily?.date!==today())s.daily={date:today(),kills:0,unitsPlaced:0,upgrades:0,stagesCleared:0};s.claimedQuests=s.claimedQuests||{};return s}
function saveCampaign(s){localStorage.setItem(SAVE_KEY,JSON.stringify(s))}
function hubSave(){let h;try{h=JSON.parse(localStorage.getItem(HUB_KEY))||{}}catch{h={}};h.gems=Number(h.gems??25);h.forge=h.forge||0;h.forgeUpgrades=h.forgeUpgrades||{blade:Number(h.forge||0),shield:0,gear:0};h.energyBonus=h.energyBonus||0;h.skinOwned=!!h.skinOwned;h.login=h.login||{lastClaim:'',day:0};return h}
function putHub(h){localStorage.setItem(HUB_KEY,JSON.stringify(h));refreshHub()}
function questDefs(s){return [
{id:'visit',title:'เข้าเมืองวันนี้',desc:'เข้าเยี่ยม Sky Kingdom',now:1,target:1,gold:50,gems:0},
{id:'place5',title:'นักวางแผน',desc:'วางยูนิต 5 ตัว',now:s.daily.unitsPlaced,target:5,gold:80,gems:0},
{id:'kill30',title:'ผู้พิทักษ์สวน',desc:'กำจัดศัตรู 30 ตัว',now:s.daily.kills,target:30,gold:100,gems:2},
{id:'clear1',title:'ออกผจญภัย',desc:'ผ่านด่าน 1 ครั้ง',now:s.daily.stagesCleared,target:1,gold:120,gems:3},
{id:'upgrade3',title:'พลังที่เติบโต',desc:'อัปเกรดยูนิต 3 ครั้ง',now:s.daily.upgrades,target:3,gold:90,gems:1}]}
function loginRewards(){return [{gold:100,gems:0},{gold:150,gems:2},{gold:200,gems:3},{gold:250,gems:4},{gold:300,gems:5},{gold:400,gems:7},{gold:600,gems:10}]}
function refreshHub(){
 const c=campaignSave(),h=hubSave(),star=Object.values(c.stars).reduce((a,b)=>a+b,0);saveCampaign(c);
 $h('#goldText').textContent=c.gold;$h('#gemText').textContent=h.gems;$h('#levelText').textContent=`Lv.${1+Math.floor(star/2)}`;
 const ready=questDefs(c).filter(q=>q.now>=q.target&&!c.claimedQuests[today()+q.id]).length;
 const dailyReady=h.login.lastClaim!==today();
 $h('#questBadge').textContent=ready?`รับได้ ${ready}`:'ไม่มีรางวัลค้าง';
 $h('#shopBadge').textContent='ฮีโร่พิเศษ';
 document.querySelector('.quest-v3')?.classList.toggle('status-ready',ready>0);
 document.querySelector('.reward-v3')?.classList.toggle('status-ready',dailyReady);
 document.querySelector('[data-place="quest"]')?.classList.toggle('status-ready',ready>0);
 document.querySelector('[data-place="reward"]')?.classList.toggle('status-ready',dailyReady);
}
function heroListHTML(){const c=campaignSave();return `<h2>🧙 ศาลาฮีโร่</h2><p>มีฮีโร่ ${c.ownedHeroes.length}/20 ตัว • ฮีโร่ที่ล็อกจะปลดจากด่านหรือซื้อด้วยเพชร</p><div class="hero-list">${Object.entries(HERO_DATA).map(([id,h])=>`<button class="hero-card ${c.ownedHeroes.includes(id)?'':'hero-locked'}" data-hero="${id}"><span>${h.icon}</span><b>${h.name}</b><small>${c.ownedHeroes.includes(id)?'ครอบครอง':'🔒 ยังไม่ปลดล็อก'}</small></button>`).join('')}</div>`}
function heroDetailHTML(id){const h=HERO_DATA[id],owned=campaignSave().ownedHeroes.includes(id);return `<button class="hero-back" data-action="heroes-back">← กลับรายชื่อ</button><div class="hero-detail"><div class="hero-detail-head"><div class="hero-big">${h.icon}</div><div><h2>${h.name}</h2><div class="hero-rarity">${h.rarity}</div><p>${h.role}</p><b>${owned?'✅ ครอบครองแล้ว':'🔒 ยังไม่ปลดล็อก'}</b></div></div><div class="hero-section"><h3>${h.skill}</h3><p>${h.skillDesc}</p></div><div class="hero-stats">${Object.entries(h.stats).map(([k,v])=>`<div><small>${k}</small><b>${v}</b></div>`).join('')}</div><div class="hero-section"><h3>ผลการอัปเกรด</h3><ul>${h.upgrades.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="hero-lore">“${h.lore}”</div></div>`}
const positions={castle:[50,14],shop:[22,35],heroes:[78,35],forge:[20,61],quest:[80,61],home:[25,79],reward:[75,79],adventure:[50,91]};let moving=false;
function movePlayer(place,after){const p=$h('#player'),pos=positions[place]||[48,63];moving=true;p.classList.add('walking');p.style.left=pos[0]+'%';p.style.top=pos[1]+'%';setTimeout(()=>{p.classList.remove('walking');moving=false;after&&after()},520)}
function openFeature(place){if(place==='adventure'){movePlayer(place,()=>{$h('#map').classList.add('show');renderMap()});return}movePlayer(place,()=>{const m=$h('#buildingModal'),content=$h('#featureContent');content.innerHTML=featureHTML(place);content.scrollTop=0;m.classList.add('show');document.body.classList.add('feature-modal-open');bindFeature(place);requestAnimationFrame(()=>{content.scrollTop=0})})}
function shopHTML(){
 const c=campaignSave(),h=hubSave();
 const special=Object.entries(SHOP_HEROES).map(([id,price])=>{
  const x=HERO_DATA[id],owned=c.ownedHeroes.includes(id);
  return `<div class="product-card hero-product ${owned?'owned':''}">
   <div class="shop-hero-portrait"><span>${x.icon}</span><i>${owned?'✓':'NEW'}</i></div>
   <div class="shop-hero-info"><div class="product-head"><b>${x.name}</b><strong>💎 ${price}</strong></div>
   <small class="shop-rarity">${x.rarity}</small><p class="product-desc">${x.role}</p><p class="shop-skill"><b>${x.skill}</b> — ${x.skillDesc}</p>
   <div class="product-effect">ซื้อแล้วเพิ่มเข้าคอลเลกชันและนำไปวางในด่านได้ทันที</div>
   <button class="buy-button" data-hero-buy="${id}" ${owned?'disabled':''}>${owned?'ครอบครองแล้ว ✓':'ซื้อด้วยเพชร'}</button></div>
  </div>`}).join('');
 return `<h2>🛒 ร้านค้าเมฆทอง</h2><p>Gold ใช้อัปเกรดเมือง • Gem ใช้ซื้อฮีโร่พิเศษ</p><div class="shop-list"><div class="product-card ${h.energyBonus>=10?'owned':''}"><div class="product-head"><b>☀️ พลังงานเริ่มต้น +10</b><strong>100 Gold</strong></div><p class="product-desc">เริ่มทุกด่านด้วยพลังงานเพิ่ม 10 หน่วย</p><button class="buy-button" data-buy="energy" ${h.energyBonus>=10?'disabled':''}>${h.energyBonus>=10?'ซื้อแล้ว ✓':'ซื้อสินค้า'}</button></div>${special}</div>`
}
function questHTML(){const c=campaignSave(),h=hubSave();return `<h2>📜 เควสประจำวัน</h2><p>รีเซ็ตทุกวัน • รับ Gold และ Gem เพื่อพัฒนาทีม</p><div class="quest-list">${questDefs(c).map(q=>{const key=today()+q.id,done=q.now>=q.target,claimed=!!c.claimedQuests[key];return `<div class="quest-card"><b>${q.title}</b><p>${q.desc}</p><div class="quest-progress"><i style="width:${Math.min(100,q.now/q.target*100)}%"></i></div><small>${Math.min(q.now,q.target)}/${q.target} • รางวัล 🪙${q.gold} ${q.gems?`💎${q.gems}`:''}</small><button class="primary feature-action" data-quest="${q.id}" ${!done||claimed?'disabled':''}>${claimed?'รับแล้ว':done?'รับรางวัล':'ยังไม่สำเร็จ'}</button></div>`}).join('')}</div>`}
function rewardHTML(){const h=hubSave(),rewards=loginRewards(),claimed=h.login.lastClaim===today();return `<h2>🎁 ล็อกอินรายวัน</h2><p>เข้าเกมทุกวันเพื่อรับรางวัลต่อเนื่อง 7 วัน</p><div class="daily-seven">${rewards.map((r,i)=>`<span class="${i===h.login.day%7?'today':''}">วันที่ ${i+1}<br>🪙${r.gold} ${r.gems?`💎${r.gems}`:''}</span>`).join('')}</div><button class="primary feature-action" data-action="daily" ${claimed?'disabled':''}>${claimed?'รับวันนี้แล้ว':'รับรางวัลวันที่ '+(h.login.day%7+1)}</button>`}
function forgeHTML(){
 const c=campaignSave(),h=hubSave(),u=h.forgeUpgrades;
 const defs=[
  {id:'blade',icon:'⚔️',name:'คมดาบพิทักษ์',desc:'เพิ่มดาเมจฮีโร่ทุกตัว',value:`+${u.blade*4}%`,max:5,base:120,step:90},
  {id:'shield',icon:'🛡️',name:'เกราะแกนโลก',desc:'เพิ่มพลังชีวิต Core ตอนเริ่มด่าน',value:`+${u.shield*8}%`,max:5,base:140,step:100},
  {id:'gear',icon:'⚙️',name:'เฟืองเร่งพลัง',desc:'ลดเวลาคูลดาวน์การ์ดทุกใบ',value:`-${u.gear*3}%`,max:5,base:160,step:110}
 ];
 return `<h2>⚒️ โรงตีเหล็กแห่งผู้พิทักษ์</h2><p>ใช้ Gold ตีอุปกรณ์ถาวร โบนัสมีผลกับฮีโร่ทุกตัวและทุกด่าน</p><div class="forge-summary"><span>⚔️ ดาเมจ +${u.blade*4}%</span><span>🛡️ Core +${u.shield*8}%</span><span>⚙️ คูลดาวน์ -${u.gear*3}%</span></div><div class="forge-grid">${defs.map(x=>{const lv=u[x.id],cost=x.base+lv*x.step,maxed=lv>=x.max;return `<article class="forge-card ${maxed?'maxed':''}"><div class="forge-icon">${x.icon}</div><div class="forge-info"><b>${x.name}</b><small>Lv.${lv}/${x.max} • ${x.value}</small><p>${x.desc}</p><div class="forge-level">${Array.from({length:x.max},(_,i)=>`<i class="${i<lv?'on':''}"></i>`).join('')}</div></div><button class="forge-buy" data-forge-buy="${x.id}" data-cost="${cost}" ${maxed?'disabled':''}>${maxed?'MAX':`🪙 ${cost}`}</button></article>`}).join('')}</div><div class="forge-note">โรงตีเหล็กเป็นระบบพัฒนาระยะยาว: ยิ่งเล่นและสะสม Gold มาก ทีมทุกชุดก็แข็งแกร่งขึ้นโดยไม่ผูกกับฮีโร่ตัวเดียว</div>`
}
function featureHTML(place){const c=campaignSave(),h=hubSave();const defs={castle:`<h2>🏰 ปราสาทแห่งสวน</h2><div class="feature-grid"><div><b>แคมเปญ</b><small>ปลดล็อก ${c.unlocked}/10 ด่าน</small></div><div><b>ฮีโร่</b><small>${c.ownedHeroes.length}/20 ตัว</small></div></div><button class="primary feature-action" data-action="map">เปิดแผนที่บท</button>`,shop:shopHTML(),heroes:heroListHTML(),forge:forgeHTML(),quest:questHTML(),reward:rewardHTML(),home:`<h2>🏡 บ้านผู้เล่น</h2><div class="feature-grid"><div><b>Gold</b><small>${c.gold}</small></div><div><b>Gem</b><small>${h.gems}</small></div><div><b>ด่าน</b><small>${c.unlocked}/10</small></div><div><b>ฮีโร่</b><small>${c.ownedHeroes.length}/20</small></div></div><button class="feature-action" data-action="reset">รีเซ็ตข้อมูลทดสอบ</button>`};return defs[place]||'<h2>กำลังพัฒนา</h2>'}
function bindFeature(place){document.querySelectorAll('[data-hero]').forEach(b=>b.onclick=()=>{$h('#featureContent').innerHTML=heroDetailHTML(b.dataset.hero);bindFeature('heroes')});document.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>{const a=b.dataset.action,c=campaignSave(),h=hubSave();if(a==='heroes-back'){$h('#featureContent').innerHTML=heroListHTML();bindFeature('heroes')}else if(a==='map'){$h('#buildingModal').classList.remove('show');$h('#map').classList.add('show');renderMap()}else if(a==='daily'&&h.login.lastClaim!==today()){const r=loginRewards()[h.login.day%7];c.gold+=r.gold;h.gems+=r.gems;h.login.lastClaim=today();h.login.day=(h.login.day+1)%7;saveCampaign(c);putHub(h);$h('#featureContent').innerHTML=rewardHTML();bindFeature('reward')}else if(a==='reset'&&confirm('รีเซ็ตความคืบหน้าทั้งหมดหรือไม่?')){localStorage.removeItem(SAVE_KEY);localStorage.removeItem(HUB_KEY);location.reload()}});document.querySelectorAll('[data-quest]').forEach(b=>b.onclick=()=>{const c=campaignSave(),h=hubSave(),q=questDefs(c).find(x=>x.id===b.dataset.quest),key=today()+q.id;if(q&&q.now>=q.target&&!c.claimedQuests[key]){c.claimedQuests[key]=true;c.gold+=q.gold;h.gems+=q.gems;saveCampaign(c);putHub(h);$h('#featureContent').innerHTML=questHTML();bindFeature('quest')}});document.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const c=campaignSave(),h=hubSave();if(b.dataset.buy==='energy'&&h.energyBonus<10&&c.gold>=100){c.gold-=100;h.energyBonus=10;saveCampaign(c);putHub(h);$h('#featureContent').innerHTML=shopHTML();bindFeature('shop')}});document.querySelectorAll('[data-forge-buy]').forEach(b=>b.onclick=()=>{const c=campaignSave(),h=hubSave(),id=b.dataset.forgeBuy,cost=Number(b.dataset.cost),u=h.forgeUpgrades;if(!u||u[id]>=5)return;if(c.gold<cost){alert(`Gold ไม่พอ ต้องใช้ ${cost}`);return}c.gold-=cost;u[id]++;h.forge=u.blade;saveCampaign(c);putHub(h);$h('#featureContent').innerHTML=forgeHTML();bindFeature('forge')});document.querySelectorAll('[data-hero-buy]').forEach(b=>b.onclick=()=>{const c=campaignSave(),h=hubSave(),id=b.dataset.heroBuy,price=SHOP_HEROES[id];if(c.ownedHeroes.includes(id))return;if(h.gems<price){alert(`เพชรไม่พอ ต้องใช้ ${price} Gem`);return}h.gems-=price;c.ownedHeroes.push(id);saveCampaign(c);putHub(h);$h('#featureContent').innerHTML=shopHTML();bindFeature('shop')})}
function renderMap(){const s=campaignSave();$h('#progressText').textContent=`ปลดล็อก ${s.unlocked}/10 ด่าน • Gold ${s.gold} • ฮีโร่ ${s.ownedHeroes.length}/20`;document.querySelectorAll('.stageCard').forEach(b=>{const n=Number(b.dataset.stage),locked=n>s.unlocked,stars=s.stars[n]||0;b.classList.toggle('locked',locked);b.disabled=locked;b.querySelector('.stars').textContent='★'.repeat(stars)+'☆'.repeat(3-stars);b.onclick=()=>{if(!locked){localStorage.setItem('orchardCurrentStage',n);location.reload()}}})}
document.querySelectorAll('[data-place]').forEach(b=>b.addEventListener('click',()=>!moving&&openFeature(b.dataset.place)));$h('#closeFeature').onclick=()=>{$h('#buildingModal').classList.remove('show');document.body.classList.remove('feature-modal-open')};const closeCampaignMap=()=>$h('#map').classList.remove('show');$h('#closeMap').onclick=closeCampaignMap;$h('#closeMapTop').onclick=closeCampaignMap;$h('#hubSound').onclick=e=>e.currentTarget.textContent=e.currentTarget.textContent==='🔊'?'🔇':'🔊';const current=Number(localStorage.getItem('orchardCurrentStage')||0);if(current){$h('#hub').style.display='none';$h('#app').style.display='block';$h('#stageTitle').textContent=`ด่าน ${current} • ${STAGE_META[current]?.name||''}`}else $h('#app').style.display='none';window.openCampaignMap=()=>{localStorage.removeItem('orchardCurrentStage');location.reload()};$h('#mapBtn').onclick=()=>window.openCampaignMap();refreshHub();renderMap();

/* =========================================================
   V7.0 LIVING KINGDOM PATCH
   - NPCs follow safe town routes
   - ambient leaves, butterflies and World Tree sparkles
   - tap empty ground to move the Garden Keeper
   ========================================================= */
(function initLivingKingdomV7(){
  const world=document.querySelector('.open-island');
  const hub=document.querySelector('#hub');
  const player=document.querySelector('#player');
  if(!world||!hub||!player)return;

  // Remove legacy roaming NPCs/pets that could overlap buildings.
  world.querySelectorAll('.npc-walker,.pet-v3').forEach(el=>el.remove());

  const ambient=document.createElement('div');
  ambient.className='ambient-layer';
  const leaves=[
    [11,-1,'10s','-2s','72px'],[27,-4,'12s','-6s','-48px'],[48,-2,'9s','-4s','65px'],
    [67,-5,'11s','-8s','-75px'],[84,-1,'13s','-3s','42px'],[38,-6,'14s','-10s','95px'],
    [74,-7,'10s','-1s','-55px'],[18,-8,'15s','-11s','80px']
  ];
  leaves.forEach(([l,t,d,delay,dx],i)=>{
    const e=document.createElement('i');e.className='leaf-particle';e.textContent=i%2?'🍂':'🍃';
    e.style.left=l+'%';e.style.top=t+'%';e.style.setProperty('--dur',d);e.style.setProperty('--delay',delay);e.style.setProperty('--dx',dx);ambient.appendChild(e);
  });
  [[31,51,'7s'],[70,42,'8.5s']].forEach(([l,t,d],i)=>{const e=document.createElement('i');e.className='butterfly-v7';e.textContent=i?'🦋':'🦋';e.style.left=l+'%';e.style.top=t+'%';e.style.setProperty('--dur',d);ambient.appendChild(e)});
  [[47,55,'2.6s','-.5s'],[53,53,'3.1s','-1.4s'],[50,49,'2.2s','-.9s']].forEach(([l,t,d,delay])=>{const e=document.createElement('i');e.className='sparkle-v7';e.textContent='✦';e.style.left=l+'%';e.style.top=t+'%';e.style.setProperty('--dur',d);e.style.setProperty('--delay',delay);ambient.appendChild(e)});
  world.appendChild(ambient);

  const routes={
    merchant:[[22,35],[36,39],[49,40],[62,39],[78,35],[61,48],[50,50],[35,48]],
    mage:[[78,35],[66,43],[51,49],[50,59],[67,61],[80,61],[63,69],[50,69],[34,61],[20,61],[35,50]]
  };
  const npcDefs=[
    {id:'merchant',icon:'🧑‍🌾',thought:'ชมตลาด',start:0,time:2.7},
    {id:'mage',icon:'🧙',thought:'ศึกษาเวท',start:3,time:3.1}
  ];
  npcDefs.forEach(def=>{
    const route=routes[def.id];let idx=def.start;
    const npc=document.createElement('span');npc.className='npc-v7';npc.innerHTML=`<i class="npc-avatar">${def.icon}</i><i class="npc-shadow"></i><i class="thought">${def.thought}</i>`;
    npc.style.left=route[idx][0]+'%';npc.style.top=route[idx][1]+'%';npc.style.setProperty('--walk-time',def.time+'s');world.appendChild(npc);
    const step=()=>{
      npc.classList.remove('resting');npc.classList.add('moving');idx=(idx+1)%route.length;
      const [x,y]=route[idx];const current=parseFloat(npc.style.left)||x;npc.style.left=x+'%';npc.style.top=y+'%';
      npc.querySelector('.npc-avatar').style.setProperty('--face', x<current ? -1 : 1);
      setTimeout(()=>{npc.classList.remove('moving');npc.classList.add('resting');setTimeout(step,1300+Math.random()*1800)},def.time*1000+80);
    };
    setTimeout(step,700+def.start*250);
  });

  // Status bubbles only when an action is actually available.
  const h=hubSave();
  const quest=document.querySelector('.quest-v3');
  const reward=document.querySelector('.reward-v3');
  const c=campaignSave();
  if(quest&&questDefs(c).some(q=>q.now>=q.target&&!c.claimedQuests[today()+q.id]))quest.classList.add('status-ready');
  if(reward&&h.login.lastClaim!==today())reward.classList.add('status-ready');

  // Empty-ground movement. Buildings retain their normal click behavior.
  world.addEventListener('pointerdown',ev=>{
    if(ev.target.closest('button,.world-building,.portal-v3'))return;
    const rect=world.getBoundingClientRect();
    const x=Math.max(8,Math.min(92,(ev.clientX-rect.left)/rect.width*100));
    const y=Math.max(18,Math.min(88,(ev.clientY-rect.top)/rect.height*100));
    const ripple=document.createElement('i');ripple.className='walk-ripple';ripple.style.left=x+'%';ripple.style.top=y+'%';world.appendChild(ripple);setTimeout(()=>ripple.remove(),700);
    player.classList.add('free-walk');player.style.left=x+'%';player.style.top=y+'%';
    setTimeout(()=>player.classList.remove('free-walk'),700);
    const hint=document.querySelector('#interactHint');if(hint){hint.textContent='แตะอาคารเพื่อเข้าใช้งาน';setTimeout(()=>hint.textContent='แตะพื้นที่เพื่อเดิน • แตะอาคารเพื่อใช้งาน',1400)}
  });

  // Gentle time-of-day tint based on local hour.
  const hr=new Date().getHours();
  hub.classList.remove('day-night','day-evening');
})();


// V7.2: Prevent iOS Safari long-press text selection/callout in game UI.
(() => {
  const stopNativeLongPress = (event) => {
    const target = event.target;
    if (target?.closest?.('.hub-screen, .battle-app, #game, .world-building, .portal-v3, .card')) {
      event.preventDefault();
    }
  };
  document.addEventListener('contextmenu', stopNativeLongPress, {passive:false});
  document.addEventListener('selectstart', stopNativeLongPress, {passive:false});
  document.addEventListener('dragstart', stopNativeLongPress, {passive:false});
})();


// V9.1 orientation switcher: native lock where supported, rotate-device fallback on iOS Safari.
(function setupOrientationSwitcher(){
  const btn=document.getElementById('orientationBtn');
  const prompt=document.getElementById('orientationPrompt');
  const title=document.getElementById('orientationPromptTitle');
  const text=document.getElementById('orientationPromptText');
  const close=document.getElementById('closeOrientationPrompt');
  if(!btn)return;
  const isLandscape=()=>window.matchMedia('(orientation: landscape)').matches;
  const update=()=>{
    btn.textContent=isLandscape()?'↕️':'↔️';
    btn.setAttribute('aria-label',isLandscape()?'เปลี่ยนเป็นแนวตั้ง':'เปลี่ยนเป็นแนวนอน');
    btn.title=isLandscape()?'เปลี่ยนเป็นแนวตั้ง':'เปลี่ยนเป็นแนวนอน';
  };
  const showPrompt=(target)=>{
    if(!prompt)return;
    title.textContent=target==='landscape-primary'?'โหมดแนวนอน':'โหมดแนวตั้ง';
    text.textContent=target==='landscape-primary'?'กรุณาปิดล็อกการหมุนหน้าจอ แล้วหมุนโทรศัพท์เป็นแนวนอน เกมจะจัด HUD สนาม และการ์ดใหม่อัตโนมัติ':'กรุณาหมุนโทรศัพท์กลับเป็นแนวตั้ง เกมจะกลับสู่เลย์เอาต์มือถือปกติอัตโนมัติ';
    prompt.classList.add('show');
  };
  btn.addEventListener('click',async()=>{
    const target=isLandscape()?'portrait-primary':'landscape-primary';
    try{
      const root=document.documentElement;
      if(!document.fullscreenElement && root.requestFullscreen) await root.requestFullscreen({navigationUI:'hide'});
      if(screen.orientation?.lock){
        await screen.orientation.lock(target);
        update();
      }else showPrompt(target);
    }catch(_){
      showPrompt(target);
    }
  });
  close?.addEventListener('click',()=>prompt.classList.remove('show'));
  prompt?.addEventListener('click',e=>{if(e.target===prompt)prompt.classList.remove('show')});
  window.addEventListener('orientationchange',()=>setTimeout(update,150));
  window.addEventListener('resize',update);
  update();
})();
