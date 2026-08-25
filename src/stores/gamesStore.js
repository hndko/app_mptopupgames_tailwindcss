import { defineStore } from 'pinia';

export const INITIAL_HERO_SLIDES = [
  {
    id: "slide1",
    badge: "⚡ EVENT SPESIAL MLBB",
    title: "TOP UP DIAMONDS INSTAN",
    highlight: "CASHBACK HINGGA 20%",
    description: "Proses kilat 1-3 detik otomatis masuk ke akun Mobile Legends kamu.",
    banner: "/images/promo/hero-slide-1.svg",
    gameId: "game1"
  },
  {
    id: "slide2",
    badge: "🎯 VALORANT NIGHT MARKET",
    title: "TOP UP VALORANT POINTS",
    highlight: "BONUS +10% EKSTRA VP",
    description: "Selesaikan pesananmu dalam hitungan detik via Riot ID server Indonesia.",
    banner: "/images/promo/hero-slide-2.svg",
    gameId: "game2"
  },
  {
    id: "slide3",
    badge: "✨ GENSHIN & VOUCHER",
    title: "BLESSING OF WELKIN MOON",
    highlight: "DISKON POTONGAN SPESIAL",
    description: "Top up Genesis Crystals & Welkin Moon aman 100% via UID Server Asia.",
    banner: "/images/promo/hero-slide-3.svg",
    gameId: "game5"
  }
];

export const INITIAL_FLASH_SALES = [
  {
    id: "fs1",
    gameId: "game1",
    gameTitle: "Mobile Legends",
    item: "250 Diamonds + 10 Bonus",
    originalPrice: 85000,
    salePrice: 69000,
    discount: "19%",
    soldPercent: 82,
    banner: "/images/games/mlbb.svg"
  },
  {
    id: "fs2",
    gameId: "game2",
    gameTitle: "Valorant",
    item: "1000 Points (VP)",
    originalPrice: 120000,
    salePrice: 100000,
    discount: "17%",
    soldPercent: 65,
    banner: "/images/games/valorant.svg"
  },
  {
    id: "fs3",
    gameId: "game3",
    gameTitle: "Free Fire",
    item: "Weekly Diamond Pass",
    originalPrice: 35000,
    salePrice: 28000,
    discount: "20%",
    soldPercent: 94,
    banner: "/images/games/freefire.svg"
  },
  {
    id: "fs4",
    gameId: "game5",
    gameTitle: "Genshin Impact",
    item: "Blessing of Welkin Moon",
    originalPrice: 90000,
    salePrice: 78000,
    discount: "13%",
    soldPercent: 71,
    banner: "/images/games/genshin.svg"
  }
];

