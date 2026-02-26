# Hi-Me Expert — Mental Health Platform (Expert Role)

## Overview

Hi-Me Expert adalah repository terpisah yang menjadi sisi lain dari platform Hi-Me — menangani seluruh alur kerja role **Expert** (Psikolog, Konsultan, Analyst). Dibangun sebagai pasangan dari [hi-me (User)](../hi-me) yang sudah selesai di Phase 1.

Setiap fitur dirancang untuk **berkorespondensi langsung** dengan alur User: booking yang dibuat user masuk sebagai request ke expert, chat room berjalan dua arah, catatan & tugas yang ditulis expert langsung tampil di halaman `prescriptions.html` milik user, dan availability yang diatur expert mengisi slot jadwal di `expert/detail.html`.

Sama seperti repo User: **wireframe interaktif HTML/CSS/JS murni**, mobile-first (390px), tanpa framework & tanpa backend. Buka langsung di browser.

---

## Cara Menjalankan

1. Clone / extract repo `hi-me-expert`
2. Buka folder project
3. Buka `index.html` langsung di browser (double-click)
4. Tidak perlu server, npm, pip, atau setup apapun

> Dioptimalkan untuk tampilan mobile (390px). Di desktop, tampilan muncul sebagai "phone frame" di tengah layar.

---

## Keterkaitan dengan Repo User (hi-me)

| Aksi di Repo User | Yang disimulasikan di Repo Expert |
|---|---|
| User booking sesi & bayar | Request masuk ke dashboard expert, status "Menunggu Konfirmasi" |
| User memilih slot jadwal expert | Slot yang tersedia adalah data dari Availability Setting expert |
| User masuk chat room | Expert melihat sesi "Berlangsung" + banner aktif di dashboard |
| User memberi rating setelah sesi | Rating muncul di riwayat sesi & statistik profil expert |
| Expert simpan catatan klinis | User melihatnya di `profile/prescriptions.html` → tab Catatan |
| Expert tambah homework / tugas | User melihatnya di `profile/prescriptions.html` → tab Tugas |
| Expert tambah suplemen / saran | User melihatnya di `profile/prescriptions.html` → tab Obat-Suplemen |
| Expert set rekomendasi sesi lanjutan | User menerima notifikasi & muncul di dashboard sebagai saran |

---

## Design System

Font, spacing, radius, dan shadow **identik** dengan repo User — yang berbeda hanya **color palette**. Tujuannya agar dua portal tetap terasa satu keluarga, tapi Expert punya identitas visual yang lebih profesional & klinik.

### Perbedaan Palette: User vs Expert

| Token | User (hi-me) | Expert (hi-me-expert) | Alasan |
|---|---|---|---|
| Primary | `#3E5EDC` Indigo — friendly, accessible | `#0F766E` Teal — profesional, klinik | Teal tetap cool-tone & healthcare, tapi terasa lebih "dokter" |
| Primary Hover | `#30408A` | `#0D5C57` | |
| Primary Light | `#7893EA` | `#14B8A6` | |
| Primary Pale | `#EEF2FF` | `#CCFBF1` | |
| Primary XPale | `#F5F7FF` | `#F0FDFA` | |
| Secondary | `#5DBA84` Green | `#5DBA84` Green | Dipertahankan — tetap serasi dengan User |
| Accent | `#2DD4BF` Cyan | `#7C3AED` Violet | Aksen berbeda memberi karakter tersendiri |
| Accent Hover | `#14B8A6` | `#6D28D9` | |
| Background | `#F8FAFC` | `#F5FAFA` | Sedikit lebih "teal-tinted" agar subtle |
| Danger | `#D62828` | `#D62828` | Sama — warna bahaya bersifat universal |
| Warning | `#F4A261` | `#F4A261` | Sama |
| Success | `#5DBA84` | `#5DBA84` | Sama |
| Info | `#3A86FF` | `#0F766E` (mengikuti primary) | |

### Token CSS yang Diubah di `global.css` Expert

