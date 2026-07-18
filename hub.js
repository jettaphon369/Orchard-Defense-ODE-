'use strict';
const SAVE_KEY='orchardCampaignV1', HUB_KEY='orchardHubV1';
const $h=s=>document.querySelector(s); const today=()=>new Date().toISOString().slice(0,10);
(function protectExistingSave(){try{const c=localStorage.getItem(SAVE_KEY),h=localStorage.getItem(HUB_KEY);if(c&&!localStorage.getItem('orchardCampaignRecoveryBackup'))localStorage.setItem('orchardCampaignRecoveryBackup',c);if(h&&!localStorage.getItem('orchardHubRecoveryBackup'))localStorage.setItem('orchardHubRecoveryBackup',h)}catch(_){}})();
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

const WORLD_TREE_HERO_DATA={
 elderowl:{icon:'🦉',name:'Elder Owl',rarity:'World Tree ⭐⭐⭐⭐⭐',role:'ซัพพอร์ต • วิสัยทัศน์',floor:10,skill:'Wisdom Aura',skillDesc:'เพิ่มระยะยิงและพลังโจมตีให้ผู้พิทักษ์รอบตัว',stats:{hp:'160',damage:'18',speed:'1.4 วินาที',range:'6 ช่อง'},upgrades:['Lv.2: ออร่าแรงขึ้น','Lv.3: เปิดเผยศัตรูพรางตัวทั้งสนาม'],lore:'นักปราชญ์ผู้เฝ้ากิ่งแรกของต้นไม้โลก'},
 spiritstag:{icon:'🦌',name:'Spirit Stag',rarity:'World Tree ⭐⭐⭐⭐⭐',role:'แทงก์ • ผลักศัตรู',floor:20,skill:'Sacred Charge',skillDesc:'พุ่งชนและผลักศัตรูทั้งแถวกลับไป',stats:{hp:'720',damage:'42',speed:'1.8 วินาที',range:'ประชิด'},upgrades:['Lv.2: เกราะเพิ่ม 30%','Lv.3: สร้างโล่ให้ Core'],lore:'กวางวิญญาณผู้เดินบนรากไม้ศักดิ์สิทธิ์'},
 crystalspider:{icon:'🕷️',name:'Crystal Spider',rarity:'World Tree ⭐⭐⭐⭐⭐',role:'ควบคุม • ใยแก้ว',floor:30,skill:'Crystal Web',skillDesc:'สร้างใยคริสตัลล็อกพื้นที่และลดความเร็วศัตรู',stats:{hp:'260',damage:'28',speed:'1.1 วินาที',range:'5 ช่อง'},upgrades:['Lv.2: ใยกว้างขึ้น','Lv.3: ศัตรูติดหยุดนิ่งช่วงสั้น'],lore:'ผู้ทอใยแห่งโพรงคริสตัลใต้ต้นไม้โลก'},
 emeraldlizard:{icon:'🦎',name:'Emerald Lizard',rarity:'World Tree ⭐⭐⭐⭐⭐⭐',role:'พิษ • ดาเมจต่อเนื่อง',floor:40,skill:'Toxic Mist',skillDesc:'ปล่อยหมอกพิษสร้างดาเมจต่อเนื่องทั้งพื้นที่',stats:{hp:'240',damage:'34',speed:'0.95 วินาที',range:'5 ช่อง'},upgrades:['Lv.2: พิษอยู่นานขึ้น','Lv.3: พิษแพร่ไปยังศัตรูข้างเคียง'],lore:'กิ้งก่ามรกตผู้ดูดซับพิษจากรากดำ'},
 stormeagle:{icon:'🦅',name:'Storm Eagle',rarity:'World Tree ⭐⭐⭐⭐⭐⭐',role:'อากาศ • สายฟ้า',floor:50,skill:'Thunder Dive',skillDesc:'โฉบลงมาปล่อยสายฟ้าโจมตีหลายเป้าหมาย',stats:{hp:'220',damage:'68',speed:'1.25 วินาที',range:'ทั้งแถว'},upgrades:['Lv.2: สายฟ้าชิ่งเพิ่ม 1 เป้าหมาย','Lv.3: โจมตีศัตรูบินแรงขึ้น'],lore:'อินทรีผู้พิทักษ์ยอดไม้เหนือชั้นเมฆ'},
 moonwolf:{icon:'🐺',name:'Moon Wolf',rarity:'World Tree ⭐⭐⭐⭐⭐⭐',role:'นักล่า • คริติคอล',floor:60,skill:'Lunar Hunt',skillDesc:'กระโจนใส่ศัตรูที่เลือดต่ำและสร้างคริติคอลสูง',stats:{hp:'330',damage:'95',speed:'0.7 วินาที',range:'3 ช่อง'},upgrades:['Lv.2: คริติคอลเพิ่ม','Lv.3: สังหารแล้วรีเซ็ตคูลดาวน์'],lore:'หมาป่าจันทราผู้ลาดตระเวนกิ่งยามค่ำคืน'},
 ironrhino:{icon:'🦏',name:'Iron Rhino',rarity:'World Tree ⭐⭐⭐⭐⭐⭐⭐',role:'ป้อมปราการ • แผ่นดินไหว',floor:70,skill:'Earth Quake',skillDesc:'กระแทกพื้นทำให้ศัตรูทั้งแถวชะงัก',stats:{hp:'1100',damage:'55',speed:'2.2 วินาที',range:'ประชิด'},upgrades:['Lv.2: ลดดาเมจที่ได้รับ','Lv.3: สะท้อนดาเมจบางส่วน'],lore:'แรดเหล็กโบราณผู้เป็นกำแพงของรากชั้นลึก'},
 skyserpent:{icon:'🐲',name:'Sky Serpent',rarity:'World Tree ⭐⭐⭐⭐⭐⭐⭐',role:'มังกร • สายฟ้าลูกโซ่',floor:80,skill:'Storm Breath',skillDesc:'พ่นลมหายใจสายฟ้าทะลุและชิ่งหลายเป้าหมาย',stats:{hp:'540',damage:'88',speed:'1.3 วินาที',range:'ทั้งแถว'},upgrades:['Lv.2: ชิ่งเพิ่ม 2 เป้าหมาย','Lv.3: ทำให้ศัตรูติดช็อต'],lore:'อสรพิษฟ้าผู้โอบล้อมเรือนยอดของยิกฟลอรา'},
 ancienttreant:{icon:'🗿',name:'Ancient Treant',rarity:'World Tree ⭐⭐⭐⭐⭐⭐⭐',role:'ผู้พิทักษ์ • อัญเชิญ',floor:90,skill:'Forest Dominion',skillDesc:'เรียกต้นกล้าผู้พิทักษ์และฟื้นฟูทีมรอบตัว',stats:{hp:'900',damage:'62',speed:'1.7 วินาที',range:'4 ช่อง'},upgrades:['Lv.2: เรียกต้นกล้าเพิ่ม','Lv.3: ฟื้น HP Core เป็นระยะ'],lore:'วิญญาณไม้โบราณที่ตื่นขึ้นเมื่อโลกตกอยู่ในอันตราย'},
 worldcore:{icon:'🌌',name:'World Core Guardian',rarity:'EX Mythic ⭐⭐⭐⭐⭐⭐⭐⭐',role:'ผู้พิทักษ์แกนโลก • ทั่วสนาม',floor:100,skill:'Genesis Bloom',skillDesc:'หยุดศัตรูทั้งสนาม ฟื้น Core และปล่อยคลื่นพลังมหาศาล',stats:{hp:'1400',damage:'150',speed:'1.5 วินาที',range:'ทั่วสนาม'},upgrades:['Lv.2: บัฟ ATK ทั้งทีม','Lv.3: เปิดประตูเรียกผู้พิทักษ์โบราณ'],lore:'ผู้พิทักษ์เพียงหนึ่งเดียวที่ถือกำเนิดจากหัวใจต้นไม้โลก'}
};
let heroHallTab='normal';
let shopTab='heroes';
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
 const c=campaignSave(),h=hubSave(),star=Object.values(c.stars).reduce((a,b)=>a+Number(b||0),0);
 // Do not write normalized defaults during page load. This prevents an incomplete/old save
 // from being overwritten before the player performs an actual save-producing action.
 const goldText=$h('#goldText'),gemText=$h('#gemText'),levelText=$h('#levelText');
 if(goldText)goldText.textContent=Number(c.gold||0);
 if(gemText)gemText.textContent=Number(h.gems||0);
 if(levelText)levelText.textContent=`Lv.${Math.max(1,1+Math.floor(star/2))}`;
 const ready=questDefs(c).filter(q=>q.now>=q.target&&!c.claimedQuests[today()+q.id]).length;
 const dailyReady=h.login.lastClaim!==today();
 const questBadge=$h('#questBadge'),shopBadge=$h('#shopBadge');
 if(questBadge)questBadge.textContent=ready?`รับได้ ${ready}`:'ไม่มีรางวัลค้าง';
 if(shopBadge)shopBadge.textContent='ฮีโร่พิเศษ';
 document.querySelector('.quest-v3')?.classList.toggle('status-ready',ready>0);
 document.querySelector('.reward-v3')?.classList.toggle('status-ready',dailyReady);
 document.querySelector('[data-place="quest"]')?.classList.toggle('status-ready',ready>0);
 document.querySelector('[data-place="reward"]')?.classList.toggle('status-ready',dailyReady);
}
function heroTabsHTML(){return `<div class="hero-tabs"><button data-hero-tab="normal" class="${heroHallTab==='normal'?'active':''}">🌿 ฮีโร่หลัก</button><button data-hero-tab="tree" class="${heroHallTab==='tree'?'active':''}">🌳 ต้นไม้โลก</button><button data-hero-tab="collection" class="${heroHallTab==='collection'?'active':''}">📖 คอลเลกชัน</button></div>`}
function heroListHTML(){
 const c=campaignSave();
 let body='';
 if(heroHallTab==='normal'){
  body=`<div class="hero-list hero-list-v14">${Object.entries(HERO_DATA).map(([id,h])=>{const owned=c.ownedHeroes.includes(id);return `<button class="hero-card hero-card-v14 ${owned?'owned':'hero-locked'}" data-hero="${id}" data-hero-source="normal"><span class="hero-card-icon">${h.icon}</span><b>${h.name}</b><em>${h.rarity.split(' ')[0]}</em><small>${owned?'ครอบครอง':'🔒 ยังไม่ปลดล็อก'}</small></button>`}).join('')}</div>`;
 }else if(heroHallTab==='tree'){
  const wt=worldTreeSave();body=`<div class="tree-hero-banner"><span>🌳</span><div><b>ผู้พิทักษ์ต้นไม้โลก</b><p>ฮีโร่กิจกรรมแยกจากฮีโร่หลัก • ไม่มีขายในร้านค้า</p><small>ครอบครอง ${wt.ownedTreeHeroes.length}/10 ตัว • ปลดล็อกทุก 10 ชั้น</small></div></div><div class="hero-list hero-list-v14 tree-hero-list">${Object.entries(WORLD_TREE_HERO_DATA).map(([id,h])=>{const own=wt.ownedTreeHeroes.includes(id);return `<button class="hero-card hero-card-v14 tree-exclusive ${own?'owned':'hero-locked'}" data-hero="${id}" data-hero-source="tree"><span class="floor-badge">ชั้น ${h.floor}</span><span class="hero-card-icon">${h.icon}</span><b>${h.name}</b><em>EXCLUSIVE</em><small>${own?'✅ ครอบครองแล้ว':`🔒 รางวัลชั้น ${h.floor}`}</small></button>`}).join('')}</div>`;
 }else{
  const owned=c.ownedHeroes.length,total=Object.keys(HERO_DATA).length;
  body=`<div class="collection-summary"><div><span>🧙</span><b>${owned}/${total}</b><small>ฮีโร่หลัก</small></div><div><span>🌳</span><b>0/10</b><small>ต้นไม้โลก</small></div><div><span>⭐</span><b>${Object.values(c.stars).reduce((a,b)=>a+b,0)}</b><small>ดาวด่าน</small></div></div><div class="collection-note"><h3>📖 สมุดสะสมผู้พิทักษ์</h3><p>ฮีโร่หลักได้จากด่านและร้านค้า ส่วนฮีโร่ต้นไม้โลกเป็นคอลเลกชันพิเศษแยกต่างหาก และจะไม่ถูกนำไปขายในร้านค้าปกติ</p></div>`;
 }
 return `${modalWalletHTML('ศาลาฮีโร่')}<div class="hero-hall-head hero-hall-v14"><div><h2>🧙 ศาลาฮีโร่</h2><p>จัดการคอลเลกชัน ดูสกิล และเข้าสนามทดลอง</p></div><button class="sandbox-hall-btn" data-action="sandbox"><span>🧪</span><div><b>สนามทดลองฮีโร่</b><small>ทดลองฮีโร่ครบ 20 ตัวแบบไม่จำกัด</small></div></button></div>${heroTabsHTML()}${body}`
}
function heroDetailHTML(id,source='normal'){
 const tree=source==='tree',h=(tree?WORLD_TREE_HERO_DATA:HERO_DATA)[id];
 if(!h)return heroListHTML();
 const owned=!tree&&campaignSave().ownedHeroes.includes(id);
 return `<button class="hero-back" data-action="heroes-back">← กลับศาลาฮีโร่</button><div class="hero-detail hero-detail-v14 ${tree?'tree-detail':''}"><div class="hero-detail-head"><div class="hero-big">${h.icon}</div><div><h2>${h.name}</h2><div class="hero-rarity">${h.rarity}</div><p>${h.role}</p><b>${tree?`🌳 รางวัลเฉพาะชั้น ${h.floor}`:(owned?'✅ ครอบครองแล้ว':'🔒 ยังไม่ปลดล็อก')}</b></div></div><div class="hero-section"><h3>✨ ${h.skill}</h3><p>${h.skillDesc}</p></div><div class="hero-stats">${Object.entries(h.stats).map(([k,v])=>`<div><small>${k}</small><b>${v}</b></div>`).join('')}</div><div class="hero-section"><h3>ผลการอัปเกรด</h3><ul>${h.upgrades.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="hero-lore">“${h.lore}”</div>${tree?'<div class="tree-exclusive-note">ฮีโร่นี้ไม่รวมกับฮีโร่หลัก ไม่มีขายในร้านค้า และรับได้จากต้นไม้โลกเท่านั้น</div>':''}</div>`
}
const positions={castle:[50,14],shop:[22,35],heroes:[78,35],forge:[20,61],quest:[80,61],home:[25,79],reward:[75,79],adventure:[50,91]};let moving=false;
function movePlayer(place,after){const p=$h('#player'),pos=positions[place]||[48,63];moving=true;p.classList.add('walking');p.style.left=pos[0]+'%';p.style.top=pos[1]+'%';setTimeout(()=>{p.classList.remove('walking');moving=false;after&&after()},520)}
function openFeature(place){if(place==='adventure'){movePlayer(place,()=>{$h('#map').classList.add('show');renderMap()});return}movePlayer(place,()=>{const m=$h('#buildingModal'),content=$h('#featureContent');updateFeatureHeader(place);content.innerHTML=featureHTML(place);content.scrollTop=0;m.classList.add('show');document.body.classList.add('feature-modal-open');bindFeature(place);requestAnimationFrame(()=>{content.scrollTop=0})})}
function modalWalletHTML(label='ยอดคงเหลือ'){const c=campaignSave(),h=hubSave();return `<div class="feature-wallet"><span class="feature-wallet-label">${label}</span><strong>🪙 <b>${c.gold.toLocaleString()}</b> Gold</strong><strong>💎 <b>${h.gems.toLocaleString()}</b> Gem</strong></div>`}
function updateFeatureHeader(place){const bar=$h('#featureHeaderBar');if(!bar)return;const c=campaignSave(),h=hubSave();const walletPlaces=['shop','forge','heroes'];if(!walletPlaces.includes(place)){bar.innerHTML='';bar.classList.remove('show');return}const label=place==='shop'?'กระเป๋าร้านค้า':place==='forge'?'ทรัพยากรตีเหล็ก':'ทรัพยากรของคุณ';bar.innerHTML=`<span class="feature-header-label">${label}</span><span class="feature-header-gold">🪙 <b>${c.gold.toLocaleString()}</b></span><span class="feature-header-gem">💎 <b>${h.gems.toLocaleString()}</b></span>`;bar.classList.add('show')}
function shopHeroCard(id,price,c){
 const x=HERO_DATA[id],owned=c.ownedHeroes.includes(id);
 return `<article class="shop-v15-card ${owned?'owned':''}">
  <button class="shop-v15-preview" data-shop-hero="${id}" aria-label="ดูรายละเอียด ${x.name}">
   <div class="shop-v15-portrait"><span>${x.icon}</span><i>${owned?'OWNED':'NEW'}</i></div>
  </button>
  <div class="shop-v15-info"><div class="shop-v15-title"><div><b>${x.name}</b><small>${x.rarity}</small></div><strong>💎 ${price}</strong></div>
  <p>${x.role}</p><div class="shop-v15-skill"><b>✨ ${x.skill}</b><span>${x.skillDesc}</span></div>
  <div class="shop-v15-actions"><button class="shop-detail-btn" data-shop-hero="${id}">รายละเอียด</button><button class="buy-button" data-hero-buy="${id}" ${owned?'disabled':''}>${owned?'ครอบครองแล้ว ✓':'ซื้อฮีโร่'}</button></div></div>
 </article>`
}
function shopHTML(){
 const c=campaignSave(),h=hubSave();
 const ownedShop=Object.keys(SHOP_HEROES).filter(id=>c.ownedHeroes.includes(id)).length;
 const tabs=`<div class="shop-v15-tabs"><button class="${shopTab==='heroes'?'active':''}" data-shop-tab="heroes">🧙 ฮีโร่ <small>${ownedShop}/${Object.keys(SHOP_HEROES).length}</small></button><button class="${shopTab==='boosts'?'active':''}" data-shop-tab="boosts">⚡ บูสต์</button><button class="${shopTab==='owned'?'active':''}" data-shop-tab="owned">✅ ของที่มี</button></div>`;
 let content='';
 if(shopTab==='heroes'){
  content=`<div class="shop-v15-grid">${Object.entries(SHOP_HEROES).map(([id,price])=>shopHeroCard(id,price,c)).join('')}</div>`;
 }else if(shopTab==='boosts'){
  content=`<div class="shop-v15-grid boosts"><article class="shop-v15-card boost-card ${h.energyBonus>=10?'owned':''}"><div class="shop-v15-boost-icon">☀️</div><div class="shop-v15-info"><div class="shop-v15-title"><div><b>พลังงานเริ่มต้น +10</b><small>บูสต์ถาวร</small></div><strong>🪙 100</strong></div><p>เริ่มทุกด่านด้วยพลังงานเพิ่ม 10 หน่วย ช่วยวางฮีโร่ตัวแรกได้เร็วขึ้น</p><div class="shop-v15-skill"><b>ผลที่ได้รับ</b><span>มีผลทุกด่านและไม่หมดอายุ</span></div><div class="shop-v15-actions"><button class="buy-button" data-buy="energy" ${h.energyBonus>=10?'disabled':''}>${h.energyBonus>=10?'ซื้อแล้ว ✓':'ซื้อบูสต์'}</button></div></div></article></div>`;
 }else{
  const ownedCards=Object.entries(SHOP_HEROES).filter(([id])=>c.ownedHeroes.includes(id)).map(([id,price])=>shopHeroCard(id,price,c)).join('');
  const energy=h.energyBonus>=10?`<article class="owned-mini"><span>☀️</span><div><b>พลังงานเริ่มต้น +10</b><small>บูสต์ถาวร • กำลังใช้งาน</small></div></article>`:'';
  content=(ownedCards||energy)?`<div class="shop-v15-owned-summary"><b>คอลเลกชันจากร้านค้า</b><small>${ownedShop} ฮีโร่ • ${h.energyBonus>=10?1:0} บูสต์</small></div>${energy}<div class="shop-v15-grid">${ownedCards}</div>`:`<div class="shop-v15-empty"><span>🛍️</span><b>ยังไม่มีสินค้าจากร้านค้า</b><p>ซื้อฮีโร่หรือบูสต์แล้วจะมาแสดงที่นี่</p></div>`;
 }
 return `<div class="shop-v15-header"><div><h2>🛒 ตลาดเมฆทอง</h2><p>ฮีโร่ในร้านค้าใช้ Gem • บูสต์ถาวรใช้ Gold</p></div><span class="shop-v15-badge">สินค้าไม่รวมฮีโร่ต้นไม้โลก</span></div>${tabs}<div class="shop-v15-content">${content}</div>`
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
 return `<h2>⚒️ โรงตีเหล็กแห่งผู้พิทักษ์</h2><p>ใช้ Gold ตีอุปกรณ์ถาวร • Gem เก็บไว้ซื้อฮีโร่พิเศษ</p><div class="forge-summary"><span>⚔️ ดาเมจ +${u.blade*4}%</span><span>🛡️ Core +${u.shield*8}%</span><span>⚙️ คูลดาวน์ -${u.gear*3}%</span></div><div class="forge-grid">${defs.map(x=>{const lv=u[x.id],cost=x.base+lv*x.step,maxed=lv>=x.max;return `<article class="forge-card ${maxed?'maxed':''}"><div class="forge-icon">${x.icon}</div><div class="forge-info"><b>${x.name}</b><small>Lv.${lv}/${x.max} • ${x.value}</small><p>${x.desc}</p><div class="forge-level">${Array.from({length:x.max},(_,i)=>`<i class="${i<lv?'on':''}"></i>`).join('')}</div></div><button class="forge-buy" data-forge-buy="${x.id}" data-cost="${cost}" ${maxed?'disabled':''}>${maxed?'MAX':`🪙 ${cost}`}</button></article>`}).join('')}</div><div class="forge-note">โรงตีเหล็กเป็นระบบพัฒนาระยะยาว: ยิ่งเล่นและสะสม Gold มาก ทีมทุกชุดก็แข็งแกร่งขึ้นโดยไม่ผูกกับฮีโร่ตัวเดียว</div>`
}

