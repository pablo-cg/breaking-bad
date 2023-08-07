<script setup lang="ts">
import type { RouteLink } from '@/router/link-routes';

interface NavProps {
  title?: string;
  links: RouteLink[];
  showIcon?: boolean;
}

withDefaults(defineProps<NavProps>(), {
  showIcon: true
});
</script>

<template>
  <nav>
    <section class="brand">
      <img v-if="showIcon" src="@/assets/logo.svg" alt="Vue Logo" height="25" width="25" />
      <span v-if="title">{{ title }}</span>
    </section>
    <section class="links">
      <RouterLink v-for="link of links" :to="link.path" :key="link.name">
        {{ link.title }}
      </RouterLink>
    </section>
  </nav>
</template>

<style scoped>
.brand {
  display: flex;
  align-items: center;
}

.links {
  display: flex;
  gap: 1rem;
}

nav {
  justify-content: center;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  margin-top: 0.5rem;
  width: 100%;
}

img {
  margin-right: 0.25rem;
}

span {
  font-size: 1.2rem;
  margin-right: 0.825rem;
}

a {
  margin-right: 0.5rem;
}

.router-link-active {
  color: gray;
  text-decoration: underline;
}
.router-link-exact-active {
  text-decoration: none;
}
</style>
