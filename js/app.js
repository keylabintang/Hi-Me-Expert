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
  dashboard:     `${APP_ROOT}/pages/dashboard/index.html`,
  notifications: `${APP_ROOT}/pages/notifications/index.html`,
  schedule:      `${APP_ROOT}/pages/schedule/index.html`,
  'session-detail': `${APP_ROOT}/pages/schedule/session-detail.html`,
  availability:  `${APP_ROOT}/pages/availability/index.html`,
  requests:    `${APP_ROOT}/pages/requests/index.html`,
  'chat-list': `${APP_ROOT}/pages/chat/index.html`,
  'chat-room': `${APP_ROOT}/pages/chat/room.html`,
  'call-room': `${APP_ROOT}/pages/chat/call.html`,
  'session-summary': `${APP_ROOT}/pages/session/summary.html`,
  'session-history': `${APP_ROOT}/pages/session/history.html`,
  profile:          `${APP_ROOT}/pages/profile/index.html`,
  'profile-edit':   `${APP_ROOT}/pages/profile/edit.html`,
  'profile-pricing':`${APP_ROOT}/pages/profile/pricing.html`,
  'profile-earnings':`${APP_ROOT}/pages/profile/earnings.html`,
  'profile-notifications':`${APP_ROOT}/pages/profile/notifications.html`,
  'profile-privacy':`${APP_ROOT}/pages/profile/privacy.html`,
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

// ── Mock Data (Phase 2.2) ──

const MOCK_EXPERT = {
  id: 'exp_001',
  name: 'Rina Kusuma',
  degree: 'M.Psi.',
  type: 'Psikolog',
  status: 'active',
  specializations: ['Kecemasan', 'Burnout', 'Depresi'],
  rating: 4.9,
  totalSessions: 142,
  experience: 6,
  onlineStatus: 'online',
  pricing: { chat30: 75000, chat60: 140000, call30: 85000, call60: 160000, offline: 200000 }
};

const MOCK_REQUESTS = [
  {
    id: 'req_001',
    userInitials: 'AN',
    userName: 'A*** N***',
    sessionType: 'Chat',
    date: 'Kamis, 27 Feb 2025',
    time: '14:00',
    duration: 60,
    price: 140000,
    requestedAt: '2 jam lalu',
    note: 'Saya sering merasa cemas berlebihan sebelum presentasi kerja dan sulit tidur.'
  },
  {
    id: 'req_002',
    userInitials: 'BY',
    userName: 'B*** Y***',
    sessionType: 'Call',
    date: 'Jumat, 28 Feb 2025',
    time: '10:00',
    duration: 30,
    price: 85000,
    requestedAt: '5 jam lalu',
    note: 'Butuh bantuan mengelola stres karena deadline pekerjaan yang menumpuk.'
  }
];

const MOCK_SESSIONS_TODAY = [
  {
    id: 'ses_001',
    userInitials: 'DS',
    userName: 'D*** S***',
    sessionType: 'Chat',
    time: '09:00',
    duration: 60,
    status: 'done'
  },
  {
    id: 'ses_002',
    userInitials: 'MR',
    userName: 'M*** R***',
    sessionType: 'Call',
    time: '11:00',
    duration: 30,
    status: 'active'
  },
  {
    id: 'ses_003',
    userInitials: 'FS',
    userName: 'F*** S***',
    sessionType: 'Chat',
    time: '14:00',
    duration: 60,
    status: 'upcoming'
  },
  {
    id: 'ses_004',
    userInitials: 'KP',
    userName: 'K*** P***',
    sessionType: 'Offline',
    time: '16:30',
    duration: 60,
    status: 'upcoming'
  }
];

const MOCK_EARNINGS_WEEKLY = [
  { day: 'Sen', amount: 280000 },
  { day: 'Sel', amount: 420000 },
  { day: 'Rab', amount: 140000 },
  { day: 'Kam', amount: 560000 },
  { day: 'Jum', amount: 385000 },
  { day: 'Sab', amount: 225000 },
  { day: 'Min', amount: 0 }
];

