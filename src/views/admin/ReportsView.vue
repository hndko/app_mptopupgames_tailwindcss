<template>
  <div class="space-y-6">
    <!-- Header & Export Action -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 class="text-lg font-bold text-white">Laporan Analitik &amp; Penjualan</h2>
        <p class="text-xs text-slate-400">Ringkasan performa finansial dan riwayat mutasi transaksi.</p>
      </div>

      <button 
        type="button" 
        @click="exportCsv"
        class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
      >
        <i class="fas fa-file-csv text-xs"></i> <span>Ekspor Laporan (CSV)</span>
      </button>
    </div>

    <!-- Date Range Filter Bar with icon groups -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center gap-3">
      <div class="relative flex-1 w-full">
        <label class="block text-[10px] uppercase font-bold text-slate-400 mb-1">Dari Tanggal</label>
        <div class="relative">
          <i class="fas fa-calendar-days absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
          <input type="date" v-model="startDate" class="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500">
        </div>
      </div>

      <div class="relative flex-1 w-full">
        <label class="block text-[10px] uppercase font-bold text-slate-400 mb-1">Sampai Tanggal</label>
        <div class="relative">
          <i class="fas fa-calendar-days absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
          <input type="date" v-model="endDate" class="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500">
        </div>
      </div>

      <div class="w-full sm:w-auto self-end pt-2 sm:pt-0">
        <button type="button" @click="filterReport" class="w-full sm:w-auto h-10 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors">
          <i class="fas fa-filter text-xs"></i> <span>Terapkan Filter</span>
        </button>
      </div>
    </div>

    <!-- 3 Summary Metrics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl">
        <span class="text-xs font-semibold text-slate-400">Total Nilai Transaksi</span>
        <p class="text-xl sm:text-2xl font-black text-white">Rp 48.250.000</p>
        <p class="text-[10px] text-emerald-400 font-bold">+18.4% pertumbuhan</p>
      </div>
      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl">
        <span class="text-xs font-semibold text-slate-400">Total Biaya Payment Gateway</span>
        <p class="text-xl sm:text-2xl font-black text-white">Rp 1.428.000</p>
        <p class="text-[10px] text-slate-400 font-semibold">Rata-rata 2.9%</p>
      </div>
      <div class="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-1 shadow-xl">
        <span class="text-xs font-semibold text-slate-400">Laba Bersih (Net Profit)</span>
        <p class="text-xl sm:text-2xl font-black text-emerald-400">Rp 12.822.000</p>
        <p class="text-[10px] text-emerald-400 font-bold">Margin rata-rata 26.5%</p>
      </div>
    </div>

    <!-- Data Table Container with # numbering -->
    <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-300">
          <thead class="bg-slate-950/80 text-slate-400 uppercase font-bold border-b border-slate-800 text-[11px]">
            <tr>
              <th scope="col" class="py-3.5 px-4 text-center w-12">#</th>
              <th scope="col" class="py-3.5 px-4">Tanggal</th>
              <th scope="col" class="py-3.5 px-4">Jumlah Transaksi</th>
              <th scope="col" class="py-3.5 px-4">Game Terpopuler</th>
              <th scope="col" class="py-3.5 px-4">Gross Revenue</th>
              <th scope="col" class="py-3.5 px-4">Biaya Gateway</th>
              <th scope="col" class="py-3.5 px-4 text-right">Net Profit</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/80">
            <tr v-for="(rep, idx) in reports" :key="rep.date" class="hover:bg-slate-800/40 transition-colors">
              <td class="py-3 px-4 font-mono text-slate-400 text-center font-bold">{{ idx + 1 }}</td>
              <td class="py-3 px-4 font-bold text-white">{{ rep.date }}</td>
              <td class="py-3 px-4 font-mono">{{ rep.count }} Pesanan</td>
              <td class="py-3 px-4 text-sky-400 font-semibold">{{ rep.topGame }}</td>
              <td class="py-3 px-4 font-bold text-white">Rp {{ rep.gross.toLocaleString('id-ID') }}</td>
              <td class="py-3 px-4 text-slate-400">Rp {{ rep.fee.toLocaleString('id-ID') }}</td>
              <td class="py-3 px-4 text-right font-extrabold text-emerald-400">Rp {{ rep.net.toLocaleString('id-ID') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const startDate = ref('2026-08-01');
const endDate = ref('2026-08-25');

const reports = ref([
  { date: "25 Agu 2026", count: 84, topGame: "Mobile Legends", gross: 3450000, fee: 98000, net: 862500 },
  { date: "24 Agu 2026", count: 112, topGame: "Valorant", gross: 4890000, fee: 142000, net: 1222500 },
  { date: "23 Agu 2026", count: 96, topGame: "Genshin Impact", gross: 4120000, fee: 118000, net: 1030000 },
  { date: "22 Agu 2026", count: 130, topGame: "Mobile Legends", gross: 5670000, fee: 165000, net: 1417500 },
  { date: "21 Agu 2026", count: 104, topGame: "Free Fire", gross: 3980000, fee: 112000, net: 995000 }
]);

function filterReport() {
  alert(`Laporan difilter dari ${startDate.value} sampai ${endDate.value}`);
}

function exportCsv() {
  let csvContent = "data:text/csv;charset=utf-8,No,Tanggal,Jumlah Transaksi,Game Terpopuler,Gross Revenue,Biaya Gateway,Net Profit\n";
  reports.value.forEach((r, idx) => {
    csvContent += `${idx + 1},"${r.date}",${r.count},"${r.topGame}",${r.gross},${r.fee},${r.net}\n`;
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `Laporan_Penjualan_${startDate.value}_${endDate.value}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>
