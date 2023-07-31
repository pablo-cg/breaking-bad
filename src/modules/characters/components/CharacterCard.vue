<script setup lang="ts">
import type { Character } from '../types';

interface CharacterCardProps {
  character: Character;
}

defineProps<CharacterCardProps>();
</script>

<template>
  <div class="char-card">
    <img v-if="!character.image" src="/public/img/default-avatar.png" :alt="character.name" />
    <img v-else :src="character.image" :alt="character.name" />
    <h4>{{ character.name }}</h4>
  </div>
</template>

<style scoped>
.char-card {
  margin: 0 0.25rem;
  margin-bottom: 0.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

img {
  width: 12.5rem;
  border-radius: 0.3125rem 0.3125rem 0 0;
  box-shadow: 0 0.125rem 0.625rem rgba(255, 255, 255, 0.1);
}

</style>
