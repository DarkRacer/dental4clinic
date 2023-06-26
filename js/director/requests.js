import { get, post } from "../core/rest.js";
import {changeClassRows} from "../core/table.js";

const firstRow = document.getElementById("firstRow")
const firstRowCell1 = document.getElementById("firstRowCell1")
const firstName = document.getElementById("firstName")
const firstRowCell2 = document.getElementById("firstRowCell2")
const firstPhone = document.getElementById("firstPhone")
const firstRowCell3 = document.getElementById("firstRowCell3")
const firstContent = document.getElementById("firstContent")
const firstRowCell4 = document.getElementById("firstRowCell4")
const firstStatus = document.getElementById("firstStatus")

const secondRow = document.getElementById("secondRow")
const secondRowCell1 = document.getElementById("secondRowCell1")
const secondName = document.getElementById("secondName")
const secondRowCell2 = document.getElementById("secondRowCell2")
const secondPhone = document.getElementById("secondPhone")
const secondRowCell3 = document.getElementById("secondRowCell3")
const secondContent = document.getElementById("secondContent")
const secondRowCell4 = document.getElementById("secondRowCell4")
const secondStatus = document.getElementById("secondStatus")

const thirdRow = document.getElementById("thirdRow")
const thirdRowCell1 = document.getElementById("thirdRowCell1")
const thirdName = document.getElementById("thirdName")
const thirdRowCell2 = document.getElementById("thirdRowCell2")
const thirdPhone = document.getElementById("thirdPhone")
const thirdRowCell3 = document.getElementById("thirdRowCell3")
const thirdContent = document.getElementById("thirdContent")
const thirdRowCell4 = document.getElementById("thirdRowCell4")
const thirdStatus = document.getElementById("thirdStatus")

const fourthRow = document.getElementById("forthRow")
const fourthRowCell1 = document.getElementById("forthRowCell1")
const forthName = document.getElementById("forthName")
const fourthRowCell2 = document.getElementById("forthRowCell2")
const forthPhone = document.getElementById("forthPhone")
const fourthRowCell3 = document.getElementById("forthRowCell3")
const forthContent = document.getElementById("forthContent")
const fourthRowCell4 = document.getElementById("forthRowCell4")
const forthStatus = document.getElementById("forthStatus")

const fifthRow = document.getElementById("fifthRow")
const fifthRowCell1 = document.getElementById("fifthRowCell1")
const fifthName = document.getElementById("fifthName")
const fifthRowCell2 = document.getElementById("fifthRowCell2")
const fifthPhone = document.getElementById("fifthPhone")
const fifthRowCell3 = document.getElementById("fifthRowCell3")
const fifthContent = document.getElementById("fifthContent")
const fifthRowCell4 = document.getElementById("fifthRowCell4")
const fifthStatus = document.getElementById("fifthStatus")

const checkedButton = document.getElementById("checked-button")

let requestsTableValue = [];
let selectedRow = -1;

get('requests').then((data) => {
  updateRequestsTableValue(data)
}).then((error) => console.error(error))

const deleteDialog = document.querySelector('#deleteDialog');
document.querySelector('#openDeleteDialog').onclick = () => {
  deleteDialog.style.display = 'flex';
  deleteDialog.show();
}
document.querySelector('#deleteDialogClose').onclick = () => {
  post('requests/delete', requestsTableValue[selectedRow]).then((data) => {
    updateRequestsTableValue(data)
  }).catch((error) => console.error(error))
  deleteDialog.style.display = null;
  deleteDialog.close();
}
document.querySelector('#backButtonDeleteDialogClose').onclick = () => {
  deleteDialog.style.display = null;
  deleteDialog.close();
}

checkedButton.addEventListener("click", (e) => {
  const requestToUpdate = getSelectedPayment()
  if (requestToUpdate) {
    requestToUpdate.isActual = false;
      post('requests/update', requestToUpdate).then((data) => {
        updateRequestsTableValue(data)
      }).catch((error) => console.error(error))
  }
})

