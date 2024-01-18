<script>
import {post} from "@/pages/js/core/rest.js";

export default {
  data() {
    return {
      user: {
        name: '',
        surname: '',
        patronymic: '',
        dateOfBirthday: '',
        phone: '',
        email: '',
        allergies: '',
        photo: null,
        photoName: null,
        address: '',
        login: null,
        password: null
      },
      notificationText: ''
    }
  },
  methods: {
    save: function () {
      this.$emit('submit', this.user)
      // for stub /user/create
      post("user/create", this.user).then(data => {
        const { login, password } = data;
        this.$refs.notification.style.visibility = 'visible';
        this.notificationText = `
          Пользователь успешно создан
          Логин: ${login}
          Пароль: ${password}
          Не забудьте напомнить поменять пароль!
    `
      }).catch((error) => {
        this.$refs.notification.style.visibility = 'visible';
        this.notificationText = `Пользователь не создан`
      });
    }
  }
}
</script>

<template>
  <main class="user-create-profile">
    <div class="user-create-body">
      <form class="form" id="createForm">
        <div class="required-fields">
          <div class="required-field">
            <div class="required-field-title">Имя</div>
            <input type="text" v-model="user.name" name="name" placeholder="Имя" class="required-field-input">
          </div>
          <div class="required-field">
            <div class="required-field-title">Фамилия</div>
            <input type="text" v-model="user.surname" name="surname" placeholder="Фамилия" class="required-field-input">
          </div>
          <div class="required-field">
            <div class="required-field-title">Отчество</div>
            <input type="text" v-model="user.patronymic" name="patronymic" placeholder="Отчество" class="required-field-input">
          </div>
        </div>
        <div class="required-fields">
          <div class="required-field">
            <div class="required-field-title">Дата рождения</div>
            <input type="date" v-model="user.dateOfBirthday" name="dateOfBirthday" placeholder="Дата рождения" class="required-field-input">
          </div>
          <div class="required-field">
            <div class="required-field-title">Телефон</div>
            <input type="text" v-model="user.phone" name="phone" placeholder="+7 (___) ___-__-__" class="required-field-input">
          </div>
          <div class="required-field">
            <div class="required-field-title">E-mail</div>
            <input type="email" v-model="user.email" name="email" placeholder="E-mail" class="required-field-input">
          </div>
        </div>
        <div class="additional-fields">
          <div class="additional-field">
            <div class="additional-field-title">Адрес проживания</div>
            <textarea type="text" v-model="user.address" name="address" placeholder="Адрес проживания" class="additional-field-input"></textarea>
          </div>
          <div class="additional-field">
            <div class="additional-field-title">Аллергии</div>
            <textarea type="text" v-model="user.allergies" name="allergies" placeholder="Аллергии" class="additional-field-input"></textarea>
          </div>
        </div>
        <div class="save-button" @click="save">Создать</div>
        <div class="notification" ref="notification" style="visibility: hidden">
          <p class="notification-text" v-text="notificationText"></p>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
@import "../assets/styles/admin/user-create.scss";
@import "../../src/main.scss";
</style>
