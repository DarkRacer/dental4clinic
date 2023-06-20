const url = 'https://af2f-46-164-217-97.ngrok-free.app/';
var token = GetCookie("access_token")
const headers = {
  "Host":  'af2f-46-164-217-97.ngrok-free.app',
  "Origin":  'https://af2f-46-164-217-97.ngrok-free.app/',
  "Accept": "*/*",
  'ngrok-skip-browser-warning':true
}
var userId = 2;

const monthName = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const date = new Date();
let currentDiffMonth = 0;
const monthBefore = document.getElementById("monthBefore");
const monthNext = document.getElementById("monthNext");
const calendarDateGroup = document.getElementById("calendarDateGroup");
const calendarTitle = document.getElementById("calendarTitle");
const startButton = document.getElementById("startButton");
const infoCard = document.getElementById("infoCard");
const infoCardDescription = document.getElementById("infoCardDescription");
const startWithoutCalendarButton = document.getElementById("startWithoutCalendarButton");
let calendarDateGroupChild = [];
let dataAppointments = [];
let nextAppointment = {};
let selectedRow = -1;


const firstRow = document.getElementById("first-row");
const firstRowCell1 = document.getElementById("first-row-cell-1");
const firstRowCell2 = document.getElementById("first-row-cell-2");
const firstRowCell3 = document.getElementById("first-row-cell-3");

const firstPatient = document.getElementById("first-patient");
const firstDescription = document.getElementById("first-description");
const firstDate = document.getElementById("first-date");

const secondRow = document.getElementById("second-row");
const secondRowCell1 = document.getElementById("second-row-cell-1");
const secondRowCell2 = document.getElementById("second-row-cell-2");
const secondRowCell3 = document.getElementById("second-row-cell-3");

const secondPatient = document.getElementById("second-patient");
const secondDescription = document.getElementById("second-description");
const secondDate = document.getElementById("second-date");

const thirdRow = document.getElementById("third-row");
const thirdRowCell1 = document.getElementById("third-row-cell-1");
const thirdRowCell2 = document.getElementById("third-row-cell-2");
const thirdRowCell3 = document.getElementById("third-row-cell-3");

const thirdPatient = document.getElementById("third-patient");
const thirdDescription = document.getElementById("third-description");
const thirdDate = document.getElementById("third-date");

const fourthRow = document.getElementById("fourth-row");
const fourthRowCell1 = document.getElementById("fourth-row-cell-1");
const fourthRowCell2 = document.getElementById("fourth-row-cell-2");
const fourthRowCell3 = document.getElementById("fourth-row-cell-3");

const fourthPatient = document.getElementById("fourth-patient");
const fourthDescription = document.getElementById("fourth-description");
const fourthDate = document.getElementById("fourth-date");

const fifthRow = document.getElementById("fifth-row");
const fifthRowCell1 = document.getElementById("fifth-row-cell-1");
const fifthRowCell2 = document.getElementById("fifth-row-cell-2");
const fifthRowCell3 = document.getElementById("fifth-row-cell-3");

const fifthPatient = document.getElementById("fifth-patient");
const fifthDescription = document.getElementById("fifth-description");
const fifthDate = document.getElementById("fifth-date");

const sixthRow = document.getElementById("sixth-row");
const sixthRowCell1 = document.getElementById("sixth-row-cell-1");
const sixthRowCell2 = document.getElementById("sixth-row-cell-2");
const sixthRowCell3 = document.getElementById("sixth-row-cell-3");

const sixthPatient = document.getElementById("sixth-patient");
const sixthDescription = document.getElementById("sixth-description");
const sixthDate = document.getElementById("sixth-date");

let nameField = document.getElementById("name");
let dateOfBirthdayField = document.getElementById("dateOfBirthday");
let phoneField = document.getElementById("phone");
let eMailField = document.getElementById("e-mail");
let allergiesField = document.getElementById("allergies");

