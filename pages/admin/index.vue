<template>
  <ClientOnly>
    <div class="admin">
      <div class="admin-header">
        <AdminHeader />
      </div>
      <div class="admin-content">
        <div class="admin-sidebar">
          <AdminSidebar />
        </div>
        <div class="admin-main">
          <NuxtPage />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.admin {
  &-content {
    height: calc(100vh - 80px);
    display: flex;
    .admin-sidebar {
      border-right: 2px solid #cacaca;
      box-sizing: border-box;
      padding: 20px;
      overflow: scroll;
      &::-webkit-scrollbar {
        width: 0px;
        height: 0px;
      }
    }
    .admin-main {
      flex: 1;
      min-height: 100%;
    }
  }
}
</style>