const updateRequestsTable = () => {
  if (requestsTableValue[0]) {
    firstName.textContent = requestsTableValue[0].name
    firstPhone.textContent = requestsTableValue[0].phone
    firstContent.textContent = requestsTableValue[0].description
    firstStatus.textContent = statusMapper(requestsTableValue[0].isActual)
  } else {
    firstName.textContent = ''
    firstPhone.textContent = ''
    firstContent.textContent = ''
    firstStatus.textContent = ''
  }

  if (requestsTableValue[1]) {
    secondName.textContent = requestsTableValue[1].name
    secondPhone.textContent = requestsTableValue[1].phone
    secondContent.textContent = requestsTableValue[1].description
    secondStatus.textContent = statusMapper(requestsTableValue[1].isActual)
  } else {
    secondName.textContent = ''
    secondPhone.textContent = ''
    secondContent.textContent = ''
    secondStatus.textContent = ''
  }

  if (requestsTableValue[2]) {
    thirdName.textContent = requestsTableValue[2].name
    thirdPhone.textContent = requestsTableValue[2].phone
    thirdContent.textContent = requestsTableValue[2].description
    thirdStatus.textContent = statusMapper(requestsTableValue[2].isActual)
  } else {
    thirdName.textContent = ''
    thirdPhone.textContent = ''
    thirdContent.textContent = ''
    thirdStatus.textContent = ''
  }

  if (requestsTableValue[3]) {
    forthName.textContent = requestsTableValue[3].name
    forthPhone.textContent = requestsTableValue[3].phone
    forthContent.textContent = requestsTableValue[3].description
    forthStatus.textContent = statusMapper(requestsTableValue[3].isActual)
  } else {
    forthName.textContent = ''
    forthPhone.textContent = ''
    forthContent.textContent = ''
    forthStatus.textContent = ''
  }

  if (requestsTableValue[4]) {
    fifthName.textContent = requestsTableValue[4].name
    fifthPhone.textContent = requestsTableValue[4].phone
    fifthContent.textContent = requestsTableValue[4].description
    fifthStatus.textContent = statusMapper(requestsTableValue[4].isActual)
  } else {
    fifthName.textContent = ''
    fifthPhone.textContent = ''
    fifthContent.textContent = ''
    fifthStatus.textContent = ''
  }
}

const updateRequestsTableValue = (data) => {
  requestsTableValue = data;
  updateRequestsTable()
}

const getSelectedPayment = () => {
  return selectedRow > -1 ? requestsTableValue[selectedRow] : null;
}

firstRow.addEventListener("click", (e) => {
  if (selectedRow !== 0) {
    changeClassRows([
      firstRowCell1,
      firstRowCell2,
      firstRowCell3,
      firstRowCell4
    ], "cell-requests", "cell-requests-selected")

    changeClassRows([
      secondRowCell1,
      secondRowCell2,
      secondRowCell3,
      secondRowCell4,
      thirdRowCell1,
      thirdRowCell2,
      thirdRowCell3,
      thirdRowCell4,
      fourthRowCell1,
      fourthRowCell2,
      fourthRowCell3,
      fourthRowCell4,
      fifthRowCell1,
      fifthRowCell2,
      fifthRowCell3,
      fifthRowCell4
    ], "cell-requests-selected", "cell-requests")

    selectedRow = 0;
  } else {
    changeClassRows([
      firstRowCell1,
      firstRowCell2,
      firstRowCell3,
      firstRowCell4
    ], "cell-requests-selected", "cell-requests")

    selectedRow = -1;
  }
})

