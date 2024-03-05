// stores/counter.js
import { defineStore } from 'pinia';

export const storeAuth = defineStore('auth', () => {
  const isLogin = ref(false);
  const loginToken = useCookie('woooToken');
  const setLoginToken = (val: string) => (loginToken.value = val);

  return {
    isLogin,
    loginToken,
    setLoginToken
  };
});
