<script>

import {get} from "@/pages/js/core/rest.js";

export default {
  data() {
    return {
      selectedDocSpec: '',
      doctorsValue: [],
      emptyCurrentDoctor: {
        name: '',
        description: 'Упс. Что-то пошло не так...',
        pluses: ''
      },
      currentDoctor: {
        name: '',
        description: 'Упс. Что-то пошло не так...',
        pluses: ''
      },
      doctorId: null
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getDoctors()
      },
      { immediate: true }
    )
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    filteredDoctorsValue: function () {
      return this.doctorsValue.filter((doctorInfo) =>
        doctorInfo.specialization.includes(this.selectedDocSpec) || this.selectedDocSpec === '')
    },
  },
  methods: {
    topFunction: function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    getDoctors: function () {
      get("doctors").then((data) => {
        this.doctorsValue = data;
      }).catch((error) => console.log(error))
    },
    openDoctorCard: function () {
      get(`doctor/${this.doctorId}`).then(data => {
        this.currentDoctor = data;
        this.$refs.doctorsDialog.style.display = 'flex';
        this.$refs.doctorsDialog.show()
      }).catch(() => {
        this.currentDoctor = this.emptyCurrentDoctor
        this.$refs.doctorsDialog.style.display = 'flex';
        this.$refs.doctorsDialog.show()
      })
    },
    closeDoctorCard: function () {
      this.$refs.doctorsDialog.style.display = null;
      this.$refs.doctorsDialog.close()
      this.doctorId = null
      this.currentDoctor = this.emptyCurrentDoctor
    },
    handleScroll: function () {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        this.computedDisplay = "block";
      } else {
        this.computedDisplay = "none";
      }
    }
  }
}
</script>

<template>
  <main class="doctors-page">
    <div class="doctors-body" id="doctors-body">
      <div class="doctors-body-header">
        <select class="selector" v-model='selectedDocSpec'>
          <option value="" class="selector-text" selected>Все...</option>
          <option value="Детский стоматолог" class="selector-text">Детский стоматолог</option>
          <option value="Специалист по гигиене зубов" class="selector-text">Специалист по гигиене зубов</option>
          <option value="Стоматолог-ортодонт" class="selector-text">Стоматолог-ортодонт</option>
          <option value="Стоматолог-ортопед" class="selector-text">Стоматолог-ортопед</option>
          <option value="Стоматолог-пародонтолог" class="selector-text">Стоматолог-пародонтолог</option>
          <option value="Стоматолог-терапевт" class="selector-text">Стоматолог-терапевт</option>
          <option value="Стоматолог-хирург" class="selector-text">Стоматолог-хирург</option>
          <option value="Хирург-имплантолог" class="selector-text">Хирург-имплантолог</option>
          <option value="Хирург-пародонтолог" class="selector-text">Хирург-пародонтолог</option>
          <option value="Челюстно-лицевой хирург" class="selector-text">Челюстно-лицевой хирург</option>
          <option value="Эндодонтист" class="selector-text">Эндодонтист</option>
        </select>
      </div>
      <img class="go-to-top" @click="topFunction()" src="../img/arrow.png" v-bind:style="{ display: computedDisplay }"/>

      <div class="doctors-content">
        <div class="doctor-card" v-for="doctor in filteredDoctorsValue" @click="this.doctorId = doctor.id; openDoctorCard()" >
          <div class="doctor-avatar">
            <img class="doctor-image" v-bind:src=doctor.photo>
          </div>
          <div class="doctor-name" v-text="doctor.name"></div>
          <div class="doctor-spec" v-text="doctor.specialization"></div>
        </div>
      </div>
    </div>

    <dialog class="doctors-dialog-blackout" id="doctorsDialog" ref="doctorsDialog">
      <div class="doctors-dialog-content">
        <div class="doctors-dialog-title">
          <div class="doctors-dialog-title-text" id="doctors-dialog-title" v-text="currentDoctor.name"></div>
          <div class="doctors-dialog-close-div" id="doctorsDialogClose" @click="closeDoctorCard()">
            <img class="doctors-dialog-close" src="../img/point-plus.png"/>
          </div>
        </div>
        <div class="doctors-dialog-body-content">
          <div class="doctors-dialog-content-description" id="doctors-dialog-description" v-text="currentDoctor.description"></div>
          <div class="pluses-group" id="doctors-dialog-pluses">
            <div class="pluses-group-title" v-if="currentDoctor.name !== ''">{{ currentDoctor.name }} владеет следующими профессиональными навыками:</div>
            <div class="plus-price-group" v-if="currentDoctor.pluses !== ''" v-for="plus in currentDoctor.pluses.split('.')">
              <img class="doctors-dialog-content-plus" src="../img/point-plus.png"/>
              <div class="doctors-dialog-content-text">{{plus}}</div>
            </div>
          </div>
        </div>
        <div class="doctors-dialog-footer">
          <div class="doctors-dialog-footer-button" onclick="location.assign('/appointments/create');">Записаться</div>
        </div>
      </div>
    </dialog>
  </main>
</template>

<style>
@import "../assets/styles/core/doctors.scss";
</style>
