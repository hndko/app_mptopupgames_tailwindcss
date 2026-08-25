# 🌐 Panduan Deployment Server Produksi: MPTopUp

Dokumentasi ini menyediakan panduan langkah demi langkah untuk melakukan deploy aplikasi web **MPTopUp (Vue 3 + Vite + Tailwind CSS)** ke berbagai platform hosting modern: **Vercel**, **Cloudflare Pages**, **Nginx VPS (Ubuntu/Debian)**, dan **Shared Hosting (cPanel)**.

---

## 📑 DAFTAR ISI
1. [Deploy ke Vercel (Rekomendasi Terbaik)](#1-deploy-ke-vercel-rekomendasi-terbaik)
2. [Deploy ke Cloudflare Pages (Gratis & Ultra Cepat)](#2-deploy-ke-cloudflare-pages-gratis--ultra-cepat)
3. [Deploy ke Nginx VPS / Linux Server](#3-deploy-ke-nginx-vps--linux-server)
4. [Deploy ke Shared Hosting / cPanel](#4-deploy-ke-shared-hosting--cpanel)

---

## 1. Deploy ke Vercel (Rekomendasi Terbaik)

Vercel sangat optimal untuk aplikasi Vue 3 Vite dengan dukungan otomatis HTTPS global, Edge Network, dan zero-config routing.

### Langkah-langkah:
1. Buka [https://vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik tombol **Add New...** -> **Project**.
3. Pilih repositori GitHub Anda: `app_mptopupgames_tailwindcss`.
4. Pada bagian **Configure Project**:
   - **Framework Preset**: Pilih `Vite`.
   - **Root Directory**: `./` (Default).
   - **Build Command**: `npm run build` (Default).
   - **Output Directory**: `dist` (Default).
5. Pada bagian **Environment Variables**, tambahkan:
   - `VITE_SUPABASE_URL`: *(URL Supabase Anda)*
   - `VITE_SUPABASE_ANON_KEY`: *(Anon Key Supabase Anda)*
6. Klik **Deploy**.
7. Dalam waktu ~30 detik, website Anda akan live dengan domain `*.vercel.app` dan sertifikat SSL aktif otomatis.

> File konfigurasi routing dan security headers telah disiapkan di [`vercel.json`](../vercel.json).

---

## 2. Deploy ke Cloudflare Pages (Gratis & Ultra Cepat)

Cloudflare Pages menyediakan hosting statis gratis tanpa batas bandwidth dengan jaringan CDN terluas di dunia.

### Langkah-langkah:
1. Buka [https://dash.cloudflare.com/](https://dash.cloudflare.com/) dan login.
2. Pilih menu **Workers & Pages** -> Klik **Create application** -> Pilih tab **Pages**.
3. Klik **Connect to Git** dan pilih repositori `app_mptopupgames_tailwindcss`.
4. Pada **Build settings**:
   - **Framework preset**: `Vue` atau `Vite`.
   - **Build command**: `npm run build`.
   - **Build output directory**: `dist`.
5. Di bagian **Environment variables (production)**, tambahkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`.
6. Klik **Save and Deploy**.

> File SPA fallback [`public/_redirects`](../public/_redirects) dan headers [`public/_headers`](../public/_headers) akan otomatis disalin ke folder `dist` saat proses build.

---

## 3. Deploy ke Nginx VPS / Linux Server

Jika Anda menggunakan VPS Ubuntu/Debian di DigitalOcean, Linode, AWS EC2, atau Biznet:

### A. Persiapan Server
```bash
# Update server & pasang Node.js, Git, Nginx, Certbot
sudo apt update && sudo apt upgrade -y
sudo apt install -y git nginx curl certbot python3-certbot-nginx

# Pasang Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### B. Clone Proyek & Build
```bash
# Masuk ke direktori web server
cd /var/www
sudo git clone https://github.com/hndko/app_mptopupgames_tailwindcss.git mptopup
cd /var/www/mptopup

# Pasang dependensi & setup .env
sudo npm install
sudo cp .env.example .env
sudo nano .env # Masukkan VITE_SUPABASE_URL & ANON KEY

# Build aplikasi ke folder dist
sudo npm run build

# Beri permission ke www-data
sudo chown -R www-data:www-data /var/www/mptopup/dist
sudo chmod -R 755 /var/www/mptopup/dist
```

### C. Konfigurasi Nginx
Buat file konfigurasi baru di `/etc/nginx/sites-available/mptopup.conf`:
```bash
sudo nano /etc/nginx/sites-available/mptopup.conf
```
Salin template konfigurasi dari [`nginx.conf.example`](../nginx.conf.example) yang sudah disediakan.

Aktifkan konfigurasi dan restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/mptopup.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### D. Pasang SSL Gratis (Let's Encrypt)
```bash
sudo certbot --nginx -d domainanda.com -d www.domainanda.com
```

---

## 4. Deploy ke Shared Hosting / cPanel

Untuk hosting berbasis Apache / cPanel (Niagahoster, Hostinger, DomaiNesia, dll.):

### Langkah-langkah:
1. **Lakukan Build Lokal**:
   Di komputer lokal Anda, jalankan:
   ```bash
   npm run build
   ```
2. Buka folder `d:\laragon\www\tailwind-web-topup-games\dist`.
3. Kompres seluruh isi di dalam folder `dist/` menjadi file `mptopup-dist.zip` (pastikan file `.htaccess` di dalam folder `dist` ikut terkompres).
4. Buka **cPanel** -> **File Manager** -> masuk ke direktori `public_html` (atau folder subdomain Anda).
5. Unggah file `mptopup-dist.zip`, lalu klik kanan dan pilih **Extract**.
6. Pastikan file `index.html`, `.htaccess`, dan folder `assets/` berada langsung di dalam `public_html`.
7. Buka domain Anda di browser. Semua routing SPA dan refresh halaman akan berjalan lancar berkat aturan di `.htaccess`.
