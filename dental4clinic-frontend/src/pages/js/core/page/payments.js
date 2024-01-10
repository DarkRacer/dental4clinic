import { get, post } from "../rest.js";
import {changeClassRows} from "../table.js";

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

const initPayments = () => {
  get('payments/all').then((data) => {
    updatePaymentsTableValue(data)
  }).then((error) => console.error(error))

  paidButton.addEventListener("click", (e) => {
    const paymentsToUpdate = getSelectedPayment()
    if (paymentsToUpdate) {
      paymentsToUpdate.isActive = false;
      post('payments/update', paymentsToUpdate).then((data) => {
        updatePaymentsTableValue(data)
      }).catch((error) => console.error(error))
    }
  })

  noPaidButton.addEventListener("click", (e) => {
    const paymentsToUpdate = getSelectedPayment()
    if (paymentsToUpdate) {
      paymentsToUpdate.isActive = true;
      post('payments/update', paymentsToUpdate).then((data) => {
        updatePaymentsTableValue(data)
      }).catch((error) => console.error(error))
    }
  })

  firstRow.addEventListener("click", (e) => {
    if (selectedRow !== 0) {
      changeClassRows([
        firstRowCell1,
        firstRowCell2,
        firstRowCell3,
        firstRowCell4,
        firstRowCell5,
        firstRowCell6
      ], "cell-payments", "cell-payments-selected")

      changeClassRows([
        secondRowCell1,
        secondRowCell2,
        secondRowCell3,
        secondRowCell4,
        secondRowCell5,
        secondRowCell6,
        thirdRowCell1,
        thirdRowCell2,
        thirdRowCell3,
        thirdRowCell4,
        thirdRowCell5,
        thirdRowCell6,
        fourthRowCell1,
        fourthRowCell2,
        fourthRowCell3,
        fourthRowCell4,
        fourthRowCell5,
        fourthRowCell6,
        fifthRowCell1,
        fifthRowCell2,
        fifthRowCell3,
        fifthRowCell4,
        fifthRowCell5,
        fifthRowCell6,
        sixthRowCell1,
        sixthRowCell2,
        sixthRowCell3,
        sixthRowCell4,
        sixthRowCell5,
        sixthRowCell6,
        seventhRowCell1,
        seventhRowCell2,
        seventhRowCell3,
        seventhRowCell4,
        seventhRowCell5,
        seventhRowCell6
      ], "cell-payments-selected", "cell-payments")

      selectedRow = 0;
    } else {
      changeClassRows([
        firstRowCell1,
        firstRowCell2,
        firstRowCell3,
        firstRowCell4,
        firstRowCell5,
        firstRowCell6
      ], "cell-payments-selected", "cell-payments")

      selectedRow = -1;
    }
  })

  secondRow.addEventListener("click", (e) => {
    if (selectedRow !== 1) {
      changeClassRows([
        secondRowCell1,
        secondRowCell2,
        secondRowCell3,
        secondRowCell4,
        secondRowCell5,
        secondRowCell6
      ], "cell-payments", "cell-payments-selected")

      changeClassRows([
        firstRowCell1,
        firstRowCell2,
        firstRowCell3,
        firstRowCell4,
        firstRowCell5,
        firstRowCell6,
        thirdRowCell1,
        thirdRowCell2,
        thirdRowCell3,
        thirdRowCell4,
        thirdRowCell5,
        thirdRowCell6,
        fourthRowCell1,
        fourthRowCell2,
        fourthRowCell3,
        fourthRowCell4,
        fourthRowCell5,
        fourthRowCell6,
        fifthRowCell1,
        fifthRowCell2,
        fifthRowCell3,
        fifthRowCell4,
        fifthRowCell5,
        fifthRowCell6,
        sixthRowCell1,
        sixthRowCell2,
        sixthRowCell3,
        sixthRowCell4,
        sixthRowCell5,
        sixthRowCell6,
        seventhRowCell1,
        seventhRowCell2,
        seventhRowCell3,
        seventhRowCell4,
        seventhRowCell5,
        seventhRowCell6
      ], "cell-payments-selected", "cell-payments")

      selectedRow = 1;
    } else {
      changeClassRows([
        secondRowCell1,
        secondRowCell2,
        secondRowCell3,
        secondRowCell4,
        secondRowCell5,
        secondRowCell6
      ], "cell-payments-selected", "cell-payments")

      selectedRow = -1;
    }
  })

  thirdRow.addEventListener("click", (e) => {
    if (selectedRow !== 2) {
      changeClassRows([
        thirdRowCell1,
        thirdRowCell2,
        thirdRowCell3,
        thirdRowCell4,
        thirdRowCell5,
        thirdRowCell6
      ], "cell-payments", "cell-payments-selected")

      changeClassRows([
        firstRowCell1,
        firstRowCell2,
        firstRowCell3,
        firstRowCell4,
        firstRowCell5,
        firstRowCell6,
        secondRowCell1,
        secondRowCell2,
        secondRowCell3,
        secondRowCell4,
        secondRowCell5,
        secondRowCell6,
        fourthRowCell1,
        fourthRowCell2,
        fourthRowCell3,
        fourthRowCell4,
        fourthRowCell5,
        fourthRowCell6,
        fifthRowCell1,
        fifthRowCell2,
        fifthRowCell3,
        fifthRowCell4,
        fifthRowCell5,
        fifthRowCell6,
        sixthRowCell1,
        sixthRowCell2,
        sixthRowCell3,
        sixthRowCell4,
        sixthRowCell5,
        sixthRowCell6,
        seventhRowCell1,
        seventhRowCell2,
        seventhRowCell3,
        seventhRowCell4,
        seventhRowCell5,
        seventhRowCell6
      ], "cell-payments-selected", "cell-payments")

      selectedRow = 2;
    } else {
      changeClassRows([
        thirdRowCell1,
        thirdRowCell2,
        thirdRowCell3,
        thirdRowCell4,
        thirdRowCell5,
        thirdRowCell6
      ], "cell-payments-selected", "cell-payments")

      selectedRow = -1;
    }
  })

  fourthRow.addEventListener("click", (e) => {
    if (selectedRow !== 3) {
      changeClassRows([
        fourthRowCell1,
        fourthRowCell2,
        fourthRowCell3,
        fourthRowCell4,
        fourthRowCell5,
        fourthRowCell6
      ], "cell-payments", "cell-payments-selected")

      changeClassRows([
        firstRowCell1,
        firstRowCell2,
        firstRowCell3,
        firstRowCell4,
        firstRowCell5,
        firstRowCell6,
        secondRowCell1,
        secondRowCell2,
        secondRowCell3,
        secondRowCell4,
        secondRowCell5,
        secondRowCell6,
        thirdRowCell1,
        thirdRowCell2,
        thirdRowCell3,
        thirdRowCell4,
        thirdRowCell5,
        thirdRowCell6,
        fifthRowCell1,
        fifthRowCell2,
        fifthRowCell3,
        fifthRowCell4,
        fifthRowCell5,
        fifthRowCell6,
        sixthRowCell1,
        sixthRowCell2,
        sixthRowCell3,
        sixthRowCell4,
        sixthRowCell5,
        sixthRowCell6,
        seventhRowCell1,
        seventhRowCell2,
        seventhRowCell3,
        seventhRowCell4,
        seventhRowCell5,
        seventhRowCell6
      ], "cell-payments-selected", "cell-payments")

      selectedRow = 3;
    } else {
      changeClassRows([
        fourthRowCell1,
        fourthRowCell2,
        fourthRowCell3,
        fourthRowCell4,
        fourthRowCell5,
        fourthRowCell6
      ], "cell-payments-selected", "cell-payments")

      selectedRow = -1;
    }
  })

  fifthRow.addEventListener("click", (e) => {
    if (selectedRow !== 4) {
      changeClassRows([
        fifthRowCell1,
        fifthRowCell2,
        fifthRowCell3,
        fifthRowCell4,
        fifthRowCell5,
        fifthRowCell6
      ], "cell-payments", "cell-payments-selected")

      changeClassRows([
        firstRowCell1,
        firstRowCell2,
        firstRowCell3,
        firstRowCell4,
        firstRowCell5,
        firstRowCell6,
        secondRowCell1,
        secondRowCell2,
        secondRowCell3,
        secondRowCell4,
        secondRowCell5,
        secondRowCell6,
        thirdRowCell1,
        thirdRowCell2,
        thirdRowCell3,
        thirdRowCell4,
        thirdRowCell5,
        thirdRowCell6,
        fourthRowCell1,
        fourthRowCell2,
        fourthRowCell3,
        fourthRowCell4,
        fourthRowCell5,
        fourthRowCell6,
        sixthRowCell1,
        sixthRowCell2,
        sixthRowCell3,
        sixthRowCell4,
        sixthRowCell5,
        sixthRowCell6,
        seventhRowCell1,
        seventhRowCell2,
        seventhRowCell3,
        seventhRowCell4,
        seventhRowCell5,
        seventhRowCell6
      ], "cell-payments-selected", "cell-payments")

      selectedRow = 4;
    } else {
      changeClassRows([
        fifthRowCell1,
        fifthRowCell2,
        fifthRowCell3,
        fifthRowCell4,
        fifthRowCell5,
        fifthRowCell6
      ], "cell-payments-selected", "cell-payments")

      selectedRow = -1;
    }
  })

  sixthRow.addEventListener("click", (e) => {
    if (selectedRow !== 5) {
      changeClassRows([
        sixthRowCell1,
        sixthRowCell2,
        sixthRowCell3,
        sixthRowCell4,
        sixthRowCell5,
        sixthRowCell6
      ], "cell-payments", "cell-payments-selected")

      changeClassRows([
        firstRowCell1,
        firstRowCell2,
        firstRowCell3,
        firstRowCell4,
        firstRowCell5,
        firstRowCell6,
        secondRowCell1,
        secondRowCell2,
        secondRowCell3,
        secondRowCell4,
        secondRowCell5,
        secondRowCell6,
        thirdRowCell1,
        thirdRowCell2,
        thirdRowCell3,
        thirdRowCell4,
        thirdRowCell5,
        thirdRowCell6,
        fourthRowCell1,
        fourthRowCell2,
        fourthRowCell3,
        fourthRowCell4,
        fourthRowCell5,
        fourthRowCell6,
        fifthRowCell1,
        fifthRowCell2,
        fifthRowCell3,
        fifthRowCell4,
        fifthRowCell5,
        fifthRowCell6,
        seventhRowCell1,
        seventhRowCell2,
        seventhRowCell3,
        seventhRowCell4,
        seventhRowCell5,
        seventhRowCell6
      ], "cell-payments-selected", "cell-payments")

      selectedRow = 5;
    } else {
      changeClassRows([
        sixthRowCell1,
        sixthRowCell2,
        sixthRowCell3,
        sixthRowCell4,
        sixthRowCell5,
        sixthRowCell6
      ], "cell-payments-selected", "cell-payments")

      selectedRow = -1;
    }
  })

  seventhRow.addEventListener("click", (e) => {
    if (selectedRow !== 6) {
      changeClassRows([
        seventhRowCell1,
        seventhRowCell2,
        seventhRowCell3,
        seventhRowCell4,
        seventhRowCell5,
        seventhRowCell6
      ], "cell-payments", "cell-payments-selected")

      changeClassRows([
        firstRowCell1,
        firstRowCell2,
        firstRowCell3,
        firstRowCell4,
        firstRowCell5,
        firstRowCell6,
        secondRowCell1,
        secondRowCell2,
        secondRowCell3,
        secondRowCell4,
        secondRowCell5,
        secondRowCell6,
        thirdRowCell1,
        thirdRowCell2,
        thirdRowCell3,
        thirdRowCell4,
        thirdRowCell5,
        thirdRowCell6,
        fourthRowCell1,
        fourthRowCell2,
        fourthRowCell3,
        fourthRowCell4,
        fourthRowCell5,
        fourthRowCell6,
        fifthRowCell1,
        fifthRowCell2,
        fifthRowCell3,
        fifthRowCell4,
        fifthRowCell5,
        fifthRowCell6,
        sixthRowCell1,
        sixthRowCell2,
        sixthRowCell3,
        sixthRowCell4,
        sixthRowCell5,
        sixthRowCell6
      ], "cell-payments-selected", "cell-payments")

      selectedRow = 6;
    } else {
      changeClassRows([
        seventhRowCell1,
        seventhRowCell2,
        seventhRowCell3,
        seventhRowCell4,
        seventhRowCell5,
        seventhRowCell6
      ], "cell-payments-selected", "cell-payments")

      selectedRow = -1;
    }
  })
}

const updatePaymentsTable = () => {
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

const updatePaymentsTableValue = (data) => {
  paymentsTableValue = data;
  updatePaymentsTable()
}

const getSelectedPayment = () => {
  return selectedRow > -1 ? paymentsTableValue[selectedRow] : null;
}

const statusMapper = (isActive) => {
  return isActive ? '' : 'Оплачено'
}

export { initPayments, updatePaymentsTableValue, getSelectedPayment}
