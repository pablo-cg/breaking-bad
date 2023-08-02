<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed, watchEffect } from 'vue';
import { useCharacter } from '../composables/useCharacter';

const route = useRoute();
const router = useRouter();

const characterId = route.params.id as string;

const { character, isLoading, hasError, errorMessage } = useCharacter(characterId);

const characterEpisodes = computed(() => {
  const episodes = character.value?.episode.map((ep) => ep.split('/')[5]);
  return episodes?.join(', ');
});

watchEffect(() => {
  if (!isLoading.value && hasError.value) {
    router.replace('/characters');
  }
});
</script>

<template>
  <h2 v-if="isLoading">Loading...</h2>
  <div v-else-if="hasError">
    <h2>Error</h2>
    <p>{{ errorMessage }}</p>
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
