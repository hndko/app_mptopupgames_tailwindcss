<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 class="text-lg font-bold text-white">Manajemen Akun Pengguna</h2>
        <p class="text-xs text-slate-400">Kelola akun member terdaftar dan hak akses administrator.</p>
      </div>

      <button 
        type="button" 
        @click="openAddUser"
        class="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-600/20 transition-all"
      >
        <i class="fas fa-user-plus text-xs"></i> <span>Tambah Pengguna</span>
      </button>
    </div>

    <!-- Filter & Search Bar -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center gap-3">
      <div class="relative flex-1 w-full">
        <i class="fas fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
        <input 
          type="search" 
          v-model="usersStore.searchQuery" 
          placeholder="Cari berdasarkan nama, email, atau ID pengguna..."
          class="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-sky-500"
        >
      </div>

      <div class="relative w-full sm:w-44">
        <i class="fas fa-filter absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
        <select 
          v-model="usersStore.roleFilter" 
          class="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500 cursor-pointer"
        >
          <option value="all">Semua Peran</option>
          <option value="Pelanggan">Pelanggan</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
    </div>

    <!-- Data Table Container with # numbering & icon-only action -->
    <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-slate-300">
          <thead class="bg-slate-950/80 text-slate-400 uppercase font-bold border-b border-slate-800 text-[11px]">
            <tr>
              <th scope="col" class="py-3.5 px-4 text-center w-12">#</th>
              <th scope="col" class="py-3.5 px-4">Pengguna</th>
              <th scope="col" class="py-3.5 px-4">Kontak</th>
              <th scope="col" class="py-3.5 px-4">Peran (Role)</th>
              <th scope="col" class="py-3.5 px-4">Terdaftar</th>
              <th scope="col" class="py-3.5 px-4 text-center">Status</th>
              <th scope="col" class="py-3.5 px-4 text-center w-24">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/80">
            <tr v-for="(user, idx) in usersStore.filteredUsers" :key="user.id" class="hover:bg-slate-800/40 transition-colors">
              <td class="py-3 px-4 font-mono text-slate-400 text-center font-bold">{{ idx + 1 }}</td>
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <img :src="user.avatar" :alt="user.name" class="w-8 h-8 rounded-xl object-cover border border-slate-700 bg-slate-950">
                  <div>
                    <p class="font-bold text-white">{{ user.name }}</p>
                    <p class="text-[11px] text-slate-400 font-mono">{{ user.id }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4">
                <p class="text-white">{{ user.email }}</p>
                <p class="text-[11px] text-slate-400 font-mono">{{ user.phone }}</p>
              </td>
              <td class="py-3 px-4">
                <span :class="[user.role === 'Admin' ? 'bg-purple-950/60 text-purple-300 border-purple-800' : 'bg-slate-800 text-slate-300 border-slate-700', 'px-2.5 py-0.5 rounded-full border text-[10px] font-bold']">
                  {{ user.role }}
                </span>
              </td>
              <td class="py-3 px-4 text-slate-400">{{ user.date }}</td>
              <td class="py-3 px-4 text-center">
                <span :class="[user.status === 'Aktif' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border-rose-500/40', 'px-2.5 py-0.5 rounded-full border text-[10px] font-bold']">
                  {{ user.status }}
                </span>
              </td>
              <td class="py-3 px-4 text-center">
                <div class="flex items-center justify-center gap-1.5">
                  <button type="button" @click="openEditUser(idx, user)" class="w-8 h-8 rounded-lg bg-sky-950/60 hover:bg-sky-900 border border-sky-800 text-sky-400 hover:text-white inline-flex items-center justify-center transition-colors" title="Edit Pengguna" aria-label="Edit Pengguna">
                    <i class="fas fa-pen text-xs"></i>
                  </button>
                  <button type="button" @click="deleteUser(idx)" class="w-8 h-8 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-400 hover:text-white inline-flex items-center justify-center transition-colors" title="Hapus Pengguna" aria-label="Hapus Pengguna">
                    <i class="fas fa-trash text-xs"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- User Modal Component -->
    <Modal :is-open="userModalOpen" :title="editIndex !== null ? 'Edit Pengguna' : 'Tambah Pengguna Baru'" icon="fas fa-user" @close="userModalOpen = false">
      <form @submit.prevent="saveUser" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Nama Lengkap</label>
          <div class="relative">
            <i class="fas fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
            <input type="text" v-model="formName" required placeholder="Nama Lengkap" class="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500">
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Alamat Email</label>
          <div class="relative">
            <i class="fas fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
            <input type="email" v-model="formEmail" required placeholder="nama@email.com" class="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500">
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-300 mb-1">Nomor WhatsApp</label>
          <div class="relative">
            <i class="fab fa-whatsapp absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-400 text-xs pointer-events-none"></i>
            <input type="tel" v-model="formPhone" required placeholder="081234567890" class="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500">
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Peran Akun</label>
            <div class="relative">
              <i class="fas fa-shield absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
              <select v-model="formRole" class="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500">
                <option value="Pelanggan">Pelanggan</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Status</label>
            <div class="relative">
              <i class="fas fa-circle-check absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs pointer-events-none"></i>
              <select v-model="formStatus" class="w-full h-11 pl-9 pr-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-sky-500">
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>
          </div>
        </div>

        <div class="pt-2 flex justify-end gap-2">
          <button type="button" @click="userModalOpen = false" class="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs flex items-center gap-1.5">
            <i class="fas fa-times text-xs"></i> <span>Batal</span>
          </button>
          <button type="submit" class="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5">
            <i class="fas fa-check text-xs"></i> <span>Simpan Data</span>
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUsersStore } from '@/stores/usersStore';
import Modal from '@/components/common/Modal.vue';

const usersStore = useUsersStore();

const userModalOpen = ref(false);
const editIndex = ref(null);
const formName = ref('');
const formEmail = ref('');
const formPhone = ref('');
const formRole = ref('Pelanggan');
const formStatus = ref('Aktif');

function openAddUser() {
  editIndex.value = null;
  formName.value = '';
  formEmail.value = '';
  formPhone.value = '';
  formRole.value = 'Pelanggan';
  formStatus.value = 'Aktif';
  userModalOpen.value = true;
}

function openEditUser(idx, user) {
  editIndex.value = idx;
  formName.value = user.name;
  formEmail.value = user.email;
  formPhone.value = user.phone;
  formRole.value = user.role;
  formStatus.value = user.status;
  userModalOpen.value = true;
}

function saveUser() {
  if (editIndex.value !== null) {
    usersStore.updateUser(editIndex.value, {
      name: formName.value,
      email: formEmail.value,
      phone: formPhone.value,
      role: formRole.value,
      status: formStatus.value
    });
  } else {
    usersStore.addUser({
      name: formName.value,
      email: formEmail.value,
      phone: formPhone.value,
      role: formRole.value,
      status: formStatus.value
    });
  }
  userModalOpen.value = false;
}

function deleteUser(idx) {
  if (confirm('Yakin ingin menghapus akun pengguna ini?')) {
    usersStore.deleteUser(idx);
  }
}
</script>
