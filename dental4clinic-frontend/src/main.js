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
import Profile from "@/pages/Profile.vue";
import ProfileEdit from "@/pages/ProfileEdit.vue";
import Receptions from "@/pages/Receptions.vue";
import Reception from "@/pages/Reception.vue";
import CreateUser from "@/pages/CreateUser.vue";
import RecordList from "@/pages/RecordList.vue";


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
      path: '/profile/:userId',
      component: Profile
    },
    {
      path: '/profile/:userId/edit',
      component: ProfileEdit
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
    },
    {
      path: '/:userId/receptions',
      component: Receptions
    },
    {
      path: '/:userId/reception/:appointmentId',
      component: Reception
    },
    {
      path: '/user/create',
      component: CreateUser
    },
    {
      path: '/record/list',
      component: RecordList
    }
  ],
  history: createWebHistory()
})

const app = createApp(App)
app.use(router)
app.mount('#app')
