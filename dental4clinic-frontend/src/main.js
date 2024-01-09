import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MainPage from "./pages/MainPage.vue";
import ClinicInfo from "./pages/ClinicInfo.vue"
import Doctors from "./pages/Doctors.vue"
import VueCookies from 'vue-cookies';
import Prices from "@/pages/Prices.vue";


const router = createRouter({
  routes: [{
    path: '/',
    component: MainPage
  },
    {
      path: '/clinic/info',
      component: ClinicInfo
    },
    {
      path: '/doctors',
      component: Doctors
    },
    {
      path: '/prices',
      component: Prices
    }
  ],
  history: createWebHistory()
})

const app = createApp(App)
app.use(router)
app.use(VueCookies);
app.mount('#app')
