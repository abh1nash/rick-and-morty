<template>
  <div v-if="!character.isLoading && characterData.id" class="flex flex-col">
    <div class="h-64 profile-cover px-8 py-6 flex flex-wrap items-end">
      <div class="container text-white mx-auto">
        <div class="text-4xl font-bold">{{ characterData.name }}</div>
        <div class="text-2xl">{{ characterData.location?.name }}</div>
      </div>
    </div>
    <div
      class="px-8 py-6 flex-wrap md:flex-nowrap flex flex-shrink flex-grow gap-x-6 container mx-auto"
    >
      <div class="w-full md:w-1/4">
        <img
          :src="characterData.image"
          :alt="characterData.name"
          class="rounded-full h-48 w-48 mx-auto"
        />
        <div class="flex flex-wrap my-4 gap-y-4">
          <div class="w-1/2">
            <div class="uppercase text-gray-400 text-xs">Species</div>
            <div>{{ characterData.species }}</div>
          </div>
          <div class="w-1/2">
            <div class="uppercase text-gray-400 text-xs">Status</div>
            <div>{{ characterData.status }}</div>
          </div>
          <div class="w-full">
            <div class="uppercase text-gray-400 text-xs">Gender</div>
            <div>{{ characterData.gender }}</div>
          </div>
        </div>
      </div>
      <div class="w-full md:w-3/4">
        <div class="font-bold text-2xl">Episodes</div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div
            v-for="episode in characterData.episode"
            class="border-solid border py-2 px-4 border-grey-200 hover:cursor-pointer hover:bg-gray-200 transition"
          >
            <div class="font-bold">
              {{ episodesData[episode]?.episode }}
            </div>
            <div class="text-lg">
              {{ episodesData[episode]?.name }}
            </div>
            <div class="text-xs mt-2 uppercase tracking-widest text-gray-400">
              Aired on {{ episodesData[episode]?.air_date }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else-if="!characterData.id"
    class="h-full w-full flex items-center justify-center"
  >
    <div class="w-full max-w-sm flex flex-col items-center">
      <img src="@/assets/morty.png" alt="Morty" class="w-48" />
      <div class="text-xl font-bold text-center">
        Nobody exists on purpose. Nobody belongs anywhere. Everybody’s gonna
        die.
      </div>
      <div class="text-center">Come click a character on the left?</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from "@/stores/character";
import { computed } from "vue";

const character = useCharacterStore();
const characterData = computed(() => character.characterData);
const episodesData = computed(() => character.episodesData);
</script>

<style scoped>
.profile-cover {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.75)
    ),
    url("../../assets/bg.jpg");
}
</style>
