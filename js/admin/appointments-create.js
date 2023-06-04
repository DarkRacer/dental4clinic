const url ='https://localhost:8000/';
var token = GetCookie("access_token")
const headers = {
  "Host": "localhost:8000",
  "Origin": "https://localhost:8000",
  "Accept": "*/*"
}

const doctorField = document.getElementById("doctor-field");
const serviceField = document.getElementById("service-field");

const firstDoctor = document.getElementById("first-doctor");
const firstServices = document.getElementById("first-services");
const secondDoctor = document.getElementById("second-doctor");
const secondServices = document.getElementById("second-services");
const thirdDoctor = document.getElementById("third-doctor");
const thirdServices = document.getElementById("third-services");
const fourthDoctor = document.getElementById("fourth-doctor");
const fourthServices = document.getElementById("fourth-services");

const firstRow = document.getElementById("first-row");
const firstRowCell1 = document.getElementById("first-row-cell-1");
const firstRowCell2 = document.getElementById("first-row-cell-2");

const secondRow = document.getElementById("second-row");
const secondRowCell1 = document.getElementById("second-row-cell-1");
const secondRowCell2 = document.getElementById("second-row-cell-2");

const thirdRow = document.getElementById("third-row");
const thirdRowCell1 = document.getElementById("third-row-cell-1");
const thirdRowCell2 = document.getElementById("third-row-cell-2");

const fourthRow = document.getElementById("fourth-row");
const fourthRowCell1 = document.getElementById("fourth-row-cell-1");
const fourthRowCell2 = document.getElementById("fourth-row-cell-2");

const appointmentForm = document.getElementById("appointment-form");
const recordButton = document.getElementById("record-button");


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

let doctorValue = "";
let serviceValue = "";
let doctorsTableValue = [];
let requestsTableValue = [];
let filteredDoctorsTableValue = [];
let selectedRow = -1;
let selectedRowRequest = -1;
let request = {};


var requestsDialog = document.querySelector('#requestsDialog');
document.querySelector('#openRequestsDialog').onclick = function() {
  requestsDialog.show();
}
document.querySelector('#requestsDialogClose').onclick = function() {
  requestsDialog.close();
}
document.querySelector('#requestsSelectDialogClose').onclick = function() {
  request = requestsTableValue[selectedRowRequest]
  appointmentForm.patient.value = request.name
  requestsDialog.close();
}

doctorField.addEventListener("input", (e) => {
  doctorValue = e.target.value
  findDoctors()
})

serviceField.addEventListener("input", (e) => {
  serviceValue = e.target.value
  findDoctors()
})

GetUrl("doctors/services").then(data => {
  doctorsTableValue = data
  filteredDoctorsTableValue = doctorsTableValue
  updateDoctorTable()
})
  .catch((error) => {
    console.error('Error:', error);
  });

GetUrl("requests").then(data => {
  requestsTableValue = data
  updateRequestTable()
})
  .catch((error) => {
    console.error('Error:', error);
  });


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
    firstDoctor.textContent = filteredDoctorsTableValue[0].doctor
    firstServices.textContent = filteredDoctorsTableValue[0].services
  } else {
    firstDoctor.textContent = ''
    firstServices.textContent = ''
  }

  if (filteredDoctorsTableValue[1]) {
    secondDoctor.textContent = filteredDoctorsTableValue[1].doctor
    secondServices.textContent = filteredDoctorsTableValue[1].services
  } else {
    secondDoctor.textContent = ''
    secondServices.textContent = ''
  }

  if (filteredDoctorsTableValue[2]) {
    thirdDoctor.textContent = filteredDoctorsTableValue[2].doctor
    thirdServices.textContent = filteredDoctorsTableValue[2].services
  } else {
    thirdDoctor.textContent = ''
    thirdServices.textContent = ''
  }

  if (filteredDoctorsTableValue[3]) {
    fourthDoctor.textContent = filteredDoctorsTableValue[3].doctor
    fourthServices.textContent = filteredDoctorsTableValue[3].services
  } else {
    fourthDoctor.textContent = ''
    fourthServices.textContent = ''
  }
}

