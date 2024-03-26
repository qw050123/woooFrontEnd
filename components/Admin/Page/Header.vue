<template>
  <div class="admin-page-header">
    <p>{{ pageName }}</p>
  </div>
</template>
<script setup lang="ts">
defineProps({
  pageName: String
});
</script>
<style lang="scss" scoped>
@import '@/assets/style/_varible.scss';
.admin-page-header {
  padding: 20px 30px;
  box-sizing: border-box;
  border-bottom: 2px solid $neutral-2;
}
</style>
