const url = 'https://cc66-46-164-217-97.ngrok-free.app/';
var token = GetCookie("access_token")
const headers = {
  "Host":  'cc66-46-164-217-97.ngrok-free.app',
  "Origin":  'https://cc66-46-164-217-97.ngrok-free.app/',
  "Accept": "*/*",
  'ngrok-skip-browser-warning':true
}
var userId = 1;


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
let selectedRow = [];


GetUrl(`payments/user/${userId}`).then(data => {
  paymentsTableValue = data
  updateDoctorTable()
})
  .catch((error) => {
    console.error('Error:', error);
  });

function updateDoctorTable() {
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

      selectedRow.push(0);
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
      selectedRow.splice(index, 1);
    }
    updatePaymentInfo()
  }
})

secondRow.addEventListener("click", (e) => {
  if (paymentsTableValue[1]) {
    const index = selectedRow.findIndex((selected) => selected === 1);
    if (index === -1) {
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

      selectedRow.push(1);
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
      selectedRow.splice(index, 1);
    }
    updatePaymentInfo()
  }
})

thirdRow.addEventListener("click", (e) => {
  if (paymentsTableValue[2]) {
    const index = selectedRow.findIndex((selected) => selected === 2);
    if (index === -1) {
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

      selectedRow.push(2);
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
      selectedRow.splice(index, 1);
    }
    updatePaymentInfo()
  }
})

fourthRow.addEventListener("click", (e) => {
  if (paymentsTableValue[3]) {
    const index = selectedRow.findIndex((selected) => selected === 3);
    if (index === -1) {
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

      selectedRow.push(3);
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
      selectedRow.splice(index, 1);
    }
    updatePaymentInfo()
  }
})

fifthRow.addEventListener("click", (e) => {
  if (paymentsTableValue[4]) {
    const index = selectedRow.findIndex((selected) => selected === 4);
    if (index === -1) {
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

      selectedRow.push(4);
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
      selectedRow.splice(index, 1);
    }
    updatePaymentInfo()
  }
})

function updatePaymentInfo() {
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

function paymentActiveMapper(isActive) {
  return isActive ? "" : "Оплачено"
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
