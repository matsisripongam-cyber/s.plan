/* Runs on Netlify at every deploy (netlify.toml → command = "node build.js").
   Builds one page per project at /works/<id>/, a list page at /works/, and sitemap.xml,
   so each project can show up on Google on its own. The home page is not touched.
   Projects come from the back office (Supabase); if that cannot be reached, from projects.js. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SITE = 'https://splaninteriordesign.com';
const SB_URL = 'https://zddtttxnrdciyjlfqlyp.supabase.co';
const SB_KEY = 'sb_publishable_WFlbwDJFxwt7-RgcA1lChQ_92tvUvzf';
const LINE = 'https://lin.ee/SlsU3O7';
const SERVICES = require('./services.js');
const today = new Date().toISOString().slice(0, 10);

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const abs = u => !u ? '' : /^https?:/.test(u) ? u : SITE + '/' + u.replace(/^\/+/, '');
const rel = u => !u ? '' : /^https?:/.test(u) ? u : '/' + u.replace(/^\/+/, '');

const CAT = { design: 'ออกแบบภายใน', deco: 'ออกแบบและตกแต่งภายใน', reno: 'ออกแบบและรีโนเวทภายใน', pre: 'ออกแบบภายใน' };
function serviceTH(p) {
  if (p.category && CAT[p.category]) return CAT[p.category];
  const s = (p.service || '').toLowerCase();
  if (s.includes('renovation')) return CAT.reno;
  if (s.includes('decoration')) return CAT.deco;
  return CAT.design;
}

async function loadProjects() {
  try {
    const ctl = new AbortController(); setTimeout(() => ctl.abort(), 8000);
    const r = await fetch(SB_URL + '/rest/v1/projects?select=*&published=eq.true&order=sort_index.asc',
      { headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY }, signal: ctl.signal });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const rows = await r.json();
    if (Array.isArray(rows) && rows.length) { console.log('projects from back office:', rows.length); return rows; }
    throw new Error('empty');
  } catch (e) {
    console.log('back office not reachable (' + e.message + '), using projects.js');
    const ctx = { window: {} }; vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(path.join(__dirname, 'projects.js'), 'utf8'), ctx);
    return ctx.window.PROJECTS || [];
  }
}

const CSS = `
:root{--brand:#c41d22;--ink:#1b1a18;--mute:#5c5850;--paper:#f7f5f1;--line:#e4e0d8}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.7 "IBM Plex Sans Thai","Leelawadee UI","Thonburi",system-ui,sans-serif}
a{color:inherit}
.top{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:14px;padding:12px clamp(16px,4vw,40px);background:rgba(247,245,241,.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-family:Michroma,sans-serif;letter-spacing:.12em;font-size:14px}
.brand img{height:30px;width:auto}
.top .sp{flex:1}
.btn{display:inline-block;text-decoration:none;border:1px solid var(--ink);padding:8px 18px;border-radius:999px;font-size:15px;white-space:nowrap}
.btn.line{border-color:#06c755;color:#06c755}.btn.red{background:var(--brand);border-color:var(--brand);color:#fff}
main{max-width:1180px;margin:0 auto;padding:clamp(28px,5vw,64px) clamp(16px,4vw,40px)}
.crumb{font-size:14px;color:var(--mute);margin-bottom:10px}.crumb a{text-decoration:none}.crumb a:hover{color:var(--brand)}
h1{font-size:clamp(28px,4.4vw,48px);line-height:1.25;margin:0 0 12px;font-weight:600}
.meta{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 18px;padding:0;list-style:none}
.meta li{border:1px solid var(--line);background:#fff;border-radius:999px;padding:3px 12px;font-size:14px;color:var(--mute)}
.lead{max-width:760px;color:var(--mute);margin:0 0 28px}
.hero{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:18px;display:block;background:#e9e5de}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;margin-top:14px}
.grid img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;display:block;background:#e9e5de}
.cta{margin:48px 0 0;padding:28px;border-radius:18px;background:#fff;border:1px solid var(--line);display:flex;flex-wrap:wrap;gap:16px;align-items:center}
.cta p{margin:0;flex:1 1 300px}.cta b{display:block;font-size:20px}
h2{font-size:22px;margin:56px 0 14px;font-weight:600}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}
.card{text-decoration:none;display:block}
.card img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;display:block;background:#e9e5de;transition:transform .4s}
.card:hover img{transform:scale(1.02)}
.card b{display:block;margin-top:8px;font-weight:500;line-height:1.4}.card span{font-size:14px;color:var(--mute)}

.pts{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin:8px 0 0}
.pt{background:#fff;border:1px solid var(--line);border-radius:14px;padding:18px}
.pt b{display:block;margin-bottom:4px;font-weight:600}.pt span{color:var(--mute);font-size:15px}
.steps{counter-reset:s;list-style:none;padding:0;margin:0;display:grid;gap:10px}
.steps li{counter-increment:s;padding:14px 16px 14px 56px;position:relative;background:#fff;border:1px solid var(--line);border-radius:14px}
.steps li:before{content:counter(s,decimal-leading-zero);position:absolute;left:16px;top:14px;font-family:Michroma,sans-serif;color:var(--brand);font-size:14px}
.steps b{font-weight:600}
details{background:#fff;border:1px solid var(--line);border-radius:14px;padding:14px 18px;margin-bottom:10px}
summary{cursor:pointer;font-weight:500}details p{margin:8px 0 0;color:var(--mute)}
.svc{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.svc a{border:1px solid var(--line);background:#fff;border-radius:999px;padding:6px 14px;text-decoration:none;font-size:15px}.svc a:hover{border-color:var(--brand);color:var(--brand)}
footer{border-top:1px solid var(--line);padding:24px clamp(16px,4vw,40px);font-size:14px;color:var(--mute);text-align:center}
`;

function shell({ title, desc, url, image, body, ld }) {
  return `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="S.PLAN Interior Design">
<meta property="og:locale" content="th_TH">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${esc(image)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/img/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600&family=Michroma&display=swap" rel="stylesheet">
<style>${CSS}</style>
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>
</head>
<body>
<header class="top">
  <a class="brand" href="/"><img src="/img/logo.png" alt="S.PLAN" width="32" height="30">S.PLAN</a>
  <span class="sp"></span>
  <a class="btn" href="/services/">บริการ</a>
  <a class="btn" href="/works/">ผลงาน</a>
  <a class="btn line" href="${LINE}" target="_blank" rel="noopener">LINE</a>
</header>
<main>
${body}
<div class="cta"><p><b>อยากได้ห้องแบบนี้?</b>ปรึกษาเรื่องออกแบบ ตกแต่ง และรีโนเวทกับ S.PLAN ได้ฟรี บอกพื้นที่และงบคร่าว ๆ แล้วเราจะแนะนำแนวทางให้</p>
<a class="btn red" href="/#contact">ขอใบเสนอราคา</a><a class="btn line" href="${LINE}" target="_blank" rel="noopener">แอด LINE</a></div>
</main>
<footer><div class="svc" style="justify-content:center;margin:0 0 12px">${SERVICES.map(v => `<a href="/services/${v.slug}/">${esc(v.h1)}</a>`).join('')}</div>© S.PLAN Interior Design Co., Ltd. · ออกแบบ ตกแต่ง และรีโนเวทภายใน ตั้งแต่ปี 2014 · <a href="/">splaninteriordesign.com</a></footer>
</body>
</html>
`;
}

function cardHTML(p) {
  const img = p.cover || (p.images || [])[0];
  return `<a class="card" href="/works/${p.id}/"><img src="${esc(rel(img))}" alt="${esc(p.name)}" loading="lazy" width="400" height="300"><b>${esc(p.name)}</b><span>${esc(p.location)} · ${esc(p.style)} · ${esc(p.year)}</span></a>`;
}

function projectPage(p, all) {
  const url = `${SITE}/works/${p.id}/`;
  const svc = serviceTH(p);
  const imgs = (p.images || []).filter(Boolean);
  const cover = p.cover || (p.featured && p.featured.image) || imgs[0];
  const rest = imgs.filter(u => u !== cover);
  const pre = p.category === 'pre' || /ก่อนก่อตั้ง/.test(p.service || '');
  const title = `${p.name} · ${p.location} | ผลงาน${svc} S.PLAN`;
  const desc = `ผลงาน${svc}${pre ? ' (ก่อนก่อตั้งบริษัท)' : ''} ${p.name} ${p.location} สไตล์ ${p.style} ปี ${p.year} โดย S.PLAN Interior Design บริษัทรับออกแบบ ตกแต่ง และรีโนเวทภายในที่กรุงเทพฯ ดูรูปผลงานทั้งหมด ${imgs.length} ภาพ`;
  const alt = i => `${p.name} ${p.location} ${p.style} ภาพที่ ${i + 1}`;
  const others = all.filter(x => x.id !== p.id);
  const same = others.filter(x => serviceTH(x) === svc);
  const pick = same.concat(others.filter(x => !same.includes(x))).slice(0, 6);
  const body = `
<div class="crumb"><a href="/">หน้าแรก</a> / <a href="/works/">ผลงาน</a> / ${esc(p.name)}</div>
<h1>${esc(p.name)}</h1>
<ul class="meta"><li>${esc(p.location)}</li><li>${esc(p.style)}</li><li>${esc(svc)}</li><li>ปี ${esc(p.year)}</li>${pre ? '<li>ผลงานก่อนก่อตั้งบริษัท</li>' : ''}</ul>
<p class="lead">${esc(svc)} ${esc(p.name)} ${esc(p.location)} ในสไตล์ ${esc(p.style)} โดยทีม S.PLAN Interior Design ดูแลตั้งแต่ออกแบบ เลือกวัสดุ ไปจนถึงงานติดตั้งหน้างาน</p>
${cover ? `<img class="hero" src="${esc(rel(cover))}" alt="${esc(alt(0))}" width="1600" height="1000" fetchpriority="high">` : ''}
<div class="grid">${rest.map((u, i) => `<img src="${esc(rel(u))}" alt="${esc(alt(i + 1))}" loading="lazy" width="800" height="600">`).join('')}</div>
${(() => { const rel = SERVICES.filter(v => v.projects.includes(p.id)); return rel.length ? `<h2>บริการที่เกี่ยวข้อง</h2><div class="svc">${rel.map(v => `<a href="/services/${v.slug}/">${esc(v.h1)}</a>`).join('')}</div>` : ''; })()}
<h2>ผลงานอื่นของ S.PLAN</h2>
<div class="cards">${pick.map(cardHTML).join('')}</div>`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'CreativeWork', name: p.name, url, dateCreated: String(p.year), description: desc, image: imgs.slice(0, 10).map(abs), locationCreated: { '@type': 'Place', name: p.location }, creator: { '@id': SITE + '/#org' }, genre: p.style },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'หน้าแรก', item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: 'ผลงาน', item: SITE + '/works/' },
        { '@type': 'ListItem', position: 3, name: p.name, item: url }] },
      { '@type': 'Organization', '@id': SITE + '/#org', name: 'S.PLAN Interior Design', url: SITE + '/' }
    ]
  };
  return shell({ title, desc, url, image: abs(cover), body, ld });
}

function listPage(all) {
  const url = SITE + '/works/';
  const title = 'ผลงานออกแบบ ตกแต่ง และรีโนเวทภายใน | S.PLAN Interior Design';
  const desc = `รวมผลงาน ${all.length} โครงการของ S.PLAN Interior Design ทั้งบ้าน คอนโด ออฟฟิศ โชว์รูม และโรงพยาบาล ออกแบบ ตกแต่ง และรีโนเวทภายใน ตั้งแต่ปี 2014`;
  const body = `
<div class="crumb"><a href="/">หน้าแรก</a> / ผลงาน</div>
<h1>ผลงานของเรา</h1>
<p class="lead">${esc(desc)}</p>
<div class="cards">${all.map(cardHTML).join('')}</div>`;
  const ld = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, url, description: desc,
    hasPart: all.map(p => ({ '@type': 'CreativeWork', name: p.name, url: `${SITE}/works/${p.id}/` })) };
  return shell({ title, desc, url, image: abs(all[0] && (all[0].cover || (all[0].images || [])[0])), body, ld });
}


const STEPS = [
  ['คุยสโคปงานและสำรวจหน้างาน', 'ฟังโจทย์ สไตล์ที่ชอบ และงบคร่าว ๆ แล้ววัดพื้นที่จริง ดูโครงสร้างและงานระบบ เพื่อประเมินราคาเบื้องต้น'],
  ['นำเสนอมู้ดบอร์ดและภาพ 3D', 'รวมโทนสี วัสดุ และเฟอร์นิเจอร์ วางผังการใช้งาน แล้วทำภาพ 3D เสมือนจริงให้เห็นก่อนสร้าง'],
  ['ปรับแบบและสรุปงบประมาณ', 'ปรับแบบจนลงตัว ทำแบบก่อสร้าง (Shop Drawing) สเปกวัสดุ และใบเสนอราคาแยกรายการ'],
  ['ผลิตและติดตั้ง คุมงานหน้างาน', 'ทีมช่างและทีมเฟอร์นิเจอร์ของเราเองผลิตและติดตั้ง ใช้วัสดุได้มาตรฐาน คุมงานตั้งแต่เริ่มจนเสร็จ'],
  ['ตรวจรับและส่งมอบ', 'เดินตรวจงานกับคุณทีละจุด เก็บรายละเอียดให้เรียบร้อย แล้วส่งมอบพื้นที่']
];

function servicePage(v, all) {
  const url = `${SITE}/services/${v.slug}/`;
  const works = v.projects.map(id => all.find(p => p.id === id)).filter(Boolean);
  const img = works[0] && (works[0].cover || (works[0].images || [])[0]);
  const others = SERVICES.filter(x => x !== v);
  const body = `
<div class="crumb"><a href="/">หน้าแรก</a> / <a href="/services/">บริการ</a> / ${esc(v.h1)}</div>
<h1>${esc(v.h1)}</h1>
${v.intro.map(t => `<p class="lead">${esc(t)}</p>`).join('')}
${img ? `<img class="hero" src="${esc(rel(img))}" alt="${esc(v.h1 + ' ผลงาน ' + works[0].name)}" width="1600" height="1000" fetchpriority="high">` : ''}
<h2>ทำไมเลือก S.PLAN</h2>
<div class="pts">${v.points.map(([a, b]) => `<div class="pt"><b>${esc(a)}</b><span>${esc(b)}</span></div>`).join('')}</div>
<h2>ขั้นตอนการทำงาน 5 ขั้นตอน</h2>
<ol class="steps">${STEPS.map(([a, b]) => `<li><b>${esc(a)}</b><br><span style="color:var(--mute)">${esc(b)}</span></li>`).join('')}</ol>
${works.length ? `<h2>ผลงานที่เกี่ยวข้อง</h2><div class="cards">${works.map(cardHTML).join('')}</div>` : ''}
<h2>คำถามที่พบบ่อย</h2>
${v.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}
<h2>บริการอื่นของเรา</h2>
<div class="svc">${others.map(x => `<a href="/services/${x.slug}/">${esc(x.h1)}</a>`).join('')}</div>`;
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Service', name: v.h1, serviceType: v.keyword, url, description: v.desc, provider: { '@id': SITE + '/#org' },
      areaServed: ['กรุงเทพมหานคร', 'นนทบุรี', 'ปทุมธานี', 'สมุทรปราการ', 'Thailand'], image: img ? abs(img) : undefined },
    { '@type': 'FAQPage', mainEntity: v.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'หน้าแรก', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'บริการ', item: SITE + '/services/' },
      { '@type': 'ListItem', position: 3, name: v.h1, item: url }] },
    { '@type': 'Organization', '@id': SITE + '/#org', name: 'S.PLAN Interior Design', url: SITE + '/' }
  ] };
  return shell({ title: v.title, desc: v.desc, url, image: abs(img), body, ld });
}

function servicesHub(all) {
  const url = SITE + '/services/';
  const title = 'บริการออกแบบ ตกแต่ง และรีโนเวทภายใน | S.PLAN Interior Design';
  const desc = 'บริการของ S.PLAN Interior Design ออกแบบภายในคอนโด บ้าน ออฟฟิศ และโชว์รูม รับตั้งแต่ออกแบบอย่างเดียว ออกแบบพร้อมตกแต่ง ไปจนถึงออกแบบพร้อมรีโนเวท ตั้งแต่ปี 2014';
  const body = `
<div class="crumb"><a href="/">หน้าแรก</a> / บริการ</div>
<h1>บริการของเรา</h1>
<p class="lead">${esc(desc)}</p>
<div class="cards">${SERVICES.map(v => { const p = all.find(x => v.projects.includes(x.id)); const img = p && (p.cover || (p.images || [])[0]);
  return `<a class="card" href="/services/${v.slug}/"><img src="${esc(rel(img))}" alt="${esc(v.h1)}" loading="lazy" width="400" height="300"><b>${esc(v.h1)}</b><span>${esc(v.desc.slice(0, 80))}…</span></a>`; }).join('')}</div>`;
  const ld = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, url, description: desc };
  return shell({ title, desc, url, image: abs((all[0] || {}).cover), body, ld });
}

(async () => {
  const all = (await loadProjects()).filter(p => p && /^[a-z0-9-]+$/.test(p.id || ''));
  const out = path.join(__dirname, 'works');
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(out, { recursive: true });
  for (const p of all) {
    fs.mkdirSync(path.join(out, p.id), { recursive: true });
    fs.writeFileSync(path.join(out, p.id, 'index.html'), projectPage(p, all));
  }
  fs.writeFileSync(path.join(out, 'index.html'), listPage(all));
  const sout = path.join(__dirname, 'services');
  fs.rmSync(sout, { recursive: true, force: true });
  for (const v of SERVICES) {
    fs.mkdirSync(path.join(sout, v.slug), { recursive: true });
    fs.writeFileSync(path.join(sout, v.slug, 'index.html'), servicePage(v, all));
  }
  fs.writeFileSync(path.join(sout, 'index.html'), servicesHub(all));
  const urls = [[SITE + '/', '1.0'], [SITE + '/services/', '0.9']].concat(SERVICES.map(v => [`${SITE}/services/${v.slug}/`, '0.9'])).concat([[SITE + '/works/', '0.8']]).concat(all.map(p => [`${SITE}/works/${p.id}/`, '0.6']));
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map(([u, pr]) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod><priority>${pr}</priority></url>`).join('\n') +
    '\n</urlset>\n');
  console.log('built', all.length, 'project pages,', SERVICES.length, 'service pages + sitemap.xml');
})().catch(e => { console.error(e); process.exit(1); });