const MOCK_NOTIFICATIONS = [
  {
    id: 'notif_001',
    category: 'request',
    title: 'Request Sesi Baru',
    desc: 'A*** N*** mengajukan sesi Chat 60 menit untuk Kamis, 27 Feb pukul 14:00.',
    time: '2 jam lalu',
    read: false,
    route: 'requests'
  },
  {
    id: 'notif_002',
    category: 'payment',
    title: 'Pembayaran Terkonfirmasi',
    desc: 'Dana sebesar Rp 85.000 dari sesi Call bersama B*** Y*** telah masuk ke saldo Anda.',
    time: '5 jam lalu',
    read: false,
    route: 'earnings'
  },
  {
    id: 'notif_003',
    category: 'session',
    title: 'Pengingat Sesi',
    desc: 'Sesi Chat bersama F*** S*** akan dimulai dalam 30 menit (pukul 14:00).',
    time: '30 menit lalu',
    read: false,
    route: 'schedule'
  },
  {
    id: 'notif_004',
    category: 'rating',
    title: 'Rating Baru Masuk',
    desc: 'D*** S*** memberikan rating 5 bintang untuk sesi hari ini. "Sangat membantu!"',
    time: '1 jam lalu',
    read: true,
    route: 'history'
  },
  {
    id: 'notif_005',
    category: 'request',
    title: 'Request Sesi Baru',
    desc: 'B*** Y*** mengajukan sesi Call 30 menit untuk Jumat, 28 Feb pukul 10:00.',
    time: '5 jam lalu',
    read: true,
    route: 'requests'
  },
  {
    id: 'notif_006',
    category: 'system',
    title: 'Pembaruan Kebijakan Platform',
    desc: 'Hi-Me telah memperbarui Syarat & Ketentuan Mitra. Berlaku mulai 1 Maret 2025.',
    time: '1 hari lalu',
    read: true,
    route: null
  },
  {
    id: 'notif_007',
    category: 'payment',
    title: 'Pembayaran Terkonfirmasi',
    desc: 'Dana sebesar Rp 140.000 dari sesi Chat bersama D*** S*** telah masuk ke saldo Anda.',
    time: '2 jam lalu',
    read: true,
    route: 'earnings'
  },
  {
    id: 'notif_008',
    category: 'session',
    title: 'Sesi Terkonfirmasi',
    desc: 'Sesi Offline bersama K*** P*** pada Kamis, 27 Feb pukul 16:30 telah terkonfirmasi.',
    time: '3 jam lalu',
    read: true,
    route: 'schedule'
  }
];

// ── Mock Data (Phase 2.3) ──

