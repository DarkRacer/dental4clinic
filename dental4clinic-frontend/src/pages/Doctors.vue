<script>

import {get, post} from "@/pages/js/core/rest.js";
import {useCookies} from "@vueuse/integrations/useCookies";
import { uuid } from 'vue-uuid';
import {changeClassRows} from "@/pages/js/core/table.js";
import {useJwt} from "@vueuse/integrations/useJwt";

export default {
  data() {
    return {
      selectedDocSpec: '',
      doctorsValue: [],
      emptyCurrentDoctor: {
        id: null,
        surname: '',
        patronymic: '',
        ['part-name']: '',
        name: '',
        description: 'Упс. Что-то пошло не так...',
        pluses: ''
      },
      currentDoctor: {
        id: null,
        surname: '',
        patronymic: '',
        name: '',
        ['part-name']: '',
        description: 'Упс. Что-то пошло не так...',
        pluses: ''
      },
      doctorForm: {
        id: null,
        name: '',
        surname: '',
        patronymic: '',
        description: '',
        specialization: '',
        photo: '',
        photoName: '',
        pluses: ''
      },
      doctorId: null,
      computedDisplay: 'none',
      selectedDoctorServiceIndex: -1,
      selectedServiceIndex: -1,
      doctorServiceTableValue: [],
      servicesTableValue: []
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
    },
    doctorFormFullName: function () {
      return `${this.doctorForm.surname} ${this.doctorForm.name} ${this.doctorForm.patronymic}`
    },
    currentDoctorFullName: function () {
      return `${this.currentDoctor.surname} ${this.currentDoctor['part-name']} ${this.currentDoctor.patronymic}`
    }
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
    },
    imageUploaded: function(id) {
      const file = document.querySelector(id)['files'][0];

      const reader = new FileReader();
      this.doctorForm.photoName = file.name;

      reader.onload = () => this.doctorForm.photo = reader.result;
      reader.readAsDataURL(file);
    },
    openCreateDoctorDialog: function () {
      this.doctorForm.id = uuid.v4()
      this.$refs.createDoctorDialog.style.display = 'flex'
      this.$refs.createDoctorDialog.show()
    },
    closeCreateDoctorDialog: function () {
      this.doctorForm.id = null
      this.$refs.createDoctorDialog.style.display = null
      this.$refs.createDoctorDialog.close()
    },
    createDoctor: function () {
      post('doctor/create', this.doctorForm).then((data) => {
        this.doctorsValue = data

        this.doctorForm.id = null
        this.doctorForm.name = ''
        this.doctorForm.surname = ''
        this.doctorForm.patronymic = ''
        this.doctorForm.specialization = ''
        this.doctorForm.description = ''
        this.doctorForm.photoName = ''
        this.doctorForm.photo = ''
        this.doctorForm.pluses = ''

        this.$refs.createDoctorDialog.style.display = null
        this.$refs.createDoctorDialog.close()
      }).catch((error) => {
        this.doctorForm.id = null
        this.doctorForm.name = ''
        this.doctorForm.surname = ''
        this.doctorForm.patronymic = ''
        this.doctorForm.specialization = ''
        this.doctorForm.description = ''
        this.doctorForm.photoName = ''
        this.doctorForm.photo = ''
        this.doctorForm.pluses = ''
        console.error(error)
      })
    },
    openEditDoctorDialog: function () {
      this.doctorForm = this.currentDoctor
      this.doctorForm.name = this.currentDoctor['part-name']
      this.$refs.editDoctorDialog.style.display = 'flex'
      this.$refs.doctorsDialog.style.display = null
      this.$refs.doctorsDialog.close()
      this.$refs.editDoctorDialog.show()
    },
    closeEditDoctorDialog: function () {
      this.$refs.editDoctorDialog.style.display = null
      this.$refs.editDoctorDialog.close()
      this.$refs.doctorsDialog.style.display = 'flex';
      this.$refs.doctorsDialog.show()
    },
    editDoctor: function () {
      post('doctor/edit', this.doctorForm).then((data) => {
        this.doctorsValue = data

        this.doctorForm.id = null
        this.doctorForm.name = ''
        this.doctorForm.surname = ''
        this.doctorForm.patronymic = ''
        this.doctorForm.specialization = ''
        this.doctorForm.description = ''
        this.doctorForm.photoName = ''
        this.doctorForm.photo = ''
        this.doctorForm.pluses = ''

        this.$refs.editDoctorDialog.style.display = null
        this.$refs.editDoctorDialog.close()
      }).catch((error) => {
        this.doctorForm.id = null
        this.doctorForm.name = ''
        this.doctorForm.surname = ''
        this.doctorForm.patronymic = ''
        this.doctorForm.specialization = ''
        this.doctorForm.description = ''
        this.doctorForm.photoName = ''
        this.doctorForm.photo = ''
        this.doctorForm.pluses = ''
        console.error(error)
      })
    },
    openDeleteDoctorDialog: function () {
      this.$refs.deleteDoctorDialog.style.display = 'flex'
      this.$refs.doctorsDialog.style.display = null
      this.$refs.doctorsDialog.close()
      this.$refs.deleteDoctorDialog.show()
    },
    closeDeleteDoctorDialog: function () {
      this.$refs.deleteDoctorDialog.style.display = null
      this.$refs.deleteDoctorDialog.close()
      this.$refs.doctorsDialog.style.display = 'flex';
      this.$refs.doctorsDialog.show()
    },
    cancelDeleteDoctor: function () {
      this.$refs.deleteDoctorDialog.style.display = null
      this.$refs.deleteDoctorDialog.close()
      this.$refs.doctorsDialog.style.display = 'flex';
      this.$refs.doctorsDialog.show()
    },
    deleteDoctor: function() {
      post('doctor/delete', this.currentDoctor).then((data) => {
        this.doctorsValue = data;
        this.closeDeleteDoctorDialog()
        this.closeDoctorCard()
      }).catch((error) => console.error(error))
    },
    openServicesDoctorDialog: function () {
      if (!this.doctorForm.id && this.currentDoctor.id) {
        this.doctorForm = this.currentDoctor
        this.doctorForm.name = this.currentDoctor['part-name']
      }
      this.servicesTableValue = []
      this.doctorServiceTableValue = []
      this.selectedDoctorServiceIndex = -1
      this.selectedServiceIndex = -1
      this.getServicesForDoctor()
      this.getServices()
      this.$refs.servicesDoctorDialog.style.display = 'flex';
      this.$refs.servicesDoctorDialog.show()
    },
    closeServicesDoctorDialog: function () {
      this.$refs.servicesDoctorDialog.style.display = null
      this.$refs.servicesDoctorDialog.close()
    },
    getServicesForDoctor: function () {
      get(`services/doctor/${this.doctorForm.id}`).then((data) => {
        this.doctorServiceTableValue = data;
      }).catch((error) => console.log(error))
    },
    getServices: function () {
      get("services/all").then((data) => {
        this.servicesTableValue = data;
      }).catch((error) => console.log(error))
    },
    selectDoctorServiceRow: function (index) {
      if (this.selectedDoctorServiceIndex === index) {
        this.selectedDoctorServiceIndex = -1
        for(let i = 0; i < 4; i++) {
          changeClassRows(this.$refs.tableDoctorServiceRow[index].cells, "cell-services-of-patient-selected", "cell-services-of-patient")
        }
        return
      }

      if (index < this.doctorServiceTableValue.length) {
        this.selectedDoctorServiceIndex = index
        changeClassRows(this.$refs.tableDoctorServiceRow[index].children, "cell-services-of-patient", "cell-services-of-patient-selected")
      }

      for(let i = 0; i < 4; i++) {
        if (index !== i) {
          changeClassRows(this.$refs.tableDoctorServiceRow[i].children, "cell-services-of-patient-selected", "cell-services-of-patient")
        }
      }
    },
    selectServiceRow: function (index) {
      if (this.selectedServiceIndex === index) {
        this.selectedServiceIndex = -1
        for(let i = 0; i < 4; i++) {
          changeClassRows(this.$refs.tableServiceRow[index].cells, "cell-services-of-patient-selected", "cell-services-of-patient")
        }
        return
      }

      if (index < this.servicesTableValue.length) {
        this.selectedServiceIndex = index
        changeClassRows(this.$refs.tableServiceRow[index].children, "cell-services-of-patient", "cell-services-of-patient-selected")
      }

      for(let i = 0; i < 4; i++) {
        if (index !== i) {
          changeClassRows(this.$refs.tableServiceRow[i].children, "cell-services-of-patient-selected", "cell-services-of-patient")
        }
      }
    },
    deleteService: function () {
      if (this.selectedDoctorServiceIndex > -1) {
        post(`services/doctor/delete/${this.doctorForm.id}`, this.doctorServiceTableValue[this.selectedDoctorServiceIndex]).then((data) => {
          this.doctorServiceTableValue = data;
          this.selectedDoctorServiceIndex = -1;

          for(let i = 0; i < 4; i++) {
            changeClassRows(this.$refs.tableDoctorServiceRow[i].children, "cell-services-of-patient-selected", "cell-services-of-patient")
          }
        }).catch((error) => {
          console.error(error)
        })
      }
    },
    addService: function () {
      if (this.selectedServiceIndex > -1) {
        post(`services/doctor/add/${this.doctorForm.id}`, this.servicesTableValue[this.selectedServiceIndex]).then((data) => {
          this.doctorServiceTableValue = data;
          this.selectedServiceIndex = -1;

          for(let i = 0; i < 4; i++) {
            changeClassRows(this.$refs.tableServiceRow[i].children, "cell-services-of-patient-selected", "cell-services-of-patient")
          }
        }).catch((error) => {
          console.error(error)
        })
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
        <div class="doctor-create" @click="openCreateDoctorDialog" v-if="user.role === 'DIRECTOR'">Добавить врача</div>
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

    <dialog class="create-doctor-dialog-blackout" ref="createDoctorDialog" >
      <div class="create-doctor-dialog-content">
        <div class="create-doctor-dialog-title">
          <div class="create-doctor-dialog-title-text">Добавить врача</div>
          <div class="create-doctor-dialog-close-div" @click="closeCreateDoctorDialog">
            <img class="create-doctor-dialog-close" src="../img/point-plus.png"/>
          </div>
        </div>
        <div class="create-doctor-dialog-body-content">
          <form class="form" id="create-form">
            <div class="required-fields">
              <div class="required-field">
                <div class="required-field-title">Имя</div>
                <input type="text" name="name" placeholder="Имя" class="required-field-input" v-model="doctorForm.name">
              </div>
              <div class="required-field">
                <div class="required-field-title">Фамилия</div>
                <input type="text" name="surname" placeholder="Фамилия" class="required-field-input" v-model="doctorForm.surname">
              </div>
              <div class="required-field">
                <div class="required-field-title">Отчество</div>
                <input type="text" name="patronymic" placeholder="Отчество" class="required-field-input" v-model="doctorForm.patronymic">
              </div>
            </div>
            <div class="required-fields">
              <div class="required-field">
                <div class="required-field-title">Специализация</div>
                <label class="label-for-selector">
                  <select class="dialog-selector" v-model='doctorForm.specialization'>
                    <option value="" class="selector-text" selected>Не выбрано</option>
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
                </label>
              </div>
              <div class="photo-field">
                <div class="photo-field-title">Фотография</div>
                <input type="file" name="photo" id="photoCreate" multiple accept="image/*,image/jpeg" class="photo-field-input" @change="imageUploaded('#photoCreate')">
              </div>
              <div class="required-field">
                <div class="services-doctor-button" @click="openServicesDoctorDialog">Выбрать оказываемые услуги</div>
              </div>
            </div>
            <div class="additional-fields">
              <div class="additional-field">
                <div class="additional-field-title">Описание</div>
                <textarea type="text" name="description" placeholder="Описание" class="additional-field-input" v-model="doctorForm.description"></textarea>
              </div>
              <div class="additional-field">
                <div class="additional-field-title">Профессиональные навыки</div>
                <textarea type="text" name="pluses" placeholder="Профессиональные навыки" class="additional-field-input" v-model="doctorForm.pluses"></textarea>
              </div>
            </div>
            <div class="save-button" @click="createDoctor">Создать</div>
          </form>
        </div>
      </div>
    </dialog>
    <dialog class="doctors-dialog-blackout" ref="doctorsDialog">
      <div class="doctors-dialog-content">
        <div class="doctors-dialog-title">
          <div class="doctors-dialog-title-text" id="doctors-dialog-title" v-text="currentDoctorFullName"></div>
          <div class="doctors-dialog-close-div" id="doctorsDialogClose" @click="closeDoctorCard()">
            <img class="doctors-dialog-close" src="../img/point-plus.png"/>
          </div>
        </div>
        <div class="doctors-dialog-body-content">
          <div class="doctors-dialog-content-description" id="doctors-dialog-description" v-text="currentDoctor.description"></div>
          <div class="pluses-group" id="doctors-dialog-pluses">
            <div class="pluses-group-title" v-if="currentDoctor.name !== ''">{{ currentDoctorFullName }} владеет следующими профессиональными навыками:</div>
            <div class="plus-price-group" v-if="currentDoctor.pluses !== ''" v-for="plus in currentDoctor.pluses.split('.')">
              <img class="doctors-dialog-content-plus" src="../img/point-plus.png"/>
              <div class="doctors-dialog-content-text">{{plus}}</div>
            </div>
          </div>
        </div>
        <div class="doctors-dialog-footer" v-if="user.role !== 'DIRECTOR'">
          <div class="doctors-dialog-footer-button" @click="$router.push({ path: '/appointments/create'})">Записаться</div>
        </div>
        <div class="doctors-dialog-footer-buttons" v-if="user.role === 'DIRECTOR'">
          <div class="doctors-dialog-footer-button" @click="openDeleteDoctorDialog">Удалить</div>
          <div class="doctors-dialog-footer-button" @click="openEditDoctorDialog">Редактировать</div>
          <div class="doctors-dialog-footer-button-service" @click="openServicesDoctorDialog">Изменить оказываемые услуги</div>
        </div>
      </div>
    </dialog>
    <dialog class="create-doctor-dialog-blackout" ref="editDoctorDialog" >
      <div class="create-doctor-dialog-content">
        <div class="create-doctor-dialog-title">
          <div class="create-doctor-dialog-title-text">Изменить информацию о враче</div>
          <div class="create-doctor-dialog-close-div" @click="closeEditDoctorDialog">
            <img class="create-doctor-dialog-close" src="../img/point-plus.png"/>
          </div>
        </div>
        <div class="create-doctor-dialog-body-content">
          <form class="form" id="edit-form">
            <div class="required-fields">
              <div class="required-field">
                <div class="required-field-title">Имя</div>
                <input type="text" name="name" placeholder="Имя" class="required-field-input" v-model="doctorForm.name">
              </div>
              <div class="required-field">
                <div class="required-field-title">Фамилия</div>
                <input type="text" name="surname" placeholder="Фамилия" class="required-field-input" v-model="doctorForm.surname">
              </div>
              <div class="required-field">
                <div class="required-field-title">Отчество</div>
                <input type="text" name="patronymic" placeholder="Отчество" class="required-field-input" v-model="doctorForm.patronymic">
              </div>
            </div>
            <div class="required-fields">
              <div class="required-field">
                <div class="required-field-title">Специализация</div>
                <label class="label-for-selector">
                  <select class="dialog-selector" v-model='doctorForm.specialization'>
                    <option value="" class="selector-text" selected>Не выбрано</option>
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
                </label>
              </div>
              <div class="photo-field">
                <div class="photo-field-title">Фотография</div>
                <input type="file" name="photo" id="photoEdit" multiple accept="image/*,image/jpeg" class="photo-field-input" @change="imageUploaded('#photoEdit')">
              </div>
              <div class="required-field">
                <div class="services-doctor-button" @click="openServicesDoctorDialog">Выбрать оказываемые услуги</div>
              </div>
            </div>
            <div class="additional-fields">
              <div class="additional-field">
                <div class="additional-field-title">Описание</div>
                <textarea type="text" name="description" placeholder="Описание" class="additional-field-input" v-model="doctorForm.description"></textarea>
              </div>
              <div class="additional-field">
                <div class="additional-field-title">Профессиональные навыки</div>
                <textarea type="text" id="plusesEdit" name="pluses" placeholder="Профессиональные навыки" class="additional-field-input" v-model="doctorForm.pluses"></textarea>
              </div>
            </div>
            <div class="save-button" @click="editDoctor">Изменить</div>
          </form>
        </div>
      </div>
    </dialog>
    <dialog class="delete-dialog-blackout" ref="deleteDoctorDialog">
      <div class="delete-dialog-content">
        <div class="delete-dialog-title">
          <div class="delete-dialog-title-text">Удаление врача</div>
        </div>
        <div class="delete-dialog-body-content">
          <div class="delete-dialog-content-description">Вы уверены что хотите удалить врача? Это действие отменить невозможно</div>
        </div>
        <div class="delete-dialog-footer">
          <div class="delete-dialog-footer-button" @click="deleteDoctor">Удалить</div>
          <div class="delete-dialog-footer-button" @click="cancelDeleteDoctor">Отмена</div>
        </div>
      </div>
    </dialog>
    <dialog class="services-dialog-blackout" ref="servicesDoctorDialog">
      <div class="services-dialog-content">
        <div class="services-dialog-title">
          <div class="services-dialog-title-text">Изменить оказываемые услуги врача</div>
          <div class="services-dialog-close-div" @click="closeServicesDoctorDialog">
            <img class="services-dialog-close" src="../img/point-plus.png"/>
          </div>
        </div>
        <div class="services-content">
          <div class="doctor-info-services">
            <div class="doctor-info-services-title">Врач</div>
            <div class="doctor-info-services-name" v-text="doctorFormFullName"></div>
          </div>
          <div class="list-of-services-patient">Список услуг врача</div>
          <table class="table">
            <tbody class="table">
            <tr class="row-header-services-of-patient">
              <th class="cell-header-services-of-patient">
                <div class="cell-header-content-services-of-patient">Услуга</div>
              </th>
              <th class="cell-header-services-of-patient">
                <div class="cell-header-content-services-of-patient">Описание</div>
              </th>
              <th class="cell-header-services-of-patient">
                <div class="cell-header-content-services-of-patient">Цена</div>
              </th>
            </tr>

            <tr class="row-services-of-patient" v-for="(n, index) in 4" :key="index" ref="tableDoctorServiceRow" @click="selectDoctorServiceRow(index)">
              <th class="cell-services-of-patient">
                <div class="cell-content-services-of-patient" v-text="doctorServiceTableValue[index] ? doctorServiceTableValue[index].service : ''"></div>
              </th>
              <th class="cell-services-of-patient">
                <div class="cell-content-services-of-patient" v-text="doctorServiceTableValue[index] ? doctorServiceTableValue[index].description : ''"></div>
              </th>
              <th class="cell-services-of-patient">
                <div class="cell-content-services-of-patient" v-text="doctorServiceTableValue[index] ? doctorServiceTableValue[index].price : ''"></div>
              </th>
            </tr>
            </tbody>
          </table>
          <div class="button-services" @click="deleteService">Удалить оказываемую услугу</div>
          <div class="list-of-services">Список услуг</div>
          <table class="table">
            <tbody class="table">
            <tr class="row-header-services-of-patient">
              <th class="cell-header-services-of-patient">
                <div class="cell-header-content-services-of-patient">Услуга</div>
              </th>
              <th class="cell-header-services-of-patient">
                <div class="cell-header-content-services-of-patient">Описание</div>
              </th>
              <th class="cell-header-services-of-patient">
                <div class="cell-header-content-services-of-patient">Цена</div>
              </th>
            </tr>
            <tr class="row-services-of-patient"  v-for="(n, index) in 4" :key="index" ref="tableServiceRow" @click="selectServiceRow(index)">
              <th class="cell-services-of-patient">
                <div class="cell-content-services-of-patient" v-text="servicesTableValue[index] ? servicesTableValue[index].service : ''"></div>
              </th>
              <th class="cell-services-of-patient">
                <div class="cell-content-services-of-patient" v-text="servicesTableValue[index] ? servicesTableValue[index].description : ''"></div>
              </th>
              <th class="cell-services-of-patient">
                <div class="cell-content-services-of-patient" v-text="servicesTableValue[index] ? servicesTableValue[index].price : ''"></div>
              </th>
            </tr>
            </tbody>
          </table>
          <div class="button-services" @click="addService">Добавить оказываемую услугу</div>
        </div>
      </div>
    </dialog>
  </main>
</template>

<style>
@import "../assets/styles/director/doctors.scss";
@import "../../src/main.scss";
</style>
