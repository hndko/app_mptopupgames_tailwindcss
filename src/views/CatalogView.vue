<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10 pb-16">
    <!-- Breadcrumb Navigation -->
    <nav class="flex items-center gap-2 text-xs text-slate-400" aria-label="Breadcrumb">
      <router-link to="/" class="hover:text-sky-400 flex items-center gap-1">
        <i class="fas fa-house text-[11px]"></i> <span>Beranda</span>
      </router-link>
      <i class="fas fa-chevron-right text-[10px] text-slate-600"></i>
      <span class="text-white font-medium">Katalog Game &amp; Voucher</span>
    </nav>

    <!-- Catalog Header Banner -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
      <div class="max-w-2xl space-y-3 relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[11px] font-bold uppercase tracking-wider">
          <i class="fas fa-shield-check text-sky-400"></i> <span>100% Legal &bull; Publisher Resmi</span>
        </div>
        <h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Katalog Top Up Game &amp; Voucher Digital
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Temukan game favoritmu, pilih paket diamond atau voucher, dan nikmati proses transaksi otomatis 24 jam nonstop dengan harga termurah di Indonesia.
        </p>
      </div>

      <!-- Decorative Ambient Glow -->
      <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>

    <!-- Filter, Search & Sorting Bar -->
    <div class="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-3.5">
        <!-- Search Input (7 cols on md) -->
        <div class="md:col-span-7 relative w-full">
          <i class="fas fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
          <input 
            type="search" 
            v-model="searchQuery" 
            placeholder="Cari game atau voucher (Mobile Legends, Valorant, Free Fire, Steam...)" 
            class="w-full h-11 pl-10 pr-10 rounded-2xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 transition-all"
          />
          <button 
            v-if="searchQuery" 
            type="button" 
            @click="searchQuery = ''"
            class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs p-1"
            title="Hapus pencarian"
          >
            <i class="fas fa-times-circle"></i>
          </button>
        </div>

        <!-- Category Dropdown / Filter (3 cols on md) -->
        <div class="md:col-span-3 relative w-full">
          <i class="fas fa-layer-group absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
          <select 
            v-model="selectedCategory" 
            class="w-full h-11 pl-9 pr-8 rounded-2xl bg-slate-800 border border-slate-700 text-white text-xs font-semibold focus:ring-2 focus:ring-sky-500 cursor-pointer appearance-none"
          >
            <option value="ALL">Semua Kategori ({{ gamesStore.games.length }})</option>
            <option value="POPULAR">Trending / Populer</option>
            <option value="Mobile">Game Mobile</option>
            <option value="PC">PC &amp; Console Game</option>
            <option value="Voucher">Voucher &amp; Gift Card</option>
          </select>
          <i class="fas fa-chevron-down absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
        </div>

        <!-- Sort By Dropdown (2 cols on md) -->
        <div class="md:col-span-2 relative w-full">
          <i class="fas fa-arrow-down-short-wide absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
          <select 
            v-model="sortBy" 
            class="w-full h-11 pl-9 pr-8 rounded-2xl bg-slate-800 border border-slate-700 text-white text-xs font-semibold focus:ring-2 focus:ring-sky-500 cursor-pointer appearance-none"
          >
            <option value="popular">Terpopuler</option>
            <option value="name_asc">Nama (A-Z)</option>
            <option value="name_desc">Nama (Z-A)</option>
            <option value="sku_count">Paling Banyak SKU</option>
          </select>
          <i class="fas fa-chevron-down absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none"></i>
        </div>
      </div>

      <!-- Quick Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none">
        <button 
          type="button" 
          v-for="cat in categoryList" 
          :key="cat.id"
          @click="selectedCategory = cat.id"
          :class="[
            selectedCategory === cat.id 
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' 
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300',
            'px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border border-slate-700/80 transition-all flex items-center gap-1.5'
          ]"
        >
          <i :class="cat.icon" class="text-xs"></i>
          <span>{{ cat.label }}</span>
        </button>
      </div>
    </div>

    <!-- Product Grid Section -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <p class="text-xs sm:text-sm text-slate-400">
          Menampilkan <strong class="text-white">{{ processedGames.length }}</strong> judul game &amp; voucher
        </p>
      </div>

      <!-- Games Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
        <router-link 
          v-for="game in processedGames" 
          :key="game.id"
          :to="`/produk/${game.id}`"
          class="group bg-slate-900 border border-slate-800 hover:border-sky-500 rounded-3xl p-3.5 sm:p-5 shadow-xl hover:shadow-sky-500/10 interactive-card flex flex-col justify-between"
        >
          <div class="space-y-3">
            <!-- Banner with badges -->
            <div class="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img :src="game.banner" :alt="game.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
              <span v-if="game.isPopular" class="absolute top-2.5 left-2.5 bg-amber-500 text-slate-950 font-black text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                Populer
              </span>
              <span class="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur-sm text-sky-400 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-slate-800">
                {{ game.category }}
              </span>
            </div>

            <!-- Title & Developer -->
            <div>
              <h2 class="font-bold text-white text-xs sm:text-sm group-hover:text-sky-400 transition-colors line-clamp-1">
                {{ game.title }}
              </h2>
              <p class="text-[11px] text-slate-400 mt-0.5">{{ game.developer }}</p>
            </div>

            <!-- SKU Variants Count & Price info -->
            <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span class="text-slate-400">
                <i class="fas fa-gem text-[10px] text-sky-400 mr-1"></i>
                {{ (game.products || []).length }} Pilihan Paket
              </span>
            </div>
          </div>

          <!-- Bottom Action Button -->
          <div class="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
            <span class="text-emerald-400 font-bold">
              Mulai Rp {{ getLowestPrice(game).toLocaleString('id-ID') }}
            </span>
            <span class="px-3 py-1.5 rounded-xl bg-sky-600/20 text-sky-400 group-hover:bg-sky-600 group-hover:text-white font-bold flex items-center gap-1 transition-colors btn-press">
              <span>Top Up</span> <i class="fas fa-arrow-right text-[10px]"></i>
            </span>
          </div>
        </router-link>
      </div>

      <!-- Empty State -->
      <div v-if="processedGames.length === 0" class="py-16 text-center text-slate-400 bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-3">
        <div class="w-16 h-16 rounded-3xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto text-2xl">
          <i class="fas fa-inbox"></i>
        </div>
        <h3 class="font-bold text-base text-white">Tidak Ada Game yang Ditemukan</h3>
        <p class="text-xs text-slate-400 max-w-md mx-auto">
          Tidak ditemukan game atau voucher dengan kata kunci "{{ searchQuery }}". Silakan reset pencarian atau coba kata kunci lain.
        </p>
        <button 
          type="button" 
          @click="resetFilter" 
          class="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors btn-press"
        >
          <i class="fas fa-rotate-left text-xs"></i> <span>Reset Filter</span>
        </button>
      </div>
    </div>

    <!-- Guarantees Footer Showcase -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
      <div class="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-3xl flex items-start gap-4 shadow-xl">
        <div class="w-11 h-11 rounded-2xl bg-sky-950 border border-sky-800 text-sky-400 flex items-center justify-center text-lg shrink-0">
          <i class="fas fa-bolt"></i>
        </div>
        <div class="space-y-0.5">
          <h4 class="text-xs sm:text-sm font-bold text-white">Pengiriman Instan 1-3 Detik</h4>
          <p class="text-[11px] text-slate-400">Pesanan diproses otomatis 24 jam nonstop.</p>
        </div>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-3xl flex items-start gap-4 shadow-xl">
        <div class="w-11 h-11 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center text-lg shrink-0">
          <i class="fas fa-shield-check"></i>
        </div>
        <div class="space-y-0.5">
          <h4 class="text-xs sm:text-sm font-bold text-white">100% Aman &amp; Legal</h4>
          <p class="text-[11px] text-slate-400">Seluruh produk bersumber dari distributor resmi.</p>
        </div>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-3xl flex items-start gap-4 shadow-xl">
        <div class="w-11 h-11 rounded-2xl bg-purple-950 border border-purple-800 text-purple-400 flex items-center justify-center text-lg shrink-0">
          <i class="fas fa-headset"></i>
        </div>
        <div class="space-y-0.5">
          <h4 class="text-xs sm:text-sm font-bold text-white">Bantuan WhatsApp 24/7</h4>
          <p class="text-[11px] text-slate-400">CS selalu siap siaga membantu transaksi Anda.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useGamesStore } from '@/stores/gamesStore';

