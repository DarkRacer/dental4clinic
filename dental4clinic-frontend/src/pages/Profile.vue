<script>
import {get} from "@/pages/js/core/rest.js";
import {useCookies} from "@vueuse/integrations/useCookies";
import {useJwt} from "@vueuse/integrations/useJwt";

export default {
  data() {
    return {
      user: {
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
      },
      diagnosisTableValue: [],
      toothPictures: []
    }
  },
  setup() {
    const cookies = useCookies(['access_token'])

    return {
      cookies
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getUserInfo()
        if (this.userCookie.role === 'USER') {
          this.getUserDiagnosis()
        }
      },
      {immediate: true}
    )
  },
  computed: {
    fullName: function() {
      return `${this.user.surname}  ${this.user.name}  ${this.user.patronymic}`
    },
    userCookie: function () {
      const { header, payload } = useJwt(this.cookies.get('access_token'))
      if (!payload.value) {
        return {
          id: null,
          role: null
        }
      }
      return  {
        id: payload.value.id,
        role: payload.value.role
      }
    }
  },
  methods: {
    getUserInfo: function () {
      get(`user/${this.$route.params.userId}`).then(data => {
        this.user = data;
        this.user.email = data['e-mail'];
      }).catch(error => console.error(error));
    },
    getUserDiagnosis: function () {
      get(`user/diagnosis/${this.$route.params.userId}`).then(data => {
        this.diagnosisTableValue = data
      }).catch(error => console.error(error));
    },
    getToothPictures: function() {
      get(`user/tooth/${this.$route.params.userId}`).then(data => {
        this.toothPictures = data
      }).catch(error => console.error(error));
    },
    actualDiagnosisMapper: function(isActual) {
      return isActual ? "Не вылечено" : "Вылечено"
    },
    openToothPictures: function () {
      this.$refs.toothPicture.style.display = 'flex'
      this.getToothPictures()
      this.$refs.toothPicture.show()
    },
    closeToothPictures: function () {
      this.$refs.toothPicture.style.display = null
      this.$refs.toothPicture.close()
    }
  }
}
</script>

<template>
  <main class="user-profile-body">
    <div class="user-profile-body-content">
      <div class="user-card">
        <div class="user-card-content">
          <img class="user-profile-photo" v-bind:src="user.photo ? user.photo : '../img/default.jpg'"/>
          <div class="card-fields">
            <div class="card-field-group">
              <div class="user-card-field">ФИО</div>
              <div class="field-content" v-text="fullName"></div>
            </div>
            <div class="card-field-group" v-if="userCookie.role === 'USER'">
              <div class="user-card-field">Дата рождения</div>
              <div class="field-content" v-text="user.dateOfBirthday"></div>
            </div>
            <div class="card-field-group" v-if="userCookie.role === 'USER'">
              <div class="user-card-field">Телефон</div>
              <div class="field-content" v-text="user.phone"></div>
            </div>
            <div class="card-field-group" v-if="userCookie.role === 'USER'">
              <div class="user-card-field">E-mail</div>
              <div class="field-content" v-text="user.email"></div>
            </div>
            <div class="card-field-group" v-if="userCookie.role === 'USER'">
              <div class="user-card-field">Аллергии</div>
              <div class="field-content" v-text="user.allergies"></div>
            </div>
            <div class="card-field-group" v-if="userCookie.role === 'DOCTOR'">
              <div class="user-card-field">Специализация</div>
              <div class="field-content" v-text="user.specialization"></div>
            </div>
          </div>
        </div>
        <div class="user-card-buttons">
          <div class="user-card-button" id="openToothPicture" @click="openToothPictures()" v-if="userCookie.role === 'USER'">Снимки</div>
          <div class="user-card-button-last" @click="$router.push({ path: `/profile/${this.$route.params.userId}/edit` });">Редактировать профиль</div>
        </div>
      </div>
      <table class="table" v-if="userCookie.role === 'USER'">
        <tbody class="table">
        <tr class="row-header">
          <th class="cell-header">
            <div class="cell-header-content">Диагноз</div>
          </th>
          <th class="cell-header">
            <div class="cell-header-content">Описание</div>
          </th>
          <th class="cell-header">
            <div class="cell-header-content">Действительность</div>
          </th>
        </tr>

        <tr class="row" v-for="(n, index) in 4" :key="index">
          <th class="cell">
            <div class="cell-content" v-text="diagnosisTableValue[index] ? diagnosisTableValue[index].name : ''"></div>
          </th>
          <th class="cell">
            <div class="cell-content" v-text="diagnosisTableValue[index] ? diagnosisTableValue[index].description : ''"></div>
          </th>
          <th class="cell">
            <div class="cell-content" v-text="diagnosisTableValue[index] ? actualDiagnosisMapper(diagnosisTableValue[index].isActual) : ''"></div>
          </th>
        </tr>
        </tbody>
      </table>
      <div class="doctor-info" v-if="userCookie.role === 'DOCTOR'">
        <div class="doctor-info-content">
          <p class="card-title">Описание</p>
          <p class="doctor-info-content-text" v-text="user.description"></p>
        </div>
        <div class="doctor-info-content">
          <p class="card-title">Профессиональныенавыки</p>
          <p class="doctor-info-content-text" v-text="user.pluses"></p>
        </div>
      </div>
    </div>
    <dialog class="tooth-pictures-dialog-blackout" id="toothPicture" ref="toothPicture" v-if="userCookie.role === 'USER'">
      <div class="tooth-pictures-dialog-content">
        <div class="tooth-pictures-dialog-title">
          <div class="tooth-pictures-dialog-title-text">Снимки</div>
          <div class="tooth-pictures-dialog-close-div" id="toothPictureClose" @click="closeToothPictures()">
            <img class="tooth-pictures-dialog-close" src="../img/point-plus.png"/>
          </div>
        </div>
        <div class="tooth-pictures" id="toothPictures">
          <img class="tooth-picture" v-for="picture in toothPictures" v-bind:src="picture.data" />
        </div>
      </div>
    </dialog>
  </main>
</template>

<style scoped>
@import "../../src/assets/styles/user/profile.scss";
@import "../../src/assets/styles/doctor/profile.scss";
@import "../../src/main.scss";
</style>