```css
:root {
  /* ─── Expert Primary: Deep Teal ─── */
  --teal-900: #042F2E;
  --teal-800: #0C4A47;
  --teal-700: #0F766E;   /* ← primary utama */
  --teal-600: #0D9488;
  --teal-500: #14B8A6;
  --teal-400: #2DD4BF;
  --teal-300: #5EEAD4;
  --teal-200: #99F6E4;
  --teal-100: #CCFBF1;
  --teal-50:  #F0FDFA;

  --primary:        var(--teal-700);    /* #0F766E */
  --primary-hover:  var(--teal-800);
  --primary-light:  var(--teal-500);
  --primary-pale:   var(--teal-100);
  --primary-xpale:  var(--teal-50);

  /* ─── Expert Accent: Violet ─── */
  --accent:         #7C3AED;
  --accent-hover:   #6D28D9;

  /* ─── Background sedikit teal-tinted ─── */
  --bg:             #F5FAFA;

  /* ─── Semua token lain identik dengan repo User ─── */
  --secondary:      #5DBA84;
  --danger:         #D62828;
  --warning:        #F4A261;
  --success:        #5DBA84;
  --text-primary:   #1F2937;
  --text-secondary: #374151;
  --text-muted:     #64748B;
  /* ... dst */
}
```

### Vibe Perbandingan

```
User      →  Indigo + Cyan    →  "Saya butuh bantuan, ini aman"   (hangat, terbuka)
Expert    →  Teal  + Violet   →  "Saya profesional, percayakan"   (klinik, otoritatif)
```

Dua warna ini berdampingan dengan baik karena sama-sama **cool-tone** dan sama-sama punya **lightness yang seimbang** — tidak ada yang "menang" atau terlihat salah satu lebih gelap secara mencolok.

### Yang Tetap Sama dengan Repo User

- **Font:** Plus Jakarta Sans (body) + DM Serif Display (heading/accent)
- **Border Radius:** 6px / 10px / 14px / 20px / 26px / 32px
- **Shadows:** xs, sm, md, lg
- **Animasi:** fadeUp, fadeIn, scaleIn, bounceIn dengan stagger delay
- **Komponen:** struktur bottom sheet, toast, nav bar, card — identik, hanya warna primary yang berubah

> `css/global.css` di-copy dari repo User lalu token primary & accent di-override seperti di atas. `js/app.js` di-copy dengan penambahan routes & state expert (`hime_expert` di localStorage).

---

## Status Pengembangan

---

### ✅ Phase 2.1 — Registrasi & Onboarding Expert *(DONE)*

Fokus: Alur pendaftaran expert yang terstruktur seperti proses lamaran kerja profesional — dengan upload dokumen resmi, verifikasi admin, dan halaman status pending/ditolak sebelum bisa masuk platform.

**Halaman yang akan dibuat:**

| Halaman | Path | Status |
|---|---|---|
| Landing Expert | `index.html` | ✅ Done |
| Login Expert | `pages/auth/login.html` | ✅ Done |
| Register — Step 1: Informasi Akun | `pages/auth/register.html` | ✅ Done |
| Register — Step 2: Profil Profesional | `pages/auth/register-professional.html` | ✅ Done |
| Register — Step 3: Upload Dokumen | `pages/auth/register-documents.html` | ✅ Done |
| Register — Step 4: Pengaturan Awal | `pages/auth/register-setup.html` | ✅ Done |
| Status Pendaftaran (Menunggu Verifikasi) | `pages/auth/pending.html` | ✅ Done |
| Pendaftaran Ditolak / Revisi Dokumen | `pages/auth/rejected.html` | ✅ Done |

**Fitur Phase 2.1:**

- **Landing Expert:**
  - Hero dengan dua CTA: "Daftar sebagai Mitra Expert" dan "Masuk"
  - Tiga keunggulan bergabung: fleksibilitas jadwal, insentif kompetitif, jangkauan pasien yang luas
  - Testimonial singkat dari expert mock (nama, gelar, spesialisasi)
  - Tabel persyaratan umum yang ditampilkan secara transparan (STR/SIP, pengalaman, dll.)
  - Footer: link ke FAQ & Syarat dan Ketentuan Mitra

- **Login Expert:**
  - Form email + password dengan validasi
  - Badge peran "Expert Portal" di header form (membedakan visual dari login User)
  - Penanganan akun pending: jika status `pending`, redirect ke `pending.html`
  - Penanganan akun ditolak: jika status `rejected`, redirect ke `rejected.html`
  - Link "Belum punya akun? Daftar sebagai Expert"

