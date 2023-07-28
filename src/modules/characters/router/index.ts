import type { RouteRecordRaw } from 'vue-router';
import CharacterLayout from '../layout/CharacterLayout.vue';

export const charactersRoute: RouteRecordRaw = {
  path: '/characters',
  redirect: { name: 'character-list' },
  component: CharacterLayout,
  children: [
    {
      path: 'by/id',
      name: 'character-id',
      props: { title: 'Personaje', visible: false },
      component: () => import('@/modules/characters/pages/CharacterId.vue')
    },
    {
      path: 'list',
      name: 'character-list',
      props: { title: 'Lista', visible: true },
      component: () => import('@/modules/characters/pages/CharacterList.vue')
    },
    {
      path: 'search',
      name: 'character-search',
      props: { title: 'Buscar', visible: true },
      component: () => import('@/modules/characters/pages/CharacterSearch.vue')
    }
  ]
};
