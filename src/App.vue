<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useSearchStore } from "@/stores/search";
const { setQuery } = useSearchStore();
setQuery("");
</script>

<template>
  <RouterView />
</template>
