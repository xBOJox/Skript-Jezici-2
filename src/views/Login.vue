<template>
  <div>
    <h1>Login</h1>
    <form>
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" />
      <div v-if="usernameError" class="error">{{ usernameError }}</div>
      <br />
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" />
      <div v-if="passwordError" class="error">{{ passwordError }}</div>
      <br />
      <button @click="login">Login</button>
    </form>
  </div>
</template>

<script>
import api from '../api/api';
import { useAuthStore } from '../stores/auth';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      usernameError: null,
      passwordError: null,
    };
  },
  methods: {
    async login() {
      this.usernameError = null;
      this.passwordError = null;

      if (!this.validateUsername()) {
        this.usernameError = 'Username must be between 2 and 32 characters long.';
      }

      if (!this.validatePassword()) {
        this.passwordError = 'Password must be between 8 and 128 characters long.';
      }

      if (this.usernameError || this.passwordError) {
        return;
      }

      try {
        const response = await api.login(this.username, this.password);
        const authStore = useAuthStore();
        authStore.login(response.token, response.username);
        this.$emit('login-success');
      } catch (error) {
        this.$emit('login-error', error);
      }
    },
    validateUsername() {
      return this.username.length >= 2 && this.username.length <= 32;
    },
    validatePassword() {
      return this.password.length >= 8 && this.password.length <= 128;
    },
  },
};
</script>

<style>
/* Add some basic styling to the login form */
form {
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
  width: 100%;
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