const MOCK_SESSIONS_WEEK = [
  // Senin (index 0)
  { id: 'w_001', day: 0, userInitials: 'AR', userName: 'A*** R***', sessionType: 'Chat',    time: '09:00', duration: 60,  status: 'done',     price: 140000, method: 'Transfer Bank', note: 'Merasa gelisah setelah kehilangan pekerjaan bulan lalu.' },
  { id: 'w_002', day: 0, userInitials: 'BW', userName: 'B*** W***', sessionType: 'Call',    time: '14:00', duration: 30,  status: 'done',     price: 85000,  method: 'GoPay',         note: 'Sulit fokus saat bekerja dari rumah.' },
  // Selasa (index 1)
  { id: 'w_003', day: 1, userInitials: 'CL', userName: 'C*** L***', sessionType: 'Offline', time: '10:00', duration: 60,  status: 'done',     price: 200000, method: 'Transfer Bank', note: 'Konseling pasca-putus hubungan jangka panjang.' },
  { id: 'w_004', day: 1, userInitials: 'DM', userName: 'D*** M***', sessionType: 'Chat',    time: '13:00', duration: 60,  status: 'done',     price: 140000, method: 'OVO',           note: 'Insomnia dan rasa cemas berlebihan.' },
  { id: 'w_005', day: 1, userInitials: 'EP', userName: 'E*** P***', sessionType: 'Call',    time: '16:00', duration: 60,  status: 'done',     price: 160000, method: 'Transfer Bank', note: 'Burnout setelah proyek besar selesai.' },
  // Rabu (index 2)
  { id: 'w_006', day: 2, userInitials: 'FH', userName: 'F*** H***', sessionType: 'Chat',    time: '08:00', duration: 30,  status: 'done',     price: 75000,  method: 'GoPay',         note: 'Krisis kepercayaan diri sebelum presentasi.' },
  // Kamis (index 3) — hari ini
  { id: 'w_007', day: 3, userInitials: 'DS', userName: 'D*** S***', sessionType: 'Chat',    time: '09:00', duration: 60,  status: 'done',     price: 140000, method: 'OVO',           note: 'Merasa tertekan dengan ekspektasi keluarga.' },
  { id: 'w_008', day: 3, userInitials: 'MR', userName: 'M*** R***', sessionType: 'Call',    time: '11:00', duration: 30,  status: 'active',   price: 85000,  method: 'Transfer Bank', note: 'Stres pekerjaan akumulatif. Sulit istirahat.' },
  { id: 'w_009', day: 3, userInitials: 'FS', userName: 'F*** S***', sessionType: 'Chat',    time: '14:00', duration: 60,  status: 'upcoming', price: 140000, method: 'GoPay',         note: 'Self-esteem rendah setelah gagal CPNS.' },
  { id: 'w_010', day: 3, userInitials: 'KP', userName: 'K*** P***', sessionType: 'Offline', time: '16:30', duration: 60,  status: 'upcoming', price: 200000, method: 'Transfer Bank', note: 'Konseling hubungan dengan orang tua.' },
  // Jumat (index 4)
  { id: 'w_011', day: 4, userInitials: 'AN', userName: 'A*** N***', sessionType: 'Chat',    time: '10:00', duration: 60,  status: 'upcoming', price: 140000, method: 'OVO',           note: 'Kecemasan sosial yang menghambat aktivitas.' },
  { id: 'w_012', day: 4, userInitials: 'BY', userName: 'B*** Y***', sessionType: 'Call',    time: '14:00', duration: 30,  status: 'pending',  price: 85000,  method: 'Transfer Bank', note: 'Burnout kerja. Tidak bisa menikmati waktu luang.' },
  // Sabtu (index 5)
  { id: 'w_013', day: 5, userInitials: 'GN', userName: 'G*** N***', sessionType: 'Chat',    time: '09:30', duration: 60,  status: 'upcoming', price: 140000, method: 'GoPay',         note: 'Trauma masa kecil yang mulai mengganggu kehidupan.' },
];

const MOCK_AVAILABILITY = {
  leaveStart: null,
  leaveEnd: null,
  days: [
    { name: 'Senin',  active: true,  maxSessions: 4, types: ['Chat','Call'],         slots: [{ start:'08:00', end:'12:00' }, { start:'13:00', end:'17:00' }] },
    { name: 'Selasa', active: true,  maxSessions: 5, types: ['Chat','Call','Offline'],slots: [{ start:'08:00', end:'17:00' }] },
    { name: 'Rabu',   active: true,  maxSessions: 3, types: ['Chat'],                 slots: [{ start:'08:00', end:'12:00' }] },
    { name: 'Kamis',  active: true,  maxSessions: 4, types: ['Chat','Call','Offline'],slots: [{ start:'08:00', end:'12:00' }, { start:'13:00', end:'18:00' }] },
    { name: 'Jumat',  active: true,  maxSessions: 3, types: ['Chat','Call'],          slots: [{ start:'09:00', end:'16:00' }] },
    { name: 'Sabtu',  active: true,  maxSessions: 2, types: ['Chat'],                 slots: [{ start:'09:00', end:'13:00' }] },
    { name: 'Minggu', active: false, maxSessions: 2, types: [],                       slots: [] },
  ]
};

// ── Mock Data (Phase 2.4) ──

