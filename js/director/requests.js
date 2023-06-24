const url = 'https://af2f-46-164-217-97.ngrok-free.app/';
var token = GetCookie("access_token")
const headers = {
  "Host":  'af2f-46-164-217-97.ngrok-free.app',
  "Origin":  'https://af2f-46-164-217-97.ngrok-free.app/',
  "Accept": "*/*",
  'ngrok-skip-browser-warning':true
}

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

GetUrl('requests').then((data) => {
  requestsTableValue = data
  updateRequestsTable()
}).then((error) => console.error(error))

var deleteDialog = document.querySelector('#deleteDialog');
document.querySelector('#openDeleteDialog').onclick = function() {
  deleteDialog.style.display = 'flex';
  deleteDialog.show();
}
document.querySelector('#deleteDialogClose').onclick = function() {
  PostUrl('requests/delete', requestsTableValue[selectedRow]).then((data) => {
    requestsTableValue = data
    updateRequestsTable()
  }).catch((error) => console.error(error))
  deleteDialog.style.display = null;
  deleteDialog.close();
}
document.querySelector('#backButtonDeleteDialogClose').onclick = function() {
  deleteDialog.style.display = null;
  deleteDialog.close();
}

checkedButton.addEventListener("click", (e) => {
  if (selectedRow > -1) {
    let requestToUpdate = requestsTableValue[selectedRow]
    requestToUpdate.isActual = false;
      PostUrl('requests/update', requestToUpdate).then((data) => {
        requestsTableValue = data
        updateRequestsTable()
      }).catch((error) => console.error(error))
  }
})

