<script setup lang="ts">
import type { Character } from '../types';
import CharacterCard from './CharacterCard.vue';

interface CardListProps {
  characters: Character[];
}

defineProps<CardListProps>();
</script>

<template>
  <div class="card-list">
    <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
  </div>
</template>

<style scoped>
.card-list {
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}
</style>
