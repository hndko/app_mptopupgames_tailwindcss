<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
    <!-- Success Banner -->
    <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-3">
      <div class="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-2xl mx-auto shadow-lg shadow-emerald-500/10">
        <i class="fas fa-circle-check"></i>
      </div>
      <h1 class="text-xl sm:text-2xl font-extrabold text-white">Pesanan Berhasil Dibuat!</h1>
      <p class="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
        Silakan selesaikan pembayaran sesuai rincian di bawah ini untuk memproses item otomatis.
      </p>
    </div>

    <!-- Printable Invoice Receipt Box -->
    <div id="printableInvoice" class="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      <!-- Invoice Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <span class="text-[10px] uppercase tracking-wider font-bold text-slate-400">Nomor Pesanan</span>
          <div class="flex items-center gap-2 mt-0.5">
            <span class="text-lg sm:text-xl font-mono font-black text-sky-400">{{ order.id }}</span>
            <button type="button" @click="copyOrderId" class="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 border border-slate-700" title="Salin ID Pesanan">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>

        <div class="sm:text-right">
          <span class="text-[10px] uppercase tracking-wider font-bold text-slate-400">Status Transaksi</span>
          <div class="mt-0.5">
            <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold inline-flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {{ order.status || 'Selesai' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Transaction Line Details -->
      <div class="space-y-3 text-xs sm:text-sm">
        <div class="flex justify-between py-2 border-b border-slate-800/60">
          <span class="text-slate-400">Waktu Transaksi</span>
          <span class="font-semibold text-white">{{ order.date }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-slate-800/60">
          <span class="text-slate-400">Judul Game</span>
          <span class="font-bold text-white">{{ order.game ? order.game.title : 'Mobile Legends' }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-slate-800/60">
          <span class="text-slate-400">Akun / User ID</span>
          <span class="font-mono font-bold text-white">{{ order.userId }} {{ order.zoneId ? `(${order.zoneId})` : '' }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-slate-800/60">
          <span class="text-slate-400">Paket Item</span>
          <span class="font-bold text-white">{{ order.product ? order.product.name : '250 Diamonds' }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-slate-800/60">
          <span class="text-slate-400">Saluran Pembayaran</span>
          <span class="font-bold text-white">{{ order.payment ? order.payment.name : 'QRIS' }}</span>
        </div>
        <div class="flex justify-between py-2 border-b border-slate-800/60">
          <span class="text-slate-400">WhatsApp Notifikasi</span>
          <span class="font-mono text-white">{{ order.whatsapp || '081234567890' }}</span>
        </div>
        <div class="flex justify-between pt-3 text-sm sm:text-base">
          <span class="font-bold text-white">Total Tagihan Pembayaran</span>
          <span class="font-extrabold text-sky-400 text-base sm:text-lg">
            Rp {{ (order.total || 0).toLocaleString('id-ID') }}
          </span>
        </div>
      </div>

      <!-- QRIS / Barcode Display -->
      <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center space-y-3">
        <p class="text-xs font-bold text-slate-300">Scan Kode QRIS Pembayaran</p>
        <div class="w-48 h-48 bg-white p-3 rounded-2xl mx-auto shadow-xl flex items-center justify-center border-2 border-slate-700">
          <img src="/images/payments/qris-code.svg" alt="Barcode QRIS" class="w-full h-full object-contain">
        </div>
        <p class="text-[11px] text-slate-400">Mendukung GoPay, OVO, DANA, ShopeePay, LinkAja, BCA Mobile, Livin', dan semua aplikasi perbankan.</p>
      </div>

      <!-- Drag & Drop Upload Payment Proof with Live Preview List -->
      <div class="border-t border-slate-800 pt-6">
        <DragDropUpload 
          label="Unggah Bukti Transfer Tambahan (Opsional)" 
          hint="Format JPG, PNG, atau PDF (Maks. 5MB) untuk arsip"
          @update:files="onProofUploaded"
        />
      </div>

      <!-- Action Buttons -->
      <div class="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button type="button" @click="printReceipt" class="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors">
          <i class="fas fa-print text-xs"></i> <span>Cetak Bukti Transaksi</span>
        </button>
        <router-link to="/produk" class="py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors">
          <i class="fas fa-cart-plus text-xs"></i> <span>Top Up Game Lain</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useOrdersStore } from '@/stores/ordersStore';
import DragDropUpload from '@/components/common/DragDropUpload.vue';

const route = useRoute();
const ordersStore = useOrdersStore();

const order = computed(() => {
  const queryId = route.query.id;
  return ordersStore.getOrderById(queryId);
});

function copyOrderId() {
  if (order.value && order.value.id) {
    navigator.clipboard.writeText(order.value.id);
    alert('Nomor Pesanan ' + order.value.id + ' berhasil disalin!');
  }
}

function printReceipt() {
  window.print();
}

function onProofUploaded(files) {
  console.log('Bukti pembayaran berhasil diunggah:', files);
}
</script>
