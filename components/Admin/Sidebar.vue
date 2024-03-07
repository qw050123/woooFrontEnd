<template>
  <v-list v-model:opened="openList">
    <v-list-group value="news">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props">NEWS</v-list-item>
      </template>
      <v-list-item>
        <NuxtLink to="/admin/news">新聞文章管理</NuxtLink>
      </v-list-item>
    </v-list-group>
    <v-list-group value="design">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props">DESIGN</v-list-item>
      </template>
      <v-list-item>
        <NuxtLink to="/admin/design/">設計文章管理</NuxtLink>
      </v-list-item>
    </v-list-group>
    <v-list-group value="house">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props">HOUSE</v-list-item>
      </template>
      <v-list-item>
        <NuxtLink to="/admin/house/">房屋物件管理</NuxtLink>
      </v-list-item>
      <v-list-item>
        <NuxtLink to="/admin/house/focus">精選房屋設定</NuxtLink>
      </v-list-item>
    </v-list-group>
    <v-list-group value="woooTV">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props">WOOO TV</v-list-item>
      </template>
      <v-list-item>
        <NuxtLink to="/admin/woooTV/">影音文章管理</NuxtLink>
      </v-list-item>
    </v-list-group>
    <v-list-group value="other">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props">其他設定</v-list-item>
      </template>
      <v-list-item>
        <NuxtLink to="/admin/other/keyword">關鍵字管理</NuxtLink>
      </v-list-item>
      <v-list-item>
        <NuxtLink to="/admin/other/banner">首頁橫幅設定</NuxtLink>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>
<script setup lang="ts">
const openList = ref(['news', 'design', 'house', 'woooTV', 'other']);
</script>
<style lang="scss" scoped>
.v-list {
  padding: 0;
}
</style>
