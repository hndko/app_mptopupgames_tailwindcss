<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 pb-16">
    <!-- Breadcrumb Navigation -->
    <nav class="flex items-center gap-2 text-xs text-slate-400" aria-label="Breadcrumb">
      <router-link to="/" class="hover:text-sky-400 flex items-center gap-1">
        <i class="fas fa-house text-[11px]"></i> <span>Beranda</span>
      </router-link>
      <i class="fas fa-chevron-right text-[10px] text-slate-600"></i>
      <span class="text-white font-medium">Ulasan &amp; Kepuasan Pelanggan</span>
    </nav>

    <!-- Header & Interactive Fast Action Banner -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
      <div class="max-w-2xl space-y-2 relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
          <i class="fas fa-star animate-pulse"></i> <span>Kepuasan Pelanggan Terverifikasi 99%</span>
        </div>
        <h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Apa Kata <span class="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">Para Gamer?</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Testimoni langsung dari para gamer yang menikmati kecepatan top up otomatis 1-3 detik dengan harga termurah se-Indonesia.
        </p>
      </div>

      <!-- Quick Fast Action Form / Search Box -->
      <div class="relative z-10 max-w-3xl bg-slate-950/80 border border-slate-700/80 rounded-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2 shadow-inner">
        <div class="relative flex-1 w-full">
          <i class="fas fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
          <input 
            type="search" 
            v-model="searchQuery" 
            placeholder="Cari ulasan berdasarkan nama gamer, judul game, atau komentar..." 
            class="w-full h-11 pl-9 pr-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-amber-500 transition-all font-mono"
          />
        </div>
        <button 
          type="button" 
          @click="modalOpen = true"
          class="w-full sm:w-auto h-11 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0 btn-press"
        >
          <i class="fas fa-pen-to-square text-xs"></i> <span>Tulis Ulasan Baru</span>
        </button>
      </div>
    </div>

    <!-- 3 KPI Status Metric Counters (Matching Lacak Standard) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl interactive-card">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Skor Rata-rata Kepuasan</span>
          <div class="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-400 flex items-center justify-center">
            <i class="fas fa-star text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-amber-400">{{ reviewsStore.averageRating }} / 5.0</p>
        <p class="text-[11px] text-amber-400 font-semibold">Berdasarkan {{ reviewsStore.totalReviews }} ulasan terverifikasi</p>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl interactive-card">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Tingkat Kepuasan Member</span>
          <div class="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center justify-center">
            <i class="fas fa-thumbs-up text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-emerald-400">{{ reviewsStore.satisfactionRate }}% Positif</p>
        <p class="text-[11px] text-emerald-400 font-semibold">Penilaian bintang 4 &amp; 5 sempurna</p>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl interactive-card">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Kecepatan Transaksi</span>
          <div class="w-8 h-8 rounded-xl bg-sky-950/60 border border-sky-800 text-sky-400 flex items-center justify-center">
            <i class="fas fa-bolt text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-white">1 - 3 Detik</p>
        <p class="text-[11px] text-sky-400 font-semibold">Otomasi server payment gateway</p>
      </div>
    </div>

    <!-- Scorecard & Rating Breakdown -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
      <!-- Overall Rating Big Box (5 cols) -->
      <div class="md:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-2xl">
        <p class="text-xs uppercase font-bold tracking-wider text-slate-400">Skor Rating Keseluruhan</p>
        <div class="flex items-center justify-center gap-2">
          <span class="text-5xl font-black text-white font-mono">{{ reviewsStore.averageRating }}</span>
          <span class="text-xl text-slate-500 font-bold">/ 5.0</span>
        </div>
        <div class="flex justify-center text-amber-400 text-lg gap-1">
          <i class="fas fa-star" v-for="i in 5" :key="i"></i>
        </div>
        <p class="text-xs text-slate-400">Terbuka secara transparan untuk semua pelanggan</p>
      </div>

      <!-- Rating Progress Breakdown (7 cols) -->
      <div class="md:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-3 shadow-2xl">
        <h3 class="text-sm font-bold text-white mb-2">Distribusi Penilaian Bintang</h3>
        
        <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center gap-3 text-xs">
          <span class="w-14 text-slate-300 font-bold flex items-center gap-1">
            <span>{{ star }}</span> <i class="fas fa-star text-amber-400 text-[10px]"></i>
          </span>
          <div class="flex-1 h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div 
              class="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
              :style="{ width: reviewsStore.starDistribution[star].pct + '%' }"
            ></div>
          </div>
          <span class="w-10 text-right text-slate-400 font-mono text-[11px]">
            {{ reviewsStore.starDistribution[star].pct }}%
          </span>
        </div>
      </div>
    </div>

    <!-- Filter Toolbar Section -->
    <div class="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
      <!-- Star Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
        <button
          type="button"
          @click="reviewsStore.setStarFilter(0)"
          :class="[
            reviewsStore.selectedStarFilter === 0 
              ? 'bg-sky-600 text-white shadow-md font-black' 
              : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700/80 font-bold'
          ]"
          class="h-10 px-4 rounded-xl text-xs whitespace-nowrap transition-all btn-press"
        >
          Semua Ulasan ({{ reviewsStore.totalReviews }})
        </button>

        <button
          type="button"
          v-for="star in [5, 4, 3, 2, 1]"
          :key="star"
          @click="reviewsStore.setStarFilter(star)"
          :class="[
            reviewsStore.selectedStarFilter === star 
              ? 'bg-amber-500 text-slate-950 shadow-md font-black' 
              : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700/80 font-bold'
          ]"
          class="h-10 px-4 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-1.5 btn-press"
        >
          <span>{{ star }} Bintang</span>
          <i class="fas fa-star text-amber-400 text-[10px]"></i>
        </button>
      </div>

      <span class="text-xs font-semibold text-slate-400 shrink-0">
        Menampilkan <strong class="text-amber-400">{{ finalFilteredReviews.length }}</strong> dari {{ reviewsStore.totalReviews }} ulasan
      </span>
    </div>

    <!-- Reviews Grid List -->
    <div v-if="finalFilteredReviews.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <div 
        v-for="review in finalFilteredReviews" 
        :key="review.id"
        class="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-colors"
      >
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <img :src="review.avatar" :alt="review.name" class="w-10 h-10 rounded-2xl object-cover border border-slate-700 bg-slate-950">
              <div>
                <strong class="text-sm font-bold text-white block">{{ review.name }}</strong>
                <span class="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <i class="fas fa-circle-check text-[10px]"></i> Pembeli Terverifikasi
                </span>
              </div>
            </div>
            <span class="text-[10px] text-slate-500 font-mono">{{ review.date }}</span>
          </div>

          <div class="flex items-center gap-2">
            <div class="flex text-amber-400 text-xs">
              <i class="fas fa-star" v-for="i in review.rating" :key="i"></i>
            </div>
            <span class="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] font-bold text-sky-400">
              {{ review.game }}
            </span>
          </div>

          <p class="text-xs text-slate-300 leading-relaxed">
            "{{ review.comment }}"
          </p>
        </div>

        <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span class="text-[10px] text-slate-500">Apakah testimoni ini membantu?</span>
          <button 
            type="button" 
            @click="reviewsStore.likeReview(review.id)" 
            class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <i class="far fa-thumbs-up text-sky-400"></i>
            <span class="font-mono text-[11px]">{{ review.likes }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-slate-900 border border-slate-800 rounded-3xl p-14 text-center shadow-2xl space-y-3">
      <div class="w-14 h-14 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto text-xl mb-3">
        <i class="fas fa-star"></i>
      </div>
      <h3 class="text-base font-bold text-white">Tidak Ada Ulasan yang Cocok</h3>
      <p class="text-xs text-slate-400">Coba ubah kata kunci pencarian atau pilih filter bintang yang lain.</p>
    </div>

    <!-- Help & Testimonial Callout Banner (Matching Lacak Standard) -->
    <div class="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
      <div class="space-y-1 text-center sm:text-left">
        <h3 class="text-base sm:text-lg font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
          <i class="fas fa-heart text-rose-400 text-xl"></i> Puas dengan Layanan MPTopUp?
        </h3>
        <p class="text-xs text-slate-400">Bagikan pengalaman top up Anda dan bantu gamer lainnya menemukan platform top up terpercaya.</p>
      </div>

      <button 
        type="button"
        @click="modalOpen = true"
        class="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0 btn-press"
      >
        <i class="fas fa-pen-to-square text-base"></i> <span>Tulis Ulasan Sekarang</span>
      </button>
    </div>

    <!-- Write Review Modal Dialog -->
    <Modal :isOpen="modalOpen" title="Tulis Ulasan Pelanggan" @close="modalOpen = false">
      <form @submit.prevent="submitReview" class="space-y-4">
        <div>
          <label for="reviewName" class="block text-xs font-semibold text-slate-300 mb-1">
            Nama Anda
          </label>
          <div class="relative">
            <i class="fas fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
            <input 
              type="text" 
              id="reviewName" 
              v-model="newReview.name" 
              required 
              placeholder="Contoh: Rian Maulana"
              class="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500"
            >
          </div>
        </div>

        <div>
          <label for="reviewGame" class="block text-xs font-semibold text-slate-300 mb-1">
            Game yang Dibeli
          </label>
          <div class="relative">
            <i class="fas fa-gamepad absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
            <select 
              id="reviewGame" 
              v-model="newReview.game" 
              class="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500 appearance-none"
            >
              <option value="Mobile Legends">Mobile Legends</option>
              <option value="Valorant">Valorant</option>
              <option value="Free Fire">Free Fire</option>
              <option value="PUBG Mobile">PUBG Mobile</option>
              <option value="Genshin Impact">Genshin Impact</option>
              <option value="Steam Wallet IDR">Steam Wallet IDR</option>
              <option value="Google Play IDR">Google Play IDR</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">
            Beri Rating
          </label>
          <div class="flex gap-2 text-2xl text-amber-400">
            <button 
              type="button" 
              v-for="star in 5" 
              :key="star" 
              @click="newReview.rating = star"
              class="focus:outline-none hover:scale-110 transition-transform"
            >
              <i :class="star <= newReview.rating ? 'fas fa-star' : 'far fa-star text-slate-600'"></i>
            </button>
          </div>
        </div>

        <div>
          <label for="reviewComment" class="block text-xs font-semibold text-slate-300 mb-1">
            Komentar &amp; Testimoni
          </label>
          <textarea 
            id="reviewComment" 
            v-model="newReview.comment" 
            rows="3" 
            required 
            placeholder="Bagikan pengalaman kecepatan dan kepuasan top up Anda..."
            class="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500 leading-relaxed resize-none"
          ></textarea>
        </div>

        <div class="flex gap-3 pt-2">
          <button 
            type="button" 
            @click="modalOpen = false" 
            class="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
          >
            Batal
          </button>
          <button 
            type="submit" 
            class="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 btn-press"
          >
            Terbitkan Ulasan
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useReviewsStore } from '@/stores/reviewsStore';
import Modal from '@/components/common/Modal.vue';

const reviewsStore = useReviewsStore();
const modalOpen = ref(false);
const searchQuery = ref('');

onMounted(() => {
  reviewsStore.fetchReviews();
});

const newReview = ref({
  name: '',
  game: 'Mobile Legends',
  rating: 5,
  comment: ''
});

const finalFilteredReviews = computed(() => {
  let list = reviewsStore.filteredReviews;
  if (!searchQuery.value.trim()) return list;
  const q = searchQuery.value.toLowerCase().trim();
  return list.filter(r => 
    r.name.toLowerCase().includes(q) ||
    r.game.toLowerCase().includes(q) ||
    r.comment.toLowerCase().includes(q)
  );
});

function submitReview() {
  reviewsStore.addReview(newReview.value);
  modalOpen.value = false;
  newReview.value = {
    name: '',
    game: 'Mobile Legends',
    rating: 5,
    comment: ''
  };
  alert('Terima kasih! Ulasan Anda berhasil diterbitkan.');
}
</script>
