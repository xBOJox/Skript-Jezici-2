<template>
  <div class="login-page">
    <h1>Login</h1>
    <div class="login-container">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username"/>
      <div v-if="usernameError" class="error">{{ usernameError }}</div>
      <br/>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password"/>
      <div v-if="passwordError" class="error">{{ passwordError }}</div>
      <br/>
      <button @click.prevent="login">Login</button>
    </div>
  </div>
</template>

<script setup lang="ts" `>
import {useAuthStore} from '../store/auth';
import {ref} from "vue";

import { useRouter } from 'vue-router'

const authStore = useAuthStore();
const router = useRouter();
const username = ref('');
const password = ref('');
const usernameError = ref('');
const passwordError = ref('');

const emit = defineEmits(['login-success', 'login-error'])

const  login = async () => {
  usernameError.value = '';
  passwordError.value = '';

  if (!validateUsername()) {
    usernameError.value = 'Username must be between 2 and 32 characters long.';
  }

  if (!validatePassword()) {
    passwordError.value = 'Password must be between 8 and 128 characters long.';
  }

  if (usernameError.value || passwordError.value) {
    return;
  }

  try {
    authStore.login(username.value, password.value);
    emit('login-success');
    router.push({ path: '/drawing' });
  } catch (error) {
    console.error(error)
    emit('login-error', error);
  }
}

const validateUsername = () => {
  return username.value.length >= 2 && username.value.length <= 32;

}

const validatePassword = () => {
  return password.value.length >= 8 && password.value.length <= 128;
}
</script>

<style scoped>
/* Add some basic styling to the login form */
.login-container {
  width: 300px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 10px;
}

input[type="text"], input[type="password"] {
  width: 90%;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  height: 40px;
  background-color: #4CAF50;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

button:hover {
  background-color: #3e8e41;
}
</style>