<template>
  <div class="space-y-6">
    <!-- 4 KPI Summary Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-xl">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Total Pendapatan (Bulan Ini)</span>
          <div class="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center justify-center">
            <i class="fas fa-rupiah-sign text-xs"></i>
          </div>
        </div>
        <p class="text-xl sm:text-2xl font-black text-white">Rp 48.250.000</p>
        <p class="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
          <i class="fas fa-arrow-trend-up"></i> <span>+18.4% dari bulan lalu</span>
        </p>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-xl">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Transaksi Sukses</span>
          <div class="w-8 h-8 rounded-xl bg-sky-950/60 border border-sky-800 text-sky-400 flex items-center justify-center">
            <i class="fas fa-cart-shopping text-xs"></i>
          </div>
        </div>
        <p class="text-xl sm:text-2xl font-black text-white">1.428 Pesanan</p>
        <p class="text-[11px] text-sky-400 font-semibold flex items-center gap-1">
          <i class="fas fa-check-circle"></i> <span>99.2% tingkat sukses</span>
        </p>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-xl">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Pelanggan Terdaftar</span>
          <div class="w-8 h-8 rounded-xl bg-purple-950/60 border border-purple-800 text-purple-400 flex items-center justify-center">
            <i class="fas fa-users text-xs"></i>
          </div>
        </div>
        <p class="text-xl sm:text-2xl font-black text-white">3.890 Member</p>
        <p class="text-[11px] text-purple-400 font-semibold flex items-center gap-1">
          <i class="fas fa-user-plus"></i> <span>+124 member minggu ini</span>
        </p>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-xl">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Game &amp; SKU Aktif</span>
          <div class="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-400 flex items-center justify-center">
            <i class="fas fa-gamepad text-xs"></i>
          </div>
        </div>
        <p class="text-xl sm:text-2xl font-black text-white">{{ gamesStore.games.length }} Judul Game</p>
        <p class="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
          <i class="fas fa-server"></i> <span>Semua server normal</span>
        </p>
      </div>
    </div>

    <!-- Charts & Analytics Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Sales Chart Placeholder (Interactive Visual Bar) -->
      <div class="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-sm font-bold text-white">Tren Penjualan 7 Hari Terakhir</h2>
            <p class="text-xs text-slate-400">Statistik omzet harian sistem pembayaran otomatis</p>
          </div>
          <span class="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700">
            Minggu Ini
          </span>
        </div>

        <div class="h-48 flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-slate-800">
          <div v-for="d in weekData" :key="d.day" class="flex-1 flex flex-col items-center gap-2 group">
            <div class="w-full bg-slate-800 rounded-t-xl group-hover:bg-sky-500 transition-colors relative" :style="{ height: d.height }">
              <span class="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-950 px-2 py-0.5 rounded text-[10px] font-bold text-sky-400 border border-slate-700 transition-opacity whitespace-nowrap">
                {{ d.val }}
              </span>
            </div>
            <span class="text-[10px] font-semibold text-slate-400">{{ d.day }}</span>
          </div>
        </div>
      </div>

      <!-- Top Games Ranking -->
      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <h2 class="text-sm font-bold text-white">Game Terlaris</h2>
        <div class="space-y-3">
          <div v-for="(g, idx) in topGames" :key="g.name" class="flex items-center justify-between p-3 rounded-2xl bg-slate-800/50 border border-slate-800">
            <div class="flex items-center gap-3">
              <span class="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 text-xs font-bold flex items-center justify-center">
                {{ idx + 1 }}
              </span>
              <div>
                <p class="text-xs font-bold text-white">{{ g.name }}</p>
                <p class="text-[10px] text-slate-400">{{ g.sales }} Transaksi</p>
              </div>
            </div>
            <span class="text-xs font-extrabold text-sky-400">{{ g.revenue }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Orders Table with # column & icon-only action -->
    <div class="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-sm font-bold text-white">Pesanan Masuk Terkini</h2>
          <p class="text-xs text-slate-400">Daftar transaksi pelanggan yang baru saja diproses</p>
        </div>
        <router-link to="/modules/pesanan" class="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1">
          <span>Lihat Semua Pesanan</span> <i class="fas fa-arrow-right text-[10px]"></i>
        </router-link>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-300">
          <thead class="bg-slate-950/80 text-slate-400 uppercase font-bold border-b border-slate-800 text-[11px]">
            <tr>
              <th scope="col" class="py-3 px-4 text-center w-12">#</th>
              <th scope="col" class="py-3 px-4">No. Pesanan</th>
              <th scope="col" class="py-3 px-4">Waktu</th>
              <th scope="col" class="py-3 px-4">Game &amp; Item</th>
              <th scope="col" class="py-3 px-4">User ID</th>
              <th scope="col" class="py-3 px-4">Metode Bayar</th>
              <th scope="col" class="py-3 px-4">Total</th>
              <th scope="col" class="py-3 px-4 text-center">Status</th>
              <th scope="col" class="py-3 px-4 text-center w-16">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/80">
            <tr v-for="(ord, idx) in ordersStore.orders.slice(0, 5)" :key="ord.id" class="hover:bg-slate-800/40 transition-colors">
              <td class="py-3 px-4 font-mono text-slate-400 text-center font-bold">{{ idx + 1 }}</td>
              <td class="py-3 px-4 font-mono font-bold text-sky-400">{{ ord.id }}</td>
              <td class="py-3 px-4 text-slate-400">{{ ord.date }}</td>
              <td class="py-3 px-4">
                <div class="font-bold text-white">{{ ord.game ? ord.game.title : 'Game' }}</div>
                <div class="text-[11px] text-slate-400">{{ ord.product ? ord.product.name : 'Nominal' }}</div>
              </td>
              <td class="py-3 px-4 font-mono text-slate-300">{{ ord.userId }}</td>
              <td class="py-3 px-4">{{ ord.payment ? ord.payment.name : 'QRIS' }}</td>
              <td class="py-3 px-4 font-extrabold text-white">Rp {{ (ord.total || 0).toLocaleString('id-ID') }}</td>
              <td class="py-3 px-4 text-center">
                <span 
                  :class="[
                    ord.status === 'Selesai' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 
                    ord.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 
                    'bg-rose-500/20 text-rose-400 border-rose-500/40',
                    'px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider inline-block'
                  ]"
                >
                  {{ ord.status }}
                </span>
              </td>
              <td class="py-3 px-4 text-center">
                <router-link 
                  :to="`/konfirmasi?id=${encodeURIComponent(ord.id)}`" 
                  class="w-8 h-8 rounded-lg bg-sky-950/60 hover:bg-sky-900 border border-sky-800 text-sky-400 hover:text-white inline-flex items-center justify-center transition-colors mx-auto" 
                  title="Lihat Invoice" 
                  aria-label="Lihat Invoice"
                >
                  <i class="fas fa-file-invoice text-xs"></i>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useGamesStore } from '@/stores/gamesStore';
import { useOrdersStore } from '@/stores/ordersStore';

const gamesStore = useGamesStore();
const ordersStore = useOrdersStore();

onMounted(() => {
  ordersStore.fetchOrders();
});

const weekData = [
  { day: 'Sen', height: '40%', val: 'Rp 5.2M' },
  { day: 'Sel', height: '65%', val: 'Rp 7.8M' },
  { day: 'Rab', height: '55%', val: 'Rp 6.4M' },
  { day: 'Kam', height: '80%', val: 'Rp 9.1M' },
  { day: 'Jum', height: '95%', val: 'Rp 11.4M' },
  { day: 'Sab', height: '100%', val: 'Rp 12.8M' },
  { day: 'Min', height: '85%', val: 'Rp 10.2M' }
];

const topGames = [
  { name: 'Mobile Legends', sales: '640', revenue: 'Rp 22.4 Jt' },
  { name: 'Valorant', sales: '410', revenue: 'Rp 14.8 Jt' },
  { name: 'Free Fire', sales: '220', revenue: 'Rp 5.6 Jt' },
  { name: 'Genshin Impact', sales: '158', revenue: 'Rp 5.4 Jt' }
];
</script>
