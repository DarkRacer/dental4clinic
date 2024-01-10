import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MainPage from "./pages/MainPage.vue";
import ClinicInfo from "./pages/ClinicInfo.vue"
import Doctors from "./pages/Doctors.vue"
import Prices from "@/pages/Prices.vue";
import Login from "@/pages/Login.vue";
import Registration from "@/pages/Registration.vue";
import AppointmentsCreate from "@/pages/AppointmentsCreate.vue";
import Appointments from "@/pages/Appointments.vue";
import UserPayments from "@/pages/UserPayments.vue";


const router = createRouter({
  routes: [
    {
      path: '/',
      component: MainPage
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/registration',
      component: Registration
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
    },
    {
      path: '/appointments/create',
      component: AppointmentsCreate
    },
    {
      path: '/appointments/:userId',
      component: Appointments
    },
    {
      path: '/payments/:userId',
      component: UserPayments
    }
  ],
  history: createWebHistory()
})

const app = createApp(App)
app.use(router)
app.mount('#app')
