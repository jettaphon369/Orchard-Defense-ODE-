# Orchard Defense Ultimate V4

เกม Tower Defense บนเว็บ สร้างด้วย Phaser 3 และกราฟิกแบบ procedural จึงไม่ต้องมีโฟลเดอร์รูปภาพเพิ่มเติม

## วิธีใช้งานบน GitHub Pages
1. แตกไฟล์ ZIP
2. อัปโหลด `index.html`, `style.css`, `game.js` ไปที่ root ของ repository
3. ไปที่ Settings → Pages
4. เลือก Deploy from a branch → `main` / root
5. รอระบบเผยแพร่ 1–3 นาที

## ระบบในเวอร์ชันนี้
- สนาม 5 แถว × 9 ช่อง
- ตัวละคร 7 แบบ
- ศัตรู 4 แบบ รวมบอสมังกร
- 10 เวฟ
- ระบบพลังงาน คูลดาวน์ ขายยูนิต เลือดฐาน
- เงาวางยูนิตและการเลือกตำแหน่งบนมือถือ
- Projectile, Laser, Slow, Mine, Particles, Camera Shake
- Pause และ Speed ×2

หมายเหตุ: Phaser โหลดจาก CDN จึงต้องเชื่อมต่ออินเทอร์เน็ตตอนเปิดเกม