const MOCK_CHAT_LIST = [
  {
    id: 'chat_002',
    userInitials: 'MR',
    userName: 'M*** R***',
    sessionType: 'Call',
    status: 'active',
    time: '11:00',
    duration: 30,
    price: 85000,
    lastMessage: 'Sesi berlangsung sekarang',
    lastTime: 'Sekarang',
    unread: 0,
    timerStart: Date.now() - (23 * 60 + 41) * 1000,
  },
  {
    id: 'chat_003',
    userInitials: 'FS',
    userName: 'F*** S***',
    sessionType: 'Chat',
    status: 'upcoming',
    time: '14:00',
    duration: 60,
    price: 140000,
    lastMessage: 'Sesi dimulai pukul 14:00',
    lastTime: '14:00',
    unread: 0,
    timerStart: null,
  },
  {
    id: 'chat_001',
    userInitials: 'DS',
    userName: 'D*** S***',
    sessionType: 'Chat',
    status: 'done',
    time: '09:00',
    duration: 60,
    price: 140000,
    lastMessage: 'Terima kasih dok, saya merasa jauh lebih tenang sekarang.',
    lastTime: '10:02',
    unread: 0,
    timerStart: null,
  },
  {
    id: 'chat_004',
    userInitials: 'KP',
    userName: 'K*** P***',
    sessionType: 'Offline',
    status: 'upcoming',
    time: '16:30',
    duration: 60,
    price: 200000,
    lastMessage: 'Sesi tatap muka pukul 16:30',
    lastTime: '16:30',
    unread: 0,
    timerStart: null,
  },
];

const MOCK_CHAT_MESSAGES = {
  chat_001: [
    { from: 'user',   text: 'Selamat pagi dokter, saya D***. Terima kasih sudah meluangkan waktu.', time: '09:01' },
    { from: 'expert', text: 'Selamat pagi! Senang bisa bertemu. Ceritakan, apa yang sedang Anda rasakan belakangan ini?', time: '09:02' },
    { from: 'user',   text: 'Saya merasa tertekan sekali dengan ekspektasi keluarga. Rasanya seperti tidak pernah cukup.', time: '09:04' },
    { from: 'expert', text: 'Saya mendengar Anda. Perasaan itu sangat wajar dan banyak orang mengalaminya. Bisakah Anda ceritakan lebih detail — ekspektasi seperti apa yang terasa paling berat?', time: '09:05' },
    { from: 'user',   text: 'Soal karier dan pernikahan. Umur saya 28 dan mereka terus bertanya kapan naik jabatan, kapan menikah.', time: '09:08' },
    { from: 'expert', text: 'Tekanan ganda itu memang menguras energi. Mari kita petakan dulu mana yang paling mengganggu keseharian Anda saat ini.', time: '09:10' },
    { from: 'user',   text: 'Karier dulu kali ya dok. Setiap hari saya berangkat kerja tapi sudah merasa lelah sebelum sampai.', time: '09:13' },
    { from: 'expert', text: 'Itu tanda burnout yang perlu kita perhatikan. Bagus Anda menyadarinya. Apa satu hal kecil yang masih bisa membuat Anda tersenyum hari ini?', time: '09:16' },
    { from: 'user',   text: 'Hmm... kopi pagi saya? 😅', time: '09:17' },
    { from: 'expert', text: 'Pegang itu! Hal-hal kecil seperti itu adalah jangkar keseimbangan. Kita akan bangun lebih banyak dari sana. Sesi ini sangat produktif.', time: '09:55' },
    { from: 'user',   text: 'Terima kasih dok, saya merasa jauh lebih tenang sekarang.', time: '10:02' },
  ],
  chat_002: [
    { from: 'user',   text: 'Dok, saya sudah siap untuk sesinya.', time: '11:01' },
    { from: 'expert', text: 'Baik M***, mari kita mulai. Bagaimana kondisi Anda hari ini secara keseluruhan, dari skala 1–10?', time: '11:02' },
    { from: 'user',   text: 'Mungkin 4 dok. Semalam kurang tidur karena deadline.', time: '11:03' },
    { from: 'expert', text: 'Terima kasih sudah jujur. Tidur yang buruk sangat memengaruhi cara kita memproses stres. Ceritakan lebih lanjut tentang deadline ini.', time: '11:05' },
  ],
};

