const url = 'https://cc66-46-164-217-97.ngrok-free.app/';
var token = GetCookie("access_token")
const headers = {
  "Host":  'cc66-46-164-217-97.ngrok-free.app',
  "Origin":  'https://cc66-46-164-217-97.ngrok-free.app/',
  "Accept": "*/*",
  'ngrok-skip-browser-warning':true
}

const firstDate = document.getElementById("first-date");
const firstPatient = document.getElementById("first-patient");
const firstDoctor = document.getElementById("first-doctor");
const firstService = document.getElementById("first-service");
const firstPrice = document.getElementById("first-price");
const firstStatus = document.getElementById("first-status");

const secondDate = document.getElementById("second-date");
const secondPatient = document.getElementById("second-patient");
const secondDoctor = document.getElementById("second-doctor");
const secondService = document.getElementById("second-service");
const secondPrice = document.getElementById("second-price");
const secondStatus = document.getElementById("second-status");

const thirdDate = document.getElementById("third-date");
const thirdPatient = document.getElementById("third-patient");
const thirdDoctor = document.getElementById("third-doctor");
const thirdService = document.getElementById("third-service");
const thirdPrice = document.getElementById("third-price");
const thirdStatus = document.getElementById("third-status");

const fourthDate = document.getElementById("fourth-date");
const fourthPatient = document.getElementById("fourth-patient");
const fourthDoctor = document.getElementById("fourth-doctor");
const fourthService = document.getElementById("fourth-service");
const fourthPrice = document.getElementById("fourth-price");
const fourthStatus = document.getElementById("fourth-status");

const fifthDate = document.getElementById("fifth-date");
const fifthPatient = document.getElementById("fifth-patient");
const fifthDoctor = document.getElementById("fifth-doctor");
const fifthService = document.getElementById("fifth-service");
const fifthPrice = document.getElementById("fifth-price");
const fifthStatus = document.getElementById("fifth-status");

const sixthDate = document.getElementById("sixth-date");
const sixthPatient = document.getElementById("sixth-patient");
const sixthDoctor = document.getElementById("sixth-doctor");
const sixthService = document.getElementById("sixth-service");
const sixthPrice = document.getElementById("sixth-price");
const sixthStatus = document.getElementById("sixth-status");

const seventhDate = document.getElementById("seventh-date");
const seventhPatient = document.getElementById("seventh-patient");
const seventhDoctor = document.getElementById("seventh-doctor");
const seventhService = document.getElementById("seventh-service");
const seventhPrice = document.getElementById("seventh-price");
const seventhStatus = document.getElementById("seventh-status");


const firstRow = document.getElementById("first-row");
const firstRowCell1 = document.getElementById("first-row-cell-1");
const firstRowCell2 = document.getElementById("first-row-cell-2");
const firstRowCell3 = document.getElementById("first-row-cell-3");
const firstRowCell4 = document.getElementById("first-row-cell-4");
const firstRowCell5 = document.getElementById("first-row-cell-5");
const firstRowCell6 = document.getElementById("first-row-cell-6");

const secondRow = document.getElementById("second-row");
const secondRowCell1 = document.getElementById("second-row-cell-1");
const secondRowCell2 = document.getElementById("second-row-cell-2");
const secondRowCell3 = document.getElementById("second-row-cell-3");
const secondRowCell4 = document.getElementById("second-row-cell-4");
const secondRowCell5 = document.getElementById("second-row-cell-5");
const secondRowCell6 = document.getElementById("second-row-cell-6");

const thirdRow = document.getElementById("third-row");
const thirdRowCell1 = document.getElementById("third-row-cell-1");
const thirdRowCell2 = document.getElementById("third-row-cell-2");
const thirdRowCell3 = document.getElementById("third-row-cell-3");
const thirdRowCell4 = document.getElementById("third-row-cell-4");
const thirdRowCell5 = document.getElementById("third-row-cell-5");
const thirdRowCell6 = document.getElementById("third-row-cell-6");

const fourthRow = document.getElementById("fourth-row");
const fourthRowCell1 = document.getElementById("fourth-row-cell-1");
const fourthRowCell2 = document.getElementById("fourth-row-cell-2");
const fourthRowCell3 = document.getElementById("fourth-row-cell-3");
const fourthRowCell4 = document.getElementById("fourth-row-cell-4");
const fourthRowCell5 = document.getElementById("fourth-row-cell-5");
const fourthRowCell6 = document.getElementById("fourth-row-cell-6");

const fifthRow = document.getElementById("fifth-row");
const fifthRowCell1 = document.getElementById("fifth-row-cell-1");
const fifthRowCell2 = document.getElementById("fifth-row-cell-2");
const fifthRowCell3 = document.getElementById("fifth-row-cell-3");
const fifthRowCell4 = document.getElementById("fifth-row-cell-4");
const fifthRowCell5 = document.getElementById("fifth-row-cell-5");
const fifthRowCell6 = document.getElementById("fifth-row-cell-6");

const sixthRow = document.getElementById("sixth-row");
const sixthRowCell1 = document.getElementById("sixth-row-cell-1");
const sixthRowCell2 = document.getElementById("sixth-row-cell-2");
const sixthRowCell3 = document.getElementById("sixth-row-cell-3");
const sixthRowCell4 = document.getElementById("sixth-row-cell-4");
const sixthRowCell5 = document.getElementById("sixth-row-cell-5");
const sixthRowCell6 = document.getElementById("sixth-row-cell-6");

const seventhRow = document.getElementById("seventh-row");
const seventhRowCell1 = document.getElementById("seventh-row-cell-1");
const seventhRowCell2 = document.getElementById("seventh-row-cell-2");
const seventhRowCell3 = document.getElementById("seventh-row-cell-3");
const seventhRowCell4 = document.getElementById("seventh-row-cell-4");
const seventhRowCell5 = document.getElementById("seventh-row-cell-5");
const seventhRowCell6 = document.getElementById("seventh-row-cell-6");


const paidButton = document.getElementById("paid-button");
const noPaidButton = document.getElementById("no-paid-button");


let paymentsTableValue = [];
let selectedRow = -1;

var deleteDialog = document.querySelector('#deleteDialog');
document.querySelector('#openDeleteDialog').onclick = function() {
  deleteDialog.show();
}
document.querySelector('#deleteDialogClose').onclick = function() {
  if (selectedRow > -1) {
    PostUrl('payments/delete', paymentsTableValue[selectedRow]).then((data) => {
      paymentsTableValue = data
      updatePaymentsTable()
    }).catch((error) => console.error(error))
  }
  deleteDialog.close();
}
document.querySelector('#backButtonDeleteDialogClose').onclick = function() {
  deleteDialog.close();
}


GetUrl('payments/all').then((data) => {
  paymentsTableValue = data
  updatePaymentsTable()
}).then((error) => console.error(error))

