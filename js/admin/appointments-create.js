import { get, postWithoutResponse } from "../core/rest.js";
import * as pageElements from "../core/elements/appointments-create.js";
import {filteredDoctorsTableValue, initAppointmentsCreate} from "../core/page/appointments-create.js";
import {changeClassRows} from '../core/table.js';
import {AppointmentBodyAdmin} from "../core/model/appointment.js";


const firstRowRequest = document.getElementById("first-row-request");
const firstRowRequestCell1 = document.getElementById("first-row-request-cell-1");
const firstRowRequestCell2 = document.getElementById("first-row-request-cell-2");
const firstRowRequestCell3 = document.getElementById("first-row-request-cell-3");

const firstName = document.getElementById("first-name");
const firstPhone = document.getElementById("first-phone");
const firstDescription = document.getElementById("first-description");


const secondRowRequest = document.getElementById("second-row-request");
const secondRowRequestCell1 = document.getElementById("second-row-request-cell-1");
const secondRowRequestCell2 = document.getElementById("second-row-request-cell-2");
const secondRowRequestCell3 = document.getElementById("second-row-request-cell-3");

const secondName = document.getElementById("second-name");
const secondPhone = document.getElementById("second-phone");
const secondDescription = document.getElementById("second-description");


const thirdRowRequest = document.getElementById("third-row-request");
const thirdRowRequestCell1 = document.getElementById("third-row-request-cell-1");
const thirdRowRequestCell2 = document.getElementById("third-row-request-cell-2");
const thirdRowRequestCell3 = document.getElementById("third-row-request-cell-3");

const thirdName = document.getElementById("third-name");
const thirdPhone = document.getElementById("third-phone");
const thirdDescription = document.getElementById("third-description");


const fourthRowRequest = document.getElementById("fourth-row-request");
const fourthRowRequestCell1 = document.getElementById("fourth-row-request-cell-1");
const fourthRowRequestCell2 = document.getElementById("fourth-row-request-cell-2");
const fourthRowRequestCell3 = document.getElementById("fourth-row-request-cell-3");

const fourthName = document.getElementById("fourth-name");
const fourthPhone = document.getElementById("fourth-phone");
const fourthDescription = document.getElementById("fourth-description");


const fifthRowRequest = document.getElementById("fifth-row-request");
const fifthRowRequestCell1 = document.getElementById("fifth-row-request-cell-1");
const fifthRowRequestCell2 = document.getElementById("fifth-row-request-cell-2");
const fifthRowRequestCell3 = document.getElementById("fifth-row-request-cell-3");

const fifthName = document.getElementById("fifth-name");
const fifthPhone = document.getElementById("fifth-phone");
const fifthDescription = document.getElementById("fifth-description");


const sixthRowRequest = document.getElementById("sixth-row-request");
const sixthRowRequestCell1 = document.getElementById("sixth-row-request-cell-1");
const sixthRowRequestCell2 = document.getElementById("sixth-row-request-cell-2");
const sixthRowRequestCell3 = document.getElementById("sixth-row-request-cell-3");

const sixthName = document.getElementById("sixth-name");
const sixthPhone = document.getElementById("sixth-phone");
const sixthDescription = document.getElementById("sixth-description");

let requestsTableValue = [];
let selectedRow = -1;
let selectedRowRequest = -1;
let request = {};


const requestsDialog = document.querySelector('#requestsDialog');
document.querySelector('#openRequestsDialog').onclick = () => {
  requestsDialog.style.display = 'flex';
  requestsDialog.show();
}
document.querySelector('#requestsDialogClose').onclick = () => {
  requestsDialog.style.display = null;
  requestsDialog.close();
}
document.querySelector('#requestsSelectDialogClose').onclick = () => {
  request = requestsTableValue[selectedRowRequest]
  pageElements.appointmentForm.patient.value = request.name
  requestsDialog.style.display = null;
  requestsDialog.close();
}

initAppointmentsCreate();

get("requests").then(data => {
  requestsTableValue = data
  updateRequestTable()
})
  .catch((error) => {
    console.error('Error:', error);
  });

