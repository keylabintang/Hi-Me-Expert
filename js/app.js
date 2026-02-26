/* ─── Hi-Me Expert App Core ─── */

// ── State ──
const App = {
  expert: null,

  init() {
    const saved = localStorage.getItem('hime_expert');
    if (saved) this.expert = JSON.parse(saved);
  },

  login(expert) {
    this.expert = expert;
    localStorage.setItem('hime_expert', JSON.stringify(expert));
  },

  logout() {
    this.expert = null;
    localStorage.removeItem('hime_expert');
    go('landing');
  },

  isLoggedIn()  { return !!this.expert; },
  isActive()    { return this.expert?.status === 'active'; },
  isPending()   { return this.expert?.status === 'pending'; },
  isRejected()  { return this.expert?.status === 'rejected'; },
};

// ── Router ──
function detectAppRoot() {
  const scriptEl = Array.from(document.scripts).find(s => /\/js\/app\.js(\?.*)?$/.test(s.src || ''));
  if (scriptEl) return (scriptEl.src || '').replace(/\/js\/app\.js(\?.*)?$/, '');
  const href = window.location.href;
  const pagesIdx = href.indexOf('/pages/');
  if (pagesIdx >= 0) return href.slice(0, pagesIdx);
  return href.replace(/\/[^/]*$/, '');
}

const APP_ROOT = detectAppRoot();
const CANONICAL_ROUTES = {
  landing:   `${APP_ROOT}/index.html`,
  login:     `${APP_ROOT}/pages/auth/login.html`,
  register:  `${APP_ROOT}/pages/auth/register.html`,
  'register-professional': `${APP_ROOT}/pages/auth/register-professional.html`,
  'register-documents':    `${APP_ROOT}/pages/auth/register-documents.html`,
  'register-setup':        `${APP_ROOT}/pages/auth/register-setup.html`,
  pending:   `${APP_ROOT}/pages/auth/pending.html`,
  rejected:  `${APP_ROOT}/pages/auth/rejected.html`,
  dashboard: `${APP_ROOT}/pages/dashboard/index.html`,
  schedule:  `${APP_ROOT}/pages/schedule/index.html`,
  'chat-list': `${APP_ROOT}/pages/chat/index.html`,
  profile:   `${APP_ROOT}/pages/profile/index.html`,
};

const ROUTES = { ...CANONICAL_ROUTES };

function go(page, params = {}) {
  if (Object.keys(params).length) sessionStorage.setItem('hime_params', JSON.stringify(params));
  const href = CANONICAL_ROUTES[page] || ROUTES[page];
  if (!href) { console.warn('Unknown route:', page); return; }
  const resolved = /^(https?:|file:|\/|\.\.?\/)/.test(href) ? href : new URL(href, window.location.href).href;
  window.location.href = resolved;
}

function goBack() { history.back(); }

function getParams() {
  const raw = sessionStorage.getItem('hime_params');
  return raw ? JSON.parse(raw) : {};
}

// ── Toast ──
function toast(msg, duration = 2800) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.querySelector('.phone')?.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), duration);
}

// ── Sheet / Modal ──
function openSheet(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}
function closeSheet(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}
function overlayClick(e, id) {
  if (e.target === document.getElementById(id)) closeSheet(id);
}

