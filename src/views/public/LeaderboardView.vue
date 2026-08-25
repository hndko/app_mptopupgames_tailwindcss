<template>
  <div class="space-y-12 sm:space-y-16 pb-16">
    <!-- Header Hero Section -->
    <section class="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-12 text-center shadow-2xl">
      <div class="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative z-10 max-w-3xl mx-auto space-y-4">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black tracking-wider uppercase">
          <i class="fas fa-trophy"></i>
          <span>Hall of Fame Top Spender</span>
        </div>
        
        <h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Peringkat <span class="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">Sultan Gamer</span> MPTopUp
        </h1>
        
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Apresiasi khusus bagi para top spender setia yang mendominasi transaksi top up game tercepat &amp; terpercaya.
        </p>

        <!-- Period Switcher Buttons -->
        <div class="inline-flex p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800 gap-1.5 shadow-inner mt-4">
          <button 
            type="button"
            v-for="tab in periods" 
            :key="tab.key"
            @click="leaderboardStore.setPeriod(tab.key)"
            :class="[leaderboardStore.activePeriod === tab.key ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-900']"
            class="px-3.5 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 btn-press"
          >
            <i :class="tab.icon"></i>
            <span>{{ tab.label }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Top 3 Podium Visual Display -->
    <section v-if="topThree.length >= 3" class="max-w-4xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-end">
        <!-- 2nd Place (Silver) -->
        <div class="order-2 md:order-1 bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/80 rounded-3xl p-6 text-center space-y-4 shadow-xl relative transform md:-translate-y-2">
          <div class="w-10 h-10 rounded-full bg-slate-300/20 border border-slate-400 text-slate-300 font-black text-sm flex items-center justify-center mx-auto shadow-md">
            🥈 #2
          </div>
          <div class="relative inline-block">
            <img :src="topThree[1].avatar" :alt="topThree[1].name" class="w-16 h-16 rounded-2xl object-cover border-2 border-slate-400 mx-auto shadow-lg">
            <span class="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-600 text-[10px] font-bold text-slate-300">
              {{ topThree[1].tier }}
            </span>
          </div>
          <div>
            <h3 class="text-base font-black text-white">{{ topThree[1].name }}</h3>
            <p class="text-xs text-slate-400">{{ topThree[1].game }}</p>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <p class="text-[10px] uppercase font-bold text-slate-500">Total Transaksi</p>
            <p class="text-sm font-black text-slate-200">Rp {{ formatNumber(topThree[1].totalSpend) }}</p>
          </div>
        </div>

        <!-- 1st Place (Gold Champion) -->
        <div class="order-1 md:order-2 bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900/90 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl relative transform md:-translate-y-6">
          <div class="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5">
            <i class="fas fa-crown text-amber-950 animate-bounce"></i>
            <span>Juara 1 Sultan</span>
          </div>
          <div class="relative inline-block mt-2">
            <img :src="topThree[0].avatar" :alt="topThree[0].name" class="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 mx-auto shadow-amber-500/20 shadow-xl ring-4 ring-amber-500/20">
            <span class="absolute -bottom-2 -right-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black shadow-md">
              👑 {{ topThree[0].tier }}
            </span>
          </div>
          <div>
            <h3 class="text-lg font-black text-white">{{ topThree[0].name }}</h3>
            <p class="text-xs text-amber-300 font-semibold">{{ topThree[0].game }}</p>
          </div>
          <div class="p-3 rounded-2xl bg-amber-950/30 border border-amber-500/30">
            <p class="text-[10px] uppercase font-bold text-amber-400/80">Total Transaksi</p>
            <p class="text-base font-black text-amber-400">Rp {{ formatNumber(topThree[0].totalSpend) }}</p>
          </div>
        </div>

        <!-- 3rd Place (Bronze) -->
        <div class="order-3 bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-amber-900/40 rounded-3xl p-6 text-center space-y-4 shadow-xl relative">
          <div class="w-10 h-10 rounded-full bg-amber-700/20 border border-amber-600/60 text-amber-500 font-black text-sm flex items-center justify-center mx-auto shadow-md">
            🥉 #3
          </div>
          <div class="relative inline-block">
            <img :src="topThree[2].avatar" :alt="topThree[2].name" class="w-16 h-16 rounded-2xl object-cover border-2 border-amber-700 mx-auto shadow-lg">
            <span class="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-600 text-[10px] font-bold text-slate-300">
              {{ topThree[2].tier }}
            </span>
          </div>
          <div>
            <h3 class="text-base font-black text-white">{{ topThree[2].name }}</h3>
            <p class="text-xs text-slate-400">{{ topThree[2].game }}</p>
          </div>
          <div class="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <p class="text-[10px] uppercase font-bold text-slate-500">Total Transaksi</p>
            <p class="text-sm font-black text-slate-200">Rp {{ formatNumber(topThree[2].totalSpend) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Complete Leaderboard Ranking Table -->
    <section class="max-w-5xl mx-auto px-4 space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-black text-white flex items-center gap-2">
            <i class="fas fa-list-ol text-sky-400"></i>
            <span>Daftar Peringkat Lengkap</span>
          </h2>
          <p class="text-xs text-slate-400">Pembaruan real-time setiap 1 jam berdasarkan transaksi sukses.</p>
        </div>
      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-950/80 border-b border-slate-800 text-[11px] uppercase font-bold text-slate-400">
              <tr>
                <th class="py-3.5 px-4 text-center w-16">#</th>
                <th class="py-3.5 px-4">Pengguna / Sultan</th>
                <th class="py-3.5 px-4">Game Favorit</th>
                <th class="py-3.5 px-4">Rank Tier</th>
                <th class="py-3.5 px-4 text-center">Jumlah Top Up</th>
                <th class="py-3.5 px-4 text-right">Total Nominal</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60">
              <tr 
                v-for="item in currentLeaderboard" 
                :key="item.rank" 
                :class="[item.rank <= 3 ? 'bg-slate-800/30' : 'hover:bg-slate-800/20']"
                class="transition-colors"
              >
                <td class="py-4 px-4 text-center font-black">
                  <span v-if="item.rank === 1" class="text-amber-400 text-sm">🥇 1</span>
                  <span v-else-if="item.rank === 2" class="text-slate-300 text-sm">🥈 2</span>
                  <span v-else-if="item.rank === 3" class="text-amber-600 text-sm">🥉 3</span>
                  <span v-else class="text-slate-500 font-mono">#{{ item.rank }}</span>
                </td>
                <td class="py-4 px-4">
                  <div class="flex items-center gap-3">
                    <img :src="item.avatar" :alt="item.name" class="w-8 h-8 rounded-xl object-cover border border-slate-700 bg-slate-950">
                    <div>
                      <strong class="text-white font-bold block">{{ item.name }}</strong>
                      <span class="text-[10px] text-slate-500 font-mono">{{ item.phone }}</span>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-4 text-slate-300 font-medium">{{ item.game }}</td>
                <td class="py-4 px-4">
                  <span class="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-sky-400">
                    {{ item.tier }}
                  </span>
                </td>
                <td class="py-4 px-4 text-center font-semibold text-slate-300">{{ item.txCount }}x Transaksi</td>
                <td class="py-4 px-4 text-right font-black text-emerald-400 font-mono text-sm">
                  Rp {{ formatNumber(item.totalSpend) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Privacy Assurance Notice -->
      <div class="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center gap-2.5 text-xs text-slate-400">
        <i class="fas fa-shield-halved text-sky-400 shrink-0"></i>
        <span>Nama dan nomor pengguna disamarkan (*masked*) untuk menjaga keamanan dan privasi pelanggan sesuai standar kepatuhan privasi data MPTopUp.</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useLeaderboardStore } from '@/stores/leaderboardStore';

const leaderboardStore = useLeaderboardStore();

const periods = [
  { key: 'daily', label: 'Hari Ini', icon: 'fas fa-calendar-day' },
  { key: 'weekly', label: 'Minggu Ini', icon: 'fas fa-calendar-week' },
  { key: 'monthly', label: 'Bulan Ini', icon: 'fas fa-calendar' },
  { key: 'all_time', label: 'Sepanjang Masa', icon: 'fas fa-crown' }
];

const currentLeaderboard = computed(() => leaderboardStore.currentLeaderboard);
const topThree = computed(() => leaderboardStore.topThree);

function formatNumber(num) {
  return new Intl.NumberFormat('id-ID').format(num || 0);
}
</script>
