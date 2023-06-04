const url ='https://localhost:8000/';
var token = GetCookie("access_token")
const headers = {
  "Host": "localhost:8000",
  "Origin": "https://localhost:8000",
  "Accept": "*/*"
}
var userId = 2;


let left8Up = document.getElementById("left8Up");
let left8Down = document.getElementById("left8Down");
let right1Up = document.getElementById("right1Up");
let right1Down = document.getElementById("right1Down");
let left7Up = document.getElementById("left7Up");
let left7Down = document.getElementById("left7Down");
let right2Up = document.getElementById("right2Up");
let right2Down = document.getElementById("right2Down");
let left6Up = document.getElementById("left6Up");
let left6Down = document.getElementById("left6Down");
let right3Up = document.getElementById("right3Up");
let right3Down = document.getElementById("right3Down");
let left5Up = document.getElementById("left5Up");
let left5Down = document.getElementById("left5Down");
let right4Up = document.getElementById("right4Up");
let right4Down = document.getElementById("right4Down");
let left4Up = document.getElementById("left4Up");
let left4Down = document.getElementById("left4Down");
let right5Up = document.getElementById("right5Up");
let right5Down = document.getElementById("right5Down");
let left3Up = document.getElementById("left3Up");
let left3Down = document.getElementById("left3Down");
let right6Up = document.getElementById("right6Up");
let right6Down = document.getElementById("right6Down");
let left2Up = document.getElementById("left2Up");
let left2Down = document.getElementById("left2Down");
let right7Up = document.getElementById("right7Up");
let right7Down = document.getElementById("right7Down");
let left1Up = document.getElementById("left1Up");
let left1Down = document.getElementById("left1Down");
let right8Up = document.getElementById("right8Up");
let right8Down = document.getElementById("right8Down");


let firstRequestCell1 = document.getElementById("first-request-cell1");
let firstRequestCell2 = document.getElementById("first-request-cell2");
let secondRequestCell1 = document.getElementById("second-request-cell1");
let secondRequestCell2 = document.getElementById("second-request-cell2");
let thirdRequestCell1 = document.getElementById("third-request-cell1");
let thirdRequestCell2 = document.getElementById("third-request-cell2");

let firstRowDiagnosisOfPatient = document.getElementById("firstRowDiagnosisOfPatient")
let firstRowDiagnosisOfPatientCell1 = document.getElementById("firstRowDiagnosisOfPatientCell1")
let firstDiagnosisOfPatientDiagnose = document.getElementById("firstDiagnosisOfPatientDiagnose")
let firstRowDiagnosisOfPatientCell2 = document.getElementById("firstRowDiagnosisOfPatientCell2")
let firstDiagnosisOfPatientDescription = document.getElementById("firstDiagnosisOfPatientDescription")
let firstRowDiagnosisOfPatientCell3 = document.getElementById("firstRowDiagnosisOfPatientCell3")
let firstDiagnosisOfPatientStatus = document.getElementById("firstDiagnosisOfPatientStatus")

let secondRowDiagnosisOfPatient = document.getElementById("secondRowDiagnosisOfPatient")
let secondRowDiagnosisOfPatientCell1 = document.getElementById("secondRowDiagnosisOfPatientCell1")
let secondDiagnosisOfPatientDiagnose = document.getElementById("secondDiagnosisOfPatientDiagnose")
let secondRowDiagnosisOfPatientCell2 = document.getElementById("secondRowDiagnosisOfPatientCell2")
let secondDiagnosisOfPatientDescription = document.getElementById("secondDiagnosisOfPatientDescription")
let secondRowDiagnosisOfPatientCell3 = document.getElementById("secondRowDiagnosisOfPatientCell3")
let secondDiagnosisOfPatientStatus = document.getElementById("secondDiagnosisOfPatientStatus")

let thirdRowDiagnosisOfPatient = document.getElementById("thirdRowDiagnosisOfPatient")
let thirdRowDiagnosisOfPatientCell1 = document.getElementById("thirdRowDiagnosisOfPatientCell1")
let thirdDiagnosisOfPatientDiagnose = document.getElementById("thirdDiagnosisOfPatientDiagnose")
let thirdRowDiagnosisOfPatientCell2 = document.getElementById("thirdRowDiagnosisOfPatientCell2")
let thirdDiagnosisOfPatientDescription = document.getElementById("thirdDiagnosisOfPatientDescription")
let thirdRowDiagnosisOfPatientCell3 = document.getElementById("thirdRowDiagnosisOfPatientCell3")
let thirdDiagnosisOfPatientStatus = document.getElementById("thirdDiagnosisOfPatientStatus")

