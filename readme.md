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
**MPTopUp** hadir sebagai solusi platform top up game modern yang mengutamakan kecepatan, keamanan transaksi, dan kemudahan akses bagi para gamer di Indonesia. Dibangun menggunakan teknologi **Tailwind CSS Lokal** tanpa dependensi CDN, aplikasi ini ringan, cepat dimuat, dan responsif di berbagai perangkat seluler maupun desktop.

### ✨ Fitur Utama

#### 1. Sisi Pelanggan (Customer Facing)
- ⚡ **Katalog Game Populer**: Pilihan judul game seperti Mobile Legends, Valorant, Free Fire, PUBG Mobile, Genshin Impact, dan voucher digital.
- 🔍 **Pencarian Real-Time**: Fitur filter pencarian instan untuk menemukan game favorit dalam hitungan detik.
- 🏷️ **Sistem Kupon Promo**: Validasi kode diskon langsung saat checkout (contoh: `NEWUSER20` diskon 20%, `BONUS10` diskon 10%).
- 💳 **Metode Pembayaran Lengkap**: Mendukung QRIS (Semua E-Wallet), GoPay, DANA, OVO, BCA Virtual Account, dan Mandiri Virtual Account.
- 🧾 **Tanda Terima Digital & Cetak Bukti**: Invoice transaksi resmi dengan nomor pesanan otomatis `#MPxxxxxx` dan tombol cetak receipt.
- 🕒 **Pelacakan Status Pesanan**: Lacak status pemrosesan item game secara real-time melalui halaman Riwayat.
- 🔐 **Autentikasi Pengguna**: Formulir Masuk dan Pendaftaran Member Baru dengan visibilitas kata sandi dan validasi data.

#### 2. Sisi Administrator (Admin Dashboard)
- 📊 **Dashboard Analitik**: Ringkasan omzet bulanan, jumlah transaksi sukses, grafik tren penjualan 7 hari, dan peringkat game terlaris.
- 📦 **Manajemen Pesanan**: Pengendalian dan pembaruan status pesanan (*Selesai, Pending, Gagal*) secara langsung.
- 🎮 **Manajemen Game & Varian SKU**: Tambah/hapus game dan paket nominal diamond yang otomatis tersinkronisasi ke katalog pembeli via `localStorage`.
- 👥 **Manajemen Pengguna**: Pengelolaan akun pelanggan dan administrator beserta status keaktifan.
- 🎟️ **Manajemen Promo & Kupon**: Pembuatan program diskon persentase maupun nominal potongan tetap.
- 📥 **Laporan & Ekspor Data (CSV)**: Filter laporan berdasarkan periode tanggal dan unduh data ke format spreadsheet CSV.
- ⚙️ **Pengaturan Sistem**: Konfigurasi nama toko, kontak bantuan, toggle channel bayar, notifikasi email, dan manajemen kunci API (*Midtrans* & *Digiflazz*).

---

## ⚙️ Prasyarat Sistem

Sebelum memasang dan menjalankan proyek ini, pastikan sistem Anda telah memenuhi prasyarat berikut:

- **Node.js**: Versi `18.x` atau lebih baru (Disarankan `v20.x` / `v22.x`)
- **NPM**: Versi `9.x` atau lebih baru
- **Git**: Versi `2.x` atau lebih baru
- **Web Browser**: Google Chrome, Mozilla Firefox, Microsoft Edge, atau Safari versi modern
- **Web Server Lokal (Opsional)**: Laragon, XAMPP, Live Server (VS Code), atau `npx serve`

---

## 🚀 Panduan Instalasi

Ikuti langkah-langkah berikut untuk mengunduh dan menyiapkan proyek di komputer lokal:

### 1. Kloning Repositori
```bash
git clone https://github.com/hndko/tailwind-web-topup-games.git
cd tailwind-web-topup-games
```

### 2. Pasang Dependensi Proyek
```bash
npm install
```

### 3. Kompilasi Aset CSS Tailwind
```bash
npm run build:css
```

---

## 💻 Penggunaan & Alur Kerja

### 🛠️ Perintah Pengembangan

| Perintah Terminal | Deskripsi Fungsi |
| :--- | :--- |
| `npm run build:css` | Mengompilasi dan meminifikasi file CSS untuk kebutuhan produksi (`assets/css/style.css`). |
| `npm run watch:css` | Memantau perubahan file HTML/JS secara otomatis dan me-rebuild CSS secara instan. |

### 🌐 Menjalankan Aplikasi

1. **Menggunakan Live Server / Localhost**:
   - Buka direktori proyek di VS Code dan klik **Go Live** via ekstensi *Live Server*.
   - Atau akses melalui virtual host lokal (contoh: `http://localhost/tailwind-web-topup-games` di Laragon/XAMPP).
   - Atau gunakan modul statis Node.js:
     ```bash
     npx serve .
     ```

2. **Navigasi Halaman Utama**:
   - **Beranda Toko**: Buka `index.html`
   - **Katalog & Checkout**: Buka `pages/produk.html`
   - **Riwayat Transaksi**: Buka `pages/riwayat.html`
   - **Portal Admin**: Buka `admin/index.html`
   - **Halaman Masuk**: Buka `auth/login.html`

---

## 📂 Struktur Direktori Proyek

```
tailwind-web-topup-games/
├── .gitignore                 # Daftar file & direktori yang diabaikan oleh Git
├── package.json               # Konfigurasi dependensi npm & build scripts
├── tailwind.config.js         # Konfigurasi Tailwind CSS (Color Palette & Content Paths)
├── src/
│   └── input.css              # Entrypoint CSS Tailwind & custom layer styling
├── index.html                 # Halaman Beranda (Landing Page)
├── pages/                     # Alur Transaksi & Pelanggan
│   ├── produk.html            # Halaman Checkout & Pilihan SKU Diamond
│   ├── konfirmasi.html        # Bukti Pembayaran Digital (+ Print Receipt)
│   └── riwayat.html           # Riwayat & Pelacakan Status Pesanan
├── auth/                      # Modul Autentikasi Pengguna
│   ├── login.html             # Halaman Masuk Akun
│   └── register.html          # Halaman Pendaftaran Member Baru
├── admin/                     # Dashboard Pengelolaan Administrator
│   ├── index.html             # Dashboard Ringkasan & Metrik Penjualan
│   ├── pesanan.html           # Manajemen & Verifikasi Pesanan Masuk
│   ├── produk.html            # Manajemen Katalog Game & Varian SKU
│   ├── pengguna.html          # Manajemen Akun Pengguna & Role
│   ├── promo.html             # Manajemen Kupon Diskon & Cashback
│   ├── laporan.html           # Laporan Analitik & Ekspor CSV
│   └── pengaturan.html        # Konfigurasi Sistem, Payment Channel & Kredensial API
├── assets/                    # Aset Statis Bersama
│   ├── css/
│   │   └── style.css          # Output CSS terkompilasi & terminifikasi
│   ├── js/
│   │   ├── data.js            # Mock Database & Sinkronisasi LocalStorage
│   │   └── main.js            # Format Angka Mata Uang & Navigasi Helper
│   ├── vendor/
│   │   └── fontawesome/       # Font Awesome 6 Offline (CSS & Webfonts)
│   └── images/                # Asset Gambar & Logo
└── readme.md                  # Dokumentasi Resmi Proyek
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
