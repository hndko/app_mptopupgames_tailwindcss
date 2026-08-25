<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-xs text-slate-400 mb-6" aria-label="Breadcrumb">
      <router-link to="/" class="hover:text-sky-400">Beranda</router-link>
      <i class="fas fa-chevron-right text-[10px]"></i>
      <span class="text-white font-medium">{{ activeGame.title }}</span>
    </nav>

    <form @submit.prevent="handleCheckout" class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
      <!-- Left Column: Game Info & Banner -->
      <div class="space-y-6 lg:sticky lg:top-24">
        <!-- Game Profile Card -->
        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div class="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
            <img :src="activeGame.banner" :alt="activeGame.title" class="w-full h-full object-cover">
          </div>

          <div>
            <span class="px-2.5 py-0.5 rounded-full bg-sky-950 text-sky-400 border border-sky-800 text-[10px] font-bold uppercase tracking-wider">
              {{ activeGame.category }} Game
            </span>
            <h1 class="text-xl sm:text-2xl font-extrabold text-white mt-1">{{ activeGame.title }}</h1>
            <p class="text-xs text-slate-400 font-semibold mt-0.5">{{ activeGame.developer }} &bull; Pengiriman Otomatis</p>
          </div>

          <p class="text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-3">
            {{ activeGame.description }}
          </p>

          <div class="p-3.5 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2 text-xs text-slate-300">
            <div class="flex items-center gap-2 font-bold text-white">
              <i class="fas fa-bolt text-sky-400"></i> Informasi Transaksi
            </div>
            <ul class="space-y-1 text-[11px] text-slate-400 list-disc list-inside">
              <li>Item otomatis masuk dalam hitungan detik.</li>
              <li>Pastikan User ID dan Server ID sudah benar.</li>
              <li>Layanan transaksi aktif 24 jam nonstop.</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Right Column: 5 Steps Form -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Step 1: Input Akun Game -->
        <section class="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div class="flex items-center justify-between border-b border-slate-800 pb-3">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-bold flex items-center justify-center">1</span>
              <h2 class="text-sm sm:text-base font-bold text-white uppercase tracking-wider">Lengkapi Data Akun</h2>
            </div>
            <button type="button" @click="idGuideOpen = true" class="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1">
              <i class="fas fa-circle-info text-xs"></i> <span>Petunjuk ID</span>
            </button>
          </div>

          <div :class="[activeGame.hasZoneId ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1', 'grid gap-4']">
            <div :class="[activeGame.hasZoneId ? 'sm:col-span-2' : '']">
              <label for="userIdInput" class="block text-xs font-semibold text-slate-300 mb-1">
                User ID Akun <span class="text-rose-400">*</span>
              </label>
              <div class="relative">
                <i class="fas fa-user-tag absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none"></i>
                <input 
                  type="text" 
                  id="userIdInput" 
                  v-model="userId" 
                  required 
                  placeholder="Masukkan User ID Akun"
                  class="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-sky-500 transition-all font-mono"
                >
              </div>
            </div>

            <div v-if="activeGame.hasZoneId">
              <label for="zoneIdInput" class="block text-xs font-semibold text-slate-300 mb-1">
                Zone / Server ID <span class="text-rose-400">*</span>
              </label>
              <div class="relative">
                <i class="fas fa-server absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none"></i>
                <input 
                  type="text" 
                  id="zoneIdInput" 
                  v-model="zoneId" 
                  required 
                  placeholder="(1234)"
                  class="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-sky-500 transition-all font-mono text-center"
                >
              </div>
            </div>
          </div>
        </section>

        <!-- Step 2: Pilih Nominal Produk -->
        <section class="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div class="flex items-center gap-2 border-b border-slate-800 pb-3">
            <span class="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-bold flex items-center justify-center">2</span>
            <h2 class="text-sm sm:text-base font-bold text-white uppercase tracking-wider">Pilih Nominal Top Up</h2>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button 
              type="button" 
              v-for="prod in (activeGame.products || [])" 
              :key="prod.id"
              @click="selectedProduct = prod"
              :class="[
                selectedProduct && selectedProduct.id === prod.id 
                  ? 'border-sky-500 bg-sky-950/30 text-white ring-2 ring-sky-500/50' 
                  : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800 hover:border-slate-700 text-slate-200',
                'p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all relative'
              ]"
            >
              <div>
                <span v-if="prod.bonus" class="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[9px] font-bold">
                  {{ prod.bonus }}
                </span>
                <p class="font-bold text-xs sm:text-sm text-white line-clamp-2 pr-1">{{ prod.name }}</p>
              </div>
              <p class="text-xs sm:text-sm font-extrabold text-sky-400 mt-2">
                Rp {{ prod.price.toLocaleString('id-ID') }}
              </p>
            </button>
          </div>
        </section>

        <!-- Step 3: Pilih Metode Pembayaran -->
        <section class="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div class="flex items-center gap-2 border-b border-slate-800 pb-3">
            <span class="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-bold flex items-center justify-center">3</span>
            <h2 class="text-sm sm:text-base font-bold text-white uppercase tracking-wider">Pilih Metode Pembayaran</h2>
          </div>

          <div class="space-y-4">
            <div v-for="(group, gIdx) in gamesStore.paymentChannels" :key="gIdx" class="space-y-2">
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider">{{ group.group }}</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button 
                  type="button" 
                  v-for="method in group.methods" 
                  :key="method.id"
                  @click="selectedPayment = method"
                  :class="[
                    selectedPayment && selectedPayment.id === method.id 
                      ? 'border-sky-500 bg-sky-950/30 ring-2 ring-sky-500/50' 
                      : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800 hover:border-slate-700',
                    'p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all'
                  ]"
                >
                  <div class="flex items-center gap-3">
                    <img :src="method.logo" :alt="method.name" class="h-6 w-auto rounded bg-white px-1 py-0.5 object-contain">
                    <div>
                      <p class="text-xs font-bold text-white">{{ method.name }}</p>
                      <span class="text-[10px] text-emerald-400 font-semibold">{{ method.badge }}</span>
                    </div>
                  </div>

                  <div class="text-right">
                    <p class="text-xs font-extrabold text-sky-400">
                      Rp {{ calculateMethodTotal(method.fee).toLocaleString('id-ID') }}
                    </p>
                    <span class="text-[10px] text-slate-500">Biaya: Rp {{ method.fee.toLocaleString('id-ID') }}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Step 4: Kontak WhatsApp & Promo -->
        <section class="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div class="flex items-center gap-2 border-b border-slate-800 pb-3">
            <span class="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-bold flex items-center justify-center">4</span>
            <h2 class="text-sm sm:text-base font-bold text-white uppercase tracking-wider">Kontak &amp; Kupon Promo</h2>
          </div>

          <div class="space-y-4">
            <div>
              <label for="waInput" class="block text-xs font-semibold text-slate-300 mb-1">
                Nomor WhatsApp Pelanggan <span class="text-rose-400">*</span>
              </label>
              <div class="relative">
                <i class="fab fa-whatsapp absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 text-sm pointer-events-none"></i>
                <input 
                  type="tel" 
                  id="waInput" 
                  v-model="whatsapp" 
                  required 
                  placeholder="081234567890 (Untuk bukti &amp; invoice transaksi)"
                  class="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm focus:ring-2 focus:ring-sky-500"
                >
              </div>
            </div>

            <div>
              <label for="promoInput" class="block text-xs font-semibold text-slate-300 mb-1">
                Kode Kupon Promo (Opsional)
              </label>
              <div class="flex gap-2">
                <div class="relative flex-1">
                  <i class="fas fa-tag absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none"></i>
                  <input 
                    type="text" 
                    id="promoInput" 
                    v-model="promoCode" 
                    placeholder="Kode Promo (NEWUSER20)"
                    class="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-sm uppercase font-mono focus:ring-2 focus:ring-sky-500"
                  >
                </div>
                <button 
                  type="button" 
                  @click="applyPromo"
                  class="px-4 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-sky-400 flex items-center gap-1.5 transition-colors"
                >
                  <i class="fas fa-check text-xs"></i> <span>Pakai</span>
                </button>
              </div>
              <p v-if="promoFeedback" :class="[promoFeedback.valid ? 'text-emerald-400' : 'text-rose-400', 'text-[11px] mt-1.5 font-medium']">
                {{ promoFeedback.message }}
              </p>
            </div>
          </div>
        </section>

        <!-- Step 5: Ringkasan Tagihan & Tombol Checkout Desktop -->
        <section class="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-sky-600 text-white text-xs font-bold flex items-center justify-center">5</span>
            <h2 class="text-sm sm:text-base font-bold text-white uppercase tracking-wider">Ringkasan Tagihan</h2>
          </div>

          <div class="bg-slate-800/60 rounded-2xl p-4 sm:p-5 border border-slate-700/80 space-y-2.5 text-xs sm:text-sm">
            <div class="flex justify-between items-center text-slate-400">
              <span>Game Terpilih</span>
              <span class="font-bold text-white">{{ activeGame.title }}</span>
            </div>
            <div class="flex justify-between items-center text-slate-400">
              <span>User ID Akun</span>
              <span class="font-bold text-white font-mono">{{ userId ? (userId + (zoneId ? ` (${zoneId})` : '')) : '-' }}</span>
            </div>
            <div class="flex justify-between items-center text-slate-400">
              <span>Item Nominal</span>
              <span class="font-bold text-white">{{ selectedProduct ? selectedProduct.name : '-' }}</span>
            </div>
            <div class="flex justify-between items-center text-slate-400">
              <span>Metode Pembayaran</span>
              <span class="font-bold text-white">{{ selectedPayment ? selectedPayment.name : '-' }}</span>
            </div>
            <div v-if="appliedDiscount > 0" class="flex justify-between items-center text-emerald-400 font-semibold">
              <span>Potongan Diskon Kupon</span>
              <span>-Rp {{ appliedDiscount.toLocaleString('id-ID') }}</span>
            </div>
            <div class="pt-3 border-t border-slate-700 flex justify-between items-center">
              <span class="text-sm sm:text-base font-bold text-white">Total Tagihan</span>
              <span class="text-lg sm:text-xl font-extrabold text-sky-400">Rp {{ finalTotal.toLocaleString('id-ID') }}</span>
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="!isFormValid"
            class="hidden lg:flex w-full min-h-[50px] rounded-2xl bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold text-base items-center justify-center gap-2 shadow-xl shadow-sky-600/20 transition-all"
          >
            <i class="fas fa-bolt text-sm"></i> <span>Beli Sekarang &bull; Bayar Instan</span>
          </button>
        </section>
      </div>
    </form>

    <!-- Mobile Sticky Checkout Bottom Bar -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur border-t border-slate-800 p-4 shadow-2xl">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div>
          <p class="text-[10px] text-slate-400 uppercase font-semibold">Total Tagihan</p>
          <p class="text-base font-extrabold text-sky-400">Rp {{ finalTotal.toLocaleString('id-ID') }}</p>
        </div>
        <button 
          type="button" 
          @click="handleCheckout"
          :disabled="!isFormValid"
          class="flex-1 min-h-[44px] rounded-xl bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-sky-600/20 transition-all"
        >
          <i class="fas fa-bolt text-xs"></i> <span>Beli Sekarang</span>
        </button>
      </div>
    </div>

    <!-- ID Guide Modal Component -->
    <Modal :is-open="idGuideOpen" title="Petunjuk Cek User ID & Server" icon="fas fa-circle-info" @close="idGuideOpen = false">
      <div class="space-y-4">
        <div class="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
          <img src="/images/games/id-guide.svg" alt="ID Guide" class="w-full h-auto">
        </div>
        <ol class="text-xs text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
          <li>Buka game di perangkat Anda dan klik foto profil di pojok kiri atas.</li>
          <li>Perhatikan deretan angka di bawah nickname profil Anda.</li>
          <li>Nomor utama adalah <strong>User ID</strong>, dan 4 digit di dalam tanda kurung adalah <strong>Zone/Server ID</strong>.</li>
        </ol>
      </div>
      <template #footer>
        <button type="button" @click="idGuideOpen = false" class="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2">
          <i class="fas fa-check text-xs"></i> <span>Saya Mengerti</span>
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGamesStore } from '@/stores/gamesStore';
import { useOrdersStore } from '@/stores/ordersStore';
import { usePromoStore } from '@/stores/promoStore';
import Modal from '@/components/common/Modal.vue';

