<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 class="text-lg font-bold text-white">Katalog Game &amp; Manajemen SKU</h2>
        <p class="text-xs text-slate-400">Tambah game baru dan atur paket nominal diamond/kristal yang tersedia.</p>
      </div>

      <button 
        type="button" 
        @click="addGameModalOpen = true"
        class="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-600/20 transition-all"
      >
        <i class="fas fa-plus text-xs"></i> <span>Tambah Game Baru</span>
      </button>
    </div>

    <!-- Game List Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="(game, idx) in gamesStore.games" 
        :key="game.id"
        class="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4 flex flex-col justify-between"
      >
        <div class="space-y-3">
          <div class="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
            <img :src="game.banner" :alt="game.title" class="w-full h-full object-cover">
            <span class="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-900/90 text-sky-400 border border-slate-700 text-[10px] font-bold uppercase">
              {{ game.category }}
            </span>
          </div>

          <div>
            <h3 class="text-sm font-bold text-white">{{ game.title }}</h3>
            <p class="text-xs text-slate-400">{{ game.developer }} &bull; {{ (game.products || []).length }} Pilihan SKU</p>
          </div>

          <p class="text-xs text-slate-400 line-clamp-2">{{ game.description }}</p>
        </div>

        <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <button 
            type="button" 
            @click="openSkuModal(idx, game)" 
            class="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <i class="fas fa-layer-group text-xs"></i> <span>Kelola SKU ({{ (game.products || []).length }})</span>
          </button>
          <button 
            type="button" 
            @click="deleteGame(idx)" 
            class="w-9 h-9 rounded-xl bg-rose-950/40 hover:bg-rose-900 border border-rose-800/60 text-rose-400 hover:text-white flex items-center justify-center transition-colors" 
            title="Hapus Game" 
            aria-label="Hapus Game"
          >
            <i class="fas fa-trash text-xs"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Add Game Modal -->
    <Modal :is-open="addGameModalOpen" title="Tambah Game Baru" icon="fas fa-plus" @close="addGameModalOpen = false">
      <form @submit.prevent="saveNewGame" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Judul Game</label>
          <div class="relative">
            <i class="fas fa-gamepad absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
            <input type="text" v-model="newGameTitle" required placeholder="Contoh: EA Sports FC Mobile" class="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Publisher / Dev</label>
            <div class="relative">
              <i class="fas fa-building absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
              <input type="text" v-model="newGameDev" required placeholder="Electronic Arts" class="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500">
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Kategori</label>
            <div class="relative">
              <i class="fas fa-list absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
              <select v-model="newGameCategory" class="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500">
                <option value="Mobile">Mobile Game</option>
                <option value="PC">PC Game</option>
                <option value="Voucher">Voucher Digital</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Deskripsi Singkat</label>
          <div class="relative">
            <i class="fas fa-align-left absolute left-3.5 top-3.5 text-slate-500 text-xs pointer-events-none"></i>
            <textarea v-model="newGameDesc" rows="2" placeholder="Deskripsi ringkas layanan top up game..." class="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500"></textarea>
          </div>
        </div>

        <!-- Drag & Drop Uploader for Game Banner -->
        <DragDropUpload 
          label="Unggah Banner Gambar Game (Drag & Drop)" 
          hint="Format PNG/JPG/SVG (Rekomendasi 16:9)" 
          @update:files="onBannerUploaded" 
        />

        <div class="pt-2 flex justify-end gap-2">
          <button type="button" @click="addGameModalOpen = false" class="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs flex items-center gap-1.5">
            <i class="fas fa-times text-xs"></i> <span>Batal</span>
          </button>
          <button type="submit" class="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5">
            <i class="fas fa-check text-xs"></i> <span>Simpan Game</span>
          </button>
        </div>
      </form>
    </Modal>

    <!-- Manage SKU Variants Modal -->
    <Modal :is-open="skuModalOpen" :title="'Kelola Varian SKU: ' + (activeGameForSku?.title || '')" icon="fas fa-layer-group" maxWidthClass="max-w-2xl" @close="skuModalOpen = false">
      <div class="space-y-4">
        <!-- Form Add SKU -->
        <form @submit.prevent="saveNewSku" class="p-4 bg-slate-800/70 border border-slate-700 rounded-2xl space-y-3">
          <p class="text-xs font-bold text-white">Tambah Varian Nominal Baru</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <input type="text" v-model="newSkuName" required placeholder="Nama SKU (500 DM)" class="h-9 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs">
            <input type="number" v-model="newSkuPrice" required placeholder="Harga (Contoh: 125000)" class="h-9 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs">
            <input type="text" v-model="newSkuBonus" placeholder="Bonus (Opsional)" class="h-9 px-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs">
          </div>
          <div class="flex justify-end">
            <button type="submit" class="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1">
              <i class="fas fa-plus text-xs"></i> <span>Tambah Nominal</span>
            </button>
          </div>
        </form>

        <!-- SKU Table with # auto-numbering & icon-only delete button -->
        <div class="overflow-x-auto border border-slate-800 rounded-2xl">
          <table class="w-full text-left text-xs text-slate-300">
            <thead class="bg-slate-950/80 text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th class="py-2.5 px-3 text-center w-12">#</th>
                <th class="py-2.5 px-3">Nama Paket</th>
                <th class="py-2.5 px-3">Harga</th>
                <th class="py-2.5 px-3">Bonus</th>
                <th class="py-2.5 px-3 text-center w-14">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800">
              <tr v-for="(prod, vIdx) in (activeGameForSku?.products || [])" :key="prod.id || vIdx" class="hover:bg-slate-800/40">
                <td class="py-2 px-3 font-mono text-center text-slate-400">{{ vIdx + 1 }}</td>
                <td class="py-2 px-3 font-bold text-white">{{ prod.name }}</td>
                <td class="py-2 px-3 font-extrabold text-sky-400">Rp {{ prod.price?.toLocaleString('id-ID') }}</td>
                <td class="py-2 px-3 text-amber-400">{{ prod.bonus || '-' }}</td>
                <td class="py-2 px-3 text-center">
                  <button type="button" @click="deleteSkuItem(vIdx)" class="w-7 h-7 rounded-lg bg-rose-950/50 hover:bg-rose-900 border border-rose-800 text-rose-400 hover:text-white inline-flex items-center justify-center transition-colors mx-auto" title="Hapus SKU" aria-label="Hapus SKU">
                    <i class="fas fa-trash text-xs"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useGamesStore } from '@/stores/gamesStore';
