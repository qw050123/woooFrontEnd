<template>
  <div class="admin-header">
    <div class="admin-header-logo">
      <NuxtLink to="/admin">Wooo Backend</NuxtLink>
    </div>
    <div class="admin-header-control">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" variant="outlined" v-bind="props">
            {{ account }}
            <template v-slot:append>
              <v-icon icon="mdi-chevron-down"></v-icon>
            </template>
          </v-btn>
        </template>
        <v-list>
          <v-list-item class="click-item" @click="logout()">Logout</v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>
<script setup lang="ts">
import useAuthStore from '@/stores/authStore';
import { storeToRefs } from 'pinia';
let authStore = useAuthStore();
let { account } = storeToRefs(authStore);
const logout = () => {
  authStore.setAccount('');
  authStore.setLoginToken(null);
  navigateTo('/admin/login');
};
</script>
<style lang="scss" scoped>
@import '@/assets/style/_varible.scss';
.admin-header {
  border-bottom: 2px solid $neutral-2;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 30px;
}
.click-item {
  cursor: pointer;
}
</style>
