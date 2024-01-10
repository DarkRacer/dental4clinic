<script>
import {post} from "@/pages/js/core/rest.js";
import {useCookies} from "@vueuse/integrations/useCookies";

export default {
  setup() {
    const cookies = useCookies(['user_id', 'role', 'access_token'])
    return {
      cookies,
    }
  },
  data() {
    return {
      registrationForm: {
        id: null,
        name: '',
        surname: '',
        patronymic: '',
        dateOfBirthday: '',
        phone: '',
        email: '',
        allergies: '',
        imageString: '',
        fileName: '',
        address: '',
        login: '',
        password: ''
      }
    }
  },
  methods: {
    imageUploaded: function () {
      const file = document.querySelector(
        'input[type=file]')['files'][0];

      const reader = new FileReader();
      this.registrationForm.fileName = file.name;

      reader.onload = () => this.registrationForm.imageString = reader.result;
      reader.readAsDataURL(file);
    },
    submit: function () {
      this.$emit('submit', this.registrationForm)
      post("registration", this.registrationForm).then(data => {
        this.cookies.set('access_token', data['access_token'])
        this.cookies.set('user_id', data['id'])
        this.cookies.set('role', data['role'])
        this.$router.push({ path: '/' })
      }).catch((error) => {console.error('Error:', error);});
    }
  }
}
</script>

<template>
  <main class="profile-edit-page">
    <div class="profile-edit-body">
      <form class="form" id="registration-form">
        <div class="required-fields">
          <div class="required-field">
            <div class="required-field-title">Имя</div>
            <input type="text" id="name-field" name="name" placeholder="Имя" class="required-field-input" v-model="registrationForm.name">
          </div>
          <div class="required-field">
            <div class="required-field-title">Фамилия</div>
            <input type="text" id="surname-field" name="surname" placeholder="Фамилия" class="required-field-input" v-model="registrationForm.surname">
          </div>
          <div class="required-field">
            <div class="required-field-title">Отчество</div>
            <input type="text" id="patronymic-field" name="patronymic" placeholder="Отчество" class="required-field-input" v-model="registrationForm.patronymic">
          </div>
        </div>
        <div class="required-fields">
          <div class="required-field">
            <div class="required-field-title">Дата рождения</div>
            <input type="date" id="dateOfBirthday-field" name="dateOfBirthday" placeholder="Дата рождения" class="required-field-input" v-model="registrationForm.dateOfBirthday">
          </div>
          <div class="required-field">
            <div class="required-field-title">Телефон</div>
            <input type="text" id="phone-field" name="phone" placeholder="+7 (___) ___-__-__" class="required-field-input" v-model="registrationForm.phone">
          </div>
          <div class="required-field">
            <div class="required-field-title">E-mail</div>
            <input type="email" id="email-field" name="email" placeholder="E-mail" class="required-field-input" v-model="registrationForm.email">
          </div>
        </div>
        <div class="additional-fields">
          <div class="additional-field">
            <div class="additional-field-title">Адрес проживания</div>
            <textarea type="text" id="address-field" name="address" placeholder="Адрес проживания" class="additional-field-input" v-model="registrationForm.address"></textarea>
          </div>
          <div class="additional-field">
            <div class="additional-field-title">Аллергии</div>
            <textarea type="text" id="allergies-field" name="allergies" placeholder="Аллергии" class="additional-field-input" v-model="registrationForm.allergies"></textarea>
          </div>
        </div>
        <div class="photo-field">
          <div class="photo-field-title">Фотография</div>
          <input type="file" name="photo" multiple accept="image/*,image/jpeg" id="photo-field" class="photo-field-input" @change="imageUploaded()">
        </div>
        <div class="additional-fields">
          <div class="required-field">
            <div class="required-field-title">Логин</div>
            <input type="text" id="login-field" name="login" placeholder="Логин" class="required-login-field-input" v-model="registrationForm.login">
          </div>
          <div class="required-field">
            <div class="required-field-title">Пароль</div>
            <input type="password" id="password-field" name="password" placeholder="Пароль" class="required-login-field-input" v-model="registrationForm.password">
          </div>
        </div>
        <div class="save-button" id="save-button" @click="submit">Регистрация</div>
      </form>
    </div>
  </main>
</template>

<style scoped>
@import "../assets/styles/registration.scss";
@import "../assets/styles/main.scss";
</style>