const updateRequestTable = () => {
  if (requestsTableValue[0]) {
    firstName.textContent = requestsTableValue[0].name
    firstPhone.textContent = requestsTableValue[0].phone
    firstDescription.textContent = requestsTableValue[0].description
  } else {
    firstName.textContent = ''
    firstPhone.textContent = ''
    firstDescription.textContent = ''
  }

  if (requestsTableValue[1]) {
    secondName.textContent = requestsTableValue[1].name
    secondPhone.textContent = requestsTableValue[1].phone
    secondDescription.textContent = requestsTableValue[1].description
  } else {
    secondName.textContent = ''
    secondPhone.textContent = ''
    secondDescription.textContent = ''
  }

  if (requestsTableValue[2]) {
    thirdName.textContent = requestsTableValue[2].name
    thirdPhone.textContent = requestsTableValue[2].phone
    thirdDescription.textContent = requestsTableValue[2].description
  } else {
    thirdName.textContent = ''
    thirdPhone.textContent = ''
    thirdDescription.textContent = ''
  }

  if (requestsTableValue[3]) {
    fourthName.textContent = requestsTableValue[3].name
    fourthPhone.textContent = requestsTableValue[3].phone
    fourthDescription.textContent = requestsTableValue[3].description
  } else {
    fourthName.textContent = ''
    fourthPhone.textContent = ''
    fourthDescription.textContent = ''
  }

  if (requestsTableValue[4]) {
    fifthName.textContent = requestsTableValue[4].name
    fifthPhone.textContent = requestsTableValue[4].phone
    fifthDescription.textContent = requestsTableValue[4].description
  } else {
    fifthName.textContent = ''
    fifthPhone.textContent = ''
    fifthDescription.textContent = ''
  }

  if (requestsTableValue[5]) {
    sixthName.textContent = requestsTableValue[5].name
    sixthPhone.textContent = requestsTableValue[5].phone
    sixthDescription.textContent = requestsTableValue[5].description
  } else {
    sixthName.textContent = ''
    sixthPhone.textContent = ''
    sixthDescription.textContent = ''
  }
}

pageElements.firstRow.addEventListener("click", (e) => {
  if (selectedRow !== 0) {
    changeClassRows([
      pageElements.firstRowCell1,
      pageElements.firstRowCell2
    ], "cell-recording", "cell-recording-selected")

    changeClassRows([
      pageElements.secondRowCell1,
      pageElements.secondRowCell2,
      pageElements.thirdRowCell1,
      pageElements.thirdRowCell2,
      pageElements.fourthRowCell1,
      pageElements.fourthRowCell2
    ], "cell-recording-selected", "cell-recording")

    selectedRow = 0;
  } else {
    changeClassRows([
      pageElements.firstRowCell1,
      pageElements.firstRowCell2
    ], "cell-recording-selected", "cell-recording")

    selectedRow = -1;
  }
})

pageElements.secondRow.addEventListener("click", (e) => {
  if (selectedRow !== 1) {
    changeClassRows([
      pageElements.secondRowCell1,
      pageElements.secondRowCell2
    ], "cell-recording", "cell-recording-selected")

    changeClassRows([
      pageElements.firstRowCell1,
      pageElements.firstRowCell2,
      pageElements.thirdRowCell1,
      pageElements.thirdRowCell2,
      pageElements.fourthRowCell1,
      pageElements.fourthRowCell2
    ], "cell-recording-selected", "cell-recording")

    selectedRow = 1;
  } else {
    changeClassRows([
      pageElements.secondRowCell1,
      pageElements.secondRowCell2
    ], "cell-recording-selected", "cell-recording")

    selectedRow = -1;
  }
})

pageElements.thirdRow.addEventListener("click", (e) => {
  if (selectedRow !== 2) {
    changeClassRows([
      pageElements.thirdRowCell1,
      pageElements.thirdRowCell2
    ], "cell-recording", "cell-recording-selected")

    changeClassRows([
      pageElements.firstRowCell1,
      pageElements.firstRowCell2,
      pageElements.secondRowCell1,
      pageElements.secondRowCell2,
      pageElements.fourthRowCell1,
      pageElements.fourthRowCell2
    ], "cell-recording-selected", "cell-recording")

    selectedRow = 2;
  } else {
    changeClassRows([
      pageElements.thirdRowCell1,
      pageElements.thirdRowCell2
    ], "cell-recording-selected", "cell-recording")

    selectedRow = -1;
  }
})

