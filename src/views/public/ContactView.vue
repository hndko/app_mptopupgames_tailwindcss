<template>
  <div class="space-y-12 sm:space-y-16 pb-16">
    <!-- Header Hero Section -->
    <section class="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-10 text-center shadow-2xl">
      <div class="max-w-3xl mx-auto space-y-3">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black tracking-wider uppercase">
          <i class="fas fa-headset"></i>
          <span>Layanan Bantuan Pelanggan 24 Jam</span>
        </div>
        <h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Ada Kendala? <span class="text-emerald-400">Hubungi Kami</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Tim Customer Service MPTopUp siap membantu Anda 24 jam nonstop setiap hari untuk kendala top up, verifikasi pesanan, maupun kerja sama bisnis.
        </p>
      </div>
    </section>

    <!-- Quick Support Channels Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <!-- WhatsApp CS -->
      <a 
        href="https://wa.me/6281234567890?text=Halo%20CS%20MPTopUp,%20saya%20butuh%20bantuan" 
        target="_blank" 
        class="bg-slate-900 border border-slate-800 hover:border-emerald-500/60 p-6 rounded-3xl space-y-3 shadow-xl transition-all group btn-press"
      >
        <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
          <i class="fab fa-whatsapp"></i>
        </div>
        <div>
          <h3 class="text-sm font-black text-white group-hover:text-emerald-400 transition-colors">WhatsApp 24 Jam</h3>
          <p class="text-xs text-slate-400">Respon kilat di bawah 2 menit</p>
          <span class="text-xs font-mono font-bold text-emerald-400 mt-2 block">+62 812-3456-7890</span>
        </div>
      </a>

      <!-- Email Support -->
      <a 
        href="mailto:support@mptopup.com" 
        class="bg-slate-900 border border-slate-800 hover:border-sky-500/60 p-6 rounded-3xl space-y-3 shadow-xl transition-all group btn-press"
      >
        <div class="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
          <i class="fas fa-envelope"></i>
        </div>
        <div>
          <h3 class="text-sm font-black text-white group-hover:text-sky-400 transition-colors">Email Resmi</h3>
          <p class="text-xs text-slate-400">Untuk pertanyaan resmi &amp; refund</p>
          <span class="text-xs font-mono font-bold text-sky-400 mt-2 block">support@mptopup.com</span>
        </div>
      </a>

      <!-- Jam Operasional -->
      <div class="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3 shadow-xl">
        <div class="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-2xl">
          <i class="far fa-clock"></i>
        </div>
        <div>
          <h3 class="text-sm font-black text-white">Jam Operasional</h3>
          <p class="text-xs text-slate-400">Sistem Otomatis Server</p>
          <span class="text-xs font-bold text-amber-400 mt-2 block">24 Jam / 7 Hari Nonstop</span>
        </div>
      </div>

      <!-- Komunitas & Sosmed -->
      <div class="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3 shadow-xl">
        <div class="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-2xl">
          <i class="fab fa-discord"></i>
        </div>
        <div>
          <h3 class="text-sm font-black text-white">Media Sosial &amp; Info</h3>
          <p class="text-xs text-slate-400">Ikuti info giveaway &amp; event</p>
          <span class="text-xs font-bold text-indigo-400 mt-2 block">@mptopup.official</span>
        </div>
      </div>
    </div>

    <!-- Contact Form & FAQ Section -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Contact Message Form (7 cols) -->
      <div class="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div class="space-y-1">
          <h2 class="text-lg font-black text-white flex items-center gap-2">
            <i class="fas fa-paper-plane text-sky-400"></i>
            <span>Kirim Pesan Langsung</span>
          </h2>
          <p class="text-xs text-slate-400">Isi formulir berikut dan tim kami akan segera menghubungi Anda kembali.</p>
        </div>

        <div v-if="submitted" class="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-3">
          <i class="fas fa-circle-check text-emerald-400 text-lg shrink-0"></i>
          <div>
            <strong class="font-bold block">Pesan Berhasil Terkirim!</strong>
            <span>Terima kasih telah menghubungi kami. Tim kami akan segera menindaklanjuti pesan Anda.</span>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="contactName" class="block text-xs font-semibold text-slate-300 mb-1">
                Nama Lengkap
              </label>
              <div class="relative">
                <i class="fas fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
                <input 
                  type="text" 
                  id="contactName" 
                  v-model="form.name" 
                  required 
                  placeholder="Contoh: Budi Santoso"
                  class="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500"
                >
              </div>
            </div>

            <div>
              <label for="contactEmail" class="block text-xs font-semibold text-slate-300 mb-1">
                Alamat Email
              </label>
              <div class="relative">
                <i class="fas fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
                <input 
                  type="email" 
                  id="contactEmail" 
                  v-model="form.email" 
                  required 
                  placeholder="nama@email.com"
                  class="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500"
                >
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="contactPhone" class="block text-xs font-semibold text-slate-300 mb-1">
                Nomor WhatsApp
              </label>
              <div class="relative">
                <i class="fab fa-whatsapp absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 text-xs pointer-events-none"></i>
                <input 
                  type="tel" 
                  id="contactPhone" 
                  v-model="form.phone" 
                  required 
                  placeholder="081234567890"
                  class="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500 font-mono"
                >
              </div>
            </div>

            <div>
              <label for="contactCategory" class="block text-xs font-semibold text-slate-300 mb-1">
                Kategori Kendala
              </label>
              <div class="relative">
                <i class="fas fa-tag absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
                <select 
                  id="contactCategory" 
                  v-model="form.category" 
                  class="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500 appearance-none"
                >
                  <option value="Status Transaksi / Item Belum Masuk">Status Transaksi / Item Belum Masuk</option>
                  <option value="Kendala Pembayaran / QRIS">Kendala Pembayaran / QRIS</option>
                  <option value="Pertanyaan Promo & Kupon">Pertanyaan Promo & Kupon</option>
                  <option value="Kerja Sama Bisnis / Reseller">Kerja Sama Bisnis / Reseller</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label for="contactInvoice" class="block text-xs font-semibold text-slate-300 mb-1">
              Nomor Pesanan (Opsional)
            </label>
            <div class="relative">
              <i class="fas fa-hashtag absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
              <input 
                type="text" 
                id="contactInvoice" 
                v-model="form.orderId" 
                placeholder="Contoh: #MP884912"
                class="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500 font-mono"
              >
            </div>
          </div>

          <div>
            <label for="contactMessage" class="block text-xs font-semibold text-slate-300 mb-1">
              Isi Pesan / Rincian Kendala
            </label>
            <textarea 
              id="contactMessage" 
              v-model="form.message" 
              rows="4" 
              required 
              placeholder="Tuliskan kendala Anda secara lengkap..."
              class="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500 leading-relaxed resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            :disabled="loading"
            class="w-full h-12 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30 btn-press"
          >
            <i v-if="loading" class="fas fa-circle-notch animate-spin text-xs"></i>
            <i v-else class="fas fa-paper-plane text-xs"></i>
            <span>{{ loading ? 'Mengirim Pesan...' : 'Kirim Pesan Bantuan' }}</span>
          </button>
        </form>
      </div>

      <!-- FAQ & Info Box (5 cols) -->
      <div class="lg:col-span-5 space-y-6">
        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
          <h3 class="text-base font-black text-white flex items-center gap-2">
            <i class="fas fa-circle-question text-sky-400"></i>
            <span>Pertanyaan Populer (FAQ)</span>
          </h3>

          <div class="space-y-3 text-xs">
            <details class="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 group cursor-pointer">
              <summary class="font-bold text-slate-200 list-none flex justify-between items-center">
                <span>Berapa lama proses top up?</span>
                <i class="fas fa-chevron-down text-slate-500 group-open:rotate-180 transition-transform text-[10px]"></i>
              </summary>
              <p class="text-slate-400 mt-2 leading-relaxed">
                Seluruh transaksi top up diproses secara otomatis oleh sistem dalam waktu 1 hingga 60 detik setelah pembayaran terkonfirmasi.
              </p>
            </details>

            <details class="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 group cursor-pointer">
              <summary class="font-bold text-slate-200 list-none flex justify-between items-center">
                <span>Bagaimana jika salah memasukkan ID akun game?</span>
                <i class="fas fa-chevron-down text-slate-500 group-open:rotate-180 transition-transform text-[10px]"></i>
              </summary>
              <p class="text-slate-400 mt-2 leading-relaxed">
                Segera hubungi CS WhatsApp kami dengan menyertakan nomor pesanan sebelum transaksi selesai diproses server game.
              </p>
            </details>

            <details class="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 group cursor-pointer">
              <summary class="font-bold text-slate-200 list-none flex justify-between items-center">
                <span>Apakah top up di MPTopUp aman dan legal?</span>
                <i class="fas fa-chevron-down text-slate-500 group-open:rotate-180 transition-transform text-[10px]"></i>
              </summary>
              <p class="text-slate-400 mt-2 leading-relaxed">
                100% Legal dan Resmi dari publisher game (Moonton, Riot Games, Garena, Tencent, HoYoverse). Akun Anda dijamin aman dari risiko banned.
              </p>
            </details>
          </div>
        </div>

        <div class="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/50 to-slate-900 border border-emerald-800/60 space-y-3">
          <h4 class="text-sm font-black text-emerald-400 flex items-center gap-2">
            <i class="fab fa-whatsapp text-base"></i>
            <span>Butuh Tindakan Darurat?</span>
          </h4>
          <p class="text-xs text-slate-300 leading-relaxed">
            Klik tombol di bawah untuk langsung terhubung ke Customer Support WhatsApp tanpa perlu menunggu balasan email.
          </p>
          <a 
            href="https://wa.me/6281234567890?text=Halo%20Admin%20MPTopUp,%20saya%20ada%20kendala%20pesanan" 
            target="_blank" 
            class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 btn-press"
          >
            <i class="fab fa-whatsapp"></i>
            <span>Chat WhatsApp Sekarang</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(false);
const submitted = ref(false);

const form = ref({
  name: '',
  email: '',
  phone: '',
  category: 'Status Transaksi / Item Belum Masuk',
  orderId: '',
  message: ''
});

async function handleSubmit() {
  loading.value = true;
  await new Promise(r => setTimeout(r, 600));
  loading.value = false;
  submitted.value = true;
  form.value = {
    name: '',
    email: '',
    phone: '',
    category: 'Status Transaksi / Item Belum Masuk',
    orderId: '',
    message: ''
  };
}
</script>
