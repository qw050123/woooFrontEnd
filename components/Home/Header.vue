import type { NuxtLink } from '#build/components';
<template>
  <div class="header">
    <div class="header-logo">
      <NuxtLink to="/"></NuxtLink>
    </div>
    <div class="header-action">
      <div class="header-action-item">
        <NuxtLink to="/">NEWS</NuxtLink>
      </div>
      <div class="header-action-item">
        <NuxtLink to="/">DESIGN</NuxtLink>
      </div>
      <div class="header-action-item">
        <NuxtLink to="/">HOUSE</NuxtLink>
      </div>
      <div class="header-action-item">
        <NuxtLink to="/">WOOO TV</NuxtLink>
      </div>
      <div class="header-action-item">
        <NuxtLink to="/">ABOUT US</NuxtLink>
      </div>
      <v-icon class="header-action-search" icon="mdi-magnify"></v-icon>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
@import '~/assets/style/varible';
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 30px;
  border-bottom: 1px solid $primary-0;
  .header-logo {
    background: url('~/assets/image/woooLogo.png') center center / cover no-repeat;
    width: 109px;
    height: 64px;
  }
  .header-action {
    display: inline-flex;
    align-items: center;
    &-item {
      margin-right: 20px;
      font-weight: 700;
    }
    &-search {
      cursor: pointer;
    }
  }
}
</style>