import Modal from '@/components/common/Modal.vue';
import DragDropUpload from '@/components/common/DragDropUpload.vue';

const gamesStore = useGamesStore();

const addGameModalOpen = ref(false);
const skuModalOpen = ref(false);
const activeGameIndex = ref(null);
const activeGameForSku = ref(null);

const newGameTitle = ref('');
const newGameDev = ref('');
const newGameCategory = ref('Mobile');
const newGameDesc = ref('');

const newSkuName = ref('');
const newSkuPrice = ref('');
const newSkuBonus = ref('');

function onBannerUploaded(files) {
  console.log('Banner game diupload:', files);
}

function saveNewGame() {
  gamesStore.addGame({
    id: "game_" + Date.now(),
    title: newGameTitle.value,
    developer: newGameDev.value,
    category: newGameCategory.value,
    isPopular: false,
    banner: "/images/games/mlbb.svg",
    description: newGameDesc.value || "Layanan top up game cepat dan instan.",
    hasZoneId: false,
    status: "Aktif",
    products: [
      { id: "sku_1", name: "100 Diamonds / Poin", price: 25000, sku: "SKU_DEFAULT", bonus: "" }
    ]
  });

  addGameModalOpen.value = false;
  newGameTitle.value = '';
  newGameDev.value = '';
  newGameDesc.value = '';
}

function deleteGame(idx) {
  if (confirm('Yakin ingin menghapus game ini dari katalog?')) {
    gamesStore.deleteGame(idx);
  }
}

function openSkuModal(idx, game) {
  activeGameIndex.value = idx;
  activeGameForSku.value = game;
  skuModalOpen.value = true;
}

function saveNewSku() {
  if (activeGameIndex.value !== null) {
    gamesStore.addSku(activeGameIndex.value, {
      id: "sku_" + Date.now(),
      name: newSkuName.value,
      price: parseInt(newSkuPrice.value, 10),
      sku: "SKU_" + Date.now(),
      bonus: newSkuBonus.value
    });
    newSkuName.value = '';
    newSkuPrice.value = '';
    newSkuBonus.value = '';
  }
}

function deleteSkuItem(skuIdx) {
  if (activeGameIndex.value !== null) {
    gamesStore.deleteSku(activeGameIndex.value, skuIdx);
  }
}
</script>
