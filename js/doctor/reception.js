import { get } from "../core/rest.js";
import {User} from "../core/model/user.js";
import {createCalendar} from "../core/calendar.js";
import {changeClassRows} from "../core/table.js";

const userId = 2;
let patientId;
const date = new Date();

const startButton = document.getElementById("startButton");
const infoCard = document.getElementById("infoCard");
const infoCardDescription = document.getElementById("infoCardDescription");
const startWithoutCalendarButton = document.getElementById("startWithoutCalendarButton");
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

const nameField = document.getElementById("name");
const dateOfBirthdayField = document.getElementById("dateOfBirthday");
const phoneField = document.getElementById("phone");
const eMailField = document.getElementById("e-mail");
const allergiesField = document.getElementById("allergies");

const getAppointments = () => {
  get(`appointments/doctor/${userId}`).then((data) => {
    dataAppointments = data;
    createCalendar(dataAppointments, date.getMonth(), date.getFullYear(), getInfoByDate);
    findNextAppointment();
  }).catch((error) => {
    console.error(error)
    createCalendar(dataAppointments, date.getMonth(), date.getFullYear(), getInfoByDate);
  })
}

getAppointments()

const patientWithoutCalendarDialog = document.querySelector('#patientWithoutCalendarDialog');
document.querySelector('#openPatientWithoutCalendarDialog').onclick = () => {
  updateAppointmentsTable();
  patientWithoutCalendarDialog.style.display = 'flex';
  patientWithoutCalendarDialog.show();
}

document.querySelector('#patientWithoutCalendarDialogClose').onclick = () => {
  patientWithoutCalendarDialog.style.display = null;
  patientWithoutCalendarDialog.close();
}
const infoPatientDialog = document.querySelector('#infoPatientDialog');
document.querySelector('#openInfoPatientDialog').onclick = () => {
  getUserInfo(patientId)
  infoPatientDialog.style.display = 'flex';
  infoPatientDialog.show();
}

document.querySelector('#infoPatientDialogClose').onclick = () => {
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

const getUserInfo = (patientId) => {
  get(`user/${patientId}`).then(data => {
    const {id, name, surname, patronymic, dateOfBirthday, phone, allergies, photo, photoName, address} = data;
    const email = data['e-mail'];
    const patient = new User(
      id,
      name,
      surname,
      patronymic,
      dateOfBirthday,
      phone,
      email,
      allergies,
      photo,
      photoName,
      address
    )
    nameField.innerText = patient.fullName;
    dateOfBirthdayField.innerText = patient.dateOfBirthday
    phoneField.innerText = patient.phone
    eMailField.innerText = patient.email
    allergiesField.innerText = patient.allergies
  }).catch(error => console.error(error));
}

const getInfoByDate = ({date, appointments}, month, year) => {
  updateInfoCard(appointments)
}

const findNextAppointment = () => {
  const currentDate = new Date();
  const datesArray = [];
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

const updateInfoCard = (appointments) => {
  if (appointments === null) {
    patientId = nextAppointment['user-id'];
    infoCard.innerText = `Ближайший пациент на приеме ${nextAppointment['user-name']} ${nextAppointment['date']} в ${nextAppointment['datetime']}`
    infoCardDescription.innerText = `Жалобы пациента: ${nextAppointment.description}`
  } else {
    patientId = appointments[0]['user-id'];
    infoCard.innerText = '';
    infoCardDescription.innerText = '';
    appointments.forEach((appointment) => {
      infoCard.innerText += `Пациент ${appointment['user-name']} дата приема ${appointment['date']} в ${appointment['datetime']}
`
    })
  }
}

const closestTo = (dateToCompare, datesArray) => {
  const buff = datesArray.filter(date => date >=dateToCompare).sort()
  return buff.length ? buff[0] : undefined
}

const updateAppointmentsTable = () => {
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
      changeClassRows([
        firstRowCell1,
        firstRowCell2,
        firstRowCell3
      ], "cell", "cell-selected")

      changeClassRows([
        secondRowCell1,
        secondRowCell2,
        secondRowCell3,
        thirdRowCell1,
        thirdRowCell2,
        thirdRowCell3,
        fourthRowCell1,
        fourthRowCell2,
        fourthRowCell3,
        fifthRowCell1,
        fifthRowCell2,
        fifthRowCell3,
        sixthRowCell1,
        sixthRowCell2,
        sixthRowCell3
      ], "cell-selected", "cell")

      selectedRow = 0;
    } else {
      changeClassRows([
        firstRowCell1,
        firstRowCell2,
        firstRowCell3
      ], "cell-selected", "cell")

      selectedRow = -1;
    }
})

