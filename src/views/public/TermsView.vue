<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 pb-16">
    <!-- Breadcrumb Navigation -->
    <nav class="flex items-center gap-2 text-xs text-slate-400" aria-label="Breadcrumb">
      <router-link to="/" class="hover:text-sky-400 flex items-center gap-1">
        <i class="fas fa-house text-[11px]"></i> <span>Beranda</span>
      </router-link>
      <i class="fas fa-chevron-right text-[10px] text-slate-600"></i>
      <span class="text-white font-medium">Syarat &amp; Ketentuan Layanan</span>
    </nav>

    <!-- Header & Interactive Fast Track Banner -->
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
      <div class="max-w-2xl space-y-2 relative z-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[11px] font-bold uppercase tracking-wider">
          <i class="fas fa-scale-balanced animate-pulse"></i> <span>Dokumen Legalitas &amp; Kebijakan Transaksi</span>
        </div>
        <h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Syarat &amp; Ketentuan <span class="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-500 bg-clip-text text-transparent">(Terms &amp; Conditions)</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Harap membaca syarat dan ketentuan ini dengan saksama sebelum melakukan pemesanan transaksi top up game dan pembelian voucher digital di MPTopUp.
        </p>
      </div>

      <!-- Quick Fast Search Box inside Hero -->
      <form @submit.prevent class="relative z-10 max-w-2xl bg-slate-950/80 border border-slate-700/80 rounded-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2 shadow-inner">
        <div class="relative flex-1 w-full">
          <i class="fas fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i>
          <input 
            type="search" 
            v-model="searchQuery" 
            placeholder="Cari pasal ketentuan (cth: refund, pembayaran, id akun, privasi)..." 
            class="w-full h-11 pl-9 pr-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-sky-500 transition-all font-mono"
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
          <span class="text-xs font-semibold">Keabsahan Produk</span>
          <div class="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center justify-center">
            <i class="fas fa-shield-check text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-emerald-400">100% Resmi &amp; Legal</p>
        <p class="text-[11px] text-emerald-400 font-semibold">Jalur distribusi publisher resmi tanpa risiko ban</p>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl interactive-card">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Kecepatan SLA Pengiriman</span>
          <div class="w-8 h-8 rounded-xl bg-sky-950/60 border border-sky-800 text-sky-400 flex items-center justify-center">
            <i class="fas fa-bolt text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-white">1 - 60 Detik</p>
        <p class="text-[11px] text-sky-400 font-semibold">Otomatisasi gateway payment &amp; server game</p>
      </div>

      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl interactive-card">
        <div class="flex items-center justify-between text-slate-400">
          <span class="text-xs font-semibold">Garansi &amp; Pengembalian Dana</span>
          <div class="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-400 flex items-center justify-center">
            <i class="fas fa-rotate-left text-xs"></i>
          </div>
        </div>
        <p class="text-2xl font-black text-amber-400">Garansi Refund 100%</p>
        <p class="text-[11px] text-amber-400 font-semibold">Jika transaksi gagal akibat kendala sistem</p>
      </div>
    </div>

    <!-- Quick Navigation Category Toolbar -->
    <div id="termsNav" class="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
      <div class="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
        <button
          type="button"
          v-for="section in termsSections"
          :key="section.id"
          @click="activeSection = section.id"
          :class="[
            activeSection === section.id 
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 font-black' 
              : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 font-bold border border-slate-700/80'
          ]"
          class="h-10 px-4 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-1.5 btn-press"
        >
          <i :class="section.icon" class="text-[11px]"></i>
          <span>{{ section.shortTitle }}</span>
        </button>
      </div>

      <span class="text-xs text-slate-400 font-mono shrink-0">
        Terakhir Diperbarui: <strong class="text-slate-300">25 Agustus 2026</strong>
      </span>
    </div>

    <!-- Main Terms & Conditions Accordion / Detail Container -->
    <div class="space-y-6">
      <div 
        v-for="item in filteredSections" 
        :key="item.id" 
        :id="'section-' + item.id"
        class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 hover:border-slate-700 transition-colors"
      >
        <div class="flex items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center text-lg font-bold shrink-0">
              <i :class="item.icon"></i>
            </div>
            <div>
              <h2 class="text-base sm:text-lg font-black text-white">{{ item.title }}</h2>
              <p class="text-xs text-slate-400">Pasal {{ item.number }} • Regulasi Standar Operasional MPTopUp</p>
            </div>
          </div>
          <span class="px-3 py-1 rounded-full bg-slate-800 text-sky-400 border border-slate-700 text-[10px] font-mono font-bold shrink-0">
            BAB {{ item.number }}
          </span>
        </div>

        <!-- Section Content -->
        <div class="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3" v-html="item.content"></div>
      </div>

      <!-- Empty Search Result State -->
      <div v-if="filteredSections.length === 0" class="bg-slate-900 border border-slate-800 rounded-3xl p-14 text-center shadow-2xl space-y-3">
        <div class="w-14 h-14 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto text-xl mb-3">
          <i class="fas fa-scale-balanced"></i>
        </div>
        <h3 class="text-base font-bold text-white">Tidak Ada Pasal Ketentuan yang Cocok</h3>
        <p class="text-xs text-slate-400">Coba ubah kata kunci pencarian Anda untuk menemukan topik syarat &amp; ketentuan yang diinginkan.</p>
      </div>
    </div>

    <!-- Help & Support Callout Banner (Matching Lacak Standard) -->
    <div class="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/30 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
      <div class="space-y-1 text-center sm:text-left">
        <h3 class="text-base sm:text-lg font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
          <i class="fas fa-circle-question text-sky-400 text-xl"></i> Ada Pertanyaan Terkait Ketentuan Layanan?
        </h3>
        <p class="text-xs text-slate-400">Tim Customer Service kami siap melayani pertanyaan seputar kebijakan transaksi 24 jam nonstop.</p>
      </div>

      <router-link 
        to="/hubungi-kami" 
        class="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-600/20 transition-all shrink-0 btn-press"
      >
        <i class="fas fa-headset text-base"></i> <span>Hubungi Layanan Bantuan</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const activeSection = ref('all');

