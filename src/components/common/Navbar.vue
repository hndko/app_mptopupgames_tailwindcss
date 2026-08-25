<template>
  <header class="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 sm:h-20">
        <!-- Brand Logo -->
        <router-link to="/" class="flex items-center gap-3 group">
          <img src="/images/logo-icon.svg" alt="MPTopUp Logo" 
               class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
          <div class="flex flex-col">
            <span class="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-1">
              MP<span class="text-sky-400">TopUp</span>
            </span>
            <span class="text-[9px] uppercase tracking-widest text-slate-400 font-semibold -mt-1 hidden sm:block">
              Top Up Game Instan
            </span>
          </div>
        </router-link>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold text-slate-300">
          <router-link to="/" 
            :class="[$route.path === '/' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'hover:text-white hover:bg-slate-800']"
            class="px-4 py-2 rounded-xl transition-all flex items-center gap-1.5">
            <i class="fas fa-house text-xs"></i> <span>Beranda</span>
          </router-link>
          <router-link to="/produk" 
            :class="[$route.path.startsWith('/produk') ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'hover:text-white hover:bg-slate-800']"
            class="px-4 py-2 rounded-xl transition-all flex items-center gap-1.5">
            <i class="fas fa-gamepad text-xs"></i> <span>Katalog Game</span>
          </router-link>
          <router-link to="/riwayat" 
            :class="[$route.path === '/riwayat' ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'hover:text-white hover:bg-slate-800']"
            class="px-4 py-2 rounded-xl transition-all flex items-center gap-1.5">
            <i class="fas fa-receipt text-xs"></i> <span>Lacak Pesanan</span>
          </router-link>
          <router-link to="/modules" 
            :class="[$route.path.startsWith('/modules') ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20' : 'hover:text-white hover:bg-slate-800 text-slate-400']"
            class="px-4 py-2 rounded-xl transition-all flex items-center gap-1.5">
            <i class="fas fa-shield-halved text-xs"></i> <span>Admin Portal</span>
          </router-link>
        </nav>

        <!-- Desktop Auth Actions / User Profile -->
        <div class="hidden sm:flex items-center gap-2.5">
          <!-- Logged In User State -->
          <div v-if="authStore.isAuthenticated" class="flex items-center gap-3 bg-slate-900 border border-slate-800 p-1.5 pl-3 rounded-2xl shadow-sm">
            <div class="flex flex-col text-right">
              <span class="text-xs font-bold text-white max-w-[120px] truncate leading-tight">
                {{ authStore.userFullName }}
              </span>
              <span class="text-[9px] font-bold text-sky-400 uppercase tracking-wider">
                {{ authStore.isAdmin ? 'Administrator' : 'Member' }}
              </span>
            </div>
            <img :src="authStore.userAvatar" :alt="authStore.userFullName" class="w-8 h-8 rounded-xl object-cover border border-slate-700 bg-slate-950">
            <button 
              type="button" 
              @click="authStore.logout()" 
              class="w-8 h-8 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-400 flex items-center justify-center text-xs transition-colors"
              title="Keluar dari Akun"
              aria-label="Logout"
            >
              <i class="fas fa-right-from-bracket"></i>
            </button>
          </div>

          <!-- Guest State -->
          <div v-else class="flex items-center gap-2.5">
            <router-link to="/login" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition-all flex items-center gap-1.5 btn-press">
              <i class="fas fa-right-to-bracket text-xs"></i> <span>Masuk</span>
            </router-link>
            <router-link to="/register" class="px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/20 transition-all flex items-center gap-1.5 btn-press">
              <i class="fas fa-user-plus text-xs"></i> <span>Daftar Akun</span>
            </router-link>
          </div>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <button type="button" @click="mobileMenuOpen = !mobileMenuOpen" 
                class="md:hidden w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Buka Menu Navigasi">
          <i :class="mobileMenuOpen ? 'fas fa-xmark' : 'fas fa-bars'" class="text-base"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden border-b border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
      <!-- Mobile User Profile -->
      <div v-if="authStore.isAuthenticated" class="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img :src="authStore.userAvatar" :alt="authStore.userFullName" class="w-9 h-9 rounded-xl object-cover border border-slate-700 bg-slate-950">
          <div>
            <p class="text-xs font-bold text-white">{{ authStore.userFullName }}</p>
            <p class="text-[10px] text-slate-400">{{ authStore.userEmail }}</p>
          </div>
        </div>
        <button type="button" @click="authStore.logout(); mobileMenuOpen = false" class="px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-400 text-xs font-bold flex items-center gap-1.5">
          <i class="fas fa-right-from-bracket text-xs"></i> <span>Keluar</span>
        </button>
      </div>

      <div class="flex flex-col space-y-1 text-sm font-semibold">
        <router-link to="/" @click="mobileMenuOpen = false" class="px-3 py-2.5 rounded-xl hover:bg-slate-900 text-slate-200 flex items-center gap-2.5">
          <i class="fas fa-house text-sky-400 w-5"></i> <span>Beranda</span>
        </router-link>
        <router-link to="/produk" @click="mobileMenuOpen = false" class="px-3 py-2.5 rounded-xl hover:bg-slate-900 text-slate-200 flex items-center gap-2.5">
          <i class="fas fa-gamepad text-sky-400 w-5"></i> <span>Katalog Game</span>
        </router-link>
        <router-link to="/riwayat" @click="mobileMenuOpen = false" class="px-3 py-2.5 rounded-xl hover:bg-slate-900 text-slate-200 flex items-center gap-2.5">
          <i class="fas fa-receipt text-sky-400 w-5"></i> <span>Lacak Pesanan</span>
        </router-link>
        <router-link to="/modules" @click="mobileMenuOpen = false" class="px-3 py-2.5 rounded-xl hover:bg-slate-900 text-slate-200 flex items-center gap-2.5">
          <i class="fas fa-shield-halved text-sky-400 w-5"></i> <span>Admin Portal</span>
        </router-link>
      </div>

      <!-- Guest State Mobile Buttons -->
      <div v-if="!authStore.isAuthenticated" class="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
        <router-link to="/login" @click="mobileMenuOpen = false" class="py-2.5 text-center text-xs font-bold rounded-xl border border-slate-800 bg-slate-900 text-white flex items-center justify-center gap-1.5">
          <i class="fas fa-right-to-bracket text-xs"></i> <span>Masuk</span>
        </router-link>
        <router-link to="/register" @click="mobileMenuOpen = false" class="py-2.5 text-center text-xs font-bold rounded-xl bg-sky-600 text-white flex items-center justify-center gap-1.5">
          <i class="fas fa-user-plus text-xs"></i> <span>Daftar</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const mobileMenuOpen = ref(false);
</script>
