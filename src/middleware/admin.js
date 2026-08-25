export default function admin({ to, from, next, authStore }) {
  if (!authStore.isAuthenticated) {
    return next('/login');
  }

  if (!authStore.isAdmin) {
    alert('Akses Ditolak: Halaman ini khusus administrator.');
    return next('/');
  }

  return next();
}