const WORLD_TREE_KEY='orchardWorldTreeV1';
const WORLD_TREE_BOSSES=['','Stone Golem','Ice Dragon','Crystal Spider Queen','Poison Hydra','Forest Titan','Dark Phoenix','Ancient Treant','Crystal Leviathan','Shadow King','World Core Guardian'];
const WORLD_TREE_HERO_ORDER=['elderowl','spiritstag','crystalspider','emeraldlizard','stormeagle','moonwolf','ironrhino','skyserpent','ancienttreant','worldcore'];
let selectedTreeFloor=1, treeFloorFilter='all', treeTeamDraft=[], campaignTeamDraft=[], selectedCampaignStage=1;
function worldTreeSave(){let s;try{s=JSON.parse(localStorage.getItem(WORLD_TREE_KEY))||{}}catch{s={}};s.highest=Math.max(1,Math.min(100,Number(s.highest||1)));s.cleared=Array.isArray(s.cleared)?s.cleared:[];s.claimed=Array.isArray(s.claimed)?s.claimed:[];s.ownedTreeHeroes=Array.isArray(s.ownedTreeHeroes)?s.ownedTreeHeroes:[];s.team=Array.isArray(s.team)?s.team:[];return s}
function putWorldTree(s){localStorage.setItem(WORLD_TREE_KEY,JSON.stringify(s))}
function treeFloorData(n){const boss=n%10===0,tier=Math.ceil(n/10),gold=35+n*7,gems=n%5===0?Math.max(1,Math.floor(n/10)+1):0,hero=boss?WORLD_TREE_HERO_ORDER[tier-1]:'';return{n,boss,tier,gold,gems,hero,bossName:boss?WORLD_TREE_BOSSES[tier]:'',power:120+n*24,waves:5+tier}}
function heroPower(id){const h=HERO_DATA[id];if(!h)return 0;const hp=Number(String(h.stats.hp||0).replace(/[^0-9.]/g,''))||0;const dmgNums=String(h.stats.damage||0).match(/[0-9.]+/g)||[];let dmg=dmgNums.reduce((a,b)=>a+Number(b),0);if(String(h.stats.damage).includes('×')&&dmgNums.length>1)dmg=Number(dmgNums[0])*Number(dmgNums[1]);const stars=(h.rarity.match(/⭐/g)||[]).length||1;const support=/ซัพพอร์ต|พลังงาน|ควบคุม|แทงก์|ป้องกัน/.test(h.role)?14:0;return Math.max(20,Math.round(hp/20+dmg*.9+stars*12+support))}
function validTreeTeam(team){const owned=campaignSave().ownedHeroes||['peachy'];return (Array.isArray(team)?team:[]).filter((id,i,a)=>owned.includes(id)&&HERO_DATA[id]&&a.indexOf(id)===i).slice(0,6)}
function currentTreeTeam(){const s=worldTreeSave();let team=validTreeTeam(s.team);if(!team.length)team=validTreeTeam(campaignSave().ownedHeroes).slice(0,6);return team}
function treeTeamPower(team=currentTreeTeam()){return validTreeTeam(team).reduce((sum,id)=>sum+heroPower(id),0)}
function treePowerStatus(teamPower,recommended){const ratio=teamPower/Math.max(1,recommended);if(ratio>=1.18)return{label:'เหนือกว่ามาก',cls:'strong',icon:'💪'};if(ratio>=.95)return{label:'เหมาะสม',cls:'ready',icon:'✅'};if(ratio>=.75)return{label:'ใกล้เคียง',cls:'close',icon:'⚠️'};return{label:'พลังต่ำ',cls:'weak',icon:'🔻'}}
function worldTreeTeamHTML(floor){const d=treeFloorData(floor),c=campaignSave(),owned=(c.ownedHeroes||['peachy']).filter(id=>HERO_DATA[id]);treeTeamDraft=validTreeTeam(treeTeamDraft.length?treeTeamDraft:currentTreeTeam());const power=treeTeamPower(treeTeamDraft),status=treePowerStatus(power,d.power);const slots=Array.from({length:6},(_,i)=>{const id=treeTeamDraft[i],h=id?HERO_DATA[id]:null;return `<div class="tree-team-slot ${h?'filled':''}"><span>${h?h.icon:'＋'}</span><small>${h?h.name:`ช่อง ${i+1}`}</small></div>`}).join('');const cards=owned.map(id=>{const h=HERO_DATA[id],selected=treeTeamDraft.includes(id);return `<button class="tree-team-hero ${selected?'selected':''}" data-tree-team-hero="${id}"><span>${h.icon}</span><b>${h.name}</b><small>พลัง ${heroPower(id)}</small><em>${selected?'✓ ในทีม':'แตะเพื่อเลือก'}</em></button>`}).join('');return `<div class="tree-team-screen"><button class="tree-team-back" data-tree-team-back>← กลับหน้าชั้น</button><section class="tree-team-head"><div><small>🌳 ต้นไม้โลก</small><h2>จัดทีมก่อนเข้าชั้น ${floor}</h2><p>เลือกฮีโร่สูงสุด 6 ตัว แล้วเปรียบเทียบพลังรวมกับพลังแนะนำ</p></div><div class="tree-team-comparison ${status.cls}"><div><small>พลังทีม</small><strong>⚔ ${power}</strong></div><i>VS</i><div><small>พลังแนะนำ</small><strong>⚔ ${d.power}</strong></div><b>${status.icon} ${status.label}</b></div></section><section class="tree-team-slots">${slots}</section><div class="tree-team-count">เลือกแล้ว <b>${treeTeamDraft.length}/6</b> ตัว</div><section class="tree-team-roster">${cards||'<p>ยังไม่มีฮีโร่ที่ใช้ได้</p>'}</section><div class="tree-team-actions"><button data-tree-team-auto>✨ จัดทีมอัตโนมัติ</button><button class="tree-team-confirm" data-tree-team-confirm="${floor}" ${treeTeamDraft.length?'':'disabled'}>⚔ ยืนยันและเข้าด่าน</button></div></div>`}

