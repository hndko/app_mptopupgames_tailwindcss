<template>
  <div class="min-h-[calc(100vh-160px)] flex items-center justify-center p-4 sm:p-6">
    <div class="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div class="text-center space-y-2">
        <router-link to="/" class="inline-flex items-center gap-2 text-white font-extrabold text-xl">
          <img src="/images/logo-icon.svg" alt="MPTopUp Logo" class="w-8 h-8 rounded-xl shadow-md">
          <span>MP<span class="text-sky-400">TopUp</span></span>
        </router-link>
        <h1 class="text-xl sm:text-2xl font-black text-white">Selamat Datang Kembali</h1>
        <p class="text-xs text-slate-400">Masuk untuk melihat riwayat pembelian dan cashback eksklusif.</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="loginEmail" class="block text-xs font-semibold text-slate-300 mb-1">
            Alamat Email / Nomor HP
          </label>
          <div class="relative">
            <i class="fas fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
            <input 
              type="text" 
              id="loginEmail" 
              v-model="email" 
              required 
              placeholder="nama@email.com atau 0812xxxx"
              class="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-sky-500"
            >
          </div>
        </div>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label for="loginPassword" class="block text-xs font-semibold text-slate-300">
              Kata Sandi
            </label>
            <a href="#" class="text-[11px] text-sky-400 hover:text-sky-300">Lupa Sandi?</a>
          </div>
          <div class="relative">
            <i class="fas fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="loginPassword" 
              v-model="password" 
              required 
              placeholder="Minimal 8 karakter"
              class="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-sky-500"
            >
            <button 
              type="button" 
              @click="showPassword = !showPassword" 
              class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              title="Lihat Kata Sandi"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          class="w-full h-11 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 transition-all"
        >
          <i class="fas fa-right-to-bracket text-xs"></i> <span>Masuk ke Akun</span>
        </button>

        <div class="relative my-4">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-800"></div></div>
          <div class="relative flex justify-center text-[10px] uppercase font-bold text-slate-500">
            <span class="bg-slate-900 px-3">Atau Masuk Cepat</span>
          </div>
        </div>

        <button 
          type="button" 
          @click="handleGoogleLogin"
          class="w-full h-11 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <i class="fab fa-google text-rose-500 text-sm"></i>
          <span>Lanjutkan dengan Google</span>
        </button>
      </form>

      <p class="text-center text-xs text-slate-400">
        Belum memiliki akun? 
        <router-link to="/register" class="text-sky-400 hover:text-sky-300 font-bold">Daftar Sekarang</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const showPassword = ref(false);

function handleLogin() {
  alert('Berhasil masuk sebagai ' + email.value);
  router.push('/');
}

function handleGoogleLogin() {
  alert('Berhasil masuk via Google');
  router.push('/');
}
</script>
