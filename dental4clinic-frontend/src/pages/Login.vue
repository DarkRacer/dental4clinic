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
      loginForm: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.loginForm)
      post("login", this.loginForm).then(data => {
        this.cookies.set('access_token', data['access_token'])
        this.cookies.set('user_id', data['id'])
        this.cookies.set('role', data['role'])
        this.$router.push({ path: '/' })
      }).catch((error) => {console.error('Error:', error)});
    }
  }
}
</script>

<template>
  <main class="login-body">
    <form id="login-form" class="login-card">
      <p class="card-title">Вход</p>
      <div class="form">
        <div class="form-field-last-column">
          <div class="form-field">
            <div class="form-field-title">Логин</div>
            <input type="text" name="login" id="login-field" placeholder="Логин" class="form-field-input" v-model="loginForm.login">
          </div>
          <div class="form-field">
            <div class="form-field-title">Пароль</div>
            <input type="password" name="password" id="password-field" placeholder="Пароль" class="form-field-input" v-model="loginForm.password">
          </div>
        </div>
      </div>
      <div class="submit-button" type="submit" id="login-form-submit" @click="submit">Войти</div>
      <div class="registration" @click="$router.push({ path: '/registration' });">Регистрация</div>
    </form>
  </main>
</template>

<style scoped>
@import "../assets/styles/login.scss";
@import "../assets/styles/main.scss";
</style>
