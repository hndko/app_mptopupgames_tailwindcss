# 🌐 Panduan Deployment Server Produksi: MPTopUp

Dokumentasi ini menyediakan panduan lengkap dan terstruktur untuk melakukan deployment aplikasi web **MPTopUp (Vue 3 + Vite + Tailwind CSS)** ke berbagai lingkungan server: **VPS dengan aaPanel**, **VPS Linux Murni (Ubuntu/Debian Nginx)**, **Vercel**, **Cloudflare Pages**, dan **Shared Hosting (cPanel)**.

---

## 📑 DAFTAR ISI
1. [Deploy ke VPS dengan aaPanel (Rekomendasi Panel GUI)](#1-deploy-ke-vps-dengan-aapanel-rekomendasi-panel-gui)
2. [Deploy ke VPS Linux Murni (Ubuntu/Debian Nginx)](#2-deploy-ke-vps-linux-murni-ubuntudebian-nginx)
3. [Deploy ke Vercel (Edge Serverless)](#3-deploy-ke-vercel-edge-serverless)
4. [Deploy ke Cloudflare Pages (Free Global CDN)](#4-deploy-ke-cloudflare-pages-free-global-cdn)
5. [Deploy ke Shared Hosting / cPanel](#5-deploy-ke-shared-hosting--cpanel)

---

## 1. Deploy ke VPS dengan aaPanel (Rekomendasi Panel GUI)

aaPanel adalah web control panel gratis yang sangat populer untuk mengelola VPS dengan antarmuka grafis (GUI) yang ramah pengguna.

### Langkah 1: Pasang aaPanel & Web Server LNMP
Jika VPS Anda masih baru:
```bash
# Untuk Ubuntu / Debian
wget -O install.sh http://www.aapanel.com/script/install-ubuntu_6.0_en.sh && sudo bash install.sh aapanel
```
Setelah instalasi selesai, buka URL admin aaPanel di browser, lalu instal stack **LNMP (Nginx 1.22+, MySQL/MariaDB opsional, PHP opsional)**.

---

### Langkah 2: Tambahkan Website Baru di aaPanel
1. Di dashboard aaPanel, buka menu **Website** -> Klik tombol **Add site**.
2. Masukkan nama domain Anda (misalnya: `mptopup.com` dan `www.mptopup.com`).
3. Pada **Site directory**, arahkan ke:
   - `/www/wwwroot/mptopup.com/dist` *(Jika clone git langsung di server)*, ATAU
   - `/www/wwwroot/mptopup.com` *(Jika mengunggah file zip hasil build `dist/`)*.
4. Klik **Submit**.

---

### Langkah 3: Konfigurasi URL Rewrite (Wajib untuk Vue SPA)
Agar tidak terjadi error `404 Not Found` saat halaman di-*refresh* di rute selain beranda (seperti `/produk`, `/riwayat`, `/modules`):
1. Pada daftar website di aaPanel, klik nama website Anda untuk membuka **Site Settings**.
2. Pilih tab menu **URL rewrite**.
3. Masukkan konfigurasi Nginx berikut ke dalam editor teks:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```
4. Klik **Save**.

---

### Langkah 4: Aktifkan SSL / HTTPS Gratis (Let's Encrypt)
1. Masih di dalam menu **Site Settings**, pilih tab **SSL**.
2. Pilih sub-tab **Let's Encrypt**.
3. Centang semua domain Anda (`mptopup.com` dan `www.mptopup.com`).
4. Klik **Apply**.
5. Setelah sertifikat terbit, aktifkan sakelar **Force HTTPS** di pojok kanan atas.

---

### Langkah 5: Deployment Kode Proyek (2 Pilihan)

#### Opsi A: Build Langsung di Server via aaPanel Terminal (Direkomendasikan)
1. Buka menu **App Store** di aaPanel -> Cari dan pasang **Node.js Version Manager**.
2. Di dalam Node.js Version Manager, pasang versi Node.js **v20.x LTS**.
3. Buka menu **Terminal** di aaPanel (atau SSH):
```bash
cd /www/wwwroot/mptopup.com
git clone https://github.com/hndko/app_mptopupgames_vue3.git .
npm install
cp .env.example .env
nano .env # Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY
npm run build
```
4. Pastikan di **Site Settings** -> **Site directory**, `Running directory` diarahkan ke `/dist`.

#### Opsi B: Upload Manual via File Manager aaPanel
1. Di komputer lokal Anda, jalankan `npm run build`.
2. Buka menu **Files** di aaPanel -> Masuk ke folder `/www/wwwroot/mptopup.com`.
3. Unggah seluruh isi file yang ada di dalam folder `dist/` komputer lokal Anda (`index.html`, `.htaccess`, folder `assets/`, `images/`).
4. Ekstrak file dan simpan.

---

## 2. Deploy ke VPS Linux Murni (Ubuntu/Debian Nginx)

Untuk VPS standalone (DigitalOcean Droplet, Linode, AWS EC2, IDCloudHost, Biznet Gio) tanpa control panel:

### A. Persiapan Sistem & Instalasi Nginx + Node.js
```bash
# Update sistem
sudo apt update && sudo apt upgrade -y

# Pasang Nginx, Git, Curl, dan Certbot SSL
sudo apt install -y nginx git curl certbot python3-certbot-nginx

# Pasang Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### B. Clone Repositori & Build
```bash
# Masuk ke direktori web
cd /var/www
sudo git clone https://github.com/hndko/app_mptopupgames_vue3.git mptopup
cd /var/www/mptopup

# Pasang dependensi dan environment
sudo npm install
sudo cp .env.example .env
sudo nano .env # Masukkan VITE_SUPABASE_URL & ANON KEY

# Kompilasi aplikasi produksi
sudo npm run build

# Atur kepemilikan direktori ke user web server
sudo chown -R www-data:www-data /var/www/mptopup/dist
sudo chmod -R 755 /var/www/mptopup/dist
```

### C. Konfigurasi Server Block Nginx
Buat file konfigurasi baru:
```bash
sudo nano /etc/nginx/sites-available/mptopup.conf
```
Salin template konfigurasi dari [`nginx.conf.example`](../nginx.conf.example):
```nginx
server {
    listen 80;
    server_name domainanda.com www.domainanda.com;

    root /var/www/mptopup/dist;
    index index.html;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css text/xml application/json application/javascript image/svg+xml;

    # Security Headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # SPA History Mode Fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Static Assets Caching
    location ~* \.(?:ico|css|js|gif|jpe?g|png|svg|woff2?|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

Aktifkan konfigurasi Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/mptopup.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### D. Pasang Sertifikat SSL Gratis (Let's Encrypt)
```bash
sudo certbot --nginx -d domainanda.com -d www.domainanda.com
```

---

## 3. Deploy ke Vercel (Edge Serverless)

1. Buka [https://vercel.com](https://vercel.com) dan login via GitHub.
2. Klik **Add New...** -> **Project** -> Impor `app_mptopupgames_vue3`.
3. Pada **Configure Project**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Tambahkan **Environment Variables**:
   - `VITE_SUPABASE_URL`: *(URL Supabase)*
   - `VITE_SUPABASE_ANON_KEY`: *(Anon Key)*
5. Klik **Deploy**. Selesai!

---

## 4. Deploy ke Cloudflare Pages (Free Global CDN)

1. Buka [https://dash.cloudflare.com/](https://dash.cloudflare.com/) -> **Workers & Pages** -> **Create application** -> **Pages**.
2. Hubungkan ke GitHub dan pilih repositori `app_mptopupgames_vue3`.
3. Build Settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Masukkan Environment Variables `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`.
5. Klik **Save and Deploy**.

---

## 5. Deploy ke Shared Hosting / cPanel

1. Di komputer lokal, jalankan `npm run build`.
2. Buka folder `dist/` dan kompres semua file di dalamnya menjadi `dist.zip` (pastikan file `.htaccess` di dalam `dist` ikut terkompres).
3. Buka **cPanel** -> **File Manager** -> masuk ke folder `public_html`.
4. Unggah `dist.zip` dan klik **Extract**.
5. Pastikan `index.html` dan `.htaccess` berada langsung di root `public_html`.
6. Website siap diakses secara live.
