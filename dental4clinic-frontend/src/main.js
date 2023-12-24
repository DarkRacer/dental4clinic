import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MainPage from "@/unauthorized/MainPage.vue";
import TheWelcome from "@/components/TheWelcome.vue";


const router = createRouter({
  routes: [{
    path: '/home',
    component: MainPage
  },
    {
      path: '/test',
      component: TheWelcome
    }
  ],
  history: createWebHistory()
})

const app = createApp(App)
app.use(router)
app.mount('#app')
