<script setup>
import Calendar from "@/components/Calendar.vue";
</script>

<script>
import {get, postWithoutResponse} from "@/pages/js/core/rest.js";

export default {
  data() {
    return {
      appointments: [],
      contactBodyInfo: "Mы рады что вы пользуетесь нашими услугами, вы можете посмотреть ваши записи к врачам или запросить звонок, если у Вас возникли вопросы",
      requestForm: {
        name: '',
        phone: '',
        description: '',
      },
      monthName: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getAppointments()
        this.getUserInfo()
      },
      { immediate: true }
    )
  },
  methods: {
    getAppointments: function () {
      get(`appointments/user/${ this.$route.params.userId }`).then((data) => {
        this.appointments = data
      }).catch((error) => {
        console.error(error)
      })
    },
    getUserInfo: function () {
      get(`user/${ this.$route.params.userId }`).then(data => {
        this.contactBodyInfo = data.name + ", мы рады что вы пользуетесь нашими услугами, вы можете посмотреть ваши записи к врачам или запросить звонок, если у Вас возникли вопросы"
      }).catch(error => {
        console.error(error)
      });
    },
    getInfoByDate: function({date, appointments}, month, year) {
      this.contactBodyInfo = `${date} ${this.monthName[month]} ${year} :
`
      appointments.forEach((appointment) => {
        this.contactBodyInfo += `${appointment.datetime} - ${appointment['doctor-name']} - ${appointment['service-name']}
`
      })
    },
    submit() {
      this.$emit('submit', this.requestForm)
      postWithoutResponse('request/create', this.requestForm)
        .then(() => alert("Заявка отправлена"))
        .catch((error) => alert("Заявка не отправлена"))
    }
  },
}
</script>

<template>
  <main class="appointments-body">
    <div class="appointments-content-group">
      <Calendar :appointments="appointments" :get-info-by-date="getInfoByDate"></Calendar>
      <div class="content-group">
        <div class="contacts-body">
          <div class="contact-body-item" id="contactBodyInfo" v-text="contactBodyInfo"></div>
        </div>
        <div class="callback-body">
          <div class="callback-header">
            <div class="callback-header-title">Заказать обратный звонок</div>
            <div class="callback-header-sub-title">Наш сотрудник ответит вам в ближайшее время.</div>
          </div>
          <form class="submit-form" id="submitForm">
            <div class="submit-fields">
              <div class="group-main-fields">
                <div class="field">
                  <div class="field-title">Имя</div>
                  <input type="text" name="name" id="name-field" placeholder="Имя" class="callback-field" v-model="requestForm.name">
                </div>
                <div class="field">
                  <div class="field-title">Телефон *</div>
                  <input type="text" name="phone" id="phone-field" placeholder="+7 (___) ___-__-__" class="callback-field" v-model="requestForm.phone">
                </div>
              </div>
              <div class="group-additional-fields">
                <div class="field-title">О проблеме</div>
                <textarea type="text" name="description" id="description-field" placeholder="О проблеме" class="additional-field" v-model="requestForm.description"></textarea>
              </div>
            </div>
          </form>
          <div class="button-submit" id="submitButton" @click="submit">Заказать звонок</div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import "../assets/styles/user/appointments.scss";
@import "../../src/main.scss";
</style>
