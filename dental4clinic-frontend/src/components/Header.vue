<script>
export default {
  data() {
    return {
      user: {
        id: this.$cookies.get("user_id"),
        role: this.$cookies.get("role"),
        token: this.$cookies.get("access_token")
      }
    }
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
      <p class="header-item" v-if="!user.role" @click="$router.push({ path: '/unauthorized/appointments/create' });">Записаться</p>
      <p class="header-item" v-if="!user.role"  @click="$router.push({ path: '/unauthorized/prices' });">Цены</p>
      <p class="header-item" v-if="!user.role"  @click="$router.push({ path: '/unauthorized/doctors' });">Врачи</p>
      <div class="header-item" v-if="!user.role"  @click="$router.push({ path: '/clinic/info' });">О нас</div>

      <!--USER-->
      <p class="header-item" v-if="user.role === 'USER'" @click="$router.push({ path: '/user/appointments' });">Мои записи</p>
      <p class="header-item" v-if="user.role === 'USER'" @click="$router.push({ path: '/user/appointments/create' });">Записаться</p>
      <p class="header-item" v-if="user.role === 'USER'" @click="$router.push({ path: '/user/payments' });">Оплата услуг</p>
      <p class="header-item" v-if="user.role === 'USER'" @click="$router.push({ path: '/user/prices' });">Цены</p>
      <p class="header-item" v-if="user.role === 'USER'" @click="$router.push({ path: '/user/doctors' });">Врачи</p>
      <div class="header-item" v-if="user.role === 'USER'" @click="$router.push({ path: '/user/clinic/info' });">О нас</div>

      <!--DOCTOR-->
      <div class="header-item" v-if="user.role === 'DOCTOR'" @click="$router.push({ path: '/doctor/reception' });">Приём пациентов</div>

      <!--ADMIN-->
      <p class="header-item" v-if="user.role === 'ADMIN'" @click="$router.push({ path: '/admin/user/create' });">Создать пользователя</p>
      <p class="header-item" v-if="user.role === 'ADMIN'" @click="$router.push({ path: '/admin/appointments/create' });">Назначить запись</p>
      <p class="header-item" v-if="user.role === 'ADMIN'" @click="$router.push({ path: '/admin/record/list' });">График записей</p>
      <p class="header-item" v-if="user.role === 'ADMIN'" @click="$router.push({ path: '/admin/prices' });">Цены</p>
      <p class="header-item" v-if="user.role === 'ADMIN'" @click="$router.push({ path: '/admin/doctors' });">Врачи</p>
      <div class="header-item" v-if="user.role === 'ADMIN'" @click="$router.push({ path: '/admin/payments' });">Оплаты</div>

      <!--DIRECTOR-->
      <p class="header-item" v-if="user.role === 'DIRECTOR'" @click="$router.push({ path: '/director/record/list' });">График записей</p>
      <p class="header-item" v-if="user.role === 'DIRECTOR'" @click="$router.push({ path: '/director/requests' });">Заявки</p>
      <p class="header-item" v-if="user.role === 'DIRECTOR'" @click="$router.push({ path: '/director/payments' });">Оплаты</p>
      <p class="header-item" v-if="user.role === 'DIRECTOR'" @click="$router.push({ path: '/director/prices' });">Цены</p>
      <p class="header-item" v-if="user.role === 'DIRECTOR'" @click="$router.push({ path: '/director/doctors' });">Врачи</p>
      <div class="header-item" v-if="user.role === 'DIRECTOR'" @click="$router.push({ path: '/director/admins' });">Администраторы</div>
    </div>

    <div class="header-div-right">
      <div class="logo-user" v-if="!user.token" @click="$router.push({ path: '/login' });">
        <img class="logo-user-image" src="../img/user-logo.png"/>
      </div>
      <div class="logo-user" v-else-if="!user.token" @click="$router.push({ path: `/profile/${user.id}` });">
<!--        todo: change after upload image from backend-->
        <img class="logo-user-image" src="../img/user-photo.png"/>
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
