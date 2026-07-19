# Orchard Defense V16.8 — Hero Completion & Balance Pass

ฐาน: V16.7.2 Global Variable Fix

## จุดประสงค์
ทำให้ฮีโร่ 30 ตัวเชื่อมกับความสามารถในสนามได้ตรงบทบาทมากขึ้น โดยไม่เปลี่ยน Save Key หรือระบบด่านเดิม

## กลไกที่เพิ่ม/ทำให้สมบูรณ์
- Aura ความเร็วโจมตีใช้ได้แบบทั่วไป (Bloom Fairy / Elder Owl / World Core)
- Ember Apple ระเบิดไฟรอบเป้าหมายทุกนัด
- Coconut ลดดาเมจที่ได้รับ 25%
- Apple Knight ลดดาเมจ 18% + สะท้อน 12%
- Kiwi Rogue มีโอกาสคริติคอล 22% (x1.75)
- Spirit Stag ผลักศัตรู + ลดดาเมจ 18%
- Storm Eagle สายฟ้าชิ่งสูงสุด 2 เป้าหมาย
- Moon Wolf คริติคอล 28% (x1.9)
- Iron Rhino ลดดาเมจ 35% + Stun รอบตัวทุก 3 ครั้ง
- Sky Serpent สายฟ้าชิ่งสูงสุด 3 เป้าหมาย
- Ancient Treant ฟื้น HP Core เป็นระยะ
- World Core Guardian ฟื้น HP Core + Aura ความเร็วโจมตี

## ความปลอดภัย
- ไม่เปลี่ยน localStorage Save Keys
- ไม่ล้าง Gold/Gem/Hero/Stage/World Tree
- ตรวจ Syntax แยกและรวม hero-data.js + hub.js + game.js ผ่านแล้ว