paidButton.addEventListener("click", (e) => {
  if (selectedRow > -1) {
    let paymentsToUpdate = paymentsTableValue[selectedRow]
    paymentsToUpdate.isActive = false;
    PostUrl('payments/update', paymentsToUpdate).then((data) => {
      paymentsTableValue = data
      updatePaymentsTable()
    }).catch((error) => console.error(error))
  }
})

noPaidButton.addEventListener("click", (e) => {
  if (selectedRow > -1) {
    let paymentsToUpdate = paymentsTableValue[selectedRow]
    paymentsToUpdate.isActive = true;
    PostUrl('payments/update', paymentsToUpdate).then((data) => {
      paymentsTableValue = data
      updatePaymentsTable()
    }).catch((error) => console.error(error))
  }
})

function updatePaymentsTable() {
  if (paymentsTableValue[0]) {
    firstDate.textContent = paymentsTableValue[0].date
    firstPatient.textContent = paymentsTableValue[0]['user-name']
    firstDoctor.textContent = paymentsTableValue[0]['doctor-name']
    firstService.textContent = paymentsTableValue[0].service
    firstPrice.textContent = paymentsTableValue[0].price
    firstStatus.textContent = statusMapper(paymentsTableValue[0].isActive)
  } else {
    firstDate.textContent = ''
    firstPatient.textContent = ''
    firstDoctor.textContent = ''
    firstService.textContent = ''
    firstPrice.textContent = ''
    firstStatus.textContent = ''
  }

  if (paymentsTableValue[1]) {
    secondDate.textContent = paymentsTableValue[1].date
    secondPatient.textContent = paymentsTableValue[1]['user-name']
    secondDoctor.textContent = paymentsTableValue[1]['doctor-name']
    secondService.textContent = paymentsTableValue[1].service
    secondPrice.textContent = paymentsTableValue[1].price
    secondStatus.textContent = statusMapper(paymentsTableValue[1].isActive)
  } else {
    secondDate.textContent = ''
    secondPatient.textContent = ''
    secondDoctor.textContent = ''
    secondService.textContent = ''
    secondPrice.textContent = ''
    secondStatus.textContent = ''
  }

  if (paymentsTableValue[2]) {
    thirdDate.textContent = paymentsTableValue[2].date
    thirdPatient.textContent = paymentsTableValue[2]['user-name']
    thirdDoctor.textContent = paymentsTableValue[2]['doctor-name']
    thirdService.textContent = paymentsTableValue[2].service
    thirdPrice.textContent = paymentsTableValue[2].price
    thirdStatus.textContent = statusMapper(paymentsTableValue[2].isActive)
  } else {
    thirdDate.textContent = ''
    thirdPatient.textContent = ''
    thirdDoctor.textContent = ''
    thirdService.textContent = ''
    thirdPrice.textContent = ''
    thirdStatus.textContent = ''
  }

  if (paymentsTableValue[3]) {
    fourthDate.textContent = paymentsTableValue[3].date
    fourthPatient.textContent = paymentsTableValue[3]['user-name']
    fourthDoctor.textContent = paymentsTableValue[3]['doctor-name']
    fourthService.textContent = paymentsTableValue[3].service
    fourthPrice.textContent = paymentsTableValue[3].price
    fourthStatus.textContent = statusMapper(paymentsTableValue[3].isActive)
  } else {
    fourthDate.textContent = ''
    fourthPatient.textContent = ''
    fourthDoctor.textContent = ''
    fourthService.textContent = ''
    fourthPrice.textContent = ''
    fourthStatus.textContent = ''
  }

  if (paymentsTableValue[4]) {
    fifthDate.textContent = paymentsTableValue[4].date
    fifthPatient.textContent = paymentsTableValue[4]['user-name']
    fifthDoctor.textContent = paymentsTableValue[4]['doctor-name']
    fifthService.textContent = paymentsTableValue[4].service
    fifthPrice.textContent = paymentsTableValue[4].price
    fifthStatus.textContent = statusMapper(paymentsTableValue[4].isActive)
  } else {
    fifthDate.textContent = ''
    fifthPatient.textContent = ''
    fifthDoctor.textContent = ''
    fifthService.textContent = ''
    fifthPrice.textContent = ''
    fifthStatus.textContent = ''
  }

  if (paymentsTableValue[5]) {
    sixthDate.textContent = paymentsTableValue[5].date
    sixthPatient.textContent = paymentsTableValue[5]['user-name']
    sixthDoctor.textContent = paymentsTableValue[5]['doctor-name']
    sixthService.textContent = paymentsTableValue[5].service
    sixthPrice.textContent = paymentsTableValue[5].price
    sixthStatus.textContent = statusMapper(paymentsTableValue[5].isActive)
  } else {
    sixthDate.textContent = ''
    sixthPatient.textContent = ''
    sixthDoctor.textContent = ''
    sixthService.textContent = ''
    sixthPrice.textContent = ''
    sixthStatus.textContent = ''
  }

  if (paymentsTableValue[6]) {
    seventhDate.textContent = paymentsTableValue[6].date
    seventhPatient.textContent = paymentsTableValue[6]['user-name']
    seventhDoctor.textContent = paymentsTableValue[6]['doctor-name']
    seventhService.textContent = paymentsTableValue[6].service
    seventhPrice.textContent = paymentsTableValue[6].price
    seventhStatus.textContent = statusMapper(paymentsTableValue[6].isActive)
  } else {
    seventhDate.textContent = ''
    seventhPatient.textContent = ''
    seventhDoctor.textContent = ''
    seventhService.textContent = ''
    seventhPrice.textContent = ''
    seventhStatus.textContent = ''
  }
}

