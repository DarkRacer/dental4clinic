import { get } from "../rest.js";
import {createCalendar} from "../calendar.js";

const findForm = document.getElementById("find-form");
const findButton = document.getElementById("find-button");
let calendarDateAppointments = [];
let currentCalendarDateAppointments = [];
let doctorValue = "";
let patientValue = "";
const date = new Date();

const initRecordList = (role) => {
  getAppointments(role);

  findButton.addEventListener("click", (e) => {
    doctorValue = findForm.doctor.value;
    patientValue = findForm.patient.value;
    findAppointments()
  });
}

const findAppointments = () => {
  if (doctorValue && patientValue) {
    currentCalendarDateAppointments = calendarDateAppointments.filter((info) => info['doctor-name'].toLowerCase().includes(doctorValue.toLowerCase()) && info['user-name'].toLowerCase().includes(patientValue.toLowerCase()))
  } else if (doctorValue) {
    currentCalendarDateAppointments = calendarDateAppointments.filter((info) => info['doctor-name'].toLowerCase().includes(doctorValue.toLowerCase()))
  } else if (patientValue) {
    currentCalendarDateAppointments = calendarDateAppointments.filter((info) => info['user-name'].toLowerCase().includes(patientValue.toLowerCase()))
  } else {
    currentCalendarDateAppointments = calendarDateAppointments
  }
  createCalendar(currentCalendarDateAppointments, date.getMonth(), date.getFullYear(), null, true);
}

const getAppointments = (role) => {
  get(`appointments/${role}`).then((data) => {
    calendarDateAppointments = data;
    currentCalendarDateAppointments = calendarDateAppointments;
    createCalendar(currentCalendarDateAppointments, date.getMonth(), date.getFullYear(), null);
  }).catch((error) => {
    console.error(error)
    createCalendar(date.getMonth(), date.getFullYear())
  })
}

export { initRecordList }
