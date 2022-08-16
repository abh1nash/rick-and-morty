<template>
  <router-link
    :to="{ name: 'character', params: { characterId: props.characterData.id } }"
  >
    <div
      role="button"
      :class="[
        'flex px-6 py-4 hover:cursor-pointer hover:bg-gray-100 transition',
        {
          'border-blue-500 border-l-4 bg-gradient-to-r from-white to-blue-100':
            character.characterData.id == props.characterData.id,
        },
      ]"
    >
      <div class="w-1/4">
        <img
          :src="props.characterData.image"
          :alt="props.characterData.name"
          class="rounded-full h-16 w-16 mx-auto"
        />
      </div>
      <div class="w-3/4">
        <div class="font-bold text-lg">{{ props.characterData.name }}</div>
        <div>Location: {{ props.characterData.location.name }}</div>
        <div>Species: {{ props.characterData.species }}</div>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { useCharacterStore } from "@/stores/character";

const props = defineProps<{
  characterData: {
    id: number;
    name: string;
    location: { name: string };
    species: string;
    image: string;
  };
  isSelected?: boolean;
}>();

const character = useCharacterStore();
</script>

<style scoped></style>
