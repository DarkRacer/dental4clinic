<script>
import {get, post, postWithoutResponse} from "@/pages/js/core/rest.js";
import {changeClassRows} from "@/pages/js/core/table.js";

export default {
  data() {
    return {
      dataAppointment: {},
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
      requests: [],
      services: [],
      toothCard: {
        left8Up: '-',
        left8Down: '-',
        right1Up: '-',
        right1Down: '-',
        left7Up: '-',
        left7Down: '-',
        right2Up: '-',
        right2Down: '-',
        left6Up: '-',
        left6Down: '-',
        right3Up: '-',
        right3Down: '-',
        left5Up: '-',
        left5Down: '-',
        right4Up: '-',
        right4Down: '-',
        left4Up: '-',
        left4Down: '-',
        right5Up: '-',
        right5Down: '-',
        left3Up: '-',
        left3Down: '-',
        right6Up: '-',
        right6Down: '-',
        left2Up: '-',
        left2Down: '-',
        right7Up: '-',
        right7Down: '-',
        left1Up: '-',
        left1Down: '-',
        right8Up: '-',
        right8Down: '-',
      },
      diagnosisTableValue: [],
      diagnosisFromDoctorTableValue: [],
      toothPictures: [],
      selectedRowDiagnosisOfPatient: -1,
      selectedRowDiagnosisFromDoctor: -1,
      selectedPayments: []
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getAppointment()
      },
      { immediate: true }
    )
  },
  computed: {
    fullName: function() {
      return `${this.user.surname}  ${this.user.name}  ${this.user.patronymic}`
    },
    paymentInfo: function () {
      let summary = 0
      let servicesDone = "Оказанные услуги: "
      let cost = "Стоимость: "
      this.selectedPayments.forEach((selected) => {
        if (this.services[selected]) {
          servicesDone += " " + this.services[selected].service + ", "
          summary += this.services[selected].price
        }
      })
      cost += " " + summary + " Р."
      return {
        servicesDone: servicesDone,
        cost: cost
      }
    }
  },
  methods: {
    getAppointment: function () {
      get(`appointments/${this.$route.params.appointmentId}`).then((data) => {
        this.dataAppointment = data;
        this.getUserInfo()
        this.getRequests()
        this.getUserToothCard()
      }).catch((error) => {
        console.error(error)
      })
    },
    getUserInfo: function () {
      get(`user/${ this.dataAppointment['user-id'] }`).then(data => {
        this.user = data;
        this.user.email = data['e-mail'];
      }).catch(error => {
        console.error(error)
      });
    },
    getRequests: function () {
      get(`user/requests/${ this.dataAppointment['user-id'] }`).then(data => {
        this.requests = data
      }).catch(error => console.error(error));
    },
    getServices: function () {
      get(`doctors/${ this.$route.params.userId }/services`).then(data => {
        this.services = data;
      }).catch(error => console.error(error));
    },
    getUserToothCard: function () {
      get(`user/tooth-card/${ this.dataAppointment['user-id'] }`).then((data) => {
        this.toothCard = data;
      }).catch(error => console.error(error));
    },
    getToothPictures: function () {
      get(`user/tooth/${ this.dataAppointment['user-id'] }`).then(data => {
        this.toothPictures = data
      }).catch(error => console.error(error));
    },
    getUserDiagnosis: function () {
      get(`user/diagnosis/${ this.dataAppointment['user-id'] }`).then(data => {
        this.diagnosisTableValue = data
      }).catch(error => console.error(error));
    },
    getDiagnosis: function () {
      get(`diagnosis`).then(data => {
        this.diagnosisFromDoctorTableValue = data
      }).catch(error => console.error(error));
    },
    openToothPictures: function () {
      this.$refs.toothPicture.style.display = 'flex'
      this.getToothPictures()
      this.$refs.toothPicture.show()
    },
    closeToothPictures: function () {
      this.$refs.toothPicture.style.display = null
      this.$refs.toothPicture.close()
    },
    actualDiagnosisMapper: function(isActual) {
      return isActual ? "Не вылечено" : "Вылечено"
    },
    openDiagnosisDialog: function () {
      this.$refs.diagnosisDialog.style.display = 'flex'
      this.getUserDiagnosis()
      this.getDiagnosis()
      this.$refs.diagnosisDialog.show()
    },
    closeDiagnosisDialog: function () {
      this.$refs.diagnosisDialog.style.display = null
      this.$refs.diagnosisDialog.close()
    },
    selectRowDiagnoseOfPatient: function (index) {
      if (this.selectedRowDiagnosisOfPatient === index) {
        this.selectedRowDiagnosisOfPatient = -1
        for(let i = 0; i < 3; i++) {
          changeClassRows(this.$refs.tableRowDiagnosisOfPatient[index].cells, "cell-diagnosis-of-patient-selected", "cell-diagnosis-of-patient")
        }
        return
      }
      this.selectedRowDiagnosisOfPatient = index

      changeClassRows(this.$refs.tableRowDiagnosisOfPatient[index].children, "cell-diagnosis-of-patient", "cell-diagnosis-of-patient-selected")
      for(let i = 0; i < 3; i++) {
        if (index !== i) {
          changeClassRows(this.$refs.tableRowDiagnosisOfPatient[i].children, "cell-diagnosis-of-patient-selected", "cell-diagnosis-of-patient")
        }
      }
    },
    selectRowDiagnoseFromDoctor: function (index) {
      if (this.selectedRowDiagnosisFromDoctor === index) {
        this.selectedRowDiagnosisFromDoctor = -1
        for(let i = 0; i < 3; i++) {
          changeClassRows(this.$refs.tableRowDiagnosisFromDoctor[index].cells, "cell-diagnosis-from-doctor-selected", "cell-diagnosis-from-doctor")
        }
        return
      }
      this.selectedRowDiagnosisFromDoctor = index

      changeClassRows(this.$refs.tableRowDiagnosisFromDoctor[index].children, "cell-diagnosis-from-doctor", "cell-diagnosis-from-doctor-selected")
      for(let i = 0; i < 3; i++) {
        if (index !== i) {
          changeClassRows(this.$refs.tableRowDiagnosisFromDoctor[i].children, "cell-diagnosis-from-doctor-selected", "cell-diagnosis-from-doctor")
        }
      }
    },
    curred: function () {
      const diagnoseOfPatient = this.diagnosisTableValue[this.selectedRowDiagnosisOfPatient]
      diagnoseOfPatient.isActual = false

      const updateBody = {
        userId: this.dataAppointment['user-id'],
        diagnose: diagnoseOfPatient
      }

      post('user/diagnosis/update', updateBody)
        .then((data) => {
          this.diagnosisTableValue = data
          for(let i = 0; i < 3; i++) {
            changeClassRows(this.$refs.tableRowDiagnosisOfPatient[i].children, "cell-diagnosis-of-patient-selected", "cell-diagnosis-of-patient")
          }
          this.selectedRowDiagnosisOfPatient = -1
        })
        .catch((error) =>  alert("Статус диагноза не изменен"));
    },
    addDiagnose: function () {
      const newDiagnose = this.diagnosisFromDoctorTableValue[this.selectedRowDiagnosisFromDoctor]

      const createBody = {
        userId: this.dataAppointment['user-id'],
        diagnose: newDiagnose
      }

      post('user/diagnosis/create', createBody)
        .then((data) => {
          this.diagnosisTableValue = data
          for(let i = 0; i < 3; i++) {
            changeClassRows(this.$refs.tableRowDiagnosisFromDoctor[i].children, "cell-diagnosis-from-doctor-selected", "cell-diagnosis-from-doctor")
          }
          this.selectedRowDiagnosisFromDoctor = -1
        })
        .catch((error) =>  alert("Диагноз не добавлен"));
    },
    openPaymentsDialog: function () {
      this.$refs.paymentsDialog.style.display = 'flex'
      this.getServices()
      this.$refs.paymentsDialog.show()
    },
    closePaymentsDialog: function () {
      this.$refs.paymentsDialog.style.display = null
      this.$refs.paymentsDialog.close()
    },
    payment: function () {
      if (this.selectedPayments.length > 0) {
        const resultServices = []
        this.selectedPayments.forEach((selected) => {
          resultServices.push(this.services[selected]);
        });

        const paymentBody = {
          userId: this.dataAppointment['user-id'],
          services: resultServices
        }
        postWithoutResponse(`appointments/${this.dataAppointment.id}/finish`, paymentBody).then((data) => {
          postWithoutResponse(`user/tooth-card/${this.dataAppointment['user-id']}/update`, this.toothCard).then((data) => {
            location.assign('/doctor/reception');
            this.$router.push({ path: `/${ this.$route.params.userId }/reception` })
          }).catch((error) => console.log(error))
        }).catch((error) => console.log(error))
      }
    }
  }
}
</script>

