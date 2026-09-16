<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  authenticated: [token: string];
}>();

const answer = ref('');
const error = ref('');
const loading = ref(false);
const showAnswer = ref(false);

async function login() {
  const trimmedAnswer = answer.value.trim();

  if (!trimmedAnswer) {
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const response = await fetch(
        'http://localhost:3000/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            answer: trimmedAnswer,
          }),
        },
    );

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const data = await response.json();

    emit('authenticated', data.accessToken);
  } catch {
    error.value = 'Incorrect answer.';
    answer.value = '';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="login">
    <h1>When do you want it?</h1>

    <form @submit.prevent="login">
      <div class="password-field">
        <input
            v-model="answer"
            :type="showAnswer ? 'text' : 'password'"
            placeholder="Answer"
            autocomplete="off"
            autofocus
        />

        <button
            type="button"
            class="password-toggle"
            :aria-label="showAnswer ? 'Hide answer' : 'Show answer'"
            :title="showAnswer ? 'Hide answer' : 'Show answer'"
            @click="showAnswer = !showAnswer"
        >
          <!-- Eye -->
          <svg
              v-if="!showAnswer"
              viewBox="0 0 24 24"
              aria-hidden="true"
          >
            <path
                d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />

            <circle
                cx="12"
                cy="12"
                r="3"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            />
          </svg>

          <!-- Eye off -->
          <svg
              v-else
              viewBox="0 0 24 24"
              aria-hidden="true"
          >
            <path
                d="M3 3l18 18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
            />

            <path
                d="M10.6 5.2A10.5 10.5 0 0 1 12 5c6.5 0 10 7 10 7a16 16 0 0 1-3 4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
            />

            <path
                d="M6.6 6.6C3.7 8.5 2 12 2 12s3.5 7 10 7a10 10 0 0 0 4-.8"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <button
          type="submit"
          class="login-button"
          :disabled="loading"
      >
        {{ loading ? 'Checking...' : 'Login' }}
      </button>
    </form>

    <p
        v-if="error"
        class="error"
    >
      {{ error }}
    </p>
  </div>
</template>