<template>
  <div class="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6">
    <div class="w-16 h-16 rounded-3xl bg-sky-950/80 border border-sky-800 text-sky-400 flex items-center justify-center text-2xl mx-auto animate-spin">
      <i class="fas fa-circle-notch"></i>
    </div>

    <div class="space-y-2">
      <h2 class="text-xl font-black text-white">Memproses Autentikasi...</h2>
      <p class="text-xs text-slate-400 leading-relaxed">
        Menghubungkan akun Google Anda dengan aman ke sistem MPTopUp. Mohon tunggu sejenak.
      </p>
    </div>

    <div v-if="errorMessage" class="p-4 rounded-2xl bg-rose-950/50 border border-rose-800/80 text-rose-300 text-xs">
      {{ errorMessage }}
      <div class="mt-3">
        <router-link to="/login" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold inline-block">
          Kembali ke Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const router = useRouter();
const authStore = useAuthStore();
const errorMessage = ref('');

onMounted(async () => {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (session) {
        authStore.session = session;
        authStore.user = session.user;
        await authStore.fetchProfile(session.user.id);
        router.replace('/');
      } else {
        // Cek kembali listener jika hash fragment sedang diproses
        setTimeout(async () => {
          const { data: { session: retrySession } } = await supabase.auth.getSession();
          if (retrySession) {
            authStore.session = retrySession;
            authStore.user = retrySession.user;
            await authStore.fetchProfile(retrySession.user.id);
            router.replace('/');
          } else {
            router.replace('/login');
          }
        }, 1500);
      }
    } catch (err) {
      errorMessage.value = err.message || 'Gagal memproses sesi login Google.';
    }
  } else {
    router.replace('/');
  }
});
</script>
