import { computed, ref, watch } from 'vue';
import type { Character } from '../types';
import rickMortyApi from '@/api/rickMortyApi';
import { useQuery } from '@tanstack/vue-query';
import { isAxiosError } from 'axios';

const characterSet = ref<Record<string, Character>>({});
const hasError = ref(false);
const errorMessage = ref<any>(null);

async function getCharacter(id: string) {
  if (characterSet.value[id]) return characterSet.value[id];

  try {
    const { data } = await rickMortyApi.get<Character>(`character/${id}`);

    return Promise.resolve(data);
  } catch (error) {
    if (isAxiosError(error)) {
      return Promise.reject(error.response?.data);
    }

    return Promise.reject('Error Inesperado');
  }
}

function setCharacter(data: Character) {
  hasError.value = false;
  errorMessage.value = null;

  characterSet.value[data.id] = data;
}

function setError(error: any) {
  hasError.value = true;
  errorMessage.value = error;
}

export const useCharacter = (characterId: string) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['characters', characterId],
    queryFn: () => getCharacter(characterId)
  });

  watch([data, error], () => {
    if (data.value) {
      setCharacter(data.value);
    }

    if (error.value) {
      setError(error.value);
    }
  });

  return {
    character: computed(() => characterSet.value[characterId]),
    errorMessage,
    hasError,
    isLoading,
    list: characterSet
  };
};
