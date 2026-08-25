<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 pb-16">
    <!-- Breadcrumb Navigation -->
    <nav class="flex items-center gap-2 text-xs text-slate-400" aria-label="Breadcrumb">
      <router-link to="/" class="hover:text-sky-400 flex items-center gap-1">
        <i class="fas fa-house text-[11px]"></i> <span>Beranda</span>
      </router-link>
      <i class="fas fa-chevron-right text-[10px] text-slate-600"></i>
      <span class="text-white font-medium">Lacak &amp; Riwayat Pesanan</span>
    </nav>

    <!-- Header & Interactive Fast Track Banner -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
      <div class="max-w-2xl space-y-2 relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[11px] font-bold uppercase tracking-wider">
          <i class="fas fa-satellite-dish animate-pulse"></i> <span>Pelacakan Status Real-Time</span>
        </div>
        <h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Lacak &amp; Riwayat Pesanan
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Pantau status pemrosesan diamond game kamu secara langsung dengan memasukkan Nomor Pesanan (#MPxxxxxx) atau ID Game.
        </p>
      </div>

      <!-- Quick Fast Search Form Box -->
      <form @submit.prevent="handleQuickSearch" class="relative z-10 max-w-2xl bg-slate-950/80 border border-slate-700/80 rounded-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2 shadow-inner">
        <div class="relative flex-1 w-full">
          <i class="fas fa-receipt absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
          <input 
            type="search" 
            v-model="quickSearchQuery" 
            placeholder="Masukkan No. Pesanan (cth: #MP884912) atau ID Game..." 
            class="w-full h-11 pl-9 pr-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-sky-500 transition-all font-mono"
          />
        </div>
        <button 
          type="submit" 
          class="w-full sm:w-auto h-11 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 transition-all shrink-0 btn-press"
        >
          <i class="fas fa-magnifying-glass text-xs"></i> <span>Lacak Sekarang</span>
        </button>
      </form>
    </div>

    <!-- Live Tracked Order Timeline Modal / Card (If direct match found) -->
    <div v-if="trackedOrder" class="bg-slate-900 border border-sky-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <span class="text-[10px] uppercase tracking-wider font-bold text-sky-400">Hasil Pelacakan Cepat</span>
          <h2 class="text-lg sm:text-xl font-bold text-white font-mono mt-0.5">{{ trackedOrder.id }}</h2>
        </div>
        <div class="flex items-center gap-3">
          <router-link 
            :to="`/konfirmasi?id=${encodeURIComponent(trackedOrder.id)}`" 
            class="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all btn-press"
          >
            <i class="fas fa-file-invoice text-xs"></i> <span>Buka Invoice Penuh</span>
          </router-link>
          <button 
            type="button" 
            @click="trackedOrder = null" 
            class="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-xs transition-colors"
            title="Tutup Hasil Pelacakan"
          >
            <i class="fas fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- 4-Step Visual Progress Timeline -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 py-2">
        <div class="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
          <div class="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center text-xs">
            <i class="fas fa-check"></i>
          </div>
          <p class="text-xs font-bold text-white">1. Pesanan Dibuat</p>
          <p class="text-[10px] text-slate-400">{{ trackedOrder.date }}</p>
        </div>

        <div class="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
          <div class="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center text-xs">
            <i class="fas fa-credit-card"></i>
          </div>
          <p class="text-xs font-bold text-white">2. Pembayaran Terverifikasi</p>
          <p class="text-[10px] text-slate-400">{{ trackedOrder.payment?.name || 'QRIS' }}</p>
        </div>

        <div class="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
          <div :class="[trackedOrder.status === 'Selesai' ? 'bg-emerald-950 border-emerald-800 text-emerald-400' : 'bg-amber-950 border-amber-800 text-amber-400', 'w-8 h-8 rounded-xl border flex items-center justify-center text-xs']">
            <i class="fas fa-bolt"></i>
          </div>
          <p class="text-xs font-bold text-white">3. Pengiriman Otomatis</p>
          <p class="text-[10px] text-slate-400">Gateway API Digiflazz</p>
        </div>

        <div class="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
          <div :class="[trackedOrder.status === 'Selesai' ? 'bg-emerald-950 border-emerald-800 text-emerald-400' : 'bg-slate-900 border-slate-700 text-slate-500', 'w-8 h-8 rounded-xl border flex items-center justify-center text-xs']">
            <i class="fas fa-circle-check"></i>
          </div>
          <p class="text-xs font-bold text-white">4. Transaksi Selesai</p>
          <p class="text-[10px] text-emerald-400 font-bold">{{ trackedOrder.status }}</p>
        </div>
      </div>
    </div>

    <!-- 3 KPI Status Metric Counters -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl interactive-card">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Semua Riwayat Transaksi</span>
          <div class="w-8 h-8 rounded-xl bg-sky-950/60 border border-sky-800 text-sky-400 flex items-center justify-center">
            <i class="fas fa-list-check text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-white">{{ ordersStore.orders.length }} Pesanan</p>
        <p class="text-[11px] text-slate-400">Tersimpan aman di perangkat</p>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl interactive-card">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Transaksi Berhasil</span>
          <div class="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center justify-center">
            <i class="fas fa-check-circle text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-emerald-400">{{ successCount }} Selesai</p>
        <p class="text-[11px] text-emerald-400 font-semibold">Terkirim otomatis 1-3 detik</p>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl interactive-card">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Menunggu Pembayaran</span>
          <div class="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-400 flex items-center justify-center">
            <i class="fas fa-clock text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-amber-400">{{ pendingCount }} Pending</p>
        <p class="text-[11px] text-amber-400 font-semibold">Menunggu scan QRIS / bayar</p>
      </div>
    </div>

    <!-- Filter & Search Bar Section -->
    <div class="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center gap-3">
      <div class="relative flex-1 w-full">
        <i class="fas fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
        <input 
          type="search" 
          v-model="ordersStore.searchQuery" 
          placeholder="Cari berdasarkan Nomor Pesanan (#MPxxxxxx), Judul Game, atau User ID..." 
          class="w-full h-11 pl-9 pr-3 rounded-2xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-sky-500 transition-all"
        />
      </div>

      <div class="relative w-full sm:w-48">
        <i class="fas fa-filter absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
        <select 
          v-model="ordersStore.statusFilter" 
          class="w-full h-11 pl-9 pr-8 rounded-2xl bg-slate-800 border border-slate-700 text-white text-xs font-semibold focus:ring-2 focus:ring-sky-500 cursor-pointer appearance-none"
        >
          <option value="all">Semua Status</option>
          <option value="Selesai">Selesai</option>
          <option value="Pending">Pending</option>
          <option value="Gagal">Gagal</option>
        </select>
        <i class="fas fa-chevron-down absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
      </div>
    </div>

    <!-- Data Table Container -->
    <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-300">
          <thead class="bg-slate-950/80 text-slate-400 uppercase font-bold border-b border-slate-800 text-[11px]">
            <tr>
              <th scope="col" class="py-3.5 px-4 text-center w-12">#</th>
              <th scope="col" class="py-3.5 px-4">No. Pesanan</th>
              <th scope="col" class="py-3.5 px-4">Waktu</th>
              <th scope="col" class="py-3.5 px-4">Game &amp; Item</th>
              <th scope="col" class="py-3.5 px-4">User ID</th>
              <th scope="col" class="py-3.5 px-4">Metode Bayar</th>
              <th scope="col" class="py-3.5 px-4">Total</th>
              <th scope="col" class="py-3.5 px-4 text-center">Status</th>
              <th scope="col" class="py-3.5 px-4 text-center w-20">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/80">
            <tr v-for="(order, idx) in ordersStore.filteredOrders" :key="order.id" class="hover:bg-slate-800/40 transition-colors">
              <!-- Auto-numbering column # -->
              <td class="py-3.5 px-4 font-mono text-slate-400 text-center font-bold">{{ idx + 1 }}</td>
              <td class="py-3.5 px-4">
                <span class="font-mono font-bold text-sky-400">{{ order.id }}</span>
              </td>
              <td class="py-3.5 px-4 text-slate-400">{{ order.date }}</td>
              <td class="py-3.5 px-4">
                <div class="font-bold text-white">{{ order.game ? order.game.title : 'Game' }}</div>
                <div class="text-[11px] text-slate-400">{{ order.product ? order.product.name : 'Diamond' }}</div>
              </td>
              <td class="py-3.5 px-4 font-mono text-slate-300">
                {{ order.userId }} <span v-if="order.zoneId" class="text-slate-500">({{ order.zoneId }})</span>
              </td>
              <td class="py-3.5 px-4 font-medium">{{ order.payment ? order.payment.name : 'QRIS' }}</td>
              <td class="py-3.5 px-4 font-extrabold text-white">Rp {{ (order.total || 0).toLocaleString('id-ID') }}</td>
              <td class="py-3.5 px-4 text-center">
                <span 
                  :class="[
                    order.status === 'Selesai' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 
                    order.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 
                    'bg-rose-500/20 text-rose-400 border-rose-500/40',
                    'px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider inline-block'
                  ]"
                >
                  {{ order.status }}
                </span>
              </td>
              <!-- Icon-only action button -->
              <td class="py-3.5 px-4 text-center">
                <router-link 
                  :to="`/konfirmasi?id=${encodeURIComponent(order.id)}`" 
                  class="w-8 h-8 rounded-lg bg-sky-950/60 hover:bg-sky-900 border border-sky-800 text-sky-400 hover:text-white inline-flex items-center justify-center transition-colors mx-auto btn-press" 
                  title="Lihat Bukti Transaksi" 
                  aria-label="Lihat Bukti Transaksi"
                >
                  <i class="fas fa-file-invoice text-xs"></i>
                </router-link>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="ordersStore.filteredOrders.length === 0">
              <td colspan="9" class="py-14 text-center text-slate-500">
                <div class="w-14 h-14 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto text-xl mb-3">
                  <i class="fas fa-inbox"></i>
                </div>
                <p class="font-bold text-sm text-slate-300">Tidak ada riwayat transaksi yang cocok</p>
                <p class="text-xs text-slate-500 mt-0.5">Coba cari dengan kata kunci lain atau lakukan transaksi baru.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Help & Support Callout Banner -->
    <div class="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
      <div class="space-y-1 text-center sm:text-left">
        <h3 class="text-base sm:text-lg font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
          <i class="fab fa-whatsapp text-emerald-400 text-xl"></i> Ada Kendala dengan Pesanan Anda?
        </h3>
        <p class="text-xs text-slate-400">Tim Customer Support kami siap membantu kendala invoice transaksi Anda 24 jam nonstop.</p>
      </div>

      <a 
        href="https://wa.me/6281234567890" 
        target="_blank" 
        rel="noopener"
        class="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all shrink-0 btn-press"
      >
        <i class="fab fa-whatsapp text-base"></i> <span>Hubungi CS WhatsApp</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useOrdersStore } from '@/stores/ordersStore';

const ordersStore = useOrdersStore();

onMounted(() => {
  ordersStore.fetchOrders();
});

const quickSearchQuery = ref('');
const trackedOrder = ref(null);

const successCount = computed(() => {
  return ordersStore.orders.filter(o => o.status === 'Selesai').length;
});

const pendingCount = computed(() => {
  return ordersStore.orders.filter(o => o.status === 'Pending').length;
});

function handleQuickSearch() {
  if (!quickSearchQuery.value.trim()) return;
  const q = quickSearchQuery.value.trim().toLowerCase();
  const match = ordersStore.orders.find(o => 
    o.id.toLowerCase().includes(q) || 
    o.userId.toLowerCase().includes(q)
  );

  if (match) {
    trackedOrder.value = match;
  } else {
    ordersStore.searchQuery = quickSearchQuery.value.trim();
    trackedOrder.value = null;
  }
}
</script>
