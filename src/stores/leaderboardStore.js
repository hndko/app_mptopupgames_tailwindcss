import { defineStore } from 'pinia';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const INITIAL_LEADERBOARD = {
  daily: [
    { rank: 1, name: 'Rian***99', phone: '0812****8821', avatar: '/images/games/mlbb.svg', tier: 'Mythical Immortal', game: 'Mobile Legends', totalSpend: 2850000, txCount: 14 },
    { rank: 2, name: 'Sultan***Gaming', phone: '0857****1290', avatar: '/images/games/valorant.svg', tier: 'Radiant Master', game: 'Valorant', totalSpend: 2150000, txCount: 9 },
    { rank: 3, name: 'Fikri***Pro', phone: '0878****9912', avatar: '/images/games/genshin.svg', tier: 'Abyss Conqueror', game: 'Genshin Impact', totalSpend: 1650000, txCount: 7 },
    { rank: 4, name: 'Dimas***07', phone: '0819****4432', avatar: '/images/games/freefire.svg', tier: 'Grandmaster', game: 'Free Fire', totalSpend: 950000, txCount: 6 },
    { rank: 5, name: 'Viper***King', phone: '0813****7721', avatar: '/images/games/pubgm.svg', tier: 'Conqueror', game: 'PUBG Mobile', totalSpend: 820000, txCount: 5 },
    { rank: 6, name: 'Aldi***ML', phone: '0821****3341', avatar: '/images/games/mlbb.svg', tier: 'Mythic Glory', game: 'Mobile Legends', totalSpend: 680000, txCount: 4 },
    { rank: 7, name: 'Bima***Voucher', phone: '0852****9988', avatar: '/images/games/steam.svg', tier: 'Collector', game: 'Steam Wallet', totalSpend: 550000, txCount: 3 },
    { rank: 8, name: 'Bayu***HOK', phone: '0817****6654', avatar: '/images/games/hok.svg', tier: 'Grand Master', game: 'Honor of Kings', totalSpend: 420000, txCount: 3 }
  ],
  weekly: [
    { rank: 1, name: 'Sultan***Gaming', phone: '0857****1290', avatar: '/images/games/valorant.svg', tier: 'Radiant Master', game: 'Valorant', totalSpend: 12450000, txCount: 38 },
    { rank: 2, name: 'Rian***99', phone: '0812****8821', avatar: '/images/games/mlbb.svg', tier: 'Mythical Immortal', game: 'Mobile Legends', totalSpend: 9850000, txCount: 42 },
    { rank: 3, name: 'Genshin***Whale', phone: '0811****7788', avatar: '/images/games/genshin.svg', tier: 'Abyss Conqueror', game: 'Genshin Impact', totalSpend: 7800000, txCount: 22 },
    { rank: 4, name: 'Fikri***Pro', phone: '0878****9912', avatar: '/images/games/genshin.svg', tier: 'Abyss Conqueror', game: 'Genshin Impact', totalSpend: 6200000, txCount: 19 },
    { rank: 5, name: 'Viper***King', phone: '0813****7721', avatar: '/images/games/pubgm.svg', tier: 'Conqueror', game: 'PUBG Mobile', totalSpend: 5400000, txCount: 18 },
    { rank: 6, name: 'Dimas***07', phone: '0819****4432', avatar: '/images/games/freefire.svg', tier: 'Grandmaster', game: 'Free Fire', totalSpend: 4100000, txCount: 16 },
    { rank: 7, name: 'Aldi***ML', phone: '0821****3341', avatar: '/images/games/mlbb.svg', tier: 'Mythic Glory', game: 'Mobile Legends', totalSpend: 3600000, txCount: 15 },
    { rank: 8, name: 'Reza***Squad', phone: '0838****1122', avatar: '/images/games/mlbb.svg', tier: 'Mythic Glory', game: 'Mobile Legends', totalSpend: 2900000, txCount: 12 }
  ],
  monthly: [
    { rank: 1, name: 'Sultan***Gaming', phone: '0857****1290', avatar: '/images/games/valorant.svg', tier: 'Radiant Master', game: 'Valorant', totalSpend: 48900000, txCount: 142 },
    { rank: 2, name: 'Genshin***Whale', phone: '0811****7788', avatar: '/images/games/genshin.svg', tier: 'Abyss Conqueror', game: 'Genshin Impact', totalSpend: 39500000, txCount: 88 },
    { rank: 3, name: 'Rian***99', phone: '0812****8821', avatar: '/images/games/mlbb.svg', tier: 'Mythical Immortal', game: 'Mobile Legends', totalSpend: 34200000, txCount: 126 },
    { rank: 4, name: 'Viper***King', phone: '0813****7721', avatar: '/images/games/pubgm.svg', tier: 'Conqueror', game: 'PUBG Mobile', totalSpend: 22800000, txCount: 74 },
    { rank: 5, name: 'Fikri***Pro', phone: '0878****9912', avatar: '/images/games/genshin.svg', tier: 'Abyss Conqueror', game: 'Genshin Impact', totalSpend: 19400000, txCount: 65 },
    { rank: 6, name: 'Dimas***07', phone: '0819****4432', avatar: '/images/games/freefire.svg', tier: 'Grandmaster', game: 'Free Fire', totalSpend: 15600000, txCount: 58 },
    { rank: 7, name: 'Aldi***ML', phone: '0821****3341', avatar: '/images/games/mlbb.svg', tier: 'Mythic Glory', game: 'Mobile Legends', totalSpend: 12900000, txCount: 49 },
    { rank: 8, name: 'Bima***Voucher', phone: '0852****9988', avatar: '/images/games/steam.svg', tier: 'Collector', game: 'Steam Wallet', totalSpend: 10400000, txCount: 36 }
  ],
  all_time: [
    { rank: 1, name: 'Sultan***Gaming', phone: '0857****1290', avatar: '/images/games/valorant.svg', tier: 'Radiant Master', game: 'Valorant', totalSpend: 285400000, txCount: 890 },
    { rank: 2, name: 'Genshin***Whale', phone: '0811****7788', avatar: '/images/games/genshin.svg', tier: 'Abyss Conqueror', game: 'Genshin Impact', totalSpend: 242000000, txCount: 610 },
    { rank: 3, name: 'Rian***99', phone: '0812****8821', avatar: '/images/games/mlbb.svg', tier: 'Mythical Immortal', game: 'Mobile Legends', totalSpend: 198500000, txCount: 780 },
    { rank: 4, name: 'Viper***King', phone: '0813****7721', avatar: '/images/games/pubgm.svg', tier: 'Conqueror', game: 'PUBG Mobile', totalSpend: 145000000, txCount: 490 },
    { rank: 5, name: 'Fikri***Pro', phone: '0878****9912', avatar: '/images/games/genshin.svg', tier: 'Abyss Conqueror', game: 'Genshin Impact', totalSpend: 112000000, txCount: 380 }
  ]
};