firstRow.addEventListener("click", (e) => {
  if (selectedRow !== 0) {
    firstRowCell1.classList.remove("cell-payments")
    firstRowCell1.classList.add("cell-payments-selected")
    firstRowCell2.classList.remove("cell-payments")
    firstRowCell2.classList.add("cell-payments-selected")
    firstRowCell3.classList.remove("cell-payments")
    firstRowCell3.classList.add("cell-payments-selected")
    firstRowCell4.classList.remove("cell-payments")
    firstRowCell4.classList.add("cell-payments-selected")
    firstRowCell5.classList.remove("cell-payments")
    firstRowCell5.classList.add("cell-payments-selected")
    firstRowCell6.classList.remove("cell-payments-last")
    firstRowCell6.classList.add("cell-payments-last-selected")

    secondRowCell1.classList.remove("cell-payments-selected")
    secondRowCell1.classList.add("cell-payments")
    secondRowCell2.classList.remove("cell-payments-selected")
    secondRowCell2.classList.add("cell-payments")
    secondRowCell3.classList.remove("cell-payments-selected")
    secondRowCell3.classList.add("cell-payments")
    secondRowCell4.classList.remove("cell-payments-selected")
    secondRowCell4.classList.add("cell-payments")
    secondRowCell5.classList.remove("cell-payments-selected")
    secondRowCell5.classList.add("cell-payments")
    secondRowCell6.classList.remove("cell-payments-last-selected")
    secondRowCell6.classList.add("cell-payments-last")

    thirdRowCell1.classList.remove("cell-payments-selected")
    thirdRowCell1.classList.add("cell-payments")
    thirdRowCell2.classList.remove("cell-payments-selected")
    thirdRowCell2.classList.add("cell-payments")
    thirdRowCell3.classList.remove("cell-payments-selected")
    thirdRowCell3.classList.add("cell-payments")
    thirdRowCell4.classList.remove("cell-payments-selected")
    thirdRowCell4.classList.add("cell-payments")
    thirdRowCell5.classList.remove("cell-payments-selected")
    thirdRowCell5.classList.add("cell-payments")
    thirdRowCell6.classList.remove("cell-payments-last-selected")
    thirdRowCell6.classList.add("cell-payments-last")

    fourthRowCell1.classList.remove("cell-payments-selected")
    fourthRowCell1.classList.add("cell-payments")
    fourthRowCell2.classList.remove("cell-payments-selected")
    fourthRowCell2.classList.add("cell-payments")
    fourthRowCell3.classList.remove("cell-payments-selected")
    fourthRowCell3.classList.add("cell-payments")
    fourthRowCell4.classList.remove("cell-payments-selected")
    fourthRowCell4.classList.add("cell-payments")
    fourthRowCell5.classList.remove("cell-payments-selected")
    fourthRowCell5.classList.add("cell-payments")
    fourthRowCell6.classList.remove("cell-payments-last-selected")
    fourthRowCell6.classList.add("cell-payments-last")

    fifthRowCell1.classList.remove("cell-payments-selected")
    fifthRowCell1.classList.add("cell-payments")
    fifthRowCell2.classList.remove("cell-payments-selected")
    fifthRowCell2.classList.add("cell-payments")
    fifthRowCell3.classList.remove("cell-payments-selected")
    fifthRowCell3.classList.add("cell-payments")
    fifthRowCell4.classList.remove("cell-payments-selected")
    fifthRowCell4.classList.add("cell-payments")
    fifthRowCell5.classList.remove("cell-payments-selected")
    fifthRowCell5.classList.add("cell-payments")
    fifthRowCell6.classList.remove("cell-payments-last-selected")
    fifthRowCell6.classList.add("cell-payments-last")

    sixthRowCell1.classList.remove("cell-payments-selected")
    sixthRowCell1.classList.add("cell-payments")
    sixthRowCell2.classList.remove("cell-payments-selected")
    sixthRowCell2.classList.add("cell-payments")
    sixthRowCell3.classList.remove("cell-payments-selected")
    sixthRowCell3.classList.add("cell-payments")
    sixthRowCell4.classList.remove("cell-payments-selected")
    sixthRowCell4.classList.add("cell-payments")
    sixthRowCell5.classList.remove("cell-payments-selected")
    sixthRowCell5.classList.add("cell-payments")
    sixthRowCell6.classList.remove("cell-payments-last-selected")
    sixthRowCell6.classList.add("cell-payments-last")

    seventhRowCell1.classList.remove("cell-payments-selected")
    seventhRowCell1.classList.add("cell-payments")
    seventhRowCell2.classList.remove("cell-payments-selected")
    seventhRowCell2.classList.add("cell-payments")
    seventhRowCell3.classList.remove("cell-payments-selected")
    seventhRowCell3.classList.add("cell-payments")
    seventhRowCell4.classList.remove("cell-payments-selected")
    seventhRowCell4.classList.add("cell-payments")
    seventhRowCell5.classList.remove("cell-payments-selected")
    seventhRowCell5.classList.add("cell-payments")
    seventhRowCell6.classList.remove("cell-payments-last-selected")
    seventhRowCell6.classList.add("cell-payments-last")

    selectedRow = 0;
  } else {
    firstRowCell1.classList.remove("cell-payments-selected")
    firstRowCell1.classList.add("cell-payments")
    firstRowCell2.classList.remove("cell-payments-selected")
    firstRowCell2.classList.add("cell-payments")
    firstRowCell3.classList.remove("cell-payments-selected")
    firstRowCell3.classList.add("cell-payments")
    firstRowCell4.classList.remove("cell-payments-selected")
    firstRowCell4.classList.add("cell-payments")
    firstRowCell5.classList.remove("cell-payments-selected")
    firstRowCell5.classList.add("cell-payments")
    firstRowCell6.classList.remove("cell-payments-last-selected")
    firstRowCell6.classList.add("cell-payments-last")
    selectedRow = -1;
  }
})

