<template>
  <div class="admin-login">
    <v-form class="admin-login-form" v-model="form">
      <div class="admin-login-form-title">Wooo Stock Management</div>
      <v-text-field v-model="account" :rules="[required, accountRule]" label="帳號"></v-text-field>
      <v-text-field v-model="password" :rules="[required, passwordRule]" type="password" label="密碼"></v-text-field>
      <div class="admin-login-form-control">
        <v-btn type="button" :disabled="!form" size="large" :loading="loading" @click="login">登入</v-btn>
      </div>
    </v-form>
  </div>
  <Sanckbar />
</template>
<script setup lang="ts">
useHead({
  title: '屋托王後台登入'
});
const { $axios } = useNuxtApp();
import authStore from '@/stores/authStore';
import snackbarStore from '@/stores/snackbarStore';
import { storeToRefs } from 'pinia';
const { required, accountRule, passwordRule } = useFormRule();
const form = ref(false);
const account = ref('');
const password = ref('');
const loading = ref(false);
const login = async () => {
  if (form.value == false) {
    return false;
  } else {
    loading.value = true;
    try {
      let res = await $axios.post(`/user/login`, {
        account: account.value,
        password: password.value
      });
      if (res.data.data.status === true) {
        const _authStore = authStore();
        _authStore.setAccount(account.value);
        _authStore.setLoginToken(res.data.data.token);
        loading.value = false;
        navigateTo('/admin');
      } else {
        loading.value = false;
        const _snackbarStore = snackbarStore();
        _snackbarStore.setSnackBar({
          color: 'error',
          message: 'Login Error',
          isOpen: true
        });
      }
    } catch (_) {
      loading.value = false;
      const _snackbarStore = snackbarStore();
      _snackbarStore.setSnackBar({
        color: 'success',
        message: 'Login Error',
        isOpen: true
      });
    }
  }
};
</script>
<style lang="scss">
.admin-login {
  padding: 20px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  &-form {
    &-title {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 40px;
    }
    width: min(500px, calc(100vw - 40px));
    .v-text-field {
      margin-bottom: 20px;
    }
    &-control {
      text-align: center;
    }
  }
}
</style>
