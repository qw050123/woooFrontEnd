<template>
  <div class="admin-login">
    <v-form class="admin-login-form" v-model="form">
      <div class="admin-login-form-title">後台系統</div>
      <v-text-field v-model="email" :rules="[required, emailRule]" label="email"></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[required, passwordRule]"
        type="password"
        label="password"
      ></v-text-field>
      <div class="admin-login-form-control">
        <v-btn type="button" :disabled="!form" size="large" :loading="loading" @click="login">登入</v-btn>
      </div>
    </v-form>
  </div>
</template>
<script setup lang="ts">
import { storeAuth } from '@/stores/storeAuth';
const { required, emailRule, passwordRule } = useFormRule();
const form = ref(false);
const email = ref('');
const password = ref('');
const loading = ref(false);
const login = () => {
  if (form.value == false) {
    return false;
  } else {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      let _storeAuth = storeAuth();
      _storeAuth.setLoginToken(`${email.value}${password.value}`);
      navigateTo('/admin');
    }, 3000);
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
