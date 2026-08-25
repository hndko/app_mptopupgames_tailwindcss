<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 pb-16">
    <!-- Breadcrumb Navigation -->
    <nav class="flex items-center gap-2 text-xs text-slate-400" aria-label="Breadcrumb">
      <router-link to="/" class="hover:text-sky-400 flex items-center gap-1">
        <i class="fas fa-house text-[11px]"></i> <span>Beranda</span>
      </router-link>
      <i class="fas fa-chevron-right text-[10px] text-slate-600"></i>
      <span class="text-white font-medium">Kebijakan Privasi (Privacy Policy)</span>
    </nav>

    <!-- Header & Interactive Fast Track Banner -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
      <div class="max-w-2xl space-y-2 relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
          <i class="fas fa-user-shield animate-pulse"></i> <span>Perlindungan &amp; Kerahasiaan Data Konsumen</span>
        </div>
        <h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Kebijakan Privasi <span class="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">(Privacy Policy)</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Komitmen MPTopUp dalam menjaga keamanan data pribadi, integritas informasi transaksi, dan kerahasiaan akun game seluruh pengguna.
        </p>
      </div>

      <!-- Quick Fast Search Box inside Hero -->
      <form @submit.prevent class="relative z-10 max-w-2xl bg-slate-950/80 border border-slate-700/80 rounded-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2 shadow-inner">
        <div class="relative flex-1 w-full">
          <i class="fas fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
          <input 
            type="search" 
            v-model="searchQuery" 
            placeholder="Cari topik privasi (cth: enkripsi, cookies, whatsapp, data akun)..." 
            class="w-full h-11 pl-9 pr-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-emerald-500 transition-all font-mono"
          />
        </div>
        <button 
          type="button" 
          v-if="searchQuery"
          @click="searchQuery = ''"
          class="h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all shrink-0"
        >
          Reset Filter
        </button>
      </form>
    </div>

    <!-- 3 KPI Status Metric Counters (Matching Lacak Standard) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl interactive-card">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Standar Enkripsi &amp; Proteksi</span>
          <div class="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center justify-center">
            <i class="fas fa-lock text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-emerald-400">TLS 1.3 / AES-256</p>
        <p class="text-[11px] text-emerald-400 font-semibold">Terkoneksi aman dengan enkripsi bank</p>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl interactive-card">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Keamanan Kredensial Akun</span>
          <div class="w-8 h-8 rounded-xl bg-sky-950/60 border border-sky-800 text-sky-400 flex items-center justify-center">
            <i class="fas fa-key text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-white">Nol Password &amp; OTP</p>
        <p class="text-[11px] text-sky-400 font-semibold">Kami tidak pernah meminta kredensial login</p>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl interactive-card">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Penyensoran Data Publik</span>
          <div class="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-400 flex items-center justify-center">
            <i class="fas fa-eye-slash text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-amber-400">100% Data Masked</p>
        <p class="text-[11px] text-amber-400 font-semibold">Nomor telepon &amp; nama tersensor aman di publik</p>
      </div>
    </div>

    <!-- Quick Navigation Category Toolbar -->
    <div id="privacyNav" class="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
      <div class="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
        <button
          type="button"
          v-for="section in privacySections"
          :key="section.id"
          @click="activeSection = section.id"
          :class="[
            activeSection === section.id 
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-black' 
              : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 font-bold border border-slate-700/80'
          ]"
          class="h-10 px-4 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-1.5 btn-press"
        >
          <i :class="section.icon" class="text-[11px]"></i>
          <span>{{ section.shortTitle }}</span>
        </button>
      </div>

      <span class="text-xs text-slate-400 font-mono shrink-0">
        Revisi Terakhir: <strong class="text-slate-300">25 Agustus 2026</strong>
      </span>
    </div>

    <!-- Main Privacy Sections Container -->
    <div class="space-y-6">
      <div 
        v-for="item in filteredSections" 
        :key="item.id" 
        :id="'privacy-' + item.id"
        class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 hover:border-slate-700 transition-colors"
      >
        <div class="flex items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-lg font-bold shrink-0">
              <i :class="item.icon"></i>
            </div>
            <div>
              <h2 class="text-base sm:text-lg font-black text-white">{{ item.title }}</h2>
              <p class="text-xs text-slate-400">Bagian {{ item.number }} • Standar Privasi Data Konsumen MPTopUp</p>
            </div>
          </div>
          <span class="px-3 py-1 rounded-full bg-slate-800 text-emerald-400 border border-slate-700 text-[10px] font-mono font-bold shrink-0">
            BAB {{ item.number }}
          </span>
        </div>

        <!-- Section Content -->
        <div class="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3" v-html="item.content"></div>
      </div>

      <!-- Empty Search Result State -->
      <div v-if="filteredSections.length === 0" class="bg-slate-900 border border-slate-800 rounded-3xl p-14 text-center shadow-2xl space-y-3">
        <div class="w-14 h-14 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto text-xl mb-3">
          <i class="fas fa-shield-halved"></i>
        </div>
        <h3 class="text-base font-bold text-white">Tidak Ada Topik Kebijakan yang Cocok</h3>
        <p class="text-xs text-slate-400">Coba ubah kata kunci pencarian Anda untuk menemukan informasi kebijakan privasi yang diinginkan.</p>
      </div>
    </div>

    <!-- Help & Support Callout Banner (Matching Lacak Standard) -->
    <div class="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
      <div class="space-y-1 text-center sm:text-left">
        <h3 class="text-base sm:text-lg font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
          <i class="fas fa-envelope-shield text-emerald-400 text-xl"></i> Pertanyaan Terkait Privasi Data Anda?
        </h3>
        <p class="text-xs text-slate-400">Petugas Perlindungan Data (DPO) kami siap menjawab permohonan hak data dan pertanyaan privasi Anda.</p>
      </div>

      <a 
        href="mailto:privacy@mptopup.com" 
        class="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all shrink-0 btn-press"
      >
        <i class="fas fa-envelope text-base"></i> <span>Hubungi Petugas DPO</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const activeSection = ref('all');

