# MPTopUp - Platform Top Up Game Online

**MPTopUp** adalah platform web top up voucher dan diamond game online resmi, berkecepatan tinggi, aman, dan beroperasi 24 jam nonstop dengan dukungan berbagai saluran pembayaran.

Project ini telah dikonfigurasi secara **100% lokal tanpa ketergantungan CDN** (menggunakan Tailwind CSS & Font Awesome lokal yang di-bundle via npm).

---

## Palet Warna & Identitas Brand (Berdasarkan Logo MP)
- **Primary Accent**: Electric Cyan / Vibrant Sky Blue (`#0EA5E9` / `#1BA0D7`)
- **Dark Neutral**: Midnight Dark / Jet Black (`#030712` / `#090D16` / `#0F172A`)
- **Accent Contrasts**: Emerald Green (`#10B981`) & Amber Gold (`#F59E0B`)

---

## Rekomendasi Repository GitHub
- **Nama Repo Utama**: `mptopup-web`
- **Alternatif**: `mp-gaming-store` atau `mptopup-games`

---

## Menjalankan & Mengembangkan Project (NPM & Tailwind CSS)

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Kompilasi Tailwind CSS
- **Build CSS (Produksi & Minifikasi)**:
  ```bash
  npm run build:css
  ```
- **Watch CSS (Live reload saat proses pengembangan)**:
  ```bash
  npm run watch:css
  ```

---

## Struktur Folder Project

```
mptopup-web/
├── .gitignore                 # Filter file Git (node_modules, logs, dll)
├── package.json               # Konfigurasi npm scripts & dependensi lokal
├── tailwind.config.js         # Konfigurasi tema Tailwind CSS & path content
├── src/
│   └── input.css              # Entrypoint CSS (Tailwind directives & custom styles)
├── index.html                 # Halaman Utama (Landing Page / Beranda)
├── pages/                     # Alur Pemesanan & Transaksi Pelanggan
│   ├── produk.html            # Halaman Checkout & Katalog Nominal Top Up
│   ├── konfirmasi.html        # Bukti Pembayaran / Invoice Digital (+ Cetak Bukti)
│   └── riwayat.html           # Riwayat & Pelacakan Status Transaksi Pelanggan
├── auth/                      # Autentikasi Pengguna
│   ├── login.html             # Halaman Masuk Akun
│   └── register.html          # Halaman Pendaftaran Member Baru
├── admin/                     # Portal Dashboard Administrator
│   ├── index.html             # Ringkasan KPI, Omzet & Tren Penjualan
│   ├── pesanan.html           # Manajemen & Pembaruan Status Pesanan Masuk
│   ├── produk.html            # Manajemen Game & Varian SKU Terintegrasi
│   ├── pengguna.html          # Manajemen Pengguna & Hak Akses
│   ├── promo.html             # Manajemen Kupon Promo & Cashback
│   ├── laporan.html           # Laporan Analitik & Ekspor Data CSV
│   └── pengaturan.html        # Konfigurasi Sistem, Saluran Bayar & Kredensial API
├── assets/                    # Aset Bersama
│   ├── css/
│   │   └── style.css          # CSS hasil kompilasi lokal Tailwind CSS (Minified)
│   ├── js/
│   │   ├── data.js            # Mock Database Terpusat & Sinkronisasi LocalStorage
│   │   └── main.js            # Format Rupiah & Helper Navigasi
│   ├── vendor/
│   │   └── fontawesome/       # Font Awesome 6 Offline (CSS & Webfonts)
│   └── images/                # Folder Aset Banner & Ikon
└── readme.md                  # Dokumentasi Project
```

---

## Fitur & Modul

### 1. Sisi Pelanggan (Client Side)
- **Beranda & Pencarian**: Banner hero, filter pencarian game instan, klaim voucher promo langsung, dan katalog game terpopuler.
- **Checkout Pemesanan**: Validasi input ID Akun & Server, pemilihan nominal produk dengan kalkulasi harga real-time, kode voucher diskon (*NEWUSER20* & *BONUS10*), dan multi-channel bayar (QRIS, E-Wallet, VA Bank).
- **Invoice Digital**: Tanda terima digital dengan nomor pesanan `#MP...` dan fungsi cetak receipt.
- **Pelacakan Transaksi**: Cari status pesanan secara real-time berdasarkan ID Pesanan atau nama game.
- **Autentikasi**: Form login & registrasi responsif dengan toggle visibilitas kata sandi dan validasi data.

### 2. Sisi Admin (Admin Panel)
- **Dashboard Analitik**: Metrik omzet, jumlah order sukses, chart aktivitas mingguan, dan ranking produk terlaris.
- **Manajemen Pesanan**: Tabel kontrol status pesanan (*Selesai, Pending, Gagal*) secara langsung.
- **Katalog Game & SKU**: Tambah/hapus game dan varian paket diamond yang otomatis tersinkronisasi ke katalog pelanggan via `localStorage`.
- **Pengguna & Akses**: Pengelolaan data user, role admin/pelanggan, dan status keaktifan.
- **Promo & Kupon**: Pembuatan kupon diskon persentase maupun potongan nominal tetap.
- **Laporan & Ekspor CSV**: Rekap transaksi per rentang tanggal dan tombol download file CSV.
- **Pengaturan Lengkap**: Konfigurasi umum, toggle channel pembayaran, notifikasi email, dan API keys (Midtrans & Digiflazz).
