<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import type { RickMortyAPIResponse } from '../types';
import rickMortyApi from '@/api/rickMortyApi';
import CardList from '../components/CardList.vue';
import characterStore from '@/modules/stores/character.store';
import { isAxiosError } from 'axios';

defineProps<{ title: string; visible: boolean }>();

async function getCharacters() {
  if (characterStore.characters.count) return characterStore.characters.list;

  try {
    const { data } = await rickMortyApi.get<RickMortyAPIResponse>('character');
    return Promise.resolve(data.results);
  } catch (error) {
    if (isAxiosError(error)) {
      characterStore.loadedCharactersFailed(error.message);
    }
    characterStore.loadedCharactersFailed('Ocurrio un error inesperado');
    return Promise.reject([]);
  }
}

useQuery(['characters'], getCharacters, {
  select: (data) => characterStore.setCharacters(data)
});
</script>

<template>
  <h1>{{ title }}</h1>
  <h2 v-if="characterStore.characters.isLoading">Loading...</h2>
  <div v-else-if="characterStore.characters.hasError">
    <h2>Error</h2>
    <p>{{ characterStore.characters.errorMessage }}</p>
  </div>
  <CardList v-else :characters="characterStore.characters.list || []" />
</template>