secondRow.addEventListener("click", (e) => {
  if (selectedRow !== 1) {
    secondRowCell1.classList.remove("cell-payments")
    secondRowCell1.classList.add("cell-payments-selected")
    secondRowCell2.classList.remove("cell-payments")
    secondRowCell2.classList.add("cell-payments-selected")
    secondRowCell3.classList.remove("cell-payments")
    secondRowCell3.classList.add("cell-payments-selected")
    secondRowCell4.classList.remove("cell-payments")
    secondRowCell4.classList.add("cell-payments-selected")
    secondRowCell5.classList.remove("cell-payments")
    secondRowCell5.classList.add("cell-payments-selected")
    secondRowCell6.classList.remove("cell-payments-last")
    secondRowCell6.classList.add("cell-payments-last-selected")

    firstRowCell1.classList.remove("cell-payments-selected")
    firstRowCell1.classList.add("cell-payments")
    firstRowCell2.classList.remove("cell-payments-selected")
    firstRowCell2.classList.add("cell-payments")
    firstRowCell3.classList.remove("cell-payments-selected")
    firstRowCell3.classList.add("cell-payments")
    firstRowCell4.classList.remove("cell-payments-selected")
    firstRowCell4.classList.add("cell-payments")
    firstRowCell5.classList.remove("cell-payments-selected")
    firstRowCell5.classList.add("cell-payments")
    firstRowCell6.classList.remove("cell-payments-last-selected")
    firstRowCell6.classList.add("cell-payments-last")

    thirdRowCell1.classList.remove("cell-payments-selected")
    thirdRowCell1.classList.add("cell-payments")
    thirdRowCell2.classList.remove("cell-payments-selected")
    thirdRowCell2.classList.add("cell-payments")
    thirdRowCell3.classList.remove("cell-payments-selected")
    thirdRowCell3.classList.add("cell-payments")
    thirdRowCell4.classList.remove("cell-payments-selected")
    thirdRowCell4.classList.add("cell-payments")
    thirdRowCell5.classList.remove("cell-payments-selected")
    thirdRowCell5.classList.add("cell-payments")
    thirdRowCell6.classList.remove("cell-payments-last-selected")
    thirdRowCell6.classList.add("cell-payments-last")

    fourthRowCell1.classList.remove("cell-payments-selected")
    fourthRowCell1.classList.add("cell-payments")
    fourthRowCell2.classList.remove("cell-payments-selected")
    fourthRowCell2.classList.add("cell-payments")
    fourthRowCell3.classList.remove("cell-payments-selected")
    fourthRowCell3.classList.add("cell-payments")
    fourthRowCell4.classList.remove("cell-payments-selected")
    fourthRowCell4.classList.add("cell-payments")
    fourthRowCell5.classList.remove("cell-payments-selected")
    fourthRowCell5.classList.add("cell-payments")
    fourthRowCell6.classList.remove("cell-payments-last-selected")
    fourthRowCell6.classList.add("cell-payments-last")

    fifthRowCell1.classList.remove("cell-payments-selected")
    fifthRowCell1.classList.add("cell-payments")
    fifthRowCell2.classList.remove("cell-payments-selected")
    fifthRowCell2.classList.add("cell-payments")
    fifthRowCell3.classList.remove("cell-payments-selected")
    fifthRowCell3.classList.add("cell-payments")
    fifthRowCell4.classList.remove("cell-payments-selected")
    fifthRowCell4.classList.add("cell-payments")
    fifthRowCell5.classList.remove("cell-payments-selected")
    fifthRowCell5.classList.add("cell-payments")
    fifthRowCell6.classList.remove("cell-payments-last-selected")
    fifthRowCell6.classList.add("cell-payments-last")

    sixthRowCell1.classList.remove("cell-payments-selected")
    sixthRowCell1.classList.add("cell-payments")
    sixthRowCell2.classList.remove("cell-payments-selected")
    sixthRowCell2.classList.add("cell-payments")
    sixthRowCell3.classList.remove("cell-payments-selected")
    sixthRowCell3.classList.add("cell-payments")
    sixthRowCell4.classList.remove("cell-payments-selected")
    sixthRowCell4.classList.add("cell-payments")
    sixthRowCell5.classList.remove("cell-payments-selected")
    sixthRowCell5.classList.add("cell-payments")
    sixthRowCell6.classList.remove("cell-payments-last-selected")
    sixthRowCell6.classList.add("cell-payments-last")

    seventhRowCell1.classList.remove("cell-payments-selected")
    seventhRowCell1.classList.add("cell-payments")
    seventhRowCell2.classList.remove("cell-payments-selected")
    seventhRowCell2.classList.add("cell-payments")
    seventhRowCell3.classList.remove("cell-payments-selected")
    seventhRowCell3.classList.add("cell-payments")
    seventhRowCell4.classList.remove("cell-payments-selected")
    seventhRowCell4.classList.add("cell-payments")
    seventhRowCell5.classList.remove("cell-payments-selected")
    seventhRowCell5.classList.add("cell-payments")
    seventhRowCell6.classList.remove("cell-payments-last-selected")
    seventhRowCell6.classList.add("cell-payments-last")

    selectedRow = 1;
  } else {
    secondRowCell1.classList.remove("cell-payments-selected")
    secondRowCell1.classList.add("cell-payments")
    secondRowCell2.classList.remove("cell-payments-selected")
    secondRowCell2.classList.add("cell-payments")
    secondRowCell3.classList.remove("cell-payments-selected")
    secondRowCell3.classList.add("cell-payments")
    secondRowCell4.classList.remove("cell-payments-selected")
    secondRowCell4.classList.add("cell-payments")
    secondRowCell5.classList.remove("cell-payments-selected")
    secondRowCell5.classList.add("cell-payments")
    secondRowCell6.classList.remove("cell-payments-last-selected")
    secondRowCell6.classList.add("cell-payments-last")
    selectedRow = -1;
  }
})

