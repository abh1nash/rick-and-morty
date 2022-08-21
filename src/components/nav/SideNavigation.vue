<template>
  <div class="bg-gray-100 flex items-center justify-center px-8 py-6 shadow-lg">
    <SearchInput
      @update:model-value="setSearchQuery"
      :model-value="search.query"
    ></SearchInput>
  </div>
  <div class="flex-grow flex-shrink overflow-hidden">
    <div class="overflow-y-auto h-full">
      <div v-for="result in results" :key="result.id">
        <SearchResultItem :character-data="result"></SearchResultItem>
      </div>
    </div>
  </div>
  <div
    v-if="search.totalPages > 1"
    :disabled="search.isLoading"
    class="bg-gray-100 h-16 py-4 px-8 flex items-center justify-between"
  >
    <div class="w-1/3">
      <button
        class="bg-blue-400 enabled:hover:bg-blue-500 disabled:opacity-50 text-bold text-white px-4 py-2 rounded"
        @click="search.fetchPage('prev')"
        v-if="search.prev"
        :disabled="search.isLoading"
      >
        Prev
      </button>
    </div>
    <div class="w-1/3 text-center">
      Page {{ search.currentPage }}/{{ search.totalPages }}
    </div>
    <div class="w-1/3 text-right">
      <button
        class="ml-auto bg-blue-400 enabled:hover:bg-blue-500 disabled:opacity-50 text-bold text-white px-4 py-2 rounded"
        @click="search.fetchPage('next')"
        v-if="search.next"
        :disabled="search.isLoading"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from "@/stores/search";
import { computed } from "vue";
import SearchInput from "./SearchInput.vue";
import SearchResultItem from "./SearchResultItem.vue";

const search = useSearchStore();

const setSearchQuery = (value: string) => {
  search.setQuery(value);
};

const results = computed(() => search.results);
</script>

<style lang="scss" scoped></style>
