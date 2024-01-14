<script>
import { useCookies } from '@vueuse/integrations/useCookies'
import {get} from "@/pages/js/core/rest.js";

export default {
  data() {
    return {
      currentUser: {
        id: '',
        name: '',
        surname: '',
        patronymic: '',
        dateOfBirthday: '',
        phone: '',
        email: '',
        allergies: '',
        photo: '',
        photoName: '',
        address: '',
        specialization: '',
        description: '',
        pluses: ''
      }
    }
  },
  setup() {
    const cookies = useCookies(['user_id', 'role', 'access_token'])
    return {
      cookies,
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getUserInfo()
      },
      {immediate: true}
    )
  },
  computed: {
    user: function () {
      return {
        id: this.cookies.get("user_id"),
        role: this.cookies.get("role"),
        token: this.cookies.get("access_token")
      }
    }
  },
  methods: {
    getUserInfo: function () {
      get(`user/${this.user.id}`).then(data => {
        this.currentUser = data;
        this.currentUser.email = data['e-mail'];
      }).catch(error => console.error(error));
    },
  }
}
</script>

<template>
    <div class="header-div-left">
      <div class="logo" @click="$router.push({ path: '/' });">
        <img class="logo-img" src="../img/logo.png"/>
        <p class="dental4clinic-logo">Dental4Clinic</p>
      </div>

      <!--UNAUTHORIZED-->
      <p class="header-item" v-if="!user.role" @click="$router.push({ path: '/appointments/create' });">Записаться</p>
      <p class="header-item" v-if="!user.role"  @click="$router.push({ path: '/prices' });">Цены</p>
      <p class="header-item" v-if="!user.role"  @click="$router.push({ path: '/doctors' });">Врачи</p>
      <div class="header-item" v-if="!user.role"  @click="$router.push({ path: '/clinic/info' });">О нас</div>

      <!--USER-->
      <p class="header-item" v-if="user.role === 'USER'" @click="$router.push({ path: '/appointments/' + this.user.id });">Мои записи</p>
      <p class="header-item" v-if="user.role === 'USER'" @click="$router.push({ path: '/appointments/create' });">Записаться</p>
      <p class="header-item" v-if="user.role === 'USER'" @click="$router.push({ path: '/payments/' + this.user.id });">Оплата услуг</p>
      <p class="header-item" v-if="user.role === 'USER'" @click="$router.push({ path: '/prices' });">Цены</p>
      <p class="header-item" v-if="user.role === 'USER'" @click="$router.push({ path: '/doctors' });">Врачи</p>
      <div class="header-item" v-if="user.role === 'USER'" @click="$router.push({ path: '/clinic/info' });">О нас</div>

      <!--DOCTOR-->
      <div class="header-item" v-if="user.role === 'DOCTOR'" @click="$router.push({ path: '/' + this.user.id + '/receptions' });">Приём пациентов</div>

      <!--ADMIN-->
      <p class="header-item" v-if="user.role === 'ADMIN'" @click="$router.push({ path: '/user/create' });">Создать пользователя</p>
      <p class="header-item" v-if="user.role === 'ADMIN'" @click="$router.push({ path: '/appointments/create' });">Назначить запись</p>
      <p class="header-item" v-if="user.role === 'ADMIN'" @click="$router.push({ path: '/record/list' });">График записей</p>
      <p class="header-item" v-if="user.role === 'ADMIN'" @click="$router.push({ path: '/prices' });">Цены</p>
      <p class="header-item" v-if="user.role === 'ADMIN'" @click="$router.push({ path: '/doctors' });">Врачи</p>
      <div class="header-item" v-if="user.role === 'ADMIN'" @click="$router.push({ path: '/payments' });">Оплаты</div>

      <!--DIRECTOR-->
      <p class="header-item" v-if="user.role === 'DIRECTOR'" @click="$router.push({ path: '/record/list' });">График записей</p>
      <p class="header-item" v-if="user.role === 'DIRECTOR'" @click="$router.push({ path: '/requests' });">Заявки</p>
      <p class="header-item" v-if="user.role === 'DIRECTOR'" @click="$router.push({ path: '/payments' });">Оплаты</p>
      <p class="header-item" v-if="user.role === 'DIRECTOR'" @click="$router.push({ path: '/prices' });">Цены</p>
      <p class="header-item" v-if="user.role === 'DIRECTOR'" @click="$router.push({ path: '/doctors' });">Врачи</p>
      <div class="header-item" v-if="user.role === 'DIRECTOR'" @click="$router.push({ path: '/admins' });">Администраторы</div>
    </div>

    <div class="header-div-right">
      <div class="logo-user" v-if="!user.token" @click="$router.push({ path: '/login' });">
        <img class="logo-user-image" src="../img/user-logo.png"/>
      </div>
      <div class="logo-user" v-else-if="user.token" @click="$router.push({ path: `/profile/${user.id}` });">
        <img class="logo-user-image" v-bind:src="currentUser.photo ? currentUser.photo : '../img/default.jpg'"/>
      </div>
      <div class="phone-number">
        <img class="phone" src="../img/phone.png"/>
        <p class="number">+7 473-222-22-22</p>
      </div>
    </div>
</template>

<style scoped>
@import "../main.scss";
</style>
