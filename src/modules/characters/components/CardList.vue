<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useCharacters } from '../composable/useCharacters';
import type { Character, RickMortyAPIResponse } from '../types';
import rickMortyApi from '@/api/rickMortyApi';
import CharacterCard from './CharacterCard.vue';

// const { characters, isLoading, hasError, errorMessage } = useCharacters();

async function getCharSlow(): Promise<Character[]> {
  return new Promise((res) => {
    setTimeout(async () => {
      const { data } = await rickMortyApi.get<RickMortyAPIResponse>('character');
      res(data.results);
    }, 1);
  });
}

const {
  isError,
  isLoading,
  data: characters,
  error
} = useQuery(['characters'], getCharSlow, {
  cacheTime: 1000 * 60,
  refetchOnReconnect: 'always',
  refetchOnWindowFocus: true
});
</script>

<template>
  <h2 v-if="isLoading">Loading...</h2>
  <div class="card-list" v-else>
    <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
  </div>
</template>

<style scoped>
.card-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