thirdRow.addEventListener("click", (e) => {
  if (selectedRow !== 2) {
    thirdRowCell1.classList.remove("cell-payments")
    thirdRowCell1.classList.add("cell-payments-selected")
    thirdRowCell2.classList.remove("cell-payments")
    thirdRowCell2.classList.add("cell-payments-selected")
    thirdRowCell3.classList.remove("cell-payments")
    thirdRowCell3.classList.add("cell-payments-selected")
    thirdRowCell4.classList.remove("cell-payments")
    thirdRowCell4.classList.add("cell-payments-selected")
    thirdRowCell5.classList.remove("cell-payments")
    thirdRowCell5.classList.add("cell-payments-selected")
    thirdRowCell6.classList.remove("cell-payments-last")
    thirdRowCell6.classList.add("cell-payments-last-selected")

    secondRowCell1.classList.remove("cell-payments-selected")
    secondRowCell1.classList.add("cell-payments")
    secondRowCell2.classList.remove("cell-payments-selected")
    secondRowCell2.classList.add("cell-payments")
    secondRowCell3.classList.remove("cell-payments-selected")
    secondRowCell3.classList.add("cell-payments")
    secondRowCell4.classList.remove("cell-payments-selected")
    secondRowCell4.classList.add("cell-payments")
    secondRowCell5.classList.remove("cell-payments-selected")
    secondRowCell5.classList.add("cell-payments")
    secondRowCell6.classList.remove("cell-payments-last-selected")
    secondRowCell6.classList.add("cell-payments-last")

    firstRowCell1.classList.remove("cell-payments-selected")
    firstRowCell1.classList.add("cell-payments")
    firstRowCell2.classList.remove("cell-payments-selected")
    firstRowCell2.classList.add("cell-payments")
    firstRowCell3.classList.remove("cell-payments-selected")
    firstRowCell3.classList.add("cell-payments")
    firstRowCell4.classList.remove("cell-payments-selected")
    firstRowCell4.classList.add("cell-payments")
    firstRowCell5.classList.remove("cell-payments-selected")
    firstRowCell5.classList.add("cell-payments")
    firstRowCell6.classList.remove("cell-payments-last-selected")
    firstRowCell6.classList.add("cell-payments-last")

    fourthRowCell1.classList.remove("cell-payments-selected")
    fourthRowCell1.classList.add("cell-payments")
    fourthRowCell2.classList.remove("cell-payments-selected")
    fourthRowCell2.classList.add("cell-payments")
    fourthRowCell3.classList.remove("cell-payments-selected")
    fourthRowCell3.classList.add("cell-payments")
    fourthRowCell4.classList.remove("cell-payments-selected")
    fourthRowCell4.classList.add("cell-payments")
    fourthRowCell5.classList.remove("cell-payments-selected")
    fourthRowCell5.classList.add("cell-payments")
    fourthRowCell6.classList.remove("cell-payments-last-selected")
    fourthRowCell6.classList.add("cell-payments-last")

    fifthRowCell1.classList.remove("cell-payments-selected")
    fifthRowCell1.classList.add("cell-payments")
    fifthRowCell2.classList.remove("cell-payments-selected")
    fifthRowCell2.classList.add("cell-payments")
    fifthRowCell3.classList.remove("cell-payments-selected")
    fifthRowCell3.classList.add("cell-payments")
    fifthRowCell4.classList.remove("cell-payments-selected")
    fifthRowCell4.classList.add("cell-payments")
    fifthRowCell5.classList.remove("cell-payments-selected")
    fifthRowCell5.classList.add("cell-payments")
    fifthRowCell6.classList.remove("cell-payments-last-selected")
    fifthRowCell6.classList.add("cell-payments-last")

    sixthRowCell1.classList.remove("cell-payments-selected")
    sixthRowCell1.classList.add("cell-payments")
    sixthRowCell2.classList.remove("cell-payments-selected")
    sixthRowCell2.classList.add("cell-payments")
    sixthRowCell3.classList.remove("cell-payments-selected")
    sixthRowCell3.classList.add("cell-payments")
    sixthRowCell4.classList.remove("cell-payments-selected")
    sixthRowCell4.classList.add("cell-payments")
    sixthRowCell5.classList.remove("cell-payments-selected")
    sixthRowCell5.classList.add("cell-payments")
    sixthRowCell6.classList.remove("cell-payments-last-selected")
    sixthRowCell6.classList.add("cell-payments-last")

    seventhRowCell1.classList.remove("cell-payments-selected")
    seventhRowCell1.classList.add("cell-payments")
    seventhRowCell2.classList.remove("cell-payments-selected")
    seventhRowCell2.classList.add("cell-payments")
    seventhRowCell3.classList.remove("cell-payments-selected")
    seventhRowCell3.classList.add("cell-payments")
    seventhRowCell4.classList.remove("cell-payments-selected")
    seventhRowCell4.classList.add("cell-payments")
    seventhRowCell5.classList.remove("cell-payments-selected")
    seventhRowCell5.classList.add("cell-payments")
    seventhRowCell6.classList.remove("cell-payments-last-selected")
    seventhRowCell6.classList.add("cell-payments-last")

    selectedRow = 2;
  } else {
    thirdRowCell1.classList.remove("cell-payments-selected")
    thirdRowCell1.classList.add("cell-payments")
    thirdRowCell2.classList.remove("cell-payments-selected")
    thirdRowCell2.classList.add("cell-payments")
    thirdRowCell3.classList.remove("cell-payments-selected")
    thirdRowCell3.classList.add("cell-payments")
    thirdRowCell4.classList.remove("cell-payments-selected")
    thirdRowCell4.classList.add("cell-payments")
    thirdRowCell5.classList.remove("cell-payments-selected")
    thirdRowCell5.classList.add("cell-payments")
    thirdRowCell6.classList.remove("cell-payments-last-selected")
    thirdRowCell6.classList.add("cell-payments-last")
    selectedRow = -1;
  }
})

fourthRow.addEventListener("click", (e) => {
  if (selectedRow !== 3) {
    fourthRowCell1.classList.remove("cell-payments")
    fourthRowCell1.classList.add("cell-payments-selected")
    fourthRowCell2.classList.remove("cell-payments")
    fourthRowCell2.classList.add("cell-payments-selected")
    fourthRowCell3.classList.remove("cell-payments")
    fourthRowCell3.classList.add("cell-payments-selected")
    fourthRowCell4.classList.remove("cell-payments")
    fourthRowCell4.classList.add("cell-payments-selected")
    fourthRowCell5.classList.remove("cell-payments")
    fourthRowCell5.classList.add("cell-payments-selected")
    fourthRowCell6.classList.remove("cell-payments-last")
    fourthRowCell6.classList.add("cell-payments-last-selected")

    secondRowCell1.classList.remove("cell-payments-selected")
    secondRowCell1.classList.add("cell-payments")
    secondRowCell2.classList.remove("cell-payments-selected")
    secondRowCell2.classList.add("cell-payments")
    secondRowCell3.classList.remove("cell-payments-selected")
    secondRowCell3.classList.add("cell-payments")
    secondRowCell4.classList.remove("cell-payments-selected")
    secondRowCell4.classList.add("cell-payments")
    secondRowCell5.classList.remove("cell-payments-selected")
    secondRowCell5.classList.add("cell-payments")
    secondRowCell6.classList.remove("cell-payments-last-selected")
    secondRowCell6.classList.add("cell-payments-last")

    thirdRowCell1.classList.remove("cell-payments-selected")
    thirdRowCell1.classList.add("cell-payments")
    thirdRowCell2.classList.remove("cell-payments-selected")
    thirdRowCell2.classList.add("cell-payments")
    thirdRowCell3.classList.remove("cell-payments-selected")
    thirdRowCell3.classList.add("cell-payments")
    thirdRowCell4.classList.remove("cell-payments-selected")
    thirdRowCell4.classList.add("cell-payments")
    thirdRowCell5.classList.remove("cell-payments-selected")
    thirdRowCell5.classList.add("cell-payments")
    thirdRowCell6.classList.remove("cell-payments-last-selected")
    thirdRowCell6.classList.add("cell-payments-last")

    firstRowCell1.classList.remove("cell-payments-selected")
    firstRowCell1.classList.add("cell-payments")
    firstRowCell2.classList.remove("cell-payments-selected")
    firstRowCell2.classList.add("cell-payments")
    firstRowCell3.classList.remove("cell-payments-selected")
    firstRowCell3.classList.add("cell-payments")
    firstRowCell4.classList.remove("cell-payments-selected")
    firstRowCell4.classList.add("cell-payments")
    firstRowCell5.classList.remove("cell-payments-selected")
    firstRowCell5.classList.add("cell-payments")
    firstRowCell6.classList.remove("cell-payments-last-selected")
    firstRowCell6.classList.add("cell-payments-last")

    fifthRowCell1.classList.remove("cell-payments-selected")
    fifthRowCell1.classList.add("cell-payments")
    fifthRowCell2.classList.remove("cell-payments-selected")
    fifthRowCell2.classList.add("cell-payments")
    fifthRowCell3.classList.remove("cell-payments-selected")
    fifthRowCell3.classList.add("cell-payments")
    fifthRowCell4.classList.remove("cell-payments-selected")
    fifthRowCell4.classList.add("cell-payments")
    fifthRowCell5.classList.remove("cell-payments-selected")
    fifthRowCell5.classList.add("cell-payments")
    fifthRowCell6.classList.remove("cell-payments-last-selected")
    fifthRowCell6.classList.add("cell-payments-last")

    sixthRowCell1.classList.remove("cell-payments-selected")
    sixthRowCell1.classList.add("cell-payments")
    sixthRowCell2.classList.remove("cell-payments-selected")
    sixthRowCell2.classList.add("cell-payments")
    sixthRowCell3.classList.remove("cell-payments-selected")
    sixthRowCell3.classList.add("cell-payments")
    sixthRowCell4.classList.remove("cell-payments-selected")
    sixthRowCell4.classList.add("cell-payments")
    sixthRowCell5.classList.remove("cell-payments-selected")
    sixthRowCell5.classList.add("cell-payments")
    sixthRowCell6.classList.remove("cell-payments-last-selected")
    sixthRowCell6.classList.add("cell-payments-last")

    seventhRowCell1.classList.remove("cell-payments-selected")
    seventhRowCell1.classList.add("cell-payments")
    seventhRowCell2.classList.remove("cell-payments-selected")
    seventhRowCell2.classList.add("cell-payments")
    seventhRowCell3.classList.remove("cell-payments-selected")
    seventhRowCell3.classList.add("cell-payments")
    seventhRowCell4.classList.remove("cell-payments-selected")
    seventhRowCell4.classList.add("cell-payments")
    seventhRowCell5.classList.remove("cell-payments-selected")
    seventhRowCell5.classList.add("cell-payments")
    seventhRowCell6.classList.remove("cell-payments-last-selected")
    seventhRowCell6.classList.add("cell-payments-last")

    selectedRow = 3;
  } else {
    fourthRowCell1.classList.remove("cell-payments-selected")
    fourthRowCell1.classList.add("cell-payments")
    fourthRowCell2.classList.remove("cell-payments-selected")
    fourthRowCell2.classList.add("cell-payments")
    fourthRowCell3.classList.remove("cell-payments-selected")
    fourthRowCell3.classList.add("cell-payments")
    fourthRowCell4.classList.remove("cell-payments-selected")
    fourthRowCell4.classList.add("cell-payments")
    fourthRowCell5.classList.remove("cell-payments-selected")
    fourthRowCell5.classList.add("cell-payments")
    fourthRowCell6.classList.remove("cell-payments-last-selected")
    fourthRowCell6.classList.add("cell-payments-last")
    selectedRow = -1;
  }
})

