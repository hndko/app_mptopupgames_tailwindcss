<template>
  <div>
    <!-- Hero Slider Section -->
    <section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-4">
      <div class="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div class="relative w-full aspect-[16/7] sm:aspect-[21/9] min-h-[220px]">
          <!-- Carousel Slides Container -->
          <div 
            class="flex transition-transform duration-700 ease-in-out h-full w-full"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div 
              v-for="slide in gamesStore.heroSlides" 
              :key="slide.id"
              class="min-w-full h-full relative flex items-center justify-center overflow-hidden bg-slate-950"
            >
              <img :src="slide.banner" :alt="slide.title" class="w-full h-full object-cover">
              <router-link :to="`/produk?game=${slide.gameId}`" class="absolute inset-0 z-10" :aria-label="slide.title"></router-link>
            </div>
          </div>

          <!-- Slide Controls -->
          <button 
            type="button" 
            @click="prevSlide" 
            aria-label="Slide Sebelumnya"
            class="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-slate-700/80 text-white flex items-center justify-center backdrop-blur transition-all z-20"
          >
            <i class="fas fa-chevron-left text-sm sm:text-base"></i>
          </button>
          <button 
            type="button" 
            @click="nextSlide" 
            aria-label="Slide Selanjutnya"
            class="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/70 hover:bg-slate-900 border border-slate-700/80 text-white flex items-center justify-center backdrop-blur transition-all z-20"
          >
            <i class="fas fa-chevron-right text-sm sm:text-base"></i>
          </button>

          <!-- Indicators / Dots -->
          <div class="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
            <button 
              v-for="(_, idx) in gamesStore.heroSlides" 
              :key="idx"
              type="button" 
              @click="goToSlide(idx)"
              :class="[idx === currentSlide ? 'w-8 bg-sky-400' : 'w-3 bg-slate-600 hover:bg-slate-500', 'h-3 rounded-full transition-all']" 
              :aria-label="'Slide ' + (idx + 1)"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Bar & Instant Filter Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row items-center gap-4">
        <!-- Search Input -->
        <div class="relative flex-1 w-full">
          <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
          <input 
            type="search" 
            v-model="gamesStore.searchQuery" 
            placeholder="Cari game favoritmu (Mobile Legends, Valorant, Free Fire, Genshin...)"
            class="w-full h-12 pl-11 pr-4 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-400 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
          >
        </div>

        <!-- Category Pill Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          <button 
            type="button" 
            @click="gamesStore.selectedCategory = 'ALL'"
            :class="[gamesStore.selectedCategory === 'ALL' ? 'bg-sky-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300', 'px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap border border-slate-700/80 transition-all flex items-center gap-1.5']"
          >
            <i class="fas fa-grip text-xs"></i> <span>Semua Game</span>
          </button>
          <button 
            type="button" 
            @click="gamesStore.selectedCategory = 'POPULAR'"
            :class="[gamesStore.selectedCategory === 'POPULAR' ? 'bg-sky-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300', 'px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap border border-slate-700/80 transition-all flex items-center gap-1.5']"
          >
            <i class="fas fa-fire text-amber-400 text-xs"></i> <span>Populer</span>
          </button>
          <button 
            type="button" 
            @click="gamesStore.selectedCategory = 'Mobile'"
            :class="[gamesStore.selectedCategory === 'Mobile' ? 'bg-sky-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300', 'px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap border border-slate-700/80 transition-all flex items-center gap-1.5']"
          >
            <i class="fas fa-mobile-screen text-sky-400 text-xs"></i> <span>Mobile</span>
          </button>
          <button 
            type="button" 
            @click="gamesStore.selectedCategory = 'PC'"
            :class="[gamesStore.selectedCategory === 'PC' ? 'bg-sky-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300', 'px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap border border-slate-700/80 transition-all flex items-center gap-1.5']"
          >
            <i class="fas fa-desktop text-emerald-400 text-xs"></i> <span>PC Game</span>
          </button>
          <button 
            type="button" 
            @click="gamesStore.selectedCategory = 'Voucher'"
            :class="[gamesStore.selectedCategory === 'Voucher' ? 'bg-sky-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300', 'px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap border border-slate-700/80 transition-all flex items-center gap-1.5']"
          >
            <i class="fas fa-ticket text-purple-400 text-xs"></i> <span>Voucher</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Flash Sale & Hot Deals Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900 border border-rose-900/40 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6">
        <!-- Header with Live Countdown -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-5">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-2xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400 text-lg shadow-lg">
              <i class="fas fa-bolt"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-xl sm:text-2xl font-extrabold text-white">Flash Sale Hari Ini</h2>
                <span class="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider animate-pulse">
                  Diskon Gila
                </span>
              </div>
              <p class="text-xs text-slate-400">Harga termurah untuk nominal pilihan terbatas hari ini.</p>
            </div>
          </div>

          <!-- Live Countdown Timer -->
          <div class="flex items-center gap-2 bg-slate-950/90 border border-slate-800 px-4 py-2 rounded-2xl">
            <span class="text-xs text-slate-400 font-semibold mr-1">Berakhir dalam:</span>
            <div class="flex items-center gap-1.5 text-xs font-mono font-black text-white">
              <span class="px-2 py-1 rounded-lg bg-rose-600/80">{{ hours }}</span> :
              <span class="px-2 py-1 rounded-lg bg-rose-600/80">{{ mins }}</span> :
              <span class="px-2 py-1 rounded-lg bg-rose-600/80">{{ secs }}</span>
            </div>
          </div>
        </div>

        <!-- Flash Sale Grid Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <router-link 
            v-for="deal in gamesStore.flashSales" 
            :key="deal.id"
            :to="`/produk?game=${deal.gameId}`"
            class="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700/80 hover:border-rose-500/50 rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div class="relative rounded-xl overflow-hidden mb-3 aspect-[16/9] bg-slate-900 border border-slate-700/50">
                <img :src="deal.banner" :alt="deal.gameTitle" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                <span class="absolute top-2 right-2 bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow">
                  -{{ deal.discount }}
                </span>
              </div>
              <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{{ deal.gameTitle }}</p>
              <h3 class="text-sm font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-1">
                {{ deal.item }}
              </h3>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-700/60 flex items-end justify-between">
              <div>
                <span class="text-[11px] text-slate-500 line-through block">Rp {{ deal.originalPrice.toLocaleString('id-ID') }}</span>
                <span class="text-sm sm:text-base font-extrabold text-rose-400">Rp {{ deal.salePrice.toLocaleString('id-ID') }}</span>
              </div>
              <span class="px-3 py-1.5 rounded-xl bg-rose-600/20 text-rose-400 text-xs font-bold flex items-center gap-1 group-hover:bg-rose-600 group-hover:text-white transition-all">
                <span>Beli</span> <i class="fas fa-chevron-right text-[10px]"></i>
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Main Game Catalog Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl sm:text-2xl font-extrabold text-white">Daftar Game &amp; Voucher Digital</h2>
          <p class="text-xs sm:text-sm text-slate-400 mt-0.5">Pilih game favoritmu dan top up diamond/kristal dalam hitungan detik.</p>
        </div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
        <router-link 
          v-for="game in gamesStore.filteredGames" 
          :key="game.id"
          :to="`/produk?game=${game.id}`"
          class="group relative bg-slate-900 border border-slate-800 hover:border-sky-500 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div class="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden mb-3 bg-slate-950 border border-slate-800">
              <img :src="game.banner" :alt="game.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
              <span v-if="game.isPopular" class="absolute top-2 left-2 bg-amber-500 text-slate-950 font-black text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Populer
              </span>
            </div>
            <h3 class="font-bold text-white text-xs sm:text-sm group-hover:text-sky-400 transition-colors line-clamp-1">
              {{ game.title }}
            </h3>
            <p class="text-[11px] text-slate-400">{{ game.developer }}</p>
          </div>

          <div class="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span class="text-slate-400 font-medium">{{ game.category }}</span>
            <span class="text-sky-400 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
              <span>Top Up</span> <i class="fas fa-arrow-right text-[10px]"></i>
            </span>
          </div>
        </router-link>
      </div>

      <div v-if="gamesStore.filteredGames.length === 0" class="py-12 text-center text-slate-400 bg-slate-900 border border-slate-800 rounded-3xl p-8">
        <i class="fas fa-inbox text-4xl text-slate-600 mb-3 block"></i>
        <p class="font-bold text-sm text-white">Game tidak ditemukan</p>
        <p class="text-xs text-slate-400 mt-1">Coba gunakan kata kunci lain pada kolom pencarian di atas.</p>
      </div>
    </section>

    <!-- Why Choose MPTopUp Highlights -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div class="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-3xl flex items-start gap-4">
          <div class="w-12 h-12 rounded-2xl bg-sky-950 border border-sky-800/60 flex items-center justify-center text-sky-400 text-lg shrink-0">
            <i class="fas fa-bolt"></i>
          </div>
          <div>
            <h3 class="text-sm font-bold text-white mb-1">Proses Instan &bull; 1-3 Detik</h3>
            <p class="text-xs text-slate-400 leading-relaxed">Sistem otomatis kami memproses transaksi 24 jam tanpa jeda begitu pembayaran terverifikasi.</p>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-3xl flex items-start gap-4">
          <div class="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400 text-lg shrink-0">
            <i class="fas fa-headset"></i>
          </div>
          <div>
            <h3 class="text-sm font-bold text-white mb-1">CS Siap Membantu 24/7</h3>
            <p class="text-xs text-slate-400 leading-relaxed">Customer Service kami siap membantu kendala akun atau invoice Anda kapan saja melalui WhatsApp.</p>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-3xl flex items-start gap-4">
          <div class="w-12 h-12 rounded-2xl bg-purple-950 border border-purple-800/60 flex items-center justify-center text-purple-400 text-lg shrink-0">
            <i class="fas fa-wallet"></i>
          </div>
          <div>
            <h3 class="text-sm font-bold text-white mb-1">Saluran Pembayaran Lengkap</h3>
            <p class="text-xs text-slate-400 leading-relaxed">Dukungan scan QRIS otomatis, E-Wallet (GoPay, DANA, OVO), dan Virtual Account Bank BCA/Mandiri.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Accordion Section -->
    <section id="faq" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center max-w-xl mx-auto mb-8">
        <div class="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">Pertanyaan Umum</div>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">Jawaban cepat seputar transaksi dan layanan MPTopUp.</p>
      </div>

      <div class="space-y-3">
        <div 
          v-for="(faq, idx) in faqs" 
          :key="idx"
          class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
        >
          <button 
            type="button" 
            @click="activeFaq = activeFaq === idx ? null : idx"
            class="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-white flex items-center justify-between gap-4"
          >
            <span>{{ faq.q }}</span>
            <i :class="[activeFaq === idx ? 'rotate-180 text-sky-400' : 'text-slate-400', 'fas fa-chevron-down transition-transform text-xs']"></i>
          </button>
          <div v-if="activeFaq === idx" class="px-4 sm:px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
            {{ faq.a }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useGamesStore } from '@/stores/gamesStore';