monthBefore.addEventListener("click", (e) => {
  currentDiffMonth--;
  const newDate = changeMonths(date, currentDiffMonth);
  createCalendar(newDate.getMonth(), newDate.getFullYear())
})
monthNext.addEventListener("click", (e) => {
  currentDiffMonth++;
  const newDate = changeMonths(date, currentDiffMonth);
  createCalendar(newDate.getMonth(), newDate.getFullYear())
})

getAppointments()

var patientWithoutCalendarDialog = document.querySelector('#patientWithoutCalendarDialog');
document.querySelector('#openPatientWithoutCalendarDialog').onclick = function() {
  updateAppointmentsTable();
  patientWithoutCalendarDialog.style.display = 'flex';
  patientWithoutCalendarDialog.show();
}
document.querySelector('#patientWithoutCalendarDialogClose').onclick = function() {
  patientWithoutCalendarDialog.style.display = null;
  patientWithoutCalendarDialog.close();
}

var infoPatientDialog = document.querySelector('#infoPatientDialog');
document.querySelector('#openInfoPatientDialog').onclick = function() {
  getUserInfo(nextAppointment['user-id'])
  infoPatientDialog.style.display = 'flex';
  infoPatientDialog.show();
}
document.querySelector('#infoPatientDialogClose').onclick = function() {
  infoPatientDialog.style.display = null;
  infoPatientDialog.close();
}

startWithoutCalendarButton.addEventListener("click", (e) => {
  if (selectedRow === -1) {
    patientWithoutCalendarDialog.style.display = null;
    patientWithoutCalendarDialog.close();
  } else {
    location.assign(`/doctor/reception/${dataAppointments[selectedRow].id}`);
  }
})

startButton.addEventListener("click", (e) => {
  location.assign(`/doctor/reception/${nextAppointment.id}`);
})

function getAppointments() {
  GetUrl(`appointments/doctor/${userId}`).then((data) => {
    dataAppointments = data;
    createCalendar(date.getMonth(), date.getFullYear());
    findNextAppointment();
  }).catch((error) => {
    console.error(error)
    createCalendar(date.getMonth(), date.getFullYear())
  })
}

function getUserInfo(patientId) {
  GetUrl(`user/${patientId}`).then(data => {
    nameField.innerText = data['full-name'];
    dateOfBirthdayField.innerText = data.dateOfBirthday
    phoneField.innerText = data.phone
    eMailField.innerText = data['e-mail']
    allergiesField.innerText = data.allergies
  }).catch(error => console.error(error));
}

function getInfoByDate({date, appointments}, month, year) {
  updateInfoCard(appointments)
}

function createCalendar(month, year) {
  calendarDateGroupChild.forEach((child) => {
    calendarDateGroup.removeChild(child);
  })
  calendarDateGroupChild = [];
  calendarTitle.innerText = monthName[month] + " " + year;
  let weekMap = createNewWeekMap();
  let lastWeek = true;
  for (let day = 1; day <= daysInMonth(month, year); day++) {
    var d = new Date(year, month, day);
    let appointments = dataAppointments.filter((appointment) => {
      var appointmentDate = new Date(appointment.date);
      appointmentDate.setHours(0,0,0,0)
      return appointmentDate.getTime() === d.getTime()
    });
    if (appointments.length === 0) {
      appointments = null;
    }
    if (d.getDay() === 0) {
      weekMap.set(6, {date: day, appointments: appointments})
      let calendarDateGroupRow = createCalendarDateGroupRow(weekMap, month, year)
      calendarDateGroup.appendChild(calendarDateGroupRow);
      calendarDateGroupChild.push(calendarDateGroupRow);
      weekMap = createNewWeekMap();
      lastWeek = false;
    } else {
      weekMap.set(d.getDay() - 1, {date: day, appointments: appointments})
      lastWeek = true;
    }
  }

  if (lastWeek) {
    let calendarDateGroupRow = createCalendarDateGroupRow(weekMap, month, year)
    calendarDateGroup.appendChild(calendarDateGroupRow);
    calendarDateGroupChild.push(calendarDateGroupRow)
  }

}