function updateRequestTable() {
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
firstRow.addEventListener("click", (e) => {
  if (selectedRow !== 0) {
    firstRowCell1.classList.remove("cell-recording")
    firstRowCell1.classList.add("cell-recording-selected")
    firstRowCell2.classList.remove("cell-recording")
    firstRowCell2.classList.add("cell-recording-selected")

    secondRowCell1.classList.remove("cell-recording-selected")
    secondRowCell1.classList.add("cell-recording")
    secondRowCell2.classList.remove("cell-recording-selected")
    secondRowCell2.classList.add("cell-recording")

    thirdRowCell1.classList.remove("cell-recording-selected")
    thirdRowCell1.classList.add("cell-recording")
    thirdRowCell2.classList.remove("cell-recording-selected")
    thirdRowCell2.classList.add("cell-recording")

    fourthRowCell1.classList.remove("cell-recording-selected")
    fourthRowCell1.classList.add("cell-recording")
    fourthRowCell2.classList.remove("cell-recording-selected")
    fourthRowCell2.classList.add("cell-recording")

    selectedRow = 0;
  } else {
    firstRowCell1.classList.remove("cell-recording-selected")
    firstRowCell1.classList.add("cell-recording")
    firstRowCell2.classList.remove("cell-recording-selected")
    firstRowCell2.classList.add("cell-recording")
    selectedRow = -1;
  }
})

secondRow.addEventListener("click", (e) => {
  if (selectedRow !== 1) {
    secondRowCell1.classList.remove("cell-recording")
    secondRowCell1.classList.add("cell-recording-selected")
    secondRowCell2.classList.remove("cell-recording")
    secondRowCell2.classList.add("cell-recording-selected")

    firstRowCell1.classList.remove("cell-recording-selected")
    firstRowCell1.classList.add("cell-recording")
    firstRowCell2.classList.remove("cell-recording-selected")
    firstRowCell2.classList.add("cell-recording")

    thirdRowCell1.classList.remove("cell-recording-selected")
    thirdRowCell1.classList.add("cell-recording")
    thirdRowCell2.classList.remove("cell-recording-selected")
    thirdRowCell2.classList.add("cell-recording")

    fourthRowCell1.classList.remove("cell-recording-selected")
    fourthRowCell1.classList.add("cell-recording")
    fourthRowCell2.classList.remove("cell-recording-selected")
    fourthRowCell2.classList.add("cell-recording")

    selectedRow = 1;
  } else {
    secondRowCell1.classList.remove("cell-recording-selected")
    secondRowCell1.classList.add("cell-recording")
    secondRowCell2.classList.remove("cell-recording-selected")
    secondRowCell2.classList.add("cell-recording")
    selectedRow = -1;
  }
})

thirdRow.addEventListener("click", (e) => {
  if (selectedRow !== 2) {
    thirdRowCell1.classList.remove("cell-recording")
    thirdRowCell1.classList.add("cell-recording-selected")
    thirdRowCell2.classList.remove("cell-recording")
    thirdRowCell2.classList.add("cell-recording-selected")

    firstRowCell1.classList.remove("cell-recording-selected")
    firstRowCell1.classList.add("cell-recording")
    firstRowCell2.classList.remove("cell-recording-selected")
    firstRowCell2.classList.add("cell-recording")

    secondRowCell1.classList.remove("cell-recording-selected")
    secondRowCell1.classList.add("cell-recording")
    secondRowCell2.classList.remove("cell-recording-selected")
    secondRowCell2.classList.add("cell-recording")

    fourthRowCell1.classList.remove("cell-recording-selected")
    fourthRowCell1.classList.add("cell-recording")
    fourthRowCell2.classList.remove("cell-recording-selected")
    fourthRowCell2.classList.add("cell-recording")

    selectedRow = 2;
  } else {
    thirdRowCell1.classList.remove("cell-recording-selected")
    thirdRowCell1.classList.add("cell-recording")
    thirdRowCell2.classList.remove("cell-recording-selected")
    thirdRowCell2.classList.add("cell-recording")
    selectedRow = -1;
  }
})

fourthRow.addEventListener("click", (e) => {
  if (selectedRow !== 3) {
    fourthRowCell1.classList.remove("cell-recording")
    fourthRowCell1.classList.add("cell-recording-selected")
    fourthRowCell2.classList.remove("cell-recording")
    fourthRowCell2.classList.add("cell-recording-selected")

    firstRowCell1.classList.remove("cell-recording-selected")
    firstRowCell1.classList.add("cell-recording")
    firstRowCell2.classList.remove("cell-recording-selected")
    firstRowCell2.classList.add("cell-recording")

    secondRowCell1.classList.remove("cell-recording-selected")
    secondRowCell1.classList.add("cell-recording")
    secondRowCell2.classList.remove("cell-recording-selected")
    secondRowCell2.classList.add("cell-recording")

    thirdRowCell1.classList.remove("cell-recording-selected")
    thirdRowCell1.classList.add("cell-recording")
    thirdRowCell2.classList.remove("cell-recording-selected")
    thirdRowCell2.classList.add("cell-recording")

    selectedRow = 3;
  } else {
    fourthRowCell1.classList.remove("cell-recording-selected")
    fourthRowCell1.classList.add("cell-recording")
    fourthRowCell2.classList.remove("cell-recording-selected")
    fourthRowCell2.classList.add("cell-recording")
    selectedRow = -1;
  }
})

firstRowRequest.addEventListener("click", (e) => {
  if (selectedRowRequest !== 0) {
    firstRowRequestCell1.classList.remove("cell")
    firstRowRequestCell1.classList.add("cell-selected")
    firstRowRequestCell2.classList.remove("cell")
    firstRowRequestCell2.classList.add("cell-selected")
    firstRowRequestCell3.classList.remove("cell")
    firstRowRequestCell3.classList.add("cell-selected")

    secondRowRequestCell1.classList.remove("cell-selected")
    secondRowRequestCell1.classList.add("cell")
    secondRowRequestCell2.classList.remove("cell-selected")
    secondRowRequestCell2.classList.add("cell")
    secondRowRequestCell3.classList.remove("cell-selected")
    secondRowRequestCell3.classList.add("cell")

    thirdRowRequestCell1.classList.remove("cell-selected")
    thirdRowRequestCell1.classList.add("cell")
    thirdRowRequestCell2.classList.remove("cell-selected")
    thirdRowRequestCell2.classList.add("cell")
    thirdRowRequestCell3.classList.remove("cell-selected")
    thirdRowRequestCell3.classList.add("cell")

    fourthRowRequestCell1.classList.remove("cell-selected")
    fourthRowRequestCell1.classList.add("cell")
    fourthRowRequestCell2.classList.remove("cell-selected")
    fourthRowRequestCell2.classList.add("cell")
    fourthRowRequestCell3.classList.remove("cell-selected")
    fourthRowRequestCell3.classList.add("cell")

    fifthRowRequestCell1.classList.remove("cell-selected")
    fifthRowRequestCell1.classList.add("cell")
    fifthRowRequestCell2.classList.remove("cell-selected")
    fifthRowRequestCell2.classList.add("cell")
    fifthRowRequestCell3.classList.remove("cell-selected")
    fifthRowRequestCell3.classList.add("cell")

    sixthRowRequestCell1.classList.remove("cell-selected")
    sixthRowRequestCell1.classList.add("cell")
    sixthRowRequestCell2.classList.remove("cell-selected")
    sixthRowRequestCell2.classList.add("cell")
    sixthRowRequestCell3.classList.remove("cell-selected")
    sixthRowRequestCell3.classList.add("cell")

    selectedRowRequest = 0;
  } else {
    firstRowRequestCell1.classList.remove("cell-selected")
    firstRowRequestCell1.classList.add("cell")
    firstRowRequestCell2.classList.remove("cell-selected")
    firstRowRequestCell2.classList.add("cell")
    firstRowRequestCell3.classList.remove("cell-selected")
    firstRowRequestCell3.classList.add("cell")
    selectedRowRequest = -1;
  }
})

secondRowRequest.addEventListener("click", (e) => {
  if (selectedRowRequest !== 1) {
    secondRowRequestCell1.classList.remove("cell")
    secondRowRequestCell1.classList.add("cell-selected")
    secondRowRequestCell2.classList.remove("cell")
    secondRowRequestCell2.classList.add("cell-selected")
    secondRowRequestCell3.classList.remove("cell")
    secondRowRequestCell3.classList.add("cell-selected")

    firstRowRequestCell1.classList.remove("cell-selected")
    firstRowRequestCell1.classList.add("cell")
    firstRowRequestCell2.classList.remove("cell-selected")
    firstRowRequestCell2.classList.add("cell")
    firstRowRequestCell3.classList.remove("cell-selected")
    firstRowRequestCell3.classList.add("cell")

    thirdRowRequestCell1.classList.remove("cell-selected")
    thirdRowRequestCell1.classList.add("cell")
    thirdRowRequestCell2.classList.remove("cell-selected")
    thirdRowRequestCell2.classList.add("cell")
    thirdRowRequestCell3.classList.remove("cell-selected")
    thirdRowRequestCell3.classList.add("cell")

    fourthRowRequestCell1.classList.remove("cell-selected")
    fourthRowRequestCell1.classList.add("cell")
    fourthRowRequestCell2.classList.remove("cell-selected")
    fourthRowRequestCell2.classList.add("cell")
    fourthRowRequestCell3.classList.remove("cell-selected")
    fourthRowRequestCell3.classList.add("cell")

    fifthRowRequestCell1.classList.remove("cell-selected")
    fifthRowRequestCell1.classList.add("cell")
    fifthRowRequestCell2.classList.remove("cell-selected")
    fifthRowRequestCell2.classList.add("cell")
    fifthRowRequestCell3.classList.remove("cell-selected")
    fifthRowRequestCell3.classList.add("cell")

    sixthRowRequestCell1.classList.remove("cell-selected")
    sixthRowRequestCell1.classList.add("cell")
    sixthRowRequestCell2.classList.remove("cell-selected")
    sixthRowRequestCell2.classList.add("cell")
    sixthRowRequestCell3.classList.remove("cell-selected")
    sixthRowRequestCell3.classList.add("cell")

    selectedRowRequest = 1;
  } else {
    secondRowRequestCell1.classList.remove("cell-selected")
    secondRowRequestCell1.classList.add("cell")
    secondRowRequestCell2.classList.remove("cell-selected")
    secondRowRequestCell2.classList.add("cell")
    secondRowRequestCell3.classList.remove("cell-selected")
    secondRowRequestCell3.classList.add("cell")
    selectedRowRequest = -1;
  }
})

thirdRowRequest.addEventListener("click", (e) => {
  if (selectedRowRequest !== 2) {
    thirdRowRequestCell1.classList.remove("cell")
    thirdRowRequestCell1.classList.add("cell-selected")
    thirdRowRequestCell2.classList.remove("cell")
    thirdRowRequestCell2.classList.add("cell-selected")
    thirdRowRequestCell3.classList.remove("cell")
    thirdRowRequestCell3.classList.add("cell-selected")

    secondRowRequestCell1.classList.remove("cell-selected")
    secondRowRequestCell1.classList.add("cell")
    secondRowRequestCell2.classList.remove("cell-selected")
    secondRowRequestCell2.classList.add("cell")
    secondRowRequestCell3.classList.remove("cell-selected")
    secondRowRequestCell3.classList.add("cell")

    firstRowRequestCell1.classList.remove("cell-selected")
    firstRowRequestCell1.classList.add("cell")
    firstRowRequestCell2.classList.remove("cell-selected")
    firstRowRequestCell2.classList.add("cell")
    firstRowRequestCell3.classList.remove("cell-selected")
    firstRowRequestCell3.classList.add("cell")

    fourthRowRequestCell1.classList.remove("cell-selected")
    fourthRowRequestCell1.classList.add("cell")
    fourthRowRequestCell2.classList.remove("cell-selected")
    fourthRowRequestCell2.classList.add("cell")
    fourthRowRequestCell3.classList.remove("cell-selected")
    fourthRowRequestCell3.classList.add("cell")

    fifthRowRequestCell1.classList.remove("cell-selected")
    fifthRowRequestCell1.classList.add("cell")
    fifthRowRequestCell2.classList.remove("cell-selected")
    fifthRowRequestCell2.classList.add("cell")
    fifthRowRequestCell3.classList.remove("cell-selected")
    fifthRowRequestCell3.classList.add("cell")

    sixthRowRequestCell1.classList.remove("cell-selected")
    sixthRowRequestCell1.classList.add("cell")
    sixthRowRequestCell2.classList.remove("cell-selected")
    sixthRowRequestCell2.classList.add("cell")
    sixthRowRequestCell3.classList.remove("cell-selected")
    sixthRowRequestCell3.classList.add("cell")

    selectedRowRequest = 2;
  } else {
    thirdRowRequestCell1.classList.remove("cell-selected")
    thirdRowRequestCell1.classList.add("cell")
    thirdRowRequestCell2.classList.remove("cell-selected")
    thirdRowRequestCell2.classList.add("cell")
    thirdRowRequestCell3.classList.remove("cell-selected")
    thirdRowRequestCell3.classList.add("cell")
    selectedRowRequest = -1;
  }
})

fourthRowRequest.addEventListener("click", (e) => {
  if (selectedRowRequest !== 3) {
    fourthRowRequestCell1.classList.remove("cell")
    fourthRowRequestCell1.classList.add("cell-selected")
    fourthRowRequestCell2.classList.remove("cell")
    fourthRowRequestCell2.classList.add("cell-selected")
    fourthRowRequestCell3.classList.remove("cell")
    fourthRowRequestCell3.classList.add("cell-selected")

    secondRowRequestCell1.classList.remove("cell-selected")
    secondRowRequestCell1.classList.add("cell")
    secondRowRequestCell2.classList.remove("cell-selected")
    secondRowRequestCell2.classList.add("cell")
    secondRowRequestCell3.classList.remove("cell-selected")
    secondRowRequestCell3.classList.add("cell")

    thirdRowRequestCell1.classList.remove("cell-selected")
    thirdRowRequestCell1.classList.add("cell")
    thirdRowRequestCell2.classList.remove("cell-selected")
    thirdRowRequestCell2.classList.add("cell")
    thirdRowRequestCell3.classList.remove("cell-selected")
    thirdRowRequestCell3.classList.add("cell")

    firstRowRequestCell1.classList.remove("cell-selected")
    firstRowRequestCell1.classList.add("cell")
    firstRowRequestCell2.classList.remove("cell-selected")
    firstRowRequestCell2.classList.add("cell")
    firstRowRequestCell3.classList.remove("cell-selected")
    firstRowRequestCell3.classList.add("cell")

    fifthRowRequestCell1.classList.remove("cell-selected")
    fifthRowRequestCell1.classList.add("cell")
    fifthRowRequestCell2.classList.remove("cell-selected")
    fifthRowRequestCell2.classList.add("cell")
    fifthRowRequestCell3.classList.remove("cell-selected")
    fifthRowRequestCell3.classList.add("cell")

    sixthRowRequestCell1.classList.remove("cell-selected")
    sixthRowRequestCell1.classList.add("cell")
    sixthRowRequestCell2.classList.remove("cell-selected")
    sixthRowRequestCell2.classList.add("cell")
    sixthRowRequestCell3.classList.remove("cell-selected")
    sixthRowRequestCell3.classList.add("cell")

    selectedRowRequest = 3;
  } else {
    fourthRowRequestCell1.classList.remove("cell-selected")
    fourthRowRequestCell1.classList.add("cell")
    fourthRowRequestCell2.classList.remove("cell-selected")
    fourthRowRequestCell2.classList.add("cell")
    fourthRowRequestCell3.classList.remove("cell-selected")
    fourthRowRequestCell3.classList.add("cell")
    selectedRowRequest = -1;
  }
})

fifthRowRequest.addEventListener("click", (e) => {
  if (selectedRowRequest !== 4) {
    fifthRowRequestCell1.classList.remove("cell")
    fifthRowRequestCell1.classList.add("cell-selected")
    fifthRowRequestCell2.classList.remove("cell")
    fifthRowRequestCell2.classList.add("cell-selected")
    fifthRowRequestCell3.classList.remove("cell")
    fifthRowRequestCell3.classList.add("cell-selected")

    secondRowRequestCell1.classList.remove("cell-selected")
    secondRowRequestCell1.classList.add("cell")
    secondRowRequestCell2.classList.remove("cell-selected")
    secondRowRequestCell2.classList.add("cell")
    secondRowRequestCell3.classList.remove("cell-selected")
    secondRowRequestCell3.classList.add("cell")

    thirdRowRequestCell1.classList.remove("cell-selected")
    thirdRowRequestCell1.classList.add("cell")
    thirdRowRequestCell2.classList.remove("cell-selected")
    thirdRowRequestCell2.classList.add("cell")
    thirdRowRequestCell3.classList.remove("cell-selected")
    thirdRowRequestCell3.classList.add("cell")

    fourthRowRequestCell1.classList.remove("cell-selected")
    fourthRowRequestCell1.classList.add("cell")
    fourthRowRequestCell2.classList.remove("cell-selected")
    fourthRowRequestCell2.classList.add("cell")
    fourthRowRequestCell3.classList.remove("cell-selected")
    fourthRowRequestCell3.classList.add("cell")

    firstRowRequestCell1.classList.remove("cell-selected")
    firstRowRequestCell1.classList.add("cell")
    firstRowRequestCell2.classList.remove("cell-selected")
    firstRowRequestCell2.classList.add("cell")
    firstRowRequestCell3.classList.remove("cell-selected")
    firstRowRequestCell3.classList.add("cell")

    sixthRowRequestCell1.classList.remove("cell-selected")
    sixthRowRequestCell1.classList.add("cell")
    sixthRowRequestCell2.classList.remove("cell-selected")
    sixthRowRequestCell2.classList.add("cell")
    sixthRowRequestCell3.classList.remove("cell-selected")
    sixthRowRequestCell3.classList.add("cell")

    selectedRowRequest = 4;
  } else {
    fifthRowRequestCell1.classList.remove("cell-selected")
    fifthRowRequestCell1.classList.add("cell")
    fifthRowRequestCell2.classList.remove("cell-selected")
    fifthRowRequestCell2.classList.add("cell")
    fifthRowRequestCell3.classList.remove("cell-selected")
    fifthRowRequestCell3.classList.add("cell")
    selectedRowRequest = -1;
  }
})

sixthRowRequest.addEventListener("click", (e) => {
  if (selectedRowRequest !== 5) {
    sixthRowRequestCell1.classList.remove("cell")
    sixthRowRequestCell1.classList.add("cell-selected")
    sixthRowRequestCell2.classList.remove("cell")
    sixthRowRequestCell2.classList.add("cell-selected")
    sixthRowRequestCell3.classList.remove("cell")
    sixthRowRequestCell3.classList.add("cell-selected")

    secondRowRequestCell1.classList.remove("cell-selected")
    secondRowRequestCell1.classList.add("cell")
    secondRowRequestCell2.classList.remove("cell-selected")
    secondRowRequestCell2.classList.add("cell")
    secondRowRequestCell3.classList.remove("cell-selected")
    secondRowRequestCell3.classList.add("cell")

    thirdRowRequestCell1.classList.remove("cell-selected")
    thirdRowRequestCell1.classList.add("cell")
    thirdRowRequestCell2.classList.remove("cell-selected")
    thirdRowRequestCell2.classList.add("cell")
    thirdRowRequestCell3.classList.remove("cell-selected")
    thirdRowRequestCell3.classList.add("cell")

    fourthRowRequestCell1.classList.remove("cell-selected")
    fourthRowRequestCell1.classList.add("cell")
    fourthRowRequestCell2.classList.remove("cell-selected")
    fourthRowRequestCell2.classList.add("cell")
    fourthRowRequestCell3.classList.remove("cell-selected")
    fourthRowRequestCell3.classList.add("cell")

    fifthRowRequestCell1.classList.remove("cell-selected")
    fifthRowRequestCell1.classList.add("cell")
    fifthRowRequestCell2.classList.remove("cell-selected")
    fifthRowRequestCell2.classList.add("cell")
    fifthRowRequestCell3.classList.remove("cell-selected")
    fifthRowRequestCell3.classList.add("cell")

    firstRowRequestCell1.classList.remove("cell-selected")
    firstRowRequestCell1.classList.add("cell")
    firstRowRequestCell2.classList.remove("cell-selected")
    firstRowRequestCell2.classList.add("cell")
    firstRowRequestCell3.classList.remove("cell-selected")
    firstRowRequestCell3.classList.add("cell")

    selectedRowRequest = 5;
  } else {
    sixthRowRequestCell1.classList.remove("cell-selected")
    sixthRowRequestCell1.classList.add("cell")
    sixthRowRequestCell2.classList.remove("cell-selected")
    sixthRowRequestCell2.classList.add("cell")
    sixthRowRequestCell3.classList.remove("cell-selected")
    sixthRowRequestCell3.classList.add("cell")
    selectedRowRequest = -1;
  }
})

recordButton.addEventListener("click", (e) => {
  e.preventDefault();
  const date = appointmentForm.date.value;
  const datetime = appointmentForm.datetime.value;

  if (selectedRow >= 0) {
    const appointmentBody = {
      requestId: request.id,
      date: date,
      datetime: datetime,
      doctorId: filteredDoctorsTableValue[selectedRow][`doctor-id`]
    }
    console.log(appointmentBody)

    PostUrl("appointments/create/admin", appointmentBody).then(data => {
      alert("Пациент успешно записан на прием")
      location.assign('/admin/record/list');
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
})

function GetCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function GetUrl(getUrl) {
  console.log("get " + getUrl);
  return fetch(url + getUrl, {
    method: 'GET',
    headers: headers
  })
    .then(response => response.json())
}

function PostUrl(postUrl, body) {
  console.log("get " + postUrl);
  return fetch(url + postUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
    .then(response => response)
}
