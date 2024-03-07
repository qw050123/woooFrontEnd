<template>
  <div class="admin-header">
    <div class="admin-header-logo">
      <NuxtLink to="/admin">Wooo</NuxtLink>
    </div>
    <div class="admin-header-control"></div>
  </div>
</template>
<script setup lang="ts"></script>
<style lnag="scss" scoped>
.admin-header {
  border-bottom: 2px solid #cacaca;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 30px;
}
</style>
