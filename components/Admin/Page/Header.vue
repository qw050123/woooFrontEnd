<template>
  <div class="admin-page-header">
    <p>{{ pageName }}</p>
  </div>
</template>
<script setup lang="ts">
const { props } = defineProps({
  pageName: String
});
</script>
<style lang="scss" scoped>
.admin-page-header {
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 2px solid #cacaca;
}
</style>
