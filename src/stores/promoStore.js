import { defineStore } from 'pinia';

export const INITIAL_PROMOS = [
  { name: "Diskon Pengguna Baru", code: "NEWUSER20", type: "Persentase", value: "20% (Max 10K)", rate: 0.20, maxDiscount: 10000, period: "01 Agu - 31 Agu 2026", status: "Aktif", banner: "/images/promo/promo-mlbb.svg" },
  { name: "Flash Promo Top Up", code: "BONUS10", type: "Persentase", value: "10%", rate: 0.10, maxDiscount: 20000, period: "15 Agu - 30 Agu 2026", status: "Aktif", banner: "/images/promo/promo-valorant.svg" },
  { name: "Cashback MLBB Weekend", code: "MLBB5K", type: "Nominal", value: "Rp 5.000", fixedDiscount: 5000, period: "01 Sep - 05 Sep 2026", status: "Dijadwalkan", banner: "/images/promo/promo-cashback.svg" },
  { name: "Diskon Merdeka 17", code: "MERDEKA", type: "Persentase", value: "17%", rate: 0.17, maxDiscount: 17000, period: "17 Agu - 18 Agu 2026", status: "Nonaktif", banner: "/images/promo/promo-valorant.svg" }
];

export const usePromoStore = defineStore('promo', {
  state: () => ({
    promos: INITIAL_PROMOS
  }),

  getters: {
    activePromos: (state) => (state.promos || []).filter(p => p.status === 'Aktif'),
    coupons: (state) => (state.promos || []).filter(p => p.status === 'Aktif')
  },

  actions: {
    validatePromoCode(code, originalPrice) {
      if (!code) return { valid: false, message: "Masukkan kode promo." };
      const promo = this.promos.find(p => p.code.toUpperCase() === code.toUpperCase() && p.status === "Aktif");
      if (!promo) {
        return { valid: false, message: "Kode promo tidak valid atau telah berakhir." };
      }

      let discountAmount = 0;
      if (promo.type === "Persentase") {
        discountAmount = Math.min(Math.round(originalPrice * promo.rate), promo.maxDiscount || 10000);
      } else if (promo.type === "Nominal") {
        discountAmount = promo.fixedDiscount || 5000;
      }

      return {
        valid: true,
        discount: discountAmount,
        promoName: promo.name,
        message: `Kupon "${promo.code}" berhasil digunakan! Potongan: Rp ${discountAmount.toLocaleString('id-ID')}`
      };
    },

    addPromo(newPromo) {
      this.promos.unshift(newPromo);
    },

    deletePromo(index) {
      this.promos.splice(index, 1);
    }
  }
});
