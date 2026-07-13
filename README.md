# Orchard Defense Ultimate V6

เกมป้องกันสวนลอยฟ้าสำหรับเว็บและมือถือ

## วิธีลง GitHub Pages
1. แตกไฟล์ ZIP
2. อัปโหลด `index.html`, `style.css`, `game.js` ไว้ที่หน้าแรกของ repository
3. เปิด Settings > Pages และเลือก Deploy from a branch
4. เลือก `main` และ `/root`

เกมโหลด Phaser 3 ผ่าน CDN จึงต้องเชื่อมต่ออินเทอร์เน็ตขณะเล่น


## V6.1 Mobile Balance Fix
- การ์ดเล็กลง เห็นประมาณ 4 ใบบนมือถือ
- แถบเลือดบอสแบบกะทัดรัดที่มุมขวาบน
- ข้อความสวนลอยฟ้าแยกจากหลอดเลือดชัดเจน
- เพิ่ม cache-busting สำหรับ GitHub Pages
