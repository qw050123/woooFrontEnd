<template>
  <HomeHeader />
  <div>首頁</div>
</template>

<script setup>
const route = useRoute();
useHead({
  titleTemplate: title => {
    return title ? `屋托網 - ${title}` : '屋托網';
  },
  meta: [
    {
      property: 'og:title',
      content: `屋托網${route.meta ? ` - ` + route.meta.title : null}`
    }
  ]
});
</script>
