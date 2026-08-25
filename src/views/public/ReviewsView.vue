<template>
  <div class="space-y-10 sm:space-y-14 pb-16">
    <!-- Header Hero Section -->
    <section class="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-10 text-center shadow-2xl">
      <div class="max-w-3xl mx-auto space-y-3">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black tracking-wider uppercase">
          <i class="fas fa-star"></i>
          <span>Ulasan &amp; Kepuasan Pelanggan</span>
        </div>
        <h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Apa Kata <span class="text-amber-400">Para Gamer?</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Ribuan gamer di seluruh Indonesia telah mempercayakan top up instan dan voucher game mereka di MPTopUp.
        </p>
      </div>
    </section>

    <!-- Scorecard & Rating Breakdown -->
    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
      <!-- Overall Rating Big Box (5 cols) -->
      <div class="md:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-2xl">
        <p class="text-xs uppercase font-bold tracking-wider text-slate-400">Skor Kepuasan Pelanggan</p>
        <div class="flex items-center justify-center gap-2">
          <span class="text-5xl font-black text-white font-mono">{{ reviewsStore.averageRating }}</span>
          <span class="text-xl text-slate-500 font-bold">/ 5.0</span>
        </div>
        <div class="flex justify-center text-amber-400 text-lg gap-1">
          <i class="fas fa-star" v-for="i in 5" :key="i"></i>
        </div>
        <p class="text-xs text-slate-400">Berdasarkan {{ reviewsStore.totalReviews }} ulasan terverifikasi</p>
        
        <div class="pt-2">
          <button 
            type="button" 
            @click="modalOpen = true"
            class="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-sky-600/30 btn-press"
          >
            <i class="fas fa-pen-to-square"></i>
            <span>Tulis Ulasan Anda</span>
          </button>
        </div>
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

    <!-- Star Filter Pills -->
    <div class="max-w-5xl mx-auto flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        type="button"
        @click="reviewsStore.setStarFilter(0)"
        :class="[reviewsStore.selectedStarFilter === 0 ? 'bg-sky-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800']"
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all btn-press whitespace-nowrap"
      >
        Semua Ulasan ({{ reviewsStore.totalReviews }})
      </button>

      <button
        type="button"
        v-for="star in [5, 4, 3, 2, 1]"
        :key="star"
        @click="reviewsStore.setStarFilter(star)"
        :class="[reviewsStore.selectedStarFilter === star ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800']"
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 btn-press whitespace-nowrap"
      >
        <span>{{ star }} Bintang</span>
        <i class="fas fa-star text-amber-400 text-[10px]"></i>
      </button>
    </div>

    <!-- Reviews Grid List -->
    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <div 
        v-for="review in reviewsStore.filteredReviews" 
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
          <span class="text-[10px] text-slate-500">Apakah ulasan ini membantu?</span>
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

    <!-- Write Review Modal Dialog -->
    <Modal :isOpen="modalOpen" title="Tulis Ulasan Anda" @close="modalOpen = false">
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
            Komentar &amp; Ulasan
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
            class="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-sky-600/30 btn-press"
          >
            Kirim Ulasan
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useReviewsStore } from '@/stores/reviewsStore';
import Modal from '@/components/common/Modal.vue';

const reviewsStore = useReviewsStore();
const modalOpen = ref(false);

onMounted(() => {
  reviewsStore.fetchReviews();
});

const newReview = ref({
  name: '',
  game: 'Mobile Legends',
  rating: 5,
  comment: ''
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
