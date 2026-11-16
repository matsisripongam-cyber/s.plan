/* =====================================================================
   ผลงานทั้งหมดของเว็บ S.PLAN  —  แก้ไฟล์นี้ไฟล์เดียวพอ
   ---------------------------------------------------------------------
   เว็บจะสร้าง 3 ส่วนจากรายการนี้ให้อัตโนมัติ
     1) แถบ "ผลงานคัดสรร"            (เฉพาะโปรเจกต์ที่มี featured)
     2) ตาราง "รายชื่อโครงการทั้งหมด" (เฉพาะโปรเจกต์ที่มี category)
     3) อัลบั้มรูปที่เด้งขึ้นมาเวลากดดูรูป
   ตัวเลขจำนวนโครงการและจำนวนรูปจะนับให้เองด้วย

   วิธีเพิ่มผลงานใหม่
     1. ใส่รูปลงโฟลเดอร์ img/g/  (ตั้งชื่อเป็นภาษาอังกฤษ ไม่มีเว้นวรรค เช่น myhouse-01.webp)
     2. ก๊อปบล็อก { ... }, ของโปรเจกต์ไหนก็ได้ ไปวางในตำแหน่งที่อยากให้แสดง
        (เรียงจากบนลงล่าง = ลำดับในตารางรายชื่อโครงการ)
     3. แก้ค่าในบล็อกใหม่ แล้วบันทึกไฟล์
     ระวัง: ข้อความต้องอยู่ในเครื่องหมาย " "  และทุกบรรทัดลงท้ายด้วย ,
   ===================================================================== */