export const INITIAL_GAMES = [
  {
    id: "game1",
    title: "Mobile Legends: Bang Bang",
    developer: "Moonton",
    category: "Mobile",
    isPopular: true,
    banner: "/images/games/mlbb.svg",
    description: "Top up Diamond Mobile Legends resmi Moonton. Masukkan User ID dan Zone ID, pilih nominal, dan bayar instan dalam hitungan detik.",
    hasZoneId: true,
    status: "Aktif",
    productGroups: [
      {
        groupName: "Nominal Diamonds",
        items: [
          { id: "ml_86", name: "86 Diamonds", price: 21500, sku: "MLBB_86DM", bonus: "+3 Bonus" },
          { id: "ml_172", name: "172 Diamonds", price: 43000, sku: "MLBB_172DM", bonus: "+8 Bonus" },
          { id: "ml_257", name: "257 Diamonds", price: 65000, sku: "MLBB_257DM", bonus: "+15 Bonus" },
          { id: "ml_344", name: "344 Diamonds", price: 86000, sku: "MLBB_344DM", bonus: "+20 Bonus" },
          { id: "ml_706", name: "706 Diamonds", price: 172000, sku: "MLBB_706DM", bonus: "+50 Bonus" },
          { id: "ml_2195", name: "2195 Diamonds", price: 516000, sku: "MLBB_2195DM", bonus: "+160 Bonus" }
        ]
      },
      {
        groupName: "Membership & Pass",
        items: [
          { id: "ml_weekly", name: "Weekly Diamond Pass", price: 27500, sku: "MLBB_WDP", bonus: "Hemat 60%" },
          { id: "ml_twilight", name: "Twilight Pass", price: 135000, sku: "MLBB_TP", bonus: "Skin Eksklusif" }
        ]
      }
    ],
    products: [
      { id: "ml_86", name: "86 Diamonds", price: 21500, sku: "MLBB_86DM", bonus: "+3 Bonus" },
      { id: "ml_172", name: "172 Diamonds", price: 43000, sku: "MLBB_172DM", bonus: "+8 Bonus" },
      { id: "ml_257", name: "257 Diamonds", price: 65000, sku: "MLBB_257DM", bonus: "+15 Bonus" },
      { id: "ml_344", name: "344 Diamonds", price: 86000, sku: "MLBB_344DM", bonus: "+20 Bonus" },
      { id: "ml_706", name: "706 Diamonds", price: 172000, sku: "MLBB_706DM", bonus: "+50 Bonus" },
      { id: "ml_2195", name: "2195 Diamonds", price: 516000, sku: "MLBB_2195DM", bonus: "+160 Bonus" },
      { id: "ml_weekly", name: "Weekly Diamond Pass", price: 27500, sku: "MLBB_WDP", bonus: "Hemat 60%" },
      { id: "ml_twilight", name: "Twilight Pass", price: 135000, sku: "MLBB_TP", bonus: "Skin Eksklusif" }
    ]
  },
  {
    id: "game2",
    title: "Valorant",
    developer: "Riot Games",
    category: "PC",
    isPopular: true,
    banner: "/images/games/valorant.svg",
    description: "Top up Valorant Points (VP) resmi server Indonesia. Masukkan Riot ID lengkap dengan Tagline.",
    hasZoneId: false,
    status: "Aktif",
    productGroups: [
      {
        groupName: "Valorant Points",
        items: [
          { id: "val_475", name: "475 Points", price: 50000, sku: "VAL_475VP", bonus: "" },
          { id: "val_1000", name: "1000 Points", price: 100000, sku: "VAL_1000VP", bonus: "+50 VP" },
          { id: "val_2050", name: "2050 Points", price: 200000, sku: "VAL_2050VP", bonus: "+150 VP" },
          { id: "val_3650", name: "3650 Points", price: 350000, sku: "VAL_3650VP", bonus: "+300 VP" }
        ]
      }
    ],
    products: [
      { id: "val_475", name: "475 Points", price: 50000, sku: "VAL_475VP", bonus: "" },
      { id: "val_1000", name: "1000 Points", price: 100000, sku: "VAL_1000VP", bonus: "+50 VP" },
      { id: "val_2050", name: "2050 Points", price: 200000, sku: "VAL_2050VP", bonus: "+150 VP" },
      { id: "val_3650", name: "3650 Points", price: 350000, sku: "VAL_3650VP", bonus: "+300 VP" }
    ]
  },
  {
    id: "game3",
    title: "Free Fire",
    developer: "Garena",
    category: "Mobile",
    isPopular: true,
    banner: "/images/games/freefire.svg",
    description: "Top up Diamonds Free Fire instan dan otomatis 24 jam nonstop.",
    hasZoneId: false,
    status: "Aktif",
    productGroups: [
      {
        groupName: "Nominal Diamonds",
        items: [
          { id: "ff_70", name: "70 Diamonds", price: 9500, sku: "FF_70DM", bonus: "" },
          { id: "ff_140", name: "140 Diamonds", price: 19000, sku: "FF_140DM", bonus: "" },
          { id: "ff_355", name: "355 Diamonds", price: 47000, sku: "FF_355DM", bonus: "+15 Bonus" },
          { id: "ff_720", name: "720 Diamonds", price: 93000, sku: "FF_720DM", bonus: "+30 Bonus" }
        ]
      },
      {
        groupName: "Membership",
        items: [
          { id: "ff_weekly", name: "Weekly Diamond Pass", price: 28000, sku: "FF_WDP", bonus: "450 Diamonds" },
          { id: "ff_monthly", name: "Monthly Membership", price: 110000, sku: "FF_MMP", bonus: "1900 Diamonds" }
        ]
      }
    ],
    products: [
      { id: "ff_70", name: "70 Diamonds", price: 9500, sku: "FF_70DM", bonus: "" },
      { id: "ff_140", name: "140 Diamonds", price: 19000, sku: "FF_140DM", bonus: "" },
      { id: "ff_355", name: "355 Diamonds", price: 47000, sku: "FF_355DM", bonus: "+15 Bonus" },
      { id: "ff_720", name: "720 Diamonds", price: 93000, sku: "FF_720DM", bonus: "+30 Bonus" },
      { id: "ff_weekly", name: "Weekly Diamond Pass", price: 28000, sku: "FF_WDP", bonus: "450 Diamonds" },
      { id: "ff_monthly", name: "Monthly Membership", price: 110000, sku: "FF_MMP", bonus: "1900 Diamonds" }
    ]
  },
  {
    id: "game4",
    title: "PUBG Mobile",
    developer: "Level Infinite",
    category: "Mobile",
    isPopular: true,
    banner: "/images/games/pubg.svg",
    description: "Top up UC PUBG Mobile resmi dan instan via Player ID.",
    hasZoneId: false,
    status: "Aktif",
    productGroups: [
      {
        groupName: "Unknown Cash (UC)",
        items: [
          { id: "pubg_60", name: "60 UC", price: 14500, sku: "PUBG_60UC", bonus: "" },
          { id: "pubg_325", name: "300+25 UC", price: 68000, sku: "PUBG_325UC", bonus: "+25 Bonus" },
          { id: "pubg_660", name: "600+60 UC", price: 135000, sku: "PUBG_660UC", bonus: "+60 Bonus" },
          { id: "pubg_1800", name: "1500+300 UC", price: 340000, sku: "PUBG_1800UC", bonus: "+300 Bonus" }
        ]
      }
    ],
    products: [
      { id: "pubg_60", name: "60 UC", price: 14500, sku: "PUBG_60UC", bonus: "" },
      { id: "pubg_325", name: "300+25 UC", price: 68000, sku: "PUBG_325UC", bonus: "+25 Bonus" },
      { id: "pubg_660", name: "600+60 UC", price: 135000, sku: "PUBG_660UC", bonus: "+60 Bonus" },
      { id: "pubg_1800", name: "1500+300 UC", price: 340000, sku: "PUBG_1800UC", bonus: "+300 Bonus" }
    ]
  },
  {
    id: "game5",
    title: "Genshin Impact",
    developer: "HoYoverse",
    category: "PC",
    isPopular: true,
    banner: "/images/games/genshin.svg",
    description: "Top up Genesis Crystals & Blessing of Welkin Moon Genshin Impact via UID dan Server Asia/Global.",
    hasZoneId: true,
    status: "Aktif",
    productGroups: [
      {
        groupName: "Genesis Crystals",
        items: [
          { id: "gi_60gc", name: "60 Genesis Crystals", price: 15500, sku: "GI_60GC", bonus: "" },
          { id: "gi_300gc", name: "300+30 Genesis Crystals", price: 75000, sku: "GI_300GC", bonus: "" },
          { id: "gi_980gc", name: "980+110 Genesis Crystals", price: 235000, sku: "GI_980GC", bonus: "" },
          { id: "gi_welkin", name: "Blessing of the Welkin Moon", price: 78000, sku: "GI_WELKIN", bonus: "30 Hari" }
        ]
      }
    ],
    products: [
      { id: "gi_60gc", name: "60 Genesis Crystals", price: 15500, sku: "GI_60GC", bonus: "" },
      { id: "gi_300gc", name: "300+30 Genesis Crystals", price: 75000, sku: "GI_300GC", bonus: "" },
      { id: "gi_980gc", name: "980+110 Genesis Crystals", price: 235000, sku: "GI_980GC", bonus: "" },
      { id: "gi_welkin", name: "Blessing of the Welkin Moon", price: 78000, sku: "GI_WELKIN", bonus: "30 Hari" }
    ]
  },
  {
    id: "game6",
    title: "Honor of Kings",
    developer: "Tencent Games",
    category: "Mobile",
    isPopular: false,
    banner: "/images/games/hok.svg",
    description: "Top up Tokens Honor of Kings resmi dan instan.",
    hasZoneId: false,
    status: "Aktif",
    productGroups: [
      {
        groupName: "Tokens",
        items: [
          { id: "hok_80tk", name: "80 Tokens", price: 14000, sku: "HOK_80TK", bonus: "" },
          { id: "hok_240tk", name: "240+15 Tokens", price: 42000, sku: "HOK_240TK", bonus: "+15 Bonus" }
        ]
      }
    ],
    products: [
      { id: "hok_80tk", name: "80 Tokens", price: 14000, sku: "HOK_80TK", bonus: "" },
      { id: "hok_240tk", name: "240+15 Tokens", price: 42000, sku: "HOK_240TK", bonus: "+15 Bonus" }
    ]
  },
  {
    id: "game7",
    title: "Steam Wallet Code",
    developer: "Valve Corporation",
    category: "Voucher",
    isPopular: false,
    banner: "/images/games/steam.svg",
    description: "Voucher Steam Wallet IDR untuk beli game di platform Steam.",
    hasZoneId: false,
    status: "Aktif",
    productGroups: [
      {
        groupName: "Voucher IDR",
        items: [
          { id: "steam_60k", name: "IDR 60.000 Voucher", price: 65000, sku: "STEAM_60K", bonus: "" },
          { id: "steam_120k", name: "IDR 120.000 Voucher", price: 130000, sku: "STEAM_120K", bonus: "" }
        ]
      }
    ],
    products: [
      { id: "steam_60k", name: "IDR 60.000 Voucher", price: 65000, sku: "STEAM_60K", bonus: "" },
      { id: "steam_120k", name: "IDR 120.000 Voucher", price: 130000, sku: "STEAM_120K", bonus: "" }
    ]
  },
  {
    id: "game8",
    title: "Google Play Voucher",
    developer: "Google LLC",
    category: "Voucher",
    isPopular: false,
    banner: "/images/games/googleplay.svg",
    description: "Kode voucher saldo Google Play resmi regional Indonesia.",
    hasZoneId: false,
    status: "Aktif",
    productGroups: [
      {
        groupName: "Voucher IDR",
        items: [
          { id: "gp_50k", name: "Saldo Rp 50.000", price: 52000, sku: "GP_50K", bonus: "" },
          { id: "gp_100k", name: "Saldo Rp 100.000", price: 104000, sku: "GP_100K", bonus: "" }
        ]
      }
    ],
    products: [
      { id: "gp_50k", name: "Saldo Rp 50.000", price: 52000, sku: "GP_50K", bonus: "" },
      { id: "gp_100k", name: "Saldo Rp 100.000", price: 104000, sku: "GP_100K", bonus: "" }
    ]
  }
];