// ── Helpers ──
function formatRupiah(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}
function formatDate(d) {
  return new Date(d).toLocaleDateString('id-ID', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
}
function timeNow() {
  return new Date().toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit', hour12:false });
}

// ── SVG Icon Builder ──
const ICON_PATHS = {
  home:       ['M3 9.5L12 3l9 6.5','M5 10v9h14v-9','M9 19v-6h6v6'],
  calendar:   ['M7 3v4','M17 3v4','M4 8h16','M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1z'],
  chat:       ['M4 5h16v10H7l-3 3V5z'],
  user:       ['M20 21a8 8 0 0 0-16 0','M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8'],
  bell:       ['M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8','M10 20a2 2 0 0 0 4 0'],
  check:      ['M20 6L9 17l-5-5'],
  'check-circle': ['M22 11.08V12a10 10 0 1 1-5.93-9.14','M22 4L12 14.01l-3-3'],
  x:          ['M18 6L6 18','M6 6l12 12'],
  'x-circle': ['M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z','M15 9l-6 6','M9 9l6 6'],
  eye:        ['M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z','M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6'],
  'eye-off':  ['M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94','M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19','M1 1l22 22'],
  lock:       ['M7 11V8a5 5 0 0 1 10 0v3','M5 11h14v10H5z'],
  upload:     ['M12 16V4','M7 9l5-5 5 5','M4 20h16'],
  file:       ['M6 2h9l5 5v15H6z','M15 2v5h5'],
  'file-text':['M6 2h9l5 5v15H6z','M15 2v5h5','M9 13h6','M9 17h4'],
  'file-check':['M6 2h9l5 5v15H6z','M15 2v5h5','M9 15l2 2 4-4'],
  shield:     ['M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z'],
  star:       ['M12 3l2.8 5.8L21 9.8l-4.5 4.4 1.1 6.3L12 17.8 6.4 20.5l1.1-6.3L3 9.8l6.2-1z'],
  award:      ['M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z','M8.21 13.89L7 23l5-3 5 3-1.21-9.12'],
  briefcase:  ['M20 7H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z','M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2'],
  'map-pin':  ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z','M12 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2'],
  clock:      ['M12 6v6l4 2','M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0'],
  dollar:     ['M12 2v20','M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'],
  trending:   ['M23 6l-9.5 9.5-5-5L1 18','M17 6h6v6'],
  settings:   ['M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z','M4.9 4.9l1.4 1.4','M17.7 17.7l1.4 1.4','M2 12h2','M20 12h2','M4.9 19.1l1.4-1.4','M17.7 6.3l1.4-1.4','M12 2v2','M12 20v2'],
  logout:     ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4','M16 17l5-5-5-5','M21 12H9'],
  info:       ['M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z','M12 16v-4','M12 8h.01'],
  refresh:    ['M23 4v6h-6','M1 20v-6h6','M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'],
  'chevron-right': ['M9 18l6-6-6-6'],
  'chevron-left':  ['M15 18l-6-6 6-6'],
  plus:       ['M12 5v14','M5 12h14'],
  minus:      ['M5 12h14'],
  search:     ['M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z','M21 21l-4.3-4.3'],
  edit:       ['M12 20h9','M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'],
  trash:      ['M3 6h18','M8 6V4h8v2','M6 6l1 14h10l1-14','M10 11v6','M14 11v6'],
  send:       ['M22 2L11 13','M22 2l-7 20-4-9-9-4z'],
  'alert-triangle': ['M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z','M12 9v4','M12 17h.01'],
  stethoscope:['M8 4v5a4 4 0 0 0 8 0V4','M16 13a4 4 0 0 0 4 4','M20 17a2 2 0 1 1-4 0'],
  users:      ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2','M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8','M23 21v-2a4 4 0 0 0-3-3.87','M16 3.13a4 4 0 0 1 0 7.75'],
};

function icon(name, size = 20, cls = '') {
  const paths = ICON_PATHS[name];
  if (!paths) return '';
  const d = paths.map(p => `<path d="${p}"/>`).join('');
  return `<svg class="icon-svg ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24">${d}</svg>`;
}

// ── Gradient Avatar ──
const GRAD_PAIRS = [
  ['#0F766E','#14B8A6'],['#7C3AED','#A78BFA'],['#0C4A47','#14B8A6'],
  ['#1E3A5F','#3B82F6'],['#065F46','#10B981'],['#4C1D95','#7C3AED'],
];
function avatarGrad(initials, size = 52, fontSize = 20) {
  const i = (initials.charCodeAt(0) || 0) % GRAD_PAIRS.length;
  const [c1, c2] = GRAD_PAIRS[i];
  const id = `ag${Math.random().toString(36).slice(2,7)}`;
  return `<div class="avatar" style="width:${size}px;height:${size}px;font-size:${fontSize}px;background:linear-gradient(135deg,${c1},${c2});color:white;">${initials}</div>`;
}

// ── Register State (cross-page) ──
const RegState = {
  save(data) { sessionStorage.setItem('hime_reg', JSON.stringify({ ...(this.load()||{}), ...data })); },
  load()     { try { return JSON.parse(sessionStorage.getItem('hime_reg')||'null'); } catch { return null; } },
  clear()    { sessionStorage.removeItem('hime_reg'); },
};

// ── Init ──
App.init();
