/* S.PLAN content loader.
   Reads texts, images, section order, theme, contact details and projects from Supabase,
   applies them to the page, then starts the page script (window.__splanMain).
   If Supabase cannot be reached, the page runs with the content built into index.html and projects.js. */
(function () {
  var CMS = window.SPLAN_CMS = {
    url: 'https://zddtttxnrdciyjlfqlyp.supabase.co',
    key: 'sb_publishable_WFlbwDJFxwt7-RgcA1lChQ_92tvUvzf'
  };
  var CACHE_KEY = 'splan-cms-v1';
  var started = false;
  var FONTS = {
    'Michroma': 'Michroma', 'IBM Plex Sans Thai': 'IBM+Plex+Sans+Thai:wght@300;400;500;600',
    'Prompt': 'Prompt:wght@300;400;500;600', 'Kanit': 'Kanit:wght@300;400;500;600', 'Sarabun': 'Sarabun:wght@300;400;500;600',
    'Noto Sans Thai': 'Noto+Sans+Thai:wght@300;400;500;600', 'Anuphan': 'Anuphan:wght@300;400;500;600',
    'Bai Jamjuree': 'Bai+Jamjuree:wght@300;400;500;600', 'Mitr': 'Mitr:wght@300;400;500;600', 'Chakra Petch': 'Chakra+Petch:wght@300;400;500;600',
    'Montserrat': 'Montserrat:wght@400;500;600;700', 'Playfair Display': 'Playfair+Display:wght@400;500;600;700',
    'Cormorant Garamond': 'Cormorant+Garamond:wght@400;500;600', 'Poppins': 'Poppins:wght@300;400;500;600'
  };
  CMS.FONTS = FONTS;

  function start() {
    if (started) return;
    started = true;
    document.documentElement.classList.remove('cms-wait');
    if (typeof window.__splanMain === 'function') window.__splanMain();
    if (/[?&]edit=1/.test(location.search)) {
      var s = document.createElement('script'); s.src = 'edit.js'; document.body.appendChild(s);
    }
  }

  // Only a small, safe set of tags and attributes may come back from the database.
  var OK_TAGS = { EM: 1, I: 1, B: 1, STRONG: 1, BR: 1, SPAN: 1, A: 1, SMALL: 1, U: 1 };
  var OK_ATTR = { 'class': 1, 'id': 1, 'href': 1, 'target': 1, 'rel': 1, 'lang': 1, 'aria-hidden': 1, 'data-auto': 1 };
  function clean(html) {
    var t = document.createElement('template'); t.innerHTML = String(html);
    (function walk(n) {
      Array.prototype.slice.call(n.childNodes).forEach(function (c) {
        if (c.nodeType === 1) {
          if (/^(SCRIPT|STYLE|IFRAME|OBJECT|TEMPLATE|NOSCRIPT)$/.test(c.tagName)) { c.remove(); return; }
          if (!OK_TAGS[c.tagName]) { c.replaceWith(document.createTextNode(c.textContent)); return; }
          Array.prototype.slice.call(c.attributes).forEach(function (a) {
            if (!OK_ATTR[a.name] || (a.name === 'href' && /^\s*javascript:/i.test(a.value))) c.removeAttribute(a.name);
          });
          walk(c);
        } else if (c.nodeType !== 3) c.remove();
      });
    })(t.content);
    return t.innerHTML;
  }
  CMS.clean = clean;

  function applyTheme(th) {
    if (!th) return;
    var r = document.documentElement.style;
    var map = { brand: '--brand', brand_ink: '--brand-ink', tone: '--tone', tone_2: '--tone-2', tone_line: '--tone-line', paper: '--void', paper_2: '--void-2', ink: '--stone', ink_2: '--dust' };
    Object.keys(map).forEach(function (k) { if (th[k]) r.setProperty(map[k], th[k]); });
    if (th.tone && !th.tone_2) r.setProperty('--tone-2', th.tone);
    var fams = [];
    if (th.font_display && FONTS[th.font_display]) { r.setProperty('--font-display', '"' + th.font_display + '",sans-serif'); fams.push(FONTS[th.font_display]); }
    if (th.font_body && FONTS[th.font_body]) { r.setProperty('--font-sans', '"' + th.font_body + '","Leelawadee UI","Thonburi",system-ui,sans-serif'); fams.push(FONTS[th.font_body]); }
    if (fams.length && !document.getElementById('cms-fonts')) {
      var l = document.createElement('link'); l.id = 'cms-fonts'; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=' + fams.join('&family=') + '&display=swap';
      document.head.appendChild(l);
    }
    if (th.scale) document.documentElement.style.fontSize = (Number(th.scale) || 100) + '%';
  }

  function applySections(list) {
    if (!Array.isArray(list) || !list.length) return;
    var main = document.querySelector('main'); if (!main) return;
    var nodes = {};
    document.querySelectorAll('section[data-sec]').forEach(function (s) { nodes[s.dataset.sec] = s; });
    list.forEach(function (it) {
      var s = nodes[it.key]; if (!s) return;
      main.appendChild(s);
      s.hidden = it.visible === false;
      if (it.visible === false) s.style.display = 'none'; else s.style.display = '';
      if (it.tone === 'gray') s.setAttribute('data-tone', 'red'); else if (it.tone === 'white') s.removeAttribute('data-tone');
    });
    // sections not in the list keep their place at the end
  }

  function applyContact(c) {
    if (!c) return;
    if (c.line_url) document.querySelectorAll('a[href^="https://lin.ee/"]').forEach(function (a) { a.href = c.line_url; });
    if (c.email) document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) { a.href = 'mailto:' + c.email; });
    var swap = [['@584gwkoy', c.line_id], ['splaninterior@gmail.com', c.email]].filter(function (p) { return p[1] && p[1] !== p[0]; });
    if (!swap.length) return;
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) swap.forEach(function (p) { if (n.nodeValue.indexOf(p[0]) > -1) n.nodeValue = n.nodeValue.split(p[0]).join(p[1]); });
  }

  function applyTexts(t) {
    if (!t) return;
    Object.keys(t).forEach(function (k) {
      var el = document.querySelector('[data-e="' + k + '"]');
      if (el && typeof t[k] === 'string') el.innerHTML = clean(t[k]);
    });
  }

  function applyImages(m) {
    if (!m) return;
    Object.keys(m).forEach(function (k) {
      if (!m[k]) return;
      if (k === 'hero') {
        var p = document.getElementById('heroPhoto');
        if (p) p.style.backgroundImage = 'url("' + String(m[k]).replace(/"/g, '%22') + '")';
        return;
      }
      var el = document.querySelector('[data-i="' + k + '"]');
      if (el) { el.src = m[k]; el.removeAttribute('srcset'); }
    });
  }

  function applyProjects(rows) {
    if (!Array.isArray(rows) || !rows.length) return;
    window.PROJECTS = rows.filter(function (r) { return r.published !== false; }).map(function (r) {
      var p = { id: r.id, year: r.year, name: r.name, location: r.location, style: r.style, service: r.service, images: r.images || [] };
      if (r.category) p.category = r.category;
      if (r.cover) p.cover = r.cover;
      if (r.featured) p.featured = r.featured;
      if (r.images3d) p.images3d = r.images3d;
      if (r.pairs) p.pairs = r.pairs;
      return p;
    });
  }

  function apply(d, full) {
    if (!d) return;
    window.SITE = d.kv || {};
    try { applyTheme(window.SITE.theme); } catch (e) { console.warn(e); }
    try { applyTexts(window.SITE.texts); } catch (e) { console.warn(e); }
    try { applyImages(window.SITE.images); } catch (e) { console.warn(e); }
    try { applyContact(window.SITE.contact); } catch (e) { console.warn(e); }
    if (full) {
      try { applySections(window.SITE.sections); } catch (e) { console.warn(e); }
      try { applyProjects(d.projects); } catch (e) { console.warn(e); }
    }
  }
  CMS.apply = apply;

  function fetchAll() {
    var h = { apikey: CMS.key, Authorization: 'Bearer ' + CMS.key };
    var ctl = 'AbortController' in window ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 4000);
    var opt = { headers: h, signal: ctl ? ctl.signal : undefined, cache: 'no-store' };
    return Promise.all([
      fetch(CMS.url + '/rest/v1/site_kv?select=key,value', opt).then(function (r) { if (!r.ok) throw r.status; return r.json(); }),
      fetch(CMS.url + '/rest/v1/projects?select=*&order=sort_index.asc', opt).then(function (r) { if (!r.ok) throw r.status; return r.json(); })
    ]).then(function (res) {
      clearTimeout(timer);
      var kv = {}; res[0].forEach(function (row) { kv[row.key] = row.value; });
      return { kv: kv, projects: res[1], at: Date.now() };
    });
  }

  var cached = null;
  try { cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); } catch (e) {}

  if (cached) {
    apply(cached, true);
    start();
    fetchAll().then(function (d) {
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(d)); } catch (e) {}
      apply(d, false);            // texts, images, theme, contact update now; order and projects on next visit
    }).catch(function () {});
  } else {
    fetchAll().then(function (d) {
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(d)); } catch (e) {}
      if (!started) apply(d, true);
    }).catch(function (e) { console.warn('CMS offline, using built-in content', e); })
      .then(start);
    setTimeout(start, 4200);
  }
})();
