<script>
import {get, postWithoutResponse} from "@/pages/js/core/rest.js";
import {useCookies} from "@vueuse/integrations/useCookies";

export default {
  data() {
    return {
      userForm: {
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
        imageString: '',
        fileName: ''
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
    userCookie: function () {
      return {
        id: this.cookies.get("user_id"),
        role: this.cookies.get("role"),
        token: this.cookies.get("access_token")
      }
    }
  },
  methods: {
    getUserInfo: function () {
      get(`user/${this.$route.params.userId}`).then(data => {
        this.userForm = data;
        this.userForm.email = data['e-mail'];
      }).catch(error => console.error(error));
    },
    imageUploaded: function() {
      const file = document.querySelector(
        'input[type=file]')['files'][0];

      const reader = new FileReader();
      this.userForm.fileName = file.name;

      reader.onload = () => this.userForm.imageString = reader.result;
      reader.readAsDataURL(file);
    },
    submit: function () {
      this.$emit('submit', this.userForm)
      postWithoutResponse(`user/edit/${this.$route.params.userId}`, this.userForm).then(data => {
        this.$router.push({ path: `/profile/${this.$route.params.userId}` })
      })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }
}
</script>

<template>
  <main class="profile-edit-page">
    <div class="profile-edit-body">
      <form class="form" id="edit-form">
        <div class="required-fields">
          <div class="required-field">
            <div class="required-field-title">Имя</div>
            <input type="text" name="name" placeholder="Имя" class="required-field-input" v-model="userForm.name">
          </div>
          <div class="required-field">
            <div class="required-field-title">Фамилия</div>
            <input type="text" name="surname" placeholder="Фамилия" class="required-field-input" v-model="userForm.surname">
          </div>
          <div class="required-field">
            <div class="required-field-title">Отчество</div>
            <input type="text" name="patronymic" placeholder="Отчество" class="required-field-input" v-model="userForm.patronymic">
          </div>
        </div>
        <div class="required-fields" v-if="userCookie.role === 'USER'">
          <div class="required-field">
            <div class="required-field-title">Дата рождения</div>
            <input type="date" name="dateOfBirthday" placeholder="Дата рождения" class="required-field-input" v-model="userForm.dateOfBirthday">
          </div>
          <div class="required-field">
            <div class="required-field-title">Телефон</div>
            <input type="text" name="phone" placeholder="+7 (___) ___-__-__" class="required-field-input" v-model="userForm.phone">
          </div>
          <div class="required-field">
            <div class="required-field-title">E-mail</div>
            <input type="email" name="email" placeholder="E-mail" class="required-field-input" v-model="userForm.email">
          </div>
        </div>
        <div class="additional-fields" v-if="userCookie.role === 'USER'">
          <div class="additional-field">
            <div class="additional-field-title">Адрес проживания</div>
            <textarea type="text" name="address" placeholder="Адрес проживания" class="additional-field-input" v-model="userForm.address"></textarea>
          </div>
          <div class="additional-field">
            <div class="additional-field-title">Аллергии</div>
            <textarea type="text" name="allergies" placeholder="Аллергии" class="additional-field-input" v-model="userForm.allergies"></textarea>
          </div>
        </div>
        <div class="photo-field">
          <div class="photo-field-title">Фотография</div>
          <input type="file" name="photo" multiple accept="image/*,image/jpeg" class="photo-field-input" @change="imageUploaded()">
        </div>
        <div class="save-button" id="save-button" @click="submit">Сохранить</div>
      </form>
    </div>
  </main>
</template>

<style scoped>
@import "../../src/assets/styles/user/profile-edit.scss";
@import "../../src/main.scss";
</style>
