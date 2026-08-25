# 🎮 MPTopUp - Platform Top Up Game Online Cepat, Aman & Resmi

Platform web top up voucher dan diamond game online resmi 24 jam nonstop dengan transaksi instan, multi-channel pembayaran, dan sistem manajemen admin terpadu.

---

## 📑 Daftar Isi

- [📖 Deskripsi Proyek](#-deskripsi-proyek)
  - [🎯 Tujuan & Solusi](#-tujuan--solusi)
  - [✨ Fitur Utama](#-fitur-utama)
- [⚙️ Prasyarat Sistem](#️-prasyarat-sistem)
- [🚀 Panduan Instalasi](#-panduan-instalasi)
- [💻 Penggunaan & Alur Kerja](#-penggunaan--alur-kerja)
  - [🛠️ Perintah Pengembangan](#️-perintah-pengembangan)
  - [🌐 Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [📂 Struktur Direktori Proyek](#-struktur-direktori-proyek)
- [🎨 Identitas Brand & Palet Warna](#-identitas-brand--palet-warna)
- [🤝 Panduan Kontribusi](#-panduan-kontribusi)
- [📄 Lisensi](#-lisensi)

---

## 📖 Deskripsi Proyek

### 🎯 Tujuan & Solusi
**MPTopUp** adalah Single Page Application (SPA) modern berbasis **Vue 3** (`<script setup>`, Composition API) dan **Vite** yang mengutamakan kecepatan, reaktivitas instan, keamanan transaksi, dan kemudahan akses bagi para gamer di Indonesia. Menggunakan arsitektur terstruktur dengan **Vue Router 4**, **Pinia State Management**, dan **Tailwind CSS Lokal** tanpa dependensi CDN, aplikasi ini super cepat, ringan, responsif, dan mudah dikembangkan.

### ✨ Fitur Utama

#### 1. Sisi Pelanggan (Customer Facing)
- ⚡ **Katalog Game Populer**: Pilihan judul game seperti Mobile Legends, Valorant, Free Fire, PUBG Mobile, Genshin Impact, dan voucher digital.
- 🔍 **Pencarian Real-Time**: Filter pencarian reaktif instan untuk menemukan game favorit dalam hitungan detik.
- 🏷️ **Sistem Kupon Promo**: Validasi kode diskon langsung saat checkout (contoh: `NEWUSER20` diskon 20%, `BONUS10` diskon 10%).
- 💳 **Metode Pembayaran Lengkap**: Mendukung QRIS (Semua E-Wallet & Mobile Banking), GoPay, DANA, OVO, BCA Virtual Account, dan Mandiri Virtual Account.
- 🏆 **Leaderboard Top Spender**: Podium ranking Top 3 (*Juara 1 🥇, 2 🥈, 3 🥉*) dengan filter periode (Harian, Mingguan, Bulanan, Sepanjang Masa) dan privasi sensor nomor/nama.
- 🧮 **Kalkulator Mobile Legends**:
  - *Kalkulator Win Rate*: Menghitung target kemenangan beruntun (*win streak*) tanpa kalah.
  - *Kalkulator Magic Wheel*: Estimasi sisa Magic Point, total Diamond/COA, dan nominal Rupiah skin Legend.
  - *Kalkulator Zodiac*: Estimasi sisa Star Power dan jadwal rotasi 12 skin zodiak.
- 📰 **Artikel & Panduan Gaming**: Portal berita, tips & trik hemat diamond, event promo, dan panduan meta hero dengan pembaca artikel detail.
- ⭐ **Ulasan & Kepuasan Pelanggan**: Rekapitulasi rating bintang (4.9/5.0), distribusi bintang, dan formulir kirim ulasan interaktif.
- 📞 **Layanan Bantuan & Hubungi Kami**: Akses direct chat WhatsApp 24 jam (`wa.me`), form pesan bantuan, dan FAQ interaktif.
- 🕒 **Pelacakan Status Pesanan**: Lacak status pemrosesan item game secara real-time melalui halaman Riwayat lengkap dengan penomoran `#` otomatis dan tombol aksi icon invoice.
- 🔐 **Autentikasi Pengguna & Google OAuth**: Mendukung login instan via **Google OAuth** dan pendaftaran manual dengan enkripsi aman, serta sinkronisasi otomatis ke profil Supabase.
- 🗄️ **Database Cloud Supabase**: Terintegrasi dengan PostgreSQL Supabase + Row Level Security (RLS) dan panduan setup lengkap di [`docs/02_SUPABASE_SETUP.md`](docs/02_SUPABASE_SETUP.md).

#### 2. Sisi Administrator (Admin Dashboard)
- 📊 **Dashboard Analitik**: Ringkasan omzet bulanan, jumlah transaksi sukses, grafik tren penjualan 7 hari, dan tabel transaksi terkini berpenomoran `#`.
- 📦 **Manajemen Pesanan**: Pengendalian dan pembaruan status pesanan (*Selesai, Pending, Gagal*) secara langsung via modal full screen overlay.
- 🎮 **Manajemen Game & Varian SKU**: Tambah/hapus game dengan area unggah banner drag & drop, serta manajemen varian SKU internal.
- 👥 **Manajemen Pengguna**: Pengelolaan akun pelanggan dan administrator beserta status keaktifan melalui modal form ber-icon.
- 🎟️ **Manajemen Promo & Kupon**: Pembuatan program diskon persentase maupun nominal potongan tetap.
- 📥 **Laporan & Ekspor Data (CSV)**: Filter laporan berdasarkan periode tanggal dan unduh data ke format spreadsheet CSV.
- ⚙️ **Pengaturan Sistem**: Konfigurasi nama toko, unggah logo brand & favicon via drag & drop, toggle channel bayar, notifikasi email/WA, dan manajemen kunci API (*Midtrans* & *Digiflazz*).

#### 3. Standar Desain & Interaksi (Design System Standards)
- 🪟 **Modal Full-Screen Viewport**: Modal overlay responsif (`fixed inset-0 min-h-screen bg-slate-950/85 backdrop-blur-md`) menutup layar secara penuh dengan dialog box di tengah.
- 📁 **Unggah Berkas Drag & Drop**: Area dropzone interaktif dengan indikator visual dan kartu preview file sukses ber-icon.
- 🔘 **Icon + Teks Harmonis**: Semua tombol utama memiliki ikon + label teks, dan tombol aksi tabel berbentuk ikon presisi.
- 🔢 **Penomoran Otomatis**: Setiap tabel data memiliki kolom penomoran `#` yang rapi.
- ⚡ **Animasi Halus 60fps**: Transisi antar halaman dan interaksi kartu responsif tanpa membebani performa browser.

---

## ⚙️ Prasyarat Sistem

- **Node.js**: Versi `>= 18.x`
- **NPM**: Versi `>= 9.x`
- **Web Browser**: Chrome, Firefox, Safari, atau Edge versi modern

---

## 🚀 Panduan Instalasi & Setup

```bash
# 1. Masuk ke direktori proyek
cd /path/to/tailwind-web-topup-games

# 2. Instal seluruh dependensi lokal (tanpa CDN)
npm install

# 3. Buat file konfigurasi lingkungan (.env)
cp .env.example .env
# (Opsional) Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY sesuai panduan di docs/02_SUPABASE_SETUP.md

# 4. Jalankan server pengembangan lokal
npm run dev
```

---

## 💻 Penggunaan & Alur Kerja

### 🛠️ Perintah Pengembangan

| Perintah | Fungsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server lokal Vite pada port 3000 |
| `npm run build` | Melakukan kompilasi aset untuk deployment produksi ke folder `dist/` |
| `npm run preview` | Menjalankan server preview lokal untuk memverifikasi hasil build `dist/` |

### 🌐 Menjalankan Aplikasi

1. **Aplikasi Publik / Toko Pelanggan**:
   👉 **`http://localhost:3000`**
2. **Katalog Lengkap Game**:
   👉 **`http://localhost:3000/produk`**
3. **Lacak Pesanan Real-Time**:
   👉 **`http://localhost:3000/riwayat`**
4. **Leaderboard Sultan Top Spender**:
   👉 **`http://localhost:3000/leaderboard`**
5. **Kalkulator Mobile Legends (Win Rate, Magic Wheel, Zodiac)**:
   👉 **`http://localhost:3000/kalkulator`**
6. **Artikel & Panduan Gaming**:
   👉 **`http://localhost:3000/artikel`**
7. **Ulasan & Testimoni Pelanggan**:
   👉 **`http://localhost:3000/ulasan`**
8. **Layanan Bantuan / Hubungi Kami**:
   👉 **`http://localhost:3000/hubungi-kami`**
9. **Masuk Akun (Email / Google OAuth)**:
   👉 **`http://localhost:3000/login`**
10. **Portal Manajemen Administrator**:
   👉 **`http://localhost:3000/modules`** *(URL khusus admin)*

---

## 📂 Struktur Direktori Proyek

```
tailwind-web-topup-games/
├── index.html                   # Entry point dokumen HTML
├── package.json                 # Konfigurasi dependensi NPM & script
├── vite.config.js               # Konfigurasi bundler Vite
├── tailwind.config.js           # Konfigurasi tema Tailwind CSS
├── postcss.config.js            # Plugin PostCSS (Tailwind & Autoprefixer)
├── .env.example                 # Template environment variables Supabase
├── docs/                        # Dokumentasi Proyek
│   ├── 01_LOCAL_DEVELOPMENT_GUIDE.md # Panduan Deploy & Development Lokal (Laragon, Docker)
│   ├── 02_SUPABASE_SETUP.md          # Panduan Setup Supabase & Google OAuth Lengkap
│   └── 03_DEPLOYMENT_GUIDE.md        # Panduan Deploy Server (VPS, aaPanel, Vercel, Cloudflare, cPanel)
├── supabase/                    # Skema Database & Migrasi
│   └── migrations/
│       └── 20260825_initial_schema.sql # Skema PostgreSQL, RLS & Trigger
├── public/                      # Asset statis lokal (Zero-CDN)
│   ├── .htaccess                # Konfigurasi Apache / cPanel / LiteSpeed
│   ├── _redirects               # Konfigurasi SPA Cloudflare Pages / Netlify
│   ├── _headers                 # Konfigurasi Security Headers Cloudflare
│   ├── favicon.ico              # Favicon resmi
│   └── images/                  # Aset gambar & ilustrasi
├── vercel.json                  # Konfigurasi Deployment Vercel
├── nginx.conf.example           # Contoh Konfigurasi Web Server Nginx Production
├── Dockerfile                   # Multi-stage Docker Container
├── docker-compose.yml           # Docker Compose Production/Local Orchestration
├── src/                         # Sumber Kode Aplikasi Vue 3
│   ├── main.js                  # Inisialisasi Vue, Pinia & Router
│   ├── App.vue                  # Root component dengan transition
│   ├── lib/
│   │   └── supabase.js          # Inisialisasi Supabase Client & fallback
│   ├── assets/
│   │   └── css/
│   │       └── main.css         # Tailwind directives & global dark gaming styling
│   ├── components/              # Komponen Modular & Reusable
│   │   ├── common/
│   │   │   ├── Navbar.vue       # Header navigasi pelanggan dengan profil login & dropdown tools
│   │   │   ├── Footer.vue       # Footer resmi beranda & customer support
│   │   │   ├── Modal.vue        # Universal full-screen viewport modal dialog
│   │   │   └── DragDropUpload.vue # Drag & Drop file uploader dengan live file card preview
│   ├── middleware/              # Route Middleware Pipeline
│   │   ├── index.js             # Middleware barrel export
│   │   ├── pipeline.js          # Sequential pipeline runner
│   │   ├── auth.js              # Auth middleware (proteksi rute privat)
│   │   ├── guest.js             # Guest middleware (khusus pengguna belum login)
│   │   └── admin.js             # Admin RBAC middleware (proteksi rute /modules)
│   ├── layouts/
│   │   ├── app-public.vue       # Layout utama halaman publik (Navbar + Content + Footer)
│   │   ├── app-auth.vue         # Layout modul autentikasi (Header + Centered Card + Footer)
│   │   └── app-modules.vue      # Layout portal administrator (Sidebar + Topbar + Content)
│   ├── router/
│   │   └── index.js             # Definisi rute SPA, callback, & middleware pipeline
│   ├── stores/
│   │   ├── authStore.js         # Store Pinia: Autentikasi Google OAuth & Email
│   │   ├── gamesStore.js        # Store Pinia: Katalog game, varian SKU, CRUD Admin
│   │   ├── ordersStore.js       # Store Pinia: Checkout aktif, riwayat transaksi, filter
│   │   ├── promoStore.js        # Store Pinia: Kupon diskon, validasi promo
│   │   ├── usersStore.js        # Store Pinia: Manajemen pengguna & admin
│   │   ├── leaderboardStore.js  # Store Pinia: Peringkat Sultan Top Spender
│   │   ├── articlesStore.js     # Store Pinia: Artikel & Panduan Gaming
│   │   └── reviewsStore.js      # Store Pinia: Ulasan & Testimoni Pelanggan
│   └── views/                   # Tampilan Rute Halaman
│       ├── public/              # Halaman Landing & Area Pelanggan
│       │   ├── HomeView.vue         # Halaman Beranda (Landing Page & Hero Slider)
│       │   ├── CatalogView.vue      # Katalog Lengkap Game & Voucher Digital (/produk)
│       │   ├── ProductDetailView.vue# Halaman Checkout & Varian Diamond 5-Langkah (/produk/:id)
│       │   ├── ConfirmationView.vue # Bukti Pembayaran Digital (Invoice + Cetak Bukti)
│       │   ├── OrderHistoryView.vue # Halaman Lacak Pesanan & Riwayat Transaksi (# Auto-numbered)
│       │   ├── LeaderboardView.vue  # Halaman Peringkat Sultan Top Spender (/leaderboard)
│       │   ├── ArticlesView.vue     # Katalog Artikel, Berita & Tips (/artikel)
│       │   ├── ArticleDetailView.vue# Halaman Baca Artikel Detail (/artikel/:slug)
│       │   ├── CalculatorView.vue   # Tools Kalkulator MLBB Win Rate, Magic Wheel & Zodiac (/kalkulator)
│       │   ├── ContactView.vue      # Halaman Layanan Bantuan & Hubungi Kami (/hubungi-kami)
│       │   └── ReviewsView.vue      # Halaman Ulasan & Testimoni Pelanggan (/ulasan)
│       ├── auth/                # Modul Autentikasi Pengguna
│       │   ├── LoginView.vue        # Halaman Masuk Akun
│       │   ├── RegisterView.vue     # Halaman Registrasi Member Baru
│       │   └── AuthCallbackView.vue # Handler Callback Redirect Google OAuth
│       └── modules/             # Halaman Portal Manajemen / Admin (URL: /modules)
│           ├── DashboardView.vue    # Ringkasan KPI & Pesanan Masuk (/modules)
│           ├── OrdersView.vue       # Kelola Status Pesanan & Modal Edit (/modules/pesanan)
│           ├── ProductsView.vue     # Kelola Katalog Game & Modal Varian SKU (/modules/produk)
│           ├── UsersView.vue        # Kelola Data Pengguna & Modal Tambah/Edit (/modules/pengguna)
│           ├── PromoView.vue        # Kelola Program Promo & Modal Kupon (/modules/promo)
│           ├── ReportsView.vue      # Laporan Analitik & Ekspor CSV (/modules/laporan)
│           └── SettingsView.vue     # Tab Pengaturan Sistem (/modules/pengaturan)
└── README.md                    # Dokumentasi Resmi Proyek
```

---

## 🎨 Identitas Brand & Palet Warna

Skema warna diselaraskan dengan identitas logo **MP** (*Midnight Dark & Electric Cyan*):

- 🔵 **Primary Brand Accent**: Electric Cyan / Sky Blue (`#0EA5E9` / `#38BDF8`)
- ⚫ **Deep Surfaces**: Midnight Dark & Jet Black (`#030712` / `#090D16` / `#0F172A`)
- 🟢 **Success Indicator**: Emerald Green (`#10B981`)
- 🟡 **Warning / Bonus Highlight**: Amber Gold (`#F59E0B`)

---

## 🤝 Panduan Kontribusi

Kontribusi dari komunitas dan pengembang lain sangat disambut! Untuk menjaga kerapian repositori, ikuti aturan alur kerja berikut:

1. **Fork Repositori**: Buat salinan repositori ke akun GitHub Anda.
2. **Buat Branch Fitur**:
   ```bash
   git checkout -b feature/nama-fitur-baru
   ```
3. **Gunakan Semantic Commit Messages (Bahasa Indonesia)**:
   Format standar: `tipe(cakupan): deskripsi singkat`
   - `feat(pesanan): menambahkan filter tanggal pada riwayat`
   - `fix(checkout): memperbaiki perhitungan diskon kupon persentase`
   - `docs(readme): memperbarui instruksi instalasi`
   - `style(admin): merapikan margin kartu metrik`
   - `refactor(storage): menyederhanakan sinkronisasi localstorage`
   - `chore(deps): memperbarui versi tailwindcss`
4. **Push ke Branch Anda**:
   ```bash
   git push origin feature/nama-fitur-baru
   ```
5. **Buat Pull Request**: Buka Pull Request ke branch `main` repositori utama dengan penjelasan perubahan yang jelas.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **[MIT License](LICENSE)**. Anda bebas menggunakan, memodifikasi, dan mendistribusikan kode ini untuk keperluan pribadi maupun komersial dengan tetap menyertakan atribusi hak cipta asli.

&copy; 2026 **MPTopUp**. Hak Cipta Dilindungi.