const CAMPAIGN_TEAM_KEY='orchardCampaignTeam';
function validCampaignTeam(team){const owned=campaignSave().ownedHeroes||['peachy'];return (Array.isArray(team)?team:[]).filter((id,i,a)=>owned.includes(id)&&HERO_DATA[id]&&a.indexOf(id)===i).slice(0,6)}
function currentCampaignTeam(){let team=[];try{team=JSON.parse(localStorage.getItem(CAMPAIGN_TEAM_KEY)||'[]')}catch(_){team=[]}team=validCampaignTeam(team);if(!team.length)team=validCampaignTeam(campaignSave().ownedHeroes).slice(0,6);return team}
function campaignTeamPower(team=currentCampaignTeam()){return validCampaignTeam(team).reduce((sum,id)=>sum+heroPower(id),0)}
function campaignStagePower(stage){return 85+Math.max(1,Number(stage))*72}
function campaignTeamHTML(stage){const meta=STAGE_META[stage]||STAGE_META[1],owned=(campaignSave().ownedHeroes||['peachy']).filter(id=>HERO_DATA[id]);campaignTeamDraft=validCampaignTeam(campaignTeamDraft.length?campaignTeamDraft:currentCampaignTeam());const recommended=campaignStagePower(stage),power=campaignTeamPower(campaignTeamDraft),status=treePowerStatus(power,recommended);const slots=Array.from({length:6},(_,i)=>{const id=campaignTeamDraft[i],h=id?HERO_DATA[id]:null;return `<div class="tree-team-slot ${h?'filled':''}"><span>${h?h.icon:'＋'}</span><small>${h?h.name:`ช่อง ${i+1}`}</small></div>`}).join('');const cards=owned.map(id=>{const h=HERO_DATA[id],selected=campaignTeamDraft.includes(id);return `<button class="tree-team-hero ${selected?'selected':''}" data-campaign-team-hero="${id}"><span>${h.icon}</span><b>${h.name}</b><small>พลัง ${heroPower(id)}</small><em>${selected?'✓ ในทีม':'แตะเพื่อเลือก'}</em></button>`}).join('');return `<div class="tree-team-screen campaign-team-screen"><button class="tree-team-back" data-campaign-team-back>← กลับแผนที่</button><section class="tree-team-head"><div><small>${meta.icon} แผนที่เกาะลอยฟ้า</small><h2>จัดทีมก่อนเข้าด่าน ${stage}</h2><p>${meta.name} • ${meta.waves} เวฟ • เลือกฮีโร่สูงสุด 6 ตัว</p></div><div class="tree-team-comparison ${status.cls}"><div><small>พลังทีม</small><strong>⚔ ${power}</strong></div><i>VS</i><div><small>พลังแนะนำ</small><strong>⚔ ${recommended}</strong></div><b>${status.icon} ${status.label}</b></div></section><section class="tree-team-slots">${slots}</section><div class="tree-team-count">เลือกแล้ว <b>${campaignTeamDraft.length}/6</b> ตัว</div><section class="tree-team-roster">${cards||'<p>ยังไม่มีฮีโร่ที่ใช้ได้</p>'}</section><div class="tree-team-actions"><button data-campaign-team-auto>✨ จัดทีมอัตโนมัติ</button><button class="tree-team-confirm" data-campaign-team-confirm="${stage}" ${campaignTeamDraft.length?'':'disabled'}>⚔ ยืนยันและเข้าด่าน</button></div></div>`}
function showCampaignTeam(stage){selectedCampaignStage=Math.max(1,Math.min(10,Number(stage)||1));campaignTeamDraft=currentCampaignTeam();const modal=$h('#buildingModal'),content=$h('#featureContent');if(!modal||!content)return;content.innerHTML=campaignTeamHTML(selectedCampaignStage);modal.classList.add('show');document.body.classList.add('feature-modal-open');bindCampaignTeam()}
function bindCampaignTeam(){document.querySelectorAll('[data-campaign-team-hero]').forEach(b=>b.onclick=()=>{const id=b.dataset.campaignTeamHero;if(campaignTeamDraft.includes(id))campaignTeamDraft=campaignTeamDraft.filter(x=>x!==id);else if(campaignTeamDraft.length<6)campaignTeamDraft.push(id);else{alert('เลือกฮีโร่ได้สูงสุด 6 ตัว');return}$h('#featureContent').innerHTML=campaignTeamHTML(selectedCampaignStage);bindCampaignTeam()});document.querySelectorAll('[data-campaign-team-auto]').forEach(b=>b.onclick=()=>{const owned=(campaignSave().ownedHeroes||['peachy']).filter(id=>HERO_DATA[id]);campaignTeamDraft=[...owned].sort((a,b)=>heroPower(b)-heroPower(a)).slice(0,6);$h('#featureContent').innerHTML=campaignTeamHTML(selectedCampaignStage);bindCampaignTeam()});document.querySelectorAll('[data-campaign-team-back]').forEach(b=>b.onclick=()=>{$h('#buildingModal').classList.remove('show');document.body.classList.remove('feature-modal-open');$h('#map').classList.add('show')});document.querySelectorAll('[data-campaign-team-confirm]').forEach(b=>b.onclick=()=>{const stage=Number(b.dataset.campaignTeamConfirm),team=validCampaignTeam(campaignTeamDraft);if(!team.length){alert('กรุณาเลือกฮีโร่อย่างน้อย 1 ตัว');return}localStorage.setItem(CAMPAIGN_TEAM_KEY,JSON.stringify(team));localStorage.removeItem('orchardSandboxMode');localStorage.removeItem('orchardBattleMode');localStorage.removeItem('orchardWorldTreeFloor');rememberHubScreenBeforeBattle();localStorage.setItem('orchardCurrentStage',String(stage));location.reload()})}
function worldTreeHTML(){const s=worldTreeSave();selectedTreeFloor=Math.max(1,Math.min(s.highest,selectedTreeFloor||s.highest));const d=treeFloorData(selectedTreeFloor);const floorButtons=Array.from({length:100},(_,i)=>i+1).filter(n=>treeFloorFilter==='all'||(treeFloorFilter==='boss'?n%10===0:Math.ceil(n/25)===Number(treeFloorFilter))).map(n=>{const x=treeFloorData(n),cleared=s.cleared.includes(n),locked=n>s.highest;return `<button class="world-floor ${x.boss?'boss':''} ${cleared?'cleared':''} ${locked?'locked':''} ${n===selectedTreeFloor?'current':''}" data-tree-floor="${n}" ${locked?'disabled':''}>${x.boss?'<i class="floor-crown">👑</i>':''}<b>${n}</b><small>${cleared?'ผ่านแล้ว':x.boss?'BOSS':locked?'ล็อก':'ท้าทาย'}</small></button>`}).join('');const hero=d.hero?WORLD_TREE_HERO_DATA[d.hero]:null;return `<div class="world-tree-shell"><section class="world-tree-head"><div class="world-tree-emblem">🌳</div><div><h2>ต้นไม้โลก 100 ชั้น</h2><p>พิชิตทีละชั้น • บอสและฮีโร่พิเศษทุก 10 ชั้น</p><small>ฮีโร่กิจกรรมแยกจากฮีโร่หลักและไม่มีขายในร้านค้า</small></div></section><section class="tree-progress-card"><div><small>ความคืบหน้าสูงสุด</small><strong>ชั้น ${s.highest}/100</strong></div><b>${s.cleared.length}%</b><div class="tree-progress-track"><i style="width:${s.cleared.length}%"></i></div></section><section class="tree-selected ${d.boss?'boss-floor':''}"><h3>${d.boss?'👑 ชั้นบอส':'🌿 ชั้น'} ${d.n}${d.boss?` • ${d.bossName}`:''}</h3><div class="tree-selected-meta"><div><small>พลังแนะนำ</small><b>⚔ ${d.power}</b></div><div><small>พลังทีมปัจจุบัน</small><b>🛡 ${treeTeamPower()}</b></div><div><small>จำนวนเวฟ</small><b>🌊 ${d.waves}</b></div><div><small>สถานะ</small><b>${s.cleared.includes(d.n)?'✅ ผ่านแล้ว':d.n===s.highest?'🔥 พร้อม':'🔒 ล็อก'}</b></div></div><div class="tree-reward-line">🎁 รางวัล: 🪙 ${d.gold} Gold ${d.gems?`• 💎 ${d.gems} Gem`:''}${hero?` • 🌳 ${hero.name}`:''}</div><button class="tree-start" data-tree-start="${d.n}" ${d.n>s.highest?'disabled':''}>${s.cleared.includes(d.n)?'↻ เล่นชั้นนี้อีกครั้ง':'⚔ เริ่มท้าทายชั้น '+d.n}</button></section><div class="tree-filter-row"><button data-tree-filter="all" class="${treeFloorFilter==='all'?'active':''}">ทั้งหมด</button><button data-tree-filter="boss" class="${treeFloorFilter==='boss'?'active':''}">👑 ชั้นบอส</button><button data-tree-filter="1" class="${treeFloorFilter==='1'?'active':''}">1–25</button><button data-tree-filter="2" class="${treeFloorFilter==='2'?'active':''}">26–50</button><button data-tree-filter="3" class="${treeFloorFilter==='3'?'active':''}">51–75</button><button data-tree-filter="4" class="${treeFloorFilter==='4'?'active':''}">76–100</button></div><div class="world-floor-grid">${floorButtons}</div><div class="tree-legend">สีเขียว = ผ่านแล้ว • สีทอง = ชั้นปัจจุบัน • สีแดง = ชั้นบอส</div></div>`}
function featureHTML(place){const c=campaignSave(),h=hubSave();const defs={castle:`<h2>🏰 ปราสาทแห่งสวน</h2><div class="feature-grid"><div><b>แคมเปญ</b><small>ปลดล็อก ${c.unlocked}/10 ด่าน</small></div><div><b>ฮีโร่</b><small>${c.ownedHeroes.length}/20 ตัว</small></div></div><button class="primary feature-action" data-action="map">เปิดแผนที่บท</button>`,shop:shopHTML(),heroes:heroListHTML(),forge:forgeHTML(),quest:questHTML(),reward:rewardHTML(),home:`<h2>🏡 บ้านผู้เล่น</h2><div class="feature-grid"><div><b>Gold</b><small>${c.gold}</small></div><div><b>Gem</b><small>${h.gems}</small></div><div><b>ด่าน</b><small>${c.unlocked}/10</small></div><div><b>ฮีโร่</b><small>${c.ownedHeroes.length}/20</small></div></div><button class="feature-action" data-action="reset">รีเซ็ตข้อมูลทดสอบ</button>`,tree:worldTreeHTML()};return defs[place]||'<h2>กำลังพัฒนา</h2>'}
function bindFeature(place){updateFeatureHeader(place);document.querySelectorAll('[data-tree-floor]').forEach(b=>b.onclick=()=>{selectedTreeFloor=Number(b.dataset.treeFloor);$h('#featureContent').innerHTML=worldTreeHTML();bindFeature('tree')});document.querySelectorAll('[data-tree-filter]').forEach(b=>b.onclick=()=>{treeFloorFilter=b.dataset.treeFilter;$h('#featureContent').innerHTML=worldTreeHTML();bindFeature('tree')});document.querySelectorAll('[data-tree-start]').forEach(b=>b.onclick=()=>{const floor=Number(b.dataset.treeStart);treeTeamDraft=currentTreeTeam();$h('#featureContent').innerHTML=worldTreeTeamHTML(floor);bindFeature('tree-team')});document.querySelectorAll('[data-tree-team-hero]').forEach(b=>b.onclick=()=>{const id=b.dataset.treeTeamHero;if(treeTeamDraft.includes(id))treeTeamDraft=treeTeamDraft.filter(x=>x!==id);else if(treeTeamDraft.length<6)treeTeamDraft.push(id);else{alert('เลือกฮีโร่ได้สูงสุด 6 ตัว');return}$h('#featureContent').innerHTML=worldTreeTeamHTML(selectedTreeFloor);bindFeature('tree-team')});document.querySelectorAll('[data-tree-team-auto]').forEach(b=>b.onclick=()=>{const owned=(campaignSave().ownedHeroes||['peachy']).filter(id=>HERO_DATA[id]);treeTeamDraft=[...owned].sort((a,b)=>heroPower(b)-heroPower(a)).slice(0,6);$h('#featureContent').innerHTML=worldTreeTeamHTML(selectedTreeFloor);bindFeature('tree-team')});document.querySelectorAll('[data-tree-team-back]').forEach(b=>b.onclick=()=>{$h('#featureContent').innerHTML=worldTreeHTML();bindFeature('tree')});document.querySelectorAll('[data-tree-team-confirm]').forEach(b=>b.onclick=()=>{const floor=Number(b.dataset.treeTeamConfirm);const team=validTreeTeam(treeTeamDraft);if(!team.length){alert('กรุณาเลือกฮีโร่อย่างน้อย 1 ตัว');return}const ws=worldTreeSave();ws.team=team;putWorldTree(ws);localStorage.setItem('orchardWorldTreeTeam',JSON.stringify(team));localStorage.removeItem('orchardSandboxMode');localStorage.setItem('orchardBattleMode','worldTree');localStorage.setItem('orchardWorldTreeFloor',String(floor));rememberHubScreenBeforeBattle();localStorage.setItem('orchardCurrentStage',String(((floor-1)%10)+1));location.reload()});document.querySelectorAll('[data-shop-tab]').forEach(b=>b.onclick=()=>{shopTab=b.dataset.shopTab;$h('#featureContent').innerHTML=shopHTML();bindFeature('shop')});document.querySelectorAll('[data-shop-hero]').forEach(b=>b.onclick=()=>{$h('#featureContent').innerHTML=heroDetailHTML(b.dataset.shopHero,'normal').replace('data-action="heroes-back"','data-action="shop-back"').replace('กลับศาลาฮีโร่','กลับร้านค้า');bindFeature('shop')});document.querySelectorAll('[data-hero]').forEach(b=>b.onclick=()=>{$h('#featureContent').innerHTML=heroDetailHTML(b.dataset.hero,b.dataset.heroSource||'normal');bindFeature('heroes')});document.querySelectorAll('[data-hero-tab]').forEach(b=>b.onclick=()=>{heroHallTab=b.dataset.heroTab;$h('#featureContent').innerHTML=heroListHTML();bindFeature('heroes')});document.querySelectorAll('[data-action]').forEach(b=>b.onclick=()=>{const a=b.dataset.action,c=campaignSave(),h=hubSave();if(a==='sandbox'){startSandbox()}else if(a==='heroes-back'){$h('#featureContent').innerHTML=heroListHTML();bindFeature('heroes')}else if(a==='shop-back'){$h('#featureContent').innerHTML=shopHTML();bindFeature('shop')}else if(a==='map'){$h('#buildingModal').classList.remove('show');$h('#map').classList.add('show');renderMap()}else if(a==='daily'&&h.login.lastClaim!==today()){const r=loginRewards()[h.login.day%7];c.gold+=r.gold;h.gems+=r.gems;h.login.lastClaim=today();h.login.day=(h.login.day+1)%7;saveCampaign(c);putHub(h);$h('#featureContent').innerHTML=rewardHTML();bindFeature('reward')}else if(a==='reset'&&confirm('รีเซ็ตความคืบหน้าทั้งหมดหรือไม่?')){localStorage.removeItem(SAVE_KEY);localStorage.removeItem(HUB_KEY);location.reload()}});document.querySelectorAll('[data-quest]').forEach(b=>b.onclick=()=>{const c=campaignSave(),h=hubSave(),q=questDefs(c).find(x=>x.id===b.dataset.quest),key=today()+q.id;if(q&&q.now>=q.target&&!c.claimedQuests[key]){c.claimedQuests[key]=true;c.gold+=q.gold;h.gems+=q.gems;saveCampaign(c);putHub(h);$h('#featureContent').innerHTML=questHTML();bindFeature('quest')}});document.querySelectorAll('[data-buy]').forEach(b=>b.onclick=()=>{const c=campaignSave(),h=hubSave();if(b.dataset.buy==='energy'&&h.energyBonus<10&&c.gold>=100){c.gold-=100;h.energyBonus=10;saveCampaign(c);putHub(h);$h('#featureContent').innerHTML=shopHTML();bindFeature('shop')}});document.querySelectorAll('[data-forge-buy]').forEach(b=>b.onclick=()=>{const c=campaignSave(),h=hubSave(),id=b.dataset.forgeBuy,cost=Number(b.dataset.cost),u=h.forgeUpgrades;if(!u||u[id]>=5)return;if(c.gold<cost){alert(`Gold ไม่พอ ต้องใช้ ${cost}`);return}c.gold-=cost;u[id]++;h.forge=u.blade;saveCampaign(c);putHub(h);$h('#featureContent').innerHTML=forgeHTML();bindFeature('forge')});document.querySelectorAll('[data-hero-buy]').forEach(b=>b.onclick=()=>{const c=campaignSave(),h=hubSave(),id=b.dataset.heroBuy,price=SHOP_HEROES[id];if(c.ownedHeroes.includes(id))return;if(h.gems<price){alert(`เพชรไม่พอ ต้องใช้ ${price} Gem`);return}h.gems-=price;c.ownedHeroes.push(id);saveCampaign(c);putHub(h);$h('#featureContent').innerHTML=shopHTML();bindFeature('shop')})}
function rememberHubScreenBeforeBattle(){try{sessionStorage.setItem('orchardLastHubScreen','lobby');localStorage.setItem('orchardLastHubScreen','lobby')}catch(_){}}
function startSandbox(){rememberHubScreenBeforeBattle();localStorage.setItem('orchardSandboxMode','1');localStorage.setItem('orchardCurrentStage','1');location.reload()}
function renderMap(){const s=campaignSave();$h('#progressText').textContent=`ปลดล็อก ${s.unlocked}/10 ด่าน • Gold ${s.gold} • ฮีโร่ ${s.ownedHeroes.length}/20`;document.querySelectorAll('.stageCard').forEach(b=>{const n=Number(b.dataset.stage),locked=n>s.unlocked,stars=s.stars[n]||0;b.classList.toggle('locked',locked);b.disabled=locked;b.querySelector('.stars').textContent='★'.repeat(stars)+'☆'.repeat(3-stars);b.onclick=()=>{if(!locked){$h('#map').classList.remove('show');showCampaignTeam(n)}}})}
document.querySelectorAll('[data-place]').forEach(b=>b.addEventListener('click',()=>!moving&&openFeature(b.dataset.place)));$h('#closeFeature').onclick=()=>{$h('#buildingModal').classList.remove('show');document.body.classList.remove('feature-modal-open')};const closeCampaignMap=()=>$h('#map').classList.remove('show');$h('#closeMap').onclick=closeCampaignMap;$h('#closeMapTop').onclick=closeCampaignMap;$h('#hubSound').onclick=e=>e.currentTarget.textContent=e.currentTarget.textContent==='🔊'?'🔇':'🔊';const current=Number(localStorage.getItem('orchardCurrentStage')||0),sandbox=localStorage.getItem('orchardSandboxMode')==='1';if(current){$h('#hub').style.display='none';$h('#app').style.display='block';$h('#stageTitle').textContent=sandbox?'🧪 โหมดทดลอง • Sandbox Lab':`ด่าน ${current} • ${STAGE_META[current]?.name||''}`}else $h('#app').style.display='none';window.openCampaignMap=()=>{localStorage.removeItem('orchardCurrentStage');localStorage.removeItem('orchardSandboxMode');localStorage.removeItem('orchardBattleMode');localStorage.removeItem('orchardWorldTreeFloor');location.reload()};$h('#mapBtn').onclick=()=>window.openCampaignMap();$h('#sandboxStart')?.addEventListener('click',startSandbox);refreshHub();renderMap();

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

