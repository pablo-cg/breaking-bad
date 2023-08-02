<script setup lang="ts">
import CardList from '../components/CardList.vue';
import useCharacters from '../composables/useCharacters';

defineProps<{ title: string; visible: boolean }>();

const { characters, count, errorMessage, hasError, isLoading } = useCharacters();
</script>

<template>
  <h2 v-if="isLoading">Loading...</h2>
  <div v-else-if="hasError">
    <h2>Error</h2>
    <p>{{ errorMessage }}</p>
  </div>
  <template v-else>
    <h1>{{ title }} - (total {{ count }})</h1>
    <CardList :characters="characters" />
  </template>
</template>
