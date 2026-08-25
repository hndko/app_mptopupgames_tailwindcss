/**
 * MPTopUp - Centralized Data Store & LocalStorage Sync
 */

const INITIAL_GAMES = [
  {
    id: "game1",
    title: "Mobile Legends: Bang Bang",
    developer: "Moonton",
    category: "Mobile",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    description: "Top up Diamond Mobile Legends resmi & instan 24 jam. Masukkan User ID dan Zone ID Anda.",
    hasZoneId: true,
    status: "Aktif",
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
    banner: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
    description: "Top up Valorant Points (VP) resmi server Indonesia. Masukkan Riot ID lengkap dengan Tagline.",
    hasZoneId: false,
    status: "Aktif",
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
    banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    description: "Top up Diamonds Free Fire murah & proses instan. Masukkan Player ID akun Free Fire Anda.",
    hasZoneId: false,
    status: "Aktif",
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
    banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    description: "Top up Unknown Cash (UC) PUBG Mobile resmi & cepat. Masukkan Player ID akun PUBG Mobile Anda.",
    hasZoneId: false,
    status: "Aktif",
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
    banner: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
    description: "Top up Genesis Crystals Genshin Impact. Masukkan UID dan Server Game Anda.",
    hasZoneId: true,
    status: "Aktif",
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
    banner: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80",
    description: "Top up Tokens Honor of Kings resmi dan instan.",
    hasZoneId: false,
    status: "Aktif",
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
    banner: "https://images.unsplash.com/photo-1612287233207-6a164b3ef86d?auto=format&fit=crop&w=800&q=80",
    description: "Voucher Steam Wallet IDR untuk beli game di platform Steam.",
    hasZoneId: false,
    status: "Aktif",
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
    banner: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    description: "Kode voucher resmi Google Play Store Indonesia.",
    hasZoneId: false,
    status: "Aktif",
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
      const data = localStorage.getItem('mptopup_games_catalog');
      if (data) return JSON.parse(data);
    } catch (e) { }
    localStorage.setItem('mptopup_games_catalog', JSON.stringify(INITIAL_GAMES));
    return INITIAL_GAMES;
  },

  saveGames(games) {
    localStorage.setItem('mptopup_games_catalog', JSON.stringify(games));
  },

  getOrders() {
    try {
      const data = localStorage.getItem('mptopup_orders_history');
      if (data) return JSON.parse(data);
    } catch (e) { }
    localStorage.setItem('mptopup_orders_history', JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  },

  saveOrders(orders) {
    localStorage.setItem('mptopup_orders_history', JSON.stringify(orders));
  },

  addOrder(newOrder) {
    const orders = this.getOrders();
    orders.unshift(newOrder);
    this.saveOrders(orders);
    localStorage.setItem('latestOrder', JSON.stringify(newOrder));
  }
};