- **Register — Alur 4 Langkah dengan progress bar:**

  **Step 1 — Informasi Akun:**
  - Input: Email, Kata Sandi (dengan strength indicator 4-bar warna), Konfirmasi Kata Sandi, Nomor HP aktif
  - Checkbox persetujuan Syarat & Ketentuan Mitra + Kebijakan Privasi (wajib)
  - Validasi real-time per field, tombol "Lanjut" nonaktif sampai semua valid

  **Step 2 — Profil Profesional:**
  - Pilih jenis expert dengan chip selector: **Psikolog** / **Konsultan Mental Health** / **Analyst**
  - Form yang ditampilkan berbeda per jenis yang dipilih:
    - *Psikolog:* Nama lengkap + gelar, Nomor STR (Surat Tanda Registrasi dari KKI/HIMPSI), Nomor SIP (Surat Izin Praktik) aktif, Nomor anggota HIMPSI (opsional)
    - *Konsultan:* Nama lengkap, Nama sertifikasi konseling/coaching, Lembaga penerbit sertifikat, Tahun terbit
    - *Analyst:* Nama lengkap, Gelar psikologi terapan, Institusi asal
  - Tahun mulai berpraktik (tahun pengalaman dihitung dan ditampilkan otomatis: "X tahun")
  - Multi-select chip spesialisasi (min 1, maks 5): Kecemasan · Depresi · Stres Kerja · Burnout · Trauma · Relationship · Self-esteem · Gangguan Tidur · Anak & Remaja · Pasangan
  - Bio / deskripsi diri (textarea, maks 300 karakter dengan counter live)
  - Bahasa yang dikuasai (chip multi-select)

  **Step 3 — Upload Dokumen:**
  - Kartu per dokumen menampilkan: nama dokumen, keterangan singkat, tombol upload, preview nama file setelah upload, ikon ✓ berwarna hijau
  - Dokumen wajib berbeda per jenis expert yang dipilih di Step 2:
    - *Semua jenis:* KTP (foto/scan), Foto Diri Profesional (formal, bukan selfie), CV / Riwayat Hidup (PDF)
    - *Psikolog:* STR aktif (scan resmi), SIP aktif (scan resmi), Ijazah S1/S2 Psikologi, Sertifikat Kompetensi dari HIMPSI
    - *Konsultan:* Sertifikat Konseling/Coaching dari lembaga terakreditasi, Ijazah terakhir
    - *Analyst:* Ijazah Psikologi, Sertifikat Pelatihan relevan (opsional tapi dianjurkan)
  - Upload disimulasikan: tap tombol → nama file muncul + status "Diunggah ✓"
  - Counter "X / Y dokumen diunggah" dengan progress bar
  - Warning card kuning: "Pastikan semua dokumen terbaca jelas dan masih berlaku. Dokumen tidak valid atau kedaluwarsa akan menyebabkan proses verifikasi gagal."
  - Tombol "Lanjut" hanya aktif jika semua dokumen wajib sudah terisi

  **Step 4 — Pengaturan Awal:**
  - Harga per tipe sesi (toggle aktif/nonaktif per tipe + input rupiah dengan format otomatis):
    - Chat — 30 menit / 60 menit
    - Video/Audio Call — 30 menit / 60 menit
    - Offline / Tatap Muka — per sesi
  - Kota / lokasi praktik (untuk sesi offline)
  - Availability awal: pilih hari kerja aktif (chip toggle Senin–Minggu) + jam mulai–selesai per hari
  - Checkbox pernyataan kesiapan: "Saya menyatakan bahwa seluruh informasi dan dokumen yang saya berikan adalah benar dan sah sesuai hukum yang berlaku" (wajib)
  - Tombol "Kirim Pendaftaran" → overlay processing → redirect ke `pending.html`

- **Halaman Menunggu Verifikasi:**
  - Ilustrasi animasi dokumen sedang di-review (CSS keyframes)
  - Pesan: "Pendaftaran Anda sedang ditinjau oleh tim Hi-Me"
  - Estimasi waktu: 2–5 hari kerja
  - Checklist semua dokumen yang berhasil diterima (nama dokumen + ikon ✓)
  - Card info biru: "Anda akan mendapatkan notifikasi email setelah proses verifikasi selesai"
  - Tombol "Cek Status" (refresh simulasi dengan toast "Status belum berubah")
  - Link "Hubungi Support" → simulasi buka email/WA