function createNewWeekMap() {
  let weekMap =  new Map();
  weekMap.set(0, {date: 0, appointments: null});
  weekMap.set(1, {date: 0, appointments: null});
  weekMap.set(2, {date: 0, appointments: null});
  weekMap.set(3, {date: 0, appointments: null});
  weekMap.set(4, {date: 0, appointments: null});
  weekMap.set(5, {date: 0, appointments: null});
  weekMap.set(6, {date: 0, appointments: null});
  return weekMap;
}

function createCalendarDateGroupRow(weekMap, month, year) {
  let calendarDateGroupRow = document.createElement('div');
  calendarDateGroupRow.classList.add("calendar-date-group-row");

  for (let day of weekMap.values()) {
    let calendarDate = document.createElement('div');
    if (day.appointments) {
      calendarDate.classList.add("date-selected");
      calendarDate.addEventListener("click", (e) => {
        getInfoByDate(day, month, year);
      })
    } else {
      calendarDate.classList.add("calendar-date");
    }

    if (day.date !== 0) {
      calendarDate.innerText = day.date;
    }

    calendarDateGroupRow.appendChild(calendarDate);
  }

  return calendarDateGroupRow;
}
function changeMonths(date, months) {
  const dateCopy = new Date(date);

  dateCopy.setMonth(dateCopy.getMonth() + months);

  return dateCopy;
}

function daysInMonth (month, year) {
  return new Date(year, month+1, 0).getDate();
}

function findNextAppointment() {
  const currentDate = new Date();
  let datesArray = [];
  dataAppointments.forEach((appointment) => {
    const appointmentDate = new Date(appointment.date);
    const appointmentTime = appointment.datetime.split(":");
    appointmentDate.setHours(parseInt(appointmentTime[0]), parseInt(appointmentTime[1]),0,0)
    datesArray.push(appointmentDate);
  })
  const nextAppointmentDate = closestTo(currentDate, datesArray);
  nextAppointment = dataAppointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    const appointmentTime = appointment.datetime.split(":");
    appointmentDate.setHours(parseInt(appointmentTime[0]), parseInt(appointmentTime[1]),0,0)
    return appointmentDate.getTime() === nextAppointmentDate.getTime()
  })[0];
  updateInfoCard(null)
}

function updateInfoCard(appointments) {
  if (appointments === null) {
    infoCard.innerText = `Ближайший пациент на приеме ${nextAppointment['user-name']} ${nextAppointment['date']} в ${nextAppointment['datetime']}`
    infoCardDescription.innerText = `Жалобы пациента: ${nextAppointment.description}`
  } else {
    infoCard.innerText = '';
    infoCardDescription.innerText = '';
    appointments.forEach((appointment) => {
      infoCard.innerText += `Пациент ${appointment['user-name']} дата приема ${appointment['date']} в ${appointment['datetime']}
`
    })
  }
}

function closestTo(dateToCompare, datesArray) {
  const buff = datesArray.filter(date => date >=dateToCompare).sort()
  return buff.length ? buff[0] : undefined
}