secondRow.addEventListener("click", (e) => {
  if (selectedRow !== 1) {
    changeClassRows([
      secondRowCell1,
      secondRowCell2,
      secondRowCell3
    ], "cell", "cell-selected")

    changeClassRows([
      firstRowCell1,
      firstRowCell2,
      firstRowCell3,
      thirdRowCell1,
      thirdRowCell2,
      thirdRowCell3,
      fourthRowCell1,
      fourthRowCell2,
      fourthRowCell3,
      fifthRowCell1,
      fifthRowCell2,
      fifthRowCell3,
      sixthRowCell1,
      sixthRowCell2,
      sixthRowCell3
    ], "cell-selected", "cell")

    selectedRow = 1;
  } else {
    changeClassRows([
      firstRowCell1,
      firstRowCell2,
      firstRowCell3
    ], "cell-selected", "cell")

    selectedRow = -1;
  }
})

thirdRow.addEventListener("click", (e) => {
  if (selectedRow !== 2) {
    changeClassRows([
      thirdRowCell1,
      thirdRowCell2,
      thirdRowCell3
    ], "cell", "cell-selected")

    changeClassRows([
      firstRowCell1,
      firstRowCell2,
      firstRowCell3,
      secondRowCell1,
      secondRowCell2,
      secondRowCell3,
      fourthRowCell1,
      fourthRowCell2,
      fourthRowCell3,
      fifthRowCell1,
      fifthRowCell2,
      fifthRowCell3,
      sixthRowCell1,
      sixthRowCell2,
      sixthRowCell3
    ], "cell-selected", "cell")

    selectedRow = 2;
  } else {
    changeClassRows([
      thirdRowCell1,
      thirdRowCell2,
      thirdRowCell3
    ], "cell-selected", "cell")

    selectedRow = -1;
  }
})

fourthRow.addEventListener("click", (e) => {
  if (selectedRow !== 3) {
    changeClassRows([
      fourthRowCell1,
      fourthRowCell2,
      fourthRowCell3
    ], "cell", "cell-selected")

    changeClassRows([
      firstRowCell1,
      firstRowCell2,
      firstRowCell3,
      secondRowCell1,
      secondRowCell2,
      secondRowCell3,
      thirdRowCell1,
      thirdRowCell2,
      thirdRowCell3,
      fifthRowCell1,
      fifthRowCell2,
      fifthRowCell3,
      sixthRowCell1,
      sixthRowCell2,
      sixthRowCell3
    ], "cell-selected", "cell")

    selectedRow = 3;
  } else {
    changeClassRows([
      fourthRowCell1,
      fourthRowCell2,
      fourthRowCell3
    ], "cell-selected", "cell")

    selectedRow = -1;
  }
})

fifthRow.addEventListener("click", (e) => {
  if (selectedRow !== 4) {
    changeClassRows([
      fifthRowCell1,
      fifthRowCell2,
      fifthRowCell3
    ], "cell", "cell-selected")

    changeClassRows([
      firstRowCell1,
      firstRowCell2,
      firstRowCell3,
      secondRowCell1,
      secondRowCell2,
      secondRowCell3,
      thirdRowCell1,
      thirdRowCell2,
      thirdRowCell3,
      fourthRowCell1,
      fourthRowCell2,
      fourthRowCell3,
      sixthRowCell1,
      sixthRowCell2,
      sixthRowCell3
    ], "cell-selected", "cell")

    selectedRow = 4;
  } else {
    changeClassRows([
      fifthRowCell1,
      fifthRowCell2,
      fifthRowCell3
    ], "cell-selected", "cell")

    selectedRow = -1;
  }
})

sixthRow.addEventListener("click", (e) => {
  if (selectedRow !== 5) {
    changeClassRows([
      sixthRowCell1,
      sixthRowCell2,
      sixthRowCell3
    ], "cell", "cell-selected")

    changeClassRows([
      firstRowCell1,
      firstRowCell2,
      firstRowCell3,
      secondRowCell1,
      secondRowCell2,
      secondRowCell3,
      thirdRowCell1,
      thirdRowCell2,
      thirdRowCell3,
      fourthRowCell1,
      fourthRowCell2,
      fourthRowCell3,
      fifthRowCell1,
      fifthRowCell2,
      fifthRowCell3
    ], "cell-selected", "cell")

    selectedRow = 5;
  } else {
    changeClassRows([
      sixthRowCell1,
      sixthRowCell2,
      sixthRowCell3
    ], "cell-selected", "cell")

    selectedRow = -1;
  }
})

