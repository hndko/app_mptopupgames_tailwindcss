/**
 * MPTopUp - Centralized Data Store & LocalStorage Sync
 * Enhanced with OuraStore-inspired architecture
 */

const HERO_SLIDES = [
  {
    id: "slide1",
    badge: "⚡ EVENT SPESIAL MLBB",
    title: "TOP UP DIAMONDS INSTAN",
    highlight: "CASHBACK HINGGA 20%",
    description: "Proses kilat 1-3 detik otomatis masuk ke akun Mobile Legends kamu.",
    banner: "assets/images/promo/hero-slide-1.svg",
    link: "pages/produk.html?game=game1"
  },
  {
    id: "slide2",
    badge: "🎯 VALORANT NIGHT MARKET",
    title: "TOP UP VALORANT POINTS",
    highlight: "BONUS +10% EKSTRA VP",
    description: "Selesaikan pesananmu dalam hitungan detik via Riot ID server Indonesia.",
    banner: "assets/images/promo/hero-slide-2.svg",
    link: "pages/produk.html?game=game2"
  },
  {
    id: "slide3",
    badge: "✨ GENSHIN & VOUCHER",
    title: "BLESSING OF WELKIN MOON",
    highlight: "DISKON POTONGAN SPESIAL",
    description: "Top up Genesis Crystals & Welkin Moon aman 100% via UID Server Asia.",
    banner: "assets/images/promo/hero-slide-3.svg",
    link: "pages/produk.html?game=game5"
  }
];

const FLASH_SALES = [
  {
    id: "fs1",
    gameId: "game1",
    gameTitle: "Mobile Legends",
    item: "250 Diamonds + 10 Bonus",
    originalPrice: 85000,
    salePrice: 69000,
    discount: "19%",
    soldPercent: 82,
    banner: "assets/images/games/mlbb.svg"
  },
  {
    id: "fs2",
    gameId: "game2",
    gameTitle: "Valorant",
    item: "1000 Valorant Points",
    originalPrice: 115000,
    salePrice: 100000,
    discount: "13%",
    soldPercent: 68,
    banner: "assets/images/games/valorant.svg"
  },
  {
    id: "fs3",
    gameId: "game3",
    gameTitle: "Free Fire",
    item: "720 Diamonds + 20 Bonus",
    originalPrice: 110000,
    salePrice: 94000,
    discount: "15%",
    soldPercent: 91,
    banner: "assets/images/games/freefire.svg"
  },
  {
    id: "fs4",
    gameId: "game5",
    gameTitle: "Genshin Impact",
    item: "Blessing of the Welkin Moon",
    originalPrice: 95000,
    salePrice: 78000,
    discount: "18%",
    soldPercent: 75,
    banner: "assets/images/games/genshin.svg"
  }
];

const FAQS = [
  {
    question: "Berapa lama proses pengisian top up di MPTopUp?",
    answer: "Proses pengisian berjalan secara otomatis oleh sistem kami dalam waktu 1 hingga 5 detik setelah pembayaran Anda terkonfirmasi berhasil oleh Payment Gateway."
  },
  {
    question: "Apakah top up di MPTopUp 100% aman dan legal?",
    answer: "Ya, 100% aman dan legal! Semua item, diamonds, dan voucher bersumber langsung dari distributor resmi penerbit game (Moonton, Riot Games, Garena, Level Infinite, HoYoverse, Tencent) sehingga akun Anda bebas resiko banned."
  },
  {
    question: "Apa saja metode pembayaran yang didukung?",
    answer: "Kami mendukung pembayaran instan tanpa ribet melalui QRIS (bisa scan pakai GoPay, OVO, DANA, ShopeePay, LinkAja, BCA Mobile), E-Wallet, dan Virtual Account Bank ternama (BCA, Mandiri, BNI, BRI)."
  },
  {
    question: "Bagaimana jika saya salah memasukkan User ID atau Server ID?",
    answer: "Pastikan Anda memeriksa kembali data User ID dan Server ID sebelum klik bayar. Jika pesanan belum terproses di server game, segera hubungi Customer Service WhatsApp kami melalui tombol melayang di pojok kanan bawah dengan melampirkan nomor pesanan #MPxxxxxx."
  },
  {
    question: "Bagaimana cara mengecek status transaksi saya?",
    answer: "Anda dapat memantau status pesanan kapan saja melalui menu 'Lacak Pesanan' dengan memasukkan nomor pesanan (#MP...) atau nomor WhatsApp yang Anda gunakan saat pemesanan."
  }
];

