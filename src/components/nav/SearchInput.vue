<template>
  <div class="flex">
    <input
      type="text"
      @input="debounce"
      :value="props.modelValue"
      class="bg-red text-xl pl-4 pr-10 py-2 rounded"
      placeholder="Search here"
    />
    <div class="-ml-10 h-10 w-10 flex items-center justify-center">
      <IconSearch
        v-if="!props.modelValue"
        class="h-6 w-6 fill-gray-200"
      ></IconSearch>
      <button
        v-else
        @click="clear"
        class="bg-gray-300 hover:bg-gray-400 transition rounded-md p-1 mt-1 mr-1"
      >
        <IconClear class="h-6 w-6 fill-gray-200"></IconClear>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconSearch from "../icons/IconSearch.vue";
import IconClear from "../icons/IconClear.vue";
const emits = defineEmits<{ (e: "update:modelValue", value: string): void }>();
const props = defineProps<{ modelValue?: string }>();

let timer: ReturnType<typeof setTimeout>;
const debounce = (e: Event) => {
  const target = e.target as HTMLInputElement;
  clearTimeout(timer);
  timer = setTimeout(() => {
    emits("update:modelValue", target.value);
  }, 400);
};
const clear = () => {
  emits("update:modelValue", "");
};
</script>

<style lang="scss" scoped></style>