function updateAppointmentsTable() {
  if (dataAppointments[0]) {
    firstPatient.textContent = dataAppointments[0]['user-name'];
    firstDescription.textContent = dataAppointments[0].description;
    firstDate.textContent = dataAppointments[0].date + " " + dataAppointments[0].datetime;
  } else {
    firstPatient.textContent = '';
    firstDescription.textContent = '';
    firstDate.textContent = '';
  }

  if (dataAppointments[1]) {
    secondPatient.textContent = dataAppointments[1]['user-name'];
    secondDescription.textContent = dataAppointments[1].description;
    secondDate.textContent = dataAppointments[1].date + " " + dataAppointments[1].datetime;
  } else {
    secondPatient.textContent = '';
    secondDescription.textContent = '';
    secondDate.textContent = '';
  }

  if (dataAppointments[2]) {
    thirdPatient.textContent = dataAppointments[2]['user-name'];
    thirdDescription.textContent = dataAppointments[2].description;
    thirdDate.textContent = dataAppointments[2].date + " " + dataAppointments[2].datetime;
  } else {
    thirdPatient.textContent = '';
    thirdDescription.textContent = '';
    thirdDate.textContent = '';
  }

  if (dataAppointments[3]) {
    fourthPatient.textContent = dataAppointments[3]['user-name'];
    fourthDescription.textContent = dataAppointments[3].description;
    fourthDate.textContent = dataAppointments[3].date + " " + dataAppointments[3].datetime;
  } else {
    fourthPatient.textContent = '';
    fourthDescription.textContent = '';
    fourthDate.textContent = '';
  }

  if (dataAppointments[4]) {
    fifthPatient.textContent = dataAppointments[4]['user-name'];
    fifthDescription.textContent = dataAppointments[4].description;
    fifthDate.textContent = dataAppointments[4].date + " " + dataAppointments[4].datetime;
  } else {
    fifthPatient.textContent = '';
    fifthDescription.textContent = '';
    fifthDate.textContent = '';
  }

  if (dataAppointments[5]) {
    sixthPatient.textContent = dataAppointments[5]['user-name'];
    sixthDescription.textContent = dataAppointments[5].description;
    sixthDate.textContent = dataAppointments[5].date + " " + dataAppointments[5].datetime;
  } else {
    sixthPatient.textContent = '';
    sixthDescription.textContent = '';
    sixthDate.textContent = '';
  }
}

firstRow.addEventListener("click", (e) => {
    if (selectedRow !== 0) {
      firstRowCell1.classList.remove("cell")
      firstRowCell1.classList.add("cell-selected")
      firstRowCell2.classList.remove("cell")
      firstRowCell2.classList.add("cell-selected")
      firstRowCell3.classList.remove("cell")
      firstRowCell3.classList.add("cell-selected")

      secondRowCell1.classList.remove("cell-selected")
      secondRowCell1.classList.add("cell")
      secondRowCell2.classList.remove("cell-selected")
      secondRowCell2.classList.add("cell")
      secondRowCell3.classList.remove("cell-selected")
      secondRowCell3.classList.add("cell")

      thirdRowCell1.classList.remove("cell-selected")
      thirdRowCell1.classList.add("cell")
      thirdRowCell2.classList.remove("cell-selected")
      thirdRowCell2.classList.add("cell")
      thirdRowCell3.classList.remove("cell-selected")
      thirdRowCell3.classList.add("cell")

      fourthRowCell1.classList.remove("cell-selected")
      fourthRowCell1.classList.add("cell")
      fourthRowCell2.classList.remove("cell-selected")
      fourthRowCell2.classList.add("cell")
      fourthRowCell3.classList.remove("cell-selected")
      fourthRowCell3.classList.add("cell")

      fifthRowCell1.classList.remove("cell-selected")
      fifthRowCell1.classList.add("cell")
      fifthRowCell2.classList.remove("cell-selected")
      fifthRowCell2.classList.add("cell")
      fifthRowCell3.classList.remove("cell-selected")
      fifthRowCell3.classList.add("cell")

      sixthRowCell1.classList.remove("cell-selected")
      sixthRowCell1.classList.add("cell")
      sixthRowCell2.classList.remove("cell-selected")
      sixthRowCell2.classList.add("cell")
      sixthRowCell3.classList.remove("cell-selected")
      sixthRowCell3.classList.add("cell")

      selectedRow = 0;
    } else {
      firstRowCell1.classList.remove("cell-selected")
      firstRowCell1.classList.add("cell")
      firstRowCell2.classList.remove("cell-selected")
      firstRowCell2.classList.add("cell")
      firstRowCell3.classList.remove("cell-selected")
      firstRowCell3.classList.add("cell")
      selectedRow = -1;
    }
})

