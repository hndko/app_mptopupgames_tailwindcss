# 💻 Panduan Menjalankan & Deploy di Komputer Lokal

Dokumentasi ini menjelaskan berbagai cara untuk menjalankan dan menguji proyek **MPTopUp** di lingkungan komputer lokal (*development & preview*).

---

## 📑 DAFTAR METODE LOKAL
1. [Metode 1: Menjalankan via Node.js & Vite Dev Server (Paling Cepat)](#metode-1-menjalankan-via-nodejs--vite-dev-server)
2. [Metode 2: Menguji Build Produksi Lokal (Vite Preview)](#metode-2-menguji-build-produksi-lokal-vite-preview)
3. [Metode 3: Integrasi dengan Laragon / XAMPP (Virtual Host)](#metode-3-integrasi-dengan-laragon--xampp)
4. [Metode 4: Menjalankan via Docker & Docker Compose](#metode-4-menjalankan-via-docker--docker-compose)
5. [Troubleshooting & Tanya Jawab Lokal](#troubleshooting--tanya-jawab-lokal)

---

## Metode 1: Menjalankan via Node.js & Vite Dev Server

Metode ini adalah metode standar untuk pengembangan harian dengan fitur **Hot Module Replacement (HMR)** instan tanpa reload browser manual.

### 1. Prasyarat:
- Pastikan telah menginstal **Node.js (versi >= 18.x / 20.x)**.

### 2. Jalankan Perintah:
Buka terminal (PowerShell / Command Prompt / Git Bash) di folder proyek:
```bash
# Pindah ke direktori proyek
cd d:\laragon\www\tailwind-web-topup-games

# Instal dependensi lokal (jika belum)
npm install

# Jalankan server pengembangan
npm run dev
```

Server akan otomatis berjalan di:
👉 **`http://localhost:3000`**

---

## Metode 2: Menguji Build Produksi Lokal (Vite Preview)

Untuk menguji apakah aplikasi berfungsi 100% setelah dikompilasi ke format terminifikasi (*minified production bundle*):

```bash
# 1. Kompilasi build ke folder dist/
npm run build

# 2. Jalankan server preview lokal
npm run preview
```
Buka URL yang ditampilkan terminal (biasanya `http://localhost:4173` atau `http://localhost:3000`).

---

## Metode 3: Integrasi dengan Laragon / XAMPP

Jika Anda menggunakan Laragon di Windows (misalnya di folder `d:\laragon\www\tailwind-web-topup-games`):

### Opsi A: Akses via Vite Port (Direkomendasikan)
- Cukup jalankan `npm run dev` di terminal Laragon.
- Buka browser di `http://localhost:3000`.

### Opsi B: Virtual Host Apache Laragon
1. Lakukan kompilasi build produksi:
   ```bash
   npm run build
   ```
2. Di Laragon, buat Virtual Host yang mengarah ke subfolder `dist/`:
   - Buka file virtual host Apache Laragon: `C:\laragon\etc\apache2\sites-enabled\auto.tailwind-web-topup-games.test.conf`
   - Ubah `DocumentRoot` menjadi:
     ```apache
     <VirtualHost *:80>
         DocumentRoot "d:/laragon/www/tailwind-web-topup-games/dist"
         ServerName tailwind-web-topup-games.test
         <Directory "d:/laragon/www/tailwind-web-topup-games/dist">
             AllowOverride All
             Require all granted
         </Directory>
     </VirtualHost>
     ```
3. Restart Apache Laragon.
4. Akses melalui browser: `http://tailwind-web-topup-games.test`. File `.htaccess` di dalam `dist/` akan otomatis menangani seluruh routing Vue SPA.

---

## Metode 4: Menjalankan via Docker & Docker Compose

Jika Anda ingin menjalankan aplikasi di dalam container yang identik dengan server produksi:

### 1. Jalankan Container:
```bash
docker compose up --build -d
```

### 2. Akses Aplikasi:
Buka di browser:
👉 **`http://localhost:3000`**

### 3. Menghentikan Container:
```bash
docker compose down
```

---

## Troubleshooting & Tanya Jawab Lokal

### Q1: Port 3000 sudah digunakan oleh aplikasi lain?
Ubah port di file [`vite.config.js`](../vite.config.js):
```javascript
server: {
  port: 3001, // Ubah ke port lain
  open: true
}
```

### Q2: Tampilan tidak berubah setelah update kode?
- Hentikan server (`Ctrl + C`) dan jalankan ulang `npm run dev`.
- Lakukan *Hard Refresh* di browser dengan menekan `Ctrl + Shift + R` (atau `Ctrl + F5`) untuk membersihkan cache browser lokal.

### Q3: Ingin mengaktifkan database Supabase asli?
1. Ikuti panduan di [`02_SUPABASE_SETUP.md`](02_SUPABASE_SETUP.md).
2. Masukkan URL dan Anon Key ke file `.env`.
3. Restart Vite (`npm run dev`) agar environment variables baru terbaca.
