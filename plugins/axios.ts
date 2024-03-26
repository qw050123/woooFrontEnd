import axios from 'axios';
import useAuthStore from '@/stores/authStore';
import useSnackbarStore from '@/stores/snackbarStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
export default defineNuxtPlugin(() => {
  let router = useRouter();
  // let snackbarStore = useSnackbarStore(pinia);
  // let {setSnackBar} = snackbarStore;
  const _axios = axios.create({
    baseURL: 'http://54.238.252.132:8000'
    // withCredentials: true,
  });

  _axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('wooo_backend_token');
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  _axios.interceptors.response.use(
    response => {
      return response;
    },
    err => {
      if (router && err.response.status === 401) {
        // let appStore = useAppStore();
        let authStore = useAuthStore();
        authStore.setAccount('');
        authStore.setLoginToken('');
        // localStorage.removeItem('wooo_backend_token');
        // localStorage.removeItem('wooo_backend_userName');
        router.push('/admin/login');
      }
      // setSnackBar({
      //   color: 'error',
      //   message: `${err.response.data.status} : ${err.response.data.message}`,
      //   isOpen: true
      // });
      return Promise.reject(err);
    }
  );

  return {
    provide: {
      axios: _axios
    }
  };
});
