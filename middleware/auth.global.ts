export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path.startsWith('/admin/login')) {
    if (useCookie('woooToken').value) {
      return navigateTo('/admin');
    } else {
    }
  } else if (to.path.startsWith('/admin') && !useCookie('woooToken').value) {
    return navigateTo('/admin/login');
  } else {
  }
});
