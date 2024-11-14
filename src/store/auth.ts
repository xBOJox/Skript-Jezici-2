import { defineStore } from 'pinia';
import { login, register } from '../api/api';

interface AuthState {
  token: string | null;
  username: string | null;
  isLoggedIn: boolean;
}

export const useAuthStore = defineStore<'auth', AuthState>('auth', {
  state: () => ({
    token: null,
    username: null,
    isLoggedIn: false,
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const response = await login(username, password);
        this.token = response.token;
        this.username = response.username;
        this.isLoggedIn = true;
      } catch (error) {
        console.error(error);
      }
    },
    async register(username: string, password: string) {
      try {
        const response = await register(username, password);
        this.token = response.token;
        this.username = response.username;
        this.isLoggedIn = true;
      } catch (error) {
        console.error(error);
      }
    },
    logout() {
      this.token = null;
      this.username = null;
      this.isLoggedIn = false;
    },
  },
});