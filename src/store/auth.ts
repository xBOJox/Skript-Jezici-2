import { defineStore } from 'pinia';
import { login, register } from '../api/api';

interface AuthState {
  token: string | null;
  username: string | null;
  isLoggedIn: boolean;
}

export const useAuthStore = defineStore<'auth', AuthState>('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
    isLoggedIn: !!localStorage.getItem('token'),
  }),
  actions: {

    async login(username: string, password: string) {
      try {
        const response = await login({username, password});
        this.token = response.token;
        this.username = response.username;
        this.isLoggedIn = true;
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
        return true;
      } catch (error) {
        console.error(error);
        throw error;
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
        throw error;
      }
    },
    logout() {
      this.token = null;
      this.username = null;
      this.isLoggedIn = false;

      // Clear from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
    syncWithLocalStorage() {
      this.token = localStorage.getItem('token');
      this.username = localStorage.getItem('username');
      this.isLoggedIn = !!this.token;
    },
  },
});