const gamesStore = useGamesStore();
const currentSlide = ref(0);
let slideTimer = null;

// Countdown Timer
const hours = ref('05');
const mins = ref('42');
const secs = ref('19');
let countdownInterval = null;

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % gamesStore.heroSlides.length;
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + gamesStore.heroSlides.length) % gamesStore.heroSlides.length;
}

function goToSlide(idx) {
  currentSlide.value = idx;
}

const activeFaq = ref(0);
const faqs = [
  { q: "Berapa lama proses diamond/item masuk ke akun game saya?", a: "Transaksi diproses secara otomatis oleh sistem kami dalam waktu 1-3 detik setelah pembayaran berhasil terverifikasi." },
  { q: "Bagaimana cara mengecek status invoice pesanan saya?", a: "Anda dapat mengecek status pesanan melalui menu Lacak Pesanan dengan memasukkan nomor pesanan (contoh: #MP884912) atau ID game Anda." },
  { q: "Metode pembayaran apa saja yang didukung?", a: "Kami mendukung pembayaran melalui QRIS (Semua E-Wallet), GoPay, DANA, OVO, serta Virtual Account Bank BCA dan Mandiri." },
  { q: "Apakah top up di MPTopUp aman dan legal?", a: "100% aman dan legal. Seluruh produk diamond dan voucher diambil langsung dari distributor dan publisher game resmi." }
];

onMounted(() => {
  slideTimer = setInterval(nextSlide, 5000);

  let totalSeconds = 5 * 3600 + 42 * 60 + 19;
  countdownInterval = setInterval(() => {
    if (totalSeconds <= 0) totalSeconds = 24 * 3600;
    totalSeconds--;
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    hours.value = String(h).padStart(2, '0');
    mins.value = String(m).padStart(2, '0');
    secs.value = String(s).padStart(2, '0');
  }, 1000);
});

onUnmounted(() => {
  if (slideTimer) clearInterval(slideTimer);
  if (countdownInterval) clearInterval(countdownInterval);
});
</script>