const termsSections = [
  { id: 'all', shortTitle: 'Semua Ketentuan', icon: 'fas fa-list-check' },
  { id: 'umum', shortTitle: '1. Ketentuan Umum', icon: 'fas fa-shield' },
  { id: 'pembayaran', shortTitle: '2. Pembayaran & Invoice', icon: 'fas fa-credit-card' },
  { id: 'pengiriman', shortTitle: '3. Pengiriman & SLA', icon: 'fas fa-bolt' },
  { id: 'refund', shortTitle: '4. Kebijakan Refund', icon: 'fas fa-rotate-left' },
  { id: 'privasi', shortTitle: '5. Privasi & Data', icon: 'fas fa-lock' },
  { id: 'tanggungjawab', shortTitle: '6. Batasan Tanggung Jawab', icon: 'fas fa-handshake' }
];

const fullSections = [
  {
    id: 'umum',
    number: '01',
    title: 'Ketentuan Umum & Definisi Layanan',
    icon: 'fas fa-shield',
    content: `
      <p>1.1. <strong>MPTopUp</strong> adalah platform gerbang layanan digital (*digital gateway*) independen yang menyediakan fasilitas transaksi top up kredit game, voucher digital, dan item virtual resmi bagi konsumen di seluruh Indonesia.</p>
      <p>1.2. Dengan mengakses, mendaftar akun, atau melakukan transaksi pembelian di situs web MPTopUp, Pengguna secara sadar dan sukarela menyatakan telah membaca, memahami, serta menyetujui seluruh isi Syarat dan Ketentuan ini.</p>
      <p>1.3. Pengguna wajib berusia minimal 13 tahun atau memiliki izin dan pengawasan dari orang tua/wali hukum saat melakukan transaksi pembayaran secara daring.</p>
    `
  },
  {
    id: 'pembayaran',
    number: '02',
    title: 'Prosedur Pemesanan & Metode Pembayaran',
    icon: 'fas fa-credit-card',
    content: `
      <p>2.1. <strong>Validitas Data Akun Game</strong>: Pengguna bertanggung jawab penuh atas keakuratan pengisian User ID Game, Server ID / Zone ID, serta nomor WhatsApp kontak yang dimasukkan pada saat formulir pemesanan.</p>
      <p>2.2. <strong>Metode Pembayaran Resmi</strong>: Seluruh transaksi hanya sah apabila dilakukan melalui saluran pembayaran resmi yang disediakan sistem (QRIS, GoPay, DANA, OVO, ShopeePay, dan Virtual Account Bank BCA/Mandiri).</p>
      <p>2.3. <strong>Masa Berlaku Invoice</strong>: Setiap kode QRIS dan nomor tagihan memiliki batas waktu pembayaran selama 30 menit. Pembayaran yang dilakukan setelah masa kedaluwarsa tagihan berisiko tidak terproses secara otomatis oleh gerbang pembayaran.</p>
      <p>2.4. <strong>Nominal Unik & Pembayaran Pas</strong>: Pengguna wajib membayar persis sesuai dengan total nominal invoice tanpa pembulatan agar sistem verifikasi mutasi bank dapat mendeteksi pembayaran secara instan.</p>
    `
  },
  {
    id: 'pengiriman',
    number: '03',
    title: 'Pengiriman Item Game & Standar Layanan (SLA)',
    icon: 'fas fa-bolt',
    content: `
      <p>3.1. <strong>Kecepatan Pemrosesan</strong>: Transaksi diproses secara otomatis oleh sistem server gateway dalam waktu 1 hingga 60 detik setelah pembayaran diverifikasi sukses oleh penyedia pembayaran.</p>
      <p>3.2. <strong>Jadwal Maintenance Server</strong>: Apabila pihak publisher game resmi (seperti Moonton, Riot Games, Garena, atau HoYoverse) sedang menyelenggarakan pemeliharaan server (*maintenance*), pengiriman item akan ditunda sementara dan otomatis diselesaikan begitu server publisher normal kembali.</p>
      <p>3.3. <strong>Status Transaksi</strong>: Pengguna dapat memantau status eksekusi pesanan secara langsung melalui halaman <em>Lacak Pesanan</em> dengan memasukkan Nomor Pesanan (#MPxxxxxx).</p>
    `
  },
  {
    id: 'refund',
    number: '04',
    title: 'Kebijakan Pengembalian Dana (Refund Policy)',
    icon: 'fas fa-rotate-left',
    content: `
      <p>4.1. <strong>Jaminan Refund 100%</strong>: Pengembalian dana secara utuh (100%) dijamin diberikan apabila transaksi dinyatakan gagal (*Gagal Sistem*) dan diamond/item tidak terkirim akibat gangguan teknis permanen pada server MPTopUp atau kehabisan stok penyedia.</p>
      <p>4.2. <strong>Kesalahan Pengisian User ID oleh Pelanggan</strong>: MPTopUp <em>tidak dapat</em> memberikan pengembalian dana atau pembatalan transaksi apabila item game telah sukses terkirim ke User ID tujuan akibat kelalaian pembeli salah mengetik ID akun.</p>
      <p>4.3. <strong>Mekanisme Pencairan Refund</strong>: Pengajuan refund yang memenuhi syarat akan diproses oleh tim keuangan kami melalui transfer bank atau saldo E-Wallet dalam waktu maksimal 1x24 jam kerja setelah verifikasi data kepemilikan invoice.</p>
    `
  },
  {
    id: 'privasi',
    number: '05',
    title: 'Privasi, Keamanan Data & Kerahasiaan Akun',
    icon: 'fas fa-lock',
    content: `
      <p>5.1. <strong>Kerahasiaan Kredensial</strong>: MPTopUp <strong>TIDAK PERNAH</strong> meminta password, kode OTP, PIN, atau kredensial login akun game milik Pengguna. Transaksi top up resmi kami hanya membutuhkan User ID dan Server ID publik.</p>
      <p>5.2. <strong>Enkripsi & Perlindungan Data</strong>: Data nomor telepon WhatsApp dan informasi transaksi dienkripsi menggunakan protokol standar industri TLS 1.3 serta dilindungi dari akses pihak ketiga yang tidak berwenang.</p>
      <p>5.3. <strong>Penyensoran Data Publik (Data Masking)</strong>: Pada halaman publik seperti <em>Leaderboard Top Spender</em> dan <em>Lacak Pesanan</em>, nomor telepon dan nama pengguna disamarkan (*masked*) demi mematuhi prinsip perlindungan privasi data konsumen.</p>
    `
  },
  {
    id: 'tanggungjawab',
    number: '06',
    title: 'Batasan Tanggung Jawab & Hukum yang Berlaku',
    icon: 'fas fa-handshake',
    content: `
      <p>6.1. <strong>Hak Kekayaan Intelektual</strong>: Semua merek dagang, logo game, dan karakter (seperti Mobile Legends, Valorant, Free Fire, PUBG Mobile, Genshin Impact) adalah hak milik sah dari masing-masing publisher dan pemilik hak cipta resmi.</p>
      <p>6.2. <strong>Penyalahgunaan & Anti-Fraud</strong>: Penggunaan kartu kredit curian, eksploitasi bug sistem, atau metode pencucian uang (*money laundering*) akan langsung dilaporkan kepada pihak penegak hukum yang berwenang beserta penutupan permanen akses akun.</p>
      <p>6.3. <strong>Hukum yang Berlaku</strong>: Syarat dan Ketentuan ini diatur dan ditafsirkan sesuai dengan ketentuan hukum yang berlaku di Negara Kesatuan Republik Indonesia (NKRI).</p>
      <p>6.4. <strong>Perubahan Ketentuan</strong>: MPTopUp berhak memperbarui klausul syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya demi meningkatkan standar kepatuhan dan keamanan konsumen.</p>
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
