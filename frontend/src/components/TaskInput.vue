<script setup lang="ts">
import { nextTick, ref } from 'vue';

const emit = defineEmits<{
  add: [description: string];
}>();

const description = ref('');
const input = ref<HTMLInputElement | null>(null);

function submitTask() {
  const value = description.value.trim();

  if (!value) {
    return;
  }

  emit('add', value);

  description.value = '';

  nextTick(() => {
    input.value?.focus();
  });
}
</script>

<template>
  <form class="task-input" @submit.prevent="submitTask">
    <input
        ref="input"
        v-model="description"
        type="text"
        maxlength="500"
        placeholder="Add Tasks..."
        autocomplete="off"
        autofocus
    />

    <button type="submit">
      Add
    </button>
  </form>
</template>