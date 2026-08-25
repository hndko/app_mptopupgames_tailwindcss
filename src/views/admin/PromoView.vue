<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 class="text-lg font-bold text-white">Manajemen Promo &amp; Kupon Diskon</h2>
        <p class="text-xs text-slate-400">Atur kode voucher diskon dan event promosi transaksi top up.</p>
      </div>

      <button 
        type="button" 
        @click="openAddPromo"
        class="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-600/20 transition-all"
      >
        <i class="fas fa-plus text-xs"></i> <span>Buat Kupon Baru</span>
      </button>
    </div>

    <!-- Data Table Container with # numbering & icon-only action -->
    <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-300">
          <thead class="bg-slate-950/80 text-slate-400 uppercase font-bold border-b border-slate-800 text-[11px]">
            <tr>
              <th scope="col" class="py-3.5 px-4 text-center w-12">#</th>
              <th scope="col" class="py-3.5 px-4">Nama Program</th>
              <th scope="col" class="py-3.5 px-4">Kode Kupon</th>
              <th scope="col" class="py-3.5 px-4">Tipe &amp; Nilai</th>
              <th scope="col" class="py-3.5 px-4">Periode Aktif</th>
              <th scope="col" class="py-3.5 px-4 text-center">Status</th>
              <th scope="col" class="py-3.5 px-4 text-center w-16">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/80">
            <tr v-for="(p, idx) in promoStore.promos" :key="p.code" class="hover:bg-slate-800/40 transition-colors">
              <td class="py-3 px-4 font-mono text-slate-400 text-center font-bold">{{ idx + 1 }}</td>
              <td class="py-3 px-4 font-bold text-white">{{ p.name }}</td>
              <td class="py-3 px-4 font-mono font-bold text-amber-400">{{ p.code }}</td>
              <td class="py-3 px-4 text-sky-400 font-semibold">{{ p.type }} &bull; {{ p.value }}</td>
              <td class="py-3 px-4 text-slate-400">{{ p.period }}</td>
              <td class="py-3 px-4 text-center">
                <span :class="[p.status === 'Aktif' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : p.status === 'Dijadwalkan' ? 'bg-sky-500/20 text-sky-400 border-sky-500/40' : 'bg-slate-800 text-slate-400 border-slate-700', 'px-2.5 py-0.5 rounded-full border text-[10px] font-bold']">
                  {{ p.status }}
                </span>
              </td>
              <td class="py-3 px-4 text-center">
                <button type="button" @click="deletePromo(idx)" class="w-8 h-8 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-400 hover:text-white inline-flex items-center justify-center transition-colors mx-auto" title="Hapus Promo" aria-label="Hapus Promo">
                  <i class="fas fa-trash text-xs"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Promo Modal -->
    <Modal :is-open="promoModalOpen" title="Buat Kupon Promo Baru" icon="fas fa-tags" @close="promoModalOpen = false">
      <form @submit.prevent="savePromo" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Nama Program Promo</label>
          <div class="relative">
            <i class="fas fa-bullhorn absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
            <input type="text" v-model="formTitle" required placeholder="Contoh: Diskon Gajian Akhir Bulan" class="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Kode Voucher</label>
            <div class="relative">
              <i class="fas fa-tag absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
              <input type="text" v-model="formCode" required placeholder="GAJIAN20" class="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs uppercase font-mono focus:ring-2 focus:ring-sky-500">
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Tipe Diskon</label>
            <div class="relative">
              <i class="fas fa-percent absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
              <select v-model="formType" class="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500">
                <option value="Persentase">Persentase (%)</option>
                <option value="Nominal">Nominal Tetap (Rp)</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Besaran Potongan</label>
          <div class="relative">
            <i class="fas fa-money-bill absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
            <input type="text" v-model="formVal" required placeholder="Contoh: 15% atau Rp 10.000" class="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500">
          </div>
        </div>

        <div class="pt-2 flex justify-end gap-2">
          <button type="button" @click="promoModalOpen = false" class="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs flex items-center gap-1.5">
            <i class="fas fa-times text-xs"></i> <span>Batal</span>
          </button>
          <button type="submit" class="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5">
            <i class="fas fa-check text-xs"></i> <span>Simpan Kupon</span>
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePromoStore } from '@/stores/promoStore';
import Modal from '@/components/common/Modal.vue';

const promoStore = usePromoStore();

const promoModalOpen = ref(false);
const formTitle = ref('');
const formCode = ref('');
const formType = ref('Persentase');
const formVal = ref('');

function openAddPromo() {
  formTitle.value = '';
  formCode.value = '';
  formType.value = 'Persentase';
  formVal.value = '';
  promoModalOpen.value = true;
}

function savePromo() {
  promoStore.addPromo({
    name: formTitle.value,
    code: formCode.value.toUpperCase(),
    type: formType.value,
    value: formVal.value,
    rate: 0.15,
    maxDiscount: 15000,
    period: "25 Agu - 30 Sep 2026",
    status: "Aktif",
    banner: "/images/promo/promo-mlbb.svg"
  });
  promoModalOpen.value = false;
}

function deletePromo(idx) {
  if (confirm('Hapus kupon promo ini?')) {
    promoStore.deletePromo(idx);
  }
}
</script>
