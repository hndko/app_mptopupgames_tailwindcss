import { defineStore } from 'pinia';

export const INITIAL_USERS = [
  { id: "USR-001", name: "Budi Santoso", email: "budi@email.com", phone: "081234567890", role: "Pelanggan", status: "Aktif", date: "15 Agu 2026", avatar: "/images/avatars/user-1.svg" },
  { id: "USR-002", name: "Siti Rahma", email: "siti@email.com", phone: "081987654321", role: "Pelanggan", status: "Aktif", date: "16 Agu 2026", avatar: "/images/avatars/user-2.svg" },
  { id: "USR-003", name: "Dimas Pratama", email: "dimas@email.com", phone: "085678901234", role: "Pelanggan", status: "Nonaktif", date: "17 Agu 2026", avatar: "/images/avatars/user-3.svg" },
  { id: "USR-004", name: "Admin Utama", email: "admin@mptopup.com", phone: "081298765432", role: "Admin", status: "Aktif", date: "01 Agu 2026", avatar: "/images/avatars/admin-avatar.svg" }
];

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: INITIAL_USERS,
    searchQuery: '',
    roleFilter: 'all',
    statusFilter: 'all'
  }),

  getters: {
    filteredUsers: (state) => {
      return state.users.filter(u => {
        const matchesRole = state.roleFilter === 'all' || u.role === state.roleFilter;
        const matchesStatus = state.statusFilter === 'all' || u.status === state.statusFilter;
        const q = state.searchQuery.toLowerCase().trim();
        const matchesQuery = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q);
        return matchesRole && matchesStatus && matchesQuery;
      });
    }
  },

  actions: {
    addUser(userData) {
      const newUser = {
        id: "USR-00" + (this.users.length + 1),
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        avatar: "/images/avatars/user-1.svg",
        ...userData
      };
      this.users.unshift(newUser);
    },

    updateUser(index, userData) {
      if (this.users[index]) {
        this.users[index] = { ...this.users[index], ...userData };
      }
    },

    deleteUser(index) {
      this.users.splice(index, 1);
    }
  }
});