- **Halaman Ditolak / Revisi Dokumen:**
  - Ikon X merah dengan animasi + pesan "Pendaftaran Belum Dapat Disetujui"
  - Card alasan penolakan per dokumen bermasalah (misal: "STR tidak terbaca", "SIP sudah kedaluwarsa", "Foto diri tidak sesuai ketentuan")
  - Tombol "Perbarui Dokumen" → kembali ke Step 3 dengan kartu dokumen bermasalah di-highlight merah + tooltip alasan di-inline
  - Info: "Setelah dokumen diperbarui, pendaftaran Anda akan ditinjau ulang dalam 2–3 hari kerja"

---

### ✅ Phase 2.2 — Dashboard & Notifikasi Expert *(DONE)*

Fokus: Tampilan utama setelah login — command center harian expert untuk memantau semua aktivitas sekaligus.

**Halaman yang akan dibuat:**

| Halaman | Path | Status |
|---|---|---|
| Dashboard Expert | `pages/dashboard/index.html` | ✅ Done |
| Notifikasi | `pages/notifications/index.html` | ✅ Done |

**Fitur Phase 2.2:**

- **Dashboard Expert:**
  - **Toggle Status:** Online / Sibuk / Offline — dot warna berubah real-time (hijau/kuning/abu), disimpan ke state
  - **Hero greeting:** nama + gelar, spesialisasi, avatar inisial bergradient + badge "✓ Terverifikasi"
  - **Stats strip hari ini** (4 kartu): Sesi Hari Ini · Pending Request · Rating Bulan Ini · Pendapatan Hari Ini
  - **Banner "Sesi Berlangsung"** — muncul jika ada sesi aktif, bergradient menonjol, timer countdown + CTA "Masuk ke Sesi"
  - **Card "Request Masuk"** — list booking baru yang menunggu konfirmasi: avatar inisial user (disamarkan), tipe sesi, jadwal, harga, tombol Terima (hijau) dan Tolak (ghost merah) per item
  - **Card "Jadwal Hari Ini"** — timeline sesi terkonfirmasi: jam, nama user (disamarkan), tipe sesi (chip warna per tipe — Chat/Call/Offline), badge status (Mendatang/Berlangsung/Selesai)
  - **Statistik Mingguan:** bar chart mini pendapatan 7 hari terakhir, total minggu ini vs minggu lalu
  - Bottom nav: 🏠 Home · 📅 Jadwal · 💬 Chat · 👤 Profil

- **Notifikasi:**
  - Inbox notifikasi dengan badge counter di ikon
  - Filter tab: Semua / Request / Sesi / Pembayaran / Sistem
  - Kartu notifikasi: ikon per kategori, judul, deskripsi singkat, waktu relatif, dot biru jika belum dibaca
  - Tombol "Tandai Semua Dibaca"
  - Tap notifikasi → navigasi ke halaman terkait (request / chat room / earnings / dll.)
  - Mock notifikasi: booking baru masuk, pembayaran terkonfirmasi, rating dari user, pengingat sesi 30 menit lagi, update kebijakan platform

---

### ✅ Phase 2.3 — Manajemen Jadwal & Availability *(DONE)*

Fokus: Expert mengatur jam kerja dan hari aktif, serta melihat seluruh sesi dalam format kalender.

**Halaman yang akan dibuat:**

| Halaman | Path | Status |
|---|---|---|
| Kalender Jadwal | `pages/schedule/index.html` | ✅ Done |
| Availability Setting | `pages/availability/index.html` | ✅ Done |
| Detail Sesi (dari kalender) | `pages/schedule/session-detail.html` | ✅ Done |

**Fitur Phase 2.3:**

- **Kalender Jadwal:**
  - Toggle view 2 mode: **Minggu** (7 kolom, scroll horizontal) vs **Hari Ini** (timeline vertikal per jam)
  - Blok sesi di timeline berwarna per tipe: Chat = biru · Call = hijau · Offline = oranye
  - Badge "Pending" (abu-abu) untuk sesi belum dikonfirmasi
  - Highlight hari ini dengan aksen warna + indikator "Hari Ini"
  - Tap blok sesi → bottom sheet detail singkat + CTA "Lihat Detail Penuh"
  - Tombol "⚙ Atur Availability" shortcut ke halaman Availability Setting

