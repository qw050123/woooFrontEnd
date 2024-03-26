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
<script setup lang="ts">
const route = useRoute();
useHead({
  titleTemplate: title => {
    return title ? `屋托網後台 - ${title}` : '屋托網後台';
  },
  meta: [
    {
      property: 'og:title',
      content: `屋托網後台${route.meta ? ` - ` + route.meta.title : null}`
    }
  ]
});
</script>
<style lang="scss" scoped>
@import '@/assets/style/varible';
.admin {
  &-content {
    height: calc(100vh - 80px);
    display: flex;
    overflow: hidden;
    .admin-sidebar {
      border-right: 2px solid $neutral-2;
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
      position: relative;
      & > div:first-of-type {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #fff;
      }
      & > div:last-of-type {
        max-height: calc(100vh - 146px);
        overflow: auto;
        margin-top: 66px;
        &::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
      }
    }
  }
}
</style>
