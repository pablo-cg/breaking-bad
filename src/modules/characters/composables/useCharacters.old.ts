import rickMortyApi from '@/api/rickMortyApi';
import { onMounted, ref } from 'vue';
import type { RickMortyAPIResponse, Character } from '../types';
import { isAxiosError } from 'axios';

const isLoading = ref(false);
const characters = ref<Character[]>([]);
const hasError = ref(false);
const errorMessage = ref('');

const useCharacters = () => {
  async function getCharacters() {
    if (characters.value.length) return;

    isLoading.value = true;

    try {
      const { data } = await rickMortyApi.get<RickMortyAPIResponse>('character');

      characters.value = data.results;
    } catch (error) {
      hasError.value = true;

      if (isAxiosError(error)) {
        errorMessage.value = error.message;
        return;
      }

      errorMessage.value = JSON.stringify(error);
    } finally {
      isLoading.value = false;
    }
  }

  onMounted(() => {
    getCharacters();
  });

  return {
    isLoading,
    characters,
    hasError,
    errorMessage
  };
};
