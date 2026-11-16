/* S.PLAN edit mode: open the site with ?edit=1 while signed in as admin.
   Click any text to type over it, click any picture to replace it, then press Save. */
(function () {
  var CMS = window.SPLAN_CMS;
  var dirtyT = {}, dirtyI = {};
  var sb, bar, msg;

  var css = document.createElement('style');
  css.textContent =
    '.ed-bar{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:99999;display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:center;' +
    'background:#1b1a18;color:#fff;padding:10px 12px;border-radius:999px;box-shadow:0 12px 40px rgba(0,0,0,.35);font:500 14px "IBM Plex Sans Thai",system-ui,sans-serif;max-width:calc(100vw - 24px)}' +
    '.ed-bar b{font-weight:600;padding:0 6px}.ed-bar button,.ed-bar a{all:unset;cursor:pointer;padding:8px 14px;border-radius:999px;background:#ffffff1a;color:#fff;font:inherit;white-space:nowrap}' +
    '.ed-bar button:hover,.ed-bar a:hover{background:#ffffff33}.ed-bar .ed-save{background:#c41d22}.ed-bar .ed-save:hover{background:#a8161b}' +
    '.ed-bar .ed-msg{opacity:.8;padding:0 6px;font-size:13px}' +
    'html.ed [data-e]{outline:1px dashed transparent;outline-offset:3px;transition:outline-color .15s;cursor:text}' +
    'html.ed [data-e]:hover{outline-color:#c41d22aa}html.ed [data-e]:focus{outline:2px solid #c41d22;background:#ffffffcc;color:#1b1a18}' +
    'html.ed [data-e].ed-dirty{outline:1px solid #c41d22}' +
    'html.ed img[data-i]{cursor:pointer;outline:2px dashed transparent;outline-offset:-2px}html.ed img[data-i]:hover{outline-color:#c41d22;filter:brightness(.85)}' +
    '.ed-tip{position:fixed;z-index:99999;top:14px;left:50%;transform:translateX(-50%);background:#fff;color:#1b1a18;padding:8px 14px;border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,.2);font:400 13px "IBM Plex Sans Thai",system-ui,sans-serif}';
  document.head.appendChild(css);

  function say(t) { if (msg) msg.textContent = t; }

  function load(src) {
    return new Promise(function (ok, bad) {
      if (window.supabase) return ok();
      var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = bad; document.head.appendChild(s);
    });
  }

  // Shrink large photos in the browser before upload (max 2400px, WebP).
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
        c.toBlob(function (b) { ok(b && b.size < file.size ? new File([b], file.name.replace(/\.\w+$/, '') + '.webp', { type: 'image/webp' }) : file); }, 'image/webp', 0.86);
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

  function enable() {
    document.documentElement.classList.add('ed');
    document.querySelectorAll('[data-e]').forEach(function (el) {
      el.contentEditable = 'true';
      el.spellcheck = false;
      el.addEventListener('input', function () { dirtyT[el.dataset.e] = 1; el.classList.add('ed-dirty'); say('มีการแก้ไขที่ยังไม่บันทึก'); });
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey && el.tagName !== 'P') { e.preventDefault(); document.execCommand('insertLineBreak'); } });
      el.addEventListener('paste', function (e) {
        e.preventDefault();
        document.execCommand('insertText', false, (e.clipboardData || window.clipboardData).getData('text/plain'));
      });
    });
    // While editing, clicks on links and buttons should not navigate.
    document.addEventListener('click', function (e) {
      if (e.target.closest('.ed-bar')) return;
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
    }, true);
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
    var tk = Object.keys(dirtyT), ik = Object.keys(dirtyI);
    if (!tk.length && !ik.length) { say('ยังไม่มีอะไรเปลี่ยน'); return; }
    say('กำลังบันทึก…');
    sb.from('site_kv').select('key,value').in('key', ['texts', 'images']).then(function (r) {
      if (r.error) throw r.error;
      var cur = { texts: {}, images: {} };
      r.data.forEach(function (row) { cur[row.key] = row.value || {}; });
      tk.forEach(function (k) { var el = document.querySelector('[data-e="' + k + '"]'); if (el) cur.texts[k] = CMS.clean(el.innerHTML.trim()); });
      ik.forEach(function (k) { cur.images[k] = dirtyI[k]; });
      return sb.from('site_kv').upsert([{ key: 'texts', value: cur.texts }, { key: 'images', value: cur.images }]);
    }).then(function (r) {
      if (r && r.error) throw r.error;
      dirtyT = {}; dirtyI = {};
      document.querySelectorAll('.ed-dirty').forEach(function (e) { e.classList.remove('ed-dirty'); });
      try { localStorage.removeItem('splan-cms-v1'); } catch (e) {}
      say('บันทึกแล้ว ✓ ขึ้นเว็บจริงทันที');
    }).catch(function (err) { say('บันทึกไม่สำเร็จ: ' + (err.message || err)); });
  }

  function resetText() {
    if (!confirm('คืนข้อความและรูปที่แก้ไว้ทั้งหมดกลับเป็นค่าเริ่มต้นของเว็บ?')) return;
    sb.from('site_kv').upsert([{ key: 'texts', value: {} }, { key: 'images', value: {} }]).then(function (r) {
      if (r.error) throw r.error;
      try { localStorage.removeItem('splan-cms-v1'); } catch (e) {}
      location.reload();
    }).catch(function (err) { say('ไม่สำเร็จ: ' + (err.message || err)); });
  }

  function buildBar(admin) {
    bar = document.createElement('div'); bar.className = 'ed-bar';
    if (!admin) {
      bar.innerHTML = '<b>โหมดแก้ไข</b><span class="ed-msg">ต้องเข้าสู่ระบบก่อน</span><a href="admin/">ไปหน้าเข้าสู่ระบบ</a><a href="./">ออก</a>';
      document.body.appendChild(bar); return;
    }
    bar.innerHTML = '<b>โหมดแก้ไข</b><button class="ed-save">บันทึก</button><button class="ed-hero">เปลี่ยนภาพหน้าปก</button>' +
      '<a href="admin/">หลังบ้าน</a><a href="./" class="ed-exit">ออก</a><button class="ed-reset" title="คืนค่าข้อความเดิม">คืนค่าเดิม</button><span class="ed-msg">คลิกข้อความเพื่อพิมพ์ คลิกรูปเพื่อเปลี่ยน</span>';
    document.body.appendChild(bar);
    msg = bar.querySelector('.ed-msg');
    bar.querySelector('.ed-save').onclick = save;
    bar.querySelector('.ed-hero').onclick = changeHero;
    bar.querySelector('.ed-reset').onclick = resetText;
    bar.querySelector('.ed-exit').onclick = function (e) {
      if ((Object.keys(dirtyT).length || Object.keys(dirtyI).length) && !confirm('ยังไม่ได้บันทึก ออกเลยไหม?')) e.preventDefault();
    };
    window.addEventListener('beforeunload', function (e) { if (Object.keys(dirtyT).length || Object.keys(dirtyI).length) { e.preventDefault(); e.returnValue = ''; } });
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
    if (isAdmin) enable();
  }).catch(function (e) { console.error(e); buildBar(false); });
})();
