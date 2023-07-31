<script setup lang="ts">
import CardList from '../components/CardList.vue';

defineProps<{ title: string; visible: boolean }>();
</script>

<template>
  <main>
    <h1>{{ title }}</h1>
    <CardList />
  </main>
</template>