secondRow.addEventListener("click", (e) => {
  if (selectedRow !== 1) {
    secondRowCell1.classList.remove("cell")
    secondRowCell1.classList.add("cell-selected")
    secondRowCell2.classList.remove("cell")
    secondRowCell2.classList.add("cell-selected")
    secondRowCell3.classList.remove("cell")
    secondRowCell3.classList.add("cell-selected")

    firstRowCell1.classList.remove("cell-selected")
    firstRowCell1.classList.add("cell")
    firstRowCell2.classList.remove("cell-selected")
    firstRowCell2.classList.add("cell")
    firstRowCell3.classList.remove("cell-selected")
    firstRowCell3.classList.add("cell")

    thirdRowCell1.classList.remove("cell-selected")
    thirdRowCell1.classList.add("cell")
    thirdRowCell2.classList.remove("cell-selected")
    thirdRowCell2.classList.add("cell")
    thirdRowCell3.classList.remove("cell-selected")
    thirdRowCell3.classList.add("cell")

    fourthRowCell1.classList.remove("cell-selected")
    fourthRowCell1.classList.add("cell")
    fourthRowCell2.classList.remove("cell-selected")
    fourthRowCell2.classList.add("cell")
    fourthRowCell3.classList.remove("cell-selected")
    fourthRowCell3.classList.add("cell")

    fifthRowCell1.classList.remove("cell-selected")
    fifthRowCell1.classList.add("cell")
    fifthRowCell2.classList.remove("cell-selected")
    fifthRowCell2.classList.add("cell")
    fifthRowCell3.classList.remove("cell-selected")
    fifthRowCell3.classList.add("cell")

    sixthRowCell1.classList.remove("cell-selected")
    sixthRowCell1.classList.add("cell")
    sixthRowCell2.classList.remove("cell-selected")
    sixthRowCell2.classList.add("cell")
    sixthRowCell3.classList.remove("cell-selected")
    sixthRowCell3.classList.add("cell")

    selectedRow = 1;
  } else {
    secondRowCell1.classList.remove("cell-selected")
    secondRowCell1.classList.add("cell")
    secondRowCell2.classList.remove("cell-selected")
    secondRowCell2.classList.add("cell")
    secondRowCell3.classList.remove("cell-selected")
    secondRowCell3.classList.add("cell")
    selectedRow = -1;
  }
})

thirdRow.addEventListener("click", (e) => {
  if (selectedRow !== 2) {
    thirdRowCell1.classList.remove("cell")
    thirdRowCell1.classList.add("cell-selected")
    thirdRowCell2.classList.remove("cell")
    thirdRowCell2.classList.add("cell-selected")
    thirdRowCell3.classList.remove("cell")
    thirdRowCell3.classList.add("cell-selected")

    firstRowCell1.classList.remove("cell-selected")
    firstRowCell1.classList.add("cell")
    firstRowCell2.classList.remove("cell-selected")
    firstRowCell2.classList.add("cell")
    firstRowCell3.classList.remove("cell-selected")
    firstRowCell3.classList.add("cell")

    secondRowCell1.classList.remove("cell-selected")
    secondRowCell1.classList.add("cell")
    secondRowCell2.classList.remove("cell-selected")
    secondRowCell2.classList.add("cell")
    secondRowCell3.classList.remove("cell-selected")
    secondRowCell3.classList.add("cell")

    fourthRowCell1.classList.remove("cell-selected")
    fourthRowCell1.classList.add("cell")
    fourthRowCell2.classList.remove("cell-selected")
    fourthRowCell2.classList.add("cell")
    fourthRowCell3.classList.remove("cell-selected")
    fourthRowCell3.classList.add("cell")

    fifthRowCell1.classList.remove("cell-selected")
    fifthRowCell1.classList.add("cell")
    fifthRowCell2.classList.remove("cell-selected")
    fifthRowCell2.classList.add("cell")
    fifthRowCell3.classList.remove("cell-selected")
    fifthRowCell3.classList.add("cell")

    sixthRowCell1.classList.remove("cell-selected")
    sixthRowCell1.classList.add("cell")
    sixthRowCell2.classList.remove("cell-selected")
    sixthRowCell2.classList.add("cell")
    sixthRowCell3.classList.remove("cell-selected")
    sixthRowCell3.classList.add("cell")

    selectedRow = 2;
  } else {
    thirdRowCell1.classList.remove("cell-selected")
    thirdRowCell1.classList.add("cell")
    thirdRowCell2.classList.remove("cell-selected")
    thirdRowCell2.classList.add("cell")
    thirdRowCell3.classList.remove("cell-selected")
    thirdRowCell3.classList.add("cell")
    selectedRow = -1;
  }
})

