<template>
  <nav class="nav">
    <ul>
      <li><router-link to="/">Home</router-link></li>

      <div v-if="authStore.isLoggedIn">
        <li><router-link to="/gallery">Gallery</router-link></li>
        <li><router-link to="/drawing">Drawing</router-link></li>
        <li>Hello, {{authStore.username}}</li>
        <li><button @click="logout" class="logout-button">Logout</button></li>
      </div>
      <div v-else>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
      </div>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import {useAuthStore} from "@/store/auth.ts";
import { useRouter } from "vue-router";
const authStore = useAuthStore()

const router = useRouter();

const logout = () => {
  authStore.logout(); // Clear tokens and reset state
  router.push("/");   // Redirect to homepage
};
</script>

<style>
.nav {
  background-color: #333;
  color: #fff;
  padding: 1em;
  text-align: center;
}

.nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav li {
  display: inline-block;
  margin-right: 20px;
}

.nav a {
  color: #fff;
  text-decoration: none;
}

.nav a:hover {
  color: #ccc;
}

.router-link-exact-active {
  color: #ccc;
}

.logout-button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1em;
}

.logout-button:hover {
  color: #ccc;
  text-decoration: underline;
}
</style>