# 🔌 Panduan Integrasi: Payment Gateway & Provider API Game (Developer Guide)

> **Catatan Penting untuk Pengembang (Developer Notice)**:  
> Aplikasi **MPTopUp** saat ini menyediakan seluruh antarmuka pengguna (*Frontend UI*), alur checkout 5-langkah, manajemen state (*Pinia Stores*), skema database PostgreSQL Supabase, dan pengaturan kunci API di panel admin.  
> **Integrasi langsung ke Server Payment Gateway (Midtrans/Tripay/Xendit) dan Server Provider Game (Digiflazz/VIP Reseller) belum diaktifkan secara live**, sehingga pengembang lain dapat secara bebas menghubungkan backend/serverless webhook masing-masing sesuai kebutuhan bisnis.

---

## 📑 DAFTAR ISI
1. [Arsitektur Alur Transaksi Top Up](#1-arsitektur-alur-transaksi-top-up)
2. [Integrasi Payment Gateway (Midtrans / Tripay / Xendit)](#2-integrasi-payment-gateway-midtrans--tripay--xendit)
3. [Integrasi Game Provider API (Digiflazz / VIP Reseller / ApiGames)](#3-integrasi-game-provider-api-digiflazz--vip-reseller--apigames)
4. [Membangun Backend Webhook Callback Server](#4-membangun-backend-webhook-callback-server)
5. [Contoh Implementasi Supabase Edge Function](#5-contoh-implementasi-supabase-edge-function)

---

## 1. Arsitektur Alur Transaksi Top Up

Berikut adalah alur transaksi standar industri (*End-to-End Flow*) dari pembuatan tagihan hingga pengiriman item otomatis:

```
[ Pelanggan (Vue 3 SPA) ]
       │
       ▼ 1. Checkout (Game, Varian SKU, User ID, No. WA)
[ Backend Server / Supabase Edge Function ]
       │
       ├──► 2. Buat Tagihan QRIS/VA ke Payment Gateway (Midtrans/Tripay)
       │    ◄── Kembalikan QR Code / URL Pembayaran
       ▼
[ Pelanggan Bayar via QRIS / E-Wallet / Mobile Banking ]
       │
       ▼ 3. Payment Gateway kirim Webhook Notifikasi Sukses
[ Backend Webhook Handler (Endpoint Terproteksi) ]
       │
       ├──► 4. Verifikasi Signature Key Payment Gateway
       ├──► 5. Update Status Order menjadi "Diproses" di Database Supabase
       ├──► 6. Tembak API Provider Game (Digiflazz H2H / VIP Reseller)
       │    ◄── Respon Sukses / Serial Number (SN) Game Publisher
       ▼
[ Update Status Order menjadi "Selesai" & Kirim Notifikasi WA ]
       │
       ▼ 7. Pelanggan Lacak Status di Halaman /riwayat (Real-time Sukses)
```

---

## 2. Integrasi Payment Gateway (Midtrans / Tripay / Xendit)

### A. Konfigurasi Kunci API di Panel Admin
Di dalam panel admin **`/modules/pengaturan`** (Tab API & Notifikasi), telah disediakan formulir penyimpanan konfigurasi API:
- `Server Key / Secret Key`
- `Client Key / Merchant Code`
- `Mode Environment` (Sandbox / Production)

### B. Payload Permintaan Pembuatan Transaksi (Contoh Midtrans Snap)
Saat pelanggan menekan tombol *Beli Sekarang* di [`ProductDetailView.vue`](../src/views/public/ProductDetailView.vue), kirimkan payload berikut ke backend Anda:

```json
{
  "transaction_details": {
    "order_id": "MP884912",
    "gross_amount": 20000
  },
  "item_details": [
    {
      "id": "mlbb-86",
      "price": 20000,
      "quantity": 1,
      "name": "86 Diamonds Mobile Legends"
    }
  ],
  "customer_details": {
    "first_name": "Gamer",
    "phone": "081234567890"
  },
  "custom_field1": "12345678", 
  "custom_field2": "1234"
}
```

---

## 3. Integrasi Game Provider API (Digiflazz / VIP Reseller / ApiGames)

Provider aggregator bertindak sebagai jembatan langsung ke server publisher resmi (Moonton, Riot Games, Garena, HoYoverse).

### A. Format Request Transaksi H2H (Contoh Digiflazz)
Setelah pembayaran diverifikasi lunas, backend Anda membuat request HTTP POST ke endpoint Digiflazz:

- **Endpoint**: `https://api.digiflazz.com/v1/transaction`
- **Rumus Pembuatan Signature MD5**:
  ```
  signature = md5(username + apiKey + ref_id)
  ```
- **Request Body JSON**:
  ```json
  {
    "username": "YOUR_DIGIFLAZZ_USERNAME",
    "buyer_sku_code": "ML86",
    "customer_no": "123456781234",
    "ref_id": "MP884912",
    "sign": "a3b1c2d3e4f5..."
  }
  ```

### B. Menghubungkan Katalog Game Dinamis (`gamesStore.js`)
Pada [`src/stores/gamesStore.js`](../src/stores/gamesStore.js), Anda dapat menambahkan fungsi sinkronisasi harga dan ketersediaan stok (*Pricelist Sync*):

```javascript
// Contoh Method Sync Pricelist dari Provider
async function syncProviderPricelist() {
  const response = await fetch('/api/provider/pricelist');
  const data = await response.json();
  // Update state produk SKU sesuai harga modal & keuntungan margin Anda
}
```

---

## 4. Membangun Backend Webhook Callback Server

> [!WARNING]
> **PENTING**: Jangan pernah melakukan panggilan langsung ke API Provider Game dari sisi Frontend/Klien (Browser) karena akan membocorkan `Secret Key` dan `Password API` Anda ke publik! Selalu gunakan Backend Webhook terisolasi.

### Contoh Webhook Handler (Node.js / Express):

```javascript
const express = require('express');
const crypto = require('crypto');
const app = express();
app.use(express.json());

// Endpoint Webhook Menerima Notifikasi dari Midtrans / Tripay
app.post('/api/webhook/payment', async (req, res) => {
  const { order_id, status_code, gross_amount, signature_key, transaction_status } = req.body;

  // 1. Verifikasi Keaslian Signature Key
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const hash = crypto.createHash('sha512')
    .update(order_id + status_code + gross_amount + serverKey)
    .digest('hex');

  if (hash !== signature_key) {
    return res.status(403).json({ message: 'Invalid Signature' });
  }

  // 2. Jika Pembayaran Berhasil (Settlement / Capture)
  if (transaction_status === 'settlement' || transaction_status === 'capture') {
    
    // A. Update Status di Database Supabase
    // Arahkan status pesanan menjadi "Diproses"

    // B. Panggil API Provider Game Otomatis (Digiflazz)
    const providerResult = await executeGameTopUp(order_id);

    // C. Jika sukses terisi, update status pesanan menjadi "Selesai"
    return res.status(200).json({ status: 'OK', message: 'Transaction Processed' });
  }

  return res.status(200).json({ status: 'Ignored' });
});

async function executeGameTopUp(orderId) {
  // Panggilan H2H ke Digiflazz / VIP Reseller
  // Kembalikan Serial Number (SN) publisher
}

app.listen(5000, () => console.log('Webhook Server running on port 5000'));
```

---

## 5. Contoh Implementasi Supabase Edge Function

Jika Anda tidak ingin mengelola server Express mandiri, Anda dapat menggunakan **Supabase Edge Functions (Deno / TypeScript)**:

```bash
# 1. Buat edge function baru
supabase functions new process-payment

# 2. Deploy function ke Supabase
supabase functions deploy process-payment --no-verify-jwt
```

File `supabase/functions/process-payment/index.ts`:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    const payload = await req.json();
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Logika verifikasi webhook & eksekusi provider game di sini...

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
});
```

---

## 🚀 Kesimpulan & Rekomendasi Pengembangan Lanjutan
Dengan struktur modular yang telah rapi pada proyek ini:
1. UI Checkout telah siap mengirim data `orderId`, `userId`, `zoneId`, dan `paymentMethod`.
2. Halaman Lacak (`/riwayat`) telah terhubung secara reaktif untuk membaca perubahan status pesanan secara live.
3. Pengembang hanya perlu menambahkan 1 buah Webhook Server / Edge Function untuk menyambungkan gerbang pembayaran dan distributor game pilihan masing-masing.