fifthRow.addEventListener("click", (e) => {
  if (selectedRow !== 4) {
    fifthRowCell1.classList.remove("cell-payments")
    fifthRowCell1.classList.add("cell-payments-selected")
    fifthRowCell2.classList.remove("cell-payments")
    fifthRowCell2.classList.add("cell-payments-selected")
    fifthRowCell3.classList.remove("cell-payments")
    fifthRowCell3.classList.add("cell-payments-selected")
    fifthRowCell4.classList.remove("cell-payments")
    fifthRowCell4.classList.add("cell-payments-selected")
    fifthRowCell5.classList.remove("cell-payments")
    fifthRowCell5.classList.add("cell-payments-selected")
    fifthRowCell6.classList.remove("cell-payments-last")
    fifthRowCell6.classList.add("cell-payments-last-selected")

    secondRowCell1.classList.remove("cell-payments-selected")
    secondRowCell1.classList.add("cell-payments")
    secondRowCell2.classList.remove("cell-payments-selected")
    secondRowCell2.classList.add("cell-payments")
    secondRowCell3.classList.remove("cell-payments-selected")
    secondRowCell3.classList.add("cell-payments")
    secondRowCell4.classList.remove("cell-payments-selected")
    secondRowCell4.classList.add("cell-payments")
    secondRowCell5.classList.remove("cell-payments-selected")
    secondRowCell5.classList.add("cell-payments")
    secondRowCell6.classList.remove("cell-payments-last-selected")
    secondRowCell6.classList.add("cell-payments-last")

    thirdRowCell1.classList.remove("cell-payments-selected")
    thirdRowCell1.classList.add("cell-payments")
    thirdRowCell2.classList.remove("cell-payments-selected")
    thirdRowCell2.classList.add("cell-payments")
    thirdRowCell3.classList.remove("cell-payments-selected")
    thirdRowCell3.classList.add("cell-payments")
    thirdRowCell4.classList.remove("cell-payments-selected")
    thirdRowCell4.classList.add("cell-payments")
    thirdRowCell5.classList.remove("cell-payments-selected")
    thirdRowCell5.classList.add("cell-payments")
    thirdRowCell6.classList.remove("cell-payments-last-selected")
    thirdRowCell6.classList.add("cell-payments-last")

    fourthRowCell1.classList.remove("cell-payments-selected")
    fourthRowCell1.classList.add("cell-payments")
    fourthRowCell2.classList.remove("cell-payments-selected")
    fourthRowCell2.classList.add("cell-payments")
    fourthRowCell3.classList.remove("cell-payments-selected")
    fourthRowCell3.classList.add("cell-payments")
    fourthRowCell4.classList.remove("cell-payments-selected")
    fourthRowCell4.classList.add("cell-payments")
    fourthRowCell5.classList.remove("cell-payments-selected")
    fourthRowCell5.classList.add("cell-payments")
    fourthRowCell6.classList.remove("cell-payments-last-selected")
    fourthRowCell6.classList.add("cell-payments-last")

    firstRowCell1.classList.remove("cell-payments-selected")
    firstRowCell1.classList.add("cell-payments")
    firstRowCell2.classList.remove("cell-payments-selected")
    firstRowCell2.classList.add("cell-payments")
    firstRowCell3.classList.remove("cell-payments-selected")
    firstRowCell3.classList.add("cell-payments")
    firstRowCell4.classList.remove("cell-payments-selected")
    firstRowCell4.classList.add("cell-payments")
    firstRowCell5.classList.remove("cell-payments-selected")
    firstRowCell5.classList.add("cell-payments")
    firstRowCell6.classList.remove("cell-payments-last-selected")
    firstRowCell6.classList.add("cell-payments-last")

    sixthRowCell1.classList.remove("cell-payments-selected")
    sixthRowCell1.classList.add("cell-payments")
    sixthRowCell2.classList.remove("cell-payments-selected")
    sixthRowCell2.classList.add("cell-payments")
    sixthRowCell3.classList.remove("cell-payments-selected")
    sixthRowCell3.classList.add("cell-payments")
    sixthRowCell4.classList.remove("cell-payments-selected")
    sixthRowCell4.classList.add("cell-payments")
    sixthRowCell5.classList.remove("cell-payments-selected")
    sixthRowCell5.classList.add("cell-payments")
    sixthRowCell6.classList.remove("cell-payments-last-selected")
    sixthRowCell6.classList.add("cell-payments-last")

    seventhRowCell1.classList.remove("cell-payments-selected")
    seventhRowCell1.classList.add("cell-payments")
    seventhRowCell2.classList.remove("cell-payments-selected")
    seventhRowCell2.classList.add("cell-payments")
    seventhRowCell3.classList.remove("cell-payments-selected")
    seventhRowCell3.classList.add("cell-payments")
    seventhRowCell4.classList.remove("cell-payments-selected")
    seventhRowCell4.classList.add("cell-payments")
    seventhRowCell5.classList.remove("cell-payments-selected")
    seventhRowCell5.classList.add("cell-payments")
    seventhRowCell6.classList.remove("cell-payments-last-selected")
    seventhRowCell6.classList.add("cell-payments-last")

    selectedRow = 4;
  } else {
    fifthRowCell1.classList.remove("cell-payments-selected")
    fifthRowCell1.classList.add("cell-payments")
    fifthRowCell2.classList.remove("cell-payments-selected")
    fifthRowCell2.classList.add("cell-payments")
    fifthRowCell3.classList.remove("cell-payments-selected")
    fifthRowCell3.classList.add("cell-payments")
    fifthRowCell4.classList.remove("cell-payments-selected")
    fifthRowCell4.classList.add("cell-payments")
    fifthRowCell5.classList.remove("cell-payments-selected")
    fifthRowCell5.classList.add("cell-payments")
    fifthRowCell6.classList.remove("cell-payments-last-selected")
    fifthRowCell6.classList.add("cell-payments-last")
    selectedRow = -1;
  }
})

