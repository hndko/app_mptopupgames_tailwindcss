import { createRouter, createWebHistory } from 'vue-router';
import AppPublic from '@/layouts/app-public.vue';
import AppAuth from '@/layouts/app-auth.vue';
import AppModules from '@/layouts/app-modules.vue';

// Public Views
import HomeView from '@/views/public/HomeView.vue';
import CatalogView from '@/views/public/CatalogView.vue';
import ProductDetailView from '@/views/public/ProductDetailView.vue';
import OrderHistoryView from '@/views/public/OrderHistoryView.vue';
import ConfirmationView from '@/views/public/ConfirmationView.vue';
import LeaderboardView from '@/views/public/LeaderboardView.vue';
import ArticlesView from '@/views/public/ArticlesView.vue';
import ArticleDetailView from '@/views/public/ArticleDetailView.vue';
import CalculatorView from '@/views/public/CalculatorView.vue';
import ContactView from '@/views/public/ContactView.vue';
import ReviewsView from '@/views/public/ReviewsView.vue';

// Auth Views
import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from '@/views/auth/RegisterView.vue';
import AuthCallbackView from '@/views/auth/AuthCallbackView.vue';

// Admin Module Views
import DashboardView from '@/views/modules/DashboardView.vue';
import OrdersView from '@/views/modules/OrdersView.vue';
import ProductsView from '@/views/modules/ProductsView.vue';
import UsersView from '@/views/modules/UsersView.vue';
import PromoView from '@/views/modules/PromoView.vue';
import ReportsView from '@/views/modules/ReportsView.vue';
import SettingsView from '@/views/modules/SettingsView.vue';

import { useAuthStore } from '@/stores/authStore';
import { auth, guest, admin, runMiddlewarePipeline } from '@/middleware';

const routes = [
  // 1. Public / Customer Facing Pages (app-public layout)
  {
    path: '/',
    component: AppPublic,
    children: [
      { path: '', name: 'Home', component: HomeView },
      { path: 'produk', name: 'ProductCatalog', component: CatalogView },
      { path: 'produk/:id', name: 'ProductDetail', component: ProductDetailView },
      { path: 'riwayat', name: 'OrderHistory', component: OrderHistoryView },
      { path: 'konfirmasi', name: 'Confirmation', component: ConfirmationView },
      { path: 'leaderboard', name: 'Leaderboard', component: LeaderboardView },
      { path: 'artikel', name: 'Articles', component: ArticlesView },
      { path: 'artikel/:slug', name: 'ArticleDetail', component: ArticleDetailView },
      { path: 'kalkulator', name: 'Calculator', component: CalculatorView },
      { path: 'kalkulator/:type', name: 'CalculatorType', component: CalculatorView },
      { path: 'hubungi-kami', name: 'Contact', component: ContactView },
      { path: 'ulasan', name: 'Reviews', component: ReviewsView }
    ]
  },

  // 2. Authentication Pages (app-auth layout)
  {
    path: '/',
    component: AppAuth,
    children: [
      { 
        path: 'login', 
        name: 'Login', 
        component: LoginView,
        meta: { middleware: [guest] }
      },
      { 
        path: 'register', 
        name: 'Register', 
        component: RegisterView,
        meta: { middleware: [guest] }
      },
      { 
        path: 'auth/callback', 
        name: 'AuthCallback', 
        component: AuthCallbackView 
      }
    ]
  },

  // 3. Admin Modules (app-modules layout, URL: /modules)
  {
    path: '/modules',
    component: AppModules,
    meta: { middleware: [auth, admin] },
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, behavior: 'smooth' };
  }
});

// Navigation Guard dengan Modular Middleware Pipeline
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Kumpulkan middleware dari seluruh route hierarchy (parent & child)
  const middlewareList = to.matched.flatMap(record => record.meta.middleware || []);

  if (middlewareList.length === 0) {
    return next();
  }

  const context = {
    to,
    from,
    next,
    authStore
  };

  return runMiddlewarePipeline(context, middlewareList);
});

export default router;
