import { reactive } from 'vue';
import type { Character, RickMortyAPIResponse } from '../characters/types';
import rickMortyApi from '@/api/rickMortyApi';
import { isAxiosError } from 'axios';

interface Store {
  characters: {
    list: Character[];
    count: number;
    isLoading: boolean;
    hasError: boolean;
    errorMessage?: string | null;
  };

  ids: {
    isLoading: boolean;
    hasError: boolean;
    errorMessage?: string | null;
    list: Record<string, Character>;
  };

  // Métodos character list
  loadCharacters(): void;
  setCharacters(data: Character[]): void;
  loadedCharactersFailed(error: string): void;

  // Métodos character by id
  loadCharacter(): void;
  setCharacter(data: Character): void;
  isCharacterInStore(id: string): boolean;
}

const characterStore = reactive<Store>({
  characters: {
    count: 0,
    errorMessage: null,
    hasError: false,
    isLoading: true,
    list: []
  },

  ids: {
    list: {},
    isLoading: false,
    hasError: false,
    errorMessage: null
  },

  // Métodos character list
  async loadCharacters() {
    try {
      const { data } = await rickMortyApi.get<RickMortyAPIResponse>('character');
      this.setCharacters(data.results);
    } catch (error) {
      if (isAxiosError(error)) {
        this.loadedCharactersFailed(error.message);
      }
      this.loadedCharactersFailed('Ocurrio un error inesperado');
    }
  },

  setCharacters(data: Character[]) {
    this.characters = {
      count: data.length,
      list: data,
      isLoading: false,
      hasError: false,
      errorMessage: null
    };
  },

  loadedCharactersFailed(error: string) {
    this.characters = {
      count: 0,
      list: [],
      isLoading: false,
      hasError: true,
      errorMessage: error
    };
  },

  // Métodos character by id
  loadCharacter() {
    this.ids = {
      ...this.ids,
      hasError: false,
      isLoading: true
    };
  },

  isCharacterInStore(id: string) {
    return !!this.ids.list[id];
  },
  
  setCharacter(data: Character) {
    this.ids = {
      isLoading: false,
      hasError: false,
      list: {
        ...this.ids.list,
        [data.id]: data
      }
    };
  }
});

characterStore.loadCharacters();

export default characterStore;