fourthRow.addEventListener("click", (e) => {
  if (selectedRow !== 3) {
    fourthRowCell1.classList.remove("cell")
    fourthRowCell1.classList.add("cell-selected")
    fourthRowCell2.classList.remove("cell")
    fourthRowCell2.classList.add("cell-selected")
    fourthRowCell3.classList.remove("cell")
    fourthRowCell3.classList.add("cell-selected")

    firstRowCell1.classList.remove("cell-selected")
    firstRowCell1.classList.add("cell")
    firstRowCell2.classList.remove("cell-selected")
    firstRowCell2.classList.add("cell")
    firstRowCell3.classList.remove("cell-selected")
    firstRowCell3.classList.add("cell")

    secondRowCell1.classList.remove("cell-selected")
    secondRowCell1.classList.add("cell")
    secondRowCell2.classList.remove("cell-selected")
    secondRowCell2.classList.add("cell")
    secondRowCell3.classList.remove("cell-selected")
    secondRowCell3.classList.add("cell")

    thirdRowCell1.classList.remove("cell-selected")
    thirdRowCell1.classList.add("cell")
    thirdRowCell2.classList.remove("cell-selected")
    thirdRowCell2.classList.add("cell")
    thirdRowCell3.classList.remove("cell-selected")
    thirdRowCell3.classList.add("cell")

    fifthRowCell1.classList.remove("cell-selected")
    fifthRowCell1.classList.add("cell")
    fifthRowCell2.classList.remove("cell-selected")
    fifthRowCell2.classList.add("cell")
    fifthRowCell3.classList.remove("cell-selected")
    fifthRowCell3.classList.add("cell")

    sixthRowCell1.classList.remove("cell-selected")
    sixthRowCell1.classList.add("cell")
    sixthRowCell2.classList.remove("cell-selected")
    sixthRowCell2.classList.add("cell")
    sixthRowCell3.classList.remove("cell-selected")
    sixthRowCell3.classList.add("cell")

    selectedRow = 3;
  } else {
    fourthRowCell1.classList.remove("cell-selected")
    fourthRowCell1.classList.add("cell")
    fourthRowCell2.classList.remove("cell-selected")
    fourthRowCell2.classList.add("cell")
    fourthRowCell3.classList.remove("cell-selected")
    fourthRowCell3.classList.add("cell")
    selectedRow = -1;
  }
})