const route = useRoute();
const router = useRouter();
const gamesStore = useGamesStore();
const ordersStore = useOrdersStore();
const promoStore = usePromoStore();

const activeGame = computed(() => {
  const gameQuery = route.query.game || route.params.id;
  if (gameQuery) {
    const found = gamesStore.games.find(g => g.id === gameQuery);
    if (found) return found;
  }
  return gamesStore.games[0];
});

const userId = ref('');
const zoneId = ref('');
const whatsapp = ref('');
const selectedProduct = ref(null);
const selectedPayment = ref(null);
const promoCode = ref('');
const appliedDiscount = ref(0);
const promoFeedback = ref(null);
const idGuideOpen = ref(false);

// Default selection on load
watch(activeGame, (newG) => {
  if (newG && newG.products && newG.products.length > 0) {
    selectedProduct.value = newG.products[0];
  }
}, { immediate: true });

function calculateMethodTotal(fee) {
  const prodPrice = selectedProduct.value ? selectedProduct.value.price : 0;
  return Math.max(0, prodPrice + fee - appliedDiscount.value);
}

const finalTotal = computed(() => {
  const basePrice = selectedProduct.value ? selectedProduct.value.price : 0;
  const paymentFee = selectedPayment.value ? selectedPayment.value.fee : 0;
  return Math.max(0, basePrice + paymentFee - appliedDiscount.value);
});

const isFormValid = computed(() => {
  return userId.value.trim() !== '' && 
         (!activeGame.value.hasZoneId || zoneId.value.trim() !== '') && 
         selectedProduct.value !== null && 
         selectedPayment.value !== null && 
         whatsapp.value.trim() !== '';
});

function applyPromo() {
  const basePrice = selectedProduct.value ? selectedProduct.value.price : 0;
  const res = promoStore.validatePromoCode(promoCode.value, basePrice);
  promoFeedback.value = res;
  if (res.valid) {
    appliedDiscount.value = res.discount;
  } else {
    appliedDiscount.value = 0;
  }
}

function handleCheckout() {
  if (!isFormValid.value) return;

  const newOrder = ordersStore.createOrder({
    game: { title: activeGame.value.title },
    product: { name: selectedProduct.value.name },
    userId: userId.value.trim(),
    zoneId: zoneId.value.trim(),
    payment: { name: selectedPayment.value.name },
    whatsapp: whatsapp.value.trim(),
    total: finalTotal.value
  });

  router.push(`/konfirmasi?id=${encodeURIComponent(newOrder.id)}`);
}
</script>