pageElements.fourthRow.addEventListener("click", (e) => {
  if (selectedRow !== 3) {
    changeClassRows([
      pageElements.fourthRowCell1,
      pageElements.fourthRowCell2
    ], "cell-recording", "cell-recording-selected")

    changeClassRows([
      pageElements.firstRowCell1,
      pageElements.firstRowCell2,
      pageElements.secondRowCell1,
      pageElements.secondRowCell2,
      pageElements.thirdRowCell1,
      pageElements.thirdRowCell2
    ], "cell-recording-selected", "cell-recording")

    selectedRow = 3;
  } else {
    changeClassRows([
      pageElements.fourthRowCell1,
      pageElements.fourthRowCell2
    ], "cell-recording-selected", "cell-recording")

    selectedRow = -1;
  }
})

firstRowRequest.addEventListener("click", (e) => {
  if (selectedRowRequest !== 0) {
    changeClassRows([
      firstRowRequestCell1,
      firstRowRequestCell2,
      firstRowRequestCell3
    ], "cell", "cell-selected");

    changeClassRows([
      secondRowRequestCell1,
      secondRowRequestCell2,
      secondRowRequestCell3,
      thirdRowRequestCell1,
      thirdRowRequestCell2,
      thirdRowRequestCell3,
      fourthRowRequestCell1,
      fourthRowRequestCell2,
      fourthRowRequestCell3,
      fifthRowRequestCell1,
      fifthRowRequestCell2,
      fifthRowRequestCell3,
      sixthRowRequestCell1,
      sixthRowRequestCell2,
      sixthRowRequestCell3
    ], "cell-selected", "cell");

    selectedRowRequest = 0;
  } else {
    changeClassRows([
      firstRowRequestCell1,
      firstRowRequestCell2,
      firstRowRequestCell3
    ], "cell-selected", "cell");

    selectedRowRequest = -1;
  }
})

secondRowRequest.addEventListener("click", (e) => {
  if (selectedRowRequest !== 1) {
    changeClassRows([
      secondRowRequestCell1,
      secondRowRequestCell2,
      secondRowRequestCell3
    ], "cell", "cell-selected");

    changeClassRows([
      firstRowRequestCell1,
      firstRowRequestCell2,
      firstRowRequestCell3,
      thirdRowRequestCell1,
      thirdRowRequestCell2,
      thirdRowRequestCell3,
      fourthRowRequestCell1,
      fourthRowRequestCell2,
      fourthRowRequestCell3,
      fifthRowRequestCell1,
      fifthRowRequestCell2,
      fifthRowRequestCell3,
      sixthRowRequestCell1,
      sixthRowRequestCell2,
      sixthRowRequestCell3
    ], "cell-selected", "cell");

    selectedRowRequest = 1;
  } else {
    changeClassRows([
      secondRowRequestCell1,
      secondRowRequestCell2,
      secondRowRequestCell3
    ], "cell-selected", "cell");
    selectedRowRequest = -1;
  }
})

thirdRowRequest.addEventListener("click", (e) => {
  if (selectedRowRequest !== 2) {
    changeClassRows([
      thirdRowRequestCell1,
      thirdRowRequestCell2,
      thirdRowRequestCell3
    ], "cell", "cell-selected");

    changeClassRows([
      firstRowRequestCell1,
      firstRowRequestCell2,
      firstRowRequestCell3,
      secondRowRequestCell1,
      secondRowRequestCell2,
      secondRowRequestCell3,
      fourthRowRequestCell1,
      fourthRowRequestCell2,
      fourthRowRequestCell3,
      fifthRowRequestCell1,
      fifthRowRequestCell2,
      fifthRowRequestCell3,
      sixthRowRequestCell1,
      sixthRowRequestCell2,
      sixthRowRequestCell3
    ], "cell-selected", "cell");

    selectedRowRequest = 2;
  } else {
    changeClassRows([
      thirdRowRequestCell1,
      thirdRowRequestCell2,
      thirdRowRequestCell3
    ], "cell-selected", "cell");
    selectedRowRequest = -1;
  }
})

