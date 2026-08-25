export default function auth({ to, from, next, authStore }) {
  if (!authStore.isAuthenticated) {
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }
  return next();
}