let fourthRowDiagnosisOfPatient = document.getElementById("fourthRowDiagnosisOfPatient")
let fourthRowDiagnosisOfPatientCell1 = document.getElementById("fourthRowDiagnosisOfPatientCell1")
let fourthDiagnosisOfPatientDiagnose = document.getElementById("fourthDiagnosisOfPatientDiagnose")
let fourthRowDiagnosisOfPatientCell2 = document.getElementById("fourthRowDiagnosisOfPatientCell2")
let fourthDiagnosisOfPatientDescription = document.getElementById("fourthDiagnosisOfPatientDescription")
let fourthRowDiagnosisOfPatientCell3 = document.getElementById("fourthRowDiagnosisOfPatientCell3")
let fourthDiagnosisOfPatientStatus = document.getElementById("fourthDiagnosisOfPatientStatus")

let firstRowDiagnosisFromDoctor = document.getElementById("firstRowDiagnosisFromDoctor")
let firstRowDiagnosisFromDoctorCell1 = document.getElementById("firstRowDiagnosisFromDoctorCell1")
let firstDiagnosisFromDoctorDiagnose = document.getElementById("firstDiagnosisFromDoctorDiagnose")
let firstRowDiagnosisFromDoctorCell2 = document.getElementById("firstRowDiagnosisFromDoctorCell2")
let firstDiagnosisFromDoctorDescription = document.getElementById("firstDiagnosisFromDoctorDescription")

let secondRowDiagnosisFromDoctor = document.getElementById("secondRowDiagnosisFromDoctor")
let secondRowDiagnosisFromDoctorCell1 = document.getElementById("secondRowDiagnosisFromDoctorCell1")
let secondDiagnosisFromDoctorDiagnose = document.getElementById("secondDiagnosisFromDoctorDiagnose")
let secondRowDiagnosisFromDoctorCell2 = document.getElementById("secondRowDiagnosisFromDoctorCell2")
let secondDiagnosisFromDoctorDescription = document.getElementById("secondDiagnosisFromDoctorDescription")

let thirdRowDiagnosisFromDoctor = document.getElementById("thirdRowDiagnosisFromDoctor")
let thirdRowDiagnosisFromDoctorCell1 = document.getElementById("thirdRowDiagnosisFromDoctorCell1")
let thirdDiagnosisFromDoctorDiagnose = document.getElementById("thirdDiagnosisFromDoctorDiagnose")
let thirdRowDiagnosisFromDoctorCell2 = document.getElementById("thirdRowDiagnosisFromDoctorCell2")
let thirdDiagnosisFromDoctorDescription = document.getElementById("thirdDiagnosisFromDoctorDescription")

let fourthRowDiagnosisFromDoctor = document.getElementById("fourthRowDiagnosisFromDoctor")
let fourthRowDiagnosisFromDoctorCell1 = document.getElementById("fourthRowDiagnosisFromDoctorCell1")
let fourthDiagnosisFromDoctorDiagnose = document.getElementById("fourthDiagnosisFromDoctorDiagnose")
let fourthRowDiagnosisFromDoctorCell2 = document.getElementById("fourthRowDiagnosisFromDoctorCell2")
let fourthDiagnosisFromDoctorDescription = document.getElementById("fourthDiagnosisFromDoctorDescription")


let curedButton = document.getElementById("cured-button")
let addDiagnoseButton = document.getElementById("add-diagnose-button")


let toothPictures = document.getElementById("toothPictures");


let firstRowCheckBox = document.getElementById("first");
let secondRowCheckBox = document.getElementById("second");
let thirdRowCheckBox = document.getElementById("third");
let fourthRowCheckBox = document.getElementById("fourth");
let paymentsForm = document.getElementById("paymentsForm");

let firstRowService = document.getElementById("firstRowService")
let firstRowDescription = document.getElementById("firstRowDescription")
let firstRowPrice = document.getElementById("firstRowPrice")

let secondRowService = document.getElementById("secondRowService")
let secondRowDescription = document.getElementById("secondRowDescription")
let secondRowPrice = document.getElementById("secondRowPrice")

let thirdRowService = document.getElementById("thirdRowService")
let thirdRowDescription = document.getElementById("thirdRowDescription")
let thirdRowPrice = document.getElementById("thirdRowPrice")