window.PROJECTS = [
  {
    id: "nursery",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2026",
    name: "Nursery & Children's Room · Bangpakok 1 Hospital",
    location: "Soi Suksawat 25/1, Rat Burana",
    style: "Nursery, baby bond & pediatric rooms",
    service: "Interior design & renovations",
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 1,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/g/nurs-01.webp",
      alt: "ห้องเนิร์สเซอรี่ โทนพาสเทล โรงพยาบาลบางปะกอก 1",   // คำอธิบายรูป (สำหรับ Google)
      title: "Nursery & Children's Room",
      meta: "Bangpakok 1 Hospital · Pastel",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/nurs-01.webp",
      "img/g/nurs-03.webp",
      "img/g/nurs-04.webp",
      "img/g/nurs-06.webp",
      "img/g/nurs-07.webp",
      "img/g/nurs-08.webp",
      "img/g/nurs-11.webp",
      "img/g/nurs-12.webp",
      "img/g/nurs-14.webp",
      "img/g/nurs-16.webp",
      "img/g/nurs-17.webp",
      "img/g/nurs-18.webp",
      "img/g/nurs-22.webp",
      "img/g/nurs-24.webp",
      "img/g/nurs-25.webp",
      "img/g/nurs-26.webp",
      "img/g/nurs-27.webp",
      "img/g/nurs-30.webp",
      "img/g/nurs-31.webp",
      "img/g/nurs-32.webp",
      "img/g/nurs-33.webp",
      "img/g/nurs-34.webp",
      "img/g/nurs-35.webp",
      "img/g/nurs-37.webp",
      "img/g/nurs-39.webp",
      "img/g/nurs-40.webp",
      "img/g/nurs-41.webp",
      "img/g/nurs-42.webp",
      "img/g/nurs-44.webp",
    ],
    images3d: ["img/g/nurs-01.webp", "img/g/nurs-07.webp", "img/g/nurs-11.webp", "img/g/nurs-12.webp", "img/g/nurs-14.webp"],   // รูปไหนเป็นภาพ 3D (ไม่ใส่ก็ได้)
    pairs: {"img/g/nurs-01.webp": "img/g/nurs-03.webp", "img/g/nurs-07.webp": "img/g/nurs-08.webp", "img/g/nurs-11.webp": "img/g/nurs-22.webp", "img/g/nurs-14.webp": "img/g/nurs-42.webp"},   // คู่ภาพ 3D กับภาพงานจริง (ไม่ใส่ก็ได้)
  },
  {
    id: "bpk7",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2026",
    name: "Bangpakok 1 Hospital / Fl.7",
    location: "Soi Suksawat 25/1, Rat Burana",
    style: "Minimal modern",
    service: "Interior design & renovations",
    category: "reno",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/g/bpk7-3d01.webp",       // รูปปกในตารางรายชื่อโครงการ
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 2,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/g/bpk7-3d01.webp",
      alt: "โถงต้อนรับ โรงพยาบาลบางปะกอก 1 ชั้น 7",   // คำอธิบายรูป (สำหรับ Google)
      title: "Bangpakok 1 Hospital · Fl.7",
      meta: "Rat Burana · Minimal modern",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/bpk7-3d01.webp",
      "img/g/bpk7-3d02.webp",
      "img/g/bpk7-3d03.webp",
      "img/g/bpk7-3d04.webp",
      "img/g/bpk7-3d05.webp",
      "img/g/bpk7-3d06.webp",
      "img/g/bpk7-3d07.webp",
      "img/g/bpk7-04.webp",
      "img/g/bpk7-05.webp",
      "img/g/bpk7-06.webp",
      "img/g/bpk7-08.webp",
      "img/g/bpk7-09.webp",
      "img/g/bpk7-10.webp",
      "img/g/bpk7-11.webp",
      "img/g/bpk7-13.webp",
      "img/g/bpk7-14.webp",
    ],
    images3d: ["img/g/bpk7-3d01.webp", "img/g/bpk7-3d02.webp", "img/g/bpk7-3d03.webp", "img/g/bpk7-3d04.webp", "img/g/bpk7-3d05.webp", "img/g/bpk7-3d06.webp", "img/g/bpk7-3d07.webp"],   // รูปไหนเป็นภาพ 3D (ไม่ใส่ก็ได้)
    pairs: {"img/g/bpk7-3d01.webp": "img/g/bpk7-04.webp", "img/g/bpk7-3d05.webp": "img/g/bpk7-11.webp"},   // คู่ภาพ 3D กับภาพงานจริง (ไม่ใส่ก็ได้)
  },
  {
    id: "alitta",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2024",
    name: "Alitta Caress",
    location: "Soi Sumpowthong, Nonthaburi",
    style: "Contemporary minimal & luxury",
    service: "Interior design & renovations",
    category: "reno",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/g/alitta-3d02.webp",       // รูปปกในตารางรายชื่อโครงการ
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 4,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/g/alitta-3d02.webp",
      alt: "อาคาร Alitta Caress ภายนอก",   // คำอธิบายรูป (สำหรับ Google)
      title: "Alitta Caress",
      meta: "Nonthaburi · Contemporary luxury",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/alitta-3d02.webp",
      "img/g/alitta-3d01.webp",
      "img/g/alitta-3d03.webp",
      "img/g/alitta-3d04.webp",
      "img/g/alitta-3d05.webp",
      "img/g/alitta-3d06.webp",
      "img/g/alitta-05.webp",
      "img/g/alitta-07.webp",
      "img/g/alitta-09.webp",
      "img/g/alitta-12.webp",
    ],
  },
  {
    id: "bpk4",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2024",
    name: "Bangpakok 1 Hospital / Fl.4",
    location: "Soi Suksawat 25/1, Rat Burana",
    style: "Minimal modern",
    service: "Interior design & renovations",
    category: "reno",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/g/bpk4-3d04.webp",       // รูปปกในตารางรายชื่อโครงการ
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 3,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/g/bpk4-3d04.webp",
      alt: "ห้องพักผู้ป่วย VIP โรงพยาบาลบางปะกอก 1 ชั้น 4",   // คำอธิบายรูป (สำหรับ Google)
      title: "Bangpakok 1 Hospital · Fl.4",
      meta: "Rat Burana · VIP & patient rooms",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/bpk4-3d04.webp",
      "img/g/bpk4-3d01.webp",
      "img/g/bpk4-3d02.webp",
      "img/g/bpk4-3d03.webp",
      "img/g/bpk4-3d05.webp",
      "img/g/bpk4-3d06.webp",
      "img/g/bpk4-3d07.webp",
      "img/g/bpk4-3d08.webp",
      "img/g/bpk4-3d09.webp",
      "img/g/bpk4-3d10.webp",
      "img/g/bpk4-3d11.webp",
      "img/g/bpk4-3d12.webp",
      "img/g/bpk4-3d13.webp",
      "img/g/bpk4-3d14.webp",
      "img/g/bpk4-3d15.webp",
      "img/g/bpk4-3d16.webp",
      "img/g/bpk4-05.webp",
      "img/g/bpk4-06.webp",
      "img/g/bpk4-09.webp",
      "img/g/bpk4-10.webp",
      "img/g/bpk4-12.webp",
      "img/g/bpk4-13.webp",
      "img/g/bpk4-14.webp",
    ],
    images3d: ["img/g/bpk4-3d04.webp", "img/g/bpk4-3d01.webp", "img/g/bpk4-3d02.webp", "img/g/bpk4-3d03.webp", "img/g/bpk4-3d05.webp", "img/g/bpk4-3d06.webp", "img/g/bpk4-3d07.webp", "img/g/bpk4-3d08.webp", "img/g/bpk4-3d09.webp", "img/g/bpk4-3d10.webp", "img/g/bpk4-3d11.webp", "img/g/bpk4-3d12.webp", "img/g/bpk4-3d13.webp", "img/g/bpk4-3d14.webp", "img/g/bpk4-3d15.webp", "img/g/bpk4-3d16.webp"],   // รูปไหนเป็นภาพ 3D (ไม่ใส่ก็ได้)
    pairs: {"img/g/bpk4-3d16.webp": "img/g/bpk4-06.webp", "img/g/bpk4-3d03.webp": "img/g/bpk4-13.webp"},   // คู่ภาพ 3D กับภาพงานจริง (ไม่ใส่ก็ได้)
  },
  {
    id: "duckhams",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2023",
    name: "Duckhams Thailand Co., Ltd.",
    location: "Phaholyothin",
    style: "From old, change to new",
    service: "Interior design & renovations",
    category: "reno",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/g/duckhams-a02.webp",       // รูปปกในตารางรายชื่อโครงการ
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/duckhams-a01.webp",
      "img/g/duckhams-a02.webp",
      "img/g/duckhams-a03.webp",
      "img/g/duckhams-a04.webp",
    ],
  },
  {
    id: "malee",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2023",
    name: "Private Residence",
    location: "ย่านปรีดี พนมยงค์",
    style: "From old, change to new",
    service: "Interior design & renovations",
    category: "reno",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/g/malee-a05.webp",       // รูปปกในตารางรายชื่อโครงการ
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/malee-a01.webp",
      "img/g/malee-a02.webp",
      "img/g/malee-a03.webp",
      "img/g/malee-a04.webp",
      "img/g/malee-a05.webp",
      "img/g/malee-a06.webp",
      "img/g/malee-a07.webp",
      "img/g/malee-a08.webp",
      "img/g/malee-a09.webp",
      "img/g/malee-a10.webp",
    ],
  },
  {
    id: "chumphol",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2021",
    name: "Chumphol Residence",
    location: "Chaiyaphum",
    style: "Classic luxury",
    service: "Interior design",
    category: "design",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/chumphol-entrance.webp",       // รูปปกในตารางรายชื่อโครงการ
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 5,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/chumphol-entrance.webp",
      alt: "ทางเดินโทนเหลือง บ้านชุมพล",   // คำอธิบายรูป (สำหรับ Google)
      title: "Chumphol Residence",
      meta: "Chaiyaphum · Classic luxury",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/chumphol-01.webp",
      "img/g/chumphol-02.webp",
      "img/g/chumphol-03.webp",
      "img/g/chumphol-04.webp",
      "img/g/chumphol-05.webp",
      "img/g/chumphol-06.webp",
      "img/g/chumphol-07.webp",
      "img/g/chumphol-08.webp",
      "img/g/chumphol-09.webp",
      "img/g/chumphol-10.webp",
      "img/g/chumphol-11.webp",
      "img/g/chumphol-12.webp",
      "img/g/chumphol-13.webp",
      "img/g/chumphol-14.webp",
    ],
  },
  {
    id: "fuse",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2019",
    name: "Fuse Mobius Condominium",
    location: "Ramkhamhaeng",
    style: "Industrial",
    service: "Interior design",
    category: "design",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/fuse-mobius.webp",       // รูปปกในตารางรายชื่อโครงการ
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 6,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/fuse-mobius.webp",
      alt: "ห้องนั่งเล่นสไตล์อินดัสเทรียล",   // คำอธิบายรูป (สำหรับ Google)
      title: "Fuse Mobius Condominium",
      meta: "Ramkhamhaeng · Industrial",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/fuse-01.webp",
      "img/g/fuse-02.webp",
      "img/g/fuse-03.webp",
      "img/g/fuse-04.webp",
    ],
  },
  {
    id: "noble",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2019",
    name: "Noble Ploenchit Condominium",
    location: "Ploenchit",
    style: "Contemporary luxury",
    service: "Interior design & decorations",
    category: "deco",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/noble.webp",       // รูปปกในตารางรายชื่อโครงการ
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 7,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/noble.webp",
      alt: "ห้องนั่งเล่น คอนโด Noble Ploenchit",   // คำอธิบายรูป (สำหรับ Google)
      title: "Noble Ploenchit",
      meta: "Ploenchit · Contemporary luxury",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/noble-01.webp",
      "img/g/noble-02.webp",
      "img/g/noble-03.webp",
      "img/g/noble-04.webp",
      "img/g/noble-05.webp",
      "img/g/noble-06.webp",
      "img/g/noble-07.webp",
      "img/g/noble-08.webp",
      "img/g/noble-09.webp",
      "img/g/noble-10.webp",
      "img/g/noble-11.webp",
      "img/g/noble-12.webp",
      "img/g/noble-13.webp",
      "img/g/noble-14.webp",
    ],
  },
  {
    id: "orawan",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2018",
    name: "Private Residence",
    location: "กรุงเทพฯ",
    style: "Contemporary",
    service: "Interior design",
    category: "design",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/residence.webp",       // รูปปกในตารางรายชื่อโครงการ
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 8,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/residence.webp",
      alt: "ห้องนั่งเล่น Private Residence กรุงเทพฯ",   // คำอธิบายรูป (สำหรับ Google)
      title: "Private Residence",
      meta: "กรุงเทพฯ · Contemporary",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/orawan-01.webp",
      "img/g/orawan-02.webp",
      "img/g/orawan-03.webp",
      "img/g/orawan-04.webp",
      "img/g/orawan-05.webp",
      "img/g/orawan-06.webp",
      "img/g/orawan-07.webp",
      "img/g/orawan-08.webp",
      "img/g/orawan-09.webp",
      "img/g/orawan-10.webp",
      "img/g/orawan-11.webp",
      "img/g/orawan-12.webp",
      "img/g/orawan-13.webp",
      "img/g/orawan-14.webp",
    ],
  },
  {
    id: "jinsupang",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2016",
    name: "Private Residence",
    location: "ย่านกรุงเทพ-นนท์",
    style: "Modern",
    service: "Interior design & renovations",
    category: "reno",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/g/jinsupang-a01.webp",       // รูปปกในตารางรายชื่อโครงการ
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/jinsupang-a01.webp",
      "img/g/jinsupang-a02.webp",
      "img/g/jinsupang-a03.webp",
      "img/g/jinsupang-a04.webp",
    ],
  },
  {
    id: "ple",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2016",
    name: "Private Residence",
    location: "ย่านสุขุมวิท",
    style: "Minimal modern",
    service: "Interior design & renovations",
    category: "reno",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/g/ple-a06.webp",       // รูปปกในตารางรายชื่อโครงการ
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/ple-a01.webp",
      "img/g/ple-a02.webp",
      "img/g/ple-a03.webp",
      "img/g/ple-a04.webp",
      "img/g/ple-a05.webp",
      "img/g/ple-a06.webp",
      "img/g/ple-a07.webp",
      "img/g/ple-a08.webp",
      "img/g/ple-a09.webp",
      "img/g/ple-a10.webp",
      "img/g/ple-a11.webp",
      "img/g/ple-a12.webp",
      "img/g/ple-a13.webp",
      "img/g/ple-a14.webp",
    ],
  },
  {
    id: "allseason",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2016",
    name: "All Season Place",
    location: "Pathum Wan",
    style: "Minimal modern",
    service: "Interior design",
    category: "design",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/g/allseason-01.webp",       // รูปปกในตารางรายชื่อโครงการ
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 9,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/g/allseason-01.webp",
      alt: "ห้องนั่งเล่น All Season Place",   // คำอธิบายรูป (สำหรับ Google)
      title: "All Season Place",
      meta: "Pathum Wan · Minimal modern",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/allseason-01.webp",
      "img/g/allseason-02.webp",
      "img/g/allseason-03.webp",
      "img/g/allseason-04.webp",
    ],
  },
  {
    id: "riverside",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2016",
    name: "333 Riverside Condominium",
    location: "Bang Sue",
    style: "Minimalist",
    service: "Interior design & decorations",
    category: "deco",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/g/riverside-02.webp",       // รูปปกในตารางรายชื่อโครงการ
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/riverside-01.webp",
      "img/g/riverside-02.webp",
      "img/g/riverside-03.webp",
      "img/g/riverside-04.webp",
      "img/g/riverside-05.webp",
      "img/g/riverside-06.webp",
      "img/g/riverside-07.webp",
      "img/g/riverside-08.webp",
      "img/g/riverside-09.webp",
      "img/g/riverside-10.webp",
      "img/g/riverside-11.webp",
      "img/g/riverside-12.webp",
    ],
  },
  {
    id: "emporio",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2015",
    name: "The Emporio Place",
    location: "Sukhumvit 24",
    style: "Modern",
    service: "Interior design",
    category: "design",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/emporio-dining.webp",       // รูปปกในตารางรายชื่อโครงการ
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 10,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/emporio-dining.webp",
      alt: "มุมรับประทานอาหาร The Emporio Place",   // คำอธิบายรูป (สำหรับ Google)
      title: "The Emporio Place",
      meta: "Sukhumvit 24 · Modern",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/emporio-01.webp",
      "img/g/emporio-02.webp",
      "img/g/emporio-03.webp",
      "img/g/emporio-04.webp",
    ],
  },
  {
    id: "bb72",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2015",
    name: "72 Bangkok Boulevard",
    location: "Bangkok",
    style: "Contemporary",
    service: "Interior design",
    category: "design",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/g/bb72-01.webp",       // รูปปกในตารางรายชื่อโครงการ
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 11,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/g/bb72-01.webp",
      alt: "ห้องนั่งเล่น 72 Bangkok Boulevard",   // คำอธิบายรูป (สำหรับ Google)
      title: "72 Bangkok Boulevard",
      meta: "Bangkok · Contemporary",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/bb72-01.webp",
      "img/g/bb72-02.webp",
      "img/g/bb72-03.webp",
      "img/g/bb72-04.webp",
      "img/g/bb72-05.webp",
      "img/g/bb72-06.webp",
    ],
  },
  {
    id: "bkkblvd",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2015",
    name: "Bangkok Boulevard",
    location: "Ramintra",
    style: "Contemporary luxury",
    service: "Interior design & decorations",
    category: "deco",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/g/bkkblvd-09.webp",       // รูปปกในตารางรายชื่อโครงการ
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 12,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/g/bkkblvd-09.webp",
      alt: "ห้องนั่งเล่น Bangkok Boulevard รามอินทรา",   // คำอธิบายรูป (สำหรับ Google)
      title: "Bangkok Boulevard",
      meta: "Ramintra · Contemporary luxury",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/bkkblvd-01.webp",
      "img/g/bkkblvd-02.webp",
      "img/g/bkkblvd-03.webp",
      "img/g/bkkblvd-04.webp",
      "img/g/bkkblvd-05.webp",
      "img/g/bkkblvd-06.webp",
      "img/g/bkkblvd-07.webp",
      "img/g/bkkblvd-08.webp",
      "img/g/bkkblvd-09.webp",
      "img/g/bkkblvd-10.webp",
      "img/g/bkkblvd-11.webp",
      "img/g/bkkblvd-12.webp",
      "img/g/bkkblvd-13.webp",
      "img/g/bkkblvd-14.webp",
    ],
  },
  {
    id: "valvoline",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2014",
    name: "Valvoline Thailand Co., Ltd.",
    location: "Phaholyothin",
    style: "Minimal modern",
    service: "Interior design & renovations",
    category: "reno",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/g/valvoline-10.webp",       // รูปปกในตารางรายชื่อโครงการ
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 16,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/g/valvoline-10.webp",
      alt: "สำนักงาน Valvoline Thailand",   // คำอธิบายรูป (สำหรับ Google)
      title: "Valvoline Thailand",
      meta: "Phaholyothin · Office",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/valvoline-03.webp",
      "img/g/valvoline-04.webp",
      "img/g/valvoline-05.webp",
      "img/g/valvoline-06.webp",
      "img/g/valvoline-07.webp",
      "img/g/valvoline-08.webp",
      "img/g/valvoline-09.webp",
      "img/g/valvoline-10.webp",
      "img/g/valvoline-11.webp",
      "img/g/valvoline-12.webp",
      "img/g/valvoline-14.webp",
    ],
  },
  {
    id: "penthouse",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2014",
    name: "The Penthouse",
    location: "Pattaya",
    style: "Scandinavian",
    service: "Interior design",
    category: "design",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/penthouse.webp",       // รูปปกในตารางรายชื่อโครงการ
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 13,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/penthouse.webp",
      alt: "ห้องนอนโทนขาว The Penthouse",   // คำอธิบายรูป (สำหรับ Google)
      title: "The Penthouse",
      meta: "Pattaya · Scandinavian",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/penthouse-01.webp",
      "img/g/penthouse-02.webp",
      "img/g/penthouse-03.webp",
      "img/g/penthouse-04.webp",
      "img/g/penthouse-05.webp",
      "img/g/penthouse-06.webp",
    ],
  },
  {
    id: "showhouse",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2014",
    name: "Showhouse",
    location: "Miracle Hua Hin",
    style: "Scandinavian",
    service: "Interior design",
    category: "design",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/showhouse.webp",       // รูปปกในตารางรายชื่อโครงการ
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 14,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/showhouse.webp",
      alt: "ห้องนอนโทนน้ำเงิน บ้านตัวอย่างหัวหิน",   // คำอธิบายรูป (สำหรับ Google)
      title: "Showhouse",
      meta: "Hua Hin · Scandinavian",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/showhouse-01.webp",
      "img/g/showhouse-02.webp",
      "img/g/showhouse-03.webp",
      "img/g/showhouse-04.webp",
      "img/g/showhouse-05.webp",
    ],
  },
  {
    id: "jiraroj",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2014",
    name: "Private Residence",
    location: "มหาชัย",
    style: "Minimalist",
    service: "Interior design & decorations",
    category: "deco",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/g/jiraroj-13.webp",       // รูปปกในตารางรายชื่อโครงการ
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 15,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/g/jiraroj-13.webp",
      alt: "ห้องนั่งเล่น Private Residence มหาชัย",   // คำอธิบายรูป (สำหรับ Google)
      title: "Private Residence",
      meta: "มหาชัย · Minimalist",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/jiraroj-01.webp",
      "img/g/jiraroj-02.webp",
      "img/g/jiraroj-03.webp",
      "img/g/jiraroj-04.webp",
      "img/g/jiraroj-05.webp",
      "img/g/jiraroj-06.webp",
      "img/g/jiraroj-07.webp",
      "img/g/jiraroj-08.webp",
      "img/g/jiraroj-09.webp",
      "img/g/jiraroj-10.webp",
      "img/g/jiraroj-11.webp",
      "img/g/jiraroj-12.webp",
      "img/g/jiraroj-13.webp",
      "img/g/jiraroj-14.webp",
    ],
  },
  {
    id: "lertsophol",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2013",
    name: "Private Residence",
    location: "รามอินทรา",
    style: "Classic",
    service: "ผลงานก่อนก่อตั้งบริษัท",
    category: "pre",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/g/lertsophol-03.webp",       // รูปปกในตารางรายชื่อโครงการ
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 17,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/g/lertsophol-03.webp",
      alt: "ห้องรับประทานอาหาร Private Residence รามอินทรา",   // คำอธิบายรูป (สำหรับ Google)
      title: "Private Residence",
      meta: "รามอินทรา · Classic · ผลงานก่อนก่อตั้งบริษัท",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/lertsophol-01.webp",
      "img/g/lertsophol-02.webp",
      "img/g/lertsophol-03.webp",
      "img/g/lertsophol-04.webp",
      "img/g/lertsophol-05.webp",
      "img/g/lertsophol-06.webp",
      "img/g/lertsophol-07.webp",
      "img/g/lertsophol-08.webp",
      "img/g/lertsophol-09.webp",
    ],
  },
  {
    id: "juporn",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2012",
    name: "Juporn Mahachai Seafood",
    location: "Talad Thai",
    style: "Contemporary · exterior",
    service: "ผลงานก่อนก่อตั้งบริษัท",
    category: "pre",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/juporn.webp",       // รูปปกในตารางรายชื่อโครงการ
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 19,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/juporn.webp",
      alt: "อาคารร้านอาหาร จูพร มหาชัยซีฟู้ด",   // คำอธิบายรูป (สำหรับ Google)
      title: "Juporn Mahachai Seafood",
      meta: "Talad Thai · Exterior · ผลงานก่อนก่อตั้งบริษัท",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/juporn-01.webp",
      "img/g/juporn-02.webp",
      "img/g/juporn-03.webp",
      "img/g/juporn-04.webp",
      "img/g/juporn-05.webp",
      "img/g/juporn-06.webp",
      "img/g/juporn-07.webp",
    ],
  },
  {
    id: "grammy",                      // ชื่อย่อภาษาอังกฤษ ห้ามซ้ำกับโปรเจกต์อื่น
    year: "2012",
    name: "GMM Grammy",
    location: "Asok",
    style: "Modern",
    service: "ผลงานก่อนก่อตั้งบริษัท",
    category: "pre",              // design = ออกแบบภายใน · deco = ออกแบบพร้อมตกแต่ง · reno = ออกแบบพร้อมรีโนเวท · pre = ก่อนก่อตั้งบริษัท  (ลบบรรทัดนี้ = ไม่แสดงในตาราง)
    cover: "img/grammy.webp",       // รูปปกในตารางรายชื่อโครงการ
    featured: {                   // แสดงในแถบผลงานคัดสรร (ลบทั้งก้อนนี้ = ไม่แสดง)
      order: 18,                    // ลำดับในแถบผลงานคัดสรร (1 = แสดงก่อน)
      image: "img/grammy.webp",
      alt: "ห้อง VIP แสงไฟสีฟ้า GMM Grammy",   // คำอธิบายรูป (สำหรับ Google)
      title: "GMM Grammy",
      meta: "Asok · Modern · ผลงานก่อนก่อตั้งบริษัท",
    },
    images: [                     // รูปทั้งหมดในอัลบั้ม เรียงตามลำดับที่จะแสดง
      "img/g/grammy-01.webp",
      "img/g/grammy-02.webp",
      "img/g/grammy-03.webp",
      "img/g/grammy-04.webp",
      "img/g/grammy-05.webp",
      "img/g/grammy-06.webp",
      "img/g/grammy-07.webp",
      "img/g/grammy-08.webp",
      "img/g/grammy-09.webp",
      "img/g/grammy-10.webp",
    ],
  },
];
