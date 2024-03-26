<template>
  <AdminPageHeader pageName="關鍵字管理"></AdminPageHeader>
  <div class="admin-container">
    <div class="action-bar">
      <div class="search-item">
        <v-text-field v-model="searchText" placeholder="請輸入關鍵字..."></v-text-field>
        <v-btn color="primary" variant="outlined">搜尋</v-btn>
      </div>
      <div class="action-item">
        <v-btn color="primary" @click="openAddedKeywordDialog">新增關鍵字</v-btn>
      </div>
    </div>
    <table class="contain-table">
      <thead>
        <tr>
          <th>編號</th>
          <th>關鍵字</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in keywordList" :key="`keyword_${index}`">
          <td>{{ item.id }}</td>
          <td>{{ item.keyword }}</td>
          <td>
            <v-btn density="compact" icon="mdi-delete" color="secondary" variant="text"> </v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <v-dialog v-model="isOpenAddedKeywordDialog" max-width="500">
    <div class="dialog-header">
      <div class="dialog-header-title">新增關鍵字</div>
      <v-btn color="black" density="compact" variant="outlined" icon="mdi-window-close"></v-btn>
    </div>
    <div class="dialog-container">
      <v-text-field v-model="newKeywordText" placeholder="請輸入關鍵字..."></v-text-field>
      <div class="wrong-info"></div>
    </div>
    <div class="dialog-footer">
      <v-btn color="primary" variant="outlined" density="comfortable">取消</v-btn>
      <v-btn color="primary" density="comfortable">新增</v-btn>
    </div>
  </v-dialog>
</template>
<script setup>
useSeoMeta({
  title: '關鍵字管理'
});
import fakeKeywordList from '@/assets/fake/keyword.json';
const searchText = ref(null);
const keywordList = ref([]);
keywordList.value = fakeKeywordList;
const openAddedKeywordDialog = () => {
  isOpenAddedKeywordDialog.value = true;
};
const isOpenAddedKeywordDialog = ref(false);
</script>
<style lang="scss" scoped>
@import '@/assets/style/_varible.scss';
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
.contain-table {
  margin-top: 20px;
  width: 100%;
  tr {
    th,
    td {
      text-align: center;
      padding: 5px 10px;
    }
    th:first-of-type,
    td:first-of-type {
      text-align: left;
    }
    th:last-of-type,
    td:last-of-type {
      text-align: right;
    }
  }
  tbody {
    margin-top: 5px;
    td {
      border-top: 1px solid $neutral-2;
      &:first-of-type {
        border-left: 1px solid $neutral-2;
      }
      &:last-of-type {
        border-right: 1px solid $neutral-2;
      }
    }
    tr:last-of-type {
      td {
        border-bottom: 1px solid $neutral-2;
      }
    }
  }
}
</style>