<template>
  <main class="reception-patient">
    <div class="reception-patient-group">
      <div class="user-card-info">
        <div class="card-content">
          <p class="card-request-title">Информация</p>
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
        <div class="card-request">
          <div class="card-request-title">Жалобы</div>
          <table class="table">
            <tbody class="table">
            <tr class="row-header-request">
              <th class="cell-header-request-first">
                <div class="cell-header-content-request">Дата жалобы</div>
              </th>
              <th class="cell-header-request-second">
                <div class="cell-header-content-request">Жалоба</div>
              </th>
            </tr>

            <tr class="row-request" v-for="(n, index) in 3" :key="index">
              <th class="cell-request-first">
                <div class="cell-content" v-text="requests[index] ? requests[index].date : ''"></div>
              </th>
              <th class="cell-request-second">
                <div class="cell-content" v-text="requests[index] ? requests[index].description : ''"></div>
              </th>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-tooth">
        <p class="card-request-title">Информация о зубах</p>
        <div class="row-group-tooth">
          <div class="column-group-tooth">
            <select class="selector-tooth" v-model="toothCard.left8Up">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <div class="card-tooth-row-text-number">8</div>
            <select class="selector-tooth" v-model="toothCard.left8Down">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <select class="selector-tooth" v-model="toothCard.right1Up">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <div class="card-tooth-row-text-number">1</div>
            <select class="selector-tooth" v-model="toothCard.right1Down">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
          </div>
          <div class="column-group-tooth">
            <select class="selector-tooth" v-model="toothCard.left7Up">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <div class="card-tooth-row-text-number">7</div>
            <select class="selector-tooth" v-model="toothCard.left7Down">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <select class="selector-tooth" v-model="toothCard.right2Up">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <div class="card-tooth-row-text-number">2</div>
            <select class="selector-tooth" v-model="toothCard.right2Down">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
          </div>
          <div class="column-group-tooth">
            <select class="selector-tooth" v-model="toothCard.left6Up">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <div class="card-tooth-row-text-number">6</div>
            <select class="selector-tooth" v-model="toothCard.left6Down">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <select class="selector-tooth" v-model="toothCard.right3Up">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <div class="card-tooth-row-text-number">3</div>
            <select class="selector-tooth" v-model="toothCard.right3Down">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
          </div>
          <div class="column-group-tooth">
            <select class="selector-tooth" v-model="toothCard.left5Up">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <div class="card-tooth-row-text-number">5</div>
            <select class="selector-tooth" v-model="toothCard.left5Down">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <select class="selector-tooth" v-model="toothCard.right4Up">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <div class="card-tooth-row-text-number">4</div>
            <select class="selector-tooth" v-model="toothCard.right4Down">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
          </div>
          <div class="column-group-tooth">
            <select class="selector-tooth" v-model="toothCard.left4Up">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <div class="card-tooth-row-text-number">4</div>
            <select class="selector-tooth" v-model="toothCard.left4Down">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <select class="selector-tooth" v-model="toothCard.right5Up">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <div class="card-tooth-row-text-number">5</div>
            <select class="selector-tooth" v-model="toothCard.right5Down">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
          </div>
          <div class="column-group-tooth">
            <select class="selector-tooth" v-model="toothCard.left3Up">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <div class="card-tooth-row-text-number">3</div>
            <select class="selector-tooth" v-model="toothCard.left3Down">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <select class="selector-tooth" v-model="toothCard.right6Up">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <div class="card-tooth-row-text-number">6</div>
            <select class="selector-tooth" v-model="toothCard.right6Down">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
          </div>
          <div class="column-group-tooth">
            <select class="selector-tooth" v-model="toothCard.left2Up">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <div class="card-tooth-row-text-number">2</div>
            <select class="selector-tooth" v-model="toothCard.left2Down">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <select class="selector-tooth" v-model="toothCard.right7Up">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <div class="card-tooth-row-text-number">7</div>
            <select class="selector-tooth" v-model="toothCard.right7Down">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
          </div>
          <div class="column-group-tooth-last">
            <select class="selector-tooth" v-model="toothCard.left1Up">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <div class="card-tooth-row-text-number">1</div>
            <select class="selector-tooth" v-model="toothCard.left1Down">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <select class="selector-tooth" v-model="toothCard.right8Up">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
            <div class="card-tooth-row-text-number">8</div>
            <select class="selector-tooth" v-model="toothCard.right8Down">
              <option value=0 class="selector-tooth-text" >-</option>
              <option value=1 class="selector-tooth-text">I</option>
              <option value=2 class="selector-tooth-text">II</option>
              <option value=3 class="selector-tooth-text">III</option>
              <option value=4 class="selector-tooth-text">A</option>
              <option value=5 class="selector-tooth-text">O</option>
              <option value=6 class="selector-tooth-text">P</option>
              <option value=7 class="selector-tooth-text">C</option>
              <option value=8 class="selector-tooth-text">Pt</option>
              <option value=9 class="selector-tooth-text">R</option>
            </select>
          </div>
        </div>
      </div>
      <div class="buttons">
        <div class="button" @click="openToothPictures">Посмотреть снимки</div>
        <div class="button" @click="openDiagnosisDialog">Диагнозы</div>
        <div class="button" @click="openPaymentsDialog">Выставить счёт</div>
      </div>
    </div>
    <dialog class="tooth-pictures-dialog-blackout" ref="toothPicture">
      <div class="tooth-pictures-dialog-content">
        <div class="tooth-pictures-dialog-title">
          <div class="tooth-pictures-dialog-title-text">Снимки пациента</div>
          <div class="tooth-pictures-dialog-close-div" id="toothPictureClose" @click="closeToothPictures">
            <img class="tooth-pictures-dialog-close" src="../img/point-plus.png"/>
          </div>
        </div>
        <div class="tooth-pictures" id="toothPictures">
          <img class="tooth-picture" v-for="picture in toothPictures" v-bind:src="picture.data" />
        </div>
      </div>
    </dialog>
    <dialog class="diagnosis-dialog-blackout" ref="diagnosisDialog">
      <div class="diagnosis-dialog-content">
        <div class="diagnosis-dialog-title">
          <div class="diagnosis-dialog-title-text">Диагнозы пациента</div>
          <div class="diagnosis-dialog-close-div" @click="closeDiagnosisDialog">
            <img class="diagnosis-dialog-close" src="../img/point-plus.png"/>
          </div>
        </div>
        <div class="diagnosis-content">
          <div class="list-of-diagnosis-patient">Список диагнозов пациента</div>
          <table class="table">
            <tbody class="table">
            <tr class="row-header-diagnosis-of-patient">
              <th class="cell-header-diagnosis-of-patient">
                <div class="cell-header-content-diagnosis-of-patient">Диагноз</div>
              </th>
              <th class="cell-header-diagnosis-of-patient">
                <div class="cell-header-content-diagnosis-of-patient">Описание</div>
              </th>
              <th class="cell-header-diagnosis-of-patient">
                <div class="cell-header-content-diagnosis-of-patient">Действительность</div>
              </th>
            </tr>
            <tr class="row" v-for="(n, index) in 3" :key="index+'-diagnosis-of-patient'" ref="tableRowDiagnosisOfPatient" @click="selectRowDiagnoseOfPatient(index)">
              <th class="cell-diagnosis-of-patient">
                <div class="cell-content-diagnosis-of-patient" v-text="diagnosisTableValue[index] ? diagnosisTableValue[index].name : ''"></div>
              </th>
              <th class="cell-diagnosis-of-patient">
                <div class="cell-content-diagnosis-of-patient" v-text="diagnosisTableValue[index] ? diagnosisTableValue[index].description : ''"></div>
              </th>
              <th class="cell-diagnosis-of-patient">
                <div class="cell-content-diagnosis-of-patient" v-text="diagnosisTableValue[index] ? actualDiagnosisMapper(diagnosisTableValue[index].isActual) : ''"></div>
              </th>
            </tr>
            </tbody>
          </table>
          <div class="button-diagnosis" @click="curred">Вылечен</div>
          <div class="list-of-diagnosis">Список диагнозов</div>
          <table class="table">
            <tbody class="table">
            <tr class="row-header-diagnosis-from-doctor">
              <th class="cell-header-diagnosis-from-doctor">
                <div class="cell-header-content-diagnosis-from-doctor">Диагноз</div>
              </th>
              <th class="cell-header-diagnosis-from-doctor">
                <div class="cell-header-content-diagnosis-from-doctor">Описание</div>
              </th>
            </tr>
            <tr class="row" v-for="(n, index) in 3" :key="index+'-diagnosis-from-doctor'" ref="tableRowDiagnosisFromDoctor" @click="selectRowDiagnoseFromDoctor(index)">
              <th class="cell-diagnosis-from-doctor">
                <div class="cell-content-diagnosis-from-doctor" v-text="diagnosisFromDoctorTableValue[index] ? diagnosisFromDoctorTableValue[index].name : ''"></div>
              </th>
              <th class="cell-diagnosis-from-doctor">
                <div class="cell-content-diagnosis-from-doctor" v-text="diagnosisFromDoctorTableValue[index] ? diagnosisFromDoctorTableValue[index].description : ''"></div>
              </th>
            </tr>
            </tbody>
          </table>
          <div class="button-diagnosis" @click="addDiagnose">Добавить диагноз</div>
        </div>
      </div>
    </dialog>
    <dialog class="payments-dialog-blackout" ref="paymentsDialog">
      <div class="payments-dialog-content">
        <div class="payments-dialog-title">
          <div class="payments-dialog-title-text">Выставление счета</div>
          <div class="payments-dialog-close-div" id="paymentsDialogClose" @click="closePaymentsDialog">
            <img class="payments-dialog-close" src="../img/point-plus.png"/>
          </div>
        </div>
        <form class="payments-dialog-body" id="paymentsForm">
          <div class="doctor-services">Ваши услуги</div>
          <table class="table">
            <tbody class="table">
            <tr class="row-header-payment">
              <th class="cell-header-payment-fist">
              </th>
              <th class="cell-header-payment">
                <div class="cell-header-content-payment">Услуга</div>
              </th>
              <th class="cell-header-payment">
                <div class="cell-header-content-payment">Описание</div>
              </th>
              <th class="cell-header-payment">
                <div class="cell-header-content-payment">Цена</div>
              </th>
            </tr>

            <tr class="row-payment" v-for="(n, index) in 4" :key="index">
              <th class="cell-payment-fist">
                <div class="cell-content-payment">
                  <input type="checkbox" class="checkbox-services" :id="index" :value="index" v-model="selectedPayments" v-if="services[index]">
                </div>
              </th>
              <th class="cell-payment">
                <div class="cell-content-payment" v-text="services[index] ? services[index].service : ''"></div>
              </th>
              <th class="cell-payment">
                <div class="cell-content-payment" v-text="services[index] ? services[index].description : ''"></div>
              </th>
              <th class="cell-payment">
                <div class="cell-content-payment" v-text="services[index] ? services[index].price : ''"></div>
              </th>
            </tr>
            </tbody>
          </table>
          <div class="services" v-text="paymentInfo.servicesDone"></div>
          <div class="cost" v-text="paymentInfo.cost"></div>
          <div class="payment" @click="payment">Выставить счет</div>
        </form>
      </div>
    </dialog>
  </main>
</template>

<style scoped>
@import "../assets/styles/doctor/reception-patient.scss";
@import "../../src/main.scss";
</style>
