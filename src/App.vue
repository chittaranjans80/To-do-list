<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="padding-10">
    <label class="header-title">To do app</label>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  width: 100%;
  background-color: hsla(160, 100%, 37%, 1);
  display: flex;
  justify-content: space-between;
}

header .header-title {
  font-size: 20px;
  font-weight: 600;
  color: white;
}

nav a {
  display: inline-block;
  padding: 5px 15px;
  border-left: 1px solid var(--color-border);
  color: var(--color-text);
}

nav a:first-of-type {
  border: 0;
}

nav a.router-link-exact-active {
  background: white;
  font-weight: 600;
}

nav a.router-link-exact-active:hover {
  background: white;
}
</style>
