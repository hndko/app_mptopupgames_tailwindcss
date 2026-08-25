<template>
  <div class="space-y-10 sm:space-y-14 pb-12">
    <!-- Live Transaction Activity Ticker Bar -->
    <div class="bg-slate-900/90 border-b border-slate-800/80 py-2.5 px-4 overflow-hidden backdrop-blur-md">
      <div class="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">
        <div class="flex items-center gap-2 shrink-0">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-bold text-slate-300 flex items-center gap-1">
            <i class="fas fa-bolt text-amber-400 text-[11px]"></i> Transaksi Real-Time:
          </span>
        </div>

        <div class="overflow-hidden whitespace-nowrap flex-1">
          <div class="inline-flex items-center gap-6 animate-marquee text-slate-400 text-[11px]">
            <span v-for="(tx, idx) in recentTransactions" :key="idx" class="inline-flex items-center gap-2">
              <strong class="text-sky-400">{{ tx.user }}</strong>
              <span>berhasil top up</span>
              <strong class="text-white">{{ tx.item }}</strong>
              <span class="text-slate-500">({{ tx.time }})</span>
              <span class="text-slate-700">&bull;</span>
            </span>
          </div>
        </div>

        <router-link to="/riwayat" class="hidden sm:flex items-center gap-1 text-sky-400 hover:text-sky-300 font-semibold shrink-0 text-[11px]">
          <span>Lacak Pesanan</span> <i class="fas fa-arrow-right text-[10px]"></i>
        </router-link>
      </div>
    </div>

    <!-- Hero Carousel & Quick Jump Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
      <div class="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div class="relative w-full aspect-[16/8] sm:aspect-[21/9] min-h-[240px]">
          <!-- Carousel Slides -->
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

          <!-- Controls -->
          <button 
            type="button" 
            @click="prevSlide" 
            aria-label="Slide Sebelumnya"
            class="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-950/75 hover:bg-sky-600 border border-slate-700/80 hover:border-sky-500 text-white flex items-center justify-center backdrop-blur transition-all z-20 shadow-lg"
          >
            <i class="fas fa-chevron-left text-sm sm:text-base"></i>
          </button>
          <button 
            type="button" 
            @click="nextSlide" 
            aria-label="Slide Selanjutnya"
            class="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-950/75 hover:bg-sky-600 border border-slate-700/80 hover:border-sky-500 text-white flex items-center justify-center backdrop-blur transition-all z-20 shadow-lg"
          >
            <i class="fas fa-chevron-right text-sm sm:text-base"></i>
          </button>

          <!-- Dots Indicator -->
          <div class="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800">
            <button 
              v-for="(_, idx) in gamesStore.heroSlides" 
              :key="idx"
              type="button" 
              @click="goToSlide(idx)"
              :class="[idx === currentSlide ? 'w-7 bg-sky-400' : 'w-2.5 bg-slate-600 hover:bg-slate-500', 'h-2.5 rounded-full transition-all']" 
              :aria-label="'Slide ' + (idx + 1)"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Search & Category Filter Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
        <div class="flex flex-col md:flex-row items-center gap-4">
          <!-- Search Bar -->
          <div class="relative flex-1 w-full">
            <i class="fas fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none"></i>
            <input 
              type="search" 
              v-model="gamesStore.searchQuery" 
              placeholder="Cari game favoritmu (Mobile Legends, Valorant, Free Fire, Genshin...)"
              class="w-full h-12 pl-11 pr-10 rounded-2xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 transition-all"
            >
            <button 
              v-if="gamesStore.searchQuery" 
              type="button" 
              @click="gamesStore.searchQuery = ''"
              class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs p-1"
              title="Hapus pencarian"
            >
              <i class="fas fa-times-circle"></i>
            </button>
          </div>

          <!-- Category Pills Filter -->
          <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <button 
              type="button" 
              @click="gamesStore.selectedCategory = 'ALL'"
              :class="[gamesStore.selectedCategory === 'ALL' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-300', 'px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap border border-slate-700/80 transition-all flex items-center gap-1.5']"
            >
              <i class="fas fa-grip text-xs"></i> <span>Semua Game</span>
              <span class="px-1.5 py-0.5 rounded-full bg-slate-950/40 text-[10px]">{{ gamesStore.games.length }}</span>
            </button>

            <button 
              type="button" 
              @click="gamesStore.selectedCategory = 'POPULAR'"
              :class="[gamesStore.selectedCategory === 'POPULAR' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-300', 'px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap border border-slate-700/80 transition-all flex items-center gap-1.5']"
            >
              <i class="fas fa-fire text-amber-400 text-xs"></i> <span>Populer</span>
              <span class="px-1.5 py-0.5 rounded-full bg-slate-950/40 text-[10px]">{{ gamesStore.popularGames.length }}</span>
            </button>

            <button 
              type="button" 
              @click="gamesStore.selectedCategory = 'Mobile'"
              :class="[gamesStore.selectedCategory === 'Mobile' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-300', 'px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap border border-slate-700/80 transition-all flex items-center gap-1.5']"
            >
              <i class="fas fa-mobile-screen text-sky-400 text-xs"></i> <span>Mobile</span>
            </button>

            <button 
              type="button" 
              @click="gamesStore.selectedCategory = 'PC'"
              :class="[gamesStore.selectedCategory === 'PC' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-300', 'px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap border border-slate-700/80 transition-all flex items-center gap-1.5']"
            >
              <i class="fas fa-desktop text-emerald-400 text-xs"></i> <span>PC Game</span>
            </button>

            <button 
              type="button" 
              @click="gamesStore.selectedCategory = 'Voucher'"
              :class="[gamesStore.selectedCategory === 'Voucher' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' : 'bg-slate-800 hover:bg-slate-700 text-slate-300', 'px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap border border-slate-700/80 transition-all flex items-center gap-1.5']"
            >
              <i class="fas fa-ticket text-purple-400 text-xs"></i> <span>Voucher</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Flash Sale & Hot Deals Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900 border border-rose-900/40 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6">
        <!-- Header with Live Countdown Timer -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800/80 pb-5">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400 text-xl shadow-lg shadow-rose-600/10">
              <i class="fas fa-bolt"></i>
            </div>
            <div>
              <div class="flex items-center gap-2.5">
                <h2 class="text-xl sm:text-2xl font-black text-white">Flash Sale Hari Ini</h2>
                <span class="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black uppercase tracking-wider animate-pulse shadow">
                  Diskon Terbatas
                </span>
              </div>
              <p class="text-xs text-slate-400 mt-0.5">Penawaran harga termurah untuk nominal pilihan hari ini.</p>
            </div>
          </div>

          <!-- Live Countdown Timer Component -->
          <div class="flex items-center gap-2.5 bg-slate-950/90 border border-slate-800 px-4 py-2.5 rounded-2xl shadow-inner">
            <span class="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
              <i class="fas fa-clock text-rose-400"></i> Berakhir dalam:
            </span>
            <div class="flex items-center gap-1.5 text-xs font-mono font-black text-white">
              <span class="px-2 py-1 rounded-lg bg-rose-600/90 shadow">{{ hours }}</span> :
              <span class="px-2 py-1 rounded-lg bg-rose-600/90 shadow">{{ mins }}</span> :
              <span class="px-2 py-1 rounded-lg bg-rose-600/90 shadow">{{ secs }}</span>
            </div>
          </div>
        </div>

        <!-- Flash Sale Grid Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <router-link 
            v-for="deal in gamesStore.flashSales" 
            :key="deal.id"
            :to="`/produk?game=${deal.gameId}`"
            class="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700/80 hover:border-rose-500/60 rounded-3xl p-4 sm:p-5 transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-rose-600/10"
          >
            <div class="space-y-3">
              <div class="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-950 border border-slate-700/60">
                <img :src="deal.banner" :alt="deal.gameTitle" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                <span class="absolute top-2.5 right-2.5 bg-rose-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-lg">
                  -{{ deal.discount }}
                </span>
              </div>

              <div>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{{ deal.gameTitle }}</p>
                <h3 class="text-sm font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-1 mt-0.5">
                  {{ deal.item }}
                </h3>
              </div>

              <!-- Sold Progress Bar -->
              <div class="space-y-1">
                <div class="flex justify-between text-[10px] font-semibold">
                  <span class="text-slate-400">Terjual {{ deal.soldPercent }}%</span>
                  <span class="text-rose-400 font-bold">Stok Menipis</span>
                </div>
                <div class="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                  <div class="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full" :style="{ width: deal.soldPercent + '%' }"></div>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-3.5 border-t border-slate-700/60 flex items-end justify-between">
              <div>
                <span class="text-[11px] text-slate-500 line-through block">Rp {{ deal.originalPrice.toLocaleString('id-ID') }}</span>
                <span class="text-sm sm:text-base font-black text-rose-400">Rp {{ deal.salePrice.toLocaleString('id-ID') }}</span>
              </div>
              <span class="px-3.5 py-1.5 rounded-xl bg-rose-600/20 text-rose-400 text-xs font-bold flex items-center gap-1.5 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
                <span>Beli</span> <i class="fas fa-arrow-right text-[10px]"></i>
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Main Game Catalog Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <i class="fas fa-gamepad text-sky-400"></i> Katalog Game &amp; Voucher Digital
          </h2>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Pilih judul game favoritmu dan top up item resmi dalam hitungan detik.</p>
        </div>
        <span class="text-xs text-slate-500">Menampilkan {{ gamesStore.filteredGames.length }} produk</span>
      </div>

      <!-- Game Cards Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
        <router-link 
          v-for="game in gamesStore.filteredGames" 
          :key="game.id"
          :to="`/produk?game=${game.id}`"
          class="group relative bg-slate-900 border border-slate-800 hover:border-sky-500 rounded-3xl p-3.5 sm:p-5 shadow-xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div class="relative aspect-video rounded-2xl overflow-hidden mb-3.5 bg-slate-950 border border-slate-800">
              <img :src="game.banner" :alt="game.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
              <span v-if="game.isPopular" class="absolute top-2.5 left-2.5 bg-amber-500 text-slate-950 font-black text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                Populer
              </span>
            </div>
            <h3 class="font-bold text-white text-xs sm:text-sm group-hover:text-sky-400 transition-colors line-clamp-1">
              {{ game.title }}
            </h3>
            <p class="text-[11px] text-slate-400 mt-0.5">{{ game.developer }}</p>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
            <span class="text-slate-400 font-semibold">{{ game.category }}</span>
            <span class="text-sky-400 font-bold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
              <span>Top Up</span> <i class="fas fa-arrow-right text-[10px]"></i>
            </span>
          </div>
        </router-link>
      </div>

      <!-- Empty State -->
      <div v-if="gamesStore.filteredGames.length === 0" class="py-14 text-center text-slate-400 bg-slate-900 border border-slate-800 rounded-3xl p-8">
        <div class="w-16 h-16 rounded-3xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto text-2xl mb-3">
          <i class="fas fa-inbox"></i>
        </div>
        <p class="font-bold text-base text-white">Game tidak ditemukan</p>
        <p class="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Tidak ada game yang sesuai dengan kata kunci "{{ gamesStore.searchQuery }}". Coba cari judul lainnya.</p>
      </div>
    </section>

    <!-- Interactive Voucher Promo Program Showcase -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
              <i class="fas fa-tags text-sky-400"></i> Kupon &amp; Promo Pengguna
            </h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">Salin kode voucher di bawah dan gunakan langsung saat checkout pesanan.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div 
            v-for="p in promoStore.promos.filter(p => p.status === 'Aktif')" 
            :key="p.code"
            class="p-5 rounded-3xl bg-slate-800/60 border border-slate-700/80 flex flex-col justify-between space-y-4 hover:border-sky-500/60 transition-colors group"
          >
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="px-2.5 py-0.5 rounded-full bg-sky-950 text-sky-400 border border-sky-800 text-[10px] font-bold">
                  {{ p.type }}
                </span>
                <span class="text-[10px] text-slate-400 font-semibold">{{ p.period }}</span>
              </div>
              <h3 class="text-sm font-bold text-white">{{ p.name }}</h3>
              <p class="text-xs text-slate-400">Potongan diskon senilai <strong class="text-emerald-400">{{ p.value }}</strong> untuk semua game.</p>
            </div>

            <div class="pt-3 border-t border-slate-700/60 flex items-center justify-between gap-3">
              <span class="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-amber-400 font-mono font-bold text-xs tracking-wider">
                {{ p.code }}
              </span>
              <button 
                type="button" 
                @click="copyCode(p.code)"
                class="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow"
              >
                <i class="fas fa-copy text-xs"></i> <span>Salin Kode</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3-Step Easy Order Flow Infographic -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-xl mx-auto mb-8">
        <span class="text-xs font-bold text-sky-400 uppercase tracking-wider">Panduan Pemesanan</span>
        <h2 class="text-2xl sm:text-3xl font-black text-white mt-1">Cara Mudah Top Up di MPTopUp</h2>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">Hanya butuh 3 langkah singkat tanpa perlu registrasi akun yang rumit.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl relative group hover:border-sky-500/50 transition-colors">
          <div class="w-12 h-12 rounded-2xl bg-sky-950 border border-sky-800 text-sky-400 flex items-center justify-center text-lg font-black shadow-lg">
            1
          </div>
          <div>
            <h3 class="text-base font-bold text-white mb-1.5">Pilih Game &amp; Masukkan ID</h3>
            <p class="text-xs text-slate-400 leading-relaxed">Pilih game favoritmu dari katalog dan masukkan User ID serta Zone ID akun game kamu secara tepat.</p>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl relative group hover:border-sky-500/50 transition-colors">
          <div class="w-12 h-12 rounded-2xl bg-amber-950 border border-amber-800 text-amber-400 flex items-center justify-center text-lg font-black shadow-lg">
            2
          </div>
          <div>
            <h3 class="text-base font-bold text-white mb-1.5">Pilih Nominal &amp; Bayar</h3>
            <p class="text-xs text-slate-400 leading-relaxed">Pilih paket diamond/voucher yang kamu inginkan dan pilih metode pembayaran favoritmu (QRIS, E-Wallet, VA Bank).</p>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl relative group hover:border-sky-500/50 transition-colors">
          <div class="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center text-lg font-black shadow-lg">
            3
          </div>
          <div>
            <h3 class="text-base font-bold text-white mb-1.5">Item Masuk Otomatis</h3>
            <p class="text-xs text-slate-400 leading-relaxed">Setelah pembayaran terverifikasi, sistem otomatis langsung mengirim diamond ke akunmu dalam 1-3 detik.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Features -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-start gap-4 shadow-xl">
          <div class="w-12 h-12 rounded-2xl bg-sky-950 border border-sky-800/60 flex items-center justify-center text-sky-400 text-xl shrink-0">
            <i class="fas fa-bolt"></i>
          </div>
          <div class="space-y-1">
            <h3 class="text-sm font-bold text-white">Pengiriman Instan 1-3 Detik</h3>
            <p class="text-xs text-slate-400 leading-relaxed">Didukung sistem API terotomatisasi yang memproses pesanan 24 jam nonstop tanpa jeda.</p>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-start gap-4 shadow-xl">
          <div class="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400 text-xl shrink-0">
            <i class="fas fa-headset"></i>
          </div>
          <div class="space-y-1">
            <h3 class="text-sm font-bold text-white">Customer Support 24/7</h3>
            <p class="text-xs text-slate-400 leading-relaxed">Tim dukungan kami siap membantu Anda kapan saja melalui live WhatsApp Customer Service.</p>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-start gap-4 shadow-xl">
          <div class="w-12 h-12 rounded-2xl bg-purple-950 border border-purple-800/60 flex items-center justify-center text-purple-400 text-xl shrink-0">
            <i class="fas fa-shield-check"></i>
          </div>
          <div class="space-y-1">
            <h3 class="text-sm font-bold text-white">100% Aman &amp; Legal</h3>
            <p class="text-xs text-slate-400 leading-relaxed">Seluruh diamond dan voucher diambil langsung dari distributor dan publisher game resmi.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Accordion Section -->
    <section id="faq" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-xl mx-auto mb-8">
        <div class="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">Pusat Bantuan</div>
        <h2 class="text-2xl sm:text-3xl font-black text-white">Frequently Asked Questions</h2>
        <p class="text-xs sm:text-sm text-slate-400 mt-1">Pertanyaan yang sering diajukan seputar pemesanan di MPTopUp.</p>
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
import { usePromoStore } from '@/stores/promoStore';

const gamesStore = useGamesStore();
const promoStore = usePromoStore();

const currentSlide = ref(0);
let slideTimer = null;

// Countdown Timer State
const hours = ref('05');
const mins = ref('42');
const secs = ref('19');
let countdownInterval = null;

// Live Recent Transactions Ticker Data
const recentTransactions = [
  { user: "0857****1140", item: "1000 Valorant Points", time: "12 detik lalu" },
  { user: "0812****8921", item: "Weekly Diamond Pass MLBB", time: "35 detik lalu" },
  { user: "0819****4432", item: "720 Free Fire Diamonds", time: "1 menit lalu" },
  { user: "0878****9012", item: "660 UC PUBG Mobile", time: "2 menit lalu" },
  { user: "0856****7781", item: "Blessing of Welkin Moon", time: "3 menit lalu" }
];

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % gamesStore.heroSlides.length;
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + gamesStore.heroSlides.length) % gamesStore.heroSlides.length;
}

function goToSlide(idx) {
  currentSlide.value = idx;
}

function copyCode(code) {
  navigator.clipboard.writeText(code);
  alert(`Kode kupon "${code}" berhasil disalin!`);
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
