<template>
  <div class="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
    <!-- Top Decorative Glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <!-- Auth Header Navigation -->
    <header class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between z-10">
      <router-link to="/" class="flex items-center gap-3 group">
        <img src="/images/logo-icon.svg" alt="MPTopUp Logo" class="w-9 h-9 rounded-xl shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
        <span class="text-xl font-black text-white">MP<span class="text-sky-400">TopUp</span></span>
      </router-link>

      <router-link to="/" class="text-xs font-bold text-slate-400 hover:text-sky-400 flex items-center gap-1.5 transition-colors">
        <i class="fas fa-arrow-left text-xs"></i> <span>Kembali ke Beranda</span>
      </router-link>
    </header>

    <!-- Auth View Container -->
    <main class="flex-1 flex items-center justify-center p-4 z-10">
      <router-view />
    </main>

    <!-- Auth Footer -->
    <footer class="w-full py-4 text-center text-xs text-slate-500 border-t border-slate-900 z-10">
      <p>&copy; {{ new Date().getFullYear() }} <strong class="text-slate-400">MPTopUp Official</strong>. Platform Top Up Game Terpercaya Indonesia.</p>
    </footer>
  </div>
</template>

<script setup>
</script>