let fourthRowService = document.getElementById("fourthRowService")
let fourthRowDescription = document.getElementById("fourthRowDescription")
let fourthRowPrice = document.getElementById("fourthRowPrice")


let servicesDone = document.getElementById("services-done")
let cost = document.getElementById("cost")
let paymentButton = document.getElementById("paymentButton")


let nameField = document.getElementById("name");
let dateOfBirthdayField = document.getElementById("dateOfBirthday");
let phoneField = document.getElementById("phone");
let eMailField = document.getElementById("e-mail");
let allergiesField = document.getElementById("allergies");
let dataAppointment = {};
let toothCard = {};
let selectedRowDiagnosisOfPatient = -1;
let selectedRowDiagnosisFromDoctor = -1;
let diagnosisTableValue = [];
let diagnosisFromDoctorTableValue = [];
let selectedPayments = [];
let services = [];


getAppointment()


function getAppointment() {
  let query = window.location.href.split('/');
  let appointmentId = query[query.length - 1]
  GetUrl(`appointments/${appointmentId}`).then((data) => {
    dataAppointment = data;
    getUserInfo(dataAppointment['user-id'])
    getRequests(dataAppointment['user-id'])
    getUserToothCard(dataAppointment['user-id'])
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

function getRequests(patientId) {
  GetUrl(`user/requests/${patientId}`).then(data => {
    firstRequestCell1.innerText = data[0] ? data[0].date : '';
    firstRequestCell2.innerText = data[0] ? data[0].description : '';
    secondRequestCell1.innerText = data[1] ? data[1].date : '';
    secondRequestCell2.innerText = data[1] ? data[1].description : '';
    thirdRequestCell1.innerText = data[2] ? data[2].date : '';
    thirdRequestCell2.innerText = data[2] ? data[2].description : '';
  }).catch(error => console.error(error));
}

function getServices() {
  GetUrl(`doctors/${userId}/services`).then(data => {
    services = data;
    updateServicesTable()
  }).catch(error => console.error(error));
}

function getUserToothCard(patientId) {
  GetUrl(`user/tooth-card/${patientId}`).then((data) => {
    toothCard = data;
    updateToothCard();
  }).catch(error => console.error(error));
}

function getToothPictures(patientId) {
  GetUrl(`user/tooth/${patientId}`).then(data => {
    data.forEach((picture) => {
      let img = document.createElement('img');
      img.classList.add("tooth-picture");
      img.src = picture.data;
      toothPictures.appendChild(img);
    })
    updateDiagnosisTable()
  }).catch(error => console.error(error));
}
function getUserDiagnosis(patientId) {
  GetUrl(`user/diagnosis/${patientId}`).then(data => {
    diagnosisTableValue = data
    updateDiagnosisTable()
  }).catch(error => console.error(error));
}

function getDiagnosis() {
  GetUrl(`diagnosis`).then(data => {
    diagnosisFromDoctorTableValue = data
    updateDiagnosisFromDoctorTable()
  }).catch(error => console.error(error));
}

function updateDiagnosisTable() {
  if (diagnosisTableValue[0]) {
    firstDiagnosisOfPatientDiagnose.textContent = diagnosisTableValue[0].name
    firstDiagnosisOfPatientDescription.textContent = diagnosisTableValue[0].description
    firstDiagnosisOfPatientStatus.textContent = actualDiagnosisMapper(diagnosisTableValue[0].isActual)
  } else {
    firstDiagnosisOfPatientDiagnose.textContent = ''
    firstDiagnosisOfPatientDescription.textContent = ''
    firstDiagnosisOfPatientStatus.textContent = ''
  }

  if (diagnosisTableValue[1]) {
    secondDiagnosisOfPatientDiagnose.textContent = diagnosisTableValue[1].name
    secondDiagnosisOfPatientDescription.textContent = diagnosisTableValue[1].description
    secondDiagnosisOfPatientStatus.textContent = actualDiagnosisMapper(diagnosisTableValue[1].isActual)
  } else {
    secondDiagnosisOfPatientDiagnose.textContent = ''
    secondDiagnosisOfPatientDescription.textContent = ''
    secondDiagnosisOfPatientStatus.textContent = ''
  }

  if (diagnosisTableValue[2]) {
    thirdDiagnosisOfPatientDiagnose.textContent = diagnosisTableValue[2].name
    thirdDiagnosisOfPatientDescription.textContent = diagnosisTableValue[2].description
    thirdDiagnosisOfPatientStatus.textContent = actualDiagnosisMapper(diagnosisTableValue[2].isActual)
  } else {
    thirdDiagnosisOfPatientDiagnose.textContent = ''
    thirdDiagnosisOfPatientDescription.textContent = ''
    thirdDiagnosisOfPatientStatus.textContent = ''
  }

  if (diagnosisTableValue[3]) {
    fourthDiagnosisOfPatientDiagnose.textContent = diagnosisTableValue[3].name
    fourthDiagnosisOfPatientDescription.textContent = diagnosisTableValue[3].description
    fourthDiagnosisOfPatientStatus.textContent = actualDiagnosisMapper(diagnosisTableValue[3].isActual)
  } else {
    fourthDiagnosisOfPatientDiagnose.textContent = ''
    fourthDiagnosisOfPatientDescription.textContent = ''
    fourthDiagnosisOfPatientStatus.textContent = ''
  }
}

function updateDiagnosisFromDoctorTable() {
  if (diagnosisFromDoctorTableValue[0]) {
    firstDiagnosisFromDoctorDiagnose.textContent = diagnosisFromDoctorTableValue[0].name
    firstDiagnosisFromDoctorDescription.textContent = diagnosisFromDoctorTableValue[0].description
  } else {
    firstDiagnosisFromDoctorDiagnose.textContent = ''
    firstDiagnosisFromDoctorDiagnose.textContent = ''
  }

  if (diagnosisFromDoctorTableValue[1]) {
    secondDiagnosisFromDoctorDiagnose.textContent = diagnosisFromDoctorTableValue[1].name
    secondDiagnosisFromDoctorDescription.textContent = diagnosisFromDoctorTableValue[1].description
  } else {
    secondDiagnosisFromDoctorDiagnose.textContent = ''
    secondDiagnosisFromDoctorDescription.textContent = ''
  }

  if (diagnosisFromDoctorTableValue[2]) {
    thirdDiagnosisFromDoctorDiagnose.textContent = diagnosisFromDoctorTableValue[2].name
    thirdDiagnosisFromDoctorDescription.textContent = diagnosisFromDoctorTableValue[2].description
  } else {
    thirdDiagnosisFromDoctorDiagnose.textContent = ''
    thirdDiagnosisFromDoctorDescription.textContent = ''
  }

  if (diagnosisFromDoctorTableValue[3]) {
    fourthDiagnosisFromDoctorDiagnose.textContent = diagnosisFromDoctorTableValue[3].name
    fourthDiagnosisFromDoctorDescription.textContent = diagnosisFromDoctorTableValue[3].description
  } else {
    fourthDiagnosisFromDoctorDiagnose.textContent = ''
    fourthDiagnosisFromDoctorDescription.textContent = ''
  }
}

function updateServicesTable() {
  if (services[0]) {
    firstRowService.textContent = services[0].service
    firstRowDescription.textContent = services[0].description
    firstRowPrice.textContent = services[0].price
  } else {
    firstRowService.textContent = ''
    firstRowDescription.textContent = ''
    firstRowPrice.textContent = ''
  }

  if (services[1]) {
    secondRowService.textContent = services[1].service
    secondRowDescription.textContent = services[1].description
    secondRowPrice.textContent = services[1].price
  } else {
    secondRowService.textContent = ''
    secondRowDescription.textContent = ''
    secondRowPrice.textContent = ''
  }

  if (services[2]) {
    thirdRowService.textContent = services[2].service
    thirdRowDescription.textContent = services[2].description
    thirdRowPrice.textContent = services[2].price
  } else {
    thirdRowService.textContent = ''
    thirdRowDescription.textContent = ''
    thirdRowPrice.textContent = ''
  }

  if (services[3]) {
    fourthRowService.textContent = services[3].service
    fourthRowDescription.textContent = services[3].description
    fourthRowPrice.textContent = services[3].price
  } else {
    fourthRowService.textContent = ''
    fourthRowDescription.textContent = ''
    fourthRowPrice.textContent = ''
  }
}

firstRowDiagnosisFromDoctor.addEventListener("click", (e) => {
  if (selectedRowDiagnosisFromDoctor !== 0) {
    firstRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor")
    firstRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor-selected")
    firstRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor")
    firstRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor-selected")

    secondRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor-selected")
    secondRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor")
    secondRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor-selected")
    secondRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor")

    thirdRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor-selected")
    thirdRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor")
    thirdRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor-selected")
    thirdRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor")

    fourthRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor-selected")
    fourthRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor")
    fourthRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor-selected")
    fourthRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor")

    selectedRowDiagnosisFromDoctor = 0;
  } else {
    firstRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor-selected")
    firstRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor")
    firstRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor-selected")
    firstRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor")
    selectedRowDiagnosisFromDoctor = -1;
  }
})

secondRowDiagnosisFromDoctor.addEventListener("click", (e) => {
  if (selectedRowDiagnosisFromDoctor !== 1) {
    secondRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor")
    secondRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor-selected")
    secondRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor")
    secondRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor-selected")

    firstRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor-selected")
    firstRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor")
    firstRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor-selected")
    firstRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor")

    thirdRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor-selected")
    thirdRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor")
    thirdRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor-selected")
    thirdRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor")

    fourthRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor-selected")
    fourthRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor")
    fourthRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor-selected")
    fourthRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor")

    selectedRowDiagnosisFromDoctor = 1;
  } else {
    secondRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor-selected")
    secondRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor")
    secondRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor-selected")
    secondRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor")
    selectedRowDiagnosisFromDoctor = -1;
  }
})

thirdRowDiagnosisFromDoctor.addEventListener("click", (e) => {
  if (selectedRowDiagnosisFromDoctor !== 2) {
    thirdRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor")
    thirdRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor-selected")
    thirdRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor")
    thirdRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor-selected")

    secondRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor-selected")
    secondRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor")
    secondRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor-selected")
    secondRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor")

    firstRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor-selected")
    firstRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor")
    firstRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor-selected")
    firstRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor")

    fourthRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor-selected")
    fourthRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor")
    fourthRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor-selected")
    fourthRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor")

    selectedRowDiagnosisFromDoctor = 2;
  } else {
    thirdRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor-selected")
    thirdRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor")
    thirdRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor-selected")
    thirdRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor")
    selectedRowDiagnosisFromDoctor = -1;
  }
})

fourthRowDiagnosisFromDoctor.addEventListener("click", (e) => {
  if (selectedRowDiagnosisFromDoctor !== 3) {
    fourthRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor")
    fourthRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor-selected")
    fourthRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor")
    fourthRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor-selected")

    secondRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor-selected")
    secondRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor")
    secondRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor-selected")
    secondRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor")

    thirdRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor-selected")
    thirdRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor")
    thirdRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor-selected")
    thirdRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor")

    firstRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor-selected")
    firstRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor")
    firstRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor-selected")
    firstRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor")

    selectedRowDiagnosisFromDoctor = 3;
  } else {
    fourthRowDiagnosisFromDoctorCell1.classList.remove("cell-diagnosis-from-doctor-selected")
    fourthRowDiagnosisFromDoctorCell1.classList.add("cell-diagnosis-from-doctor")
    fourthRowDiagnosisFromDoctorCell2.classList.remove("cell-diagnosis-from-doctor-selected")
    fourthRowDiagnosisFromDoctorCell2.classList.add("cell-diagnosis-from-doctor")
    selectedRowDiagnosisFromDoctor = -1;
  }
})


function actualDiagnosisMapper(isActual) {
  return isActual ? "Не вылечено" : "Вылечено"
}

var toothPictureDialog = document.querySelector('#toothPicture');
document.querySelector('#openToothPicture').onclick = function() {
  getToothPictures(dataAppointment['user-id'])
  toothPictureDialog.show();
}
document.querySelector('#toothPictureClose').onclick = function() {
  toothPictureDialog.close();
}

var diagnosisDialog = document.querySelector('#diagnosisDialog');
document.querySelector('#openDiagnosisDialog').onclick = function() {
  getUserDiagnosis(dataAppointment['user-id'])
  getDiagnosis()
  diagnosisDialog.show();
}
document.querySelector('#diagnosisDialogClose').onclick = function() {
  diagnosisDialog.close();
}


var paymentsDialog = document.querySelector('#paymentsDialog');
document.querySelector('#openPaymentsDialog').onclick = function() {
  getServices()
  paymentsDialog.show();
}
document.querySelector('#paymentsDialogClose').onclick = function() {
  paymentsDialog.close();
}
left8Up.addEventListener("change", (e) => {
  toothCard.left8Up = left8Up.selectedIndex
});
left8Down.addEventListener("change", (e) => {
  toothCard.left8Down = left8Down.selectedIndex
});
right1Up.addEventListener("change", (e) => {
  toothCard.right1Up = right1Up.selectedIndex
});
right1Down.addEventListener("change", (e) => {
  toothCard.right1Down = right1Down.selectedIndex
});
left7Up.addEventListener("change", (e) => {
  toothCard.left7Up = left7Up.selectedIndex
});
left7Down.addEventListener("change", (e) => {
  toothCard.left7Down = left7Down.selectedIndex
});
right2Up.addEventListener("change", (e) => {
  toothCard.right2Up = right2Up.selectedIndex
});
right2Down.addEventListener("change", (e) => {
  toothCard.right2Down = right2Down.selectedIndex
});
left6Up.addEventListener("change", (e) => {
  toothCard.left6Up = left6Up.selectedIndex
});
left6Down.addEventListener("change", (e) => {
  toothCard.left6Down = left6Down.selectedIndex
});
right3Up.addEventListener("change", (e) => {
  toothCard.right3Up = right3Up.selectedIndex
});
right3Down.addEventListener("change", (e) => {
  toothCard.right3Down = right3Down.selectedIndex
});
left5Up.addEventListener("change", (e) => {
  toothCard.left5Up = left5Up.selectedIndex
});
left5Down.addEventListener("change", (e) => {
  toothCard.left5Down = left5Down.selectedIndex
});
right4Up.addEventListener("change", (e) => {
  toothCard.right4Up = right4Up.selectedIndex
});
right4Down.addEventListener("change", (e) => {
  toothCard.right4Down = right4Down.selectedIndex
});
left4Up.addEventListener("change", (e) => {
  toothCard.left4Up = left4Up.selectedIndex
});
left4Down.addEventListener("change", (e) => {
  toothCard.left4Down = left4Down.selectedIndex
});
right5Up.addEventListener("change", (e) => {
  toothCard.right5Up = right5Up.selectedIndex
});
right5Down.addEventListener("change", (e) => {
  toothCard.right5Down = right5Down.selectedIndex
});
left3Up.addEventListener("change", (e) => {
  toothCard.left3Up = left3Up.selectedIndex
});
left3Down.addEventListener("change", (e) => {
  toothCard.left3Down = left3Down.selectedIndex
});
right6Up.addEventListener("change", (e) => {
  toothCard.right6Up = right6Up.selectedIndex
});
right6Down.addEventListener("change", (e) => {
  toothCard.right6Down = right6Down.selectedIndex
});
left2Up.addEventListener("change", (e) => {
  toothCard.left2Up = left2Up.selectedIndex
});
left2Down.addEventListener("change", (e) => {
  toothCard.left2Down = left2Down.selectedIndex
});
right7Up.addEventListener("change", (e) => {
  toothCard.right7Up = right7Up.selectedIndex
});
right7Down.addEventListener("change", (e) => {
  toothCard.right7Down = right7Down.selectedIndex
});
left1Up.addEventListener("change", (e) => {
  toothCard.left1Up = left1Up.selectedIndex
});
left1Down.addEventListener("change", (e) => {
  toothCard.left1Down = left1Down.selectedIndex
});
right8Up.addEventListener("change", (e) => {
  toothCard.right8Up = right8Up.selectedIndex
});
right8Down.addEventListener("change", (e) => {
  toothCard.right8Down = right8Down.selectedIndex
});

firstRowDiagnosisOfPatient.addEventListener("click", (e) => {
  if (selectedRowDiagnosisOfPatient !== 0) {
    firstRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient")
    firstRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient-selected")
    firstRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient")
    firstRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient-selected")
    firstRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient")
    firstRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient-selected")

    secondRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient-selected")
    secondRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient")
    secondRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient-selected")
    secondRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient")
    secondRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient-selected")
    secondRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient")

    thirdRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient-selected")
    thirdRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient")
    thirdRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient-selected")
    thirdRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient")
    thirdRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient-selected")
    thirdRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient")

    fourthRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient-selected")
    fourthRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient")
    fourthRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient-selected")
    fourthRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient")
    fourthRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient-selected")
    fourthRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient")

    selectedRowDiagnosisOfPatient = 0;
  } else {
    firstRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient-selected")
    firstRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient")
    firstRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient-selected")
    firstRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient")
    firstRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient-selected")
    firstRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient")
    selectedRowDiagnosisOfPatient = -1;
  }
})

secondRowDiagnosisOfPatient.addEventListener("click", (e) => {
  if (selectedRowDiagnosisOfPatient !== 1) {
    secondRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient")
    secondRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient-selected")
    secondRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient")
    secondRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient-selected")
    secondRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient")
    secondRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient-selected")

    firstRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient-selected")
    firstRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient")
    firstRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient-selected")
    firstRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient")
    firstRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient-selected")
    firstRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient")

    thirdRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient-selected")
    thirdRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient")
    thirdRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient-selected")
    thirdRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient")
    thirdRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient-selected")
    thirdRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient")

    fourthRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient-selected")
    fourthRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient")
    fourthRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient-selected")
    fourthRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient")
    fourthRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient-selected")
    fourthRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient")

    selectedRowDiagnosisOfPatient = 1;
  } else {
    secondRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient-selected")
    secondRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient")
    secondRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient-selected")
    secondRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient")
    secondRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient-selected")
    secondRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient")
    selectedRowDiagnosisOfPatient = -1;
  }
})

thirdRowDiagnosisOfPatient.addEventListener("click", (e) => {
  if (selectedRowDiagnosisOfPatient !== 2) {
    thirdRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient")
    thirdRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient-selected")
    thirdRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient")
    thirdRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient-selected")
    thirdRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient")
    thirdRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient-selected")

    secondRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient-selected")
    secondRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient")
    secondRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient-selected")
    secondRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient")
    secondRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient-selected")
    secondRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient")

    firstRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient-selected")
    firstRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient")
    firstRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient-selected")
    firstRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient")
    firstRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient-selected")
    firstRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient")

    fourthRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient-selected")
    fourthRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient")
    fourthRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient-selected")
    fourthRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient")
    fourthRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient-selected")
    fourthRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient")

    selectedRowDiagnosisOfPatient = 2;
  } else {
    thirdRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient-selected")
    thirdRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient")
    thirdRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient-selected")
    thirdRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient")
    thirdRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient-selected")
    thirdRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient")
    selectedRowDiagnosisOfPatient = -1;
  }
})

fourthRowDiagnosisOfPatient.addEventListener("click", (e) => {
  if (selectedRowDiagnosisOfPatient !== 0) {
    fourthRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient")
    fourthRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient-selected")
    fourthRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient")
    fourthRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient-selected")
    fourthRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient")
    fourthRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient-selected")

    secondRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient-selected")
    secondRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient")
    secondRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient-selected")
    secondRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient")
    secondRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient-selected")
    secondRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient")

    thirdRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient-selected")
    thirdRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient")
    thirdRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient-selected")
    thirdRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient")
    thirdRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient-selected")
    thirdRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient")

    firstRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient-selected")
    firstRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient")
    firstRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient-selected")
    firstRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient")
    firstRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient-selected")
    firstRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient")

    selectedRowDiagnosisOfPatient = 0;
  } else {
    fourthRowDiagnosisOfPatientCell1.classList.remove("cell-diagnosis-of-patient-selected")
    fourthRowDiagnosisOfPatientCell1.classList.add("cell-diagnosis-of-patient")
    fourthRowDiagnosisOfPatientCell2.classList.remove("cell-diagnosis-of-patient-selected")
    fourthRowDiagnosisOfPatientCell2.classList.add("cell-diagnosis-of-patient")
    fourthRowDiagnosisOfPatientCell3.classList.remove("cell-diagnosis-of-patient-selected")
    fourthRowDiagnosisOfPatientCell3.classList.add("cell-diagnosis-of-patient")
    selectedRowDiagnosisOfPatient = -1;
  }
})


curedButton.addEventListener("click", (e) => {
  const diagnoseOfPatient = diagnosisTableValue[selectedRowDiagnosisOfPatient]
  diagnoseOfPatient.isActual = false

  const updateBody = {
    userId: dataAppointment['user-id'],
    diagnose: diagnoseOfPatient
  }

  PostUrlWithResponse('user/diagnosis/update', updateBody)
    .then((data) => {
      alert("Статус диагноза изменен")
      diagnosisTableValue = data
      updateDiagnosisTable()
    })
    .catch((error) =>  alert("Статус диагноза не изменен"));
})

addDiagnoseButton.addEventListener("click", (e) => {
  const newDiagnose = diagnosisFromDoctorTableValue[selectedRowDiagnosisFromDoctor]

  const createBody = {
    userId: dataAppointment['user-id'],
    diagnose: newDiagnose
  }

  PostUrlWithResponse('user/diagnosis/create', createBody)
    .then((data) => {
      alert("Диагноз добавлен")
      diagnosisTableValue = data
      updateDiagnosisTable()
    })
    .catch((error) =>  alert("Диагноз не добавлен"));
})


firstRowCheckBox.addEventListener("change", (e) => {
  const index = selectedPayments.findIndex((selected) => selected === 0);
  paymentsForm.first.checked ? selectedPayments.push(0) : selectedPayments.splice(index, 1);
  updatePaymentInfo()
})
secondRowCheckBox.addEventListener("change", (e) => {
  const index = selectedPayments.findIndex((selected) => selected === 1);
  paymentsForm.second.checked ? selectedPayments.push(1) : selectedPayments.splice(index, 1);
  updatePaymentInfo()
})
thirdRowCheckBox.addEventListener("change", (e) => {
  const index = selectedPayments.findIndex((selected) => selected === 2);
  paymentsForm.third.checked ? selectedPayments.push(2) : selectedPayments.splice(index, 1);
  updatePaymentInfo()
})
fourthRowCheckBox.addEventListener("change", (e) => {
  const index = selectedPayments.findIndex((selected) => selected === 3);
  paymentsForm.fourth.checked ? selectedPayments.push(3) : selectedPayments.splice(index, 1);
  updatePaymentInfo()
})

paymentButton.addEventListener("click", (e) => {
  if (selectedPayments.length > 0) {
    let resultServices = []
    selectedPayments.forEach((selected) => {
      resultServices.push(services[selected]);
    });

    const paymentBody = {
      'user-id': dataAppointment['user-id'],
      services: resultServices
    }
    PostUrl(`appointments/${dataAppointment.id}/finish`, paymentBody).then((data) => {
      PostUrl(`user/tooth-card/${dataAppointment['user-id']}`, toothCard).then((data) => {
        alert("Приём окончен");
        location.assign('/doctor/reception');
      }).catch((error) => console.log(error))
    }).catch((error) => console.log(error))
  }
})

function updatePaymentInfo() {
  let summary = 0
  servicesDone.innerText = "Оказанные услуги: "
  cost.innerText = "Стоимость: "
  selectedPayments.forEach((selected) => {
    servicesDone.innerText += " " + services[selected].service + ", "
    summary += services[selected].price
  })
  cost.innerText += " " + summary + " Р."
}

function updateToothCard() {
  left8Up.selectedIndex = toothCard.left8Up;
  left8Down.selectedIndex = toothCard.left8Down;
  right1Up.selectedIndex = toothCard.right1Up;
  right1Down.selectedIndex = toothCard.right1Down;
  left7Up.selectedIndex = toothCard.left7Up;
  left7Down.selectedIndex = toothCard.left7Down;
  right2Up.selectedIndex = toothCard.right2Up;
  right2Down.selectedIndex = toothCard.right2Down;
  left6Up.selectedIndex = toothCard.left6Up;
  left6Down.selectedIndex = toothCard.left6Down;
  right3Up.selectedIndex = toothCard.right3Up;
  right3Down.selectedIndex = toothCard.right3Down;
  left5Up.selectedIndex = toothCard.left5Up;
  left5Down.selectedIndex = toothCard.left5Down;
  right4Up.selectedIndex = toothCard.right4Up;
  right4Down.selectedIndex = toothCard.right4Down;
  left4Up.selectedIndex = toothCard.left4Up;
  left4Down.selectedIndex = toothCard.left4Down;
  right5Up.selectedIndex = toothCard.right5Up;
  right5Down.selectedIndex = toothCard.right5Down;
  left3Up.selectedIndex = toothCard.left3Up;
  left3Down.selectedIndex = toothCard.left3Down;
  right6Up.selectedIndex = toothCard.right6Up;
  right6Down.selectedIndex = toothCard.right6Down;
  left2Up.selectedIndex = toothCard.left2Up;
  left2Down.selectedIndex = toothCard.left2Down;
  right7Up.selectedIndex = toothCard.right7Up;
  right7Down.selectedIndex = toothCard.right7Down;
  left1Up.selectedIndex = toothCard.left1Up;
  left1Down.selectedIndex = toothCard.left1Down;
  right8Up.selectedIndex = toothCard.right8Up;
  right8Down.selectedIndex = toothCard.right8Down;
}

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

function PostUrlWithResponse(postUrl, body) {
  return fetch(url + postUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
    .then(response => response.json())
}
