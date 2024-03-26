<template>
  <AdminPageHeader pageName="設計文章管理"></AdminPageHeader>
  <div class="admin-container">
    <div class="action-bar">
      <div class="search-item">
        <v-text-field
          v-model="searchText"
          variant="outlined"
          density="compact"
          placeholder="請輸入文章標題..."
          hide-details
        ></v-text-field>
        <v-btn color="primary" variant="outlined">搜尋</v-btn>
      </div>
      <div class="action-item">
        <v-btn color="primary" @click="toEditPage()">新增文章</v-btn>
      </div>
    </div>
  </div>
</template>
<script setup>
useSeoMeta({
  title: '設計文章列表'
});
const searchText = ref('');
const toEditPage = id => {
  navigateTo(`/admin/design/edit${id ? `?id=${id}` : ''}`);
};
</script>
<style lang="scss" scoped>
.action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .search-item {
    display: inline-flex;
    align-items: center;
    .v-text-field {
      min-width: 500px;
      margin-right: 10px;
    }
  }
}
</style>
