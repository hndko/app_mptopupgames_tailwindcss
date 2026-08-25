<template>
  <div class="space-y-10 sm:space-y-14 pb-16">
    <!-- Header Hero Section -->
    <section class="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
      <div class="max-w-3xl mx-auto text-center space-y-3">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-black tracking-wider uppercase">
          <i class="fas fa-newspaper"></i>
          <span>Warta &amp; Panduan Gaming</span>
        </div>
        <h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Artikel, Berita &amp; <span class="text-sky-400">Tips Push Rank</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Temukan info promo top up terkini, bocoran event game, panduan meta hero, dan trik hemat diamond.
        </p>

        <!-- Search Input Toolbar -->
        <div class="max-w-md mx-auto relative pt-3">
          <i class="fas fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 pt-1.5 text-slate-500 text-xs pointer-events-none"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Cari judul artikel, game, atau tips..." 
            class="w-full h-11 pl-11 pr-4 rounded-2xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-sky-500 transition-all shadow-inner"
          >
        </div>
      </div>
    </section>

    <!-- Category Filter Pills -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        type="button"
        v-for="cat in articlesStore.categories"
        :key="cat"
        @click="articlesStore.setCategory(cat)"
        :class="[articlesStore.selectedCategory === cat ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800']"
        class="px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 btn-press"
      >
        <span>{{ cat }}</span>
      </button>
    </div>

    <!-- Featured Banner Article (If on 'Semua' and no search) -->
    <div v-if="articlesStore.selectedCategory === 'Semua' && !searchQuery && articlesStore.featuredArticle" class="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
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

    <!-- Article Grid Cards -->
    <div v-if="filteredArticles.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <article 
        v-for="article in filteredArticles" 
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

    <!-- Empty Search State -->
    <div v-else class="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
      <i class="fas fa-newspaper text-4xl text-slate-600"></i>
      <h3 class="text-base font-bold text-white">Tidak Ada Artikel Ditemukan</h3>
      <p class="text-xs text-slate-400">Coba ubah kata kunci pencarian atau pilih kategori yang lain.</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useArticlesStore } from '@/stores/articlesStore';

const articlesStore = useArticlesStore();

onMounted(() => {
  articlesStore.fetchArticles();
});

const searchQuery = computed({
  get: () => articlesStore.searchQuery,
  set: (val) => articlesStore.setSearch(val)
});

const filteredArticles = computed(() => articlesStore.filteredArticles);
</script>