fourthRowRequest.addEventListener("click", (e) => {
  if (selectedRowRequest !== 3) {
    changeClassRows([
      fourthRowRequestCell1,
      fourthRowRequestCell2,
      fourthRowRequestCell3
    ], "cell", "cell-selected");

    changeClassRows([
      firstRowRequestCell1,
      firstRowRequestCell2,
      firstRowRequestCell3,
      secondRowRequestCell1,
      secondRowRequestCell2,
      secondRowRequestCell3,
      thirdRowRequestCell1,
      thirdRowRequestCell2,
      thirdRowRequestCell3,
      fifthRowRequestCell1,
      fifthRowRequestCell2,
      fifthRowRequestCell3,
      sixthRowRequestCell1,
      sixthRowRequestCell2,
      sixthRowRequestCell3
    ], "cell-selected", "cell");

    selectedRowRequest = 3;
  } else {
    changeClassRows([
      fourthRowRequestCell1,
      fourthRowRequestCell2,
      fourthRowRequestCell3
    ], "cell-selected", "cell");
    selectedRowRequest = -1;
  }
})

fifthRowRequest.addEventListener("click", (e) => {
  if (selectedRowRequest !== 4) {
    changeClassRows([
      fifthRowRequestCell1,
      fifthRowRequestCell2,
      fifthRowRequestCell3
    ], "cell", "cell-selected");

    changeClassRows([
      firstRowRequestCell1,
      firstRowRequestCell2,
      firstRowRequestCell3,
      secondRowRequestCell1,
      secondRowRequestCell2,
      secondRowRequestCell3,
      thirdRowRequestCell1,
      thirdRowRequestCell2,
      thirdRowRequestCell3,
      fourthRowRequestCell1,
      fourthRowRequestCell2,
      fourthRowRequestCell3,
      sixthRowRequestCell1,
      sixthRowRequestCell2,
      sixthRowRequestCell3
    ], "cell-selected", "cell");

    selectedRowRequest = 4;
  } else {
    changeClassRows([
      fifthRowRequestCell1,
      fifthRowRequestCell2,
      fifthRowRequestCell3
    ], "cell-selected", "cell");
    selectedRowRequest = -1;
  }
})

sixthRowRequest.addEventListener("click", (e) => {
  if (selectedRowRequest !== 5) {
    changeClassRows([
      sixthRowRequestCell1,
      sixthRowRequestCell2,
      sixthRowRequestCell3
    ], "cell", "cell-selected");

    changeClassRows([
      firstRowRequestCell1,
      firstRowRequestCell2,
      firstRowRequestCell3,
      secondRowRequestCell1,
      secondRowRequestCell2,
      secondRowRequestCell3,
      thirdRowRequestCell1,
      thirdRowRequestCell2,
      thirdRowRequestCell3,
      fourthRowRequestCell1,
      fourthRowRequestCell2,
      fourthRowRequestCell3,
      fifthRowRequestCell1,
      fifthRowRequestCell2,
      fifthRowRequestCell3
    ], "cell-selected", "cell");

    selectedRowRequest = 5;
  } else {
    changeClassRows([
      sixthRowRequestCell1,
      sixthRowRequestCell2,
      sixthRowRequestCell3
    ], "cell-selected", "cell");
    selectedRowRequest = -1;
  }
})

pageElements.recordButton.addEventListener("click", (e) => {
  e.preventDefault();
  const date = pageElements.appointmentForm.date.value;
  const datetime = pageElements.appointmentForm.datetime.value;

  if (selectedRow >= 0) {
    const appointmentBody = new AppointmentBodyAdmin(
      request.id,
      date,
      datetime,
      request.description,
      filteredDoctorsTableValue[selectedRow][`doctor-id`]
  )

    postWithoutResponse("appointments/create/admin", appointmentBody).then(data => {
      alert("Пациент успешно записан на прием")
      location.assign('/admin/record/list');
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
})
