export default function guest({ to, from, next, authStore }) {
  if (authStore.isAuthenticated) {
    if (authStore.isAdmin) {
      return next('/modules');
    }
    return next('/');
  }
  return next();
}