const MOCK_CHAT_REQUESTS = [
  {
    id: 'req_001',
    userInitials: 'AN',
    userName: 'A*** N***',
    sessionType: 'Chat',
    date: 'Kamis, 27 Feb 2025',
    time: '14:00',
    duration: 60,
    price: 140000,
    requestedAt: '2 jam lalu',
    note: 'Saya sering merasa cemas berlebihan sebelum presentasi kerja dan sulit tidur setelahnya.'
  },
  {
    id: 'req_002',
    userInitials: 'BY',
    userName: 'B*** Y***',
    sessionType: 'Call',
    date: 'Jumat, 28 Feb 2025',
    time: '10:00',
    duration: 30,
    price: 85000,
    requestedAt: '5 jam lalu',
    note: 'Butuh bantuan mengelola stres karena deadline pekerjaan yang menumpuk terus-menerus.'
  },
  {
    id: 'req_003',
    userInitials: 'HR',
    userName: 'H*** R***',
    sessionType: 'Offline',
    date: 'Senin, 3 Mar 2025',
    time: '09:00',
    duration: 60,
    price: 200000,
    requestedAt: '1 jam lalu',
    note: 'Ingin konseling tentang hubungan dengan pasangan yang sudah berjalan 3 tahun tapi stagnan.'
  },
];

const RESPONSE_TEMPLATES = [
  { label: 'Sapaan Pembuka', text: 'Selamat datang di sesi kita hari ini. Saya senang Anda meluangkan waktu untuk diri sendiri. Bagaimana kondisi Anda hari ini?' },
  { label: 'Validasi Emosi', text: 'Saya mendengar Anda, dan perasaan yang Anda rasakan itu sangat valid. Banyak orang dalam situasi serupa merasakannya. Kita akan hadapi ini bersama.' },
  { label: 'Teknik Napas', text: 'Mari kita coba teknik pernapasan sederhana: tarik napas dalam selama 4 hitungan, tahan 4 hitungan, hembuskan perlahan selama 6 hitungan. Ulangi 3 kali.' },
  { label: 'Saran Relaksasi', text: 'Saya sarankan Anda mencoba teknik grounding 5-4-3-2-1: sebutkan 5 hal yang bisa Anda lihat, 4 yang bisa disentuh, 3 yang bisa didengar, 2 yang bisa dicium, 1 yang bisa dirasakan.' },
  { label: 'Penutup Sesi', text: 'Kita sudah melakukan pekerjaan yang sangat baik hari ini. Ingat, perjalanan pemulihan tidak linear — setiap langkah kecil berarti. Saya bangga dengan keberanian Anda.' },
];

// ── Mock Data (Phase 2.5) ──

