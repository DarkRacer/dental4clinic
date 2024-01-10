import { get } from "../core/rest.js";
import {changeClassRows} from "../core/table.js";

const userId = 1;

const firstRow = document.getElementById("first-row");
const firstRowCell1 = document.getElementById("first-row-cell-1");
const firstRowCell2 = document.getElementById("first-row-cell-2");
const firstRowCell3 = document.getElementById("first-row-cell-3");
const firstRowCell4 = document.getElementById("first-row-cell-4");
const firstRowCell5 = document.getElementById("first-row-cell-5");

const firstDate = document.getElementById("first-date");
const firstDoctor = document.getElementById("first-doctor");
const firstService = document.getElementById("first-service");
const firstPrice = document.getElementById("first-price");
const firstStatus = document.getElementById("first-status");

const secondRow = document.getElementById("second-row");
const secondRowCell1 = document.getElementById("second-row-cell-1");
const secondRowCell2 = document.getElementById("second-row-cell-2");
const secondRowCell3 = document.getElementById("second-row-cell-3");
const secondRowCell4 = document.getElementById("second-row-cell-4");
const secondRowCell5 = document.getElementById("second-row-cell-5");

const secondDate = document.getElementById("second-date");
const secondDoctor = document.getElementById("second-doctor");
const secondService = document.getElementById("second-service");
const secondPrice = document.getElementById("second-price");
const secondStatus = document.getElementById("second-status");


const thirdRow = document.getElementById("third-row");
const thirdRowCell1 = document.getElementById("third-row-cell-1");
const thirdRowCell2 = document.getElementById("third-row-cell-2");
const thirdRowCell3 = document.getElementById("third-row-cell-3");
const thirdRowCell4 = document.getElementById("third-row-cell-4");
const thirdRowCell5 = document.getElementById("third-row-cell-5");

const thirdDate = document.getElementById("third-date");
const thirdDoctor = document.getElementById("third-doctor");
const thirdService = document.getElementById("third-service");
const thirdPrice = document.getElementById("third-price");
const thirdStatus = document.getElementById("third-status");


const fourthRow = document.getElementById("fourth-row");
const fourthRowCell1 = document.getElementById("fourth-row-cell-1");
const fourthRowCell2 = document.getElementById("fourth-row-cell-2");
const fourthRowCell3 = document.getElementById("fourth-row-cell-3");
const fourthRowCell4 = document.getElementById("fourth-row-cell-4");
const fourthRowCell5 = document.getElementById("fourth-row-cell-5");

const fourthDate = document.getElementById("fourth-date");
const fourthDoctor = document.getElementById("fourth-doctor");
const fourthService = document.getElementById("fourth-service");
const fourthPrice = document.getElementById("fourth-price");
const fourthStatus = document.getElementById("fourth-status");


const fifthRow = document.getElementById("fifth-row");
const fifthRowCell1 = document.getElementById("fifth-row-cell-1");
const fifthRowCell2 = document.getElementById("fifth-row-cell-2");
const fifthRowCell3 = document.getElementById("fifth-row-cell-3");
const fifthRowCell4 = document.getElementById("fifth-row-cell-4");
const fifthRowCell5 = document.getElementById("fifth-row-cell-5");

const fifthDate = document.getElementById("fifth-date");
const fifthDoctor = document.getElementById("fifth-doctor");
const fifthService = document.getElementById("fifth-service");
const fifthPrice = document.getElementById("fifth-price");
const fifthStatus = document.getElementById("fifth-status");

const paymentInfo = document.getElementById("payment-info");
const paymentInfoPrice = document.getElementById("payment-info-price");


let paymentsTableValue = [];
const selectedRow = [];


get(`payments/user/${userId}`).then(data => {
  paymentsTableValue = data
  updateDoctorTable()
})
  .catch((error) => {
    console.error('Error:', error);
  });

const updateDoctorTable = () => {
  if (paymentsTableValue[0]) {
    firstDate.textContent = paymentsTableValue[0].date;
    firstDoctor.textContent = paymentsTableValue[0].doctor
    firstService.textContent = paymentsTableValue[0].service
    firstPrice.textContent = paymentsTableValue[0].price
    firstStatus.textContent = paymentActiveMapper(paymentsTableValue[0].isActive)
  } else {
    firstDate.textContent = '';
    firstDoctor.textContent = ''
    firstService.textContent = ''
    firstPrice.textContent = ''
    firstStatus.textContent = ''
  }

  if (paymentsTableValue[1]) {
    secondDate.textContent = paymentsTableValue[1].date;
    secondDoctor.textContent = paymentsTableValue[1].doctor
    secondService.textContent = paymentsTableValue[1].service
    secondPrice.textContent = paymentsTableValue[1].price
    secondStatus.textContent = paymentActiveMapper(paymentsTableValue[1].isActive)
  } else {
    secondDate.textContent = '';
    secondDoctor.textContent = ''
    secondService.textContent = ''
    secondPrice.textContent = ''
    secondStatus.textContent = ''
  }

  if (paymentsTableValue[2]) {
    thirdDate.textContent = paymentsTableValue[2].date;
    thirdDoctor.textContent = paymentsTableValue[2].doctor
    thirdService.textContent = paymentsTableValue[2].service
    thirdPrice.textContent = paymentsTableValue[2].price
    thirdStatus.textContent = paymentActiveMapper(paymentsTableValue[2].isActive)
  } else {
    thirdDate.textContent = '';
    thirdDoctor.textContent = ''
    thirdService.textContent = ''
    thirdPrice.textContent = ''
    thirdStatus.textContent = ''
  }

  if (paymentsTableValue[3]) {
    fourthDate.textContent = paymentsTableValue[3].date;
    fourthDoctor.textContent = paymentsTableValue[3].doctor
    fourthService.textContent = paymentsTableValue[3].service
    fourthPrice.textContent = paymentsTableValue[3].price
    fourthStatus.textContent = paymentActiveMapper(paymentsTableValue[3].isActive)
  } else {
    fourthDate.textContent = '';
    fourthDoctor.textContent = ''
    fourthService.textContent = ''
    fourthPrice.textContent = ''
    fourthStatus.textContent = ''
  }

  if (paymentsTableValue[4]) {
    fifthDate.textContent = paymentsTableValue[4].date;
    fifthDoctor.textContent = paymentsTableValue[4].doctor
    fifthService.textContent = paymentsTableValue[4].service
    fifthPrice.textContent = paymentsTableValue[4].price
    fifthStatus.textContent = paymentActiveMapper(paymentsTableValue[4].isActive)
  } else {
    fifthDate.textContent = '';
    fifthDoctor.textContent = ''
    fifthService.textContent = ''
    fifthPrice.textContent = ''
    fifthStatus.textContent = ''
  }
}