/* =========================================================
   V11.0 TWO-SCREEN MAIN MENU + SKY KINGDOM LOBBY
   ========================================================= */
(function setupV11MainMenu(){
  const menu=document.getElementById('mainMenu');
  const hub=document.getElementById('hub');
  const app=document.getElementById('app');
  if(!menu||!hub)return;
  hub.classList.add('v11-lobby');

  const syncMainMenu=()=>{
    const c=campaignSave(),h=hubSave();
    const lvl=Math.max(1,Math.min(99,1+Math.floor((c.stats?.stagesCleared||0)/2)+(c.ownedHeroes?.length||1)-1));
    const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value};
    set('mmLevel',`Lv.${lvl}`);set('mmGold',c.gold||0);set('mmGem',h.gems||0);set('mmStageProgress',`${c.unlocked||1}/10`);
    const xp=document.getElementById('mmXpBar');if(xp)xp.style.width=`${20+((c.stats?.stagesCleared||0)*13)%75}%`;
    const ready=questDefs(c).filter(q=>q.now>=q.target&&!c.claimedQuests[today()+q.id]).length;
    const daily=h.login?.lastClaim!==today();
    const questDot=document.querySelector('[data-mm-feature="quest"] .mm-dot');
    const rewardDot=document.querySelector('[data-mm-feature="reward"] .mm-dot');
    if(questDot)questDot.hidden=!ready;if(rewardDot)rewardDot.hidden=!daily;
    set('mmQuestText',ready?`${ready} รางวัลพร้อมรับ`:'ภารกิจวันนี้');
    set('mmRewardText',daily?'รับรางวัลรายวัน':'รับแล้ววันนี้');
  };
  const setActiveScreen=(target)=>{
    const isMenu=target==='menu';
    menu.hidden=!isMenu;
    hub.hidden=isMenu;
    menu.classList.toggle('screen-active',isMenu);
    hub.classList.toggle('screen-active',!isMenu);
    if(app){app.style.display='none';app.hidden=true;}
    document.body.classList.toggle('showing-main-menu',isMenu);
    document.body.classList.toggle('showing-lobby',!isMenu);
    window.scrollTo({top:0,left:0,behavior:'instant'});
  };
  const SCREEN_KEY='orchardLastHubScreen';
  const rememberScreen=screen=>{try{sessionStorage.setItem(SCREEN_KEY,screen)}catch(_){try{localStorage.setItem(SCREEN_KEY,screen)}catch(__){}}};
  const readRememberedScreen=()=>{try{return sessionStorage.getItem(SCREEN_KEY)||localStorage.getItem(SCREEN_KEY)||'menu'}catch(_){return 'menu'}};
  const showMenu=()=>{rememberScreen('menu');setActiveScreen('menu');syncMainMenu()};
  const showLobby=()=>{rememberScreen('lobby');setActiveScreen('lobby');refreshHub()};
  const showFeatureFromMenu=place=>{showLobby();setTimeout(()=>openFeature(place),80)};
  const showAdventure=()=>{showLobby();setTimeout(()=>document.getElementById('map')?.classList.add('show'),70)};

  document.getElementById('mmEnterHub')?.addEventListener('click',showLobby);
  document.getElementById('mmHubNav')?.addEventListener('click',showLobby);
  document.getElementById('hubMainMenu')?.addEventListener('click',showMenu);
  document.getElementById('v13HomeBtn')?.addEventListener('click',showMenu);
  document.getElementById('v13SettingsBtn')?.addEventListener('click',()=>alert('⚙️ เมนูตั้งค่ากำลังพัฒนา'));

  document.getElementById('mmAdventure')?.addEventListener('click',showAdventure);
  document.getElementById('mmSandbox')?.addEventListener('click',startSandbox);
  document.querySelectorAll('[data-mm-feature]').forEach(btn=>btn.addEventListener('click',()=>showFeatureFromMenu(btn.dataset.mmFeature)));
  document.querySelectorAll('[data-mm-nav="settings"],#mmSettings').forEach(btn=>btn.addEventListener('click',()=>alert('⚙️ เมนูตั้งค่ากำลังพัฒนา')));
  document.querySelectorAll('[data-mm-nav="mail"]').forEach(btn=>btn.addEventListener('click',()=>alert('✉️ กล่องจดหมายกำลังพัฒนา')));
  document.querySelectorAll('[data-mm-nav="rank"]').forEach(btn=>btn.addEventListener('click',()=>alert('🏆 ระบบอันดับกำลังพัฒนา')));

  const currentStage=Number(localStorage.getItem('orchardCurrentStage')||0);
  if(currentStage){
    // Battle must be its own screen. Do not call showLobby(), because
    // setActiveScreen() intentionally hides #app and caused stage cards
    // to appear unresponsive after the page reload.
    menu.hidden=true;
    hub.hidden=true;
    menu.classList.remove('screen-active');
    hub.classList.remove('screen-active');
    if(app){app.hidden=false;app.style.display='block';}
    document.body.classList.remove('showing-main-menu','showing-lobby');
    document.body.classList.add('showing-battle');
    window.scrollTo({top:0,left:0,behavior:'instant'});
  }else{
    document.body.classList.remove('showing-battle');
    if(localStorage.getItem('orchardOpenWorldTree')==='1'){
      localStorage.removeItem('orchardOpenWorldTree');
      showLobby();setTimeout(()=>openFeature('tree'),120);
    }else if(readRememberedScreen()==='lobby')showLobby();
    else showMenu();
  }
})();
