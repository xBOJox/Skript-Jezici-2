<template>
  <div>
    <h1>Register</h1>
    <form>
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required/>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required/>
      <br />
      <label for="confirmPassword">Confirm Password:</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" required/>
      <br />
      <button @click.prevent="register">Register</button>
    </form>
  </div>
</template>

<script>
import {register} from '../api/api';

export default {
  name: 'Register',
  emits: ['showError'],
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    async register() {
        if (this.password !== this.confirmPassword) {
            this.$root.showError({ code: 'INVALID_DATA', message: 'Lozinka i potvrda lozinke se ne poklapaju' });
            return;
        }
        if (this.username.length < 3 || this.username.length > 32) {
            this.$root.showError({ code: 'INVALID_DATA', message: 'Korisničko ime mora biti između 3 i 32 karaktera' });
            return;
        }
        if (this.password.length < 8 || this.password.length > 128) {
            this.$root.showError({ code: 'INVALID_DATA', message: 'Lozinka mora biti između 8 i 128 karaktera' });
            return;
        }
        try {
            const response = await register(this.username, this.password);
            this.$router.push({ name: 'login' });
        }catch (error) {
            if (error.response) {
                this.$emit('showError', error.response.data);
            } else {
                console.error('Unknown error');
                throw error;
            }
        }
    }
  }
}
</script>

<style>
/* Add some basic styling to the register form */
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

input[type="text"], input[type="email"], input[type="password"] {
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