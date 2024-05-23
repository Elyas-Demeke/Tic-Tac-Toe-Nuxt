<template>
  <div
    :class="{
      'hover:bg-neutral-800 cursor-pointer': !gameOver && model === -1,
    }"
    class="relative border h-12 w-12 transition-colors flex justify-center items-center text-white"
  >
    <div
      v-if="angle"
      :class="[
        { 'h-12': angle === 'column' },
        { 'rotate-90 h-12': angle === 'row' },
        { '-rotate-45  h-[67.9px]': angle === 'diagonal' },
        { 'rotate-45  h-[67.9px]': angle === 'reverseDiagonal' },
      ]"
      class="absolute border w-0 border-neutral-500"
    />
    {{ active }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number;
  gameOver: boolean;
  angle?: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: number): void;
}>();

const active = computed(() => {
  if (model.value === -1) return "";
  if (model.value === 0) return "O";
  if (model.value === 1) return "X";
  return ""
});

const model = computed({
  get() {
    return props.modelValue;
  },
  set(val: number) {
    emit("update:modelValue", val);
  },
});
</script>
