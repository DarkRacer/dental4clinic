import { get } from "../core/rest.js";
import { User } from "../core/model/user.js";

const nameField = document.getElementById("name");
const photoField = document.getElementById("photo");
const dateOfBirthdayField = document.getElementById("dateOfBirthday");
const phoneField = document.getElementById("phone");
const eMailField = document.getElementById("e-mail");
const allergiesField = document.getElementById("allergies");
const toothPictures = document.getElementById("toothPictures");

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
const query = window.location.href.split('/');
const userId = query[query.length - 1]

const getUserInfo = () =>{
  get(`user/${userId}`).then(data => {
    const {id, name, surname, patronymic, dateOfBirthday, phone, allergies, photo, photoName, address} = data;
    const email = data['e-mail'];
    const user = new User(
      id,
      name,
      surname,
      patronymic,
      dateOfBirthday,
      phone,
      email,
      allergies,
      photo,
      photoName,
      address
    )
    nameField.innerText = user.fullName;
    photoField.src = user.photo;
    dateOfBirthdayField.innerText = user.dateOfBirthday
    phoneField.innerText = user.phone
    eMailField.innerText = user.email
    allergiesField.innerText = user.allergies
  }).catch(error => console.error(error));
}

const getUserDiagnosis = () => {
  get(`user/diagnosis/${userId}`).then(data => {
    diagnosisTableValue = data
    updateDiagnosisTable()
  }).catch(error => console.error(error));
}

getUserInfo()
getUserDiagnosis()

const dialog = document.querySelector('#toothPicture');
document.querySelector('#openToothPicture').onclick = () => {
  dialog.style.display = 'flex';
  getToothPictures();
  dialog.show();
}
document.querySelector('#toothPictureClose').onclick = () => {
  dialog.style.display = null;
  dialog.close();
}

const updateDiagnosisTable = () => {
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

const getToothPictures = () => {
  get(`user/tooth/${userId}`).then(data => {
    while (toothPictures.firstChild) {
      toothPictures.removeChild(toothPictures.lastChild);
    }
    data.forEach((picture) => {
      const img = document.createElement('img');
      img.classList.add("tooth-picture");
      img.src = picture.data;
      toothPictures.appendChild(img);
    })
    updateDiagnosisTable()
  }).catch(error => console.error(error));
}

const actualDiagnosisMapper = (isActual) => {
  return isActual ? "Не вылечено" : "Вылечено"
}