- **Availability Setting:**
  - Toggle aktif/nonaktif per hari (Senin–Minggu)
  - Per hari aktif: tambah slot jam (jam mulai–selesai) dengan tombol "+" dan hapus "×" per slot
  - Chip multi-select tipe sesi per hari: Chat / Call / Offline
  - Stepper maksimum sesi per hari (+/−, range 1–10)
  - **Mode Cuti / Liburan:** pilih rentang tanggal dengan date-range picker → semua slot diblokir, tampil banner info kuning "Anda sedang dalam mode cuti [tanggal]"
  - Preview: "Tersedia X slot minggu ini"
  - Simpan → toast: "Availability diperbarui. Perubahan terlihat oleh user di halaman jadwal expert."

- **Detail Sesi (dari kalender):**
  - Info lengkap: nama user (sebagian disensor), avatar inisial, tipe sesi, tanggal, jam, durasi, harga, metode bayar
  - Catatan booking dari user (textarea read-only)
  - Status sesi: Menunggu Konfirmasi / Terkonfirmasi / Berlangsung / Selesai / Dibatalkan
  - Aksi kontekstual per status:
    - *Menunggu:* tombol **Terima** + **Tolak** (pilih alasan via sheet)
    - *Terkonfirmasi:* tombol **Mulai Sesi** (aktif H-5 menit) + **Batalkan**
    - *Selesai:* tombol **Lihat Ringkasan & Catatan**

---

### 🔮 Phase 2.4 — Terima Request & Ruang Konsultasi *(PLANNED)*

Fokus: Alur menerima request masuk dan menjalankan sesi konsultasi live dari sisi expert — chat maupun call.

**Halaman yang akan dibuat:**

| Halaman | Path | Status |
|---|---|---|
| Daftar Request Masuk | `pages/requests/index.html` | 🔮 Planned |
| Chat List Expert | `pages/chat/index.html` | 🔮 Planned |
| Chat Room Expert | `pages/chat/room.html` | 🔮 Planned |
| Call Room Expert | `pages/chat/call.html` | 🔮 Planned |

**Fitur Phase 2.4:**

- **Daftar Request Masuk:**
  - Kartu per request: avatar inisial user (nama disamarkan), tipe sesi, jadwal, durasi, harga yang dibayarkan, waktu request masuk, kutipan singkat catatan keluhan user
  - Aksi per kartu: **Terima** (hijau) / **Tolak** (ghost merah)
  - Sheet konfirmasi saat terima: detail sesi + tombol final "Ya, Terima Sesi"
  - Sheet pilihan alasan saat tolak: Jadwal Sudah Penuh · Tidak Sesuai Spesialisasi · Darurat Pribadi · Lainnya (input teks) — alasan dikirim sebagai notifikasi ke user
  - Filter chip: Semua / Chat / Call / Offline
  - Empty state: ilustrasi + "Belum ada request masuk saat ini"
  - Badge counter di bottom nav

- **Chat List Expert:**
  - Filter tab: Berlangsung / Mendatang / Selesai
  - Banner sesi aktif bergradient hijau dengan timer countdown + CTA "Masuk"
  - Kartu per sesi: avatar inisial user, nama (disamarkan), preview pesan terakhir atau status sesi, jam, badge status berwarna
  - Tap kartu → Chat Room

- **Chat Room Expert:**
  - Topbar: nama user (disamarkan) + avatar, status koneksi, session timer countdown
  - Bubble chat expert (kanan, primary gradient) vs user (kiri, putih)
  - Typing indicator otomatis bergilir (simulasi user sedang mengetik)
  - **Toolbar Expert** (row ikon di atas keyboard):
    - 📋 **Template Respons** — bottom sheet pilih template cepat: sapaan pembuka · validasi emosi · teknik napas · saran relaksasi · penutup sesi
    - 📎 **Catatan Cepat** — sticky note floating yang bisa diisi selama sesi (tersimpan sebagai draft di Post-Session form)
    - ⏱ **Perpanjang Waktu** — tambah +15 menit dengan konfirmasi (maks 2× per sesi)
    - 🚨 **Protokol Krisis** — sheet panduan penanganan: langkah-langkah · nomor hotline darurat (Into The Light, Yayasan Pulih) · toggle "Tandai sebagai situasi darurat" yang menambah flag di ringkasan sesi
  - Tombol **"Akhiri Sesi"** → sheet konfirmasi → navigasi ke Post-Session Summary