function updateRequestsTable() {
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

firstRow.addEventListener("click", (e) => {
  if (selectedRow !== 0) {
    firstRowCell1.classList.remove("cell-requests")
    firstRowCell1.classList.add("cell-requests-selected")
    firstRowCell2.classList.remove("cell-requests")
    firstRowCell2.classList.add("cell-requests-selected")
    firstRowCell3.classList.remove("cell-requests")
    firstRowCell3.classList.add("cell-requests-selected")
    firstRowCell4.classList.remove("cell-requests")
    firstRowCell4.classList.add("cell-requests-selected")

    secondRowCell1.classList.remove("cell-requests-selected")
    secondRowCell1.classList.add("cell-requests")
    secondRowCell2.classList.remove("cell-requests-selected")
    secondRowCell2.classList.add("cell-requests")
    secondRowCell3.classList.remove("cell-requests-selected")
    secondRowCell3.classList.add("cell-requests")
    secondRowCell4.classList.remove("cell-requests-selected")
    secondRowCell4.classList.add("cell-requests")

    thirdRowCell1.classList.remove("cell-requests-selected")
    thirdRowCell1.classList.add("cell-requests")
    thirdRowCell2.classList.remove("cell-requests-selected")
    thirdRowCell2.classList.add("cell-requests")
    thirdRowCell3.classList.remove("cell-requests-selected")
    thirdRowCell3.classList.add("cell-requests")
    thirdRowCell4.classList.remove("cell-requests-selected")
    thirdRowCell4.classList.add("cell-requests")

    fourthRowCell1.classList.remove("cell-requests-selected")
    fourthRowCell1.classList.add("cell-requests")
    fourthRowCell2.classList.remove("cell-requests-selected")
    fourthRowCell2.classList.add("cell-requests")
    fourthRowCell3.classList.remove("cell-requests-selected")
    fourthRowCell3.classList.add("cell-requests")
    fourthRowCell4.classList.remove("cell-requests-selected")
    fourthRowCell4.classList.add("cell-requests")

    fifthRowCell1.classList.remove("cell-requests-selected")
    fifthRowCell1.classList.add("cell-requests")
    fifthRowCell2.classList.remove("cell-requests-selected")
    fifthRowCell2.classList.add("cell-requests")
    fifthRowCell3.classList.remove("cell-requests-selected")
    fifthRowCell3.classList.add("cell-requests")
    fifthRowCell4.classList.remove("cell-requests-selected")
    fifthRowCell4.classList.add("cell-requests")

    selectedRow = 0;
  } else {
    firstRowCell1.classList.remove("cell-requests-selected")
    firstRowCell1.classList.add("cell-requests")
    firstRowCell2.classList.remove("cell-requests-selected")
    firstRowCell2.classList.add("cell-requests")
    firstRowCell3.classList.remove("cell-requests-selected")
    firstRowCell3.classList.add("cell-requests")
    firstRowCell4.classList.remove("cell-requests-selected")
    firstRowCell4.classList.add("cell-requests")
    selectedRow = -1;
  }
})

secondRow.addEventListener("click", (e) => {
  if (selectedRow !== 1) {
    secondRowCell1.classList.remove("cell-requests")
    secondRowCell1.classList.add("cell-requests-selected")
    secondRowCell2.classList.remove("cell-requests")
    secondRowCell2.classList.add("cell-requests-selected")
    secondRowCell3.classList.remove("cell-requests")
    secondRowCell3.classList.add("cell-requests-selected")
    secondRowCell4.classList.remove("cell-requests")
    secondRowCell4.classList.add("cell-requests-selected")

    firstRowCell1.classList.remove("cell-requests-selected")
    firstRowCell1.classList.add("cell-requests")
    firstRowCell2.classList.remove("cell-requests-selected")
    firstRowCell2.classList.add("cell-requests")
    firstRowCell3.classList.remove("cell-requests-selected")
    firstRowCell3.classList.add("cell-requests")
    firstRowCell4.classList.remove("cell-requests-selected")
    firstRowCell4.classList.add("cell-requests")

    thirdRowCell1.classList.remove("cell-requests-selected")
    thirdRowCell1.classList.add("cell-requests")
    thirdRowCell2.classList.remove("cell-requests-selected")
    thirdRowCell2.classList.add("cell-requests")
    thirdRowCell3.classList.remove("cell-requests-selected")
    thirdRowCell3.classList.add("cell-requests")
    thirdRowCell4.classList.remove("cell-requests-selected")
    thirdRowCell4.classList.add("cell-requests")

    fourthRowCell1.classList.remove("cell-requests-selected")
    fourthRowCell1.classList.add("cell-requests")
    fourthRowCell2.classList.remove("cell-requests-selected")
    fourthRowCell2.classList.add("cell-requests")
    fourthRowCell3.classList.remove("cell-requests-selected")
    fourthRowCell3.classList.add("cell-requests")
    fourthRowCell4.classList.remove("cell-requests-selected")
    fourthRowCell4.classList.add("cell-requests")

    fifthRowCell1.classList.remove("cell-requests-selected")
    fifthRowCell1.classList.add("cell-requests")
    fifthRowCell2.classList.remove("cell-requests-selected")
    fifthRowCell2.classList.add("cell-requests")
    fifthRowCell3.classList.remove("cell-requests-selected")
    fifthRowCell3.classList.add("cell-requests")
    fifthRowCell4.classList.remove("cell-requests-selected")
    fifthRowCell4.classList.add("cell-requests")

    selectedRow = 1;
  } else {
    secondRowCell1.classList.remove("cell-requests-selected")
    secondRowCell1.classList.add("cell-requests")
    secondRowCell2.classList.remove("cell-requests-selected")
    secondRowCell2.classList.add("cell-requests")
    secondRowCell3.classList.remove("cell-requests-selected")
    secondRowCell3.classList.add("cell-requests")
    secondRowCell4.classList.remove("cell-requests-selected")
    secondRowCell4.classList.add("cell-requests")
    selectedRow = -1;
  }
})

thirdRow.addEventListener("click", (e) => {
  if (selectedRow !== 2) {
    thirdRowCell1.classList.remove("cell-requests")
    thirdRowCell1.classList.add("cell-requests-selected")
    thirdRowCell2.classList.remove("cell-requests")
    thirdRowCell2.classList.add("cell-requests-selected")
    thirdRowCell3.classList.remove("cell-requests")
    thirdRowCell3.classList.add("cell-requests-selected")
    thirdRowCell4.classList.remove("cell-requests")
    thirdRowCell4.classList.add("cell-requests-selected")

    secondRowCell1.classList.remove("cell-requests-selected")
    secondRowCell1.classList.add("cell-requests")
    secondRowCell2.classList.remove("cell-requests-selected")
    secondRowCell2.classList.add("cell-requests")
    secondRowCell3.classList.remove("cell-requests-selected")
    secondRowCell3.classList.add("cell-requests")
    secondRowCell4.classList.remove("cell-requests-selected")
    secondRowCell4.classList.add("cell-requests")

    firstRowCell1.classList.remove("cell-requests-selected")
    firstRowCell1.classList.add("cell-requests")
    firstRowCell2.classList.remove("cell-requests-selected")
    firstRowCell2.classList.add("cell-requests")
    firstRowCell3.classList.remove("cell-requests-selected")
    firstRowCell3.classList.add("cell-requests")
    firstRowCell4.classList.remove("cell-requests-selected")
    firstRowCell4.classList.add("cell-requests")

    fourthRowCell1.classList.remove("cell-requests-selected")
    fourthRowCell1.classList.add("cell-requests")
    fourthRowCell2.classList.remove("cell-requests-selected")
    fourthRowCell2.classList.add("cell-requests")
    fourthRowCell3.classList.remove("cell-requests-selected")
    fourthRowCell3.classList.add("cell-requests")
    fourthRowCell4.classList.remove("cell-requests-selected")
    fourthRowCell4.classList.add("cell-requests")

    fifthRowCell1.classList.remove("cell-requests-selected")
    fifthRowCell1.classList.add("cell-requests")
    fifthRowCell2.classList.remove("cell-requests-selected")
    fifthRowCell2.classList.add("cell-requests")
    fifthRowCell3.classList.remove("cell-requests-selected")
    fifthRowCell3.classList.add("cell-requests")
    fifthRowCell4.classList.remove("cell-requests-selected")
    fifthRowCell4.classList.add("cell-requests")

    selectedRow = 2;
  } else {
    thirdRowCell1.classList.remove("cell-requests-selected")
    thirdRowCell1.classList.add("cell-requests")
    thirdRowCell2.classList.remove("cell-requests-selected")
    thirdRowCell2.classList.add("cell-requests")
    thirdRowCell3.classList.remove("cell-requests-selected")
    thirdRowCell3.classList.add("cell-requests")
    thirdRowCell4.classList.remove("cell-requests-selected")
    thirdRowCell4.classList.add("cell-requests")
    selectedRow = -1;
  }
})

fourthRow.addEventListener("click", (e) => {
  if (selectedRow !== 3) {
    fourthRowCell1.classList.remove("cell-requests")
    fourthRowCell1.classList.add("cell-requests-selected")
    fourthRowCell2.classList.remove("cell-requests")
    fourthRowCell2.classList.add("cell-requests-selected")
    fourthRowCell3.classList.remove("cell-requests")
    fourthRowCell3.classList.add("cell-requests-selected")
    fourthRowCell4.classList.remove("cell-requests")
    fourthRowCell4.classList.add("cell-requests-selected")

    secondRowCell1.classList.remove("cell-requests-selected")
    secondRowCell1.classList.add("cell-requests")
    secondRowCell2.classList.remove("cell-requests-selected")
    secondRowCell2.classList.add("cell-requests")
    secondRowCell3.classList.remove("cell-requests-selected")
    secondRowCell3.classList.add("cell-requests")
    secondRowCell4.classList.remove("cell-requests-selected")
    secondRowCell4.classList.add("cell-requests")

    thirdRowCell1.classList.remove("cell-requests-selected")
    thirdRowCell1.classList.add("cell-requests")
    thirdRowCell2.classList.remove("cell-requests-selected")
    thirdRowCell2.classList.add("cell-requests")
    thirdRowCell3.classList.remove("cell-requests-selected")
    thirdRowCell3.classList.add("cell-requests")
    thirdRowCell4.classList.remove("cell-requests-selected")
    thirdRowCell4.classList.add("cell-requests")

    firstRowCell1.classList.remove("cell-requests-selected")
    firstRowCell1.classList.add("cell-requests")
    firstRowCell2.classList.remove("cell-requests-selected")
    firstRowCell2.classList.add("cell-requests")
    firstRowCell3.classList.remove("cell-requests-selected")
    firstRowCell3.classList.add("cell-requests")
    firstRowCell4.classList.remove("cell-requests-selected")
    firstRowCell4.classList.add("cell-requests")

    fifthRowCell1.classList.remove("cell-requests-selected")
    fifthRowCell1.classList.add("cell-requests")
    fifthRowCell2.classList.remove("cell-requests-selected")
    fifthRowCell2.classList.add("cell-requests")
    fifthRowCell3.classList.remove("cell-requests-selected")
    fifthRowCell3.classList.add("cell-requests")
    fifthRowCell4.classList.remove("cell-requests-selected")
    fifthRowCell4.classList.add("cell-requests")

    selectedRow = 3;
  } else {
    fourthRowCell1.classList.remove("cell-requests-selected")
    fourthRowCell1.classList.add("cell-requests")
    fourthRowCell2.classList.remove("cell-requests-selected")
    fourthRowCell2.classList.add("cell-requests")
    fourthRowCell3.classList.remove("cell-requests-selected")
    fourthRowCell3.classList.add("cell-requests")
    fourthRowCell4.classList.remove("cell-requests-selected")
    fourthRowCell4.classList.add("cell-requests")
    selectedRow = -1;
  }
})

fifthRow.addEventListener("click", (e) => {
  if (selectedRow !== 4) {
    fifthRowCell1.classList.remove("cell-requests")
    fifthRowCell1.classList.add("cell-requests-selected")
    fifthRowCell2.classList.remove("cell-requests")
    fifthRowCell2.classList.add("cell-requests-selected")
    fifthRowCell3.classList.remove("cell-requests")
    fifthRowCell3.classList.add("cell-requests-selected")
    fifthRowCell4.classList.remove("cell-requests")
    fifthRowCell4.classList.add("cell-requests-selected")

    secondRowCell1.classList.remove("cell-requests-selected")
    secondRowCell1.classList.add("cell-requests")
    secondRowCell2.classList.remove("cell-requests-selected")
    secondRowCell2.classList.add("cell-requests")
    secondRowCell3.classList.remove("cell-requests-selected")
    secondRowCell3.classList.add("cell-requests")
    secondRowCell4.classList.remove("cell-requests-selected")
    secondRowCell4.classList.add("cell-requests")

    thirdRowCell1.classList.remove("cell-requests-selected")
    thirdRowCell1.classList.add("cell-requests")
    thirdRowCell2.classList.remove("cell-requests-selected")
    thirdRowCell2.classList.add("cell-requests")
    thirdRowCell3.classList.remove("cell-requests-selected")
    thirdRowCell3.classList.add("cell-requests")
    thirdRowCell4.classList.remove("cell-requests-selected")
    thirdRowCell4.classList.add("cell-requests")

    fourthRowCell1.classList.remove("cell-requests-selected")
    fourthRowCell1.classList.add("cell-requests")
    fourthRowCell2.classList.remove("cell-requests-selected")
    fourthRowCell2.classList.add("cell-requests")
    fourthRowCell3.classList.remove("cell-requests-selected")
    fourthRowCell3.classList.add("cell-requests")
    fourthRowCell4.classList.remove("cell-requests-selected")
    fourthRowCell4.classList.add("cell-requests")

    firstRowCell1.classList.remove("cell-requests-selected")
    firstRowCell1.classList.add("cell-requests")
    firstRowCell2.classList.remove("cell-requests-selected")
    firstRowCell2.classList.add("cell-requests")
    firstRowCell3.classList.remove("cell-requests-selected")
    firstRowCell3.classList.add("cell-requests")
    firstRowCell4.classList.remove("cell-requests-selected")
    firstRowCell4.classList.add("cell-requests")

    selectedRow = 4;
  } else {
    fifthRowCell1.classList.remove("cell-requests-selected")
    fifthRowCell1.classList.add("cell-requests")
    fifthRowCell2.classList.remove("cell-requests-selected")
    fifthRowCell2.classList.add("cell-requests")
    fifthRowCell3.classList.remove("cell-requests-selected")
    fifthRowCell3.classList.add("cell-requests")
    fifthRowCell4.classList.remove("cell-requests-selected")
    fifthRowCell4.classList.add("cell-requests")
    selectedRow = -1;
  }
})

function statusMapper(isActual) {
  return isActual ? '' : 'Рассмотрено'
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
    .then(response => response.json())
}