const MOCK_SESSION_HISTORY = [
  // Februari 2025
  {
    id: 'hist_001',
    userInitials: 'DS',
    userName: 'D*** S***',
    sessionType: 'Chat',
    date: 'Kamis, 27 Feb 2025',
    dateSort: '2025-02-27',
    month: 'Februari 2025',
    time: '09:00',
    duration: 62,
    price: 140000,
    rating: 5,
    ratingNote: '"Sangat membantu, merasa lebih ringan setelah sesi."',
    cancelledBy: null,
    hasClinicalNote: true,
    clinicalNote: {
      observation: 'Klien menunjukkan tanda-tanda burnout ringan dan tekanan sosial dari keluarga terkait karier dan pernikahan. Afek terlihat lelah namun masih mampu berbicara secara koheren.',
      insight: 'Pola pikir all-or-nothing teridentifikasi, terutama dalam konteks ekspektasi karier. Klien cenderung mengabaikan pencapaian kecil.',
      strength: 'Klien memiliki kesadaran diri yang baik dan mampu mengidentifikasi pemicunya. Responnya terhadap reframing positif.',
      mood: 3,
      homework: [
        { task: 'Jurnal syukur 3 poin setiap malam', freq: 'Harian', deadline: '6 Mar 2025' },
        { task: 'Coba teknik pernapasan 4-4-6 saat cemas', freq: 'Sesuai Kebutuhan', deadline: null },
      ],
      supplements: [
        { name: 'Magnesium Glycinate', dose: '200mg', freq: 'Malam' },
      ],
      followUp: { active: true, duration: '2 minggu', message: 'Sesi lanjutan disarankan untuk memantau perkembangan dan memperdalam strategi coping.' },
      crisisFlag: false,
      savedAt: '2025-02-27T10:15:00',
    }
  },
  {
    id: 'hist_002',
    userInitials: 'MR',
    userName: 'M*** R***',
    sessionType: 'Call',
    date: 'Kamis, 27 Feb 2025',
    dateSort: '2025-02-27',
    month: 'Februari 2025',
    time: '11:00',
    duration: 35,
    price: 85000,
    rating: 4,
    ratingNote: '"Cukup membantu, tapi waktunya terasa singkat."',
    cancelledBy: null,
    hasClinicalNote: true,
    clinicalNote: {
      observation: 'Klien mengalami gangguan tidur akibat akumulasi tekanan pekerjaan. Mengeluhkan kelelahan fisik dan mental secara bersamaan.',
      insight: 'Siklus stres-insomnia-produktivitas menurun yang saling memperparah. Belum ada strategi manajemen waktu yang konsisten.',
      strength: 'Klien kooperatif dan terbuka terhadap saran. Motivasi untuk berubah cukup tinggi.',
      mood: 2,
      homework: [
        { task: 'Hindari layar 1 jam sebelum tidur', freq: 'Harian', deadline: '6 Mar 2025' },
        { task: 'Buat to-do list malam untuk esok hari', freq: 'Harian', deadline: null },
      ],
      supplements: [],
      followUp: { active: false, duration: null, message: '' },
      crisisFlag: false,
      savedAt: '2025-02-27T12:00:00',
    }
  },
  {
    id: 'hist_003',
    userInitials: 'AR',
    userName: 'A*** R***',
    sessionType: 'Chat',
    date: 'Senin, 24 Feb 2025',
    dateSort: '2025-02-24',
    month: 'Februari 2025',
    time: '09:00',
    duration: 61,
    price: 140000,
    rating: 5,
    ratingNote: '"Sangat profesional dan penuh empati."',
    cancelledBy: null,
    hasClinicalNote: true,
    clinicalNote: {
      observation: 'Klien mengalami kecemasan pasca kehilangan pekerjaan. Menunjukkan tanda grief ringan dan identity disturbance.',
      insight: 'Harga diri klien sangat terikat pada status pekerjaan. Perlu reframing tentang nilai diri di luar karier.',
      strength: 'Klien memiliki support system keluarga yang kuat meski belum terbuka sepenuhnya.',
      mood: 3,
      homework: [
        { task: 'Ceritakan kondisi ke 1 anggota keluarga yang dipercaya', freq: 'Sekali', deadline: '28 Feb 2025' },
      ],
      supplements: [
        { name: 'Omega-3 Fish Oil', dose: '1000mg', freq: 'Pagi' },
      ],
      followUp: { active: true, duration: '1 minggu', message: 'Pantau perkembangan setelah percakapan dengan keluarga.' },
      crisisFlag: false,
      savedAt: '2025-02-24T10:10:00',
    }
  },
  {
    id: 'hist_004',
    userInitials: 'BW',
    userName: 'B*** W***',
    sessionType: 'Call',
    date: 'Senin, 24 Feb 2025',
    dateSort: '2025-02-24',
    month: 'Februari 2025',
    time: '14:00',
    duration: 30,
    price: 85000,
    rating: 4,
    ratingNote: '"Praktis dan langsung ke inti masalah."',
    cancelledBy: null,
    hasClinicalNote: true,
    clinicalNote: {
      observation: 'Klien kesulitan berkonsentrasi saat WFH. Batas antara pekerjaan dan istirahat tidak jelas.',
      insight: 'Kurangnya ritual penutup hari kerja menyebabkan otak sulit "switch off".',
      strength: 'Klien terstruktur dalam menceritakan masalah dan responsif terhadap solusi praktis.',
      mood: 3,
      homework: [
        { task: 'Buat rutinitas penutup kerja: ganti baju, jalan kaki 10 menit', freq: 'Harian', deadline: null },
      ],
      supplements: [],
      followUp: { active: false, duration: null, message: '' },
      crisisFlag: false,
      savedAt: '2025-02-24T14:35:00',
    }
  },
  // Dibatalkan
  {
    id: 'hist_005',
    userInitials: 'EP',
    userName: 'E*** P***',
    sessionType: 'Offline',
    date: 'Rabu, 19 Feb 2025',
    dateSort: '2025-02-19',
    month: 'Februari 2025',
    time: '10:00',
    duration: 0,
    price: 200000,
    rating: null,
    ratingNote: null,
    cancelledBy: 'user',
    hasClinicalNote: false,
    clinicalNote: null,
  },
  // Januari 2025
  {
    id: 'hist_006',
    userInitials: 'CL',
    userName: 'C*** L***',
    sessionType: 'Offline',
    date: 'Selasa, 28 Jan 2025',
    dateSort: '2025-01-28',
    month: 'Januari 2025',
    time: '10:00',
    duration: 68,
    price: 200000,
    rating: 5,
    ratingNote: '"Konseling terbaik yang pernah saya jalani."',
    cancelledBy: null,
    hasClinicalNote: true,
    clinicalNote: {
      observation: 'Klien dalam proses penyembuhan pasca putus hubungan 4 tahun. Masih dalam fase denial-anger.',
      insight: 'Attachment style anxious teridentifikasi. Perlu kerja pada boundaries dan self-worth.',
      strength: 'Klien sangat reflektif dan mau berproses secara mendalam.',
      mood: 2,
      homework: [
        { task: 'Tulis surat untuk diri sendiri tentang hal yang dihargai', freq: 'Sekali', deadline: '4 Feb 2025' },
        { task: 'Batasi kontak dengan mantan selama 2 minggu', freq: 'Harian', deadline: '11 Feb 2025' },
      ],
      supplements: [],
      followUp: { active: true, duration: '2 minggu', message: 'Sesi lanjutan untuk memantau batas kontak dan perkembangan emosional.' },
      crisisFlag: false,
      savedAt: '2025-01-28T11:20:00',
    }
  },
  {
    id: 'hist_007',
    userInitials: 'FH',
    userName: 'F*** H***',
    sessionType: 'Chat',
    date: 'Jumat, 17 Jan 2025',
    dateSort: '2025-01-17',
    month: 'Januari 2025',
    time: '08:00',
    duration: 32,
    price: 75000,
    rating: 5,
    ratingNote: '"Cepat dan tepat sasaran!"',
    cancelledBy: null,
    hasClinicalNote: true,
    clinicalNote: {
      observation: 'Kecemasan performa tinggi sebelum presentasi besar. Gejala fisik: jantung berdebar, telapak tangan berkeringat.',
      insight: 'Perfeksionisme sebagai akar. Klien takut dihakimi bukan gagal.',
      strength: 'Klien mampu membedakan antara rasa takut dan ancaman nyata dengan cepat.',
      mood: 3,
      homework: [
        { task: 'Latihan presentasi di depan cermin 10 menit', freq: 'Harian', deadline: '20 Jan 2025' },
      ],
      supplements: [],
      followUp: { active: false, duration: null, message: '' },
      crisisFlag: false,
      savedAt: '2025-01-17T08:40:00',
    }
  },
];

