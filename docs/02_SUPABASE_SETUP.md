# 🚀 Panduan Lengkap Setup Supabase & Google OAuth

Dokumentasi ini menjelaskan langkah demi langkah cara membuat project Supabase, menjalankan skema database PostgreSQL, serta mengaktifkan login Google OAuth untuk project **MPTopUp**.

---

## 📌 DAFTAR ISI
1. [Langkah 1: Membuat Project di Supabase](#langkah-1-membuat-project-di-supabase)
2. [Langkah 2: Mengambil Kredensial URL & API Key](#langkah-2-mengambil-kredensial-url--api-key)
3. [Langkah 3: Menjalankan Migrasi Database SQL (1-Klik)](#langkah-3-menjalankan-migrasi-database-sql-1-klik)
4. [Langkah 4: Konfigurasi Google OAuth](#langkah-4-konfigurasi-google-oauth)
5. [Langkah 5: Verifikasi & Menjalankan Aplikasi](#langkah-5-verifikasi--menjalankan-aplikasi)

---

## Langkah 1: Membuat Project di Supabase

1. Buka situs [https://supabase.com](https://supabase.com) dan klik **Start your project** (atau **Sign In**).
2. Di dashboard Supabase, klik **+ New Project**.
3. Isi informasi project:
   - **Name**: `mptopup-database` (atau nama pilihan Anda)
   - **Database Password**: Buat password database yang kuat dan simpan dengan aman.
   - **Region**: Pilih region terdekat (misalnya: `Singapore (ap-southeast-1)`).
   - **Pricing Plan**: Pilih **Free Plan**.
4. Klik **Create new project** dan tunggu 1-2 menit hingga status project menjadi *Active*.

---

## Langkah 2: Mengambil Kredensial URL & API Key

1. Di dashboard project Supabase Anda, buka menu **Project Settings** (ikon gerigi di pojok kiri bawah).
2. Pilih tab **API**.
3. Salin dua nilai berikut:
   - **Project URL**: contoh `https://abcdefghijklm.supabase.co`
   - **Project API Keys** -> Salin kunci `anon` `public` (bukan service_role).
4. Buka file `.env` di direktori root project ini (`d:\laragon\www\tailwind-web-topup-games\.env`), lalu tempelkan nilai tersebut:

```env
VITE_SUPABASE_URL=https://abcdefghijklm.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Langkah 3: Menjalankan Migrasi Database SQL (1-Klik)

Skema database PostgreSQL lengkap beserta **Row Level Security (RLS)** dan **Trigger Auto-Profile Google OAuth** telah disiapkan di file:
📂 [`supabase/migrations/20260825_initial_schema.sql`](../supabase/migrations/20260825_initial_schema.sql)

### Cara Eksekusi di Supabase:
1. Di dashboard Supabase Anda, klik menu **SQL Editor** (ikon terminal/SQL di menu kiri).
2. Klik **+ New query**.
3. Buka file [`supabase/migrations/20260825_initial_schema.sql`](../supabase/migrations/20260825_initial_schema.sql), salin seluruh isi kodenya, lalu tempel (*paste*) ke dalam SQL Editor Supabase.
4. Klik tombol **Run** (atau tekan `Ctrl + Enter`).
5. Muncul notifikasi `Success. No rows returned`. Seluruh tabel (`profiles`, `games`, `products_sku`, `orders`, `promos`, `system_settings`), Trigger, dan RLS telah aktif 100%.

---

## Langkah 4: Konfigurasi Google OAuth

Untuk mengaktifkan tombol **"Lanjutkan dengan Google"** / **"Daftar Cepat dengan Google"**:

### A. Dapatkan Redirect URI dari Supabase
1. Di dashboard Supabase, buka menu **Authentication** -> **Providers**.
2. Cari dan klik **Google**.
3. Di sana terdapat kolom **Callback URL (for OAuth)**, salin URL tersebut (contoh: `https://abcdefghijklm.supabase.co/auth/v1/callback`).

### B. Buat Kredensial di Google Cloud Console
1. Buka [https://console.cloud.google.com/](https://console.cloud.google.com/).
2. Buat Project baru atau pilih project yang sudah ada.
3. Buka menu **APIs & Services** -> **OAuth consent screen**:
   - Pilih User Type: **External** -> Klik **Create**.
   - Isi **App name**: `MPTopUp`.
   - Isi **User support email** & **Developer contact email** dengan email Anda.
   - Klik **Save and Continue** sampai selesai.
4. Buka menu **Credentials** -> Klik **+ CREATE CREDENTIALS** -> Pilih **OAuth client ID**:
   - **Application type**: Pilih **Web application**.
   - **Name**: `MPTopUp Web Client`.
   - **Authorized JavaScript origins**: Tambahkan `http://localhost:3000` dan URL domain produksi Anda.
   - **Authorized redirect URIs**: Tambahkan **Callback URL** dari Supabase yang Anda salin tadi (contoh: `https://abcdefghijklm.supabase.co/auth/v1/callback`).
5. Klik **Create**.
6. Simpan **Client ID** dan **Client Secret** yang diberikan Google.

### C. Masukkan Client ID & Secret ke Supabase
1. Kembali ke tab **Authentication** -> **Providers** -> **Google** di Supabase.
2. Aktifkan saklar **Enable Google provider**.
3. Masukkan **Client ID** dan **Client Secret** dari Google Cloud.
4. Klik **Save**.

### D. Tambahkan Redirect URL Localhost di Supabase Auth Settings
1. Buka menu **Authentication** -> **URL Configuration**.
2. Pada **Site URL**, masukkan: `http://localhost:3000`
3. Pada **Redirect URLs**, tambahkan: `http://localhost:3000/auth/callback` dan klik **Add URL**.
4. Klik **Save**.

---

## Langkah 5: Verifikasi & Menjalankan Aplikasi

Jalankan server pengembangan lokal:
```bash
npm run dev
```

Buka di browser:
- 👉 **Halaman Login**: `http://localhost:3000/login`
- 👉 **Halaman Register**: `http://localhost:3000/register`

Saat Anda mengklik **Lanjutkan dengan Google**, popup Google OAuth akan muncul dan setelah sukses, user otomatis terdaftar dan data profilnya tersimpan di tabel `public.profiles` database Supabase Anda.
