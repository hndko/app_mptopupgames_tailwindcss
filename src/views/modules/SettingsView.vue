<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-lg font-bold text-white">Pengaturan Sistem &amp; Integrasi</h2>
      <p class="text-xs text-slate-400">Konfigurasi profil toko, payment channel, notifikasi WhatsApp/Email, dan API Gateway.</p>
    </div>

    <!-- Navigation Tabs with Icons -->
    <div class="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
      <button 
        type="button" 
        v-for="t in tabs" 
        :key="t.id"
        @click="activeTab = t.id"
        :class="[activeTab === t.id ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white', 'px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5']"
      >
        <i :class="t.icon" class="text-xs"></i> <span>{{ t.name }}</span>
      </button>
    </div>

    <!-- Tab 1: Pengaturan Umum (General) -->
    <div v-if="activeTab === 'general'" class="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      <h3 class="text-sm font-bold text-white border-b border-slate-800 pb-3">Profil &amp; Identitas Toko</h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Nama Brand / Toko</label>
          <div class="relative">
            <i class="fas fa-store absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
            <input type="text" v-model="siteName" class="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500">
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Tagline Layanan</label>
          <div class="relative">
            <i class="fas fa-quote-left absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
            <input type="text" v-model="siteTagline" class="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500">
          </div>
        </div>
      </div>

      <!-- Drag & Drop Uploaders for Logo & Favicon -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
        <DragDropUpload label="Unggah Logo Brand (SVG / PNG)" hint="Format SVG, PNG (Ukuran rekomendasi 512x512)" />
        <DragDropUpload label="Unggah Favicon Website (.ico / .svg)" hint="Format SVG atau ICO (Maks. 1MB)" />
      </div>

      <div class="pt-4 border-t border-slate-800 flex justify-end">
        <button type="button" @click="saveSettings" class="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-sky-600/20 transition-all">
          <i class="fas fa-floppy-disk text-xs"></i> <span>Simpan Pengaturan Profil</span>
        </button>
      </div>
    </div>

    <!-- Tab 2: Channel Pembayaran -->
    <div v-if="activeTab === 'payment'" class="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      <h3 class="text-sm font-bold text-white border-b border-slate-800 pb-3">Manajemen Channel &amp; Gateway Pembayaran</h3>

      <!-- QRIS Barcode Drag & Drop -->
      <div class="space-y-2">
        <DragDropUpload label="Unggah Master Barcode QRIS Toko" hint="Format PNG/SVG gambar barcode QRIS dinamis/statis" />
      </div>

      <div class="space-y-3 pt-2">
        <p class="text-xs font-bold text-slate-300">Aktifkan / Nonaktifkan Channel Bayar</p>
        <div v-for="ch in paymentMethods" :key="ch.name" class="flex items-center justify-between p-3.5 bg-slate-800/60 rounded-2xl border border-slate-700">
          <div class="flex items-center gap-3">
            <i class="fas fa-wallet text-sky-400 text-sm"></i>
            <div>
              <p class="text-xs font-bold text-white">{{ ch.name }}</p>
              <p class="text-[10px] text-slate-400">Biaya admin transaksi: Rp {{ ch.fee.toLocaleString('id-ID') }}</p>
            </div>
          </div>
          <input type="checkbox" v-model="ch.active" class="w-5 h-5 rounded bg-slate-900 border-slate-700 text-sky-600 focus:ring-sky-500 cursor-pointer">
        </div>
      </div>

      <div class="pt-4 border-t border-slate-800 flex justify-end">
        <button type="button" @click="saveSettings" class="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5">
          <i class="fas fa-floppy-disk text-xs"></i> <span>Simpan Channel Pembayaran</span>
        </button>
      </div>
    </div>

    <!-- Tab 3: Notifikasi Otomatis -->
    <div v-if="activeTab === 'notification'" class="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      <h3 class="text-sm font-bold text-white border-b border-slate-800 pb-3">Konfigurasi Gateway Notifikasi</h3>

      <div class="space-y-4">
        <div class="flex items-center justify-between p-4 bg-slate-800/60 rounded-2xl border border-slate-700">
          <div class="space-y-0.5">
            <p class="text-xs font-bold text-white">Kirim Bukti Pembayaran ke WhatsApp Pembeli</p>
            <p class="text-[10px] text-slate-400">Invoice dan status transaksi dikirim otomatis ke nomor WA pelanggan.</p>
          </div>
          <input type="checkbox" v-model="waNotify" class="w-5 h-5 rounded bg-slate-900 border-slate-700 text-sky-600 focus:ring-sky-500 cursor-pointer">
        </div>

        <div class="flex items-center justify-between p-4 bg-slate-800/60 rounded-2xl border border-slate-700">
          <div class="space-y-0.5">
            <p class="text-xs font-bold text-white">Notifikasi Email Admin Saat Pesanan Masuk</p>
            <p class="text-[10px] text-slate-400">Kirim email pemberitahuan instan setiap ada pesanan baru.</p>
          </div>
          <input type="checkbox" v-model="emailNotify" class="w-5 h-5 rounded bg-slate-900 border-slate-700 text-sky-600 focus:ring-sky-500 cursor-pointer">
        </div>
      </div>

      <div class="pt-4 border-t border-slate-800 flex justify-end">
        <button type="button" @click="saveSettings" class="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5">
          <i class="fas fa-floppy-disk text-xs"></i> <span>Simpan Notifikasi</span>
        </button>
      </div>
    </div>

    <!-- Tab 4: API Gateway (Midtrans & Digiflazz) -->
    <div v-if="activeTab === 'api'" class="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      <h3 class="text-sm font-bold text-white border-b border-slate-800 pb-3">Integrasi API Provider &amp; Payment Gateway</h3>

      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Midtrans Server Key (Production)</label>
          <div class="relative">
            <i class="fas fa-key absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
            <input type="password" v-model="midtransKey" class="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:ring-2 focus:ring-sky-500">
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Digiflazz API Key (Supplier Game)</label>
          <div class="relative">
            <i class="fas fa-server absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
            <input type="password" v-model="digiflazzKey" class="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-xs focus:ring-2 focus:ring-sky-500">
          </div>
        </div>
      </div>

      <div class="pt-4 border-t border-slate-800 flex justify-end">
        <button type="button" @click="saveSettings" class="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5">
          <i class="fas fa-floppy-disk text-xs"></i> <span>Simpan Kredensial API</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DragDropUpload from '@/components/common/DragDropUpload.vue';

