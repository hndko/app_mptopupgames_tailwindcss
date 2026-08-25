<template>
  <footer class="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs sm:text-sm mt-auto relative overflow-hidden">
    <!-- Top Decorative Glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"></div>

    <!-- Newsletter / Community Promo Bar -->
    <div class="border-b border-slate-800/80 bg-slate-900/40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="bg-gradient-to-r from-sky-950/40 via-slate-900 to-slate-900 border border-sky-900/30 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div class="space-y-1.5 text-center lg:text-left max-w-xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[11px] font-bold uppercase tracking-wider">
              <i class="fas fa-bell animate-bounce"></i> <span>Kupon Diskon &amp; Flash Sale</span>
            </div>
            <h3 class="text-lg sm:text-2xl font-black text-white">Dapatkan Notifikasi Promo Eksklusif</h3>
            <p class="text-xs text-slate-400">Jadilah yang pertama tahu saat event bonus diamonds dan cashback spesial dimulai.</p>
          </div>

          <form @submit.prevent="handleNewsletter" class="flex flex-col sm:flex-row items-center gap-2.5 w-full lg:w-auto">
            <div class="relative w-full sm:w-80">
              <i class="fas fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
              <input 
                type="email" 
                v-model="newsletterEmail" 
                required 
                placeholder="Masukkan alamat email kamu..." 
                class="w-full h-11 pl-9 pr-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-sky-500 transition-all"
              />
            </div>
            <button 
              type="submit" 
              class="w-full sm:w-auto h-11 px-5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 transition-all shrink-0"
            >
              <i class="fas fa-paper-plane text-xs"></i> <span>Langganan</span>
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Main Footer Content Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-slate-800/80">
        <!-- Column 1: Brand & Bio (4 cols on lg) -->
        <div class="lg:col-span-4 space-y-4">
          <router-link to="/" class="flex items-center gap-3 group inline-block">
            <img src="/images/logo-icon.svg" alt="MPTopUp Logo" class="w-10 h-10 rounded-xl shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <div class="flex flex-col">
              <span class="text-xl font-black text-white tracking-tight leading-tight">
                MP<span class="text-sky-400">TopUp</span>
              </span>
              <span class="text-[9px] uppercase tracking-widest text-slate-400 font-semibold -mt-0.5">Top Up Game Cepat &amp; Resmi</span>
            </div>
          </router-link>

          <p class="text-xs text-slate-400 leading-relaxed pr-2">
            MPTopUp adalah platform top up game dan voucher digital terpercaya di Indonesia. Kami menyediakan layanan transaksi otomatis 24 jam nonstop dengan proses kilat 1-3 detik, harga bersaing, dan saluran pembayaran resmi terlengkap.
          </p>

          <!-- Trust Badges -->
          <div class="grid grid-cols-2 gap-2 pt-2">
            <div class="p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center gap-2.5">
              <i class="fas fa-shield-halved text-emerald-400 text-base shrink-0"></i>
              <div class="overflow-hidden">
                <p class="text-[11px] font-bold text-white leading-tight">100% Legal</p>
                <p class="text-[10px] text-slate-400">Publisher Resmi</p>
              </div>
            </div>
            <div class="p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center gap-2.5">
              <i class="fas fa-bolt text-amber-400 text-base shrink-0"></i>
              <div class="overflow-hidden">
                <p class="text-[11px] font-bold text-white leading-tight">Otomatis 24/7</p>
                <p class="text-[10px] text-slate-400">Proses 1-3 Detik</p>
              </div>
            </div>
          </div>

          <!-- Social Media Links -->
          <div class="pt-2">
            <p class="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2.5">Komunitas &amp; Media Sosial</p>
            <div class="flex items-center gap-2">
              <a href="https://instagram.com" target="_blank" rel="noopener" class="w-8 h-8 rounded-xl bg-slate-900 hover:bg-sky-600 border border-slate-800 hover:border-sky-500 text-slate-400 hover:text-white flex items-center justify-center transition-all" title="Instagram" aria-label="Instagram">
                <i class="fab fa-instagram text-xs"></i>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener" class="w-8 h-8 rounded-xl bg-slate-900 hover:bg-sky-600 border border-slate-800 hover:border-sky-500 text-slate-400 hover:text-white flex items-center justify-center transition-all" title="TikTok" aria-label="TikTok">
                <i class="fab fa-tiktok text-xs"></i>
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener" class="w-8 h-8 rounded-xl bg-slate-900 hover:bg-sky-600 border border-slate-800 hover:border-sky-500 text-slate-400 hover:text-white flex items-center justify-center transition-all" title="Discord" aria-label="Discord">
                <i class="fab fa-discord text-xs"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener" class="w-8 h-8 rounded-xl bg-slate-900 hover:bg-sky-600 border border-slate-800 hover:border-sky-500 text-slate-400 hover:text-white flex items-center justify-center transition-all" title="YouTube" aria-label="YouTube">
                <i class="fab fa-youtube text-xs"></i>
              </a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener" class="w-8 h-8 rounded-xl bg-slate-900 hover:bg-emerald-600 border border-slate-800 hover:border-emerald-500 text-slate-400 hover:text-white flex items-center justify-center transition-all" title="WhatsApp" aria-label="WhatsApp">
                <i class="fab fa-whatsapp text-xs"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Column 2: Top Up Populer (3 cols on lg) -->
        <div class="lg:col-span-3 space-y-3">
          <h4 class="text-white font-bold text-sm flex items-center gap-2">
            <i class="fas fa-fire text-amber-400 text-xs"></i> <span>Game Populer</span>
          </h4>
          <ul class="space-y-2 text-xs">
            <li>
              <router-link to="/produk?game=game1" class="hover:text-sky-400 transition-colors flex items-center gap-2">
                <i class="fas fa-chevron-right text-[9px] text-slate-600"></i>
                <span>Mobile Legends: Bang Bang</span>
              </router-link>
            </li>
            <li>
              <router-link to="/produk?game=game2" class="hover:text-sky-400 transition-colors flex items-center gap-2">
                <i class="fas fa-chevron-right text-[9px] text-slate-600"></i>
                <span>Valorant Points (VP)</span>
              </router-link>
            </li>
            <li>
              <router-link to="/produk?game=game3" class="hover:text-sky-400 transition-colors flex items-center gap-2">
                <i class="fas fa-chevron-right text-[9px] text-slate-600"></i>
                <span>Free Fire Diamonds</span>
              </router-link>
            </li>
            <li>
              <router-link to="/produk?game=game4" class="hover:text-sky-400 transition-colors flex items-center gap-2">
                <i class="fas fa-chevron-right text-[9px] text-slate-600"></i>
                <span>PUBG Mobile Unknown Cash</span>
              </router-link>
            </li>
            <li>
              <router-link to="/produk?game=game5" class="hover:text-sky-400 transition-colors flex items-center gap-2">
                <i class="fas fa-chevron-right text-[9px] text-slate-600"></i>
                <span>Genshin Impact Genesis</span>
              </router-link>
            </li>
            <li>
              <router-link to="/produk?game=game6" class="hover:text-sky-400 transition-colors flex items-center gap-2">
                <i class="fas fa-chevron-right text-[9px] text-slate-600"></i>
                <span>Honor of Kings Tokens</span>
              </router-link>
            </li>
            <li>
              <router-link to="/produk?game=game7" class="hover:text-sky-400 transition-colors flex items-center gap-2">
                <i class="fas fa-chevron-right text-[9px] text-slate-600"></i>
                <span>Steam Wallet Code IDR</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Column 3: Bantuan & Navigasi (2 cols on lg) -->
        <div class="lg:col-span-2 space-y-3">
          <h4 class="text-white font-bold text-sm flex items-center gap-2">
            <i class="fas fa-compass text-sky-400 text-xs"></i> <span>Informasi</span>
          </h4>
          <ul class="space-y-2 text-xs">
            <li>
              <router-link to="/" class="hover:text-sky-400 transition-colors flex items-center gap-2">
                <i class="fas fa-chevron-right text-[9px] text-slate-600"></i>
                <span>Beranda Toko</span>
              </router-link>
            </li>
            <li>
              <router-link to="/produk" class="hover:text-sky-400 transition-colors flex items-center gap-2">
                <i class="fas fa-chevron-right text-[9px] text-slate-600"></i>
                <span>Katalog Produk</span>
              </router-link>
            </li>
            <li>
              <router-link to="/riwayat" class="hover:text-sky-400 transition-colors flex items-center gap-2">
                <i class="fas fa-chevron-right text-[9px] text-slate-600"></i>
                <span>Lacak Pesanan</span>
              </router-link>
            </li>
            <li>
              <a href="#faq" class="hover:text-sky-400 transition-colors flex items-center gap-2">
                <i class="fas fa-chevron-right text-[9px] text-slate-600"></i>
                <span>Tanya Jawab (FAQ)</span>
              </a>
            </li>
            <li>
              <router-link to="/modules" class="hover:text-sky-400 transition-colors flex items-center gap-2 text-slate-500">
                <i class="fas fa-chevron-right text-[9px] text-slate-600"></i>
                <span>Portal Manajemen</span>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Column 4: Customer Support & Jam Operasional (3 cols on lg) -->
        <div class="lg:col-span-3 space-y-3.5">
          <h4 class="text-white font-bold text-sm flex items-center gap-2">
            <i class="fas fa-headset text-emerald-400 text-xs"></i> <span>Layanan Bantuan</span>
          </h4>

          <div class="space-y-2.5">
            <!-- WhatsApp CS Card -->
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              rel="noopener"
              class="p-3 bg-emerald-950/30 hover:bg-emerald-950/60 border border-emerald-800/60 rounded-2xl flex items-center gap-3 transition-colors group"
            >
              <div class="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-base shadow group-hover:scale-105 transition-transform">
                <i class="fab fa-whatsapp"></i>
              </div>
              <div>
                <p class="text-xs font-bold text-white">WhatsApp CS 24 Jam</p>
                <p class="text-[10px] text-emerald-400 font-semibold">+62 812-3456-7890</p>
              </div>
            </a>

            <!-- Email Support Card -->
            <a 
              href="mailto:support@mptopup.com" 
              class="p-3 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl flex items-center gap-3 transition-colors"
            >
              <div class="w-9 h-9 rounded-xl bg-slate-800 text-sky-400 flex items-center justify-center text-sm">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="overflow-hidden">
                <p class="text-xs font-bold text-white">Email Dukungan</p>
                <p class="text-[10px] text-slate-400 truncate">support@mptopup.com</p>
              </div>
            </a>
          </div>

          <!-- Server Status Indicator -->
          <div class="p-3 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
            <div class="flex items-center justify-between text-[11px]">
              <span class="text-slate-400 font-medium">Status Gateway API:</span>
              <span class="text-emerald-400 font-bold flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
                <span>Normal (100%)</span>
              </span>
            </div>
            <p class="text-[10px] text-slate-500">Seluruh server transaksi otomatis aktif 24 jam nonstop.</p>
          </div>
        </div>
      </div>

      <!-- Payment Channels Section Showcase -->
      <div class="pt-8 pb-4 space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p class="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <i class="fas fa-credit-card text-sky-400"></i> Saluran Pembayaran Resmi &amp; Terverifikasi
          </p>
          <span class="text-[11px] text-slate-500">Scan QRIS Otomatis &bull; E-Wallet &bull; Virtual Account Bank</span>
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <div class="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
            <img src="/images/payments/qris.svg" alt="QRIS" class="h-4 w-auto object-contain">
            <span class="text-[11px] font-bold text-slate-300">QRIS Instant</span>
          </div>
          <div class="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
            <img src="/images/payments/gopay.svg" alt="GoPay" class="h-4 w-auto object-contain">
            <span class="text-[11px] font-bold text-slate-300">GoPay</span>
          </div>
          <div class="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
            <img src="/images/payments/dana.svg" alt="DANA" class="h-4 w-auto object-contain">
            <span class="text-[11px] font-bold text-slate-300">DANA</span>
          </div>
          <div class="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
            <img src="/images/payments/ovo.svg" alt="OVO" class="h-4 w-auto object-contain">
            <span class="text-[11px] font-bold text-slate-300">OVO</span>
          </div>
          <div class="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
            <img src="/images/payments/bca.svg" alt="BCA" class="h-4 w-auto object-contain">
            <span class="text-[11px] font-bold text-slate-300">BCA Virtual Account</span>
          </div>
          <div class="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
            <img src="/images/payments/mandiri.svg" alt="Mandiri" class="h-4 w-auto object-contain">
            <span class="text-[11px] font-bold text-slate-300">Mandiri Virtual Account</span>
          </div>
          <div class="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2">
            <span class="text-[11px] font-bold text-sky-400">Digiflazz &bull; Midtrans</span>
          </div>
        </div>
      </div>

      <!-- Bottom Copyright & Back to Top Bar -->
      <div class="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div class="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left">
          <p>&copy; {{ new Date().getFullYear() }} <strong class="text-slate-400">MPTopUp Official</strong>. Hak Cipta Dilindungi.</p>
          <span class="hidden sm:inline text-slate-700">&bull;</span>
          <p>Didesain untuk Komunitas Gamers Indonesia</p>
        </div>

        <!-- Back to Top Button -->
        <button 
          type="button" 
          @click="scrollToTop"
          class="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <i class="fas fa-arrow-up text-xs"></i> <span>Kembali ke Atas</span>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const newsletterEmail = ref('');

function handleNewsletter() {
  if (newsletterEmail.value) {
    alert(`Terima kasih! Email "${newsletterEmail.value}" telah berhasil didaftarkan untuk notifikasi promo.`);
    newsletterEmail.value = '';
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