const privacySections = [
  { id: 'all', shortTitle: 'Semua Kebijakan', icon: 'fas fa-list-check' },
  { id: 'koleksi', shortTitle: '1. Data yang Dikumpulkan', icon: 'fas fa-database' },
  { id: 'penggunaan', shortTitle: '2. Penggunaan Data', icon: 'fas fa-sliders' },
  { id: 'keamanan', shortTitle: '3. Keamanan & Enkripsi', icon: 'fas fa-lock' },
  { id: 'pihakketiga', shortTitle: '4. Mitra Pembayaran Resmi', icon: 'fas fa-handshake' },
  { id: 'cookies', shortTitle: '5. Cookies & Pelacakan', icon: 'fas fa-cookie' },
  { id: 'hakpengguna', shortTitle: '6. Hak Akses & Hapus Data', icon: 'fas fa-user-gear' }
];

const fullSections = [
  {
    id: 'koleksi',
    number: '01',
    title: 'Informasi dan Data Pribadi yang Kami Kumpulkan',
    icon: 'fas fa-database',
    content: `
      <p>1.1. <strong>Identifikasi Game Publik</strong>: Kami mengumpulkan User ID Game, Server ID / Zone ID publik, dan Nickname in-game untuk keperluan validasi server dan pengiriman item virtual secara tepat sasaran.</p>
      <p>1.2. <strong>Data Kontak Transaksi</strong>: Nomor telepon WhatsApp dan alamat email yang Anda masukkan saat formulir checkout semata-mata digunakan untuk mengirimkan bukti invoice, tautan status transaksi real-time, dan verifikasi bantuan customer support.</p>
      <p>1.3. <strong>Informasi Otentikasi Member</strong>: Apabila Anda masuk menggunakan Google OAuth, sistem kami hanya membaca data nama profil, email terverifikasi, dan foto avatar publik yang diizinkan oleh akun Google Anda.</p>
      <p>1.4. <strong>Prinsip Nol Kredensial</strong>: MPTopUp <strong>TIDAK PERNAH</strong> meminta atau menyimpan kata sandi game, PIN rahasia, maupun kode One-Time Password (OTP) perbankan Anda.</p>
    `
  },
  {
    id: 'penggunaan',
    number: '02',
    title: 'Tujuan dan Pemanfaatan Data Pribadi',
    icon: 'fas fa-sliders',
    content: `
      <p>2.1. <strong>Eksekusi Pemrosesan Pesanan</strong>: Memproses tagihan pembayaran QRIS, E-Wallet, atau Virtual Account Bank serta meneruskan perintah top up otomatis ke server publisher game.</p>
      <p>2.2. <strong>Layanan Bantuan Pelanggan</strong>: Membantu investigasi kendala pesanan pending, verifikasi mutasi bayar, atau pemrosesan klaim pengembalian dana (*refund*).</p>
      <p>2.3. <strong>Pencegahan Kecurangan (Anti-Fraud)</strong>: Memantau pola transaksi tidak wajar, penyalahgunaan instrumen pembayaran, atau aktivitas bot yang merugikan ekosistem gamer.</p>
      <p>2.4. <strong>Notifikasi Program Promo</strong>: Mengirimkan pemberitahuan kupon diskon dan event reward spesial hanya bagi pengguna yang menyetujui langganan newsletter.</p>
    `
  },
  {
    id: 'keamanan',
    number: '03',
    title: 'Standar Keamanan, Proteksi & Enkripsi Data',
    icon: 'fas fa-lock',
    content: `
      <p>3.1. <strong>Enkripsi Transportasi Data (TLS 1.3)</strong>: Seluruh lalu lintas data antara peramban (*browser*) Anda dan server kami dienkripsi secara penuh dengan sertifikat SSL/TLS tingkat tinggi.</p>
      <p>3.2. <strong>Enkripsi Database Tingkat Lanjut (AES-256)</strong>: Informasi sensitif pada database PostgreSQL Supabase disimpan dalam format terenkripsi dengan kontrol hak akses ketat (*Row Level Security / RLS*).</p>
      <p>3.3. <strong>Sensor Data Publik (Data Masking)</strong>: Pada halaman publik seperti <em>Leaderboard Top Spender</em> dan <em>Lacak Pesanan</em>, nomor telepon (cth: <code>0812****8921</code>) dan nama pengguna disensor otomatis agar identitas Anda tetap terlindungi.</p>
    `
  },
  {
    id: 'pihakketiga',
    number: '04',
    title: 'Pembagian Data dengan Mitra Resmi Pihak Ketiga',
    icon: 'fas fa-handshake',
    content: `
      <p>4.1. <strong>Payment Gateway Berizin BI</strong>: Kami meneruskan informasi nomor invoice dan jumlah tagihan kepada gerbang pembayaran resmi berizin Bank Indonesia (seperti Midtrans / QRIS Aggregator) untuk memproses verifikasi transaksi secara aman.</p>
      <p>4.2. <strong>Distributor & Publisher Game Resmi</strong>: User ID dan Zone ID dikirimkan melalui koneksi API terenkripsi ke aggregator distributor game (seperti Digiflazz) guna pengisian diamond langsung ke akun game Anda.</p>
      <p>4.3. <strong>Kewajiban Hukum</strong>: Kami hanya akan membagikan data kepada pihak berwenang apabila diwajibkan secara sah berdasarkan perintah pengadilan atau undang-undang yang berlaku di Indonesia.</p>
      <p>4.4. <strong>Nol Penjualan Data</strong>: MPTopUp <strong>TIDAK AKAN PERNAH</strong> menjual, menyewakan, atau memperjualbelikan data pribadi konsumen kepada pihak pengiklan atau broker data manapun.</p>
    `
  },
  {
    id: 'cookies',
    number: '05',
    title: 'Kebijakan Cookies & Penyimpanan Sesi Lokal',
    icon: 'fas fa-cookie',
    content: `
      <p>5.1. <strong>Cookies Fungsional</strong>: Digunakan untuk mengingat preferensi tema gelap/terang, sesi login akun member aktif, dan riwayat nomor pesanan yang tersimpan di perangkat lokal Anda (*localStorage*).</p>
      <p>5.2. <strong>Analitik Kinerja</strong>: Mengukur kecepatan pemuatan halaman web dan performa sistem guna perbaikan stabilitas aplikasi secara berkelanjutan.</p>
      <p>5.3. <strong>Kendali Pengguna</strong>: Anda dapat menonaktifkan atau menghapus cookies melalui pengaturan peramban web Anda kapan saja.</p>
    `
  },
  {
    id: 'hakpengguna',
    number: '06',
    title: 'Hak Akses, Pembaruan & Penghapusan Data Pengguna',
    icon: 'fas fa-user-gear',
    content: `
      <p>6.1. <strong>Hak Akses & Koreksi</strong>: Member terdaftar berhak mengakses dan memperbarui data profil akun (nama lengkap, nomor telepon, dan preferensi) melalui menu profil akun.</p>
      <p>6.2. <strong>Hak Penghapusan Data (Right to be Forgotten)</strong>: Anda berhak mengajukan permohonan penutupan akun dan penghapusan data pribadi dengan menghubungi tim Customer Support atau mengirim email ke <code>privacy@mptopup.com</code>.</p>
      <p>6.3. <strong>Masa Retensi Data</strong>: Data rekam jejak invoice pembayaran disimpan selama periode tertentu sesuai dengan kewajiban regulasi pembukuan keuangan dan audit transaksi perpajakan yang berlaku.</p>
    `
  }
];

const filteredSections = computed(() => {
  let list = fullSections;
  
  if (activeSection.value !== 'all') {
    list = list.filter(s => s.id === activeSection.value);
  }

  if (!searchQuery.value.trim()) return list;

  const q = searchQuery.value.toLowerCase().trim();
  return list.filter(s => 
    s.title.toLowerCase().includes(q) ||
    s.content.toLowerCase().includes(q) ||
    s.shortTitle?.toLowerCase().includes(q)
  );
});
</script>
