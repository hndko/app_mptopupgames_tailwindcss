import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

import HomeView from '@/views/public/HomeView.vue';
import CatalogView from '@/views/public/CatalogView.vue';
import ProductDetailView from '@/views/public/ProductDetailView.vue';
import OrderHistoryView from '@/views/public/OrderHistoryView.vue';
import ConfirmationView from '@/views/public/ConfirmationView.vue';
import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from '@/views/auth/RegisterView.vue';

import DashboardView from '@/views/modules/DashboardView.vue';
import OrdersView from '@/views/modules/OrdersView.vue';
import ProductsView from '@/views/modules/ProductsView.vue';
import UsersView from '@/views/modules/UsersView.vue';
import PromoView from '@/views/modules/PromoView.vue';
import ReportsView from '@/views/modules/ReportsView.vue';
import SettingsView from '@/views/modules/SettingsView.vue';

const routes = [
  // Client & Public Pages
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: HomeView },
      { path: 'produk', name: 'ProductCatalog', component: CatalogView },
      { path: 'produk/:id', name: 'ProductDetail', component: ProductDetailView },
      { path: 'riwayat', name: 'OrderHistory', component: OrderHistoryView },
      { path: 'konfirmasi', name: 'Confirmation', component: ConfirmationView },
      { path: 'login', name: 'Login', component: LoginView },
      { path: 'register', name: 'Register', component: RegisterView }
    ]
  },

  // Admin Portal (Obfuscated route: /modules)
  {
    path: '/modules',
    component: AdminLayout,
    children: [
      { path: '', name: 'AdminRoot', component: DashboardView },
      { path: 'dashboard', name: 'AdminDashboard', component: DashboardView },
      { path: 'pesanan', name: 'AdminOrders', component: OrdersView },
      { path: 'produk', name: 'AdminProducts', component: ProductsView },
      { path: 'pengguna', name: 'AdminUsers', component: UsersView },
      { path: 'promo', name: 'AdminPromo', component: PromoView },
      { path: 'laporan', name: 'AdminReports', component: ReportsView },
      { path: 'pengaturan', name: 'AdminSettings', component: SettingsView }
    ]
  },

  // Catch-all 404 fallback
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  }
});

export default router;
