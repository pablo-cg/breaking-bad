import { charactersRoute } from '@/modules/characters/router';
import AboutPage from '@/modules/shared/pages/AboutPage.vue';
import HomePage from '@/modules/shared/pages/HomePage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // public
    { path: '/', name: 'home', component: HomePage },
    { path: '/about', name: 'about', component: AboutPage },

    // path: '/characters',
    charactersRoute,

    // default
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'home' }
    }
  ]
});

export default router;