sixthRow.addEventListener("click", (e) => {
  if (selectedRow !== 5) {
    sixthRowCell1.classList.remove("cell-payments")
    sixthRowCell1.classList.add("cell-payments-selected")
    sixthRowCell2.classList.remove("cell-payments")
    sixthRowCell2.classList.add("cell-payments-selected")
    sixthRowCell3.classList.remove("cell-payments")
    sixthRowCell3.classList.add("cell-payments-selected")
    sixthRowCell4.classList.remove("cell-payments")
    sixthRowCell4.classList.add("cell-payments-selected")
    sixthRowCell5.classList.remove("cell-payments")
    sixthRowCell5.classList.add("cell-payments-selected")
    sixthRowCell6.classList.remove("cell-payments-last")
    sixthRowCell6.classList.add("cell-payments-last-selected")

    secondRowCell1.classList.remove("cell-payments-selected")
    secondRowCell1.classList.add("cell-payments")
    secondRowCell2.classList.remove("cell-payments-selected")
    secondRowCell2.classList.add("cell-payments")
    secondRowCell3.classList.remove("cell-payments-selected")
    secondRowCell3.classList.add("cell-payments")
    secondRowCell4.classList.remove("cell-payments-selected")
    secondRowCell4.classList.add("cell-payments")
    secondRowCell5.classList.remove("cell-payments-selected")
    secondRowCell5.classList.add("cell-payments")
    secondRowCell6.classList.remove("cell-payments-last-selected")
    secondRowCell6.classList.add("cell-payments-last")

    thirdRowCell1.classList.remove("cell-payments-selected")
    thirdRowCell1.classList.add("cell-payments")
    thirdRowCell2.classList.remove("cell-payments-selected")
    thirdRowCell2.classList.add("cell-payments")
    thirdRowCell3.classList.remove("cell-payments-selected")
    thirdRowCell3.classList.add("cell-payments")
    thirdRowCell4.classList.remove("cell-payments-selected")
    thirdRowCell4.classList.add("cell-payments")
    thirdRowCell5.classList.remove("cell-payments-selected")
    thirdRowCell5.classList.add("cell-payments")
    thirdRowCell6.classList.remove("cell-payments-last-selected")
    thirdRowCell6.classList.add("cell-payments-last")

    fourthRowCell1.classList.remove("cell-payments-selected")
    fourthRowCell1.classList.add("cell-payments")
    fourthRowCell2.classList.remove("cell-payments-selected")
    fourthRowCell2.classList.add("cell-payments")
    fourthRowCell3.classList.remove("cell-payments-selected")
    fourthRowCell3.classList.add("cell-payments")
    fourthRowCell4.classList.remove("cell-payments-selected")
    fourthRowCell4.classList.add("cell-payments")
    fourthRowCell5.classList.remove("cell-payments-selected")
    fourthRowCell5.classList.add("cell-payments")
    fourthRowCell6.classList.remove("cell-payments-last-selected")
    fourthRowCell6.classList.add("cell-payments-last")

    fifthRowCell1.classList.remove("cell-payments-selected")
    fifthRowCell1.classList.add("cell-payments")
    fifthRowCell2.classList.remove("cell-payments-selected")
    fifthRowCell2.classList.add("cell-payments")
    fifthRowCell3.classList.remove("cell-payments-selected")
    fifthRowCell3.classList.add("cell-payments")
    fifthRowCell4.classList.remove("cell-payments-selected")
    fifthRowCell4.classList.add("cell-payments")
    fifthRowCell5.classList.remove("cell-payments-selected")
    fifthRowCell5.classList.add("cell-payments")
    fifthRowCell6.classList.remove("cell-payments-last-selected")
    fifthRowCell6.classList.add("cell-payments-last")

    firstRowCell1.classList.remove("cell-payments-selected")
    firstRowCell1.classList.add("cell-payments")
    firstRowCell2.classList.remove("cell-payments-selected")
    firstRowCell2.classList.add("cell-payments")
    firstRowCell3.classList.remove("cell-payments-selected")
    firstRowCell3.classList.add("cell-payments")
    firstRowCell4.classList.remove("cell-payments-selected")
    firstRowCell4.classList.add("cell-payments")
    firstRowCell5.classList.remove("cell-payments-selected")
    firstRowCell5.classList.add("cell-payments")
    firstRowCell6.classList.remove("cell-payments-last-selected")
    firstRowCell6.classList.add("cell-payments-last")

    seventhRowCell1.classList.remove("cell-payments-selected")
    seventhRowCell1.classList.add("cell-payments")
    seventhRowCell2.classList.remove("cell-payments-selected")
    seventhRowCell2.classList.add("cell-payments")
    seventhRowCell3.classList.remove("cell-payments-selected")
    seventhRowCell3.classList.add("cell-payments")
    seventhRowCell4.classList.remove("cell-payments-selected")
    seventhRowCell4.classList.add("cell-payments")
    seventhRowCell5.classList.remove("cell-payments-selected")
    seventhRowCell5.classList.add("cell-payments")
    seventhRowCell6.classList.remove("cell-payments-last-selected")
    seventhRowCell6.classList.add("cell-payments-last")

    selectedRow = 5;
  } else {
    sixthRowCell1.classList.remove("cell-payments-selected")
    sixthRowCell1.classList.add("cell-payments")
    sixthRowCell2.classList.remove("cell-payments-selected")
    sixthRowCell2.classList.add("cell-payments")
    sixthRowCell3.classList.remove("cell-payments-selected")
    sixthRowCell3.classList.add("cell-payments")
    sixthRowCell4.classList.remove("cell-payments-selected")
    sixthRowCell4.classList.add("cell-payments")
    sixthRowCell5.classList.remove("cell-payments-selected")
    sixthRowCell5.classList.add("cell-payments")
    sixthRowCell6.classList.remove("cell-payments-last-selected")
    sixthRowCell6.classList.add("cell-payments-last")
    selectedRow = -1;
  }
})

