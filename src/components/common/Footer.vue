<template>
  <footer class="bg-slate-900 border-t border-slate-800 pt-12 pb-8 text-slate-400 text-sm mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
        <!-- Brand Info -->
        <div class="md:col-span-2 space-y-4">
          <router-link to="/" class="flex items-center gap-2 text-white font-bold text-xl">
            <img src="/images/logo-icon.svg" alt="MPTopUp Logo" class="w-8 h-8 rounded-xl shadow-md">
            <span>MP<span class="text-sky-400">TopUp</span></span>
          </router-link>
          <p class="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
            MPTopUp adalah platform layanan top up game online dan voucher digital terpercaya di Indonesia dengan sistem transaksi otomatis 24 jam nonstop.
          </p>
          <div class="flex flex-wrap items-center gap-2 pt-2">
            <span class="text-xs text-slate-400 font-semibold">Metode Bayar:</span>
            <span class="px-2.5 py-1 bg-slate-800 rounded-lg text-[11px] text-slate-300 font-bold border border-slate-700">QRIS</span>
            <span class="px-2.5 py-1 bg-slate-800 rounded-lg text-[11px] text-slate-300 font-bold border border-slate-700">GoPay</span>
            <span class="px-2.5 py-1 bg-slate-800 rounded-lg text-[11px] text-slate-300 font-bold border border-slate-700">DANA</span>
            <span class="px-2.5 py-1 bg-slate-800 rounded-lg text-[11px] text-slate-300 font-bold border border-slate-700">OVO</span>
            <span class="px-2.5 py-1 bg-slate-800 rounded-lg text-[11px] text-slate-300 font-bold border border-slate-700">BCA VA</span>
            <span class="px-2.5 py-1 bg-slate-800 rounded-lg text-[11px] text-slate-300 font-bold border border-slate-700">Mandiri VA</span>
          </div>
        </div>

        <!-- Navigation Links -->
        <div>
          <h4 class="text-white font-bold mb-3 text-sm">Navigasi Utama</h4>
          <ul class="space-y-2 text-xs sm:text-sm">
            <li><router-link to="/" class="hover:text-sky-400 transition-colors">Beranda</router-link></li>
            <li><router-link to="/produk" class="hover:text-sky-400 transition-colors">Katalog Game</router-link></li>
            <li><router-link to="/riwayat" class="hover:text-sky-400 transition-colors">Lacak Pesanan</router-link></li>
            <li><router-link to="/admin" class="hover:text-sky-400 transition-colors">Portal Administrator</router-link></li>
          </ul>
        </div>

        <!-- Support Info -->
        <div>
          <h4 class="text-white font-bold mb-3 text-sm">Bantuan &amp; Layanan</h4>
          <ul class="space-y-2 text-xs sm:text-sm">
            <li><a href="#faq" class="hover:text-sky-400 transition-colors">Tanya Jawab (FAQ)</a></li>
            <li>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener" class="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5">
                <i class="fab fa-whatsapp text-sm"></i> <span>WhatsApp CS 24/7</span>
              </a>
            </li>
            <li>
              <a href="mailto:support@mptopup.com" class="text-slate-400 hover:text-white flex items-center gap-1.5">
                <i class="fas fa-envelope text-xs"></i> <span>support@mptopup.com</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>&copy; {{ new Date().getFullYear() }} MPTopUp. Hak Cipta Dilindungi.</p>
        <p class="flex items-center gap-1">
          <i class="fas fa-shield-check text-sky-400"></i> Platform Top Up Game Terpercaya Indonesia
        </p>
      </div>
    </div>
  </footer>
</template>
