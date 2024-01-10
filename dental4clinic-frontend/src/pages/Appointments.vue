<script>
import {get, postWithoutResponse} from "@/pages/js/core/rest.js";
import {changeClassRows} from "@/pages/js/core/table.js";

export default {
  data() {
    return {
      appointmentForm: {
        name: '',
        date: '',
        datetime: '',
        description: '',
        phone: '',
        surname: '',
        doctorId: '',
        requestId: '',
        userId: '',
      },
      doctorValue: '',
      serviceValue: '',
      doctorsTableValue: [],
      selectedIndex: -1
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getDoctorsServices()
      },
      { immediate: true }
    )
  },
  computed: {
    filteredDoctorsTableValue: function () {
      if (this.doctorValue && this.serviceValue) {
        return this.doctorsTableValue.filter((info) => info.doctor.toLowerCase().includes(this.doctorValue.toLowerCase()) && info.services.toLowerCase().includes(this.serviceValue.toLowerCase()))
      } else if (this.doctorValue) {
        return this.doctorsTableValue.filter((info) => info.doctor.toLowerCase().includes(this.doctorValue.toLowerCase()))
      } else if (this.serviceValue) {
        return this.doctorsTableValue.filter((info) => info.services.toLowerCase().includes(this.serviceValue.toLowerCase()))
      } else {
        return this.doctorsTableValue
      }
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.appointmentForm)
      postWithoutResponse("appointments/create", this.appointmentForm).then(data => {
      }).catch((error) => {console.error('Error:', error);});
    },
    getDoctorsServices: function () {
      get("doctors/services").then(data => {
        this.doctorsTableValue = data
      }).catch((error) => {console.error('Error:', error);})
    },
    selectRow: function (index) {
      if (this.selectedIndex === index) {
        this.selectedIndex = -1
        this.appointmentForm.doctorId = ''
        for(let i = 0; i < 3; i++) {
          changeClassRows(this.$refs.tableRow[index].cells, "cell-recording-selected", "cell-recording")
        }
        return
      }
      this.appointmentForm.doctorId = this.filteredDoctorsTableValue[index][`doctor-id`]
      this.selectedIndex = index

      changeClassRows(this.$refs.tableRow[index].children, "cell-recording", "cell-recording-selected")
      for(let i = 0; i < 3; i++) {
        if (index !== i) {
          changeClassRows(this.$refs.tableRow[i].children, "cell-recording-selected", "cell-recording")
        }
      }
    }
  }
}
</script>

<template>
  <main class="appointments-create-page">
    <div class="appointments-create-body">
      <form class="form" id="appointment-form">
        <div class="form-field-last-column">
          <div class="form-field">
            <div class="form-field-title">Имя</div>
            <input type="text" name="name" id="name-field" placeholder="Имя" class="form-field-input" v-model="appointmentForm.name">
          </div>
          <div class="form-field">
            <div class="form-field-title">Жалоба</div>
            <input type="text" name="description" id="description-field" placeholder="Жалоба" class="form-field-input" v-model="appointmentForm.description">
          </div>
          <div class="form-field-last-column">
            <div class="form-field-title">Телефон</div>
            <input type="text" name="phone" id="phone-field" placeholder="+7 (___) ___-__-__" class="form-field-input" v-model="appointmentForm.phone">
          </div>
        </div>
        <div class="form-field-group">
          <div class="form-field">
            <div class="form-field-title">Фамилия</div>
            <input type="text" name="surname" id="surname-field" placeholder="Фамилия" class="form-field-input" v-model="appointmentForm.surname">
          </div>
          <div class="form-field">
            <div class="form-field-title">Дата</div>
            <input type="date" name="date" id="date-field" placeholder="Дата" class="form-field-input" v-model="appointmentForm.date">
          </div>
          <div class="form-field-last-column">
            <div class="form-field-title">Время</div>
            <input type="time" name="datetime" id="datetime-field" placeholder="Время" class="form-field-input" v-model="appointmentForm.datetime">
          </div>
        </div>
      </form>
      <div class="second-form">
        <div class="form-field">
          <div class="form-field-title">Поиск по врачу</div>
          <input type="text" name="doctor" id="doctor-field" placeholder="Врач" class="form-field-input" v-model="doctorValue">
        </div>
        <div class="form-field-last-row">
          <div class="form-field-title">Поиск по услуге</div>
          <input type="text" name="service" id="service-field" placeholder="Услуга" class="form-field-input" v-model="serviceValue">
        </div>
      </div>
      <table class="table">
        <tbody class="table">
        <tr class="row-header-recording">
          <th class="cell-header-recording">
            <div class="cell-header-content-recording">Врач</div>
          </th>
          <th class="cell-header-recording">
            <div class="cell-header-content-recording">Оказываемые услуги</div>
          </th>
        </tr>
        <tr class="row-recording" v-for="(n, index) in 3" :key="index" ref="tableRow" @click="selectRow(index)">
          <th class="cell-recording">
            <div class="cell-content-recording" v-text="filteredDoctorsTableValue[index] ? filteredDoctorsTableValue[index].doctor : ''"></div>
          </th>
          <th class="cell-recording">
            <div class="cell-content-recording" v-text="filteredDoctorsTableValue[index] ? filteredDoctorsTableValue[index].services : ''"></div>
          </th>
        </tr>
        </tbody>
      </table>
      <div class="record-button" id="record-button" @click="submit">Записаться</div>
    </div>

<!--    <dialog class="request-dialog-blackout" id="requestsDialog">
    <div class="request-dialog-content">
      <div class="request-dialog-title">
        <div class="request-dialog-title-text">Назначить запись</div>
        <div class="request-dialog-close-div" id="requestsDialogClose">
          <img class="request-dialog-close" src="../img/point-plus.png"/>
        </div>
      </div>
      <div class="request-dialog-body-content">
        <table class="table">
          <tbody class="table">
          <tr class="row-header-request">
            <th class="cell-header">
              <div class="cell-header-content">Имя</div>
            </th>
            <th class="cell-header">
              <div class="cell-header-content">Телефон</div>
            </th>
            <th class="cell-header">
              <div class="cell-header-content">Проблема</div>
            </th>
          </tr>
          <tr class="row-request">
            <th class="cell">
            </th>
            <th class="cell">
            </th>
            <th class="cell">
            </th>
          </tr>
          <tr class="row-request">
            <th class="cell">
            </th>
            <th class="cell">
            </th>
            <th class="cell">
            </th>
          </tr>
          <tr class="row-request">
            <th class="cell">
            </th>
            <th class="cell">
            </th>
            <th class="cell">
            </th>
          </tr>
          <tr class="row-request">
            <th class="cell">
            </th>
            <th class="cell">
            </th>
            <th class="cell">
            </th>
          </tr>
          <tr class="row-request">
            <th class="cell">
            </th>
            <th class="cell">
            </th>
            <th class="cell">
            </th>
          </tr>
          <tr class="row-request">
            <th class="cell">
            </th>
            <th class="cell">
            </th>
            <th class="cell">
            </th>
          </tr>
          </tbody>
        </table>
        <div class="select-request-button">Записать</div>
      </div>
    </div>
  </dialog>-->
  </main>
</template>

<style scoped>
@import "../assets/styles/unauthorized/appointments-create.scss";
@import "../assets/styles/main.scss";
</style>