fifthRow.addEventListener("click", (e) => {
  if (selectedRow !== 4) {
    fifthRowCell1.classList.remove("cell")
    fifthRowCell1.classList.add("cell-selected")
    fifthRowCell2.classList.remove("cell")
    fifthRowCell2.classList.add("cell-selected")
    fifthRowCell3.classList.remove("cell")
    fifthRowCell3.classList.add("cell-selected")

    firstRowCell1.classList.remove("cell-selected")
    firstRowCell1.classList.add("cell")
    firstRowCell2.classList.remove("cell-selected")
    firstRowCell2.classList.add("cell")
    firstRowCell3.classList.remove("cell-selected")
    firstRowCell3.classList.add("cell")

    secondRowCell1.classList.remove("cell-selected")
    secondRowCell1.classList.add("cell")
    secondRowCell2.classList.remove("cell-selected")
    secondRowCell2.classList.add("cell")
    secondRowCell3.classList.remove("cell-selected")
    secondRowCell3.classList.add("cell")

    thirdRowCell1.classList.remove("cell-selected")
    thirdRowCell1.classList.add("cell")
    thirdRowCell2.classList.remove("cell-selected")
    thirdRowCell2.classList.add("cell")
    thirdRowCell3.classList.remove("cell-selected")
    thirdRowCell3.classList.add("cell")

    fourthRowCell1.classList.remove("cell-selected")
    fourthRowCell1.classList.add("cell")
    fourthRowCell2.classList.remove("cell-selected")
    fourthRowCell2.classList.add("cell")
    fourthRowCell3.classList.remove("cell-selected")
    fourthRowCell3.classList.add("cell")

    sixthRowCell1.classList.remove("cell-selected")
    sixthRowCell1.classList.add("cell")
    sixthRowCell2.classList.remove("cell-selected")
    sixthRowCell2.classList.add("cell")
    sixthRowCell3.classList.remove("cell-selected")
    sixthRowCell3.classList.add("cell")

    selectedRow = 4;
  } else {
    fifthRowCell1.classList.remove("cell-selected")
    fifthRowCell1.classList.add("cell")
    fifthRowCell2.classList.remove("cell-selected")
    fifthRowCell2.classList.add("cell")
    fifthRowCell3.classList.remove("cell-selected")
    fifthRowCell3.classList.add("cell")
    selectedRow = -1;
  }
})

sixthRow.addEventListener("click", (e) => {
  if (selectedRow !== 5) {
    sixthRowCell1.classList.remove("cell")
    sixthRowCell1.classList.add("cell-selected")
    sixthRowCell2.classList.remove("cell")
    sixthRowCell2.classList.add("cell-selected")
    sixthRowCell3.classList.remove("cell")
    sixthRowCell3.classList.add("cell-selected")

    firstRowCell1.classList.remove("cell-selected")
    firstRowCell1.classList.add("cell")
    firstRowCell2.classList.remove("cell-selected")
    firstRowCell2.classList.add("cell")
    firstRowCell3.classList.remove("cell-selected")
    firstRowCell3.classList.add("cell")

    secondRowCell1.classList.remove("cell-selected")
    secondRowCell1.classList.add("cell")
    secondRowCell2.classList.remove("cell-selected")
    secondRowCell2.classList.add("cell")
    secondRowCell3.classList.remove("cell-selected")
    secondRowCell3.classList.add("cell")

    thirdRowCell1.classList.remove("cell-selected")
    thirdRowCell1.classList.add("cell")
    thirdRowCell2.classList.remove("cell-selected")
    thirdRowCell2.classList.add("cell")
    thirdRowCell3.classList.remove("cell-selected")
    thirdRowCell3.classList.add("cell")

    fourthRowCell1.classList.remove("cell-selected")
    fourthRowCell1.classList.add("cell")
    fourthRowCell2.classList.remove("cell-selected")
    fourthRowCell2.classList.add("cell")
    fourthRowCell3.classList.remove("cell-selected")
    fourthRowCell3.classList.add("cell")

    fifthRowCell1.classList.remove("cell-selected")
    fifthRowCell1.classList.add("cell")
    fifthRowCell2.classList.remove("cell-selected")
    fifthRowCell2.classList.add("cell")
    fifthRowCell3.classList.remove("cell-selected")
    fifthRowCell3.classList.add("cell")

    selectedRow = 5;
  } else {
    sixthRowCell1.classList.remove("cell-selected")
    sixthRowCell1.classList.add("cell")
    sixthRowCell2.classList.remove("cell-selected")
    sixthRowCell2.classList.add("cell")
    sixthRowCell3.classList.remove("cell-selected")
    sixthRowCell3.classList.add("cell")
    selectedRow = -1;
  }
})

function GetCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function GetUrl(getUrl) {
  return fetch(url + getUrl, {
    method: 'GET',
    headers: headers
  })
    .then(response => response.json())
}

function PostUrl(postUrl, body) {
  return fetch(url + postUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
    .then(response => response)
}