const MOCK_EARNINGS_MONTHLY = [
  { month: 'Sep', amount: 2850000 },
  { month: 'Okt', amount: 3420000 },
  { month: 'Nov', amount: 3100000 },
  { month: 'Des', amount: 2680000 },
  { month: 'Jan', amount: 3760000 },
  { month: 'Feb', amount: 1890000 },
];

// ── Mock Data (Phase 2.6) ──

const MOCK_TRANSACTIONS = [
  { id: 'tx_001', userInitials: 'DS', userName: 'D*** S***', type: 'Chat', date: 'Kamis, 27 Feb 2025', amount: 119000, status: 'cair',    note: '60 menit' },
  { id: 'tx_002', userInitials: 'MR', userName: 'M*** R***', type: 'Call', date: 'Kamis, 27 Feb 2025', amount: 68000,  status: 'cair',    note: '30 menit' },
  { id: 'tx_003', userInitials: 'FS', userName: 'F*** S***', type: 'Chat', date: 'Kamis, 27 Feb 2025', amount: 119000, status: 'pending', note: '60 menit — menunggu konfirmasi' },
  { id: 'tx_004', userInitials: 'KP', userName: 'K*** P***', type: 'Offline', date: 'Kamis, 27 Feb 2025', amount: 170000, status: 'pending', note: 'Tatap muka — menunggu sesi selesai' },
  { id: 'tx_005', userInitials: 'AR', userName: 'A*** R***', type: 'Chat', date: 'Senin, 24 Feb 2025', amount: 119000, status: 'cair',    note: '60 menit' },
  { id: 'tx_006', userInitials: 'BW', userName: 'B*** W***', type: 'Call', date: 'Senin, 24 Feb 2025', amount: 68000,  status: 'cair',    note: '30 menit' },
  { id: 'tx_007', userInitials: 'CL', userName: 'C*** L***', type: 'Offline', date: 'Selasa, 25 Feb 2025', amount: 170000, status: 'cair', note: 'Tatap muka' },
  { id: 'tx_008', userInitials: 'EP', userName: 'E*** P***', type: 'Offline', date: 'Rabu, 19 Feb 2025', amount: 170000, status: 'refund', note: 'Sesi dibatalkan klien — refund diproses' },
  { id: 'tx_009', userInitials: 'FH', userName: 'F*** H***', type: 'Chat', date: 'Jumat, 17 Jan 2025', amount: 59000,  status: 'cair',    note: '30 menit' },
  { id: 'tx_010', userInitials: 'CL', userName: 'C*** L***', type: 'Offline', date: 'Selasa, 28 Jan 2025', amount: 170000, status: 'cair', note: 'Tatap muka' },
];

