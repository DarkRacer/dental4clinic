import * as pageElements from "../elements/appointments-create.js";
import { get } from "../rest.js";

let doctorValue = "";
let serviceValue = "";
let doctorsTableValue = [];
let filteredDoctorsTableValue = [];

const initAppointmentsCreate = () => {
  get("doctors/services").then(data => {
    doctorsTableValue = data
    filteredDoctorsTableValue = doctorsTableValue
    updateDoctorTable()
  })
    .catch((error) => {
      console.error('Error:', error);
    });

  pageElements.doctorField.addEventListener("input", (e) => {
    doctorValue = e.target.value
    findDoctors()
  })

  pageElements.serviceField.addEventListener("input", (e) => {
    serviceValue = e.target.value
    findDoctors()
  })
}

function findDoctors() {
  if (doctorValue && serviceValue) {
    filteredDoctorsTableValue = doctorsTableValue.filter((info) => info.doctor.toLowerCase().includes(doctorValue.toLowerCase()) && info.services.toLowerCase().includes(serviceValue.toLowerCase()))
  } else if (doctorValue) {
    filteredDoctorsTableValue = doctorsTableValue.filter((info) => info.doctor.toLowerCase().includes(doctorValue.toLowerCase()))
  } else if (serviceValue) {
    filteredDoctorsTableValue = doctorsTableValue.filter((info) => info.services.toLowerCase().includes(serviceValue.toLowerCase()))
  } else {
    filteredDoctorsTableValue = doctorsTableValue
  }
  updateDoctorTable()
}

function updateDoctorTable() {
  if (filteredDoctorsTableValue[0]) {
    pageElements.firstDoctor.textContent = filteredDoctorsTableValue[0].doctor
    pageElements.firstServices.textContent = filteredDoctorsTableValue[0].services
  } else {
    pageElements.firstDoctor.textContent = ''
    pageElements.firstServices.textContent = ''
  }

  if (filteredDoctorsTableValue[1]) {
    pageElements.secondDoctor.textContent = filteredDoctorsTableValue[1].doctor
    pageElements.secondServices.textContent = filteredDoctorsTableValue[1].services
  } else {
    pageElements.secondDoctor.textContent = ''
    pageElements.secondServices.textContent = ''
  }

  if (filteredDoctorsTableValue[2]) {
    pageElements.thirdDoctor.textContent = filteredDoctorsTableValue[2].doctor
    pageElements.thirdServices.textContent = filteredDoctorsTableValue[2].services
  } else {
    pageElements.thirdDoctor.textContent = ''
    pageElements.thirdServices.textContent = ''
  }

  if (pageElements.fourthDoctor) {
    if (filteredDoctorsTableValue[3]) {
      pageElements.fourthDoctor.textContent = filteredDoctorsTableValue[3].doctor
      pageElements.fourthServices.textContent = filteredDoctorsTableValue[3].services
    } else {
      pageElements.fourthDoctor.textContent = ''
      pageElements.fourthServices.textContent = ''
    }
  }
}

export { initAppointmentsCreate, filteredDoctorsTableValue }
