import type { RouteRecordRaw } from 'vue-router';
import CharacterLayout from '../layout/CharacterLayout.vue';

const CHARACTERS_PATH = '/characters' as const;

export const charactersRoute: RouteRecordRaw = {
  path: CHARACTERS_PATH,
  redirect: { name: 'character-list' },
  component: CharacterLayout,
  children: [
    {
      path: 'by/:id',
      name: 'character-by-id',
      props: { title: 'Character', visible: false },
      component: () => import('@/modules/characters/pages/CharacterId.vue')
    },
    {
      path: `${CHARACTERS_PATH}/list`,
      name: 'character-list',
      props: { title: 'List', visible: true },
      component: () => import('@/modules/characters/pages/CharacterList.vue')
    },
    {
      path: `${CHARACTERS_PATH}/search`,
      name: 'character-search',
      props: { title: 'Search', visible: true },
      component: () => import('@/modules/characters/pages/CharacterSearch.vue')
    }
  ]
};
