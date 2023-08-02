import { ref, computed, watch } from 'vue';
import type { Character, RickMortyAPIResponse } from '../types';
import rickMortyApi from '@/api/rickMortyApi';
import { useQuery } from '@tanstack/vue-query';

const characters = ref<Character[]>([]);
const hasError = ref(false);
const errorMessage = ref<string | null>(null);

async function getCharacters() {
  if (characters.value.length) return characters.value;

  const { data } = await rickMortyApi.get<RickMortyAPIResponse>('character');
  return data.results;
}

function setCharacters(data: Character[]) {
  hasError.value = false;
  errorMessage.value = null;
  return (characters.value = data);
}

const useCharacters = () => {
  const { isLoading, data } = useQuery(['characters'], getCharacters, {
    // select: setCharacters // no deberia ser esto
  });

  watch(data, () => {
    if (data.value) {
      setCharacters(data.value);
    }
  });

  return {
    characters,
    count: computed(() => characters.value.length),
    errorMessage,
    hasError,
    isLoading
  };
};

export default useCharacters;
