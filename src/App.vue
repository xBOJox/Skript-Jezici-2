#App.vue
<template>
  <div id="app">
    <Nav />
    <router-view />
    <Footer />
    <ErrorComponent v-if="error" :error= "error"/>
  </div>
</template>

<script>
import ErrorComponent from './components/Error';
import Footer from './components/Footer.vue';
import Nav from './components/Nav.vue'

export default {
  name: 'App',
  components: { Nav , Footer, ErrorComponent},

  data() {
    return {
      error: null
    }
  },
  methods: {
    showError(error) {
      this.error = error;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>