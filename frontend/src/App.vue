<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';

import Login from './components/Login.vue';
import TaskInput from './components/TaskInput.vue';
import TaskList from './components/TaskList.vue';

import type {Task} from './types/Task';

import {
  createTask,
  getTasks,
  updateTask,
} from './api/tasks';

const tasks = ref<Task[]>([]);
const completedTasks = computed(() =>
    tasks.value.filter(task => task.completed).length
);

const loading = ref(true);
const error = ref('');
const token = ref(
    sessionStorage.getItem('accessToken'),
);

function authenticated(accessToken: string) {
  sessionStorage.setItem(
      'accessToken',
      accessToken,
  );

  token.value = accessToken;

  loadTasks();
}

async function loadTasks() {
  try {
    error.value = '';
    tasks.value = await getTasks();
  } catch {
    error.value = 'Unable to load tasks.';
  } finally {
    loading.value = false;
  }
}

async function addTask(description: string) {
  try {
    error.value = '';

    const task = await createTask(description);

    tasks.value.unshift(task);
  } catch {
    error.value = 'Unable to add task.';
  }
}

async function toggleTask(task: Task) {
  const previousValue = task.completed;

  // Update immediately for responsive UX.
  task.completed = !task.completed;

  try {
    await updateTask(task._id, task.completed);
  } catch {
    // Roll back if the API request fails.
    task.completed = previousValue;
    error.value = 'Unable to update task.';
  }
}

onMounted(() => {
  if (token.value) {
    loadTasks();
  }
});

</script>

<template>
  <Login
      v-if="!token"
      @authenticated="authenticated"
  />

  <main
      v-else
      class="container"
  >
    <header>
      <h1>Tasks</h1>

      <p
          v-if="tasks.length > 0"
          class="task-summary"
      >
        {{ completedTasks }} out of {{ tasks.length }} tasks completed
      </p>
    </header>

    <TaskInput @add="addTask"/>

    <p
        v-if="error"
        class="error"
    >
      {{ error }}
    </p>

    <p v-if="loading">
      Loading...
    </p>

    <TaskList
        v-else
        :tasks="tasks"
        @toggle="toggleTask"
    />
  </main>
</template>