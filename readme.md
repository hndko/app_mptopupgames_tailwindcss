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
- 🧾 **Tanda Terima Digital & Cetak Bukti**: Invoice transaksi resmi dengan nomor pesanan otomatis `#MPxxxxxx`, upload bukti transfer via drag & drop, dan tombol cetak receipt (`window.print()`).
- 🕒 **Pelacakan Status Pesanan**: Lacak status pemrosesan item game secara real-time melalui halaman Riwayat lengkap dengan penomoran `#` otomatis dan tombol aksi icon invoice.
- 🔐 **Autentikasi Pengguna**: Formulir Masuk dan Pendaftaran Member Baru dengan input icon group, visibilitas kata sandi, dan validasi data.

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
- 🔤 **Form Input Icon Groups**: Seluruh input dan select form dilengkapi icon group pendukung dan teks placeholder yang informatif.
- 📤 **Drag & Drop File Upload**: Komponen upload file interaktif yang menampilkan hasil kartu preview file (nama, ukuran file, thumbnail preview, dan tombol hapus).
- 🔘 **Konsistensi Tombol & Aksi Tabel**: Tombol reguler memiliki icon + teks, sedangkan tombol aksi pada tabel (`<td>`) khusus hanya icon tooltip untuk kerapian visual.
- 🔢 **Penomoran Tabel Otomatis**: Setiap baris tabel dilengkapi kolom nomor urut `#` yang terisi secara otomatis.

---

## ⚙️ Prasyarat Sistem

Sebelum memasang dan menjalankan proyek ini, pastikan sistem Anda telah memenuhi prasyarat berikut:

- **Node.js**: Versi `18.x` atau lebih baru (Disarankan `v20.x` / `v22.x`)
- **NPM**: Versi `9.x` atau lebih baru
- **Git**: Versi `2.x` atau lebih baru
- **Web Browser**: Google Chrome, Mozilla Firefox, Microsoft Edge, atau Safari versi modern

---

## 🚀 Panduan Instalasi & Menjalankan Proyek

Ikuti langkah-langkah berikut untuk mengunduh, memasang dependensi, dan menjalankan server secara manual di komputer lokal:

### 1. Kloning Repositori
```bash
git clone https://github.com/hndko/app_mptopupgames_tailwindcss.git
cd app_mptopupgames_tailwindcss
```

### 2. Pasang Dependensi Proyek
```bash
npm install
```

### 3. Jalankan Server Pengembangan (Vite Dev Server)
Jalankan perintah berikut di terminal:
```bash
npm run dev
```
Setelah dijalankan, buka browser di alamat yang tertera pada terminal:
👉 **`http://localhost:3000`**

### 4. Build untuk Lingkungan Produksi (Opsional)
Untuk mengompilasi seluruh kode sumber menjadi bundle produksi terminifikasi:
```bash
npm run build
```

### 5. Preview Hasil Build Produksi (Opsional)
Untuk menguji hasil build produksi secara lokal:
```bash
npm run preview
```

---

## 💻 Rangkuman Perintah Terminal

| Perintah Terminal | Deskripsi Fungsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server pengembangan lokal (Vite) dengan *Hot Module Replacement (HMR)* pada port 3000. |
| `npm run build` | Mengompilasi dan membundle aplikasi Vue 3 ke dalam direktori `dist/` untuk deployment produksi. |
| `npm run preview` | Menjalankan server lokal untuk menguji build produksi yang ada di direktori `dist/`. |

---

## 📂 Struktur Direktori Proyek

```
tailwind-web-topup-games/
├── index.html                   # HTML Entrypoint Vite
├── package.json                 # Dependensi Vue 3, Vite, Vue Router, Pinia & Tailwind
├── vite.config.js               # Konfigurasi Vite & Alias path (@/ -> src/)
├── tailwind.config.js           # Konfigurasi Tailwind CSS (Color Palette & Content Paths)
├── postcss.config.js            # PostCSS plugin (Tailwind + Autoprefixer)
├── public/                      # Aset Statis Publik (Favicon, Logo, Images)
│   └── images/                  # Aset grafis SVG vektor & logo pembayaran
├── src/
│   ├── main.js                  # Entrypoint aplikasi (Inisialisasi Vue, Router, Pinia, CSS)
│   ├── App.vue                  # Root Component Vue
│   ├── assets/
│   │   └── css/
│   │       └── main.css         # Tailwind directives & global dark gaming styling
│   ├── components/              # Komponen Modular & Reusable
│   │   ├── common/
│   │   │   ├── Navbar.vue       # Header navigasi pelanggan dengan pencarian & link
│   │   │   ├── Footer.vue       # Footer resmi beranda & customer support
│   │   │   ├── Modal.vue        # Universal full-screen viewport modal dialog
│   │   │   └── DragDropUpload.vue # Drag & Drop file uploader dengan live file card preview
│   ├── layouts/
│   │   ├── DefaultLayout.vue    # Layout utama pelanggan (Navbar + Content + Footer)
│   │   └── AdminLayout.vue      # Layout portal administrator (Sidebar + Topbar + Content)
│   ├── router/
│   │   └── index.js             # Definisi rute SPA (Vue Router 4)
│   ├── stores/
│   │   ├── gamesStore.js        # Store Pinia: Katalog game, varian SKU, CRUD Admin
│   │   ├── ordersStore.js       # Store Pinia: Checkout aktif, riwayat transaksi, filter
│   │   ├── promoStore.js        # Store Pinia: Kupon diskon, validasi promo
│   │   └── usersStore.js        # Store Pinia: Manajemen pengguna & admin
│   └── views/                   # Tampilan Rute Halaman
│       ├── public/              # Halaman Landing & Area Pelanggan
│       │   ├── HomeView.vue         # Halaman Beranda (Landing Page & Hero Slider)
│       │   ├── CatalogView.vue      # Katalog Lengkap Game & Voucher Digital (/produk)
│       │   ├── ProductDetailView.vue# Halaman Checkout & Varian Diamond 5-Langkah (/produk/:id)
│       │   ├── ConfirmationView.vue # Bukti Pembayaran Digital (Invoice + Cetak Bukti)
│       │   └── OrderHistoryView.vue # Halaman Lacak Pesanan & Riwayat Transaksi (# Auto-numbered)
│       ├── auth/                # Modul Autentikasi Pengguna
│       │   ├── LoginView.vue        # Halaman Masuk Akun
│       │   └── RegisterView.vue     # Halaman Registrasi Member Baru
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
