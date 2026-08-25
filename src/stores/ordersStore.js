import { defineStore } from 'pinia';

export const INITIAL_ORDERS = [
  {
    id: "#MP884912",
    date: "25 Agu 2026, 10:45",
    game: { title: "Mobile Legends" },
    product: { name: "250 Diamonds" },
    userId: "89127381",
    zoneId: "2024",
    total: 69000,
    payment: { name: "QRIS" },
    whatsapp: "081234567890",
    status: "Selesai"
  },
  {
    id: "#MP723149",
    date: "25 Agu 2026, 09:15",
    game: { title: "Valorant" },
    product: { name: "1000 Points" },
    userId: "AgentViper",
    zoneId: "ID1",
    total: 100000,
    payment: { name: "GoPay" },
    whatsapp: "081987654321",
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
    whatsapp: "085678901234",
    status: "Gagal"
  },
  {
    id: "#MP419821",
    date: "24 Agu 2026, 17:10",
    game: { title: "PUBG Mobile" },
    product: { name: "660 UC" },
    userId: "PUBGKing",
    zoneId: "",
    total: 135000,
    payment: { name: "BCA VA" },
    whatsapp: "087812345678",
    status: "Selesai"
  },
  {
    id: "#MP310948",
    date: "23 Agu 2026, 14:05",
    game: { title: "Genshin Impact" },
    product: { name: "Blessing of Welkin" },
    userId: "800192831",
    zoneId: "Asia",
    total: 78000,
    payment: { name: "QRIS" },
    whatsapp: "081299887766",
    status: "Selesai"
  }
];

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: JSON.parse(localStorage.getItem('mptopup_orders_history_v3') || 'null') || INITIAL_ORDERS,
    latestOrder: JSON.parse(localStorage.getItem('latestOrder') || 'null') || INITIAL_ORDERS[0],
    searchQuery: '',
    statusFilter: 'all'
  }),

  getters: {
    filteredOrders: (state) => {
      return state.orders.filter(order => {
        const matchesStatus = state.statusFilter === 'all' || order.status === state.statusFilter;
        const q = state.searchQuery.toLowerCase().trim();
        const matchesQuery = !q || 
          order.id.toLowerCase().includes(q) ||
          (order.game && order.game.title && order.game.title.toLowerCase().includes(q)) ||
          (order.userId && order.userId.toLowerCase().includes(q)) ||
          (order.product && order.product.name && order.product.name.toLowerCase().includes(q));
        return matchesStatus && matchesQuery;
      });
    }
  },

  actions: {
    saveToStorage() {
      localStorage.setItem('mptopup_orders_history_v3', JSON.stringify(this.orders));
    },

    createOrder(orderData) {
      const newOrder = {
        id: "#MP" + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + 
              new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':'),
        ...orderData,
        status: "Selesai"
      };

      this.orders.unshift(newOrder);
      this.latestOrder = newOrder;
      this.saveToStorage();
      localStorage.setItem('latestOrder', JSON.stringify(newOrder));
      return newOrder;
    },

    updateOrderStatus(index, newStatus) {
      if (this.orders[index]) {
        this.orders[index].status = newStatus;
        this.saveToStorage();
      }
    },

    getOrderById(id) {
      if (!id) return this.latestOrder;
      return this.orders.find(o => o.id.toLowerCase() === id.toLowerCase()) || this.latestOrder;
    }
  }
});
