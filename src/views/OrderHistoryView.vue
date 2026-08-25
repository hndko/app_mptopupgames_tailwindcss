<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
          <i class="fas fa-receipt text-sky-400"></i> Lacak &amp; Riwayat Pesanan
        </h1>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">Cari dan pantau status transaksi top up game kamu secara real-time.</p>
      </div>

      <!-- Quick Stats -->
      <div class="flex items-center gap-2 text-xs font-bold">
        <span class="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
          Total Transaksi: <strong class="text-sky-400">{{ ordersStore.orders.length }}</strong>
        </span>
      </div>
    </div>

    <!-- Filter & Search Bar -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center gap-3">
      <div class="relative flex-1 w-full">
        <i class="fas fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
        <input 
          type="search" 
          v-model="ordersStore.searchQuery" 
          placeholder="Cari berdasarkan Nomor Pesanan (#MPxxxxxx), Judul Game, atau User ID..."
          class="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-sky-500"
        >
      </div>

      <div class="relative w-full sm:w-48">
        <i class="fas fa-filter absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
        <select 
          v-model="ordersStore.statusFilter" 
          class="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500 cursor-pointer"
        >
          <option value="all">Semua Status</option>
          <option value="Selesai">Selesai</option>
          <option value="Pending">Pending</option>
          <option value="Gagal">Gagal</option>
        </select>
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
              <th scope="col" class="py-3.5 px-4 text-center w-16">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/80">
            <tr v-for="(order, idx) in ordersStore.filteredOrders" :key="order.id" class="hover:bg-slate-800/40 transition-colors">
              <!-- Auto-numbering column # -->
              <td class="py-3 px-4 font-mono text-slate-400 text-center font-bold">{{ idx + 1 }}</td>
              <td class="py-3 px-4 font-mono font-bold text-sky-400">{{ order.id }}</td>
              <td class="py-3 px-4 text-slate-400">{{ order.date }}</td>
              <td class="py-3 px-4">
                <div class="font-bold text-white">{{ order.game ? order.game.title : 'Game' }}</div>
                <div class="text-[11px] text-slate-400">{{ order.product ? order.product.name : 'Diamond' }}</div>
              </td>
              <td class="py-3 px-4 font-mono text-slate-300">
                {{ order.userId }} <span v-if="order.zoneId" class="text-slate-500">({{ order.zoneId }})</span>
              </td>
              <td class="py-3 px-4 font-medium">{{ order.payment ? order.payment.name : 'QRIS' }}</td>
              <td class="py-3 px-4 font-extrabold text-white">Rp {{ (order.total || 0).toLocaleString('id-ID') }}</td>
              <td class="py-3 px-4 text-center">
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
              <td class="py-3 px-4 text-center">
                <router-link 
                  :to="`/konfirmasi?id=${encodeURIComponent(order.id)}`" 
                  class="w-8 h-8 rounded-lg bg-sky-950/60 hover:bg-sky-900 border border-sky-800 text-sky-400 hover:text-white inline-flex items-center justify-center transition-colors mx-auto" 
                  title="Lihat Bukti Transaksi" 
                  aria-label="Lihat Bukti Transaksi"
                >
                  <i class="fas fa-file-invoice text-xs"></i>
                </router-link>
              </td>
            </tr>

            <tr v-if="ordersStore.filteredOrders.length === 0">
              <td colspan="9" class="py-12 text-center text-slate-500">
                <i class="fas fa-inbox text-3xl mb-2 block"></i>
                <p class="font-bold text-sm text-slate-300">Tidak ada riwayat transaksi</p>
                <p class="text-xs text-slate-500 mt-0.5">Silakan lakukan pemesanan game terlebih dahulu.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrdersStore } from '@/stores/ordersStore';

const ordersStore = useOrdersStore();
</script>
