<script setup>
import Calendar from "@/components/Calendar.vue";
</script>

<script>

import {get, postWithoutResponse} from "@/pages/js/core/rest.js";
import {changeClassRows} from "@/pages/js/core/table.js";

export default {
  data() {
    return {
      appointments: [],
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
        address: ''
      },
      monthName: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
      infoCard: '',
      infoCardDescription: '',
      patientId: '',
      selectedIndex: -1,
      nextAppointmentId: ''
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
  computed: {
    fullName: function() {
      return `${this.user.surname}  ${this.user.name}  ${this.user.patronymic}`
    }
  },
  methods: {
    getAppointments: function () {
      get(`appointments/doctor/${ this.$route.params.userId }`).then((data) => {
        this.appointments = data

        const currentDate = new Date();
        const datesArray = [];
        this.appointments.forEach((appointment) => {
          const appointmentDate = new Date(appointment.date);
          const appointmentTime = appointment.datetime.split(":");
          appointmentDate.setHours(parseInt(appointmentTime[0]), parseInt(appointmentTime[1]),0,0)
          datesArray.push(appointmentDate);
        })
        const nextAppointmentDate = this.closestTo(currentDate, datesArray);
        const nextAppointment = this.appointments.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          const appointmentTime = appointment.datetime.split(":");
          appointmentDate.setHours(parseInt(appointmentTime[0]), parseInt(appointmentTime[1]),0,0)
          return appointmentDate.getTime() === nextAppointmentDate.getTime()
        })[0];
        this.patientId = nextAppointment.userId
        this.nextAppointmentId = nextAppointment.id
        this.infoCard = `Ближайший пациент на приеме ${nextAppointment.userName} ${nextAppointment.date} в ${nextAppointment.datetime}`
        this.infoCardDescription = `Жалобы пациента: ${nextAppointment.description}`

      }).catch((error) => {
        console.error(error)
      })
    },
    getUserInfo: function () {
      if (this.patientId) {
        get(`user/${this.patientId}`).then(data => {
          this.user = data;
          this.user.email = data.email;
        }).catch(error => {
          console.error(error)
        });
      } else {
        alert('Пользователь не зарегистрирован')
      }
    },
    getInfoByDate: function({date, appointments}, month, year) {
      this.infoCard = ''
      this.patientId = appointments[0].userId
      appointments.forEach((appointment) => {
        this.infoCard += `Пациент ${appointment.userName} дата приема ${appointment.date} в ${appointment.datetime}
`
      })
    },
    closestTo: function(dateToCompare, datesArray) {
      const buff = datesArray.filter(date => date >=dateToCompare).sort()
      return buff.length ? buff[0] : undefined
    },
    submit() {
      this.$emit('submit', this.requestForm)
      postWithoutResponse('request/create', this.requestForm)
        .then(() => alert("Заявка отправлена"))
        .catch((error) => alert("Заявка не отправлена"))
    },
    openInfoPatientDialog: function () {
      this.getUserInfo()
      this.$refs.infoPatientDialog.style.display = 'flex';
      this.$refs.infoPatientDialog.show();
    },
    closeInfoPatientDialog: function () {
      this.$refs.infoPatientDialog.style.display = null
      this.$refs.infoPatientDialog.close();
    },
    openPatientWithoutCalendarDialog: function () {
      this.$refs.patientWithoutCalendarDialog.style.display = 'flex';
      this.$refs.patientWithoutCalendarDialog.show();
    },
    closePatientWithoutCalendarDialog: function () {
      this.$refs.patientWithoutCalendarDialog.style.display = null
      this.$refs.patientWithoutCalendarDialog.close();
    },
    selectRow: function (index) {
      if (this.selectedIndex === index) {
        this.selectedIndex = -1
        for(let i = 0; i < 6; i++) {
          changeClassRows(this.$refs.tableRow[index].cells, "cell-selected", "cell")
        }
        return
      }
      this.selectedIndex = index

      changeClassRows(this.$refs.tableRow[index].children, "cell", "cell-selected")
      for(let i = 0; i < 6; i++) {
        if (index !== i) {
          changeClassRows(this.$refs.tableRow[i].children, "cell-selected", "cell")
        }
      }
    }
  },
}
</script>