secondRow.addEventListener("click", (e) => {
  if (selectedRow !== 1) {
    changeClassRows([
      secondRowCell1,
      secondRowCell2,
      secondRowCell3,
      secondRowCell4
    ], "cell-requests", "cell-requests-selected")

    changeClassRows([
      firstRowCell1,
      firstRowCell2,
      firstRowCell3,
      firstRowCell4,
      thirdRowCell1,
      thirdRowCell2,
      thirdRowCell3,
      thirdRowCell4,
      fourthRowCell1,
      fourthRowCell2,
      fourthRowCell3,
      fourthRowCell4,
      fifthRowCell1,
      fifthRowCell2,
      fifthRowCell3,
      fifthRowCell4
    ], "cell-requests-selected", "cell-requests")

    selectedRow = 1;
  } else {
    changeClassRows([
      secondRowCell1,
      secondRowCell2,
      secondRowCell3,
      secondRowCell4
    ], "cell-requests-selected", "cell-requests")

    selectedRow = -1;
  }
})

thirdRow.addEventListener("click", (e) => {
  if (selectedRow !== 2) {
    changeClassRows([
      thirdRowCell1,
      thirdRowCell2,
      thirdRowCell3,
      thirdRowCell4
    ], "cell-requests", "cell-requests-selected")

    changeClassRows([
      firstRowCell1,
      firstRowCell2,
      firstRowCell3,
      firstRowCell4,
      secondRowCell1,
      secondRowCell2,
      secondRowCell3,
      secondRowCell4,
      fourthRowCell1,
      fourthRowCell2,
      fourthRowCell3,
      fourthRowCell4,
      fifthRowCell1,
      fifthRowCell2,
      fifthRowCell3,
      fifthRowCell4
    ], "cell-requests-selected", "cell-requests")

    selectedRow = 2;
  } else {
    changeClassRows([
      thirdRowCell1,
      thirdRowCell2,
      thirdRowCell3,
      thirdRowCell4
    ], "cell-requests-selected", "cell-requests")

    selectedRow = -1;
  }
})

fourthRow.addEventListener("click", (e) => {
  if (selectedRow !== 3) {
    changeClassRows([
      fourthRowCell1,
      fourthRowCell2,
      fourthRowCell3,
      fourthRowCell4
    ], "cell-requests", "cell-requests-selected")

    changeClassRows([
      firstRowCell1,
      firstRowCell2,
      firstRowCell3,
      firstRowCell4,
      secondRowCell1,
      secondRowCell2,
      secondRowCell3,
      secondRowCell4,
      thirdRowCell1,
      thirdRowCell2,
      thirdRowCell3,
      thirdRowCell4,
      fifthRowCell1,
      fifthRowCell2,
      fifthRowCell3,
      fifthRowCell4
    ], "cell-requests-selected", "cell-requests")

    selectedRow = 3;
  } else {
    changeClassRows([
      fourthRowCell1,
      fourthRowCell2,
      fourthRowCell3,
      fourthRowCell4
    ], "cell-requests-selected", "cell-requests")

    selectedRow = -1;
  }
})

fifthRow.addEventListener("click", (e) => {
  if (selectedRow !== 4) {
    changeClassRows([
      fifthRowCell1,
      fifthRowCell2,
      fifthRowCell3,
      fifthRowCell4
    ], "cell-requests", "cell-requests-selected")

    changeClassRows([
      firstRowCell1,
      firstRowCell2,
      firstRowCell3,
      firstRowCell4,
      secondRowCell1,
      secondRowCell2,
      secondRowCell3,
      secondRowCell4,
      thirdRowCell1,
      thirdRowCell2,
      thirdRowCell3,
      thirdRowCell4,
      fourthRowCell1,
      fourthRowCell2,
      fourthRowCell3,
      fourthRowCell4
    ], "cell-requests-selected", "cell-requests")

    selectedRow = 4;
  } else {
    changeClassRows([
      fifthRowCell1,
      fifthRowCell2,
      fifthRowCell3,
      fifthRowCell4
    ], "cell-requests-selected", "cell-requests")

    selectedRow = -1;
  }
})

const statusMapper = (isActual) => {
  return isActual ? '' : 'Рассмотрено'
}
