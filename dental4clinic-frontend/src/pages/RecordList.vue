<script setup>
import Calendar from "@/components/Calendar.vue";
</script>

<script>
import {get, postWithoutResponse} from "@/pages/js/core/rest.js";

export default {
  data() {
    return {
      doctor: '',
      patient: '',
      monthName: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
      appointments: [],
      filteredAppointments: []
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getAppointments()
      },
      { immediate: true }
    )
  },
  methods: {
    getAppointments: function () {
      get(`appointments`).then((data) => {
        this.appointments = data
        this.filteredAppointments = this.appointments
      }).catch((error) => {
        console.error(error)
      })
    },
    getInfoByDate: function ({date, appointments}, month, year) {
      this.contactBodyInfo = `${date} ${this.monthName[month]} ${year} :
`
      appointments.forEach((appointment) => {
        this.contactBodyInfo += `${appointment.datetime} - ${appointment.doctorName} - ${appointment.username}
`
      })
    },
    submit() {
      this.$emit('submit', this.requestForm)
      if (this.doctor && this.patient) {
        this.filteredAppointments = this.appointments.filter((info) => info.doctorName.toLowerCase().includes(this.doctor.toLowerCase()) && info.userName.toLowerCase().includes(this.patient.toLowerCase()))
      } else if (this.doctor) {
        this.filteredAppointments = this.appointments.filter((info) => info.doctorName.toLowerCase().includes(this.doctor.toLowerCase()))
      } else if (this.patient) {
        this.filteredAppointments = this.appointments.filter((info) => info.userName.toLowerCase().includes(this.patient.toLowerCase()))
      } else {
        this.filteredAppointments = this.appointments
      }
    }
  }
}
</script>

<template>
  <main class="record-list-page">
    <div class="record-list-body">
      <form class="form" id="find-form">
        <div class="form-field">
          <div class="form-field-title">Поиск по врачу</div>
          <input type="text" name="doctor" placeholder="Врач" class="form-field-input" v-model="doctor">
        </div>
        <div class="form-field-last-row">
          <div class="form-field-title">Поиск по пациентам</div>
          <input type="text" name="patient" placeholder="Пациент" class="form-field-input" v-model="patient">
        </div>
      </form>
      <div class="find-button" @click="submit">Поиск</div>
      <Calendar :appointments="filteredAppointments" :get-info-by-date="getInfoByDate"></Calendar>
    </div>
  </main>
</template>

<style scoped>
@import "../assets/styles/admin/record-list.scss";
@import "../../src/main.scss";
</style>