<template>
  <main class="reception-page">
    <div class="reception-body">
      <Calendar :appointments="appointments" :get-info-by-date="getInfoByDate"></Calendar>
      <div class="accept-patient-without-calendar" id="openPatientWithoutCalendarDialog" @click="openPatientWithoutCalendarDialog">Принять пациента не по расписанию</div>
      <div class="card" v-show="infoCard">
        <div class="card-content-text" v-text="infoCard"></div>
        <div class="card-content-text" v-text="infoCardDescription"></div>
        <div class="card-accept-buttons">
          <div class="info-button" ref="openInfoPatientDialog" @click="openInfoPatientDialog">Посмотреть информацию о пациенте</div>
          <div class="start-button" id="startButton" @click="$router.push({ path: `/${this.$route.params.userId}/reception/${this.nextAppointmentId}` })">Начать прием</div>
        </div>
      </div>
    </div>
    <dialog class="patient-without-calendar-dialog-blackout" ref="patientWithoutCalendarDialog">
      <div class="patient-without-calendar-dialog-content">
        <div class="patient-without-calendar-dialog-title">
          <div class="patient-without-calendar-dialog-title-text">Приём пациента из списка</div>
          <div class="patient-without-calendar-dialog-close-div" id="patientWithoutCalendarDialogClose" @click="closePatientWithoutCalendarDialog">
            <img class="patient-without-calendar-dialog-close" src="../img/point-plus.png"/>
          </div>
        </div>
        <div class="patient-without-calendar-dialog-body-content">
          <table class="table">
            <tbody class="table">
            <tr class="row-header">
              <th class="cell-header">
                <div class="cell-header-content">Пациент</div>
              </th>
              <th class="cell-header">
                <div class="cell-header-content">Жалобы</div>
              </th>
              <th class="cell-header">
                <div class="cell-header-content">Дата приема</div>
              </th>
            </tr>

            <tr class="row" v-for="(n, index) in 6" :key="index" ref="tableRow" @click="selectRow(index)">
              <th class="cell">
                <div class="cell-content" v-text="appointments[index] ? appointments[index].userName : ''"></div>
              </th>
              <th class="cell">
                <div class="cell-content" v-text="appointments[index] ? appointments[index].description : ''"></div>
              </th>
              <th class="cell">
                <div class="cell-content" v-text="appointments[index] ? appointments[index].date + ' ' + appointments[index].datetime: ''"></div>
              </th>
            </tr>
            </tbody>
          </table>
          <div class="start-without-calendar-button" id="startWithoutCalendarButton" @click="$router.push({ path: `/${this.$route.params.userId}/reception/${appointments[this.selectedIndex].id}` })">Начать прием</div>
        </div>
      </div>
    </dialog>
    <dialog class="info-patient-dialog-blackout" ref="infoPatientDialog">
      <div class="info-patient-dialog-content">
        <div class="info-patient-dialog-title">
          <div class="info-patient-dialog-title-text">Информация о пациенте</div>
          <div class="info-patient-dialog-close-div" id="infoPatientDialogClose" @click="closeInfoPatientDialog">
            <img class="info-patient-dialog-close" src="../img/point-plus.png"/>
          </div>
        </div>
        <div class="info-patient-dialog-body-content">
          <div class="card-fields">
            <div class="card-field-group">
              <div class="user-card-field">ФИО Пациента</div>
              <div class="field-content" v-text="fullName"></div>
            </div>
            <div class="card-field-group">
              <div class="user-card-field">Дата рождения</div>
              <div class="field-content" v-text="user.dateOfBirthday"></div>
            </div>
            <div class="card-field-group">
              <div class="user-card-field">Телефон</div>
              <div class="field-content" v-text="user.phone"></div>
            </div>
            <div class="card-field-group">
              <div class="user-card-field">E-mail</div>
              <div class="field-content" v-text="user.email"></div>
            </div>
            <div class="card-field-group">
              <div class="user-card-field">Аллергии</div>
              <div class="field-content" v-text="user.allergies"></div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  </main>
</template>

<style scoped>
@import "../assets/styles/doctor/reception.scss";
@import "../../src/main.scss";
</style>
