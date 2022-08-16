<template>
  <main class="h-screen">
    <div class="flex h-full">
      <div
        :class="[
          { 'hidden md:flex': props.characterId },
          'w-full md:w-1/3 lg:w-1/4 h-full flex flex-col shadow-xl',
        ]"
      >
        <SideNavigation></SideNavigation>
      </div>
      <div
        :class="[
          { 'hidden md:flex': !props.characterId },
          'w-full md:w-2/3 lg:w-3/4 flex h-full overflow-hidden flex-col',
        ]"
      >
        <div class="overflow-y-auto h-full">
          <CharacterDetails></CharacterDetails>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import SideNavigation from "../components/nav/SideNavigation.vue";
import CharacterDetails from "../components/character/CharacterDetails.vue";
import { onMounted } from "vue";
import { useCharacterStore } from "@/stores/character";
import router from "@/router";
const props = defineProps<{ characterId?: string }>();

const checkPropAndFetchData = async () => {
  if (props.characterId) {
    const character = useCharacterStore();
    try {
      await character.fetchData(parseInt(props.characterId));
    } catch (err) {
      router.push({ name: "home" });
    }
  }
};

onMounted(() => {
  checkPropAndFetchData();
});
</script>