export const PAYMENT_CHANNELS = [
  {
    group: "E-Wallet & QRIS Instan",
    methods: [
      { id: "qris", name: "QRIS (Semua E-Wallet)", fee: 800, logo: "/images/payments/qris.svg", badge: "Otomatis & Tercepat" },
      { id: "gopay", name: "GoPay Instan", fee: 1000, logo: "/images/payments/gopay.svg", badge: "Direct App" },
      { id: "dana", name: "DANA", fee: 1000, logo: "/images/payments/dana.svg", badge: "Direct Pay" },
      { id: "ovo", name: "OVO", fee: 1000, logo: "/images/payments/ovo.svg", badge: "Instant" }
    ]
  },
  {
    group: "Transfer Virtual Account",
    methods: [
      { id: "bca", name: "BCA Virtual Account", fee: 2500, logo: "/images/payments/bca.svg", badge: "Verifikasi Otomatis" },
      { id: "mandiri", name: "Mandiri Virtual Account", fee: 2500, logo: "/images/payments/mandiri.svg", badge: "Verifikasi Otomatis" }
    ]
  }
];

export const useGamesStore = defineStore('games', {
  state: () => ({
    heroSlides: INITIAL_HERO_SLIDES,
    flashSales: INITIAL_FLASH_SALES,
    games: JSON.parse(localStorage.getItem('mptopup_games_catalog_v3') || 'null') || INITIAL_GAMES,
    paymentChannels: PAYMENT_CHANNELS,
    selectedCategory: 'ALL',
    searchQuery: ''
  }),

  getters: {
    filteredGames: (state) => {
      return state.games.filter(g => {
        const matchesCategory = state.selectedCategory === 'ALL' 
          ? true 
          : (state.selectedCategory === 'POPULAR' ? g.isPopular : g.category === state.selectedCategory);
        const matchesQuery = !state.searchQuery 
          ? true 
          : (g.title.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
             g.developer.toLowerCase().includes(state.searchQuery.toLowerCase()));
        return matchesCategory && matchesQuery && g.status === 'Aktif';
      });
    },

    popularGames: (state) => {
      return state.games.filter(g => g.isPopular && g.status === 'Aktif');
    }
  },

  actions: {
    saveToStorage() {
      localStorage.setItem('mptopup_games_catalog_v3', JSON.stringify(this.games));
    },

    getGameById(id) {
      return this.games.find(g => g.id === id) || this.games[0];
    },

    addGame(newGame) {
      this.games.unshift(newGame);
      this.saveToStorage();
    },

    deleteGame(index) {
      this.games.splice(index, 1);
      this.saveToStorage();
    },

    addSku(gameIndex, skuItem) {
      if (!this.games[gameIndex].products) {
        this.games[gameIndex].products = [];
      }
      this.games[gameIndex].products.push(skuItem);
      this.saveToStorage();
    },

    deleteSku(gameIndex, skuIndex) {
      if (this.games[gameIndex] && this.games[gameIndex].products) {
        this.games[gameIndex].products.splice(skuIndex, 1);
        this.saveToStorage();
      }
    }
  }
});
