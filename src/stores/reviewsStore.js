import { defineStore } from 'pinia';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Budi Santoso',
    avatar: '/images/avatars/default-avatar.svg',
    game: 'Mobile Legends',
    rating: 5,
    date: '25 Agu 2026',
    comment: 'Top up 250 Diamonds prosesnya super kilat! Belum sempat keluar dari halaman invoice, diamond sudah masuk ke akun in-game. Sangat recommended!',
    verified: true,
    likes: 24
  },
  {
    id: 2,
    name: 'Kevin Pratama',
    avatar: '/images/avatars/default-avatar.svg',
    game: 'Valorant',
    rating: 5,
    date: '24 Agu 2026',
    comment: 'Beli 1000 VP via QRIS langsung beres detik itu juga. CS WhatsApp juga sangat responsif saat tanya-tanya promo diskon.',
    verified: true,
    likes: 18
  },
  {
    id: 3,
    name: 'Rizky Alamsyah',
    avatar: '/images/avatars/default-avatar.svg',
    game: 'Genshin Impact',
    rating: 5,
    date: '24 Agu 2026',
    comment: 'Blessing of Welkin Moon termurah se-Indonesia! Aman 100% legal via UID tanpa minta password. Sukses terus MPTopUp!',
    verified: true,
    likes: 31
  },
  {
    id: 4,
    name: 'Siti Nurhaliza',
    avatar: '/images/avatars/default-avatar.svg',
    game: 'Free Fire',
    rating: 5,
    date: '23 Agu 2026',
    comment: 'Dapat diskon 20% pake kupon NEWUSER20, lumayan banget buat borong diamond event FF. Makasih admin!',
    verified: true,
    likes: 12
  },
  {
    id: 5,
    name: 'Andi Wijaya',
    avatar: '/images/avatars/default-avatar.svg',
    game: 'PUBG Mobile',
    rating: 4,
    date: '22 Agu 2026',
    comment: 'Proses cepat dan lancar. Tampilan website juga sangat modern dan mudah digunakan lewat HP.',
    verified: true,
    likes: 8
  },
  {
    id: 6,
    name: 'David Christian',
    avatar: '/images/avatars/default-avatar.svg',
    game: 'Steam Wallet IDR',
    rating: 5,
    date: '20 Agu 2026',
    comment: 'Kode voucher Steam langsung muncul di layar setelah pembayaran QRIS terkonfirmasi. Mantap banget!',
    verified: true,
    likes: 15
  }
];

export const useReviewsStore = defineStore('reviews', {
  state: () => ({
    reviews: JSON.parse(localStorage.getItem('mptopup_reviews_v1') || 'null') || INITIAL_REVIEWS,
    selectedStarFilter: 0,
    isLoading: false
  }),

  getters: {
    totalReviews: (state) => state.reviews.length,
    averageRating: (state) => {
      if (state.reviews.length === 0) return 5.0;
      const sum = state.reviews.reduce((acc, r) => acc + r.rating, 0);
      return (sum / state.reviews.length).toFixed(1);
    },
    satisfactionRate: (state) => {
      if (state.reviews.length === 0) return 100;
      const positive = state.reviews.filter(r => r.rating >= 4).length;
      return Math.round((positive / state.reviews.length) * 100);
    },
    starDistribution: (state) => {
      const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      state.reviews.forEach(r => {
        if (counts[r.rating] !== undefined) counts[r.rating]++;
      });
      const total = state.reviews.length || 1;
      return {
        5: { count: counts[5], pct: Math.round((counts[5] / total) * 100) },
        4: { count: counts[4], pct: Math.round((counts[4] / total) * 100) },
        3: { count: counts[3], pct: Math.round((counts[3] / total) * 100) },
        2: { count: counts[2], pct: Math.round((counts[2] / total) * 100) },
        1: { count: counts[1], pct: Math.round((counts[1] / total) * 100) }
      };
    },
    filteredReviews: (state) => {
      if (state.selectedStarFilter === 0) return state.reviews;
      return state.reviews.filter(r => r.rating === state.selectedStarFilter);
    }
  },

  actions: {
    saveToStorage() {
      localStorage.setItem('mptopup_reviews_v1', JSON.stringify(this.reviews));
    },

    setStarFilter(star) {
      this.selectedStarFilter = star;
    },

    async fetchReviews() {
      if (!isSupabaseConfigured || !supabase) return;
      try {
        this.isLoading = true;
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          this.reviews = data.map(r => ({
            id: r.id,
            name: r.name,
            avatar: r.avatar_url || '/images/avatars/default-avatar.svg',
            game: r.game,
            rating: r.rating,
            date: new Date(r.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
            comment: r.comment,
            verified: r.is_verified ?? true,
            likes: r.likes || 0
          }));
          this.saveToStorage();
        }
      } catch (err) {
        console.warn('Gagal memuat ulasan dari database, menggunakan fallback lokal:', err);
      } finally {
        this.isLoading = false;
      }
    },

    async addReview({ name, game, rating, comment }) {
      const newReview = {
        id: Date.now(),
        name: name.trim(),
        avatar: '/images/avatars/default-avatar.svg',
        game: game || 'Mobile Legends',
        rating: Number(rating) || 5,
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        comment: comment.trim(),
        verified: true,
        likes: 0
      };

      this.reviews.unshift(newReview);
      this.saveToStorage();

      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('reviews').insert({
            name: newReview.name,
            avatar_url: newReview.avatar,
            game: newReview.game,
            rating: newReview.rating,
            comment: newReview.comment,
            is_verified: true,
            likes: 0
          });
        } catch (err) {
          console.warn('Ulasan tersimpan di lokal, namun sinkronisasi database gagal:', err);
        }
      }

      return newReview;
    },

    async likeReview(id) {
      const review = this.reviews.find(r => r.id === id);
      if (review) {
        review.likes += 1;
        this.saveToStorage();
        if (isSupabaseConfigured && supabase) {
          try {
            await supabase.from('reviews').update({ likes: review.likes }).eq('id', id);
          } catch {
            // Ignored
          }
        }
      }
    }
  }
});