const activeTab = ref('general');

const tabs = [
  { id: 'general', name: 'Umum & Profil', icon: 'fas fa-store' },
  { id: 'payment', name: 'Metode Pembayaran', icon: 'fas fa-credit-card' },
  { id: 'notification', name: 'Notifikasi', icon: 'fas fa-bell' },
  { id: 'api', name: 'API Gateway', icon: 'fas fa-code' }
];

const siteName = ref('MPTopUp Official');
const siteTagline = ref('Platform Top Up Game Online Resmi & Cepat 24 Jam Nonstop');

const paymentMethods = ref([
  { name: 'QRIS (Semua E-Wallet & Mobile Banking)', fee: 800, active: true },
  { name: 'GoPay Instan', fee: 1000, active: true },
  { name: 'DANA Digital Wallet', fee: 1000, active: true },
  { name: 'BCA Virtual Account', fee: 2500, active: true },
  { name: 'Mandiri Virtual Account', fee: 2500, active: true }
]);

const waNotify = ref(true);
const emailNotify = ref(true);
const midtransKey = ref('Mid-server-xxxxxxxxxxxx-sample');
const digiflazzKey = ref('df-api-key-xxxxxxxxxxxx-live');

function saveSettings() {
  alert('Pengaturan berhasil disimpan!');
}
</script>
