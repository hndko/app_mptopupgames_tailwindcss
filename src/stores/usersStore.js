import { defineStore } from 'pinia';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

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
    statusFilter: 'all',
    isLoading: false
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
    async fetchUsers() {
      if (!isSupabaseConfigured || !supabase) return;
      try {
        this.isLoading = true;
        const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          this.users = data.map((p, idx) => ({
            id: p.id ? `USR-${String(idx + 1).padStart(3, '0')}` : `USR-00${idx + 1}`,
            name: p.full_name || 'Member MPTopUp',
            email: p.email,
            phone: p.phone_number || '-',
            role: p.role === 'admin' ? 'Admin' : 'Pelanggan',
            status: 'Aktif',
            date: new Date(p.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
            avatar: p.avatar_url || '/images/avatars/user-1.svg',
            rawId: p.id
          }));
        }
      } catch (err) {
        console.warn('Gagal memuat profil pengguna dari database, fallback lokal:', err);
      } finally {
        this.isLoading = false;
      }
    },

    addUser(userData) {
      const newUser = {
        id: "USR-00" + (this.users.length + 1),
        date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
        avatar: "/images/avatars/user-1.svg",
        ...userData
      };
      this.users.unshift(newUser);
    },

    async updateUser(index, userData) {
      if (this.users[index]) {
        this.users[index] = { ...this.users[index], ...userData };
        const user = this.users[index];
        if (user.rawId && isSupabaseConfigured && supabase) {
          try {
            await supabase.from('profiles').update({
              full_name: user.name,
              phone_number: user.phone,
              role: user.role === 'Admin' ? 'admin' : 'member'
            }).eq('id', user.rawId);
          } catch (err) {
            console.warn('Update profil database gagal:', err);
          }
        }
      }
    },

    deleteUser(index) {
      this.users.splice(index, 1);
    }
  }
});
