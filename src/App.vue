<script setup lang="ts">
import NavBar from '@/modules/shared/components/NavBar.vue';
import { linkRoutes } from './router/link-routes';
</script>

<template>
  <div class="wrapper">
    <NavBar title="Breaking Bad" :links="linkRoutes" />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
</style>