firstRow.addEventListener("click", (e) => {
  if (paymentsTableValue[0]) {
    const index = selectedRow.findIndex((selected) => selected === 0);
    if (index === -1) {
      changeClassRows([
        firstRowCell1,
        firstRowCell2,
        firstRowCell3,
        firstRowCell4,
        firstRowCell5
      ], 'cell-payments', 'cell-payments-selected')

      selectedRow.push(0);
    } else {
      changeClassRows([
        firstRowCell1,
        firstRowCell2,
        firstRowCell3,
        firstRowCell4,
        firstRowCell5
      ], 'cell-payments-selected', 'cell-payments')

      selectedRow.splice(index, 1);
    }
    updatePaymentInfo()
  }
})

secondRow.addEventListener("click", (e) => {
  if (paymentsTableValue[1]) {
    const index = selectedRow.findIndex((selected) => selected === 1);
    if (index === -1) {
      changeClassRows([
        secondRowCell1,
        secondRowCell2,
        secondRowCell3,
        secondRowCell4,
        secondRowCell5
      ], 'cell-payments', 'cell-payments-selected')

      selectedRow.push(1);
    } else {
      changeClassRows([
        secondRowCell1,
        secondRowCell2,
        secondRowCell3,
        secondRowCell4,
        secondRowCell5
      ], 'cell-payments-selected', 'cell-payments')

      selectedRow.splice(index, 1);
    }
    updatePaymentInfo()
  }
})

thirdRow.addEventListener("click", (e) => {
  if (paymentsTableValue[2]) {
    const index = selectedRow.findIndex((selected) => selected === 2);
    if (index === -1) {
      changeClassRows([
        thirdRowCell1,
        thirdRowCell2,
        thirdRowCell3,
        thirdRowCell4,
        thirdRowCell5
      ], 'cell-payments', 'cell-payments-selected')

      selectedRow.push(2);
    } else {
      changeClassRows([
        thirdRowCell1,
        thirdRowCell2,
        thirdRowCell3,
        thirdRowCell4,
        thirdRowCell5
      ], 'cell-payments-selected', 'cell-payments')

      selectedRow.splice(index, 1);
    }
    updatePaymentInfo()
  }
})

fourthRow.addEventListener("click", (e) => {
  if (paymentsTableValue[3]) {
    const index = selectedRow.findIndex((selected) => selected === 3);
    if (index === -1) {
      changeClassRows([
        fourthRowCell1,
        fourthRowCell2,
        fourthRowCell3,
        fourthRowCell4,
        fourthRowCell5
      ], 'cell-payments', 'cell-payments-selected')

      selectedRow.push(3);
    } else {
      changeClassRows([
        fourthRowCell1,
        fourthRowCell2,
        fourthRowCell3,
        fourthRowCell4,
        fourthRowCell5
      ], 'cell-payments-selected', 'cell-payments')

      selectedRow.splice(index, 1);
    }
    updatePaymentInfo()
  }
})

fifthRow.addEventListener("click", (e) => {
  if (paymentsTableValue[4]) {
    const index = selectedRow.findIndex((selected) => selected === 4);
    if (index === -1) {
      changeClassRows([
        fifthRowCell1,
        fifthRowCell2,
        fifthRowCell3,
        fifthRowCell4,
        fifthRowCell5
      ], 'cell-payments', 'cell-payments-selected')

      selectedRow.push(4);
    } else {
      changeClassRows([
        fifthRowCell1,
        fifthRowCell2,
        fifthRowCell3,
        fifthRowCell4,
        fifthRowCell5
      ], 'cell-payments-selected', 'cell-payments')

      selectedRow.splice(index, 1);
    }
    updatePaymentInfo()
  }
})

const updatePaymentInfo = () => {
  let summary = 0;
  selectedRow.forEach((selected) => {
    summary += paymentsTableValue[selected].price;
  })

  paymentInfo.textContent = `Вами выбрано ${selectedRow.length} услуг`
  paymentInfoPrice.textContent = `Итоговая сумма на оплату ${summary} рублей`

  if (selectedRow.length === 0) {
    paymentInfo.textContent = 'Вами не выбрано услуг для оплаты'
    paymentInfoPrice.textContent = ''
  }
}

const paymentActiveMapper = (isActive) => {
  return isActive ? "" : "Оплачено"
}
