// stores/counter.js
import { defineStore } from 'pinia';

export default defineStore('auth', () => {
  const isLogin = ref(false);
  const loginToken = useCookie('wooo_backend_token', {
    default: () => ''
  });
  const account = useCookie('wooo_backend_account', {
    default: (): string | null => ''
  });
  const setLoginToken = (val: string) => {
    loginToken.value = val;
  };
  const setAccount = (val: string | null) => {
    account.value = val;
  };
  return {
    isLogin,
    account,
    loginToken,
    setLoginToken,
    setAccount
  };
});
