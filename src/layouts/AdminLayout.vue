<template>
  <div class="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
    <!-- Admin Sidebar -->
    <aside 
      :class="[sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0']" 
      class="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out"
    >
      <!-- Sidebar Brand Header -->
      <div class="h-16 sm:h-20 flex items-center justify-between px-6 border-b border-slate-800">
        <router-link to="/" class="flex items-center gap-2.5">
          <img src="/images/logo-icon.svg" alt="MPTopUp Logo" class="w-8 h-8 rounded-xl shadow-md">
          <div class="flex flex-col">
            <span class="font-extrabold text-white text-base tracking-tight leading-none">
              MP<span class="text-sky-400">TopUp</span>
            </span>
            <span class="text-[9px] uppercase tracking-wider text-sky-400 font-bold mt-0.5">Admin Portal</span>
          </div>
        </router-link>
        <button type="button" @click="sidebarOpen = false" class="lg:hidden text-slate-400 hover:text-white" aria-label="Tutup Sidebar">
          <i class="fas fa-times text-lg"></i>
        </button>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 text-xs font-semibold">
        <router-link 
          to="/modules" 
          :class="[$route.path === '/modules' || $route.path === '/modules/dashboard' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white']"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all"
        >
          <i class="fas fa-chart-pie w-4 text-center"></i> <span>Dashboard</span>
        </router-link>

        <router-link 
          to="/modules/pesanan" 
          :class="[$route.path === '/modules/pesanan' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white']"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all"
        >
          <i class="fas fa-list-check w-4 text-center"></i> <span>Pesanan Masuk</span>
        </router-link>

        <router-link 
          to="/modules/produk" 
          :class="[$route.path === '/modules/produk' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white']"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all"
        >
          <i class="fas fa-gamepad w-4 text-center"></i> <span>Katalog &amp; SKU</span>
        </router-link>

        <router-link 
          to="/modules/pengguna" 
          :class="[$route.path === '/modules/pengguna' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white']"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all"
        >
          <i class="fas fa-users w-4 text-center"></i> <span>Pengguna</span>
        </router-link>

        <router-link 
          to="/modules/promo" 
          :class="[$route.path === '/modules/promo' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white']"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all"
        >
          <i class="fas fa-tags w-4 text-center"></i> <span>Promo &amp; Kupon</span>
        </router-link>

        <router-link 
          to="/modules/laporan" 
          :class="[$route.path === '/modules/laporan' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white']"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all"
        >
          <i class="fas fa-file-invoice-dollar w-4 text-center"></i> <span>Laporan Penjualan</span>
        </router-link>

        <router-link 
          to="/modules/pengaturan" 
          :class="[$route.path === '/modules/pengaturan' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white']"
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all"
        >
          <i class="fas fa-gear w-4 text-center"></i> <span>Pengaturan Toko</span>
        </router-link>

        <div class="pt-4 border-t border-slate-800/80 my-2"></div>

        <router-link 
          to="/" 
          class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800/80 hover:text-sky-400 transition-all"
        >
          <i class="fas fa-arrow-up-right-from-square w-4 text-center"></i> <span>Lihat Toko Publik</span>
        </router-link>
      </nav>

      <!-- Sidebar User Profile Footer -->
      <div class="p-4 border-t border-slate-800 bg-slate-900/60">
        <div class="flex items-center gap-3">
          <img src="/images/avatars/admin-avatar.svg" alt="Admin" class="w-9 h-9 rounded-xl border border-slate-700 object-cover bg-slate-950">
          <div class="overflow-hidden flex-1">
            <p class="text-xs font-bold text-white truncate">Administrator</p>
            <p class="text-[10px] text-slate-400 truncate">admin@mptopup.com</p>
          </div>
          <router-link to="/login" class="text-slate-400 hover:text-rose-400 transition-colors p-1" title="Keluar">
            <i class="fas fa-right-from-bracket text-xs"></i>
          </router-link>
        </div>
      </div>
    </aside>

    <!-- Overlay Backdrop for Mobile -->
    <div 
      v-if="sidebarOpen" 
      @click="sidebarOpen = false" 
      class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
    ></div>

    <!-- Main Content Wrapper -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Admin Topbar Header -->
      <header class="h-16 sm:h-20 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between px-4 sm:px-8 shrink-0 backdrop-blur-md">
        <div class="flex items-center gap-3">
          <button type="button" @click="sidebarOpen = true" class="lg:hidden w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center">
            <i class="fas fa-bars text-sm"></i>
          </button>
          <div>
            <h1 class="text-base sm:text-lg font-bold text-white">
              {{ routeTitle }}
            </h1>
            <p class="text-[11px] text-slate-400 hidden sm:block">Panel Kontrol &amp; Pengelolaan MPTopUp</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <router-link to="/" class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-sky-400 transition-colors">
            <i class="fas fa-store text-xs"></i> <span>Buka Toko</span>
          </router-link>
          <img src="/images/avatars/admin-avatar.svg" alt="Admin" class="w-9 h-9 rounded-xl border border-slate-700 bg-slate-950 object-cover">
        </div>
      </header>

      <!-- Scrollable Admin View Container -->
      <main class="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const sidebarOpen = ref(false);

const routeTitle = computed(() => {
  if (route.path === '/modules' || route.path === '/modules/dashboard') return 'Dashboard Ringkasan';
  if (route.path.includes('/pesanan')) return 'Manajemen Pesanan';
  if (route.path.includes('/produk')) return 'Katalog Game & SKU';
  if (route.path.includes('/pengguna')) return 'Manajemen Pengguna';
  if (route.path.includes('/promo')) return 'Manajemen Promo & Kupon';
  if (route.path.includes('/laporan')) return 'Laporan Penjualan';
  if (route.path.includes('/pengaturan')) return 'Pengaturan Sistem';
  return 'Portal Administrator';
});
</script>
