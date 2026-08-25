<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 pb-16">
    <!-- Breadcrumb Navigation -->
    <nav class="flex items-center gap-2 text-xs text-slate-400" aria-label="Breadcrumb">
      <router-link to="/" class="hover:text-sky-400 flex items-center gap-1">
        <i class="fas fa-house text-[11px]"></i> <span>Beranda</span>
      </router-link>
      <i class="fas fa-chevron-right text-[10px] text-slate-600"></i>
      <span class="text-white font-medium">Tools &amp; Kalkulator Mobile Legends</span>
    </nav>

    <!-- Header & Interactive Fast Tab Switcher Banner -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
      <div class="max-w-2xl space-y-2 relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[11px] font-bold uppercase tracking-wider">
          <i class="fas fa-calculator animate-pulse"></i> <span>Gaming Tools &amp; Estimator Akurat</span>
        </div>
        <h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Kalkulator <span class="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 bg-clip-text text-transparent">Mobile Legends</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Hitung target kemenangan beruntun (*win streak*) tanpa kalah, estimasi sisa Magic Point crystal, dan kebutuhan draw skin Zodiac secara presisi.
        </p>
      </div>

      <!-- Quick Fast Tab Switcher Box -->
      <div class="relative z-10 max-w-3xl bg-slate-950/80 border border-slate-700/80 rounded-2xl p-2 sm:p-2.5 flex flex-wrap sm:flex-nowrap items-center gap-2 shadow-inner">
        <button 
          type="button"
          v-for="tab in calcTabs" 
          :key="tab.id"
          @click="switchTab(tab.id)"
          :class="[
            activeTab === tab.id 
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 font-black' 
              : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 font-bold'
          ]"
          class="h-11 flex-1 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all btn-press whitespace-nowrap"
        >
          <i :class="tab.icon" class="text-xs"></i>
          <span>{{ tab.label }}</span>
        </button>
      </div>
    </div>

    <!-- 3 KPI Status Metric Counters (Matching Lacak Standard) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      <div 
        @click="switchTab('winrate')"
        :class="[activeTab === 'winrate' ? 'border-sky-500/80 bg-sky-950/20' : 'border-slate-800 bg-slate-900']"
        class="border p-5 rounded-3xl space-y-1 shadow-xl interactive-card cursor-pointer transition-all"
      >
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Kalkulator Win Rate</span>
          <div class="w-8 h-8 rounded-xl bg-sky-950/60 border border-sky-800 text-sky-400 flex items-center justify-center">
            <i class="fas fa-percent text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-white">Target Win Streak</p>
        <p class="text-[11px] text-sky-400 font-semibold">Formula matematis push rank tanpa lose</p>
      </div>

      <div 
        @click="switchTab('magic-wheel')"
        :class="[activeTab === 'magic-wheel' ? 'border-amber-500/80 bg-amber-950/20' : 'border-slate-800 bg-slate-900']"
        class="border p-5 rounded-3xl space-y-1 shadow-xl interactive-card cursor-pointer transition-all"
      >
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Kalkulator Magic Wheel</span>
          <div class="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-400 flex items-center justify-center">
            <i class="fas fa-dharmachakra text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-amber-400">200 Magic Points</p>
        <p class="text-[11px] text-amber-400 font-semibold">Estimasi Diamond Magic Crystal Legend</p>
      </div>

      <div 
        @click="switchTab('zodiac')"
        :class="[activeTab === 'zodiac' ? 'border-purple-500/80 bg-purple-950/20' : 'border-slate-800 bg-slate-900']"
        class="border p-5 rounded-3xl space-y-1 shadow-xl interactive-card cursor-pointer transition-all"
      >
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Kalkulator Zodiac</span>
          <div class="w-8 h-8 rounded-xl bg-purple-950/60 border border-purple-800 text-purple-400 flex items-center justify-center">
            <i class="fas fa-moon text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-purple-400">100 Star Power</p>
        <p class="text-[11px] text-purple-400 font-semibold">Estimasi COA / Diamond Skin Zodiak</p>
      </div>
    </div>

    <!-- ==================================================================== -->
    <!-- 1. TAB CONTENT: KALKULATOR WIN RATE -->
    <!-- ==================================================================== -->
    <div v-if="activeTab === 'winrate'" class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <!-- Form Inputs (7 cols) -->
        <div class="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          <div class="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div class="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-500/30 text-sky-400 flex items-center justify-center text-lg font-bold">
              <i class="fas fa-percent"></i>
            </div>
            <div>
              <h3 class="text-base font-black text-white">Parameter Statistik Akun</h3>
              <p class="text-xs text-slate-400">Masukkan total match dan win rate dari menu profil akun in-game.</p>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label for="wrTotalMatches" class="block text-xs font-semibold text-slate-300 mb-1">
                Total Pertandingan (Match) Saat Ini
              </label>
              <div class="relative">
                <i class="fas fa-gamepad absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
                <input 
                  type="number" 
                  id="wrTotalMatches"
                  v-model.number="wrInputs.totalMatch" 
                  min="1" 
                  max="100000"
                  placeholder="Contoh: 850"
                  class="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500 font-mono"
                >
              </div>
            </div>

            <div>
              <label for="wrCurrentRate" class="block text-xs font-semibold text-slate-300 mb-1">
                Total Win Rate Saat Ini (%)
              </label>
              <div class="relative">
                <i class="fas fa-chart-line absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
                <input 
                  type="number" 
                  id="wrCurrentRate"
                  v-model.number="wrInputs.currentWR" 
                  step="0.01"
                  min="1" 
                  max="99.99"
                  placeholder="Contoh: 54.20"
                  class="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500 font-mono"
                >
              </div>
            </div>

            <div>
              <label for="wrTargetRate" class="block text-xs font-semibold text-slate-300 mb-1">
                Target Win Rate yang Diinginkan (%)
              </label>
              <div class="relative">
                <i class="fas fa-bullseye absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 text-xs pointer-events-none"></i>
                <input 
                  type="number" 
                  id="wrTargetRate"
                  v-model.number="wrInputs.targetWR" 
                  step="0.01"
                  min="1" 
                  max="99.99"
                  placeholder="Contoh: 60.00"
                  class="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500 font-mono"
                >
              </div>
            </div>

            <div class="flex gap-2 pt-2">
              <button 
                type="button" 
                @click="resetWR"
                class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <i class="fas fa-rotate-left"></i> <span>Reset Angka</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Result Card (5 cols) -->
        <div class="lg:col-span-5 bg-gradient-to-b from-sky-950/40 via-slate-900 to-slate-900 border border-sky-800/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl space-y-6">
          <div class="space-y-4">
            <span class="px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-black uppercase">
              Hasil Kalkulasi Win Rate
            </span>

            <div v-if="wrResult.status === 'valid'" class="space-y-3">
              <p class="text-xs text-slate-300">Untuk mencapai target Win Rate <strong class="text-white font-bold">{{ wrInputs.targetWR }}%</strong>, kamu membutuhkan:</p>
              <div class="p-4 rounded-2xl bg-sky-950/80 border border-sky-700/60 text-center space-y-1 shadow-inner">
                <span class="text-3xl sm:text-4xl font-black text-sky-400 font-mono">{{ wrResult.winsNeeded }}</span>
                <p class="text-xs font-black uppercase tracking-wider text-emerald-400">Kemenangan Beruntun (Win Streak)</p>
                <p class="text-[11px] text-slate-400">Tanpa Mengalami Kekalahan Sekalipun</p>
              </div>

              <div class="text-[11px] text-slate-400 space-y-1.5 pt-2">
                <div class="flex justify-between border-b border-slate-800 pb-1">
                  <span>Total Match Akhir:</span>
                  <span class="text-white font-bold font-mono">{{ wrResult.finalMatch }} Match</span>
                </div>
                <div class="flex justify-between">
                  <span>Total Kemenangan Akhir:</span>
                  <span class="text-emerald-400 font-bold font-mono">{{ wrResult.finalWins }} Wins</span>
                </div>
              </div>
            </div>

            <div v-else-if="wrResult.status === 'reached'" class="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs space-y-1 text-center">
              <i class="fas fa-circle-check text-2xl text-emerald-400 mb-1 block"></i>
              <strong class="font-bold block">Target Sudah Tercapai!</strong>
              <span>Win Rate kamu saat ini ({{ wrInputs.currentWR }}%) sudah lebih besar atau sama dengan target.</span>
            </div>

            <div v-else-if="wrResult.status === 'impossible'" class="p-4 rounded-2xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs space-y-1 text-center">
              <i class="fas fa-triangle-exclamation text-2xl text-rose-400 mb-1 block"></i>
              <strong class="font-bold block">Target Tidak Memungkinkan</strong>
              <span>Target Win Rate 100% secara matematis mustahil dicapai jika pernah mengalami kekalahan.</span>
            </div>
          </div>

          <router-link to="/produk/game1" class="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30 btn-press">
            <i class="fas fa-gem"></i>
            <span>Top Up Diamond MLBB untuk Push Rank</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- ==================================================================== -->
    <!-- 2. TAB CONTENT: KALKULATOR MAGIC WHEEL -->
    <!-- ==================================================================== -->
    <div v-if="activeTab === 'magic-wheel'" class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <!-- Form Inputs (7 cols) -->
        <div class="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          <div class="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div class="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center text-lg font-bold">
              <i class="fas fa-dharmachakra"></i>
            </div>
            <div>
              <h3 class="text-base font-black text-white">Hitung Sisa Magic Point</h3>
              <p class="text-xs text-slate-400">Target 200 Magic Points untuk mendapatkan Magic Crystal (Skin Legend).</p>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <div class="flex justify-between items-center mb-1">
                <label for="mwPointInput" class="block text-xs font-semibold text-slate-300">
                  Magic Point Saat Ini (0 - 200)
                </label>
                <span class="text-xs font-black text-amber-400 font-mono">{{ mwPoint }} / 200 Poin</span>
              </div>
              <input 
                type="range" 
                id="mwPointRange"
                v-model.number="mwPoint" 
                min="0" 
                max="200"
                class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              >
              <div class="relative mt-2">
                <i class="fas fa-star absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400 text-xs pointer-events-none"></i>
                <input 
                  type="number" 
                  id="mwPointInput"
                  v-model.number="mwPoint" 
                  min="0" 
                  max="200"
                  class="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 font-mono"
                >
              </div>
            </div>

            <!-- Quick Add Presets -->
            <div class="flex flex-wrap gap-2 pt-1">
              <button 
                type="button"
                v-for="preset in [20, 50, 100, 150, 180]" 
                :key="preset"
                @click="mwPoint = preset"
                class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              >
                {{ preset }} Poin
              </button>
            </div>
          </div>
        </div>

        <!-- Result Card (5 cols) -->
        <div class="lg:col-span-5 bg-gradient-to-b from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl space-y-6">
          <div class="space-y-4">
            <span class="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase">
              Estimasi Biaya Magic Wheel
            </span>

            <div class="space-y-3">
              <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div class="flex justify-between text-xs">
                  <span class="text-slate-400">Sisa Poin Diperlukan:</span>
                  <span class="text-white font-black font-mono text-sm">{{ 200 - mwPoint }} Poin</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-slate-400">Estimasi Spin 5x (Hemat):</span>
                  <span class="text-sky-400 font-bold font-mono">{{ Math.ceil((200 - mwPoint) / 5) }}x Draw</span>
                </div>
              </div>

              <div class="p-4 rounded-2xl bg-amber-950/60 border border-amber-700/60 text-center space-y-1">
                <p class="text-[10px] uppercase font-bold text-amber-400">Kebutuhan Diamond / COA (5x Spin)</p>
                <p class="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                  💎 {{ formatNumber(Math.ceil((200 - mwPoint) / 5) * 270) }}
                </p>
                <p class="text-xs text-slate-400 font-mono">Estimasi: Rp {{ formatNumber(Math.ceil((200 - mwPoint) / 5) * 270 * 275) }}</p>
              </div>
            </div>
          </div>

          <router-link to="/produk/game1" class="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 btn-press">
            <i class="fas fa-gem"></i>
            <span>Top Up Diamond MLBB Sekarang</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- ==================================================================== -->
    <!-- 3. TAB CONTENT: KALKULATOR ZODIAC -->
    <!-- ==================================================================== -->
    <div v-if="activeTab === 'zodiac'" class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <!-- Form Inputs (7 cols) -->
        <div class="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          <div class="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div class="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center text-lg font-bold">
              <i class="fas fa-moon"></i>
            </div>
            <div>
              <h3 class="text-base font-black text-white">Hitung Kebutuhan Skin Zodiac</h3>
              <p class="text-xs text-slate-400">Target 100 Star Power untuk mengklaim Skin Zodiac eksklusif.</p>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <div class="flex justify-between items-center mb-1">
                <label for="zodiacStarInput" class="block text-xs font-semibold text-slate-300">
                  Star Power Saat Ini (0 - 100)
                </label>
                <span class="text-xs font-black text-purple-400 font-mono">{{ zodiacStar }} / 100</span>
              </div>
              <input 
                type="range" 
                id="zodiacStarRange"
                v-model.number="zodiacStar" 
                min="0" 
                max="100"
                class="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              >
              <div class="relative mt-2">
                <i class="fas fa-star-and-crescent absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400 text-xs pointer-events-none"></i>
                <input 
                  type="number" 
                  id="zodiacStarInput"
                  v-model.number="zodiacStar" 
                  min="0" 
                  max="100"
                  class="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-purple-500 font-mono"
                >
              </div>
            </div>

            <!-- Quick Add Presets -->
            <div class="flex flex-wrap gap-2 pt-1">
              <button 
                type="button"
                v-for="preset in [10, 30, 50, 70, 90]" 
                :key="preset"
                @click="zodiacStar = preset"
                class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              >
                {{ preset }} Star Power
              </button>
            </div>
          </div>
        </div>

        <!-- Result Card (5 cols) -->
        <div class="lg:col-span-5 bg-gradient-to-b from-purple-950/30 via-slate-900 to-slate-900 border border-purple-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl space-y-6">
          <div class="space-y-4">
            <span class="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 text-[10px] font-black uppercase">
              Estimasi Biaya Skin Zodiac
            </span>

            <div class="space-y-3">
              <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div class="flex justify-between text-xs">
                  <span class="text-slate-400">Sisa Star Power:</span>
                  <span class="text-white font-black font-mono text-sm">{{ 100 - zodiacStar }} Power</span>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-slate-400">Estimasi Draw 5x:</span>
                  <span class="text-purple-300 font-bold font-mono">{{ Math.ceil((100 - zodiacStar) / 5) }}x Draw</span>
                </div>
              </div>

              <div class="p-4 rounded-2xl bg-purple-950/60 border border-purple-700/60 text-center space-y-1">
                <p class="text-[10px] uppercase font-bold text-purple-400">Kebutuhan Diamond / COA</p>
                <p class="text-2xl sm:text-3xl font-black text-purple-300 font-mono">
                  💎 {{ formatNumber(Math.ceil((100 - zodiacStar) / 5) * 100) }}
                </p>
                <p class="text-xs text-slate-400 font-mono">Estimasi: Rp {{ formatNumber(Math.ceil((100 - zodiacStar) / 5) * 100 * 275) }}</p>
              </div>
            </div>
          </div>

          <router-link to="/produk/game1" class="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 btn-press">
            <i class="fas fa-gem"></i>
            <span>Top Up Diamond / COA MLBB</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Help & Support Callout Banner (Matching Lacak Standard) -->
    <div class="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/30 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
      <div class="space-y-1 text-center sm:text-left">
        <h3 class="text-base sm:text-lg font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
          <i class="fas fa-gem text-sky-400 text-xl"></i> Butuh Diamond untuk Mencapai Target?
        </h3>
        <p class="text-xs text-slate-400">Top up Diamond Mobile Legends resmi Moonton instan otomatis 1-3 detik via QRIS &amp; E-Wallet.</p>
      </div>

      <router-link 
        to="/produk/game1" 
        class="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-600/20 transition-all shrink-0 btn-press"
      >
        <i class="fas fa-bolt text-base"></i> <span>Beli Diamond Sekarang</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const calcTabs = [
  { id: 'winrate', label: 'Kalkulator Win Rate', icon: 'fas fa-percent' },
  { id: 'magic-wheel', label: 'Kalkulator Magic Wheel', icon: 'fas fa-dharmachakra' },
  { id: 'zodiac', label: 'Kalkulator Zodiac', icon: 'fas fa-moon' }
];

