export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path.startsWith('/admin/login')) {
    if (useCookie('wooo_backend_token').value) {
      return navigateTo('/admin');
    } else {
      console.log('not cookie');
    }
  } else if (to.path.startsWith('/admin') && !useCookie('wooo_backend_token').value) {
    return navigateTo('/admin/login');
  } else {
  }
});
