import { defineStore } from 'pinia';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const INITIAL_PROMOS = [
  { name: "Diskon Pengguna Baru", code: "NEWUSER20", type: "Persentase", value: "20% (Max 10K)", rate: 0.20, maxDiscount: 10000, period: "01 Agu - 31 Agu 2026", status: "Aktif", banner: "/images/promo/promo-mlbb.svg" },
  { name: "Flash Promo Top Up", code: "BONUS10", type: "Persentase", value: "10%", rate: 0.10, maxDiscount: 20000, period: "15 Agu - 30 Agu 2026", status: "Aktif", banner: "/images/promo/promo-valorant.svg" },
  { name: "Cashback MLBB Weekend", code: "MLBB5K", type: "Nominal", value: "Rp 5.000", fixedDiscount: 5000, period: "01 Sep - 05 Sep 2026", status: "Dijadwalkan", banner: "/images/promo/promo-cashback.svg" },
  { name: "Diskon Merdeka 17", code: "MERDEKA", type: "Persentase", value: "17%", rate: 0.17, maxDiscount: 17000, period: "17 Agu - 18 Agu 2026", status: "Nonaktif", banner: "/images/promo/promo-valorant.svg" }
];

export const usePromoStore = defineStore('promo', {
  state: () => ({
    promos: INITIAL_PROMOS,
    isLoading: false
  }),

  getters: {
    activePromos: (state) => (state.promos || []).filter(p => p.status === 'Aktif'),
    coupons: (state) => (state.promos || []).filter(p => p.status === 'Aktif')
  },

  actions: {
    async fetchPromos() {
      if (!isSupabaseConfigured || !supabase) return;
      try {
        this.isLoading = true;
        const { data, error } = await supabase.from('promos').select('*');
        if (!error && data && data.length > 0) {
          this.promos = data.map(p => ({
            name: p.name,
            code: p.code,
            type: p.type,
            value: p.value,
            rate: Number(p.rate) || 0,
            maxDiscount: Number(p.max_discount) || 0,
            fixedDiscount: Number(p.max_discount) || 0,
            period: p.period,
            status: p.status,
            banner: p.banner_url || '/images/promo/promo-mlbb.svg'
          }));
        }
      } catch (err) {
        console.warn('Gagal memuat promo dari database, fallback lokal:', err);
      } finally {
        this.isLoading = false;
      }
    },

    validatePromoCode(code, originalPrice) {
      if (!code) return { valid: false, message: "Masukkan kode promo." };
      const promo = this.promos.find(p => p.code.toUpperCase() === code.toUpperCase() && p.status === "Aktif");
      if (!promo) {
        return { valid: false, message: "Kode promo tidak valid atau telah berakhir." };
      }

      let discountAmount = 0;
      if (promo.type === "Persentase") {
        discountAmount = Math.min(Math.round(originalPrice * (promo.rate || 0.1)), promo.maxDiscount || 10000);
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

    async addPromo(newPromo) {
      this.promos.unshift(newPromo);
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('promos').insert({
            name: newPromo.name,
            code: newPromo.code,
            type: newPromo.type,
            value: newPromo.value,
            rate: newPromo.rate || 0,
            max_discount: newPromo.maxDiscount || 0,
            period: newPromo.period,
            status: newPromo.status,
            banner_url: newPromo.banner
          });
        } catch (err) {
          console.warn('Gagal sinkronisasi promo baru ke Supabase:', err);
        }
      }
    },

    async deletePromo(index) {
      const promo = this.promos[index];
      this.promos.splice(index, 1);
      if (promo && isSupabaseConfigured && supabase) {
        try {
          await supabase.from('promos').delete().eq('code', promo.code);
        } catch (err) {
          console.warn('Gagal menghapus promo dari Supabase:', err);
        }
      }
    }
  }
});
