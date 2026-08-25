export default function admin({ to, from, next, authStore }) {
  if (!authStore.isAuthenticated) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }

  if (!authStore.isAdmin) {
    alert('Akses Ditolak: Halaman ini khusus administrator.');
    return next('/');
  }

  return next();
}
