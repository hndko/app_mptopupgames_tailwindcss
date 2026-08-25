<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 pb-16">
    <!-- Breadcrumb Navigation -->
    <nav class="flex items-center gap-2 text-xs text-slate-400" aria-label="Breadcrumb">
      <router-link to="/" class="hover:text-sky-400 flex items-center gap-1">
        <i class="fas fa-house text-[11px]"></i> <span>Beranda</span>
      </router-link>
      <i class="fas fa-chevron-right text-[10px] text-slate-600"></i>
      <span class="text-white font-medium">Artikel &amp; Panduan Gaming</span>
    </nav>

    <!-- Header & Interactive Search Banner -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
      <div class="max-w-2xl space-y-2 relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[11px] font-bold uppercase tracking-wider">
          <i class="fas fa-newspaper animate-pulse"></i> <span>Warta &amp; Panduan Gaming Terkini</span>
        </div>
        <h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Artikel, Berita &amp; <span class="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 bg-clip-text text-transparent">Tips Push Rank</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Temukan info promo top up terkini, bocoran event game, panduan meta hero, dan trik hemat diamond terverifikasi.
        </p>
      </div>

      <!-- Quick Fast Search Box -->
      <form @submit.prevent class="relative z-10 max-w-2xl bg-slate-950/80 border border-slate-700/80 rounded-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2 shadow-inner">
        <div class="relative flex-1 w-full">
          <i class="fas fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
          <input 
            type="search" 
            v-model="searchQuery" 
            placeholder="Cari judul artikel, panduan hero, atau promo event..." 
            class="w-full h-11 pl-9 pr-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-sky-500 transition-all font-mono"
          />
        </div>
        <button 
          type="button" 
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all shrink-0"
        >
          Reset Filter
        </button>
      </form>
    </div>

    <!-- 3 KPI Status Metric Counters (Matching Lacak Standard) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl interactive-card">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Total Artikel Diterbitkan</span>
          <div class="w-8 h-8 rounded-xl bg-sky-950/60 border border-sky-800 text-sky-400 flex items-center justify-center">
            <i class="fas fa-book-open text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-white">{{ articlesStore.articles.length }} Artikel</p>
        <p class="text-[11px] text-slate-400">Diperbarui berkala oleh Game Strategist</p>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl interactive-card">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Kategori Terpopuler</span>
          <div class="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-400 flex items-center justify-center">
            <i class="fas fa-fire text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-amber-400">Tips &amp; Trik</p>
        <p class="text-[11px] text-amber-400 font-semibold">Panduan hemat diamond &amp; win rate</p>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl interactive-card">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Total Pembaca Aktif</span>
          <div class="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center justify-center">
            <i class="fas fa-users text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-emerald-400">{{ formatNumber(totalArticleViews) }}+ Views</p>
        <p class="text-[11px] text-emerald-400 font-semibold">Pembaca gamer dari seluruh Indonesia</p>
      </div>
    </div>

    <!-- Filter & Category Toolbar Section -->
    <div id="articlesSection" class="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
      <!-- Category Pills -->
      <div class="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
        <button
          type="button"
          v-for="cat in articlesStore.categories"
          :key="cat"
          @click="selectCategory(cat)"
          :class="[
            articlesStore.selectedCategory === cat 
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 font-black' 
              : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 font-bold border border-slate-700/80'
          ]"
          class="h-10 px-4 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-1.5 btn-press"
        >
          <span>{{ cat }}</span>
        </button>
      </div>

      <span class="text-xs font-semibold text-slate-400 shrink-0">
        Menampilkan <strong class="text-sky-400">{{ filteredArticles.length }}</strong> dari {{ articlesStore.articles.length }} artikel
      </span>
    </div>

    <!-- Featured Banner Article (If on Page 1, category 'Semua' and no search) -->
    <div v-if="currentPage === 1 && articlesStore.selectedCategory === 'Semua' && !searchQuery && articlesStore.featuredArticle" class="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
      <div class="grid grid-cols-1 lg:grid-cols-12 items-center">
        <div class="lg:col-span-7 aspect-[16/9] lg:aspect-auto h-full overflow-hidden">
          <img :src="articlesStore.featuredArticle.banner" :alt="articlesStore.featuredArticle.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        </div>
        <div class="lg:col-span-5 p-6 sm:p-8 space-y-4">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-black uppercase">
              {{ articlesStore.featuredArticle.category }}
            </span>
            <span class="text-[11px] text-slate-500 font-mono">{{ articlesStore.featuredArticle.date }}</span>
          </div>
          <h2 class="text-lg sm:text-2xl font-black text-white leading-snug group-hover:text-sky-400 transition-colors">
            <router-link :to="'/artikel/' + articlesStore.featuredArticle.slug">
              {{ articlesStore.featuredArticle.title }}
            </router-link>
          </h2>
          <p class="text-xs text-slate-400 line-clamp-3 leading-relaxed">
            {{ articlesStore.featuredArticle.summary }}
          </p>
          <div class="pt-2 flex items-center justify-between">
            <span class="text-[11px] text-slate-500 flex items-center gap-1.5">
              <i class="fas fa-eye text-sky-400"></i> {{ articlesStore.featuredArticle.views }} pembaca
            </span>
            <router-link :to="'/artikel/' + articlesStore.featuredArticle.slug" class="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md btn-press">
              <span>Baca Selengkapnya</span>
              <i class="fas fa-arrow-right text-[10px]"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Article Grid Cards (Paginated) -->
    <div v-if="paginatedArticles.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <article 
        v-for="article in paginatedArticles" 
        :key="article.id"
        class="bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-3xl overflow-hidden shadow-xl hover:shadow-sky-500/10 transition-all flex flex-col group"
      >
        <div class="aspect-[16/9] overflow-hidden relative">
          <img :src="article.banner" :alt="article.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-sky-400 border border-slate-700 text-[10px] font-black uppercase">
            {{ article.category }}
          </span>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
              <span><i class="far fa-clock text-slate-400 mr-1"></i>{{ article.readTime }}</span>
              <span>•</span>
              <span>{{ article.date }}</span>
            </div>
            <h3 class="text-sm font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-2 leading-snug">
              <router-link :to="'/artikel/' + article.slug">
                {{ article.title }}
              </router-link>
            </h3>
            <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {{ article.summary }}
            </p>
          </div>

          <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span class="text-[11px] text-slate-500">
              <i class="fas fa-eye text-slate-400 mr-1"></i>{{ article.views }} views
            </span>
            <router-link :to="'/artikel/' + article.slug" class="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1">
              <span>Baca</span> <i class="fas fa-chevron-right text-[10px]"></i>
            </router-link>
          </div>
        </div>
      </article>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-slate-900 border border-slate-800 rounded-3xl p-14 text-center shadow-2xl space-y-3">
      <div class="w-14 h-14 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto text-xl mb-3">
        <i class="fas fa-newspaper"></i>
      </div>
      <h3 class="text-base font-bold text-white">Tidak Ada Artikel Ditemukan</h3>
      <p class="text-xs text-slate-400">Coba ubah kata kunci pencarian atau pilih kategori yang lain.</p>
    </div>

    <!-- Reactive Pagination Toolbar -->
    <div v-if="totalPages > 1" class="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-xs text-slate-400 font-medium">
        Halaman <strong class="text-white">{{ currentPage }}</strong> dari <strong class="text-white">{{ totalPages }}</strong> 
        (Artikel {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredArticles.length) }})
      </p>

      <div class="flex items-center gap-1.5">
        <!-- Previous Page Button -->
        <button 
          type="button"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
          :class="[
            currentPage === 1 
              ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500' 
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
          ]"
          class="h-10 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 btn-press"
          aria-label="Halaman Sebelumnya"
        >
          <i class="fas fa-chevron-left text-[10px]"></i>
          <span class="hidden sm:inline">Sebelumnya</span>
        </button>

        <!-- Page Numbers -->
        <button 
          type="button"
          v-for="pageNum in totalPages" 
          :key="pageNum"
          @click="goToPage(pageNum)"
          :class="[
            currentPage === pageNum 
              ? 'bg-sky-600 text-white font-black shadow-md shadow-sky-600/30' 
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 font-bold'
          ]"
          class="w-10 h-10 rounded-xl text-xs transition-all flex items-center justify-center btn-press font-mono"
        >
          {{ pageNum }}
        </button>

        <!-- Next Page Button -->
        <button 
          type="button"
          :disabled="currentPage >= totalPages"
          @click="goToPage(currentPage + 1)"
          :class="[
            currentPage >= totalPages 
              ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500' 
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
          ]"
          class="h-10 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 btn-press"
          aria-label="Halaman Berikutnya"
        >
          <span class="hidden sm:inline">Berikutnya</span>
          <i class="fas fa-chevron-right text-[10px]"></i>
        </button>
      </div>
    </div>

    <!-- Help & Promo Callout Banner (Matching Lacak Standard) -->
    <div class="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/30 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
      <div class="space-y-1 text-center sm:text-left">
        <h3 class="text-base sm:text-lg font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
          <i class="fas fa-tag text-sky-400 text-xl"></i> Mau Top Up Game Favorit dengan Harga Termurah?
        </h3>
        <p class="text-xs text-slate-400">Manfaatkan kupon diskon eksklusif dan nikmati pengiriman diamond instan dalam hitungan detik.</p>
      </div>

      <router-link 
        to="/produk" 
        class="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-600/20 transition-all shrink-0 btn-press"
      >
        <i class="fas fa-gamepad text-base"></i> <span>Katalog Game MPTopUp</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useArticlesStore } from '@/stores/articlesStore';

const articlesStore = useArticlesStore();
const currentPage = ref(1);
const itemsPerPage = ref(6);

onMounted(() => {
  articlesStore.fetchArticles();
});

const searchQuery = computed({
  get: () => articlesStore.searchQuery,
  set: (val) => {
    articlesStore.setSearch(val);
    currentPage.value = 1;
  }
});

const filteredArticles = computed(() => articlesStore.filteredArticles);

const totalPages = computed(() => {
  return Math.ceil(filteredArticles.value.length / itemsPerPage.value) || 1;
});

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredArticles.value.slice(start, start + itemsPerPage.value);
});

const totalArticleViews = computed(() => {
  return articlesStore.articles.reduce((acc, item) => acc + (Number(item.views) || 0), 0);
});

function selectCategory(cat) {
  articlesStore.setCategory(cat);
  currentPage.value = 1;
}

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  
  const el = document.getElementById('articlesSection');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function formatNumber(num) {
  return new Intl.NumberFormat('id-ID').format(num || 0);
}
</script>
