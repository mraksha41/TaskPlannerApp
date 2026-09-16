<script setup lang="ts">
import type { Task } from '../types/Task';

defineProps<{
  tasks: Task[];
}>();

const emit = defineEmits<{
  toggle: [task: Task];
}>();
</script>

<template>
  <div class="task-list">
    <p v-if="tasks.length === 0" class="empty">
      No tasks yet.
    </p>

    <label
        v-for="task in tasks"
        :key="task._id"
        class="task"
        :class="{ completed: task.completed }"
    >
      <input
          type="checkbox"
          :checked="task.completed"
          @change="emit('toggle', task)"
      />

      <span>
        {{ task.description }}
      </span>
    </label>
  </div>
</template>