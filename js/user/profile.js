const url = 'https://af2f-46-164-217-97.ngrok-free.app/';
var token = GetCookie("access_token")
const headers = {
  "Host":  'af2f-46-164-217-97.ngrok-free.app',
  "Origin":  'https://af2f-46-164-217-97.ngrok-free.app/',
  "Accept": "*/*",
  'ngrok-skip-browser-warning':true
}

let nameField = document.getElementById("name");
let photoField = document.getElementById("photo");
let dateOfBirthdayField = document.getElementById("dateOfBirthday");
let phoneField = document.getElementById("phone");
let eMailField = document.getElementById("e-mail");
let allergiesField = document.getElementById("allergies");
let toothPictures = document.getElementById("toothPictures");


const firstDiagnosisName = document.getElementById("first-diagnosis-name");
const firstDiagnosisDescription = document.getElementById("first-diagnosis-description");
const firstDiagnosisActual = document.getElementById("first-diagnosis-actual");

const secondDiagnosisName = document.getElementById("second-diagnosis-name");
const secondDiagnosisDescription = document.getElementById("second-diagnosis-description");
const secondDiagnosisActual = document.getElementById("second-diagnosis-actual");

const thirdDiagnosisName = document.getElementById("third-diagnosis-name");
const thirdDiagnosisDescription = document.getElementById("third-diagnosis-description");
const thirdDiagnosisActual = document.getElementById("third-diagnosis-actual");

const fourthDiagnosisName = document.getElementById("fourth-diagnosis-name");
const fourthDiagnosisDescription = document.getElementById("fourth-diagnosis-description");
const fourthDiagnosisActual = document.getElementById("fourth-diagnosis-actual");

let diagnosisTableValue = [];

getUserInfo()
getUserDiagnosis()

var dialog = document.querySelector('#toothPicture');
document.querySelector('#openToothPicture').onclick = function() {
  getToothPictures();
  dialog.show();
}
document.querySelector('#toothPictureClose').onclick = function() {
  dialog.style.display = null;
  dialog.close();
}

function getUserInfo() {
  let query = window.location.href.split('/');
  let userId = query[query.length - 1]
  GetUrl(`user/${userId}`).then(data => {
    nameField.innerText = data['full-name'];
    photoField.src = data.photo;
    dateOfBirthdayField.innerText = data.dateOfBirthday
    phoneField.innerText = data.phone
    eMailField.innerText = data['e-mail']
    allergiesField.innerText = data.allergies
  }).catch(error => console.error(error));
}

function getUserDiagnosis() {
  let query = window.location.href.split('/');
  let userId = query[query.length - 1]
  GetUrl(`user/diagnosis/${userId}`).then(data => {
    diagnosisTableValue = data
    updateDiagnosisTable()
  }).catch(error => console.error(error));
}

function updateDiagnosisTable() {
  if (diagnosisTableValue[0]) {
    firstDiagnosisName.textContent = diagnosisTableValue[0].name
    firstDiagnosisDescription.textContent = diagnosisTableValue[0].description
    firstDiagnosisActual.textContent = actualDiagnosisMapper(diagnosisTableValue[0].isActual)
  } else {
    firstDiagnosisName.textContent = ''
    firstDiagnosisDescription.textContent = ''
    firstDiagnosisActual.textContent = ''
  }

  if (diagnosisTableValue[1]) {
    secondDiagnosisName.textContent = diagnosisTableValue[1].name
    secondDiagnosisDescription.textContent = diagnosisTableValue[1].description
    secondDiagnosisActual.textContent = actualDiagnosisMapper(diagnosisTableValue[1].isActual)
  } else {
    secondDiagnosisName.textContent = ''
    secondDiagnosisDescription.textContent = ''
    secondDiagnosisActual.textContent = ''
  }

  if (diagnosisTableValue[2]) {
    thirdDiagnosisName.textContent = diagnosisTableValue[2].name
    thirdDiagnosisDescription.textContent = diagnosisTableValue[2].description
    thirdDiagnosisActual.textContent = actualDiagnosisMapper(diagnosisTableValue[2].isActual)
  } else {
    thirdDiagnosisName.textContent = ''
    thirdDiagnosisDescription.textContent = ''
    thirdDiagnosisActual.textContent = ''
  }

  if (diagnosisTableValue[3]) {
    fourthDiagnosisName.textContent = diagnosisTableValue[3].name
    fourthDiagnosisDescription.textContent = diagnosisTableValue[3].description
    fourthDiagnosisActual.textContent = actualDiagnosisMapper(diagnosisTableValue[3].isActual)
  } else {
    fourthDiagnosisName.textContent = ''
    fourthDiagnosisDescription.textContent = ''
    fourthDiagnosisActual.textContent = ''
  }
}

function getToothPictures() {
  let query = window.location.href.split('/');
  let userId = query[query.length - 1]
  GetUrl(`user/tooth/${userId}`).then(data => {
    data.forEach((picture) => {
      let img = document.createElement('img');
      img.classList.add("tooth-picture");
      img.src = picture.data;
      toothPictures.appendChild(img);
    })
    updateDiagnosisTable()
  }).catch(error => console.error(error));
}

function actualDiagnosisMapper(isActual) {
  return isActual ? "Не вылечено" : "Вылечено"
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