- **Call Room Expert:**
  - Layout full-screen gelap minimalis
  - Avatar besar user di tengah (inisial bergradient), nama disamarkan, status koneksi
  - Timer sesi aktif berjalan
  - **Floating Notepad** — tombol ikon → slide-up mini notepad untuk mencatat poin penting selama call (tersimpan sebagai draft untuk Post-Session form)
  - Kontrol bawah: Mute Mic · Toggle Speaker · **End Call**
  - End Call → sheet konfirmasi → navigasi ke Post-Session Summary

---

### 🔮 Phase 2.5 — Post-Session: Ringkasan & Catatan Klinis *(PLANNED)*

Fokus: Form yang diisi expert setelah sesi selesai — hasilnya langsung tampil di `prescriptions.html` dan `session-history.html` milik User.

**Halaman yang akan dibuat:**

| Halaman | Path | Status |
|---|---|---|
| Post-Session Form | `pages/session/summary.html` | 🔮 Planned |
| Riwayat Sesi Expert | `pages/session/history.html` | 🔮 Planned |

**Fitur Phase 2.5:**

- **Post-Session Form:**
  - Header: avatar inisial user, nama (disamarkan), tipe sesi, durasi aktual, tanggal sesi
  - Jika ada Catatan Cepat dari chat/call, ditampilkan sebagai draft kuning di atas form
  - **Tab 1 — Catatan Klinis:**
    - Textarea "Observasi" — apa yang disampaikan dan ditunjukkan user selama sesi
    - Textarea "Insight & Analisis" — penilaian expert, pola yang teridentifikasi
    - Textarea "Kekuatan yang Teridentifikasi" — aspek positif user yang ditemukan
    - Mood assessment user saat sesi: 5 skala chip (😔 Sangat Buruk → 😊 Sangat Baik)
    - → Ini yang tampil sebagai kartu "Catatan" dengan bullet 🔍/💡/🌟 di `prescriptions.html` user
  - **Tab 2 — Tugas Mandiri (Homework):**
    - Tambah item: input nama tugas + pilih frekuensi chip (Harian/Mingguan/Sekali) + deadline opsional
    - Hapus item dengan ikon trash per baris
    - Preview checklist interaktif di bawah form
    - → Ini yang tampil sebagai kartu "Tugas" dengan checklist di `prescriptions.html` user
  - **Tab 3 — Suplemen & Saran:**
    - Tambah item: nama suplemen/teknik · dosis atau durasi · frekuensi chip (Pagi/Siang/Malam/Sesuai Kebutuhan)
    - Warning card kuning otomatis: "Rekomendasikan konsultasi dengan dokter atau psikiater sebelum mengonsumsi suplemen apa pun"
    - → Ini yang tampil sebagai kartu "Obat-Suplemen" di `prescriptions.html` user
  - **Rekomendasi Sesi Lanjutan:**
    - Toggle aktif/nonaktif
    - Jika aktif: pilih rentang waktu (1 minggu / 2 minggu / 1 bulan) + textarea pesan singkat untuk user
    - → Memicu notifikasi sesi lanjutan di sisi user
  - Tombol "Simpan & Kirim ke User" → sheet konfirmasi → toast sukses → redirect ke Riwayat Sesi

- **Riwayat Sesi Expert:**
  - Stats strip: Total Sesi · Sesi Bulan Ini · Rata-rata Rating · Pendapatan Total
  - Filter tab: Semua / Selesai / Dibatalkan
  - Month separator antar bulan
  - Kartu sesi: avatar inisial user, tipe, tanggal, durasi, bintang rating dari user, pendapatan per sesi
  - Kartu dibatalkan: info siapa yang membatalkan + info refund
  - Tap kartu → bottom sheet: catatan klinis yang sudah diisi + tombol "Edit Catatan" (aktif hanya dalam 24 jam)

---

### 🔮 Phase 2.6 — Profil & Pengaturan Expert *(PLANNED)*

Fokus: Profil yang bisa diedit, pengaturan harga layanan, dan dashboard pendapatan expert.

**Halaman yang akan dibuat:**

| Halaman | Path | Status |
|---|---|---|
| Profil Expert | `pages/profile/index.html` | 🔮 Planned |
| Edit Profil | `pages/profile/edit.html` | 🔮 Planned |
| Pengaturan Harga | `pages/profile/pricing.html` | 🔮 Planned |
| Earnings & Penarikan | `pages/profile/earnings.html` | 🔮 Planned |
| Notifikasi Setting | `pages/profile/notifications.html` | 🔮 Planned |
| Privasi & Keamanan | `pages/profile/privacy.html` | 🔮 Planned |