seventhRow.addEventListener("click", (e) => {
  if (selectedRow !== 6) {
    seventhRowCell1.classList.remove("cell-payments")
    seventhRowCell1.classList.add("cell-payments-selected")
    seventhRowCell2.classList.remove("cell-payments")
    seventhRowCell2.classList.add("cell-payments-selected")
    seventhRowCell3.classList.remove("cell-payments")
    seventhRowCell3.classList.add("cell-payments-selected")
    seventhRowCell4.classList.remove("cell-payments")
    seventhRowCell4.classList.add("cell-payments-selected")
    seventhRowCell5.classList.remove("cell-payments")
    seventhRowCell5.classList.add("cell-payments-selected")
    seventhRowCell6.classList.remove("cell-payments-last")
    seventhRowCell6.classList.add("cell-payments-last-selected")

    secondRowCell1.classList.remove("cell-payments-selected")
    secondRowCell1.classList.add("cell-payments")
    secondRowCell2.classList.remove("cell-payments-selected")
    secondRowCell2.classList.add("cell-payments")
    secondRowCell3.classList.remove("cell-payments-selected")
    secondRowCell3.classList.add("cell-payments")
    secondRowCell4.classList.remove("cell-payments-selected")
    secondRowCell4.classList.add("cell-payments")
    secondRowCell5.classList.remove("cell-payments-selected")
    secondRowCell5.classList.add("cell-payments")
    secondRowCell6.classList.remove("cell-payments-last-selected")
    secondRowCell6.classList.add("cell-payments-last")

    thirdRowCell1.classList.remove("cell-payments-selected")
    thirdRowCell1.classList.add("cell-payments")
    thirdRowCell2.classList.remove("cell-payments-selected")
    thirdRowCell2.classList.add("cell-payments")
    thirdRowCell3.classList.remove("cell-payments-selected")
    thirdRowCell3.classList.add("cell-payments")
    thirdRowCell4.classList.remove("cell-payments-selected")
    thirdRowCell4.classList.add("cell-payments")
    thirdRowCell5.classList.remove("cell-payments-selected")
    thirdRowCell5.classList.add("cell-payments")
    thirdRowCell6.classList.remove("cell-payments-last-selected")
    thirdRowCell6.classList.add("cell-payments-last")

    fourthRowCell1.classList.remove("cell-payments-selected")
    fourthRowCell1.classList.add("cell-payments")
    fourthRowCell2.classList.remove("cell-payments-selected")
    fourthRowCell2.classList.add("cell-payments")
    fourthRowCell3.classList.remove("cell-payments-selected")
    fourthRowCell3.classList.add("cell-payments")
    fourthRowCell4.classList.remove("cell-payments-selected")
    fourthRowCell4.classList.add("cell-payments")
    fourthRowCell5.classList.remove("cell-payments-selected")
    fourthRowCell5.classList.add("cell-payments")
    fourthRowCell6.classList.remove("cell-payments-last-selected")
    fourthRowCell6.classList.add("cell-payments-last")

    fifthRowCell1.classList.remove("cell-payments-selected")
    fifthRowCell1.classList.add("cell-payments")
    fifthRowCell2.classList.remove("cell-payments-selected")
    fifthRowCell2.classList.add("cell-payments")
    fifthRowCell3.classList.remove("cell-payments-selected")
    fifthRowCell3.classList.add("cell-payments")
    fifthRowCell4.classList.remove("cell-payments-selected")
    fifthRowCell4.classList.add("cell-payments")
    fifthRowCell5.classList.remove("cell-payments-selected")
    fifthRowCell5.classList.add("cell-payments")
    fifthRowCell6.classList.remove("cell-payments-last-selected")
    fifthRowCell6.classList.add("cell-payments-last")

    sixthRowCell1.classList.remove("cell-payments-selected")
    sixthRowCell1.classList.add("cell-payments")
    sixthRowCell2.classList.remove("cell-payments-selected")
    sixthRowCell2.classList.add("cell-payments")
    sixthRowCell3.classList.remove("cell-payments-selected")
    sixthRowCell3.classList.add("cell-payments")
    sixthRowCell4.classList.remove("cell-payments-selected")
    sixthRowCell4.classList.add("cell-payments")
    sixthRowCell5.classList.remove("cell-payments-selected")
    sixthRowCell5.classList.add("cell-payments")
    sixthRowCell6.classList.remove("cell-payments-last-selected")
    sixthRowCell6.classList.add("cell-payments-last")

    firstRowCell1.classList.remove("cell-payments-selected")
    firstRowCell1.classList.add("cell-payments")
    firstRowCell2.classList.remove("cell-payments-selected")
    firstRowCell2.classList.add("cell-payments")
    firstRowCell3.classList.remove("cell-payments-selected")
    firstRowCell3.classList.add("cell-payments")
    firstRowCell4.classList.remove("cell-payments-selected")
    firstRowCell4.classList.add("cell-payments")
    firstRowCell5.classList.remove("cell-payments-selected")
    firstRowCell5.classList.add("cell-payments")
    firstRowCell6.classList.remove("cell-payments-last-selected")
    firstRowCell6.classList.add("cell-payments-last")

    selectedRow = 6;
  } else {
    seventhRowCell1.classList.remove("cell-payments-selected")
    seventhRowCell1.classList.add("cell-payments")
    seventhRowCell2.classList.remove("cell-payments-selected")
    seventhRowCell2.classList.add("cell-payments")
    seventhRowCell3.classList.remove("cell-payments-selected")
    seventhRowCell3.classList.add("cell-payments")
    seventhRowCell4.classList.remove("cell-payments-selected")
    seventhRowCell4.classList.add("cell-payments")
    seventhRowCell5.classList.remove("cell-payments-selected")
    seventhRowCell5.classList.add("cell-payments")
    seventhRowCell6.classList.remove("cell-payments-last-selected")
    seventhRowCell6.classList.add("cell-payments-last")
    selectedRow = -1;
  }
})


function statusMapper(isActive) {
  return isActive ? '' : 'Оплачено'
}

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
    .then(response => response.json())
}
