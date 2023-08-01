<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Character } from '../types';

interface CharacterCardProps {
  character: Character;
}

const props = defineProps<CharacterCardProps>();

const router = useRouter();

function pushToCharacter() {
  router.push({ name: 'character-by-id', params: { id: props.character.id } });
}
</script>

<template>
  <div class="char-card" @click="pushToCharacter">
    <img v-if="!character.image" src="/public/img/default-avatar.png" :alt="character.name" />
    <img v-else :src="character.image" :alt="character.name" />
    <h4>{{ character.name }}</h4>
  </div>
</template>

<style scoped>
.char-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all;
  transition-duration: 150ms;
  cursor: pointer;
  border: 1.5px solid var(--color-border);
  border-radius: 5px;
}

.char-card:hover {
  transform: scale(1.1) translateY(-1rem);
  border-color: hsla(160, 100%, 37%, 1);
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.5);
}

img {
  width: 18.75rem;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
  transition: all;
  transition-duration: 150ms;
}

h4 {
  font-weight: 700;
  text-align: center;
  width: 100%;
  background-color: var(--color-background);
  border-radius: 5px;
}
</style>
