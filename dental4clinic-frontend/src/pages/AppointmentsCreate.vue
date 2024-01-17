<script>
import {get, postWithoutResponse} from "@/pages/js/core/rest.js";
import {changeClassRows} from "@/pages/js/core/table.js";
import {useCookies} from "@vueuse/integrations/useCookies";
import {useJwt} from "@vueuse/integrations/useJwt";

export default {
  setup() {
    const cookies = useCookies(['access_token'])

    return {
      cookies
    }
  },
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
        doctorName: '',
        requestId: '',
        userId: '',
      },
      doctorValue: '',
      serviceValue: '',
      doctorsTableValue: [],
      selectedIndex: -1,
      selectedRequestIndex: -1,
      request: {},
      requestsTableValue: []
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
    },
    user: function () {
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
    submit() {
      this.$emit('submit', this.appointmentForm)
      if (this.user.role === 'USER') {
        if (this.user.id) {
          this.appointmentForm.userId = this.user.id
        } else {
          const { header, payload } = useJwt(this.cookies.get('access_token'))
          this.appointmentForm.userId = payload.value.id
        }
      } else if (this.user.role === 'ADMIN' && this.request !== {}) {
        this.appointmentForm.requestId = this.request.id
        this.appointmentForm.name = this.request.name
        this.appointmentForm.description = this.request.description
        this.appointmentForm.phone = this.request.phone
      } else {
        if (!this.appointmentForm.name || !this.appointmentForm.surname || !this.appointmentForm.phone) {
          alert("Заполните информацию о себе")
          return
        }
      }
      if (!this.appointmentForm.date || !this.appointmentForm.datetime) {
        alert("Выберите дату и время")
        return
      }
      if (!this.appointmentForm.doctorId || !this.appointmentForm.doctorName) {
        alert("Выберите врача")
        return
      }
      postWithoutResponse("appointments/create", this.appointmentForm).then(data => {
        alert("Запись произошла успешна")
        this.appointmentForm = {
          name: '',
          date: '',
          datetime: '',
          description: '',
          phone: '',
          surname: '',
          doctorId: '',
          doctorName: '',
          requestId: '',
          userId: '',
        }
      }).catch((error) => {console.error('Error:', error);});
    },
    getDoctorsServices: function () {
      get("doctor/services").then(data => {
        this.doctorsTableValue = data
      }).catch((error) => {console.error('Error:', error);})
    },
    getRequests: function () {
      get("requests/active").then(data => {
        this.requestsTableValue = data
      })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    selectRow: function (index) {
      if (this.selectedIndex === index) {
        this.selectedIndex = -1
        this.appointmentForm.doctorId = ''
        for(let i = 0; i < 4; i++) {
          changeClassRows(this.$refs.tableRow[index].cells, "cell-recording-selected", "cell-recording")
        }
        return
      }
      this.appointmentForm.doctorId = this.filteredDoctorsTableValue[index][`doctor-id`]
      this.appointmentForm.doctorName = this.filteredDoctorsTableValue[index].doctor
      this.selectedIndex = index

      changeClassRows(this.$refs.tableRow[index].children, "cell-recording", "cell-recording-selected")
      for(let i = 0; i < 4; i++) {
        if (index !== i) {
          changeClassRows(this.$refs.tableRow[i].children, "cell-recording-selected", "cell-recording")
        }
      }
    },
    selectRequestRow: function (index) {
      if (this.selectedRequestIndex === index) {
        this.selectedRequestIndex = -1
        this.request = {}
        for(let i = 0; i < 6; i++) {
          changeClassRows(this.$refs.tableRequestRow[index].cells, "cell-selected", "cell")
        }
        return
      }

      if (index < this.requestsTableValue.length) {
        this.request = this.requestsTableValue[index]
        this.selectedRequestIndex = index
        changeClassRows(this.$refs.tableRequestRow[index].children, "cell", "cell-selected")
      }
      for(let i = 0; i < 6; i++) {
        if (index !== i) {
          changeClassRows(this.$refs.tableRequestRow[i].children, "cell-selected", "cell")
        }
      }
    },
    openRequestsDialog: function () {
      this.getRequests()
      this.$refs.requestsDialog.style.display = 'flex';
      this.$refs.requestsDialog.show()
    },
    closeRequestsDialog: function (isAppointment) {
      if (!isAppointment) {
        this.request = {}
      }
      this.$refs.requestsDialog.style.display = null;
      this.$refs.requestsDialog.close()
    }
  }
}
</script>

<template>
  <main class="appointments-create-page">
    <div class="appointments-create-body">
      <form class="form" id="appointment-form-unauthorized" v-if="!user.role">
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
      <form class="form"  id="appointment-form-user" v-if="user.role === 'USER'">
        <div class="form-field-last-column">
          <div class="form-field-title">Жалоба</div>
          <textarea type="text" name="description" id="description-field" placeholder="О проблеме" class="form-field-input-textarea" v-model="appointmentForm.description"></textarea>
        </div>
        <div class="form-field-group">
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
      <form class="form" id="appointment-form" v-if="user.role === 'ADMIN'">
        <div class="form-field-last-column">
          <div class="form-field">
            <div class="select-button" @click="openRequestsDialog">Выбрать заявку</div>
          </div>
          <div class="form-field-last-column">
            <div class="form-field-title">Пациент</div>
            <input type="text" name="patient" id="patient-field" placeholder="Пациент" class="form-field-input" v-model="request.name">
          </div>
        </div>
        <div class="form-field-group">
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
        <tr class="row-recording" v-for="(n, index) in 4" :key="index" ref="tableRow" @click="selectRow(index)">
          <th class="cell-recording">
            <div class="cell-content-recording" v-text="filteredDoctorsTableValue[index] ? filteredDoctorsTableValue[index].doctor : ''"></div>
          </th>
          <th class="cell-recording">
            <div class="cell-content-recording" v-text="filteredDoctorsTableValue[index] ? filteredDoctorsTableValue[index].services : ''"></div>
          </th>
        </tr>
        </tbody>
      </table>
      <div class="record-button" id="record-button" @click="submit" v-if="user.role !== 'ADMIN'">Записаться</div>
      <div class="record-button" id="record-button" @click="submit" v-if="user.role === 'ADMIN'">Записать</div>
    </div>

    <dialog class="request-dialog-blackout" ref="requestsDialog">
      <div class="request-dialog-content">
        <div class="request-dialog-title">
          <div class="request-dialog-title-text">Назначить запись</div>
          <div class="request-dialog-close-div" id="requestsDialogClose" @click="closeRequestsDialog(false)">
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

            <tr class="row-request" id="first-row-request" v-for="(n, index) in 6" :key="index" ref="tableRequestRow" @click="selectRequestRow(index)">
              <th class="cell" id="first-row-request-cell-1">
                <div class="cell-content" v-text="requestsTableValue[index] ? requestsTableValue[index].name : ''"></div>
              </th>
              <th class="cell" id="first-row-request-cell-2">
                <div class="cell-content" v-text="requestsTableValue[index] ? requestsTableValue[index].phone : ''"></div>
              </th>
              <th class="cell" id="first-row-request-cell-3">
                <div class="cell-content" v-text="requestsTableValue[index] ? requestsTableValue[index].description : ''"></div>
              </th>
            </tr>
            </tbody>
          </table>
          <div class="select-request-button" @click="closeRequestsDialog(true)">Записать</div>
        </div>
      </div>
    </dialog>
  </main>
</template>

<style scoped>
@import "../assets/styles/unauthorized/appointments-create.scss";
@import "../assets/styles/admin/appointments-create.scss";
@import "../../src/main.scss";
</style>
