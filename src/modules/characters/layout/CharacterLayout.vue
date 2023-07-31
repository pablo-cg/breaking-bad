<script setup lang="ts">
import type { RouteLink } from '@/router/link-routes';
import { charactersRoute } from '../router';
import NavBar from '@/modules/shared/components/NavBar.vue';

interface customRouterProps {
  title: string;
  visible: boolean;
}

// 🤮
const charactersLinks: RouteLink[] = charactersRoute
  .children!.filter((route) => (route.props as customRouterProps).visible)
  .map((route) => {
    return {
      name: route.name as string,
      path: route.path,
      title: (route.props as customRouterProps).title
    };
  });
</script>

<template>
  <NavBar :show-icon="false" title="Personajes" :links="charactersLinks" />
  <Suspense>
    <RouterView />
  </Suspense>
</template>