const gamesStore = useGamesStore();

const searchQuery = ref('');
const selectedCategory = ref('ALL');
const sortBy = ref('popular');

const categoryList = [
  { id: 'ALL', label: 'Semua Kategori', icon: 'fas fa-grip' },
  { id: 'POPULAR', label: 'Populer', icon: 'fas fa-fire text-amber-400' },
  { id: 'Mobile', label: 'Mobile Game', icon: 'fas fa-mobile-screen text-sky-400' },
  { id: 'PC', label: 'PC & Console', icon: 'fas fa-desktop text-emerald-400' },
  { id: 'Voucher', label: 'Voucher Digital', icon: 'fas fa-ticket text-purple-400' }
];

const processedGames = computed(() => {
  let list = [...gamesStore.games];

  // 1. Filter by category
  if (selectedCategory.value === 'POPULAR') {
    list = list.filter(g => g.isPopular);
  } else if (selectedCategory.value !== 'ALL') {
    list = list.filter(g => g.category.toLowerCase() === selectedCategory.value.toLowerCase());
  }

  // 2. Filter by search query
  if (searchQuery.value.trim() !== '') {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(g => 
      g.title.toLowerCase().includes(q) || 
      g.developer.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q)
    );
  }

  // 3. Sorting
  if (sortBy.value === 'popular') {
    list.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
  } else if (sortBy.value === 'name_asc') {
    list.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy.value === 'name_desc') {
    list.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortBy.value === 'sku_count') {
    list.sort((a, b) => (b.products?.length || 0) - (a.products?.length || 0));
  }

  return list;
});

function getLowestPrice(game) {
  if (!game.products || game.products.length === 0) return 0;
  const prices = game.products.map(p => p.price);
  return Math.min(...prices);
}

function resetFilter() {
  searchQuery.value = '';
  selectedCategory.value = 'ALL';
  sortBy.value = 'popular';
}
</script>
