<template>
  <div class="space-y-12 sm:space-y-16 pb-16">
    <!-- Live Recent Transaction Activity Ticker Bar -->
    <div class="bg-slate-900/95 border-y border-slate-800/80 py-2.5 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
        <!-- Badge Indicator (Strict Centering & High Priority Z-Index) -->
        <div class="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 shrink-0 bg-emerald-950/80 border border-emerald-700/60 px-3 py-1 rounded-full shadow-sm">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span class="leading-none">Transaksi Live</span>
        </div>

        <!-- Ticker Viewport with Left/Right Soft Fade Masks -->
        <div class="relative flex-1 overflow-hidden flex items-center">
          <!-- Left Soft Gradient Mask -->
          <div class="absolute left-0 inset-y-0 w-6 sm:w-10 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>

          <!-- Infinite Scrolling Content Track (Double rendered for 100% seamless -50% loop) -->
          <div class="flex gap-10 animate-marquee whitespace-nowrap text-xs text-slate-300 items-center select-none">
            <!-- Set 1 -->
            <div class="flex items-center gap-8 shrink-0">
              <span v-for="(tx, idx) in recentTransactions" :key="'tx1-' + idx" class="inline-flex items-center gap-2 leading-none">
                <i class="fas fa-circle-check text-emerald-400 text-[11px]"></i>
                <strong class="text-white font-medium">{{ tx.user }}</strong>
                <span class="text-slate-400">top up</span>
                <span class="text-sky-400 font-bold">{{ tx.item }}</span>
                <span class="text-[10px] text-slate-500 font-mono">({{ tx.time }})</span>
              </span>
            </div>
            <!-- Set 2 (Duplicate for smooth infinite marquee) -->
            <div class="flex items-center gap-8 shrink-0">
              <span v-for="(tx, idx) in recentTransactions" :key="'tx2-' + idx" class="inline-flex items-center gap-2 leading-none">
                <i class="fas fa-circle-check text-emerald-400 text-[11px]"></i>
                <strong class="text-white font-medium">{{ tx.user }}</strong>
                <span class="text-slate-400">top up</span>
                <span class="text-sky-400 font-bold">{{ tx.item }}</span>
                <span class="text-[10px] text-slate-500 font-mono">({{ tx.time }})</span>
              </span>
            </div>
          </div>

          <!-- Right Soft Gradient Mask -->
          <div class="absolute right-0 inset-y-0 w-6 sm:w-10 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>
    </div>

    <!-- Hero Carousel Slider Section (Fully Responsive Proportional Banner) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        class="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 group select-none"
        @mouseenter="pauseSlideTimer"
        @mouseleave="resumeSlideTimer"
      >
        <!-- Responsive Proportional Aspect Ratio Container (1200x480 ratio) -->
        <div class="relative w-full aspect-[16/8] sm:aspect-[2.5/1] overflow-hidden">
          <div 
            v-for="(slide, idx) in gamesStore.heroSlides" 
            :key="slide.id"
            :class="[
              idx === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-98 pointer-events-none z-0', 
              'absolute inset-0 transition-all duration-700 ease-out'
            ]"
          >
            <router-link 
              :to="`/produk/${slide.gameId}`" 
              class="block w-full h-full cursor-pointer focus:outline-none"
              :title="slide.title"
            >
              <img 
                :src="slide.banner" 
                :alt="slide.title" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                loading="eager"
              />
            </router-link>
          </div>

          <!-- Slider Arrow Controls (Sleek Glassmorphic) -->
          <button 
            type="button" 
            @click.stop="prevSlide" 
            aria-label="Slide Sebelumnya"
            class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-slate-950/80 hover:bg-sky-600 border border-slate-700/80 hover:border-sky-500 text-white flex items-center justify-center backdrop-blur-md transition-all z-20 shadow-xl opacity-80 sm:opacity-0 group-hover:opacity-100 btn-press"
          >
            <i class="fas fa-chevron-left text-xs sm:text-sm"></i>
          </button>
          <button 
            type="button" 
            @click.stop="nextSlide" 
            aria-label="Slide Selanjutnya"
            class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-slate-950/80 hover:bg-sky-600 border border-slate-700/80 hover:border-sky-500 text-white flex items-center justify-center backdrop-blur-md transition-all z-20 shadow-xl opacity-80 sm:opacity-0 group-hover:opacity-100 btn-press"
          >
            <i class="fas fa-chevron-right text-xs sm:text-sm"></i>
          </button>

          <!-- Interactive Dots Indicator -->
          <div class="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800/80 shadow-lg">
            <button 
              v-for="(_, idx) in gamesStore.heroSlides" 
              :key="idx"
              type="button" 
              @click.stop="goToSlide(idx)"
              :class="[
                idx === currentSlide ? 'w-6 sm:w-7 bg-sky-400 shadow-md shadow-sky-400/50' : 'w-2 sm:w-2.5 bg-slate-600/80 hover:bg-slate-400', 
                'h-2 sm:h-2.5 rounded-full transition-all duration-300'
              ]" 
              :aria-label="'Slide ' + (idx + 1)"
            ></button>
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
            :to="`/produk/${deal.gameId}`"
            class="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700/80 hover:border-rose-500/60 rounded-3xl p-4 sm:p-5 interactive-card flex flex-col justify-between hover:shadow-rose-600/10"
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
              <span class="px-3.5 py-1.5 rounded-xl bg-rose-600/20 text-rose-400 text-xs font-bold flex items-center gap-1.5 group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm btn-press">
                <span>Beli</span> <i class="fas fa-arrow-right text-[10px]"></i>
              </span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Main Game Catalog Section (With Search & Category Filter Header) -->
    <section id="catalogSection" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <i class="fas fa-gamepad text-sky-400"></i> Katalog Game &amp; Voucher Digital
          </h2>
          <p class="text-xs sm:text-sm text-slate-400 mt-1">Pilih judul game favoritmu dan top up item resmi dalam hitungan detik.</p>
        </div>
        <span class="text-xs font-semibold text-slate-400">
          Menampilkan <strong class="text-sky-400">{{ gamesStore.filteredGames.length }}</strong> dari {{ gamesStore.games.length }} produk
        </span>
      </div>

      <!-- Quick Search & Category Filter Toolbar -->
      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl space-y-3.5">
        <div class="flex flex-col lg:flex-row items-center gap-3.5">
          <!-- Live Search Bar -->
          <div class="relative flex-1 w-full">
            <i class="fas fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xs sm:text-sm pointer-events-none"></i>
            <input 
              type="search" 
              v-model="gamesStore.searchQuery" 
              placeholder="Cari game favoritmu (Mobile Legends, Valorant, Free Fire, Genshin...)"
              class="w-full h-11 sm:h-12 pl-11 pr-10 rounded-2xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 transition-all"
            />
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
          <div class="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
            <button 
              type="button" 
              v-for="cat in categoryList"
              :key="cat.id"
              @click="selectCategory(cat.id)"
              :class="[
                gamesStore.selectedCategory === cat.id 
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30 border-sky-500 ring-2 ring-sky-400/50' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700/80',
                'px-4 py-2.5 sm:py-3 rounded-2xl text-xs font-bold whitespace-nowrap border transition-all flex items-center gap-2 btn-press'
              ]"
            >
              <i :class="cat.icon" class="text-xs"></i>
              <span>{{ cat.label }}</span>
              <span 
                :class="[
                  gamesStore.selectedCategory === cat.id ? 'bg-sky-950/80 text-sky-200' : 'bg-slate-950/60 text-slate-400',
                  'px-2 py-0.5 rounded-full text-[10px] font-mono font-black'
                ]"
              >
                {{ gamesStore.categoryCounts[cat.key] || 0 }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Game Cards Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
        <router-link 
          v-for="game in gamesStore.filteredGames" 
          :key="game.id"
          :to="`/produk/${game.id}`"
          class="group relative bg-slate-900 border border-slate-800 hover:border-sky-500 rounded-3xl p-3.5 sm:p-5 shadow-xl hover:shadow-sky-500/10 interactive-card flex flex-col justify-between"
        >
          <div>
            <div class="relative aspect-video rounded-2xl overflow-hidden mb-3.5 bg-slate-950 border border-slate-800">
              <img :src="game.banner" :alt="game.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
              <span v-if="game.isPopular" class="absolute top-2.5 left-2.5 bg-amber-500 text-slate-950 font-black text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                Populer
              </span>
              <span class="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur-sm text-sky-400 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-slate-800">
                {{ game.category }}
              </span>
            </div>
            <h3 class="font-bold text-white text-xs sm:text-sm group-hover:text-sky-400 transition-colors line-clamp-1">
              {{ game.title }}
            </h3>
            <p class="text-[11px] text-slate-400 mt-0.5">{{ game.developer }}</p>
          </div>

          <div class="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
            <span class="text-slate-400 font-semibold">
              <i class="fas fa-gem text-[10px] text-sky-400 mr-1"></i>
              {{ (game.products || []).length }} Paket
            </span>
            <span class="text-sky-400 font-bold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
              <span>Top Up</span> <i class="fas fa-arrow-right text-[10px]"></i>
            </span>
          </div>
        </router-link>
      </div>

      <!-- Empty State -->
      <div v-if="gamesStore.filteredGames.length === 0" class="py-14 text-center text-slate-400 bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-3">
        <div class="w-14 h-14 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto text-xl">
          <i class="fas fa-inbox"></i>
        </div>
        <p class="font-bold text-sm text-white">Tidak ada game yang sesuai kriteria filter</p>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          Coba kata kunci lain atau klik tombol di bawah untuk mereset seluruh filter pencarian.
        </p>
        <button 
          type="button" 
          @click="gamesStore.resetFilters()" 
          class="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors btn-press shadow-md"
        >
          <i class="fas fa-rotate-left text-xs"></i> <span>Reset Filter</span>
        </button>
      </div>
    </section>

    <!-- Voucher / Promo Coupon Showcase Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-r from-slate-900 via-sky-950/20 to-slate-900 border border-sky-900/40 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h2 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
              <i class="fas fa-tags text-sky-400"></i> Kupon Diskon Aktif
            </h2>
            <p class="text-xs sm:text-sm text-slate-400 mt-1">Salin dan gunakan kode kupon untuk potongan harga ekstra saat checkout.</p>
          </div>
          <span class="text-xs font-bold text-sky-400 bg-sky-950/80 border border-sky-800/80 px-3 py-1.5 rounded-full">
            {{ (promoStore.coupons || []).length }} Promo Tersedia
          </span>
        </div>

        <!-- Coupon Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div 
            v-for="coupon in (promoStore.coupons || [])" 
            :key="coupon.code"
            class="bg-slate-800/60 border border-dashed border-sky-500/40 rounded-2xl p-4 flex items-center justify-between gap-4 interactive-card relative overflow-hidden"
          >
            <div class="space-y-1">
              <div class="inline-block font-mono font-black text-sm text-sky-400 bg-sky-950/90 px-2.5 py-0.5 rounded-lg border border-sky-800">
                {{ coupon.code }}
              </div>
              <p class="text-xs font-bold text-white">{{ coupon.name || coupon.title }}</p>
              <p class="text-[10px] text-slate-400">Potongan {{ coupon.value || coupon.discountText }} &bull; {{ coupon.period || 'Terbatas' }}</p>
            </div>
            <button 
              type="button" 
              @click="copyCode(coupon.code)" 
              class="px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shrink-0 transition-colors shadow-md btn-press"
              title="Salin Kode Kupon"
            >
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- 3-Step Easy Order Infographic Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
        <div class="text-center max-w-xl mx-auto space-y-1">
          <span class="text-xs font-extrabold uppercase tracking-wider text-sky-400">Mudah &bull; Cepat &bull; Aman</span>
          <h2 class="text-2xl sm:text-3xl font-black text-white">Cara Top Up dalam 3 Langkah</h2>
          <p class="text-xs sm:text-sm text-slate-400">Cukup selesaikan pesanan Anda dalam hitungan detik tanpa registrasi rumit.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 relative interactive-card space-y-3">
            <span class="absolute top-4 right-4 text-3xl font-black text-slate-800 font-mono">01</span>
            <div class="w-12 h-12 rounded-2xl bg-sky-600/20 border border-sky-500/40 text-sky-400 flex items-center justify-center text-lg">
              <i class="fas fa-user-tag"></i>
            </div>
            <h3 class="text-sm font-bold text-white">1. Masukkan ID Akun Game</h3>
            <p class="text-xs text-slate-400 leading-relaxed">Pilih game favorit Anda dan masukkan User ID serta Zone ID akun target dengan tepat.</p>
          </div>

          <div class="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 relative interactive-card space-y-3">
            <span class="absolute top-4 right-4 text-3xl font-black text-slate-800 font-mono">02</span>
            <div class="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center text-lg">
              <i class="fas fa-cubes"></i>
            </div>
            <h3 class="text-sm font-bold text-white">2. Pilih Nominal &amp; Pembayaran</h3>
            <p class="text-xs text-slate-400 leading-relaxed">Tentukan jumlah diamond yang diinginkan dan pilih saluran pembayaran instan (QRIS, E-Wallet, VA Bank).</p>
          </div>

          <div class="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 relative interactive-card space-y-3">
            <span class="absolute top-4 right-4 text-3xl font-black text-slate-800 font-mono">03</span>
            <div class="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-lg">
              <i class="fas fa-bolt"></i>
            </div>
            <h3 class="text-sm font-bold text-white">3. Item Masuk 1-3 Detik</h3>
            <p class="text-xs text-slate-400 leading-relaxed">Setelah pembayaran terverifikasi otomatis, item game akan langsung terkirim ke inbox akun Anda.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust & Platform Guarantees Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-start gap-4 shadow-xl interactive-card">
          <div class="w-12 h-12 rounded-2xl bg-sky-950 border border-sky-800/60 flex items-center justify-center text-sky-400 text-xl shrink-0">
            <i class="fas fa-bolt"></i>
          </div>
          <div class="space-y-1">
            <h3 class="text-sm font-bold text-white">Proses Kilat 1-3 Detik</h3>
            <p class="text-xs text-slate-400 leading-relaxed">Sistem gateway otomatis terhubung langsung ke publisher resmi untuk kecepatan top up terbaik.</p>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-start gap-4 shadow-xl interactive-card">
          <div class="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400 text-xl shrink-0">
            <i class="fas fa-headset"></i>
          </div>
          <div class="space-y-1">
            <h3 class="text-sm font-bold text-white">Customer Support 24/7</h3>
            <p class="text-xs text-slate-400 leading-relaxed">Tim bantuan siap merespons pertanyaan dan kendala transaksi Anda via WhatsApp setiap saat.</p>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-start gap-4 shadow-xl interactive-card">
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

const categoryList = [
  { id: 'ALL', label: 'Semua Game', icon: 'fas fa-grip', key: 'ALL' },
  { id: 'POPULAR', label: 'Populer', icon: 'fas fa-fire text-amber-400', key: 'POPULAR' },
  { id: 'Mobile', label: 'Mobile', icon: 'fas fa-mobile-screen text-sky-400', key: 'Mobile' },
  { id: 'PC', label: 'PC Game', icon: 'fas fa-desktop text-emerald-400', key: 'PC' },
  { id: 'Voucher', label: 'Voucher', icon: 'fas fa-ticket text-purple-400', key: 'Voucher' }
];

function selectCategory(catId) {
  gamesStore.setCategory(catId);
}

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

function pauseSlideTimer() {
  if (slideTimer) {
    clearInterval(slideTimer);
    slideTimer = null;
  }
}

function resumeSlideTimer() {
  if (!slideTimer) {
    slideTimer = setInterval(nextSlide, 5000);
  }
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
  resumeSlideTimer();

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
  pauseSlideTimer();
  if (countdownInterval) clearInterval(countdownInterval);
});
</script>
