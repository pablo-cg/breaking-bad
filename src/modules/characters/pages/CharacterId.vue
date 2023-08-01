<script setup lang="ts">
import { useRoute } from 'vue-router';
import characterStore from '@/modules/stores/character.store';
import rickMortyApi from '@/api/rickMortyApi';
import type { Character } from '../types';
import { useQuery } from '@tanstack/vue-query';
import { computed } from 'vue';

const route = useRoute();

const characterId = route.params.id as string;

async function getCharacterInCache(id: string) {
  if (characterStore.isCharacterInStore(id)) {
    return characterStore.ids.list[id];
  }

  const { data } = await rickMortyApi.get<Character>(`character/${id}`);
  return data;
}

const {
  data: character,
  isLoading,
  isError,
  error
} = useQuery({
  queryKey: ['characters', characterId],
  queryFn: () => getCharacterInCache(characterId)
});

if (character.value) {
  characterStore.setCharacter(character.value);
}

const characterEpisodes = computed(() => {
  const episodes = character.value?.episode.map((ep) => ep.split('/')[5]);
  return episodes?.join(', ');
});
</script>

<template>
  <h2 v-if="isLoading">Loading...</h2>
  <div v-else-if="isError">
    <h2>Error</h2>
    <p>{{ error }}</p>
  </div>
  <main v-else>
    <h1>{{ character?.name }}</h1>
    <section class="character-container">
      <img :src="character?.image" :alt="character?.name" />
      <ul>
        <li>
          <strong>Status: </strong>
          <span>{{ character?.status }}</span>
        </li>
        <li>
          <strong>Species: </strong>
          <span>{{ character?.species }}</span>
        </li>
        <li>
          <strong>Origin: </strong>
          <span>{{ character?.origin.name }}</span>
        </li>
        <li v-if="character?.type">
          <strong>Type: </strong>
          <span>{{ character?.type }}</span>
        </li>
        <li>
          <strong>Gender: </strong>
          <span>{{ character?.gender }}</span>
        </li>
        <li>
          <strong>Location: </strong>
          <span>{{ character?.location.name }}</span>
        </li>
        <li>
          <strong>Episodes: </strong>
          <span>{{ characterEpisodes }}</span>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.character-container {
  display: flex;
  flex-direction: row;
}

.img {
  width: 18.75rem;
  border-radius: 5px;
}
</style>
