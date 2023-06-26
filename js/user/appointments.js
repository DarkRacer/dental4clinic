import { get, postWithoutResponse } from "../core/rest.js";
import {createCalendar, monthName} from "../core/calendar.js";
import {UserRequest} from "../core/model/user-request.js";

const userId = 1;

const date = new Date();
const contactBodyInfo = document.getElementById("contactBodyInfo");
const submitForm = document.getElementById("submitForm");
const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", (e) => {
  const name = submitForm.name.value;
  const phone = submitForm.phone.value;
  const description = submitForm.description.value

  const requestBody = new UserRequest(
    name,
    phone,
    description
  )
  postWithoutResponse('request/create', requestBody).then(() => alert("Заявка отправлена")).catch((error) => alert("Заявка не отправлена"))
});

getAppointments()
getUserInfo()

function getAppointments() {
  get(`appointments/user/${userId}`).then((data) => {
    createCalendar(data, date.getMonth(), date.getFullYear(), getInfoByDate);
  }).catch((error) => {
    console.error(error)
    createCalendar([], date.getMonth(), date.getFullYear(), getInfoByDate)
  })
}

const getInfoByDate = ({date, appointments}, month, year) => {
  contactBodyInfo.innerText = `${date} ${monthName[month]} ${year} :
`
  appointments.forEach((appointment) => {
    contactBodyInfo.innerText += `${appointment.datetime} - ${appointment['doctor-name']} - ${appointment['service-name']}
`
  })
}

function getUserInfo() {
  get(`user/${userId}`).then(data => {
    contactBodyInfo.innerText = data.name + ", мы рады что вы пользуетесь нашими услугами, вы можете посмотреть ваши записи к врачам или запросить звонок, если у Вас возникли вопросы"
  }).catch(error => {
    contactBodyInfo.innerText = "Mы рады что вы пользуетесь нашими услугами, вы можете посмотреть ваши записи к врачам или запросить звонок, если у Вас возникли вопросы"
    console.error(error)
  });
}

