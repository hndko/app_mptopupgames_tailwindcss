<template>
  <div class="max-w-4xl mx-auto space-y-8 pb-16">
    <!-- Breadcrumb Navigation -->
    <nav class="flex items-center gap-2 text-xs text-slate-400">
      <router-link to="/" class="hover:text-white transition-colors">Beranda</router-link>
      <i class="fas fa-chevron-right text-[10px] text-slate-600"></i>
      <router-link to="/artikel" class="hover:text-white transition-colors">Artikel</router-link>
      <i class="fas fa-chevron-right text-[10px] text-slate-600"></i>
      <span class="text-sky-400 truncate max-w-xs">{{ article.title }}</span>
    </nav>

    <!-- Main Article Card -->
    <article class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
      <!-- Article Header -->
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-2">
          <span class="px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 text-[10px] font-black uppercase">
            {{ article.category }}
          </span>
          <span class="text-xs text-slate-400 flex items-center gap-1.5">
            <i class="far fa-calendar text-slate-500"></i> {{ article.date }}
          </span>
          <span class="text-xs text-slate-400 flex items-center gap-1.5">
            <i class="far fa-clock text-slate-500"></i> {{ article.readTime }}
          </span>
          <span class="text-xs text-slate-400 flex items-center gap-1.5 ml-auto">
            <i class="fas fa-eye text-sky-400"></i> {{ article.views }} views
          </span>
        </div>

        <h1 class="text-xl sm:text-3xl font-black text-white leading-tight">
          {{ article.title }}
        </h1>

        <!-- Author Byline -->
        <div class="flex items-center gap-3 pt-2 border-t border-slate-800">
          <img src="/images/avatars/default-avatar.svg" alt="Author Avatar" class="w-9 h-9 rounded-xl border border-slate-700 bg-slate-950">
          <div>
            <p class="text-xs font-bold text-white">{{ article.author }}</p>
            <p class="text-[10px] text-slate-400">Editor &amp; Game Strategist MPTopUp</p>
          </div>
        </div>
      </div>

      <!-- Feature Banner Image -->
      <div class="rounded-2xl overflow-hidden border border-slate-800 aspect-[16/9] shadow-lg">
        <img :src="article.banner" :alt="article.title" class="w-full h-full object-cover">
      </div>

      <!-- Article Body Content (Rich Prose) -->
      <div class="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4" v-html="article.content"></div>

      <!-- Related Game Top Up CTA Box -->
      <div v-if="article.gameId" class="p-6 rounded-2xl bg-gradient-to-r from-sky-950/60 via-slate-900 to-sky-950/40 border border-sky-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
        <div class="flex items-center gap-4 text-center sm:text-left">
          <div class="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 text-2xl shrink-0">
            <i class="fas fa-bolt"></i>
          </div>
          <div>
            <h4 class="text-sm font-bold text-white">Butuh Diamond / Koin untuk Praktik?</h4>
            <p class="text-xs text-slate-400">Top up {{ article.gameTitle }} instan hitungan detik di MPTopUp.</p>
          </div>
        </div>
        <router-link :to="'/produk/' + article.gameId" class="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold whitespace-nowrap shadow-lg shadow-sky-600/30 flex items-center gap-2 btn-press shrink-0">
          <i class="fas fa-gamepad"></i>
          <span>Top Up Sekarang</span>
        </router-link>
      </div>

      <!-- Share Buttons & Back Link -->
      <div class="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <router-link to="/artikel" class="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-2">
          <i class="fas fa-arrow-left text-[10px]"></i>
          <span>Kembali ke Daftar Artikel</span>
        </router-link>

        <div class="flex items-center gap-2">
          <span class="text-xs text-slate-400 mr-1">Bagikan:</span>
          <button type="button" @click="shareLink" class="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-xs transition-colors" title="Salin Tautan">
            <i class="fas fa-link"></i>
          </button>
          <a :href="'https://api.whatsapp.com/send?text=' + encodeURIComponent(article.title + ' ' + currentUrl)" target="_blank" class="w-8 h-8 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-400 flex items-center justify-center text-xs transition-colors" title="Bagikan ke WhatsApp">
            <i class="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useArticlesStore } from '@/stores/articlesStore';

const route = useRoute();
const articlesStore = useArticlesStore();

const article = computed(() => {
  return articlesStore.getArticleBySlug(route.params.slug);
});

const currentUrl = computed(() => window.location.href);

onMounted(() => {
  if (route.params.slug) {
    articlesStore.incrementViews(route.params.slug);
  }
});

function shareLink() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href);
    alert('Tautan artikel berhasil disalin ke clipboard!');
  }
}
</script>
