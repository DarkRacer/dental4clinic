import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MainPage from "@/MainPage.vue";
import TheWelcome from "@/components/TheWelcome.vue";
import VueCookies from 'vue-cookies';


const router = createRouter({
  routes: [{
    path: '/',
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
app.use(VueCookies);
app.mount('#app')
