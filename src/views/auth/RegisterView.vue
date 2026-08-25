<template>
  <div class="min-h-[calc(100vh-160px)] flex items-center justify-center p-4 sm:p-6">
    <div class="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <div class="text-center space-y-2">
        <router-link to="/" class="inline-flex items-center gap-2 text-white font-extrabold text-xl">
          <img src="/images/logo-icon.svg" alt="MPTopUp Logo" class="w-8 h-8 rounded-xl shadow-md">
          <span>MP<span class="text-sky-400">TopUp</span></span>
        </router-link>
        <h1 class="text-xl sm:text-2xl font-black text-white">Daftar Akun Baru</h1>
        <p class="text-xs text-slate-400">Nikmati promo diskon member dan transaksi top up lebih cepat.</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="regName" class="block text-xs font-semibold text-slate-300 mb-1">
            Nama Lengkap
          </label>
          <div class="relative">
            <i class="fas fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
            <input 
              type="text" 
              id="regName" 
              v-model="name" 
              required 
              placeholder="Contoh: Budi Santoso"
              class="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-sky-500"
            >
          </div>
        </div>

        <div>
          <label for="regEmail" class="block text-xs font-semibold text-slate-300 mb-1">
            Alamat Email
          </label>
          <div class="relative">
            <i class="fas fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
            <input 
              type="email" 
              id="regEmail" 
              v-model="email" 
              required 
              placeholder="nama@email.com"
              class="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-sky-500"
            >
          </div>
        </div>

        <div>
          <label for="regWa" class="block text-xs font-semibold text-slate-300 mb-1">
            Nomor WhatsApp Aktif
          </label>
          <div class="relative">
            <i class="fab fa-whatsapp absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 text-xs pointer-events-none"></i>
            <input 
              type="tel" 
              id="regWa" 
              v-model="phone" 
              required 
              placeholder="081234567890"
              class="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-sky-500"
            >
          </div>
        </div>

        <div>
          <label for="regPass" class="block text-xs font-semibold text-slate-300 mb-1">
            Kata Sandi
          </label>
          <div class="relative">
            <i class="fas fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
            <input 
              :type="showPassword ? 'text' : 'password'" 
              id="regPass" 
              v-model="password" 
              required 
              placeholder="Minimal 8 karakter unik"
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

        <div class="flex items-start gap-2 pt-1">
          <input type="checkbox" id="terms" required class="mt-1 rounded bg-slate-800 border-slate-700 text-sky-600 focus:ring-sky-500 cursor-pointer">
          <label for="terms" class="text-[11px] text-slate-400 leading-tight">
            Saya menyetujui <a href="#" class="text-sky-400 hover:underline">Syarat &amp; Ketentuan</a> serta <a href="#" class="text-sky-400 hover:underline">Kebijakan Privasi</a> MPTopUp.
          </label>
        </div>

        <button 
          type="submit" 
          class="w-full h-11 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 transition-all"
        >
          <i class="fas fa-user-plus text-xs"></i> <span>Daftar Akun Sekarang</span>
        </button>
      </form>

      <p class="text-center text-xs text-slate-400">
        Sudah memiliki akun? 
        <router-link to="/login" class="text-sky-400 hover:text-sky-300 font-bold">Masuk di sini</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const showPassword = ref(false);

function handleRegister() {
  alert('Pendaftaran berhasil untuk ' + name.value);
  router.push('/login');
}
</script>