**Fitur Phase 2.6:**

- **Profil Expert:**
  - Hero: avatar inisial bergradient besar, nama + gelar, badge "✓ Terverifikasi", badge tipe expert
  - Stats row: Total Sesi · Rata-rata Rating · Tahun Pengalaman · Total Ulasan
  - **Preview "Tampilan di Mata User"** — card kecil menampilkan expert card persis seperti yang dilihat user di `expert/list.html` (nama, rating, harga, spesialisasi, online dot)
  - Menu: Edit Profil · Pengaturan Harga · Earnings · Availability · Notifikasi · Privasi · Keluar (dengan konfirmasi sheet)

- **Edit Profil:**
  - Foto profil (avatar inisial atau upload — simulasi file picker)
  - Nama lengkap + gelar, nomor STR/SIP (read-only, perubahan memerlukan proses re-verifikasi admin)
  - Bio / deskripsi (textarea maks 300 karakter + counter)
  - Multi-select chip spesialisasi, bahasa yang dikuasai
  - Riwayat pendidikan: tambah/hapus entri (institusi, gelar, tahun lulus)
  - Sertifikasi: tambah/hapus entri (nama sertifikat, lembaga, tahun)
  - Lokasi praktik offline (kota + alamat klinik opsional)

- **Pengaturan Harga:**
  - Toggle aktif/nonaktif per tipe sesi
  - Input harga per durasi (30/60/90 menit) dengan format rupiah otomatis
  - **Promo Sementara:** toggle + persentase diskon + rentang tanggal → preview harga coret otomatis
  - Preview card: "Begini tampilan harga Anda di halaman expert:" → simulasi card user
  - Simpan → toast konfirmasi

- **Earnings & Penarikan:**
  - Summary card bergradient: Saldo Tersedia · Pendapatan Bulan Ini · Total Sepanjang Waktu
  - Bar chart pendapatan 6 bulan terakhir (SVG/CSS sederhana)
  - Filter riwayat transaksi: Semua / Cair / Pending / Refund
  - Kartu transaksi: nama user disamarkan, tipe sesi, tanggal, nominal, status badge
  - Tap kartu → bottom sheet detail
  - Tombol **"Tarik Dana"** → sheet form: pilih rekening bank (BCA/BNI/BRI/Mandiri), nominal (min Rp 50.000), estimasi cair 1×24 jam → konfirmasi → toast sukses (simulasi)

- **Notifikasi Setting:**
  - Toggle per kategori: Request Masuk · Sesi Terkonfirmasi · Pembayaran Masuk · Rating Baru · Pengingat Sesi · Info Platform
  - Chip waktu pengingat sesi: 30 menit / 1 jam / 2 jam / 1 hari sebelum sesi

- **Privasi & Keamanan:**
  - Security score card bergradient + ring indicator
  - Ubah kata sandi via bottom sheet dengan strength indicator 4-bar
  - Toggle Autentikasi 2 Faktor (badge Aktif/Nonaktif real-time)
  - Log aktivitas akun dalam bottom sheet
  - Toggle privasi: Sembunyikan Profil dari Pencarian
  - Zona Berbahaya: Nonaktifkan Akun (dengan catatan data sesi tetap disimpan sesuai regulasi) + Hapus Akun Permanen

---

## Project Structure

