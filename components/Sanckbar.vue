<template>
  <v-snackbar :color="color" timeout="3000" v-model="isOpen" location="top">
    {{ message }}
  </v-snackbar>
</template>
<script setup lang="ts">
import useSnackbarStore from '@/stores/snackbarStore';
import { storeToRefs } from 'pinia';
let snackbarStore = useSnackbarStore();
let { color, message, isOpen } = storeToRefs(snackbarStore);
</script>
<style lang="scss"></style>