export const useLeaderboardStore = defineStore('leaderboard', {
  state: () => ({
    activePeriod: 'monthly',
    leaderboardData: INITIAL_LEADERBOARD,
    isLoading: false
  }),

  getters: {
    currentLeaderboard: (state) => state.leaderboardData[state.activePeriod] || [],
    topThree: (state) => (state.leaderboardData[state.activePeriod] || []).slice(0, 3),
    rankList: (state) => (state.leaderboardData[state.activePeriod] || []).slice(3)
  },

  actions: {
    setPeriod(period) {
      this.activePeriod = period;
      this.fetchLeaderboard(period);
    },

    async fetchLeaderboard(period = 'monthly') {
      if (!isSupabaseConfigured || !supabase) return;
      try {
        this.isLoading = true;
        // Ambil data transaksi sukses untuk dihitung agregat leaderboard
        const { data, error } = await supabase
          .from('orders')
          .select('whatsapp, user_game_id, game_title, total_price, created_at')
          .eq('status', 'Selesai')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 5) {
          // Agregasi spending berdasarkan nomor whatsapp atau user_game_id
          const userSpendMap = {};
          data.forEach(order => {
            const key = order.whatsapp || order.user_game_id || 'User';
            if (!userSpendMap[key]) {
              userSpendMap[key] = {
                rawKey: key,
                game: order.game_title || 'Mobile Legends',
                totalSpend: 0,
                txCount: 0
              };
            }
            userSpendMap[key].totalSpend += Number(order.total_price) || 0;
            userSpendMap[key].txCount += 1;
          });

          // Urutkan berdasarkan total spending
          const sorted = Object.values(userSpendMap)
            .sort((a, b) => b.totalSpend - a.totalSpend)
            .slice(0, 10)
            .map((item, idx) => {
              const phone = item.rawKey.startsWith('08') ? item.rawKey : `0812****${String(idx + 1).padStart(4, '0')}`;
              const maskedPhone = phone.length > 6 ? phone.slice(0, 4) + '****' + phone.slice(-4) : phone;
              const maskedName = item.rawKey.slice(0, 3) + '***' + (idx % 2 === 0 ? 'Gaming' : 'Pro');
              
              let tier = 'Mythic Glory';
              if (idx === 0) tier = 'Mythical Immortal';
              else if (idx === 1) tier = 'Radiant Master';
              else if (idx === 2) tier = 'Abyss Conqueror';
              else if (idx <= 4) tier = 'Grandmaster';

              return {
                rank: idx + 1,
                name: maskedName,
                phone: maskedPhone,
                avatar: '/images/games/mlbb.svg',
                tier,
                game: item.game,
                totalSpend: item.totalSpend,
                txCount: item.txCount
              };
            });

          if (sorted.length >= 3) {
            this.leaderboardData[period] = sorted;
          }
        }
      } catch (err) {
        console.warn('Gagal memuat leaderboard dari database, fallback lokal:', err);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
