/* S.PLAN edit mode: open the site with ?edit=1 while signed in as admin.
   Two modes:
   - แก้ข้อความ: click any text to type over it, click any picture to replace it.
   - จัดตำแหน่ง: click anything to select it, drag to move, slider to resize, hide or reset it.
   Press บันทึก to publish. Positions are kept separately for computer and phone screens. */
(function () {
  var CMS = window.SPLAN_CMS;
  var dirtyT = {}, dirtyI = {}, dirtyL = false;
  var sb, bar, msg, mode = 'text';
  var LAY = JSON.parse(JSON.stringify((window.SITE && window.SITE.layout) || {}));
  LAY.d = LAY.d || {}; LAY.m = LAY.m || {};

  var css = document.createElement('style');
  css.textContent =
    '.ed-bar{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:2147483000;display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center;' +
    'background:#1b1a18;color:#fff;padding:8px 10px;border-radius:22px;box-shadow:0 12px 40px rgba(0,0,0,.35);font:500 14px "IBM Plex Sans Thai",system-ui,sans-serif;max-width:calc(100vw - 20px);pointer-events:auto}' +
    '.ed-bar *{pointer-events:auto}.ed-bar b{font-weight:600;padding:0 4px}.ed-bar button,.ed-bar a{all:unset;cursor:pointer;padding:7px 12px;border-radius:999px;background:#ffffff1a;color:#fff;font:inherit;white-space:nowrap}' +
    '.ed-bar button:hover,.ed-bar a:hover{background:#ffffff33}.ed-bar .ed-save{background:#c41d22}.ed-bar .ed-save:hover{background:#a8161b}' +
    '.ed-bar .ed-on{background:#fff;color:#1b1a18}.ed-bar .ed-on:hover{background:#fff}' +
    '.ed-bar .ed-msg{opacity:.85;padding:0 6px;font-size:13px;flex-basis:100%;text-align:center}' +
    '.ed-row{display:flex;gap:6px;align-items:center;flex-wrap:wrap;justify-content:center}.ed-row.ed-x{display:none}' +
    '.ed-bar input[type=range]{width:130px;accent-color:#c41d22}' +
    '.ed-bar.ed-small .ed-row:not(:first-child),.ed-bar.ed-small .ed-msg{display:none!important}' +
    '.ed-seg{display:inline-flex;background:#ffffff14;border-radius:999px;padding:2px}' +
    'html.ed-text [data-e]{outline:1px dashed transparent;outline-offset:3px;transition:outline-color .15s;cursor:text}' +
    'html.ed-text [data-e]:hover{outline-color:#c41d22aa}html.ed-text [data-e]:focus{outline:2px solid #c41d22;background:#ffffffcc;color:#1b1a18}' +
    'html.ed-text [data-e].ed-dirty{outline:1px solid #c41d22}' +
    'html.ed-text img[data-i]{cursor:pointer;outline:2px dashed transparent;outline-offset:-2px}html.ed-text img[data-i]:hover{outline-color:#c41d22;filter:brightness(.85)}' +
    'html.ed-lay body *{pointer-events:auto!important;cursor:move!important;user-select:none!important}' +
    'html.ed-lay .ed-bar,html.ed-lay .ed-bar *{cursor:pointer!important;user-select:auto!important}' +
    'html.ed-lay body .ed-box,html.ed-lay body .ed-box *,html.ed-lay body .ed-hover{pointer-events:none!important}' +
    '.ed-box{position:fixed;z-index:2147482000;pointer-events:none!important;border:2px solid #c41d22;border-radius:4px;box-shadow:0 0 0 9999px rgba(0,0,0,.08);display:none}' +
    '.ed-box span{position:absolute;left:-2px;top:-24px;background:#c41d22;color:#fff;font:500 12px "IBM Plex Sans Thai",system-ui,sans-serif;padding:2px 8px;border-radius:4px 4px 4px 0;white-space:nowrap}' +
    '.ed-hover{position:fixed;z-index:2147481000;pointer-events:none!important;border:1px dashed #c41d22;display:none}';
  document.head.appendChild(css);

  function say(t) { if (msg) msg.textContent = t; }
  function dirty() { return Object.keys(dirtyT).length || Object.keys(dirtyI).length || dirtyL; }

  function load(src) {
    return new Promise(function (ok, bad) {
      if (window.supabase) return ok();
      var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = bad; document.head.appendChild(s);
    });
  }

  /* ---------- uploads ---------- */
  function shrink(file, max) {
    max = max || 2400;
    return new Promise(function (ok) {
      if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return ok(file);
      var img = new Image(); var u = URL.createObjectURL(file);
      img.onload = function () {
        var s = Math.min(1, max / Math.max(img.width, img.height));
        var c = document.createElement('canvas'); c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(u);
        var keepPng = file.type === 'image/png';   // logos keep their transparent background
        c.toBlob(function (b) { ok(b && b.size < file.size ? new File([b], file.name.replace(/\.\w+$/, '') + '.webp', { type: 'image/webp' }) : file); }, 'image/webp', keepPng ? 0.95 : 0.86);
      };
      img.onerror = function () { ok(file); };
      img.src = u;
    });
  }
  function upload(file, folder) {
    return shrink(file).then(function (f) {
      var ext = (f.name.split('.').pop() || 'webp').toLowerCase().replace(/[^a-z0-9]/g, '');
      var path = folder + '/' + Date.now() + '-' + Math.random().toString(36).slice(2, 7) + '.' + ext;
      return sb.storage.from('media').upload(path, f, { contentType: f.type, upsert: false }).then(function (r) {
        if (r.error) throw r.error;
        return sb.storage.from('media').getPublicUrl(path).data.publicUrl;
      });
    });
  }
  function pick(cb) {
    var i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*';
    i.onchange = function () { if (i.files[0]) cb(i.files[0]); };
    i.click();
  }

  /* ---------- text mode ---------- */
  function textOn(on) {
    document.querySelectorAll('[data-e]').forEach(function (el) {
      if (on) { el.contentEditable = 'true'; el.spellcheck = false; } else el.removeAttribute('contenteditable');
    });
  }
  function wireText() {
    document.querySelectorAll('[data-e]').forEach(function (el) {
      el.addEventListener('input', function () { dirtyT[el.dataset.e] = 1; el.classList.add('ed-dirty'); say('มีการแก้ไขที่ยังไม่บันทึก'); });
      el.addEventListener('keydown', function (e) { if (mode === 'text' && e.key === 'Enter' && !e.shiftKey && el.tagName !== 'P') { e.preventDefault(); document.execCommand('insertLineBreak'); } });
      el.addEventListener('paste', function (e) {
        if (mode !== 'text') return;
        e.preventDefault();
        document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text/plain'));
      });
    });
  }
  function onTextClick(e) {
    var img = e.target.closest('img[data-i]');
    if (img) {
      e.preventDefault(); e.stopPropagation();
      pick(function (f) {
        say('กำลังอัปโหลดรูป…');
        upload(f, 'site').then(function (url) { img.src = url; img.removeAttribute('srcset'); dirtyI[img.dataset.i] = url; say('เปลี่ยนรูปแล้ว กด บันทึก'); })
          .catch(function (err) { say('อัปโหลดไม่สำเร็จ: ' + (err.message || err)); });
      });
      return;
    }
    if (e.target.closest('[data-e]') && e.target.closest('a,button')) e.preventDefault();
  }

  /* ---------- layout mode ---------- */
  var box, hover, sel = null, stack = [], stackIdx = 0, lastPt = null, drag = null;
  var SKIP = /^(HTML|BODY|MAIN|SECTION|HEADER|FOOTER|NAV|SCRIPT|STYLE)$/;
  var NAMES = { IMG: 'รูป', SVG: 'ภาพเวกเตอร์', CANVAS: 'ภาพวาด', A: 'ลิงก์/ปุ่ม', BUTTON: 'ปุ่ม', P: 'ย่อหน้า', H1: 'หัวข้อ', H2: 'หัวข้อ', H3: 'หัวข้อย่อย', SPAN: 'ข้อความ', DIV: 'กล่อง', FIGURE: 'กรอบรูป', UL: 'รายการ', LI: 'รายการย่อย', FORM: 'ฟอร์ม', ARTICLE: 'การ์ด' };

  function cur() { return LAY[CMS.bp()]; }
  function valOf(el) { return cur()[CMS.keyOf(el)] || {}; }
  function setVal(el, v) {
    var k = CMS.keyOf(el), set = cur();
    if (!v.x && !v.y && (!v.s || v.s === 1) && !v.h) delete set[k]; else set[k] = v;
    CMS.setOne(el, set[k] || null);
    dirtyL = true;
  }
  function inEditor(n) { return n.closest && (n.closest('.ed-bar') || n.closest('.ed-box') || n.closest('.ed-hover')); }
  function candidates(x, y) {
    return document.elementsFromPoint(x, y).filter(function (n) {
      if (inEditor(n) || SKIP.test(n.tagName.toUpperCase())) return false;
      var r = n.getBoundingClientRect();
      return r.width > 4 && r.height > 4 && !(r.width >= innerWidth - 2 && r.height >= innerHeight - 2);
    }).map(function (n) { return n.closest('svg') && n.tagName.toLowerCase() !== 'svg' ? n.closest('svg') : n; })
      .filter(function (n, i, a) { return a.indexOf(n) === i; });
  }
  function label(el) {
    var t = NAMES[el.tagName.toUpperCase()] || 'ส่วนประกอบ';
    var txt = (el.textContent || el.getAttribute('alt') || '').trim().replace(/\s+/g, ' ').slice(0, 24);
    var v = valOf(el), extra = v.s && v.s !== 1 ? ' · ' + Math.round(v.s * 100) + '%' : '';
    return t + (txt ? ': ' + txt : '') + extra;
  }
  function select(el) {
    sel = el;
    var v = valOf(el);
    bar.querySelector('.ed-size').value = Math.round((v.s || 1) * 100);
    bar.querySelector('.ed-sizev').textContent = Math.round((v.s || 1) * 100) + '%';
    bar.querySelector('.ed-layrow').classList.remove('ed-x');
    say('ลากเพื่อย้าย · ปุ่มลูกศรขยับทีละนิด · คลิกซ้ำที่เดิมเพื่อเลือกชิ้นที่อยู่ข้างใต้');
  }
  function draw() {
    if (mode === 'lay' && sel && document.contains(sel)) {
      var r = sel.getBoundingClientRect();
      box.style.cssText = 'display:block;left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px';
      box.firstChild.textContent = label(sel);
    } else box.style.display = 'none';
    requestAnimationFrame(draw);
  }
  function onLayDown(e) {
    if (inEditor(e.target) || e.button !== 0) return;
    e.preventDefault(); e.stopPropagation();
    var same = lastPt && Math.abs(lastPt.x - e.clientX) < 4 && Math.abs(lastPt.y - e.clientY) < 4;
    var c = candidates(e.clientX, e.clientY);
    if (!c.length) return;
    if (same && sel && c.indexOf(sel) > -1) { stackIdx = (c.indexOf(sel) + 1) % c.length; }
    else if (sel && c.indexOf(sel) > -1) { stackIdx = c.indexOf(sel); }
    else stackIdx = 0;
    stack = c; lastPt = { x: e.clientX, y: e.clientY };
    select(stack[stackIdx]);
    var v = valOf(sel);
    drag = { x0: e.clientX, y0: e.clientY, vx: v.x || 0, vy: v.y || 0, moved: false };
    try { document.documentElement.setPointerCapture && e.target.setPointerCapture(e.pointerId); } catch (err) {}
  }
  function onLayMove(e) {
    if (mode !== 'lay') return;
    if (drag) {
      var dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
      if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 3) return;
      drag.moved = true; lastPt = null;
      var v = valOf(sel), k = 100 / innerWidth;
      setVal(sel, { x: drag.vx + dx * k, y: drag.vy + dy * k, s: v.s, h: v.h });
      e.preventDefault();
      return;
    }
    if (inEditor(e.target)) { hover.style.display = 'none'; return; }
    var c = candidates(e.clientX, e.clientY)[0];
    if (c && c !== sel) { var r = c.getBoundingClientRect(); hover.style.cssText = 'display:block;left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px'; }
    else hover.style.display = 'none';
  }
  function onLayUp() { if (drag && drag.moved) say('ย้ายแล้ว กด บันทึก เมื่อพอใจ'); drag = null; }
  function block(e) { if (mode === 'lay' && !inEditor(e.target)) { e.preventDefault(); e.stopPropagation(); } }
  function onKey(e) {
    if (mode !== 'lay' || !sel || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    var step = (e.shiftKey ? 10 : 1) * 100 / innerWidth, v = valOf(sel), d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
    if (d) { e.preventDefault(); setVal(sel, { x: (v.x || 0) + d[0], y: (v.y || 0) + d[1], s: v.s, h: v.h }); }
    if (e.key === 'Escape') { sel = null; bar.querySelector('.ed-layrow').classList.add('ed-x'); }
  }

  function setMode(m) {
    mode = m;
    var h = document.documentElement;
    h.classList.toggle('ed-text', m === 'text');
    h.classList.toggle('ed-lay', m === 'lay');
    textOn(m === 'text');
    bar.querySelector('.ed-mt').classList.toggle('ed-on', m === 'text');
    bar.querySelector('.ed-ml').classList.toggle('ed-on', m === 'lay');
    bar.querySelector('.ed-textrow').classList.toggle('ed-x', m !== 'text');
    bar.querySelector('.ed-laybase').classList.toggle('ed-x', m !== 'lay');
    bar.querySelector('.ed-layrow').classList.toggle('ed-x', m !== 'lay' || !sel);
    hover.style.display = 'none';
    if (m === 'lay') say('คลิกสิ่งที่อยากย้าย แล้วลากไปวาง · กำลังจัดสำหรับ' + (CMS.bp() === 'm' ? 'มือถือ' : 'คอมพิวเตอร์'));
    else say('คลิกข้อความเพื่อพิมพ์ คลิกรูปเพื่อเปลี่ยน');
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  }

  function changeHero() {
    pick(function (f) {
      say('กำลังอัปโหลดภาพหน้าปก…');
      upload(f, 'site').then(function (url) {
        dirtyI.hero = url;
        var p = document.getElementById('heroPhoto'); if (p) p.style.backgroundImage = 'url("' + url + '")';
        say('เปลี่ยนภาพหน้าปกแล้ว กด บันทึก');
      }).catch(function (err) { say('อัปโหลดไม่สำเร็จ: ' + (err.message || err)); });
    });
  }

  function save() {
    if (!dirty()) { say('ยังไม่มีอะไรเปลี่ยน'); return; }
    var tk = Object.keys(dirtyT), ik = Object.keys(dirtyI);
    say('กำลังบันทึก…');
    sb.from('site_kv').select('key,value').in('key', ['texts', 'images']).then(function (r) {
      if (r.error) throw r.error;
      var cur = { texts: {}, images: {} };
      r.data.forEach(function (row) { cur[row.key] = row.value || {}; });
      tk.forEach(function (k) { var el = document.querySelector('[data-e="' + k + '"]'); if (el) cur.texts[k] = CMS.clean(el.innerHTML.trim()); });
      ik.forEach(function (k) { cur.images[k] = dirtyI[k]; });
      var rows = [{ key: 'texts', value: cur.texts }, { key: 'images', value: cur.images }];
      if (dirtyL) rows.push({ key: 'layout', value: LAY });
      return sb.from('site_kv').upsert(rows);
    }).then(function (r) {
      if (r && r.error) throw r.error;
      dirtyT = {}; dirtyI = {}; dirtyL = false;
      window.SITE = window.SITE || {}; window.SITE.layout = JSON.parse(JSON.stringify(LAY));
      document.querySelectorAll('.ed-dirty').forEach(function (e) { e.classList.remove('ed-dirty'); });
      try { localStorage.removeItem('splan-cms-v1'); } catch (e) {}
      say('บันทึกแล้ว ✓ ขึ้นเว็บจริงทันที');
    }).catch(function (err) { say('บันทึกไม่สำเร็จ: ' + (err.message || err)); });
  }

  function resetAll() {
    var what = mode === 'lay' ? 'คืนตำแหน่งและขนาดทุกชิ้นบน' + (CMS.bp() === 'm' ? 'มือถือ' : 'คอมพิวเตอร์') + 'กลับเป็นแบบเดิม?' : 'คืนข้อความและรูปที่แก้ไว้ทั้งหมดกลับเป็นค่าเริ่มต้นของเว็บ?';
    if (!confirm(what)) return;
    if (mode === 'lay') {
      LAY[CMS.bp()] = {}; window.SITE.layout = LAY; CMS.applyLayout(); dirtyL = true; sel = null;
      bar.querySelector('.ed-layrow').classList.add('ed-x');
      say('คืนตำแหน่งแล้ว กด บันทึก เพื่อใช้จริง'); return;
    }
    sb.from('site_kv').upsert([{ key: 'texts', value: {} }, { key: 'images', value: {} }]).then(function (r) {
      if (r.error) throw r.error;
      try { localStorage.removeItem('splan-cms-v1'); } catch (e) {}
      location.reload();
    }).catch(function (err) { say('ไม่สำเร็จ: ' + (err.message || err)); });
  }

  function buildBar(admin) {
    bar = document.createElement('div'); bar.className = 'ed-bar';
    if (!admin) {
      bar.innerHTML = '<b>โหมดแก้ไข</b><a href="admin/">เข้าสู่ระบบก่อน</a><a href="./">ออก</a>';
      document.body.appendChild(bar); return;
    }
    bar.innerHTML =
      '<div class="ed-row"><span class="ed-seg"><button class="ed-mt">แก้ข้อความ/รูป</button><button class="ed-ml">จัดตำแหน่ง</button></span>' +
      '<button class="ed-save">บันทึก</button><a href="admin/">หลังบ้าน</a><a href="./" class="ed-exit">ออก</a><button class="ed-min" title="ย่อแถบ">▾</button></div>' +
      '<div class="ed-row ed-textrow"><button class="ed-hero">เปลี่ยนภาพหน้าปก</button><button class="ed-reset">คืนข้อความเดิมทั้งหมด</button></div>' +
      '<div class="ed-row ed-laybase ed-x"><button class="ed-showall">แสดงชิ้นที่ซ่อนไว้</button><button class="ed-reset2">คืนตำแหน่งเดิมทั้งหมด</button></div>' +
      '<div class="ed-row ed-layrow ed-x"><span>ขนาด</span><input type="range" class="ed-size" min="30" max="250" step="1"><span class="ed-sizev">100%</span>' +
      '<button class="ed-parent">เลือกกรอบที่ใหญ่กว่า</button><button class="ed-hide">ซ่อนชิ้นนี้</button><button class="ed-one">คืนค่าชิ้นนี้</button></div>' +
      '<span class="ed-msg"></span>';
    document.body.appendChild(bar);
    msg = bar.querySelector('.ed-msg');
    box = document.createElement('div'); box.className = 'ed-box'; box.innerHTML = '<span></span>'; document.body.appendChild(box);
    hover = document.createElement('div'); hover.className = 'ed-hover'; document.body.appendChild(hover);

    bar.querySelector('.ed-mt').onclick = function () { setMode('text'); };
    bar.querySelector('.ed-ml').onclick = function () { setMode('lay'); };
    bar.querySelector('.ed-save').onclick = save;
    bar.querySelector('.ed-min').onclick = function () { var sm = bar.classList.toggle('ed-small'); this.textContent = sm ? '▴' : '▾'; };
    bar.querySelector('.ed-hero').onclick = changeHero;
    bar.querySelector('.ed-reset').onclick = resetAll;
    bar.querySelector('.ed-reset2').onclick = resetAll;
    bar.querySelector('.ed-size').oninput = function () {
      if (!sel) return; var v = valOf(sel), s = this.value / 100;
      bar.querySelector('.ed-sizev').textContent = this.value + '%';
      setVal(sel, { x: v.x, y: v.y, s: s, h: v.h });
    };
    bar.querySelector('.ed-parent').onclick = function () {
      if (!sel) return; var p = sel.parentElement;
      while (p && SKIP.test(p.tagName.toUpperCase())) p = null;
      if (p) select(p); else say('ชิ้นนี้ใหญ่สุดแล้ว');
    };
    bar.querySelector('.ed-hide').onclick = function () {
      if (!sel) return; var v = valOf(sel);
      setVal(sel, { x: v.x, y: v.y, s: v.s, h: true }); sel = null;
      bar.querySelector('.ed-layrow').classList.add('ed-x');
      say('ซ่อนแล้ว กด “แสดงชิ้นที่ซ่อนไว้” ถ้าอยากเอากลับ');
    };
    bar.querySelector('.ed-one').onclick = function () {
      if (!sel) return; setVal(sel, {}); select(sel); say('คืนค่าชิ้นนี้แล้ว');
    };
    bar.querySelector('.ed-showall').onclick = function () {
      var set = cur(), n = 0;
      Object.keys(set).forEach(function (k) { if (set[k].h) { delete set[k].h; n++; if (!set[k].x && !set[k].y && (!set[k].s || set[k].s === 1)) delete set[k]; } });
      window.SITE.layout = LAY; CMS.applyLayout(); if (n) dirtyL = true;
      say(n ? 'เอากลับมาแสดง ' + n + ' ชิ้น กด บันทึก' : 'ไม่มีชิ้นที่ซ่อนไว้');
    };
    bar.querySelector('.ed-exit').onclick = function (e) { if (dirty() && !confirm('ยังไม่ได้บันทึก ออกเลยไหม?')) e.preventDefault(); };
    window.addEventListener('beforeunload', function (e) { if (dirty()) { e.preventDefault(); e.returnValue = ''; } });

    document.addEventListener('click', function (e) {
      if (inEditor(e.target)) return;
      if (mode === 'lay') return block(e);
      onTextClick(e);
    }, true);
    document.addEventListener('pointerdown', function (e) { if (mode === 'lay') onLayDown(e); }, true);
    document.addEventListener('pointermove', onLayMove, true);
    document.addEventListener('pointerup', onLayUp, true);
    document.addEventListener('dragstart', block, true);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', function () { if (mode === 'lay') say('กำลังจัดสำหรับ' + (CMS.bp() === 'm' ? 'มือถือ' : 'คอมพิวเตอร์')); });

    window.SITE = window.SITE || {}; window.SITE.layout = LAY;
    wireText(); setMode('text'); draw();
  }

  load('vendor/supabase.js').then(function () {
    sb = window.supabase.createClient(CMS.url, CMS.key);
    return sb.auth.getSession();
  }).then(function (r) {
    var s = r.data && r.data.session;
    if (!s) return false;
    return sb.from('admins').select('user_id').eq('user_id', s.user.id).maybeSingle().then(function (a) { return !!(a.data); });
  }).then(function (isAdmin) {
    buildBar(isAdmin);
  }).catch(function (e) { console.error(e); buildBar(false); });
})();