const activeTab = ref(route.params.type || 'winrate');

watch(() => route.params.type, (newType) => {
  if (newType && ['winrate', 'magic-wheel', 'zodiac'].includes(newType)) {
    activeTab.value = newType;
  }
});

function switchTab(tabId) {
  activeTab.value = tabId;
  router.push(`/kalkulator/${tabId}`);
}

// 1. Win Rate Calculator Logic
const wrInputs = ref({
  totalMatch: 500,
  currentWR: 52.40,
  targetWR: 60.00
});

const wrResult = computed(() => {
  const M = Number(wrInputs.value.totalMatch);
  const WR = Number(wrInputs.value.currentWR);
  const T = Number(wrInputs.value.targetWR);

  if (!M || !WR || !T || M <= 0 || WR <= 0 || T <= 0) {
    return { status: 'empty' };
  }

  if (T >= 100) {
    return { status: 'impossible' };
  }

  if (WR >= T) {
    return { status: 'reached' };
  }

  const winsNeeded = Math.ceil((M * (T - WR)) / (100 - T));
  const currentWins = Math.round((M * WR) / 100);

  return {
    status: 'valid',
    winsNeeded,
    finalMatch: M + winsNeeded,
    finalWins: currentWins + winsNeeded
  };
});

function resetWR() {
  wrInputs.value = {
    totalMatch: 500,
    currentWR: 50.00,
    targetWR: 60.00
  };
}

// 2. Magic Wheel Calculator State
const mwPoint = ref(120);

// 3. Zodiac Calculator State
const zodiacStar = ref(45);

function formatNumber(num) {
  return new Intl.NumberFormat('id-ID').format(Math.max(0, Math.round(num || 0)));
}
</script>