const MOCK_BANK_ACCOUNTS = [
  { id: 'bank_001', bank: 'BCA', number: '•••• •••• 4291', name: 'Rina Kusuma', primary: true },
  { id: 'bank_002', bank: 'Mandiri', number: '•••• •••• 7738', name: 'Rina Kusuma', primary: false },
];

const MOCK_ACTIVITY_LOG = [
  { action: 'Login berhasil', device: 'Chrome · macOS', time: '2 jam lalu', icon: 'check-circle' },
  { action: 'Ubah kata sandi', device: 'Chrome · macOS', time: '3 hari lalu', icon: 'lock' },
  { action: 'Login berhasil', device: 'Safari · iPhone', time: '5 hari lalu', icon: 'check-circle' },
  { action: 'Perbarui profil', device: 'Chrome · macOS', time: '1 minggu lalu', icon: 'edit' },
  { action: 'Login berhasil', device: 'Chrome · Windows', time: '2 minggu lalu', icon: 'check-circle' },
];

const MOCK_EDUCATION = [
  { institution: 'Universitas Indonesia', degree: 'S2 Psikologi Klinis', year: '2018' },
  { institution: 'Universitas Padjadjaran', degree: 'S1 Psikologi', year: '2016' },
];

const MOCK_CERTIFICATIONS = [
  { name: 'Sertifikat Kompetensi Psikolog Klinis', issuer: 'HIMPSI', year: '2019' },
  { name: 'Certified Cognitive Behavioral Therapist', issuer: 'Beck Institute', year: '2021' },
];

// ── Register State (cross-page) ──
const RegState = {
  save(data) { sessionStorage.setItem('hime_reg', JSON.stringify({ ...(this.load()||{}), ...data })); },
  load()     { try { return JSON.parse(sessionStorage.getItem('hime_reg')||'null'); } catch { return null; } },
  clear()    { sessionStorage.removeItem('hime_reg'); },
};

// ── Init ──
App.init();