```
hi-me-expert/
├── index.html                              ← Entry point → redirect ke login atau dashboard
├── css/
│   └── global.css                          ← Design system (identik repo User)
├── js/
│   └── app.js                              ← Router, state Expert, mock data, utilities
└── pages/
    ├── auth/
    │   ├── login.html                      ← Phase 2.1
    │   ├── register.html                   ← Phase 2.1 (Step 1: Akun)
    │   ├── register-professional.html      ← Phase 2.1 (Step 2: Profil Profesional)
    │   ├── register-documents.html         ← Phase 2.1 (Step 3: Upload Dokumen)
    │   ├── register-setup.html             ← Phase 2.1 (Step 4: Pengaturan Awal)
    │   ├── pending.html                    ← Phase 2.1 (Menunggu Verifikasi Admin)
    │   └── rejected.html                   ← Phase 2.1 (Ditolak / Revisi)
    ├── dashboard/
    │   └── index.html                      ← Phase 2.2
    ├── notifications/
    │   └── index.html                      ← Phase 2.2
    ├── schedule/
    │   ├── index.html                      ← Phase 2.3
    │   └── session-detail.html             ← Phase 2.3
    ├── availability/
    │   └── index.html                      ← Phase 2.3
    ├── requests/
    │   └── index.html                      ← Phase 2.4
    ├── chat/
    │   ├── index.html                      ← Phase 2.4
    │   ├── room.html                       ← Phase 2.4
    │   └── call.html                       ← Phase 2.4
    ├── session/
    │   ├── summary.html                    ← Phase 2.5
    │   └── history.html                    ← Phase 2.5
    └── profile/
        ├── index.html                      ← Phase 2.6
        ├── edit.html                       ← Phase 2.6
        ├── pricing.html                    ← Phase 2.6
        ├── earnings.html                   ← Phase 2.6
        ├── notifications.html              ← Phase 2.6
        └── privacy.html                    ← Phase 2.6
```

---

## Navigation Structure

### Expert (Mobile Bottom Nav)
[Home] Home · [Kalender] Jadwal · [Chat] Chat · [User] Profil

---

## State Management

```javascript
// localStorage key: 'hime_expert'
const ExpertApp = {
  expert: null,
  // Contoh objek expert setelah login & verifikasi:
  // {
  //   id: 'exp_001',
  //   name: 'Rina Kusuma, M.Psi.',
  //   type: 'Psikolog',              // 'Psikolog' | 'Konsultan' | 'Analyst'
  //   status: 'active',              // 'pending' | 'rejected' | 'active'
  //   specializations: ['Kecemasan', 'Burnout'],
  //   rating: 4.9,
  //   totalSessions: 142,
  //   experience: 6,                 // tahun
  //   onlineStatus: 'online',        // 'online' | 'busy' | 'offline'
  //   pricing: {
  //     chat30: 75000, chat60: 140000,
  //     call30: 85000, call60: 160000,
  //     offline: 200000
  //   }
  // }
}
```

---

## Mock Data yang Diperlukan di `app.js`

| Variabel | Deskripsi |
|---|---|
| `MOCK_REQUESTS` | Request booking masuk yang menunggu konfirmasi expert |
| `MOCK_SESSIONS_TODAY` | Jadwal sesi hari ini yang sudah terkonfirmasi |
| `MOCK_CHAT_HISTORY` | Riwayat percakapan per sesi (untuk chat room) |
| `MOCK_EARNINGS_MONTHLY` | Data pendapatan per bulan untuk bar chart |
| `MOCK_SESSION_HISTORY` | Riwayat sesi selesai lengkap dengan rating dari user |
| `MOCK_NOTIFICATIONS` | Inbox notifikasi expert |
| `MOCK_AVAILABILITY` | Pengaturan slot jadwal awal per hari |

---

## Urutan Pengerjaan yang Disarankan

```
Phase 2.1 (Registrasi & Onboarding)
    ↓
Phase 2.2 (Dashboard & Notifikasi)
    ↓
Phase 2.3 (Jadwal & Availability)
    ↓
Phase 2.4 (Request & Chat Room)   ← Inti experience expert
    ↓
Phase 2.5 (Post-Session & Catatan Klinis)
    ↓
Phase 2.6 (Profil & Earnings)
```

Phase 2.1 adalah fondasi mutlak — tanpa alur registrasi + status verifikasi, tidak ada konteks login yang benar. Phase 2.4 (Chat Room) adalah inti pengalaman expert dan yang paling banyak berinteraksi dengan alur User, sehingga dibangun setelah navigasi & state awal siap.

---

## Purpose

- Melengkapi sisi Expert dari platform Hi-Me yang sudah dibangun di Phase 1 (repo User)
- Mensimulasikan alur kerja harian psikolog / konsultan secara end-to-end: dari daftar, verifikasi, terima sesi, konsultasi, hingga kirim catatan klinis
- Menyediakan prototype interaktif untuk UI/UX testing, presentasi stakeholder, dan portfolio
- Mempersiapkan groundwork untuk integrasi backend di masa mendatang
- Menjadi pasangan yang koheren dengan Phase 3 (Admin) yang bertugas memverifikasi expert baru dan mengelola platform secara keseluruhan
