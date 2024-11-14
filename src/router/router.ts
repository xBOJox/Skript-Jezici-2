import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('../views/Gallery.vue')
  },
  {
    path: '/image/:id',
    name: 'SingleImage',
    component: () => import('../views/Picture.vue')
  },
  {
    path: '/drawing',
    name: 'Drawing',
    component: () => import('../views/Draw.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router