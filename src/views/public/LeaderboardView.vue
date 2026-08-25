<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 pb-16">
    <!-- Breadcrumb Navigation -->
    <nav class="flex items-center gap-2 text-xs text-slate-400" aria-label="Breadcrumb">
      <router-link to="/" class="hover:text-sky-400 flex items-center gap-1">
        <i class="fas fa-house text-[11px]"></i> <span>Beranda</span>
      </router-link>
      <i class="fas fa-chevron-right text-[10px] text-slate-600"></i>
      <span class="text-white font-medium">Leaderboard Sultan Top Spender</span>
    </nav>

    <!-- Header & Interactive Search/Filter Banner -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
      <div class="max-w-2xl space-y-2 relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
          <i class="fas fa-crown animate-pulse"></i> <span>Hall of Fame Gamer Sultan</span>
        </div>
        <h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Peringkat <span class="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">Top Spender</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Apresiasi khusus bagi para gamer setia dengan akumulasi transaksi top up tertinggi dan tercepat di MPTopUp.
        </p>
      </div>

      <!-- Quick Fast Search & Period Tabs Form Box -->
      <div class="relative z-10 max-w-3xl bg-slate-950/80 border border-slate-700/80 rounded-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2 shadow-inner">
        <div class="relative flex-1 w-full">
          <i class="fas fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
          <input 
            type="search" 
            v-model="searchQuery" 
            placeholder="Cari nama sultan, nomor telepon, atau judul game..." 
            class="w-full h-11 pl-9 pr-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-amber-500 transition-all font-mono"
          />
        </div>

        <div class="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button 
            type="button"
            v-for="tab in periods" 
            :key="tab.key"
            @click="handlePeriodChange(tab.key)"
            :class="[
              leaderboardStore.activePeriod === tab.key 
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black' 
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 font-bold'
            ]"
            class="h-11 px-3.5 sm:px-4 rounded-xl text-xs flex items-center gap-1.5 whitespace-nowrap transition-all btn-press"
          >
            <i :class="tab.icon" class="text-xs"></i>
            <span>{{ tab.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Top 3 Podium Spotlight Display (If available and no search filter) -->
    <div v-if="!searchQuery && topThree.length >= 3" class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-base sm:text-lg font-black text-white flex items-center gap-2">
          <i class="fas fa-trophy text-amber-400"></i>
          <span>Podium Juara Teratas ({{ currentPeriodLabel }})</span>
        </h2>
        <span class="text-xs text-slate-400 font-medium">Pembaruan Real-Time</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-end">
        <!-- 2nd Place (Silver) -->
        <div class="order-2 md:order-1 bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/80 rounded-3xl p-6 text-center space-y-3 shadow-xl relative transform md:-translate-y-2">
          <div class="w-10 h-10 rounded-2xl bg-slate-300/20 border border-slate-400 text-slate-300 font-black text-sm flex items-center justify-center mx-auto shadow-md">
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
            <p class="text-[10px] uppercase font-bold text-slate-500">Total Akumulasi Top Up</p>
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
            <p class="text-[10px] uppercase font-bold text-amber-400/80">Total Akumulasi Top Up</p>
            <p class="text-base font-black text-amber-400">Rp {{ formatNumber(topThree[0].totalSpend) }}</p>
          </div>
        </div>

        <!-- 3rd Place (Bronze) -->
        <div class="order-3 bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-amber-900/40 rounded-3xl p-6 text-center space-y-3 shadow-xl relative">
          <div class="w-10 h-10 rounded-2xl bg-amber-700/20 border border-amber-600/60 text-amber-500 font-black text-sm flex items-center justify-center mx-auto shadow-md">
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
            <p class="text-[10px] uppercase font-bold text-slate-500">Total Akumulasi Top Up</p>
            <p class="text-sm font-black text-slate-200">Rp {{ formatNumber(topThree[2].totalSpend) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 3 KPI Status Metric Counters (Matching OrderHistoryView) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl interactive-card">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Total Nilai Transaksi Leaderboard</span>
          <div class="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-400 flex items-center justify-center">
            <i class="fas fa-coins text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-amber-400">Rp {{ formatNumber(totalLeaderboardSpend) }}</p>
        <p class="text-[11px] text-slate-400">Akumulasi {{ currentLeaderboard.length }} Sultan Aktif</p>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl interactive-card">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Sultan Peringkat #1</span>
          <div class="w-8 h-8 rounded-xl bg-sky-950/60 border border-sky-800 text-sky-400 flex items-center justify-center">
            <i class="fas fa-crown text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-white truncate">{{ topThree[0]?.name || '-' }}</p>
        <p class="text-[11px] text-sky-400 font-semibold">{{ topThree[0]?.game || 'Game Populer' }} • {{ topThree[0]?.tier || 'Rank 1' }}</p>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl interactive-card">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Periode Perhitungan</span>
          <div class="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center justify-center">
            <i class="fas fa-calendar-check text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-emerald-400">{{ currentPeriodLabel }}</p>
        <p class="text-[11px] text-emerald-400 font-semibold">Diperbarui otomatis tiap transaksi selesai</p>
      </div>
    </div>

    <!-- Filter & Search Bar Section -->
    <div class="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center gap-3">
      <div class="relative flex-1 w-full">
        <i class="fas fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
        <input 
          type="search" 
          v-model="searchQuery" 
          placeholder="Cari berdasarkan nama sultan, nomor telepon masked, atau judul game..." 
          class="w-full h-11 pl-9 pr-3 rounded-2xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-sky-500 transition-all"
        />
      </div>

      <div class="relative w-full sm:w-56">
        <i class="fas fa-filter absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
        <select 
          v-model="leaderboardStore.activePeriod" 
          @change="handlePeriodChange(leaderboardStore.activePeriod)"
          class="w-full h-11 pl-9 pr-8 rounded-2xl bg-slate-800 border border-slate-700 text-white text-xs font-semibold focus:ring-2 focus:ring-sky-500 cursor-pointer appearance-none"
        >
          <option value="daily">Hari Ini</option>
          <option value="weekly">Minggu Ini</option>
          <option value="monthly">Bulan Ini</option>
          <option value="all_time">Sepanjang Masa</option>
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
              <th scope="col" class="py-3.5 px-4 text-center w-14">#</th>
              <th scope="col" class="py-3.5 px-4">Pengguna / Sultan</th>
              <th scope="col" class="py-3.5 px-4">Game Favorit</th>
              <th scope="col" class="py-3.5 px-4">Rank Tier</th>
              <th scope="col" class="py-3.5 px-4 text-center">Jumlah Top Up</th>
              <th scope="col" class="py-3.5 px-4 text-right">Total Transaksi</th>
              <th scope="col" class="py-3.5 px-4 text-center w-20">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/80">
            <tr 
              v-for="(item, idx) in filteredLeaderboard" 
              :key="item.rank || idx" 
              :class="[
                item.rank === 1 ? 'bg-amber-950/20' : 
                item.rank === 2 ? 'bg-slate-800/30' : 
                item.rank === 3 ? 'bg-amber-900/10' : 
                'hover:bg-slate-800/40'
              ]"
              class="transition-colors"
            >
              <!-- Auto-numbering column # -->
              <td class="py-3.5 px-4 font-mono text-center font-bold">
                <span v-if="item.rank === 1" class="text-amber-400 text-sm font-black flex items-center justify-center gap-1">
                  🥇 1
                </span>
                <span v-else-if="item.rank === 2" class="text-slate-300 text-sm font-black flex items-center justify-center gap-1">
                  🥈 2
                </span>
                <span v-else-if="item.rank === 3" class="text-amber-600 text-sm font-black flex items-center justify-center gap-1">
                  🥉 3
                </span>
                <span v-else class="text-slate-400 font-mono">
                  #{{ item.rank || (idx + 1) }}
                </span>
              </td>

              <!-- Sultan User Info -->
              <td class="py-3.5 px-4">
                <div class="flex items-center gap-3">
                  <img :src="item.avatar" :alt="item.name" class="w-8 h-8 rounded-xl object-cover border border-slate-700 bg-slate-950 shrink-0">
                  <div>
                    <strong class="text-white font-bold block">{{ item.name }}</strong>
                    <span class="text-[10px] text-slate-500 font-mono">{{ item.phone }}</span>
                  </div>
                </div>
              </td>

              <!-- Favorite Game -->
              <td class="py-3.5 px-4 text-slate-300 font-medium">
                {{ item.game }}
              </td>

              <!-- Rank Tier Badge -->
              <td class="py-3.5 px-4">
                <span class="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-sky-400 inline-block">
                  {{ item.tier }}
                </span>
              </td>

              <!-- Transaction Count -->
              <td class="py-3.5 px-4 text-center font-semibold text-slate-300">
                {{ item.txCount }}x Transaksi
              </td>

              <!-- Total Nominal Spend -->
              <td class="py-3.5 px-4 text-right font-black text-emerald-400 font-mono text-sm">
                Rp {{ formatNumber(item.totalSpend) }}
              </td>

              <!-- Icon-only action button -->
              <td class="py-3.5 px-4 text-center">
                <router-link 
                  to="/produk" 
                  class="w-8 h-8 rounded-lg bg-sky-950/60 hover:bg-sky-900 border border-sky-800 text-sky-400 hover:text-white inline-flex items-center justify-center transition-colors mx-auto btn-press" 
                  title="Top Up Sekarang" 
                  aria-label="Top Up Sekarang"
                >
                  <i class="fas fa-gamepad text-xs"></i>
                </router-link>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="filteredLeaderboard.length === 0">
              <td colspan="7" class="py-14 text-center text-slate-500">
                <div class="w-14 h-14 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto text-xl mb-3">
                  <i class="fas fa-trophy"></i>
                </div>
                <p class="font-bold text-sm text-slate-300">Tidak ada peringkat sultan yang cocok</p>
                <p class="text-xs text-slate-500 mt-0.5">Coba cari dengan kata kunci lain atau pilih periode yang lain.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Help & Privacy Callout Banner (Matching OrderHistoryView structure) -->
    <div class="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
      <div class="space-y-1 text-center sm:text-left">
        <h3 class="text-base sm:text-lg font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
          <i class="fas fa-crown text-amber-400 text-xl"></i> Ingin Masuk ke Leaderboard Sultan?
        </h3>
        <p class="text-xs text-slate-400">Tingkatkan transaksi top up game favoritmu dan raih posisi Juara 1 di Hall of Fame MPTopUp!</p>
      </div>

      <router-link 
        to="/produk" 
        class="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0 btn-press"
      >
        <i class="fas fa-fire text-base"></i> <span>Mulai Top Up Sekarang</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useLeaderboardStore } from '@/stores/leaderboardStore';

const leaderboardStore = useLeaderboardStore();
const searchQuery = ref('');

onMounted(() => {
  leaderboardStore.fetchLeaderboard(leaderboardStore.activePeriod);
});

const periods = [
  { key: 'daily', label: 'Hari Ini', icon: 'fas fa-calendar-day' },
  { key: 'weekly', label: 'Minggu Ini', icon: 'fas fa-calendar-week' },
  { key: 'monthly', label: 'Bulan Ini', icon: 'fas fa-calendar' },
  { key: 'all_time', label: 'Sepanjang Masa', icon: 'fas fa-crown' }
];

const currentPeriodLabel = computed(() => {
  const match = periods.find(p => p.key === leaderboardStore.activePeriod);
  return match ? match.label : 'Bulan Ini';
});

const currentLeaderboard = computed(() => leaderboardStore.currentLeaderboard);
const topThree = computed(() => leaderboardStore.topThree);

const totalLeaderboardSpend = computed(() => {
  return currentLeaderboard.value.reduce((acc, item) => acc + (Number(item.totalSpend) || 0), 0);
});

const filteredLeaderboard = computed(() => {
  if (!searchQuery.value.trim()) return currentLeaderboard.value;
  const q = searchQuery.value.toLowerCase().trim();
  return currentLeaderboard.value.filter(item => 
    item.name.toLowerCase().includes(q) ||
    item.phone.toLowerCase().includes(q) ||
    item.game.toLowerCase().includes(q) ||
    item.tier.toLowerCase().includes(q)
  );
});

function handlePeriodChange(period) {
  leaderboardStore.setPeriod(period);
}

function formatNumber(num) {
  return new Intl.NumberFormat('id-ID').format(num || 0);
}
</script>