const LIVE_TRANSACTIONS = [
  { user: "0812****9012", item: "250 Diamonds MLBB", time: "Baru saja", game: "Mobile Legends" },
  { user: "0857****1140", item: "1000 Valorant Points", time: "12 detik lalu", game: "Valorant" },
  { user: "0896****8823", item: "Weekly Diamond Pass", time: "28 detik lalu", game: "Mobile Legends" },
  { user: "0821****4491", item: "Blessing of Welkin Moon", time: "45 detik lalu", game: "Genshin Impact" },
  { user: "0878****3319", item: "720 Diamonds FF", time: "1 menit lalu", game: "Free Fire" },
  { user: "0813****7728", item: "660 UC PUBG Mobile", time: "2 menit lalu", game: "PUBG Mobile" }
];

const INITIAL_GAMES = [
  {
    id: "game1",
    title: "Mobile Legends: Bang Bang",
    developer: "Moonton",
    category: "Mobile",
    isPopular: true,
    banner: "assets/images/games/mlbb.svg",
    description: "Top up Diamond Mobile Legends resmi & instan 24 jam. Masukkan User ID dan Zone ID Anda.",
    hasZoneId: true,
    status: "Aktif",
    productGroups: [
      {
        groupName: "Nominal Diamonds",
        items: [
          { id: "mlbb_50dm", name: "50 Diamonds", price: 14500, sku: "MLBB_50DM", bonus: "" },
          { id: "mlbb_100dm", name: "100 Diamonds", price: 28500, sku: "MLBB_100DM", bonus: "" },
          { id: "mlbb_250dm", name: "250 Diamonds", price: 69000, sku: "MLBB_250DM", bonus: "+10 Bonus" },
          { id: "mlbb_500dm", name: "500 Diamonds", price: 135000, sku: "MLBB_500DM", bonus: "+25 Bonus" },
          { id: "mlbb_1000dm", name: "1000 Diamonds", price: 268000, sku: "MLBB_1000DM", bonus: "+60 Bonus" }
        ]
      },
      {
        groupName: "Membership & Pass",
        items: [
          { id: "mlbb_weekly", name: "Weekly Diamond Pass", price: 29500, sku: "MLBB_WEEKLY", bonus: "Hemat 60%" },
          { id: "mlbb_twilight", name: "Twilight Pass", price: 145000, sku: "MLBB_TWILIGHT", bonus: "Spesial" }
        ]
      }
    ],
    products: [
      { id: "mlbb_50dm", name: "50 Diamonds", price: 14500, sku: "MLBB_50DM", bonus: "" },
      { id: "mlbb_100dm", name: "100 Diamonds", price: 28500, sku: "MLBB_100DM", bonus: "" },
      { id: "mlbb_250dm", name: "250 Diamonds", price: 69000, sku: "MLBB_250DM", bonus: "+10 Bonus" },
      { id: "mlbb_500dm", name: "500 Diamonds", price: 135000, sku: "MLBB_500DM", bonus: "+25 Bonus" },
      { id: "mlbb_1000dm", name: "1000 Diamonds", price: 268000, sku: "MLBB_1000DM", bonus: "+60 Bonus" },
      { id: "mlbb_weekly", name: "Weekly Diamond Pass", price: 29500, sku: "MLBB_WEEKLY", bonus: "Hemat 60%" }
    ]
  },
  {
    id: "game2",
    title: "Valorant",
    developer: "Riot Games",
    category: "PC",
    isPopular: true,
    banner: "assets/images/games/valorant.svg",
    description: "Top up Valorant Points (VP) resmi server Indonesia. Masukkan Riot ID lengkap dengan Tagline.",
    hasZoneId: false,
    status: "Aktif",
    productGroups: [
      {
        groupName: "Points Nominal",
        items: [
          { id: "val_475", name: "475 Points", price: 50000, sku: "VAL_475VP", bonus: "" },
          { id: "val_1000", name: "1000 Points", price: 100000, sku: "VAL_1000VP", bonus: "" },
          { id: "val_2050", name: "2050 Points", price: 200000, sku: "VAL_2050VP", bonus: "+50 Bonus" },
          { id: "val_3650", name: "3650 Points", price: 350000, sku: "VAL_3650VP", bonus: "+150 Bonus" },
          { id: "val_5350", name: "5350 Points", price: 500000, sku: "VAL_5350VP", bonus: "+350 Bonus" }
        ]
      }
    ],
    products: [
      { id: "val_475", name: "475 Points", price: 50000, sku: "VAL_475VP", bonus: "" },
      { id: "val_1000", name: "1000 Points", price: 100000, sku: "VAL_1000VP", bonus: "" },
      { id: "val_2050", name: "2050 Points", price: 200000, sku: "VAL_2050VP", bonus: "+50 Bonus" },
      { id: "val_3650", name: "3650 Points", price: 350000, sku: "VAL_3650VP", bonus: "+150 Bonus" },
      { id: "val_5350", name: "5350 Points", price: 500000, sku: "VAL_5350VP", bonus: "+350 Bonus" }
    ]
  },
  {
    id: "game3",
    title: "Free Fire",
    developer: "Garena",
    category: "Mobile",
    isPopular: true,
    banner: "assets/images/games/freefire.svg",
    description: "Top up Diamonds Free Fire murah & proses instan. Masukkan Player ID akun Free Fire Anda.",
    hasZoneId: false,
    status: "Aktif",
    productGroups: [
      {
        groupName: "Nominal Diamonds",
        items: [
          { id: "ff_70dm", name: "70 Diamonds", price: 9500, sku: "FF_70DM", bonus: "" },
          { id: "ff_140dm", name: "140 Diamonds", price: 19000, sku: "FF_140DM", bonus: "" },
          { id: "ff_355dm", name: "355 Diamonds", price: 47000, sku: "FF_355DM", bonus: "" },
          { id: "ff_720dm", name: "720 Diamonds", price: 94000, sku: "FF_720DM", bonus: "+20 Bonus" }
        ]
      },
      {
        groupName: "Membership",
        items: [
          { id: "ff_weekly", name: "Weekly Membership", price: 28000, sku: "FF_WEEKLY", bonus: "Spesial" },
          { id: "ff_monthly", name: "Monthly Membership", price: 110000, sku: "FF_MONTHLY", bonus: "Hemat 4x" }
        ]
      }
    ],
    products: [
      { id: "ff_70dm", name: "70 Diamonds", price: 9500, sku: "FF_70DM", bonus: "" },
      { id: "ff_140dm", name: "140 Diamonds", price: 19000, sku: "FF_140DM", bonus: "" },
      { id: "ff_355dm", name: "355 Diamonds", price: 47000, sku: "FF_355DM", bonus: "" },
      { id: "ff_720dm", name: "720 Diamonds", price: 94000, sku: "FF_720DM", bonus: "+20 Bonus" },
      { id: "ff_weekly", name: "Weekly Membership", price: 28000, sku: "FF_WEEKLY", bonus: "Spesial" }
    ]
  },
  {
    id: "game4",
    title: "PUBG Mobile",
    developer: "Level Infinite",
    category: "Mobile",
    isPopular: false,
    banner: "assets/images/games/pubg.svg",
    description: "Top up Unknown Cash (UC) PUBG Mobile resmi & cepat. Masukkan Player ID akun PUBG Mobile Anda.",
    hasZoneId: false,
    status: "Aktif",
    productGroups: [
      {
        groupName: "Nominal UC",
        items: [
          { id: "pubg_60uc", name: "60 UC", price: 14000, sku: "PUBG_60UC", bonus: "" },
          { id: "pubg_325uc", name: "325 UC", price: 68000, sku: "PUBG_325UC", bonus: "+25 Bonus" },
          { id: "pubg_660uc", name: "660 UC", price: 135000, sku: "PUBG_660UC", bonus: "+60 Bonus" },
          { id: "pubg_1800uc", name: "1800 UC", price: 345000, sku: "PUBG_1800UC", bonus: "+300 Bonus" }
        ]
      }
    ],
    products: [
      { id: "pubg_60uc", name: "60 UC", price: 14000, sku: "PUBG_60UC", bonus: "" },
      { id: "pubg_325uc", name: "325 UC", price: 68000, sku: "PUBG_325UC", bonus: "+25 Bonus" },
      { id: "pubg_660uc", name: "660 UC", price: 135000, sku: "PUBG_660UC", bonus: "+60 Bonus" },
      { id: "pubg_1800uc", name: "1800 UC", price: 345000, sku: "PUBG_1800UC", bonus: "+300 Bonus" }
    ]
  },
  {
    id: "game5",
    title: "Genshin Impact",
    developer: "HoYoverse",
    category: "Mobile",
    isPopular: true,
    banner: "assets/images/games/genshin.svg",
    description: "Top up Genesis Crystals Genshin Impact. Masukkan UID dan Server Game Anda.",
    hasZoneId: true,
    status: "Aktif",
    productGroups: [
      {
        groupName: "Genesis Crystals",
        items: [
          { id: "gi_60gc", name: "60 Genesis Crystals", price: 15500, sku: "GI_60GC", bonus: "" },
          { id: "gi_300gc", name: "300+30 Genesis Crystals", price: 75000, sku: "GI_300GC", bonus: "" },
          { id: "gi_980gc", name: "980+110 Genesis Crystals", price: 235000, sku: "GI_980GC", bonus: "" }
        ]
      },
      {
        groupName: "Blessing & Pass",
        items: [
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
    banner: "assets/images/games/hok.svg",
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
    banner: "assets/images/games/steam.svg",
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
    developer: "Google",
    category: "Voucher",
    isPopular: false,
    banner: "assets/images/games/googleplay.svg",
    description: "Kode voucher resmi Google Play Store Indonesia.",
    hasZoneId: false,
    status: "Aktif",
    productGroups: [
      {
        groupName: "Kode Voucher IDR",
        items: [
          { id: "gp_50k", name: "Google Play Rp 50.000", price: 52000, sku: "GP_50K", bonus: "" },
          { id: "gp_100k", name: "Google Play Rp 100.000", price: 103000, sku: "GP_100K", bonus: "" }
        ]
      }
    ],
    products: [
      { id: "gp_50k", name: "Google Play Rp 50.000", price: 52000, sku: "GP_50K", bonus: "" },
      { id: "gp_100k", name: "Google Play Rp 100.000", price: 103000, sku: "GP_100K", bonus: "" }
    ]
  }
];

const INITIAL_ORDERS = [
  {
    id: "#MP884912",
    date: "25 Agu 2026, 10:15",
    game: { title: "Mobile Legends: Bang Bang" },
    product: { name: "250 Diamonds" },
    userId: "89127381",
    zoneId: "2024",
    total: 69000,
    payment: { name: "QRIS" },
    status: "Selesai"
  },
  {
    id: "#MP723149",
    date: "25 Agu 2026, 09:40",
    game: { title: "Valorant" },
    product: { name: "1000 Points" },
    userId: "AgentViper#ID1",
    zoneId: "",
    total: 100000,
    payment: { name: "GoPay" },
    status: "Pending"
  },
  {
    id: "#MP512903",
    date: "24 Agu 2026, 20:20",
    game: { title: "Free Fire" },
    product: { name: "Weekly Membership" },
    userId: "FFPlayer99",
    zoneId: "",
    total: 28000,
    payment: { name: "DANA" },
    status: "Gagal"
  },
  {
    id: "#MP419821",
    date: "24 Agu 2026, 17:10",
    game: { title: "PUBG Mobile" },
    product: { name: "660 UC" },
    userId: "PUBGKing",
    zoneId: "",
    payment: { name: "BCA VA" },
    total: 135000,
    status: "Selesai"
  },
  {
    id: "#MP310948",
    date: "23 Agu 2026, 14:05",
    game: { title: "Genshin Impact" },
    product: { name: "Blessing of Welkin" },
    userId: "800192831",
    zoneId: "Asia",
    payment: { name: "QRIS" },
    total: 78000,
    status: "Selesai"
  }
];

const TopUpStorage = {
  getGames() {
    try {
      const data = localStorage.getItem('mptopup_games_catalog_v3');
      if (data) return JSON.parse(data);
    } catch (e) { }
    localStorage.setItem('mptopup_games_catalog_v3', JSON.stringify(INITIAL_GAMES));
    return INITIAL_GAMES;
  },

  saveGames(games) {
    localStorage.setItem('mptopup_games_catalog_v3', JSON.stringify(games));
  },

  getOrders() {
    try {
      const data = localStorage.getItem('mptopup_orders_history_v3');
      if (data) return JSON.parse(data);
    } catch (e) { }
    localStorage.setItem('mptopup_orders_history_v3', JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  },

  saveOrders(orders) {
    localStorage.setItem('mptopup_orders_history_v3', JSON.stringify(orders));
  },

  addOrder(newOrder) {
    const orders = this.getOrders();
    orders.unshift(newOrder);
    this.saveOrders(orders);
    localStorage.setItem('latestOrder', JSON.stringify(newOrder));
  },

  resolveImagePath(path) {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const isSubfolder = window.location.pathname.includes('/pages/') || 
                        window.location.pathname.includes('/admin/') || 
                        window.location.pathname.includes('/auth/');
    return isSubfolder ? `../${path}` : path;
  }
};
