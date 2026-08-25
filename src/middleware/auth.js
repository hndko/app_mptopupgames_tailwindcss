export default function auth({ to, from, next, authStore }) {
  if (!authStore.isAuthenticated) {
    return next('/login');
  }
  return next();
}
