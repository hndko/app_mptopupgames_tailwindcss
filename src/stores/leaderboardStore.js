import { defineStore } from 'pinia';

export const useLeaderboardStore = defineStore('leaderboard', {
  state: () => ({
    activePeriod: 'monthly', // 'daily' | 'weekly' | 'monthly' | 'all_time'
    leaderboardData: {
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
    }
  }),

  getters: {
    currentLeaderboard: (state) => state.leaderboardData[state.activePeriod] || [],
    topThree: (state) => (state.leaderboardData[state.activePeriod] || []).slice(0, 3),
    rankList: (state) => (state.leaderboardData[state.activePeriod] || []).slice(3)
  },

  actions: {
    setPeriod(period) {
      this.activePeriod = period;
    }
  }
});
